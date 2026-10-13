# AWD CMS

A newsletter content management system built for the Advanced Web Development assignment using TypeScript, Next.js App Router, PostgreSQL, Prisma, Auth.js, Tailwind CSS and DaisyUI.

## Requirements

- Node.js and npm
- Access to the UEA CMP PostgreSQL server, or another PostgreSQL database
- Google OAuth credentials if you want to test Google sign-in

## Local setup

1. Clone the repository and enter the project folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a local `.env` file by copying `.env.example`. Add your own values to `.env`. Never commit this file or share database passwords in source control.

4. Set `DATABASE_URL` to the development database connection string supplied for your account. The usual PostgreSQL URL format is:

   ```text
   postgresql://USERNAME:URL_ENCODED_PASSWORD@HOST:5432/DATABASE_NAME?schema=public
   ```

   For the UEA CMP database, use the provided host, your database username, and the `krt24rvu-dev` database. If your password contains characters such as `@`, `:`, `/`, `?`, or `#`, URL-encode the password before placing it in the URL. Do not paste your real password into GitHub or this chat.

5. Generate an Auth.js secret. For example, on macOS or Linux:

   ```bash
   openssl rand -base64 32
   ```

   Put the generated value in `AUTH_SECRET`.

6. Generate Prisma Client and create/update the development schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

7. Start the application:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

If the CMP server refuses the connection, check whether you need to be on the UEA network or VPN and follow the connection details supplied by the module team. Keep the development database separate from the shadow database. The shadow database is for Prisma migration workflows and should not be used as the application's main database.

## Environment variables

See `.env.example` for the variable names. Keep real values in your local `.env` file only.

- `DATABASE_URL`: PostgreSQL connection string for the development database.
- `AUTH_SECRET`: secret used by Auth.js to protect its session tokens.
- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`: Google OAuth credentials. These are required to test Google sign-in.

For Google OAuth, configure the OAuth client in Google Cloud and set the authorised redirect URI to `http://localhost:3000/api/auth/callback/google` for local development.

## Authentication and authorisation

- Auth.js Credentials handles email and password sign-in. Registration validates the submitted fields and stores a salted scrypt password hash.
- Auth.js uses a JWT session strategy. The session includes the authenticated user's ID and role.
- Google sign-in is configured as an additional provider and uses the Prisma adapter to persist provider accounts.
- Middleware protects `/dashboard` and its subroutes. Dashboard pages and server actions also check the session, so access is checked where data is read or changed.
- Newsletter queries are scoped to the authenticated user's ID for private dashboard operations. Public pages query only newsletters whose status is `Sent`.
- Draft and scheduled newsletters should never be returned by public newsletter queries.

## Useful commands

```bash
npm run dev        # Start the development server
npm run lint       # Run ESLint
npm run build      # Build the production app
npm run db:generate
npm run db:push    # Sync the Prisma schema to the configured database
npm run db:studio  # Open Prisma Studio
npm run db:seed    # Run the seed script, when configured for your local environment
```

## Project structure

- `app/`: routes, layouts, server actions and page-level UI.
- `components/`: reusable UI components.
- `lib/`: Prisma client, password helpers and validation schemas.
- `prisma/schema.prisma`: database models and relations.
- `auth.ts`: Auth.js configuration.
- `middleware.ts`: dashboard route protection.

## Security notes

- Never commit `.env`, database credentials, OAuth secrets or real user passwords.
- Use only the development database while building and testing.
- The server validates form data even when the browser also has validation attributes.
- Keep authorisation checks in server-side data queries and mutations. Hiding a link in the UI does not secure a route.
- Test with two separate accounts to confirm one user cannot view, edit or delete another user's newsletters.

## Lab approach and code comments

The implementation follows the module labs in order: TypeScript types and validation, React function components and props, state for interactive controls, then Next.js App Router pages and client components where interaction is needed. Database access and authentication checks stay on the server unless the UI genuinely needs browser-side state.

Code comments are added where they explain a security decision, a non-obvious step, or why an approach was chosen. Comments are kept short and natural; they should explain the reason for the code rather than repeat what the next line already says.
