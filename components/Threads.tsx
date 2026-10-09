"use client";

import { useEffect, useRef } from "react";
import type { Renderer, Program, Mesh, Color } from "ogl";

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  angle?: number;
  converge?: number;
  reach?: number;
  opacity?: number;
  lineWidth?: number;
  lineBlur?: number;
  enableMouseInteraction?: boolean;
  className?: string;
}

const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float iTime;
  uniform vec3 iResolution;
  uniform vec3 uColor;
  uniform float uAmplitude;
  uniform float uDistance;
  uniform vec2 uMouse;
  uniform float uAngle;
  uniform float uConverge;
  uniform float uReach;
  uniform float uOpacity;
  uniform float uLineWidth;
  uniform float uLineBlur;

  #define PI 3.1415926538

  const int u_line_count = 40;

  float Perlin2D(vec2 P) {
      vec2 Pi = floor(P);
      vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
      vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
      Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
      Pt += vec2(26.0, 161.0).xyxy;
      Pt *= Pt;
      Pt = Pt.xzxz * Pt.yyww;
      vec4 hash_x = fract(Pt * (1.0 / 951.135664));
      vec4 hash_y = fract(Pt * (1.0 / 642.949883));
      vec4 grad_x = hash_x - 0.49999;
      vec4 grad_y = hash_y - 0.49999;
      vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
          * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
      grad_results *= 1.4142135623730950;
      vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
                 * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
      vec4 blend2 = vec4(blend, vec2(1.0 - blend));
      return dot(grad_results, blend2.zxzx * blend2.wwyy);
  }

  float pixel(float count, vec2 resolution) {
      return (1.0 / max(resolution.x, resolution.y)) * count;
  }

  float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance, float converge) {
      float split_offset = (perc * 0.4);
      float split_point = 0.1 + split_offset;

      float amplitude_normal = smoothstep(split_point, 0.7, st.x);
      float amplitude_strength = 0.5;
      float finalAmplitude = amplitude_normal * amplitude_strength
                             * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

      float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
      float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

      float xnoise = mix(
          Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
          Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
          st.x * 0.3
      );

      // All lines pinch to a single point at the left edge, then fan out to
      // their own vertical slot as x increases (a "burst from a dot" start).
      float fan = smoothstep(0.0, max(converge, 0.001), st.x);

      float y = 0.5 + (perc - 0.5) * distance * fan + xnoise / 2.0 * finalAmplitude * fan;

      float line_start = smoothstep(
          y + (width / 2.0) + (uLineBlur * pixel(1.0, iResolution.xy) * blur),
          y,
          st.y
      );

      float line_end = smoothstep(
          y,
          y - (width / 2.0) - (uLineBlur * pixel(1.0, iResolution.xy) * blur),
          st.y
      );

      return clamp(
          (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
          0.0,
          1.0
      );
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 uv = fragCoord / iResolution.xy;

      // A small, uniform tilt of the whole band, nothing fancier.
      vec2 rc = uv - 0.5;
      float ca = cos(uAngle);
      float sa = sin(uAngle);
      uv = vec2(ca * rc.x - sa * rc.y, sa * rc.x + ca * rc.y) + 0.5;

      // Sample a narrower slice of the pattern's horizontal range than what
      // fills the screen, so the natural fray/fade-out point (which happens
      // at a roughly fixed fraction of that range) lands past the visible
      // edge instead of inside it. Line width stays based on the real
      // iResolution below, so thickness is untouched.
      vec2 uvReach = vec2(uv.x / max(uReach, 0.0001), uv.y);

      float line_strength = 1.0;
      for (int i = 0; i < u_line_count; i++) {
          float p = float(i) / float(u_line_count);
          line_strength *= (1.0 - lineFn(
              uvReach,
              uLineWidth * pixel(1.0, iResolution.xy) * (1.0 - p),
              p,
              (PI * 1.0) * p,
              uMouse,
              iTime,
              uAmplitude,
              uDistance,
              uConverge
          ));
      }

      float colorVal = (1.0 - line_strength) * uOpacity;
      fragColor = vec4(uColor * colorVal, colorVal);
  }

  void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

export default function Threads({
  color = [0.47, 0.44, 0.4],
  amplitude = 1,
  distance = 0,
  angle = 0,
  converge = 0,
  reach = 1,
  opacity = 1,
  lineWidth = 7,
  lineBlur = 10,
  enableMouseInteraction = false,
  className,
}: ThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ color, amplitude, distance, angle, converge, reach, opacity, lineWidth, lineBlur, enableMouseInteraction });
  // Updated synchronously during render (not in a useEffect) so the
  // rAF-driven draw loop below never reads a stale value for a frame after
  // a step change - a useEffect here would run one paint late.
  propsRef.current = { color, amplitude, distance, angle, converge, reach, opacity, lineWidth, lineBlur, enableMouseInteraction };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroyed = false;
    let renderer: Renderer;
    let program: Program;
    let mesh: Mesh;
    let animationId: number;
    let isVisible = true;
    const currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];
    const cleanupFns: Array<() => void> = [];

    (async () => {
      const { Renderer, Program, Mesh: OglMesh, Triangle, Color: OglColor } = await import("ogl");
      if (destroyed || !container) return;

      renderer = new Renderer({ alpha: true });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      container.appendChild(gl.canvas);
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new OglColor(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
          },
          uColor: { value: new OglColor(...propsRef.current.color) },
          uAmplitude: { value: propsRef.current.amplitude },
          uDistance: { value: propsRef.current.distance },
          uAngle: { value: (propsRef.current.angle * Math.PI) / 180 },
          uConverge: { value: propsRef.current.converge },
          uReach: { value: propsRef.current.reach },
          uOpacity: { value: propsRef.current.opacity },
          uLineWidth: { value: propsRef.current.lineWidth },
          uLineBlur: { value: propsRef.current.lineBlur },
          uMouse: { value: new Float32Array([0.5, 0.5]) },
        },
      });
      mesh = new OglMesh(gl, { geometry, program });

      const MAX_RENDER_DIM = 1920;
      const resize = () => {
        const w = Math.max(container.clientWidth, 1);
        const h = Math.max(container.clientHeight, 1);
        const baseDpr = Math.min(window.devicePixelRatio || 1, 2);
        const longestSide = Math.max(w, h) * baseDpr;
        const dpr = longestSide > MAX_RENDER_DIM ? (baseDpr * MAX_RENDER_DIM) / longestSide : baseDpr;
        renderer.dpr = dpr;
        renderer.setSize(w, h);
        const res = program.uniforms.iResolution.value as Color;
        res.r = gl.canvas.width;
        res.g = gl.canvas.height;
        res.b = gl.canvas.width / gl.canvas.height;
      };
      resize();

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      cleanupFns.push(() => resizeObserver.disconnect());
      window.addEventListener("resize", resize);
      cleanupFns.push(() => window.removeEventListener("resize", resize));

      const onPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        targetMouse = [(e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height];
      };
      const onPointerLeave = () => {
        targetMouse = [0.5, 0.5];
      };
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
      cleanupFns.push(() => {
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      io.observe(container);
      cleanupFns.push(() => io.disconnect());

      const loop = (t: number) => {
        animationId = requestAnimationFrame(loop);
        if (!isVisible || document.hidden) return;
        const p = propsRef.current;

        (program.uniforms.uColor.value as Color).set(...p.color);
        program.uniforms.uAmplitude.value = p.amplitude;
        program.uniforms.uDistance.value = p.distance;
        program.uniforms.uAngle.value = (p.angle * Math.PI) / 180;
        program.uniforms.uConverge.value = p.converge;
        program.uniforms.uReach.value = p.reach;
        program.uniforms.uOpacity.value = p.opacity;
        program.uniforms.uLineWidth.value = p.lineWidth;
        program.uniforms.uLineBlur.value = p.lineBlur;

        if (p.enableMouseInteraction) {
          const smoothing = 0.05;
          currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
          currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
          (program.uniforms.uMouse.value as Float32Array)[0] = currentMouse[0];
          (program.uniforms.uMouse.value as Float32Array)[1] = currentMouse[1];
        } else {
          (program.uniforms.uMouse.value as Float32Array)[0] = 0.5;
          (program.uniforms.uMouse.value as Float32Array)[1] = 0.5;
        }
        program.uniforms.iTime.value = t * 0.001;

        renderer.render({ scene: mesh });
      };
      animationId = requestAnimationFrame(loop);
      cleanupFns.push(() => cancelAnimationFrame(animationId));
      cleanupFns.push(() => {
        const lose = gl.getExtension("WEBGL_lose_context");
        lose?.loseContext();
        if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
      });
    })();

    return () => {
      destroyed = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }} />;
}
