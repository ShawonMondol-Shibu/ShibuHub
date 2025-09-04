/* eslint-disable react/no-unescaped-entities */
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Page() {
  const companies = [
    { name: "Apple", logo: "/images/apple.png" },
    { name: "Samsung", logo: "/images/Samsung.svg" },
    { name: "Sony", logo: "/images/Sony-Logo.png" },
    { name: "LG", logo: "/images/LG-Logo.png" },
    { name: "TCL", logo: "/images/TCL-logo.png" },
    { name: "Anker", logo: "/images/anker.png" },
    { name: "Walton", logo: "/images/walton_logo.jpg" },
  ];

  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Happy Customers", value: "1000+" },
    { label: "Products Sold", value: "5000+" },
    { label: "Partner Brands", value: "50+" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <DynamicBreadcrumb />

        {/* Hero Section */}
        <section className="mt-8 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-indigo-900 mb-4 text-balance">
              About Our Digital Store
            </h1>
            <p className="text-xl text-indigo-600 max-w-2xl mx-auto text-pretty">
              Your trusted partner for premium digital electronics and
              exceptional service
            </p>
          </div>

          {/* Owner Profile Card */}
          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-indigo-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="relative">
                  <Image
                    src="/images/owner.jpg"
                    alt="Shawon Mondol Shibu - Owner"
                    width={300}
                    height={300}
                    className="rounded-2xl shadow-2xl border-4 border-indigo-200"
                  />
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2">
                    Founder & CEO
                  </Badge>
                </div>

                <div className="flex-1 text-center lg:text-left space-y-4">
                  <h2 className="text-3xl font-bold text-indigo-900">
                    Shawon Mondol Shibu
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <span className="font-semibold">Age:</span>
                      <span>21 years old</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <span className="font-semibold">Education:</span>
                      <span>Diploma in Computer Engineering</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <span className="font-semibold">Nationality:</span>
                      <span>Bangladeshi</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <span className="font-semibold">Experience:</span>
                      <span>5+ Years in Tech</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-indigo-600 text-white border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-indigo-100 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Sections */}
        <section className="mb-16 space-y-16">
          {/* Our Mission */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-indigo-900">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed text-pretty">
                We are dedicated to bringing you the latest and greatest in
                digital electronics. From cutting-edge smartphones to innovative
                smart home devices, we carefully curate our selection to ensure
                you have access to premium quality products that enhance your
                digital lifestyle.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed text-pretty">
                Our commitment goes beyond just selling products. We believe in
                building lasting relationships with our customers through
                exceptional service, expert guidance, and ongoing support for
                all your technology needs.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/Digitisation.jpg"
                alt="Digital Innovation"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>

          {/* Our Expertise */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/images/coding.jpg"
                alt="Technical Expertise"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-indigo-900">
                Our Expertise
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed text-pretty">
                With a strong background in computer engineering and years of
                experience in the technology sector, we understand the intricate
                details that make each device special. This technical expertise
                allows us to provide informed recommendations and comprehensive
                support.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed text-pretty">
                Whether you're a tech enthusiast looking for the latest
                innovations or someone seeking reliable everyday devices, our
                team is here to guide you through every step of your purchase
                journey and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Brands */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">
              Trusted Partner Brands
            </h2>
            <p className="text-xl text-indigo-600 max-w-2xl mx-auto text-pretty">
              We work with industry-leading brands to bring you authentic,
              high-quality products
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-indigo-200 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className="group hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      width={120}
                      height={80}
                      className="max-w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
