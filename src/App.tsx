import React, { useEffect, useState, useRef } from "react";
import {
  Sliders,
  Network,
  Compass,
  TrendingDown,
  Cpu,
  ShieldCheck,
  Eye,
  Users,
  Phone,
  Mail,
  ArrowUpRight,
  Check,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

import ThreeCanvas from "./components/ThreeCanvas";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";
import { PrivacyPolicy, TermsOfService } from "./components/Modals";

import {
  SERVICES,
  VALUES,
  FAQS,
  TESTIMONIALS,
  Service,
} from "./data";

export default function App() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Accordion FAQ states
  const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(0);

  // Expanded Service Card details
  const [selectedServiceId, setSelectedServiceId] = useState<string>("software-automations");

  // Legal Modals states
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Video playback states
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lead contact form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [formSuccessMsg, setFormSuccessMsg] = useState("");

  // Track page scroll progress for interactive 3D transformations
  useEffect(() => {
    // Dynamic page title lock
    document.title = "iWebNext";

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(progress);

      // Active section detection for navigation
      const sections = ["home", "about", "services", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play failed:", err));
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Submit Lead via direct fetch to our backend Express proxy
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormStatus("error");
      setFormErrorMsg("Please write your Name, Email, and Message before submitting.");
      return;
    }

    setFormStatus("submitting");
    setFormErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          email: formEmail.trim(),
          phone: formPhone.trim(),
          message: formMessage.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        setFormStatus("success");
        setFormSuccessMsg(data.message || "Your inquiry has been successfully transmitted. We will contact you shortly.");
        // Clear input form
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormMessage("");
      } else {
        setFormStatus("error");
        setFormErrorMsg(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setFormStatus("error");
      setFormErrorMsg("An unexpected failure occurred while submitting. Please call us directly at 580-826-7475.");
    }
  };

  // Dynamic Icon resolver helper matching ShareLoop values
  const getIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case "Sliders": return <Sliders className={className} />;
      case "Network": return <Network className={className} />;
      case "Compass": return <Compass className={className} />;
      case "TrendingDown": return <TrendingDown className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "ShieldCheck": return <ShieldCheck className={className} />;
      case "Eye": return <Eye className={className} />;
      case "Users": return <Users className={className} />;
      default: return <Check className={className} />;
    }
  };

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  return (
    <div className="min-h-screen text-slate-100 bg-[#050811] font-sans selection:bg-orange-500/20 selection:text-orange-400 relative overflow-x-hidden">
      
      {/* 1. Header Navigation in Dark Theme */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900 bg-[#050811]/90 backdrop-blur-md shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Branding */}
          <div 
            onClick={() => handleScrollToSection("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-lg transition-all duration-300 border border-slate-800 bg-slate-900">
              <img 
                src="/src/assets/images/mct_favicon_1782154704547.jpg" 
                alt="MCT Aligned Emblem" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-base font-bold text-slate-100 tracking-tight block leading-none text-glow-green">
                MCT ALIGNED
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#f97316] mt-1 block uppercase leading-none font-bold">
                ShareLoop Project
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleScrollToSection("home")}
              className={`pb-1 transition-all hover:text-orange-500 cursor-pointer ${
                activeSection === "home" ? "text-orange-500 font-bold border-b-2 border-orange-500" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleScrollToSection("about")}
              className={`pb-1 transition-all hover:text-orange-500 cursor-pointer ${
                activeSection === "about" ? "text-orange-500 font-bold border-b-2 border-orange-500" : ""
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleScrollToSection("services")}
              className={`pb-1 transition-all hover:text-orange-500 cursor-pointer ${
                activeSection === "services" ? "text-orange-500 font-bold border-b-2 border-orange-500" : ""
              }`}
            >
              How Much Is Actual Work?
            </button>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("contact");
              }}
              href="#contact"
              className={`pb-1 transition-all hover:text-orange-500 cursor-pointer ${
                activeSection === "contact" ? "text-orange-500 font-bold border-b-2 border-orange-500" : ""
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Action Trigger */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="mailto:brian@mctaligned.com"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              brian@mctaligned.com
            </a>
            <button
              onClick={() => handleScrollToSection("contact")}
              className="px-5 py-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-lg font-bold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              Join Next Batch
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-900 transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile slide-down navigation drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-900 bg-[#050811] px-4 py-6 space-y-4 shadow-2xl">
            <div className="flex flex-col gap-3 font-medium">
              <button
                onClick={() => handleScrollToSection("home")}
                className="text-left py-2 px-3 text-sm text-slate-350 hover:bg-slate-900 rounded-lg cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollToSection("about")}
                className="text-left py-2 px-3 text-sm text-slate-350 hover:bg-slate-900 rounded-lg cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => handleScrollToSection("services")}
                className="text-left py-2 px-3 text-sm text-slate-350 hover:bg-slate-900 rounded-lg cursor-pointer"
              >
                How Much Is Actual Work?
              </button>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="text-left py-2 px-3 text-sm text-slate-350 hover:bg-slate-900 rounded-lg cursor-pointer"
              >
                Contact
              </button>
            </div>
            
            <div className="pt-4 border-t border-slate-905 space-y-3">
              <div className="text-xs text-slate-400 font-mono flex flex-col gap-1 px-3">
                <span>Phone: 580-826-7475</span>
                <span>Email: brian@mctaligned.com</span>
              </div>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg text-xs font-bold tracking-wide shadow cursor-pointer text-center"
              >
                Join Next Batch
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section - Styled exactly based on ShareLoop infographics */}
      <section id="home" className="relative pt-12 pb-24 md:py-32 lg:py-40 items-center flex bg-[#050811] border-b border-slate-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-green-500/5 pointer-events-none" />
        
        {/* Subtle decorative grid lines for modern blueprint vibe */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-area relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Columns (ShareLoop core tagline values) */}
            <div className="lg:col-span-7 space-y-8 max-w-2xl text-left">
              
              <div className="space-y-4">
                <span className="text-[#22c55e] font-extrabold tracking-[0.25em] text-xs uppercase font-mono block">
                  A Shared-Production Project by MCT-Aligned LLC
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
                  <span className="text-[#22c55e] text-glow-green">THE WORK ISN'T EXPENSIVE.</span> <br />
                  <span className="text-[#f97316] text-glow-orange uppercase">THE CHAIN IS.</span>
                </h1>
                
                <p className="text-lg text-slate-300 max-w-lg leading-relaxed font-sans">
                  The chain gets paid before the work does. Traditional supply chains layer dozens of intermediary markups. By pooling orders and funding production directly, ShareLoop removes the redundant brokers to return value straight to creators and buyers.
                </p>
              </div>

              {/* Your Dollar Takes The Long Way Pathway Diagram (Interactive CSS visualizer) */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-900 text-left space-y-4 shadow-xl">
                <h4 className="text-xs font-mono text-[#f97316] uppercase tracking-wider font-extrabold">
                  Your Dollar Takes The Long Way:
                </h4>
                <div className="grid grid-cols-5 items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-10 bg-green-900/30 border border-green-500/50 rounded-lg flex flex-col justify-center items-center shadow-lg animate-pulse">
                      <div className="text-[10px] text-green-400 font-extrabold font-mono">100%</div>
                      <span className="text-[8px] text-slate-400">YOU</span>
                    </div>
                  </div>
                  <div className="text-center text-slate-600 font-bold">➔</div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-10 bg-slate-900 border border-slate-800 rounded-lg flex flex-col justify-center items-center opacity-70">
                      <div className="text-[10px] text-slate-400 font-mono">48%</div>
                      <span className="text-[8px] text-slate-500">BROKER</span>
                    </div>
                  </div>
                  <div className="text-center text-slate-600 font-bold">➔</div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-10 bg-orange-950/20 border border-orange-500/50 rounded-lg flex flex-col justify-center items-center shadow">
                      <div className="text-[10px] text-orange-400 font-mono font-extrabold">12%</div>
                      <span className="text-[8px] text-slate-300">WORK</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  *Example: In software, only <span className="text-orange-400 font-bold">12¢</span> keeps the code online and pays the builders. The other <span className="text-slate-200 font-bold">88¢</span> is siphoned into corporate marketing and administrative commissions.
                </p>
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap gap-4 items-center pt-2">
                <button
                  onClick={() => handleScrollToSection("contact")}
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-extrabold rounded-lg shadow-xl flex items-center gap-2 group cursor-pointer transition-all duration-300"
                >
                  Join Next Batch
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  onClick={() => handleScrollToSection("services")}
                  className="px-8 py-4 bg-slate-900/80 border border-slate-800 text-slate-200 font-bold rounded-lg hover:border-orange-500/30 transition-all duration-200 shadow-xl cursor-pointer"
                >
                  Inspect Value Studies
                </button>
              </div>

              {/* Direct indicators to verify trust */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-900">
                <div>
                  <span className="block text-2xl font-extrabold font-mono text-[#22c55e]">5.6</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold font-mono block">
                    Paid Stages Avg.
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold font-mono text-[#f97316]">Batch</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold font-mono block">
                    Shared Production
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold font-mono text-white">580</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold font-mono block">
                    826-7475 PhoneNo
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive 3D Pipeline canvas (aligned to focus CSS definitions) */}
            <div className="lg:col-span-5 h-[480px] w-full flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-orange-500/5 filter blur-3xl rounded-full" />
              <div className="w-full h-full relative" id="interactive-3d-node-viewer">
                <ThreeCanvas scrollPercent={scrollPercent} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Verified CMA Supply Chain Length banner block */}
      <section className="py-12 bg-slate-950 border-b border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-green-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#070e17] to-slate-950 flex flex-col md:flex-row items-center gap-6 justify-between shadow-2xl">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-xl bg-green-950/40 border border-[#22c55e]/30 flex items-center justify-center shrink-0">
                <TrendingDown className="w-7 h-7 text-[#22c55e]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
                  AVG. SUPPLY-CHAIN LENGTH: <span className="text-[#22c55e] text-glow-green font-extrabold">5.6 PAID STAGES</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-normal max-w-2xl font-sans">
                  A paid stage is another middle business sandwiched between your dollar and the actual work. Each superfluous company injects its own profit margin. <span className="text-orange-400 font-medium font-mono">Not five tasks. Five margins.</span>
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block">Report Citation</span>
              <span className="text-xs font-semibold text-slate-400 font-mono">CMA Supply-Chain Report</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "HOW MUCH IS ACTUAL WORK?" Section - Beautiful dark bento grid displaying real image stats */}
      <section id="services" className="py-24 bg-[#050811] relative border-b border-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-widest text-[#22c55e] font-mono font-extrabold">
              Value Disparities mapped by US agencies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f97316] tracking-tight">
              HOW MUCH IS ACTUAL WORK?
            </h2>
            <p className="text-slate-350 text-base leading-relaxed">
              We look past the retail veneer inside core sectors. When you inspect the raw costs, you discover how much capital is pocketed by the chain before reaching workers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map((s) => (
              <div 
                key={s.id} 
                onClick={() => setSelectedServiceId(s.id)}
                className={`glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-pointer border ${
                  selectedServiceId === s.id 
                    ? "border-orange-500/50 bg-slate-900/50 text-white shadow-2xl scale-[1.01]" 
                    : "border-slate-900 bg-slate-950/40 hover:border-slate-800"
                } transition-all duration-300`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#22c55e] font-bold">
                      {s.markupStat}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500">
                      {getIcon(s.iconName, "w-4.5 h-4.5")}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {s.title}
                  </h3>
                  
                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {s.shortDesc}
                  </p>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] font-mono text-slate-500 uppercase">Actual Work Compensation</span>
                      <span className="text-sm font-extrabold font-mono text-orange-500">{s.highlightStat}</span>
                    </div>
                    <span className="text-[9px] font-mono bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded font-extrabold">
                      Direct Potential
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-900/80 pt-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-450">Inspect Study Details</span>
                  <ArrowUpRight className={`w-4 h-4 ${selectedServiceId === s.id ? "text-orange-500 translate-x-0.5 -translate-y-0.5" : "text-slate-500"} transition-all`} />
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Display of active selected study details */}
          <div className="mt-12 bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative text-left">
            <div className="absolute top-0 right-12 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-6">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-green-400 font-extrabold bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded">
                  {selectedService.markupStat}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  {selectedService.title} — Realignment Structure
                </h3>
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-orange-500 font-mono text-sm font-bold">
                {selectedService.highlightStat}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#22c55e] font-extrabold">
                  The Problem & Solution:
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-sans">
                  {selectedService.overview}
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#f97316] mb-3 font-extrabold">
                    ShareLoop Benefits:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-350">
                    {selectedService.benefits.map((b, key) => (
                      <li key={key} className="flex gap-2 items-start">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3 font-extrabold">
                    Direct Operations Outcomes:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-350">
                    {selectedService.outcomes.map((o, key) => (
                      <li key={key} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0 mt-1.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-450 font-mono">
                Looking to map direct channels for {selectedService.title}? Connect with Brian now.
              </span>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="px-6 py-2.5 bg-[#f97316] hover:bg-orange-600 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 duration-200 cursor-pointer"
              >
                Inquire Directly
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. "SHARELOOP FLIPS THE CHAIN" Step Sequencer Section */}
      <section className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden text-left" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#22c55e] font-mono font-extrabold block">
              Batch pooled production workflow
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
              SHARELOOP <span className="text-orange-500">FLIPS THE CHAIN</span>
            </h2>
            <p className="text-slate-350 text-sm sm:text-base">
              Members fund production first. We make in batches. Fewer businesses sit between your dollar and the work. Our direct credits mechanism locks in reliable wholesale value.
            </p>
          </div>

          <div className="relative">
            {/* Horizontal connection path line */}
            <div className="absolute top-12 left-6 right-6 h-0.5 bg-gradient-to-r from-orange-500/30 via-green-500/30 to-orange-500/30 hidden lg:block z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {VALUES.map((val, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#090f1d] border border-slate-900 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl text-left"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-500 text-glow-orange shrink-0">
                      {getIcon(val.iconName, "w-5 h-5")}
                    </div>
                    <h3 className="text-base font-extrabold text-white tracking-tight">{val.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-sans">{val.description}</p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 font-bold block pt-3 border-t border-slate-905">
                    STAGE OVERVIEV — 0{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Video Integration abstract showcase loop (Dark themed) */}
      <section className="py-24 bg-[#050811] relative border-b border-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="w-12 h-1 bg-orange-500 rounded-full" />
              <h3 className="text-3xl font-extrabold text-white font-sans tracking-tight">
                Inspect Realized Flow Loops
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                MCT Aligned LLC deploys software networks to map logistics, manage inventories, and streamline worker matching systems. Watch our abstract pipeline sequence to see how values transfer smoothly without hitting intermediate toll-gates.
              </p>
              
              <div className="p-4 bg-slate-950 border border-slate-900 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono">FLOW VISUALS</span>
                  <span className="text-xs font-semibold text-slate-300">Continuous Resource Sequence</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleVideoPlay}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg transition shrink-0"
                    title={isVideoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleVideoMute}
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg transition shrink-0"
                    title={isVideoMuted ? "Unmute" : "Mute"}
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4 text-orange-500" /> : <Volume2 className="w-4 h-4 text-[#22c55e]" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="lg:col-span-7">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-900 bg-slate-950 shadow-2xl aspect-video flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="https://assets.mixkit.co/videos/preview/mixkit-background-of-digital-neon-particles-43187-large.mp4"
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                  onClick={toggleVideoPlay}
                  className="w-full h-full object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-slate-950/95 text-[9px] font-mono text-[#22c55e] font-extrabold px-2.5 py-1 rounded-md border border-slate-800 shadow shadow-amber-500/10 pointer-events-none select-none uppercase">
                  DIRECT PIPELINE VIDEO
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Testimonials Endorsements */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-widest text-[#22c55e] font-mono font-extrabold animate-pulse block">
              Direct verification
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              What Business Leaders Say
            </h2>
            <p className="text-slate-350 text-sm">
              Read how our batch shared-production mechanisms translate into material direct-cost savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-6 border border-slate-900 shadow-xl bg-slate-900/10 hover:border-orange-500/20 transition-all duration-300">
                <div>
                  <div className="flex gap-1 mb-4 text-[#22c55e]">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-[#22c55e] hover:scale-110 transition-transform text-[#22c55e]" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="border-t border-slate-900 pt-4">
                  <h4 className="text-sm font-bold text-slate-100">{t.author}</h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {t.title} at <span className="text-[#f97316] font-extrabold font-mono">{t.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FAQ Accordion Section */}
      <section className="py-24 bg-[#050811] relative border-b border-slate-950 overflow-hidden text-left">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-widest text-[#22c55e] font-mono font-extrabold block">
              Direct Alignment Intelligence
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4 text-left">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFAQIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#090f1d] border border-slate-900 rounded-xl overflow-hidden transition-all duration-300 shadow-xl"
                >
                  <button
                    onClick={() => setExpandedFAQIndex(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center text-slate-300 hover:text-orange-500 transition duration-200 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold pr-4 font-sans">{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-905 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. Contact & Secure Lead Intake Form */}
      <section id="contact" className="py-24 bg-slate-950 relative border-t border-slate-900 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left direct contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#22c55e] font-extrabold uppercase tracking-widest block">
                  COMMENCE DIRECT PRODUCTION
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                  Let's Align Your Value Pool Today
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We are here to discuss how value can be better aligned within your organization. Reach out directly or fill our structured lead form for a free cost check strategy session.
                </p>
              </div>

              <div className="space-y-4">
                
                <div className="flex items-center gap-4 p-4 bg-[#090f1d] border border-slate-900 rounded-2xl shadow-xl hover:border-green-500/20 transition duration-300">
                  <div className="w-10 h-10 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 hover:rotate-12 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-mono font-bold">CALL US DIRECTLY</span>
                    <a href="tel:5808267475" className="text-sm font-bold text-slate-200 hover:text-orange-500 transition font-mono">
                      580-826-7475
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#090f1d] border border-slate-900 rounded-2xl shadow-xl hover:border-orange-500/20 transition duration-300">
                  <div className="w-10 h-10 bg-orange-500/10 text-orange-400 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-mono font-bold">EMAIL INBOX</span>
                    <a href="mailto:brian@mctaligned.com" className="text-sm font-bold text-slate-200 hover:text-orange-500 transition font-mono">
                      brian@mctaligned.com
                    </a>
                  </div>
                </div>

              </div>

              {/* Verified company coordinates card with MCT logo in Dark layout style */}
              <div className="p-6 bg-[#090f1d] border border-slate-900 rounded-2xl space-y-4 shadow-xl hover:border-orange-500/30 transition-colors duration-300">
                <div className="w-full max-w-[150px] h-auto overflow-hidden bg-white p-2 rounded-lg shadow-sm border border-slate-800">
                  <img 
                    src="/src/assets/images/mct_logo_1782154684536.jpg" 
                    alt="MCT Aligned LLC Logo" 
                    className="w-full h-auto object-contain select-none" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 border-t border-slate-900 pt-4">
                  <span className="text-xs font-mono text-[#f97316] block tracking-wider font-extrabold uppercase">MCT Aligned LLC</span>
                  <p className="text-xs text-slate-300 leading-normal font-sans">
                    Registered Limited Liability Company addressing inefficient intermediaries and delivering solid outcomes for workers and buyers.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] text-slate-450 font-mono uppercase font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" /> ACTIVE US OPERATIONS
                  </div>
                </div>
              </div>
            </div>

            {/* Right side lead intake form (fully dark glass-themed) */}
            <div className="lg:col-span-7 bg-[#090f1d] border border-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative" id="lead-form-container">
              <div className="absolute top-0 right-16 w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
              
              <h3 className="text-xl font-bold text-slate-100 mb-2">Request Shared Production Consultation</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Tell us about your organization's setup, and we'll reply to book an optimization mapping session.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                {formStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm leading-relaxed" id="form-success-alert">
                    {formSuccessMsg}
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-sm" id="form-error-alert">
                    {formErrorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-name-field" className="text-xs font-bold text-slate-300 font-mono">NAME *</label>
                    <input
                      id="form-name-field"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-email-field" className="text-xs font-bold text-slate-300 font-mono">EMAIL *</label>
                    <input
                      id="form-email-field"
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-phone-field" className="text-xs font-bold text-slate-300 font-mono">PHONE (OPTIONAL)</label>
                  <input
                    id="form-phone-field"
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="580-826-7475"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-message-field" className="text-xs font-bold text-slate-300 font-mono">ORGANIZATION CONTEXT *</label>
                  <textarea
                    id="form-message-field"
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="We suspect administrative leaks. Direct us is to save on software/expert labor..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 disabled:from-slate-800 disabled:to-slate-950 text-white font-extrabold rounded-xl text-sm tracking-wide shadow-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:from-orange-500 hover:to-orange-400"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting secure mapping inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Mapping Inquiry</span>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Center aligned footer with Dev credits */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-orange-500 transition cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setTermsOpen(true)} className="hover:text-orange-500 transition cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => handleScrollToSection("services")} className="hover:text-orange-500 transition cursor-pointer">
              Explore Batch Stats
            </button>
          </div>

          <p className="text-slate-400 leading-relaxed font-sans max-w-lg mx-auto text-xs sm:text-sm">
            © {new Date().getFullYear()} MCT Aligned LLC. All rights reserved. <br />
            Business optimization services aimed at returning real value to buyers and service producers. <br />
            Phone: <a href="tel:5808267475" className="hover:text-orange-500 transition">580-826-7475</a> | Email: <a href="mailto:brian@mctaligned.com" className="hover:text-orange-500 transition">brian@mctaligned.com</a>
          </p>

          <p className="text-xs text-slate-500 font-mono">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 underline decoration-slate-800 transition font-bold">iWebNext</a>
          </p>

        </div>
      </footer>

      {/* Auxiliary interactive overlay widgets */}
      <ScrollToTop />
      <ChatWidget />

      {/* Legal Popunder modals */}
      <PrivacyPolicy isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfService isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

    </div>
  );
}
