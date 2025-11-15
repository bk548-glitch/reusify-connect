# ReUse - Material Exchange Platform

## Project Overview

ReUse is a modern full-stack web platform built to reduce waste and promote sustainability by connecting people who have reusable materials with those who need them. Users can list items ranging from construction supplies and furniture to electronics and textbooks, making them easily discoverable within their community.

The platform features an AI-powered semantic search that understands context and intent, offering more accurate matches than simple keyword filters. Users can create accounts, upload photos and detailed descriptions, receive automated category suggestions, chat through an integrated messaging system, and get real-time notifications for requests and item matches.

By turning surplus materials into valuable resources for others, ReUse helps create a circular economy, reduces environmental impact, saves users money, and strengthens community connections.

## Installation/Setup Instructions

Visit this link: [https://reusify-connect.lovable.app/](https://reusify-connect.lovable.app/)

## Usage Guide

### Getting Started

First click "Log Out" in the top right corner.

**Create an Account**: Click "Sign Up" in the header and provide your email, password, and location. Email confirmation is automatic, so you can start using the platform immediately.

### Core Features

#### Browse & Search Materials

- **Basic Browse**: Click "Browse Materials" from the homepage to view all available items in a grid layout.
- **Keyword Search**: Use the search bar to filter items by title, description, category, or location.
- **AI-Powered Search**: Click "AI Search" after entering a query for intelligent semantic matching. The AI understands context and intent, so you can search naturally (e.g., "wood for outdoor project" or "electronics for student lab").

#### List Your Items

**Upload Process**: Click "List an Item" from the homepage or navigation menu.

**Fill Details**:
- **Title**: Give your item a clear, descriptive name
- **Description**: Explain what it is, its condition, and any relevant details
- **Photo**: Upload a clear image of the item (supports JPG, PNG, WebP)
- **Quantity**: Specify how much is available
- **Location**: Enter your city and state

**AI Category Suggestion**: The system automatically analyzes your description and image to suggest the most appropriate category (Construction Materials, Furniture, Electronics, Textbooks, or Other).

**Submit**: Your listing appears immediately in the browse section.

#### View Item Details

Click any item card to see the full details page with:
- High-resolution image
- Complete description
- Owner information
- Location
- Available quantity
- Request button to express interest

#### Request Items

- On any item detail page, click "Request Item" to express interest.
- The item owner receives a notification and can view your profile.
- Requests create a foundation for direct communication.

#### Messaging System

- **Start a Conversation**: After requesting an item, access the Messages page from the header.
- **Real-time Chat**: Send and receive messages instantly with other users.
- **Context Preservation**: All conversations are linked to specific items, so you always know what you're discussing.
- **Message History**: View your complete conversation history in one organized interface.

#### Notifications

- **Bell Icon**: Click the notification bell in the header to see recent activity.
- **Notification Types**:
  - New item requests on your listings
  - Messages from other users
  - Matches and updates

## Tech Stack

Lovable, React, Supabase, Vite, Tailwind, TypeScript, SQL, shadcn-ui, Claude

## Claude API Integration

Our waste marketplace app uses Claude API for 3 key features:

### 1. Automatic Description Generation
When users post an item and upload a photo, Claude automatically generates an appealing description by analyzing the image. Users can review/edit before posting.

### 2. Automatic Tags
Claude analyzes uploaded images to automatically suggest relevant tags/categories (furniture, electronics, condition, materials, etc.) for better searchability.

### 3. Semantic Item Search
When users search for items using natural language (e.g., "need a desk for a small apartment"), Claude intelligently matches their query to available listings beyond simple keyword matching, understanding intent and context.

### Technical Implementation
Supabase is our backend. It handles user authentication and database queries. Also, we use "Edge functions" (Lambda) features which allow Supabase to call Claude API for image analysis, natural language processing, and semantic search.

## Challenges and Solutions

Time was a major constraint, so we had to stay focused on a small feature set rather than everything we initially imagined.

We also spent time narrowing down our ideas and choosing a direction that fit both the timeline and the theme.

Since we did not build a backend, all AI features were prompt-driven. This required us to design prompts that produced consistent and reliable results.

Coordinating multiple AI tools brought additional complexity, and we had to iterate quickly to align the UI and the AI logic.

## Team Members and Contributions

- **Vijay** – Built AI suggestions for item categories and descriptions. Helped with notification and chat features.
- **Bill** – Built a semantic search feature and attached a database.
- **Himani** – Created a presentation and introduced tech stacks. Created Demo.
- **Bhavani** – Built chat features, and added location for users.

## Future Plans

Going forward, ReUse plans to introduce monetization features such as in-app advertisements and a premium listing-boost option that allows users to increase visibility for their posts. We also plan to expand the platform's utility by adding location-based filtering and community-specific groups, including campus-focused networks.

To enhance discovery and ease of use, we aim to develop automated matching between items and interested users, as well as basic pickup coordination tools like recommended meeting times and neutral exchange points. Additionally, we envision a lightweight profile system to track items given and received, paired with a community dashboard that highlights real reuse impact.

Finally, we hope to collaborate with universities and local environmental organizations to scale and strengthen community engagement.

## Project URL

This project is managed on Lovable: [https://lovable.dev/projects/562e5676-014c-4491-910a-e6215737f9ab](https://lovable.dev/projects/562e5676-014c-4491-910a-e6215737f9ab)
