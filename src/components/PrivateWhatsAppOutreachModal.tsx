import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  X,
  FileSpreadsheet,
  FileText,
  Video,
  Palette,
  Image as ImageIcon,
  Bot,
  AlertTriangle,
  RotateCw,
  Send,
  ExternalLink,
} from 'lucide-react';
import { PrivateWhatsAppLead } from '../types/index.ts';

interface PrivateWhatsAppOutreachModalProps {
  lead: PrivateWhatsAppLead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ALL_OFFERED_SERVICES = [
  { id: 'Graphic Designing', label: 'Graphic Designing', icon: Palette },
  { id: 'Video Editing', label: 'Video Editing', icon: Video },
  { id: 'Photo Editing', label: 'Photo Editing', icon: ImageIcon },
  { id: 'Microsoft Word', label: 'Microsoft Word', icon: FileText },
  { id: 'Microsoft Excel', label: 'Microsoft Excel', icon: FileSpreadsheet },
  { id: 'Microsoft PowerPoint', label: 'Microsoft PowerPoint', icon: PresentationIcon },
  { id: 'AI Video Creation', label: 'AI Video Creation', icon: Bot },
];

function PresentationIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}

export const PrivateWhatsAppOutreachModal: React.FC<PrivateWhatsAppOutreachModalProps> = ({
  lead,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !lead) return null;

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Graphic Designing',
    'Video Editing',
    'Photo Editing',
    'Microsoft Word',
    'Microsoft Excel',
    'Microsoft PowerPoint',
    'AI Video Creation',
  ]);

  const [tone, setTone] = useState<'executive' | 'creative' | 'direct' | 'friendly'>('executive');
  const [customNote, setCustomNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [message, setMessage] = useState(() => {
    return `Hello ${lead.businessOrCreatorName}! 👋

I came across your impressive work as a ${lead.subCategory} in ${lead.country} and wanted to personally introduce my digital services.

I provide high-caliber, end-to-end creative & corporate solutions:
🎨 Graphic Designing & Visual Branding
🎬 High-Retention Video Editing & Shorts / Reels
📸 Professional Photo Editing & Retouching
🤖 Next-Gen AI Video Creation & Talking Avatars
📊 Microsoft Excel Financial Models & Automated Trackers
📄 Microsoft Word Corporate Reports & Formatted Documents
📽️ Microsoft PowerPoint Pitch Decks & Investor Presentations

Would you be open to seeing a brief sample tailored to your ${lead.subCategory} production workflow?

Looking forward to hearing your thoughts whenever convenient!

Best regards,
FARUKH BUSINESSMAN WALA`;
  });

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/private/generate-whatsapp-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: lead.businessOrCreatorName,
          categoryType: lead.categoryType,
          subCategory: lead.subCategory,
          country: lead.country,
          services: selectedServices,
          customNote,
          tone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.whatsappMessage) {
          setMessage(data.data.whatsappMessage);
        }
      }
    } catch (err) {
      console.warn('AI generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    if (!lead.whatsapp) {
      alert('This business contact does not have a published WhatsApp number. You can reach out via their official email or website.');
      return;
    }
    const cleanNum = lead.whatsapp.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl dark-card border border-amber-500/40 p-6 sm:p-7 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider font-mono-code">
              <MessageSquare className="w-3.5 h-3.5" /> Private WhatsApp Pitch Generator
            </span>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              WhatsApp Outreach for {lead.businessOrCreatorName}
            </h3>
            <p className="text-xs text-slate-400">
              {lead.subCategory} • {lead.country} • WhatsApp: <span className="font-mono-code text-emerald-400 font-bold">{lead.whatsapp || 'Published On Website'}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7 Services Selector */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center justify-between">
            <span>Advertised Services (FARUKH BUSINESSMAN WALA)</span>
            <span className="text-[10px] text-slate-400 font-normal">Select which services to highlight</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
            {ALL_OFFERED_SERVICES.map((srv) => {
              const Icon = srv.icon;
              const isSelected = selectedServices.includes(srv.id);
              return (
                <button
                  type="button"
                  key={srv.id}
                  onClick={() => toggleService(srv.id)}
                  className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-semibold shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{srv.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone and Custom Angle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Outreach Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer focus:border-amber-400"
            >
              <option value="executive">Executive &amp; VIP High-End</option>
              <option value="creative">Creative &amp; Creator-Centric</option>
              <option value="direct">Direct Business Solution</option>
              <option value="friendly">Friendly &amp; Collaborative</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Custom Angle / Target Focus (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Focus on 4K viral video pacing and luxury presentation deck..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-60"
              >
                {isGenerating ? (
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                <span>Generate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Message Editor */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300">
              Personalized WhatsApp Message (Editable Before Sending)
            </label>
            <button
              onClick={handleCopy}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>
          </div>

          <textarea
            rows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-slate-200 font-sans leading-relaxed outline-none"
          />
        </div>

        {/* Compliance Guidelines */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            WhatsApp Anti-Spam Directives: Do not send bulk automated spam. Reach out individually with tailored proposals to verified public business contacts. Respect recipient opt-outs promptly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs text-slate-300 font-semibold cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-semibold cursor-pointer"
            >
              Copy To Clipboard
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open WhatsApp &amp; Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
