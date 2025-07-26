# 🌍 Géoportail Niger - SIATeG 2025

**Plateforme web intelligente pour l'accès libre aux données ouvertes du Niger**

## 🎯 Vue d'ensemble

Le Géoportail Niger est une solution innovante développée pour le Hackathon SIATeG Niger 2025, visant à démocratiser l'accès aux données publiques du Niger à travers une interface web moderne et intelligente.

## ✨ Fonctionnalités Principales

### 🗺️ Carte Interactive
- Navigation intuitive par région, département ou commune
- Couches de données superposables (écoles, hôpitaux, routes, infrastructures)
- Affichage de popups d'information détaillées
- Filtres avancés par catégorie d'infrastructure

### 📊 Dashboards Dynamiques
- Visualisation des taux d'accès (électricité, eau, éducation, santé) par région
- Graphiques interactifs avec Chart.js et Recharts
- Analyses comparatives entre régions
- Indicateurs de performance en temps réel

### 🔍 Moteur de Recherche Intelligent
- Recherche par nom de ville, catégorie de donnée, ou zone
- Suggestions automatiques (autocomplete)
- Filtres multiples et combinables
- Résultats géolocalisés

### 🧠 Intelligence Intégrée
- **Algorithmes de scoring** : Identification automatique des zones prioritaires
- **Clustering intelligent** : Classification des régions par profil socio-économique
- **Analyse de corrélation** : Relations entre population et accès aux services
- Tout en JavaScript pur (pas de Python requis)

### 👥 Gestion des Utilisateurs
- Système d'authentification sécurisé
- Rôles multiples : Administrateur, Contributeur, Citoyen
- Profils utilisateurs avec statistiques de contribution
- Système de badges et accomplissements

### 🌐 Interface Multilingue
- Support Français, Haoussa, Zarma
- Fichiers de traduction JSON modifiables
- Sélecteur de langue dynamique
- Adaptation culturelle des contenus

### 💡 Design & UX Premium
- Design inspiré de la nature nigérienne (sable, vert, bleu)
- Mode clair/sombre avec transitions fluides
- Animations et micro-interactions soignées
- Interface responsive (mobile-first)
- PWA pour usage offline en zones rurales

## 🛠️ Technologies Utilisées

### Frontend
- **React.js 18** - Interface utilisateur moderne
- **TailwindCSS** - Styling responsive et élégant
- **Leaflet.js** - Cartographie interactive
- **Recharts** - Visualisations de données
- **Lucide React** - Icônes modernes
- **Framer Motion** - Animations fluides

### Backend (Simulation)
- **Node.js** - Environnement d'exécution
- **Algorithmes JS** - Intelligence intégrée
- **LocalStorage** - Persistance de données locale
- **PWA** - Application web progressive

### Données & Intelligence
- **Données Niger** - Mockup réaliste des 8 régions
- **Algorithmes de scoring** - Priorisation automatique
- **Clustering K-means** - Classification intelligente
- **Géolocalisation** - Coordonnées GPS précises

## 🚀 Installation & Lancement

```bash
# Cloner le projet
git clone <repository-url>
cd geoportail-niger

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 📱 PWA - Application Progressive

L'application est optimisée pour un usage mobile et rural :

- **Cache offline** pour les données essentielles
- **Installation** sur l'écran d'accueil mobile
- **Notifications push** pour les mises à jour
- **Synchronisation** en arrière-plan
- **Performance** optimisée pour connexions lentes

## 🗺️ Données Couvertes

### Régions (8)
- Niamey (Capitale)
- Agadez, Diffa, Dosso, Maradi, Tahoua, Tillabéri, Zinder

### Indicateurs par Région
- **Population** et superficie
- **Accès à l'éducation** (%)
- **Accès à la santé** (%)
- **Accès à l'eau potable** (%)
- **Accès à l'électricité** (%)

### Infrastructures (50+)
- **Santé** : Hôpitaux, centres de santé
- **Éducation** : Universités, lycées, écoles primaires
- **Eau** : Forages, puits, points d'eau
- **Énergie** : Centrales électriques, parcs solaires

## 🎨 Palette de Couleurs

```css
/* Couleurs inspirées du Niger */
Primary: #F97316 (Orange sahélien)
Secondary: #10B981 (Vert oasis)
Accent: #3B82F6 (Bleu fleuve Niger)
Sand: #F5F0E6 (Sable du désert)
Success: #059669
Warning: #D97706
Error: #DC2626
```

## 🏆 Innovation & Impact

### Algorithmes Intelligents
- **Score de Priorité** : Calcul automatique basé sur les indicateurs d'accès
- **Classification Socio-économique** : Régions développées, en développement, prioritaires
- **Analyse Prédictive** : Tendances et projections

### Contribution Citoyenne
- **Signalement** de problèmes infrastructurels
- **Validation collaborative** des données
- **Enrichissement participatif** de la base de données

### Transparence & Gouvernance
- **Open Source** : Code accessible à tous
- **Données ouvertes** : Formats standardisés (JSON, GeoJSON)
- **API publique** : Accès programmatique aux données
- **Documentation complète** : Guides développeurs

## 🎓 Objectifs Pédagogiques

Ce projet démontre :
- **Architecture moderne** React + TailwindCSS
- **Gestion d'état** avec Context API
- **Cartographie web** avec Leaflet
- **Visualisation de données** interactive
- **Responsive design** mobile-first
- **Internationalisation** multilingue
- **Algorithmes** d'intelligence artificielle
- **PWA** et technologies offline

## 🤝 Contribution

Nous encourageons les contributions de la communauté :

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** les modifications (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrir** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🏅 Hackathon SIATeG Niger 2025

**Thème** : Conception d'un Géoportail web intelligent pour l'accès libre aux données ouvertes du Niger

**Objectifs** :
- ✅ Centraliser les données géospatiales du Niger
- ✅ Promouvoir la transparence et l'inclusion citoyenne
- ✅ Stimuler l'innovation en governance ouverte
- ✅ Encourager la collaboration tech au Niger

---

**Fait avec ❤️ pour le développement durable du Niger**

*Géoportail Niger - SIATeG 2025*