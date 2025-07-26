import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, TrendingUp, BarChart3, PieChart, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { nigerRegions, infrastructures, indicators } from '../data/nigerData';
import { useLanguage } from '../contexts/LanguageContext';

const DataExplorer = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedIndicator, setSelectedIndicator] = useState('education');

  const categories = [
    { value: 'all', label: t('all_categories') },
    { value: 'regions', label: 'Régions' },
    { value: 'education', label: 'Éducation' },
    { value: 'health', label: 'Santé' },
    { value: 'water', label: 'Eau' },
    { value: 'energy', label: 'Énergie' }
  ];

  const chartTypes = [
    { value: 'bar', label: 'Barres', icon: BarChart3 },
    { value: 'line', label: 'Ligne', icon: TrendingUp },
    { value: 'scatter', label: 'Nuage', icon: PieChart }
  ];

  const indicatorOptions = [
    { value: 'education', label: 'Accès à l\'Éducation', color: '#8B5CF6' },
    { value: 'health', label: 'Accès à la Santé', color: '#10B981' },
    { value: 'water', label: 'Accès à l\'Eau', color: '#06B6D4' },
    { value: 'electricity', label: 'Accès à l\'Électricité', color: '#F59E0B' }
  ];

  // Données pour les graphiques
  const chartData = useMemo(() => {
    const indicatorKey = selectedIndicator + 'Access';
    return nigerRegions.map(region => ({
      name: region.name,
      value: region[indicatorKey],
      population: region.population,
      area: region.area
    }));
  }, [selectedIndicator]);

  const correlationData = useMemo(() => {
    return nigerRegions.map(region => ({
      name: region.name,
      education: region.educationAccess,
      health: region.healthAccess,
      water: region.waterAccess,
      electricity: region.electricityAccess,
      population: region.population / 1000000 // En millions
    }));
  }, []);

  // Filtrage des données
  const filteredData = useMemo(() => {
    let data = [];
    
    if (selectedCategory === 'all' || selectedCategory === 'regions') {
      data = [...data, ...nigerRegions.map(r => ({ ...r, type: 'region' }))];
    }
    
    if (selectedCategory === 'all' || ['education', 'health', 'water', 'energy'].includes(selectedCategory)) {
      const categoryInfra = infrastructures.filter(infra => {
        if (selectedCategory === 'education') return infra.type.includes('school') || infra.type.includes('university');
        if (selectedCategory === 'health') return infra.type.includes('hospital') || infra.type.includes('health');
        if (selectedCategory === 'water') return infra.type.includes('water') || infra.type.includes('well') || infra.type.includes('river');
        if (selectedCategory === 'energy') return infra.type.includes('power') || infra.type.includes('solar');
        return true;
      });
      data = [...data, ...categoryInfra.map(i => ({ ...i, type: 'infrastructure' }))];
    }

    if (searchTerm) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.region && item.region.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return data;
  }, [selectedCategory, searchTerm]);

  const statsCards = [
    {
      title: 'Total Régions',
      value: nigerRegions.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Infrastructures',
      value: infrastructures.length,
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Points de Données',
      value: filteredData.length,
      icon: PieChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const exportData = () => {
    const dataStr = JSON.stringify(filteredData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `geoportail_niger_data_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('data')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explorez et analysez les données ouvertes du Niger avec des outils intelligents
        </p>
      </div>

      {/* Contrôles */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Recherche */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export */}
          <div>
            <button
              onClick={exportData}
              className="w-full flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${stat.bgColor} flex items-center space-x-3`}
            >
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visualisations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique principal */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Analyse par Indicateur
            </h3>
            
            <div className="flex space-x-2">
              {/* Sélecteur d'indicateur */}
              <select
                value={selectedIndicator}
                onChange={(e) => setSelectedIndicator(e.target.value)}
                className="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
              >
                {indicatorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Type de graphique */}
              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
              >
                {chartTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            {selectedChart === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill={indicatorOptions.find(opt => opt.value === selectedIndicator)?.color || '#F97316'} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            ) : selectedChart === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={indicatorOptions.find(opt => opt.value === selectedIndicator)?.color || '#F97316'}
                  strokeWidth={3}
                  dot={{ fill: indicatorOptions.find(opt => opt.value === selectedIndicator)?.color || '#F97316', strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <ScatterChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="population" stroke="#6B7280" name="Population" />
                <YAxis dataKey="value" stroke="#6B7280" name="Accès %" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value, name) => [value, name === 'value' ? 'Accès %' : 'Population']}
                />
                <Scatter 
                  fill={indicatorOptions.find(opt => opt.value === selectedIndicator)?.color || '#F97316'}
                />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Analyse de corrélation */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Corrélation Population-Accès
          </h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="population" 
                stroke="#6B7280" 
                name="Population (M)"
                label={{ value: 'Population (Millions)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                stroke="#6B7280" 
                name="Éducation %"
                label={{ value: 'Accès Éducation %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value, name, props) => [
                  `${value}${name === 'population' ? 'M' : '%'}`,
                  name === 'population' ? 'Population' : 'Accès Éducation'
                ]}
                labelFormatter={(value) => correlationData[value]?.name || ''}
              />
              <Scatter dataKey="education" fill="#8B5CF6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table des données */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Données Filtrées ({filteredData.length} éléments)
          </h3>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Région
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Détails
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.slice(0, 20).map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {item.type === 'region' ? 'Région' : 'Infrastructure'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.region || item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.population && (
                      <span className="mr-3">Pop: {item.population.toLocaleString()}</span>
                    )}
                    {item.capacity && (
                      <span className="mr-3">Cap: {item.capacity}</span>
                    )}
                    {item.students && (
                      <span>Étudiants: {item.students}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length > 20 && (
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Affichage de 20 sur {filteredData.length} éléments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExplorer;