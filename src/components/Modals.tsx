import React from "react";
import { X, Lock, FileText, CheckCircle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicy({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div 
        id="privacy-modal-card"
        className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden text-slate-100 shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-100">Privacy Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 transition-colors p-1.5 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300 leading-relaxed font-sans">
          <p className="text-xs text-slate-400 font-mono">Last Updated: June 22, 2026</p>
          
          <h4 className="text-slate-100 font-semibold text-base mt-2">1. Data Collected</h4>
          <p>
            MCT Aligned LLC values client and business confidentiality. We operate under a lean model that minimizes data footprint. The types of data we monitor are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Voluntary input submitted via our contact request form (Name, Email, Phone number, and organization notes).</li>
            <li>Interactive chat signals, cached briefly in single-session client variables to facilitate immediate conversation. We never store personal conversations for advertising.</li>
          </ul>

          <h4 className="text-slate-100 font-semibold text-base mt-2">2. How We Use Information</h4>
          <p>
            Your information is used solely for the original intent for which it is submitted:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To directly contact you regarding strategic consulting prompts or operational diagnostics.</li>
            <li>To process optimization frameworks custom-built for your company's value flows.</li>
          </ul>
          <p>
            We strictly do not rent, sell, or disclose your data to third-party data conglomerates, advertising intermediaries, or commercial brokers.
          </p>

          <h4 className="text-slate-100 font-semibold text-base mt-2">3. Cookies & Security Controls</h4>
          <p>
            We only use functional, secure cookies needed to keep our application fast and responsive. We enforce HTTPS encryption and rely on hardened container systems to keep communication strictly private.
          </p>

          <h4 className="text-slate-100 font-semibold text-base mt-2">4. Your Regulatory Rights</h4>
          <p>
            At any stage, you have the absolute right to demand we purge all records of your communication or contact detail forms. Simply email your directive to: <a href="mailto:brian@mctaligned.com" className="text-emerald-400 hover:underline">brian@mctaligned.com</a>.
          </p>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex gap-3.5 mt-4">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-normal">
              By working with MCT Aligned LLC, you are safe from hidden tracking services. Value flows straight back where it belongs—to you, our client.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-4.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
}

export function TermsOfService({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div 
        id="terms-modal-card"
        className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden text-slate-100 shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-100">Terms of Service</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 transition-colors p-1.5 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300 leading-relaxed font-sans">
          <p className="text-xs text-slate-400 font-mono">Last Updated: June 22, 2026</p>
          
          <h4 className="text-slate-100 font-semibold text-base mt-2">1. Scope of Engagement</h4>
          <p>
            MCT Aligned LLC provides tactical operational advisory and strategic corporate alignment planning. Our objectives are to support our clients in reducing resource leaks, bypassing wasteful middlemen processes, and reinforcing stable value systems.
          </p>

          <h4 className="text-slate-100 font-semibold text-base mt-2">2. Representation & Client Action</h4>
          <p>
            While we conduct comprehensive Value Chain Analysis, actual material cost reductions or organizational gains depend heavily on our clients' final implementation of suggested strategies. Results may vary depending on local labor configurations.
          </p>

          <h4 className="text-slate-100 font-semibold text-base mt-2">3. Acceptable Use</h4>
          <p>
            By submitting details through our portal, you guarantee that all organization names, contact indicators, and business statistics are true and represent legitimate commercial companies. Spoofing or malicious bot registrations will be filtered.
          </p>

          <h4 className="text-slate-100 font-semibold text-base mt-2">4. Disclaimers</h4>
          <p>
            Our services do not constitute certified legal, financial, or tax-audit advisory services. Clients are highly encouraged to review workflow adjustments with their relevant technical legal advisers to conform to local labor agreements.
          </p>

          <h4 className="text-slate-100 font-semibold text-base mt-2">5. Intellectual Design Owners</h4>
          <p>
            All custom layouts, branding systems, text copy, and interactive WebGL 3D designs are owned by MCT Aligned LLC or credited developers. Developed by iWebNext. All rights reserved.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-4.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition"
          >
            I Accept Terms
          </button>
        </div>
      </div>
    </div>
  );
}
