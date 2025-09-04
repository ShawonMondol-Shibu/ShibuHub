import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaYoutube, FaWhatsapp, FaFacebook } from "react-icons/fa";

export function ContactInfo() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "support@digitaldevices.com",
      link: "mailto:support@digitaldevices.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Address",
      value: "123 Tech Street, Digital City, DC 12345",
      link: "#",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Business Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: "#",
    },
  ];

  const socialMedia = [
    {
      icon: <FaYoutube className="w-6 h-6" />,
      label: "YouTube",
      link: "https://youtube.com",
      color: "text-red-600",
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      label: "WhatsApp",
      link: "https://whatsapp.com",
      color: "text-green-600",
    },
    {
      icon: <FaFacebook className="w-6 h-6" />,
      label: "Facebook",
      link: "https://facebook.com",
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Contact Information Card */}
      <Card className="border-indigo-200 shadow-lg">
        <CardHeader className="bg-indigo-50">
          <CardTitle className="text-2xl text-indigo-900">
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="text-indigo-600">{method.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-indigo-900 mb-1">
                    {method.label}
                  </h3>
                  {method.link !== "#" ? (
                    <a
                      href={method.link}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-indigo-700">{method.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Card */}
      <Card className="border-indigo-200 shadow-lg">
        <CardHeader className="bg-indigo-50">
          <CardTitle className="text-2xl text-indigo-900">Follow Us</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-3 rounded-lg border border-indigo-100 hover:bg-indigo-50 transition-colors group"
              >
                <div
                  className={`${social.color} group-hover:scale-110 transition-transform`}
                >
                  {social.icon}
                </div>
                <span className="font-medium text-indigo-900 group-hover:text-indigo-700">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
