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
  const [selectedServiceId, setSelectedServiceId] = useState<string>("process-optimization");

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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(progress);

      // Simple active section detection for sticky header highlights
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
        setFormSuccessMsg(data.message || "Thank you! Your information has been secured successfully.");
        // Clear input form
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormMessage("");
      } else {
        setFormStatus("error");
        setFormErrorMsg(data.error || "Failed to submit lead. Please check network connection.");
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setFormStatus("error");
      setFormErrorMsg("An unexpected failure occurred while submitting. Please call us directly.");
    }
  };

  // Dynamic Icon resolver helper
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
    <div className="min-h-screen text-slate-800 bg-slate-50 font-sans selection:bg-[#28A745]/15 selection:text-[#123456] relative overflow-x-hidden">
      
      {/* 1. Header Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Branding */}
          <div 
            onClick={() => handleScrollToSection("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-sm transition-all duration-300 border border-slate-100 bg-white">
              <img 
                src="/src/assets/images/mct_favicon_1782154704547.jpg" 
                alt="MCT Aligned Emblem" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-base font-bold text-[#123456] tracking-tight block leading-none">
                MCT ALIGNED
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#28A745] mt-1.5 block uppercase leading-none font-bold">
                Value Realignment
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleScrollToSection("home")}
              className={`pb-1 transition-all hover:text-[#123456] cursor-pointer ${
                activeSection === "home" ? "text-[#123456] font-bold border-b-2 border-[#123456]" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleScrollToSection("about")}
              className={`pb-1 transition-all hover:text-[#123456] cursor-pointer ${
                activeSection === "about" ? "text-[#123456] font-bold border-b-2 border-[#123456]" : ""
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleScrollToSection("services")}
              className={`pb-1 transition-all hover:text-[#123456] cursor-pointer ${
                activeSection === "services" ? "text-[#123456] font-bold border-b-2 border-[#123456]" : ""
              }`}
            >
              Services
            </button>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("contact");
              }}
              href="#contact"
              className={`pb-1 transition-all hover:text-[#123456] cursor-pointer ${
                activeSection === "contact" ? "text-[#123456] font-bold border-b-2 border-[#123456]" : ""
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Connect Action Trigger */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="mailto:brian@mctaligned.com"
              className="text-xs font-mono text-slate-500 hover:text-[#123456] transition-colors"
            >
              brian@mctaligned.com
            </a>
            <button
              onClick={() => handleScrollToSection("contact")}
              className="px-5 py-2 bg-[#123456] text-white rounded-md font-semibold text-xs tracking-wider uppercase hover:bg-opacity-90 shadow-sm transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile hamburger toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile slide-down navigation drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-6 space-y-4 shadow-lg">
            <div className="flex flex-col gap-3 font-medium">
              <button
                onClick={() => handleScrollToSection("home")}
                className="text-left py-2 px-3 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollToSection("about")}
                className="text-left py-2 px-3 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => handleScrollToSection("services")}
                className="text-left py-2 px-3 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                Our Services
              </button>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="text-left py-2 px-3 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                Contact
              </button>
            </div>
            
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-xs text-slate-500 font-mono flex flex-col gap-1 px-3">
                <span>Phone: 580-826-7475</span>
                <span>Email: brian@mctaligned.com</span>
              </div>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="w-full py-2.5 bg-[#123456] text-white rounded-lg text-xs font-semibold tracking-wide shadow cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section id="home" className="relative pt-8 pb-20 md:py-24 lg:py-32 items-center flex bg-slate-50 border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#123456]/5 via-transparent to-[#28A745]/5 pointer-events-none" />
        
        {/* Subtle decorative grid lines for modern architecture vibe */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.12] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-area relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copystyle details */}
            <div className="lg:col-span-7 space-y-8 max-w-2xl text-left">
              
              <div className="space-y-4">
                <span className="text-[#28A745] font-bold tracking-[0.2em] text-xs uppercase font-mono block">Value Realignment</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 leading-[1.1] font-sans">
                  Aligning Value with the <br />
                  <span className="text-[#123456]">
                    People Who Create It.
                  </span>
                </h1>
                <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-sans">
                  Helping workers and buyers benefit from more efficient, transparent business relationships by reducing unnecessary middleman costs. MCT Aligned LLC remodels systems by squeezing out expensive, unnecessary intermediate brokerage layers.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center pt-2">
                <button
                  onClick={() => handleScrollToSection("contact")}
                  className="px-8 py-4 bg-[#123456] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                >
                  Get Started
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  onClick={() => handleScrollToSection("about")}
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-800 font-bold rounded-lg hover:bg-slate-100 hover:text-[#123456] transition-all duration-200 shadow-sm cursor-pointer"
                >
                  Learn More
                </button>
              </div>

              {/* Direct corporate indicators to verify trust */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200">
                <div>
                  <span className="block text-2xl font-bold font-mono text-[#28A745]">Zero</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    Middleman Markups
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-mono text-[#123456]">Direct</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    Client Channels
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-mono text-slate-800">580</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono font-medium">
                    826-7475 PhoneNo
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive 3D WebGL Section */}
            <div className="lg:col-span-5 h-[480px] w-full flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-blue-500/5 filter blur-3xl rounded-full" />
              <div className="w-full h-full relative" id="interactive-3d-node-viewer">
                <ThreeCanvas scrollPercent={scrollPercent} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Mission / Philosophy Section */}
      <section className="py-20 bg-white relative border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#28A745] font-mono font-bold">
              Corporate Philosophy
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight">
              A Direct Path to Equitable Commerce
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              We stand against structural bloat. By redesigning transactions and reducing non-contributing broker layers, we bring robust economics back into alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#28A745]/10 border border-[#28A745]/20 text-[#28A745] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Fair Value Distribution</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ensuring that capital is awarded to those doing the real lifting, while giving buyers competitive pricing free of broker dilution.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#123456]/10 border border-[#123456]/20 text-[#123456] flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Reduced Inefficiencies</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                By targeting and dismantling unnecessary handoffs and redundant checks, workflows are streamlined down to core capabilities.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#123456]/10 border border-[#123456]/20 text-[#123456] flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Transparency and Trust</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We believe trust is forged through openness. Our clients and teams receive transparent financial views to safeguard transactions.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
              <div className="w-10 h-10 rounded-lg bg-teal-600/10 border border-teal-600/20 text-teal-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Sustainable Business Growth</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Stable pricing structures protect trade ecosystems from chaotic shifts, securing long-term wealth retention for scaling.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Benefits Section */}
      <section className="py-20 bg-slate-50 relative border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#28A745] font-mono font-bold">
              Mutual Gains
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight">
              Engineered Benefits for Everyone Involved
            </h3>
            <p className="text-slate-600 text-base">
              The math is simple: removing the middleman keeps value pools centered. This distributes real benefits across buyers and workers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Better Value for Buyers */}
            <div className="glass-panel bg-white border border-slate-150 rounded-2xl p-8 hover:border-[#123456]/25 transition-all duration-300 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-mono text-[#28A745] tracking-widest uppercase block mb-3 font-bold">
                  01. FOR PURCHASERS
                </span>
                <h4 className="text-xl font-bold text-slate-800 mb-4">
                  Better Value for Buyers
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Sourcing standard industrial contracting or management consulting shouldn't carry a massive mark-up chain. We match procurement budgets directly to on-site production teams. This cuts out bloated consulting broker margins so you pay solely for delivered execution.
                </p>
              </div>
              <ul className="space-y-2.5 border-t border-slate-100 pt-5 text-xs text-slate-500 font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#28A745]" /> Direct, fee-free invoice structures
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#28A745]" /> Granular cost verification
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#28A745]" /> Lower financial transaction overhead
                </li>
              </ul>
            </div>

            {/* Card 2: Greater Opportunity for Workers */}
            <div className="glass-panel bg-white border border-slate-150 rounded-2xl p-8 hover:border-[#123456]/25 transition-all duration-300 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-mono text-[#123456] tracking-widest uppercase block mb-3 font-bold">
                  02. FOR STAFF & PROVIDERS
                </span>
                <h4 className="text-xl font-bold text-slate-800 mb-4">
                  Greater Opportunity for Workers
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Workers are the engines of structural success, yet broker frameworks typically siphon off key portions of their payouts. MCT Aligned bypasses these fee structures, allowing workers to retain more of their direct compensation and build stable livelihoods.
                </p>
              </div>
              <ul className="space-y-2.5 border-t border-slate-100 pt-5 text-xs text-slate-500 font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#123456]" /> Higher relative wage allocations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#123456]" /> Transparent reward opportunities
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#123456]" /> Stable relationship pipelines
                </li>
              </ul>
            </div>

            {/* Card 3: More Efficient Business Models */}
            <div className="glass-panel bg-white border border-slate-150 rounded-2xl p-8 hover:border-[#123456]/25 transition-all duration-300 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-mono text-indigo-600 tracking-widest uppercase block mb-3 font-bold">
                  03. INTEGRATED FLOWS
                </span>
                <h4 className="text-xl font-bold text-slate-800 mb-4">
                  More Efficient Business Models
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Complex administrative channels invite friction. By consolidating software tooling, trimming reporting loops, and deploying direct alignment consulting, operations run with incredible agility, preventing resource bloat.
                </p>
              </div>
              <ul className="space-y-2.5 border-t border-slate-100 pt-5 text-xs text-slate-500 font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" /> Standardized workflow models
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" /> Rapid process response loops
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" /> Zero administrative bloat
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#28A745] font-mono font-bold">
              The Path To Alignment
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight">
              A Direct, Three-Step Alignment Process
            </h3>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Our methodology eliminates convoluted corporate plans in favor of direct, measurable actions.
            </p>
          </div>

          <div className="relative">
            {/* Visual connector line in between steps (desktop only) */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#123456]/10 to-[#28A745]/10 -translate-y-1/2 hidden lg:block z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
              
              {/* Step 1 */}
              <div className="glass-card rounded-2xl p-8 text-left space-y-5 relative">
                <div className="w-12 h-12 rounded-xl bg-[#123456] text-white font-mono text-xl font-bold flex items-center justify-center shadow-md">
                  01
                </div>
                <h4 className="text-lg font-bold text-slate-800">Identify Inefficiencies</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We audit your current logistics and resource pools to pinpoint where brokers, redundant administrative handoffs, or software fees are diluting key values.
                </p>
                <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider block pt-2 border-t border-slate-100">
                  VALUE CHAIN DIAGNOSTIC
                </span>
              </div>

              {/* Step 2 */}
              <div className="glass-card rounded-2xl p-8 text-left space-y-5 relative">
                <div className="w-12 h-12 rounded-xl bg-[#123456] text-white font-mono text-xl font-bold flex items-center justify-center shadow-md">
                  02
                </div>
                <h4 className="text-lg font-bold text-slate-800">Align Incentives</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We rewrite commission mechanics, draft smart operational alignment pathways, and deploy structures where both buyers and workers' reward parameters are locked in unison.
                </p>
                <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider block pt-2 border-t border-slate-100">
                  INCENTIVE REALIGNMENT
                </span>
              </div>

              {/* Step 3 */}
              <div className="glass-card rounded-2xl p-8 text-left space-y-5 relative">
                <div className="w-12 h-12 rounded-xl bg-[#28A745] text-white font-mono text-xl font-bold flex items-center justify-center shadow-md">
                  03
                </div>
                <h4 className="text-lg font-bold text-slate-800">Deliver Measurable Value</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We deploy automated scheduling, optimize software licensing, and manage direct transactions, keeping admin spend ultra-low while quality remains high.
                </p>
                <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider block pt-2 border-t border-slate-100">
                  METRIC CONFIRMATION
                </span>
              </div>

            </div>
          </div>

          {/* Quick Consultation Trigger */}
          <div className="mt-16 text-center">
            <div className="inline-block glass-panel bg-slate-50 border border-slate-150 rounded-2xl p-6 max-w-2xl text-center shadow-sm">
              <p className="text-sm text-slate-700">
                Ready to find where your operations are leaking cash?
              </p>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="mt-4 px-6 py-2.5 bg-[#123456] text-white rounded-md text-xs font-bold uppercase tracking-wider transition-all hover:bg-opacity-90 shadow-sm active:scale-95 duration-200 cursor-pointer"
              >
                Schedule Diagnostic Analysis
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Video Integration Showcase Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="w-9 h-1 bg-[#28A745] rounded-full" />
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-sans tracking-tight">
                Watch Our Operational Showcase Loop
              </h3>
              <p className="text-slate-650 text-sm leading-relaxed">
                MCT Aligned LLC deploys software networks to map logistics, manage inventories, and streamline worker matching systems. Watch our abstract pipeline sequence to see how values transfer smoothly without hitting intermediate toll-gates.
              </p>
              
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-450 font-mono font-medium">LOOPING RESOURCE WAVEFORM</span>
                  <span className="text-xs font-bold text-slate-700">Abstract Ecosystem Rendering</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleVideoPlay}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#123456] rounded-lg transition"
                    title={isVideoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleVideoMute}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg transition"
                    title={isVideoMuted ? "Unmute" : "Mute"}
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-[#28A745]" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="lg:col-span-7">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-150 bg-white shadow-lg aspect-video flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="https://assets.mixkit.co/videos/preview/mixkit-background-of-digital-neon-particles-43187-large.mp4"
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                  onClick={toggleVideoPlay}
                  className="w-full h-full object-cover cursor-pointer hover:scale-[1.01] transition-transform duration-500"
                />
                
                {/* Embedded dynamic glass controls overlay */}
                <div className="absolute top-4 right-4 bg-white/95 text-[10px] font-mono text-[#28A745] font-bold px-2.5 py-1 rounded-md border border-slate-200 shadow-sm pointer-events-none select-none uppercase">
                  DEMO AUTOPLAY (MUTED)
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. About Page Section */}
      <section id="about" className="py-20 bg-white relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left Column info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-[#28A745] font-bold uppercase tracking-widest block">
                WHO WE ARE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight">
                Committed to Long-Term Structural Value
              </h2>
              <p className="text-slate-650 text-sm leading-relaxed">
                MCT Aligned LLC was founded by Brian on a singular, powerful premise: business transactions shouldn't be diluted by excessive broker tolls. We construct operating networks where workers are fairly compensated for their outputs, and buyers receive clear value directly.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                  <h4 className="text-sm font-bold text-[#123456] uppercase tracking-wider mb-1">Company Mission</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-normal">
                    To optimize corporate logistics, eliminate expensive middlemen markups, and empower organizations with robust transparency.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                  <h4 className="text-sm font-bold text-[#123456] uppercase tracking-wider mb-1">Our Vision</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-normal">
                    A streamlined trading landscape where buyer expenditures match original creator earnings as cleanly as possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column core values selection */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono text-[#123456] uppercase tracking-widest block font-bold">
                CORE VALUES
              </span>
              <h3 className="text-2xl font-bold text-slate-800">
                The Principles Driving Our Decisions
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VALUES.map((val, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-150 rounded-xl space-y-3 hover:border-[#28A745]/30 transition duration-250 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-[#28A745]/10 border border-[#28A745]/20 text-[#28A745] flex items-center justify-center">
                      {getIcon(val.iconName, "w-4.5 h-4.5")}
                    </div>
                    <h4 className="text-base font-bold text-slate-800">{val.title}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Services Page Section */}
      <section id="services" className="py-20 bg-slate-50 relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#28A745] font-mono font-bold">
              Flexible Adaptable Solutions
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight">
              Our Professional Advisory Services
            </h3>
            <p className="text-slate-650 text-base font-sans">
              Explore our core methodologies aimed at driving operational efficiency and cost reductions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            {/* Left selector menu buttons */}
            <div className="lg:col-span-4 space-y-2.5">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-250 flex items-center justify-between cursor-pointer ${
                    selectedServiceId === s.id
                      ? "bg-white border-[#28A745] text-[#123456] shadow-md translate-x-1 font-bold"
                      : "bg-white border-slate-150 text-slate-700 hover:bg-slate-100/60 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedServiceId === s.id ? "bg-[#28A745]/10 text-[#28A745]" : "bg-slate-100 text-slate-500"
                    }`}>
                      {getIcon(s.iconName, "w-4 h-4")}
                    </div>
                    <div>
                      <span className="text-sm font-semibold tracking-wide block leading-none">{s.title}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Operational Solution</span>
                    </div>
                  </div>
                  <ArrowUpRight className={`w-4 h-4 transition-transform ${selectedServiceId === s.id ? "text-[#28A745] translate-x-0.5 -translate-y-0.5" : "text-slate-400"}`} />
                </button>
              ))}
            </div>

            {/* Right Detailed Expanded Display (Editable Flexible layout) */}
            <div className="lg:col-span-8 bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#28A745] font-bold bg-[#28A745]/10 border border-[#28A745]/20 px-2 py-0.5 rounded">
                    Operational Advisory
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#123456]">{selectedService.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-[#123456] shadow">
                  {getIcon(selectedService.iconName)}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#28A745] mb-2 font-bold">Service Overview</h4>
                <p className="text-slate-650 text-sm leading-relaxed font-sans">{selectedService.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#123456] mb-3 font-bold">Key Benefits</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {selectedService.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex gap-2 items-start font-sans">
                        <Check className="w-4 h-4 text-[#28A745] shrink-0 mt-0.5" /> <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-indigo-600 mb-3 font-bold font-semibold">Expected Outcomes</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {selectedService.outcomes.map((o, oIdx) => (
                      <li key={oIdx} className="flex gap-2 items-start font-sans">
                        <span className="w-1.5 h-1.5 bg-[#123456] rounded-full shrink-0 mt-2" /> <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Booking call to action */}
              <div className="pt-6 border-t border-slate-150 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-mono">
                  Have questions about {selectedService.title}? Ask our AI advisor at the bottom-right.
                </span>
                <button
                  onClick={() => handleScrollToSection("contact")}
                  className="px-5 py-2.5 bg-[#123456] text-white rounded text-xs font-semibold tracking-wide transition shadow hover:bg-opacity-90 active:scale-95 duration-250 cursor-pointer"
                >
                  Consult on this Service
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#28A745] font-mono font-bold animate-pulse">
              Endorsements
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight">
              What Business Leaders Say
            </h3>
            <p className="text-slate-600 text-sm">
              Read how alignment strategies translate into material financial savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-6 bg-white border border-slate-150 shadow-sm font-sans">
                <div>
                  <div className="flex gap-1 mb-4 text-[#28A745]">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-[#28A745] text-[#28A745]" />
                    ))}
                  </div>
                  <p className="text-slate-650 text-sm leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-sm font-bold text-slate-800">{t.author}</h4>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5 font-medium">
                    {t.title} at <span className="text-[#28A745]/90 font-bold">{t.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ accordion section */}
      <section className="py-20 bg-white relative border-b border-slate-100 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#28A745] font-mono font-bold">
              Common Questions
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight leading-none">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4 text-left">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFAQIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-150 rounded-xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFAQIndex(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center text-slate-700 hover:text-[#123456] transition duration-200 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-semibold pr-4">{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#28A745] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-150 text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. Contact grid & Lead Form submission */}
      <section id="contact" className="py-20 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left direct contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#28A745] font-bold uppercase tracking-widest block">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123456] tracking-tight">
                  Let's Align Your Value Pool Today
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We are here to discuss how value can be better aligned within your organization. Reach out directly or fill our structured lead form for a free cost check strategy session.
                </p>
              </div>

              <div className="space-y-4">
                
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#28A745]/10 text-[#28A745] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">CALL US DIRECTLY</span>
                    <a href="tel:5808267475" className="text-base font-bold text-slate-800 hover:text-[#28A745] transition font-mono">
                      580-826-7475
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#123456]/10 text-[#123456] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">EMAIL INBOX</span>
                    <a href="mailto:brian@mctaligned.com" className="text-base font-bold text-slate-800 hover:text-[#28A745] transition font-mono">
                      brian@mctaligned.com
                    </a>
                  </div>
                </div>

              </div>

              {/* Verified company coordinates with actual company logo */}
              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-sm hover:border-[#123456]/20 transition-colors duration-200">
                <div className="w-full max-w-[160px] h-auto overflow-hidden">
                  <img 
                    src="/src/assets/images/mct_logo_1782154684536.jpg" 
                    alt="MCT Aligned LLC Logo" 
                    className="w-full h-auto object-contain select-none" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-xs font-mono text-[#123456] block tracking-wider font-bold">MCT Aligned LLC</span>
                  <p className="text-xs text-slate-600 leading-normal font-sans">
                    Registered Limited Liability Company addressing inefficient intermediaries and delivering solid outcomes for workers and buyers.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono uppercase font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#28A745]" /> ACTIVE US OPERATIONS
                  </div>
                </div>
              </div>
            </div>

            {/* Right side lead intake form */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 shadow-md" id="lead-form-container">
              <h3 className="text-xl font-bold text-slate-850 mb-2">Request Consultation</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Tell us about your organization's setup, and we'll reply to book a cost advisory mapping call.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                {formStatus === "success" && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl text-sm leading-relaxed" id="form-success-alert">
                    {formSuccessMsg}
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-xl text-sm" id="form-error-alert">
                    {formErrorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-name-field" className="text-xs font-semibold text-slate-700">Name *</label>
                    <input
                      id="form-name-field"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#123456] focus:ring-1 focus:ring-[#123456] text-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-email-field" className="text-xs font-semibold text-slate-700">Email *</label>
                    <input
                      id="form-email-field"
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#123456] focus:ring-1 focus:ring-[#123456] text-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-phone-field" className="text-xs font-semibold text-slate-700">Phone (Optional)</label>
                  <input
                    id="form-phone-field"
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="580-555-0199"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#123456] focus:ring-1 focus:ring-[#123456] text-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-message-field" className="text-xs font-semibold text-slate-700">Message / Organization context *</label>
                  <textarea
                    id="form-message-field"
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Please tell us what brokers or administrative leaks you suspect, or ask about specific processes..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#123456] focus:ring-1 focus:ring-[#123456] text-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-3 bg-[#123456] disabled:bg-slate-200 text-white font-bold rounded-xl text-sm tracking-wide shadow transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:bg-opacity-95"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <span>Send Secure Message</span>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-slate-900 border-t border-slate-950 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-[#28A745] transition cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setTermsOpen(true)} className="hover:text-[#28A745] transition cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => handleScrollToSection("services")} className="hover:text-[#28A745] transition cursor-pointer">
              Explore Services
            </button>
          </div>

          <p className="text-slate-300 leading-relaxed font-sans max-w-md mx-auto text-xs sm:text-sm">
            © {new Date().getFullYear()} MCT Aligned LLC. All rights reserved. <br />
            Business optimization services aimed at returning real value to buyers and service producers. <br />
            Phone: <a href="tel:5808267475" className="hover:text-[#28A745] transition">580-826-7475</a> | Email: <a href="mailto:brian@mctaligned.com" className="hover:text-[#28A745] transition">brian@mctaligned.com</a>
          </p>

          <p className="text-xs text-slate-450 font-mono">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#28A745] underline decoration-slate-600 transition font-bold">iWebNext</a>
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
