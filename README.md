# 🛍️ Bubble N Fizz - Ecommerce website with Recommender System

Bubble N Fizz is a Laravel and Tailwind CSS-based e-commerce platform designed to personalize the shopping experience for users based on their unique skin type. The site offers a complete online shopping experience—from personalized product recommendations to a fully functional admin dashboard.

---

## 🚀 Features

### 👤 User Experience

* **Account Registration & Skin Survey**: Upon registration, users take a quick skin type survey. The system displays percentage results for each skin type (e.g., Dry: 13%, Oily: 10%).
* **Personalized Recommendations**: After the survey, users are directed to the homepage where they see product recommendations tailored to their skin type.
* **Shopping & Orders**: Users can browse, add to cart, and purchase products. The profile page displays current and past order statuses.

### 🛠️ Admin Dashboard

A dedicated admin panel provides complete control over the platform with the following features:

* **Product Management**: Add, edit, or remove products.
* **Sales Management**: View and analyze sales trends and history.
* **Virtual POS**: Integrated virtual point-of-sale for real-time transactions.
* **Delivery Management**: Manage shipping and order deliveries.
* **Account Management**: Manage user accounts and admin roles.
* **Analytics Dashboard**: View summaries of total sales, customer views, and product performance charts.

---

## 🧰 Tech Stack

* **Backend**: Laravel
* **Frontend**: Tailwind CSS
* **Database**: MySQL (or any Laravel-compatible DB)
* **Development Tools**: Laravel Mix, NPM, Composer

---

## ⚙️ Installation & Setup

### Prerequisites

* PHP ≥ 8.1
* Composer
* Node.js and NPM
* MySQL or compatible database

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/bubblenfizz.git
   cd bubblenfizz
   ```

2. **Install PHP Dependencies**

   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies**

   ```bash
   npm install
   ```

4. **Environment Setup**

   * Copy `.env.example` to `.env`
   * Configure your database and mail settings in `.env`

5. **Generate Key & Migrate**

   ```bash
   php artisan key:generate
   php artisan migrate --seed
   ```

6. **Run Development Servers**

   ```bash
   npm run dev
   php artisan serve
   ```

---

## 🧪 Survey Flow Example

1. Register or log in
2. Fill out the skin type survey
3. See results like:

   * Dry: 13%
   * Oily: 10%
   * Combination: 77%
4. Get personalized product recommendations on the homepage

---

## 📊 Admin Dashboard Preview

Admins can access dashboards with:

* Summary cards (Total Sales, Views, Orders)
* Charts of top products
* Quick access to manage products, users, and deliveries

---

## 📦 Future Improvements

* AI-driven product recommendation tuning
* Customer reviews & ratings
* Loyalty points and coupons

---

## 🧑‍💻 Developer

Created by **Faye**
This was a capstone project in college. I was the project manager/team lead and was also part of designing the UI as well as coding the design of the website.
