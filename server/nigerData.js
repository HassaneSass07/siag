const nigerRegions = [
  {
    id: 1,
    name: 'Niamey',
    coordinates: [13.5116, 2.1254],
    population: 1302910,
    area: 255,
    educationAccess: 85,
    healthAccess: 78,
    waterAccess: 72,
    electricityAccess: 65,
    type: 'capital'
  },
  {
    id: 2,
    name: 'Agadez',
    coordinates: [16.9719, 7.9901],
    population: 487620,
    area: 667799,
    educationAccess: 42,
    healthAccess: 35,
    waterAccess: 28,
    electricityAccess: 15,
    type: 'region'
  },
  {
    id: 3,
    name: 'Diffa',
    coordinates: [13.3154, 12.6113],
    population: 679282,
    area: 140216,
    educationAccess: 38,
    healthAccess: 32,
    waterAccess: 25,
    electricityAccess: 12,
    type: 'region'
  },
  {
    id: 4,
    name: 'Dosso',
    coordinates: [13.0490, 3.1939],
    population: 2078339,
    area: 33844,
    educationAccess: 52,
    healthAccess: 45,
    waterAccess: 38,
    electricityAccess: 22,
    type: 'region'
  },
  {
    id: 5,
    name: 'Maradi',
    coordinates: [13.5007, 7.1017],
    population: 4248073,
    area: 41796,
    educationAccess: 48,
    healthAccess: 41,
    waterAccess: 35,
    electricityAccess: 18,
    type: 'region'
  },
  {
    id: 6,
    name: 'Tahoua',
    coordinates: [14.8888, 5.2692],
    population: 4069503,
    area: 106677,
    educationAccess: 35,
    healthAccess: 28,
    waterAccess: 22,
    electricityAccess: 8,
    type: 'region'
  },
  {
    id: 7,
    name: 'Tillabéri',  
    coordinates: [14.2116, 1.4528],
    population: 3214054,
    area: 97251,
    educationAccess: 31,
    healthAccess: 24,
    waterAccess: 19,
    electricityAccess: 6,
    type: 'region'
  },
  {
    id: 8,
    name: 'Zinder',
    coordinates: [13.8069, 8.9881],
    population: 4025461,
    area: 145430,
    educationAccess: 44,
    healthAccess: 37,
    waterAccess: 31,
    electricityAccess: 14,
    type: 'region'
  }
];

const infrastructures = [
  // Hôpitaux
  { id: 'h1', name: 'Hôpital National de Niamey', type: 'hospital', coordinates: [13.5137, 2.1098], region: 'Niamey', capacity: 500, services: ['urgence', 'chirurgie', 'maternité'] },
  { id: 'h2', name: 'Hôpital Régional de Zinder', type: 'hospital', coordinates: [13.8059, 8.9891], region: 'Zinder', capacity: 200, services: ['urgence', 'pédiatrie'] },
  { id: 'h3', name: 'Centre de Santé Intégré Agadez', type: 'health_center', coordinates: [16.9709, 7.9911], region: 'Agadez', capacity: 50, services: ['consultation', 'vaccination'] },
  
  // Écoles
  { id: 'e1', name: 'Université Abdou Moumouni', type: 'university', coordinates: [13.5089, 2.1145], region: 'Niamey', students: 25000, level: 'superieur' },
  { id: 'e2', name: 'Lycée Issa Korombé', type: 'secondary_school', coordinates: [13.5198, 2.1289], region: 'Niamey', students: 1800, level: 'secondaire' },
  { id: 'e3', name: 'École Primaire Dosso Centre', type: 'primary_school', coordinates: [13.0500, 3.1949], region: 'Dosso', students: 450, level: 'primaire' },
  
  // Points d'eau
  { id: 'w1', name: 'Fleuve Niger - Niamey', type: 'river', coordinates: [13.5126, 2.1164], region: 'Niamey', source: 'surface', quality: 'traitée' },
  { id: 'w2', name: 'Forage Maradi', type: 'borehole', coordinates: [13.5017, 7.1027], region: 'Maradi', source: 'souterraine', quality: 'potable' },
  { id: 'w3', name: 'Puits Traditionnel Tillabéri', type: 'well', coordinates: [14.2106, 1.4538], region: 'Tillabéri', source: 'souterraine', quality: 'non_traitée' },
  
  // Infrastructure électrique
  { id: 'p1', name: 'Centrale Électrique de Goudel', type: 'power_plant', coordinates: [13.5406, 2.0854], region: 'Niamey', capacity: 132, fuel: 'thermique' },
  { id: 'p2', name: 'Parc Solaire Gorou Banda', type: 'solar_farm', coordinates: [13.4989, 2.2156], region: 'Niamey', capacity: 20, fuel: 'solaire' }
];

const indicators = {
  education: {
    national_average: 47.2,
    regions: nigerRegions.map(r => ({ name: r.name, value: r.educationAccess }))
  },
  health: {
    national_average: 41.8,
    regions: nigerRegions.map(r => ({ name: r.name, value: r.healthAccess }))
  },
  water: {
    national_average: 35.6,
    regions: nigerRegions.map(r => ({ name: r.name, value: r.waterAccess }))
  },
  electricity: {
    national_average: 22.3,
    regions: nigerRegions.map(r => ({ name: r.name, value: r.electricityAccess }))
  }
};

// Algorithme de scoring intelligent pour zones prioritaires
const calculatePriorityScore = (region) => {
  const weights = {
    education: 0.25,
    health: 0.30,
    water: 0.25,
    electricity: 0.20
  };
  
  const maxScore = 100;
  const educationScore = (maxScore - region.educationAccess) * weights.education;
  const healthScore = (maxScore - region.healthAccess) * weights.health;
  const waterScore = (maxScore - region.waterAccess) * weights.water;
  const electricityScore = (maxScore - region.electricityAccess) * weights.electricity;
  
  return (educationScore + healthScore + waterScore + electricityScore).toFixed(1);
};

// Clustering des régions par profil socio-économique
const clusterRegions = () => {
  const clusters = {
    developed: [],
    developing: [],
    priority: []
  };
  
  nigerRegions.forEach(region => {
    const avgAccess = (region.educationAccess + region.healthAccess + region.waterAccess + region.electricityAccess) / 4;
    
    if (avgAccess >= 60) {
      clusters.developed.push(region);
    } else if (avgAccess >= 35) {
      clusters.developing.push(region);
    } else {
      clusters.priority.push(region);
    }
  });
  
  return clusters;
};

// Vos données existantes...
module.exports = {
  nigerRegions,
  infrastructures,
  indicators,
  calculatePriorityScore,
  clusterRegions
};