# 🛒 BazarDor — Bangladesh Market Price Tracker

**BazarDor** is a responsive web application that helps users explore the prices of essential daily necessities in Bangladesh. Users can browse products by category, view price changes, compare market prices, and access personalized features through authentication.

🔗 **Live Demo:** [https://bazar-dor-sand.vercel.app](https://bazar-dor-sand.vercel.app)

📦 **GitHub Repository:** [B14-A7-Bazar-Dor](https://github.com/sushamaray/B14-A7-Bazar-Dor)

---

## ✨ Features

- **Homepage Dashboard:** Explore essential products and their current prices from one place.
- **Product Catalog:** Browse products with Bengali names, units, current prices, previous prices, and price-change indicators.
- **Category Navigation:** Discover products organized into categories such as rice, lentils, oil, vegetables, fish, meat, eggs, and spices.
- **Product Details:** View detailed information about individual products.
- **Price Change Highlights:** Identify products with rising or falling prices.
- **Animated Price Ticker:** Browse product prices and their changes through a scrolling ticker.
- **User Authentication:** Sign up and sign in using email and password.
- **Social Authentication:** Google and GitHub sign-in options.
- **User Profile:** Access the profile area for account-related information.
- **Responsive Interface:** Browse the application on desktop, tablet, and mobile devices.
- **Bengali User Interface:** Designed for users who want to access market-price information in Bengali.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework, routing, and server rendering |
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and layout |
| Better Auth | Authentication and session management |
| MongoDB | Database for authentication-related data |
| External API | Product, category, and price information |
| Vercel | Application deployment and hosting |
| Git and GitHub | Version control and source-code management |

---

## 🚀 Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/sushamaray/B14-A7-Bazar-Dor.git
```

### 2. Navigate to the Project Directory

```bash
cd B14-A7-Bazar-Dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and configure the environment variables required by the application's authentication and database setup.

Use the variable names already defined in the project configuration. Obtain credentials from the relevant service dashboards, and never commit real secrets to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create a Production Build

To verify the application for production:

```bash
npm run build
```

---

## 📁 Project Structure

```text
B14-A7-Bazar-Dor/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── category/        # Category pages
│   │   ├── product/         # Product detail pages
│   │   ├── profile/         # User profile page
│   │   ├── signin/          # Sign-in page and form
│   │   ├── signup/          # Sign-up page and form
│   │   ├── layout.tsx       # Root application layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable UI components
│   ├── lib/                 # API, authentication, and utilities
│   └── types/               # TypeScript type definitions
├── .env.local               # Local environment variables (not committed)
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

*Note: This structure summarizes the main application areas; the exact files may vary as the project evolves.*

---

## 🔐 Authentication and Security

BazarDor uses Better Auth for user authentication and MongoDB for authentication-related persistence.

- Email and password authentication.
- Google and GitHub authentication options.
- Session-based access to user-related features.
- Environment variables for service configuration.

**Security note:** Never publish database credentials, authentication secrets, OAuth client secrets, or other sensitive environment variables in source control.

---

## 🌐 Live Application

Explore the deployed application:

**[Open BazarDor →](https://bazar-dor-sand.vercel.app)**

The application is deployed using Vercel.

---

## 👩‍💻 Author

**Sushama Ray**

- GitHub: [@sushamaray](https://github.com/sushamaray)
- Project Repository: [B14-A7-Bazar-Dor](https://github.com/sushamaray/B14-A7-Bazar-Dor)

---

## 📄 License

This project was developed as an academic assignment. Please refer to the repository for the applicable license and usage terms.