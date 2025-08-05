# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TicketWise is a multi-tenant ticket management SaaS application built with Next.js 15, TypeScript, Prisma, PostgreSQL, and Tailwind CSS. The app uses a feature-based architecture with authentication, organization management, and ticket tracking capabilities.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prod` - Build and start production server

### Code Quality
- `npm run type` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint-fix` - Run ESLint with auto-fix

### Database
- `npm run seed` - Seed database with initial data using `tsx prisma/seed.ts`
- Database operations use Prisma with PostgreSQL

### Email Development
- `npm run email` - Start email development server for React Email templates

## Architecture Overview

### Multi-tenant Organization System
- Users belong to multiple organizations via `Membership` model
- Each user has one active organization at a time (tracked via `isActive` field)
- Organization admins can manage memberships and have elevated permissions
- Authentication system includes email verification and password reset flows

### Feature-based Directory Structure
The codebase follows a feature-based architecture under `src/features/`:
- `auth/` - Authentication, sessions, email verification, password management
- `organizations/` - Organization CRUD, membership management, switching
- `ticket/` - Ticket CRUD, status management, search/pagination
- `comment/` - Ticket commenting system
- `membership/` - Organization membership management
- `password/` - Password reset and change functionality

### Key Architectural Patterns
- **Server Actions**: All mutations use Next.js server actions in `actions/` directories
- **Database Queries**: Reusable queries in `queries/` directories using Prisma
- **Component Co-location**: Components are grouped with their related features
- **Path Management**: Centralized route definitions in `src/paths.ts`
- **Form Handling**: Custom form utilities in `src/components/form/` with Zod validation

### Database Schema (Prisma)
- `User` - Core user data with authentication fields
- `Organization` - Multi-tenant organizations
- `Membership` - User-organization relationships with roles (MEMBER/ADMIN)
- `Ticket` - Core tickets with status (OPEN/IN_PROGRESS/DONE), bounty, deadline
- `Comment` - Ticket comments with cascade deletion
- `Session` - User authentication sessions
- `PasswordSession` - Password reset tokens
- `EmailVerificationToken` - Email verification workflow

### Authentication Flow
- Cookie-based sessions with custom implementation
- Email verification required for new accounts
- Password reset via email tokens
- Protected routes use `getAuthOrRedirect()` helper
- User context available via `useAuth()` hook

### Tech Stack Integration
- **Styling**: Tailwind CSS with custom components in `src/components/ui/`
- **State Management**: React Query for server state, Next.js built-in for client state
- **Email**: React Email templates with Resend for sending
- **Search**: URL state management with `nuqs` for filters/pagination
- **Background Jobs**: Inngest for email processing and async tasks
- **Themes**: `next-themes` for dark/light mode support

## Development Workflow

### Adding New Features
1. Create feature directory under `src/features/`
2. Add server actions in `actions/` subdirectory
3. Add database queries in `queries/` subdirectory
4. Add components in `components/` subdirectory
5. Update `src/paths.ts` for new routes
6. Add route handlers in `src/app/api/` if needed

### Database Changes
1. Update `prisma/schema.prisma`
2. Run `npx prisma generate` to update client
3. Create and run migrations for production
4. Update seed file if needed

### Testing Approach
- Always run `npm run type` and `npm run lint` before committing
- Test authentication flows thoroughly due to multi-tenant complexity
- Verify organization switching and membership permissions
- Test email workflows in development using `npm run email`

## Important Configuration Notes

- Uses React Compiler (experimental) enabled in `next.config.ts`
- ESLint configured with import sorting rules
- Turbopack enabled for faster development builds
- Prisma generates client on postinstall
- Environment variables required: `DATABASE_URL`, `DIRECT_URL`