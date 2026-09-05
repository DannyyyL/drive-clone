# Dan's Drive Clone

A full-stack Google Drive clone built with modern web technologies. Store, organize, and manage your files in the cloud with a clean, intuitive interface.

**Live Demo:** https://dandrive-clone.netlify.app/

## Screenshots

### Home Page
![Home Page](image2.png)

### Drive Interface
![Drive Interface](image1.png)

## Features

- **File Management**: Upload files up to 1GB with support for 9999 maximum files
- **Folder Organization**: Create and manage folder hierarchies
- **File Operations**: Delete files and folders
- **Customization**: Multiple color theme options
- **Secure Authentication**: Powered by Clerk
- **Real-time Sync**: Instant file updates across sessions
- **Analytics**: Built-in PostHog analytics tracking

## Tech Stack

- **Frontend**: React 18, Next.js 15, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: SingleStore (MySQL-compatible)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **File Storage**: UploadThing
- **UI Components**: Radix UI, Lucide Icons
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- A Clerk account (https://clerk.com)
- A SingleStore database (https://www.singlestore.com)
- UploadThing account for file uploads

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DannyyyL/drive-clone.git
cd drive-clone
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Database
DATABASE_URL=your_singlestore_connection_string

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
NEXT_PUBLIC_UPLOADTHING_APP_ID=your_uploadthing_app_id

# PostHog (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

4. Set up the database:
```bash
pnpm db:push
```

5. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

### Project Structure
```
drive-clone/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── server/           # Server-side logic
│   │   └── db/          # Database schema and queries
│   ├── lib/             # Utility functions
│   └── env.ts           # Environment validation
├── public/              # Static assets
└── package.json
```

### Data Flow

1. **Authentication**: Clerk handles user authentication and session management
2. **API Routes**: Next.js API routes handle file operations and folder management
3. **Database**: Drizzle ORM manages queries to SingleStore
4. **File Storage**: UploadThing handles secure file uploads and storage
5. **Frontend**: React components consume API data and display the UI

### Key Components

- **Drive View**: Main interface for browsing files and folders
- **File Explorer**: Hierarchical folder navigation
- **Upload Manager**: Drag-and-drop file upload handling
- **Theme System**: Color customization with TailwindCSS

## Main Contributions

- Built a complete file management system from the ground up
- Implemented folder creation and deletion with proper database cascading
- Designed responsive UI that mirrors Google Drive's layout
- Integrated secure file uploads with UploadThing
- Set up Drizzle ORM schema with proper relationships and indexes
- Implemented color theme system using TailwindCSS variants
- Added analytics integration with PostHog
- Created type-safe API routes with Zod validation

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix linting issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:write` - Format code with Prettier
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio for database management

## Development

### Database Management
This project uses Drizzle Kit for database migrations:
```bash
pnpm db:generate  # Generate migration files
pnpm db:migrate   # Run pending migrations
pnpm db:studio    # Open interactive database explorer
```

### Code Quality
```bash
pnpm check  # Run linting and type checking
pnpm format:write  # Auto-format code
```

## Planned Improvements

- [ ] Create folder UI completion
- [ ] Advanced file search and filtering
- [ ] File sharing and collaboration
- [ ] Version history for files
- [ ] Additional UI refinements

## License

This project is open source and available under the MIT License.

## Author

Built by Dan Lichtin

---

**Have questions?** Open an issue on GitHub or check the documentation for each technology used.
