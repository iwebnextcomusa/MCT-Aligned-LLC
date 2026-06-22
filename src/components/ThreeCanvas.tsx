import React, { useEffect, useRef, useState } from "react";

interface ThreeCanvasProps {
  scrollPercent: number; // 0 to 1 indicating page scroll progress
}

interface HubNode {
  id: string;
  name: string;
  cx: number;
  cy: number;
  color: string;
  description: string;
}

export default function ThreeCanvas({ scrollPercent }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [hoveredNodeInfo, setHoveredNodeInfo] = useState<string | null>(null);
  const [activeHubId, setActiveHubId] = useState<string | null>(null);

  // Synced state variables to read within the requestAnimationFrame loop
  const scrollRef = useRef(scrollPercent);
  const currentScrollRef = useRef(scrollPercent);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const timeRef = useRef(0);

  // Define key nodes optimized strictly for the ShareLoop Orange & Green production model
  const hubs: HubNode[] = [
    {
      id: "supplier",
      name: "1. Raw Work & Production",
      cx: 0.22,
      cy: 0.72,
      color: "#22c55e", // Vibrant Green
      description: "Original producers and builders receiving full direct funding."
    },
    {
      id: "pipeline",
      name: "2. ShareLoop Direct Batch",
      cx: 0.50,
      cy: 0.50,
      color: "#f97316", // Brilliant Orange
      description: "Direct batch connection pipeline removing 5.6 intermediate stages."
    },
    {
      id: "buyer",
      name: "3. Direct Value Terminal",
      cx: 0.78,
      cy: 0.28,
      color: "#22c55e", // Supporting Vibrant Green
      description: "Buyers retaining maximum purchasing power at direct production costs."
    }
  ];

  useEffect(() => {
    scrollRef.current = scrollPercent;
  }, [scrollPercent]);

  // Pre-load the high-quality corporate board landscape
  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/images/corporate_aligned_landscape_1782155335259.jpg";
    img.referrerPolicy = "no-referrer";
    img.onload = () => {
      imageRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Standard high-DPI canvas setup to prevent blurry renders
    const setupCanvasSize = () => {
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 450;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    setupCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      setupCanvasSize();
    });
    resizeObserver.observe(container);

    // Track mouse on canvas to update active hubs and hovering feedback
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      mouseRef.current = { x: mouseX, y: mouseY, isHovering: true };

      // Find if cursor is close to any of the hubs
      let foundHub: HubNode | null = null;
      for (const hub of hubs) {
        const hx = hub.cx * rect.width;
        const hy = hub.cy * rect.height;
        const distance = Math.hypot(mouseX - hx, mouseY - hy);
        if (distance < 36) {
          foundHub = hub;
          break;
        }
      }

      if (foundHub) {
        setActiveHubId(foundHub.id);
        setHoveredNodeInfo(`${foundHub.name}: ${foundHub.description}`);
      } else {
        setActiveHubId(null);
        // Default readout driven by vertical scroll state
        if (scrollRef.current < 0.25) {
          setHoveredNodeInfo("Traditional chain: 5.6 paid margins layer intermediate bloat.");
        } else if (scrollRef.current < 0.70) {
          setHoveredNodeInfo("Shared Production: Funding batches directly to squeeze out middlemen.");
        } else {
          setHoveredNodeInfo("Direct Alignment: Creators retain value & buyers secure wholesale price.");
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      setActiveHubId(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Dynamic animation loop draws everything on 2D canvas dynamically at 60fps
    let animationFrameId: number;
    
    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      timeRef.current += 0.015;

      // 1. Clear background block (dark color scheme)
      ctx.fillStyle = "#050811";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw background picture under fine blend
      if (imageRef.current) {
        const img = imageRef.current;
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let drawW = width;
        let drawH = height;
        let drawX = 0;
        let drawY = 0;

        if (canvasRatio > imgRatio) {
          drawH = width / imgRatio;
          drawY = (height - drawH) / 2;
        } else {
          drawW = height * imgRatio;
          drawX = (width - drawW) / 2;
        }

        ctx.globalAlpha = 0.25; // Transparent subtle corporate overlay to capture high-tech board look
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.globalAlpha = 1.0;
      }

      // Draw futuristic visual grid background on canvas
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Smoothly lerp current scroll percent to avoid jerky transitions
      currentScrollRef.current += (scrollRef.current - currentScrollRef.current) * 0.08;

      // 4. Draw Connecting Stream Paths (ShareLoop Orange and Green Pipeline)
      ctx.beginPath();
      ctx.moveTo(hubs[0].cx * width, hubs[0].cy * height);
      ctx.lineTo(hubs[1].cx * width, hubs[1].cy * height);
      ctx.lineTo(hubs[2].cx * width, hubs[2].cy * height);
      
      const gradient = ctx.createLinearGradient(
        hubs[0].cx * width, hubs[0].cy * height,
        hubs[2].cx * width, hubs[2].cy * height
      );
      gradient.addColorStop(0, "#22c55e");  // Green
      gradient.addColorStop(0.5, "#f97316"); // Orange middle
      gradient.addColorStop(1, "#22c55e");  // Green
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(249, 115, 22, 0.4)";
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Draw flowing dashes for direct transactions energy line
      ctx.beginPath();
      ctx.moveTo(hubs[0].cx * width, hubs[0].cy * height);
      ctx.lineTo(hubs[1].cx * width, hubs[1].cy * height);
      ctx.lineTo(hubs[2].cx * width, hubs[2].cy * height);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 15]);
      ctx.lineDashOffset = -timeRef.current * 30;
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // 5. Draw Animated Stream Energy Pulse guided by Scroll
      const t = currentScrollRef.current;
      let fx = 0, fy = 0;
      if (t < 0.5) {
        const nt = t * 2;
        fx = (hubs[0].cx + (hubs[1].cx - hubs[0].cx) * nt) * width;
        fy = (hubs[0].cy + (hubs[1].cy - hubs[0].cy) * nt) * height;
      } else {
        const nt = (t - 0.5) * 2;
        fx = (hubs[1].cx + (hubs[2].cx - hubs[1].cx) * nt) * width;
        fy = (hubs[1].cy + (hubs[2].cy - hubs[1].cy) * nt) * height;
      }

      const pulseFloatY = Math.sin(timeRef.current * 5) * 3;
      const finalFx = fx;
      const finalFy = fy + pulseFloatY;

      // Outer orange glow pulse
      const pulseGlow = ctx.createRadialGradient(finalFx, finalFy, 0, finalFx, finalFy, 24);
      pulseGlow.addColorStop(0, "rgba(249, 115, 22, 0.8)");
      pulseGlow.addColorStop(0.5, "rgba(34, 197, 150, 0.3)");
      pulseGlow.addColorStop(1, "rgba(5, 8, 17, 0)");
      ctx.fillStyle = pulseGlow;
      ctx.beginPath();
      ctx.arc(finalFx, finalFy, 24, 0, Math.PI * 2);
      ctx.fill();

      // Core white of pulse
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(finalFx, finalFy, 6, 0, Math.PI * 2);
      ctx.fill();

      // 6. Draw interactive Hub Circles
      hubs.forEach((hub) => {
        const hx = hub.cx * width;
        const hy = hub.cy * height;
        const isActive = activeHubId === hub.id;

        // Pulsing circles
        const pulse = Math.sin(timeRef.current * 4 + (hub.id === "pipeline" ? 2 : 1)) * 3;
        const ringRadius = 24 + (isActive ? 8 : 0) + pulse;

        // Outer halo
        ctx.beginPath();
        ctx.arc(hx, hy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = hub.color;
        ctx.lineWidth = isActive ? 3 : 1.5;
        ctx.globalAlpha = isActive ? 0.8 : 0.35;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Interactive core button
        ctx.beginPath();
        ctx.arc(hx, hy, 14, 0, Math.PI * 2);
        ctx.fillStyle = hub.color;
        ctx.shadowBlur = isActive ? 20 : 8;
        ctx.shadowColor = hub.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Inner white ring/dot
        ctx.beginPath();
        ctx.arc(hx, hy, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Label tags in modern mono dark badge
        const text = hub.name.toUpperCase();
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const textWidth = ctx.measureText(text).width;
        
        // Draw backing dark-glass badge
        ctx.fillStyle = "rgba(10, 15, 30, 0.92)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.roundRect(hx - textWidth/2 - 8, hy - 34, textWidth + 16, 17, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = hub.color;
        ctx.fillText(text, hx, hy - 25);
      });

      // 7. Ripple trace on hover coordinates
      if (mouseRef.current.isHovering) {
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(249, 115, 22, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeHubId]);

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col justify-between" container-id="canvas-box">
      {/* Dark Render Host matching viewport details exactly */}
      <div id="three-dom-viewport" ref={containerRef} className="w-full h-full flex-grow cursor-crosshair rounded-2xl bg-[#090d16] border border-slate-800/80 relative shadow-2xl overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full transition duration-300"
          id="mct-model-canvas"
        />
      </div>

      {/* Flag card showing live model status */}
      <div className="absolute top-4 left-4 pointer-events-none bg-slate-950/90 border border-slate-800 rounded-lg px-3 py-1.5 backdrop-blur-md shadow-lg z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
            ShareLoop Platform
          </span>
        </div>
      </div>

      {/* Floating dynamic diagnostic panel displaying information directly from prompt image details */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none transition-all duration-300 z-10">
        <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl p-3 shadow-2xl backdrop-blur-md text-center">
          <p className="text-xs font-mono text-slate-100 font-bold min-h-[16px] leading-relaxed transition-all duration-150">
            {hoveredNodeInfo || "Hover system nodes or scroll the page to check how we flip the supply chain"}
          </p>
          <div className="mt-2 w-full bg-slate-900 h-[4px] rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-green-500 h-full transition-all duration-300" 
              style={{ width: `${Math.round(scrollPercent * 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1.5 text-[9px] text-slate-400 font-mono font-bold">
            <span className="text-orange-500">5.6 REDUNDANT STAGES</span>
            <span className="text-slate-200">{Math.round(scrollPercent * 100)}% FLIPPED VALUE</span>
            <span className="text-green-500">MAX CREATOR COMP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
