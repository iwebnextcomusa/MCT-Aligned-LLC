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

  // Define key nodes in the MCT Aligned model
  const hubs: HubNode[] = [
    {
      id: "supplier",
      name: "1. Worker & Creator Pool",
      cx: 0.22,
      cy: 0.72,
      color: "#28A745",
      description: "Service producers earning fair direct value without middleman erosion."
    },
    {
      id: "pipeline",
      name: "2. MCT Aligned Pipeline",
      cx: 0.50,
      cy: 0.50,
      color: "#123456",
      description: "Direct connection pipeline minimizing operational overhead and markups."
    },
    {
      id: "buyer",
      name: "3. Direct Client Terminal",
      cx: 0.78,
      cy: 0.28,
      color: "#007BFF",
      description: "Buyer organizations and clients receiving direct quality and cost efficiency."
    }
  ];

  useEffect(() => {
    scrollRef.current = scrollPercent;
  }, [scrollPercent]);

  // Pre-load the high-quality business model graphic
  useEffect(() => {
    const img = new Image();
    img.src = "/src/assets/images/mct_business_model_optimization_1782155040408.jpg";
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
          setHoveredNodeInfo("Fragmented ecosystem: Isolated workers & costly intermediaries");
        } else if (scrollRef.current < 0.70) {
          setHoveredNodeInfo("Realigning paths: Decompressing secondary administrative markups");
        } else {
          setHoveredNodeInfo("MCT Aligned direct channels: Stable buyer-to-worker pipeline");
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

      // 1. Clear background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw business model image (aspect filled)
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

        ctx.globalAlpha = 0.88; // Subtle fade for elegant blending with neon lines
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.globalAlpha = 1.0;
      }

      // 3. Smoothly lerp current scroll percent to avoid jerky transitions
      currentScrollRef.current += (scrollRef.current - currentScrollRef.current) * 0.08;

      // 4. Draw Connecting Stream Paths (MCT Direct Alignment Tube)
      // Line from supplier center to pipeline center to buyer center
      ctx.beginPath();
      ctx.moveTo(hubs[0].cx * width, hubs[0].cy * height);
      ctx.lineTo(hubs[1].cx * width, hubs[1].cy * height);
      ctx.lineTo(hubs[2].cx * width, hubs[2].cy * height);
      
      const gradient = ctx.createLinearGradient(
        hubs[0].cx * width, hubs[0].cy * height,
        hubs[2].cx * width, hubs[2].cy * height
      );
      gradient.addColorStop(0, "#28A745");
      gradient.addColorStop(0.5, "#123456");
      gradient.addColorStop(1, "#007BFF");
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(40, 167, 69, 0.3)";
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Draw dashed active overlay inside the tube for energy flow
      ctx.beginPath();
      ctx.moveTo(hubs[0].cx * width, hubs[0].cy * height);
      ctx.lineTo(hubs[1].cx * width, hubs[1].cy * height);
      ctx.lineTo(hubs[2].cx * width, hubs[2].cy * height);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -timeRef.current * 25;
      ctx.stroke();
      ctx.setLineDash([]); // reset dashees

      // 5. Draw Animated Stream Energy Pulse guided by Scroll
      const t = currentScrollRef.current;
      let fx = 0, fy = 0;
      if (t < 0.5) {
        // Interpolate Hub 1 -> Hub 2
        const nt = t * 2;
        fx = (hubs[0].cx + (hubs[1].cx - hubs[0].cx) * nt) * width;
        fy = (hubs[0].cy + (hubs[1].cy - hubs[0].cy) * nt) * height;
      } else {
        // Interpolate Hub 2 -> Hub 3
        const nt = (t - 0.5) * 2;
        fx = (hubs[1].cx + (hubs[2].cx - hubs[1].cx) * nt) * width;
        fy = (hubs[1].cy + (hubs[2].cy - hubs[1].cy) * nt) * height;
      }

      // Add miniature float offset
      const pulseFloatY = Math.sin(timeRef.current * 4) * 2;
      const finalFx = fx;
      const finalFy = fy + pulseFloatY;

      // Outer glow of pulse
      const pulseGlow = ctx.createRadialGradient(finalFx, finalFy, 0, finalFx, finalFy, 18);
      pulseGlow.addColorStop(0, "rgba(40, 167, 69, 0.8)");
      pulseGlow.addColorStop(0.5, "rgba(18, 52, 86, 0.4)");
      pulseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = pulseGlow;
      ctx.beginPath();
      ctx.arc(finalFx, finalFy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Core center of pulse
      ctx.fillStyle = "#28A745";
      ctx.beginPath();
      ctx.arc(finalFx, finalFy, 6, 0, Math.PI * 2);
      ctx.fill();

      // 6. Draw interactive Hub Circles with premium vector graphics
      hubs.forEach((hub) => {
        const hx = hub.cx * width;
        const hy = hub.cy * height;
        const isActive = activeHubId === hub.id;

        // Base pulsing variable
        const pulse = Math.sin(timeRef.current * 3 + (hub.id === "pipeline" ? 1 : 2)) * 4;
        const ringRadius = 24 + (isActive ? 6 : 0) + pulse;

        // Subtle outer transparent halo ring
        ctx.beginPath();
        ctx.arc(hx, hy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = hub.color;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.globalAlpha = isActive ? 0.6 : 0.25;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Interactive core button
        ctx.beginPath();
        ctx.arc(hx, hy, 12, 0, Math.PI * 2);
        ctx.fillStyle = hub.color;
        ctx.shadowBlur = isActive ? 12 : 4;
        ctx.shadowColor = hub.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Inner white dot
        ctx.beginPath();
        ctx.arc(hx, hy, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Elegant minimal label tag
        ctx.fillStyle = "rgba(18, 52, 86, 0.9)";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Draw backing label badge
        const text = hub.name.toUpperCase();
        const textWidth = ctx.measureText(text).width;
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.strokeStyle = "rgba(18, 52, 86, 0.15)";
        ctx.beginPath();
        ctx.roundRect(hx - textWidth/2 - 8, hy - 32, textWidth + 16, 16, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#123456";
        ctx.fillText(text, hx, hy - 24);
      });

      // 7. Interactive cursor particle trigger
      if (mouseRef.current.isHovering) {
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 30, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(40, 167, 69, 0.08)";
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
      {/* 3D Render Host inside layout - targets EXACT focus Selector DOM structure */}
      <div id="three-dom-viewport" ref={containerRef} className="w-full h-full flex-grow cursor-crosshair rounded-2xl bg-white border border-slate-150 relative shadow-md overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full transition duration-300"
          id="mct-model-canvas"
        />
      </div>

      {/* Elegant label indicating the active business optimization structure */}
      <div className="absolute top-4 left-4 pointer-events-none bg-white/95 border border-slate-250/80 rounded-lg px-3 py-1.5 backdrop-blur-md shadow-md z-10 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#28A745] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#123456] font-bold">
            Value Flow Pipeline
          </span>
        </div>
      </div>

      {/* Interactive dynamic readout footer driven by hover & scroll alignment */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none transition-all duration-300 z-10">
        <div className="bg-white/95 border border-slate-200 rounded-xl p-3 shadow-lg backdrop-blur-sm text-center">
          <p className="text-xs font-mono text-slate-800 font-bold min-h-[16px] leading-tight transition-all duration-150">
            {hoveredNodeInfo || "Hover the hubs or scroll the page to track optimized transaction delivery"}
          </p>
          <div className="mt-2 w-full bg-slate-100 h-[3px] rounded-full overflow-hidden">
            <div 
              className="bg-[#28A745] h-full transition-all duration-200" 
              style={{ width: `${Math.round(scrollPercent * 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1.5 text-[9px] text-[#123456] font-mono font-bold">
            <span>SCATTERED TRADING</span>
            <span>{Math.round(scrollPercent * 100)}% DIRECT VALUE ALIGNED</span>
            <span>ZERO OVERHEAD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
