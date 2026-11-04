export type LeadStatus = 'new' | 'contacted' | 'interested' | 'client' | 'not_interested';

export interface PhoneVerificationBreakdown {
  formatValid: boolean;
  reachable: boolean;
  whatsAppAvailable: boolean;
  registryVerified: boolean;
  lastCheckedDate: string;
}

export interface Lead {
  id: string;
  userId?: string;
  businessName: string;
  country: string;
  city: string;
  industry: string;
  website: string;
  email: string;
  whatsapp?: string;
  phone?: string;
  countryCode?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  description: string;
  source: string;
  isVerified: boolean;
  companySize: string;
  businessType?: string;
  status: LeadStatus;
  verificationBreakdown?: PhoneVerificationBreakdown;
  lastVerifiedDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PrivateWhatsAppLead {
  id: string;
  ownerEmail?: string;
  businessOrCreatorName: string;
  categoryType: 'Creator' | 'Business';
  subCategory: string;
  country: string;
  city: string;
  whatsapp: string;
  phone?: string;
  countryCode?: string;
  website: string;
  email: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  facebook?: string;
  linkedin?: string;
  description: string;
  source: string;
  verificationStatus: string;
  verificationBreakdown?: PhoneVerificationBreakdown;
  lastVerifiedDate?: string;
  status: LeadStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AuthorizedRole = 'super_owner' | 'invited_member' | 'trusted_family';
export type AuthorizedStatus = 'approved' | 'pending' | 'suspended' | 'revoked';

export interface AuthorizedAccount {
  id: string;
  email: string;
  role: AuthorizedRole;
  status: AuthorizedStatus;
  label?: string;
  addedAt: string;
  updatedAt: string;
  lastLogin?: string;
  notes?: string;
}

export interface SearchHistoryRecord {
  id: string;
  query: string;
  country: string;
  category: string;
  resultsCount: number;
  timestamp: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'super_owner' | 'admin' | 'vip' | 'member';
  savedLeadsCount?: number;
  tier?: 'Super Owner' | 'VIP Executive' | 'Invited Member';
  createdAt?: string;
}

export interface AdminConfig {
  searchEnabled: boolean;
  exportCsvEnabled: boolean;
  exportExcelEnabled: boolean;
  aiOutreachEnabled: boolean;
  maxLeadsPerSearch: number;
  vipAnnouncement: string;
  allowedTiers: string[];
  updatedAt?: string;
  updatedBy?: string;
}

export interface SearchFilterState {
  country: string;
  city: string;
  industry: string;
  businessType: string;
  companySize: string;
  verifiedOnly: boolean;
  hasEmailOnly: boolean;
  hasWhatsAppOnly: boolean;
  keyword: string;
}

export type SearchExecutionStatus = 'idle' | 'searching' | 'paused' | 'stopped';

export interface PrivateSearchFilterState {
  country: string;
  categoryType: 'All' | 'Creator' | 'Business';
  subCategory: string;
  whatsappOnly: boolean;
  keyword: string;
  executionStatus: SearchExecutionStatus;
}

export interface PlatformStats {
  totalLeadsFound: number;
  verifiedContacts: number;
  countriesCovered: number;
  savedLeads: number;
  contactedBusinesses: number;
  interestedBusinesses: number;
}
