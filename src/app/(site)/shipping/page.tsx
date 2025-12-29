import React from 'react';
import { Truck, Mail, Phone, Clock, Globe, ShieldCheck } from 'lucide-react';

const Shipping = () => {
  return (
    // Background light mode mein gray-50 aur dark mode mein slate-950 rahega
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-6 lg:px-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto my-12 lg:my-20">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Shipping & Delivery Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Last updated on <span className="text-blue-600 dark:text-blue-400 font-medium">Dec 29, 2025</span>
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Policy Card */}
        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
          
          {/* Shipping Methods */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Globe className="text-blue-600 dark:text-blue-500 shrink-0" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">International Buyers</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Orders are shipped and delivered through registered international courier companies and/or International speed post only.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Truck className="text-blue-600 dark:text-blue-500 shrink-0" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Domestic Buyers</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Orders are shipped through registered domestic courier companies and/or speed post only.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Timeline & Liability */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600 dark:text-blue-500" size={24} />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Shipping Timeline</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Orders are shipped within <span className="text-blue-600 dark:text-white font-semibold">0-7 days</span> or as per the delivery date agreed at the time of order confirmation.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 border-l-4 border-amber-500 rounded-r-lg italic text-slate-700 dark:text-slate-300">
              <strong className="text-amber-700 dark:text-amber-500">Note:</strong> GURVINDER SINGH is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over within 0-7 days.
            </div>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Confirmation */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-600 dark:text-blue-500" size={24} />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Delivery Confirmation</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Delivery of all orders will be made to the address provided by the buyer. Delivery of our services will be confirmed on your registered mail ID.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Support & Helpdesk</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <a href="tel:8094997023" className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors p-4 rounded-xl w-full">
                <Phone className="text-green-600 dark:text-green-500" size={20} />
                <span className="text-slate-900 dark:text-white">+91 8094997023</span>
              </a>
              <a href="mailto:cortexwebsolution@gmail.com" className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors p-4 rounded-xl w-full">
                <Mail className="text-blue-600 dark:text-blue-500" size={20} />
                <span className="truncate text-slate-900 dark:text-white">cortexwebsolution@gmail.com</span>
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Shipping;