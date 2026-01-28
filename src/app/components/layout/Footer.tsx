import { Newspaper } from "lucide-react";
import Link from 'next/link'

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  News Shelter
                </span>
              </div>
              <p className="text-sm text-gray-400 max-w-md">
                Your trusted source for infrastructure, economy, and government
                news. Delivering professional, reliable, and timely information.
              </p>
            </div>

            {/* Quick link */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Link</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Opinion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categoories */}
            <div>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="hover:text-blue-400 transition-colors cursor-pointer">
                    Infrastructure
                  </span>
                </li>
                <li>
                  <span className="hover:text-blue-400 transition-colors cursor-pointer">
                    Economy
                  </span>
                </li>
                <li>
                  <span className="hover:text-blue-400 transition-colors cursor-pointer">
                    Technology
                  </span>
                </li>
                <li>
                  <span className="hover:text-blue-400 transition-colors cursor-pointer">
                    Environment
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* bottom bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {currentYear} News Shelter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}