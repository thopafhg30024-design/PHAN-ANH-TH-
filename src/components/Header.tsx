import React from 'react';
import { Waves, BookOpen, MapPin, Gamepad2, Sliders, Sparkles, Volume2, VolumeX, Award, Camera, GraduationCap, Compass, User, Globe, Video } from 'lucide-react';
import { EducationLevel, Language } from '../types';
import { soundFx } from '../utils/audio';
import { translations } from '../utils/translations';
import kienSangAvatar from '../assets/images/kien_sang_mascot_1789090892621.jpg';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLevel: EducationLevel;
  setSelectedLevel: (level: EducationLevel) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  userScore: number;
  openPromptModal: () => void;
  openChatbot: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedLevel,
  setSelectedLevel,
  language,
  setLanguage,
  isMuted,
  setIsMuted,
  userScore,
  openPromptModal,
  openChatbot
}) => {
  const t = translations[language];

  const toggleAudio = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
    if (!next) {
      soundFx.playWaterSplash();
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'vi' ? 'en' : 'vi';
    setLanguage(nextLang);
    soundFx.playClick();
  };

  const navItems = [
    { id: 'overview', label: t.nav_overview, icon: Globe, highlight: true },
    { id: 'knowledge', label: t.nav_knowledge, icon: BookOpen, highlight: true },
    { id: 'tourism', label: t.nav_tourism, icon: Camera },
    { id: 'mrc', label: t.nav_mrc, icon: BookOpen },
    { id: 'vietnam', label: t.nav_vietnam, icon: Waves },
    { id: 'games', label: t.nav_games, icon: Gamepad2 },
    { id: 'simulator', label: t.nav_simulator, icon: Waves },
    { id: 'dossier', label: t.nav_dossier, icon: GraduationCap, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100/80 text-slate-800 shadow-xs">
      {/* Top micro bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-600 flex items-center justify-center shadow-md shadow-orange-500/25 shrink-0">
            <Waves className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black tracking-tight text-slate-900 text-lg sm:text-xl">
                {t.appTitle}
              </span>
              <button
                onClick={() => {
                  setActiveTab('dossier');
                  soundFx.playClick();
                }}
                className="px-2 py-0.5 text-[11px] font-bold bg-orange-50 hover:bg-orange-100 text-orange-900 rounded-full border border-orange-200 flex items-center gap-1 shadow-xs cursor-pointer transition-all hover:scale-105"
                title="Xem Mục B: Thông tin Trường TH, THCS & THPT FPT Hậu Giang"
              >
                <GraduationCap className="w-3 h-3 text-orange-600" />
                <span>{t.schoolName}</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('dossier');
                  soundFx.playClick();
                }}
                className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-full border border-emerald-200 flex items-center gap-1 shadow-xs cursor-pointer transition-all hover:scale-105"
                title="Xem Mục B: Thông tin Học sinh Phan Anh Thơ (MSHS: FHG30024)"
              >
                <User className="w-3 h-3 text-emerald-600" />
                <span>{t.studentName}</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <MapPin className="w-3 h-3 text-emerald-600" />
                {t.schoolAddressShort}
              </span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="hidden md:inline text-[11px] text-slate-500">Chuyên đề Địa lí 11 & Giáo dục tương tác</span>
            </div>
          </div>
        </div>

        {/* Level picker & utilities */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Language Switcher Button */}
          <button
            id="toggle-language-btn"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-orange-50 to-emerald-50 hover:from-orange-100 hover:to-emerald-100 text-slate-800 border border-orange-200 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-extrabold">{t.switchLang}</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase hidden sm:inline">({language})</span>
          </button>

          {/* Grade Level Selector */}
          <div className="bg-slate-100/90 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs">
            <span className="text-slate-600 font-semibold px-1.5 hidden md:inline">{t.gradeLabel}</span>
            <button
              id="level-btn-primary"
              onClick={() => {
                setSelectedLevel('primary');
                soundFx.playClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedLevel === 'primary'
                  ? 'bg-orange-500 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-orange-700 hover:bg-white'
              }`}
            >
              {t.primary}
            </button>
            <button
              id="level-btn-secondary"
              onClick={() => {
                setSelectedLevel('secondary');
                soundFx.playClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedLevel === 'secondary'
                  ? 'bg-emerald-500 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white'
              }`}
            >
              {t.secondary}
            </button>
            <button
              id="level-btn-highschool"
              onClick={() => {
                setSelectedLevel('highschool');
                soundFx.playClick();
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedLevel === 'highschool'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white'
              }`}
            >
              {t.highschool}
            </button>
          </div>

          {/* Chatbot Kiến Sáng Button */}
          <button
            id="open-kien-sang-btn"
            onClick={openChatbot}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 text-white font-black text-xs rounded-xl shadow-md shadow-orange-300/40 transition-all cursor-pointer ring-2 ring-orange-200 hover:scale-[1.03]"
            title={language === 'vi' ? 'Trò chuyện & Gọi video FaceTime với Kiến Sáng' : 'Chat & FaceTime Video Call with Kien Sang'}
          >
            <div className="w-6 h-6 rounded-lg bg-white overflow-hidden p-0.5 border border-amber-200 shrink-0">
              <img
                src={kienSangAvatar}
                alt={t.mascotName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-1.5 leading-none text-left">
              <span className="font-extrabold tracking-tight">{t.mascotName}</span>
              <span className="text-[9px] bg-emerald-800/80 text-emerald-100 px-1 py-0.5 rounded font-bold flex items-center gap-0.5 shadow-2xs">
                <Video className="w-2.5 h-2.5" />
                <span>FaceTime</span>
              </span>
            </div>
          </button>

          {/* User Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-900 border border-orange-200 rounded-xl text-xs font-bold shadow-xs">
            <Award className="w-4 h-4 text-orange-600" />
            <span>{userScore} {t.points}</span>
          </div>

          {/* Prompt Studio button */}
          <button
            id="open-prompt-modal-btn"
            onClick={openPromptModal}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 via-green-600 to-orange-500 hover:from-emerald-700 hover:to-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            title="Prompt AI Studio"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.promptStudioBtn}</span>
          </button>

          {/* Audio toggle */}
          <button
            id="toggle-audio-btn"
            onClick={toggleAudio}
            className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 hover:text-orange-900 transition-colors border border-orange-200"
            title={isMuted ? t.soundToggleOff : t.soundToggleOn}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  soundFx.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-orange-500 text-white shadow-md shadow-emerald-600/20 font-bold'
                    : 'text-slate-600 hover:text-orange-700 hover:bg-orange-50/70 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white border border-white/40' : 'bg-orange-100 text-orange-900 border border-orange-300'
                  }`}>
                    {t.importantBadge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
