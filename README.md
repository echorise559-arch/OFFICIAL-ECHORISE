# Echorise Media — React Website

A full-featured music promotion website built with **React + Vite + Tailwind CSS**, ready to deploy on **Netlify**.

## Tech Stack
- React 18 + React Router v6
- Tailwind CSS v3 with custom design tokens
- Vite build system
- Netlify Forms (built-in, no backend needed)
- Flutterwave payment integration (placeholder, ready to activate)

## Project Structure
```
src/
  components/
    Navbar.jsx            # Fixed navbar with mobile menu + Order Now modal
    Footer.jsx            # Site footer
    OrderModal.jsx        # Full order form modal (Netlify Forms)
    PaymentModal.jsx      # Flutterwave payment step + invoice flow
    SpotifyCustomModal.jsx # Custom Spotify campaign request (Netlify Forms)
    PricingCard.jsx       # Reusable pricing card
    ReviewCard.jsx        # Review card with image, flag, stars, reply
    TeamSection.jsx       # 8-person team grid with photos
    StatsBar.jsx          # Animated counter stats bar
    FAQSection.jsx        # Accordion FAQ
    PartnerLogos.jsx      # Platform partner logos
    PageHero.jsx          # Reusable inner page hero
  pages/
    Home.jsx              # Full homepage
    SpotifyPage.jsx       # Spotify promotion page
    SoundCloudPage.jsx    # SoundCloud promotion page
    ChartPage.jsx         # Chart promotion page
    DancePage.jsx         # Dance video promotion page
    ContactPage.jsx       # Contact form page (Netlify Forms)
    OrderPage.jsx         # Standalone order page with 3-step flow
    SuccessPage.jsx       # Post-payment success + invoice download
    NotFound.jsx          # 404 page
  data/
    index.js              # All site data (reviews, packages, team, FAQ, countries)
```

## Setup

```bash
npm install
npm run dev       # development server
npm run build     # production build → ./dist
npm run preview   # preview production build
```

## Deploy to Netlify

### Option 1: Drag & Drop
1. Run `npm run build`
2. Drag the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop)

### Option 2: Git + Netlify CI
1. Push this repo to GitHub/GitLab
2. Connect to Netlify → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

The `netlify.toml` handles SPA routing automatically.

## Netlify Forms
Forms are pre-configured and will work automatically on Netlify. Three forms:
- **order** — Campaign order form
- **spotify-custom** — Custom Spotify request  
- **contact** — General contact form

Check submissions at: Netlify Dashboard → Forms

## Activating Flutterwave Payments
In `src/components/PaymentModal.jsx`, replace the demo `setTimeout` block with:

```javascript
window.FlutterwaveCheckout({
  public_key: "FLWPUBK_TEST-YOUR-KEY-HERE",
  tx_ref: invoiceNum,
  amount: price,
  currency: "USD",
  payment_options: "card,banktransfer,ussd,mobilemoney",
  customer: { email: orderData.email, name: orderData.artistName },
  customizations: {
    title: "Echorise Media",
    description: `Campaign – ${pkg?.name}`,
    logo: "https://yourdomain.com/favicon.svg",
  },
  callback: function(data) {
    if (data.status === "successful") {
      navigate('/success', { state: { orderData, invoiceNum, price } })
    }
  },
  onclose: function() { setProcessing(false) },
})
```

Then add the Flutterwave inline script to `index.html`:
```html
<script src="https://checkout.flutterwave.com/v3.js"></script>
```

## Customisation
- **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`
- **Content**: Edit `src/data/index.js` (packages, reviews, team, FAQ)
- **Pricing**: Update package prices in `src/data/index.js`
- **Contact email**: Update in `src/components/Footer.jsx` and `src/pages/ContactPage.jsx`
