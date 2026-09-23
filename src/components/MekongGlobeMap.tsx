import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Globe, 
  Compass, 
  Droplets, 
  Mountain, 
  Truck, 
  Layers, 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  Maximize2, 
  X, 
  Anchor, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Waves,
  Navigation,
  Calendar,
  BarChart2,
  TrendingUp,
  Sun
} from 'lucide-react';
import { 
  MEKONG_RIVER_COORDINATES, 
  TONLE_SAP_COORDINATES, 
  SIX_COUNTRIES_JOURNEY, 
  HYDROLOGICAL_STATIONS, 
  TRANSPORT_FEATURES, 
  ASIAN_HIGHWAYS, 
  CONTINENT_OUTLINES, 
  HydrologicalStation, 
  CountryJourneyInfo, 
  TransportRoute 
} from '../data/globeData';
import { Language } from '../types';
import { soundFx } from '../utils/audio';

interface MekongGlobeMapProps {
  language?: Language;
  onOpenStationModal?: (stationId: string) => void;
  onSwitchToMap?: () => void;
}

type GlobeMode = 'satellite' | 'terrain' | 'transport';
type SeasonMode = 'normal' | 'flood' | 'dry';
type FlowSpeedSetting = 'slow' | 'natural' | 'brisk';

export const MekongGlobeMap: React.FC<MekongGlobeMapProps> = ({ language = 'vi', onSwitchToMap }) => {
  const isEn = language === 'en';

  // Canvas ref & sizing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Globe orientation state (degrees)
  // Default centered on Mekong basin (lat: 18°N, lon: 102°E)
  const [rotation, setRotation] = useState<{ lat: number; lon: number }>({ lat: 18, lon: 102 });
  const [zoom, setZoom] = useState<number>(1.25);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<GlobeMode>('satellite');
  const [activeSeason, setActiveSeason] = useState<SeasonMode>('normal');
  const [flowSpeedSetting, setFlowSpeedSetting] = useState<FlowSpeedSetting>('natural');
  const [isFlowPaused, setIsFlowPaused] = useState<boolean>(false);

  // Selected entities
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number | null>(5); // Default Vietnam
  const [selectedStation, setSelectedStation] = useState<HydrologicalStation | null>(
    () => HYDROLOGICAL_STATIONS.find(s => s.id === 'sta-tan-chau') || HYDROLOGICAL_STATIONS[0]
  );
  const [selectedTransportFeature, setSelectedTransportFeature] = useState<TransportRoute | null>(null);

  // Station View Mode Tab ('current' | 'all-seasons' | 'monthly')
  const [stationViewTab, setStationViewTab] = useState<'current' | 'all-seasons' | 'monthly'>('all-seasons');
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);

  // Helper function to calculate 12-month hydrological cycle for any station
  const getMonthlyHydroData = (station: HydrologicalStation) => {
    const { dry, normal, flood } = station.waterLevel;
    const qDry = station.discharge.dry;
    const qNorm = station.discharge.normal;
    const qFlood = station.discharge.flood;

    return [
      { month: 1, label: 'T1', nameVi: 'Tháng 1', season: 'dry' as const, level: +(dry + 0.22 * (normal - dry)).toFixed(2), discharge: Math.round(qDry + 0.22 * (qNorm - qDry)), note: 'Bắt đầu mùa khô' },
      { month: 2, label: 'T2', nameVi: 'Tháng 2', season: 'dry' as const, level: +(dry + 0.10 * (normal - dry)).toFixed(2), discharge: Math.round(qDry + 0.10 * (qNorm - qDry)), note: 'Nước sông rút sâu' },
      { month: 3, label: 'T3', nameVi: 'Tháng 3', season: 'dry' as const, level: +(dry).toFixed(2), discharge: qDry, note: 'Mực nước kiệt nhất năm' },
      { month: 4, label: 'T4', nameVi: 'Tháng 4', season: 'dry' as const, level: +(dry + 0.06 * (normal - dry)).toFixed(2), discharge: Math.round(qDry + 0.06 * (qNorm - qDry)), note: 'Đỉnh điểm hạn mặn ĐBSCL' },
      { month: 5, label: 'T5', nameVi: 'Tháng 5', season: 'dry' as const, level: +(dry + 0.32 * (normal - dry)).toFixed(2), discharge: Math.round(qDry + 0.32 * (qNorm - qDry)), note: 'Mưa đầu mùa thượng nguồn' },
      { month: 6, label: 'T6', nameVi: 'Tháng 6', season: 'normal' as const, level: +(normal).toFixed(2), discharge: qNorm, note: 'Chuyển mùa, dòng chảy tăng' },
      { month: 7, label: 'T7', nameVi: 'Tháng 7', season: 'flood' as const, level: +(normal + 0.40 * (flood - normal)).toFixed(2), discharge: Math.round(qNorm + 0.40 * (qFlood - qNorm)), note: 'Bắt đầu mùa lũ chính vụ' },
      { month: 8, label: 'T8', nameVi: 'Tháng 8', season: 'flood' as const, level: +(normal + 0.76 * (flood - normal)).toFixed(2), discharge: Math.round(qNorm + 0.76 * (qFlood - qNorm)), note: 'Lũ tràn bờ, Tonle Sap hút nước' },
      { month: 9, label: 'T9', nameVi: 'Tháng 9', season: 'flood' as const, level: +(flood).toFixed(2), discharge: qFlood, note: 'ĐỈNH LŨ LỚN NHẤT NĂM' },
      { month: 10, label: 'T10', nameVi: 'Tháng 10', season: 'flood' as const, level: +(normal + 0.82 * (flood - normal)).toFixed(2), discharge: Math.round(qNorm + 0.82 * (qFlood - qNorm)), note: 'Lũ cao kết hợp triều cường' },
      { month: 11, label: 'T11', nameVi: 'Tháng 11', season: 'flood' as const, level: +(normal + 0.35 * (flood - normal)).toFixed(2), discharge: Math.round(qNorm + 0.35 * (qFlood - qNorm)), note: 'Nước lũ rút dần ra Biển Đông' },
      { month: 12, label: 'T12', nameVi: 'Tháng 12', season: 'dry' as const, level: +(dry + 0.45 * (normal - dry)).toFixed(2), discharge: Math.round(qDry + 0.45 * (qNorm - qDry)), note: 'Vào vụ Đông Xuân' },
    ];
  };

  // Hydrological Station Exploration Filters
  const [stationCountryFilter, setStationCountryFilter] = useState<string>('all');
  const [stationSearchQuery, setStationSearchQuery] = useState<string>('');

  // Layer toggles
  const [showStations, setShowStations] = useState<boolean>(true);
  const [showWaterFlow, setShowWaterFlow] = useState<boolean>(true);
  const [showTransport, setShowTransport] = useState<boolean>(true);
  const [showGraticule, setShowGraticule] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Auto-tour across 6 countries
  const [isAutoTourPlaying, setIsAutoTourPlaying] = useState<boolean>(false);
  const tourTimerRef = useRef<any>(null);

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const flowOffsetRef = useRef<number>(0);

  // Target transition animation for smooth camera flies
  const targetCamRef = useRef<{ lat: number; lon: number; zoom: number; active: boolean }>({
    lat: 18,
    lon: 102,
    zoom: 1.25,
    active: false
  });

  // Camera fly animation helper
  const flyTo = useCallback((lat: number, lon: number, targetZoom: number = 1.35) => {
    targetCamRef.current = {
      lat: Math.max(-80, Math.min(80, lat)),
      lon: ((lon % 360) + 360) % 360,
      zoom: targetZoom,
      active: true
    };
    setIsAutoRotating(false);
    soundFx.playClick();
  }, []);

  // Handle Country selection and fly camera to that country
  const handleSelectCountry = (country: CountryJourneyInfo) => {
    setSelectedCountryIndex(country.index - 1);
    setSelectedTransportFeature(null);
    flyTo(country.centerLat, country.centerLon, country.zoom);
    soundFx.playWaterSplash();
  };

  // Handle Station selection
  const handleSelectStation = (station: HydrologicalStation) => {
    setSelectedStation(station);
    setSelectedTransportFeature(null);
    flyTo(station.lat, station.lon, 2.7);
    soundFx.playWaterSplash();
  };

  // Filter stations based on Country pill and Search input
  const filteredStations = HYDROLOGICAL_STATIONS.filter(s => {
    const matchesCountry = stationCountryFilter === 'all' || s.country.includes(stationCountryFilter);
    const matchesSearch = stationSearchQuery === '' || 
      s.name.toLowerCase().includes(stationSearchQuery.toLowerCase()) ||
      s.mrcStationCode.toLowerCase().includes(stationSearchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(stationSearchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(stationSearchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  // Station navigation along river (Upstream / Downstream)
  const currentStationIndex = HYDROLOGICAL_STATIONS.findIndex(s => s.id === selectedStation?.id);
  const prevStation = currentStationIndex > 0 ? HYDROLOGICAL_STATIONS[currentStationIndex - 1] : null;
  const nextStation = currentStationIndex < HYDROLOGICAL_STATIONS.length - 1 ? HYDROLOGICAL_STATIONS[currentStationIndex + 1] : null;

  const handlePrevStation = () => {
    if (prevStation) {
      handleSelectStation(prevStation);
    }
  };

  const handleNextStation = () => {
    if (nextStation) {
      handleSelectStation(nextStation);
    }
  };

  // 6 Countries Auto Tour loop
  useEffect(() => {
    if (!isAutoTourPlaying) {
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
      return;
    }

    let currentIdx = selectedCountryIndex ?? 0;
    tourTimerRef.current = setInterval(() => {
      currentIdx = (currentIdx + 1) % SIX_COUNTRIES_JOURNEY.length;
      const country = SIX_COUNTRIES_JOURNEY[currentIdx];
      setSelectedCountryIndex(currentIdx);
      flyTo(country.centerLat, country.centerLon, country.zoom);
    }, 6000);

    return () => {
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
    };
  }, [isAutoTourPlaying, selectedCountryIndex, flyTo]);

  // Spherical projection helper
  // Takes geographic (lat, lon) in degrees and returns screen (x, y, visible, z)
  const project3D = useCallback((
    lat: number, 
    lon: number, 
    centerLat: number, 
    centerLon: number, 
    radius: number, 
    cx: number, 
    cy: number
  ) => {
    const phi = (lat * Math.PI) / 180;
    const lambda = (lon * Math.PI) / 180;
    const phi0 = (centerLat * Math.PI) / 180;
    const lambda0 = (centerLon * Math.PI) / 180;

    // Unit sphere coordinates with rotation around Y (longitude) and X (latitude)
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const cosPhi0 = Math.cos(phi0);
    const sinPhi0 = Math.sin(phi0);
    const deltaLambda = lambda - lambda0;
    const cosDelta = Math.cos(deltaLambda);
    const sinDelta = Math.sin(deltaLambda);

    // 3D coordinate on sphere relative to viewer
    const x = radius * cosPhi * sinDelta;
    const y = -radius * (sinPhi * cosPhi0 - cosPhi * sinPhi0 * cosDelta);
    const z = radius * (sinPhi * sinPhi0 + cosPhi * cosPhi0 * cosDelta);

    const visible = z > -radius * 0.05; // Visible if facing the viewer

    return {
      x: cx + x,
      y: cy + y,
      z,
      visible,
      facing: z > 0
    };
  }, []);

  // Main Render Loop for HTML5 Canvas 3D Globe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // Handle resize
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Smooth Camera interpolation
      if (targetCamRef.current.active) {
        setRotation(prev => {
          let dLon = targetCamRef.current.lon - prev.lon;
          // Wrap shortest path around circle
          if (dLon > 180) dLon -= 360;
          if (dLon < -180) dLon += 360;

          const dLat = targetCamRef.current.lat - prev.lat;
          const nextLon = prev.lon + dLon * 0.08;
          const nextLat = prev.lat + dLat * 0.08;

          if (Math.abs(dLon) < 0.2 && Math.abs(dLat) < 0.2) {
            targetCamRef.current.active = false;
          }
          return { lat: nextLat, lon: ((nextLon % 360) + 360) % 360 };
        });

        setZoom(prev => {
          const dZ = targetCamRef.current.zoom - prev;
          if (Math.abs(dZ) < 0.01) return targetCamRef.current.zoom;
          return prev + dZ * 0.08;
        });
      } else if (isAutoRotating) {
        setRotation(prev => ({
          lat: prev.lat,
          lon: (prev.lon + 0.15) % 360
        }));
      }

      // Update water flow pulse offset according to season and user speed preference
      // Realistic hydrological flow velocity calibration (replaces fast rushing flow with gentle, natural drift)
      if (!isFlowPaused) {
        // Base seasonal speed:
        // - Dry season (Mùa cạn): ~0.00035 per frame (~47s full cycle) - calm, sluggish trickle, water levels drop
        // - Normal season (TB năm): ~0.00075 per frame (~22s full cycle) - steady, peaceful river drift
        // - Flood season (Mùa lũ): ~0.00140 per frame (~12s full cycle) - active surge, high discharge, clearly observable
        const baseSeasonalSpeed = activeSeason === 'flood' ? 0.00140 : activeSeason === 'dry' ? 0.00035 : 0.00075;
        const speedMultiplier = flowSpeedSetting === 'slow' ? 0.5 : flowSpeedSetting === 'brisk' ? 1.5 : 1.0;
        flowOffsetRef.current = (flowOffsetRef.current + baseSeasonalSpeed * speedMultiplier) % 1;
      }

      // Globe Geometry
      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.4;
      const R = baseRadius * zoom;

      // 1. CLEAR & DEEP SPACE BACKGROUND
      ctx.clearRect(0, 0, width, height);

      // Space background with subtle radial glow
      const spaceGrad = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, Math.max(width, height));
      if (activeMode === 'satellite') {
        spaceGrad.addColorStop(0, '#0a1426');
        spaceGrad.addColorStop(0.5, '#050b17');
        spaceGrad.addColorStop(1, '#02050b');
      } else if (activeMode === 'terrain') {
        spaceGrad.addColorStop(0, '#0f172a');
        spaceGrad.addColorStop(0.5, '#070b14');
        spaceGrad.addColorStop(1, '#030509');
      } else {
        // Transport mode: dark cyber navy
        spaceGrad.addColorStop(0, '#09152e');
        spaceGrad.addColorStop(0.5, '#040b1a');
        spaceGrad.addColorStop(1, '#01050e');
      }
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      const starSeed = 42;
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 137.5 + starSeed) % width);
        const sy = ((i * 229.3 + starSeed) % height);
        // Don't draw behind globe center
        const distFromCenter = Math.hypot(sx - cx, sy - cy);
        if (distFromCenter > R * 1.05) {
          const sz = (i % 3 === 0) ? 1.5 : 1.0;
          ctx.beginPath();
          ctx.arc(sx, sy, sz, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. ATMOSPHERIC GLOW (Rayleigh Scattering rim)
      const atmoGrad = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.15);
      if (activeMode === 'satellite') {
        atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
        atmoGrad.addColorStop(0.4, 'rgba(14, 165, 233, 0.15)');
        atmoGrad.addColorStop(1, 'rgba(3, 105, 161, 0)');
      } else if (activeMode === 'terrain') {
        atmoGrad.addColorStop(0, 'rgba(52, 211, 153, 0.3)');
        atmoGrad.addColorStop(0.4, 'rgba(16, 185, 129, 0.12)');
        atmoGrad.addColorStop(1, 'rgba(4, 120, 87, 0)');
      } else {
        atmoGrad.addColorStop(0, 'rgba(251, 146, 60, 0.35)');
        atmoGrad.addColorStop(0.4, 'rgba(234, 88, 12, 0.15)');
        atmoGrad.addColorStop(1, 'rgba(194, 65, 12, 0)');
      }
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 3. GLOBE OCEAN BASE SPHERE
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip(); // Clip everything to the spherical surface

      // Ocean base gradient (lighting from top-left)
      const oceanGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      if (activeMode === 'satellite') {
        oceanGrad.addColorStop(0, '#1a4b7c');
        oceanGrad.addColorStop(0.4, '#0d2b52');
        oceanGrad.addColorStop(0.8, '#081a36');
        oceanGrad.addColorStop(1, '#040d1c');
      } else if (activeMode === 'terrain') {
        oceanGrad.addColorStop(0, '#164e63');
        oceanGrad.addColorStop(0.5, '#0e3746');
        oceanGrad.addColorStop(1, '#051923');
      } else {
        oceanGrad.addColorStop(0, '#172554');
        oceanGrad.addColorStop(0.6, '#0f172a');
        oceanGrad.addColorStop(1, '#020617');
      }
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // 4. GRATICULE LINES (Latitude & Longitude grid)
      if (showGraticule) {
        ctx.strokeStyle = activeMode === 'transport' ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.75;

        // Parallels (Latitudes: every 15 deg)
        for (let lat = -60; lat <= 60; lat += 15) {
          ctx.beginPath();
          let started = false;
          for (let lon = 0; lon <= 360; lon += 5) {
            const p = project3D(lat, lon, rotation.lat, rotation.lon, R, cx, cy);
            if (p.facing) {
              if (!started) {
                ctx.moveTo(p.x, p.y);
                started = true;
              } else {
                ctx.lineTo(p.x, p.y);
              }
            } else {
              started = false;
            }
          }
          ctx.stroke();
        }

        // Meridians (Longitudes: every 20 deg)
        for (let lon = 0; lon < 360; lon += 20) {
          ctx.beginPath();
          let started = false;
          for (let lat = -75; lat <= 75; lat += 5) {
            const p = project3D(lat, lon, rotation.lat, rotation.lon, R, cx, cy);
            if (p.facing) {
              if (!started) {
                ctx.moveTo(p.x, p.y);
                started = true;
              } else {
                ctx.lineTo(p.x, p.y);
              }
            } else {
              started = false;
            }
          }
          ctx.stroke();
        }

        // Equator highlight
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        let eqStarted = false;
        for (let lon = 0; lon <= 360; lon += 3) {
          const p = project3D(0, lon, rotation.lat, rotation.lon, R, cx, cy);
          if (p.facing) {
            if (!eqStarted) {
              ctx.moveTo(p.x, p.y);
              eqStarted = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            eqStarted = false;
          }
        }
        ctx.stroke();
      }

      // 5. WORLD CONTINENTS & LANDMASSES
      CONTINENT_OUTLINES.forEach(continent => {
        ctx.beginPath();
        let firstPt = true;
        let anyVisible = false;

        continent.points.forEach(pt => {
          const p = project3D(pt.lat, pt.lon, rotation.lat, rotation.lon, R, cx, cy);
          if (p.facing) {
            anyVisible = true;
            if (firstPt) {
              ctx.moveTo(p.x, p.y);
              firstPt = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
        });

        if (anyVisible) {
          ctx.closePath();
          if (activeMode === 'satellite') {
            ctx.fillStyle = 'rgba(34, 76, 56, 0.85)'; // Natural satellite forest green
            ctx.strokeStyle = 'rgba(74, 128, 98, 0.6)';
          } else if (activeMode === 'terrain') {
            ctx.fillStyle = 'rgba(76, 110, 80, 0.85)'; // Topo khaki green
            ctx.strokeStyle = 'rgba(163, 177, 138, 0.6)';
          } else {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; // Dark slate for transport
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          }
          ctx.lineWidth = 1.2;
          ctx.fill();
          ctx.stroke();
        }
      });

      // 6. TERRAIN ELEVATION SHADING (When in 'terrain' mode)
      if (activeMode === 'terrain') {
        // Tibetan Plateau & High Altitude Region (>4000m)
        const tibetPts = [
          { lat: 36, lon: 88 }, { lat: 36, lon: 98 }, { lat: 32, lon: 102 },
          { lat: 28, lon: 101 }, { lat: 28, lon: 92 }, { lat: 32, lon: 85 }
        ];
        ctx.beginPath();
        let tStarted = false;
        tibetPts.forEach(pt => {
          const p = project3D(pt.lat, pt.lon, rotation.lat, rotation.lon, R, cx, cy);
          if (p.facing) {
            if (!tStarted) { ctx.moveTo(p.x, p.y); tStarted = true; }
            else ctx.lineTo(p.x, p.y);
          }
        });
        if (tStarted) {
          ctx.closePath();
          ctx.fillStyle = 'rgba(241, 245, 249, 0.55)'; // Snow & glacial plateau
          ctx.fill();
        }

        // Hengduan & Yunnan Gorges (1500m - 3000m)
        const yunnanPts = [
          { lat: 28, lon: 98 }, { lat: 28, lon: 102 }, { lat: 23, lon: 103 },
          { lat: 22, lon: 100 }, { lat: 25, lon: 98 }
        ];
        ctx.beginPath();
        let yStarted = false;
        yunnanPts.forEach(pt => {
          const p = project3D(pt.lat, pt.lon, rotation.lat, rotation.lon, R, cx, cy);
          if (p.facing) {
            if (!yStarted) { ctx.moveTo(p.x, p.y); yStarted = true; }
            else ctx.lineTo(p.x, p.y);
          }
        });
        if (yStarted) {
          ctx.closePath();
          ctx.fillStyle = 'rgba(180, 83, 9, 0.35)'; // High mountain brown
          ctx.fill();
        }

        // Annamite Range (Dãy Trường Sơn)
        const truongSonPts = [
          { lat: 19, lon: 104 }, { lat: 17, lon: 106 }, { lat: 15, lon: 108 },
          { lat: 12, lon: 108.5 }, { lat: 13, lon: 107 }, { lat: 17, lon: 104.5 }
        ];
        ctx.beginPath();
        let tsStarted = false;
        truongSonPts.forEach(pt => {
          const p = project3D(pt.lat, pt.lon, rotation.lat, rotation.lon, R, cx, cy);
          if (p.facing) {
            if (!tsStarted) { ctx.moveTo(p.x, p.y); tsStarted = true; }
            else ctx.lineTo(p.x, p.y);
          }
        });
        if (tsStarted) {
          ctx.closePath();
          ctx.fillStyle = 'rgba(146, 64, 14, 0.3)'; // Mountain ridge
          ctx.fill();
        }
      }

      // 7. HIGHWAY & TRANSPORT NETWORK (When in 'transport' mode)
      if (showTransport && activeMode === 'transport') {
        // Asian Highways AH1 & AH3
        ASIAN_HIGHWAYS.forEach(hwy => {
          ctx.beginPath();
          let started = false;
          hwy.path.forEach(pt => {
            const p = project3D(pt.lat, pt.lon, rotation.lat, rotation.lon, R, cx, cy);
            if (p.facing) {
              if (!started) { ctx.moveTo(p.x, p.y); started = true; }
              else ctx.lineTo(p.x, p.y);
            }
          });
          if (started) {
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)'; // Glowing highway amber
            ctx.lineWidth = 2.0;
            ctx.setLineDash([4, 2]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // 8. MEKONG BASIN WATERSHED OUTLINE (Subtle boundary glow)
      const basinBorder = [
        { lat: 34.0, lon: 94.0 }, { lat: 33.0, lon: 97.0 }, { lat: 30.0, lon: 99.5 },
        { lat: 26.0, lon: 101.5 }, { lat: 22.5, lon: 102.5 }, { lat: 19.5, lon: 104.5 },
        { lat: 17.5, lon: 106.0 }, { lat: 15.0, lon: 108.0 }, { lat: 12.0, lon: 107.5 },
        { lat: 9.3, lon: 106.8 },  { lat: 9.0, lon: 104.8 },  { lat: 11.5, lon: 103.5 },
        { lat: 14.5, lon: 101.5 }, { lat: 17.5, lon: 101.0 }, { lat: 19.5, lon: 99.5 },
        { lat: 22.0, lon: 98.5 },  { lat: 28.0, lon: 97.0 },  { lat: 34.0, lon: 94.0 }
      ];
      ctx.beginPath();
      let bStarted = false;
      basinBorder.forEach(pt => {
        const p = project3D(pt.lat, pt.lon, rotation.lat, rotation.lon, R, cx, cy);
        if (p.facing) {
          if (!bStarted) { ctx.moveTo(p.x, p.y); bStarted = true; }
          else ctx.lineTo(p.x, p.y);
        }
      });
      if (bStarted) {
        ctx.closePath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.0;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.05)';
        ctx.fill();
      }

      // 9. BIỂN HỒ TONLE SAP & CONNECTING RIVER (Phình to mùa lũ, co lại mùa cạn)
      ctx.beginPath();
      let tsLakeStarted = false;
      const tsScale = activeSeason === 'flood' ? 1.25 : activeSeason === 'dry' ? 0.78 : 1.0;
      const tsCenterLat = 12.8;
      const tsCenterLon = 104.2;

      TONLE_SAP_COORDINATES.forEach(pt => {
        const scaledLat = tsCenterLat + (pt.lat - tsCenterLat) * tsScale;
        const scaledLon = tsCenterLon + (pt.lon - tsCenterLon) * tsScale;
        const p = project3D(scaledLat, scaledLon, rotation.lat, rotation.lon, R, cx, cy);
        if (p.facing) {
          if (!tsLakeStarted) { ctx.moveTo(p.x, p.y); tsLakeStarted = true; }
          else ctx.lineTo(p.x, p.y);
        }
      });
      if (tsLakeStarted) {
        ctx.closePath();
        ctx.fillStyle = activeSeason === 'flood' 
          ? 'rgba(6, 182, 212, 0.88)' 
          : activeSeason === 'dry' 
            ? 'rgba(14, 116, 144, 0.52)' 
            : 'rgba(14, 116, 144, 0.72)';
        ctx.fill();
        ctx.strokeStyle = activeSeason === 'flood' ? 'rgba(103, 232, 249, 0.95)' : 'rgba(56, 189, 248, 0.75)';
        ctx.lineWidth = activeSeason === 'flood' ? 2.8 : activeSeason === 'dry' ? 1.0 : 1.6;
        ctx.stroke();
      }

      // 10. MEKONG RIVER MAINSTREAM (4,763 KM DÒNG CHẢY - MỰC NƯỚC & ĐỘ RỘNG THEO MÙA)
      // Project all coordinates
      const riverScreenPoints = MEKONG_RIVER_COORDINATES.map((coord, idx) => {
        const p = project3D(coord.lat, coord.lon, rotation.lat, rotation.lon, R, cx, cy);
        return {
          ...coord,
          ...p,
          index: idx
        };
      });

      // Filter visible points facing the viewer
      const visibleRiverSegments: typeof riverScreenPoints[] = [];
      let currentSeg: typeof riverScreenPoints = [];

      riverScreenPoints.forEach(pt => {
        if (pt.facing) {
          currentSeg.push(pt);
        } else {
          if (currentSeg.length > 1) visibleRiverSegments.push(currentSeg);
          currentSeg = [];
        }
      });
      if (currentSeg.length > 1) visibleRiverSegments.push(currentSeg);

      // Draw Mainstream Glow & Base Lines (Mực nước điều chỉnh theo mùa)
      visibleRiverSegments.forEach(seg => {
        // Under-glow: mùa lũ mở rộng mạnh mẽ với ánh phù sa, mùa cạn thu hẹp dòng chảy
        ctx.beginPath();
        ctx.moveTo(seg[0].x, seg[0].y);
        for (let i = 1; i < seg.length; i++) {
          ctx.lineTo(seg[i].x, seg[i].y);
        }
        
        if (activeSeason === 'flood') {
          // Lũ phù sa dâng cao: vệt ngoài màu phù sa vàng nâu (silt), vệt trong màu xanh ngọc
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
          ctx.lineWidth = 9.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(seg[0].x, seg[0].y);
          for (let i = 1; i < seg.length; i++) {
            ctx.lineTo(seg[i].x, seg[i].y);
          }
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
          ctx.lineWidth = 6.0;
          ctx.stroke();
        } else if (activeSeason === 'dry') {
          // Mùa cạn: mực nước thấp, lòng sông hẹp lại
          ctx.strokeStyle = 'rgba(2, 132, 199, 0.35)';
          ctx.lineWidth = 3.0;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        } else {
          // TB năm: điều hòa cân đối
          ctx.strokeStyle = activeMode === 'transport' ? 'rgba(6, 182, 212, 0.55)' : 'rgba(56, 189, 248, 0.45)';
          ctx.lineWidth = 5.0;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Core river stream line (Lòng dẫn chính)
        ctx.beginPath();
        ctx.moveTo(seg[0].x, seg[0].y);
        for (let i = 1; i < seg.length; i++) {
          ctx.lineTo(seg[i].x, seg[i].y);
        }
        ctx.strokeStyle = activeSeason === 'flood' 
          ? '#38bdf8' 
          : activeSeason === 'dry' 
            ? '#0284c7' 
            : '#0ea5e9';
        // Mực nước: mùa cạn hẹp (1.8px), TB năm (2.8px), mùa lũ rộng (4.2px)
        ctx.lineWidth = activeSeason === 'flood' ? 4.2 : activeSeason === 'dry' ? 1.8 : 2.8;
        ctx.stroke();
      });

      // Highlight selected country's river segment
      if (selectedCountryIndex !== null) {
        const c = SIX_COUNTRIES_JOURNEY[selectedCountryIndex];
        const countryPoints = riverScreenPoints.filter(pt => {
          if (c.id === 'china') return pt.index <= 13;
          if (c.id === 'myanmar') return pt.index >= 13 && pt.index <= 16;
          if (c.id === 'laos') return pt.index >= 14 && pt.index <= 28;
          if (c.id === 'thailand') return pt.index >= 15 && pt.index <= 25;
          if (c.id === 'cambodia') return pt.index >= 27 && pt.index <= 33;
          if (c.id === 'vietnam') return pt.index >= 33;
          return false;
        });

        if (countryPoints.length > 1) {
          ctx.beginPath();
          let started = false;
          countryPoints.forEach(pt => {
            if (pt.facing) {
              if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
              else ctx.lineTo(pt.x, pt.y);
            }
          });
          if (started) {
            ctx.strokeStyle = c.color;
            ctx.lineWidth = activeSeason === 'flood' ? 5.8 : activeSeason === 'dry' ? 3.6 : 4.6;
            ctx.stroke();
          }
        }
      }

      // 11. ANIMATED ALLUVIUM & WATER FLOW PARTICLES ("Mô phỏng Phù sa & Dòng chảy theo mùa")
      if (showWaterFlow && visibleRiverSegments.length > 0) {
        // Mùa lũ: 46 hạt (nước cuộn, phù sa son vàng dồi dào ~160 triệu tấn/năm)
        // Mùa cạn: 20 hạt (nước trong xanh ngọc, phù sa lắng đọng)
        // TB năm: 30 hạt
        const numParticles = activeSeason === 'flood' ? 46 : activeSeason === 'dry' ? 20 : 30;
        const allFacingPoints = riverScreenPoints.filter(p => p.facing);

        if (allFacingPoints.length > 4) {
          for (let pIdx = 0; pIdx < numParticles; pIdx++) {
            const rawProgress = (pIdx / numParticles + flowOffsetRef.current) % 1;
            const floatIdx = rawProgress * (allFacingPoints.length - 1);
            const baseIdx = Math.floor(floatIdx);
            const frac = floatIdx - baseIdx;
            const ptA = allFacingPoints[baseIdx];
            const ptB = allFacingPoints[Math.min(baseIdx + 1, allFacingPoints.length - 1)];

            if (ptA && ptB) {
              const px = ptA.x + (ptB.x - ptA.x) * frac;
              const py = ptA.y + (ptB.y - ptA.y) * frac;

              // Phân biệt Hạt Phù Sa Mịn (Silt & Clay Alluvium) và Dòng Nước Ngọt
              // Mùa lũ: 75% hạt mang màu vàng son/đất phù sa, 25% là dòng nước xanh
              // Mùa cạn: 25% là hạt khoáng cát mịn, 75% là nước trong xanh biếc
              // TB năm: 50% phù sa, 50% nước ngọt
              const isSedimentParticle = activeSeason === 'flood' 
                ? (pIdx % 4 !== 0)
                : activeSeason === 'dry'
                  ? (pIdx % 4 === 0)
                  : (pIdx % 2 === 0);

              // Kích thước tăng dần về hạ lưu (tích tụ phù sa lớn ở Biển Hồ & ĐBSCL)
              const baseSize = activeSeason === 'flood' ? 2.6 : activeSeason === 'dry' ? 1.4 : 2.0;
              const particleSize = baseSize + (rawProgress * (activeSeason === 'flood' ? 2.5 : 1.3));

              // Vệt đuôi thủy động lực học dọc theo dòng chảy
              const prevFloatIdx = Math.max(0, floatIdx - (activeSeason === 'flood' ? 0.38 : 0.22));
              const prevBaseIdx = Math.floor(prevFloatIdx);
              const prevFrac = prevFloatIdx - prevBaseIdx;
              const prevPtA = allFacingPoints[prevBaseIdx];
              const prevPtB = allFacingPoints[Math.min(prevBaseIdx + 1, allFacingPoints.length - 1)];

              if (prevPtA && prevPtB) {
                const tailX = prevPtA.x + (prevPtB.x - prevPtA.x) * prevFrac;
                const tailY = prevPtA.y + (prevPtB.y - prevPtA.y) * prevFrac;

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(px, py);
                if (isSedimentParticle) {
                  // Vệt đuôi phù sa màu vàng đất son óng ánh
                  ctx.strokeStyle = activeSeason === 'flood' 
                    ? (pIdx % 3 === 0 ? 'rgba(217, 119, 6, 0.65)' : 'rgba(245, 158, 11, 0.55)')
                    : 'rgba(251, 191, 36, 0.4)';
                } else {
                  // Vệt đuôi nước ngọt xanh lam ngọc trong
                  ctx.strokeStyle = activeSeason === 'flood' 
                    ? 'rgba(56, 189, 248, 0.45)' 
                    : activeSeason === 'dry' 
                      ? 'rgba(56, 189, 248, 0.35)' 
                      : 'rgba(103, 232, 249, 0.4)';
                }
                ctx.lineWidth = particleSize * 0.85;
                ctx.lineCap = 'round';
                ctx.stroke();
              }

              // Glowing droplet / alluvium silt head
              ctx.beginPath();
              ctx.arc(px, py, particleSize, 0, Math.PI * 2);
              if (isSedimentParticle) {
                // Sắc màu phù sa sông Mê Kông: Vàng đất, son đỏ gạch, vàng óng
                if (activeSeason === 'flood') {
                  const sedimentColors = ['#f59e0b', '#fbbf24', '#d97706', '#ea580c', '#fef08a'];
                  ctx.fillStyle = sedimentColors[pIdx % sedimentColors.length];
                  ctx.shadowColor = '#d97706';
                  ctx.shadowBlur = 6;
                } else if (activeSeason === 'dry') {
                  ctx.fillStyle = '#fde68a';
                  ctx.shadowColor = '#d97706';
                  ctx.shadowBlur = 3;
                } else {
                  ctx.fillStyle = '#fcd34d';
                  ctx.shadowColor = '#f59e0b';
                  ctx.shadowBlur = 4;
                }
              } else {
                // Sắc màu dòng nước ngọt
                if (activeSeason === 'flood') {
                  ctx.fillStyle = '#bae6fd';
                  ctx.shadowColor = '#38bdf8';
                  ctx.shadowBlur = 5;
                } else if (activeSeason === 'dry') {
                  ctx.fillStyle = '#7dd3fc';
                  ctx.shadowColor = '#0284c7';
                  ctx.shadowBlur = 3;
                } else {
                  ctx.fillStyle = '#e0f2fe';
                  ctx.shadowColor = '#0ea5e9';
                  ctx.shadowBlur = 4;
                }
              }
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // 12. BRIDGES & PORTS (When in 'transport' mode)
      if (showTransport && activeMode === 'transport') {
        TRANSPORT_FEATURES.forEach(feature => {
          const p = project3D(feature.lat, feature.lon, rotation.lat, rotation.lon, R, cx, cy);
          if (p.facing) {
            if (feature.type === 'bridge') {
              // Bridge icon / diamond
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.fillStyle = '#f59e0b';
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.rect(-3.5, -3.5, 7, 7);
              ctx.fill();
              ctx.stroke();
              ctx.restore();
            } else {
              // Port icon / circle with anchor ring
              ctx.beginPath();
              ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
              ctx.fillStyle = '#38bdf8';
              ctx.strokeStyle = '#0f172a';
              ctx.lineWidth = 1.5;
              ctx.fill();
              ctx.stroke();
            }

            // Label if selected or zoomed
            if (zoom > 1.8 || selectedTransportFeature?.id === feature.id) {
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 9px sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(feature.name.split('(')[0], p.x, p.y - 7);
            }
          }
        });
      }

      // 13. HYDROLOGICAL STATIONS PINS & GAUGES ("Thông số về mực nước, lưu lượng")
      if (showStations) {
        HYDROLOGICAL_STATIONS.forEach(station => {
          const p = project3D(station.lat, station.lon, rotation.lat, rotation.lon, R, cx, cy);
          if (p.facing) {
            const isSelected = selectedStation?.id === station.id;

            // Pulsing ring if selected
            if (isSelected) {
              const pulseR = 8 + Math.sin(Date.now() / 150) * 3;
              ctx.beginPath();
              ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
              ctx.lineWidth = 2;
              ctx.stroke();
            }

            // Station Marker Circle
            ctx.beginPath();
            ctx.arc(p.x, p.y, isSelected ? 6.5 : 4.5, 0, Math.PI * 2);
            ctx.fillStyle = isSelected ? '#ef4444' : '#fbbf24';
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.8;
            ctx.fill();
            ctx.stroke();

            // Water Level or Discharge Micro Badge (When zoomed or selected)
            if (showLabels && (zoom > 1.6 || isSelected)) {
              const stationLevel = station.waterLevel[activeSeason];
              const stationFlow = station.discharge[activeSeason];
              const seasonTag = activeSeason === 'flood' ? 'Lũ' : activeSeason === 'dry' ? 'Cạn' : 'TB';
              const labelText = isSelected 
                ? `${station.name.split('(')[0]}: ${stationLevel.toFixed(1)}m [${seasonTag}] | ${stationFlow.toLocaleString()} m³/s`
                : `${stationLevel.toFixed(1)}m (${seasonTag})`;

              ctx.font = isSelected ? 'bold 10px sans-serif' : '9px sans-serif';
              const textWidth = ctx.measureText(labelText).width;

              // Badge background
              ctx.fillStyle = isSelected ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.75)';
              ctx.strokeStyle = isSelected ? '#ef4444' : '#fbbf24';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.roundRect(p.x - textWidth / 2 - 4, p.y - 19, textWidth + 8, 14, 3);
              ctx.fill();
              ctx.stroke();

              // Badge Text
              ctx.fillStyle = isSelected ? '#fef08a' : '#ffffff';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(labelText, p.x, p.y - 12);
            }
          }
        });
      }

      // 14. 9 ESTUARIES / VIETNAM MEKONG DELTA HIGHLIGHT
      const deltaPt = project3D(10.04, 105.78, rotation.lat, rotation.lon, R, cx, cy);
      if (deltaPt.facing && zoom > 1.4) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('🌾 ĐBSCL (Cửu Long 9 Cửa Sông)', deltaPt.x + 8, deltaPt.y + 4);
      }

      // 15. RESTORE CLIPPING & FINALIZE 3D SPHERE SHADING
      ctx.restore();

      // Outer Rim Shadow (3D spherical depth)
      const rimGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R);
      rimGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      rimGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)');
      rimGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad;
      ctx.fill();

      // Specular highlight on top-left (Sun reflection)
      const sunGrad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.35, cy - R * 0.35, R * 0.75);
      sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      sunGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
      sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [
    rotation, 
    zoom, 
    isAutoRotating, 
    activeMode, 
    activeSeason, 
    selectedCountryIndex, 
    selectedStation, 
    selectedTransportFeature, 
    showStations, 
    showWaterFlow, 
    showTransport, 
    showGraticule, 
    showLabels, 
    flowSpeedSetting,
    isFlowPaused,
    project3D
  ]);

  // Mouse & Touch Drag Handlers for rotating the globe
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    targetCamRef.current.active = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setRotation(prev => {
      const sensitivity = 0.35 / zoom;
      const nextLon = (prev.lon - dx * sensitivity + 360) % 360;
      const nextLat = Math.max(-80, Math.min(80, prev.lat + dy * sensitivity));
      return { lat: nextLat, lon: nextLon };
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      targetCamRef.current.active = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setRotation(prev => {
      const sensitivity = 0.4 / zoom;
      const nextLon = (prev.lon - dx * sensitivity + 360) % 360;
      const nextLat = Math.max(-80, Math.min(80, prev.lat + dy * sensitivity));
      return { lat: nextLat, lon: nextLon };
    });
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.75, Math.min(4.5, prev + delta)));
  };

  // Canvas Click detection for Stations & Transport Features
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const R = Math.min(width, height) * 0.4 * zoom;

    // Check Hydrological Stations first
    let hitStation: HydrologicalStation | null = null;
    HYDROLOGICAL_STATIONS.forEach(station => {
      const p = project3D(station.lat, station.lon, rotation.lat, rotation.lon, R, cx, cy);
      if (p.facing) {
        const dist = Math.hypot(p.x - clickX, p.y - clickY);
        if (dist < 16) {
          hitStation = station;
        }
      }
    });

    if (hitStation) {
      setSelectedStation(hitStation);
      setSelectedTransportFeature(null);
      soundFx.playWaterSplash();
      return;
    }

    // Check Transport features
    if (activeMode === 'transport') {
      let hitTransport: TransportRoute | null = null;
      TRANSPORT_FEATURES.forEach(feature => {
        const p = project3D(feature.lat, feature.lon, rotation.lat, rotation.lon, R, cx, cy);
        if (p.facing) {
          const dist = Math.hypot(p.x - clickX, p.y - clickY);
          if (dist < 14) {
            hitTransport = feature;
          }
        }
      });

      if (hitTransport) {
        setSelectedTransportFeature(hitTransport);
        soundFx.playClick();
      }
    }
  };

  // Reset to default Mekong basin view
  const handleResetView = () => {
    flyTo(18, 102, 1.25);
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl overflow-hidden relative">
      {/* 1. Header Toolbar: Mode Switcher & Season Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{isEn ? '3D Interactive Mekong Globe' : 'Quả Địa Cầu 3D Tương Tác Sông Mê Kông'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold">
                4.763 KM
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            {isEn 
              ? 'Manipulate and observe the 3D globe showing the Mekong flow across 6 riparian nations, satellite imagery, topography, inland waterways, and hydrological metrics.'
              : 'Xoay, thu phóng và theo dõi dòng chảy sông Mê Kông chuyển động qua 6 quốc gia, 3 chế độ (Vệ tinh, Địa hình, Giao thông) cùng trạm đo Mực nước & Lưu lượng nước.'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onSwitchToMap && (
            <button
              onClick={() => {
                onSwitchToMap();
                soundFx.playClick();
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-lg shadow-emerald-900/40 border border-emerald-400/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
              title="Chuyển sang Bản Đồ Thủy Hệ & 9 Cửa Sông chi tiết"
            >
              <MapPin className="w-4 h-4 text-emerald-200" />
              <span>{isEn ? '🗺️ Switch to 2D River Map' : '🗺️ Xem Bản Đồ Thủy Hệ & 9 Cửa Sông'}</span>
            </button>
          )}

          {/* 3 Core Modes Switcher (Vệ tinh, Địa hình, Giao thông) */}
          <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner gap-1">
          <button
            onClick={() => { setActiveMode('satellite'); soundFx.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'satellite'
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isEn ? 'Satellite' : 'Vệ Tinh'}</span>
          </button>

          <button
            onClick={() => { setActiveMode('terrain'); soundFx.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'terrain'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>{isEn ? 'Terrain' : 'Địa Hình'}</span>
          </button>

          <button
            onClick={() => { setActiveMode('transport'); soundFx.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'transport'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{isEn ? 'Transport & Ports' : 'Giao Thông & Cảng'}</span>
          </button>
        </div>
      </div>
      </div>

      {/* 2. Hydrological Season & Water Flow Speed Control Center */}
      <div className="my-3 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-md flex flex-col gap-2.5 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Season Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-200 shrink-0">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>{isEn ? 'Hydrological Season:' : 'Mùa Thủy Văn & Mực Nước:'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => { setActiveSeason('normal'); soundFx.playClick(); }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  activeSeason === 'normal'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md ring-2 ring-cyan-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>⚖️</span>
                <span>{isEn ? 'Annual Average (2.5m)' : 'TB Năm (Nước 2.5m • 15.000 m³/s)'}</span>
              </button>

              <button
                onClick={() => { setActiveSeason('flood'); soundFx.playWaterSplash(); }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  activeSeason === 'flood'
                    ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white shadow-md ring-2 ring-rose-400/50 animate-pulse'
                    : 'bg-slate-800 text-rose-300 hover:bg-slate-700'
                }`}
              >
                <Waves className="w-3.5 h-3.5" />
                <span>{isEn ? 'Flood Season (4.2m)' : 'Mùa Lũ (Nước dâng 4.2m • 39.000 m³/s)'}</span>
              </button>

              <button
                onClick={() => { setActiveSeason('dry'); soundFx.playClick(); }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  activeSeason === 'dry'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md ring-2 ring-amber-400/50'
                    : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                }`}
              >
                <span>☀️</span>
                <span>{isEn ? 'Dry Season (1.0m)' : 'Mùa Cạn / Kiệt (Nước 1.0m • 1.800 m³/s)'}</span>
              </button>
            </div>
          </div>

          {/* Flow Speed Controls (Tốc độ dòng chảy theo mùa) */}
          <div className="flex items-center bg-slate-950/90 px-2.5 py-1.5 rounded-xl border border-slate-800 gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 hidden sm:flex">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>{isEn ? 'Flow Speed:' : 'Tốc độ chảy:'}</span>
            </span>

            <button
              onClick={() => { setIsFlowPaused(!isFlowPaused); soundFx.playClick(); }}
              title={isFlowPaused ? 'Tiếp tục dòng chảy' : 'Tạm dừng dòng chảy để quan sát'}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isFlowPaused
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isFlowPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isFlowPaused ? (isEn ? 'Resume' : 'Chạy') : (isEn ? 'Pause' : 'Dừng')}</span>
            </button>

            <button
              onClick={() => { setFlowSpeedSetting('slow'); soundFx.playClick(); }}
              title="Chảy rất chậm & êm dịu"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                flowSpeedSetting === 'slow'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              0.5x êm dịu
            </button>

            <button
              onClick={() => { setFlowSpeedSetting('natural'); soundFx.playClick(); }}
              title="Tốc độ tự nhiên chuẩn mùa thủy văn"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                flowSpeedSetting === 'natural'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              1.0x chuẩn mùa
            </button>

            <button
              onClick={() => { setFlowSpeedSetting('brisk'); soundFx.playClick(); }}
              title="Tốc độ nhanh hơn"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                flowSpeedSetting === 'brisk'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              1.5x nhanh
            </button>
          </div>
        </div>

        {/* Real-time Hydrological Dynamics Insight Banner */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              activeSeason === 'flood' ? 'bg-rose-400 animate-ping' : activeSeason === 'dry' ? 'bg-amber-400' : 'bg-cyan-400'
            }`} />
            <span className="text-slate-300">
              {activeSeason === 'flood' ? (
                <>
                  <strong className="text-rose-400">🌊 Mùa Lũ (T7 - T11):</strong> Dòng chảy cuồn cuộn giàu phù sa, vận tốc nước tăng ~1.8 - 2.5 m/s, mực nước Tân Châu dâng 4.0 - 4.5m (Báo động II-III), nước từ sông Mê Kông chảy ngược vào Biển Hồ Tonle Sap!
                </>
              ) : activeSeason === 'dry' ? (
                <>
                  <strong className="text-amber-400">☀️ Mùa Cạn / Kiệt (T12 - T6):</strong> Dòng nước chảy rất chậm êm dịu (~0.3 - 0.6 m/s), mực nước xuống thấp 0.8 - 1.2m, lòng sông thu hẹp, Biển Hồ Tonle Sap xả nước ngọt giải mặn cho ĐBSCL.
                </>
              ) : (
                <>
                  <strong className="text-cyan-400">⚖️ Mùa Bình Thường (TB Năm):</strong> Dòng nước trôi thong thả hiền hòa (~0.8 - 1.2 m/s), mực nước điều hòa 2.2 - 2.8m, cân bằng sinh thái trên toàn lưu vực 4.763 km.
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <span className="px-2 py-0.5 rounded-md bg-slate-950 font-mono text-[10px] text-cyan-300 border border-slate-800">
              {isFlowPaused 
                ? '⏸️ Đang dừng dòng chảy' 
                : activeSeason === 'flood' 
                  ? 'Vận tốc: ~2.1 m/s (Xiết)' 
                  : activeSeason === 'dry' 
                    ? 'Vận tốc: ~0.4 m/s (Chậm rãi)' 
                    : 'Vận tốc: ~1.0 m/s (Điều hòa)'}
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">
              {activeSeason === 'flood' ? 'Mực nước dâng +3.2m' : activeSeason === 'dry' ? 'Mực nước rút -2.0m' : 'Mực nước chuẩn'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. 6 Riparian Countries Journey Stepper */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEn ? 'Mekong River Course across 6 Nations:' : 'Hành trình Sông Mê Kông qua 6 Quốc Gia Lưu Vực:'}</span>
          </span>

          <button
            onClick={() => {
              setIsAutoTourPlaying(!isAutoTourPlaying);
              soundFx.playClick();
            }}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              isAutoTourPlaying
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {isAutoTourPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoTourPlaying ? (isEn ? 'Pause Tour' : 'Dừng Tour') : (isEn ? 'Auto Tour 6 Nations' : 'Tự Động Chiếu 6 Nước')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SIX_COUNTRIES_JOURNEY.map((country, idx) => {
            const isSelected = selectedCountryIndex === idx;
            return (
              <button
                key={country.id}
                onClick={() => handleSelectCountry(country)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-base">{country.flag}</span>
                  <span 
                    className="text-[10px] font-black px-1.5 py-0.2 rounded-full"
                    style={{ backgroundColor: `${country.color}25`, color: country.color }}
                  >
                    #{country.index}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{country.nameVi.split('(')[0]}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  <span className="font-semibold text-emerald-400">{country.lengthKm} km</span> • {country.shareFlow}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Interactive 3D Canvas Stage */}
      <div 
        ref={containerRef}
        className="relative w-full h-[480px] sm:h-[580px] rounded-2xl bg-black overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        {/* Floating Top-Left Mode Indicator */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2 pointer-events-none shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold">
            {activeMode === 'satellite' ? '🛰️ Chế độ Vệ Tinh (Satellite Imagery)' : activeMode === 'terrain' ? '🏔️ Chế độ Địa Hình & Đai Cao (Topography)' : '🚢 Chế độ Giao Thông & Tuyến Thủy (Navigation)'}
          </span>
          <span className="text-slate-400 text-[10px]">
            {isEn ? 'Drag to rotate • Scroll to zoom' : 'Kéo để xoay • Cuộn để zoom'}
          </span>
        </div>

        {/* Floating Sediment Legend Pill (Chú thích hạt phù sa) */}
        {showWaterFlow && (
          <div className="absolute top-12 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-amber-500/40 text-[11px] text-amber-200 flex items-center gap-2 pointer-events-none shadow-lg">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                activeSeason === 'flood' ? 'bg-amber-400 animate-pulse' : activeSeason === 'dry' ? 'bg-cyan-400' : 'bg-amber-300'
              }`} />
              <span className="font-semibold">
                {activeSeason === 'flood' 
                  ? '🍂 Hạt phù sa vàng son bồi đắp (~160 triệu tấn/năm ra ĐBSCL)' 
                  : activeSeason === 'dry' 
                    ? '💧 Dòng chảy mùa cạn: Nước trong xanh, ít phù sa lơ lửng' 
                    : '🌾 Dòng phù sa & nước ngọt hài hòa'}
              </span>
            </span>
          </div>
        )}

        {/* Floating Controls (Zoom, Reset, Auto-rotate, Layers) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
          <button
            onClick={() => setZoom(prev => Math.min(4.5, prev + 0.25))}
            title={isEn ? 'Zoom In' : 'Phóng to'}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-md cursor-pointer transition-transform hover:scale-105"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(0.75, prev - 0.25))}
            title={isEn ? 'Zoom Out' : 'Thu nhỏ'}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-md cursor-pointer transition-transform hover:scale-105"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setIsAutoRotating(!isAutoRotating); soundFx.playClick(); }}
            title={isAutoRotating ? 'Dừng tự xoay' : 'Tự xoay quả địa cầu'}
            className={`p-2 rounded-xl border shadow-md cursor-pointer transition-all ${
              isAutoRotating 
                ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse' 
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            title={isEn ? 'Reset to Mekong Basin' : 'Về vị trí Sông Mê Kông'}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-md cursor-pointer transition-transform hover:scale-105"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Floating Bottom Layer Filters */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto flex flex-wrap items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 text-xs shadow-xl">
          <button
            onClick={() => { setShowWaterFlow(!showWaterFlow); soundFx.playClick(); }}
            title="Bật / tắt mô phỏng hạt phù sa bồi đắp và dòng chảy Mekong"
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              showWaterFlow 
                ? activeSeason === 'flood'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-xs' 
                  : 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Waves className="w-3 h-3" />
            <span>{isEn ? 'Sediment & Flow' : 'Hạt Phù Sa & Dòng Chảy'}</span>
          </button>

          <button
            onClick={() => { setShowStations(!showStations); soundFx.playClick(); }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              showStations ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>{isEn ? 'Hydrology Stations' : 'Trạm Thủy Văn'}</span>
          </button>

          <button
            onClick={() => { setShowGraticule(!showGraticule); soundFx.playClick(); }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              showGraticule ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>{isEn ? 'Graticule Grid' : 'Lưới Tọa Độ'}</span>
          </button>
        </div>
      </div>

      {/* 4.5. MẠNG LƯỚI 25 TRẠM THỦY VĂN TOÀN TUYẾN SÔNG MÊ KÔNG */}
      <div className="mt-4 bg-slate-900/95 rounded-2xl p-4 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-xs">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  {isEn ? 'Mekong Hydrological Stations Network (25 Stations)' : 'Mạng Lưới 25 Trạm Thủy Văn Toàn Tuyến Sông Mê Kông'}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  {filteredStations.length} / {HYDROLOGICAL_STATIONS.length} {isEn ? 'stations' : 'trạm'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn 
                  ? 'Click any station to fly the 3D globe camera and inspect real-time seasonal water levels & discharge' 
                  : 'Bấm chọn bất kỳ trạm nào để địa cầu 3D bay tới vị trí thực địa, theo dõi mực nước và lưu lượng theo mùa'}
              </p>
            </div>
          </div>

          {/* Search Input, Country Filter Pills & Season Quick Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Season View Selector for the Carousel */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold px-1.5 hidden md:inline">
                {isEn ? 'Season:' : 'Xem mùa:'}
              </span>
              <button
                onClick={() => { setActiveSeason('flood'); soundFx.playWaterSplash(); }}
                title="Xem mực nước mùa lũ (Tháng 7 - 11)"
                className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                  activeSeason === 'flood'
                    ? 'bg-rose-600 text-white shadow-xs ring-1 ring-rose-400'
                    : 'text-slate-400 hover:text-rose-300'
                }`}
              >
                <Waves className="w-3 h-3" />
                <span>Mùa Lũ (T7-11)</span>
              </button>
              <button
                onClick={() => { setActiveSeason('dry'); soundFx.playWaterSplash(); }}
                title="Xem mực nước mùa cạn (Tháng 12 - 6)"
                className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                  activeSeason === 'dry'
                    ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-400'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <span>☀️ Mùa Cạn (T12-6)</span>
              </button>
              <button
                onClick={() => { setActiveSeason('normal'); soundFx.playWaterSplash(); }}
                title="Xem mực nước trung bình năm"
                className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                  activeSeason === 'normal'
                    ? 'bg-cyan-600 text-white shadow-xs ring-1 ring-cyan-400'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                <span>⚖️ Trung Bình</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input 
                type="text"
                value={stationSearchQuery}
                onChange={(e) => setStationSearchQuery(e.target.value)}
                placeholder={isEn ? "Search station or code..." : "Tìm trạm, mã MRC, vai trò..."}
                className="pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-48"
              />
              {stationSearchQuery && (
                <button 
                  onClick={() => setStationSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Country Filters */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
              {[
                { id: 'all', label: isEn ? 'All (25)' : 'Tất cả (25)' },
                { id: 'Trung Quốc', label: '🇨🇳 T.Quốc (4)' },
                { id: 'Thái Lan', label: '🇹🇭 Thái Lan (5)' },
                { id: 'Lào', label: '🇱🇦 Lào (6)' },
                { id: 'Campuchia', label: '🇰🇭 CPC (4)' },
                { id: 'Việt Nam', label: '🇻🇳 VN (7)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setStationCountryFilter(tab.id);
                    soundFx.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                    stationCountryFilter === tab.id
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Station Carousel / Chip Strip */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
          {filteredStations.map((station) => {
            const isSelected = selectedStation?.id === station.id;
            const currentLevel = station.waterLevel[activeSeason];
            const isAlarm = currentLevel >= station.waterLevel.alarm1;
            return (
              <button
                key={station.id}
                onClick={() => handleSelectStation(station)}
                className={`flex-shrink-0 text-left p-2.5 rounded-xl border transition-all cursor-pointer w-48 sm:w-56 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/90 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/60 ring-2 ring-cyan-400/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-base flex-shrink-0">{station.flag}</span>
                    <span className="text-xs font-bold text-white truncate group-hover:text-cyan-300">
                      {station.name.split('(')[0].trim().replace(/^Trạm\s+/, '')}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 flex-shrink-0">
                    {station.mrcStationCode}
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 truncate mb-2">
                  {station.role}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-800/80">
                  <span className="text-slate-400 font-mono text-[10px]">
                    Km {station.riverKm}
                  </span>
                  <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 ${
                    isAlarm
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : activeSeason === 'flood'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800/60'
                        : activeSeason === 'dry'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                  }`}>
                    <span className="opacity-75 uppercase text-[9px]">{activeSeason === 'flood' ? 'Lũ' : activeSeason === 'dry' ? 'Cạn' : 'TB'}:</span>
                    <span>{currentLevel.toFixed(1)}m</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Telemetry & Analytical Details Panel (Selected Station or Country) */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Station Hydrological Metrics (Water Level & Discharge) */}
        {selectedStation && (
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              {/* Station Navigation Header along River Flow */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
                <button
                  onClick={handlePrevStation}
                  disabled={!prevStation}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    prevStation
                      ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 cursor-pointer'
                      : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                  }`}
                  title={prevStation ? `Thượng lưu: ${prevStation.name}` : undefined}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[110px] sm:max-w-[150px]">
                    {prevStation ? prevStation.name.split('(')[0].replace(/^Trạm\s+/, '') : 'Nguồn Tây Tạng'}
                  </span>
                </button>

                <button
                  onClick={() => flyTo(selectedStation.lat, selectedStation.lon, 2.8)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-900/60 hover:bg-cyan-800/80 text-cyan-300 border border-cyan-700/60 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                  title="Bay tới trạm này trên quả địa cầu 3D"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bay tới vị trí</span>
                </button>

                <button
                  onClick={handleNextStation}
                  disabled={!nextStation}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    nextStation
                      ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 cursor-pointer'
                      : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                  }`}
                  title={nextStation ? `Hạ lưu: ${nextStation.name}` : undefined}
                >
                  <span className="truncate max-w-[110px] sm:max-w-[150px]">
                    {nextStation ? nextStation.name.split('(')[0].replace(/^Trạm\s+/, '') : 'Biển Đông'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Station Info Title */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1 bg-slate-950 rounded-lg border border-slate-800">{selectedStation.flag}</span>
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span>{selectedStation.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                        {selectedStation.mrcStationCode}
                      </span>
                    </h3>
                    <span className="text-xs text-slate-400">
                      {selectedStation.role} • {selectedStation.country}
                    </span>
                  </div>
                </div>

                {/* Season Switcher in Station Header */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isEn ? 'Season Mode:' : 'Đang chọn mùa:'}
                  </span>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => { setActiveSeason('flood'); soundFx.playWaterSplash(); }}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all flex items-center gap-1 ${
                        activeSeason === 'flood'
                          ? 'bg-rose-600 text-white shadow-xs ring-1 ring-rose-400'
                          : 'text-slate-400 hover:text-rose-300'
                      }`}
                    >
                      <Waves className="w-3 h-3" />
                      <span>Lũ (T7-11)</span>
                    </button>
                    <button
                      onClick={() => { setActiveSeason('dry'); soundFx.playWaterSplash(); }}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all flex items-center gap-1 ${
                        activeSeason === 'dry'
                          ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-400'
                          : 'text-slate-400 hover:text-amber-300'
                      }`}
                    >
                      <Sun className="w-3 h-3" />
                      <span>Cạn (T12-6)</span>
                    </button>
                    <button
                      onClick={() => { setActiveSeason('normal'); soundFx.playWaterSplash(); }}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all flex items-center gap-1 ${
                        activeSeason === 'normal'
                          ? 'bg-cyan-600 text-white shadow-xs ring-1 ring-cyan-400'
                          : 'text-slate-400 hover:text-cyan-300'
                      }`}
                    >
                      <span>TB Năm</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Distance and Elevation Badges */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-[11px]">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Lý trình từ nguồn</span>
                  <span className="font-bold text-white font-mono">{selectedStation.riverKm.toLocaleString()} km</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Cách Biển Đông</span>
                  <span className="font-bold text-cyan-400 font-mono">{Math.max(0, 4763 - selectedStation.riverKm).toLocaleString()} km</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Cao độ địa hình</span>
                  <span className="font-bold text-amber-300 font-mono">{selectedStation.elevationM} m</span>
                </div>
              </div>

              {/* Station Analytical View Tabs (So sánh mùa & Diễn biến) */}
              <div className="flex items-center gap-1.5 mb-3 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  onClick={() => { setStationViewTab('all-seasons'); soundFx.playClick(); }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    stationViewTab === 'all-seasons'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>{isEn ? '3-Season Comparison' : 'So Sánh 3 Mùa (Lũ vs Cạn)'}</span>
                </button>

                <button
                  onClick={() => { setStationViewTab('monthly'); soundFx.playClick(); }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    stationViewTab === 'monthly'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isEn ? '12-Month Hydrograph' : 'Diễn Biến 12 Tháng'}</span>
                </button>

                <button
                  onClick={() => { setStationViewTab('current'); soundFx.playClick(); }}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    stationViewTab === 'current'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Gauge Detail' : 'Đồng Hồ Đo'}</span>
                </button>
              </div>

              {/* TAB 1: 3-SEASON COMPARISON (Mùa Cạn vs Trung Bình vs Mùa Lũ) */}
              {stationViewTab === 'all-seasons' && (
                <div className="space-y-3 mb-3">
                  {/* 3 Columns Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Column 1: MÙA CẠN / KIỆT */}
                    <div 
                      onClick={() => { setActiveSeason('dry'); soundFx.playWaterSplash(); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        activeSeason === 'dry'
                          ? 'bg-gradient-to-b from-amber-950/70 to-slate-950 border-amber-500 ring-2 ring-amber-400/30 shadow-lg'
                          : 'bg-slate-950/80 border-slate-800 hover:border-amber-700/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Sun className="w-3 h-3" />
                            <span>Mùa Cạn / Kiệt</span>
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-mono">
                            T12 - T6
                          </span>
                        </div>
                        <div className="my-1.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-amber-300">
                              {selectedStation.waterLevel.dry.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-400">mét</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Lưu lượng: <strong className="text-amber-200">{selectedStation.discharge.dry.toLocaleString()}</strong> m³/s
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 mt-2">
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                          <div 
                            className="bg-amber-400 h-full"
                            style={{ width: `${Math.min(100, (selectedStation.waterLevel.dry / selectedStation.waterLevel.alarm3) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-slate-400 block truncate">
                          {selectedStation.waterLevel.dry <= selectedStation.waterLevel.alarm1 * 0.35 
                            ? '⚠️ Cạn kiệt, nguy cơ xâm nhập mặn' 
                            : 'Mực nước thấp, dòng êm'}
                        </span>
                      </div>
                    </div>

                    {/* Column 2: TRUNG BÌNH NĂM */}
                    <div 
                      onClick={() => { setActiveSeason('normal'); soundFx.playWaterSplash(); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        activeSeason === 'normal'
                          ? 'bg-gradient-to-b from-cyan-950/70 to-slate-950 border-cyan-500 ring-2 ring-cyan-400/30 shadow-lg'
                          : 'bg-slate-950/80 border-slate-800 hover:border-cyan-700/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                            <Droplets className="w-3 h-3" />
                            <span>Trung Bình Năm</span>
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 font-mono">
                            Điều hòa
                          </span>
                        </div>
                        <div className="my-1.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-cyan-300">
                              {selectedStation.waterLevel.normal.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-400">mét</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Lưu lượng: <strong className="text-cyan-200">{selectedStation.discharge.normal.toLocaleString()}</strong> m³/s
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 mt-2">
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                          <div 
                            className="bg-cyan-400 h-full"
                            style={{ width: `${Math.min(100, (selectedStation.waterLevel.normal / selectedStation.waterLevel.alarm3) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-emerald-400 block truncate">
                          ✓ Dòng chảy điều hòa, an toàn
                        </span>
                      </div>
                    </div>

                    {/* Column 3: MÙA LŨ / NGẬP LỤT */}
                    <div 
                      onClick={() => { setActiveSeason('flood'); soundFx.playWaterSplash(); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        activeSeason === 'flood'
                          ? 'bg-gradient-to-b from-rose-950/70 to-slate-950 border-rose-500 ring-2 ring-rose-400/30 shadow-lg'
                          : 'bg-slate-950/80 border-slate-800 hover:border-rose-700/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                            <Waves className="w-3 h-3" />
                            <span>Mùa Lũ / Ngập</span>
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-mono">
                            T7 - T11
                          </span>
                        </div>
                        <div className="my-1.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-rose-300">
                              {selectedStation.waterLevel.flood.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-400">mét</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Lưu lượng: <strong className="text-rose-200">{selectedStation.discharge.flood.toLocaleString()}</strong> m³/s
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 mt-2">
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                          <div 
                            className="bg-rose-500 h-full"
                            style={{ width: `${Math.min(100, (selectedStation.waterLevel.flood / selectedStation.waterLevel.alarm3) * 100)}%` }}
                          />
                        </div>
                        <span className={`text-[9px] font-semibold block truncate ${
                          selectedStation.waterLevel.flood >= selectedStation.waterLevel.alarm2 ? 'text-rose-400' : 'text-amber-300'
                        }`}>
                          {selectedStation.waterLevel.flood >= selectedStation.waterLevel.alarm3
                            ? '🚨 Vượt Báo Động 3'
                            : selectedStation.waterLevel.flood >= selectedStation.waterLevel.alarm2
                              ? '⚠️ Chạm Báo Động 2'
                              : 'Báo Động 1'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Seasonal Amplitude Indicator (ΔH = H_lũ - H_cạn) */}
                  <div className="p-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-cyan-900/40 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span className="font-extrabold text-white">Biên Độ Dao Động Mực Nước Giữa 2 Mùa (ΔH):</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-lg border border-cyan-800">
                          ΔH = +{(selectedStation.waterLevel.flood - selectedStation.waterLevel.dry).toFixed(2)} mét
                        </span>
                        <span className="font-mono text-xs text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-lg border border-rose-800/60">
                          Lưu lượng gấp {(selectedStation.discharge.flood / Math.max(1, selectedStation.discharge.dry)).toFixed(1)} lần
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {selectedStation.waterLevel.flood - selectedStation.waterLevel.dry > 10 
                        ? `Tại ${selectedStation.name}, sự biến thiên mùa cực kỳ dữ dội với biên độ nước chênh lệch hơn ${(selectedStation.waterLevel.flood - selectedStation.waterLevel.dry).toFixed(1)}m. Mùa lũ dòng chảy đạt ${selectedStation.discharge.flood.toLocaleString()} m³/s mang lượng phù sa khổng lồ bồi đắp toàn vùng hạ du.`
                        : `Tại ${selectedStation.name}, dòng sông chịu tác động hỗn hợp của lũ thượng lưu và chế độ nhật triều/bán nhật triều. Mùa cạn mực nước xuống ${selectedStation.waterLevel.dry.toFixed(1)}m làm gia tăng xâm nhập mặn; mùa lũ dâng ${selectedStation.waterLevel.flood.toFixed(1)}m mang nước ngọt và phù sa tràn đồng.`}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: 12-MONTH HYDROGRAPH TIMELINE */}
              {stationViewTab === 'monthly' && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-3">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-1.5 font-bold text-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Diễn Biến Mực Nước 12 Tháng Trong Năm (Thủy Triều & Lũ)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Đơn vị: mét (m)</span>
                  </div>

                  {/* 12-Month Bar Visualizer */}
                  {(() => {
                    const monthlyData = getMonthlyHydroData(selectedStation);
                    const maxLevel = Math.max(...monthlyData.map(m => m.level), selectedStation.waterLevel.alarm2 || 10) * 1.12;
                    const activeHoverData = hoveredMonthIdx !== null 
                      ? monthlyData[hoveredMonthIdx] 
                      : monthlyData[activeSeason === 'flood' ? 8 : activeSeason === 'dry' ? 2 : 5];

                    return (
                      <div>
                        {/* Bar Grid */}
                        <div className="h-28 flex items-end justify-between gap-1 sm:gap-1.5 pt-2 pb-1 border-b border-slate-800 relative">
                          {/* Alarm 1 horizontal reference line */}
                          {selectedStation.waterLevel.alarm1 && (
                            <div 
                              className="absolute left-0 right-0 border-t border-dashed border-rose-500/50 flex items-center justify-end pr-1 pointer-events-none z-10"
                              style={{ bottom: `${(selectedStation.waterLevel.alarm1 / maxLevel) * 100}%` }}
                            >
                              <span className="text-[8px] text-rose-400 font-mono bg-slate-950/90 px-1 rounded">BĐ1 ({selectedStation.waterLevel.alarm1}m)</span>
                            </div>
                          )}

                          {monthlyData.map((item, idx) => {
                            const heightPct = Math.max(8, Math.min(100, (item.level / maxLevel) * 100));
                            const isHovered = hoveredMonthIdx === idx;
                            const isPeak = idx === 8; // Month 9 (peak flood)
                            const isNadir = idx === 2; // Month 3 (lowest dry)

                            return (
                              <div
                                key={item.month}
                                onMouseEnter={() => setHoveredMonthIdx(idx)}
                                onMouseLeave={() => setHoveredMonthIdx(null)}
                                onClick={() => {
                                  if (item.season === 'flood') setActiveSeason('flood');
                                  else if (item.season === 'dry') setActiveSeason('dry');
                                  else setActiveSeason('normal');
                                  soundFx.playClick();
                                }}
                                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                              >
                                {/* Bar Value on Hover or Peak */}
                                {(isHovered || isPeak || isNadir) && (
                                  <span className={`text-[8px] font-mono font-bold absolute -top-4 transition-all whitespace-nowrap ${
                                    isPeak ? 'text-rose-400 font-extrabold' : isNadir ? 'text-amber-400' : 'text-cyan-300'
                                  }`}>
                                    {item.level.toFixed(1)}m
                                  </span>
                                )}

                                {/* Colored Bar */}
                                <div 
                                  className={`w-full rounded-t-md transition-all duration-300 ${
                                    isHovered
                                      ? 'brightness-125 ring-2 ring-white scale-y-105'
                                      : ''
                                  } ${
                                    item.season === 'flood'
                                      ? isPeak 
                                        ? 'bg-gradient-to-t from-rose-700 to-rose-400 shadow-rose-950/50 shadow-md' 
                                        : 'bg-gradient-to-t from-blue-700 to-indigo-400'
                                      : item.season === 'dry'
                                        ? isNadir
                                          ? 'bg-gradient-to-t from-amber-700 to-amber-400'
                                          : 'bg-gradient-to-t from-amber-800 to-amber-500'
                                        : 'bg-gradient-to-t from-cyan-800 to-cyan-400'
                                  }`}
                                  style={{ height: `${heightPct}%` }}
                                />

                                {/* Month label */}
                                <span className={`text-[9px] font-mono mt-1 ${
                                  isHovered ? 'text-white font-bold' : isPeak ? 'text-rose-400 font-bold' : isNadir ? 'text-amber-400' : 'text-slate-400'
                                }`}>
                                  {item.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Interactive Month Detail Card */}
                        <div className="mt-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              activeHoverData.season === 'flood' ? 'bg-rose-400' : activeHoverData.season === 'dry' ? 'bg-amber-400' : 'bg-cyan-400'
                            }`} />
                            <span className="font-bold text-white">
                              {activeHoverData.nameVi}:
                            </span>
                            <span className="text-slate-300 text-[11px]">
                              {activeHoverData.note}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 font-mono text-[11px]">
                            <span className="text-cyan-300">
                              Mực nước: <strong className="text-white text-xs">{activeHoverData.level} m</strong>
                            </span>
                            <span className="text-blue-300">
                              Lưu lượng: <strong className="text-white text-xs">{activeHoverData.discharge.toLocaleString()} m³/s</strong>
                            </span>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-400 mt-2">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-xs bg-amber-500" />
                            <span>Mùa Cạn (T12 - T5)</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-xs bg-cyan-400" />
                            <span>Chuyển Mùa (T6)</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-xs bg-blue-500" />
                            <span>Mùa Lũ (T7 - T11)</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-xs bg-rose-500" />
                            <span>Đỉnh Lũ (T9)</span>
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 3: CURRENT GAUGE METRIC DETAILS */}
              {stationViewTab === 'current' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {/* Card 1: Mực nước (Water Level) */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="flex items-center gap-1 font-bold text-slate-300">
                        <Waves className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{isEn ? 'Water Level (m)' : 'Mực Nước (m)'}</span>
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300">
                        BĐ1: {selectedStation.waterLevel.alarm1}m
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 my-1">
                      <span className="text-2xl font-black text-cyan-400 font-mono">
                        {selectedStation.waterLevel[activeSeason].toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400">mét</span>
                      <span className={`text-[10px] ml-auto px-2 py-0.5 rounded-full font-bold ${
                        selectedStation.waterLevel[activeSeason] >= selectedStation.waterLevel.alarm2
                          ? 'bg-rose-900/80 text-rose-300 border border-rose-700'
                          : selectedStation.waterLevel[activeSeason] >= selectedStation.waterLevel.alarm1
                            ? 'bg-amber-900/80 text-amber-300 border border-amber-700'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {selectedStation.waterLevel[activeSeason] >= selectedStation.waterLevel.alarm2 
                          ? 'Báo động II' 
                          : selectedStation.waterLevel[activeSeason] >= selectedStation.waterLevel.alarm1 
                            ? 'Báo động I' 
                            : 'An toàn'}
                      </span>
                    </div>

                    {/* Gauge Level Progress Bar */}
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1 relative">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          selectedStation.waterLevel[activeSeason] >= selectedStation.waterLevel.alarm1 ? 'bg-rose-500' : 'bg-cyan-500'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (selectedStation.waterLevel[activeSeason] / selectedStation.waterLevel.alarm3) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Card 2: Lưu lượng nước (Discharge m³/s) */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="flex items-center gap-1 font-bold text-slate-300">
                        <Droplets className="w-3.5 h-3.5 text-blue-400" />
                        <span>{isEn ? 'Discharge (m³/s)' : 'Lưu Lượng Nước (m³/s)'}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Cực đại: {selectedStation.discharge.historicalMax.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 my-1">
                      <span className="text-2xl font-black text-blue-400 font-mono">
                        {selectedStation.discharge[activeSeason].toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">m³/s</span>
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between mt-1">
                      <span>Mùa cạn: {selectedStation.discharge.dry.toLocaleString()}</span>
                      <span className="text-rose-400 font-semibold">Mùa lũ: {selectedStation.discharge.flood.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mt-1">
              💡 <span className="font-semibold text-white">Ý nghĩa địa lí:</span> {isEn ? selectedStation.highlightsEn : selectedStation.highlightsVi}
            </p>
          </div>
        )}

        {/* Right Column: Country Flow & Riparian Highlights */}
        {selectedCountryIndex !== null && (
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              {(() => {
                const country = SIX_COUNTRIES_JOURNEY[selectedCountryIndex];
                return (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <h4 className="text-base font-bold text-white">{country.nameVi}</h4>
                          <span className="text-xs text-slate-400">{country.capital}</span>
                        </div>
                      </div>
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: `${country.color}30`, color: country.color }}
                      >
                        {country.lengthKm} km
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-2.5 text-xs">
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">{isEn ? 'Basin Share' : 'Tỉ lệ diện tích lưu vực'}</span>
                        <span className="font-bold text-emerald-400 text-sm">{country.shareBasinArea}</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">{isEn ? 'Flow Share' : 'Đóng góp dòng chảy'}</span>
                        <span className="font-bold text-cyan-400 text-sm">{country.shareFlow}</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-300 mb-2">
                      <p className="text-[11px] leading-relaxed">
                        <strong className="text-slate-200">{isEn ? 'Entry / Exit Course:' : 'Đoạn sông qua nước:'}</strong> {country.entryExitPointsVi}
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        <strong className="text-slate-200">{isEn ? 'Hydrological Role:' : 'Vai trò thủy văn:'}</strong> {country.hydrologyRoleVi}
                      </p>
                    </div>

                    {/* Dam or Landmark Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {country.mainDamsOrFeatures.map((feat, fIdx) => (
                        <span 
                          key={fIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
