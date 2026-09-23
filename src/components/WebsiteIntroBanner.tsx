import React, { useState } from 'react';
import { Sparkles, Waves, MapPin, BookOpen, Volume2, VolumeX, ChevronDown, ChevronUp, Bot, Compass, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { normalizeVietnamesePhonetics, getBestVietnameseFemaleVoice, FEMALE_VOICE_CONFIG } from '../utils/vietnameseSpeech';

interface WebsiteIntroBannerProps {
  onExploreMap: () => void;
  onExploreKnowledge: () => void;
  onOpenChatbot: () => void;
  language: 'vi' | 'en';
}

export const WebsiteIntroBanner: React.FC<WebsiteIntroBannerProps> = ({
  onExploreMap,
  onExploreKnowledge,
  onOpenChatbot,
  language
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const isEn = language === 'en';

  const introTextVi = `Chào mừng bạn đến với Mê Kông Ký Sự & Bản Đồ Số 4.763 KM! Đây là hệ thống học tập số hóa tương tác và nghiên cứu địa lí hiện đại, được biên soạn bám sát chuẩn Chương trình Giáo dục Phổ thông Chuyên đề Địa lí lớp 11 và dữ liệu chính thức từ Ủy hội sông Mê Công quốc tế (MRC). Hệ thống tái hiện hành trình 4.763 km của dòng sông quốc tế Mê Kông từ ngọn nguồn Tây Tạng đến 9 cửa sông Cửu Long đổ ra Biển Đông Việt Nam, tích hợp trợ lý ảo Kiến Sáng tương tác giọng nói hai chiều, bản đồ số trực quan, và phòng giả lập an ninh nguồn nước xuyên biên giới.`;

  const introTextEn = `Welcome to the Mekong River Explorer & Interactive Atlas (4,763 KM)! This modern educational and geographical platform follows the Grade 11 Geography Curriculum standards and official Mekong River Commission (MRC) data. Explore the 4,763 km journey from the Tibetan plateau to the 9 estuaries of the Mekong Delta into the East Sea, featuring bilingual interactive maps, voice-enabled AI Mascot Kien Sang, and water security simulations.`;

  const handleSpeakIntro = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ giọng nói tổng hợp!');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const rawText = isEn ? introTextEn : introTextVi;
    const spokenText = normalizeVietnamesePhonetics(rawText, isEn);

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = isEn ? 'en-US' : 'vi-VN';
    utterance.rate = FEMALE_VOICE_CONFIG.rate;
    utterance.pitch = FEMALE_VOICE_CONFIG.pitch;

    if (!isEn) {
      const allVoices = window.speechSynthesis.getVoices();
      const femaleVoice = getBestVietnameseFemaleVoice(allVoices);
      if (femaleVoice) utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    soundFx.playWaterSplash();
  };

  return (
    <section
      id="website-introduction-banner"
      className="bg-gradient-to-br from-white via-orange-50/40 to-emerald-50/50 rounded-2xl p-5 sm:p-6 border-2 border-orange-200/90 shadow-md relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative background water ripple */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-gradient-to-bl from-orange-300/20 to-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Banner Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100/90 text-orange-900 text-[11px] font-extrabold uppercase tracking-wide">
                <GraduationCap className="w-3 h-3 text-orange-700" />
                <span>{isEn ? 'Official Educational Project' : 'Giới Thiệu Dự Án Giáo Dục Số'}</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {isEn ? 'About Mekong River Explorer & Interactive Atlas' : 'Giới Thiệu Website: Mê Kông Ký Sự & Bản Đồ Số 4.763 KM'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Read aloud intro button */}
            <button
              onClick={handleSpeakIntro}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                isSpeaking
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-white hover:bg-orange-50 text-orange-800 border border-orange-200'
              }`}
              title="Đọc đoạn giới thiệu bằng giọng nói"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Dừng giọng đọc</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>Nghe giọng đọc</span>
                </>
              )}
            </button>

            {/* Collapse / Expand Toggle */}
            <button
              onClick={() => {
                setIsExpanded(!isExpanded);
                soundFx.playClick();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title={isExpanded ? 'Thu gọn phần giới thiệu' : 'Mở rộng xem chi tiết'}
            >
              <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Lead Narrative Text */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {isEn ? introTextEn : introTextVi}
        </p>

        {/* Expanded Educational Dossier */}
        {isExpanded && (
          <div className="pt-2 space-y-3.5 animate-fade-in border-t border-orange-100/70">
            <h4 className="text-xs font-extrabold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              <span>{isEn ? 'Core Highlights & Learning Modules:' : 'Các Phân Hệ Nổi Bật Trên Hệ Thống:'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {/* Feature 1 */}
              <div className="p-3 bg-white/95 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-teal-900">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>1. Bản Đồ Số 4.763 KM & 9 Cửa Sông</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Tương tác 7 trạm khảo sát địa lí, trực quan hóa phạm vi lưu vực 810.000 km², và chuẩn hóa 9 cửa sông Cửu Long (6 cửa Sông Tiền & 3 cửa Sông Hậu) cùng hiện trạng đập Ba Lai và bồi lấp Ba Thắc.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-3 bg-white/95 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>2. Chuyên Đề SGK Địa Lí 11 & MRC</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Đối chiếu khoa học Thượng lưu vực (24% diện tích, 18% nước) vs Hạ lưu vực (76% diện tích, 82% nước), cơ chế "chảy ngược" của Biển Hồ Tonle Sap và số liệu 6 quốc gia MRC 2022.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-3 bg-white/95 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-orange-900">
                  <Bot className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>3. Trợ Lý AI Kiến Sáng Giọng Nói</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Tương tác thoại tự nhiên (Speech-to-Text & Text-to-Speech) thông minh, hỗ trợ học sinh giải đáp thắc mắc bài học Địa lí 11 và khám phá thông tin tức thì bằng giọng nói tiếng Việt.
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-600">
                <span className="text-[11px] bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-300 font-bold">
                  Học sinh THPT FPT Hậu Giang
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded-lg font-mono">
                  Mã số đề tài: FHG30024
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onExploreMap}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bản Đồ & Quả Địa Cầu 3D</span>
                </button>
                <button
                  onClick={onOpenChatbot}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Trò chuyện cùng AI</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
