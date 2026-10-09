# 🛒 বাজার দর — BazarDor

**A Bengali-language daily market price platform for Bangladesh.**

বাজার দর is a responsive web application that helps users explore daily prices of essential products, compare prices across markets, and understand price changes over time.

The platform provides product categories, price trends, detailed product information, market-wise price comparisons, and user authentication in one place.

## ✨ Features

- **Daily Market Price Overview:** Explore essential products and their current prices from the homepage.
- **Price Trend Sections:** Discover products with rising and falling prices.
- **Category-Based Browsing:** Browse products by category and sort them by price in ascending or descending order.
- **Product Details:** View current prices, minimum and maximum market prices, average prices, and historical price comparisons.
- **Market-Wise Price Comparison:** Compare reported minimum and maximum prices across different markets.
- **User Authentication:** Register and sign in using email and password, Google, or GitHub through Better Auth.
- **User Profile Management:** View profile information and update your name.
- **Responsive Interface:** Browse the application on desktop, tablet, and mobile devices.
- **Interactive Navigation:** Use category navigation, an animated price ticker, and direct links to product details.
- **Loading and Error States:** Get appropriate feedback when data is loading or a requested page or category is unavailable.

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| Next.js App Router | Application routing and server-rendered pages |
| React | UI components and interactive interfaces |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling |
| DaisyUI | UI components and styling utilities |
| Better Auth | Authentication and session management |
| MongoDB | Authentication data storage |
| React Hot Toast | Success and error notifications |
| Lucide React | Interface icons |
| BazarDor API | Product, category, and market-price data |

## 📄 Application Pages

- **Home (`/`)** — Price overview, rising and falling products, category-wise product listings.
- **Category (`/category/[slug]`)** — Category-specific products with price sorting.
- **Product Details (`/product/[slug]`)** — Product price summary, historical comparisons, and market-wise prices.
- **Sign In (`/signin`)** — Email/password and social authentication.
- **Sign Up (`/signup`)** — User registration and social authentication.
- **Profile (`/profile`)** — User information and profile management.

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (a version compatible with the project's Next.js version)
- npm
- A MongoDB database
- Google and GitHub OAuth credentials for social sign-in

### 1. Clone the repository

```bash
git clone https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor.git
cd B14-A7-Bazar-Dor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and configure the following variables using your own credentials:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Important:** Never commit `.env.local` or expose database credentials, authentication secrets, or OAuth client secrets.

For social authentication, configure the corresponding OAuth application and callback URLs for your local and deployed environments.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create a production build

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🔌 API

The application uses the BazarDor API to retrieve product, category, and market-price information.

**Base URL:** `https://api.api-store.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/products` | Retrieve products |
| `/products?category=chal` | Filter products by category |
| `/categories` | Retrieve categories |

The API also documents single-product and single-category endpoints. The application currently retrieves the product list and selects individual products by slug.

## 🚀 Deployment

The application is intended to be deployed on Vercel or another compatible hosting platform.

Before deploying:

1. Add the required environment variables to the hosting platform.
2. Configure production OAuth callback URLs.
3. Run a production build.
4. Test authentication, product pages, category sorting, and page refreshes on the deployed site.

**Live Demo:** Add your deployed application URL here.

## 📦 Project Information

- **Project:** BazarDor — বাজার দর
- **Type:** Responsive web application
- **Purpose:** Daily market price browsing and comparison
- **Repository:** [B14-A7-Bazar-Dor](https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor)

---

*বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।*
