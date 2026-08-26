/* nervures.js — interactive leaf-vein shader with musical-wave click ripples.
   Usage:
     Nervures.mount(canvasEl, {
       intensity: 1.0,          // overall brightness multiplier
       interactRoot: window,    // element to listen for pointer events
       enableClicks: true,
     });
*/
(function (root) {
  const VS = "attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }";

  const FS = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec3  u_clicks[6];
uniform float u_intensity;

const vec3 c_studio  = vec3(0.039, 0.035, 0.031);
const vec3 c_elevated= vec3(0.071, 0.063, 0.055);
const vec3 c_moss    = vec3(0.176, 0.290, 0.180);
const vec3 c_vine    = vec3(0.290, 0.486, 0.349);
const vec3 c_leaf    = vec3(0.498, 0.690, 0.412);
const vec3 c_sap     = vec3(0.659, 0.776, 0.624);
const vec3 c_bloom   = vec3(0.784, 0.902, 0.788);

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv - 0.5;
  float aspect = u_res.x / u_res.y;
  p.x *= aspect;
  vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);

  // domain-warped fbm ridges → leaf veins
  vec2 q = p * 2.4;
  vec2 w = vec2(fbm(q + u_time*0.03), fbm(q + vec2(5.2, 1.3) + u_time*0.025));
  q += (w - 0.5) * 1.6;
  vec2 qa = q * mat2(2.0, 0.0, 0.0, 0.8);
  float n  = fbm(qa);
  float n2 = fbm(qa*2.2 + 4.0);
  float v1 = 1.0 - smoothstep(0.0, 0.04, abs(n  - 0.5));
  float v2 = 1.0 - smoothstep(0.0, 0.025, abs(n2 - 0.5));
  float vein = v1*0.45 + v2*0.30;

  // base leaf plate
  vec3 col = mix(c_studio, c_elevated*1.2, fbm(p*3.0 + u_time*0.02)*0.8);

  // cursor reveal — backlight under finger
  float dm = length(p - m);
  float reveal = exp(-dm*2.6);
  col = mix(col, c_moss,  vein*0.7);
  col = mix(col, c_vine,  vein*reveal*1.4);
  col = mix(col, c_leaf,  v2*reveal*reveal*0.9);

  // ─── musical wave click ripples ───
  // for each recent click: emit a sine wave-packet (fundamental + 2 harmonics)
  // that travels outward; lights up the veins it passes through.
  float waveBoost = 0.0;     // additive on veins
  float ringGlow  = 0.0;     // soft visible ring even off-vein
  for(int i=0;i<6;i++){
    vec3 c = u_clicks[i];
    if(c.z > 6.0) continue;
    vec2 cp = (c.xy - 0.5) * vec2(aspect, 1.0);
    float d = length(p - cp);
    float speed = 0.42;            // wavefront propagation
    float front = c.z * speed;
    // narrow gaussian envelope around the wavefront
    float env = exp(-pow((d - front) * 5.5, 2.0));
    // sine packet — fundamental + 2 harmonics → "musical" feel
    float phase = (d - front) * 22.0;
    float wave = sin(phase)
               + 0.55 * sin(phase * 2.0 + 0.4)
               + 0.30 * sin(phase * 3.0 + 0.9);
    // age + radial damping
    float amp = exp(-c.z*0.55) * exp(-d*0.35);
    waveBoost += wave * env * amp;
    // visible ring trail (off-vein) — only positive half-cycles, soft
    ringGlow += max(0.0, wave) * env * amp * 0.5;
  }

  // veins flare where the wavefront sweeps over them
  col = mix(col, c_leaf,  vein * max(0.0, waveBoost) * 1.6);
  col = mix(col, c_sap,   v2   * max(0.0, waveBoost*waveBoost) * 0.9);
  col -= vein * max(0.0, -waveBoost) * 0.18 * vec3(1.0,0.95,0.9);
  // faint ring visible across the whole plate (so wave reads off the leaf too)
  col += c_vine * ringGlow * 0.35;
  col += c_leaf * ringGlow * ringGlow * 0.4;

  // gentle global breath
  col *= 0.92 + 0.08*sin(u_time*0.3);

  col *= u_intensity;
  col *= 1.0 - smoothstep(0.65, 1.15, length(p));
  col += (hash(gl_FragCoord.xy + u_time)-0.5)*0.014;
  gl_FragColor = vec4(col, 1.0);
}
`;

  function mount(canvas, opts) {
    opts = opts || {};
    const intensity = opts.intensity != null ? opts.intensity : 1.0;
    const interactRoot = opts.interactRoot || canvas;
    const enableClicks = opts.enableClicks !== false;

    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
    if (!gl) return null;

    function compile(src, type) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error("shader err:", gl.getShaderInfoLog(s)); return null; }
      return s;
    }
    const vs = compile(VS, gl.VERTEX_SHADER);
    const fs = compile(FS, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return null; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1,  -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uClicks= gl.getUniformLocation(prog, "u_clicks");
    const uInt   = gl.getUniformLocation(prog, "u_intensity");

    const state = {
      mx: 0.5, my: 0.5, tmx: 0.5, tmy: 0.5,
      clicks: [],
      start: performance.now(),
      intensity: intensity,          // current (rendered)
      targetIntensity: intensity,    // smoothed toward
      multiplier: 1.0,               // global scalar (Tweaks)
      clicksEnabled: enableClicks,
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = canvas.getBoundingClientRect();
      const w = Math.max(2, Math.floor(r.width * dpr));
      const h = Math.max(2, Math.floor(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    resize();
    new ResizeObserver(resize).observe(canvas);
    window.addEventListener("resize", resize);

    function getPos(e) {
      const r = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - r.left) / r.width,
        y: 1.0 - (e.clientY - r.top) / r.height
      };
    }
    interactRoot.addEventListener("pointermove", (e) => {
      const p = getPos(e);
      state.tmx = p.x; state.tmy = p.y;
    });
    if (enableClicks) {
      interactRoot.addEventListener("pointerdown", (e) => {
        if (!state.clicksEnabled) return;
        const p = getPos(e);
        state.clicks.push({ x: p.x, y: p.y, t: (performance.now() - state.start) / 1000 });
        if (state.clicks.length > 6) state.clicks.shift();
      });
    }

    function frame() {
      state.mx += (state.tmx - state.mx) * 0.05;
      state.my += (state.tmy - state.my) * 0.05;
      // long, soft lerp for intensity (~1.5–2s ease)
      state.intensity += (state.targetIntensity - state.intensity) * 0.025;
      const t = (performance.now() - state.start) / 1000;
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, state.mx, state.my);
      gl.uniform1f(uInt, state.intensity * state.multiplier);
      const arr = new Float32Array(6 * 3);
      for (let i = 0; i < 6; i++) {
        if (i < state.clicks.length) {
          const c = state.clicks[i];
          arr[i*3] = c.x; arr[i*3+1] = c.y; arr[i*3+2] = t - c.t;
        } else {
          arr[i*3+2] = 999;
        }
      }
      gl.uniform3fv(uClicks, arr);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return {
      canvas, gl,
      setIntensity(t) { state.targetIntensity = Math.max(0, t); },
      setMultiplier(m) { state.multiplier = Math.max(0, m); },
      setClicksEnabled(b) { state.clicksEnabled = !!b; },
      pulse(x, y) {
        state.clicks.push({ x, y, t: (performance.now() - state.start) / 1000 });
        if (state.clicks.length > 6) state.clicks.shift();
      }
    };
  }

  root.Nervures = { mount };
})(window);

// Export ES ajouté pour le build Vite — le code ci-dessus est inchangé.
export default window.Nervures;
