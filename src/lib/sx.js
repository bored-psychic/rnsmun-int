// Turns a CSS string ("display: flex; gap: 12px") into a React style object.
// Lets the page keep the exact CSS from the design file, character for character.
const cache = new Map();

export function sx(css) {
  if (cache.has(css)) return cache.get(css);
  const out = {};
  let depth = 0, start = 0;
  const parts = [];
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) { parts.push(css.slice(start, i)); start = i + 1; }
  }
  parts.push(css.slice(start));
  for (const part of parts) {
    const k = part.indexOf(':');
    if (k < 0) continue;
    const prop = part.slice(0, k).trim();
    const val = part.slice(k + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith('-webkit-')
      ? 'Webkit' + prop.slice(8).replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = val;
  }
  cache.set(css, out);
  return out;
}

// Font stacks (self-hosted, work offline)
export const ARCHIVO = "'Archivo Variable', 'Archivo', sans-serif";
export const MONO = "'JetBrains Mono', monospace";
