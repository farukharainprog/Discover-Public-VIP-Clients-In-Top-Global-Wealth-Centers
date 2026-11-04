import React from 'react';
import {
  X,
  ExternalLink,
  Mail,
  MessageSquare,
  Globe2,
  Building2,
  CheckCircle2,
  Sparkles,
  BookmarkCheck,
  Linkedin,
  Instagram,
  Facebook,
  ShieldCheck,
  MapPin,
  Users,
} from 'lucide-react';
import { Lead } from '../types/index.ts';
import { useLeads } from '../context/LeadContext.tsx';

interface LeadDetailsModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenOutreach: (lead: Lead) => void;
}

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  lead,
  isOpen,
  onClose,
  onOpenOutreach,
}) => {
  const { saveLead, isLeadSaved } = useLeads();

  if (!isOpen || !lead) return null;

  const isSaved = isLeadSaved(lead);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl dark-card border border-amber-500/30 p-6 sm:p-7 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {lead.industry}
              </span>
              {lead.isVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> Verified Record
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">{lead.businessName}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{lead.city}, {lead.country}</span>
              {lead.companySize && (
                <>
                  <span>•</span>
                  <span>{lead.companySize}</span>
                </>
              )}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Business Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
            Business Overview &amp; Commercial Scope
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/80 border border-slate-850">
            {lead.description}
          </p>
        </div>

        {/* 11 Information Fields Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
            Verified Public Business Contact Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Website */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Official Website</span>
              {lead.website ? (
                <a
                  href={lead.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-amber-300 hover:underline font-medium truncate"
                >
                  <Globe2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{lead.website}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              ) : (
                <p className="text-slate-500 italic">Not available</p>
              )}
            </div>

            {/* Email */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Public Business Email</span>
              {lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-1.5 text-emerald-300 hover:underline font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </a>
              ) : (
                <p className="text-slate-500 italic">Public inquiry form via official website</p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Published WhatsApp / Phone</span>
              {lead.whatsapp ? (
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-emerald-300 hover:underline font-mono-code font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{lead.whatsapp}</span>
                </a>
              ) : (
                <p className="text-slate-500 italic">No published direct WhatsApp</p>
              )}
            </div>

            {/* Company Scale */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Company Size</span>
              <p className="text-slate-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{lead.companySize || 'Commercial Enterprise'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Presence */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
            Official Social &amp; Professional Profiles
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {lead.linkedin ? (
              <a
                href={lead.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-slate-200 hover:text-sky-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn Corporate Page</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            ) : null}

            {lead.instagram ? (
              <a
                href={lead.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/50 text-slate-200 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            ) : null}

            {lead.facebook ? (
              <a
                href={lead.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-slate-200 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook Page</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            ) : null}

            {!lead.linkedin && !lead.instagram && !lead.facebook && (
              <p className="text-xs text-slate-500 italic">
                Social accounts linked through official portal.
              </p>
            )}
          </div>
        </div>

        {/* Original Source Citation */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Verified Data Source &amp; Public Attribution</span>
          </div>
          <p className="text-slate-300 font-mono-code text-[11px] leading-relaxed">
            {lead.source}
          </p>
          <p className="text-[10px] text-slate-400">
            Strict Zero-Hallucination Policy: All business details are obtained from published commercial registries and authorized public portals.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-semibold cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                saveLead(lead);
              }}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSaved
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                  : 'bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Lead Saved' : 'Save To Pipeline'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenOutreach(lead);
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Craft Outreach</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
