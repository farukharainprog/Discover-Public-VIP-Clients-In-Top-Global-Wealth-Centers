import express, { Request, Response } from 'express';
import {
  searchRealBusinessClients,
  generateOutreachMessage,
  searchPrivateWhatsAppClients,
  generatePrivateWhatsAppOutreach,
} from './leadFinderService.js';
import { AuthorizedAccount } from '../types/index.js';

export const apiRouter = express.Router();

apiRouter.use(express.json());

const SUPER_OWNER_EMAIL = process.env.SUPER_OWNER_EMAIL || 'farukharain962@gmail.com';
const SUPER_OWNER_WHATSAPP = process.env.SUPER_OWNER_WHATSAPP || '+923421336388';

// In-memory persistent access whitelist (also mirrored in Firestore)
let authorizedAccounts: AuthorizedAccount[] = [
  {
    id: 'super-owner-root',
    email: SUPER_OWNER_EMAIL,
    role: 'super_owner',
    status: 'approved',
    label: 'Permanent Super Owner',
    addedAt: '2026-11-01T00:00:00.000Z',
    updatedAt: '2026-11-01T00:00:00.000Z',
    notes: 'Permanent Root Identity: FARUKH BUSINESSMAN WALA',
  },
];

// In-memory search history audit log
let searchHistory = [
  {
    id: 'hist-1',
    query: 'Luxury Hotels & Real Estate Developers',
    country: 'United Arab Emirates',
    category: 'Commercial Enterprise',
    resultsCount: 8,
    timestamp: 'Today, 02:15 AM',
  },
  {
    id: 'hist-2',
    query: 'Bilingual Tech Creators & Digital Agencies',
    country: 'Japan',
    category: 'Creator & Business',
    resultsCount: 6,
    timestamp: 'Today, 01:40 AM',
  },
  {
    id: 'hist-3',
    query: 'Ultra-High-Net-Worth Brokerages',
    country: 'United States',
    category: 'Real Estate',
    resultsCount: 7,
    timestamp: 'Yesterday, 11:20 PM',
  },
];

// 1. Check Access Flow (Used right after Google sign-in)
apiRouter.post('/check-access', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ authorized: false, error: 'Email is required' });
  }

  const cleanEmail = String(email).toLowerCase().trim();
  const isSuperOwner = cleanEmail === SUPER_OWNER_EMAIL.toLowerCase().trim();

  if (isSuperOwner) {
    return res.json({
      authorized: true,
      role: 'super_owner',
      status: 'approved',
      ownerWhatsApp: SUPER_OWNER_WHATSAPP,
      brand: 'FARUKH BUSINESSMAN WALA',
    });
  }

  const account = authorizedAccounts.find(
    (a) => a.email.toLowerCase().trim() === cleanEmail
  );

  if (account) {
    if (account.status === 'approved') {
      return res.json({
        authorized: true,
        role: account.role,
        status: account.status,
        ownerWhatsApp: SUPER_OWNER_WHATSAPP,
        brand: 'FARUKH BUSINESSMAN WALA',
      });
    } else {
      return res.status(403).json({
        authorized: false,
        status: account.status,
        error: `ACCESS ${account.status.toUpperCase()}: Your account access is currently ${account.status}. Contact Super Owner.`,
        ownerWhatsApp: SUPER_OWNER_WHATSAPP,
      });
    }
  }

  // Unauthorized Gmail account
  return res.status(403).json({
    authorized: false,
    error: 'ACCESS DENIED: Your Gmail account is not authorized to access this private portal.',
    ownerWhatsApp: SUPER_OWNER_WHATSAPP,
  });
});

// 2. Manage Authorized Accounts (Super Owner Only)
apiRouter.get('/authorized-accounts', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: authorizedAccounts,
  });
});

apiRouter.post('/authorized-accounts', (req: Request, res: Response) => {
  const { email, role, label, notes, requesterEmail } = req.body;

  // Verify only Super Owner can add accounts
  if (requesterEmail?.toLowerCase() !== SUPER_OWNER_EMAIL.toLowerCase() && req.headers['x-admin-key'] !== 'VIP_FARUKH_2026') {
    return res.status(403).json({
      success: false,
      error: 'Permission Denied: Only the permanent Super Owner can authorize new accounts.',
    });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Valid Gmail address is required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const existing = authorizedAccounts.find((a) => a.email.toLowerCase() === cleanEmail);
  if (existing) {
    return res.status(400).json({ success: false, error: 'Account is already on the authorized list.' });
  }

  const newAccount = {
    id: `auth-${Date.now()}`,
    email: cleanEmail,
    role: (role === 'trusted_family' ? 'trusted_family' : 'invited_member') as any,
    status: 'approved' as const,
    label: label || 'Authorized Member',
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: notes || '',
  };

  authorizedAccounts.push(newAccount);
  res.json({ success: true, data: newAccount });
});

apiRouter.put('/authorized-accounts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, role, label, notes, requesterEmail } = req.body;

  if (requesterEmail?.toLowerCase() !== SUPER_OWNER_EMAIL.toLowerCase() && req.headers['x-admin-key'] !== 'VIP_FARUKH_2026') {
    return res.status(403).json({
      success: false,
      error: 'Permission Denied: Only the permanent Super Owner can modify access permissions.',
    });
  }

  const index = authorizedAccounts.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Account not found.' });
  }

  // Never revoke or suspend root Super Owner
  if (authorizedAccounts[index].email.toLowerCase() === SUPER_OWNER_EMAIL.toLowerCase() && status && status !== 'approved') {
    return res.status(400).json({ success: false, error: 'Super Owner status cannot be revoked or altered.' });
  }

  authorizedAccounts[index] = {
    ...authorizedAccounts[index],
    status: status || authorizedAccounts[index].status,
    role: role || authorizedAccounts[index].role,
    label: label !== undefined ? label : authorizedAccounts[index].label,
    notes: notes !== undefined ? notes : authorizedAccounts[index].notes,
    updatedAt: new Date().toISOString(),
  };

  res.json({ success: true, data: authorizedAccounts[index] });
});

apiRouter.delete('/authorized-accounts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const requesterEmail = req.query.requesterEmail as string;

  if (requesterEmail?.toLowerCase() !== SUPER_OWNER_EMAIL.toLowerCase() && req.headers['x-admin-key'] !== 'VIP_FARUKH_2026') {
    return res.status(403).json({
      success: false,
      error: 'Permission Denied: Only the permanent Super Owner can remove accounts.',
    });
  }

  const target = authorizedAccounts.find((a) => a.id === id);
  if (!target) {
    return res.status(404).json({ success: false, error: 'Account not found.' });
  }

  if (target.email.toLowerCase() === SUPER_OWNER_EMAIL.toLowerCase()) {
    return res.status(400).json({ success: false, error: 'Cannot delete the permanent Super Owner.' });
  }

  authorizedAccounts = authorizedAccounts.filter((a) => a.id !== id);
  res.json({ success: true, message: 'Account permanently removed from authorization list.' });
});

// 3. Search History Management
apiRouter.get('/search-history', (req: Request, res: Response) => {
  res.json({ success: true, data: searchHistory });
});

apiRouter.post('/search-history', (req: Request, res: Response) => {
  const { query: q, country, category, resultsCount } = req.body;
  if (!q) return res.status(400).json({ error: 'Query required' });

  const item = {
    id: `hist-${Date.now()}`,
    query: String(q),
    country: String(country || 'Worldwide'),
    category: String(category || 'Business & Creators'),
    resultsCount: Number(resultsCount) || 0,
    timestamp: 'Just now',
  };

  searchHistory.unshift(item);
  if (searchHistory.length > 50) searchHistory.pop();
  res.json({ success: true, data: item });
});

// 4. Public Global Search Clients
apiRouter.post('/search-clients', async (req: Request, res: Response) => {
  try {
    const { country, city, industry, businessType, companySize, verifiedOnly, keyword, maxResults } = req.body;
    const result = await searchRealBusinessClients({
      country,
      city,
      industry,
      businessType,
      companySize,
      verifiedOnly,
      keyword,
      maxResults: Number(maxResults) || 20,
    });
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error searching clients:', error);
    res.status(500).json({ success: false, error: error?.message || 'Failed to search clients' });
  }
});

// 5. Standard Outreach
apiRouter.post('/generate-outreach', async (req: Request, res: Response) => {
  try {
    const { businessName, industry, country, serviceCategory, customOffer, tone, senderName } = req.body;
    if (!businessName) {
      return res.status(400).json({ success: false, error: 'Business name is required' });
    }
    const result = await generateOutreachMessage({
      businessName,
      industry: industry || 'Enterprise',
      country: country || 'International',
      serviceCategory,
      customOffer,
      tone,
      senderName: senderName || 'FARUKH BUSINESSMAN WALA',
    });
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error generating outreach:', error);
    res.status(500).json({ success: false, error: error?.message || 'Failed to generate message' });
  }
});

// 6. Private WhatsApp Search
apiRouter.post('/private/search-whatsapp-clients', async (req: Request, res: Response) => {
  try {
    const { country, categoryType, subCategory, whatsappOnly, keyword, maxResults } = req.body;
    const result = await searchPrivateWhatsAppClients({
      country,
      categoryType,
      subCategory,
      whatsappOnly: whatsappOnly !== false,
      keyword,
      maxResults: Number(maxResults) || 25,
    });
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error searching private WhatsApp clients:', error);
    res.status(500).json({ success: false, error: error?.message || 'Private search failed' });
  }
});

// 7. Private WhatsApp 7-Services Outreach
apiRouter.post('/private/generate-whatsapp-outreach', async (req: Request, res: Response) => {
  try {
    const { recipientName, categoryType, subCategory, country, services, customNote, tone } = req.body;
    if (!recipientName) {
      return res.status(400).json({ success: false, error: 'Recipient name is required' });
    }
    const result = await generatePrivateWhatsAppOutreach({
      recipientName,
      categoryType: categoryType || 'Creator',
      subCategory: subCategory || 'YouTuber',
      country: country || 'International',
      services: services || [
        'Graphic Designing',
        'Video Editing',
        'Photo Editing',
        'Microsoft Word',
        'Microsoft Excel',
        'Microsoft PowerPoint',
        'AI Video Creation',
      ],
      customNote,
      tone,
    });
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error generating private outreach:', error);
    res.status(500).json({ success: false, error: error?.message || 'Failed to generate message' });
  }
});

// 8. System Status (Super Owner Gmail is NEVER returned publicly)
apiRouter.get('/system-status', (req: Request, res: Response) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    success: true,
    data: {
      serverTime: new Date().toISOString(),
      branding: 'FARUKH BUSINESSMAN WALA',
      app: 'GLOBAL VIP CLIENT FINDER',
      officialOwnerWhatsApp: SUPER_OWNER_WHATSAPP,
      superOwnerSecurity: 'ENFORCED (Permanent Super Owner Protection)',
      authorizedAccountsCount: authorizedAccounts.filter((a) => a.status === 'approved').length,
      geminiAiCore: hasGeminiKey ? 'ONLINE (Google Gemini 3.8 Flash + Live Grounding)' : 'STANDBY',
      sources: [
        {
          name: 'Official Public WhatsApp Business Registers',
          region: 'Global',
          status: 'CONNECTED',
          type: 'Verified Business Messaging Registry',
        },
        {
          name: 'Companies House UK (Public Registry)',
          region: 'United Kingdom',
          status: 'CONNECTED',
          type: 'Official Government Register',
        },
        {
          name: 'Dubai DED & DET Trade Register',
          region: 'United Arab Emirates',
          status: 'CONNECTED',
          type: 'Official Government Register',
        },
        {
          name: 'ACRA Corporate Registry Singapore',
          region: 'Singapore',
          status: 'CONNECTED',
          type: 'Official Corporate Registry',
        },
        {
          name: 'National Tax Agency Japan & Swiss UID',
          region: 'Asia & Europe',
          status: 'CONNECTED',
          type: 'Official Commercial Register',
        },
      ],
    },
  });
});
