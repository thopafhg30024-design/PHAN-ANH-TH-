import React, { useState } from 'react';
import { Header } from './components/Header';
import { MekongMap } from './components/MekongMap';
import { MekongGlobeMap } from './components/MekongGlobeMap';
import { KnowledgeBase } from './components/KnowledgeBase';
import { MekongKnowledge } from './components/MekongKnowledge';
import { VietnamMekongDelta } from './components/VietnamMekongDelta';
import { InteractiveGames } from './components/InteractiveGames';
import { WaterSecuritySimulator } from './components/WaterSecuritySimulator';
import { PromptStudioModal } from './components/PromptStudioModal';
import { KienSangChatbot } from './components/KienSangChatbot';
import { WebsiteIntroBanner } from './components/WebsiteIntroBanner';
import { StudentSchoolDossier } from './components/StudentSchoolDossier';
import { EducationLevel, Language } from './types';
import { soundFx } from './utils/audio';
import { translations } from './utils/translations';
import { Waves, Sparkles, BookOpen, Heart, Shield, Globe, MapPin, GraduationCap, User, FileText, BookCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import kienSangAvatar from './assets/images/kien_sang_mascot_1789090892621.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>('highschool');
  const [language, setLanguage] = useState<Language>('vi');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(100); // initial welcoming score
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [chatbotTopic, setChatbotTopic] = useState<string | null>(null);
  const [dossierSection, setDossierSection] = useState<'all' | 'student' | 'research' | 'curriculum'>('all');

  const t = translations[language];

  const handleScoreUpdate = (delta: number) => {
    setUserScore(prev => prev + delta);
  };

  const handleOpenChatbotWithTopic = (topic: string) => {
    setChatbotTopic(topic);
    setIsChatbotOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-emerald-50/25 text-slate-800 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-950">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        language={language}
        setLanguage={setLanguage}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        userScore={userScore}
        openPromptModal={() => setIsPromptModalOpen(true)}
        openChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Project & Website Introduction Banner */}
        <WebsiteIntroBanner
          language={language}
          onExploreMap={() => {
            setActiveTab('overview');
            soundFx.playWaterSplash();
          }}
          onExploreKnowledge={() => {
            setActiveTab('knowledge');
            soundFx.playClick();
          }}
          onOpenChatbot={() => {
            setIsChatbotOpen(true);
            soundFx.playWaterSplash();
          }}
        />

        {(activeTab === 'overview' || activeTab === 'globe') && (
          <MekongMap selectedLevel={selectedLevel} language={language} />
        )}

        {activeTab === 'knowledge' && (
          <MekongKnowledge
            selectedLevel={selectedLevel}
            language={language}
            onOpenChatbotWithTopic={handleOpenChatbotWithTopic}
            onNavigateTab={(tab) => {
              setActiveTab(tab as any);
              soundFx.playClick();
            }}
          />
        )}

        {activeTab === 'mrc' && (
          <KnowledgeBase selectedLevel={selectedLevel} />
        )}

        {activeTab === 'vietnam' && (
          <VietnamMekongDelta />
        )}

        {activeTab === 'games' && (
          <InteractiveGames
            selectedLevel={selectedLevel}
            onScoreUpdate={handleScoreUpdate}
            userScore={userScore}
          />
        )}

        {activeTab === 'simulator' && (
          <WaterSecuritySimulator onScoreReward={handleScoreUpdate} />
        )}

        {activeTab === 'dossier' && (
          <StudentSchoolDossier
            language={language}
            onOpenChatbotWithTopic={handleOpenChatbotWithTopic}
            initialSection={dossierSection}
          />
        )}
      </main>

      {/* Floating Mascot Button for Kiến Sáng */}
      {!isChatbotOpen && (
        <button
          id="floating-kien-sang-btn"
          onClick={() => {
            setIsChatbotOpen(true);
            soundFx.playWaterSplash();
          }}
          className="fixed bottom-5 right-5 z-40 group flex items-center gap-2.5 p-2 pr-4 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-white font-black rounded-full shadow-2xl shadow-orange-500/40 border-2 border-white transition-all transform hover:scale-105 cursor-pointer ring-4 ring-orange-200/70"
          title={t.mascotTitle}
        >
          <div className="w-11 h-11 rounded-full bg-white p-0.5 shadow-md overflow-hidden border-2 border-amber-200 shrink-0">
            <img
              src={kienSangAvatar}
              alt={t.mascotName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wide drop-shadow-xs">{t.mascotName}</span>
              <span className="text-[9px] bg-white/30 text-white px-1 py-0.2 rounded font-bold">{t.mascotRole}</span>
              <span className="text-[9px] bg-emerald-700/90 text-white px-1.5 py-0.2 rounded-full font-black flex items-center gap-0.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-ping" />
                FaceTime
              </span>
            </div>
            <span className="text-[10px] text-amber-100 font-semibold block">{t.mascotBubble} • Gọi FaceTime 1-1</span>
          </div>
        </button>
      )}

      {/* Kiến Sáng Interactive Chatbot */}
      <KienSangChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        selectedLevel={selectedLevel}
        language={language}
        onScoreReward={handleScoreUpdate}
        initialTopic={chatbotTopic}
      />

      {/* Footer: Mục B & 3 Phần (Thông tin HS, trường - Đề tài nghiên cứu - Khung kiến thức chuẩn) */}
      <footer id="app-footer" className="bg-white border-t-2 border-orange-200/80 pt-10 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 mt-auto shadow-inner">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Banner of Footer: Mục B Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-orange-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                <Waves className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-950 font-black text-[10px] tracking-wide uppercase border border-orange-300">
                    MỤC B CHÍNH THỨC
                  </span>
                  <span className="text-xs font-bold text-emerald-800">
                    Chân trang 3 phần: Thông tin HS, trường • Đề tài nghiên cứu • Khung kiến thức chuẩn
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
                  B. TÊN VÀ MSHS, ĐỊA CHỈ TRƯỜNG, TÊN TRƯỜNG - HỒ SƠ NGHIÊN CỨU ĐỊA LÍ 11
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setDossierSection('all');
                  setActiveTab('dossier');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  soundFx.playClick();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl transition-all cursor-pointer font-black shadow-sm text-xs"
                title="Mở mục riêng B: Tên, MSHS, Trường học và Hồ sơ nghiên cứu"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Xem Riêng Mục B</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>

              <button
                onClick={() => setIsPromptModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl transition-all cursor-pointer font-bold shadow-xs text-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t.promptStudioModalBtn}</span>
              </button>
            </div>
          </div>

          {/* 3 Phần Cốt Lõi Yêu Cầu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Phần 1: Thông tin Học sinh & Nhà trường */}
            <div id="footer-section-student-school" className="bg-gradient-to-br from-orange-50/70 to-amber-50/40 rounded-2xl p-5 border border-orange-200 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-orange-200/80">
                  <div className="flex items-center gap-2 text-orange-950 font-black text-sm uppercase tracking-wider">
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                    <span>{t.footerSec1Title}</span>
                  </div>
                  <button
                    onClick={() => {
                      setDossierSection('student');
                      setActiveTab('dossier');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      soundFx.playClick();
                    }}
                    className="text-[10px] text-orange-700 hover:text-orange-900 font-bold underline cursor-pointer"
                  >
                    Xem chi tiết ➔
                  </button>
                </div>

                <div className="space-y-2 text-slate-700 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/90 border border-orange-200/70 shadow-2xs">
                    <span className="text-[11px] text-slate-500 block font-medium">{t.footerStudentLabel}</span>
                    <span className="text-sm font-extrabold text-slate-900">{t.footerStudentName}</span>
                  </div>
                  
                  <div className="p-2.5 rounded-xl bg-white/90 border border-orange-200/70 shadow-2xs flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">{t.footerCodeLabel}</span>
                      <span className="text-sm font-black text-orange-700 font-mono tracking-wide">FHG30024</span>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-900 font-bold rounded-lg text-[10px] border border-orange-300">
                      {t.footerStudentBadge}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/90 border border-orange-200/70 shadow-2xs space-y-1">
                    <span className="text-[11px] text-slate-500 block font-medium">{t.footerSchoolLabel}</span>
                    <span className="text-xs font-bold text-slate-900 block leading-snug">
                      {t.schoolName}
                    </span>
                    <div className="pt-1 flex items-start gap-1.5 text-[11px] text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                      <span><strong>{t.footerSchoolAddress}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-orange-200/60 flex items-center justify-between text-[11px] text-orange-900 font-semibold">
                <span>{t.footerGradeNote}</span>
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              </div>
            </div>

            {/* Phần 2: Đề tài Nghiên cứu */}
            <div id="footer-section-research" className="bg-gradient-to-br from-emerald-50/50 to-green-50/30 rounded-2xl p-5 border border-emerald-100 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-900 font-black text-sm uppercase tracking-wider">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span>{t.footerSec2Title}</span>
                  </div>
                  <button
                    onClick={() => {
                      setDossierSection('research');
                      setActiveTab('dossier');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      soundFx.playClick();
                    }}
                    className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                  >
                    Xem chi tiết ➔
                  </button>
                </div>

                <div className="space-y-2.5 text-slate-700 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/95 border border-emerald-100 shadow-2xs space-y-1">
                    <span className="text-[11px] text-emerald-600 font-bold block uppercase tracking-wide">{t.footerTopicLabel}</span>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {t.footerTopicName}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/95 border border-emerald-100 shadow-2xs space-y-1.5">
                    <span className="text-[11px] text-slate-500 font-medium block">{t.footerGoalsLabel}</span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{t.footerGoal1}</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{t.footerGoal2}</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{t.footerGoal3}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                <span>{t.footerModelLabel}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">{t.footerStemBadge}</span>
              </div>
            </div>

            {/* Phần 3: Khung Kiến thức chuẩn */}
            <div id="footer-section-standards" className="bg-gradient-to-br from-emerald-50/30 via-slate-50 to-teal-50/30 rounded-2xl p-5 border border-emerald-100 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
                  <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wider">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <BookCheck className="w-4 h-4" />
                    </div>
                    <span>{t.footerSec3Title}</span>
                  </div>
                  <button
                    onClick={() => {
                      setDossierSection('curriculum');
                      setActiveTab('dossier');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      soundFx.playClick();
                    }}
                    className="text-[10px] text-teal-700 hover:text-teal-900 font-bold underline cursor-pointer"
                  >
                    Xem chi tiết ➔
                  </button>
                </div>

                <div className="space-y-2 text-slate-700 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/95 border border-emerald-100 shadow-2xs space-y-1">
                    <span className="text-[11px] text-emerald-700 font-bold block">{t.footerCurriculumLabel}</span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {t.footerCurriculumDesc}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/95 border border-emerald-100 shadow-2xs space-y-1">
                    <span className="text-[11px] text-emerald-700 font-bold block">{t.footerLegalLabel}</span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{t.footerLegal1}</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{t.footerLegal2}</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{t.footerLegal3}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                <span>{t.footerLevelDistLabel}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">{t.footerNationalStandardBadge}</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Verification info */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              {t.footerCopyright}
            </div>
            <div className="flex items-center gap-3 font-medium">
              <span className="text-emerald-700 font-bold">{t.footerGeographyBadge}</span>
              <span>•</span>
              <span className="text-orange-700 font-bold">{t.footerPaletteBadge}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Prompt Studio Modal */}
      <PromptStudioModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
