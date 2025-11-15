# Material Reuse Exchange Platform

A web application that connects people to share and reuse construction materials, furniture, and other items, reducing waste and promoting sustainability through community exchange.

## Project Overview

This platform enables users to:
- List surplus materials and items they no longer need
- Browse and search available items in their area
- Request items from other users
- Communicate through built-in messaging
- Get AI-powered assistance for item descriptions and categorization
- Discover items through intelligent semantic search

The goal is to keep usable materials out of landfills by facilitating their reuse within communities.

## Installation & Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The project uses Lovable Cloud (Supabase) for backend services. Environment variables are automatically configured:
   - `VITE_SUPABASE_URL` - Backend API URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Public authentication key
   - `VITE_SUPABASE_PROJECT_ID` - Project identifier

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### For Item Providers
1. **Sign Up/Login** - Create an account using email authentication
2. **Upload Items** - Click "Upload" and fill in:
   - Item title and description
   - Category (AI can suggest based on image/title)
   - Location
   - Upload a photo
   - Add quantity and tags
3. **Manage Requests** - View and respond to requests from interested users
4. **Message Users** - Communicate directly through the platform

### For Item Seekers
1. **Browse Items** - View all available items on the Browse page
2. **Search** - Use AI-powered semantic search to find specific materials
3. **Request Items** - Click on items and send a request message
4. **Track Conversations** - View all your conversations in the Messages section
5. **Get Notifications** - Receive updates on item requests and messages

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **React Router** - Client-side routing
- **TanStack Query** - Server state management

### Backend & Infrastructure
- **Supabase (via Lovable Cloud)**
  - PostgreSQL database with Row Level Security (RLS)
  - Authentication system
  - Real-time subscriptions
  - Edge Functions (Deno runtime)
  - File storage

### AI Integration
- **Anthropic Claude API** - Powers intelligent features
- **Lovable AI Gateway** - Provides additional AI models

## Claude API Integration

The application integrates Claude (Anthropic's AI) through serverless edge functions:

### 1. AI-Powered Search (`/functions/ai-search`)
- **Purpose**: Semantic search that understands intent, not just keywords
- **How it works**: 
  - User enters a search query (e.g., "wood for outdoor deck")
  - Claude analyzes the query and all available items
  - Returns ranked results based on semantic relevance
- **Model**: Claude Sonnet for balanced performance and cost
- **Implementation**: User query + item data → Claude → Ranked item IDs

### 2. Content Generation (`/functions/generate-content`)
- **Purpose**: Helps users create better item listings
- **Features**:
  - Image analysis: Upload a photo, get a detailed description
  - Text enhancement: Improve existing descriptions
- **How it works**:
  - Image mode: Sends base64 image to Claude with vision capabilities
  - Text mode: Enhances user-provided descriptions
- **Model**: Claude Sonnet with vision support
- **Prompt Engineering**: Tailored prompts for material reuse context

### 3. Category Suggestion (`/functions/suggest-category`)
- **Purpose**: Auto-categorize items based on title and/or image
- **How it works**:
  - Analyzes title text and/or uploaded image
  - Returns most appropriate category from predefined list
- **Fallback**: Uses Lovable AI Gateway for redundancy
- **Benefits**: Reduces user friction, improves item discoverability

### Security & Best Practices
- API keys stored securely as Supabase secrets (never exposed to client)
- All AI calls proxied through backend edge functions
- Rate limiting and error handling for API failures
- Streaming responses for better UX on longer generations

## Challenges & Solutions

### Challenge 1: Semantic Search Accuracy
**Problem**: Keyword-based search missed relevant items (e.g., searching "lumber" wouldn't find "wooden planks")

**Solution**: Integrated Claude API to perform semantic matching. Claude understands that "lumber," "wood," "planks," and "timber" are related concepts and ranks items accordingly.

### Challenge 2: User-Generated Content Quality
**Problem**: Users struggled to write detailed, useful item descriptions

**Solution**: Built AI content generation that analyzes uploaded images and creates comprehensive descriptions automatically. Users can also enhance their draft descriptions with AI assistance.

### Challenge 3: Database Security
**Problem**: Initial RLS policies exposed user profile data publicly

**Solution**: Implemented strict Row Level Security policies:
- Profiles only viewable by authenticated users
- Users can only modify their own data
- Item requests and messages properly scoped to participants

### Challenge 4: Real-Time Communication
**Problem**: Needed instant messaging without polling

**Solution**: Leveraged Supabase real-time subscriptions to push message updates instantly to all conversation participants.

### Challenge 5: Image Analysis for Categorization
**Problem**: Manual categorization was tedious and error-prone

**Solution**: Implemented Claude's vision capabilities to analyze uploaded images and suggest appropriate categories, reducing user effort and improving accuracy.

## Future Plans

With more time, we would build:

1. **Geographic Search & Mapping**
   - Interactive map view of available items
   - Distance-based filtering
   - Geolocation for automatic location setting

2. **Advanced Matching Algorithm**
   - AI-powered recommendations based on user preferences
   - Automatic notifications when items matching saved searches are listed
   - "Wanted" listings where users can request specific items

3. **Enhanced Communication**
   - In-app video calls for item inspection
   - Scheduling system for pickup coordination
   - Integration with calendar apps

4. **Reputation & Trust System**
   - User ratings and reviews
   - Verified user badges
   - Transaction history visibility

5. **Mobile Applications**
   - Native iOS and Android apps
   - Push notifications for messages and requests
   - Camera integration for easier uploads

6. **Community Features**
   - Local material exchange events
   - Forums for discussing reuse projects
   - Educational content about sustainability

7. **Analytics Dashboard**
   - Track materials diverted from landfills
   - Environmental impact metrics
   - Community engagement statistics

## Team Members & Contributions

This project was developed as part of [hackathon/course name]:

- **[Team Member 1]** - Project Lead & Backend Architecture
  - Supabase database schema design
  - RLS policies and security implementation
  - Edge functions development

- **[Team Member 2]** - Frontend Development
  - React component architecture
  - UI/UX design with Tailwind CSS
  - Responsive design implementation

- **[Team Member 3]** - AI Integration
  - Claude API integration and prompt engineering
  - Semantic search implementation
  - Content generation features

- **[Team Member 4]** - Full-Stack Features
  - Authentication flow
  - Messaging system with real-time updates
  - Notifications system

*Note: Update team member names and specific contributions based on your actual team structure.*

## License

This project was created for [hackathon/educational purpose].

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by [Supabase](https://supabase.com)
- AI features by [Anthropic Claude](https://anthropic.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)

---

**Project URL**: https://lovable.dev/projects/562e5676-014c-4491-910a-e6215737f9ab

For questions or contributions, please open an issue or submit a pull request.
