import React, { useState } from 'react';
import { SimulationState } from '../types';
import { soundFx } from '../utils/audio';
import { Sliders, Droplets, ShieldAlert, CheckCircle, TrendingUp, AlertTriangle, RefreshCw, Layers, Compass, Waves, Trophy, Play, Sparkles, Zap, CheckCircle2, RotateCcw, HelpCircle, Wheat, ThumbsUp, AlertCircle } from 'lucide-react';
import { WaterFlowCanvas } from './WaterFlowCanvas';
import { WaterRescueMissions } from './WaterRescueMissions';

interface WaterSecuritySimulatorProps {
  onScoreReward?: (pts: number) => void;
}

export const WaterSecuritySimulator: React.FC<WaterSecuritySimulatorProps> = ({ onScoreReward }) => {
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<'canvas' | 'missions' | 'sandbox'>('canvas');

  const [sim, setSim] = useState<SimulationState>({
    upstreamDamRelease: 60, // percentage
    drySeasonIntensity: 'normal',
    seaLevelRiseCm: 10,
    sluiceGateOperation: 'smart_control',
    adaptationModel: 'rice_shrimp_rotation'
  });

  // Interactive Simulation & Decision Challenge States
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);

  // Calculate dynamic outcomes based on hydrology science
  const damDeficitFactor = ((100 - sim.upstreamDamRelease) / 100) * 35;
  const droughtFactor = sim.drySeasonIntensity === 'normal' ? 0 : sim.drySeasonIntensity === 'drought' ? 12 : 25;
  const seaFactor = (sim.seaLevelRiseCm / 50) * 15;
  const rawSalinityDistanceKm = Math.round(35 + damDeficitFactor + droughtFactor + seaFactor);

  // Sluice gate effect on inland canals:
  const effectiveInlandSalinityKm = sim.sluiceGateOperation === 'open'
    ? rawSalinityDistanceKm
    : sim.sluiceGateOperation === 'smart_control'
    ? Math.max(30, Math.round(rawSalinityDistanceKm * 0.65))
    : Math.max(25, Math.round(rawSalinityDistanceKm * 0.55));

  // Sediment loss percentage (trapped by dams)
  const sedimentLossPercent = Math.min(85, Math.round(50 + ((100 - sim.upstreamDamRelease) / 100) * 30));

  // Economic Sustainability Score (0 - 100)
  let sustainabilityScore = 50;
  if (sim.adaptationModel === 'rice_shrimp_rotation') sustainabilityScore += 25;
  if (sim.adaptationModel === 'fruit_freshwater_reservoir') sustainabilityScore += 18;
  if (sim.adaptationModel === 'traditional_rice') sustainabilityScore -= 20;

  if (sim.sluiceGateOperation === 'smart_control') sustainabilityScore += 20;
  if (sim.sluiceGateOperation === 'open') sustainabilityScore -= 25;

  if (effectiveInlandSalinityKm > 70) sustainabilityScore -= 18;
  sustainabilityScore = Math.max(10, Math.min(98, sustainabilityScore));

  const handleApplyPreset = (preset: 'balanced' | 'el_nino' | 'flood' | 'smart_res120') => {
    soundFx.playWaterSplash();
    if (preset === 'balanced') {
      setSim({
        upstreamDamRelease: 65,
        drySeasonIntensity: 'normal',
        seaLevelRiseCm: 10,
        sluiceGateOperation: 'smart_control',
        adaptationModel: 'rice_shrimp_rotation'
      });
    } else if (preset === 'el_nino') {
      setSim({
        upstreamDamRelease: 25,
        drySeasonIntensity: 'severe',
        seaLevelRiseCm: 25,
        sluiceGateOperation: 'open',
        adaptationModel: 'traditional_rice'
      });
    } else if (preset === 'flood') {
      setSim({
        upstreamDamRelease: 90,
        drySeasonIntensity: 'normal',
        seaLevelRiseCm: 10,
        sluiceGateOperation: 'open',
        adaptationModel: 'rice_shrimp_rotation'
      });
    } else if (preset === 'smart_res120') {
      setSim({
        upstreamDamRelease: 70,
        drySeasonIntensity: 'drought',
        seaLevelRiseCm: 20,
        sluiceGateOperation: 'smart_control',
        adaptationModel: 'fruit_freshwater_reservoir'
      });
    }
  };

  const handleReset = () => {
    handleApplyPreset('balanced');
  };

  // Dynamic 4 Indicators Calculation
  const getSimMetrics = () => {
    const flow = sim.upstreamDamRelease;
    const cond = sim.drySeasonIntensity;
    // Net flow index taking into account natural drought intensity
    const net = flow - (cond === 'normal' ? 0 : cond === 'drought' ? 20 : 35);

    // 1. Dòng chảy
    let flowText = 'Bình thường';
    let flowBadge = 'Ổn định';
    let flowColor = 'text-sky-700 bg-sky-50 border-sky-200';
    if (net >= 65) {
      flowText = 'Dồi dào';
      flowBadge = `${flow}% (Mạnh)`;
      flowColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (net >= 45) {
      flowText = 'Bình thường';
      flowBadge = `${flow}% (Ổn định)`;
      flowColor = 'text-sky-700 bg-sky-50 border-sky-200';
    } else if (net >= 25) {
      flowText = 'Giảm';
      flowBadge = `${flow}% (Kiệt nước)`;
      flowColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      flowText = 'Rất thấp';
      flowBadge = `${flow}% (Khô hạn)`;
      flowColor = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    // 2. Độ mặn
    let salText = 'Thấp';
    let salBadge = 'An toàn (<30km)';
    let salColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (net >= 65) {
      salText = 'Thấp';
      salBadge = 'Đẩy mặn ra biển';
      salColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (net >= 45) {
      salText = 'Trung bình';
      salBadge = 'Ranh ~35-45km';
      salColor = 'text-sky-700 bg-sky-50 border-sky-200';
    } else if (net >= 25) {
      salText = 'Tăng';
      salBadge = 'Ranh mặn 50-65km';
      salColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      salText = 'Tăng cao';
      salBadge = 'Ranh mặn > 75km';
      salColor = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    // 3. Nguồn nước ngọt
    let waterText = 'Dồi dào';
    let waterBadge = 'Thừa thãi';
    let waterColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (net >= 65) {
      waterText = 'Dồi dào';
      waterBadge = 'Tràn đầy mương rạch';
      waterColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (net >= 45) {
      waterText = 'Ổn định';
      waterBadge = 'Đủ cấp tưới & sinh hoạt';
      waterColor = 'text-sky-700 bg-sky-50 border-sky-200';
    } else if (net >= 25) {
      waterText = 'Giảm';
      waterBadge = 'Thiếu hụt nguồn';
      waterColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      waterText = 'Cạn kiệt';
      waterBadge = 'Khan hiếm trầm trọng';
      waterColor = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    // 4. Ảnh hưởng sản xuất
    let impactText = 'Rất thấp';
    let impactBadge = 'Thuận lợi mùa màng';
    let impactColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (net >= 65) {
      impactText = 'Rất thấp';
      impactBadge = 'Năng suất tối ưu';
      impactColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (net >= 45) {
      impactText = 'Thấp';
      impactBadge = 'Sản xuất bình thường';
      impactColor = 'text-sky-700 bg-sky-50 border-sky-200';
    } else if (net >= 25) {
      impactText = 'Cao';
      impactBadge = 'Nguy cơ hại lúa & cây';
      impactColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      impactText = 'Rất cao';
      impactBadge = 'Báo động mất trắng mùa vụ';
      impactColor = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    return { flowText, flowBadge, flowColor, salText, salBadge, salColor, waterText, waterBadge, waterColor, impactText, impactBadge, impactColor, net };
  };

  const metrics = getSimMetrics();

  const handleRunSimulation = () => {
    setIsSimulating(true);
    soundFx.playWaterSplash();
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
      setSelectedDecision(null);
      setEarnedPoints(null);
      soundFx.playSuccess();
    }, 1200);
  };

  const handleSelectDecision = (choiceId: 'A' | 'B' | 'C' | 'D') => {
    setSelectedDecision(choiceId);
    let pts = 20;
    if (choiceId === 'B') pts = 25;
    if (choiceId === 'D') pts = metrics.net < 45 ? 5 : 10;
    setEarnedPoints(pts);
    if (pts >= 20) {
      soundFx.playSuccess();
    } else {
      soundFx.playClick();
    }
    onScoreReward?.(pts);
  };

  const isSalineHigh = metrics.net < 45;

  const decisionOptions = [
    {
      id: 'A' as const,
      icon: '💧',
      title: 'A. Tăng trữ nước ngọt',
      action: 'Nạo vét kênh mương, trữ nước ngọt trong mương vườn & túi nước ngầm',
      explanation: isSalineHigh
        ? 'Chủ động và rất hiệu quả! Việc tích trữ nước ngọt tại chỗ trong mương vườn và túi bạt giúp bảo vệ vườn sầu riêng, hoa màu và sinh hoạt suốt đợt hạn mặn khốc liệt mà không bị động.'
        : 'Tầm nhìn đón đầu xuất sắc! Tranh thủ lúc nước ngọt dồi dào để tích đầy hệ thống kênh rạch và hồ chứa phân tán đón trước mùa kiệt.',
      points: 20
    },
    {
      id: 'B' as const,
      icon: '🚧',
      title: 'B. Điều chỉnh vận hành cống',
      action: 'Đóng mở linh hoạt cống Cái Lớn - Cái Bé và các cống ngăn mặn biển',
      explanation: isSalineHigh
        ? 'Quyết định công trình chuẩn xác nhất! Đóng kịp thời các cửa van cống Cái Lớn - Cái Bé khi triều dâng giúp chặn mặn từ Biển Tây, giữ ngọt cho hơn 384.000 ha đất nông nghiệp.'
        : 'Rất chuẩn xác! Mở các cửa cống lấy tối đa lượng phù sa màu mỡ và dòng nước ngọt từ sông Tiền, sông Hậu để bồi lắng đồng ruộng và thau chua rửa phèn.',
      points: 25
    },
    {
      id: 'C' as const,
      icon: '🌾',
      title: 'C. Điều chỉnh thời vụ/cây trồng',
      action: 'Xuống giống sớm né hạn, chuyển sang mô hình Tôm - Lúa "Thuận thiên"',
      explanation: isSalineHigh
        ? 'Chiến lược căn cơ theo Nghị quyết 120/NQ-CP! Xuống giống sớm trước tháng 10 giúp lúa trổ bông an toàn; vùng mặn ven biển luân canh tôm - lúa đem lại giá trị kinh tế cao, biến nguy cơ thành cơ hội.'
        : 'Tối ưu hóa năng suất! Chủ động gieo trồng các giống lúa đặc sản chất lượng cao và phát triển vùng chuyên canh an toàn.',
      points: 20
    },
    {
      id: 'D' as const,
      icon: '⏳',
      title: 'D. Không thay đổi',
      action: 'Giữ nguyên tập quán canh tác truyền thống, không can thiệp',
      explanation: isSalineHigh
        ? 'Cảnh báo rủi ro cao! Giữ nguyên tập quán khi ranh mặn 4‰ ăn sâu làm cháy lá, chết lúa và vườn cây ăn trái, gây thiệt hại nặng nề cho kinh tế gia đình.'
        : 'Tạm thời an toàn do nguồn nước hiện dồi dào, tuy nhiên nếu bất ngờ có khô hạn bất thường thì vùng sản xuất sẽ đối mặt rủi ro lớn.',
      points: isSalineHigh ? 5 : 10
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Introduction banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 rounded-2xl p-5 sm:p-7 text-white border border-teal-400/30 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 uppercase tracking-wider backdrop-blur-sm">
            <Droplets className="w-3.5 h-3.5 text-amber-300" />
            <span>Phòng Thí Nghiệm Thủy Văn & An Ninh Nguồn Nước 2D</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-xs">
            Mô Phỏng Thủy Động Học & Ứng Phó Hạn Mặn ĐBSCL
          </h1>
          <p className="text-emerald-50 text-xs sm:text-base leading-relaxed">
            Khám phá quy luật vận động của dòng nước từ các đập thượng nguồn qua Biển Hồ Tonle Sap đến 9 cửa sông Cửu Long. Trực tiếp thử nghiệm các kịch bản thủy văn, điều khiển cống ngăn mặn và tham gia các chiến dịch giải cứu vựa lúa miền Tây!
          </p>
        </div>

        {/* Decorative water wave ripple */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Simulator Mode Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2.5 rounded-2xl border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              setActiveSimulatorTab('canvas');
              soundFx.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSimulatorTab === 'canvas'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>Sơ Đồ Dòng Chảy Động (Interactive Lab)</span>
          </button>

          <button
            onClick={() => {
              setActiveSimulatorTab('missions');
              soundFx.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSimulatorTab === 'missions'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-700" />
            <span>Thử Thách Cứu Đồng Bằng (Chiến Dịch)</span>
          </button>

          <button
            onClick={() => {
              setActiveSimulatorTab('sandbox');
              soundFx.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSimulatorTab === 'sandbox'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Bảng Tham Số & Nghị Quyết 120 (Sandbox)</span>
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-slate-400 hidden md:inline">Kịch bản nhanh:</span>
          <button
            onClick={() => handleApplyPreset('balanced')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-all cursor-pointer whitespace-nowrap"
            title="Kịch bản điều tiết tối ưu"
          >
            🌿 Cân bằng
          </button>
          <button
            onClick={() => handleApplyPreset('el_nino')}
            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold transition-all cursor-pointer whitespace-nowrap"
            title="Đập giữ nước, hạn mặn khốc liệt"
          >
            🔥 Siêu hạn El Niño
          </button>
          <button
            onClick={() => handleApplyPreset('flood')}
            className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold transition-all cursor-pointer whitespace-nowrap"
            title="Nước lũ thượng nguồn mang nhiều phù sa"
          >
            🌊 Mùa nước nổi
          </button>
          <button
            onClick={() => handleApplyPreset('smart_res120')}
            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold transition-all cursor-pointer whitespace-nowrap"
            title="Mô hình thích ứng thuận thiên theo NQ 120"
          >
            ⭐ Thuận thiên NQ120
          </button>
        </div>
      </div>

      {/* View Mode 1: Interactive Hydrological Canvas */}
      {activeSimulatorTab === 'canvas' && (
        <div className="space-y-6">

          {/* 1. KHU VỰC ĐIỀU KHIỂN & THANH ĐIỀU CHỈNH DÒNG CHẢY */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block mb-1">
                  Mô Phỏng Tương Tác Thủy Văn
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  Điều Khiển Dòng Chảy & Phân Tích Hạn Mặn ĐBSCL
                </h3>
              </div>
              <span className="text-xs text-slate-500 italic hidden sm:inline">
                Luồng: Chọn điều kiện ➔ Chỉnh dòng chảy ➔ Chạy mô phỏng ➔ Ra quyết định
              </span>
            </div>

            {/* Condition selector & Flow Slider */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              {/* Chọn điều kiện: [ Bình thường ] [ Hạn cao ] [ El Niño ] */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>1. Chọn điều kiện khí hậu:</span>
                  <span className="text-amber-600 font-extrabold">
                    {sim.drySeasonIntensity === 'normal' ? 'Mùa cạn bình thường' : sim.drySeasonIntensity === 'drought' ? 'Khô hạn cao' : 'Khắc nghiệt El Niño'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: 'Bình thường', icon: '🌤️' },
                    { id: 'drought', label: 'Hạn cao', icon: '☀️' },
                    { id: 'severe', label: 'El Niño', icon: '🔥' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSim({ ...sim, drySeasonIntensity: opt.id as SimulationState['drySeasonIntensity'] });
                        setSelectedDecision(null);
                        setEarnedPoints(null);
                        soundFx.playClick();
                      }}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 shadow-2xs ${
                        sim.drySeasonIntensity === opt.id
                          ? 'bg-amber-500 text-slate-950 border-amber-500 ring-2 ring-amber-300 font-black shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. 🌊 THANH ĐIỀU CHỈNH DÒNG CHẢY (20% ━━━━━●━━━━━ 100%) */}
              <div className="lg:col-span-7 space-y-2 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <span>🌊</span> Mức dòng chảy sông Mê Công:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-black text-xs shadow-2xs">
                    {sim.upstreamDamRelease}%
                  </span>
                </div>

                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={sim.upstreamDamRelease}
                  onChange={(e) => {
                    setSim({ ...sim, upstreamDamRelease: Number(e.target.value) });
                    setSelectedDecision(null);
                    setEarnedPoints(null);
                    soundFx.playClick();
                  }}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />

                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-0.5 text-rose-600">
                    20% (Kiệt nước)
                  </span>
                  <span className="text-slate-400 font-mono tracking-tighter">20% ━━━━━━━━━●━━━━━━━━ 100%</span>
                  <span className="flex items-center gap-0.5 text-emerald-700">
                    100% (Tự nhiên)
                  </span>
                </div>
              </div>
            </div>

            {/* 2. ⚡ NÚT CHẠY MÔ PHỎNG */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className={`w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md text-white ${
                  isSimulating
                    ? 'bg-amber-600 animate-pulse cursor-wait'
                    : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 active:scale-98'
                }`}
              >
                <Zap className={`w-5 h-5 ${isSimulating ? 'animate-spin text-white' : 'text-amber-200'}`} />
                <span>{isSimulating ? 'ĐANG CHẠY MÔ PHỎNG THỦY VĂN...' : '⚡ CHẠY MÔ PHỎNG'}</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Waves className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cập nhật đồng bộ 4 chỉ số và mô phỏng xâm nhập mặn hiện có</span>
              </div>
            </div>

            {/* HIỂN THỊ 4 CHỈ SỐ MÔ PHỎNG */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {/* 1. Dòng chảy */}
              <div className={`p-3.5 rounded-xl border transition-all ${metrics.flowColor}`}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>🌊 Dòng chảy:</span>
                </div>
                <div className="font-black text-base sm:text-lg">
                  {metrics.flowText}
                </div>
                <div className="text-[11px] opacity-80 font-medium mt-0.5">
                  {metrics.flowBadge}
                </div>
              </div>

              {/* 2. Độ mặn */}
              <div className={`p-3.5 rounded-xl border transition-all ${metrics.salColor}`}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>🧂 Độ mặn:</span>
                </div>
                <div className="font-black text-base sm:text-lg">
                  {metrics.salText}
                </div>
                <div className="text-[11px] opacity-80 font-medium mt-0.5">
                  {metrics.salBadge}
                </div>
              </div>

              {/* 3. Nguồn nước ngọt */}
              <div className={`p-3.5 rounded-xl border transition-all ${metrics.waterColor}`}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>💧 Nguồn nước ngọt:</span>
                </div>
                <div className="font-black text-base sm:text-lg">
                  {metrics.waterText}
                </div>
                <div className="text-[11px] opacity-80 font-medium mt-0.5">
                  {metrics.waterBadge}
                </div>
              </div>

              {/* 4. Ảnh hưởng sản xuất */}
              <div className={`p-3.5 rounded-xl border transition-all ${metrics.impactColor}`}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>🌾 Ảnh hưởng sản xuất:</span>
                </div>
                <div className="font-black text-base sm:text-lg">
                  {metrics.impactText}
                </div>
                <div className="text-[11px] opacity-80 font-medium mt-0.5">
                  {metrics.impactBadge}
                </div>
              </div>
            </div>

            {/* BẢNG KẾT QUẢ NGẮN (KẾT QUẢ MÔ PHỎNG) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-black text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                  <span className="text-emerald-600">📊</span> KẾT QUẢ MÔ PHỎNG
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {hasSimulated ? 'Đã chạy mô phỏng' : 'Thời gian thực'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 font-medium">🌊 Dòng chảy:</span>
                  <span className="font-extrabold text-slate-900">{metrics.flowText}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 font-medium">🧂 Độ mặn:</span>
                  <span className="font-extrabold text-slate-900">{metrics.salText}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 font-medium">💧 Nguồn nước:</span>
                  <span className="font-extrabold text-slate-900">{metrics.waterText}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 font-medium">🌾 Ảnh hưởng sản xuất:</span>
                  <span className="font-extrabold text-slate-900">{metrics.impactText}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic pt-1">
                * Ghi chú nhỏ: “Các kết quả trên mang tính mô phỏng giáo dục.”
              </p>
            </div>
          </div>

          {/* SƠ ĐỒ TRỰC QUAN XÂM NHẬP MẶN (WaterFlowCanvas với chú thích rõ ràng) */}
          <WaterFlowCanvas
            damRelease={sim.upstreamDamRelease}
            dryIntensity={sim.drySeasonIntensity}
            seaLevelRiseCm={sim.seaLevelRiseCm}
            sluiceGateState={sim.sluiceGateOperation}
            onToggleGate={(newState) => setSim({ ...sim, sluiceGateOperation: newState })}
            salinityDistanceKm={effectiveInlandSalinityKm}
          />

          {/* 3. 🎯 THỬ THÁCH RA QUYẾT ĐỊNH */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/70 to-amber-50/60 rounded-2xl p-5 sm:p-6 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-200/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    BẠN SẼ LÀM GÌ?
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {isSalineHigh
                      ? 'Độ mặn đang tăng. Bạn sẽ lựa chọn giải pháp nào?'
                      : 'Nguồn nước ngọt đang thuận lợi. Bạn sẽ lựa chọn giải pháp nào để phát triển bền vững?'}
                  </p>
                </div>
              </div>
              {earnedPoints !== null && (
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1 shadow-xs animate-bounce">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  +{earnedPoints} điểm tương tác
                </span>
              )}
            </div>

            {/* 4 Lựa chọn dạng nút (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {decisionOptions.map(opt => {
                const isSelected = selectedDecision === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectDecision(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-2xs group ${
                      isSelected
                        ? 'bg-white border-emerald-500 ring-2 ring-emerald-400 shadow-sm'
                        : 'bg-white/90 hover:bg-white border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {opt.title}
                      </span>
                      <span className="text-base shrink-0">{opt.icon}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {opt.action}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Kết quả lựa chọn & Giải thích + Điểm + Nút Thử lại */}
            {selectedDecision && (() => {
              const currentChoice = decisionOptions.find(d => d.id === selectedDecision)!;
              return (
                <div className="p-4 rounded-xl bg-white border border-emerald-300 shadow-xs space-y-3 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-sm text-slate-900">
                        Đánh giá tác động: <strong>{currentChoice.title}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-black text-xs border border-amber-300">
                        +{earnedPoints} điểm
                      </span>
                      <button
                        onClick={() => {
                          setSelectedDecision(null);
                          setEarnedPoints(null);
                          soundFx.playClick();
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>🔄 Thử lại</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
                    {currentChoice.explanation}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Quick Sluice Gate & Adaptation Controls preserved */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-800">
            {/* Sluice Gate Control */}
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-700 text-xs block">Vận hành Cống Cái Lớn - Cái Bé:</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'open', label: 'Mở tự do' },
                  { id: 'smart_control', label: 'Tự động' },
                  { id: 'closed', label: 'Đóng triệt để' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSim({ ...sim, sluiceGateOperation: opt.id as SimulationState['sluiceGateOperation'] });
                      soundFx.playClick();
                    }}
                    className={`py-1.5 px-2 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs ${
                      sim.sluiceGateOperation === opt.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sea Level Rise */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Mực nước biển dâng (Kịch bản biến đổi khí hậu):</span>
                <span className="font-extrabold text-teal-700">+{sim.seaLevelRiseCm} cm</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={sim.seaLevelRiseCm}
                onChange={(e) => {
                  setSim({ ...sim, seaLevelRiseCm: Number(e.target.value) });
                  soundFx.playClick();
                }}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Hiện tại (0 cm)</span>
                <span>Nghiêm trọng (+50 cm)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode 2: Gamified Water Rescue Missions */}
      {activeSimulatorTab === 'missions' && (
        <WaterRescueMissions onScoreReward={onScoreReward} />
      )}

      {/* View Mode 3: In-Depth Scientific Sandbox (Resolution 120) */}
      {activeSimulatorTab === 'sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 cols: Control sliders & policy selectors */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>Bảng Điều Khiển Biến Số Thủy Văn Chuyên Sâu</span>
              </h2>
              <button
                onClick={handleReset}
                className="text-xs text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer transition-colors font-medium bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Mặc định</span>
              </button>
            </div>

            {/* Variable 1: Upstream Dam Release */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">1. Lưu lượng xả nước từ các đập thượng nguồn:</span>
                <span className="font-extrabold text-teal-700">{sim.upstreamDamRelease}% công suất</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={sim.upstreamDamRelease}
                onChange={(e) => {
                  setSim({ ...sim, upstreamDamRelease: Number(e.target.value) });
                  soundFx.playClick();
                }}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>Tích nước giữ hồ (20%)</span>
                <span>Xả điều tiết hợp lý (60%)</span>
                <span>Xả tự nhiên (100%)</span>
              </div>
            </div>

            {/* Variable 2: Dry Season Intensity */}
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-700 text-xs block">2. Tình trạng hạn hán mùa khô tại hạ lưu:</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'normal', label: 'Bình thường' },
                  { id: 'drought', label: 'Hạn hán cao' },
                  { id: 'severe', label: 'Hạn lịch sử (El Nino)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSim({ ...sim, drySeasonIntensity: opt.id as SimulationState['drySeasonIntensity'] });
                      soundFx.playClick();
                    }}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                      sim.drySeasonIntensity === opt.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 3: Sea level rise */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">3. Kịch bản nước biển dâng do biến đổi khí hậu:</span>
                <span className="font-extrabold text-sky-700">+{sim.seaLevelRiseCm} cm</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={sim.seaLevelRiseCm}
                onChange={(e) => {
                  setSim({ ...sim, seaLevelRiseCm: Number(e.target.value) });
                  soundFx.playClick();
                }}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>Hiện tại (0cm)</span>
                <span>Dự báo 2050 (+25cm)</span>
                <span>Kịch bản cao (+50cm)</span>
              </div>
            </div>

            {/* Variable 4: Sluice gate operation (Cái Lớn - Cái Bé) */}
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-700 text-xs block">4. Vận hành công trình ngăn mặn (Cái Lớn - Cái Bé):</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'open', label: 'Mở tự do' },
                  { id: 'smart_control', label: 'Điều tiết thông minh' },
                  { id: 'closed', label: 'Đóng hoàn toàn' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSim({ ...sim, sluiceGateOperation: opt.id as SimulationState['sluiceGateOperation'] });
                      soundFx.playClick();
                    }}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                      sim.sluiceGateOperation === opt.id
                        ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variable 5: Adaptation model according to Res 120 */}
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-700 text-xs block">5. Mô hình sinh kế thích ứng nông nghiệp:</span>
              <div className="space-y-2 text-xs">
                {[
                  {
                    id: 'traditional_rice',
                    name: 'Độc canh 3 vụ lúa truyền thống',
                    desc: 'Cần nước ngọt tối đa, cực kỳ dễ tổn thương khi ranh mặn 4‰ ăn sâu'
                  },
                  {
                    id: 'rice_shrimp_rotation',
                    name: 'Luân canh 1 Tôm - 1 Lúa "Thuận thiên"',
                    desc: 'Mùa mưa trồng lúa chất lượng cao, mùa khô dẫn nước lợ nuôi tôm xuất khẩu'
                  },
                  {
                    id: 'fruit_freshwater_reservoir',
                    name: 'Chuyên canh Cây ăn trái + Hồ trữ nước ngọt',
                    desc: 'Xây dựng hồ trữ nước phân tán, tưới nhỏ giọt cho sầu riêng, chôm chôm'
                  }
                ].map(m => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSim({ ...sim, adaptationModel: m.id as SimulationState['adaptationModel'] });
                      soundFx.playClick();
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      sim.adaptationModel === m.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-1 ring-emerald-400/30'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{m.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 6 cols: Scientific Hydrological Feedback & Outcomes */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <Droplets className="w-4 h-4 text-teal-600" />
                <span>Kết Quả Mô Phỏng & Chỉ Số Tác Động Thực Tế</span>
              </h2>

              {/* Metric 1: Salinity Intrusion Depth */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-700">Ranh mặn 4‰ xâm nhập sâu:</span>
                  <span className={`text-xl font-extrabold ${
                    effectiveInlandSalinityKm > 65 ? 'text-red-600' : effectiveInlandSalinityKm > 45 ? 'text-amber-600' : 'text-emerald-700'
                  }`}>
                    ~{effectiveInlandSalinityKm} km
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      effectiveInlandSalinityKm > 65 ? 'bg-red-500' : effectiveInlandSalinityKm > 45 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, (effectiveInlandSalinityKm / 90) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                  {effectiveInlandSalinityKm > 65
                    ? '⚠️ Mức nguy cấp: Nước mặn lấn sâu vào Tiền Giang, Bến Tre, Vĩnh Long; tê liệt các trạm cấp nước sinh hoạt đô thị.'
                    : effectiveInlandSalinityKm > 45
                    ? '⚡ Mức cảnh báo: Các vườn sầu riêng và hoa màu ven sông cần chủ động đóng cống lấy nước.'
                    : '✅ Mức an toàn: Dòng chảy sông đủ mạnh để đẩy lùi lưỡi mặn sát cửa sông.'}
                </p>
              </div>

              {/* Metric 2: Sediment loss */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-700">Lượng phù sa bị giữ lại thượng nguồn:</span>
                  <span className="text-lg font-bold text-amber-700">-{sedimentLossPercent}%</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Khi các hồ chứa thượng nguồn tích nước, dòng nước hạ lưu bị "đói bùn", làm tăng tốc độ sạt lở bờ sông Tiền, sông Hậu thêm 15 - 30%.
                </p>
              </div>

              {/* Sustainability Index Bar */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">
                    Chỉ số Bền Vững ĐBSCL (Tổng hợp):
                  </span>
                  <span className="text-xl font-extrabold text-emerald-900">
                    {sustainabilityScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sustainabilityScore > 75
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500'
                        : sustainabilityScore > 50
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                        : 'bg-gradient-to-r from-red-500 to-orange-500'
                    }`}
                    style={{ width: `${sustainabilityScore}%` }}
                  />
                </div>

                <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-teal-900 block">Nhận xét chuyên đề Địa lí 11:</span>
                  <div className="leading-relaxed">
                    {sustainabilityScore > 75 ? (
                      <div>
                        🌟 <strong>Chiến lược xuất sắc!</strong> Sự kết hợp giữa chia sẻ nguồn nước thượng nguồn với vận hành cống thông minh và mô hình "Thuận thiên" (Tôm - Lúa hoặc trữ nước dã chiến) giúp người dân ĐBSCL phát triển kinh tế bền vững, không còn phụ thuộc thụ động vào thời tiết.
                      </div>
                    ) : sustainabilityScore > 50 ? (
                      <div>
                        ⚖️ <strong>Cân bằng tạm thời:</strong> Hệ thống chịu được rủi ro trung bình, nhưng nếu gặp các đợt hạn mặn lịch sử kéo dài, nguy cơ thiếu hụt nước ngọt và thiệt hại hoa màu vẫn ở mức cao. Cần mở rộng quy mô trữ nước phân tán.
                      </div>
                    ) : (
                      <div>
                        🚨 <strong>Rủi ro nghiêm trọng!</strong> Việc độc canh lúa nước trong điều kiện nguồn nước kiệt và thủy điện tích nước khiến ĐBSCL chịu tổn thương nặng nề. Cần chuyển đổi cơ cấu nông nghiệp khẩn cấp theo tinh thần Nghị quyết 120/NQ-CP!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
