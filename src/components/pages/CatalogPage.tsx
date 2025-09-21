import { ServiceCatalog } from "../ServiceCatalog";
import { useLanguage } from "../../contexts/LanguageContext";

export function CatalogPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('catalog.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        <ServiceCatalog showFullCatalog={true} />
      </div>
    </div>
  );
}