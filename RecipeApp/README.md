# 🍳 CulinaryCraft - Modern Recipe & Shopping List App

A fully modernized, high-performance recipe management and shopping list application built using the latest stable **Angular 22** framework, **TypeScript 6.0.3**, and **NgRx v21** store architecture. 

Featuring a stunning, modern dark-themed glassmorphic UI, zoneless change detection, and reactive state management.

---

## 🚀 Key Features

- **Automated REST Sync**: Fully automated CRUD save and fetch operations linked to a local `json-server` database.
- **Dietary Profile settings**: Asterisk-protected password updates linked to Firebase Auth alongside interactive dietary preference check chips (*Vegetarian, Vegan, Gluten-Free, Keto, etc.*).
- **Zoneless Performance**: Zero bundle/runtime overhead from `zone.js`, leveraging signal-based change detection.
- **Glassmorphic Aesthetic**: Curated slate and emerald gradients, smooth micro-animations, and balanced Fibonacci-based responsive grids.
- **Card Deferred Loading**: Viewport-triggered `@defer` blocks displaying responsive skeleton loaders during data fetch.

---

## 🛠️ Technology Stack

- **Framework**: Angular 22.0.5 (Standalone Components, Signals, Router)
- **State Management**: NgRx Store 21.1.1 & NgRx Effects (Modern Action Creators)
- **Language**: TypeScript 6.0.3
- **Styling**: Vanilla CSS with HSL variables, dark glassmorphic tokens, and CSS Grid layouts
- **Database**: Mock REST backend using `json-server`

---

## 📋 Prerequisites

To run the application, you need to have a compatible Node.js version installed:
- **Node.js**: `v22.22.3` or `v24.15.0+` (Required by Angular CLI 22)

---

## 🏃 Getting Started

### 1. Install Dependencies

Install the node modules (the project uses `.npmrc` to bypass NgRx peer dependency warnings automatically):
```bash
npm install
```

### 2. Start the Mock Database Server

The app relies on `json-server` for data persistence. Start the local database server on port `3000`:
```bash
npm run server
```
This runs the database at `http://localhost:3000/`.

### 3. Start the Angular Development Server

In a new terminal window, start the local development server:
```bash
npm run start
```
Navigate to `http://localhost:4200/` to explore the app.

---

## 🏗️ Architecture Highlights

### ⚡ Zoneless change detection
We configured `provideZonelessChangeDetection()` inside `src/main.ts` and removed `zone.js` imports from `polyfills.ts` entirely. Angular now listens directly to signal emissions for ultra-fast, granular UI updates.

### 🔄 Reactive Store to Signals
Components subscribe cleanly to NgRx store slices using the `toSignal()` utility, removing the need for manual RXJS subscription lifecycle management:
```typescript
private readonly authUser = toSignal(
  this.store.select('auth').pipe(map((s) => s.user)),
  { initialValue: null }
);
readonly isAuthenticated = computed(() => !!this.authUser());
```

### 🗂️ Skeleton Placeholders (`@defer`)
Recipe cards are defer-loaded when they enter the viewport, instantly loading layout skeleton cards:
```html
@defer (on viewport) {
  <!-- Real cards here -->
} @loading (minimum 200ms) {
  <!-- Skeleton loading grids here -->
}
```
