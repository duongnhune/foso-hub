
# Foso Hub

A modern frontend project built with **React**, **TypeScript**, **Vite**, and **Yarn**.

---

## 📁 Project Structure

```
foso-hub/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components (routes)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:duongnhune/foso-hub.git

```

### 2. Install dependencies

Ensure you have:

- **Node.js ≥ 20.x**
- **Yarn** (v1.x)

If you don’t have Yarn installed:

```bash
npm install -g yarn
```

Then install project dependencies:

```bash
yarn install
```

### 3. Start the development server

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

---

## 📦 Build for Production

```bash
yarn build
```

Build output will be in the `dist/` folder.

To preview the production build locally:

```bash
yarn preview
```

---

## 🧹 Code Quality

Run ESLint to check for issues:

```bash
yarn lint
```

---

## 🧑‍💻 Developer Notes

If you encounter this error:

```bash
The engine "node" is incompatible with this module. Expected version ">=20.0.0". Got "18.19.1"
```

➡️ Please upgrade your Node.js version:

### Using NVM (Node Version Manager)

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

Then reinstall dependencies:

```bash
yarn install
```

---

## 📚 Tech Stack

- React.js
- TypeScript
- Vite
- Yarn
- ESLint

---

## 📄 License

This project is licensed under the **MIT License**.