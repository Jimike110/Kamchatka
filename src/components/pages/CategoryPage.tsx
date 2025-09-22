import { useLanguage } from "../../contexts/LanguageContext";
import { ServiceCatalog } from "../ServiceCatalog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, Target, Fish, TreePine, Mountain } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const categoryIcons: { [key: string]: React.ElementType } = {
  hunting: Target,
  fishing: Fish,
  recreation: TreePine,
  tours: Mountain,
};

interface CategoryPageProps {
  category?: "hunting" | "fishing" | "recreation" | "tours";
}

export function CategoryPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const params = useParams();
  const category = params?.categoryName as CategoryPageProps["category"];
  scroll(0, 0);

  if (!category || !categoryIcons[category]) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("error.categoryNotFound")}
          </h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>
        </div>
      </div>
    );
  }

  const Icon = categoryIcons[category];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
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
                {t(`categories.${category}`)}
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
