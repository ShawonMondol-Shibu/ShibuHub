import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, CheckCircle, Globe, Lock, Zap } from "lucide-react";

const licenses = [
  { id: 1, title: "FCC Certification", description: "Federal Communications Commission approved for all electronic devices", icon: Shield, badge: "Verified", category: "Regulatory" },
  { id: 2, title: "CE Marking", description: "European Conformity certification for product safety and compliance", icon: Award, badge: "Certified", category: "International" },
  { id: 3, title: "ISO 9001:2015", description: "Quality Management System certification for consistent service delivery", icon: CheckCircle, badge: "Accredited", category: "Quality" },
  { id: 4, title: "RoHS Compliance", description: "Restriction of Hazardous Substances directive compliance", icon: Globe, badge: "Compliant", category: "Environmental" },
  { id: 5, title: "PCI DSS Level 1", description: "Payment Card Industry Data Security Standard for secure transactions", icon: Lock, badge: "Secured", category: "Security" },
  { id: 6, title: "Energy Star Partner", description: "EPA Energy Star certified partner for energy-efficient products", icon: Zap, badge: "Partner", category: "Efficiency" },
];

export function LicenseSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Licenses & Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We maintain the highest standards of quality, safety, and compliance.</p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((license) => {
            const IconComponent = license.icon;
            return (
              <Card key={license.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">{license.badge}</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{license.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{license.description}</p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{license.category}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
