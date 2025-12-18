import React from "react";


const ServiceText = () => {
  return (
    <>

      <section className="bg-gray-800 px-6 py-16">

        <div className="flex items-center flex-wrap  w-full border border-solid border-border dark:border-dark_border md:px-14 px-6 md:mt-14 mt-6 rounded-22">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">🌐 Website & Web Application Development</h3>
            <p className="text-gray-300 text-sm mb-4">
              We build high-performance, responsive, and secure websites and web applications tailored to your business needs.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Custom Website Development </li>
              <li>• E-commerce Solutions</li>
              <li>• Web Applications</li>
              <li>• API Integration</li>
            </ul>
          </div>



          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">🎨 UI/UX Design & Branding</h3>
            <p className="text-gray-300 text-sm mb-4">
              Create visually appealing and user-friendly digital experiences that connect with your audience.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• UI/UX Design</li>
              <li>• Product Prototypings</li>
              <li>• Brand Identity Design</li>
              <li>• Conversion-Focused Layouts</li>
            </ul>
          </div>


          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">📱 Mobile App Development</h3>
            <p className="text-gray-300 text-sm mb-4">
              Scalable and secure mobile applications for Android and iOS platforms.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Android & iOS Apps</li>
              <li>• Cross-platform Apps</li>
              <li>• App Maintenance</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">📊 Digital Marketing & SEO</h3>
            <p className="text-gray-300 text-sm mb-4">
              Data-driven marketing strategies that improve visibility and lead generation.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• SEO Optimization</li>
              <li>• Social Media Marketing</li>
              <li>• Google Ads</li>
              <li>• Content Marketing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-800 px-6 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-900 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-2">Starter Plan</h4>
            <p className="text-indigo-400 text-2xl font-bold mb-2">₹14,999+</p>
            <p className="text-sm text-gray-400">For startups & small businesses</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border-2 border-indigo-500">
            <h4 className="text-lg font-semibold mb-2">Business Plan</h4>
            <p className="text-indigo-400 text-2xl font-bold mb-2">₹29,999+</p>
            <p className="text-sm text-gray-400">For growing companies</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-2">Enterprise</h4>
            <p className="text-indigo-400 text-2xl font-bold mb-2">Custom</p>
            <p className="text-sm text-gray-400">Tailored enterprise solutions</p>
          </div>
        </div>
         <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Why Choose Cortex Web Solutions?</h3>
            <p className="text-gray-300 text-sm mb-4">
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✔ Experienced IT professionals</li>
              <li>✔ Custom & scalable solutions</li>
              <li>✔ On-time project delivery</li>
              <li>✔ Dedicated support & maintenance</li>
            </ul>
          </div>
      </section>
    </>
  );
};

export default ServiceText;
