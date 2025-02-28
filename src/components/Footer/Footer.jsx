import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-900 border-t border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap -mx-6 gap-y-8">
          <div className="w-full px-6 md:w-1/2 lg:w-4/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-400">
                &copy; 2025. All Rights Reserved by Mukul Tripathi.
              </p>
            </div>
          </div>

          <div className="w-full px-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase text-gray-500">Company</h3>
            <ul>
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                <li key={item} className="mb-3">
                  <Link className="text-base font-medium text-gray-300 hover:text-blue-400 transition" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full px-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-xs font-semibold uppercase text-gray-500">Support</h3>
            <ul>
              {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                <li key={item} className="mb-3">
                  <Link className="text-base font-medium text-gray-300 hover:text-blue-400 transition" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full px-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-5 text-xs font-semibold uppercase text-gray-500">Legals</h3>
            <ul>
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                <li key={item} className="mb-3">
                  <Link className="text-base font-medium text-gray-300 hover:text-blue-400 transition" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
