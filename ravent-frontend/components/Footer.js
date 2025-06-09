// components/Footer.js
"use client";

import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer({ className = "" }) {
  const year = new Date().getFullYear();

  const socials = [
    {
      href: "https://github.com/your-repo",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: "https://twitter.com/your-profile",
      icon: FaTwitter,
      label: "Twitter",
    },
    {
      href: "https://linkedin.com/in/your-profile",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className={`
        bg-white/80 backdrop-blur-sm shadow-inner
        py-6
        animate-fadeIn
        ${className}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-[var(--color-text)]">
          &copy; {year} RavenT. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="
                text-[var(--color-text)]
                hover:text-[var(--color-primary)]
                hover:scale-110
                transition-transform transition-colors
              "
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
