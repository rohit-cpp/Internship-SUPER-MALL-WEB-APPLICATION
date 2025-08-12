// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useShopStore } from "../store/useShopStore";
import { useProductStore } from "../store/useProductStore";

export default function Home() {
  const { allUsers } = useUserStore();
  const { shops } = useShopStore();
  const { products } = useProductStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero with Illustration */}
      <header className="relative overflow-hidden border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 opacity-20 blur-3xl rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent drop-shadow">
              Build & Scale Your Marketplace with Ease
            </h1>
            <p className="mt-4 mb-6 text-lg text-slate-400">
              A fully managed backend & admin suite for users, shops, products,
              offers, floors, and categories—so you can focus on growth.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/20 bg-gradient-to-r from-cyan-500 to-violet-500 hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
          <div className="flex-1">
            <img
              src="/public/photo.jpg"
              alt="Dashboard Illustration"
              className="w-full max-w-lg mx-auto drop-shadow-xl rounded-lg"
            />
          </div>
        </div>
      </header>

      {/* Core Modules */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
          Core Modules
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "👤",
              title: "User Management",
              desc: "Signup, login, profile, verification, password flows.",
            },
            {
              icon: "🏬",
              title: "Shop Module",
              desc: "Create, update, delete shops; assign owners & categories.",
            },
            {
              icon: "📦",
              title: "Product Catalog",
              desc: "CRUD products, compare, filter by shop & category.",
            },
            {
              icon: "💸",
              title: "Offers & Discounts",
              desc: "Run time-bound promotions with percentage discounts.",
            },
            {
              icon: "🏢",
              title: "Floor Plans",
              desc: "Manage floors for multi-level marketplaces.",
            },
            {
              icon: "🗂️",
              title: "Category Tree",
              desc: "Organize items into categories and subcategories.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {f.title}
              </h3>
              <p className="text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-extrabold">
              {allUsers?.length || 0}+
            </div>
            <div className="mt-2">Users</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold">{shops?.length || 0}+</div>
            <div className="mt-2">Shops</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold">
              {products?.length || 0}+
            </div>
            <div className="mt-2">Products</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            {
              quote: "This platform saved us weeks of development time.",
              author: "Alice R., CTO at TechFlow",
            },
            {
              quote: "Our product management is seamless and efficient!",
              author: "Bob M., Founder of ShopEase",
            },
            {
              quote: "Incredible support and privacy-focused design.",
              author: "Carol L., CEO of PrivyMaps",
            },
          ].map((t, i) => (
            <blockquote
              key={i}
              className="relative bg-slate-900 p-6 rounded-xl shadow-lg before:absolute before:top-4 before:left-4 before:text-7xl before:text-slate-700 before:content-['“']"
            >
              <p className="relative text-slate-200 mb-4">{t.quote}</p>
              <footer className="text-right text-sm text-slate-400">
                — {t.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-900/60 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Pricing Plans
        </h2>
        <div className="container mx-auto px-6 grid gap-8 grid-cols-1 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "Free",
              features: ["1 Shop", "Basic Support"],
            },
            {
              name: "Professional",
              price: "₹49/mo",
              features: ["10 Shops", "Email Support", "Analytics"],
            },
            {
              name: "Enterprise",
              price: "Contact Us",
              features: [
                "Unlimited Shops",
                "Premium Support",
                "Dedicated Manager",
              ],
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-8 text-center shadow-lg hover:shadow-cyan-500/20 transition"
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-6 text-slate-400">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition"
              >
                {plan.price === "Free" ? "Get Started" : "Choose Plan"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto text-slate-200">
          {[
            {
              q: "Can I upgrade my plan later?",
              a: "Yes — you can upgrade or downgrade at any time in your account settings.",
            },
            {
              q: "Is there a free trial?",
              a: "We offer a 14-day free trial on all paid plans. No credit card required.",
            },
            {
              q: "How secure is my data?",
              a: "All data is encrypted in transit and at rest. We follow industry best practices.",
            },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-1 text-slate-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-20 text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[60%] h-40 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 opacity-10 blur-3xl rounded-full"></div>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Ready to launch your marketplace?
        </h2>
        <p className="mb-8 text-slate-400">
          Get started today and see how quickly you can onboard your first shop
          and products.
        </p>
        <Link
          to="/signup"
          className="px-10 py-4 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/20 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition"
        >
          Start Free Trial
        </Link>
      </section>
    </div>
  );
}
