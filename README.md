# ShimaCharles.ca

Personal brand website for Charles Shima: React (Vite) front end, Supabase for the CMS, bookings, login and images, hosted on Hostinger, deployed from GitHub.

- **Visitors** see a fast static site with your portrait-and-menu landing page.
- **You** sign in at `shimacharles.ca/admin` to change text, images, logo, blog posts, speaking, ventures, press and booking options, and to manage booking requests.
- The site works even before Supabase is connected: it shows the starting content and the booking form opens the visitor's email app.

Total running cost: your Hostinger plan. Supabase, GitHub and (optionally) Resend are free at this size.

---

## 1. Put the code on GitHub (5 min)

1. Create a **private** repository on github.com, e.g. `shimacharles`.
2. Upload this folder's contents (GitHub website: *Add file → Upload files*, drag everything in, including the hidden `.github` folder and `package-lock.json`). Or with Git:
   ```bash
   git init && git add . && git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/shimacharles.git
   git push -u origin main
   ```

## 2. Create the database on Supabase (10 min)

1. Sign up at **supabase.com** → *New project*. Choose a region close to your visitors, set a database password, and save it somewhere safe.
2. Open **SQL Editor → New query**, paste all of `supabase/schema.sql`, click **Run**.
3. New query again: paste `supabase/seed.sql`, **Run**. This loads the starting content.
4. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up" (only you should have an account).
5. **Authentication → Users → Add user → Create new user**: your email and a strong password, tick *Auto confirm*.
6. Back in SQL Editor, run (with your email):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'YOUR-EMAIL@example.com';
   ```
7. **Authentication → URL Configuration**: set *Site URL* to `https://shimacharles.ca` (needed for password-reset emails).
8. **Project settings → API**: copy the **Project URL** and the **anon public** key. The anon key is safe to use in the website; the database rules only let visitors read published content and send booking requests.

## 3. Connect GitHub to Hostinger (10 min)

In **Hostinger hPanel → Files → FTP Accounts**, note (or create) an FTP account: server, username, password.

In **GitHub → your repo → Settings → Secrets and variables → Actions → New repository secret**, add:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | Project URL from step 2.8 |
| `VITE_SUPABASE_ANON_KEY` | anon public key from step 2.8 |
| `VITE_SITE_URL` | `https://shimacharles.ca` |
| `FTP_SERVER` | e.g. `ftp.shimacharles.ca` or the IP Hostinger shows |
| `FTP_USERNAME` | your FTP username |
| `FTP_PASSWORD` | your FTP password |

Then go to the **Actions** tab → *Deploy to Hostinger* → **Run workflow**. In about two minutes the site is live. From now on, every push to `main` redeploys automatically.

> If your FTP account opens directly inside the website folder (you see `index.html`, not `public_html`, when you connect), change `server-dir: ./public_html/` to `server-dir: ./` in `.github/workflows/deploy.yml`.
>
> In hPanel, make sure SSL is active for the domain (Security → SSL). The included `.htaccess` sends everyone to `https://shimacharles.ca`.

## 4. First things to do in the admin

Go to `https://shimacharles.ca/admin` and sign in.

1. **Site settings → Contact**: add your **WhatsApp number** (country code, digits only, e.g. `250788123456`) and your real **email**. The WhatsApp button appears as soon as the number is saved.
2. **Site settings → About**: rewrite "Your story" and the quote in your own words. The current text is a draft.
3. **Ventures → ZaNiheza**: add a real description, image and link.
4. **Speaking**: add your role at each event, and links if you have them.
5. **Site settings → Social media**: add your LinkedIn, Instagram, TikTok links.

Every change appears on the site right away; no redeploy needed. Only changes to the code (design, new page types) need a GitHub push.

## 5. Working on the code on your computer

Requires Node.js 20+.

```bash
npm install
cp .env.example .env      # paste your Supabase URL and anon key
npm run dev               # opens http://localhost:5173
npm run build             # production files in /dist
```

Where things live:

| What | File |
|---|---|
| Colours, fonts, all styling | `src/styles.css` |
| Landing page and sections | `src/components/Sections.jsx` |
| Menu items | `src/components/nav.js` |
| Booking page | `src/pages/WorkWithMe.jsx` |
| Admin fields (add a field = it appears in the editor) | `src/admin/schemas.js` |
| Starting content | `src/content/defaults.js` (run `node scripts/make-seed.mjs` to refresh `supabase/seed.sql`) |
| Logos and default photos | `public/brand`, `public/images` |

## 6. Optional: get an email for every booking

1. Create a free account at **resend.com** and an API key. (To send from `@shimacharles.ca`, verify the domain in Resend by adding the DNS records it gives you in Hostinger → DNS.)
2. Install the Supabase CLI, then from this folder:
   ```bash
   supabase login
   supabase link --project-ref YOUR-PROJECT-REF
   supabase secrets set RESEND_API_KEY=re_xxx NOTIFY_TO=you@example.com NOTIFY_FROM="ShimaCharles.ca <bookings@shimacharles.ca>"
   supabase functions deploy notify-booking --no-verify-jwt
   ```
3. Supabase → **Database → Webhooks → Create**: table `bookings`, event **Insert**, type **Supabase Edge Functions**, function `notify-booking`.

You'll get an email for each request, and pressing *Reply* answers the visitor directly.

## Good to know

- **Free Supabase projects pause after 7 days with no activity.** Normal site traffic keeps it awake. If it pauses, the site still shows the last content it loaded, and you can resume it from the Supabase dashboard in one click.
- **Image sizes:** portraits look best at about 800 × 1200 px; uploads are limited to 8 MB. WebP or JPG is ideal.
- **Search engines:** after launch, add the site in Google Search Console and submit `https://shimacharles.ca/sitemap.xml`.
- **Reusing this for ZaNiheza:** copy the repo, change the palette in `src/styles.css`, the menu in `nav.js` and the content in the admin. Use a separate Supabase project.
