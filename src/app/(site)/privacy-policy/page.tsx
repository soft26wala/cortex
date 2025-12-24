'use client';
import React from 'react';
import { Lock, Eye, Database, Globe, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "December 24, 2025";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-40 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <Lock className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Your privacy is our top priority. Last Updated: {lastUpdated}</p>
        </div>

        {/* Introduction Card */}
        <div className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Section 1: Information We Collect */}
            <section>
              <div className="flex items-center mb-5">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                  <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">1. Information We Collect</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We collect information to provide better services to our users. This includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                  Name and Contact Details
                </li>
                <li className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                  Billing/Transaction Information
                </li>
                <li className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                  IP Address and Browser Type
                </li>
                <li className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                  Usage Data via Cookies
                </li>
              </ul>
            </section>

            {/* Section 2: How We Use Data */}
            <section>
              <div className="flex items-center mb-5">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">2. How We Use Information</h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>We use the collected data for various purposes:</p>
                <div className="border-l-4 border-green-500 pl-4 py-2 space-y-2">
                  <p>• To provide and maintain our Service.</p>
                  <p>• To notify you about changes to our platform.</p>
                  <p>• To provide customer support and handle transactions.</p>
                  <p>• To monitor the usage of the Service for security.</p>
                </div>
              </div>
            </section>

            {/* Section 3: Data Security */}
            <section className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg shadow-blue-500/20">
              <div className="flex items-center mb-4">
                <UserCheck className="h-7 w-7 mr-3 text-blue-200" />
                <h2 className="text-2xl font-bold">3. Data Security</h2>
              </div>
              <p className="text-blue-100 leading-relaxed">
                The security of your data is important to us. We implement industry-standard security measures 
                including SSL encryption and secure servers. However, remember that no method of transmission 
                over the Internet is 100% secure.
              </p>
            </section>

            {/* Section 4: Cookies & Third Party */}
            <section>
              <div className="flex items-center mb-5">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-3">
                  <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">4. Third-Party Links</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our platform may contain links to other websites. We are not responsible for the privacy 
                practices or content of third-party sites. We encourage you to read their privacy policies 
                separately.
              </p>
            </section>

            {/* Section 5: Contact Info */}
            <section className="pt-10 border-t border-gray-100 dark:border-gray-800 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Questions about Privacy?</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="mailto:privacy@cortestack.com" 
                  className="flex items-center px-6 py-3 bg-gray-900 dark:bg-white dark:text-black text-white rounded-full font-medium hover:opacity-90 transition-all"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email Support
                </a>
              </div>
            </section>

          </div>
        </div>

        {/* Legal Disclaimer Footer */}
        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-600 max-w-2xl mx-auto uppercase tracking-widest">
          CorteStack — Legal Compliance Section — 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;