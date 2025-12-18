import React from "react";

const ServiceText = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Services Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service Card Component - Repeated for each service */}
          {[
            { title: "🌐 Website Development", desc: "High-performance, responsive websites.", list: ["Custom Web Dev", "E-commerce", "Web Apps", "API Integration"] },
            { title: "🎨 UI/UX & Branding", desc: "Visually appealing digital experiences.", list: ["UI/UX Design", "Prototyping", "Brand Identity", "Layouts"] },
            { title: "📱 Mobile App Dev", desc: "Scalable apps for Android and iOS.", list: ["Android & iOS", "Cross-platform", "App Maintenance"] },
            { title: "📊 Digital Marketing", desc: "Data-driven marketing strategies.", list: ["SEO Optimization", "Social Media", "Google Ads", "Content"] }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.desc}</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                {service.list.map((item, i) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
          ))}

        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-16 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-2">Starter Plan</h4>
            <p className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold mb-2">₹14,999+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">For startups</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-indigo-500 shadow-lg scale-105">
            <h4 className="text-lg font-semibold mb-2">Business Plan</h4>
            <p className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold mb-2">₹29,999+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">For growing companies</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-2">Enterprise</h4>
            <p className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold mb-2">Custom</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tailored solutions</p>
          </div>

        </div>

        {/* Why Choose Us */}
        <div className="max-w-5xl mx-auto mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Cortex Web Solutions?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>✔ Experienced IT professionals</li>
              <li>✔ Custom & scalable solutions</li>
            </ul>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>✔ On-time project delivery</li>
              <li>✔ Dedicated support & maintenance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceText;