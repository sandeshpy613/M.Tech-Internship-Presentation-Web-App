# M.Tech Internship Presentation Web App

This is a premium, web-based interactive slideshow application that presents **Sandesh P Y's** M.Tech internship report: **"Full-Stack Development and AI Integration for Industrial Applications"** at **Raashi Digital LLP** (under the guidance of **Dr. Hamsaveni M**).

Unlike static PowerPoint slides, this app is fully interactive, featuring:
- **Interactive 3-Tier Architecture Flow**: Click to explore the frontend (Next.js), backend (Python/Django), and database (PostgreSQL) setups.
- **Interactive RAG Simulator**: Visual step-by-step trace of how the AI Knowledge System processes user queries, retrieves verified manuals, and generates grounded answers.
- **Performance Metrics Charts**: Interactive visual comparisons of lookup times (Manual search vs. AI search) and compliance accuracy.
- **Presenter Mode**: A timer and slide-by-slide speaker notes.
- **Multiple Aesthetic Themes**: Switch between Dark Glassmorphism, Cyberpunk Neon, Tech Slate, and Minimal Grid.
- **Print to PDF Mode**: Renders all slides on a single scrollable page, optimized for direct printing or saving as a PDF.

---

## How to Run Locally

Follow these steps to run the presentation on your computer:

### 1. Install Node.js
Make sure you have Node.js installed (Version 18 or higher is recommended).
- You can download it from [nodejs.org](https://nodejs.org/).

### 2. Install Project Dependencies
Open your terminal (PowerShell, Command Prompt, or Git Bash) in this project folder and run:
```bash
npm install --legacy-peer-deps
```
*Note: The `--legacy-peer-deps` flag is required to bypass minor version differences between some React components.*

### 3. Run the Development Server
Start the website locally by running:
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the presentation.

---

## How to Edit Presentation Content

All the text, slide titles, bullet points, speaker notes, and guide details are centralized in a single file to keep the website and PowerPoint presentation perfectly aligned:

### 1. Edit the Content
To modify any presentation text, simply edit the fields inside:
- [slide-content.json](file:///c:/Users/Sandesh%20PY/Desktop/Internship%20Portfolio/Project/components/presentation/slide-content.json)

The website slide deck will update automatically as soon as you save this file.

### 2. Update the Downloadable PowerPoint (.pptx)
To regenerate the downloadable PowerPoint presentation matching your updated text:
1. Open your terminal in the project directory.
2. Run the generator script:
   ```bash
   python generate_ppt.py
   ```
This will automatically overwrite `public/presentation/internship_presentation.pptx` with the latest text, keeping the horizontal college logo and split slide structures intact.

---

## How to Deploy to Vercel with Your Custom Subdomain

To put this presentation online and connect it to your domain `sandeshpy.com` under a subdomain like `internship.sandeshpy.com`, follow this guide:

### Step 1: Upload Your Code to GitHub
1. Create a free account on [GitHub](https://github.com/) if you do not have one.
2. Install Git on your computer if you haven't already.
3. Open your terminal in the project directory and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Internship Presentation"
   ```
4. Create a **New Repository** on GitHub (name it something like `internship-presentation`). Keep it public or private.
5. Copy the command lines given by GitHub under **"…or push an existing repository from the command line"** and run them:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import Your Project to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign up / log in. **Choose to sign in with GitHub** (this makes importing your projects extremely easy).
2. On your Vercel Dashboard, click **Add New...** and select **Project**.
3. You will see a list of your GitHub repositories. Find your `internship-presentation` repository and click **Import**.
4. Leave the settings at their default values (Vercel automatically detects Next.js build scripts).
5. Click **Deploy**.
6. Wait 1–2 minutes. Vercel will build the project and give you a default URL ending in `.vercel.app` (e.g., `internship-presentation.vercel.app`).

### Step 3: Connect Your Custom Domain (`internship.sandeshpy.com`)
1. On your Vercel project page, click **Settings** at the top.
2. In the sidebar on the left, click **Domains**.
3. In the input box, type your desired subdomain, e.g.:
   `internship.sandeshpy.com`
4. Click **Add**.
5. Vercel will show that the domain is pending verification and will display a table containing DNS records.

### Step 4: Configure DNS Records with Your Registrar
Go to the website where you purchased `sandeshpy.com` (GoDaddy, Namecheap, Google Domains, etc.), and log in to your account control panel:
1. Find the **DNS Settings / Zone Editor** page for your domain `sandeshpy.com`.
2. Add a new DNS record:
   - **Type**: `CNAME`
   - **Name (or Host)**: `internship` (do NOT type the full `internship.sandeshpy.com`, just the prefix `internship`)
   - **Target (or Value)**: `cname.vercel-dns.com`
   - **TTL**: Keep the default (usually 1 hour or Automatic)
3. Save the DNS record.

### Step 5: Verification and SSL
- Go back to your Vercel dashboard. It might take anywhere from 1 to 15 minutes for the DNS changes to propagate across the internet.
- Vercel will automatically detect the DNS record, verify the connection, and configure a free secure SSL certificate (HTTPS) for you.
- Your presentation website will now be live at `https://internship.sandeshpy.com`!
