/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcPaypal,
} from "react-icons/fa";
import { SiPayoneer } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const contactInfo = [
  { icon: Mail, text: "support@shibuhub.com" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: MapPin, text: "123 Tech Street, Digital City, DC 12345" },
];

const navigationLinks = [
  { href: "/products", text: "Shop" },
  { href: "/about", text: "About Us" },
  { href: "/contact", text: "Customer Service" },
  { href: "/about#privacy", text: "Privacy Policy" },
  { href: "/about#terms", text: "Terms of Service" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
];

const paymentMethods = {
  cards: [
    { icon: FaCcVisa, alt: "Visa", color: "#1A1F71" },
    { icon: FaCcMastercard, alt: "Mastercard", color: "#EB001B" },
    { icon: FaCcAmex, alt: "American Express", color: "#006FCF" },
    { icon: FaCcDiscover, alt: "Discover", color: "#FF6000" },
    { icon: FaCcPaypal, alt: "PayPal", color: "#003087" },
    { icon: SiPayoneer, alt: "Payoneer", color: "#FF4800" },
  ],
  mobileBanking: [
    { src: "/bkash-mobile-banking-logo-pink.jpg", alt: "bKash" },
    { src: "/nagad-mobile-banking-logo-orange.jpg", alt: "Nagad" },
    { src: "/rocket-mobile-banking-logo-purple.jpg", alt: "Rocket" },
    { src: "/upay-mobile-banking-logo-green.jpg", alt: "Upay" },
    { src: "/taptap-mobile-banking-logo-blue.jpg", alt: "TapTap" },
  ],
  banks: [
    { src: "/dbbl-dutch-bangla-bank-logo.jpg", alt: "DBBL" },
    { src: "/sonali-bank-bangladesh-logo.jpg", alt: "Sonali Bank" },
    { src: "/rupali-bank-bangladesh-logo.jpg", alt: "Rupali Bank" },
    { src: "/brac-bank-bangladesh-logo.jpg", alt: "BRAC Bank" },
    { src: "/islami-bank-bangladesh-logo.jpg", alt: "Islami Bank" },
  ],
};

const PaymentMethodGroup = ({
  label,
  methods,
}: {
  label: string;
  methods: Array<{ src?: string; icon?: any; alt: string; color?: string }>;
}) => (
  <div className="flex items-center gap-2 flex-wrap">
    <span className="text-xs text-muted-foreground">{label}:</span>
    {methods.map((method) =>
      method.icon ? (
        <method.icon
          key={method.alt}
          className="h-7 w-10 bg-white rounded p-1"
          style={{ color: method.color }}
          title={method.alt}
        />
      ) : (
        <Image
          key={method.alt}
          src={method.src || "/placeholder.svg"}
          alt={method.alt}
          width={500}
          height={500}
          className="h-7 w-10 object-contain bg-white rounded"
        />
      ),
    )}
  </div>
);

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">ShibuHub</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for premium digital electronics and exceptional service.
            </p>
            <div className="space-y-2">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-2">
                  <contact.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Stay Connected</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get updates on new products and offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background text-foreground border-border"
              />
              <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">We Accept:</h4>
              <div className="space-y-2">
                <PaymentMethodGroup label="Cards" methods={paymentMethods.cards} />
                <PaymentMethodGroup label="Mobile" methods={paymentMethods.mobileBanking} />
                <PaymentMethodGroup label="Banks" methods={paymentMethods.banks} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ShibuHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}