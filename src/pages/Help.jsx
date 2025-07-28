import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle, 
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Help = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    {
      id: 'getting-started',
      title: t('getting_started', {}, { fallbackLanguage: 'fr' }) || 'Premiers pas',
      icon: Book,
      description: t('getting_started_desc', {}, { fallbackLanguage: 'fr' }) || 'Apprenez les bases du Géoportail Niger'
    },
    {
      id: 'map-navigation',
      title: t('map_navigation', {}, { fallbackLanguage: 'fr' }) || 'Navigation cartographique',
      icon: Search,
      description: t('map_navigation_desc', {}, { fallbackLanguage: 'fr' }) || 'Comment utiliser la carte interactive'
    },
    {
      id: 'data-analysis',
      title: t('data_analysis', {}, { fallbackLanguage: 'fr' }) || 'Analyse des données',
      icon: Video,
      description: t('data_analysis_desc', {}, { fallbackLanguage: 'fr' }) || 'Explorez et analysez les données du Niger'
    },
    {
      id: 'ai-assistant',
      title: t('ai_assistant'),
      icon: MessageCircle,
      description: t('ai_assistant_desc', {}, { fallbackLanguage: 'fr' }) || 'Utilisez l\'assistant IA pour vos questions'
    }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: t('faq_what_is_geoportail', {}, { fallbackLanguage: 'fr' }) || 'Qu\'est-ce que le Géoportail Niger ?',
      answer: t('faq_what_is_geoportail_answer', {}, { fallbackLanguage: 'fr' }) || 'Le Géoportail Niger est une plateforme web intelligente qui centralise et rend accessible les données publiques du Niger. Il permet aux citoyens, chercheurs et décideurs d\'explorer les informations géospatiales du pays de manière interactive.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: t('faq_how_to_start', {}, { fallbackLanguage: 'fr' }) || 'Comment commencer à utiliser la plateforme ?',
      answer: t('faq_how_to_start_answer', {}, { fallbackLanguage: 'fr' }) || 'Commencez par explorer le tableau de bord pour avoir une vue d\'ensemble des données. Ensuite, utilisez la carte interactive pour visualiser les informations géographiquement, ou l\'explorateur de données pour des analyses plus poussées.'
    },
    {
      id: 3,
      category: 'map-navigation',
      question: t('faq_map_filters', {}, { fallbackLanguage: 'fr' }) || 'Comment utiliser les filtres sur la carte ?',
      answer: t('faq_map_filters_answer', {}, { fallbackLanguage: 'fr' }) || 'Les filtres vous permettent d\'afficher ou masquer différents types d\'infrastructures. Cliquez sur les boutons de filtre en haut de la carte pour activer/désactiver les couches (santé, éducation, eau, énergie).'
    },
    {
      id: 4,
      category: 'map-navigation',
      question: t('faq_map_search', {}, { fallbackLanguage: 'fr' }) || 'Comment rechercher un lieu spécifique ?',
      answer: t('faq_map_search_answer', {}, { fallbackLanguage: 'fr' }) || 'Utilisez la barre de recherche en haut de la page pour trouver une ville, région ou infrastructure spécifique. Les résultats s\'afficheront automatiquement sur la carte.'
    },
    {
      id: 5,
      category: 'data-analysis',
      question: t('faq_export_data', {}, { fallbackLanguage: 'fr' }) || 'Puis-je exporter les données ?',
      answer: t('faq_export_data_answer', {}, { fallbackLanguage: 'fr' }) || 'Oui, vous pouvez exporter les données filtrées au format JSON depuis l\'explorateur de données. Cliquez sur le bouton "Exporter" après avoir appliqué vos filtres.'
    },
    {
      id: 6,
      category: 'ai-assistant',
      question: t('faq_ai_questions', {}, { fallbackLanguage: 'fr' }) || 'Quel type de questions puis-je poser à l\'IA ?',
      answer: t('faq_ai_questions_answer', {}, { fallbackLanguage: 'fr' }) || 'L\'assistant IA peut répondre à des questions sur les statistiques régionales, les infrastructures, les comparaisons entre régions, et vous guider dans la navigation de la plateforme.'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: t('tutorial_dashboard', {}, { fallbackLanguage: 'fr' }) || 'Découvrir le tableau de bord',
      description: t('tutorial_dashboard_desc', {}, { fallbackLanguage: 'fr' }) || 'Apprenez à naviguer dans le tableau de bord principal',
      duration: '5 min',
      type: 'video'
    },
    {
      id: 2,
      title: t('tutorial_map', {}, { fallbackLanguage: 'fr' }) || 'Utiliser la carte interactive',
      description: t('tutorial_map_desc', {}, { fallbackLanguage: 'fr' }) || 'Guide complet de la navigation cartographique',
      duration: '8 min',
      type: 'video'
    },
    {
      id: 3,
      title: t('tutorial_data', {}, { fallbackLanguage: 'fr' }) || 'Explorer les données',
      description: t('tutorial_data_desc', {}, { fallbackLanguage: 'fr' }) || 'Comment analyser et exporter les données',
      duration: '10 min',
      type: 'guide'
    },
    {
      id: 4,
      title: t('tutorial_ai', {}, { fallbackLanguage: 'fr' }) || 'Assistant IA',
      description: t('tutorial_ai_desc', {}, { fallbackLanguage: 'fr' }) || 'Maximiser l\'utilisation de l\'assistant intelligent',
      duration: '6 min',
      type: 'video'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.category === activeCategory &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('help_center', {}, { fallbackLanguage: 'fr' }) || 'Centre d\'aide'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('help_subtitle', {}, { fallbackLanguage: 'fr' }) || 'Trouvez des réponses à vos questions et apprenez à utiliser le Géoportail Niger'}
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('search_help', {}, { fallbackLanguage: 'fr' }) || 'Rechercher dans l\'aide...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 dark:text-white text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar des catégories */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('categories', {}, { fallbackLanguage: 'fr' }) || 'Catégories'}
          </h2>
          <nav className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  activeCategory === category.id
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <category.icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{category.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {category.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {/* Contact rapide */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              {t('need_more_help', {}, { fallbackLanguage: 'fr' }) || 'Besoin d\'aide supplémentaire ?'}
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:support@geoportail.ne"
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@geoportail.ne</span>
              </a>
              <a
                href="tel:+22720123456"
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+227 20 12 34 56</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {/* Tutoriels */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('tutorials', {}, { fallbackLanguage: 'fr' }) || 'Tutoriels'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {tutorial.type === 'video' ? (
                        <Video className="h-5 w-5 text-red-500" />
                      ) : (
                        <Book className="h-5 w-5 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {tutorial.duration}
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tutorial.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('frequently_asked_questions', {}, { fallbackLanguage: 'fr' }) || 'Questions fréquemment posées'}
            </h2>
            
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  {t('no_results_found', {}, { fallbackLanguage: 'fr' }) || 'Aucun résultat trouvé pour votre recherche.'}
                </p>
              </div>
            )}
          </div>

          {/* Ressources supplémentaires */}
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/10 dark:to-green-900/10 rounded-lg border border-orange-100 dark:border-orange-800/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('additional_resources', {}, { fallbackLanguage: 'fr' }) || 'Ressources supplémentaires'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all"
              >
                <Download className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t('user_manual', {}, { fallbackLanguage: 'fr' }) || 'Manuel utilisateur'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">PDF - 2.5 MB</div>
                </div>
              </a>
              
              <a
                href="#"
                className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all"
              >
                <ExternalLink className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t('api_documentation', {}, { fallbackLanguage: 'fr' }) || 'Documentation API'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t('for_developers', {}, { fallbackLanguage: 'fr' }) || 'Pour les développeurs'}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;