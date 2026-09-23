import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, ShieldAlert, Waves, Compass, Eye, Volume2, Anchor, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface WaterFlowCanvasProps {
  damRelease: number; // 20 - 100%
  dryIntensity: 'normal' | 'drought' | 'severe';
  seaLevelRiseCm: number;
  sluiceGateState: 'open' | 'smart_control' | 'closed';
  onToggleGate?: (newState: 'open' | 'smart_control' | 'closed') => void;
  salinityDistanceKm: number;
}

interface HydrologyStation {
  id: string;
  name: string;
  province: string;
  locationKmFromSea: number;
  thresholdSalinity: number; // in ‰ (ppt)
  type: 'upstream_entry' | 'core_fresh' | 'vulnerable_orchard' | 'estuary';
  x: number; // percentage in SVG
  y: number;
  description: string;
}

const STATIONS: HydrologyStation[] = [
  {
    id: 'tan_chau',
    name: 'Trạm Thủy Văn Tân Châu',
    province: 'An Giang (Sông Tiền)',
    locationKmFromSea: 180,
    thresholdSalinity: 0.1,
    type: 'upstream_entry',
    x: 28,
    y: 28,
    description: 'Cửa ngõ đón dòng nước ngọt và lượng phù sa chủ lực từ Campuchia đổ vào Đồng bằng sông Cửu Long.'
  },
  {
    id: 'chau_doc',
    name: 'Trạm Thủy Văn Châu Đốc',
    province: 'An Giang (Sông Hậu)',
    locationKmFromSea: 175,
    thresholdSalinity: 0.1,
    type: 'upstream_entry',
    x: 22,
    y: 35,
    description: 'Cửa ngõ phân lưu của sông Hậu, giữ vai trò quan trọng trong việc theo dõi lũ đầu nguồn.'
  },
  {
    id: 'cho_lach',
    name: 'Trạm Cảnh Báo Chợ Lách',
    province: 'Bến Tre (Cù lao Cổ Chiên)',
    locationKmFromSea: 55,
    thresholdSalinity: 1.0,
    type: 'vulnerable_orchard',
    x: 62,
    y: 52,
    description: 'Thủ phủ cây giống và sầu riêng lớn nhất miền Tây; cực kỳ mẫn cảm với độ mặn trên 1‰.'
  },
  {
    id: 'can_tho',
    name: 'Trạm Quan Trắc Cần Thơ - Hậu Giang',
    province: 'Cần Thơ - Hậu Giang (Sông Hậu)',
    locationKmFromSea: 85,
    thresholdSalinity: 0.25,
    type: 'core_fresh',
    x: 48,
    y: 60,
    description: 'Khu vực đô thị hạt nhân và nguồn nước sinh hoạt thiết yếu của hàng triệu cư dân.'
  },
  {
    id: 'cai_lon',
    name: 'Hệ Thống Siêu Cống Cái Lớn - Cái Bé',
    province: 'Kiên Giang - Hậu Giang',
    locationKmFromSea: 25,
    thresholdSalinity: 4.0,
    type: 'estuary',
    x: 35,
    y: 80,
    description: 'Cụm công trình kiểm soát nguồn nước lớn nhất Việt Nam, ngăn mặn từ biển Tây bảo vệ hơn 384.000 ha đất nông nghiệp.'
  },
  {
    id: 'cua_tieu',
    name: 'Cửa Tiểu & Cửa Đại',
    province: 'Tiền Giang - Bến Tre',
    locationKmFromSea: 5,
    thresholdSalinity: 15.0,
    type: 'estuary',
    x: 85,
    y: 62,
    description: 'Hai cửa biển chính của sông Tiền đổ ra Biển Đông, nơi triều cường đẩy mặn mạnh nhất.'
  }
];

export const WaterFlowCanvas: React.FC<WaterFlowCanvasProps> = ({
  damRelease,
  dryIntensity,
  seaLevelRiseCm,
  sluiceGateState,
  onToggleGate,
  salinityDistanceKm
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [tonleSapSeason, setTonleSapSeason] = useState<'flood' | 'dry'>('dry');
  const [showSedimentParticles, setShowSedimentParticles] = useState(true);
  const [selectedStation, setSelectedStation] = useState<HydrologyStation | null>(STATIONS[2]);
  const [boatProgress, setBoatProgress] = useState<number | null>(null);
  const [boatStatusMessage, setBoatStatusMessage] = useState<string>('');
  const [isLaunchingBoat, setIsLaunchingBoat] = useState(false);

  // Dynamic flow speed calculation
  const baseFlowSpeed = (damRelease / 100) * (dryIntensity === 'normal' ? 1.2 : dryIntensity === 'drought' ? 0.8 : 0.5);
  const effectiveFlowVelocity = Math.max(0.3, Math.min(2.5, baseFlowSpeed * speedMultiplier));

  // Sediment load (high dam release = lots of silt/alluvium; low release = clear starved water)
  const sedimentLoadGrams = Math.round(damRelease * 3.8);

  // Boat journey animation loop
  useEffect(() => {
    let animFrame: number;
    if (isLaunchingBoat && boatProgress !== null) {
      if (boatProgress >= 100) {
        setIsLaunchingBoat(false);
        setBoatStatusMessage('🎉 Xuồng ba lá đã hoàn thành hải trình 180 km cập bến an toàn tại Biển Đông!');
        soundFx.playSuccess();
      } else {
        animFrame = requestAnimationFrame(() => {
          setBoatProgress(prev => {
            if (prev === null) return 0;
            const next = prev + 0.35 * effectiveFlowVelocity;
            if (next < 25) {
              setBoatStatusMessage('🛶 Xuồng đang qua Châu Đốc & Tân Châu: Dòng nước ngọt cuồn cuộn, phù sa bồi đắp.');
            } else if (next < 60) {
              setBoatStatusMessage('🛶 Xuồng qua Cần Thơ - Hậu Giang: Nước êm, các ghe đò buôn bán tấp nập trên sông Hậu.');
            } else if (next < 85) {
              const currentKm = Math.round(180 - (next / 100) * 180);
              if (currentKm <= salinityDistanceKm) {
                setBoatStatusMessage(`⚠️ Xuồng chạm ranh mặn 4‰ tại Bến Tre (Cách biển ${currentKm} km)! Nước bắt đầu có vị lợ.`);
              } else {
                setBoatStatusMessage('🛶 Xuồng qua cồn bãi Chợ Lách: Vườn sầu riêng đang được đắp đập trữ nước ngọt an toàn.');
              }
            } else {
              setBoatStatusMessage('🌊 Xuồng tiếp cận cửa biển: Gặp sóng lớn và triều cường dâng từ Biển Đông!');
            }
            return next >= 100 ? 100 : next;
          });
        });
      }
    }
    return () => cancelAnimationFrame(animFrame);
  }, [isLaunchingBoat, boatProgress, effectiveFlowVelocity, salinityDistanceKm]);

  const handleLaunchBoat = () => {
    setBoatProgress(0);
    setIsLaunchingBoat(true);
    soundFx.playWaterSplash();
  };

  const handleToggleGateLocal = () => {
    const nextState = sluiceGateState === 'open' 
      ? 'smart_control' 
      : sluiceGateState === 'smart_control' 
      ? 'closed' 
      : 'open';
    if (onToggleGate) {
      onToggleGate(nextState);
    }
    soundFx.playCardFlip();
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden text-slate-800 space-y-4">
      {/* Top Banner Control Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-700 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border border-white/30">
              Interactive Hydro Lab
            </span>
            <span className="text-xs text-teal-100 font-medium hidden sm:inline">
              Mô phỏng Động học Thủy văn Mekong 2D
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white mt-1 tracking-tight flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span>Sơ Đồ Dòng Chảy Thủy Văn & Xâm Nhập Mặn Trực Quan</span>
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Pause / Play */}
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              soundFx.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              isPlaying ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Tạm dừng' : 'Chạy mô phỏng'}</span>
          </button>

          {/* Speed Toggle */}
          <div className="bg-white/20 backdrop-blur-xs rounded-xl p-0.5 flex items-center border border-white/30 text-xs">
            <span className="px-2 text-[10px] font-bold text-teal-100">Tốc độ:</span>
            {[1, 2, 4].map(s => (
              <button
                key={s}
                onClick={() => {
                  setSpeedMultiplier(s);
                  soundFx.playClick();
                }}
                className={`px-2 py-0.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  speedMultiplier === s ? 'bg-white text-emerald-800 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                x{s}
              </button>
            ))}
          </div>

          {/* Boat Launch Probe Button */}
          <button
            onClick={handleLaunchBoat}
            disabled={isLaunchingBoat}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            title="Thả xuồng ba lá đi từ thượng nguồn về biển"
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>{isLaunchingBoat ? 'Đang thám hiểm...' : 'Thả Xuồng Ba Lá'}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Hydrology SVG Map */}
      <div className="px-4 sm:px-6">
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-sky-50 via-emerald-50/50 to-teal-50 border border-slate-200 overflow-hidden shadow-inner p-3 sm:p-5">
          
          {/* Quick HUD Metrics Overlay */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex flex-col gap-2 max-w-[200px] sm:max-w-xs pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-200 shadow-xs text-xs space-y-1">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Vận tốc dòng chảy:</span>
                <span className="text-emerald-700 font-extrabold">{effectiveFlowVelocity.toFixed(1)} m/s</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Hàm lượng phù sa:</span>
                <span className="text-amber-700 font-extrabold">{sedimentLoadGrams} g/m³</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Ranh mặn 4‰:</span>
                <span className={`font-extrabold ${salinityDistanceKm > 65 ? 'text-rose-600' : salinityDistanceKm > 45 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  ~{salinityDistanceKm} km
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Toggle Controls inside Canvas */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex flex-col items-end gap-2 text-xs">
            {/* Sluice Gate Interactive Toggle */}
            <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-emerald-200 shadow-xs flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-700 hidden sm:inline">Cống Cái Lớn - Cái Bé:</span>
              <button
                onClick={handleToggleGateLocal}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                  sluiceGateState === 'closed'
                    ? 'bg-rose-600 text-white'
                    : sluiceGateState === 'smart_control'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-slate-950'
                }`}
                title="Bấm để chuyển chế độ cống"
              >
                <span>
                  {sluiceGateState === 'closed' ? '🔒 ĐÓNG CỐNG' : sluiceGateState === 'smart_control' ? '⚡ THÔNG MINH' : '🔓 MỞ TỰ DO'}
                </span>
              </button>
            </div>

            {/* Tonle Sap Seasonal Toggle */}
            <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-cyan-200 shadow-xs flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-700 hidden sm:inline">Biển Hồ Tonle Sap:</span>
              <button
                onClick={() => {
                  setTonleSapSeason(tonleSapSeason === 'dry' ? 'flood' : 'dry');
                  soundFx.playWaterSplash();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                  tonleSapSeason === 'flood'
                    ? 'bg-sky-600 text-white'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                <span>{tonleSapSeason === 'flood' ? '🌊 MÙA LŨ (NƯỚC VÀO HỒ)' : '☀️ MÙA CẠN (HỒ XẢ NƯỚC)'}</span>
              </button>
            </div>

            {/* Sediment Particle Visibility Toggle */}
            <button
              onClick={() => setShowSedimentParticles(!showSedimentParticles)}
              className="bg-white/90 hover:bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-medium transition-all cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <Eye className="w-3 h-3 text-amber-600" />
              <span>{showSedimentParticles ? 'Ẩn hạt phù sa' : 'Hiện hạt phù sa'}</span>
            </button>
          </div>

          {/* SVG Hydrological Simulation Canvas */}
          <svg viewBox="0 0 1000 650" className="w-full h-auto select-none overflow-visible">
            <defs>
              {/* Freshwater Gradient */}
              <linearGradient id="freshRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={damRelease > 60 ? '#d97706' : '#0284c7'} stopOpacity="0.9" />
                <stop offset="50%" stopColor={damRelease > 60 ? '#b45309' : '#0ea5e9'} stopOpacity="0.85" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>

              {/* Salinity Intrusion Purple Gradient (From Sea upriver) */}
              <linearGradient id="saltWedgeGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
              </linearGradient>

              {/* Ocean Tide Pattern */}
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>

              {/* Water Wave Animation Pattern */}
              <pattern id="riverFlowPattern" width="60" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 10 Q 15 0 30 10 T 60 10"
                  fill="none"
                  stroke={damRelease > 60 ? 'rgba(251, 191, 36, 0.4)' : 'rgba(255, 255, 255, 0.4)'}
                  strokeWidth="2"
                >
                  {isPlaying && (
                    <animate
                      attributeName="d"
                      dur={`${2 / effectiveFlowVelocity}s`}
                      repeatCount="indefinite"
                      values="M 0 10 Q 15 0 30 10 T 60 10; M 0 10 Q 15 20 30 10 T 60 10; M 0 10 Q 15 0 30 10 T 60 10"
                    />
                  )}
                </path>
              </pattern>
            </defs>

            {/* Background Landmass (Cambodia & Vietnam Delta) */}
            <path
              d="M 20 40 Q 300 20 600 40 T 980 50 L 980 580 Q 750 620 400 630 L 20 630 Z"
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {/* Provincial boundaries hint & fertile delta zone */}
            <path
              d="M 200 180 Q 400 190 600 220 T 950 250 L 960 620 L 250 620 Z"
              fill="#ecfdf5"
              opacity="0.85"
            />

            {/* Ocean Area (Biển Đông & Vịnh Thái Lan) */}
            <path
              d="M 720 380 Q 860 450 990 490 L 990 640 L 720 640 Z"
              fill="url(#oceanGrad)"
              opacity="0.25"
            />
            <text x="880" y="580" fill="#1e3a8a" fontSize="14" fontWeight="bold" letterSpacing="2">
              BIỂN ĐÔNG
            </text>

            <path
              d="M 10 520 Q 120 540 280 620 L 10 620 Z"
              fill="url(#oceanGrad)"
              opacity="0.2"
            />
            <text x="50" y="590" fill="#1e3a8a" fontSize="13" fontWeight="bold">
              VỊNH THÁI LAN
            </text>

            {/* Tonle Sap Lake graphic */}
            <g>
              <ellipse
                cx="140"
                cy="140"
                rx={tonleSapSeason === 'flood' ? "95" : "55"}
                ry={tonleSapSeason === 'flood' ? "65" : "38"}
                fill={tonleSapSeason === 'flood' ? "#38bdf8" : "#93c5fd"}
                stroke="#0284c7"
                strokeWidth="2"
                className="transition-all duration-700"
              />
              <text x="140" y="135" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="900">
                BIỂN HỒ TONLE SAP
              </text>
              <text x="140" y="152" textAnchor="middle" fill="#075985" fontSize="10">
                {tonleSapSeason === 'flood' ? 'Diện tích phình to ~16.000 km²' : 'Mùa cạn thu hẹp ~2.700 km²'}
              </text>

              {/* Tonle Sap River connecting to Mekong */}
              <path
                d="M 185 160 Q 240 185 270 200"
                fill="none"
                stroke="#0284c7"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Flow direction arrow on Tonle Sap connector */}
              <g transform={tonleSapSeason === 'flood' ? "translate(215, 175) rotate(35)" : "translate(235, 185) rotate(-145)"}>
                <polygon points="0,0 -8,-5 -8,5" fill={tonleSapSeason === 'flood' ? "#0284c7" : "#d97706"} />
              </g>
              <text x="215" y="210" fill="#075985" fontSize="9" fontWeight="bold">
                {tonleSapSeason === 'flood' ? '↗ Nước sông chảy ngược vào hồ' : '↙ Hồ xả nước cứu hạn'}
              </text>
            </g>

            {/* Upstream Mekong Channel entering from Top Right */}
            <path
              d="M 500 20 Q 420 80 340 140 T 270 200"
              fill="none"
              stroke="url(#freshRiverGrad)"
              strokeWidth="28"
              strokeLinecap="round"
            />
            {/* Water flow pattern overlay */}
            <path
              d="M 500 20 Q 420 80 340 140 T 270 200"
              fill="none"
              stroke="url(#riverFlowPattern)"
              strokeWidth="26"
            />

            {/* Upstream Dam Icon & Indicator */}
            <g transform="translate(470, 30)">
              <rect x="-35" y="-12" width="70" height="24" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                ĐẬP THỦY ĐIỆN ({damRelease}%)
              </text>
            </g>

            {/* Mekong Splits at Phnom Penh / Tan Chau into Sông Tiền & Sông Hậu */}
            {/* Split junction */}
            <circle cx="270" cy="200" r="16" fill="#0284c7" opacity="0.3" />

            {/* SÔNG TIỀN (Main northern branch) */}
            <path
              id="songTienPath"
              d="M 270 200 Q 380 230 480 290 T 680 430 Q 750 490 850 510"
              fill="none"
              stroke="url(#freshRiverGrad)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 270 200 Q 380 230 480 290 T 680 430 Q 750 490 850 510"
              fill="none"
              stroke="url(#riverFlowPattern)"
              strokeWidth="20"
            />

            {/* SÔNG HẬU (Main southern branch) */}
            <path
              id="songHauPath"
              d="M 270 200 Q 250 280 330 380 T 520 500 Q 640 560 760 590"
              fill="none"
              stroke="url(#freshRiverGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M 270 200 Q 250 280 330 380 T 520 500 Q 640 560 760 590"
              fill="none"
              stroke="url(#riverFlowPattern)"
              strokeWidth="18"
            />

            {/* Interconnecting Canals & Branches (Vàm Nao, Kênh Xáng Xà No) */}
            <path
              d="M 380 280 L 330 380"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
            <text x="365" y="330" fill="#0891b2" fontSize="9" fontWeight="bold">
              Sông Vàm Nao
            </text>

            <path
              d="M 520 500 Q 420 530 320 550"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <text x="370" y="555" fill="#0891b2" fontSize="9" fontWeight="bold">
              Kênh Xáng Xà No (Hậu Giang)
            </text>

            {/* Salinity Intrusion Wedge advancing along Sông Tiền and Sông Hậu */}
            {/* The length of purple intrusion depends on salinityDistanceKm (0 - 90km) */}
            {/* Normal: 35km (~offset 0.8), Drought: 70km (~offset 0.55), Severe: 90km (~offset 0.4) */}
            {(() => {
              // Convert km into strokeDashoffset along Sông Tiền (approx length 750px)
              const intrusionRatio = Math.min(0.9, salinityDistanceKm / 100);
              return (
                <>
                  {/* Sông Tiền Salinity Wedge */}
                  <path
                    d="M 850 510 Q 750 490 680 430 T 480 290 Q 380 230 270 200"
                    fill="none"
                    stroke="url(#saltWedgeGrad)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeDasharray="800"
                    strokeDashoffset={800 * (1 - intrusionRatio)}
                    className="transition-all duration-1000"
                  />
                  {/* Sông Hậu Salinity Wedge */}
                  <path
                    d="M 760 590 Q 640 560 520 500 T 330 380 Q 250 280 270 200"
                    fill="none"
                    stroke="url(#saltWedgeGrad)"
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeDasharray="750"
                    strokeDashoffset={750 * (1 - intrusionRatio * 0.92)}
                    className="transition-all duration-1000"
                  />
                </>
              );
            })()}

            {/* The 9 Estuary Mouths (Cửu Long) Labels at Sea */}
            <g transform="translate(860, 480)">
              <circle cx="0" cy="0" r="4" fill="#0284c7" />
              <text x="8" y="4" fill="#1e40af" fontSize="9" fontWeight="bold">Cửa Tiểu, Cửa Đại</text>
            </g>
            <g transform="translate(820, 525)">
              <circle cx="0" cy="0" r="4" fill="#0284c7" />
              <text x="8" y="4" fill="#1e40af" fontSize="9" fontWeight="bold">Hàm Luông, Cổ Chiên</text>
            </g>
            <g transform="translate(770, 575)">
              <circle cx="0" cy="0" r="4" fill="#0284c7" />
              <text x="8" y="4" fill="#1e40af" fontSize="9" fontWeight="bold">Cung Hầu, Định An, Trần Đề</text>
            </g>

            {/* Sluice Gate Cái Lớn - Cái Bé on map */}
            <g 
              transform="translate(350, 570)"
              className="cursor-pointer group"
              onClick={handleToggleGateLocal}
            >
              {/* Gate barrier visual */}
              <rect
                x="-18"
                y="-10"
                width="36"
                height="20"
                rx="4"
                fill={sluiceGateState === 'closed' ? '#ef4444' : sluiceGateState === 'smart_control' ? '#10b981' : '#f59e0b'}
                stroke="#ffffff"
                strokeWidth="2"
                className="filter drop-shadow-md group-hover:scale-110 transition-transform"
              />
              <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                {sluiceGateState === 'closed' ? 'ĐÓNG' : sluiceGateState === 'smart_control' ? 'AUTO' : 'MỞ'}
              </text>
              <text x="0" y="24" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">
                Cống Cái Lớn - Cái Bé
              </text>
            </g>

            {/* Simulated Animated Sediment Particles */}
            {showSedimentParticles && isPlaying && (
              <g opacity={damRelease > 50 ? 0.75 : 0.3}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((p, idx) => (
                  <circle
                    key={idx}
                    r={damRelease > 65 ? "3.5" : "2"}
                    fill={damRelease > 50 ? "#d97706" : "#38bdf8"}
                  >
                    <animateMotion
                      path="M 500 20 Q 420 80 340 140 T 270 200 Q 380 230 480 290 T 680 430 Q 750 490 850 510"
                      dur={`${(10 - idx * 0.7) / effectiveFlowVelocity}s`}
                      repeatCount="indefinite"
                      begin={`${idx * 0.9}s`}
                    />
                  </circle>
                ))}
                {[1, 2, 3, 4, 5].map((p, idx) => (
                  <circle
                    key={`h-${idx}`}
                    r={damRelease > 65 ? "3" : "2"}
                    fill={damRelease > 50 ? "#b45309" : "#38bdf8"}
                  >
                    <animateMotion
                      path="M 270 200 Q 250 280 330 380 T 520 500 Q 640 560 760 590"
                      dur={`${(9 - idx * 0.8) / effectiveFlowVelocity}s`}
                      repeatCount="indefinite"
                      begin={`${idx * 1.1 + 0.5}s`}
                    />
                  </circle>
                ))}
              </g>
            )}

            {/* Virtual Boat Animation Position */}
            {isLaunchingBoat && boatProgress !== null && (
              <g
                transform={(() => {
                  // Interpolate approximate boat position on Sông Tiền
                  const t = boatProgress / 100;
                  const startX = 270, startY = 200;
                  const endX = 850, endY = 510;
                  // Mid points Q380, 230, 480, 290
                  const currX = startX + (endX - startX) * t;
                  const currY = startY + (endY - startY) * t + Math.sin(t * Math.PI) * 40;
                  return `translate(${currX}, ${currY})`;
                })()}
              >
                <circle cx="0" cy="0" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="12">🛶</text>
              </g>
            )}

            {/* Hydrological Stations Markers */}
            {STATIONS.map(st => {
              const isSelected = selectedStation?.id === st.id;
              const isIntruded = (180 - st.locationKmFromSea) <= salinityDistanceKm && st.thresholdSalinity < 4.0;

              return (
                <g
                  key={st.id}
                  transform={`translate(${st.x * 10}, ${st.y * 6.5})`}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedStation(st);
                    soundFx.playClick();
                  }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? "11" : "8"}
                    fill={isIntruded ? "#ef4444" : isSelected ? "#059669" : "#ffffff"}
                    stroke={isIntruded ? "#b91c1c" : "#059669"}
                    strokeWidth="3"
                    className="transition-all filter drop-shadow-sm group-hover:scale-125"
                  />
                  {isIntruded && (
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />
                  )}
                  <text
                    x="12"
                    y="4"
                    fill={isSelected ? "#065f46" : "#334155"}
                    fontSize="10"
                    fontWeight={isSelected ? "900" : "bold"}
                    className="pointer-events-none drop-shadow-xs"
                  >
                    {st.name.replace('Trạm Thủy Văn ', '').replace('Trạm Quan Trắc ', '')}
                  </text>
                </g>
              );
            })}

            {/* Salinity 4‰ Boundary Line Label */}
            <g transform={`translate(${850 - (salinityDistanceKm / 100) * 500}, 450)`}>
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="4 2" />
              <rect x="-55" y="-45" width="110" height="20" rx="5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" className="filter drop-shadow-sm" />
              <text x="0" y="-31" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900" letterSpacing="0.5">
                ⚡ RANH MẶN 4‰ (~{salinityDistanceKm}km)
              </text>
            </g>

            {/* Direct In-Diagram Explanatory Callouts (Chú thích trực quan trên sơ đồ) */}
            {/* 1. Thượng nguồn chú thích */}
            <g transform="translate(380, 110)">
              <rect x="-10" y="-12" width="160" height="22" rx="6" fill="#0284c7" opacity="0.95" stroke="#ffffff" strokeWidth="1.5" />
              <text x="70" y="3" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold">
                🌊 Nước ngọt & Phù sa ➔
              </text>
            </g>

            {/* 2. Hướng xâm nhập mặn từ biển vào */}
            <g transform="translate(760, 410)">
              <rect x="-10" y="-12" width="190" height="22" rx="6" fill="#6b21a8" opacity="0.95" stroke="#ffffff" strokeWidth="1.5" />
              <text x="85" y="3" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold">
                ⇦ Mặn Biển Đông dâng ngược
              </text>
            </g>

            {/* 3. Vùng an toàn nông nghiệp */}
            <g transform="translate(330, 240)">
              <rect x="-8" y="-10" width="130" height="20" rx="5" fill="#059669" opacity="0.9" stroke="#ffffff" strokeWidth="1" />
              <text x="57" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                🌾 Vùng ngọt an toàn
              </text>
            </g>
          </svg>

          {/* CHÚ THÍCH HÌNH MÔ PHỎNG NƯỚC & HẠN MẶN (Legend Card rõ ràng) */}
          <div className="mt-3 p-3 rounded-xl bg-white/95 border border-emerald-200/90 shadow-xs text-xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-100">
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[11px] tracking-wide uppercase">
                📖 Bảng Chú Thích Nhận Biết
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Hướng dẫn quan sát dòng nước và hiện tượng xâm nhập mặn ĐBSCL:
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px]">
              {/* 1. Nước ngọt */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-sky-50 border border-sky-200">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 shrink-0 shadow-2xs" />
                <span className="text-slate-700 font-medium leading-tight">
                  <strong className="text-sky-800 block font-bold">Nước ngọt</strong>
                  Từ thượng nguồn
                </span>
              </div>

              {/* 2. Phù sa */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-600 shrink-0 shadow-2xs" />
                <span className="text-slate-700 font-medium leading-tight">
                  <strong className="text-amber-800 block font-bold">Hạt phù sa</strong>
                  Bồi đắp dinh dưỡng
                </span>
              </div>

              {/* 3. Nước mặn tím */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-purple-50 border border-purple-200">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-purple-700 to-purple-500 shrink-0 shadow-2xs" />
                <span className="text-slate-700 font-medium leading-tight">
                  <strong className="text-purple-900 block font-bold">Vùng nước mặn</strong>
                  Ăn sâu từ biển
                </span>
              </div>

              {/* 4. Ranh mặn 4 phần nghìn */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-fuchsia-50 border border-fuchsia-200">
                <div className="w-3.5 h-1 bg-fuchsia-600 shrink-0 rounded-full" />
                <span className="text-slate-700 font-medium leading-tight">
                  <strong className="text-fuchsia-900 block font-bold">Ranh mặn 4‰</strong>
                  Ngưỡng hại lúa & cây
                </span>
              </div>

              {/* 5. Trạm cảnh báo đỏ */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-rose-50 border border-rose-200">
                <div className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-300 shrink-0 animate-pulse" />
                <span className="text-slate-700 font-medium leading-tight">
                  <strong className="text-rose-800 block font-bold">Trạm nhiễm mặn</strong>
                  Đóng cống, ngưng tưới
                </span>
              </div>

              {/* 6. Trạm an toàn xanh */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium leading-tight">
                  <strong className="text-emerald-800 block font-bold">Trạm an toàn</strong>
                  Nước ngọt lấy được
                </span>
              </div>
            </div>
          </div>

          {/* Virtual Boat Status Bar */}
          {isLaunchingBoat && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛶</span>
                <span className="font-semibold">{boatStatusMessage}</span>
              </div>
              <div className="text-right shrink-0 font-mono font-bold text-amber-800 text-[11px]">
                {Math.round(boatProgress || 0)}% hành trình
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Station Sensor Probe Card */}
      {selectedStation && (
        <div className="px-4 sm:px-6 pb-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-emerald-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {selectedStation.province}
                </span>
                <span className="text-xs text-slate-500">
                  Cách cửa biển: <strong>{selectedStation.locationKmFromSea} km</strong>
                </span>
                {(180 - selectedStation.locationKmFromSea) <= salinityDistanceKm ? (
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-rose-600" /> Cảnh báo: Nhiễm mặn vượt ngưỡng
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Vùng nước ngọt an toàn
                  </span>
                )}
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                {selectedStation.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedStation.description}
              </p>
            </div>

            <div className="md:col-span-4 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Độ mặn dự kiến:</span>
                <span className="font-bold text-slate-800">
                  {((180 - selectedStation.locationKmFromSea) <= salinityDistanceKm) 
                    ? `${(4.0 + (salinityDistanceKm - (180 - selectedStation.locationKmFromSea)) * 0.15).toFixed(1)} ‰` 
                    : '< 0.5 ‰ (Ngọt)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ngưỡng mẫn cảm:</span>
                <span className="font-bold text-slate-800">{selectedStation.thresholdSalinity} ‰</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Khuyến nghị nông vụ:</span>
                <span className="font-bold text-emerald-700">
                  {(180 - selectedStation.locationKmFromSea) <= salinityDistanceKm
                    ? 'Đóng cống, tưới tiết kiệm'
                    : 'Tranh thủ lấy nước ngọt vào mương vườn'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
