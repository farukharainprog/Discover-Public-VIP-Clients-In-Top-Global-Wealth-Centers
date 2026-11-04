# GLOBAL VIP CLIENT FINDER AI
**Official Brand:** FARUKH BUSINESSMAN WALA  
**Official Helpline & Desk:** [+92 3421336388](https://wa.me/923421336388)

A high-performance, private, and secure international client discovery platform engineered for digital entrepreneurs, agencies, and high-ticket service providers. Discovers publicly listed corporate contacts, trade registry profiles, and verified WhatsApp business channels across 15+ global wealth hubs.

---

## Key Features

### 1. Global Client Finder & Wealth Centers
- Deep-tier search across 15+ premier economies:
  - **Americas:** United States, Canada
  - **Europe:** United Kingdom, Germany, France, Switzerland
  - **Middle East:** United Arab Emirates, Saudi Arabia, Qatar, Kuwait
  - **Asia-Pacific:** Japan, China, Singapore, Australia
- 11 Target Business Verticals: Luxury Hotels, Real Estate, Restaurants, Construction, E-Commerce, Marketing Agencies, Fashion Brands, Automotive Dealerships, Business Consultants, Travel Agencies, and Property Dealers.
- Public data sources with 100% citation fidelity (Google Places API Grounding, Trade Registers, Corporate Switchboards). Zero fabricated data.

### 2. Verified Business Contacts & Real Number Verification
- **E.164 Standard Formatting:** Country-code normalized telephone numbers.
- **Verification Breakdown:** Format validity, reachable corporate switchboard, and official business WhatsApp presence.
- **Direct WhatsApp Business CTAs:** 1-click links opening officially published WhatsApp numbers without storing unsanctioned cookies.

### 3. Private VIP Global WhatsApp Client Finder (Owner Exclusivity)
- **Role-Based Isolation:** Built exclusively for the platform owner, **FARUKH BUSINESSMAN WALA**.
- **Creator Discovery Engine:** International YouTubers, Instagram Influencers, TikTok Creators, Entrepreneurs, and Media Agencies.
- **Strict Privacy Guarantees:** Private leads, personal notes, and pipeline statuses are cryptographically isolated and never shared with other users.

### 4. AI-Powered 7-Service Client Outreach Generator
Generates personalized, high-converting English outreach pitches tailored to the lead's vertical:
1. Graphic Designing (Branding, Identity, Social Kits)
2. 4K Video Editing & Reels Production
3. High-End Photo Retouching & Product Grading
4. Microsoft Office & Executive Document Design (PowerPoint decks, Excel dashboards, Word reports)
5. AI Video Creation & Talking Avatars
6. AI Voiceover & Multilingual Audio Synthesis
7. YouTube Thumbnail Engineering & High-CTR Graphics

### 5. Multi-Account Gmail Whitelist & Owner Authorization System
- **Permanent Super Owner Security:** Single immutable root administrator with permanent control.
- **Google OAuth Gatekeeper:** Login restricted to authorized Gmail addresses; unauthorized attempts receive an explicit `"ACCESS DENIED: Your Gmail account is not authorized to access this private portal."` prompt.
- **Invitation Desk:** Super Owner can add, approve, suspend, restore, or revoke invited accounts (family or trusted colleagues).
- **Owner Gmail Privacy:** Root owner email is safely kept in backend configuration and never exposed on public screens or public API endpoints.

### 6. Two-Factor Authentication & Audit Vault
- 15-minute inactivity session lock.
- Complete encrypted JSON snapshot export for disaster recovery.
- Global audit log tracking search queries, category hits, and lead volumes.

---

## Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
- **Backend & Middleware:** Node.js, Express, TSX, Vite Dev Server Proxy
- **AI & Grounding:** Google GenAI SDK (`@google/genai`) with Gemini 2.5/3.0 live web grounding
- **Database & Auth:** Firebase Firestore (ABAC Security Rules) + Firebase Authentication (Google OAuth 2.0)

---

## Installation & Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/global-vip-client-finder.git
cd global-vip-client-finder
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set the following variables:
```env
# Gemini API Key for Search Grounding & Outreach Generation
GEMINI_API_KEY="your-gemini-api-key"

# Permanent Super Owner Email (Configured securely on server - not exposed to client)
SUPER_OWNER_GMAIL="your-owner-email@gmail.com"

# Application URL
APP_URL="http://localhost:3000"
```

### 3. Firebase Authentication Setup
1. In your Firebase Console, enable **Google Sign-In** under **Authentication > Sign-in method**.
2. Add your application domain (e.g., `localhost` or your production domain) to the **Authorized Domains** list.
3. Deploy the provided `firestore.rules` to secure database collections:
```bash
firebase deploy --only firestore:rules
```

---

## Development & Production Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the full-stack development server on `http://localhost:3000` with Express `/api` middleware mounted. |
| `npm run build` | Compiles TypeScript and creates optimized production client bundles in `dist/`. |
| `npm run start` | Boots the production Express server (`server.ts`) serving the bundled SPA and live API endpoints. |
| `npm run lint` | Runs ESLint / TypeScript typecheck validation across the codebase. |

---

## Security & Data Privacy Guidelines

1. **Zero Hallucination:** Every contact record includes its original public citation (`source`). Fake or guessed numbers are strictly disallowed.
2. **Permanent Ownership Invariant:** No invited administrator can demote, delete, or alter the Super Owner's privileges.
3. **Owner Privacy:** The root owner's private Gmail address is strictly shielded from client-facing cards, public startup screens, and GitHub repositories.
4. **ABAC Enforcement:** Firestore rules enforce document-level ownership matching on private WhatsApp lead stores (`request.auth.uid == resource.data.userId`).

---

## Support & Authorization Requests

For portal invitations, partnership inquiries, or custom digital service bookings, contact:
- **Brand:** FARUKH BUSINESSMAN WALA
- **Official WhatsApp:** [+92 3421336388](https://wa.me/923421336388)
