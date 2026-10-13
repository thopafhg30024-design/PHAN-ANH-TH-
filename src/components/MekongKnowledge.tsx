import React, { useState } from 'react';
import { EducationLevel, Language } from '../types';
import { soundFx } from '../utils/audio';
import { 
  BookOpen, 
  Droplets, 
  Globe, 
  Fish, 
  Waves, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Compass, 
  Sparkles, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  AlertTriangle,
  ShieldAlert,
  Flame,
  ArrowRight,
  School,
  MapPin,
  ExternalLink,
  Award,
  TrendingUp,
  Ship,
  Zap,
  Building2,
  Users,
  Coins,
  GraduationCap
} from 'lucide-react';
import { SIX_COUNTRIES_INFO, RIVER_NINE_ESTUARIES, MRC_TOPICS } from '../data/mekongData';
import { GRADE_SPOTLIGHTS_BY_CHAPTER } from '../data/gradeLevelContent';

interface MekongKnowledgeProps {
  selectedLevel: EducationLevel;
  language?: Language;
  onOpenChatbotWithTopic?: (topic: string) => void;
  onNavigateTab?: (tab: string) => void;
}

// Flashcards for quick study
const STUDY_FLASHCARDS = [
  {
    id: 'fc-1',
    term: 'Chiều dài & Lưu lượng sông Mê Kông',
    brief: 'Dài 4.763 km, lưu lượng 475 tỉ m³/năm, diện tích lưu vực 810.000 km².',
    detail: 'Xếp thứ 12 thế giới về chiều dài và thứ 3 châu Á (sau Trường Giang và Hoàng Hà). Lưu lượng lớn thứ 8 thế giới.',
    tag: 'Số liệu'
  },
  {
    id: 'fc-2',
    term: 'Biển Hồ Tonle Sap & Cơ chế "Dòng chảy ngược"',
    brief: 'Mùa lũ nước từ Mê Kông dồn vào hồ; mùa cạn hồ xả nước ngược ra sông.',
    detail: 'Diện tích hồ phình từ 2.500 km² (mùa khô) lên tới 16.000 km² (mùa lũ). Đóng vai trò bể điều hòa tự nhiên vô giá cho ĐBSCL.',
    tag: 'Thủy văn'
  },
  {
    id: 'fc-eco-role',
    term: 'Vai trò Kinh tế - Xã hội của sông Mê Kông',
    brief: 'Tưới tiêu >10 triệu ha, ngư trường nước ngọt #1 thế giới (>2,6 triệu tấn/năm), tiềm năng thủy điện >30.000 MW, nuôi sống 65 triệu dân.',
    detail: 'Đối với Việt Nam (ĐBSCL): Đóng góp >50% sản lượng lúa, 90% gạo xuất khẩu, 53% thủy sản xuất khẩu và 70% trái cây cả nước, là trụ đỡ an ninh lương thực quốc gia và toàn cầu.',
    tag: 'Kinh tế - Xã hội'
  },
  {
    id: 'fc-hydropower-battery',
    term: '"Bình ắc quy của Đông Nam Á" & Thủy điện',
    brief: 'Biệt danh năng lượng của Lào nhờ khai thác hệ thống đập thủy điện sông Mê Kông.',
    detail: 'Lào xuất khẩu điện sang Thái Lan và Việt Nam để phát triển kinh tế, song đặt ra bài toán giữ lại 50-70% phù sa màu mỡ về vùng hạ lưu ĐBSCL.',
    tag: 'Năng lượng'
  },
  {
    id: 'fc-mrc-vietnam',
    term: 'Uỷ hội sông Mê Công & Vai trò của Việt Nam',
    brief: 'Nội dung trọng tâm đã được chuyển sang tab "Chuyên Đề Địa Lí 11 & MRC" với đầy đủ chuẩn SGK (Mục 2, 3, 4 trang 8 - 16).',
    detail: 'Xem chi tiết tại phân hệ "Chuyên Đề Địa Lí 11 & MRC" gồm: 5 thủ tục quản lí nước (PDIES, PWUM, PNPCA, PMFM, PWQ); 7 thành tựu; 4 vai trò của Việt Nam và phần giải đáp câu hỏi SGK.',
    tag: 'Chuyên đề 11'
  },
  {
    id: 'fc-3',
    term: 'Hiệp định Mê Kông 1995',
    brief: 'Ký ngày 5/4/1995 tại Chiang Rai (Thái Lan) giữa 4 quốc gia hạ lưu.',
    detail: 'Thành lập Ủy hội sông Mê Công (MRC) gồm Việt Nam, Lào, Campuchia, Thái Lan. Trung Quốc và Myanmar là đối tác đối thoại.',
    tag: 'Chuyên đề 11'
  },
  {
    id: 'fc-4',
    term: 'Quy trình PNPCA của MRC',
    brief: 'Thông báo (Procedures for Notification), Tham vấn trước (Prior Consultation) và Thỏa thuận (Agreement).',
    detail: 'Áp dụng đối với các dự án sử dụng nước trên dòng chính và dòng nhánh sông Mê Kông để ngăn chặn tác động tiêu cực qua biên giới.',
    tag: 'Quy trình'
  },
  {
    id: 'fc-5',
    term: 'Chín Cửa Sông Cửu Long',
    brief: 'Sông Tiền có 6 cửa; Sông Hậu có 3 cửa đổ ra Biển Đông.',
    detail: 'Sông Tiền: Tiểu, Đại, Ba Lai, Hàm Luông, Cổ Chiên, Cung Hầu. Sông Hậu: Định An, Bát Xắc (Ba Thắc), Trần Đề.',
    tag: 'ĐBSCL'
  },
  {
    id: 'fc-6',
    term: 'Nghị quyết 120/NQ-CP "Thuận thiên"',
    brief: 'Nghị quyết của Chính phủ Việt Nam về phát triển bền vững ĐBSCL thích ứng BĐKH.',
    detail: 'Tôn trọng quy luật tự nhiên, coi nước mặn - lợ là tài nguyên kinh tế, chuyển đổi mô hình lúa - tôm, nông nghiệp công nghệ cao.',
    tag: 'Chính sách'
  },
  {
    id: 'fc-water-exploitation',
    term: 'Một số vấn đề trong khai thác, sử dụng nguồn nước Mê Kông',
    brief: 'Mục 4 SGK Địa lí 11: Khai thác thủy điện, tưới tiêu gây đói phù sa (50-74%), hạn mặn 50-90km, sạt lở và đe dọa cá di cư.',
    detail: 'Hệ lụy chính gồm: Biến đổi dòng chảy, mất phù sa, xâm nhập mặn lịch sử, sụt lún nền đất 1-3cm/năm, suy giảm 2,6 triệu tấn thủy sản tự nhiên và ô nhiễm hữu cơ. Cần phối hợp MRC và giải pháp Thuận thiên.',
    tag: 'Mục 4 SGK 11'
  }
];

// Curated comprehensive topic modules
const KNOWLEDGE_CHAPTERS = [
  {
    id: 'overview',
    title: '1. Khái Quát & Hành Trình 4.763 KM',
    subtitle: 'Nguồn gốc, các tên gọi lịch sử, 6 quốc gia và vị thế địa - sinh thái',
    icon: Compass,
    badge: 'Cốt lõi'
  },
  {
    id: 'delta-estuaries',
    title: '2. Châu Thổ Cửu Long & 9 Cửa Sông',
    subtitle: 'Hệ thống Sông Tiền - Sông Hậu, 9 nhánh rồng, kênh rạch và FPT Hậu Giang',
    icon: Waves,
    badge: 'Việt Nam'
  },
  {
    id: 'socio-economic',
    title: '3. Vai Trò Đối Với Kinh Tế - Xã Hội',
    subtitle: 'Nông nghiệp vựa lúa, ngư trường số 1 thế giới, thủy điện, giao thông thủy & du lịch văn hóa',
    icon: TrendingUp,
    badge: 'Kinh tế - Xã hội'
  },
  {
    id: 'ecology',
    title: '4. Đa Dạng Sinh Học & Loài Cá Khổng Lồ',
    subtitle: 'Vương quốc thủy sản nước ngọt lớn thứ 2 thế giới, các khu Ramsar đất ngập nước',
    icon: Fish,
    badge: 'Sinh thái'
  },
  {
    id: 'security-solutions',
    title: '5. Khai Thác, Sử Dụng Nguồn Nước & Bảo Vệ Môi Trường Nước',
    subtitle: 'Phân tích các mục đích khai thác, những vấn đề nảy sinh và giải pháp bảo vệ theo chuẩn SGK Địa lí 11',
    icon: ShieldCheck,
    badge: 'Trọng Tâm SGK Địa 11'
  }
];

export const MekongKnowledge: React.FC<MekongKnowledgeProps> = ({ 
  selectedLevel,
  language = 'vi',
  onOpenChatbotWithTopic,
  onNavigateTab
}) => {
  const isEn = language === 'en';
  const [activeChapterId, setActiveChapterId] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [selectedEconomicSector, setSelectedEconomicSector] = useState<'all' | 'agriculture' | 'fishery' | 'energy' | 'transport' | 'tourism' | 'living'>('all');

  const activeChapter = KNOWLEDGE_CHAPTERS.find(c => c.id === activeChapterId) || KNOWLEDGE_CHAPTERS[0];

  const handleSelectChapter = (id: string) => {
    setActiveChapterId(id);
    soundFx.playClick();
  };

  const handleAskKienSang = (topicName: string) => {
    soundFx.playClick();
    if (onOpenChatbotWithTopic) {
      onOpenChatbotWithTopic(topicName);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white border border-emerald-300/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold mb-3 shadow-xs backdrop-blur-xs">
            <BookOpen className="w-4 h-4 text-emerald-100" />
            <span>{isEn ? 'Comprehensive Mekong River Knowledge Center • Grade 11 Geography' : 'Trung Tâm Kiến Thức Sông Mê Kông Toàn Diện • SGK Địa Lí 11 & ĐBSCL'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 drop-shadow-xs">
            {isEn ? 'Mekong River Knowledge Encyclopedia' : 'Bách Khoa Tri Thức Sông Mê Kông (Mekong River Knowledge)'}
          </h1>
          <p className="text-emerald-50 text-sm sm:text-base leading-relaxed mb-5 font-normal">
            {isEn
              ? 'Comprehensive systemization of geography, hydrology, biodiversity, 6 basin nations, the organic relationship with the Mekong Delta, and core curriculum topics for Grade 11.'
              : 'Hệ thống hóa toàn bộ kiến thức địa lí, thủy văn học, hệ sinh thái, 6 quốc gia lưu vực, mối quan hệ hữu cơ với Đồng bằng sông Cửu Long và trọng tâm Chuyên đề Địa lí 11 theo Chương trình GDPT 2018.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/25 text-xs text-white font-medium shadow-xs">
              <Compass className="w-4 h-4 text-emerald-200" />
              <span>{isEn ? 'Length:' : 'Dài'} <strong>4 763 km</strong> {isEn ? '(12th in the world)' : '(thứ 12 thế giới)'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/25 text-xs text-white font-medium shadow-xs">
              <Droplets className="w-4 h-4 text-orange-200" />
              <span>{isEn ? 'Basin:' : 'Lưu vực'} <strong>810 000 km²</strong> (MRC 2022)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/25 text-xs text-white font-medium shadow-xs">
              <Waves className="w-4 h-4 text-emerald-200" />
              <span><strong>{isEn ? '9 Estuaries' : '9 Cửa sông'}</strong> {isEn ? 'flow into the East Sea' : 'Cửu Long đổ ra Biển Đông'}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-400 text-orange-950 px-3.5 py-2 rounded-xl border border-orange-300 text-xs font-bold shadow-xs">
              <School className="w-4 h-4 text-orange-900" />
              <span>TH, THCS & THPT FPT Hậu Giang</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation: Chapters / Modules */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Các Chuyên Mục Kiến Thức ({KNOWLEDGE_CHAPTERS.length})</span>
            </h3>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {selectedLevel === 'primary' ? 'Tiểu học' : selectedLevel === 'secondary' ? 'THCS' : 'THPT Lớp 11'}
            </span>
          </div>

          <div className="space-y-2">
            {KNOWLEDGE_CHAPTERS.map(chapter => {
              const isActive = chapter.id === activeChapterId;
              const IconComp = chapter.icon;

              return (
                <button
                  key={chapter.id}
                  id={`btn-chapter-${chapter.id}`}
                  onClick={() => handleSelectChapter(chapter.id)}
                  className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-50 to-orange-50/50 border-2 border-emerald-600 text-emerald-950 shadow-sm'
                      : 'bg-white border-slate-200/80 text-slate-700 hover:bg-orange-50/40 hover:border-orange-200 shadow-xs'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isActive ? 'bg-gradient-to-br from-emerald-600 to-orange-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-orange-100 text-orange-900 border border-orange-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {chapter.badge}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-orange-600 translate-x-0.5' : 'text-slate-400'}`} />
                    </div>
                    <h4 className={`text-sm font-bold truncate ${isActive ? 'text-emerald-900' : 'text-slate-800'}`}>
                      {chapter.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                      {chapter.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Direct link to MRC tab */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 via-emerald-50 to-blue-50 border border-teal-200 text-xs shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <BookOpen className="w-4 h-4 text-teal-700 shrink-0" />
              <span className="font-bold text-teal-950 text-xs">Chuyên Đề Địa Lí 11 & MRC</span>
            </div>
            <p className="text-[11px] text-slate-600 mb-2.5 leading-relaxed">
              Mục <strong>"Ủy Hội Sông Mê Kông & Vai Trò Của Việt Nam"</strong> đã được chuyển sang phân hệ chuyên đề riêng biệt theo chuẩn SGK.
            </p>
            {onNavigateTab && (
              <button
                onClick={() => {
                  onNavigateTab('mrc');
                  soundFx.playClick();
                }}
                className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <span>Xem Chuyên Đề MRC & Việt Nam</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Ask Mascot Action Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/70 border border-amber-200 text-xs shadow-xs">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                🐜✨
              </div>
              <div>
                <h5 className="font-bold text-amber-900 text-sm">Cần hỏi thêm Kiến Sáng?</h5>
                <p className="text-amber-800/80 text-[11px]">Chatbot thông minh giải đáp ngay mọi câu hỏi</p>
              </div>
            </div>
            <button
              onClick={() => handleAskKienSang(activeChapter.title)}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-extrabold text-xs transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Hỏi Kiến Sáng về "{activeChapter.title.split('.')[1]?.trim()}"</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Content View: In-depth Chapter Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dynamic Pedagogical Level Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-orange-50 border border-emerald-200/80 flex items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-slate-900">
                    {isEn ? 'Content optimized for level:' : 'Nội dung đang tối ưu cho cấp:'}
                  </span>
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                    selectedLevel === 'primary' 
                      ? 'bg-orange-100 text-orange-950 border-orange-300' 
                      : selectedLevel === 'secondary' 
                      ? 'bg-teal-100 text-teal-950 border-teal-300' 
                      : 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  }`}>
                    {selectedLevel === 'primary' && (isEn ? '🎒 PRIMARY SCHOOL (Visual stories & exploration)' : '🎒 TIỂU HỌC (Hình ảnh & Khám phá sinh động)')}
                    {selectedLevel === 'secondary' && (isEn ? '📘 SECONDARY SCHOOL (Physical geography & ecosystems)' : '📘 THCS (Địa lí tự nhiên & Hệ sinh thái)')}
                    {selectedLevel === 'highschool' && (isEn ? '🎓 HIGH SCHOOL GRADE 11 (MRC topics & curriculum)' : '🎓 THPT LỚP 11 (Chuyên đề MRC & Ôn thi GDPT 2018)')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {selectedLevel === 'primary' && (isEn ? 'Focusing on river stories, wildlife, 9 estuaries, and clean water conservation.' : 'Tập trung vào các câu chuyện dòng sông, con vật kỳ thú, 9 cửa sông và bảo vệ giọt nước sạch.')}
                  {selectedLevel === 'secondary' && (isEn ? 'Focusing on terrain characteristics, flood-dry seasonal discharge, and Tonle Sap mechanics.' : 'Tập trung vào đặc điểm địa hình, lưu lượng nước mùa lũ - kiệt và mối quan hệ sông - Biển Hồ.')}
                  {selectedLevel === 'highschool' && (isEn ? 'In-depth MRC 2022 report analysis, 5 water procedures, water security, and Resolution 120/NQ-CP.' : 'Đi sâu vào Báo cáo MRC 2022, 5 quy chế nước, bài toán an ninh nguồn nước và Nghị quyết 120/NQ-CP.')}
                </p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-800 font-bold bg-white/80 px-2 py-1 rounded-lg border border-emerald-200 shrink-0 hidden md:block">
              {isEn ? 'Auto synced' : 'Tự động đồng bộ'}
            </span>
          </div>

          {/* Grade-Level Dynamic Curriculum Spotlight Card */}
          {(() => {
            const spotlight = GRADE_SPOTLIGHTS_BY_CHAPTER[activeChapterId]?.[selectedLevel];
            if (!spotlight) return null;
            const lang = isEn ? 'en' : 'vi';

            return (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-emerald-50/70 border-2 border-orange-300 shadow-sm transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-orange-500 text-white shadow-xs">
                    {spotlight.tag[lang]}
                  </span>
                  <button
                    onClick={() => handleAskKienSang(spotlight.title[lang])}
                    className="text-xs text-orange-950 hover:text-emerald-700 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>{spotlight.actionPrompt[lang]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {spotlight.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  {spotlight.description[lang]}
                </p>

                <div className="mt-3 pt-3 border-t border-orange-200/80 space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-950 block">
                    {isEn ? 'Key Grade-level Insights:' : 'Trọng tâm kiến thức phân hóa theo cấp:'}
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {spotlight.bulletPoints[lang].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}

          {/* Chapter 1: Khái Quát Dòng Sông */}
          {activeChapterId === 'overview' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-6 text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">Chương 1 • Toàn Cảnh Lưu Vực</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Khái Quát Về Sông Mê Kông & Hành Trình 4.763 KM
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Dòng sông quốc tế huyết mạch nuôi dưỡng nền văn minh của hơn 65 triệu cư dân vùng Đông Nam Á lục địa.
                </p>
              </div>

              {/* Core Parameters Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold">Chiều dài</span>
                  <span className="text-lg font-black text-emerald-700">4 763 km</span>
                  <span className="text-[10px] text-slate-500 block">Thứ 12 thế giới</span>
                </div>
                <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold">Diện tích lưu vực</span>
                  <span className="text-lg font-black text-teal-700">810 000 km²</span>
                  <span className="text-[10px] text-slate-500 block">Nguồn: MRC 2022</span>
                </div>
                <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold">Lưu lượng TB năm</span>
                  <span className="text-lg font-black text-cyan-700">475 tỉ m³</span>
                  <span className="text-[10px] text-slate-500 block">Xếp thứ 8 toàn cầu</span>
                </div>
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold">Độ cao nguồn</span>
                  <span className="text-lg font-black text-amber-700">5 224 m</span>
                  <span className="text-[10px] text-slate-500 block">Cao nguyên Tây Tạng</span>
                </div>
              </div>

              {/* Names along the river */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600" />
                  <span>Các Tên Gọi Của Sông Mê Kông Theo Từng Quốc Gia:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                    <span className="font-bold text-slate-900 block">🇨🇳 Trung Quốc: Lan Thương Giang (澜沧江 - Lancang Jiang)</span>
                    <span className="text-slate-600 text-[11px]">Nghĩa là "Dòng sông cuộn sóng dữ dội" hoặc bắt đầu từ giọt nước Dza-chu trên cao nguyên tuyết phủ Tây Tạng.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                    <span className="font-bold text-slate-900 block">🇱🇦 Lào: Mènam Khong (ແມ່ນ້ຳຂອງ)</span>
                    <span className="text-slate-600 text-[11px]">"Sông Mẹ" - cội nguồn của sự sống, văn hóa Phật giáo tiểu thừa và nền nông nghiệp Lào.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                    <span className="font-bold text-slate-900 block">🇹🇭 Thái Lan: Mae Nam Khong (แม่น้ำโขng)</span>
                    <span className="text-slate-600 text-[11px]">Ranh giới tự nhiên dài hàng ngàn km với Lào, cấp nước cho vùng nông nghiệp trọng điểm Isan (Cao nguyên Khorat).</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                    <span className="font-bold text-slate-900 block">🇰🇭 Campuchia: Mékôngk (ទន្លេមេគង្គ) / Tonle Thom</span>
                    <span className="text-slate-600 text-[11px]">"Dòng sông Lớn", hợp lưu với Biển Hồ Tonle Sap tại Ngã tư bốn mặt Chaktomuk ở Phnom Penh.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60 sm:col-span-2">
                    <span className="font-bold text-slate-900 block">🇻🇳 Việt Nam: Sông Tiền, Sông Hậu & Sông Cửu Long (Chín Nhánh Rồng)</span>
                    <span className="text-slate-600 text-[11px]">Chảy vào Việt Nam tại An Giang và Đồng Tháp, chia làm 2 nhánh chính là Sông Tiền và Sông Hậu, đổ ra Biển Đông qua 9 cửa sông Cửu Long thiêng liêng.</span>
                  </div>
                </div>
              </div>

              {/* Three river sections */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-teal-600" />
                  <span>Ba Phân Đoạn Địa Lí Tự Nhiên:</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-teal-100 text-teal-800 font-bold text-[10px] shrink-0 border border-teal-200">THƯỢNG LƯU</span>
                    <p className="text-slate-600 leading-relaxed">
                      Từ cao nguyên Tây Tạng qua tỉnh Vân Nam (Trung Quốc) tới Tam giác Vàng. Địa hình hẻm vực dốc đứng (chênh lệch độ cao hơn 4.500m), dòng chảy xiết, tiềm năng thủy điện khổng lồ với chuỗi 11 đập bậc thang lớn.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-amber-100 text-amber-800 font-bold text-[10px] shrink-0 border border-amber-200">TRUNG LƯU</span>
                    <p className="text-slate-600 leading-relaxed">
                      Từ Tam giác Vàng qua Lào, Thái Lan đến thác Khone Phapheng (Lào - Campuchia). Lòng sông mở rộng xen kẽ ghềnh đá, thác nước hùng vĩ chia cắt giao thông thủy thẳng đứng, là hành lang di cư của hàng trăm loài cá.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] shrink-0 border border-emerald-200">HẠ LƯU & CHÂU THỔ</span>
                    <p className="text-slate-600 leading-relaxed">
                      Từ hạ lưu Campuchia qua ngã tư Chaktomuk đến vùng châu thổ ĐBSCL (Việt Nam). Địa hình bằng phẳng thấp (dưới 2m), chịu tác động mạnh của thủy triều Biển Đông và Vịnh Thái Lan, mạng lưới kênh rạch chằng chịt bồi đắp bởi phù sa màu mỡ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 2: ĐBSCL & 9 Cửa Sông */}
          {activeChapterId === 'delta-estuaries' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-6 text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Chương 2 • Đất Chín Rồng Phương Nam</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Đồng Bằng Sông Cửu Long & Hệ Thống 9 Cửa Sông Ra Biển Đông
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Vùng châu thổ trù phú hơn 40.000 km², vựa lúa gạo lớn nhất cả nước và vai trò của tuyến kênh xáng Xà No bên cạnh Trường FPT Hậu Giang.
                </p>
              </div>

              {/* 9 Estuaries Table Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-teal-600" />
                    <span>Danh Sách 9 Cửa Sông Cửu Long:</span>
                  </span>
                  <span className="text-xs text-slate-500 font-normal">Sông Tiền (6 cửa) + Sông Hậu (3 cửa)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {RIVER_NINE_ESTUARIES.map((est, i) => (
                    <div
                      key={est.name}
                      className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all text-xs shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-emerald-800">
                          {i + 1}. {est.name}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          est.branch.includes('Tiền') ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {est.branch}
                        </span>
                      </div>
                      <span className="text-slate-600 text-[11px] block">{est.province}</span>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {est.branch.includes('Sông Hậu') ? 'Luồng phân lưu chính của Sông Hậu ra thềm lục địa Biển Đông' : 'Cửa phân lưu bồi đắp phù sa Sông Tiền'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FPT Hậu Giang & Xa No Canal Context */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50/40 border border-orange-200 text-xs space-y-3">
                <div className="flex items-center gap-2 text-orange-900 font-bold text-sm">
                  <School className="w-5 h-5 text-orange-600" />
                  <span>Trường TH, THCS & THPT FPT Hậu Giang & Kênh Xáng Xà No</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed text-slate-700">
                  <div className="p-3 bg-white rounded-xl border border-orange-200/80 shadow-xs">
                    <span className="font-bold text-orange-900 block mb-1">📍 Tọa độ địa lí & Cơ sở FPT:</span>
                    <p>
                      Trường tọa lạc tại <strong>61C Ấp 6, xã Vị Thủy, Hậu Giang</strong> (tiếp giáp Thành phố Cần Thơ). Nằm ngay trung tâm tam giác thủy văn Tây Sông Hậu, là môi trường học tập công nghệ gắn liền với thiên nhiên sông nước Cửu Long.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-orange-200/80 shadow-xs">
                    <span className="font-bold text-orange-900 block mb-1">🌾 Kênh xáng Xà No - Con đường lúa gạo:</span>
                    <p>
                      Được đào từ năm 1901 - 1903, dài gần 40km nối liền sông Cần Thơ (Sông Hậu) với sông Cái Lớn (Vịnh Thái Lan), là tuyến đường thủy huyết mạch vận chuyển lúa gạo nổi tiếng bậc nhất Nam Bộ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3: Vai Trò Của Sông Mê Kông Đối Với Kinh Tế - Xã Hội */}
          {activeChapterId === 'socio-economic' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-7 text-slate-700">
              <div className="border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Chương 3 • Trọng Tâm SGK Địa Lí 11 & Sinh Kế Lưu Vực
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Lưu vực 6 quốc gia • Nuôi sống 65 triệu dân
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
                  Vai Trò Của Sông Mê Kông Đối Với Kinh Tế - Xã Hội
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-4xl">
                  Sông Mê Kông không chỉ là nguồn tài nguyên nước tự nhiên đơn thuần, mà là trục xương sống sinh kế của hơn 65 triệu người dân, cái nôi của các nền văn minh lúa nước Đông Nam Á và động lực tăng trưởng kinh tế đa ngành từ nông nghiệp, thủy sản, năng lượng thủy điện, vận tải thủy cho đến du lịch sinh thái văn hóa.
                </p>
              </div>

              {/* 4 Macro Key Economic Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200 shadow-xs">
                  <div className="flex items-center justify-between text-amber-800 text-xs font-bold mb-1">
                    <span>🌾 Nông Nghiệp</span>
                    <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded">Tưới tiêu</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-amber-950">&gt;10 triệu ha</div>
                  <p className="text-[11px] text-amber-800/90 mt-1 leading-tight">
                    ĐBSCL cung cấp &gt;50% lúa & 90% gạo xuất khẩu của Việt Nam.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50/70 border border-cyan-200 shadow-xs">
                  <div className="flex items-center justify-between text-cyan-800 text-xs font-bold mb-1">
                    <span>🐟 Thủy Sản Nước Ngọt</span>
                    <span className="text-[10px] bg-cyan-200/80 text-cyan-900 px-1.5 py-0.5 rounded">#1 Thế giới</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-cyan-950">&gt;2,6 triệu tấn</div>
                  <p className="text-[11px] text-cyan-800/90 mt-1 leading-tight">
                    Trị giá &gt;11 tỉ USD/năm; cung cấp 60-80% protein cho Lào & Cam.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/70 border border-purple-200 shadow-xs">
                  <div className="flex items-center justify-between text-purple-800 text-xs font-bold mb-1">
                    <span>⚡ Thủy Điện Năng Lượng</span>
                    <span className="text-[10px] bg-purple-200/80 text-purple-900 px-1.5 py-0.5 rounded">Trữ năng</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-purple-950">30.000 - 53.000 MW</div>
                  <p className="text-[11px] text-purple-800/90 mt-1 leading-tight">
                    Được xem là "Bình ắc quy của Đông Nam Á" phục vụ công nghiệp hóa.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200 shadow-xs">
                  <div className="flex items-center justify-between text-emerald-800 text-xs font-bold mb-1">
                    <span>🚢 Vận Tải & Dân Sinh</span>
                    <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded">Logistics</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-emerald-950">Tiết kiệm 30-50%</div>
                  <p className="text-[11px] text-emerald-800/90 mt-1 leading-tight">
                    Chi phí so với đường bộ; cấp nước sinh hoạt cho &gt;65 triệu dân.
                  </p>
                </div>
              </div>

              {/* Sector Filter Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Khám Phá Các Trụ Cột Kinh Tế - Xã Hội:
                  </span>
                  <span className="text-[11px] text-slate-400">Nhấn để lọc chi tiết</span>
                </div>
                <div className="flex flex-wrap gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70">
                  {[
                    { id: 'all', label: 'Tất Cả 6 Lĩnh Vực' },
                    { id: 'agriculture', label: '🌾 1. Nông Nghiệp & Lương Thực' },
                    { id: 'fishery', label: '🐟 2. Thủy Sản & Nghề Cá' },
                    { id: 'energy', label: '⚡ 3. Năng Lượng Thủy Điện' },
                    { id: 'transport', label: '🚢 4. Giao Thông Thủy & Cảng' },
                    { id: 'tourism', label: '🛶 5. Du Lịch & Bản Sắc' },
                    { id: 'living', label: '🏘️ 6. Đô Thị & Dân Sinh' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedEconomicSector(tab.id as any);
                        soundFx.playClick();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedEconomicSector === tab.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Sector Sections */}
              <div className="space-y-5">
                {/* 1. Nông nghiệp */}
                {(selectedEconomicSector === 'all' || selectedEconomicSector === 'agriculture') && (
                  <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          🌾
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-amber-950">
                            1. Nông Nghiệp & An Ninh Lương Thực Toàn Cầu
                          </h3>
                          <span className="text-[11px] text-amber-700 font-medium">
                            Tưới tiêu hơn 10 triệu ha đất canh tác & kiến tạo 2 vựa lúa lớn nhất Đông Nam Á
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        Vựa Lúa Số 1
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-700">
                      <div className="p-3 bg-white rounded-xl border border-amber-200/70 space-y-1">
                        <span className="font-bold text-amber-900 block text-xs">💧 Nước ngọt tưới tiêu:</span>
                        <p className="text-[11px]">
                          Cung cấp nguồn nước mặt dồi dào tưới tiêu cho hơn 10 triệu ha đất lúa, hoa màu và cây ăn trái khắp lưu vực từ vùng Khorat (Thái Lan), đồng bằng Battambang (Campuchia) đến vùng đồng bằng châu thổ sông Cửu Long.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-amber-200/70 space-y-1">
                        <span className="font-bold text-amber-900 block text-xs">🌱 Phù sa màu mỡ vô giá:</span>
                        <p className="text-[11px]">
                          Hàng năm, dòng sông bồi đắp hàng chục triệu tấn trầm tích phù sa giàu vi khoáng, giúp thau chua rửa phèn, bồi đắp độ phì nhiêu tự nhiên cho đất mà không cần dùng nhiều phân bón hóa học độc hại.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-amber-200/70 space-y-1">
                        <span className="font-bold text-amber-900 block text-xs">🇻🇳 Đóng góp đặc biệt cho Việt Nam:</span>
                        <p className="text-[11px]">
                          ĐBSCL là vựa lúa gạo lớn nhất cả nước: chiếm <strong>&gt;50% sản lượng lúa</strong>, <strong>90% sản lượng gạo xuất khẩu</strong> (đưa Việt Nam lên top đầu xuất khẩu gạo thế giới) và <strong>70% sản lượng cây ăn trái</strong> (xoài cát Hòa Lộc, bưởi da xanh, sầu riêng Chợ Lách...).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Thủy sản */}
                {(selectedEconomicSector === 'all' || selectedEconomicSector === 'fishery') && (
                  <div className="p-5 rounded-2xl bg-cyan-50/40 border border-cyan-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-cyan-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          🐟
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-cyan-950">
                            2. Thủy Sản & Nghề Cá Nước Ngọt Năng Suất Nhất Hành Tinh
                          </h3>
                          <span className="text-[11px] text-cyan-700 font-medium">
                            Ngư trường nước ngọt khổng lồ & ngành công nghiệp chế biến thủy hải sản xuất khẩu tỉ đô
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300">
                        &gt;2,6 Triệu Tấn/Năm
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-700">
                      <div className="p-3 bg-white rounded-xl border border-cyan-200/70 space-y-1">
                        <span className="font-bold text-cyan-900 block text-xs">🌍 Ngư trường nội địa số 1 thế giới:</span>
                        <p className="text-[11px]">
                          Sản lượng đánh bắt và nuôi trồng đạt hơn 2,6 triệu tấn/năm, trị giá trên 11 tỉ USD, đóng góp khoảng 20-25% tổng sản lượng cá nước ngọt được khai thác trên toàn cầu.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-cyan-200/70 space-y-1">
                        <span className="font-bold text-cyan-900 block text-xs">🥩 Nguồn protein sống còn:</span>
                        <p className="text-[11px]">
                          Cung cấp từ 60% đến 80% nguồn protein động vật cho người dân Campuchia và Lào, đóng vai trò then chốt bảo đảm an ninh dinh dưỡng và sinh kế chống đói nghèo cho hàng triệu hộ gia đình.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-cyan-200/70 space-y-1">
                        <span className="font-bold text-cyan-900 block text-xs">🦐 Xuất khẩu tỉ đô của ĐBSCL:</span>
                        <p className="text-[11px]">
                          ĐBSCL đóng góp <strong>53% sản lượng thủy sản xuất khẩu của cả nước</strong> (cá tra, cá basa, tôm sú, tôm thẻ chân trắng), xuất sang &gt;140 quốc gia với kim ngạch hàng tỉ USD; "mùa nước nổi" mang lại đặc sản cá linh non và tép rong trứ danh.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Năng lượng thủy điện */}
                {(selectedEconomicSector === 'all' || selectedEconomicSector === 'energy') && (
                  <div className="p-5 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          ⚡
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-purple-950">
                            3. Tiềm Năng Thủy Điện & An Ninh Năng Lượng Khu Vực
                          </h3>
                          <span className="text-[11px] text-purple-700 font-medium">
                            Nguồn năng lượng sạch khổng lồ phục vụ công nghiệp hóa và chiến lược "Bình ắc quy của Đông Nam Á"
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                        30.000 - 53.000 MW
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-700">
                      <div className="p-3 bg-white rounded-xl border border-purple-200/70 space-y-1">
                        <span className="font-bold text-purple-900 block text-xs">🇨🇳 Thượng lưu Lan Thương (Trung Quốc):</span>
                        <p className="text-[11px]">
                          Xây dựng 11 đập bậc thang khổng lồ (Tiểu Loan 4.200 MW, Nọa Trát Độ 5.850 MW...) với tổng dung tích hồ chứa trên 40 tỉ m³, cung cấp điện năng phát triển vùng Tây Nam Trung Quốc và phục vụ xuất khẩu điện.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-purple-200/70 space-y-1">
                        <span className="font-bold text-purple-900 block text-xs">🇱🇦 Lào - "Bình ắc quy của Đông Nam Á":</span>
                        <p className="text-[11px]">
                          Lào quy hoạch chuỗi đập thủy điện dòng chính (Xayaburi, Don Sahong, Luang Prabang) và hàng chục đập dòng nhánh để xuất khẩu điện sang Thái Lan, Việt Nam, biến điện năng thành nguồn thu ngoại tệ trụ cột của nền kinh tế.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-purple-200/70 space-y-1">
                        <span className="font-bold text-rose-800 block text-xs">⚠️ Bài toán xung đột lợi ích (Địa lí 11):</span>
                        <p className="text-[11px]">
                          Các đập giữ lại 50-70% lượng bùn cát phù sa màu mỡ, làm sạt lở nghiêm trọng bờ sông hạ du, cản trở 70% loài cá di cư đẻ trứng và làm gia tăng xâm nhập mặn lịch sử tại ĐBSCL trong mùa khô.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Giao thông thủy */}
                {(selectedEconomicSector === 'all' || selectedEconomicSector === 'transport') && (
                  <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          🚢
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-blue-950">
                            4. Giao Thông Vận Tải Thủy & Giao Thương Xuyên Biên Giới
                          </h3>
                          <span className="text-[11px] text-blue-700 font-medium">
                            Trục hành lang thương mại đường thủy tự nhiên liên kết 6 quốc gia ra Biển Đông
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                        Hành Lang GMS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-700">
                      <div className="p-3 bg-white rounded-xl border border-blue-200/70 space-y-1">
                        <span className="font-bold text-blue-900 block text-xs">💰 Tiết kiệm chi phí logistics:</span>
                        <p className="text-[11px]">
                          Chi phí vận tải đường thủy rẻ hơn từ 30% đến 50% so với đường bộ, phát thải khí nhà kính thấp, chuyên chở hàng siêu trọng (than đá, phân bón, xi măng, cát đá, nông sản và container xuất nhập khẩu).
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-blue-200/70 space-y-1">
                        <span className="font-bold text-blue-900 block text-xs">⚓ Hệ thống cảng sông quốc tế:</span>
                        <p className="text-[11px]">
                          Các cảng quan trọng: Cảng Phnom Penh (Campuchia); tại Việt Nam có <strong>Cảng Cần Thơ, Cảng Cái Cui, Cảng Cao Lãnh, Cảng Mỹ Thới</strong>. Luồng Định An và kênh Quan Chánh Bố đón tàu biển 10.000 - 20.000 DWT cập cảng.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-blue-200/70 space-y-1">
                        <span className="font-bold text-blue-900 block text-xs">🛶 Mạng lưới kênh rạch nội địa:</span>
                        <p className="text-[11px]">
                          ĐBSCL sở hữu mạng lưới kênh đào đồ sộ (Kênh Xáng Xà No - "con đường lúa gạo", Kênh Vĩnh Tế, Kênh Chợ Gạo...), tạo trục giao thương thủy nối liền các tỉnh miền Tây với TP. Hồ Chí Minh và miền Đông Nam Bộ.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Du lịch & Bản sắc văn hóa */}
                {(selectedEconomicSector === 'all' || selectedEconomicSector === 'tourism') && (
                  <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          🛶
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-emerald-950">
                            5. Du Lịch Sinh Thái, Dịch Vụ & Không Gian Văn Hóa Sông Nước
                          </h3>
                          <span className="text-[11px] text-emerald-700 font-medium">
                            Hành trình viễn du quốc tế, chợ nổi miệt vườn và các di sản văn hóa phi vật thể nhân loại
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Văn Hóa Độc Đáo
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-700">
                      <div className="p-3 bg-white rounded-xl border border-emerald-200/70 space-y-1">
                        <span className="font-bold text-emerald-900 block text-xs">🛳️ Tour du thuyền sông quốc tế:</span>
                        <p className="text-[11px]">
                          Hải trình Mekong River Cruises từ TP.HCM / Mỹ Tho ngược dòng lên Phnom Penh, Siem Reap (đền Angkor Wat) và Luang Prabang là một trong những hành trình du lịch đường sông hấp dẫn nhất châu Á đối với du khách quốc tế.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-emerald-200/70 space-y-1">
                        <span className="font-bold text-emerald-900 block text-xs">🍍 Chợ nổi & Sinh thái miệt vườn:</span>
                        <p className="text-[11px]">
                          Chợ nổi Cái Răng (Cần Thơ), Chợ nổi Phong Điền, Chợ nổi Ngã Bảy; trải nghiệm cù lao miệt vườn (Thới Sơn, An Bình) và các khu Ramsar đất ngập nước (Tràm Chim, Rừng tràm Trà Sư, Lung Ngọc Hoàng).
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-emerald-200/70 space-y-1">
                        <span className="font-bold text-emerald-900 block text-xs">🎶 Di sản & Lễ hội sông nước:</span>
                        <p className="text-[11px]">
                          Nghệ thuật <strong>Đờn ca tài tử Nam Bộ</strong> (Di sản UNESCO); Lễ hội <strong>Đua thuyền Ngo (Ok Om Bok)</strong> của đồng bào Khmer; Tết té nước <strong>Bunpimay (Lào), Songkran (Thái Lan), Chol Chnam Thmay (Campuchia)</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Đô thị hóa & Cấp nước dân sinh */}
                {(selectedEconomicSector === 'all' || selectedEconomicSector === 'living') && (
                  <div className="p-5 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-teal-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          🏘️
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-teal-950">
                            6. Cung Cấp Nước Sinh Hoạt, Đô Thị Hóa & Lối Sống Cư Dân
                          </h3>
                          <span className="text-[11px] text-teal-700 font-medium">
                            Nguồn sống thường nhật của 65 triệu dân và triết lý "Sống chung với lũ"
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                        65 Triệu Dân
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-700">
                      <div className="p-3 bg-white rounded-xl border border-teal-200/70 space-y-1">
                        <span className="font-bold text-teal-900 block text-xs">🚰 Nguồn nước sinh hoạt đô thị:</span>
                        <p className="text-[11px]">
                          Cung cấp nước thô cho các nhà máy nước sinh hoạt phục vụ hàng loạt thành phố lớn dọc hai bờ sông: Viêng Chăn (Lào), Phnom Penh (Campuchia), Cần Thơ, Long Xuyên, Châu Đốc, Mỹ Tho, Vĩnh Long, Sa Đéc, Bến Tre (Việt Nam).
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-teal-200/70 space-y-1">
                        <span className="font-bold text-teal-900 block text-xs">🚣 Kiến trúc & Cư trú ven sông:</span>
                        <p className="text-[11px]">
                          Hình thành tập quán cư trú nhà sàn trên cọc gỗ, nhà nổi bè cá, cụm tuyến dân cư vượt lũ; văn hóa xuồng ba lá, ghe tam bản gắn liền với tuổi thơ bao thế hệ cư dân sông nước.
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-teal-200/70 space-y-1">
                        <span className="font-bold text-teal-900 block text-xs">🌊 Triết lý "Sống chung với lũ":</span>
                        <p className="text-[11px]">
                          Người dân ĐBSCL không coi mùa lũ là thiên tai mà là "mùa nước nổi" - tài nguyên thiên nhiên đem lại phù sa trù phú, rửa mặn rửa phèn, vệ sinh mầm sâu bệnh đồng ruộng và mang lại nguồn lợi tôm cá dồi dào.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Comparative Table: Basin Economic Exploitation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Bảng So Sánh Cơ Cấu Khai Thác Kinh Tế Theo Phân Đoạn Lưu Vực:</span>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Phân Đoạn Lưu Vực</th>
                        <th className="p-3">Quốc Gia</th>
                        <th className="p-3">Ngành Kinh Tế Trọng Điểm</th>
                        <th className="p-3">Giá Trị Đóng Góp</th>
                        <th className="p-3">Tác Động Xuyên Biên Giới</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          Thượng lưu (Lan Thương)
                        </td>
                        <td className="p-3 text-slate-600">Trung Quốc 🇨🇳</td>
                        <td className="p-3 text-purple-700 font-medium">
                          ⚡ Chuỗi thủy điện bậc thang, hồ chứa điều tiết, vận tải hẻm núi
                        </td>
                        <td className="p-3 text-slate-600">
                          Hàng chục tỉ kWh điện sạch phục vụ công nghiệp hóa Tây Nam
                        </td>
                        <td className="p-3 text-rose-700 font-medium">
                          Giữ lại phù sa, thay đổi dòng chảy tự nhiên mùa khô
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          Trung lưu
                        </td>
                        <td className="p-3 text-slate-600">Lào 🇱🇦, Thái Lan 🇹🇭, Myanmar 🇲🇲</td>
                        <td className="p-3 text-blue-700 font-medium">
                          ⚡ Thủy điện xuất khẩu, 🌾 Thủy lợi Khorat, 🐟 Nghề cá, 🚢 Vận tải biên giới
                        </td>
                        <td className="p-3 text-slate-600">
                          Nguồn thu ngoại tệ lớn cho Lào ("Bình ắc quy ĐNÁ"), cấp nước Isan
                        </td>
                        <td className="p-3 text-rose-700 font-medium">
                          Ngăn cản cá di cư sinh sản, giảm lưu lượng mùa kiệt
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          Hạ lưu & Châu thổ Cửu Long
                        </td>
                        <td className="p-3 text-slate-600">Campuchia 🇰🇭, Việt Nam 🇻🇳</td>
                        <td className="p-3 text-emerald-700 font-medium">
                          🌾 Vựa lúa & hoa quả số 1, 🐟 Thủy sản xuất khẩu tỉ đô, 🚢 Cảng biển, 🛶 Du lịch
                        </td>
                        <td className="p-3 text-slate-600">
                          Trụ đỡ an ninh lương thực toàn cầu (90% gạo XK của VN, 2,6 tr tấn cá)
                        </td>
                        <td className="p-3 text-amber-700 font-medium">
                          Chịu toàn bộ hệ quả suy giảm phù sa, sạt lở và xâm nhập mặn
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Geography 11 Key Takeaway Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Bài Học Cốt Lõi - Chuyên Đề Địa Lí 11: Mối Quan Hệ Liên Thuộc & Phát Triển Bền Vững</span>
                </div>
                <p className="text-xs text-emerald-50 leading-relaxed">
                  Sông Mê Kông minh chứng sâu sắc cho nguyên tắc địa lí: <strong>"Mọi tác động ở thượng nguồn đều để lại hệ quả kinh tế - xã hội ở hạ nguồn"</strong>. Khai thác kinh tế phải dựa trên tinh thần tôn trọng Hiệp định Mê Kông 1995, tuân thủ cơ chế tham vấn PNPCA và thực thi chiến lược <strong>"Thuận thiên" theo Nghị quyết 120/NQ-CP của Chính phủ Việt Nam</strong>: chuyển hóa thách thức thành cơ hội phát triển bền vững và thịnh vượng chung cho toàn lưu vực.
                </p>
              </div>
            </div>
          )}

          {/* Chapter 4: Đa Dạng Sinh Học */}
          {activeChapterId === 'ecology' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-6 text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Chương 4 • Vương Quốc Sinh Vật Nước Ngọt</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Đa Dạng Sinh Học Sông Mê Kông & Loài Cá Khổng Lồ
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Xếp thứ 2 thế giới về mức độ phong phú loài thủy sản nước ngọt (chỉ sau sông Amazon).
                </p>
              </div>

              {/* Giant fish cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <Fish className="w-4 h-4 text-amber-600" />
                  <span>Các "Thủy Quái" Nước Ngọt Nổi Tiếng Sông Mê Kông:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70">
                    <span className="font-bold text-slate-900 text-sm block">🐟 Cá Tra Dầu (Mekong Giant Catfish)</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block">Pangasianodon gigas • Cực kỳ nguy cấp (CR)</span>
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                      Có thể dài tới 3m và nặng trên 300kg, là một trong những loài cá nước ngọt thuần túy lớn nhất thế giới chỉ ăn thực vật thủy sinh.
                    </p>
                  </div>
                  <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70">
                    <span className="font-bold text-slate-900 text-sm block">🦈 Cá Đuối Nước Ngọt Khổng Lồ</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block">Urogymnus polylepis • Kỷ lục thế giới năm 2022</span>
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                      Năm 2022, ngư dân Campuchia bắt được cá thể nặng 300kg trên sông Mê Kông, được xác nhận là cá nước ngọt lớn nhất từng được ghi nhận trong lịch sử.
                    </p>
                  </div>
                  <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70">
                    <span className="font-bold text-slate-900 text-sm block">🐬 Cá Heo Nước Ngọt Irrawaddy</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block">Orcaella brevirostris • Vùng Thác Khone & Kratie</span>
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                      Loài thú có vú bơi lội thông minh, sinh sống ở các vực nước sâu dọc biên giới Lào - Campuchia, biểu tượng du lịch sinh thái sông Mê Kông.
                    </p>
                  </div>
                  <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70">
                    <span className="font-bold text-slate-900 text-sm block">🐟 Cá Hô (Giant Barb)</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block">Catlocarpio siamensis • "Vua của loài cá chép"</span>
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                      Loài cá chép lớn nhất thế giới, có thể đạt trọng lượng tới 150kg, đặc sản quý hiếm của vùng sông nước Cửu Long.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ramsar Wetlands */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <Waves className="w-4 h-4 text-teal-600" />
                  <span>Các Vùng Đất Ngập Nước Ramsar Quốc Tế Tại ĐBSCL:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                    <span className="font-bold text-slate-900 block">🌿 Tràm Chim (Đồng Tháp)</span>
                    <span className="text-[11px] text-slate-600">Khu bảo tồn Ramsar số 2.000 của thế giới, xứ sở của loài Sếu đầu đỏ quý hiếm.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                    <span className="font-bold text-slate-900 block">🌾 Lung Ngọc Hoàng (Hậu Giang)</span>
                    <span className="text-[11px] text-slate-600">"Lá phổi xanh" của ĐBSCL, vùng ngập nước bảo tồn nguồn gen sinh học hoang dã quý báu.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                    <span className="font-bold text-slate-900 block">🦀 Rừng ngập mặn Mũi Cà Mau</span>
                    <span className="text-[11px] text-slate-600">Rừng ngập mặn nguyên sinh lớn thứ 2 thế giới, bãi bồi nơi đất nở ra và rừng biết đi.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5: Khai Thác, Sử Dụng Nguồn Nước & Bảo Vệ Môi Trường Nước (Mục 4 SGK Địa lí 11) */}
          {activeChapterId === 'security-solutions' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-8 text-slate-700">
              {/* Header with Curriculum Standard */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wide">
                    Chương 5 • Mục 4 Chuyên Đề Địa Lí 11
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Chuẩn GDPT 2018
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Một Số Vấn Đề Trong Khai Thác, Sử Dụng Nguồn Nước & Bảo Vệ Môi Trường Nước
                </h2>
                <div className="mt-2 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Yêu cầu cần đạt của bài học (Sách Giáo Khoa Địa lí 11):</strong>
                    <span className="block text-slate-700 mt-0.5">
                      "Phân tích được một số vấn đề trong khai thác, sử dụng nguồn nước và bảo vệ môi trường nước sông Mê Công; liên hệ thực tiễn vùng Đồng bằng sông Cửu Long và định hướng phát triển bền vững."
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat Highlight Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 text-center">
                  <span className="text-xl font-black text-sky-700 block">475 tỉ m³</span>
                  <span className="text-[11px] text-slate-600 font-medium">Tổng lượng nước/năm</span>
                  <span className="text-[10px] text-sky-800 font-bold block mt-0.5">Thứ 8 toàn cầu</span>
                </div>
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-center">
                  <span className="text-xl font-black text-rose-700 block">-50% đến -74%</span>
                  <span className="text-[11px] text-slate-600 font-medium">Phù sa bị đập giữ lại</span>
                  <span className="text-[10px] text-rose-800 font-bold block mt-0.5">Gây đói trầm tích</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                  <span className="text-xl font-black text-amber-700 block">50 - 90 km</span>
                  <span className="text-[11px] text-slate-600 font-medium">Ranh mặn 4‰ lấn sâu</span>
                  <span className="text-[10px] text-amber-800 font-bold block mt-0.5">Đe dọa vụ đông xuân</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                  <span className="text-xl font-black text-emerald-700 block">2,6 triệu tấn</span>
                  <span className="text-[11px] text-slate-600 font-medium">Thủy sản tự nhiên/năm</span>
                  <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">Ngư trường #1 thế giới</span>
                </div>
              </div>

              {/* PHẦN 1: CÁC HOẠT ĐỘNG KHAI THÁC & SỬ DỤNG NGUỒN NƯỚC */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center">1</span>
                  <h3 className="text-base font-bold text-slate-900">
                    Các Mục Đích Khai Thác, Sử Dụng Nguồn Nước Sông Mê Công
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lưu vực sông Mê Kông là nguồn tài nguyên sống còn của hơn 65 triệu dân thuộc 6 quốc gia, được khai thác phục vụ 5 mục tiêu chiến lược:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 bg-slate-50 hover:bg-sky-50/40 transition-colors rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-sky-900">
                      <Zap className="w-4 h-4 text-sky-600" />
                      <span>1. Phát triển Thủy điện (Tiềm năng &gt;53 000 MW)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      • <strong>Thượng lưu (Trung Quốc):</strong> Đã vận hành chuỗi 12 bậc thang thủy điện khổng lồ trên dòng Lan Thương (Tiểu Loan 4 200 MW, Nọa Trát Độ 5 850 MW...).
                      <br />• <strong>Hạ lưu (Lào, Campuchia):</strong> Triển khai 11 dự án dòng chính (Xayaburi 1 285 MW, Don Sahong 260 MW, Pak Beng, Luang Prabang...), hướng tới mục tiêu trở thành "Bình ắc-quy Đông Nam Á".
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 hover:bg-emerald-50/40 transition-colors rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <Droplets className="w-4 h-4 text-emerald-600" />
                      <span>2. Nông nghiệp & Thủy lợi tưới tiêu (&gt;10 triệu ha)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      • Cung cấp nước ngọt tưới tiêu cho các cánh đồng lúa trù phú nhất Đông Nam Á, trong đó ĐBSCL sản xuất &gt;50% sản lượng lúa và đóng góp 90% lượng gạo xuất khẩu của Việt Nam.
                      <br />• Các dự án chuyển nước quy mô lớn của các nước trong lưu vực (Thái Lan với dự án Khong - Loei - Chi - Mun; Campuchia với dự án kênh đào Phù Nam Techo).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 hover:bg-amber-50/40 transition-colors rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-amber-900">
                      <Fish className="w-4 h-4 text-amber-600" />
                      <span>3. Ngư nghiệp & Nuôi trồng thủy sản</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      • Ngư trường nước ngọt nội địa phong phú nhất hành tinh: sản lượng khai thác tự nhiên đạt hơn <strong>2,6 triệu tấn/năm</strong> (trị giá &gt;11 tỉ USD).
                      <br />• Cung cấp đến <strong>80% lượng protein động vật</strong> cho người dân Campuchia và ĐBSCL; là cái nôi nuôi cá tra, cá basa, tôm nước lợ hàng đầu thế giới.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 hover:bg-indigo-50/40 transition-colors rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-indigo-900">
                      <Compass className="w-4 h-4 text-indigo-600" />
                      <span>4. Giao thông thủy, Đô thị & Du lịch</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      • Trục huyết mạch vận tải thủy xuyên biên giới kết nối cảng Cảnh Hồng (Vân Nam) qua Lào, Thái Lan đến Phnôm Pênh và các cảng biển sâu Việt Nam.
                      <br />• Cung cấp nước sinh hoạt - công nghiệp cho các đô thị lớn (Viêng Chăn, Phnôm Pênh, Cần Thơ, Mỹ Tho) và phát triển du lịch sinh thái chợ nổi Nam Bộ.
                    </p>
                  </div>
                </div>
              </div>

              {/* PHẦN 2: PHÂN TÍCH NHỮNG VẤN ĐỀ (HỆ LỤY) NẢY SINH */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center">2</span>
                  <h3 className="text-base font-bold text-slate-900">
                    Phân Tích Những Vấn Đề (Hệ Lụy & Thách Thức) Nảy Sinh
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Việc khai thác ồ ạt, thiếu quy hoạch liên quốc gia đã và đang gây ra 6 hệ lụy môi trường - địa kinh tế đặc biệt nghiêm trọng:
                </p>

                <div className="space-y-3 text-xs">
                  {/* Problem 1 */}
                  <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-900 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>1. Thay đổi chế độ dòng chảy & Mất nhịp lũ sinh thái</span>
                      </span>
                      <span className="text-[10px] bg-rose-200/80 text-rose-900 font-bold px-2 py-0.5 rounded-full">Trọng yếu</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Các hồ thủy điện thượng nguồn tích nước vào mùa mưa để xả phát điện mùa khô đã làm <strong>san phẳng đỉnh lũ tự nhiên</strong>. Lũ về ĐBSCL ngày càng muộn và thấp hơn trung bình nhiều năm; làm suy yếu hiện tượng dòng chảy ngược vào Biển Hồ Tonle Sap, gây mất nhịp xung lũ sinh thái cần thiết để thau chua rửa mặn.
                    </p>
                  </div>

                  {/* Problem 2 */}
                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900 flex items-center gap-2">
                        <Waves className="w-4 h-4 text-amber-600" />
                        <span>2. Suy giảm nghiêm trọng lượng phù sa bồi đắp ("Đói phù sa")</span>
                      </span>
                      <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded-full">Mất 50-74%</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Lượng bùn cát phù sa màu mỡ từ mức <strong>160 triệu tấn/năm</strong> trước đây đã sụt giảm xuống dưới <strong>47 triệu tấn/năm</strong> (bị giữ lại trong lòng hồ các đập thủy điện). Đất đai vùng châu thổ mất đi nguồn phân bón tự nhiên, người nông dân buộc phải tăng chi phí phân bón hóa học, làm thoái hóa đất.
                    </p>
                  </div>

                  {/* Problem 3 */}
                  <div className="p-4 bg-red-50/80 rounded-2xl border border-red-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-900 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-red-600" />
                        <span>3. Xâm nhập mặn sâu và kéo dài tại ĐBSCL</span>
                      </span>
                      <span className="text-[10px] bg-red-200/80 text-red-900 font-bold px-2 py-0.5 rounded-full">Sâu 50 - 90 km</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Vào mùa khô, dòng chảy từ thượng nguồn suy kiệt kết hợp với triều cường Biển Đông và Vịnh Thái Lan đẩy ranh mặn 4‰ lấn sâu 50 - 90 km vào đất liền (các đợt hạn mặn lịch sử 2016, 2020), làm hàng trăm ngàn héc-ta lúa vụ đông xuân bị thiệt hại và hàng triệu hộ dân thiếu nước sinh hoạt ngọt.
                    </p>
                  </div>

                  {/* Problem 4 */}
                  <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-900 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-orange-600" />
                        <span>4. Sạt lở bờ sông, bờ biển & Sụt lún nền đất đồng bằng</span>
                      </span>
                      <span className="text-[10px] bg-orange-200/80 text-orange-900 font-bold px-2 py-0.5 rounded-full">Lún 1-3 cm/năm</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Dòng nước thiếu phù sa trở thành "nước đói" (hungry water), có động năng cao bào mòn đáy sông và chân bờ; kết hợp khai thác cát lòng sông quá mức gây ra hàng trăm điểm sạt lở nguy hiểm (An Giang, Đồng Tháp, Cần Thơ, Cà Mau). Đồng thời việc khai thác nước ngầm quá mức làm nền đất ĐBSCL lún với tốc độ 1-3 cm/năm, nhanh hơn tốc độ dâng của nước biển.
                    </p>
                  </div>

                  {/* Problem 5 */}
                  <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-900 flex items-center gap-2">
                        <Fish className="w-4 h-4 text-purple-600" />
                        <span>5. Suy giảm đa dạng sinh học & Cạn kiệt nguồn cá di cư</span>
                      </span>
                      <span className="text-[10px] bg-purple-200/80 text-purple-900 font-bold px-2 py-0.5 rounded-full">Tuyệt chủng loài lớn</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Các con đập bê tông cao hàng chục mét chia cắt tuyến đường di cư sinh sản sinh học của hơn 60% loài cá trắng (cá tra dầu, cá hô, cá vồ cờ). Sự thay đổi chu kỳ nước và môi trường sống làm suy kiệt sản lượng đánh bắt cá tự nhiên của hàng triệu ngư dân hạ lưu.
                    </p>
                  </div>

                  {/* Problem 6 */}
                  <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>6. Ô nhiễm môi trường nước cục bộ và suy giảm chất lượng nước</span>
                      </span>
                      <span className="text-[10px] bg-teal-200/80 text-teal-900 font-bold px-2 py-0.5 rounded-full">Dư lượng hóa chất</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      Lạm dụng phân bón hóa học và thuốc trừ sâu trong thâm canh nông nghiệp, nước thải từ ao nuôi tôm - cá công nghiệp không qua xử lý và rác thải sinh hoạt từ các đô thị dọc sông đổ thẳng ra hệ thống kênh rạch làm phú dưỡng hóa nguồn nước và ô nhiễm hữu cơ.
                    </p>
                  </div>
                </div>
              </div>

              {/* PHẦN 3: BIỆN PHÁP KHAI THÁC HỢP LÝ VÀ BẢO VỆ MÔI TRƯỜNG NƯỚC */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">3</span>
                  <h3 className="text-base font-bold text-slate-900">
                    Biện Pháp Khai Thác Hợp Lý & Bảo Vệ Môi Trường Nước Sông Mê Công
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Để đảm bảo an ninh nguồn nước và phát triển bền vững lưu vực, cần thực hiện đồng bộ 3 nhóm giải pháp then chốt:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Solution 1 */}
                  <div className="p-4 bg-gradient-to-b from-sky-50 to-white rounded-2xl border border-sky-200 space-y-2">
                    <div className="font-bold text-sky-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-sky-600" />
                      <span>Hợp tác Quốc tế & MRC</span>
                    </div>
                    <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                      <li>Tuân thủ nghiêm ngặt <strong>Hiệp định Mê Kông 1995</strong> và quy trình tham vấn trước <strong>PNPCA</strong> đối với các dự án thủy điện/chuyển nước dòng chính.</li>
                      <li>Thúc đẩy cơ chế hợp tác chia sẻ dữ liệu thủy văn thời gian thực quanh năm với Trung Quốc và Myanmar.</li>
                      <li>Đẩy mạnh ngoại giao nguồn nước đa phương, hài hòa lợi ích giữa các nước thượng lưu và hạ lưu.</li>
                    </ul>
                  </div>

                  {/* Solution 2 */}
                  <div className="p-4 bg-gradient-to-b from-amber-50 to-white rounded-2xl border border-amber-200 space-y-2">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>Giải pháp Công trình</span>
                    </div>
                    <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                      <li>Vận hành tối ưu hệ thống cống thủy lợi kiểm soát mặn - ngọt hiện đại (Cái Lớn - Cái Bé, Ba Lai, cống âu Ninh Quới).</li>
                      <li>Xây dựng mạng lưới hồ trữ nước ngọt nhân tạo và tôn cao bờ bao ngăn mặn cho các vùng chuyên canh cây ăn trái đặc sản.</li>
                      <li>Yêu cầu các đập thủy điện cải tạo <strong>đường đi cho cá (fish passage)</strong> và cửa xả đáy để giải phóng phù sa cát đáy.</li>
                    </ul>
                  </div>

                  {/* Solution 3 */}
                  <div className="p-4 bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-200 space-y-2">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Giải pháp "Thuận Thiên" (NQ 120)</span>
                    </div>
                    <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                      <li>Chuyển đổi từ tư duy "chống thiên tai" sang <strong>chủ động thích ứng</strong>: coi nước lợ, nước mặn là tài nguyên kinh tế.</li>
                      <li>Tái cơ cấu nông nghiệp theo thứ tự: <strong>Thủy sản ➔ Trái cây ➔ Lúa gạo</strong>; nhân rộng mô hình tôm - lúa luân canh hữu cơ.</li>
                      <li>Hạn chế triệt để việc khai thác nước ngầm quá mức; nghiêm cấm khai thác cát lậu lòng sông để chống sụt lún sạt lở.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Banner to ask Kien Sang */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block">
                    Ôn luyện trực tiếp với Trợ lý AI
                  </span>
                  <p className="text-xs font-black">
                    Bạn muốn luyện trả lời câu hỏi thi: "Phân tích một số vấn đề trong khai thác, sử dụng nguồn nước"?
                  </p>
                </div>
                <div className="text-[11px] bg-white text-slate-900 font-extrabold px-4 py-2 rounded-xl shadow-xs whitespace-nowrap">
                  Bật Chatbot Kiến Sáng 🎙️
                </div>
              </div>
            </div>
          )}

          {/* Bottom Interactive Study Flashcards Carousel */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Thẻ Ghi Nhớ Nhanh (Flashcards Ôn Thi Địa Lí 11)</span>
                </h3>
                <p className="text-xs text-slate-500">Nhấp vào thẻ để lật xem giải thích chi tiết</p>
              </div>
              <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {STUDY_FLASHCARDS.length} Thẻ Cốt Lõi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STUDY_FLASHCARDS.map(fc => {
                const isFlipped = flippedCardId === fc.id;
                return (
                  <div
                    key={fc.id}
                    id={`flashcard-${fc.id}`}
                    onClick={() => {
                      setFlippedCardId(isFlipped ? null : fc.id);
                      soundFx.playCardFlip();
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer min-h-[140px] flex flex-col justify-between ${
                      isFlipped
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-700 border-2 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-50 border border-slate-200 hover:border-emerald-400 text-slate-800 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isFlipped ? 'bg-white/20 text-white border border-white/30' : 'bg-white text-teal-800 border border-teal-200'
                        }`}>
                          {fc.tag}
                        </span>
                        <span className={`text-[10px] ${isFlipped ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {isFlipped ? 'Mặt sau (Chi tiết)' : 'Nhấp để lật'}
                        </span>
                      </div>
                      <h4 className={`text-xs font-bold mb-1 ${isFlipped ? 'text-white' : 'text-slate-900'}`}>
                        {fc.term}
                      </h4>
                      <p className={`text-[11px] leading-relaxed ${isFlipped ? 'text-emerald-50' : 'text-slate-600'}`}>
                        {isFlipped ? fc.detail : fc.brief}
                      </p>
                    </div>
                    <div className={`pt-2 flex items-center justify-end text-[10px] font-bold ${isFlipped ? 'text-amber-200' : 'text-emerald-600'}`}>
                      <span>{isFlipped ? 'Thu gọn ↺' : 'Xem mở rộng →'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
