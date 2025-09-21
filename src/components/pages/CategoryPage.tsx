import { useLanguage } from "../../contexts/LanguageContext";
import { ServiceCatalog } from "../ServiceCatalog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, Target, Fish, TreePine, Mountain } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

const categoryIcons = {
  hunting: Target,
  fishing: Fish,
  recreation: TreePine,
  tours: Mountain,
};

interface CategoryPageProps {
  category?: 'hunting' | 'fishing' | 'recreation' | 'tours';
}

export function CategoryPage({ category }: CategoryPageProps) {
  const { t } = useLanguage();
  const { goBack } = useApp();

  if (!category) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('error.notFound')}</h1>
          <Button onClick={goBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
        </div>
      </div>
    );
  }

  const Icon = categoryIcons[category];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={goBack} className="mb-4 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {t(`services.${category}`)}
              </h1>
              <Badge variant="secondary" className="mt-2">
                {t(`category.${category}`)}
              </Badge>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t(`services.${category}.desc`)}
          </p>
        </div>

        {/* Services in this category */}
        <ServiceCatalog filterByCategory={category} showFullCatalog={true} />
      </div>
    </div>
  );
}