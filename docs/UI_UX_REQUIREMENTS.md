# NOOR Platform - UI/UX Requirements Checklist

**Document Purpose**: Complete list of UI/UX elements, assets, and design specifications required to begin frontend development.

**Date**: November 2, 2025  
**Status**: Awaiting Client Input  
**Frontend Phase**: Ready to Start (Backend 100% Complete)

---

## 📋 Quick Summary

To begin frontend development, we need the following from you:

1. **Brand Assets** (logos, colors, fonts)
2. **Design Preferences** (style, layout preferences)
3. **UI Component Specifications** (buttons, forms, cards)
4. **Page Layouts** (wireframes or references)
5. **Content & Copy** (text, labels, messages)
6. **User Flow Preferences** (navigation, workflows)
7. **Accessibility Requirements** (WCAG compliance level)
8. **Localization Needs** (Arabic support requirements)

---

## 1. Brand Identity & Visual Assets

### 1.1 Logo & Brand Mark

**Required**:
- [ ] **Primary Logo** (SVG, PNG - transparent background)
  - Full color version
  - White version (for dark backgrounds)
  - Monochrome version
  - Minimum sizes: 200px, 400px, 800px width
  
- [ ] **Favicon** (ICO, PNG)
  - 16x16px, 32x32px, 64x64px
  - Apple touch icon (180x180px)
  
- [ ] **App Icons** (if mobile app planned)
  - iOS: 1024x1024px
  - Android: 512x512px

**Questions for You**:
- Do you have existing brand guidelines?
- Should we use "NOOR" text or a symbol/icon?
- Any specific logo placement preferences?

---

### 1.2 Color Palette

**Required**:
- [ ] **Primary Color** (main brand color)
  - Hex code: #______
  - RGB values
  - Usage: buttons, links, highlights
  
- [ ] **Secondary Color** (supporting brand color)
  - Hex code: #______
  - RGB values
  - Usage: secondary actions, accents
  
- [ ] **Accent Colors** (2-3 colors)
  - Success: #______ (green for confirmations)
  - Warning: #______ (yellow/orange for warnings)
  - Error: #______ (red for errors)
  - Info: #______ (blue for information)
  
- [ ] **Neutral Colors** (grays for text and backgrounds)
  - Background: #______ (page background)
  - Surface: #______ (card/panel background)
  - Text Primary: #______ (main text)
  - Text Secondary: #______ (secondary text)
  - Border: #______ (dividers, borders)

**UAE Government Colors Reference** (if applicable):
- UAE Flag: Red (#FF0000), Green (#00732F), White (#FFFFFF), Black (#000000)
- Gold accent: #C4A053 (often used in government portals)

**Questions for You**:
- Do you have existing brand colors?
- Should we follow UAE government color schemes?
- Preference for light/dark theme or both?

---

### 1.3 Typography

**Required**:
- [ ] **Primary Font Family**
  - Font name: __________
  - Weights needed: Light (300), Regular (400), Medium (500), Bold (700)
  - License: Open source or commercial?
  
- [ ] **Secondary Font Family** (optional, for headings)
  - Font name: __________
  - Weights needed: __________
  
- [ ] **Arabic Font** (for bilingual support)
  - Font name: __________ (e.g., Dubai Font, Noto Sans Arabic)
  - Weights needed: __________

**Font Size Scale**:
- [ ] Heading 1 (H1): ___px
- [ ] Heading 2 (H2): ___px
- [ ] Heading 3 (H3): ___px
- [ ] Body Text: ___px (typically 14-16px)
- [ ] Small Text: ___px (typically 12-14px)

**Recommended Fonts**:
- **English**: Inter, Roboto, Open Sans, Poppins
- **Arabic**: Dubai Font (official UAE font), Noto Sans Arabic, Cairo

**Questions for You**:
- Do you have preferred fonts?
- Should we use Dubai Font (official UAE government font)?
- Font size preferences (comfortable reading)?

---

### 1.4 Visual Style & Design Direction

**Required - Choose One**:
- [ ] **Modern & Minimal** (clean, lots of white space, simple)
- [ ] **Corporate & Professional** (traditional, formal, structured)
- [ ] **Tech & Innovative** (gradients, modern, dynamic)
- [ ] **Government & Official** (UAE government portal style)
- [ ] **Other**: _______________

**Design Elements**:
- [ ] Border Radius: ___px (0 = sharp corners, 8-16 = rounded, 24+ = very rounded)
- [ ] Shadows: Subtle / Prominent / None
- [ ] Animations: Minimal / Moderate / Rich
- [ ] Spacing: Compact / Comfortable / Spacious

**Visual References** (optional but helpful):
- [ ] Provide 3-5 website URLs you like
- [ ] Provide screenshots of preferred designs
- [ ] Provide mood board or inspiration images

**Questions for You**:
- Do you have design references or inspiration?
- Should we follow UAE government portal design patterns?
- Preference for modern vs traditional design?

---

## 2. Page Layouts & Structure

### 2.1 Header/Navigation

**Required Decisions**:
- [ ] **Header Style**:
  - [ ] Fixed (stays at top when scrolling)
  - [ ] Sticky (hides on scroll down, shows on scroll up)
  - [ ] Static (scrolls with page)
  
- [ ] **Navigation Items** (what should appear in main menu):
  - [ ] Home
  - [ ] Dashboard
  - [ ] Jobs
  - [ ] Profile
  - [ ] Applications
  - [ ] About
  - [ ] Contact
  - [ ] Help/Support
  - [ ] Other: __________

- [ ] **User Menu Items** (when logged in):
  - [ ] Profile
  - [ ] Settings
  - [ ] Notifications
  - [ ] Messages
  - [ ] Logout
  - [ ] Other: __________

**Questions for You**:
- Should we include UAE government logo/branding?
- Should we show language switcher (EN/AR) in header?
- Any required links (e.g., government portals)?

---

### 2.2 Footer

**Required Content**:
- [ ] **Footer Sections** (select what to include):
  - [ ] About NOOR
  - [ ] Quick Links
  - [ ] Contact Information
  - [ ] Social Media Links
  - [ ] Legal (Privacy Policy, Terms of Service)
  - [ ] Government Links
  - [ ] Newsletter Signup
  - [ ] Other: __________

- [ ] **Contact Information**:
  - Email: __________
  - Phone: __________
  - Address: __________
  - Social Media: __________

**Questions for You**:
- Any required government disclaimers?
- Should we link to other UAE government portals?
- Copyright text preference?

---

### 2.3 Dashboard Layout

**Required Decisions**:
- [ ] **Dashboard Style**:
  - [ ] Card-based (modern, flexible)
  - [ ] Widget-based (customizable)
  - [ ] List-based (traditional)
  - [ ] Mixed

- [ ] **Dashboard Sections** (what to show):
  - [ ] Welcome message
  - [ ] Profile completion progress
  - [ ] Quick stats (applications, jobs, etc.)
  - [ ] Recent activity
  - [ ] Recommended jobs
  - [ ] Upcoming interviews
  - [ ] Notifications
  - [ ] Quick actions
  - [ ] Other: __________

**Questions for You**:
- Should users be able to customize their dashboard?
- What's the most important information to show first?
- Any specific widgets or metrics required?

---

### 2.4 Forms & Input Fields

**Required Specifications**:
- [ ] **Form Style**:
  - [ ] Outlined (border around fields)
  - [ ] Filled (background color)
  - [ ] Underlined (bottom border only)
  
- [ ] **Label Position**:
  - [ ] Above field (most common)
  - [ ] Inside field (floating label)
  - [ ] Left of field (horizontal)

- [ ] **Required Field Indicator**:
  - [ ] Red asterisk (*)
  - [ ] "(Required)" text
  - [ ] Other: __________

- [ ] **Error Message Style**:
  - [ ] Below field (most common)
  - [ ] Tooltip
  - [ ] Inline with field

**Questions for You**:
- Any specific form validation preferences?
- Should we use inline validation (as user types)?
- Preference for multi-step forms or single page?

---

## 3. UI Components Specifications

### 3.1 Buttons

**Required Decisions**:
- [ ] **Primary Button**:
  - Background color: #______
  - Text color: #______
  - Border radius: ___px
  - Height: ___px (typically 40-48px)
  - Hover effect: Darken / Lighten / Shadow / Other
  
- [ ] **Secondary Button**:
  - Style: Outlined / Ghost / Filled
  - Colors: __________
  
- [ ] **Button Sizes**:
  - [ ] Small (32px height)
  - [ ] Medium (40px height)
  - [ ] Large (48px height)

**Questions for You**:
- Should buttons have icons?
- Loading state preference (spinner, text change)?
- Disabled button appearance?

---

### 3.2 Cards & Panels

**Required Decisions**:
- [ ] **Card Style**:
  - Border: Yes / No
  - Shadow: None / Subtle / Prominent
  - Border radius: ___px
  - Background: White / Gray / Other
  - Padding: ___px (typically 16-24px)

- [ ] **Card Hover Effect**:
  - [ ] Shadow increase
  - [ ] Slight lift
  - [ ] Border color change
  - [ ] None

**Questions for You**:
- Should cards be clickable?
- Any specific card layouts (e.g., job cards, profile cards)?

---

### 3.3 Tables & Lists

**Required Decisions**:
- [ ] **Table Style**:
  - [ ] Striped rows (alternating colors)
  - [ ] Bordered
  - [ ] Minimal (no borders)
  - [ ] Card-based (each row is a card on mobile)

- [ ] **Table Features**:
  - [ ] Sorting
  - [ ] Filtering
  - [ ] Pagination
  - [ ] Row selection
  - [ ] Row actions (edit, delete)
  - [ ] Export (CSV, PDF)

**Questions for You**:
- How many rows per page?
- Should tables be responsive (convert to cards on mobile)?

---

### 3.4 Modals & Dialogs

**Required Decisions**:
- [ ] **Modal Style**:
  - Size: Small / Medium / Large / Full Screen
  - Background overlay: Dark / Light / Blur
  - Close button: Top right / Top left / Bottom
  - Animation: Fade / Slide / Scale

**Questions for You**:
- Should modals be closable by clicking outside?
- Preference for modals vs side panels?

---

### 3.5 Notifications & Alerts

**Required Decisions**:
- [ ] **Notification Position**:
  - [ ] Top right
  - [ ] Top center
  - [ ] Bottom right
  - [ ] Bottom center

- [ ] **Notification Style**:
  - [ ] Toast (auto-dismiss)
  - [ ] Alert banner (stays until dismissed)
  - [ ] Inline message

- [ ] **Notification Types**:
  - Success: Icon + Color
  - Error: Icon + Color
  - Warning: Icon + Color
  - Info: Icon + Color

**Questions for You**:
- Auto-dismiss duration (3-5 seconds typical)?
- Should notifications stack or replace each other?

---

## 4. Page-Specific Requirements

### 4.1 Landing Page (Public)

**Required Content**:
- [ ] **Hero Section**:
  - Headline: __________
  - Subheadline: __________
  - Call-to-action: __________ (e.g., "Get Started", "Sign Up")
  - Hero image/illustration: Provide or we design?
  
- [ ] **Features Section**:
  - Feature 1: __________
  - Feature 2: __________
  - Feature 3: __________
  - Icons: Provide or we select?
  
- [ ] **Statistics Section** (optional):
  - Stat 1: __________ (e.g., "10,000+ Jobs")
  - Stat 2: __________ (e.g., "5,000+ Employers")
  - Stat 3: __________ (e.g., "95% Success Rate")
  
- [ ] **Call-to-Action Section**:
  - Message: __________
  - Button text: __________

**Questions for You**:
- Do you have marketing copy written?
- Should we include testimonials?
- Any specific sections required?

---

### 4.2 Login/Register Pages

**Required Decisions**:
- [ ] **Login Options**:
  - [ ] Email + Password
  - [ ] UAE Pass (government authentication)
  - [ ] Phone number + OTP
  - [ ] Social login (Google, Apple)
  
- [ ] **Registration Fields**:
  - [ ] Full Name
  - [ ] Email
  - [ ] Phone
  - [ ] Password
  - [ ] Emirates ID
  - [ ] Date of Birth
  - [ ] Nationality
  - [ ] Other: __________

- [ ] **Registration Flow**:
  - [ ] Single page
  - [ ] Multi-step (better UX)
  - [ ] Email verification required?
  - [ ] Phone verification required?

**Questions for You**:
- Is UAE Pass integration mandatory?
- Should we support social login?
- Any specific registration requirements?

---

### 4.3 User Dashboard

**Required Sections** (check all that apply):
- [ ] Welcome message with user name
- [ ] Profile completion progress bar
- [ ] Quick statistics cards
- [ ] Recent applications list
- [ ] Recommended jobs
- [ ] Upcoming interviews
- [ ] Skill assessment prompts
- [ ] Notifications feed
- [ ] Quick action buttons
- [ ] Other: __________

**Questions for You**:
- What's the primary goal of the dashboard?
- What should users see first?
- Any specific metrics to highlight?

---

### 4.4 Profile Management

**Required Sections**:
- [ ] **Personal Information**:
  - Photo upload
  - Basic details (name, email, phone)
  - Emirates ID
  - Date of birth
  - Nationality
  - Location
  
- [ ] **Skills Section**:
  - Add/edit/delete skills
  - Proficiency level selector
  - Years of experience
  - Verification status
  
- [ ] **Work Experience**:
  - Timeline view or list view?
  - Add/edit/delete experience
  - Current position highlight
  
- [ ] **Education**:
  - Add/edit/delete education
  - Verification status
  - GPA display
  
- [ ] **Certifications**:
  - Add/edit/delete certifications
  - Expiry date warnings
  - Verification status
  
- [ ] **Documents**:
  - Resume upload
  - Certificate uploads
  - ID documents

**Questions for You**:
- Should profile be public or private?
- Can users download their profile as PDF?
- Any required vs optional fields?

---

### 4.5 Job Search & Listings

**Required Features**:
- [ ] **Search & Filters**:
  - Keyword search
  - Location filter
  - Salary range
  - Job type (full-time, part-time, etc.)
  - Experience level
  - Industry
  - Company size
  - Posted date
  
- [ ] **Job Card Display**:
  - Job title
  - Company name
  - Location
  - Salary (if available)
  - Posted date
  - Job type badge
  - Save/bookmark button
  - Apply button
  
- [ ] **Sort Options**:
  - Most recent
  - Best match (AI-powered)
  - Highest salary
  - Closest location

**Questions for You**:
- Should we show AI match score on job cards?
- Map view for job locations?
- Job alerts/notifications?

---

### 4.6 Job Details Page

**Required Sections**:
- [ ] Job title and company
- [ ] Location and salary
- [ ] Job description
- [ ] Requirements
- [ ] Responsibilities
- [ ] Benefits
- [ ] Company information
- [ ] AI match score
- [ ] Similar jobs
- [ ] Apply button
- [ ] Save/bookmark button
- [ ] Share button

**Questions for You**:
- Should we show company reviews/ratings?
- Display number of applicants?
- Show application deadline?

---

### 4.7 Application Form

**Required Fields**:
- [ ] Cover letter (required or optional?)
- [ ] Resume upload (or use profile?)
- [ ] Expected salary
- [ ] Available start date
- [ ] Additional questions (employer-specific)
- [ ] Consent checkboxes

**Application Flow**:
- [ ] Single page or multi-step?
- [ ] Save as draft option?
- [ ] Preview before submit?

**Questions for You**:
- Can users apply with one click (using profile)?
- Should we track application status?
- Email confirmation after applying?

---

### 4.8 Applications Tracking

**Required Features**:
- [ ] List of all applications
- [ ] Status badges (submitted, under review, etc.)
- [ ] Filter by status
- [ ] Sort by date
- [ ] Withdraw application option
- [ ] View application details
- [ ] Interview schedule (if applicable)

**Questions for You**:
- Should we show application timeline?
- Notifications for status changes?
- Ability to message employer?

---

## 5. Content & Copywriting

### 5.1 Platform Messaging

**Required Text**:
- [ ] **Platform Tagline**: __________
- [ ] **Mission Statement**: __________
- [ ] **Value Proposition**: __________

### 5.2 Button Labels

**Standard Actions** (provide preferred text):
- [ ] Submit: "Submit" / "Send" / "Continue" / Other: __________
- [ ] Cancel: "Cancel" / "Go Back" / Other: __________
- [ ] Save: "Save" / "Save Changes" / Other: __________
- [ ] Delete: "Delete" / "Remove" / Other: __________
- [ ] Apply: "Apply Now" / "Submit Application" / Other: __________

### 5.3 Empty States

**Messages when no data** (provide text):
- [ ] No jobs found: __________
- [ ] No applications yet: __________
- [ ] No notifications: __________
- [ ] Profile incomplete: __________

### 5.4 Error Messages

**Common errors** (provide friendly messages):
- [ ] Invalid email: __________
- [ ] Password too weak: __________
- [ ] Required field: __________
- [ ] Network error: __________

**Questions for You**:
- Do you have a copywriter or should we write copy?
- Tone preference: Formal / Friendly / Professional?
- Any specific terminology to use/avoid?

---

## 6. Localization & Accessibility

### 6.1 Language Support

**Required**:
- [ ] **Languages to Support**:
  - [ ] English (primary)
  - [ ] Arabic (required for UAE)
  - [ ] Other: __________

- [ ] **Arabic Support Level**:
  - [ ] Full translation (all text)
  - [ ] Partial (key pages only)
  - [ ] RTL (right-to-left) layout support
  - [ ] Arabic number formats
  - [ ] Arabic date formats

**Questions for You**:
- Will you provide Arabic translations?
- Should Arabic be default for UAE users?
- Any specific Arabic dialect preference?

---

### 6.2 Accessibility (WCAG Compliance)

**Required Level**:
- [ ] WCAG 2.1 Level A (minimum)
- [ ] WCAG 2.1 Level AA (recommended)
- [ ] WCAG 2.1 Level AAA (highest)

**Accessibility Features**:
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast compliance
- [ ] Focus indicators
- [ ] Alt text for images
- [ ] ARIA labels
- [ ] Skip navigation links

**Questions for You**:
- Any specific accessibility requirements?
- Target user groups with disabilities?

---

## 7. Responsive Design & Devices

### 7.1 Device Support

**Required Breakpoints**:
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large Desktop (1440px+)

**Priority Device**:
- [ ] Mobile-first (design for mobile, then scale up)
- [ ] Desktop-first (design for desktop, then scale down)

**Questions for You**:
- What percentage of users will be on mobile?
- Should we support landscape orientation on mobile?
- Any specific device requirements (iPad, etc.)?

---

### 7.2 Browser Support

**Required Browsers**:
- [ ] Chrome (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Safari iOS (latest 2 versions)
- [ ] Chrome Android (latest 2 versions)

**Questions for You**:
- Need to support older browsers (IE11)?
- Any specific browser requirements?

---

## 8. User Experience (UX) Preferences

### 8.1 Navigation & Flow

**Questions for You**:
- Should users be able to complete profile later or required upfront?
- Should job application be possible without full profile?
- Preference for wizards/multi-step forms or single page?
- Should we use breadcrumbs for navigation?

### 8.2 Interactions & Feedback

**Questions for You**:
- Loading states: Spinners / Progress bars / Skeleton screens?
- Success feedback: Modal / Toast notification / Inline message?
- Confirmation dialogs: For all delete actions or just important ones?
- Auto-save: Should forms auto-save drafts?

### 8.3 Performance Expectations

**Questions for You**:
- Page load time target: <2s / <3s / <5s?
- Should we implement lazy loading for images?
- Should we use pagination or infinite scroll for lists?

---

## 9. Additional Features & Integrations

### 9.1 Optional Features

**Would you like to include**:
- [ ] Live chat support
- [ ] Video tutorials/onboarding
- [ ] Gamification (badges, points)
- [ ] Social sharing
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Push notifications
- [ ] Calendar integration
- [ ] PDF export (resume, applications)
- [ ] Analytics dashboard (for employers)

### 9.2 Third-Party Integrations

**Required Integrations**:
- [ ] UAE Pass (government authentication)
- [ ] Payment gateway (if applicable)
- [ ] Google Maps (for locations)
- [ ] Analytics (Google Analytics, etc.)
- [ ] Other: __________

---

## 10. Timeline & Priorities

### 10.1 MVP Features

**What MUST be in first release** (MVP):
- [ ] User registration/login
- [ ] Profile management
- [ ] Job search
- [ ] Job application
- [ ] Application tracking
- [ ] Other: __________

### 10.2 Phase 2 Features

**What can wait for later**:
- [ ] Employer portal
- [ ] Advanced analytics
- [ ] Messaging system
- [ ] Video interviews
- [ ] Other: __________

**Questions for You**:
- What's the target launch date?
- What's the absolute minimum for launch?
- Any features that are "nice to have" but not critical?

---

## 📝 How to Provide This Information

### Option 1: Fill Out This Document
- Download this document
- Fill in the blanks and check boxes
- Add comments/notes
- Return to us

### Option 2: Design Brief Document
- Create a separate design brief
- Include all the information above
- Add visual references
- Share with us

### Option 3: Meeting/Workshop
- Schedule a design workshop session
- We'll go through each section together
- We'll document decisions in real-time
- Follow-up with written summary

### Option 4: Provide References
- Share 3-5 websites you like
- Tell us what you like about each
- We'll extract design patterns
- Present mockups for your approval

---

## 🎨 Recommended Approach

**For Fastest Start**:
1. **Immediate** (can start with these):
   - Brand colors (primary, secondary)
   - Logo files
   - Font preferences
   - Design style preference (modern/corporate/government)

2. **Within 1 Week**:
   - Content/copy for landing page
   - Navigation structure
   - Dashboard layout preferences
   - Form field requirements

3. **Within 2 Weeks**:
   - Detailed page layouts
   - All UI component specifications
   - Arabic translations
   - Final content

**We Can Provide**:
- Design mockups for your approval
- Multiple design options to choose from
- Industry best practices recommendations
- UAE government portal design patterns

---

## ✅ Next Steps

1. **Review this document** - Go through each section
2. **Prioritize** - Mark what's critical vs nice-to-have
3. **Gather assets** - Collect logos, colors, fonts
4. **Provide feedback** - Fill in as much as you can
5. **Schedule review** - Let's discuss your inputs

**We can start with**:
- Minimal information (colors, logo, style preference)
- Design multiple options for your review
- Iterate based on your feedback
- Finalize design before full development

---

## 📞 Questions?

If you have questions about any section, please ask! We're here to help guide you through this process.

**Remember**: We can start with basic information and iterate. You don't need to have everything perfect before we begin!

---

**NOOR Platform** - Building the Future of UAE's Workforce 🇦🇪 🚀

