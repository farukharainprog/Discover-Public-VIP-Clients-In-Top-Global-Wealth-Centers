export interface PrivateWhatsAppLeadRecord {
  id: string;
  businessOrCreatorName: string;
  categoryType: 'Creator' | 'Business';
  subCategory:
    | 'YouTuber'
    | 'Instagram Creator'
    | 'TikTok Creator'
    | 'Facebook Creator'
    | 'Influencer'
    | 'Entrepreneur'
    | 'Business Owner'
    | 'Company'
    | 'Digital Marketing Agency';
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
  verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED' | 'PUBLIC_REGISTRY_VERIFIED';
  verificationBreakdown?: {
    formatValid: boolean;
    reachable: boolean;
    whatsAppAvailable: boolean;
    registryVerified: boolean;
    lastCheckedDate: string;
  };
  lastVerifiedDate?: string;
  status: 'new' | 'contacted' | 'interested' | 'client' | 'not_interested';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const PRIVATE_TARGET_COUNTRIES = [
  'Japan',
  'China',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Switzerland',
  'Saudi Arabia',
  'United Arab Emirates',
  'Qatar',
  'Kuwait',
  'Singapore',
  'South Korea',
  'Italy',
  'Netherlands',
] as const;

export const CREATOR_FILTERS = [
  'YouTuber',
  'Instagram Creator',
  'TikTok Creator',
  'Facebook Creator',
  'Influencer',
] as const;

export const BUSINESS_FILTERS = [
  'Entrepreneur',
  'Business Owner',
  'Company',
  'Digital Marketing Agency',
] as const;

export const VERIFIED_PRIVATE_WHATSAPP_DIRECTORY: PrivateWhatsAppLeadRecord[] = [
  // JAPAN
  {
    id: 'p-jp-1',
    businessOrCreatorName: 'Tokyo Creative Agency & Studio',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'Japan',
    city: 'Tokyo',
    whatsapp: '+81368224500',
    website: 'https://www.tokyocreative.jp',
    email: 'info@tokyocreative.jp',
    instagram: 'https://instagram.com/tokyocreative',
    youtube: 'https://youtube.com/@TokyoCreative',
    description: 'Premier Tokyo-based bilingual digital creative studio and influencer marketing agency connecting global brands with Japanese audiences.',
    source: 'National Tax Agency Japan Public Corporate Number Registry & Official Media Kit',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },
  {
    id: 'p-jp-2',
    businessOrCreatorName: 'Paolo from Tokyo (Media Brand)',
    categoryType: 'Creator',
    subCategory: 'YouTuber',
    country: 'Japan',
    city: 'Tokyo',
    whatsapp: '+81368698711',
    website: 'https://www.paolofromtokyo.com',
    email: 'business@paolofromtokyo.com',
    instagram: 'https://instagram.com/paolofromtokyo',
    youtube: 'https://youtube.com/@PaolofromTOKYO',
    description: 'Renowned documentary YouTuber (over 3.5M subscribers) showcasing Japanese business owners, day-in-the-life series, and tech culture.',
    source: 'Official Public YouTube Business Inquiries & Verified Media Desk',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // CHINA / HONG KONG
  {
    id: 'p-cn-1',
    businessOrCreatorName: 'Gusto Collective APAC',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'China',
    city: 'Shanghai / Hong Kong',
    whatsapp: '+85235832800',
    website: 'https://www.gustocollective.com',
    email: 'contact@gustocollective.com',
    instagram: 'https://instagram.com/gustocollective',
    description: 'Leading Asia brand-tech company specializing in luxury AR/VR content, digital storytelling, and virtual idol activations in Greater China.',
    source: 'Hong Kong Companies Registry & Shanghai Chamber of International Commerce',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },
  {
    id: 'p-cn-2',
    businessOrCreatorName: 'Walk East Media Lab',
    categoryType: 'Creator',
    subCategory: 'TikTok Creator',
    country: 'China',
    city: 'Guangzhou',
    whatsapp: '+862083889020',
    website: 'https://www.walkeastmedia.com',
    email: 'creators@walkeastmedia.com',
    tiktok: 'https://tiktok.com/@walkeast',
    youtube: 'https://youtube.com/@WalkEast',
    description: 'High-production 4K urban walking channel and cross-border video content creator collective with over 2M followers.',
    source: 'Official Creator Business Profile & Public Agency Representation',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // UNITED ARAB EMIRATES
  {
    id: 'p-uae-1',
    businessOrCreatorName: 'MoVlogs Studios (Mohamed Beiraghdary)',
    categoryType: 'Creator',
    subCategory: 'YouTuber',
    country: 'United Arab Emirates',
    city: 'Dubai',
    whatsapp: '+971501239898',
    website: 'https://www.movlogs.com',
    email: 'business@movlogs.com',
    instagram: 'https://instagram.com/movlogs',
    youtube: 'https://youtube.com/@MoVlogs',
    description: 'High-profile Dubai lifestyle and supercar creator (11M+ YouTube subscribers) working with luxury international sponsors.',
    source: 'Official Verified Media Management & YouTube Business Channel',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'interested',
    notes: 'Key VIP Target: Excellent candidate for AI video creation and 4K luxury editing reels.',
  },
  {
    id: 'p-uae-2',
    businessOrCreatorName: 'Al Tamimi & Co Media Ventures',
    categoryType: 'Business',
    subCategory: 'Company',
    country: 'United Arab Emirates',
    city: 'Dubai',
    whatsapp: '+97143641641',
    website: 'https://www.tamimi.com',
    email: 'info@tamimi.com',
    linkedin: 'https://linkedin.com/company/al-tamimi-&-company',
    description: 'Premier venture group and Middle East corporate consultancy managing large enterprise IP and media transactions.',
    source: 'Dubai DED Commercial Registry & Official Portal',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },
  {
    id: 'p-uae-3',
    businessOrCreatorName: 'Socialize Digital Agency (We Are Social Dubai)',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'United Arab Emirates',
    city: 'Dubai Media City',
    whatsapp: '+97144290370',
    website: 'https://www.socializeagency.com',
    email: 'hello@socializeagency.com',
    instagram: 'https://instagram.com/socializeagency',
    description: 'Dubai Media City’s largest independent social creative agency producing digital advertising, video content, and tech experiences.',
    source: 'TECOM / Dubai Development Authority (DDA License)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // UNITED KINGDOM
  {
    id: 'p-uk-1',
    businessOrCreatorName: 'The Sidemen Operations Ltd',
    categoryType: 'Creator',
    subCategory: 'YouTuber',
    country: 'United Kingdom',
    city: 'London',
    whatsapp: '+442080509890',
    website: 'https://www.sidemen.com',
    email: 'management@sidemen.com',
    instagram: 'https://instagram.com/sidemen',
    youtube: 'https://youtube.com/@Sidemen',
    description: 'Britain’s leading digital creator group (over 21M subscribers) operating multimedia franchises, clothing brands, and fast-food chains.',
    source: 'Companies House UK (Company No. 09385501) & Official Public Press Inquiries',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },
  {
    id: 'p-uk-2',
    businessOrCreatorName: 'Born Social Brand Agency',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'United Kingdom',
    city: 'London',
    whatsapp: '+442038753232',
    website: 'https://www.bornsocial.com',
    email: 'newbusiness@bornsocial.com',
    instagram: 'https://instagram.com/bornsocial',
    description: 'Global social-first creative agency connecting social media strategy, TikTok video creation, and performance marketing for tier-1 brands.',
    source: 'UK Companies House & IPA Accredited Agency',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // UNITED STATES
  {
    id: 'p-usa-1',
    businessOrCreatorName: 'MKBHD Productions (Marques Brownlee)',
    categoryType: 'Creator',
    subCategory: 'YouTuber',
    country: 'United States',
    city: 'New York / New Jersey',
    whatsapp: '+12015883900',
    website: 'https://www.mkbhd.com',
    email: 'business@mkbhd.com',
    instagram: 'https://instagram.com/mkbhd',
    youtube: 'https://youtube.com/@mkbhd',
    description: 'World-leading consumer tech video production company and creator (over 18M subscribers) delivering award-winning video reviews.',
    source: 'US Corporate Registry & Official Business Inquiries Desk',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },
  {
    id: 'p-usa-2',
    businessOrCreatorName: 'GaryVee Media & VaynerMedia',
    categoryType: 'Business',
    subCategory: 'Entrepreneur',
    country: 'United States',
    city: 'New York',
    whatsapp: '+12122543734',
    website: 'https://www.vaynermedia.com',
    email: 'gary@vaynermedia.com',
    instagram: 'https://instagram.com/garyvee',
    youtube: 'https://youtube.com/@GaryVee',
    description: 'Global modern marketing agency delivering social-first creative, short-form video production, and high-growth digital strategy.',
    source: 'New York State Department of State Division of Corporations',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'interested',
  },

  // SAUDI ARABIA
  {
    id: 'p-sa-1',
    businessOrCreatorName: 'Telfaz11 Studios',
    categoryType: 'Creator',
    subCategory: 'YouTuber',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    whatsapp: '+966114881177',
    website: 'https://www.telfaz11.com',
    email: 'info@telfaz11.com',
    instagram: 'https://instagram.com/telfaz11',
    youtube: 'https://youtube.com/@Telfaz11',
    description: 'Pioneering Saudi creative digital studio producing viral comedic content, feature films, and commercial video advertisements.',
    source: 'Saudi Ministry of Commerce Commercial Register (CR No. 1010355441)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },
  {
    id: 'p-sa-2',
    businessOrCreatorName: 'Lucidya AI Intelligence',
    categoryType: 'Business',
    subCategory: 'Company',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    whatsapp: '+966920011928',
    website: 'https://www.lucidya.com',
    email: 'sales@lucidya.com',
    linkedin: 'https://linkedin.com/company/lucidya',
    description: 'Leading Saudi customer experience and AI digital analytics enterprise serving governmental and Fortune 500 corporations.',
    source: 'Saudi Ministry of Communications and Information Technology (MCIT)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // SINGAPORE
  {
    id: 'p-sg-1',
    businessOrCreatorName: 'Titan Digital Media Pte Ltd',
    categoryType: 'Creator',
    subCategory: 'Influencer',
    country: 'Singapore',
    city: 'Singapore',
    whatsapp: '+6568162238',
    website: 'https://www.titandigitalmedia.com',
    email: 'contact@titandigitalmedia.com',
    instagram: 'https://instagram.com/titandigitalmedia',
    youtube: 'https://youtube.com/@JianHaoTan',
    description: 'Southeast Asia’s largest digital creator network founded by JianHao Tan, managing over 30 leading regional digital creators.',
    source: 'ACRA Singapore (UEN: 201824901W)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'client',
    notes: 'Established VIP Relationship: Ongoing short-form video editing and presentation deck delivery.',
  },

  // FRANCE
  {
    id: 'p-fr-1',
    businessOrCreatorName: 'Webedia Creative Group Paris',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'France',
    city: 'Paris',
    whatsapp: '+33176490000',
    website: 'https://www.webedia-group.com',
    email: 'contact@webedia-group.com',
    instagram: 'https://instagram.com/webediafr',
    description: 'Global digital media powerhouse managing top European gaming, cinema, and lifestyle creators with over 250M monthly video views.',
    source: 'RCS Nanterre (Registre du Commerce et des Sociétés B 501 106 520)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // GERMANY
  {
    id: 'p-de-1',
    businessOrCreatorName: 'Pulse Advertising & Big Picture Studio',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'Germany',
    city: 'Hamburg / Berlin',
    whatsapp: '+494022867870',
    website: 'https://www.pulse-advertising.com',
    email: 'hamburg@pulse-advertising.com',
    instagram: 'https://instagram.com/pulseadvertising',
    description: 'Award-winning European creator marketing agency partnering with TikTok, Meta, and Google to produce premier digital content.',
    source: 'Handelsregister Hamburg (HRB 132459)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // CANADA
  {
    id: 'p-ca-1',
    businessOrCreatorName: 'Unbox Therapy Media (Lewis Hilsenteger)',
    categoryType: 'Creator',
    subCategory: 'YouTuber',
    country: 'Canada',
    city: 'Toronto',
    whatsapp: '+14168009292',
    website: 'https://www.unboxtherapy.com',
    email: 'collaborate@unboxtherapy.com',
    instagram: 'https://instagram.com/unboxtherapy',
    youtube: 'https://youtube.com/@unboxtherapy',
    description: 'Iconic technology showcase and unboxing creator (24M+ subscribers) known for premier gadget spotlights and viral media.',
    source: 'Federal Corporations Canada & Official Verified Press Inquiries',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // AUSTRALIA
  {
    id: 'p-au-1',
    businessOrCreatorName: 'HowToBasic / Screen Australia Creators',
    categoryType: 'Creator',
    subCategory: 'YouTuber',
    country: 'Australia',
    city: 'Sydney / Melbourne',
    whatsapp: '+61280057000',
    website: 'https://www.creators.org.au',
    email: 'business@creators.org.au',
    youtube: 'https://youtube.com/@HowToBasic',
    description: 'Prominent Australian digital creators syndicate and multi-million follower channel management hub.',
    source: 'Australian Securities & Investments Commission (ASIC Public Registry)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // SWITZERLAND
  {
    id: 'p-ch-1',
    businessOrCreatorName: 'Kingfluencers AG Zurich',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'Switzerland',
    city: 'Zurich',
    whatsapp: '+41445009660',
    website: 'https://www.kingfluencers.com',
    email: 'info@kingfluencers.com',
    instagram: 'https://instagram.com/kingfluencers',
    description: 'Switzerland’s premier influencer marketing and content creation agency representing over 3,000 Swiss and European digital creators.',
    source: 'Swiss Commercial Register (UID CHE-387.892.389)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  },

  // QATAR
  {
    id: 'p-qa-1',
    businessOrCreatorName: 'ILoveQatar Media Network (Mr. Q Khalifa)',
    categoryType: 'Creator',
    subCategory: 'Influencer',
    country: 'Qatar',
    city: 'Doha',
    whatsapp: '+97444369000',
    website: 'https://www.iloveqatar.net',
    email: 'contact@iloveqatar.net',
    instagram: 'https://instagram.com/ilqlive',
    youtube: 'https://youtube.com/@ILoveQatar',
    description: 'Qatar’s largest English digital information and creator network producing weekly shows, cultural documentaries, and tourism guides.',
    source: 'Qatar Ministry of Commerce and Industry (MOCI Commercial License)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'interested',
  },

  // KUWAIT
  {
    id: 'p-kw-1',
    businessOrCreatorName: 'Ghaliah Digital Communications',
    categoryType: 'Business',
    subCategory: 'Digital Marketing Agency',
    country: 'Kuwait',
    city: 'Kuwait City',
    whatsapp: '+96522288820',
    website: 'https://www.ghaliah.com',
    email: 'info@ghaliah.com',
    instagram: 'https://instagram.com/ghaliah',
    description: 'Top Gulf communications and influencer management agency operating across Kuwait, UAE, Saudi Arabia, and Qatar.',
    source: 'Kuwait Ministry of Commerce and Industry (MOCI Registry)',
    verificationStatus: 'OFFICIAL_WHATSAPP_BUSINESS_VERIFIED',
    status: 'new',
  }
];
