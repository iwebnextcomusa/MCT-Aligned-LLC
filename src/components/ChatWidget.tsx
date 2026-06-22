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
      text: "Hello! I'm the MCT Aligned LLC virtual companion. Ask me any questions about our services like business optimization and value chain alignment, and how we cut out unproductive middlemen costs!",
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
            text: `[Error] ${data.error || "Failed to process chat call. Make sure process is up."}`,
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
          className="w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right"
        >
          {/* Header */}
          <div className="bg-slate-50 p-4 border-b border-slate-150 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28A745] border border-white rounded-full z-10" />
                <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-150 shadow-sm flex items-center justify-center bg-white">
                  <img 
                    src="/src/assets/images/mct_favicon_1782154704547.jpg" 
                    alt="MCT Aligned Icon" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-850">
                  Value Alignment AI
                </h4>
                <p className="text-[10px] text-[#28A745] font-mono tracking-wider font-semibold">
                  MCT ALIGNED COMPANION
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive FAQs - Quick Access prompts */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-150 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase shrink-0">
              <HelpCircle className="w-3 h-3" /> Quick Ask:
            </span>
            <button
              onClick={() => handleFAQSelection("How do you bypass middlemen?")}
              className="text-[10px] bg-white hover:bg-slate-100 text-slate-650 py-1 px-2.5 rounded-full border border-slate-200 shrink-0 transition cursor-pointer"
            >
              Bypass middlemen
            </button>
            <button
              onClick={() => handleFAQSelection("What is Value Chain Analysis?")}
              className="text-[10px] bg-white hover:bg-slate-100 text-slate-650 py-1 px-2.5 rounded-full border border-slate-200 shrink-0 transition cursor-pointer"
            >
              Value Chain tool
            </button>
            <button
              onClick={() => handleFAQSelection("Give me contact phone number.")}
              className="text-[10px] bg-white hover:bg-slate-100 text-slate-650 py-1 px-2.5 rounded-full border border-slate-200 shrink-0 transition cursor-pointer"
            >
              Get contact info
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200" id="chat-messages-container">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-[#123456] text-white rounded-tr-none shadow-sm"
                      : "bg-white border border-slate-150 text-slate-750 rounded-tl-none font-sans shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 select-none">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start gap-1">
                <div className="bg-white border border-slate-150 rounded-xl rounded-tl-none px-4 py-3 flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#28A745] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#28A745] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#28A745] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-[10px] font-mono text-[#28A745] uppercase font-bold">typing alignment...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-slate-150 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about aligning value pools..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#123456] focus:ring-1 focus:ring-[#123456] transition duration-250"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 bg-[#123456] disabled:bg-slate-100 disabled:text-slate-350 disabled:cursor-not-allowed hover:bg-opacity-95 text-white rounded-xl transition shadow shrink-0 focus:outline-none cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Messenger Toggle Bubble */}
      <button
        id="chat-trigger-bubble"
        ref={chatBubbleRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 bg-[#123456] hover:bg-opacity-90 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#123456]/30"
        aria-label="Open AI Chat Support"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#28A745] animate-ping rounded-full" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#28A745] border-2 border-white rounded-full" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        
        {/* Hover Label */}
        <span className="absolute right-16 bg-white border border-slate-200 text-[#123456] text-xs px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-sans font-bold tracking-tight shadow-md">
          ALIGNMENT ADVISOR ON SITE
        </span>
      </button>
    </div>
  );
}
