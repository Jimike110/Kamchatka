import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, Search, Filter, X } from "lucide-react";
import { ServiceCatalog } from "../ServiceCatalog";
import { useNavigate } from "react-router-dom";

interface SearchPageProps {
  query?: string;
}

export function SearchPage({ query }: SearchPageProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const popularSearches = [
    t("services.hunting"),
    t("services.fishing"),
    t("services.recreation"),
    t("services.tours"),
    "Brown Bear",
    "Volcano Tours",
    "Pacific Fishing",
    "Helicopter Tours",
  ];

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockResults = [
      {
        id: "hunting-1",
        title: "Brown Bear Hunting Expedition",
        type: "service",
        category: "hunting",
        description: "World-class hunting experience",
        price: 2500,
      },
      {
        id: "fishing-1",
        title: "Pacific Salmon Fishing",
        type: "service",
        category: "fishing",
        description: "Premium fishing adventure",
        price: 180,
      },
    ].filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {t("search.results")}
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("common.search")}
            </Button>
          </form>

          {/* Popular Searches */}
          {!searchQuery && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3">{t("search.popular")}</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-lg">{t("common.loading")}</div>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-muted-foreground">
                    {t("search.showing")} {searchResults.length}{" "}
                    {t("search.results")} {t("search.for")} "{searchQuery}"
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((result) => (
                    <Card
                      key={result.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-2">
                          {result.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2">
                          {result.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {result.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">${result.price}</span>
                          <Badge>{t("catalog.available")}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-lg mb-2">
                  {t("search.noResults")} "{searchQuery}"
                </div>
                <p className="text-muted-foreground mb-4">
                  {t("search.suggestions")}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularSearches.slice(0, 4).map((term) => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* All Services */}
        {!searchQuery && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("services.viewAll")}</h2>
            <ServiceCatalog showFullCatalog={true} />
          </div>
        )}
      </div>
    </div>
  );
}
