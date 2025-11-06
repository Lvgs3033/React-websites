
import { Link } from "react-router-dom";
import { Twitter, Facebook, Linkedin, Instagram } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-border/40 py-10 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs">
              StockTracker provides real-time financial data and tools to help investors make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary">Navigation</h3>
              <ul className="space-y-2">
                <FooterLink to="/">Dashboard</FooterLink>
                <FooterLink to="/news">News</FooterLink>
                <FooterLink to="/converter">Converter</FooterLink>
                <FooterLink to="/about">About</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary">Legal</h3>
              <ul className="space-y-2">
                <FooterLink to="/terms">Terms</FooterLink>
                <FooterLink to="/privacy">Privacy</FooterLink>
                <FooterLink to="/cookies">Cookies</FooterLink>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Connect With Us</h3>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="https://facebook.com" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="https://instagram.com" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-10 pt-6 text-center text-muted-foreground text-sm">
          © {currentYear} Stock Market Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        to={to} 
        className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      {...props}
    >
      {children}
    </a>
  );
}
