import React from 'react';
import { Globe, Users, Target, Heart, Award, Lightbulb, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Globe,
      title: 'Accès Libre aux Données',
      description: 'Toutes les données publiques du Niger centralisées et accessibles gratuitement pour tous les citoyens.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Zap,
      title: 'Intelligence Artificielle',
      description: 'Algorithmes de scoring et clustering pour identifier automatiquement les zones prioritaires.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: Users,
      title: 'Participation Citoyenne',
      description: 'Les citoyens peuvent contribuer, signaler et enrichir les données locales de leur région.',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Shield,
      title: 'Transparence & Gouvernance',
      description: 'Promotion de la gouvernance ouverte et de la transparence dans l\'accès à l\'information publique.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const impacts = [
    {
      number: '8',
      label: 'Régions Couvertes',
      description: 'Toutes les régions du Niger avec leurs données détaillées'
    },
    {
      number: '1000+',
      label: 'Points de Données',
      description: 'Infrastructures, indicateurs et statistiques référencés'
    },
    {
      number: '3',
      label: 'Langues Supportées',
      description: 'Français, Hausa et Zarma pour une inclusion maximale'
    },
    {
      number: '24/7',
      label: 'Disponibilité',
      description: 'Accès permanent aux données, même en mode hors-ligne'
    }
  ];

  const team = [
    {
      name: 'Équipe SIATeG Niger',
      role: 'Organisateurs du Hackathon',
      description: 'Organisation de la 2ème édition du SIATeG Niger 2025',
      avatar: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Développeurs Nigériens',
      role: 'Talents Locaux',
      description: 'Jeunes développeurs passionnés par l\'innovation technologique',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Communauté Open Source',
      role: 'Contributeurs',
      description: 'Communauté engagée pour les données ouvertes au Niger',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-green-600 rounded-xl p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Globe className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about_title')}
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
            Une plateforme web intelligente pour démocratiser l'accès aux données publiques du Niger
          </p>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">{t('about_mission')}</h2>
            <p className="text-lg leading-relaxed">
              {t('about_mission_text')}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Fonctionnalités Principales
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Des outils modernes et intelligents pour révolutionner l'accès aux données publiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`p-4 rounded-full ${feature.bgColor} inline-block mb-4`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Notre Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Des chiffres qui témoignent de notre engagement pour le Niger
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {impact.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {impact.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {impact.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Section */}
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Technologies Utilisées
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Une stack technique moderne et performante
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Frontend Moderne
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              React.js, TailwindCSS, Leaflet.js pour une interface utilisateur exceptionnelle
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm">TailwindCSS</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm">Leaflet</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Intelligence Intégrée
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Algorithmes JavaScript pour le scoring intelligent et le clustering automatique
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm">ML-JS</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm">Algorithms</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              PWA & Mobile
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Application progressive optimisée pour un usage rural et mobile
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-sm">PWA</span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-sm">Offline</span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-sm">Responsive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Équipe & Communauté
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Un projet porté par la communauté tech nigérienne
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all duration-300"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200 dark:border-orange-800"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-orange-600 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Rejoignez le Mouvement
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Contribuez à la transformation numérique du Niger et à l'accès démocratique aux données
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Devenir Contributeur
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
            En Savoir Plus
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Géoportail Niger - Hackathon SIATeG 2025
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Fait avec ❤️ pour le développement du Niger
        </p>
      </div>
    </div>
  );
};

export default About;