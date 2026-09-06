# Dan's Drive Clone

A full-stack Google Drive clone built with modern web technologies. Store, organize, and manage your files and folders in the cloud with a fast, intuitive, and customizable interface.

[![Live Demo](https://img.shields.io/badge/Live_Demo-dandrive--clone.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://dandrive-clone.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![SingleStore](https://img.shields.io/badge/SingleStore-AA00FF?style=for-the-badge&logo=singlestore&logoColor=white)](https://www.singlestore.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![UploadThing](https://img.shields.io/badge/UploadThing-FF4F64?style=for-the-badge&logo=uploadthing&logoColor=white)](https://uploadthing.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## Table of Contents

- [Screenshots](#screenshots)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Data Flow](#architecture--data-flow)
  - [Database Schema](#database-schema)
  - [Data Flow & Operations](#data-flow--operations)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Database Setup](#database-setup)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Author & License](#author--license)

---

## Screenshots

### Home & Landing Page
Clean, minimalist landing page with quick authentication and redirection into the user's personal drive.

![Home Page](./assets/home-page.png)

### Drive Interface
Complete Google Drive-style file and folder explorer featuring interactive breadcrumbs, instant theme customizer, upload manager, and item deletion.

![Drive Interface](./assets/drive-interface.png)

---

## Key Features

- **Hierarchical Folder Structure**: Create and organize files inside nested folder trees with dynamic breadcrumb navigation (`My Drive > Root > ...`).
- **High-Capacity File Uploads**: Powered by **UploadThing** with direct client-to-cloud transfers supporting individual files up to **1GB** and batches up to **9,999 files**.
- **Cloud Garbage Collection**: Deleting files in the UI not only removes the record from SingleStore, but also automatically purges the binary from UploadThing cloud storage via `UTApi`.
- **Automatic User Onboarding**: New users automatically receive a provisioned root directory seeded with starter folders (`Documents`, `Shared`, `Trash`).
- **Dynamic Color Theme Switcher**: Personalize your workspace on the fly with built-in theme presets (**Dark Slate**, **Mint Green**, **Rose**) persisted in `localStorage`.
- **Secure Authentication & Multi-Tenancy**: Protected routes, session tokens, and strict user-level data isolation powered by **Clerk**.
- **Modern Full-Stack Architecture**: Built on **Next.js 15 App Router**, utilizing React Server Components, Server Actions for mutations, and Turbopack for rapid development.
- **Product Telemetry**: Built-in pageview tracking and analytics with **PostHog**.

---

## Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) | React framework with App Router, Turbopack, and Server Actions |
| **Frontend** | [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) | Modern type-safe component-driven UI |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS with animations and dynamic color classes |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) & [Lucide](https://lucide.dev/) | Accessible UI primitives and modern iconography |
| **Database** | [SingleStore](https://www.singlestore.com/) | High-performance distributed SQL database (MySQL wire protocol) |
| **ORM & Migrations** | [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit | Lightweight, type-safe SQL ORM and schema management |
| **Authentication** | [Clerk](https://clerk.com/) | Complete user management, authentication, and session handling |
| **File Storage** | [UploadThing](https://uploadthing.com/) | Serverless file upload infrastructure with typed endpoints |
| **Analytics** | [PostHog](https://posthog.com/) | Product analytics and user journey tracking |
| **Validation** | [Zod](https://zod.dev/) & [@t3-oss/env-nextjs](https://env.t3.gg/) | Runtime type checking for API inputs and environment variables |
| **Hosting** | [Netlify](https://www.netlify.com/) | Continuous deployment with Next.js runtime support |

---

## Architecture & Data Flow

### Database Schema

The database schema is defined using Drizzle ORM for SingleStore:

- **`folders_table`**:
  - `id`: Unique folder identifier (auto-incrementing bigint).
  - `ownerId`: Clerk user ID owning the folder (indexed for fast queries).
  - `name`: Display name of the folder.
  - `parent`: Reference to the parent folder `id` (indexed; `null` denotes the user's root folder).
  - `createdAt`: Timestamp of creation.

- **`files_table`**:
  - `id`: Unique file identifier (auto-incrementing bigint).
  - `ownerId`: Clerk user ID owning the file (indexed).
  - `name`: Original filename.
  - `size`: File size in bytes.
  - `url`: Direct cloud URL pointing to the file hosted on UploadThing.
  - `parent`: Reference to the enclosing folder `id` (indexed).
  - `createdAt`: Timestamp of upload.

### Data Flow & Operations

```mermaid
flowchart LR
    User[Client Browser] -->|Upload File| UT[UploadThing CDN]
    UT -->|Metadata Callback| Server[Next.js Server Action / API]
    Server -->|Persist File Record| DB[(SingleStore DB)]
    User -->|Delete File| Action[Server Action: deleteFile]
    Action -->|Delete Record| DB
    Action -->|Purge Storage via UTApi| UT
    User -->|Navigate Folders| Page[Server Component /f/:id]
    Page -->|Fetch Folders & Files| DB
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or higher
- **pnpm**: `v9.0.0` or higher (`npm install -g pnpm`)

You will also need accounts for:
- [Clerk](https://clerk.com) for authentication
- [SingleStore](https://www.singlestore.com) for managed MySQL-compatible cloud database
- [UploadThing](https://uploadthing.com) for file storage
- [PostHog](https://posthog.com) (optional) for product telemetry

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DannyyyL/drive-clone.git
   cd drive-clone
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

---

### Environment Configuration

Create a `.env.local` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env.local
```

Fill in the required credentials:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/drive

# SingleStore Database
SINGLESTORE_HOST=your-instance.svc.singlestore.com
SINGLESTORE_PORT=3333
SINGLESTORE_USER=your_db_user
SINGLESTORE_PASS=your_db_password
SINGLESTORE_DB_NAME=your_db_name
DATABASE_URL=mysql://user:pass@host:port/database

# UploadThing Storage
UPLOADTHING_SECRET=sk_live_...
NEXT_PUBLIC_UPLOADTHING_APP_ID=your_app_id

# PostHog Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

### Database Setup

Push the Drizzle schema directly to your SingleStore database instance:

```bash
pnpm db:push
```

To view and manage database records interactively:
```bash
pnpm db:studio
```

---

### Running the App

Start the development server with Next.js Turbopack:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the app.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts local Next.js development server with Turbopack |
| `pnpm build` | Compiles and builds production-ready application |
| `pnpm start` | Launches the production server |
| `pnpm check` | Runs both ESLint and TypeScript checks |
| `pnpm lint` | Inspects code for style and syntax issues via ESLint |
| `pnpm lint:fix` | Automatically fixes autofixable ESLint errors |
| `pnpm typecheck` | Validates TypeScript types across the project |
| `pnpm format:write` | Formats code with Prettier and Tailwind plugin |
| `pnpm format:check` | Checks code formatting against Prettier guidelines |
| `pnpm db:generate` | Generates SQL migration files with Drizzle Kit |
| `pnpm db:migrate` | Applies pending Drizzle migrations |
| `pnpm db:push` | Pushes the schema directly to SingleStore without migrations |
| `pnpm db:studio` | Launches Drizzle Studio GUI for inspecting database rows |

---

## Author & License

Developed by **Dan Lichtin**.

This project is licensed under the [MIT License](LICENSE).
