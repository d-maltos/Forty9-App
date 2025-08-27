# Forty9 🏔️

A hyperlocal anonymous community platform exclusively for Alaska residents, similar to TeamBlind but focused on Alaskan experiences and minimal content moderation.

## Features

- **Anonymous by Default**: All posts and comments are anonymous to encourage open discussion
- **Alaska Residents Only**: Verified by phone number (Alaska 907 area code preferred) and zip code
- **Hyperlocal Communities**: City-specific, industry-specific, and interest-based communities
- **Minimal Moderation**: Community-driven reporting with minimal censorship
- **Modern UI**: Clean, responsive design with Alaska-themed colors
- **Real-time Engagement**: Upvoting, downvoting, and threaded comments

## Communities

### Cities
- **Anchorage** - Alaska's largest city discussions
- **Fairbanks** - Golden Heart City community  
- **Juneau** - Capital city and government discussions

### Industries
- **Oil & Gas** - Energy industry discussions and job opportunities
- **Fishing & Seafood** - Commercial and sport fishing community
- **Tourism & Hospitality** - Alaska's tourism industry

### Interests
- **Outdoors Alaska** - Hiking, hunting, camping, and adventures
- **General Alaska** - Statewide discussions and topics

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Alaska theme
- **Database**: SQLite with Prisma ORM
- **Authentication**: Phone verification with SMS (Twilio)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Forty9-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── create/           # Post creation page
│   └── communities/      # Communities listing
├── components/           # Reusable React components
│   ├── AuthProvider.tsx  # Authentication context
│   ├── Navigation.tsx    # Main navigation
│   ├── FeedContainer.tsx # Main feed display
│   ├── PostCard.tsx      # Individual post component
│   ├── CommunityList.tsx # Community sidebar
│   └── WelcomeHero.tsx   # Landing page hero
└── lib/                  # Utility functions and configurations
```

## Key Features Explained

### Anonymous Authentication
- Users verify identity with phone number and SMS verification code
- Alaska phone numbers (907 area code) preferred for instant verification
- Non-Alaska numbers require Alaska zip code (99xxx format) for residency proof
- No personal information stored beyond phone verification
- Each user gets a random anonymous ID
- Karma system tracks community participation

### Community Structure
- **Cities**: Location-based discussions (Anchorage, Fairbanks, Juneau)
- **Industries**: Professional discussions (Oil & Gas, Fishing, Tourism)
- **Interests**: Hobby and lifestyle communities (Outdoors, General)

### Moderation Philosophy
- **Community-Driven**: Users report inappropriate content
- **Minimal Censorship**: Focus on illegal content removal only
- **Anonymous Reporting**: Safe reporting without fear of retaliation
- **Transparent Process**: Clear guidelines and appeal process

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Set up your database and environment variables

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to your branch: `git push origin feature-name`
5. Submit a pull request

## Community Guidelines

- **Be Respectful**: Treat fellow Alaskans with respect
- **Stay Local**: Keep discussions relevant to Alaska
- **No Doxxing**: Never share personal information
- **Report Issues**: Help moderate by reporting inappropriate content
- **Authentic Experiences**: Share genuine Alaska experiences

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by TeamBlind's anonymous professional community model
- Built for the unique needs of Alaska's dispersed but connected communities
- Designed to handle Alaska's unique challenges: distance, weather, and industry-specific needs

---

**Forty9** - Where Alaskans connect anonymously 🏔️❄️