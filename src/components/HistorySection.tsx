import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Calendar, Users, Award, Globe } from "lucide-react";

const milestones = [
  {
    year: "1991",
    title: "Tourism Pioneer",
    description: "First organized hunting expeditions to Kamchatka Peninsula after the region opened to civilians.",
    icon: Users
  },
  {
    year: "1996", 
    title: "UNESCO Recognition",
    description: "Kamchatka Peninsula designated as UNESCO World Heritage Site, highlighting its unique volcanic landscape.",
    icon: Award
  },
  {
    year: "2005",
    title: "Sustainable Tourism",
    description: "Established eco-friendly tourism practices and wildlife conservation partnerships.",
    icon: Globe
  },
  {
    year: "2023",
    title: "Modern Adventure Hub",
    description: "Today we offer world-class services while preserving the pristine wilderness of Kamchatka.",
    icon: Calendar
  }
];

const facts = [
  {
    number: "30+",
    label: "Active Volcanoes",
    description: "Including the Valley of Geysers"
  },
  {
    number: "13,000",
    label: "Brown Bears",
    description: "Largest population in Russia"
  },
  {
    number: "270,000",
    label: "Square KM",
    description: "Pristine wilderness area"
  },
  {
    number: "2000+",
    label: "Species",
    description: "Flora and fauna diversity"
  }
];

export function HistorySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Our Story</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The History of Kamchatka Tourism
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From a closed military zone to one of the world's premier wilderness destinations, 
            discover the fascinating journey of Kamchatka Peninsula tourism.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={milestone.year} className="relative flex items-start mb-12 last:mb-0">
                  {/* Timeline line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-20 bg-border" />
                  )}
                  
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-6">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {milestone.year}
                    </Badge>
                    <h3 className="font-bold text-xl mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Facts Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Kamchatka by Numbers</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facts.map((fact) => (
              <Card key={fact.label} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {fact.number}
                  </div>
                  <div className="font-medium mb-1">{fact.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {fact.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Heritage Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              UNESCO World Heritage Site
            </Badge>
            <h3 className="text-2xl font-bold mb-4">
              Protecting Natural Wonder
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Kamchatka Peninsula is recognized for its exceptional volcanic phenomena and 
              diverse ecosystems. Our tourism practices are designed to preserve this 
              pristine wilderness for future generations while providing unforgettable 
              experiences for our guests.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}