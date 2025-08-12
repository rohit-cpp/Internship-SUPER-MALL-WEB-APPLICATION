# 🏬 Super Mall Admin Dashboard

A premium, full-featured **marketplace management suite** built with **React**, **Zustand**, and **shadcn/ui**.  
Super Mall enables administrators to manage **Users, Shops, Products, Offers, Categories, and Floors** efficiently — all in one sleek, responsive dashboard.

---

## ✨ Features

- 🎨 **Dark-mode premium UI** with gradient accents & blur effects
- 📱 **Responsive design** (desktop & mobile navigation)
- 🛠 **CRUD interfaces** for all entities
- 🔍 Search, filter, and comparison tools for **Products** & **Shops**
- ⚡ Built with **React + Zustand** for state management
- 🎯 Fast & minimal design powered by **shadcn/ui**

---


---

## 🎨 Styling & Theme

- **Colors:** Slate dark (`bg-slate-950`), gradients from cyan → violet
- **Typography:** Bold gradient headings, muted body text
- **Effects:** Backdrop blur, drop shadows, hover animations

---

## 🧭 Navigation

- **Navbar:** Desktop & mobile menus, profile dropdown, theme toggle
- **Footer:** Gradient glow background with branding

---

## 📑 Pages Overview

### **Home**
- Hero section with illustration  
- Core modules grid  
- Metrics, Testimonials, Pricing, FAQ  
- Call-to-action & footer

### **Shop List**
- Grid of shop cards with filters  
- Hover effects, gradient titles  
- Navigation to shop details

### **Shop Detail**
- Glassy card with shop info & icons  
- Products & Offers in tabbed view

### **All Products**
- Search, shop & category filters, price range filter  
- Product grid with detail dialogs

### **Compare Products**
- Category & search filters  
- Selectable product cards  
- Dynamic comparison table

---

## ⚙️ Usage Guide

1. **Authentication**
   - Login via `useUserStore`

2. **Data Fetching**
   - Each page calls its store’s `get*` methods inside `useEffect`

3. **State Management**
   - Zustand stores persist data across pages

4. **UI Interactions**
   - Dialogs for product/shop details
   - Optional tabs in ShopDetail

---

📸 Screenshots
<img width="1874" height="886" alt="Screenshot 2025-08-12 140153" src="https://github.com/user-attachments/assets/344885fa-a324-4949-b97d-94b2d52c7317" />
<img width="1872" height="894" alt="Screenshot 2025-08-12 140115" src="https://github.com/user-attachments/assets/08ed7baf-20d7-427e-9e0e-5dcb84dc382b" />
<img width="1884" height="894" alt="Screenshot 2025-08-12 140056" src="https://github.com/user-attachments/assets/22eb43a5-0f2a-4bfd-9eee-ef192c977cb7" />
<img width="1870" height="866" alt="Screenshot 2025-08-12 140242" src="https://github.com/user-attachments/assets/58252d82-7bc7-40fa-9057-c7d75d418796" />
<img width="1867" height="890" alt="Screenshot 2025-08-12 140206" src="https://github.com/user-attachments/assets/f972515b-beed-46a8-b307-c5d9767b376b" />


---

🛠 Tech Stack
Frontend: React, TypeScript, Zustand, shadcn/ui
Styling: Tailwind CSS, Gradient & Blur Effects
State: Zustand persistent stores

---

🤝 Contributing
Contributions are welcome! Please fork this repo and submit a pull request with your changes.

---

📜 License
This project is licensed under the MIT License.
See the LICENSE file for details.

---

## 🚀 Example Credentials

User Credentials 
{
  "email": "alice3@example.com",
  "password": "SecureP@ss123"
}

Admin Credentials
{
  "email":"rrgawanderohit@gmail.com",
  "password":"123456"
}

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/super-mall-dashboard.git

# Navigate into the folder
cd super-mall-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
