NTUEEInfoDep Final Project : shopEE

![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 📚 [Reference](#reference)
6. 🖊️ [Reflection](#reflection)

## <a name="introduction">🤖 Introduction</a>

### Our Idea
As we are still unfamiliar with these techniques, we were thinking about making something more common and able to help us practice most of the content we've learned so far.

shopEE is a shopping website, obviously, where we can create items to sell and add items to our cart.
We can also modify the quantities we planned to buy in the cart page.
After checkout, the cart will be cleared and if the item becomes out of stock after purchase, it will be deleted from its category. 
We used Link and dynamic pages to keep the website structure clean.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Tailwind CSS
- Docker
- PostgreSQL

## <a name="features">🔋 Features</a>
👉 Add New Products Easily: Seamlessly add new products to the store and have them instantly displayed on the page for users to browse and shop.

👉 Interactive Shopping Experience: Users can view product stock, adjust quantities before adding items to their cart, and get a clear idea of what's available in real-time.

👉 Smart Cart Management: A clean and intuitive cart system lets users update or remove items easily — and even clear the entire cart without proceeding to checkout.

👉 Visually Appealing Design: Beautiful and responsive UI ensures a smooth and modern shopping experience on any device, from desktop to mobile.
## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**
Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (node version higher than v20._._)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### 1. Cloning the Repository

```bash
git clone https://github.com/NicoleKuo0210/CiciYuyu.git
cd CiciYuyu
```

### 2. Install the project dependencies

```bash
# CiciYuyu
pnpm install
```

### 3. Set Up Environment Variables

```bash
# CiciYuyu
cp .env.development .env.local
```

in .env.local

```env
# POSTGRESQL
POSTGRES_URL=
```

### 4. Run the migrations

```bash

docker compose up -d

pnpm migrate
```

### 5. Start the App

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## <a name="reference">📚 Reference</a>

1. [113-2大一部課](https://stitch-slicer-a44.notion.site/113-2-f5a5d20d15ed4790af872fdbeb782c8d)
2. [tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

## <a name="reflection">🖊️ Reflection</a>

name:郭宥均

studentID:B13901008

reflection:
Even though ChatGPT wrote 90% of our code, I think I have a better understanding of website designing, by debugging and setting up the project from scratch. Actually, since we’ve completed the project hastily, I feel like I have nothing to say as there are still so many techniques I haven’t learned well and made good use of. Hopefully, during summer vacation, I can thoroughly review what we’ve gone through in the last two semesters. I am quite interested in making an appealing UI (even though our UI sucks in this project. ) and I hope that I can help our department with designing websites in the future.

name:劉家妤

studentID:B13901095

reflection:
It has been a cool experience for me to build a website from scratch, although the part that I was responsible for is critically small. (Thanks to my powerful teammate and ChatGPT, of course) But I still earn a great amount of website designing khoeledge from the project, I would hopefully spend most of my summer vacation time to review what I have learned this year.(And by writing this reflection, I am aware that not only the website designing should I review, but also my poor vocabulary.) Finishing this project certainly endows me with an enormous sense of achievement, and I hope that it will keep supporting my passion in website designing in the future.
