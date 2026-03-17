import React from 'react';
import { Link } from 'react-router-dom';

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Explore Events', to: '/events' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Create Event', to: '/events/create' },
    { label: 'My Events', to: '/my-events' },
    { label: 'Saved Events', to: '/saved-events' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' },
    { icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter / X' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800/60 mt-24 bg-white dark:bg-[#0a0a0a]">
      {/* Subtle gradient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white text-lg italic shadow-lg shadow-indigo-500/20">
                E
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">EventSphere</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Your gateway to workshops, hackathons, and conferences. Discover, create, and connect.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    w-9 h-9 rounded-lg flex items-center justify-center
                    bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                    text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400
                    hover:border-indigo-500/40 transition-all duration-200 hover:scale-110
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA / newsletter blurb */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">Stay Updated</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Create an account to get personalized event recommendations and never miss an event you'd love.
            </p>
            <Link
              to="/signup"
              className="
                inline-flex items-center gap-2 text-sm font-bold
                px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-indigo-600 to-purple-600
                hover:from-indigo-500 hover:to-purple-500
                text-white shadow-lg shadow-indigo-500/20
                transition-all duration-200 hover:scale-105 active:scale-95
              "
            >
              Get Started Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} EventSphere. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
