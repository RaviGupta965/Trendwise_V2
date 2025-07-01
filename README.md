TrendWise is a full-stack blog platform that automatically fetches trending topics and generates SEO-optimized articles using Google Gemini Flash API. Authenticated users can comment on posts, and everything is dynamically rendered using Next.js App Router.

---

## 🧠 Features

- ✅ **Google Login** (NextAuth.js)
- 🧠 **Trending Topic Detection**
- ✨ **AI-Generated Articles** (Gemini Flash)
- 💬 **Comment System** (MongoDB)
- 🔍 **SEO Meta Tags + OG Tags**
- 🗺️ **Dynamic Sitemap & Robots.txt**
- ⚡ **Fast Rendering** with ISR & SSR (Next.js 14+)
- 🎨 **TailwindCSS Styling**

---

## 📸 Demo

🔗 Live Site: [https://trendwise.vercel.app](https://trendwise.vercel.app)

---

## 🧰 Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| Frontend    | Next.js 14 (App Router)      |
| Styling     | TailwindCSS                  |
| Auth        | NextAuth.js (Google OAuth)   |
| AI Content  | Google Gemini Flash API      |
| Crawler     | Cheerio (for scraping trends)|
| Backend     | Next.js API Routes           |
| Database    | MongoDB + Mongoose ORM       |
| Hosting     | Vercel (frontend & API)      |

---

## ⚙️ Setup Locally

```bash
git clone https://github.com/yourusername/trendwise.git
cd trendwise
npm install