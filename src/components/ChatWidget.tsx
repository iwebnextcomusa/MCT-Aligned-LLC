import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, HelpCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
  time: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I'm the ShareLoop virtual companion by MCT Aligned LLC! Ask me any questions about our shared-production batch system, how we fund work directly on credits, and how we squeeze out the 5.6 redundant supply chain margins!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBubbleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    setInputVal("");

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = { role: "user", text: userMsg, time: timestamp };
    const updatedMsgs = [...messages, newMsg];

    setMessages(updatedMsgs);
    setIsTyping(true);

    try {
      // Secure server-side call
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: updatedMsgs.slice(0, -1).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: data.reply || "I couldn't generate a reply. Please try again.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: `[Error] ${data.error || "Failed to process chat call. Make sure the backend dev server is fully active."}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err: any) {
      console.error("Chat fetch failure:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I am having trouble connecting to my knowledge base right now. Please make sure the backend is active, or reach out to us at brian@mctaligned.com.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleFAQSelection = (faqQuestion: string) => {
    setInputVal(faqQuestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-window"
          className="w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-[#0c1221] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right"
        >
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22c55e] border border-slate-950 rounded-full z-10 animate-pulse" />
                <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-800 shadow-sm flex items-center justify-center bg-slate-900">
                  <img 
                    src="/src/assets/images/mct_favicon_1782154704547.jpg" 
                    alt="MCT Aligned Icon" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 text-glow-orange">
                  ShareLoop Advisor
                </h4>
                <p className="text-[10px] text-[#22c55e] font-mono tracking-wider font-semibold uppercase">
                  MCT Aligned Project
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-900"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive FAQs - Quick Access prompts */}
          <div className="px-3 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase shrink-0">
              <HelpCircle className="w-3 h-3 text-orange-500" /> Ask:
            </span>
            <button
              onClick={() => handleFAQSelection("Why is the traditional chain expensive?")}
              className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-200 py-1 px-2.5 rounded-full border border-slate-800 shrink-0 transition cursor-pointer"
            >
              Why are chains expensive?
            </button>
            <button
              onClick={() => handleFAQSelection("Explain the 4-step shared-production model.")}
              className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-200 py-1 px-2.5 rounded-full border border-slate-800 shrink-0 transition cursor-pointer"
            >
              The 4 Steps
            </button>
            <button
              onClick={() => handleFAQSelection("Give me contact phone number.")}
              className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-200 py-1 px-2.5 rounded-full border border-slate-800 shrink-0 transition cursor-pointer"
            >
              Support Phone
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0f1b] scrollbar-thin scrollbar-thumb-slate-800" id="chat-messages-container">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-tr-none shadow-md"
                      : "bg-[#141b2e] border border-slate-800 text-slate-100 rounded-tl-none font-sans shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 select-none font-mono">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start gap-1">
                <div className="bg-[#141b2e] border border-slate-800 rounded-xl rounded-tl-none px-4 py-3 flex items-center space-x-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-[10px] font-mono text-[#22c55e] uppercase font-bold">Simulating alignment...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about saving on software, crops, or expert help..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-250"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 bg-gradient-to-r from-orange-600 to-orange-500 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed hover:from-orange-500 hover:to-orange-400 text-white rounded-xl transition shadow shrink-0 focus:outline-none cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Messenger Toggle Bubble */}
      <button
        id="chat-trigger-bubble"
        ref={chatBubbleRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 bg-gradient-to-tr from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-orange-500/30"
        aria-label="Open AI Chat Support"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#22c55e] animate-ping rounded-full" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#22c55e] border-2 border-[#050811] rounded-full" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        
        {/* Hover Label */}
        <span className="absolute right-16 bg-slate-900 border border-slate-800 text-slate-100 text-xs px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-sans font-bold tracking-tight shadow-lg">
          SHARELOOP ADVISOR ON-LINE
        </span>
      </button>
    </div>
  );
}
