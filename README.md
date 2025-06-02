# 🎂 Flour & Flavour

**Flour & Flavour** is a modern, responsive cake ordering web app where users can customize cakes, add personalized messages, and manage their orders with a clean and intuitive interface. Built with React and powered by Appwrite, the platform is designed for performance, personalization, and ease of use.

---

## ✨ Features

- **🧁 Custom Cake Orders**  
  Customize your cakes with flavors, sizes, themes, and toppings.

- **💌 Personalized Messages**  
  Add custom text on cakes to make every celebration special.

- **🛒 Cart Functionality**  
  Add multiple cakes to your cart, update or remove them before checkout.

- **📱 Responsive Design**  
  Optimized for mobile, tablet, and desktop for a smooth user experience.

- **🎨 Clean & Interactive UI**  
  Designed using Tailwind CSS for a polished, modern look.

- **💾 Redux + Local Storage**  
  Cart and user selections are stored in Redux and persist across sessions using local storage.

---

## 🚧 Currently Working On

- **🔍 Search & Filter Functionality**  
  Quickly find the cake you're looking for using keywords.

- **🌈 Enhanced Visual Design**  
  Refining layout and UI animations for a more premium look and feel.

- **📝 Custom Notes Per Cake**  
  Allow users to add messages or special instructions for each cart item.

- **🔐 Authentication & User-Specific Carts**  
  Using Appwrite to manage secure user login and personalized data storage.

---

## 🛠️ Tech Stack

### 🔧 Frontend

- **React** – Component-based UI development  
- **Vite** – Fast dev server and optimized builds  
- **Tailwind CSS** – Utility-first modern styling  
- **Redux Toolkit** – Global state management  
- **Redux Persist** – Store cart and UI state in localStorage  
- **React Router** – Routing and navigation

### 🖥️ Backend

- **Appwrite** – Backend-as-a-Service  
  - **Authentication** – Secure login & registration  
  - **Database** – Stores products, user carts, and orders  
  - **Functions** – Custom server logic for advanced features

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/sumitKumar-webdev/Flour-and-Flavour.git

# Navigate to project folder
cd Flour-and-Flavour

# Install dependencies
npm install

# Start the development server
npm run dev
```
## 📂 Folder Structure

Flour-and-Flavour/
|-- public/                 # Static assets and favicon
|-- src/
|   |-- assets/             # Images, icons, and static resources
|   |-- components/         # Reusable UI components (Navbar, CakeCard, etc.)
|   |-- pages/              # Route-based pages (Home, Cart, CustomCake, etc.)
|   |-- redux/              # Redux setup and slices
|   |   |-- cartSlice.js
|   |   |-- userSlice.js
|   |   `-- store.js
|   |-- hooks/              # Custom React hooks
|   |-- appwrite/           # Appwrite SDK & service layer
|   |   |-- appwriteConfig.js
|   |   `-- services.js
|   |-- App.jsx             # Root React component
|   |-- main.jsx            # Vite entry point
|   `-- index.css           # Global CSS / Tailwind base
|-- tailwind.config.js      # Tailwind configuration
|-- postcss.config.js       # PostCSS setup
|-- index.html              # HTML template
`-- package.json            # Project metadata and dependencies
