import React, { useState } from 'react';
import { MRC_TOPICS } from '../data/mekongData';
import { MRCInfoTopic, EducationLevel } from '../types';
import { soundFx } from '../utils/audio';
import { BookOpen, ShieldCheck, FileText, CheckCircle2, ChevronRight, HelpCircle, Layers, Sparkles } from 'lucide-react';

interface KnowledgeBaseProps {
  selectedLevel: EducationLevel;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ selectedLevel }) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(MRC_TOPICS[0].id);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const currentTopic = MRC_TOPICS.find(t => t.id === activeTopicId) || MRC_TOPICS[0];

  const filteredTopics = searchFilter.trim() === ''
    ? MRC_TOPICS
    : MRC_TOPICS.filter(t => 
        t.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
        t.content.some(c => c.toLowerCase().includes(searchFilter.toLowerCase()))
      );

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 rounded-2xl p-5 sm:p-7 text-white border border-emerald-300/30 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold mb-2 backdrop-blur-sm">
              <BookOpen className="w-3.5 h-3.5 text-orange-200" />
              <span>Chương Trình GDPT 2018 - Chuyên Đề Địa Lí 11</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-xs">
              Ủy Hội Sông Mê Công (MRC) & Sử Dụng Hợp Lí Tài Nguyên Nước
            </h1>
            <p className="text-emerald-50 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Hệ thống hóa toàn diện kiến thức chuyên đề: Từ Hiệp định Mê Kông 1995, quy trình PNPCA đến trách nhiệm và quyền lợi của Việt Nam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-white/30">
              <span className="text-xs text-white px-2 font-medium">Tìm kiếm:</span>
              <input
                type="text"
                placeholder="Gõ từ khóa (vai trò MRC, Việt Nam, PNPCA...)"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white/95 text-xs text-slate-800 placeholder-slate-400 border border-white/50 focus:outline-none focus:ring-2 focus:ring-orange-300 w-48 sm:w-60 shadow-xs"
              />
            </div>
            <button
              onClick={() => {
                setActiveTopicId('vietnam-role-and-delta');
                soundFx.playSuccess();
              }}
              className="px-3 py-2 rounded-xl bg-orange-400 hover:bg-orange-300 text-orange-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 shrink-0 cursor-pointer"
              title="Xem ngay mục Vai trò của MRC và sự tham gia của Việt Nam"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-900" />
              <span>⭐ Trọng Tâm: Vai Trò MRC & Việt Nam</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main topic viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Topic navigation list */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Danh Mục Chuyên Đề ({filteredTopics.length})
          </h3>
          {filteredTopics.map((topic) => {
            const isActive = topic.id === currentTopic.id;
            return (
              <div
                key={topic.id}
                id={`topic-nav-${topic.id}`}
                onClick={() => {
                  setActiveTopicId(topic.id);
                  soundFx.playClick();
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-50 to-orange-50/60 border-2 border-emerald-500 shadow-sm text-slate-900 ring-1 ring-emerald-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-orange-50/40 hover:border-orange-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {topic.badge}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-emerald-600 rotate-90 sm:rotate-0' : 'text-slate-400'}`} />
                </div>
                <h4 className={`text-sm font-bold mt-1 ${isActive ? 'text-emerald-900' : 'text-slate-900'}`}>
                  {topic.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {topic.subtitle}
                </p>
              </div>
            );
          })}

          {/* Quick Study Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 via-white to-emerald-50 border border-orange-200 text-xs text-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-orange-900 font-bold mb-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Ghi nhớ nhanh Địa lí 11</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600 space-y-1">
              • <strong>1957:</strong> Thành lập Ủy ban Mê Kông (MC)<br />
              • <strong>5/4/1995:</strong> Ký Hiệp định Mê Kông thành lập MRC<br />
              • <strong>4 nước thành viên:</strong> Lào, Thái Lan, Campuchia, Việt Nam<br />
              • <strong>2 đối tác đối thoại:</strong> Trung Quốc và Myanmar<br />
              • <strong>Trụ sở:</strong> Viêng Chăn & Phnôm Pênh
            </p>
          </div>
        </div>

        {/* Selected Topic Content Panel */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentTopic.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5">
                  {currentTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-teal-700 font-medium">
                  {currentTopic.subtitle}
                </p>
              </div>
            </div>

            {/* Content paragraphs */}
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed mb-6">
              {currentTopic.content.map((paragraph, idx) => {
                const isSectionHeader = paragraph.startsWith('I. ') || paragraph.startsWith('II. ') || paragraph.startsWith('III. ');
                if (isSectionHeader) {
                  return (
                    <div key={idx} className="pt-3 pb-1 border-t border-slate-200 first:border-t-0 first:pt-0">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-teal-700 text-white flex items-center justify-center text-xs font-black shadow-xs shrink-0">
                          {paragraph.split('.')[0]}
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                          {paragraph.substring(paragraph.indexOf('.') + 1).trim()}
                        </h3>
                      </div>
                    </div>
                  );
                }

                const colonIndex = paragraph.indexOf(':');
                const hasLeadLabel = colonIndex > 0 && colonIndex < 45;
                const leadTitle = hasLeadLabel ? paragraph.substring(0, colonIndex).trim() : null;
                const bodyText = hasLeadLabel ? paragraph.substring(colonIndex + 1).trim() : paragraph;

                return (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/90 hover:border-emerald-300 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {leadTitle ? (
                        <>
                          <strong className="text-slate-900 font-bold">{leadTitle}: </strong>
                          <span>{bodyText}</span>
                        </>
                      ) : (
                        <span>{paragraph}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key stats cards if available */}
            {currentTopic.keyStats && currentTopic.keyStats.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  Số Liệu Cốt Lõi Cần Nhớ
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentTopic.keyStats.map((stat, i) => (
                    <div key={i} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                      <span className="text-[10px] text-slate-500 block font-medium mb-0.5">{stat.label}</span>
                      <span className="text-sm sm:text-base font-extrabold text-teal-700">{stat.value}</span>
                      {stat.unit && <span className="text-[10px] text-slate-500 block">{stat.unit}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vietnam Relevance Section */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 mb-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wide mb-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Ý Nghĩa Sống Còn Đối Với Việt Nam</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                {currentTopic.vietnamRelevance}
              </p>
            </div>

            {/* Pedagogical Takeaway Box */}
            <div className={`p-4 rounded-xl border ${
              selectedLevel === 'primary' 
                ? 'bg-orange-50 border-orange-200' 
                : selectedLevel === 'secondary'
                ? 'bg-teal-50 border-teal-200'
                : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className={`flex items-center justify-between gap-2 text-xs uppercase tracking-wide mb-1.5 font-bold ${
                selectedLevel === 'primary' ? 'text-orange-900' : selectedLevel === 'secondary' ? 'text-teal-900' : 'text-emerald-800'
              }`}>
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>
                    {selectedLevel === 'primary' && 'Góc khám phá Tiểu học: Giữ gìn nguồn nước bạn bè'}
                    {selectedLevel === 'secondary' && 'Trọng tâm kiến thức THCS: Hợp tác quốc tế & Lưu vực'}
                    {selectedLevel === 'highschool' && 'Yêu cầu cần đạt Chuyên đề Địa lí 11 (GDPT 2018)'}
                  </span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                  {selectedLevel === 'primary' ? 'Cấp Tiểu học' : selectedLevel === 'secondary' ? 'Cấp THCS' : 'Cấp THPT Lớp 11'}
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                selectedLevel === 'primary' ? 'text-orange-950' : selectedLevel === 'secondary' ? 'text-teal-950' : 'text-emerald-950'
              }`}>
                {selectedLevel === 'primary' 
                  ? `🌟 Bé ghi nhớ: 4 nước láng giềng cùng bảo vệ dòng sông để cá tôm lớn nhanh, đồng ruộng luôn xanh tốt và mọi người có nguồn nước ngọt ngào để uống!`
                  : selectedLevel === 'secondary'
                  ? `📘 Điểm mấu chốt THCS: Hiệp định Mê Kông 1995 đặt nền móng pháp lý cho 4 quốc gia hạ lưu hợp tác sử dụng công bằng tài nguyên nước, hạn chế xung đột và ứng phó thiên tai hạn - mặn.`
                  : currentTopic.geography11Takeaway
                }
              </p>
            </div>
          </div>

          {/* Core Procedure Explainer: The 5 MRC Procedures (Hình 6 trang 10 SGK) */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm text-slate-800">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Năm Thủ Tục Quản Lí Nước Của Uỷ Hội Sông Mê Công (Hình 6, SGK Địa lí 11 Tr.10)</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                Hiệp định Mê Kông 1995
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-emerald-700">PDIES (2001)</span>
                  <span className="text-[10px] text-slate-500">Thông qua 2001</span>
                </div>
                <span className="font-semibold text-slate-900 block mb-1">Thủ tục Trao đổi và chia sẻ thông tin số liệu</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Để triển khai trao đổi số liệu và thông tin về các chỉ số quan trọng liên quan đến tài nguyên nước giữa 4 quốc gia Mê Công.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-amber-700">PWUM (2003)</span>
                  <span className="text-[10px] text-slate-500">Thông qua 2003</span>
                </div>
                <span className="font-semibold text-slate-900 block mb-1">Thủ tục Giám sát sử dụng nước</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Để thiết lập một hệ thống giám sát hiệu quả cho việc sử dụng nguồn nước sông Mê Công và các sông nhánh trong sinh hoạt, tưới tiêu, thuỷ điện.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-teal-700">PNPCA (2003)</span>
                  <span className="text-[10px] text-slate-500">Thông qua 2003</span>
                </div>
                <span className="font-semibold text-slate-900 block mb-1">Thủ tục Thông báo, tham vấn trước và thoả thuận</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Tạo thuận lợi cho hợp tác về sử dụng và phát triển tài nguyên nước với bộ ba quy trình cụ thể cho các dự án cơ sở hạ tầng được đề xuất.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-purple-700">PMFM (2006)</span>
                  <span className="text-[10px] text-slate-500">Thông qua 2006</span>
                </div>
                <span className="font-semibold text-slate-900 block mb-1">Thủ tục Duy trì dòng chảy trên dòng chính</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Đặt ra các tiêu chí đánh giá và quy trình giám sát và duy trì dòng chảy thích hợp trên sông Mê Công và sông Tôn-lê Sáp.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sky-700">PWQ (2011)</span>
                  <span className="text-[10px] text-slate-500">Thông qua 2011</span>
                </div>
                <span className="font-semibold text-slate-900 block mb-1">Thủ tục Chất lượng nước</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Củng cố khuôn khổ hợp tác nhằm giám sát và gìn giữ chất lượng nước sông Mê Công và sông Bát Xắc với một loạt tiêu chí đánh giá được thống nhất.</p>
              </div>
            </div>

            {/* Summit meetings note from Em có biết? page 9 */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
              <span className="text-amber-800 font-semibold">Hội nghị Cấp cao MRC (4 năm/lần):</span>
              <span>Lần 1 (4/2010): Hua Hin, Thái Lan</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">Lần 2 (4/2014): TP. Hồ Chí Minh, Việt Nam</span>
              <span>•</span>
              <span>Lần 3 (4/2018): Xiêm Riệp, Cam-pu-chia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
