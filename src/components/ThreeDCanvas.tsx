import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Play, Pause, RotateCcw } from 'lucide-react';
import { ModelType } from '../data/threeDModelsData';

interface ThreeDCanvasProps {
  modelType: ModelType;
  accentColor?: string;
  proceduralTheme?: string;
  selectedPartIndex?: number | null;
  keyParts?: { name: string; nameEn?: string; desc: string }[];
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const ThreeDCanvas: React.FC<ThreeDCanvasProps> = ({
  modelType,
  accentColor = '#818cf8',
  proceduralTheme = 'biological_organ',
  selectedPartIndex = null,
  keyParts = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [zoom, setZoom] = useState(1);
  const anglesRef = useRef({ x: 0.3, y: 0.5 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  const resetCamera = () => {
    anglesRef.current = { x: 0.3, y: 0.5 };
    setZoom(1);
  };

  // Touch and Mouse rotation handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    anglesRef.current.y += dx * 0.012;
    anglesRef.current.x += dy * 0.012;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseRef.current.x;
    const dy = e.touches[0].clientY - lastMouseRef.current.y;
    anglesRef.current.y += dx * 0.014;
    anglesRef.current.x += dy * 0.014;
    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // 3D Projection Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Deep space ambient background
      ctx.fillStyle = '#070b16';
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid stars / coordinate dots
      ctx.fillStyle = 'rgba(99, 102, 241, 0.08)';
      for (let gx = 40; gx < width; gx += 50) {
        for (let gy = 40; gy < height; gy += 50) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.32 * zoom;

      if (isRotating && !isDraggingRef.current) {
        anglesRef.current.y += 0.009;
      }
      time += 0.03;

      const cosX = Math.cos(anglesRef.current.x);
      const sinX = Math.sin(anglesRef.current.x);
      const cosY = Math.cos(anglesRef.current.y);
      const sinY = Math.sin(anglesRef.current.y);

      const project = (p: Point3D) => {
        // Rotate around Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const distance = 4.2;
        const fov = distance / (distance + z2);
        return {
          x: cx + x1 * scale * fov,
          y: cy + y2 * scale * fov,
          z: z2,
          fov
        };
      };

      // Helper function to draw glowing highlight beacon at 3D point
      const drawPartHighlight = (point: Point3D, label: string) => {
        const p = project(point);
        const pulse = (Math.sin(time * 4) + 1) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, (12 + pulse * 6) * p.fov, 0, Math.PI * 2);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * p.fov, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Label pill tag
        ctx.font = 'bold 11px Hind Siliguri, sans-serif';
        const txtWidth = ctx.measureText(label).width;
        ctx.fillStyle = 'rgba(11, 15, 29, 0.85)';
        ctx.fillRect(p.x + 8, p.y - 18, txtWidth + 14, 22);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x + 8, p.y - 18, txtWidth + 14, 22);

        ctx.fillStyle = '#38bdf8';
        ctx.fillText(label, p.x + 15, p.y - 3);
        ctx.restore();
      };

      // RENDER SPECIFIC MODELS
      if (modelType === 'dna') {
        // DNA Double Helix
        const numPairs = 24;
        const r = 0.65;
        const stepY = 0.08;
        const startY = -(numPairs * stepY) / 2;

        const strandA: { x: number; y: number; z: number; fov: number }[] = [];
        const strandB: { x: number; y: number; z: number; fov: number }[] = [];

        for (let i = 0; i < numPairs; i++) {
          const theta = i * 0.45;
          const y = startY + i * stepY;
          const pA = project({ x: r * Math.cos(theta), y, z: r * Math.sin(theta) });
          const pB = project({ x: r * Math.cos(theta + Math.PI), y, z: r * Math.sin(theta + Math.PI) });

          strandA.push(pA);
          strandB.push(pB);

          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          const isAdenine = i % 2 === 0;
          ctx.strokeStyle = isAdenine ? 'rgba(56, 189, 248, 0.75)' : 'rgba(232, 121, 249, 0.75)';
          ctx.lineWidth = 3.5 * pA.fov;
          ctx.stroke();

          // Base pair spheres
          ctx.beginPath();
          ctx.arc(pA.x, pA.y, 5 * pA.fov, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pB.x, pB.y, 5 * pB.fov, 0, Math.PI * 2);
          ctx.fillStyle = '#c084fc';
          ctx.fill();
        }

        // Ribbons
        ctx.beginPath();
        strandA.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 4.5 * zoom;
        ctx.stroke();

        ctx.beginPath();
        strandB.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 4.5 * zoom;
        ctx.stroke();

        if (selectedPartIndex === 0) drawPartHighlight({ x: r, y: 0, z: 0 }, 'সুগার-ফসফেট মেরুদণ্ড');
        if (selectedPartIndex === 1) drawPartHighlight({ x: 0, y: 0.1, z: 0 }, 'ক্ষারক জোড়া (A=T, G≡C)');

      } else if (modelType === 'neuron') {
        // Multipolar Neuron (Soma + Dendrites + Axon + Myelin Sheath + Synaptic Knobs)
        const somaPt = { x: -0.6, y: -0.3, z: 0 };
        const somaProj = project(somaPt);

        // Dendrites radiating from soma
        const dendriteAngles = [0.8, 1.4, 2.1, 2.7, 3.4, 4.0];
        dendriteAngles.forEach((ang) => {
          const dEnd = {
            x: somaPt.x + Math.cos(ang) * 0.45,
            y: somaPt.y + Math.sin(ang) * 0.45,
            z: Math.sin(ang * 2) * 0.2
          };
          const p1 = project(somaPt);
          const p2 = project(dEnd);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Sub-branch
          const subEnd = project({
            x: dEnd.x + Math.cos(ang + 0.5) * 0.2,
            y: dEnd.y + Math.sin(ang + 0.5) * 0.2,
            z: dEnd.z
          });
          ctx.beginPath();
          ctx.moveTo(p2.x, p2.y);
          ctx.lineTo(subEnd.x, subEnd.y);
          ctx.strokeStyle = '#7dd3fc';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Long Axon Shaft
        const axonPoints: Point3D[] = [];
        for (let t = 0; t <= 1; t += 0.05) {
          axonPoints.push({
            x: somaPt.x + t * 1.5,
            y: somaPt.y + t * 0.6 + Math.sin(t * 8) * 0.05,
            z: Math.cos(t * 6) * 0.1
          });
        }

        ctx.beginPath();
        axonPoints.forEach((p, i) => {
          const pt = project(p);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4 * zoom;
        ctx.stroke();

        // Myelin Sheath Sausage segments
        const myelinSegments = [0.2, 0.4, 0.6, 0.8];
        myelinSegments.forEach((t) => {
          const segPt = {
            x: somaPt.x + t * 1.5,
            y: somaPt.y + t * 0.6,
            z: 0
          };
          const segProj = project(segPt);
          ctx.beginPath();
          ctx.ellipse(segProj.x, segProj.y, 16 * segProj.fov, 8 * segProj.fov, 0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();
        });

        // Axon Terminal & Synaptic Knobs
        const termStart = axonPoints[axonPoints.length - 1];
        [-0.2, 0, 0.2].forEach((offset) => {
          const knobPt = project({ x: termStart.x + 0.25, y: termStart.y + offset, z: offset * 0.5 });
          ctx.beginPath();
          ctx.moveTo(project(termStart).x, project(termStart).y);
          ctx.lineTo(knobPt.x, knobPt.y);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(knobPt.x, knobPt.y, 5 * knobPt.fov, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
        });

        // Soma Main Body Star
        ctx.beginPath();
        ctx.arc(somaProj.x, somaProj.y, 24 * somaProj.fov, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.35)';
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Nucleus
        ctx.beginPath();
        ctx.arc(somaProj.x, somaProj.y, 10 * somaProj.fov, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.fill();

        if (selectedPartIndex === 0) drawPartHighlight(somaPt, 'কোশদেহ (Cyton/Soma)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: somaPt.x - 0.35, y: somaPt.y - 0.25, z: 0 }, 'ডেনড্রাইট (Dendrites)');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0.1, y: -0.05, z: 0 }, 'অ্যাক্সন (Axon)');
        if (selectedPartIndex === 3) drawPartHighlight({ x: -0.15, y: -0.15, z: 0 }, 'মায়েলিন সিথ (Myelin Sheath)');
        if (selectedPartIndex === 4) drawPartHighlight({ x: 0.9, y: 0.3, z: 0 }, 'সাইন্যাপটিক নব (Synaptic Knob)');

      } else if (modelType === 'heart') {
        // Human Heart Model
        const heartProj = project({ x: 0, y: 0, z: 0 });

        // Ventricles Body
        ctx.beginPath();
        ctx.moveTo(heartProj.x - 45 * zoom, heartProj.y - 10 * zoom);
        ctx.quadraticCurveTo(heartProj.x - 55 * zoom, heartProj.y + 45 * zoom, heartProj.x, heartProj.y + 75 * zoom);
        ctx.quadraticCurveTo(heartProj.x + 55 * zoom, heartProj.y + 45 * zoom, heartProj.x + 45 * zoom, heartProj.y - 10 * zoom);
        ctx.closePath();
        ctx.fillStyle = 'rgba(225, 29, 72, 0.85)';
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Septum (Interventricular groove)
        ctx.beginPath();
        ctx.moveTo(heartProj.x, heartProj.y - 5 * zoom);
        ctx.lineTo(heartProj.x, heartProj.y + 70 * zoom);
        ctx.strokeStyle = '#9f1239';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Left & Right Atria
        ctx.beginPath();
        ctx.arc(heartProj.x - 28 * zoom, heartProj.y - 25 * zoom, 26 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(190, 18, 60, 0.9)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(heartProj.x + 28 * zoom, heartProj.y - 25 * zoom, 26 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(190, 18, 60, 0.9)';
        ctx.fill();

        // Aorta Arch (Red)
        const aortaStart = project({ x: 0, y: -0.4, z: 0 });
        const aortaEnd = project({ x: 0.35, y: -0.75, z: -0.1 });
        ctx.beginPath();
        ctx.moveTo(aortaStart.x, aortaStart.y);
        ctx.quadraticCurveTo(aortaStart.x - 30 * zoom, aortaStart.y - 55 * zoom, aortaEnd.x, aortaEnd.y);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 12 * zoom;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Superior & Inferior Vena Cava (Blue)
        const vcStart = project({ x: -0.35, y: -0.75, z: 0.1 });
        const vcEnd = project({ x: -0.25, y: 0.45, z: 0.1 });
        ctx.beginPath();
        ctx.moveTo(vcStart.x, vcStart.y);
        ctx.lineTo(vcEnd.x, vcEnd.y);
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 10 * zoom;
        ctx.stroke();

        if (selectedPartIndex === 0) drawPartHighlight({ x: 0.2, y: 0.2, z: 0 }, 'বাম নিলয় (Left Ventricle)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: -0.3, y: -0.5, z: 0.1 }, 'মহাশিরা ও ডান অলিন্দ');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0.1, y: -0.7, z: 0 }, 'মহাধমনী (Aorta)');
        if (selectedPartIndex === 3) drawPartHighlight({ x: 0, y: 0, z: 0 }, 'কপাটিকা (Valves)');

      } else if (modelType === 'brain') {
        // Human Brain Model (Cerebrum + Cerebellum + Brainstem)
        const center = project({ x: 0, y: 0, z: 0 });

        // Cerebrum hemispheres with cortical gyri folds
        for (let i = -3; i <= 3; i++) {
          const yOff = i * 0.14;
          const rCurve = Math.sqrt(Math.max(0, 0.7 * 0.7 - yOff * yOff));
          ctx.beginPath();
          for (let th = 0; th <= Math.PI; th += 0.1) {
            const bx = Math.cos(th) * rCurve;
            const bz = Math.sin(th) * rCurve * 0.8;
            const wiggle = Math.sin(th * 9 + i * 2) * 0.04;
            const pt = project({ x: bx + wiggle, y: yOff - 0.1, z: bz });
            if (th === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.75)';
          ctx.lineWidth = 4 * zoom;
          ctx.stroke();
        }

        // Cerebellum (striped ribbed ball at posterior bottom)
        const cbCenter = project({ x: -0.3, y: 0.45, z: -0.1 });
        ctx.beginPath();
        ctx.ellipse(cbCenter.x, cbCenter.y, 28 * zoom, 18 * zoom, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.45)';
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        // Brainstem / Medulla Oblongata
        const bsStart = project({ x: 0, y: 0.25, z: 0 });
        const bsEnd = project({ x: 0.05, y: 0.85, z: 0 });
        ctx.beginPath();
        ctx.moveTo(bsStart.x, bsStart.y);
        ctx.lineTo(bsEnd.x, bsEnd.y);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 11 * zoom;
        ctx.lineCap = 'round';
        ctx.stroke();

        if (selectedPartIndex === 0) drawPartHighlight({ x: 0.1, y: -0.2, z: 0.2 }, 'গুরুমস্তিষ্ক (Cerebrum)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: -0.3, y: 0.45, z: -0.1 }, 'লঘুমস্তিষ্ক (Cerebellum)');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0.05, y: 0.65, z: 0 }, 'সুষুম্নাশীর্ষক (Medulla)');

      } else if (modelType === 'eye') {
        // Human Eye (Ocular Globe, Cornea, Lens, Retina, Optic Nerve)
        const eyeCenter = project({ x: 0, y: 0, z: 0 });

        // Scleral outer sphere (White/Blue)
        ctx.beginPath();
        ctx.arc(eyeCenter.x, eyeCenter.y, 65 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Retina interior back curve
        ctx.beginPath();
        ctx.arc(eyeCenter.x, eyeCenter.y, 58 * zoom, -Math.PI * 0.7, Math.PI * 0.7, false);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4 * zoom;
        ctx.stroke();

        // Cornea dome protruding forward
        const corneaCenter = project({ x: 0.6, y: 0, z: 0 });
        ctx.beginPath();
        ctx.arc(corneaCenter.x, corneaCenter.y, 30 * zoom, -Math.PI * 0.5, Math.PI * 0.5, false);
        ctx.strokeStyle = '#67e8f9';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Iris & Pupil
        const irisPt = project({ x: 0.45, y: 0, z: 0 });
        ctx.beginPath();
        ctx.arc(irisPt.x, irisPt.y, 22 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(irisPt.x, irisPt.y, 10 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        // Crystalline Biconvex Lens
        const lensPt = project({ x: 0.25, y: 0, z: 0 });
        ctx.beginPath();
        ctx.ellipse(lensPt.x, lensPt.y, 10 * zoom, 24 * zoom, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224, 242, 254, 0.7)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // Optic Nerve exit
        const nerveStart = project({ x: -0.65, y: 0.1, z: 0 });
        const nerveEnd = project({ x: -1.0, y: 0.2, z: 0 });
        ctx.beginPath();
        ctx.moveTo(nerveStart.x, nerveStart.y);
        ctx.lineTo(nerveEnd.x, nerveEnd.y);
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 10 * zoom;
        ctx.stroke();

        if (selectedPartIndex === 0) drawPartHighlight({ x: 0.6, y: 0, z: 0 }, 'কর্নিয়া (Cornea)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: 0.45, y: 0, z: 0 }, 'আইরিস ও তারারন্ধ্র');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0.25, y: 0, z: 0 }, 'ক্রিস্টালাইন লেন্স');
        if (selectedPartIndex === 3) drawPartHighlight({ x: -0.5, y: 0, z: 0 }, 'রেটিনা (Retina)');
        if (selectedPartIndex === 4) drawPartHighlight({ x: -0.85, y: 0.15, z: 0 }, 'অপটিক স্নায়ু (Optic Nerve)');

      } else if (modelType === 'atom') {
        // Bohr Atom Model
        const nucleusParticles: Point3D[] = [
          { x: 0, y: 0, z: 0 },
          { x: 0.12, y: 0.08, z: -0.05 },
          { x: -0.1, y: 0.1, z: 0.08 },
          { x: 0.08, y: -0.12, z: 0.1 },
          { x: -0.12, y: -0.06, z: -0.08 },
          { x: 0.05, y: 0.12, z: 0.1 }
        ];

        // 3 Tilted Orbitals
        const orbitalAngles = [0, Math.PI / 3, (2 * Math.PI) / 3];
        orbitalAngles.forEach((orbitAngle, idx) => {
          ctx.beginPath();
          const rOrbit = 0.95;
          const steps = 60;
          for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * Math.PI * 2;
            const x = rOrbit * Math.cos(t);
            const y = rOrbit * Math.sin(t) * Math.cos(orbitAngle);
            const z = rOrbit * Math.sin(t) * Math.sin(orbitAngle);
            const pt = project({ x, y, z });
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = idx === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(168, 85, 247, 0.45)';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Revolving electron
          const eAngle = time * 2.2 + (idx * Math.PI) / 1.5;
          const ex = rOrbit * Math.cos(eAngle);
          const ey = rOrbit * Math.sin(eAngle) * Math.cos(orbitAngle);
          const ez = rOrbit * Math.sin(eAngle) * Math.sin(orbitAngle);
          const eProj = project({ x: ex, y: ey, z: ez });

          ctx.beginPath();
          ctx.arc(eProj.x, eProj.y, 6 * eProj.fov, 0, Math.PI * 2);
          ctx.fillStyle = '#22d3ee';
          ctx.fill();
        });

        // Nucleus
        nucleusParticles.forEach((p, idx) => {
          const pt = project(p);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 9 * pt.fov, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? '#ef4444' : '#3b82f6';
          ctx.fill();
        });

        if (selectedPartIndex === 0) drawPartHighlight({ x: 0, y: 0, z: 0 }, 'নিউক্লিয়াস (Nucleus)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: 0.5, y: 0.3, z: 0 }, 'K-শক্তিস্তর');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0.9, y: 0, z: 0 }, 'L-যোজ্যতা কক্ষ');

      } else if (modelType === 'molecule') {
        // Molecule (Water / Covalent geometry)
        const centralPt = { x: 0, y: -0.1, z: 0 };
        const h1Pt = { x: -0.65, y: 0.45, z: 0.1 };
        const h2Pt = { x: 0.65, y: 0.45, z: -0.1 };

        // Covalent bonds
        const cProj = project(centralPt);
        const h1Proj = project(h1Pt);
        const h2Proj = project(h2Pt);

        ctx.beginPath();
        ctx.moveTo(cProj.x, cProj.y);
        ctx.lineTo(h1Proj.x, h1Proj.y);
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 7 * zoom;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cProj.x, cProj.y);
        ctx.lineTo(h2Proj.x, h2Proj.y);
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 7 * zoom;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Oxygen Sphere (Red)
        ctx.beginPath();
        ctx.arc(cProj.x, cProj.y, 28 * cProj.fov, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Hydrogen Spheres (White/Cyan)
        [h1Proj, h2Proj].forEach((hp) => {
          ctx.beginPath();
          ctx.arc(hp.x, hp.y, 18 * hp.fov, 0, Math.PI * 2);
          ctx.fillStyle = '#e0f2fe';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.fill();
          ctx.stroke();
        });

        // Lone pair electron lobes above central atom
        [-0.2, 0.2].forEach((offset) => {
          const lobe = project({ x: offset, y: -0.45, z: 0 });
          ctx.beginPath();
          ctx.arc(lobe.x, lobe.y, 7 * lobe.fov, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(236, 72, 153, 0.6)';
          ctx.fill();
        });

        if (selectedPartIndex === 0) drawPartHighlight(centralPt, 'কেন্দ্রীয় অক্সিজেন পরমাণু');
        if (selectedPartIndex === 1) drawPartHighlight({ x: -0.32, y: 0.17, z: 0 }, 'সমযোজী একক বন্ধন');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0, y: -0.45, z: 0 }, 'নিঃসঙ্গ ইলেকট্রন জোড় (Lone Pair)');

      } else if (modelType === 'volcano') {
        // Volcano Model (Strata Cone + Magma Conduit + Caldera)
        const coneLayers = 6;
        for (let l = 0; l < coneLayers; l++) {
          const y = 0.6 - l * 0.2;
          const rBase = 0.95 - l * 0.13;
          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.2) {
            const pt = project({ x: Math.cos(a) * rBase, y, z: Math.sin(a) * rBase });
            if (a === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = l % 2 === 0 ? '#b45309' : '#d97706';
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Central Vertical Conduit (Magma pipe)
        const vStart = project({ x: 0, y: 0.7, z: 0 });
        const vEnd = project({ x: 0, y: -0.5, z: 0 });
        ctx.beginPath();
        ctx.moveTo(vStart.x, vStart.y);
        ctx.lineTo(vEnd.x, vEnd.y);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 14 * zoom;
        ctx.stroke();

        // Caldera / Crater rim at top
        const craterProj = project({ x: 0, y: -0.5, z: 0 });
        ctx.beginPath();
        ctx.ellipse(craterProj.x, craterProj.y, 25 * zoom, 12 * zoom, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Erupting magma particles
        for (let i = 0; i < 6; i++) {
          const pY = -0.55 - ((time * 2 + i * 0.15) % 0.4);
          const pX = Math.sin(time * 3 + i) * 0.15;
          const spark = project({ x: pX, y: pY, z: 0 });
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#facc15';
          ctx.fill();
        }

        if (selectedPartIndex === 0) drawPartHighlight({ x: 0, y: 0.65, z: 0 }, 'ম্যাগমা প্রকোষ্ঠ (Magma Chamber)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: 0, y: 0, z: 0 }, 'প্রধান নির্গম নালী (Central Vent)');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0, y: -0.5, z: 0 }, 'জ্বালামুখ (Crater / Caldera)');

      } else if (modelType === 'earth') {
        // Earth Interior Layers (Crust, Mantle, Outer Core, Inner Core Cutaway)
        const earthCenter = project({ x: 0, y: 0, z: 0 });

        // Outer Crust (Blue/Green)
        ctx.beginPath();
        ctx.arc(earthCenter.x, earthCenter.y, 75 * zoom, 0, Math.PI * 2);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Mantle (Orange/Brown)
        ctx.beginPath();
        ctx.arc(earthCenter.x, earthCenter.y, 60 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217, 119, 6, 0.4)';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Liquid Outer Core (Yellow)
        ctx.beginPath();
        ctx.arc(earthCenter.x, earthCenter.y, 40 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(234, 179, 8, 0.6)';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        // Solid Inner Core (White-hot Center)
        ctx.beginPath();
        ctx.arc(earthCenter.x, earthCenter.y, 20 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        if (selectedPartIndex === 0) drawPartHighlight({ x: 0.7, y: 0, z: 0 }, 'ভূত্বক (Crust)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: 0.45, y: 0.25, z: 0 }, 'গুরুমণ্ডল (Mantle)');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0.25, y: -0.15, z: 0 }, 'বহিঃকেন্দ্রমণ্ডল (Outer Core)');
        if (selectedPartIndex === 3) drawPartHighlight({ x: 0, y: 0, z: 0 }, 'অন্তঃকেন্দ্রমণ্ডল (Inner Core)');

      } else if (modelType === 'nephron') {
        // Human Nephron Model
        const bcPt = { x: -0.7, y: -0.6, z: 0 };
        const bc = project(bcPt);
        ctx.beginPath();
        ctx.arc(bc.x, bc.y, 22 * bc.fov, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bc.x, bc.y, 11 * bc.fov, 0, Math.PI * 2);
        ctx.fillStyle = '#f87171';
        ctx.fill();

        const tubulePoints: Point3D[] = [];
        for (let t = 0; t <= 1; t += 0.02) {
          let x = -0.7 + t * 0.5 + Math.sin(t * 12) * 0.12;
          let y = -0.6 + t * 1.4;
          let z = Math.cos(t * 10) * 0.25;

          if (t > 0.4 && t < 0.7) {
            y = 0.2 + (t - 0.4) * 2.2;
            x = -0.15 + (t - 0.5) * 0.2;
          } else if (t >= 0.7) {
            y = 0.8 - (t - 0.7) * 1.8;
            x = 0.2 + Math.sin(t * 14) * 0.15;
          }
          tubulePoints.push({ x, y, z });
        }

        ctx.beginPath();
        tubulePoints.forEach((p, i) => {
          const pt = project(p);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 5 * zoom;
        ctx.lineCap = 'round';
        ctx.stroke();

        const cdStart = project({ x: 0.6, y: -0.7, z: 0 });
        const cdEnd = project({ x: 0.6, y: 0.9, z: 0 });
        ctx.beginPath();
        ctx.moveTo(cdStart.x, cdStart.y);
        ctx.lineTo(cdEnd.x, cdEnd.y);
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 7 * zoom;
        ctx.stroke();

        if (selectedPartIndex === 0) drawPartHighlight(bcPt, 'বোম্যান্স ক্যাপসুল');
        if (selectedPartIndex === 1) drawPartHighlight(bcPt, 'গ্লোমেরুলাস');
        if (selectedPartIndex === 2) drawPartHighlight({ x: -0.1, y: 0.7, z: 0 }, 'হেনলির লুপ (Loop of Henle)');
        if (selectedPartIndex === 3) drawPartHighlight({ x: 0.6, y: 0.1, z: 0 }, 'সংগ্রাহী নালী');

      } else if (modelType === 'chloroplast') {
        // Chloroplast Organelle
        const outerProj = project({ x: 0, y: 0, z: 0 });
        ctx.beginPath();
        ctx.ellipse(outerProj.x, outerProj.y, 85 * zoom, 55 * zoom, anglesRef.current.x * 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.fill();
        ctx.stroke();

        const granaColumns: Point3D[] = [
          { x: -0.35, y: -0.1, z: 0 },
          { x: 0, y: 0.05, z: 0.1 },
          { x: 0.35, y: -0.05, z: -0.1 }
        ];

        granaColumns.forEach((col) => {
          for (let d = -2; d <= 2; d++) {
            const diskProj = project({ x: col.x, y: col.y + d * 0.08, z: col.z });
            ctx.beginPath();
            ctx.ellipse(diskProj.x, diskProj.y, 18 * diskProj.fov, 6 * diskProj.fov, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#059669';
            ctx.strokeStyle = '#6ee7b7';
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();
          }
        });

        if (selectedPartIndex === 0) drawPartHighlight({ x: 0, y: 0.05, z: 0.1 }, 'গ্রানা (Grana)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: -0.1, y: -0.2, z: 0 }, 'স্ট্রোমা (Stroma)');

      } else if (modelType === 'lens') {
        // Convex Lens Optics
        const cProj = project({ x: 0, y: 0, z: 0 });

        // Principal Axis
        ctx.beginPath();
        ctx.moveTo(cProj.x - 120 * zoom, cProj.y);
        ctx.lineTo(cProj.x + 120 * zoom, cProj.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Biconvex Lens Glass
        ctx.beginPath();
        ctx.ellipse(cProj.x, cProj.y, 18 * zoom, 65 * zoom, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        // Converging Rays
        const rayYs = [-35, -18, 18, 35];
        const focusProj = project({ x: 0.7, y: 0, z: 0 });
        rayYs.forEach((ry) => {
          ctx.beginPath();
          ctx.moveTo(cProj.x - 110 * zoom, cProj.y + ry * zoom);
          ctx.lineTo(cProj.x, cProj.y + ry * zoom);
          ctx.lineTo(focusProj.x, focusProj.y);
          ctx.lineTo(focusProj.x + 50 * zoom, focusProj.y - ry * 0.7 * zoom);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        if (selectedPartIndex === 0) drawPartHighlight({ x: -0.5, y: 0, z: 0 }, 'প্রধান অক্ষ (Principal Axis)');
        if (selectedPartIndex === 1) drawPartHighlight({ x: 0, y: 0, z: 0 }, 'আলোক কেন্দ্র (Optical Center)');
        if (selectedPartIndex === 2) drawPartHighlight({ x: 0.7, y: 0, z: 0 }, 'প্রধান ফোকাস (Focus F)');

      } else {
        // Generic / Procedural 3D model engine for custom topics
        // Multi-layered geometric wireframe & functional cores
        const rings = 5;
        for (let r = 1; r <= rings; r++) {
          const rad = r * 0.18;
          ctx.beginPath();
          for (let th = 0; th <= Math.PI * 2; th += 0.2) {
            const pt = project({
              x: Math.cos(th) * rad,
              y: Math.sin(th) * rad * Math.cos(r * 0.5 + time * 0.5),
              z: Math.sin(th) * rad * Math.sin(r * 0.5 + time * 0.5)
            });
            if (th === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = r % 2 === 0 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(168, 85, 247, 0.6)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Central Core
        const core = project({ x: 0, y: 0, z: 0 });
        ctx.beginPath();
        ctx.arc(core.x, core.y, 20 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.fill();

        if (selectedPartIndex !== null && selectedPartIndex >= 0 && keyParts[selectedPartIndex]) {
          drawPartHighlight({ x: 0.4, y: -0.2, z: 0 }, keyParts[selectedPartIndex].name);
        }
      }

      // Compass Axis Indicator (Bottom left)
      const axOrigin = { x: 35, y: height - 35 };
      const axX = { x: axOrigin.x + 20 * cosY, y: axOrigin.y + 20 * sinX * sinY };
      const axY = { x: axOrigin.x - 20 * sinY * sinX, y: axOrigin.y - 20 * cosX };

      ctx.beginPath();
      ctx.moveTo(axOrigin.x, axOrigin.y);
      ctx.lineTo(axX.x, axX.y);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(axOrigin.x, axOrigin.y);
      ctx.lineTo(axY.x, axY.y);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [modelType, isRotating, zoom, selectedPartIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 sm:h-84 rounded-2xl overflow-hidden bg-[#070b16] border border-indigo-900/40 shadow-inner group select-none touch-none"
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating 3D Control overlay */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#0b1020]/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-lg z-10">
        <button
          onClick={() => setIsRotating((prev) => !prev)}
          title={isRotating ? 'ঘূর্ণন থামান' : 'ঘূর্ণন চালু করুন'}
          className={`p-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            isRotating ? 'bg-purple-600/30 text-purple-300' : 'bg-slate-800 text-slate-400'
          }`}
        >
          {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => setZoom((prev) => Math.min(prev + 0.15, 1.8))}
          title="জুম ইন"
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setZoom((prev) => Math.max(prev - 0.15, 0.55))}
          title="জুম আউট"
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={resetCamera}
          title="ক্যামেরা রিসেট করুন"
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      {/* Interactive Drag Hint */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5 pointer-events-none z-10">
        <RotateCw className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>স্পর্শ করে ৩৬০° ঘোরান ও জুম করুন</span>
      </div>
    </div>
  );
};
