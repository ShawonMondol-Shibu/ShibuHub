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
  { icon: Mail, text: "support@digitaldevices.com" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: MapPin, text: "123 Tech Street, Digital City, DC 12345" },
];

const navigationLinks = [
  { href: "#", text: "Shop" },
  { href: "#", text: "About Us" },
  { href: "#", text: "Customer Service" },
  { href: "#", text: "Privacy Policy" },
  { href: "#", text: "Terms of Service" },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
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
    <span className="text-sm text-primary-foreground/80">{label}:</span>
    {methods.map((method) =>
      method.icon ? (
        <method.icon
          key={method.alt}
          className="h-8 w-12 bg-white rounded p-1"
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
          className="h-8 w-12 object-contain bg-white rounded"
        />
      ),
    )}
  </div>
);

export function Footer() {
  return (
    <footer className=" bg-indigo-950 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-foreground">
              Digital Device Services
            </h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-3">
                  <contact.icon className="h-5 w-5 text-primary-foreground" />
                  <span className="text-primary-foreground">
                    {contact.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-foreground">
              Quick Links
            </h3>
            <div className="space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-primary-foreground hover:text-accent transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-foreground">
              Stay Connected
            </h3>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-primary-foreground hover:text-accent transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <p className="text-primary-foreground">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background text-foreground border-border"
                />
                <Button
                  variant="secondary"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-primary-foreground">
                We Accept:
              </h4>

              <div className="space-y-3">
                <PaymentMethodGroup
                  label="Cards"
                  methods={paymentMethods.cards}
                />
                <PaymentMethodGroup
                  label="Mobile Banking"
                  methods={paymentMethods.mobileBanking}
                />
                <PaymentMethodGroup
                  label="Banks"
                  methods={paymentMethods.banks}
                />
              </div>
            </div>

            <p className="text-primary-foreground">
              © 2024 Digital Device Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
