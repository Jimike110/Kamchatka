import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

interface StaticPageProps {
  pageType: 'ourStory' | 'team' | 'careers' | 'press' | 'help' | 'faq' | 'safety' | 'terms' | 'privacy' | 'cookies';
}

export function StaticPage({ pageType }: StaticPageProps) {
  const { t } = useLanguage();
  const { goBack } = useApp();

  const pageKeyMap = {
    ourStory: 'footer.ourStory',
    team: 'footer.team',
    careers: 'footer.careers',
    press: 'footer.press',
    help: 'footer.help',
    faq: 'footer.faq',
    safety: 'footer.safety',
    terms: 'footer.terms',
    privacy: 'footer.privacy',
    cookies: 'footer.cookies',
  };

  const title = t(pageKeyMap[pageType] || 'error.notFound');
  const content = t(`pages.${pageType}.content`);

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={goBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">{title}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {title}
            </h1>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <div className="whitespace-pre-line leading-relaxed text-muted-foreground">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}