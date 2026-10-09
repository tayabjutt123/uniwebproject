# ⚡ Novaflow - Intelligent Cloud & Workflow Automation Platform

> A modern, responsive five-page website designed and developed with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**.

---

## 📌 Submission Checklist & Project Details

| Item | Status | Location / Detail |
| :--- | :---: | :--- |
| **1. Live Website Link** | Ready to Deploy | `https://<your-username>.github.io/tybweb/` |
| **2. GitHub Repository Link** | Ready to Push | `https://github.com/<your-username>/tybweb` |
| **3. VS Code Folder Structure Screenshot** | ✅ Complete | `assets/images/screenshots/00-vscode-folder-structure.png` |
| **4. Hero Section Screenshots (5 Pages)** | ✅ Complete | `assets/images/screenshots/` (Home, About, Contact, Sign In, Sign Up) |
| **5. PDF Submission File** | ✅ Generated | `Novaflow-Project-Submission.pdf` & `submission.html` |

---

## 🚀 Live Pages Overview

1. **Home Page (`index.html`)**: Hyperscale orchestration hero, interactive telemetry dashboard frame, client logo cloud, 4-card Bento grid, SLA metric counters, interactive tabbed code visualizer, customer reviews, 3-tier pricing cards, FAQ accordion, gradient CTA banner, video demo modal, and multi-column footer.
2. **About Us (`src/pages/about.html`)**: Breadcrumb navigation, mission & origin story, 4 core value cards, interactive growth timeline, leadership & team directory with department filters, venture capital metric counters, culture photo gallery, industry awards, open career postings, investor logos, and community CTA.
3. **Contact Us (`src/pages/contact.html`)**: Breadcrumb navigation, average response time beacon, direct communication channels, **fully functional Formspree contact form** with asynchronous validation & feedback alerts, global office location tabs with interactive map marker, pre-contact FAQ accordion, security badges, and floating live chat widget.
4. **Sign In (`src/pages/signin.html`)**: Split-screen authentication layout, 1-click Google & GitHub OAuth buttons, floating/icon input fields, eye icon password toggle, remember-me checkbox, forgot password modal dialog, passkey / WebAuthn biometric action, and customer social proof.
5. **Sign Up (`src/pages/signup.html`)**: Split-screen registration layout, starting plan radio selection cards, interactive **4-bar password strength meter** with dynamic rule verification, live confirm password match checker, terms consent checkbox, and trust badges.

---

## 📁 Project Folder Structure

Organized according to academic guidelines (`index.html`, `src/pages/`, `assets/`):

```text
tybweb/
├── index.html                                 # Page 1: Home Page
├── about.html                                 # Root convenience redirect
├── contact.html                               # Root convenience redirect
├── signin.html                                # Root convenience redirect
├── signup.html                                # Root convenience redirect
├── Novaflow-Project-Submission.pdf            # PDF Submission File
├── submission.html                            # Printable HTML Submission Report
├── README.md                                  # Complete Project Documentation
├── assets/
│   ├── css/
│   │   └── styles.css                         # Custom typography, animations, glassmorphism
│   ├── js/
│   │   ├── main.js                            # Mobile drawer, accordions, tabs, modals, back-to-top
│   │   ├── contact.js                         # Formspree async submission & validation
│   │   └── auth.js                            # Password strength meter & authentication handlers
│   └── images/
│       ├── favicon.svg                        # Vector brand favicon
│       ├── logo.svg                           # Novaflow SVG logo
│       └── screenshots/                       # High-res submission screenshots
│           ├── 00-vscode-folder-structure.png # Expanded VS Code Explorer Screenshot
│           ├── 01-home-hero.png               # Home Hero Screenshot
│           ├── 02-about-hero.png              # About Hero Screenshot
│           ├── 03-contact-hero.png            # Contact Hero Screenshot
│           ├── 04-signin-hero.png             # Sign In Hero Screenshot
│           └── 05-signup-hero.png             # Sign Up Hero Screenshot
├── src/
│   └── pages/
│       ├── about.html                         # Page 2: About Us Page
│       ├── contact.html                       # Page 3: Contact Us Page (with Formspree)
│       ├── signin.html                        # Page 4: Sign In Page
│       └── signup.html                        # Page 5: Sign Up Page
└── tools/
    ├── capture.js                             # Automated screenshot capture tool
    └── render-folder-structure.html           # VS Code explorer renderer
```

---

## 🧩 10+ Tailwind CSS Components Per Page Breakdown

### 1. Home Page (`index.html`) — 12 Components
1. **Global Sticky Glassmorphism Header & Navbar**: Responsive brand logo, desktop pills, auth actions, and mobile hamburger drawer.
2. **Hero Section Component**: Pill announcement badge with pulsing beacon, dual-gradient headline, action button group, avatar social proof stack, and interactive dashboard preview.
3. **Client / Partner Logo Cloud**: Grayscale-to-color interactive logo grid.
4. **Bento Grid Architecture Cards**: Multi-cloud deployment, AI healing, zero-trust security, and OpenTelemetry cards.
5. **Numerical Metrics / SLA Counters**: 99.999% SLA, <12ms latency, 3.8B+ API requests, 4.5x deployment speed.
6. **Interactive Tabbed Product Showcase**: CI/CD pipeline visualizer, TypeScript SDK snippet, and declarative YAML config.
7. **Customer Testimonials Cards**: Client reviews with 5-star ratings, author photos, and company titles.
8. **Tiered Pricing Component**: Starter ($0), Pro ($49 - featured), and Enterprise ($199) cards with feature checklists.
9. **Interactive FAQ Accordion**: Expandable/collapsible FAQ questions with animated chevron arrows.
10. **High-Contrast Gradient CTA Banner**: Email capture with instant trial activation.
11. **Interactive Demo Video Modal**: Backdrop-blur overlay, close button, and keyboard ESC listener.
12. **Multi-Column Comprehensive Footer**: Category columns, live operational status badge, and floating back-to-top button.

### 2. About Page (`src/pages/about.html`) — 12 Components
1. **Consistent Sticky Navbar**: Synchronized active page styling.
2. **Breadcrumb Navigation & Mission Hero**: Category tag, high-impact headline, and founding highlights pills.
3. **Core Values Bento Cards**: Relentless Simplicity, Radical Transparency, Zero-Trust Security, Obsessive Reliability.
4. **Interactive Growth Timeline**: Alternating milestones from 2022 to 2026.
5. **Team & Leadership Showcase**: Filterable tabs (All, Leadership, Core Engineering) and social profile cards.
6. **Impact Stats Counters**: $52M Series B, 120+ team members, 4,800+ enterprise customers, 99.999% uptime.
7. **Culture & Workplace Photo Gallery**: Visual mosaic of company summits, hackathons, and remote teamwork.
8. **Industry Awards & Recognition Grid**: Gartner Cool Vendor, Forbes Cloud 100, Product Hunt, G2 badges.
9. **Careers / Open Positions Teaser**: Job cards with department pills, remote badges, and apply buttons.
10. **Tier-1 Investor Showcase**: Benchmark, Sequoia Capital, Index Ventures, Accel.
11. **Engineering Community Call-To-Action**: Star on GitHub & Discord community invitations.
12. **Multi-Column Footer**: Consistent legal, product, and company directory links.

### 3. Contact Page (`src/pages/contact.html`) — 11 Components
1. **Consistent Sticky Navbar**: With active Contact highlight.
2. **Breadcrumb & Contact Hero**: Response time badge (< 15 mins).
3. **Direct Communication Channel Cards**: Enterprise Sales, 24/7 Technical Support, Global HQ.
4. **Functional Formspree Contact Form**: Full Name, Work Email, Company, Inquiry Topic dropdown, Message, Terms checkbox.
5. **Live Form Status Alerts**: Green success alert and red error alert with retry option.
6. **Dynamic Message Character Counter**: Live tracking up to 500 characters.
7. **Global Offices Tab Switcher**: San Francisco, London, Singapore with interactive map frame.
8. **Pre-Contact FAQ Accordion**: Quick answers before opening a ticket.
9. **Enterprise Security & Compliance Badges**: SOC-2 Type II, ISO 27001, HIPAA, GDPR Shield.
10. **Floating Live Chat Teaser**: Interactive customer engineer widget.
11. **Developer Social Community Grid**: GitHub Discussions, Discord, Twitter / X.

### 4. Sign In Page (`src/pages/signin.html`) — 12 Components
1. **Consistent Sticky Navbar**: Synchronized site-wide header.
2. **Split-Screen Authentication Layout**: Form panel and product value graphic.
3. **Social OAuth Buttons**: 1-click Google and GitHub authentication.
4. **Divider Component**: "Or continue with work email".
5. **Interactive Sign-In Form**: Email and password inputs with custom focus rings.
6. **Eye Icon Password Visibility Toggle**: Seamlessly switch between hidden and visible text.
7. **Remember Me Checkbox**: Custom-styled checkbox.
8. **Primary Submit Button**: Loading spinner animation on authentication.
9. **Inline Validation Feedback Alert**: Dynamic alert banner for credential confirmation.
10. **Pop-Up Forgot Password Modal**: Email recovery drawer with close button and backdrop.
11. **Biometric WebAuthn Button**: Passkey / TouchID instant login action.
12. **Compact Footer**: Legal terms and privacy disclosures.

### 5. Sign Up Page (`src/pages/signup.html`) — 12 Components
1. **Consistent Sticky Navbar**: Synchronized site-wide header.
2. **Split-Screen Value Proposition Container**: Feature checklist and rating badges.
3. **Social One-Click Registration**: Google and GitHub buttons.
4. **Divider Component**: "Or register with work email".
5. **Multi-Field Registration Form**: Full Name, Company, Work Email.
6. **Plan Selection Radio Cards**: Community Free vs Pro Scale Trial with active border rings.
7. **Interactive 4-Bar Password Strength Meter**: Live scoring (Weak, Fair, Good, Strong) with dynamic colors.
8. **Real-Time Password Rules Checklist**: 8+ chars, uppercase & lowercase, numbers, special characters.
9. **Confirm Password Match Verification**: Real-time validation alert if passwords differ.
10. **Terms & Conditions Consent Checkbox**: Custom toggle with linked legal policies.
11. **Primary Registration Submit Button**: High-conversion button with spinner state.
12. **Trust & Security Badges**: "No credit card required • Cancel anytime • 256-bit SSL encrypted".

---

## 📬 Formspree Integration Details

The contact form in `src/pages/contact.html` is configured to submit to Formspree:

```html
<form id="contact-form" action="https://formspree.io/f/mqazkzyo" method="POST" novalidate>
```

- **Endpoint**: `https://formspree.io/f/mqazkzyo` (Replace `mqazkzyo` with your custom Formspree form ID anytime in `src/pages/contact.html`).
- **Asynchronous AJAX Submission**: Implemented in `assets/js/contact.js` via the `fetch` API.
- **Client-Side Validation**: Ensures valid name, email format, topic selection, and minimum message length before dispatch.
- **Visual Feedback**: Displays a loading spinner while submitting, followed by a green success banner with a generated reference ticket.

---

## 🌐 How to Push to GitHub & Deploy to GitHub Pages (5/5 Rubric)

### Step 1: Initialize and Commit
In your terminal / PowerShell in `e:\TYB\tybweb`:
```powershell
git init
git add .
git commit -m "Initial commit: Complete 5-page responsive Novaflow website with Tailwind CSS and Formspree"
```

### Step 2: Push to GitHub
1. Create a new public repository on GitHub named `tybweb`.
2. Link your local repo and push:
```powershell
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/tybweb.git
git push -u origin main
```

### Step 3: Enable GitHub Pages (Live Link)
1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. In about 1–2 minutes, your site will be live at:
   `https://<YOUR-GITHUB-USERNAME>.github.io/tybweb/`

---

## 📄 PDF Submission File

The required submission PDF is generated and saved as:
**`Novaflow-Project-Submission.pdf`**

This PDF includes:
1. Live Website Link
2. GitHub Repository Link
3. Expanded VS Code Project Folder Structure Screenshot
4. Page Front / Hero Section Screenshots for all 5 pages (Home, About, Contact, Sign In, Sign Up)
5. Comprehensive Rubric Compliance Summary
#   u n i w e b p r o j e c t  
 