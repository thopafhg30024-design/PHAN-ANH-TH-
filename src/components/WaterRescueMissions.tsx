import React, { useState } from 'react';
import { Shield, Award, CheckCircle2, AlertTriangle, Play, RotateCcw, Sparkles, Droplets, Target, Flame, Waves, Trophy, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface RescueMission {
  id: string;
  title: string;
  codename: string;
  badge: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Thách thức';
  scenarioDesc: string;
  crisisData: {
    damRelease: number;
    drought: string;
    salinityThreatKm: number;
    atRiskProvinces: string[];
  };
  requiredGoals: string[];
  tacticsOptions: {
    id: string;
    label: string;
    actionDesc: string;
    salinityReductionKm: number;
    sustainabilityBoost: number;
    costOrTradeoff: string;
  }[];
  expertDebrief: string;
  rewardPoints: number;
}

const MISSIONS: RescueMission[] = [
  {
    id: 'mission_drought_el_nino',
    title: 'Giải Cứu ĐBSCL Khỏi Siêu Hạn Mặn El Niño',
    codename: 'CHIẾN DỊCH KHÁT NƯỚC',
    badge: '🎖️ Hiệp Sĩ Nước Ngọt ĐBSCL',
    difficulty: 'Thách thức',
    scenarioDesc: 'Thủy điện thượng nguồn xả cầm chừng ở mức 30%, hiện tượng El Niño khiến mùa khô kéo dài kỷ lục. Lưỡi mặn 4‰ đã lấn sâu 75 km, đe dọa cháy lá toàn bộ 25.000 ha sầu riêng Bến Tre - Tiền Giang và làm tê liệt các nhà máy cấp nước tại Cần Thơ, Hậu Giang.',
    crisisData: {
      damRelease: 30,
      drought: 'Hạn hán kỷ lục',
      salinityThreatKm: 78,
      atRiskProvinces: ['Bến Tre', 'Tiền Giang', 'Vĩnh Long', 'Hậu Giang', 'Sóc Trăng']
    },
    requiredGoals: [
      'Đẩy lùi ranh mặn 4‰ xuống dưới 50 km',
      'Bảo vệ an toàn nguồn nước sinh hoạt đô thị và vườn cây ăn trái',
      'Đạt chỉ số bền vững tổng hợp trên 80/100'
    ],
    tacticsOptions: [
      {
        id: 'tactic_diplomacy',
        label: '1. Ngoại giao MRC: Yêu cầu thượng nguồn xả xả lũ khẩn cấp',
        actionDesc: 'Kích hoạt cơ chế tham vấn MRC để các hồ thủy điện xả tăng cường lên 70% công suất.',
        salinityReductionKm: 18,
        sustainabilityBoost: 22,
        costOrTradeoff: 'Cần đàm phán ngoại giao khẩn trương giữa các quốc gia thành viên.'
      },
      {
        id: 'tactic_smart_gates',
        label: '2. Đóng cống ngăn mặn thông minh (Cái Lớn - Cái Bé, Ba Lai)',
        actionDesc: 'Vận hành tự động theo đỉnh triều: Đóng khi triều lên mặn, mở tiêu thoát khi triều kiệt.',
        salinityReductionKm: 15,
        sustainabilityBoost: 20,
        costOrTradeoff: 'Hạn chế giao thông thủy trong các giờ triều cường.'
      },
      {
        id: 'tactic_mobile_ponds',
        label: '3. Kích hoạt mạng lưới hồ trữ nước dã chiến & tưới tiết kiệm',
        actionDesc: 'Tận dụng kênh rạch tự nhiên, trải bạt trữ nước ngọt mương vườn, áp dụng công nghệ tưới nhỏ giọt Israel cho sầu riêng.',
        salinityReductionKm: 8,
        sustainabilityBoost: 18,
        costOrTradeoff: 'Nông dân cần đầu tư túi chứa nước dẻo và bạt lót.'
      },
      {
        id: 'tactic_emergency_well',
        label: '4. Khoan giếng ngầm tầng sâu ồ ạt không kiểm soát',
        actionDesc: 'Khai thác tối đa nước ngầm để cứu cây lúa ngắn hạn.',
        salinityReductionKm: 3,
        sustainabilityBoost: -25,
        costOrTradeoff: 'Gây sụt lún nền đất ĐBSCL từ 2 - 4 cm/năm, gia tăng sạt lở bờ sông nghiêm trọng!'
      }
    ],
    expertDebrief: 'Theo Nghị quyết 120/NQ-CP và thực tiễn hạn mặn lịch sử năm 2016 và 2020: Việc kết hợp ngoại giao chia sẻ nguồn nước thượng nguồn với vận hành cống thông minh và trữ nước phân tán tại chỗ là "tam giác vàng" giúp ĐBSCL vượt qua khủng hoảng mà không hủy hoại tài nguyên nước ngầm.',
    rewardPoints: 60
  },
  {
    id: 'mission_flood_bounty',
    title: 'Đón Lũ Đẹp & Thu Hoạch Mùa Nước Nổi',
    codename: 'CHIẾN DỊCH PHÙ SA VÀNG',
    badge: '🌾 Bậc Thầy Sinh Kế Thuận Thiên',
    difficulty: 'Trung bình',
    scenarioDesc: 'Tháng 9 về, dòng Mekong mang theo lượng nước dồi dào và hàng triệu tấn phù sa đổ về An Giang, Đồng Tháp. Làm sao để người dân ĐBSCL vừa sống chung an toàn với lũ, vừa tối đa hóa lợi ích kinh tế sinh thái từ con nước nổi?',
    crisisData: {
      damRelease: 80,
      drought: 'Mùa nước nổi dồi dào',
      salinityThreatKm: 28,
      atRiskProvinces: ['An Giang', 'Đồng Tháp', 'Long An', 'Cần Thơ']
    },
    requiredGoals: [
      'Đón trọn vẹn lớp phù sa màu mỡ bồi đắp đồng ruộng',
      'Phát triển mô hình luân canh 1 Tôm - 1 Lúa / Lúa - Cá đạt năng suất cao',
      'Đẩy ranh mặn xa cửa biển, xả phèn rửa mặn tự nhiên cho đất châu thổ'
    ],
    tacticsOptions: [
      {
        id: 'flood_open_sluice',
        label: '1. Mở toàn bộ cống đầu nguồn đón lũ vào nội đồng (Xả lũ có kiểm soát)',
        actionDesc: 'Mở các cống đê bao đón nước tràn đồng mang theo phù sa bồi đắp 3-5 cm bùn non và rửa trôi mầm sâu bệnh.',
        salinityReductionKm: 12,
        sustainabilityBoost: 26,
        costOrTradeoff: 'Tạm ngưng vụ lúa thu đông thứ 3 để đất nghỉ ngơi hồi phục.'
      },
      {
        id: 'flood_shrimp_fish',
        label: '2. Triển khai mô hình Nuôi tôm càng xanh / Cá đồng trong mùa lũ',
        actionDesc: 'Thả cá linh, cá chép, tôm càng trên ruộng ngập lũ, kết hợp làm du lịch sinh thái câu cá đồng và hoa điên điển.',
        salinityReductionKm: 6,
        sustainabilityBoost: 24,
        costOrTradeoff: 'Cần vốn đầu tư con giống ban đầu.'
      },
      {
        id: 'flood_build_high_dike',
        label: '3. Đắp đê bao khép kín triệt để ngăn lũ làm vụ lúa thứ 3',
        actionDesc: 'Xây dựng đê cao kiên cố, bơm nước ra sông để ép trồng lúa quanh năm.',
        salinityReductionKm: 0,
        sustainabilityBoost: -20,
        costOrTradeoff: 'Đất bị bạc màu do thiếu phù sa, chi phí phân bón hóa học tăng 40%, làm tăng nguy cơ ngập lụt cho các đô thị hạ lưu như Cần Thơ!'
      }
    ],
    expertDebrief: 'Triết lý "Sống chung với lũ" là nét văn hóa ứng xử thuận thiên độc đáo nhất của người miền Tây. Lũ không phải thiên tai mà là "mùa lũ đẹp", đem lại nguồn lợi thủy sản dồi dào và nguồn dinh dưỡng đất vô giá cho vựa lúa quốc gia.',
    rewardPoints: 50
  },
  {
    id: 'mission_climate_2050',
    title: 'Lá Chắn Xanh 2050: Ứng Phó Nước Biển Dâng +30cm',
    codename: 'CHIẾN DỊCH ĐỒNG BẰNG BỀN VỮNG',
    badge: '🛡️ Kiến Trúc Sư Châu Thổ Xanh',
    difficulty: 'Thách thức',
    scenarioDesc: 'Theo kịch bản biến đổi khí hậu đến năm 2050, nước biển dâng thêm 30 cm khiến diện tích ngập triều tăng cao, ranh mặn mùa khô tiến sâu thêm 15 - 20 km. ĐBSCL cần một cuộc cách mạng toàn diện về quy hoạch không gian nông nghiệp.',
    crisisData: {
      damRelease: 50,
      drought: 'Nước biển dâng +30cm',
      salinityThreatKm: 85,
      atRiskProvinces: ['Cà Mau', 'Bạc Liêu', 'Sóc Trăng', 'Trà Vinh', 'Bến Tre', 'Kiên Giang']
    },
    requiredGoals: [
      'Phân vùng sinh thái nông nghiệp 3 vùng: Ngọt, Lợ, Mặn chuẩn xác',
      'Bảo vệ dải rừng ngập mặn phòng hộ ven biển',
      'Ứng dụng giống lúa chịu mặn 4 - 6‰'
    ],
    tacticsOptions: [
      {
        id: 'zoning_res_120',
        label: '1. Quy hoạch 3 vùng sinh thái theo Nghị quyết 120 (Ngọt - Lợ - Mặn)',
        actionDesc: 'Vùng ngọt thượng lưu chuyên canh lúa và trái cây; vùng lợ luân canh tôm - lúa; vùng ven biển nuôi trồng thủy sản mặn và phát triển năng lượng gió.',
        salinityReductionKm: 14,
        sustainabilityBoost: 30,
        costOrTradeoff: 'Đòi hỏi liên kết vùng chặt chẽ giữa 13 tỉnh thành.'
      },
      {
        id: 'mangrove_restoration',
        label: '2. Phục hồi 150.000 ha đai rừng ngập mặn ven biển Tây & biển Đông',
        actionDesc: 'Trồng rừng đước, tràm, mắm tạo thành tường thành tự nhiên giảm 70% năng lượng sóng biển và giữ đất bồi tụ.',
        salinityReductionKm: 10,
        sustainabilityBoost: 25,
        costOrTradeoff: 'Cần thời gian 5 - 10 năm để rừng sinh trưởng hoàn thiện.'
      },
      {
        id: 'saline_rice_varieties',
        label: '3. Phát triển các giống lúa đột phá chịu mặn (ST25, OM)',
        actionDesc: 'Đưa vào sản xuất các giống lúa thơm xuất khẩu có khả năng sinh trưởng tốt ở độ mặn 4‰.',
        salinityReductionKm: 8,
        sustainabilityBoost: 20,
        costOrTradeoff: 'Cần chuyển giao kỹ thuật canh tác cho hợp tác xã.'
      }
    ],
    expertDebrief: 'Thích ứng thông minh với biến đổi khí hậu là chìa khóa vàng cho tương lai ĐBSCL. Biến nước mặn, nước lợ từ "kẻ thù" thành tài nguyên kinh tế có giá trị cao thông qua chuỗi giá trị tôm - rừng sinh thái là bước đột phá được quốc tế ca ngợi.',
    rewardPoints: 70
  }
];

interface WaterRescueMissionsProps {
  onScoreReward?: (pts: number) => void;
}

export const WaterRescueMissions: React.FC<WaterRescueMissionsProps> = ({ onScoreReward }) => {
  const [activeMissionId, setActiveMissionId] = useState<string>(MISSIONS[0].id);
  const [selectedTactics, setSelectedTactics] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const activeMission = MISSIONS.find(m => m.id === activeMissionId) || MISSIONS[0];

  // Calculate mission results based on chosen tactics
  const chosenTacticsObjects = activeMission.tacticsOptions.filter(t => selectedTactics.includes(t.id));
  const totalSalinityReduction = chosenTacticsObjects.reduce((acc, t) => acc + t.salinityReductionKm, 0);
  const totalSustainabilityBoost = chosenTacticsObjects.reduce((acc, t) => acc + t.sustainabilityBoost, 0);

  const finalSalinityKm = Math.max(25, activeMission.crisisData.salinityThreatKm - totalSalinityReduction);
  const finalScore = Math.max(15, Math.min(100, 45 + totalSustainabilityBoost));

  const hasNegativeTactic = selectedTactics.includes('tactic_emergency_well') || selectedTactics.includes('flood_build_high_dike');
  const isMissionPassed = finalScore >= 75 && !hasNegativeTactic && selectedTactics.length >= 2;

  const handleToggleTactic = (tacticId: string) => {
    soundFx.playClick();
    if (selectedTactics.includes(tacticId)) {
      setSelectedTactics(selectedTactics.filter(id => id !== tacticId));
    } else {
      setSelectedTactics([...selectedTactics, tacticId]);
    }
  };

  const handleRunMission = () => {
    if (selectedTactics.length === 0) return;
    setIsCompleted(true);
    if (isMissionPassed) {
      soundFx.playSuccess();
      if (!completedMissions.includes(activeMission.id)) {
        setCompletedMissions([...completedMissions, activeMission.id]);
        if (onScoreReward) {
          onScoreReward(activeMission.rewardPoints);
        }
      }
    } else {
      soundFx.playWrong();
    }
  };

  const handleResetMission = () => {
    setSelectedTactics([]);
    setIsCompleted(false);
    soundFx.playClick();
  };

  const handleSelectMission = (mId: string) => {
    setActiveMissionId(mId);
    setSelectedTactics([]);
    setIsCompleted(false);
    soundFx.playCardFlip();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-amber-400/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-white/30">
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>Nhiệm Vụ Thử Thách & Tình Huống Giả Định</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
              Thử Thách: Ban Chỉ Đạo Ứng Phó Khẩn Cấp ĐBSCL
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Bạn vào vai Chuyên gia Trưởng điều phối nguồn nước Mê Kông. Hãy đưa ra các quyết định chiến thuật để cứu vựa lúa, vườn cây ăn trái và người dân miền Tây thoát khỏi các đợt khủng hoảng thủy văn khắc nghiệt!
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-center min-w-[130px]">
            <span className="text-[10px] font-bold text-amber-200 uppercase block">Đã hoàn thành:</span>
            <div className="text-2xl font-black text-white">{completedMissions.length}/{MISSIONS.length}</div>
            <span className="text-[10px] text-emerald-200 font-medium">Chiến dịch thắng lợi</span>
          </div>
        </div>
      </div>

      {/* Mission Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {MISSIONS.map(m => {
          const isSelected = m.id === activeMissionId;
          const isDone = completedMissions.includes(m.id);

          return (
            <div
              key={m.id}
              onClick={() => handleSelectMission(m.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30 text-slate-900'
                  : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700 shadow-2xs'
              }`}
            >
              {isDone && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3 h-3" /> Đã cứu nguy (+{m.rewardPoints}đ)
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                  {m.codename}
                </span>
                <h3 className="font-bold text-sm sm:text-base line-clamp-2 leading-snug">
                  {m.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  m.difficulty === 'Thách thức' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Độ khó: {m.difficulty}
                </span>
                <span className="font-extrabold text-amber-700 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> +{m.rewardPoints}đ
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Mission Briefing & Tactical Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Tactical Orders & Selections (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800 space-y-5">
          
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                {activeMission.codename}
              </span>
              <span className="text-xs text-slate-500 font-medium">Bản tin khẩn cấp</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {activeMission.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeMission.scenarioDesc}
            </p>
          </div>

          {/* Mission Objectives Checklist */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
            <span className="font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
              <Target className="w-4 h-4 text-amber-700" />
              Mục tiêu chiến dịch (Cần hoàn thành):
            </span>
            <ul className="space-y-1 text-slate-700">
              {activeMission.requiredGoals.map((g, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">▪</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tactical Options to Choose */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                Lựa chọn phương án can thiệp:
              </span>
              <span className="text-[11px] text-slate-500">
                Đã chọn: <strong className="text-amber-700">{selectedTactics.length}</strong> phương án
              </span>
            </div>

            <div className="space-y-2.5">
              {activeMission.tacticsOptions.map(tactic => {
                const isSelected = selectedTactics.includes(tactic.id);
                const isHarmful = tactic.id === 'tactic_emergency_well' || tactic.id === 'flood_build_high_dike';

                return (
                  <div
                    key={tactic.id}
                    onClick={() => handleToggleTactic(tactic.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? isHarmful
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/20 shadow-xs'
                          : 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? isHarmful
                          ? 'bg-rose-600 border-rose-600 text-white'
                          : 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1 space-y-1 text-xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between flex-wrap gap-1">
                        <span>{tactic.label}</span>
                        {isHarmful && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                            ⚠️ Nguy cơ tiềm ẩn
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {tactic.actionDesc}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-semibold text-slate-500">
                        <span className="text-emerald-700">
                          Lưỡi mặn: -{tactic.salinityReductionKm} km
                        </span>
                        <span className={tactic.sustainabilityBoost >= 0 ? 'text-teal-700' : 'text-rose-700'}>
                          Điểm bền vững: {tactic.sustainabilityBoost >= 0 ? `+${tactic.sustainabilityBoost}` : tactic.sustainabilityBoost}đ
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 italic">
                        Đánh đổi: {tactic.costOrTradeoff}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={handleRunMission}
              disabled={selectedTactics.length === 0}
              className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Thực Thi Phương Án & Đánh Giá Kết Quả</span>
            </button>
            <button
              onClick={handleResetMission}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer border border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Realtime Scientific Evaluation & Mission Report (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Situation Room Telemetry Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800 space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>Phòng Tác Chiến Thủy Văn ĐBSCL</span>
            </h3>

            {/* Metric Comparison: Current vs Impact */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>Ranh mặn 4‰ đe dọa:</span>
                  <span className="font-bold text-rose-700">
                    Ban đầu: ~{activeMission.crisisData.salinityThreatKm} km
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>Sau khi can thiệp:</span>
                  <span className={`text-base font-black ${
                    finalSalinityKm <= 50 ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    ~{finalSalinityKm} km ({totalSalinityReduction > 0 ? `-${totalSalinityReduction} km` : 'Chưa giảm'})
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      finalSalinityKm <= 50 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, (finalSalinityKm / 90) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Sustainability Score Gauge */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Chỉ số Hiệu Quả Chiến Dịch:</span>
                  <span className={`text-lg font-black ${
                    finalScore >= 75 ? 'text-emerald-700' : finalScore >= 50 ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {finalScore} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      finalScore >= 75
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500'
                        : finalScore >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${finalScore}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1">
                <span className="font-bold text-slate-700">Các tỉnh chịu ảnh hưởng trực tiếp:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeMission.crisisData.atRiskProvinces.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mission Result Verdict Box (When user presses Run) */}
          {isCompleted && (
            <div className={`p-5 rounded-2xl border shadow-sm space-y-3 animate-fade-in ${
              isMissionPassed
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center gap-2">
                {isMissionPassed ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-black text-sm sm:text-base">
                    {isMissionPassed ? '🎉 CHIẾN DỊCH GIẢI CỨU THÀNH CÔNG!' : '⚠️ CHIẾN DỊCH CHƯA ĐẠT CHỈ TIÊU!'}
                  </h4>
                  <span className="text-xs font-semibold">
                    {isMissionPassed ? `Bạn đã nhận huy hiệu: ${activeMission.badge}` : 'Cần điều chỉnh lại tổ hợp giải pháp'}
                  </span>
                </div>
              </div>

              <div className="text-xs leading-relaxed space-y-2 pt-2 border-t border-emerald-200/60">
                <p>
                  {isMissionPassed ? (
                    <span>
                      Xuất sắc! Phương án phối hợp của bạn đã chặn đứng đợt thảm họa thủy văn, giữ vững nguồn nước ngọt cho vựa cây ăn trái và nông dân châu thổ. 
                    </span>
                  ) : hasNegativeTactic ? (
                    <span className="text-rose-900 font-medium">
                      Lưu ý chuyên môn: Giải pháp bạn chọn có bao gồm phương án gây hại lâu dài (như khoan nước ngầm tràn lan gây sụt lún, hoặc đắp đê bao triệt để làm đất kiệt quệ phù sa). Cần chuyển sang các giải pháp "Thuận thiên"!
                    </span>
                  ) : (
                    <span>
                      Chỉ số hiệu quả chưa đạt mức an toàn tối thiểu (75 điểm) hoặc chưa đủ số lượng biện pháp phối hợp. Hãy kích hoạt thêm ngoại giao MRC, đóng cống thông minh hoặc trữ nước mương vườn.
                    </span>
                  )}
                </p>

                {/* Expert Debrief */}
                <div className="p-3 rounded-xl bg-white/80 border border-emerald-200 text-[11px] text-slate-700">
                  <strong className="text-emerald-900 block mb-0.5">💡 Bài học chuyên đề Địa lí 11:</strong>
                  {activeMission.expertDebrief}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
