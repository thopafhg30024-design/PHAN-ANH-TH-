import React, { useState } from 'react';
import { RIVER_STATIONS, SIX_COUNTRIES_INFO, RIVER_NINE_ESTUARIES, MEKONG_GEOGRAPHY_SCOPE } from '../data/mekongData';
import { RiverStation, EducationLevel, Language, RiverEstuary } from '../types';
import { soundFx } from '../utils/audio';
import { MekongGlobeMap } from './MekongGlobeMap';
import { 
  MapPin, 
  Info, 
  Compass, 
  Droplets, 
  Fish, 
  Mountain, 
  Layers, 
  Eye, 
  Maximize2, 
  X, 
  Zap, 
  Waves, 
  School,
  Sparkles,
  Camera,
  Navigation,
  Globe,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Award,
  ShieldCheck
} from 'lucide-react';

interface MekongMapProps {
  selectedLevel: EducationLevel;
  language?: Language;
  onExploreStation?: (station: RiverStation) => void;
}

// Major mainstream hydropower dams & hydrological works along the river
const HYDROPOWER_DAMS = [
  { name: 'Đập Tiểu Loan (Xiaowan)', country: 'Trung Quốc', x: 130, y: 125, capacity: '4 200 MW (Cao 292m)' },
  { name: 'Đập Cảnh Hồng (Jinghong)', country: 'Trung Quốc', x: 148, y: 155, capacity: '1 750 MW' },
  { name: 'Đập Xayaburi', country: 'Lào', x: 215, y: 230, capacity: '1 285 MW (Dòng chính Lào)' },
  { name: 'Đập Don Sahong', country: 'Lào', x: 305, y: 420, capacity: '260 MW (Gần Thác Khone)' },
  { name: 'Cống Cái Lớn - Cái Bé', country: 'Việt Nam', x: 330, y: 595, capacity: 'Kiểm soát mặn ĐBSCL' }
];

// Major geographic terrain elements
const GEOGRAPHIC_LANDMARKS = [
  { name: 'Dãy Tanggula (5.224m)', x: 75, y: 50, icon: '🏔️', type: 'mountain' },
  { name: 'Hẻm núi Tam Giang', x: 110, y: 110, icon: '⛰️', type: 'canyon' },
  { name: 'Cao nguyên Khorat', x: 190, y: 310, icon: '🏜️', type: 'plateau' },
  { name: 'Dãy Trường Sơn', x: 340, y: 280, icon: '⛰️', type: 'mountain' },
  { name: 'Biển Hồ Tonle Sap', x: 195, y: 460, icon: '🌊', type: 'lake' },
  { name: 'Đồng Tháp Mười', x: 345, y: 535, icon: '🌾', type: 'wetland' }
];

export const MekongMap: React.FC<MekongMapProps> = ({ selectedLevel, language = 'vi' }) => {
  const isEn = language === 'en';
  const [selectedStation, setSelectedStation] = useState<RiverStation>(RIVER_STATIONS[6]); // Mekong Delta default
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number | null>(5); // Vietnam default
  const [activeViewMode, setActiveViewMode] = useState<'map' | 'globe' | 'basin' | 'countries' | 'gallery'>('map');
  const [selectedEstuary, setSelectedEstuary] = useState<RiverEstuary | null>(RIVER_NINE_ESTUARIES[0]);
  const [hoveredEstuary, setHoveredEstuary] = useState<RiverEstuary | null>(null);
  const [estuaryFilterBranch, setEstuaryFilterBranch] = useState<'all' | 'Sông Tiền' | 'Sông Hậu'>('all');
  const [hoveredStation, setHoveredStation] = useState<RiverStation | null>(null);
  const [modalImage, setModalImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  // Object layer visibility toggles
  const [layers, setLayers] = useState({
    photos: true,
    dams: true,
    geography: true,
    estuaries: true,
    school: true
  });

  const handleSelectStation = (station: RiverStation) => {
    setSelectedStation(station);
    soundFx.playClick();
  };

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
    soundFx.playClick();
  };

  const filteredStations = activeRegionFilter === 'all'
    ? RIVER_STATIONS
    : RIVER_STATIONS.filter(s => s.regionType === activeRegionFilter);

  // Precise SVG coordinates mapped to 500x640 space
  const stationSvgCoords: Record<string, { x: number; y: number }> = {
    'source-tibet': { x: 85, y: 65 },
    'lancang-gorges': { x: 138, y: 135 },
    'golden-triangle': { x: 165, y: 190 },
    'luang-prabang': { x: 235, y: 245 },
    'khone-falls': { x: 310, y: 425 },
    'tonle-sap': { x: 275, y: 505 },
    'mekong-delta-vn': { x: 350, y: 575 }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner introducing the River System */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 rounded-2xl p-5 sm:p-7 text-white border border-emerald-300/30 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <Compass className="w-80 h-80 text-white" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold mb-3 backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5 text-orange-200" />
            <span>{isEn ? 'Visual Geographic Map & Field Observation of the Mekong River' : 'Bản Đồ Thể Hiện Trực Quan Đối Tượng & Hình Ảnh Thực Địa Sông Mê Kông'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 drop-shadow-xs">
            {isEn ? 'Mekong River Flow Journey & The Mekong Delta' : 'Hành Trình Dòng Chảy Sông Mê Kông & Châu Thổ Cửu Long'}
          </h1>
          <p className="text-emerald-50 text-sm leading-relaxed mb-4">
            {isEn 
              ? 'Visually explore the 4,763 km river course from Tibetan glacial sources (5,224m), through Yunnan canyons, Luang Prabang royal city, Khone Phapheng falls, Tonle Sap lake to the fertile Mekong Delta with 9 estuaries into the East Sea.' 
              : 'Khám phá trực quan toàn tuyến sông dài 4.763 km từ nguồn băng tuyết Tây Tạng (5.224m), qua chuỗi hẻm núi Vân Nam, cố đô Luang Prabang, ghềnh thác Khone Phapheng, Biển Hồ Tonle Sap đến vùng châu thổ trù phú với 9 cửa sông Cửu Long hòa vào Biển Đông.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white">
              <span className="text-[11px] text-emerald-100 block font-medium">{isEn ? 'Total Length' : 'Chiều dài tổng thể'}</span>
              <span className="text-lg font-bold text-white">4 763 km</span>
              <span className="text-[10px] text-emerald-100 block">{isEn ? '12th world, 3rd Asia' : 'Thứ 12 thế giới, thứ 3 châu Á'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white">
              <span className="text-[11px] text-emerald-100 block font-medium">{isEn ? 'Basin Area' : 'Diện tích lưu vực'}</span>
              <span className="text-lg font-bold text-white">810 000 km²</span>
              <span className="text-[10px] text-emerald-100 block">{isEn ? 'Source: MRC 2022' : 'Nguồn: MRC 2022 (SGK tr.6)'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white">
              <span className="text-[11px] text-emerald-100 block font-medium">{isEn ? 'Mean Annual Discharge' : 'Dòng chảy TB năm'}</span>
              <span className="text-lg font-bold text-white">475 {isEn ? 'billion m³' : 'tỉ m³'}</span>
              <span className="text-[10px] text-emerald-100 block">{isEn ? 'Flood season: 70 - 80%' : 'Mùa lũ chiếm 70 - 80%'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white">
              <span className="text-[11px] text-orange-100 block font-medium">{isEn ? 'School Location' : 'Vị trí trường'}</span>
              <span className="text-lg font-bold text-orange-200">FPT Hậu Giang</span>
              <span className="text-[10px] text-emerald-100 block">Vi Thuy, Hau Giang / Can Tho</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Toolbar & View Switcher */}
      <div className="bg-white rounded-2xl p-4 border border-orange-100/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* View Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex-wrap">
          <button
            id="btn-view-map"
            onClick={() => {
              setActiveViewMode('map');
              soundFx.playClick();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'map'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-200 font-semibold'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>🗺️ Bản Đồ Thủy Hệ (Dòng Chảy & 9 Cửa Sông)</span>
          </button>
          <button
            id="btn-view-globe"
            onClick={() => {
              setActiveViewMode('globe');
              soundFx.playWaterSplash();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'globe'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm ring-2 ring-teal-300'
                : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-200 font-semibold'
            }`}
          >
            <Globe className="w-3.5 h-3.5 animate-spin-slow" />
            <span>🌐 Quả Địa Cầu 3D (Dòng Chảy • Phù Sa)</span>
          </button>
          <button
            id="btn-view-basin"
            onClick={() => {
              setActiveViewMode('basin');
              soundFx.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'basin'
                ? 'bg-teal-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-teal-700 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Vị Trí & Lưu Vực 810.000 km²</span>
          </button>
          <button
            id="btn-view-countries"
            onClick={() => {
              setActiveViewMode('countries');
              soundFx.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'countries'
                ? 'bg-sky-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-sky-700 hover:bg-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>6 Quốc Gia Lưu Vực (MRC)</span>
          </button>
          <button
            id="btn-view-gallery"
            onClick={() => {
              setActiveViewMode('gallery');
              soundFx.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'gallery'
                ? 'bg-orange-500 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-orange-700 hover:bg-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Tuyến Ảnh Thực Địa HD</span>
          </button>
        </div>

        {/* Object Layer Visibility Toggles */}
        {activeViewMode === 'map' && (
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-slate-500 text-[11px] font-medium mr-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-orange-500" />
              Lớp hiển thị:
            </span>
            <button
              id="toggle-layer-photos"
              onClick={() => toggleLayer('photos')}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                layers.photos
                  ? 'bg-orange-50 border-orange-500 text-orange-800 font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-500 opacity-60'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Ảnh trạm</span>
            </button>
            <button
              id="toggle-layer-geography"
              onClick={() => toggleLayer('geography')}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                layers.geography
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-500 opacity-60'
              }`}
            >
              <Mountain className="w-3 h-3" />
              <span>Địa hình núi</span>
            </button>
            <button
              id="toggle-layer-dams"
              onClick={() => toggleLayer('dams')}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                layers.dams
                  ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-500 opacity-60'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Đập thủy điện</span>
            </button>
            <button
              id="toggle-layer-estuaries"
              onClick={() => toggleLayer('estuaries')}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                layers.estuaries
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-500 opacity-60'
              }`}
            >
              <Waves className="w-3 h-3" />
              <span>9 Cửa sông</span>
            </button>
            <button
              id="toggle-layer-school"
              onClick={() => toggleLayer('school')}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                layers.school
                  ? 'bg-orange-50 border-orange-500 text-orange-800 font-bold'
                  : 'bg-slate-100 border-slate-200 text-slate-500 opacity-60'
              }`}
            >
              <School className="w-3 h-3" />
              <span>FPT Hậu Giang</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeViewMode === 'globe' ? (
        <MekongGlobeMap language={language} onSwitchToMap={() => setActiveViewMode('map')} />
      ) : activeViewMode === 'map' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Detailed Object Vector Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-sm text-slate-800 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Sơ Đồ Đối Tượng & Thủy Hệ Sông Mê Kông</span>
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold border border-emerald-300 shadow-2xs">
                    🌏 Chảy qua 6 Quốc gia
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Các số <strong>1 → 7</strong> trên dòng sông là <strong>7 trạm mốc khảo sát thực địa</strong> (trong đó Trung Quốc gồm mốc 1 & 2; Lào gồm mốc 4 & 5).
                </p>
              </div>

              {/* Region Filter Chips */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                {[
                  { id: 'all', label: '7 Trạm mốc (6 Quốc gia)' },
                  { id: 'upstream', label: 'Thượng lưu (🇨🇳 TQ)' },
                  { id: 'midstream', label: 'Trung lưu (🇱🇦 🇹🇭 🇲🇲)' },
                  { id: 'downstream', label: 'Hạ lưu (🇰🇭 CPC)' },
                  { id: 'delta', label: 'Châu thổ (🇻🇳 VN)' }
                ].map(rf => (
                  <button
                    key={rf.id}
                    id={`filter-region-${rf.id}`}
                    onClick={() => {
                      setActiveRegionFilter(rf.id);
                      soundFx.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                      activeRegionFilter === rf.id
                        ? 'bg-teal-600 text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* River Basin SVG Canvas */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.6] bg-gradient-to-b from-sky-50 via-emerald-50/40 to-teal-50/60 rounded-xl border border-emerald-100 overflow-hidden flex items-center justify-center p-2 shadow-inner">
              <svg
                viewBox="0 0 500 640"
                className="w-full h-full select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Dynamic gradient for river flow */}
                  <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="25%" stopColor="#0ea5e9" />
                    <stop offset="50%" stopColor="#0d9488" />
                    <stop offset="75%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>

                  {/* Shading filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Circular clip-paths for real photographic station icons */}
                  {RIVER_STATIONS.map(station => (
                    <clipPath id={`clip-photo-${station.id}`} key={`clip-${station.id}`}>
                      <circle cx={stationSvgCoords[station.id]?.x || 100} cy={stationSvgCoords[station.id]?.y || 100} r="15" />
                    </clipPath>
                  ))}
                </defs>

                {/* Background Basin Boundary & Watershed hints */}
                <path
                  d="M 60 40 C 130 20, 240 60, 280 120 C 330 190, 360 270, 390 350 C 420 440, 440 540, 410 610 C 380 630, 310 635, 270 590 C 210 530, 160 420, 130 310 C 100 230, 50 140, 60 40 Z"
                  fill="#10b981"
                  fillOpacity="0.07"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  strokeOpacity="0.5"
                />

                {/* Territorial Zone Names */}
                <g opacity="0.75" fontSize="10" fontWeight="700" fill="#475569">
                  <text x="60" y="45">🇨🇳 TRUNG QUỐC (TÂY TẠNG - VÂN NAM)</text>
                  <text x="25" y="195">🇲🇲 MYANMAR</text>
                  <text x="285" y="215">🇱🇦 LÀO</text>
                  <text x="75" y="325">🇹🇭 THÁI LAN</text>
                  <text x="135" y="445">🇰🇭 CAMPUCHIA</text>
                  <text x="315" y="550" fill="#047857" fontSize="11" fontWeight="800">🇻🇳 VIỆT NAM (ĐBSCL)</text>
                </g>

                {/* Geographic Objects Layer (Mountains, Plateaus, Gorges) */}
                {layers.geography && (
                  <g id="layer-geography" className="transition-opacity">
                    {GEOGRAPHIC_LANDMARKS.map(geo => (
                      <g key={geo.name}>
                        <rect
                          x={geo.x - 4}
                          y={geo.y - 12}
                          width={geo.name.length * 5.8 + 22}
                          height="16"
                          rx="4"
                          fill="#ffffff"
                          fillOpacity="0.95"
                          stroke="#cbd5e1"
                          strokeWidth="0.8"
                          className="shadow-2xs"
                        />
                        <text x={geo.x - 1} y={geo.y} fontSize="9">
                          {geo.icon}
                        </text>
                        <text x={geo.x + 13} y={geo.y} fill="#1e293b" fontSize="8" fontWeight="600">
                          {geo.name}
                        </text>
                      </g>
                    ))}
                  </g>
                )}

                {/* River Flow Direction Indicators (Animation arrows) */}
                <g stroke="#0284c7" strokeWidth="1.5" opacity="0.8">
                  <path d="M 115 105 L 122 112 L 115 119" fill="none" />
                  <path d="M 185 210 L 195 218 L 188 226" fill="none" />
                  <path d="M 270 340 L 278 350 L 270 358" fill="none" />
                  <path d="M 312 450 L 308 462 L 300 455" fill="none" />
                </g>

                {/* Mainstream River Depth Underlay */}
                <path
                  d="M 85 65 
                     C 120 95, 140 125, 140 150 
                     C 140 175, 160 185, 170 205 
                     C 195 235, 230 240, 245 260 
                     C 265 285, 260 320, 280 360 
                     C 300 395, 312 410, 310 435 
                     C 308 460, 275 480, 280 505 
                     C 285 530, 325 550, 350 575"
                  stroke="#99f6e4"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.6"
                />

                {/* Glowing Active Riverbed */}
                <path
                  d="M 85 65 
                     C 120 95, 140 125, 140 150 
                     C 140 175, 160 185, 170 205 
                     C 195 235, 230 240, 245 260 
                     C 265 285, 260 320, 280 360 
                     C 300 395, 312 410, 310 435 
                     C 308 460, 275 480, 280 505 
                     C 285 530, 325 550, 350 575"
                  stroke="url(#riverGradient)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                />

                {/* Tonle Sap Lake Body & Reversible River Confluence */}
                <g id="tonle-sap-lake-body">
                  <ellipse
                    cx="205"
                    cy="465"
                    rx="50"
                    ry="26"
                    fill="#38bdf8"
                    fillOpacity="0.35"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text x="175" y="468" fill="#0369a1" fontSize="10" fontWeight="bold">Biển Hồ Tonle Sap</text>
                  <text x="170" y="480" fill="#0284c7" fontSize="8">(Bể điều hòa tự nhiên ĐBSCL)</text>

                  {/* Tonle Sap River connecting to Phnom Penh (Chaktomuk confluence) */}
                  <path
                    d="M 250 472 C 265 480, 272 490, 280 505"
                    stroke="#0284c7"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  {/* Flow reversal indicator */}
                  <text x="215" y="505" fill="#d97706" fontSize="8" fontWeight="bold">
                    Dòng đảo chiều ⇄
                  </text>
                </g>

                {/* Mekong Delta: Splitting into Tien River & Hau River at Tan Chau / An Giang */}
                <g id="vietnam-delta-branches">
                  {/* Tien River (Sông Tiền) */}
                  <path
                    d="M 350 575 C 370 580, 395 585, 415 588"
                    stroke="#059669"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Hau River (Sông Hậu) */}
                  <path
                    d="M 350 575 C 345 595, 360 610, 385 625"
                    stroke="#047857"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <text x="380" y="582" fill="#065f46" fontSize="8" fontWeight="700">Sông Tiền</text>
                  <text x="340" y="628" fill="#065f46" fontSize="8" fontWeight="700">Sông Hậu</text>
                </g>

                {/* 9 Estuaries Fan Out (Cửu Long Giang) */}
                {layers.estuaries && (
                  <g id="nine-estuaries-layer">
                    {RIVER_NINE_ESTUARIES.map(est => {
                      const isEstSelected = selectedEstuary?.id === est.id;
                      const isEstHovered = hoveredEstuary?.id === est.id;
                      const isTien = est.branch === 'Sông Tiền';
                      const strokeColor = isEstSelected
                        ? '#d97706' // amber-600
                        : isEstHovered
                        ? '#0284c7' // sky-600
                        : isTien
                        ? '#059669' // emerald-600
                        : '#0d9488'; // teal-600

                      return (
                        <g
                          key={est.id}
                          id={`svg-estuary-${est.id}`}
                          className="cursor-pointer group"
                          onClick={() => {
                            setSelectedEstuary(est);
                            soundFx.playClick();
                          }}
                          onMouseEnter={() => setHoveredEstuary(est)}
                          onMouseLeave={() => setHoveredEstuary(null)}
                        >
                          {/* Pulsing indicator if selected */}
                          {isEstSelected && (
                            <circle
                              cx={est.svgCoords.x2}
                              cy={est.svgCoords.y2}
                              r="10"
                              fill="#f59e0b"
                              opacity="0.35"
                              className="animate-ping"
                            />
                          )}

                          {/* Estuary river branch path */}
                          <line
                            x1={est.svgCoords.x1}
                            y1={est.svgCoords.y1}
                            x2={est.svgCoords.x2}
                            y2={est.svgCoords.y2}
                            stroke={strokeColor}
                            strokeWidth={isEstSelected ? "3.6" : isEstHovered ? "3.0" : "2.2"}
                            strokeLinecap="round"
                            strokeDasharray={est.isHistoricalSedimented ? "3 2" : "none"}
                            opacity={est.isHistoricalSedimented ? 0.75 : 0.95}
                          />

                          {/* Dam marker on Ba Lai if dammed */}
                          {est.isDammed && (
                            <rect
                              x={(est.svgCoords.x1 + est.svgCoords.x2) / 2 - 2}
                              y={(est.svgCoords.y1 + est.svgCoords.y2) / 2 - 3}
                              width="4"
                              height="6"
                              fill="#ef4444"
                              stroke="#ffffff"
                              strokeWidth="0.8"
                              rx="1"
                            />
                          )}

                          {/* Estuary mouth pin */}
                          <circle
                            cx={est.svgCoords.x2}
                            cy={est.svgCoords.y2}
                            r={isEstSelected ? "4.5" : isEstHovered ? "4" : "3"}
                            fill={isEstSelected ? "#f59e0b" : isTien ? "#10b981" : "#06b6d4"}
                            stroke="#ffffff"
                            strokeWidth="1.2"
                          />

                          {/* Number badge & name label */}
                          <text
                            x={est.svgCoords.labelX}
                            y={est.svgCoords.labelY}
                            fill={isEstSelected ? "#b45309" : "#1e293b"}
                            fontSize={isEstSelected ? "7.5" : "6.5"}
                            fontWeight={isEstSelected ? "800" : "700"}
                          >
                            {est.number}. {est.name.replace('Cửa ', '')}
                            {est.isDammed ? ' (đập)' : ''}
                            {est.isHistoricalSedimented ? ' (bồi)' : ''}
                          </text>
                        </g>
                      );
                    })}

                    <text x="430" y="555" fill="#b45309" fontSize="8" fontWeight="800" stroke="none">
                      9 CỬA SÔNG (CỬU LONG GIANG)
                    </text>
                    <text x="435" y="658" fill="#0284c7" fontSize="9" fontWeight="900" stroke="none">
                      BIỂN ĐÔNG
                    </text>
                  </g>
                )}

                {/* Hydropower Dams Layer */}
                {layers.dams && (
                  <g id="hydropower-dams-layer">
                    {HYDROPOWER_DAMS.map(dam => (
                      <g key={dam.name} className="cursor-help">
                        <circle cx={dam.x} cy={dam.y} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                        <rect
                          x={dam.x + 8}
                          y={dam.y - 7}
                          width={dam.name.length * 5.2 + 8}
                          height="14"
                          rx="3"
                          fill="#ffffff"
                          fillOpacity="0.95"
                          stroke="#f59e0b"
                          strokeWidth="0.8"
                        />
                        <text x={dam.x + 12} y={dam.y + 3} fill="#b45309" fontSize="7.5" fontWeight="600">
                          ⚡ {dam.name}
                        </text>
                      </g>
                    ))}
                  </g>
                )}

                {/* School Marker Layer: Trường TH, THCS & THPT FPT Hậu Giang */}
                {layers.school && (
                  <g id="fpt-school-pin" className="cursor-pointer">
                    <circle cx="340" cy="605" r="14" fill="#f97316" fillOpacity="0.25" className="animate-ping" />
                    <circle cx="340" cy="605" r="7" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
                    <rect
                      x="230"
                      y="612"
                      width="155"
                      height="20"
                      rx="5"
                      fill="#fff7ed"
                      stroke="#ea580c"
                      strokeWidth="1.2"
                    />
                    <text x="236" y="625" fill="#9a3412" fontSize="8.5" fontWeight="bold">
                      🏫 FPT HẬU GIANG (Vị Thủy)
                    </text>
                  </g>
                )}

                {/* Station Nodes on Map (Photographic Thumbnails or Markers) */}
                {RIVER_STATIONS.map((station, idx) => {
                  const isSelected = selectedStation.id === station.id;
                  const pos = stationSvgCoords[station.id] || { x: 100, y: 100 };

                  return (
                    <g
                      key={station.id}
                      id={`map-node-${station.id}`}
                      className="cursor-pointer transition-transform hover:scale-110"
                      onClick={() => handleSelectStation(station)}
                      onMouseEnter={() => setHoveredStation(station)}
                      onMouseLeave={() => setHoveredStation(null)}
                    >
                      {/* Pulsing outer aura if selected */}
                      {isSelected && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="22"
                          fill="#10b981"
                          opacity="0.35"
                          className="animate-ping"
                        />
                      )}

                      {/* If photo layer enabled and image exists, render photo circular badge */}
                      {layers.photos && station.image ? (
                        <g>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="16"
                            fill={isSelected ? '#059669' : '#0d9488'}
                            stroke={isSelected ? '#10b981' : '#ffffff'}
                            strokeWidth={isSelected ? 3 : 2}
                          />
                          <image
                            href={station.image}
                            x={pos.x - 15}
                            y={pos.y - 15}
                            width="30"
                            height="30"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath={`url(#clip-photo-${station.id})`}
                          />
                          {/* Mini index badge */}
                          <circle
                            cx={pos.x - 11}
                            cy={pos.y - 11}
                            r="6"
                            fill="#047857"
                            stroke="#ffffff"
                            strokeWidth="1"
                          />
                          <text
                            x={pos.x - 11}
                            y={pos.y - 8}
                            fill="#ffffff"
                            fontSize="7"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {idx + 1}
                          </text>
                        </g>
                      ) : (
                        <g>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={isSelected ? 10 : 7}
                            fill={isSelected ? '#059669' : '#0284c7'}
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 3}
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {idx + 1}
                          </text>
                        </g>
                      )}

                      {/* Station Label Badge */}
                      <rect
                        x={pos.x + 16}
                        y={pos.y - 10}
                        width={station.name.length * 5.4 + 14}
                        height="19"
                        rx="5"
                        fill={isSelected ? '#065f46' : '#ffffff'}
                        stroke={isSelected ? '#10b981' : '#cbd5e1'}
                        strokeWidth="1.2"
                        opacity="0.95"
                        className="shadow-xs"
                      />
                      <text
                        x={pos.x + 22}
                        y={pos.y + 3}
                        fill={isSelected ? '#ffffff' : '#1e293b'}
                        fontSize="9"
                        fontWeight="700"
                      >
                        {station.flag} {station.name.split('(')[0].trim()}
                      </text>
                    </g>
                  );
                })}

                {/* Visual Legend: 6 Basin Countries vs 7 Stations */}
                <g id="map-legend-box" transform="translate(15, 570)">
                  <rect
                    width="190"
                    height="58"
                    rx="8"
                    fill="#ffffff"
                    fillOpacity="0.95"
                    stroke="#94a3b8"
                    strokeWidth="0.8"
                    className="shadow-xs"
                  />
                  <text x="8" y="15" fontSize="8.5" fontWeight="800" fill="#047857">
                    🌏 LƯU VỰC 6 QUỐC GIA
                  </text>
                  <text x="8" y="29" fontSize="8" fill="#334155">
                    🇨🇳 TQ • 🇲🇲 Myanmar • 🇱🇦 Lào
                  </text>
                  <text x="8" y="42" fontSize="8" fill="#334155">
                    🇹🇭 Thái Lan • 🇰🇭 Campuchia • 🇻🇳 VN
                  </text>
                  <g transform="translate(155, 10)">
                    <circle cx="12" cy="12" r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="12" y="15" fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">1-7</text>
                    <text x="12" y="34" fontSize="7" fontWeight="700" fill="#0284c7" textAnchor="middle">7 Trạm mốc</text>
                  </g>
                </g>
              </svg>

              {/* Inset Compass Indicator */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl border border-slate-200 text-[11px] text-slate-700 flex items-center gap-2 pointer-events-none shadow-xs">
                <Compass className="w-4 h-4 text-teal-600 animate-spin-slow" />
                <span>Bắc (Tây Tạng) → Nam (Biển Đông)</span>
              </div>

              {/* Hover Quick Insight Overlay */}
              {hoveredStation && hoveredStation.id !== selectedStation.id && (
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 p-2.5 rounded-xl border border-teal-500/60 shadow-lg backdrop-blur-md flex items-center gap-3 pointer-events-none">
                  {hoveredStation.image && (
                    <img
                      src={hoveredStation.image}
                      alt={hoveredStation.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-teal-900 block truncate">
                      {hoveredStation.flag} {hoveredStation.name}
                    </span>
                    <span className="text-[11px] text-slate-600 line-clamp-1">
                      {hoveredStation.highlight}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Station Selector Pill Carousel with explicit country tags */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {filteredStations.map((st) => {
                const stationNum = RIVER_STATIONS.findIndex(s => s.id === st.id) + 1;
                const countryTag = 
                  st.id === 'source-tibet' ? '🇨🇳 Trung Quốc' :
                  st.id === 'lancang-gorges' ? '🇨🇳 Trung Quốc' :
                  st.id === 'golden-triangle' ? '🇱🇦🇹🇭🇲🇲 3 Nước' :
                  st.id === 'luang-prabang' ? '🇱🇦 Lào' :
                  st.id === 'khone-falls' ? '🇱🇦 Lào' :
                  st.id === 'tonle-sap' ? '🇰🇭 Campuchia' : '🇻🇳 Việt Nam';
                return (
                  <button
                    key={st.id}
                    id={`pill-station-${st.id}`}
                    onClick={() => handleSelectStation(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedStation.id === st.id
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Mốc {stationNum}. {st.name.split('(')[0].trim()}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      selectedStation.id === st.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {countryTag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Station Inspector Card with HD Real-World Visuals */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm text-slate-800">
              {/* Station Hero Image Banner */}
              {selectedStation.image && (
                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 group border border-slate-200 shadow-xs">
                  <img
                    src={selectedStation.image}
                    alt={selectedStation.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Photo Caption Badge */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white bg-slate-900/80 px-2.5 py-0.5 rounded backdrop-blur-sm border border-white/20">
                      📸 Hình ảnh thực địa khúc sông Mê Kông
                    </span>
                    <button
                      id="btn-inspect-image-modal"
                      onClick={() =>
                        setModalImage({
                          src: selectedStation.image!,
                          title: selectedStation.name,
                          caption: selectedStation.highlight
                        })
                      }
                      className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                      title="Phóng to ảnh HD"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Title & Region Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                    {selectedStation.regionType === 'upstream' && '🏔️ Vùng Thượng Lưu (Núi dốc)'}
                    {selectedStation.regionType === 'midstream' && '🏞️ Vùng Trung Lưu (Thung lũng)'}
                    {selectedStation.regionType === 'downstream' && '🌊 Vùng Hạ Lưu (Đồng bằng)'}
                    {selectedStation.regionType === 'delta' && '🌾 Vùng Châu Thổ (ĐBSCL & Cửu Long)'}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1.5">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium">
                    {selectedStation.flag} {selectedStation.vietnameseName}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block">Cách thượng nguồn</span>
                  <span className="text-sm font-extrabold text-amber-600">
                    {selectedStation.lengthFromSourceKm === 0 ? '0 km (Nguồn)' : `~${selectedStation.lengthFromSourceKm.toLocaleString()} km`}
                  </span>
                </div>
              </div>

              {/* Physical Geographic Object Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Độ cao địa hình (m)</span>
                  <span className="font-bold text-teal-800 flex items-center gap-1 mt-0.5">
                    <Mountain className="w-3.5 h-3.5 text-teal-600" />
                    {selectedStation.elevation || 'Đang cập nhật'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Màu sắc nước sông</span>
                  <span className="font-bold text-amber-800 flex items-center gap-1 mt-0.5">
                    <Droplets className="w-3.5 h-3.5 text-amber-600" />
                    {selectedStation.waterColor || 'Phù sa tự nhiên'}
                  </span>
                </div>
              </div>

              {/* Explicit Geographic Sub-objects at this location */}
              {selectedStation.subObjects && (
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-emerald-800 block mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    Đối tượng địa lí & Thủy văn trọng điểm:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStation.subObjects.map(obj => (
                      <span
                        key={obj}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-medium"
                      >
                        • {obj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlight Box */}
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 mb-3 leading-relaxed">
                <span className="font-bold text-emerald-800 block mb-1">Đặc điểm nhận diện trực quan:</span>
                {selectedStation.highlight}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {selectedStation.details}
              </p>

              {/* Ecological Fact Box */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 mb-3">
                <Fish className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-900">Hệ sinh thái & Đa dạng sinh học:</span>
                  <p className="text-slate-600 mt-0.5">{selectedStation.ecologicalFact}</p>
                </div>
              </div>

              {/* Grade-tailored pedagogical commentary */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-teal-600" />
                    {isEn ? 'Study Corner' : 'Góc học tập'}: {
                      selectedLevel === 'primary' 
                        ? (isEn ? 'Primary' : 'Tiểu học') 
                        : selectedLevel === 'secondary' 
                        ? (isEn ? 'Secondary' : 'THCS') 
                        : (isEn ? 'Grade 11 Geography' : 'Chuyên đề Địa lí 11')
                    }
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {selectedLevel === 'highschool' ? (isEn ? 'Curriculum Focus' : 'Trọng tâm bài thi SGK') : (isEn ? 'Core Knowledge' : 'Kiến thức cốt lõi')}
                  </span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {selectedStation.curriculumGradeNote[selectedLevel]}
                </p>
              </div>
            </div>

            {/* 9 Estuaries Interactive Control & Inspector (Cửu Long Giang) */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isEn ? '9 Estuaries of Mekong Delta' : 'Chín Cửa Sông Cửu Long (Cửu Long Giang)'}</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 block">
                    {isEn ? '6 branches on Tien River, 3 branches on Hau River' : '6 cửa thuộc Sông Tiền, 3 cửa thuộc Sông Hậu'}
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  9 / 9 Cửa
                </span>
              </div>

              {/* Branch Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  onClick={() => {
                    setEstuaryFilterBranch('all');
                    soundFx.playClick();
                  }}
                  className={`flex-1 py-1 rounded text-center font-bold text-[11px] transition-all cursor-pointer ${
                    estuaryFilterBranch === 'all'
                      ? 'bg-white text-emerald-800 shadow-2xs'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  Tất cả (9)
                </button>
                <button
                  onClick={() => {
                    setEstuaryFilterBranch('Sông Tiền');
                    soundFx.playClick();
                  }}
                  className={`flex-1 py-1 rounded text-center font-bold text-[11px] transition-all cursor-pointer ${
                    estuaryFilterBranch === 'Sông Tiền'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  S. Tiền (6)
                </button>
                <button
                  onClick={() => {
                    setEstuaryFilterBranch('Sông Hậu');
                    soundFx.playClick();
                  }}
                  className={`flex-1 py-1 rounded text-center font-bold text-[11px] transition-all cursor-pointer ${
                    estuaryFilterBranch === 'Sông Hậu'
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-teal-700'
                  }`}
                >
                  S. Hậu (3)
                </button>
              </div>

              {/* 9 Estuaries Buttons Grid */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {RIVER_NINE_ESTUARIES
                  .filter(est => estuaryFilterBranch === 'all' || est.branch === estuaryFilterBranch)
                  .map((est) => {
                    const isSelected = selectedEstuary?.id === est.id;
                    const isTien = est.branch === 'Sông Tiền';
                    return (
                      <button
                        key={est.id}
                        id={`btn-estuary-${est.id}`}
                        onClick={() => {
                          setSelectedEstuary(est);
                          soundFx.playClick();
                        }}
                        className={`p-1.5 rounded-lg border text-[11px] transition-all text-left flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-bold'
                            : isTien
                            ? 'bg-emerald-50/70 hover:bg-emerald-100/80 border-emerald-200 text-emerald-900'
                            : 'bg-teal-50/70 hover:bg-teal-100/80 border-teal-200 text-teal-900'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-[10px] font-extrabold ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                            #{est.number}
                          </span>
                          {est.isDammed && (
                            <span className={`text-[8px] px-1 rounded font-semibold ${isSelected ? 'bg-amber-700 text-white' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                              Đập
                            </span>
                          )}
                          {est.isHistoricalSedimented && (
                            <span className={`text-[8px] px-1 rounded font-semibold ${isSelected ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                              Bồi
                            </span>
                          )}
                        </div>
                        <span className="font-bold truncate mt-0.5">{est.name.replace('Cửa ', '')}</span>
                        <span className={`text-[9px] truncate block ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                          {est.province.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
              </div>

              {/* Selected Estuary Detailed Inspector Card */}
              {selectedEstuary && (
                <div className="p-3 bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-xl border border-emerald-200 text-xs space-y-2 mt-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 block uppercase">
                        Cửa sông số {selectedEstuary.number} / 9
                      </span>
                      <h5 className="text-sm font-bold text-slate-900">
                        {selectedEstuary.vietnameseFull}
                      </h5>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white text-emerald-800 border border-emerald-200">
                      {selectedEstuary.branch}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[9px] text-slate-500 block">Địa bàn tỉnh:</span>
                      <span className="font-semibold text-slate-800">{selectedEstuary.province}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">Phân lưu dòng chảy:</span>
                      <span className="font-semibold text-slate-800">{selectedEstuary.subBranch}</span>
                    </div>
                  </div>

                  <div className="text-[11px] bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[9px] text-slate-500 block">Hiện trạng thủy văn:</span>
                    <span className={`font-semibold block ${
                      selectedEstuary.isDammed 
                        ? 'text-red-700' 
                        : selectedEstuary.isHistoricalSedimented 
                        ? 'text-amber-700' 
                        : 'text-emerald-700'
                    }`}>
                      {selectedEstuary.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">
                    {selectedEstuary.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Geography & Basin Scope Summary Banner */}
        <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-1">
                <Globe className="w-3 h-3 text-emerald-600" />
                <span>Trọng Tâm SGK Địa Lí 11 (Chuyên Đề Sông Mê Kông - Trang 6-12)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Hồ Sơ Địa Lí: Vị Trí Địa Lí, Phạm Vi Lưu Vực & 6 Quốc Gia Liên Quan
              </h3>
            </div>
            <button
              onClick={() => {
                setActiveViewMode('basin');
                soundFx.playClick();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Xem Thuyết Minh Lưu Vực Toàn Diện</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Box 1: Vị trí địa lí */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. Vị Trí Địa Lí</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
                <li><strong className="text-slate-800">Tọa độ lưu vực:</strong> {MEKONG_GEOGRAPHY_SCOPE.geographicalLocation.coordinates}</li>
                <li><strong className="text-slate-800">Khởi nguồn:</strong> {MEKONG_GEOGRAPHY_SCOPE.geographicalLocation.origin}</li>
                <li><strong className="text-slate-800">Cửa sông:</strong> {MEKONG_GEOGRAPHY_SCOPE.geographicalLocation.mouth}</li>
                <li><strong className="text-slate-800">Vị thế:</strong> {MEKONG_GEOGRAPHY_SCOPE.geographicalLocation.regionalLocation}</li>
              </ul>
            </div>

            {/* Box 2: Phạm vi lưu vực */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-teal-800 text-xs">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>2. Phạm Vi Lưu Vực (Quy Mô)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center my-1">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Diện tích</span>
                  <span className="font-bold text-teal-800 text-xs">810 000 km²</span>
                  <span className="text-[9px] text-slate-400 block">Hạng 21 thế giới</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Chiều dài</span>
                  <span className="font-bold text-teal-800 text-xs">4 763 km</span>
                  <span className="text-[9px] text-slate-400 block">Hạng 12 thế giới</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Thượng lưu vực (24% diện tích):</strong> Trung Quốc, Mi-an-ma.<br />
                <strong className="text-slate-800">Hạ lưu vực (76% diện tích):</strong> Lào, Thái Lan, Campuchia, Việt Nam.
              </p>
            </div>

            {/* Box 3: 6 Quốc gia liên quan */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-sky-800 text-xs">
                <Droplets className="w-3.5 h-3.5 text-sky-600" />
                <span>3. 6 Quốc Gia Liên Quan (Lưu Vực)</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {SIX_COUNTRIES_INFO.map(c => (
                  <div key={c.name} className="p-1 rounded bg-slate-50 border border-slate-200 text-[10px]">
                    <span className="text-sm block">{c.flag}</span>
                    <span className="font-bold text-slate-800 block truncate">{c.name}</span>
                    <span className="text-teal-700 font-bold block">{c.shareOfBasinArea}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 italic pt-1 text-center">
                Lào (25%), Thái Lan (23%), Trung Quốc (21%), Campuchia (20%), Việt Nam (8%), Myanmar (3%)
              </p>
            </div>
          </div>
        </div>
      </div>
      ) : activeViewMode === 'basin' ? (
        /* Full Basin & Geographic Scope Dedicated View */
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-4xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
                <Globe className="w-3.5 h-3.5 text-teal-200" />
                <span>Chuyên Đề Địa Lí Lớp 11: Lưu Vực Sông Mê Kông</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Vị Trí Địa Lí, Phạm Vi Lưu Vực & Nhịp Điệu Thủy Văn Sông Mê Kông
              </h2>
              <p className="text-teal-50 text-sm leading-relaxed">
                Nắm vững hệ thống kiến thức chuẩn xác theo Sách Giáo Khoa Địa lí 11 (bộ sách Kết nối tri thức & Cánh Diều) và các báo cáo hiện đại nhất từ Ủy hội sông Mê Công quốc tế (MRC 2022).
              </p>
            </div>
          </div>

          {/* Module 1: Vị Trí Địa Lí Chi Tiết */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>1. Vị Trí Địa Lí Của Sông Mê Kông</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                  <Compass className="w-4 h-4 text-emerald-700" />
                  <span>Tọa Độ & Không Gian Địa Lí</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Lưu vực sông Mê Kông trải dài gần 25 vĩ độ, từ khoảng <strong className="text-emerald-950 font-bold">8°30'B đến 33°50'B</strong> và từ kinh độ <strong className="text-emerald-950 font-bold">94°Đ đến 106°Đ</strong>.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Trải dài qua nhiều đới và kiểu khí hậu đặc sắc: từ khí hậu núi cao băng tuyết cận cực trên sơn nguyên Tây Tạng, qua đới ôn đới gió mùa núi cao Vân Nam, đến khí hậu nhiệt đới gió mùa cận xích đạo nóng ẩm tại hạ lưu vực.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-2 text-xs">
                <div className="font-bold text-teal-900 flex items-center gap-1.5 text-sm">
                  <Navigation className="w-4 h-4 text-teal-700" />
                  <span>Điểm Đầu, Điểm Cuối & Vị Thế Quốc Tế</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 leading-relaxed">
                  <li>
                    <strong className="text-slate-900">Điểm khởi nguồn:</strong> Bắt nguồn từ các sông băng vĩnh cửu trên sườn bắc dãy núi Tanggula (sơn nguyên Thanh Tạng, tỉnh Thanh Hải, Trung Quốc) ở độ cao trên 5.224 m.
                  </li>
                  <li>
                    <strong className="text-slate-900">Điểm đổ ra biển:</strong> Đổ ra Biển Đông qua hệ thống châu thổ màu mỡ với 9 cửa sông (Cửu Long Giang) tại Việt Nam.
                  </li>
                  <li>
                    <strong className="text-slate-900">Vị thế khu vực:</strong> Là con sông quốc tế dài nhất Đông Nam Á, giữ vai trò huyết mạch an ninh lương thực, sinh thái và năng lượng của cả vùng Đông Á và Đông Nam Á.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Module 2: Phạm Vi Lưu Vực & Bảng Đối Chiếu Thượng Lưu vs Hạ Lưu */}
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <span>2. Phạm Vi Lưu Vực & Phân Vùng Tự Nhiên (810.000 km²)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Toàn bộ lưu vực sông Mê Kông rộng khoảng 810.000 km², được phân chia tự nhiên thành hai bộ phận có đặc tính địa hình, thủy văn và kinh tế - xã hội hoàn toàn khác biệt:
                </p>
              </div>
            </div>

            {/* Key Metric Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">Tổng diện tích lưu vực</span>
                <span className="text-lg font-extrabold text-teal-800">810 000 km²</span>
                <span className="text-[10px] text-emerald-700 font-bold block">Hạng 21 thế giới</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">Tổng chiều dài dòng chính</span>
                <span className="text-lg font-extrabold text-teal-800">4 763 km</span>
                <span className="text-[10px] text-emerald-700 font-bold block">Hạng 12 TG, 3 Châu Á</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">Tổng lượng dòng chảy TB</span>
                <span className="text-lg font-extrabold text-teal-800">475 tỉ m³/năm</span>
                <span className="text-[10px] text-emerald-700 font-bold block">Hạng 8 thế giới</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">Dân số phụ thuộc</span>
                <span className="text-lg font-extrabold text-orange-600">&gt; 65 triệu</span>
                <span className="text-[10px] text-slate-500 block">&gt; 100 nhóm dân tộc</span>
              </div>
            </div>

            {/* Comparative Table: Upper Basin vs Lower Basin */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-800 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-slate-200 w-1/4">Tiêu chí so sánh</th>
                    <th className="p-3 border-b border-slate-200 w-3/8 bg-amber-50/70 text-amber-950">
                      Thượng Lưu Vực (Sông Lan Thương)
                    </th>
                    <th className="p-3 border-b border-slate-200 w-3/8 bg-teal-50/70 text-teal-950">
                      Hạ Lưu Vực (Lower Mekong Basin - LMB)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-bold bg-slate-50 text-slate-900">Tỉ lệ diện tích lưu vực</td>
                    <td className="p-3 bg-amber-50/30 font-semibold text-amber-900">
                      24% tổng diện tích (~195.000 km²)
                    </td>
                    <td className="p-3 bg-teal-50/30 font-semibold text-teal-900">
                      76% tổng diện tích (~615.000 km²)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50 text-slate-900">Đóng góp lượng dòng chảy</td>
                    <td className="p-3 bg-amber-50/30 font-semibold text-amber-900">
                      18% tổng lượng nước hàng năm
                    </td>
                    <td className="p-3 bg-teal-50/30 font-semibold text-teal-900">
                      82% tổng lượng nước hàng năm
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50 text-slate-900">Đóng góp trầm tích (phù sa)</td>
                    <td className="p-3 bg-amber-50/30">
                      Chiếm trên 50% tổng lượng trầm tích cát sỏi thô và bùn khoáng nuôi dưỡng lòng sông.
                    </td>
                    <td className="p-3 bg-teal-50/30">
                      Cung cấp phù sa mịn hữu cơ bồi tụ nên các cánh đồng ngập lũ và vùng bờ biển châu thổ.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50 text-slate-900">Quốc gia trong phân vùng</td>
                    <td className="p-3 bg-amber-50/30 font-medium">
                      🇨🇳 Trung Quốc (21%), 🇲🇲 Mi-an-ma (3%)
                    </td>
                    <td className="p-3 bg-teal-50/30 font-medium">
                      🇱🇦 Lào (25%), 🇹🇭 Thái Lan (23%), 🇰🇭 Campuchia (20%), 🇻🇳 Việt Nam (8%)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50 text-slate-900">Đặc điểm địa hình & dòng chảy</td>
                    <td className="p-3 bg-amber-50/30">
                      Hẻm vực núi cao sâu hiểm trở, độ dốc dòng sông lớn, dòng chảy xiết, tiềm năng thủy điện bậc thang cực lớn.
                    </td>
                    <td className="p-3 bg-teal-50/30">
                      Địa hình thoải dần, chuyển tiếp từ cao nguyên lượn sóng sang đồng bằng châu thổ thấp phẳng màu mỡ và mạng kênh rạch chằng chịt.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Module 3: Chế Độ Nước (Thủy Văn) & Cơ Chế Điều Hòa Biển Hồ */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Waves className="w-5 h-5 text-emerald-600" />
              <span>3. Chế Độ Nước (Thủy Văn) & Cơ Chế Điều Hòa Biển Hồ Tonle Sap</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-2">
                <h4 className="font-bold text-sky-950 text-sm flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  <span>Mùa Lũ & Mùa Cạn Rõ Rệt Theo Gió Mùa</span>
                </h4>
                <ul className="space-y-1.5 text-slate-700 leading-relaxed">
                  <li>
                    <strong className="text-sky-900">Mùa lũ (Tháng 6 – 11):</strong> Chiếm tới 75% – 80% tổng lưu lượng cả năm. Đỉnh lũ thường xuất hiện vào tháng 8 – tháng 10, mang lại nguồn phù sa màu mỡ và nguồn lợi thủy sản khổng lồ cho ĐBSCL.
                  </li>
                  <li>
                    <strong className="text-amber-900">Mùa cạn (Tháng 12 – 5 năm sau):</strong> Chỉ chiếm khoảng 20% – 25% lượng nước. Lòng sông kiệt nước, triều cường Biển Đông đẩy mặn lấn sâu vào nội đồng 50–90 km.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-2">
                <h4 className="font-bold text-teal-950 text-sm flex items-center gap-1.5">
                  <Fish className="w-4 h-4 text-teal-600" />
                  <span>Cơ Chế "Dòng Sông Chảy Ngược" Của Biển Hồ Tonle Sap</span>
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Biển Hồ Tonle Sap (Campuchia) là một trong những kỳ quan thủy văn tự nhiên độc nhất vô nhị trên thế giới:
                </p>
                <ul className="space-y-1 text-slate-700 leading-relaxed">
                  <li>
                    • <strong className="text-teal-950">Mùa lũ:</strong> Nước sông Mê Kông dâng cao dồn ngược vào sông Tonle Sap chảy vào Biển Hồ, làm diện tích hồ phình to gấp 6 lần (từ 2.500 km² lên tới 16.000 km²), giảm áp lực ngập lụt cho hạ du.
                  </li>
                  <li>
                    • <strong className="text-teal-950">Mùa cạn:</strong> Biển Hồ xả ngược nước ra dòng chính Mê Kông, bổ sung nguồn nước ngọt cứu khát và đẩy mặn cho toàn bộ vùng châu thổ ĐBSCL của Việt Nam.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Module 4: 9 Cửa Sông Cửu Long Toàn Diện */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Waves className="w-5 h-5 text-emerald-600" />
                  <span>4. Hệ Thống 9 Cửa Sông Cửu Long (Cửu Long Giang) Đổ Ra Biển Đông</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Sông Mê Kông khi chảy vào Việt Nam tại Tân Châu và Hồng Ngự tách thành hai dòng chính: Sông Tiền (6 cửa) và Sông Hậu (3 cửa).
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveViewMode('map');
                  soundFx.playClick();
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Xem Trên Bản Đồ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {RIVER_NINE_ESTUARIES.map(est => {
                const isTien = est.branch === 'Sông Tiền';
                return (
                  <div
                    key={est.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all text-xs space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-amber-700 text-xs">
                        #{est.number}. {est.name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isTien ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                      }`}>
                        {est.branch}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <span className="text-slate-400">Tỉnh:</span> <strong className="text-slate-800">{est.province}</strong>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <span className="text-slate-400">Phân lưu:</span> <span className="text-slate-700">{est.subBranch}</span>
                    </div>
                    <div className="text-[10px] font-medium pt-1 border-t border-slate-200/60">
                      <span className={est.isDammed ? 'text-red-700 font-bold' : est.isHistoricalSedimented ? 'text-amber-700 font-bold' : 'text-emerald-700 font-semibold'}>
                        {est.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                      {est.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : activeViewMode === 'countries' ? (
        /* 6 Riparian Countries Dedicated In-Depth View */
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-sky-700 via-teal-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
              <Droplets className="w-3.5 h-3.5 text-sky-200" />
              <span>Ủy Hội Sông Mê Công Quốc Tế (MRC) & Hiệp Định Mê Kông 1995</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              6 Quốc Gia Lưu Vực Sông Mê Kông: Tỉ Lệ Diện Tích, Dòng Chảy & Hợp Tác Xuyên Biên Giới
            </h2>
            <p className="text-sky-50 text-sm leading-relaxed max-w-4xl">
              Phân tích cơ cấu diện tích lưu vực, đóng góp dòng chảy thủy văn và vai trò của 6 quốc gia theo số liệu chính thức của MRC (2022) và chương trình Địa lí 11.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIX_COUNTRIES_INFO.map((country, idx) => (
              <div
                key={country.name}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 transition-all shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{country.name}</h4>
                      <span className="text-xs text-slate-500 italic block">{country.localName}</span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold">
                    {country.capital}
                  </span>
                </div>

                {/* Progress bars for Area and Flow */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-600 font-medium">Tỉ lệ diện tích lưu vực:</span>
                      <strong className="text-teal-700">{country.shareOfBasinArea}</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full"
                        style={{ width: country.shareOfBasinArea.replace('%', '%') }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-600 font-medium">Đóng góp lượng dòng chảy:</span>
                      <strong className="text-amber-700">{country.shareOfFlow}</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: country.shareOfFlow.replace('%', '%') }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-700 block">Vai trò địa lí & thủy văn:</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {country.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Visual Photographic River Tour Gallery Mode */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-teal-600" />
                <span>Hành Trình Nhiếp Ảnh Thực Địa 4.763 KM Dọc Sông Mê Kông</span>
              </h3>
              <p className="text-xs text-slate-500">
                Quan sát trực quan sự biến đổi địa hình, cảnh quan lòng sông, màu sắc phù sa và đời sống cư dân từ Thượng lưu đến Cửa Biển Đông.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-bold">
              {RIVER_STATIONS.length} Trạm Mốc Trực Quan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RIVER_STATIONS.map((st, index) => (
              <div
                key={st.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md flex flex-col group"
              >
                {/* Photo Header */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {st.image ? (
                    <img
                      src={st.image}
                      alt={st.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      Ảnh tư liệu
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Step Index Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 text-emerald-800 border border-white/30 text-xs font-bold backdrop-blur-sm shadow-xs">
                    Trạm {index + 1}
                  </span>

                  {/* Distance */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-amber-500 text-white text-[11px] font-bold shadow-xs">
                    {st.lengthFromSourceKm === 0 ? 'Nguồn 0 km' : `~${st.lengthFromSourceKm.toLocaleString()} km`}
                  </span>

                  {/* Action Zoom */}
                  {st.image && (
                    <button
                      onClick={() =>
                        setModalImage({
                          src: st.image!,
                          title: st.name,
                          caption: st.highlight
                        })
                      }
                      className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                      title="Xem ảnh lớn"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {st.flag} {st.name}
                    </h4>
                    <p className="text-xs text-emerald-700 font-medium mb-2">
                      {st.vietnameseName}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] mb-2.5">
                      <div>
                        <span className="text-[9px] text-slate-500 block">Độ cao:</span>
                        <span className="font-bold text-teal-800">{st.elevation || 'Biến thiên'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block">Màu nước:</span>
                        <span className="font-bold text-amber-800 truncate block">{st.waterColor?.split(' ')[0] || 'Phù sa'}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                      {st.highlight}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStation(st);
                      setActiveViewMode('map');
                      soundFx.playClick();
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Định vị trên bản đồ sơ đồ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6 Riparian Countries Comparison Grid */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-teal-600" />
              <span>6 Quốc Gia Lưu Vực Sông Mê Kông (Hình 2, SGK Địa lí 11 Tr.6)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Tỉ lệ diện tích lưu vực sông Mê Công theo quốc gia (%): Lào 25%, Thái Lan 23%, Trung Quốc 21%, Cam-pu-chia 20%, Việt Nam 8%, Mi-an-ma 3% (Nguồn: MRC, 2022)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SIX_COUNTRIES_INFO.map((country, idx) => {
            const isSelected = selectedCountryIndex === idx;
            return (
              <div
                key={country.name}
                id={`country-card-${idx}`}
                onClick={() => {
                  setSelectedCountryIndex(idx);
                  soundFx.playClick();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{country.name}</h4>
                      <span className="text-[11px] text-slate-500 block italic">{country.localName}</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-mono">
                    {country.capital}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 my-2.5 text-xs bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Diện tích lưu vực</span>
                    <span className="font-bold text-teal-700">{country.shareOfBasinArea}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Đóng góp dòng chảy</span>
                    <span className="font-bold text-amber-700">{country.shareOfFlow}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                  {country.role}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen HD Image Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-emerald-300 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-slate-950">
              <img
                src={modalImage.src}
                alt={modalImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-white border-t border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-1">{modalImage.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{modalImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
