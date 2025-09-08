import { ContactForm } from "@/components/layout/contact/ContactForm";
import { ContactInfo } from "@/components/layout/contact/ContactInfo";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";

export default function Page() {
  return (
    <div className="container min-h-screen  m-auto bg-white">
      <DynamicBreadcrumb />

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
            Get in touch with our team. We are here to help you with all your
            digital device needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form - Left Side */}
          <ContactForm />

          {/* Contact Information - Right Side */}
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
