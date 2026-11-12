import { useEffect, useRef } from 'react';

// Liquid chrome surface (WebGL). Same shader as the design; reacts to the mouse.
// center: 0 = full surface, 1 = darken the middle so content can sit on top.
export default function Liquid({ speed = 1, center = 0 }) {
  const canvasRef = useRef(null);
  const props = useRef({ speed, center });
  props.current = { speed, center };

  useEffect(() => {
    const c = canvasRef.current;
    const gl = c && (c.getContext('webgl', { antialias: false, premultipliedAlpha: false }) || c.getContext('experimental-webgl'));
    if (!gl) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const vs = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
    const fs = [
      'precision highp float;',
      'uniform vec2 u_r;uniform float u_t;uniform vec2 u_m;uniform float u_h;uniform float u_c;',
      'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
      'float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);',
      ' return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}',
      'float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<4;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}',
      'float field(vec2 p){float t=u_t*.07;vec2 q=vec2(fbm(p+vec2(0.,t)),fbm(p+vec2(5.2,1.3)-t));',
      ' return fbm(p+2.4*q+vec2(t*.6,-t*.4));}',
      'float ribbon(vec2 p,vec2 uv){return sin(field(p)*9.+(uv.x*1.3+uv.y)*2.2+u_t*.15);}',
      'void main(){',
      ' vec2 uv=(gl_FragCoord.xy-.5*u_r)/u_r.y;',
      ' vec2 m=(u_m-.5*u_r)/u_r.y;',
      ' vec2 d=uv-m;float fall=exp(-dot(d,d)*5.);',
      ' vec2 w=uv+vec2(-d.y,d.x)*fall*.55*u_h;',
      ' vec2 p=vec2(w.x*1.1+w.y*.7,w.y*1.7-w.x*.5)*1.25;',
      ' float e=.006;',
      ' float b=ribbon(p,w);',
      ' float bx=ribbon(p+vec2(e,0.),w);float by=ribbon(p+vec2(0.,e),w);',
      ' vec3 n=normalize(vec3((b-bx)/e*.05,(b-by)/e*.05,1.));',
      ' vec3 v=vec3(0.,0.,1.);vec3 rf=reflect(-v,n);',
      ' float k=rf.y*.5+.5+rf.x*.18;',
      ' vec3 ink=vec3(.028,.022,.026),mar=vec3(.46,.05,.18),brass=vec3(.88,.69,.33),ivory=vec3(1.,.95,.86);',
      ' vec3 col=mix(ink,mar,smoothstep(.28,.6,k));',
      ' col=mix(col,brass,smoothstep(.64,.79,k)*.8);',
      ' col=mix(col,ivory,smoothstep(.85,.97,k));',
      ' vec3 L=normalize(vec3(-.45,.65,.62));',
      ' col+=ivory*pow(max(dot(reflect(-L,n),v),0.),40.)*1.35;',
      ' col+=mar*pow(1.-n.z,1.5)*.9;',
      ' col*=mix(.3,1.,smoothstep(-.4,.8,b));',
      ' col+=brass*fall*.10*u_h;',
      ' float side=smoothstep(.16,.95,abs(uv.x)+.12*sin(uv.y*3.1+u_t*.21));',
      ' col*=mix(1.,mix(.07,1.,side),u_c);',
      ' col*=1.-.25*length(uv*vec2(.55,1.));',
      ' gl_FragColor=vec4(col,1.);',
      '}'
    ].join('\n');
    const sh = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const v1 = sh(gl.VERTEX_SHADER, vs), f1 = sh(gl.FRAGMENT_SHADER, fs);
    if (!v1 || !f1) return undefined;
    const prog = gl.createProgram();
    gl.attachShader(prog, v1); gl.attachShader(prog, f1); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'u_r'), uT = gl.getUniformLocation(prog, 'u_t'),
      uM = gl.getUniformLocation(prog, 'u_m'), uH = gl.getUniformLocation(prog, 'u_h'), uC = gl.getUniformLocation(prog, 'u_c');
    const scale = 0.5 * Math.min(window.devicePixelRatio || 1, 2);
    const target = { x: 0, y: 0, h: 0 }, cur = { x: 0, y: 0, h: 0 };
    const onMove = (ev) => {
      const r = c.getBoundingClientRect();
      target.x = (ev.clientX - r.left) * scale;
      target.y = (r.bottom - ev.clientY) * scale;
      target.h = (ev.clientY >= r.top && ev.clientY <= r.bottom) ? 1 : 0;
    };
    window.addEventListener('mousemove', onMove);
    let t = 8, last = performance.now(), raf = 0;
    const frame = (now) => {
      const w = Math.max(1, Math.floor(c.clientWidth * scale)), h = Math.max(1, Math.floor(c.clientHeight * scale));
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; gl.viewport(0, 0, w, h); cur.x = target.x = w * 0.5; cur.y = target.y = h * 0.5; }
      t += Math.min(0.05, (now - last) / 1000) * props.current.speed;
      last = now;
      cur.x += (target.x - cur.x) * 0.06; cur.y += (target.y - cur.y) * 0.06; cur.h += (target.h - cur.h) * 0.04;
      gl.uniform2f(uR, c.width, c.height);
      gl.uniform1f(uT, t);
      gl.uniform2f(uM, cur.x, cur.y);
      gl.uniform1f(uH, cur.h);
      gl.uniform1f(uC, props.current.center);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(45% 70% at 0% 50%, rgba(108,13,44,0.75), rgba(108,13,44,0) 70%), radial-gradient(45% 70% at 100% 40%, rgba(108,13,44,0.65), rgba(108,13,44,0) 70%), #070607' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
