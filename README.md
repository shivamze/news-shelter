📰 News Shelter

A modern, full-stack news and blogging platform focused on clean user experience, fast content delivery, and scalable architecture.
Built with production-ready practices including validation, media handling, SEO-friendly routing, and secure environment configuration.

🚀 Features
🧑‍💻 User Experience

Clean and distraction-free article reading interface

Category-based news browsing

SEO-friendly dynamic URLs using unique slugs

One-click Share Article feature (URL copied to clipboard with non-blocking toast feedback)

Fully responsive UI across devices

🛠 Admin & Content Management

    Secure admin-only news & blog crud

    Real-time form validation using Zod

    Image uploads for blogs and authors (Cloudinary)

    Automatic unique slug generation

    Structured publishing workflow with error handling

⚙️ Engineering & Architecture

    Full-stack implementation using Next.js App Router

    REST-based API routes

    MongoDB with Mongoose schemas

    Centralized validation logic

    Environment-based configuration for security

    Ready for feature expansion (v2 roadmap)

🧱 Tech Stack

Frontend

    Next.js (App Router)

    React

    TypeScript

    Tailwind CSS

    React Hot Toast

Backend

    Next.js API Routes

    MongoDB

    Mongoose

    Zod (Schema Validation)

Media & Utilities

    Cloudinary (Image uploads)

    Axios

    Slug generation utilities

Deployment

    Vercel (recommended)

    📁 Project Structure
    ├── src/
    |   ├── app
    |   |   ├── api/        # backend directory
    |   |   └── admin/      #frontend side Admin access
    |   |   └── pages/      # public pages
    |   ├── context/
    |   ├── dbConfig/
    │   ├── models/         # Mongoose schemas
    │   ├── services/       
    |   ├── helpers         # DB connection, helpers
    │   ├── validators/     # Zod schemas
    │   ├── utils/          # Slug & utility functions
    │   └── middleware/     # Auth & admin checks
    ├── public/             # Static assets
    ├── .env.sample         # Environment variable template
    ├── .gitignore
    ├── package.json
    └── README.md

🔐 Environment Variables

Create a .env.local file using the template below:

# Database
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Auth / Admin
ADMIN_SECRET=your_admin_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000


⚠️ Never commit .env files to GitHub.
Use .env.sample for reference only.

🧪 Validation Strategy

Zod schemas handle strict validation for both creation and update flows

Update schemas allow partial updates while validating provided fields

Backend validation errors are returned in a structured format

Frontend displays real-time feedback via toast notifications

🔗 Share Feature (v1)

Copy current article URL to clipboard

Non-blocking flash notification (toast)

No modal or confirmation click required

Designed for future social-share upgrades (v2)

🛠 Installation & Setup
# Clone repository
git clone https://github.com/your-username/news-shelter.git

# Install dependencies
npm install

# Run development server
npm run dev


Open: http://localhost:3000

🌍 Deployment (Vercel)

Push project to GitHub

Import repository in Vercel

Add environment variables

Deploy 🚀

The project is optimized for Vercel’s serverless environment.

🧭 Roadmap (v2)

New Additions (V2 Scope Expansion)

1. Automation

    Automated content workflows for admin actions

    Scheduled publishing and background tasks

    Reduced manual intervention for repetitive operations

2. Payment Gateway Integration

    Subscription or premium content model

    Secure payment processing

    Foundation for monetization and revenue generation

3. Enhanced Security & Validation

    Stronger validation for admin-fed data (server-side & schema-level)

    Additional security layers for admin routes and APIs

    Protection against malformed inputs and unauthorized access


4. Social media sharing (WhatsApp, X, LinkedIn)

5. Admin dashboard analytics

    Article view count & engagement tracking

    Rich text editor

6. Comment system below the news or blog

👨‍💻 Author

Shivam Jee
Full Stack Developer
Building scalable, user-centric web applications.

📜 License

This project is licensed under the MIT License.

⭐ If you like this project

Give it a star ⭐ and feel free to fork or contribute!
