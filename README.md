# AWD CMS

A newsletter content management system for the Advanced Web Development assignment. It uses TypeScript, the Next.js App Router, PostgreSQL, Prisma, Auth.js, Tailwind CSS and DaisyUI.

## Requirements

- Node.js and npm
- Access to the UEA CMP PostgreSQL server or another PostgreSQL database
- Google OAuth credentials if you want to test Google sign-in

## Local setup

1. Clone the repository and enter the project folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and add your own values. Keep `.env` local and never commit it.

4. Set `DATABASE_URL` to your development database connection string. The usual PostgreSQL URL format is:

   ```text
   postgresql://USERNAME:URL_ENCODED_PASSWORD@HOST:5432/DATABASE_NAME?schema=public
   ```

   Use the host, username and database supplied for your account. If the password contains characters such as `@`, `:`, `/`, `?` or `#`, URL-encode the password before adding it to the connection string. Do not paste your real password into GitHub or this chat.

5. Generate an Auth.js secret. On macOS or Linux, you can run:

   ```bash
   openssl rand -base64 32
   ```

   Put the generated value in `AUTH_SECRET`.

6. Generate Prisma Client and sync the development schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

7. Add the sample development data and start the app:

   ```bash
   npm run db:seed
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

The seed command creates a demo user and two published newsletters, plus one draft. The demo user has no password, so register a separate account to test credentials login. The seed refuses to run when `NODE_ENV=production`.

If the CMP server refuses the connection, check whether you need to be on the UEA network or VPN and follow the connection details supplied by the module team. Use the development database while building and testing.

## Environment variables

See `.env.example` for the variable names. Keep real values in your local `.env` file only.

- `DATABASE_URL`: PostgreSQL connection string for the development database.
- `AUTH_SECRET`: secret used by Auth.js to protect session tokens.
- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`: Google OAuth credentials for Google sign-in.

For local Google OAuth, configure the authorised redirect URI as `http://localhost:3000/api/auth/callback/google` in Google Cloud.

## Authentication and authorisation

- Registration validates input and stores a salted scrypt password hash.
- Auth.js uses JWT sessions containing the authenticated user's ID and role.
- Google sign-in is configured as an additional provider and uses the Prisma adapter to store provider accounts.
- The Next.js 16 `proxy.ts` entry point covers requests to `/dashboard` and its subroutes. Dashboard pages and server actions also check the session.
- Dashboard newsletter queries and mutations are scoped to the signed-in user's ID.
- Public newsletter pages query only records with status `Sent`. Draft and scheduled newsletters should stay private.

## Useful commands

```bash
npm run dev        # Start the development server
npm run lint       # Run ESLint
npm run build      # Build the production app
npm run db:generate
npm run db:push    # Sync the Prisma schema to the configured database
npm run db:studio  # Open Prisma Studio
npm run db:seed    # Add repeatable development demo data
```

## Project structure

- `app/`: routes, layouts, server actions and page-level UI.
- `components/`: reusable interface components.
- `lib/`: Prisma client, password helpers and validation schemas.
- `prisma/schema.prisma`: database models and relations.
- `prisma/seed.ts`: repeatable development sample data.
- `auth.ts`: Auth.js configuration.
- `proxy.ts`: dashboard request protection.

## Security checks

- Never commit `.env`, database credentials, OAuth secrets or real user passwords.
- Use a development database while building and testing.
- Validate form data on the server, even when the browser also has validation attributes.
- Keep authorisation checks in server-side queries and mutations. Hiding a link in the interface does not secure a route.
- Test with two separate accounts to confirm one user cannot view, edit or delete another user's newsletters.

## Code comments

Comments explain security decisions and less obvious implementation choices. They are kept short and natural, and focus on why the code works this way rather than repeating the code itself.
