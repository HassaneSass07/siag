import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { Filter, Search, MapPin, Guitar as Hospital, School, Droplets, Zap } from 'lucide-react';
import { nigerRegions, infrastructures } from '../data/nigerData';
import { useLanguage } from '../contexts/LanguageContext';

// Fix Leaflet default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different infrastructure types
const createCustomIcon = (color, icon) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <i style="color: white; font-size: 16px;">${icon}</i>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

const icons = {
  capital: createCustomIcon('#F59E0B', '★'),
  region: createCustomIcon('#3B82F6', '●'),
  hospital: createCustomIcon('#EF4444', '⚕'),
  health_center: createCustomIcon('#F97316', '⚕'),
  university: createCustomIcon('#8B5CF6', '🎓'),
  secondary_school: createCustomIcon('#6366F1', '🏫'),
  primary_school: createCustomIcon('#10B981', '🏫'),
  river: createCustomIcon('#06B6D4', '💧'),
  borehole: createCustomIcon('#0EA5E9', '💧'),
  well: createCustomIcon('#0284C7', '💧'),
  power_plant: createCustomIcon('#DC2626', '⚡'),
  solar_farm: createCustomIcon('#65A30D', '☀️')
};

const MapView = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    regions: true,
    health: true,
    education: true,
    water: true,
    energy: true
  });
  const [mapCenter] = useState([13.5, 2.1]); // Centre du Niger
  const [mapZoom] = useState(6);

  const filterOptions = [
    { key: 'regions', label: 'Régions', icon: MapPin, color: 'text-blue-600' },
    { key: 'health', label: 'Santé', icon: Hospital, color: 'text-red-600' },
    { key: 'education', label: 'Éducation', icon: School, color: 'text-purple-600' },
    { key: 'water', label: 'Eau', icon: Droplets, color: 'text-cyan-600' },
    { key: 'energy', label: 'Énergie', icon: Zap, color: 'text-yellow-600' }
  ];

  const toggleFilter = (filterKey) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const filteredRegions = nigerRegions.filter(region =>
    selectedFilters.regions && 
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInfrastructures = infrastructures.filter(infra => {
    const matchesSearch = infra.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (infra.type.includes('hospital') || infra.type.includes('health')) {
      return selectedFilters.health && matchesSearch;
    }
    if (infra.type.includes('school') || infra.type.includes('university')) {
      return selectedFilters.education && matchesSearch;
    }
    if (infra.type.includes('river') || infra.type.includes('well') || infra.type.includes('borehole')) {
      return selectedFilters.water && matchesSearch;
    }
    if (infra.type.includes('power') || infra.type.includes('solar')) {
      return selectedFilters.energy && matchesSearch;
    }
    
    return matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header avec contrôles */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('map')}
          </h1>
          
          {/* Barre de recherche */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Filter className="h-4 w-4" />
            <span>{t('filters')}:</span>
          </div>
          
          {filterOptions.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                selectedFilters[key]
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className={`h-4 w-4 ${selectedFilters[key] ? 'text-orange-600' : color}`} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Carte */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <LayersControl position="topright">
            {/* Couche des régions */}
            <LayersControl.Overlay checked name="Régions">
              <LayerGroup>
                {filteredRegions.map((region) => (
                  <Marker
                    key={region.id}
                    position={region.coordinates}
                    icon={icons[region.type]}
                  >
                    <Popup className="custom-popup">
                      <div className="p-3 min-w-[250px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                          {region.name}
                        </h3>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Population:</span>
                            <span className="font-semibold">{region.population.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Superficie:</span>
                            <span className="font-semibold">{region.area.toLocaleString()} km²</span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <h4 className="font-semibold text-gray-800">Accès aux Services:</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                              <span>Éducation</span>
                              <span className="font-bold text-purple-600">{region.educationAccess}%</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <span>Santé</span>
                              <span className="font-bold text-green-600">{region.healthAccess}%</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-cyan-50 rounded">
                              <span>Eau</span>
                              <span className="font-bold text-cyan-600">{region.waterAccess}%</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                              <span>Électricité</span>
                              <span className="font-bold text-yellow-600">{region.electricityAccess}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            {/* Couche des infrastructures */}
            <LayersControl.Overlay checked name="Infrastructures">
              <LayerGroup>
                {filteredInfrastructures.map((infra) => (
                  <Marker
                    key={infra.id}
                    position={infra.coordinates}
                    icon={icons[infra.type]}
                  >
                    <Popup>
                      <div className="p-3 min-w-[200px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {infra.name}
                        </h3>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-semibold capitalize">{infra.type.replace('_', ' ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Région:</span>
                            <span className="font-semibold">{infra.region}</span>
                          </div>
                          
                          {infra.capacity && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Capacité:</span>
                              <span className="font-semibold">{infra.capacity}</span>
                            </div>
                          )}
                          
                          {infra.students && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Étudiants:</span>
                              <span className="font-semibold">{infra.students}</span>
                            </div>
                          )}
                          
                          {infra.services && (
                            <div className="mt-2">
                              <span className="text-gray-600 text-xs">Services:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {infra.services.map((service, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>

        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Légende</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Capitale</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Régions</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Santé</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Éducation</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Eau</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Énergie</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;