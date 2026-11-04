import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Mail,
  MessageSquare,
  AlertTriangle,
  RotateCw,
  X,
  FileText,
} from 'lucide-react';
import { Lead } from '../types/index.ts';

interface AiOutreachModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AiOutreachModal: React.FC<AiOutreachModalProps> = ({ lead, isOpen, onClose }) => {
  if (!isOpen || !lead) return null;

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'graphic design',
    'video editing',
    'AI video creation',
    'digital content services',
  ]);

  const [senderName, setSenderName] = useState('FARUKH BUSINESSMAN WALA');
  const [tone, setTone] = useState<'executive' | 'friendly' | 'high_converting' | 'concise'>('executive');
  const [customOffer, setCustomOffer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);

  const [generatedSubject, setGeneratedSubject] = useState(
    `Exploring High-Impact Digital Media Synergy for ${lead.businessName}`
  );

  const [generatedMessage, setGeneratedMessage] = useState(
    `Hello ${lead.businessName} Team,

I came across your distinguished business and wanted to introduce my digital services.

I provide professional graphic design, video editing, AI video creation, and digital content services tailored specifically for premier ${lead.industry} enterprises in ${lead.country}.

Would you be interested in exploring how I could help your business elevate its visual presence and attract more high-value clients?

I would be delighted to share a brief tailored showcase for your review whenever convenient.

Best regards,
FARUKH BUSINESSMAN WALA`
  );

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleGenerateAiMessage = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: lead.businessName,
          industry: lead.industry,
          country: lead.country,
          serviceCategory: selectedServices.join(', '),
          customOffer,
          tone,
          senderName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setGeneratedSubject(data.data.subject);
          setGeneratedMessage(data.data.message);
        }
      }
    } catch (err) {
      console.warn('AI outreach generation client error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleCopySubject = () => {
    navigator.clipboard.writeText(generatedSubject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleOpenEmail = () => {
    const mailto = `mailto:${lead.email || ''}?subject=${encodeURIComponent(
      generatedSubject
    )}&body=${encodeURIComponent(generatedMessage)}`;
    window.location.href = mailto;
  };

  const handleOpenWhatsApp = () => {
    if (!lead.whatsapp) {
      alert('This business does not have an officially published WhatsApp number. Please use public email or official portal.');
      return;
    }
    const cleanNumber = lead.whatsapp.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(generatedMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl dark-card border border-amber-500/30 p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase">
              <Sparkles className="w-3 h-3" /> AI Outreach Generator
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Personalized Outreach for {lead.businessName}
            </h3>
            <p className="text-xs text-slate-400">
              {lead.city}, {lead.country} • {lead.industry}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Services Checklist */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide">
              Services Included In Pitch
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                'graphic design',
                'video editing',
                'AI video creation',
                'digital content services',
                'web design & branding',
                'motion graphics',
              ].map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-2 text-slate-300 cursor-pointer select-none text-[11px]"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => toggleService(service)}
                    className="rounded accent-amber-500"
                  />
                  <span className="capitalize">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tone & Signature */}
          <div className="space-y-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
                Tone of Message
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none cursor-pointer"
              >
                <option value="executive">Executive &amp; Prestigious (High Net Worth)</option>
                <option value="high_converting">High-Converting Direct Value</option>
                <option value="friendly">Polite &amp; Relationship-Focused</option>
                <option value="concise">Concise 3-Sentence Direct Pitch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
                Sender Signature
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-amber-300 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Generates tailored English outreach respecting business communication etiquette.
          </p>
          <button
            onClick={handleGenerateAiMessage}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Crafting Message...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Regenerate with AI</span>
              </>
            )}
          </button>
        </div>

        {/* Subject Line Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Subject Line
            </label>
            <button
              onClick={handleCopySubject}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              {copiedSubject ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSubject ? 'Copied' : 'Copy Subject'}</span>
            </button>
          </div>
          <input
            type="text"
            value={generatedSubject}
            onChange={(e) => setGeneratedSubject(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white outline-none"
          />
        </div>

        {/* Editable Message Body */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300">
              Message Body (Editable before sending)
            </label>
            <button
              onClick={handleCopyMessage}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              {copiedMessage ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedMessage ? 'Copied to Clipboard!' : 'Copy Full Message'}</span>
            </button>
          </div>
          <textarea
            rows={8}
            value={generatedMessage}
            onChange={(e) => setGeneratedMessage(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-slate-200 font-sans leading-relaxed outline-none"
          />
        </div>

        {/* Compliance Notice */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-[11px] text-amber-300/90 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-300">Ethical Outreach &amp; Privacy Rule:</p>
            <p>
              Do not automatically send bulk unsolicited messages. Only contact verified business entities for legitimate commercial services, require appropriate consent, and promptly respect all opt-outs.
            </p>
          </div>
        </div>

        {/* Dispatch Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-semibold cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {lead.whatsapp && (
              <button
                onClick={handleOpenWhatsApp}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Send WhatsApp ({lead.whatsapp})
              </button>
            )}

            <button
              onClick={handleOpenEmail}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              <Mail className="w-3.5 h-3.5 stroke-[2.5]" /> Launch Email Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
