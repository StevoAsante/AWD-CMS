# AWD CMS

AWD CMS is a newsletter content management system developed for the Advanced Web Development assignment. It provides a public newsletter feed alongside a private dashboard where registered users can create, edit and manage their own newsletters.

The application is built with the Next.js App Router and TypeScript. PostgreSQL stores the application data, Prisma provides database access, and Auth.js handles authentication. Tailwind CSS and DaisyUI are used to build the interface.

## Features

- Account registration with server-side input validation and securely hashed passwords.
- Email-and-password sign-in using Auth.js Credentials.
- Google sign-in integration, which requires OAuth credentials to be configured in the environment.
- A session-aware navigation bar and homepage, with different actions for signed-in and signed-out visitors.
- A protected dashboard for creating, editing and deleting newsletters.
- Newsletter status management: Draft, Schedule and Sent.
- A public newsletter feed that displays only newsletters marked as Sent.
- Per-user access controls so dashboard queries and mutations are scoped to the authenticated user's own newsletters.
- Server-side validation for registration, login and newsletter form data.

## Technology

| Area | Technology |
| --- | --- |
| Application framework | Next.js App Router |
| Language | TypeScript |
| UI | React, Tailwind CSS, DaisyUI |
| Authentication | Auth.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |

## Application structure

The project separates route-level UI, reusable components, authentication, validation and database access.

- `app/` contains the pages, layouts and server actions.
- `components/` contains shared interface components, including the navigation bar and newsletter form controls.
- `lib/` contains the Prisma client, password utilities and validation schemas.
- `prisma/schema.prisma` defines the database models, relationships and newsletter statuses.
- `prisma/seed.ts` provides sample data for local development.
- `auth.ts` configures Auth.js and its providers.
- `proxy.ts` provides request-level protection for dashboard routes.

### Data model

A user can own multiple newsletters. Each newsletter belongs to one author and has a status of `Draft`, `Schedule` or `Sent`. The schema also includes the Account, Session and VerificationToken models used by the Auth.js Prisma adapter.

The public feed queries only records with the `Sent` status. The dashboard queries newsletters using the signed-in user's ID, and update/delete operations check ownership on the server rather than relying on links or buttons being hidden in the interface.

## Authentication and security

Credentials registration validates submitted data on the server and stores a salted scrypt password hash rather than a plaintext password. Credentials sign-in validates the submitted values and verifies the hash before creating a session.

Auth.js uses JWT-based sessions. The session exposes the authenticated user's ID and role for server-side checks. Dashboard pages and server actions verify authentication, and newsletter operations are scoped to the current user. The login flow also validates callback destinations to prevent redirects to external websites.

Google sign-in is included as an additional provider, but it will not work until valid Google OAuth client credentials are supplied. The application can be used with credentials sign-in without configuring Google OAuth.

These controls are intended to protect both access to the dashboard and ownership of newsletter data. They should be verified in the target environment before deployment.

## Running the application locally

### Requirements

- Node.js and npm
- A PostgreSQL database
- Google OAuth credentials only if Google sign-in is being tested

### Configuration

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set the values for your local environment.

3. Set `DATABASE_URL` to your PostgreSQL development database. The expected format is:

   ```text
   postgresql://USERNAME:URL_ENCODED_PASSWORD@HOST:5432/DATABASE_NAME?schema=public
   ```

   Use the database connection details supplied for your environment. URL-encode special characters in the password. Keep `.env` private and never commit database credentials or OAuth secrets.

4. Generate an Auth.js secret and add it to `AUTH_SECRET`. For macOS or Linux, one option is:

   ```bash
   openssl rand -base64 32
   ```

5. Generate Prisma Client and synchronise the development database schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. (Optional) Load the sample development data:

   ```bash
   npm run db:seed
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

   The application is available at [http://localhost:3000](http://localhost:3000).

The seed script creates a demo user, two published newsletters and a draft. The demo user does not have a password set, so register a separate account to test credentials sign-in. The seed script refuses to run when `NODE_ENV=production`.

If a university PostgreSQL server is unreachable, check the network or VPN requirements provided by the module team. Use a development database for local development and testing.

### Environment variables

The variable names are documented in `.env.example`.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Secret used by Auth.js |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |

For local Google OAuth, configure the authorised redirect URI as `http://localhost:3000/api/auth/callback/google` in Google Cloud Console. Google sign-in remains unavailable until the client ID and secret are configured.

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Build the production application |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Synchronise the Prisma schema to the configured database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Insert sample development data |

## Current scope

The application covers the core newsletter CMS workflow: account access, protected newsletter management and a public feed for sent newsletters. Google OAuth is supported in the code but requires external credentials. Features such as profile editing and two-factor authentication are outside the current implemented scope.

Before deployment or submission, run the lint and production build checks in the project environment and test access controls with at least two separate user accounts.
