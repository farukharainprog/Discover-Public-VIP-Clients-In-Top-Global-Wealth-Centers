export interface LeadRecord {
  id: string;
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
  verificationBreakdown?: {
    formatValid: boolean;
    reachable: boolean;
    whatsAppAvailable: boolean;
    registryVerified: boolean;
    lastCheckedDate: string;
  };
  lastVerifiedDate?: string;
  companySize: string;
  businessType?: string;
  status?: 'new' | 'contacted' | 'interested' | 'not_interested';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const TARGET_COUNTRIES = [
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Canada',
  'Australia',
  'Germany',
  'Switzerland',
  'France',
  'Singapore',
] as const;

export const TARGET_INDUSTRIES = [
  'Real Estate',
  'Luxury Hotels',
  'Restaurants',
  'Construction Companies',
  'E-commerce Businesses',
  'Marketing Agencies',
  'Clothing Brands',
  'Car Dealerships',
  'Business Consultants',
  'Travel Agencies',
  'Property Dealers',
] as const;

export const COMPANY_SIZES = [
  '1-10 employees (Boutique)',
  '11-50 employees (Growing)',
  '51-200 employees (Mid-Market)',
  '200+ employees (Enterprise)',
] as const;

export const VERIFIED_GLOBAL_DIRECTORY: LeadRecord[] = [
  // UAE
  {
    id: 'lead-uae-1',
    businessName: 'Emaar Properties PJSC',
    country: 'United Arab Emirates',
    city: 'Dubai',
    industry: 'Real Estate',
    website: 'https://www.emaar.com',
    email: 'enquiry@emaar.com',
    whatsapp: '+97143661688',
    facebook: 'https://facebook.com/emaardubai',
    instagram: 'https://instagram.com/emaardubai',
    linkedin: 'https://linkedin.com/company/emaar-properties',
    description: 'Master developer of iconic projects including Burj Khalifa, Dubai Mall, and master-planned communities across the Middle East.',
    source: 'Dubai DED Public Registry & Official Corporate Portal',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Public Listed Developer'
  },
  {
    id: 'lead-uae-2',
    businessName: 'Jumeirah Group',
    country: 'United Arab Emirates',
    city: 'Dubai',
    industry: 'Luxury Hotels',
    website: 'https://www.jumeirah.com',
    email: 'info@jumeirah.com',
    whatsapp: '+97143647555',
    facebook: 'https://facebook.com/jumeirah',
    instagram: 'https://instagram.com/jumeirah',
    linkedin: 'https://linkedin.com/company/jumeirah-group',
    description: 'World-renowned luxury hospitality management company operating Burj Al Arab and premier ultra-luxury resorts globally.',
    source: 'Dubai Department of Economy & Tourism (DET)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Ultra-Luxury Hospitality'
  },
  {
    id: 'lead-uae-3',
    businessName: 'DAMAC Properties',
    country: 'United Arab Emirates',
    city: 'Dubai',
    industry: 'Property Dealers',
    website: 'https://www.damacproperties.com',
    email: 'enquiry@damacgroup.com',
    whatsapp: '+97143731000',
    facebook: 'https://facebook.com/damacpropertiesofficial',
    instagram: 'https://instagram.com/damacofficial',
    linkedin: 'https://linkedin.com/company/damac-properties',
    description: 'Premier luxury real estate developer in the Middle East offering high-end residential, leisure, and commercial properties.',
    source: 'Dubai Land Department (DLD) Official Registry',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Luxury Real Estate'
  },
  {
    id: 'lead-uae-4',
    businessName: 'Al Naboodah Construction Group',
    country: 'United Arab Emirates',
    city: 'Dubai',
    industry: 'Construction Companies',
    website: 'https://www.alnaboodahconstruction.com',
    email: 'construction@alnaboodah.com',
    whatsapp: '+97142948777',
    linkedin: 'https://linkedin.com/company/al-naboodah-construction-group-llc',
    description: 'One of the UAE’s leading civil engineering, building and MEP contractors delivering landmark infrastructure.',
    source: 'UAE Ministry of Economy Trade Registry',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'General Contracting & MEP'
  },
  {
    id: 'lead-uae-5',
    businessName: 'Al Tayer Motors',
    country: 'United Arab Emirates',
    city: 'Dubai',
    industry: 'Car Dealerships',
    website: 'https://www.altayermotors.com',
    email: 'crm@altayer.com',
    whatsapp: '+971800668677',
    facebook: 'https://facebook.com/altayermotors',
    instagram: 'https://instagram.com/altayermotors',
    linkedin: 'https://linkedin.com/company/al-tayer-motors',
    description: 'Official luxury automotive dealership representing Ferrari, Maserati, Jaguar, Land Rover, and Ford in UAE.',
    source: 'Dubai Chamber of Commerce Directory',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Luxury Automobile Importer'
  },

  // United Kingdom
  {
    id: 'lead-uk-1',
    businessName: 'Savills UK Commercial & Residential',
    country: 'United Kingdom',
    city: 'London',
    industry: 'Real Estate',
    website: 'https://www.savills.co.uk',
    email: 'ukcorporate@savills.com',
    facebook: 'https://facebook.com/savills',
    instagram: 'https://instagram.com/savills',
    linkedin: 'https://linkedin.com/company/savills',
    description: 'Global real estate services provider listed on the London Stock Exchange offering prime residential & commercial agency.',
    source: 'Companies House UK (Company No. 02122174)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Public Commercial Brokerage'
  },
  {
    id: 'lead-uk-2',
    businessName: 'The Savoy London',
    country: 'United Kingdom',
    city: 'London',
    industry: 'Luxury Hotels',
    website: 'https://www.thesavoylondon.com',
    email: 'savoy@fairmont.com',
    whatsapp: '+442078364343',
    facebook: 'https://facebook.com/thesavoylondon',
    instagram: 'https://instagram.com/thesavoylondon',
    linkedin: 'https://linkedin.com/company/the-savoy',
    description: 'Britain’s most iconic historic 5-star luxury hotel on the Strand offering Michelin-star dining and world-class suites.',
    source: 'UK Companies House Registry & Westminster Licensing',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Heritage 5-Star Hotel'
  },
  {
    id: 'lead-uk-3',
    businessName: 'AMV BBDO London',
    country: 'United Kingdom',
    city: 'London',
    industry: 'Marketing Agencies',
    website: 'https://www.amvbbdo.com',
    email: 'newbusiness@amvbbdo.com',
    instagram: 'https://instagram.com/amvbbdo',
    linkedin: 'https://linkedin.com/company/amv-bbdo',
    description: 'Award-winning creative advertising agency producing breakthrough global campaigns and digital brand transformations.',
    source: 'IPA UK & Companies House (00921703)',
    isVerified: true,
    companySize: '51-200 employees (Mid-Market)',
    businessType: 'Creative & Digital Agency'
  },
  {
    id: 'lead-uk-4',
    businessName: 'HR Owen Luxury Dealership',
    country: 'United Kingdom',
    city: 'London',
    industry: 'Car Dealerships',
    website: 'https://www.hrowen.co.uk',
    email: 'enquiries@hrowen.co.uk',
    whatsapp: '+442072441000',
    instagram: 'https://instagram.com/hrowensupercars',
    linkedin: 'https://linkedin.com/company/h-r-owen',
    description: 'Britain’s premier prestige sports and luxury motor dealer representing Rolls-Royce, Bentley, Bugatti, and Aston Martin.',
    source: 'Companies House UK Registered Dealer',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Prestige Motor Retailer'
  },

  // United States
  {
    id: 'lead-usa-1',
    businessName: 'The Agency RE',
    country: 'United States',
    city: 'Beverly Hills',
    industry: 'Real Estate',
    website: 'https://www.theagencyre.com',
    email: 'contact@theagencyre.com',
    whatsapp: '+14242303700',
    facebook: 'https://facebook.com/theagencyre',
    instagram: 'https://instagram.com/theagencyre',
    linkedin: 'https://linkedin.com/company/the-agency-re',
    description: 'Full-service luxury real estate brokerage and lifestyle company representing prestigious properties across the globe.',
    source: 'California Department of Real Estate (DRE #01904054)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Luxury Boutique Brokerage'
  },
  {
    id: 'lead-usa-2',
    businessName: 'The Carlyle, A Rosewood Hotel',
    country: 'United States',
    city: 'New York',
    industry: 'Luxury Hotels',
    website: 'https://www.rosewoodhotels.com/en/the-carlyle-new-york',
    email: 'thecarlyle@rosewoodhotels.com',
    whatsapp: '+12127441600',
    facebook: 'https://facebook.com/rosewoodcarlyle',
    instagram: 'https://instagram.com/rosewoodthecarlyle',
    linkedin: 'https://linkedin.com/company/rosewood-hotel-group',
    description: 'A legendary Manhattan beacon of elegance on the Upper East Side, serving world leaders, royalty, and high-net-worth travelers.',
    source: 'New York State Division of Corporations Public Record',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Luxury Landmark Hospitality'
  },
  {
    id: 'lead-usa-3',
    businessName: 'Huge Inc. Digital Strategy',
    country: 'United States',
    city: 'Brooklyn',
    industry: 'Marketing Agencies',
    website: 'https://www.hugeinc.com',
    email: 'business@hugeinc.com',
    facebook: 'https://facebook.com/hugeinc',
    instagram: 'https://instagram.com/hugeinc',
    linkedin: 'https://linkedin.com/company/huge',
    description: 'Global experience agency combining product design, digital marketing, AI experiences, and technology consulting.',
    source: 'US Corporate Filing & SEC Registered Parent IPG',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Global Experience Design'
  },
  {
    id: 'lead-usa-4',
    businessName: 'Bespoke Real Estate',
    country: 'United States',
    city: 'Water Mill',
    industry: 'Property Dealers',
    website: 'https://www.bespokerealestate.com',
    email: 'info@bespokerealestate.com',
    whatsapp: '+16315009030',
    instagram: 'https://instagram.com/bespokerealestate',
    linkedin: 'https://linkedin.com/company/bespoke-real-estate',
    description: 'The first and only firm solely catering to properties valued at $10 million and above in the Hamptons, Manhattan, and Florida.',
    source: 'NYS DOS Public Licensing & OpenCorporates US',
    isVerified: true,
    companySize: '11-50 employees (Growing)',
    businessType: 'Ultra-High-Net-Worth Brokerage'
  },

  // Saudi Arabia
  {
    id: 'lead-sa-1',
    businessName: 'ROSHN Group',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    industry: 'Real Estate',
    website: 'https://www.roshn.sa',
    email: 'contact@roshn.sa',
    whatsapp: '+966920022288',
    facebook: 'https://facebook.com/roshnksa',
    instagram: 'https://instagram.com/roshnksa',
    linkedin: 'https://linkedin.com/company/roshnksa',
    description: 'PIF-backed national real estate developer creating human-centric, integrated communities as part of Saudi Vision 2030.',
    source: 'Saudi Ministry of Commerce Commercial Registration',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Giga-Project Developer'
  },
  {
    id: 'lead-sa-2',
    businessName: 'The Ritz-Carlton Riyadh',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    industry: 'Luxury Hotels',
    website: 'https://www.ritzcarlton.com/riyadh',
    email: 'riyadh.reservations@ritzcarlton.com',
    whatsapp: '+966118028020',
    instagram: 'https://instagram.com/ritzcarltonriyadh',
    linkedin: 'https://linkedin.com/company/the-ritz-carlton-hotel-company-l-l-c-',
    description: 'Majestic palace hotel featuring 52 acres of landscaped gardens, Olympic swimming pool, and royal ballrooms in the capital.',
    source: 'Saudi Tourism Authority & Ministry of Commerce',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Palatial Hospitality'
  },
  {
    id: 'lead-sa-3',
    businessName: 'Al Bawani Holding Co.',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    industry: 'Construction Companies',
    website: 'https://www.albawani.net',
    email: 'info@albawani.net',
    whatsapp: '+966114197777',
    linkedin: 'https://linkedin.com/company/al-bawani-co.-ltd',
    description: 'Class-A engineering and construction conglomerate delivering mega infrastructure, healthcare, and governmental complexes.',
    source: 'Riyadh Chamber of Commerce Registry',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'General Contracting'
  },

  // Qatar
  {
    id: 'lead-qa-1',
    businessName: 'United Development Company (UDC Qatar)',
    country: 'Qatar',
    city: 'Doha',
    industry: 'Real Estate',
    website: 'https://www.udcqatar.com',
    email: 'customercare@udcqatar.com',
    whatsapp: '+97444095155',
    facebook: 'https://facebook.com/thepearlqatar',
    instagram: 'https://instagram.com/thepearlqatar',
    linkedin: 'https://linkedin.com/company/united-development-company-udc',
    description: 'Leading Qatari shareholding company and master developer of The Pearl Island and Gewan Island in Doha.',
    source: 'Qatar Ministry of Commerce and Industry (MOCI)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Master Community Developer'
  },
  {
    id: 'lead-qa-2',
    businessName: 'Katara Hospitality',
    country: 'Qatar',
    city: 'Doha',
    industry: 'Luxury Hotels',
    website: 'https://www.katarahospitality.com',
    email: 'info@katarahospitality.com',
    whatsapp: '+97444237777',
    instagram: 'https://instagram.com/katarahospitality',
    linkedin: 'https://linkedin.com/company/katara-hospitality',
    description: 'Global hotel owner, developer, and operator owning iconic luxury assets across Qatar, Europe, and North America.',
    source: 'Qatar Chamber of Commerce Commercial Registry',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Sovereign Luxury Hospitality'
  },

  // Kuwait
  {
    id: 'lead-kw-1',
    businessName: 'Mabanee Company (KPSC)',
    country: 'Kuwait',
    city: 'Kuwait City',
    industry: 'Real Estate',
    website: 'https://www.mabanee.com',
    email: 'info@mabanee.com',
    whatsapp: '+96522244444',
    instagram: 'https://instagram.com/mabaneeco',
    linkedin: 'https://linkedin.com/company/mabanee-company',
    description: 'Premier Kuwaiti real estate company, developer of The Avenues Mall, one of the largest retail and leisure destinations in the world.',
    source: 'Kuwait Ministry of Commerce and Industry',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Commercial Real Estate'
  },
  {
    id: 'lead-kw-2',
    businessName: 'Four Seasons Hotel Kuwait at Burj Alshaya',
    country: 'Kuwait',
    city: 'Kuwait City',
    industry: 'Luxury Hotels',
    website: 'https://www.fourseasons.com/kuwait',
    email: 'contactus.kuwait@fourseasons.com',
    whatsapp: '+96522006000',
    instagram: 'https://instagram.com/fskuwait',
    linkedin: 'https://linkedin.com/company/four-seasons-hotels-and-resorts',
    description: 'Luxury hospitality destination in Kuwait City featuring modernist architectural design, fine dining, and penthouse spas.',
    source: 'Kuwait Direct Investment Promotion Authority (KDIPA)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: '5-Star Luxury Hotel'
  },

  // Canada
  {
    id: 'lead-ca-1',
    businessName: 'Concord Pacific Developments Inc.',
    country: 'Canada',
    city: 'Vancouver',
    industry: 'Real Estate',
    website: 'https://www.concordpacific.com',
    email: 'marketing@concordpacific.com',
    whatsapp: '+16048998800',
    facebook: 'https://facebook.com/concordpacific',
    instagram: 'https://instagram.com/concordpacific',
    linkedin: 'https://linkedin.com/company/concord-pacific-developments-inc.',
    description: 'Canada’s largest master-planned community builder, transforming waterfront skyline properties in Vancouver, Toronto, and Calgary.',
    source: 'Corporations Canada (Federal Registry #228491-0)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'High-Density Residential Builder'
  },
  {
    id: 'lead-ca-2',
    businessName: 'Fairmont Chateau Whistler',
    country: 'Canada',
    city: 'Whistler',
    industry: 'Luxury Hotels',
    website: 'https://www.fairmont.com/whistler',
    email: 'chateauwhistler@fairmont.com',
    whatsapp: '+16049388000',
    instagram: 'https://instagram.com/fairmontwhistlr',
    linkedin: 'https://linkedin.com/company/fairmont-chateau-whistler',
    description: 'Landmark alpine resort and golf club located at the base of Blackcomb Mountain, catering to international luxury travelers.',
    source: 'BC Corporate Registry & Destination BC',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Alpine Luxury Resort'
  },

  // Australia
  {
    id: 'lead-au-1',
    businessName: 'Meriton Suites & Apartments',
    country: 'Australia',
    city: 'Sydney',
    industry: 'Real Estate',
    website: 'https://www.meriton.com.au',
    email: 'sales@meriton.com.au',
    whatsapp: '+61292872888',
    facebook: 'https://facebook.com/meritonapartments',
    instagram: 'https://instagram.com/meriton_apartments',
    linkedin: 'https://linkedin.com/company/meriton-group',
    description: 'Australia’s largest residential property developer and luxury apartment operator, founded by Harry Triguboff.',
    source: 'Australian Securities & Investments Commission (ASIC ACN 000 644 880)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Major Residential Developer'
  },
  {
    id: 'lead-au-2',
    businessName: 'The Langham Sydney',
    country: 'Australia',
    city: 'Sydney',
    industry: 'Luxury Hotels',
    website: 'https://www.langhamhotels.com/en/the-langham/sydney',
    email: 'tlsyd.info@langhamhotels.com',
    whatsapp: '+61292562222',
    instagram: 'https://instagram.com/langhamsydney',
    linkedin: 'https://linkedin.com/company/langham-hospitality-group',
    description: 'Sydney’s most exclusive harbourside luxury boutique hotel nestled in the historic The Rocks district.',
    source: 'NSW Business Names Register & ASIC',
    isVerified: true,
    companySize: '51-200 employees (Mid-Market)',
    businessType: '5-Star Boutique Hospitality'
  },

  // Germany
  {
    id: 'lead-de-1',
    businessName: 'Engel & Völkers AG',
    country: 'Germany',
    city: 'Hamburg',
    industry: 'Real Estate',
    website: 'https://www.engelvoelkers.com',
    email: 'info@engelvoelkers.com',
    whatsapp: '+4940361310',
    facebook: 'https://facebook.com/EngelVoelkersAG',
    instagram: 'https://instagram.com/engelvoelkers_global',
    linkedin: 'https://linkedin.com/company/engel-&-v-lkers',
    description: 'Global leader in the brokerage of premium residential property, commercial real estate, yachts, and private aircraft.',
    source: 'Handelsregister Hamburg (HRB 74900)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Premium Global Brokerage'
  },
  {
    id: 'lead-de-2',
    businessName: 'Hotel Adlon Kempinski Berlin',
    country: 'Germany',
    city: 'Berlin',
    industry: 'Luxury Hotels',
    website: 'https://www.kempinski.com/en/hotel-adlon',
    email: 'adlon@kempinski.com',
    whatsapp: '+493022610',
    instagram: 'https://instagram.com/hoteladlonkempinski',
    linkedin: 'https://linkedin.com/company/kempinski-hotels',
    description: 'Legendary grand hotel directly beside the Brandenburg Gate, epitomizing German luxury hospitality since 1907.',
    source: 'Amtsgericht Charlottenburg Handelsregister',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Grand Luxury Hotel'
  },

  // Switzerland
  {
    id: 'lead-ch-1',
    businessName: 'Baur au Lac Hotel Zurich',
    country: 'Switzerland',
    city: 'Zurich',
    industry: 'Luxury Hotels',
    website: 'https://www.bauraulac.ch',
    email: 'info@bauraulac.ch',
    whatsapp: '+41442205020',
    instagram: 'https://instagram.com/bauraulac',
    linkedin: 'https://linkedin.com/company/baur-au-lac',
    description: 'One of the world’s oldest iconic luxury 5-star hotels, privately owned for six generations in a private park by Lake Zurich.',
    source: 'Swiss Commercial Register (Handelsregister Kanton Zürich UID CHE-105.834.721)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Privately Owned 5-Star Hotel'
  },
  {
    id: 'lead-ch-2',
    businessName: 'Kardex Group Switzerland',
    country: 'Switzerland',
    city: 'Zurich',
    industry: 'Business Consultants',
    website: 'https://www.kardex.com',
    email: 'info@kardex.com',
    linkedin: 'https://linkedin.com/company/kardex',
    description: 'Global industry partner for intra-logistics solutions and automated storage and retrieval consulting.',
    source: 'SIX Swiss Exchange Listed & Swiss Commercial Register',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Industrial Technology & Consulting'
  },

  // France
  {
    id: 'lead-fr-1',
    businessName: 'Sotheby’s International Realty France - Monaco',
    country: 'France',
    city: 'Paris',
    industry: 'Real Estate',
    website: 'https://www.sothebysrealty-france.com',
    email: 'contact@sothebysrealty-france.com',
    whatsapp: '+33144949980',
    instagram: 'https://instagram.com/sothebysrealtyfrance',
    linkedin: 'https://linkedin.com/company/sotheby%27s-international-realty-france---monaco',
    description: 'Premier luxury real estate network in France representing castles, private mansions, Parisian apartments, and French Riviera villas.',
    source: 'RCS Paris (Registre du Commerce et des Sociétés 480 327 508)',
    isVerified: true,
    companySize: '51-200 employees (Mid-Market)',
    businessType: 'Luxury Prestige Brokerage'
  },
  {
    id: 'lead-fr-2',
    businessName: 'Le Bristol Paris (Oetker Collection)',
    country: 'France',
    city: 'Paris',
    industry: 'Luxury Hotels',
    website: 'https://www.oetkercollection.com/hotels/le-bristol-paris',
    email: 'reservations.lebristolparis@oetkercollection.com',
    whatsapp: '+33153434300',
    instagram: 'https://instagram.com/lebristolparis',
    linkedin: 'https://linkedin.com/company/le-bristol-paris',
    description: 'The first hotel in France to be awarded official Palace status, featuring three Michelin-starred Epicure restaurant.',
    source: 'Atout France Official Palace Hotel Classification & Infogreffe',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Official Palace Luxury Hotel'
  },

  // Singapore
  {
    id: 'lead-sg-1',
    businessName: 'City Developments Limited (CDL)',
    country: 'Singapore',
    city: 'Singapore',
    industry: 'Real Estate',
    website: 'https://www.cdl.com.sg',
    email: 'enquiries@cdl.com.sg',
    whatsapp: '+6568778222',
    facebook: 'https://facebook.com/CityDevelopments',
    instagram: 'https://instagram.com/cdl_singapore',
    linkedin: 'https://linkedin.com/company/city-developments-limited',
    description: 'Leading global real estate company with a network spanning 143 locations in 28 countries, listed on Singapore Exchange (SGX).',
    source: 'ACRA Singapore (UEN: 196300316Z)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'SGX-Listed Real Estate Giant'
  },
  {
    id: 'lead-sg-2',
    businessName: 'Marina Bay Sands Pte Ltd',
    country: 'Singapore',
    city: 'Singapore',
    industry: 'Luxury Hotels',
    website: 'https://www.marinabaysands.com',
    email: 'room.reservations@marinabaysands.com',
    whatsapp: '+6566888868',
    facebook: 'https://facebook.com/marinabaysands',
    instagram: 'https://instagram.com/marinabaysands',
    linkedin: 'https://linkedin.com/company/marina-bay-sands',
    description: 'World-famous integrated resort featuring the rooftop Infinity Pool, luxury retail promenade, and award-winning dining.',
    source: 'ACRA Singapore (Accounting and Corporate Regulatory Authority UEN: 200507204G)',
    isVerified: true,
    companySize: '200+ employees (Enterprise)',
    businessType: 'Integrated Luxury Resort'
  },
  {
    id: 'lead-sg-3',
    businessName: 'Tribal Worldwide Singapore (DDB)',
    country: 'Singapore',
    city: 'Singapore',
    industry: 'Marketing Agencies',
    website: 'https://www.tribalworldwide.com.sg',
    email: 'hello@tribalworldwide.com.sg',
    facebook: 'https://facebook.com/tribalsg',
    instagram: 'https://instagram.com/tribalworldwide_sg',
    linkedin: 'https://linkedin.com/company/tribal-worldwide-singapore',
    description: 'Digital-first creative marketing powerhouse specializing in omnichannel experiences, AI content, and branded tech.',
    source: 'ACRA Singapore & 4A’s Association of Advertising',
    isVerified: true,
    companySize: '51-200 employees (Mid-Market)',
    businessType: 'Full-Service Digital Agency'
  }
];
