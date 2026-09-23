import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  FileText, 
  BookCheck, 
  Award, 
  QrCode, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Share2, 
  Lightbulb, 
  Calendar, 
  School, 
  Cpu, 
  Globe2,
  ChevronRight,
  HelpCircle,
  Waves
} from 'lucide-react';
import { Language } from '../types';
import { soundFx } from '../utils/audio';
import { translations } from '../utils/translations';
import { normalizeVietnamesePhonetics, getBestVietnameseFemaleVoice, FEMALE_VOICE_CONFIG } from '../utils/vietnameseSpeech';
import kienSangAvatar from '../assets/images/kien_sang_mascot_1789090892621.jpg';

interface StudentSchoolDossierProps {
  language: Language;
  onOpenChatbotWithTopic: (topic: string) => void;
  initialSection?: 'all' | 'student' | 'research' | 'curriculum';
}

export const StudentSchoolDossier: React.FC<StudentSchoolDossierProps> = ({
  language,
  onOpenChatbotWithTopic,
  initialSection = 'all'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'student' | 'research' | 'curriculum'>(initialSection);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const t = translations[language];
  const isEn = language === 'en';

  const citationText = `Phan Anh Thơ (2026). Đề tài nghiên cứu: "Nghiên cứu, thiết kế và phát triển nền tảng số hóa tương tác Sông Mê Kông: Vai trò của Ủy hội sông Mê Kông (MRC), an ninh nguồn nước và giải pháp bảo vệ Đồng bằng sông Cửu Long". Học sinh Trường TH, THCS & THPT FPT Hậu Giang (MSHS: FHG30024; Địa chỉ: 61C Ấp 6, xã Vị Thủy, TP. Cần Thơ). Chuyên đề Địa lí 11 - Chương trình GDPT 2018.`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    soundFx.playSuccess();
    setTimeout(() => setCopiedCitation(false), 3000);
  };

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleSpeakOverview = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const rawSpeechText = isEn
      ? `Author dossier and research project: Student Phan Anh Tho, Student ID FHG30024, studying at FPT Primary, Secondary and High School Hau Giang, address at 61C Hamlet 6, Vi Thuy Commune, Can Tho City. Research topic: Interactive Digital Platform for the Mekong River, MRC water security and sustainable protection for the Mekong Delta, based on Grade 11 Geography Curriculum.`
      : `Hồ sơ nghiên cứu và tác giả học sinh: Tác giả Phan Anh Thơ, Mã số học sinh FHG30024, học sinh Lớp 11 Trường Tiểu học, THCS và THPT FPT Hậu Giang, địa chỉ tại 61C Ấp 6, xã Vị Thủy, Thành phố Cần Thơ. Đề tài nghiên cứu: Nền tảng số hóa tương tác Sông Mê Kông, an ninh nguồn nước Ủy hội sông Mê Công MRC và giải pháp bảo vệ Đồng bằng sông Cửu Long, bám sát Chương trình GDPT 2018 Chuyên đề Địa lí 11.`;

    const normalizedSpeechText = normalizeVietnamesePhonetics(rawSpeechText, isEn);

    const utterance = new SpeechSynthesisUtterance(normalizedSpeechText);
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
    <div id="student-school-dossier-page" className="space-y-6 animate-fadeIn pb-8">
      {/* Top Main Hero Header */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-white/30">
        {/* Decorative Water Glow Background */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-56 h-56 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-black uppercase tracking-wider shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-amber-200" />
              <span>{isEn ? 'Section B • Student, School & Research Dossier' : 'Mục B • Tên và MSHS, Địa chỉ trường, Tên trường'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakOverview}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  isSpeaking ? 'bg-amber-400 text-amber-950 font-black animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                }`}
                title={isEn ? 'Listen to overview' : 'Nghe đọc tóm tắt hồ sơ tác giả'}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Stop Voice' : 'Dừng đọc'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Read Overview' : 'Nghe tóm tắt 🔊'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyCitation}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                title={isEn ? 'Copy Academic Citation' : 'Sao chép trích dẫn khoa học'}
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? (isEn ? 'Copied!' : 'Đã sao chép!') : (isEn ? 'Copy Citation' : 'Sao chép trích dẫn')}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-white text-orange-950 hover:bg-amber-50 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                title={isEn ? 'Print / Export Dossier' : 'In / Xuất hồ sơ nghiên cứu'}
              >
                <Printer className="w-3.5 h-3.5 text-orange-600" />
                <span className="hidden sm:inline">{isEn ? 'Print Dossier' : 'In Hồ Sơ'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
              {isEn 
                ? 'B. Student Profile, School & Research Framework' 
                : 'B. Tên & Mã Số Học Sinh, Địa Chỉ Trường, Tên Trường'}
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
              {isEn
                ? 'Official research documentation integrating the 3 core pillars: Student & School Information • Scientific Research Project • National Accredited Curriculum Framework (Grade 11 Geography).'
                : 'Hồ sơ khoa học chính thức tích hợp 3 thành tố cốt lõi: 1. Thông tin Học sinh & Trường học • 2. Đề tài Nghiên cứu Khoa học Số • 3. Khung Kiến thức Chuẩn Quốc Gia (Chuyên đề 2 Địa lí 11 GDPT 2018).'}
            </p>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-2.5 border border-white/20">
              <span className="text-[10px] text-amber-200 uppercase font-bold block">{isEn ? 'Student Full Name' : 'Họ & Tên Học Sinh'}</span>
              <span className="text-xs sm:text-sm font-black text-white truncate block">Phan Anh Thơ</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-2.5 border border-white/20">
              <span className="text-[10px] text-amber-200 uppercase font-bold block">{isEn ? 'Student ID' : 'Mã Số Học Sinh (MSHS)'}</span>
              <span className="text-xs sm:text-sm font-black text-white font-mono tracking-wider block">FHG30024</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-2.5 border border-white/20">
              <span className="text-[10px] text-amber-200 uppercase font-bold block">{isEn ? 'Institution' : 'Trường Học'}</span>
              <span className="text-xs sm:text-sm font-black text-white truncate block">FPT Hậu Giang</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-2.5 border border-white/20">
              <span className="text-[10px] text-amber-200 uppercase font-bold block">{isEn ? 'Curriculum' : 'Khung Chương Trình'}</span>
              <span className="text-xs sm:text-sm font-black text-white truncate block">Địa Lí 11 (GDPT 2018)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Selector (All, 1. Student & School, 2. Research Project, 3. Curriculum Framework) */}
      <div className="bg-white rounded-2xl p-2 border border-orange-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: isEn ? 'All 3 Core Parts' : 'Toàn Bộ 3 Phần Cốt Lõi', icon: Layers },
            { id: 'student', label: isEn ? '1. Student & School Info' : '1. Thông Tin Học Sinh & Trường', icon: User },
            { id: 'research', label: isEn ? '2. Research Project' : '2. Đề Tài Nghiên Cứu', icon: FileText },
            { id: 'curriculum', label: isEn ? '3. Accredited Framework' : '3. Khung Kiến Thức Chuẩn', icon: BookCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  soundFx.playClick();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-orange-50 hover:text-orange-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onOpenChatbotWithTopic('Hồ sơ học sinh Phan Anh Thơ, MSHS FHG30024, Trường TH THCS THPT FPT Hậu Giang và đề tài nghiên cứu Chuyên đề 2 Địa lí 11')}
          className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs flex items-center gap-1.5 cursor-pointer border border-amber-300 transition-all ml-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>{isEn ? 'Ask Mascot Kien Sang' : 'Hỏi Kiến Sáng Về Đề Tài'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PHẦN 1: THÔNG TIN HỌC SINH & NHÀ TRƯỜNG */}
      {/* ========================================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'student') && (
        <section id="section-1-student-school" className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-orange-200">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black shadow-xs">
              1
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {isEn ? 'Part 1: Student & School Information' : 'Phần 1: Thông Tin Học Sinh & Nhà Trường'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEn ? 'Official student registry, identification badge and educational institution' : 'Hồ sơ học sinh, thẻ định danh số hóa và thông tin tổ chức giáo dục chính quy'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Student ID Card Showcase (Left column 5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white rounded-3xl p-6 shadow-lg border-2 border-white/30 relative overflow-hidden flex flex-col justify-between">
              {/* Card Watermark Patterns */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                {/* Header of Card */}
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shadow-xs">
                      <GraduationCap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-200 block">FPT EDUCATION</span>
                      <span className="text-xs font-black tracking-tight text-white block">THẺ HỌC SINH NGHIÊN CỨU</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-[10px] font-black text-white uppercase tracking-wider">
                    NIÊN KHÓA 2025 - 2026
                  </span>
                </div>

                {/* Profile Avatar and Details */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-white/20 border-2 border-white/40 overflow-hidden shadow-md shrink-0 flex flex-col items-center justify-center p-1 relative">
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-200 rounded-xl flex items-center justify-center text-orange-800 font-black text-2xl shadow-inner">
                      PAT
                    </div>
                    <span className="absolute bottom-1 bg-orange-600/90 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">
                      HỌC SINH
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div>
                      <span className="text-[10px] text-amber-200 font-bold uppercase block tracking-wider">Họ và tên học sinh:</span>
                      <h3 className="text-lg sm:text-xl font-black text-white truncate tracking-tight">Phan Anh Thơ</h3>
                    </div>

                    <div>
                      <span className="text-[10px] text-amber-200 font-bold uppercase block tracking-wider">Mã số học sinh (MSHS):</span>
                      <div className="inline-block px-2 py-0.5 rounded-md bg-black/25 font-mono text-sm sm:text-base font-black text-amber-300 border border-white/20">
                        FHG30024
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                      <div>
                        <span className="text-amber-200 block text-[9px] uppercase font-bold">Khối lớp:</span>
                        <span className="font-bold text-white">Lớp 11 (THPT)</span>
                      </div>
                      <div>
                        <span className="text-amber-200 block text-[9px] uppercase font-bold">Chuyên đề:</span>
                        <span className="font-bold text-white">Địa lí 11</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Institution on Card */}
                <div className="bg-black/20 rounded-2xl p-3 border border-white/15 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-200 font-bold text-[10px] uppercase">
                    <School className="w-3.5 h-3.5 text-amber-300" />
                    <span>Cơ sở đào tạo:</span>
                  </div>
                  <p className="font-extrabold text-white text-xs leading-snug">
                    Trường Tiểu học, THCS và THPT FPT Hậu Giang
                  </p>
                  <p className="text-[11px] text-orange-100 flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-amber-300 shrink-0 mt-0.5" />
                    <span>61C Ấp 6, xã Vị Thủy, Thành phố Cần Thơ</span>
                  </p>
                </div>
              </div>

              {/* Bottom Card Barcode & Verification */}
              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[10px] text-orange-100">
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-white" />
                  <span className="font-mono tracking-widest text-[9px]">FHG-30024-VERIFIED</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Xác thực chính chủ</span>
                </div>
              </div>
            </div>

            {/* Detailed Institution & Author Message (Right column 7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Institution Card */}
              <div className="bg-white rounded-3xl p-6 border border-orange-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-black text-base shadow-2xs border border-orange-200 shrink-0">
                      FPT
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">Đơn Vị Trường Học Đào Tạo</span>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        Trường Tiểu học, THCS và THPT FPT Hậu Giang
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-black text-[10px] border border-emerald-200 shrink-0">
                    FPT Schools
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-orange-50/60 border border-orange-100 space-y-1">
                    <span className="text-slate-500 font-bold block text-[10px] uppercase">Địa chỉ chính thức:</span>
                    <p className="font-extrabold text-slate-800 text-xs flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <span>61C Ấp 6, xã Vị Thủy, Thành phố Cần Thơ</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                    <span className="text-slate-500 font-bold block text-[10px] uppercase">Tôn chỉ giáo dục:</span>
                    <p className="font-extrabold text-emerald-900 text-xs flex items-start gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>"Trải nghiệm để trưởng thành" • Đổi mới sáng tạo & Chuyển đổi số</span>
                    </p>
                  </div>
                </div>

                {/* Author's Statement / Lời ngỏ học sinh */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-black text-slate-900 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Lời ngỏ của tác giả học sinh (Phan Anh Thơ - MSHS: FHG30024):</span>
                  </div>
                  <p className="italic text-slate-600">
                    "Là một học sinh được học tập tại Đồng bằng sông Cửu Long dưới mái trường FPT Hậu Giang, em thấu hiểu sâu sắc dòng Mê Kông không chỉ là một con sông trên bản đồ, mà là mạch sống, nguồn sinh kế và văn hóa của hàng triệu bà con quê mình. Em phát triển nền tảng tương tác này với mong muốn ứng dụng công nghệ số và giáo dục STEM để giúp các bạn học sinh cả nước tiếp cận Chuyên đề Địa lí 11 một cách trực quan, hào hứng và nhận thức rõ trách nhiệm bảo vệ dòng sông chung của khu vực."
                  </p>
                </div>

                {/* Advisory Information */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-medium">
                    Hướng dẫn chuyên môn: <strong>Tổ Địa lí - Xã hội • Trường TH, THCS & THPT FPT Hậu Giang</strong>
                  </span>
                  <span className="font-semibold text-orange-700">
                    Niên khóa: 2025 - 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PHẦN 2: ĐỀ TÀI NGHIÊN CỨU */}
      {/* ========================================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'research') && (
        <section id="section-2-research-project" className="space-y-4 pt-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-200">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-xs">
              2
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {isEn ? 'Part 2: Scientific Research Project' : 'Phần 2: Đề Tài Nghiên Cứu Khoa Học'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEn ? 'Research background, core objectives, scientific methodology, and educational contributions' : 'Bối cảnh nghiên cứu, 3 mục tiêu cốt lõi, phương pháp luận khoa học và giá trị đóng góp thực tiễn'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-sm space-y-6">
            {/* Project Official Title Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-2 border-emerald-300/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Tên Đề Tài Nghiên Cứu Chính Thức (Official Research Topic):</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 leading-snug">
                "Nghiên cứu, thiết kế và phát triển nền tảng số hóa tương tác Sông Mê Kông: Vai trò của Ủy hội sông Mê Kông (MRC), an ninh nguồn nước và giải pháp bảo vệ Đồng bằng sông Cửu Long"
              </h3>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-200">
                  Lĩnh vực: Giáo dục số & Khoa học Địa lí 11
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 font-bold border border-orange-200">
                  Mô hình: Nền tảng Web Tương tác Đa phương tiện
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-bold border border-teal-200">
                  STEM / GIS / AI Giáo Dục
                </span>
              </div>
            </div>

            {/* 3 Core Pillars of Research */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>3 Mục Tiêu Nghiên Cứu Trọng Tâm:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Goal 1 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    M1
                  </div>
                  <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    Trực quan hóa 4 763 km & Thủy điện thượng nguồn
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Mô hình hóa toàn bộ hành trình dòng sông qua 6 quốc gia (Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia, Việt Nam), hệ thống 11+ bậc thang thủy điện Lan Thương và cơ chế dòng chảy ngược Biển Hồ Tonle Sap.
                  </p>
                </div>

                {/* Goal 2 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    M2
                  </div>
                  <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    Làm rõ 4 vai trò MRC & 6 đóng góp của Việt Nam
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Hệ thống hóa Hiệp định Mê Kông 1995, 5 quy chế kỹ thuật (PNPCA, PWUM, PMFM...) và 6 hành động trách nhiệm của Việt Nam trong quản lý tổng hợp tài nguyên nước quốc tế.
                  </p>
                </div>

                {/* Goal 3 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    M3
                  </div>
                  <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    Giả lập an ninh nước & Triết lý "Thuận thiên"
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Xây dựng phòng thí nghiệm giả lập hạn mặn mùa kiệt tại ĐBSCL, truyền tải giải pháp công trình và phi công trình bám sát Nghị quyết 120/NQ-CP của Chính phủ.
                  </p>
                </div>
              </div>
            </div>

            {/* Technological Stack & Scientific Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-black text-orange-950">
                  <Cpu className="w-4 h-4 text-orange-600" />
                  <span>Ứng Dụng Công Nghệ Hiện Đại:</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Trợ lý ảo Kiến Sáng (AI Mascot):</strong> Đàm thoại giọng nói 2 chiều (Speech-to-Text & Text-to-Speech) chuẩn âm thuật ngữ Địa lí tiếng Việt.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Bản đồ số tương tác (GIS):</strong> Khám phá tọa độ 6 quốc gia, thủy điện, 9 cửa sông Cửu Long và hệ thống sinh thái.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Gamification học tập:</strong> Câu đố tương tác, nhiệm vụ cứu hộ an ninh nước, tính điểm trải nghiệm.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-black text-emerald-950">
                  <Globe2 className="w-4 h-4 text-emerald-600" />
                  <span>Ý Nghĩa & Đóng Góp Thực Tiễn:</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Hỗ trợ giảng dạy:</strong> Giúp giáo viên có học liệu số trực quan sinh động thay thế bản đồ giấy tĩnh truyền thống.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Phát triển năng lực học sinh:</strong> Rèn luyện năng lực nhận thức không gian địa lí, tư duy phản biện và trách nhiệm công dân toàn cầu.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Lan tỏa thông điệp ĐBSCL:</strong> Nâng cao ý thức tiết kiệm nước, bảo vệ phù sa và thích ứng biến đổi khí hậu bền vững.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PHẦN 3: KHUNG KIẾN THỨC CHUẨN */}
      {/* ========================================================================= */}
      {(activeSubTab === 'all' || activeSubTab === 'curriculum') && (
        <section id="section-3-curriculum-framework" className="space-y-4 pt-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-teal-200">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black shadow-xs">
              3
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {isEn ? 'Part 3: Accredited Curriculum Framework' : 'Phần 3: Khung Kiến Thức Chuẩn Quốc Gia'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEn ? 'Alignment with 2018 General Education Program, Grade 11 Geography Topic 2 and official legal treaties' : 'Đối chiếu Chuẩn yêu cầu cần đạt Chương trình GDPT 2018, Chuyên đề 2 Địa lí 11 và các căn cứ pháp lý quốc tế'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-teal-200 shadow-sm space-y-6">
            {/* Legal & Educational Foundations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-teal-800 font-extrabold text-[11px]">
                  <BookCheck className="w-4 h-4 text-teal-600" />
                  <span>Chương trình GDPT 2018</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-snug">
                  Thông tư 32/2018/TT-BGDĐT. Chuyên đề học tập Địa lí 11 - Chuyên đề 2: <strong>Một số vấn đề về lưu vực sông Mê Kông</strong> (SGK Cánh Diều, Kết nối tri thức, Chân trời sáng tạo).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-orange-800 font-extrabold text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Hiệp Định Mê Kông 1995</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-snug">
                  Hiệp định Hợp tác Phát triển Bền vững Lưu vực sông Mê Kông ký kết ngày 05/04/1995 tại Chiang Rai giữa 4 quốc gia hạ lưu (Việt Nam, Lào, Thái Lan, Campuchia) và 5 Thủ tục kỹ thuật.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-[11px]">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Nghị Quyết 120/NQ-CP</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-snug">
                  Nghị quyết của Chính phủ Việt Nam ngày 17/11/2017 về phát triển bền vững Đồng bằng sông Cửu Long thích ứng với biến đổi khí hậu theo triết lý sinh thái "Thuận thiên".
                </p>
              </div>
            </div>

            {/* Matrix of Accredited Learning Objectives (YCCĐ) */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Bảng Ma Trận Yêu Cầu Cần Đạt (YCCĐ) Chuyên Đề Địa Lí 11:</span>
              </h4>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white font-black text-[11px]">
                      <th className="py-3 px-4 border-r border-teal-600">Cấp Độ Nhận Thức</th>
                      <th className="py-3 px-4 border-r border-teal-600">Yêu Cầu Cần Đạt (YCCĐ) SGK</th>
                      <th className="py-3 px-4">Tính Năng Tương Ứng Trên Website</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 font-bold text-teal-900 border-r border-slate-200 bg-teal-50/40">
                        1. Nhận biết
                      </td>
                      <td className="py-2.5 px-4 border-r border-slate-200">
                        Xác định được vị trí địa lí, chiều dài 4 763 km, diện tích lưu vực 795 000 km² và 6 quốc gia ven sông.
                      </td>
                      <td className="py-2.5 px-4 font-medium text-emerald-800">
                        Bản đồ dòng chảy 4 763 km, hồ sơ 6 quốc gia, 9 cửa sông Cửu Long.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 font-bold text-teal-900 border-r border-slate-200 bg-teal-50/40">
                        2. Thông hiểu
                      </td>
                      <td className="py-2.5 px-4 border-r border-slate-200">
                        Phân tích được 4 vai trò của MRC, cơ chế điều tiết nước của Biển Hồ Tonle Sap và tác động của chuỗi thủy điện thượng nguồn.
                      </td>
                      <td className="py-2.5 px-4 font-medium text-emerald-800">
                        Chuyên đề Địa lí 11 & MRC, sơ đồ dòng chảy ngược Tonle Sap, infographic 11 đập thủy điện.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 font-bold text-teal-900 border-r border-slate-200 bg-teal-50/40">
                        3. Vận dụng
                      </td>
                      <td className="py-2.5 px-4 border-r border-slate-200">
                        Đánh giá được 6 đóng góp trách nhiệm của Việt Nam trong MRC và nguy cơ xâm nhập mặn mùa kiệt tại ĐBSCL.
                      </td>
                      <td className="py-2.5 px-4 font-medium text-emerald-800">
                        Tab Liên hệ Việt Nam & ĐBSCL, trắc nghiệm tương tác kiểm tra năng lực.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 font-bold text-teal-900 border-r border-slate-200 bg-teal-50/40">
                        4. Vận dụng cao
                      </td>
                      <td className="py-2.5 px-4 border-r border-slate-200">
                        Đề xuất các giải pháp thích ứng biến đổi khí hậu theo tinh thần Nghị quyết 120/NQ-CP ("Thuận thiên").
                      </td>
                      <td className="py-2.5 px-4 font-medium text-emerald-800">
                        Phòng mô phỏng an ninh nước và hạn mặn, Trợ lý ảo Kiến Sáng giải đáp câu hỏi mở.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Summary Bar */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-emerald-50 rounded-2xl p-4 border border-orange-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-slate-800">
            Hồ sơ học sinh Phan Anh Thơ (FHG30024) - Trường TH, THCS & THPT FPT Hậu Giang
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCitation}
            className="px-3 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs cursor-pointer transition-all"
          >
            {copiedCitation ? '✓ Đã sao chép trích dẫn' : 'Sao chép trích dẫn'}
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs cursor-pointer transition-all"
          >
            In hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
};
