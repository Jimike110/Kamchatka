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

  const getPageContent = () => {
    switch (pageType) {
      case 'ourStory':
        return {
          title: t('footer.ourStory'),
          content: t('pages.ourStory.content')
        };
      case 'team':
        return {
          title: t('footer.team'),
          content: t('pages.team.content')
        };
      case 'careers':
        return {
          title: t('footer.careers'),
          content: t('pages.careers.content')
        };
      case 'press':
        return {
          title: t('footer.press'),
          content: t('pages.press.content')
        };
      case 'help':
        return {
          title: t('footer.help'),
          content: t('pages.help.content')
        };
      case 'faq':
        return {
          title: t('footer.faq'),
          content: t('pages.faq.content')
        };
      case 'safety':
        return {
          title: t('footer.safety'),
          content: t('pages.safety.content')
        };
      case 'terms':
        return {
          title: t('footer.terms'),
          content: t('pages.terms.content')
        };
      case 'privacy':
        return {
          title: t('footer.privacy'),
          content: t('pages.privacy.content')
        };
      case 'cookies':
        return {
          title: t('footer.cookies'),
          content: t('pages.cookies.content')
        };
      default:
        return {
          title: t('error.notFound'),
          content: t('error.pageNotFound')
        };
    }
  };

  const { title, content } = getPageContent();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={goBack} className="mb-4 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
        </div>

        {/* Content */}
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

          {/* Coming Soon Message for now */}
          <div className="mt-16 text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{t('pages.comingSoon')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('pages.comingSoonDescription')}
            </p>
            <Button onClick={goBack} className="cursor-pointer">
              {t('common.back')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}