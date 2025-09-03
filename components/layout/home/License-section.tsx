import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Award, CheckCircle, Globe, Lock, Zap } from "lucide-react";

const licenses = [
  {
    id: 1,
    title: "FCC Certification",
    description:
      "Federal Communications Commission approved for all electronic devices",
    icon: Shield,
    badge: "Verified",
    category: "Regulatory",
  },
  {
    id: 2,
    title: "CE Marking",
    description:
      "European Conformity certification for product safety and compliance",
    icon: Award,
    badge: "Certified",
    category: "International",
  },
  {
    id: 3,
    title: "ISO 9001:2015",
    description:
      "Quality Management System certification for consistent service delivery",
    icon: CheckCircle,
    badge: "Accredited",
    category: "Quality",
  },
  {
    id: 4,
    title: "RoHS Compliance",
    description: "Restriction of Hazardous Substances directive compliance",
    icon: Globe,
    badge: "Compliant",
    category: "Environmental",
  },
  {
    id: 5,
    title: "PCI DSS Level 1",
    description:
      "Payment Card Industry Data Security Standard for secure transactions",
    icon: Lock,
    badge: "Secured",
    category: "Security",
  },
  {
    id: 6,
    title: "Energy Star Partner",
    description:
      "EPA Energy Star certified partner for energy-efficient products",
    icon: Zap,
    badge: "Partner",
    category: "Efficiency",
  },
];

export function LicenseSection() {
  return (
    <section className="py-40 m-auto  container ">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
          Our Licenses & Certifications
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
          We maintain the highest standards of quality, safety, and compliance
          through our comprehensive certifications and industry partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {licenses.map((license) => {
          const IconComponent = license.icon;
          return (
            <Card
              key={license.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-indigo-500" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-indigo-500 text-white hover:bg-indigo-500/80"
                  >
                    {license.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
                  {license.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 text-pretty">
                  {license.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-800 bg-indigo-600/10 px-2 py-1 rounded-full">
                    {license.category}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-600 hover:text-primary-foreground hover:bg-indigo-500"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
          <CheckCircle className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            All certifications are current and regularly audited
          </span>
        </div>
      </div>
    </section>
  );
}
