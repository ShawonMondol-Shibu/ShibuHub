import { services } from "@/components/services/electronics";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Electronics() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Electronics Services</h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item) => {
            const { id, title, category, description } = item;
            return (
              <Card key={id} className="text-center hover:shadow-lg transition-all duration-300 border-border border-l-4 border-l-primary">
                <CardHeader>
                  <item.icon size={48} className="mx-auto text-primary" />
                  <Badge variant="secondary" className="mx-auto mt-2 bg-primary/10 text-primary">
                    {category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription className="mt-2">{description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
