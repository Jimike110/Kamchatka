import { Hero } from "../Hero";
import { ServicesSection } from "../ServicesSection";
import { HistorySection } from "../HistorySection";
import { ServiceCatalog } from "../ServiceCatalog";

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Services Overview */}
      <ServicesSection />

      {/* History Section */}
      <HistorySection />

      {/* Service Catalog */}
      <section id="catalog">
        <ServiceCatalog />
      </section>
    </>
  );
}