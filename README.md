# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```





# CodeWithCojo - Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, and Supabase. Features a dynamic admin panel for managing projects and services, with image upload capabilities.

## 🚀 Live Demo

[View Live Site](https://codewithcojo.netlify.app)

## ✨ Features

### Frontend
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme** - Modern dark theme with golden accents
- **Interactive UI** - Smooth animations and transitions
- **Dynamic Content** - Projects and services loaded from database
- **Contact Form** - Integrated messaging system

### Admin Panel
- **Secure Authentication** - Supabase authentication with protected routes
- **Project Management** - Create, edit, and delete projects
- **Service Management** - Manage services displayed on homepage
- **Image Upload** - Upload images directly to Supabase Storage
- **Dashboard** - Overview with project statistics

### Technical Features
- **TypeScript** - Type-safe code
- **React Router** - Client-side routing
- **Supabase** - Backend database and storage
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful icon set
- **Vite** - Fast build tool

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Programming Language
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Lucide React** - Icons

### Backend
- **Supabase** - Database & Storage
- **PostgreSQL** - Database

### Tools
- **Vite** - Build Tool
- **ESLint** - Code Linting
- **Netlify** - Hosting & Deployment

## 📁 Project Structure
codewithcojo/
├── public/
│ ├── img/ # Static images
│ └── _redirects # Netlify redirects
├── src/
│ ├── components/ # Reusable components
│ │ ├── About.tsx
│ │ ├── Blog.tsx
│ │ ├── Contact.tsx
│ │ ├── Footer.tsx
│ │ ├── Hero.tsx
│ │ ├── Navbar.tsx
│ │ ├── ProjectCard.tsx
│ │ ├── Projects.tsx
│ │ └── ServicesSection.tsx
│ ├── context/ # React Context
│ │ ├── AdminContext.tsx
│ │ └── ServiceContext.tsx
│ ├── lib/ # Utilities
│ │ ├── supabase.ts
│ │ ├── supabaseAuth.ts
│ │ ├── supabaseProjects.ts
│ │ └── supabaseStorage.ts
│ ├── pages/ # Page components
│ │ └── admin/ # Admin pages
│ ├── types/ # TypeScript types
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── .env # Environment variables
├── package.json
├── vite.config.ts
└── README.md

text

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codewithcojo.git
   cd codewithcojo
Install dependencies

bash
npm install
Environment Variables
Create a .env file in the root directory:

# env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Start development server

# bash
npm run dev
Build for production

# bash
npm run build



## Supabase Setup
Database Tables
1. Projects Table
sql
- CREATE TABLE projects (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  link TEXT,
  category TEXT NOT NULL CHECK (category IN ('web', 'graphics')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
2. Services Table
sql
- CREATE TABLE services (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  price TEXT,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'uiux', 'graphics')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

## Storage Bucket
- Create a public bucket called project-images for project images.

# Security Policies
sql (
-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read projects"
ON projects FOR SELECT
USING (true);

CREATE POLICY "Public can read services"
ON services FOR SELECT
USING (true);

-- Admin write access (authenticated users)
CREATE POLICY "Authenticated users can manage projects"
ON projects FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage services"
ON services FOR ALL
USING (auth.role() = 'authenticated');
)


### 📱 Features Breakdown
-  Public Pages
-  Page	Description
-  Home	Hero section, services, projects, about, contact
-  Projects	All projects with filtering by category
-  About	Developer information and skills
-  Blog	Blog posts (coming soon)
-  Contact	Contact form
-  Admin Panel
-  Route	Description
-  /admin/login	Admin login page
-  /admin/register	Admin registration
-  /admin/dashboard	Dashboard with statistics
-  /admin/projects	Manage projects
-  /admin/projects/new	Create new project
-  /admin/projects/edit/:id	Edit project
-  /admin/services	Manage services
-  /admin/services/new	Create new service
-  /admin/services/edit/:id	Edit service


# 🎨 Styling
Color Scheme
Primary: #0d1117 (dark background)

Secondary: #161b22 (card background)

Accent: #fca311 (golden)

Text: #ffffff (white)

Gray Text: #8b949e

# Typography
Font Family: Inter (system font)

Headings: Bold with golden accents

# Deployment
-  Netlify Deployment
-  Connect your GitHub repository to Netlify

# Set build settings:
-  Build Command: npm run build
-  Publish Directory: dist
-  Add environment variables:
   -  VITE_SUPABASE_URL
   -  VITE_SUPABASE_ANON_KEY

Deploy!

## Custom Domain
-  Go to Netlify → Site Settings → Domain Management
-  Add your custom domain
-  Configure DNS settings with your domain provider

# 🔧 Troubleshooting
Common Issues
1. Build Failures
bash

# Clear cache and rebuild
- rm -rf node_modules dist
- npm install
- npm run build


2. Supabase Connection Issues
-  Verify environment variables
-  Check Supabase project status
-  Ensure CORS settings are correct

3. Image Upload Issues
-  Check bucket permissions
-  Verify file size (< 5MB)
-  Check file type (JPEG, PNG, GIF, WEBP, SVG)

### 📝 Scripts
- Script	Description
- npm run dev	Start development server
- npm run build	Build for production
- npm run preview	Preview production build
- npm run lint	Run ESLint


### 🤝 Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request

### 📄 License
MIT License - feel free to use this project for your own portfolio!

### 👤 Author
- AKYEA BRIGHT SAKYI JUNIOR
- Website: codewithcojo.netlify.app
- GitHub: @cojojunior
- LinkedIn: codewithcojo



# 🙏 Acknowledgments
- Supabase - Backend services

- Vite - Build tool

- Tailwind CSS - Styling

- Lucide Icons - Icons

- Netlify - Hosting



# 📸 Screenshots
Homepage
- https://./public/img/hero.jpg

Admin Dashboard
- https://./public/img/dashboard.png

Project Management
- https://./public/img/projects.png

Built with ❤️ by CodeWithCojo

# text

---

## 📁 Also Create a `CONTRIBUTING.md`

```markdown
# Contributing to CodeWithCojo

Thank you for considering contributing to this project!

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Test your changes
6. Push and create a pull request

## 📝 Guidelines

### Code Style
- Use TypeScript for all files
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic

### Commit Messages
- feat: Add new feature
- fix: Fix bug
- docs: Update documentation
- style: Update styling
- refactor: Refactor code
- test: Add tests
- chore: Maintenance

text

### Pull Request Process
1. Update the README if needed
2. Update the CHANGELOG
3. Ensure all tests pass
4. Get approval from maintainers

## 🐛 Reporting Issues

When reporting issues, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/OS information

