import React from "react";
import { AcademicCapIcon, EnvelopeIcon, GlobeAltIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <AcademicCapIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient">Smart Study</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Learning Platform</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
              Empowering learners worldwide with intelligent flashcard generation, adaptive study sessions, 
              and comprehensive progress tracking. Transform your learning experience with cutting-edge AI technology.
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Secure & Privacy-Focused</span>
            </div>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Product Features
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>AI Flashcard Generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>Smart Study Sessions</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Progress Analytics</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Import/Export Tools</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                <span>Spaced Repetition</span>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                <span>support@smartstudy.ai</span>
              </li>
              <li className="flex items-center space-x-2">
                <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                <span>Documentation</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-4 w-4 text-gray-400" />
                <span>Privacy Policy</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/Vivekch05/flashcard-generator"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/smartstudy"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/smartstudy"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 Smart Study Technologies. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Built with modern web technologies for optimal learning experiences.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-500">
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 