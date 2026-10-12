import React, { useState } from 'react';
import { MRC_TOPICS } from '../data/mekongData';
import { EducationLevel } from '../types';
import { soundFx } from '../utils/audio';
import { 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  Layers, 
  Sparkles,
  Award,
  Compass,
  Droplets,
  Waves,
  ArrowRight,
  School,
  ExternalLink,
  Users,
  Search,
  Check
} from 'lucide-react';

interface KnowledgeBaseProps {
  selectedLevel: EducationLevel;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ selectedLevel }) => {
  // Main view mode: 'textbook' (Mục 6 chuyển sang chuẩn SGK 11 trang 8-16) or 'topics' (6 chuyên đề tra cứu)
  const [viewMode, setViewMode] = useState<'textbook' | 'topics'>('textbook');
  
  // Textbook sub-section filter: 'all' | 'section2' | 'section3' | 'section4' | 'qa'
  const [textbookSection, setTextbookSection] = useState<'all' | 'section2' | 'section3' | 'section4' | 'qa'>('all');

  // Topic viewer state
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

  const handleSelectMode = (mode: 'textbook' | 'topics') => {
    setViewMode(mode);
    soundFx.playClick();
  };

  const handleSelectTextbookSection = (sec: 'all' | 'section2' | 'section3' | 'section4' | 'qa') => {
    setTextbookSection(sec);
    soundFx.playClick();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-500 rounded-3xl p-6 sm:p-8 text-white border border-emerald-300/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold mb-3 backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5 text-orange-200" />
              <span>Chương Trình GDPT 2018 • Chuyên Đề Học Tập Địa Lí 11</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-xs">
              Uỷ Hội Sông Mê Công (MRC) & Vai Trò Của Việt Nam
            </h1>
            <p className="text-emerald-50 text-xs sm:text-sm mt-2 leading-relaxed">
              Hệ thống hóa toàn diện theo chuẩn Sách Giáo Khoa (Mục 2: Lí do & Mục tiêu; Mục 3: Hoạt động, 5 thủ tục & 7 thành tựu; Mục 4: Bốn vai trò của Việt Nam, trang 8 - 16 SGK).
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-medium">
              <span className="bg-white/15 px-3 py-1 rounded-xl border border-white/20">Trang 8 - 16 SGK</span>
              <span className="bg-white/15 px-3 py-1 rounded-xl border border-white/20">5 Thủ tục quản lí nước</span>
              <span className="bg-white/15 px-3 py-1 rounded-xl border border-white/20">4 Vai trò của Việt Nam</span>
              <span className="bg-orange-400 text-orange-950 font-bold px-3 py-1 rounded-xl border border-orange-300">Trọng tâm ôn thi & kiểm tra</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={() => {
                setViewMode('textbook');
                setTextbookSection('section4');
                soundFx.playSuccess();
              }}
              className="px-4 py-2.5 rounded-xl bg-orange-400 hover:bg-orange-300 text-orange-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-orange-900" />
              <span>⭐ Xem 4 Vai Trò Việt Nam (Mục 4)</span>
            </button>
            <button
              onClick={() => {
                setViewMode('textbook');
                setTextbookSection('qa');
                soundFx.playClick();
              }}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/30 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-emerald-100" />
              <span>Giải Đáp Câu Hỏi SGK</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Mode Switcher */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => handleSelectMode('textbook')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'textbook'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Chuyên Đề Chuẩn SGK Địa Lí 11 (Mục 2, 3, 4 Trang 8-16)</span>
          </button>
          <button
            onClick={() => handleSelectMode('topics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'topics'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>🗂️ Tra Cứu & Hệ Thống 6 Chuyên Đề (MRC Topics)</span>
          </button>
        </div>

        {viewMode === 'textbook' ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">Lọc mục SGK:</span>
            <button
              onClick={() => handleSelectTextbookSection('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                textbookSection === 'all' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => handleSelectTextbookSection('section2')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                textbookSection === 'section2' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Mục 2: Lí do & Mục tiêu
            </button>
            <button
              onClick={() => handleSelectTextbookSection('section3')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                textbookSection === 'section3' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Mục 3: Hoạt động & 5 Thủ tục
            </button>
            <button
              onClick={() => handleSelectTextbookSection('section4')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                textbookSection === 'section4' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Mục 4: 4 Vai trò Việt Nam
            </button>
            <button
              onClick={() => handleSelectTextbookSection('qa')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                textbookSection === 'qa' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ❓ Ôn tập câu hỏi
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Tìm kiếm:</span>
            <input
              type="text"
              placeholder="Gõ từ khóa (vai trò, PNPCA, ĐBSCL...)"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 text-xs text-slate-800 placeholder-slate-400 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-44 sm:w-56"
            />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: CHUYÊN ĐỀ CHUẨN SGK ĐỊA LÍ 11 (TRANG 8 - 16)                */}
      {/* ========================================================================= */}
      {viewMode === 'textbook' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-8 text-slate-700">
          {/* Header Info */}
          <div className="border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                Mục I • Chuyên Đề Học Tập Địa Lí 11 (Kết Nối Tri Thức Với Cuộc Sống)
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                Trang 8 - 16 SGK
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                Trọng Tâm Đề Thi & Kiểm Tra
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Uỷ Hội Sông Mê Công (MRC) & Vai Trò Của Việt Nam Trong Uỷ Hội
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Hệ thống hóa toàn diện theo cấu trúc chuẩn sách giáo khoa: <strong>Mục 2 (Lí do ra đời & Mục tiêu)</strong>, <strong>Mục 3 (Một số hoạt động của Uỷ hội: 5 thủ tục nước, 7 thành tựu, 5 dự án song phương)</strong> và <strong>Mục 4 (Bốn vai trò của Việt Nam trong Uỷ hội sông Mê Công)</strong>.
            </p>
          </div>

          {/* Fast Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Hiệp Định 1995</span>
              <span className="text-lg sm:text-xl font-black text-emerald-950 block mt-0.5">MRC Ra Đời</span>
              <span className="text-[10px] text-slate-600">VN, Lào, Cam-pu-chia, Thái Lan (Trung Quốc & Mi-an-ma đối thoại)</span>
            </div>
            <div className="p-3.5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">Quy Chế Kỹ Thuật</span>
              <span className="text-lg sm:text-xl font-black text-blue-950 block mt-0.5">5 Thủ Tục</span>
              <span className="text-[10px] text-slate-600">PDIES (2001), PWUM (2003), PNPCA (2003), PMFM (2006), PWQ (2011)</span>
            </div>
            <div className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Ủy Ban Mê Kông VN</span>
              <span className="text-lg sm:text-xl font-black text-amber-950 block mt-0.5">18 - 9 - 1978</span>
              <span className="text-[10px] text-slate-600">Tiểu ban Cửu Long & Tiểu ban Sê San - Srêpôk</span>
            </div>
            <div className="p-3.5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block">Vai Trò Việt Nam</span>
              <span className="text-lg sm:text-xl font-black text-purple-950 block mt-0.5">4 Lĩnh Vực</span>
              <span className="text-[10px] text-slate-600">Quản lí giám sát, lồng ghép hợp tác, xây dựng chiến lược & quy chế</span>
            </div>
          </div>

          {/* MỤC 2 SGK: UỶ HỘI SÔNG MÊ CÔNG */}
          {(textbookSection === 'all' || textbookSection === 'section2') && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  2
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    2. Uỷ Hội Sông Mê Công (Mục 2 trang 8 - 9 SGK Địa lí 11)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Lí do ra đời, quá trình hình thành lịch sử, cơ cấu tổ chức và mục tiêu tối cao
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* a) Lí do ra đời */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold text-[11px]">Mục 2.a</span>
                    <h4 className="font-bold text-slate-900 text-sm">Lí Do Ra Đời & Quá Trình Hình Thành</h4>
                  </div>
                  <ul className="text-slate-600 space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>
                      <strong>Bối cảnh thực tiễn:</strong> Sông Mê Công có vai trò quan trọng đối với các quốc gia trong lưu vực. Sự suy giảm số lượng và chất lượng nguồn nước, tốc độ đô thị hoá nhanh chóng dọc theo sông, việc xây các đập thuỷ điện trên các dòng chính và tác động của biến đổi khí hậu đang trực tiếp ảnh hưởng đến các hệ sinh thái và sinh kế của hơn 65 triệu dân ở hạ lưu.
                    </li>
                    <li>
                      <strong>Yêu cầu cấp bách:</strong> Các nước trong khu vực cần có các giải pháp để cân bằng giữa phát triển kinh tế và duy trì sự bền vững của hệ sinh thái trên lưu vực sông Mê Công, đảm bảo sự hài hoà, công bằng trong việc sử dụng nguồn nước sông Mê Công của tất cả các quốc gia.
                    </li>
                    <li>
                      <strong>Quá trình hình thành:</strong>
                      <div className="pl-4 pt-1 space-y-1 font-medium text-slate-700">
                        <div>• <em>Những năm 1950:</em> 4 quốc gia phối hợp giải quyết vấn đề lưu vực.</div>
                        <div>• <em>Năm 1957:</em> Thành lập <strong>Uỷ ban Mê Công</strong>.</div>
                        <div>• <em>Năm 1978:</em> Đổi tên thành <strong>Uỷ ban Lâm thời về điều phối nghiên cứu hạ lưu lưu vực sông Mê Công</strong>.</div>
                        <div>• <em>Năm 1995:</em> Bốn quốc gia kí <strong>Hiệp định hợp tác phát triển bền vững lưu vực sông Mê Công</strong>, chính thức lập ra <strong>Uỷ hội sông Mê Công (Mekong River Commission - MRC)</strong>. Mi-an-ma và Trung Quốc tham gia với tư cách đối thoại.</div>
                      </div>
                    </li>
                    <li>
                      <strong>Cơ cấu tổ chức:</strong> Gồm <em>Hội đồng</em>, <em>Uỷ ban liên hợp</em> và <em>Ban thư kí</em>. Các nước thành viên thành lập các Uỷ ban sông Mê Công Quốc gia để hỗ trợ thêm cho Uỷ hội thực hiện nhiệm vụ.
                    </li>
                  </ul>
                </div>

                {/* b) Mục tiêu */}
                <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-teal-200 text-teal-900 font-bold text-[11px]">Mục 2.b</span>
                      <h4 className="font-bold text-teal-950 text-sm">Mục Tiêu Của Uỷ Hội Sông Mê Công</h4>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-teal-200 shadow-xs text-slate-800 italic leading-relaxed text-xs">
                      "Mục tiêu của Uỷ hội sông Mê Công nhằm <strong>thúc đẩy, phối hợp quản lí và phát triển tài nguyên nước cũng như các tài nguyên có liên quan một cách bền vững</strong> vì <strong>lợi ích chung</strong> của các quốc gia sông Mê Công và <strong>an sinh của cộng đồng</strong>."
                      <span className="block not-italic text-right text-[10px] text-teal-800 font-bold mt-1">— Trích nguyên văn SGK Địa lí 11 trang 9</span>
                    </div>
                    <div className="space-y-1.5 pt-1 text-slate-600">
                      <div className="font-semibold text-slate-800">Trọng tâm thể hiện:</div>
                      <div>🌱 Quản lí và phát triển tài nguyên nước theo cách tiếp cận tổng hợp, liên ngành.</div>
                      <div>⚖️ Hài hòa lợi ích quốc gia và lợi ích toàn lưu vực.</div>
                      <div>👥 Đặt an sinh của hơn 65 triệu người dân hạ lưu làm thước đo trung tâm.</div>
                    </div>
                  </div>

                  {/* Em có biết box from textbook page 9 */}
                  <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                    <strong>Em có biết? (Trang 9 SGK):</strong> Từ năm 2010, Uỷ hội đã quyết định tổ chức Hội nghị Cấp cao 4 năm một lần: Lần 1 tại Hua Hin, Thái Lan (4/2010); Lần 2 tại <strong>Thành phố Hồ Chí Minh, Việt Nam (4/2014)</strong>; Lần 3 tại Xiêm Riệp, Cam-pu-chia (4/2018).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MỤC 3 SGK: MỘT SỐ HOẠT ĐỘNG CỦA UỶ HỘI SÔNG MÊ CÔNG */}
          {(textbookSection === 'all' || textbookSection === 'section3') && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  3
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    3. Một Số Hoạt Động Của Uỷ Hội Sông Mê Công (Mục 3 trang 9 - 14 SGK)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Hoạt động chung tiêu biểu, 5 thủ tục nước, 7 thành tựu, 5 dự án xuyên biên giới và các sáng kiến, chương trình hợp tác
                  </p>
                </div>
              </div>

              {/* a) Các hoạt động chung tiêu biểu */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">Mục 3.a</span>
                  <h4 className="font-bold text-slate-900 text-sm">a) Các Hoạt Động Chung Tiêu Biểu (Trang 9 - 11 SGK)</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-blue-900 font-bold block">1. Ngoại giao nước và hợp tác vùng:</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Uỷ hội sông Mê Công là diễn đàn về ngoại giao nước và hợp tác vùng để các quốc gia thành viên cùng chia sẻ lợi ích chung về tài nguyên nước (dù có những lợi ích quốc gia khác nhau) cũng như giải quyết những vấn đề xuyên biên giới trong lưu vực.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-blue-900 font-bold block">2. Hỗ trợ kĩ thuật và công cụ thực hành:</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Hỗ trợ kĩ thuật và xây dựng các công cụ thực hành nhằm giúp các quốc gia thành viên đưa ra được các quyết định về kế hoạch phát triển ở các quốc gia; giải quyết vấn đề, thách thức và cơ hội song song với các mục tiêu phát triển bền vững của Liên hợp quốc (SDGs).
                    </p>
                  </div>
                </div>

                {/* 5 Thủ tục quản lí nước (Hình 6 trang 10 SGK) */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Năm Thủ Tục Quản Lí Nước Của Uỷ Hội Sông Mê Công (Hình 6 trang 10 SGK):</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Uỷ hội đã thông qua 5 thủ tục để hỗ trợ thực hiện Hiệp định 1995, quy hoạch lưu vực dựa trên nguyên tắc quản lí tổng hợp tài nguyên nước, tối đa hoá thịnh vượng kinh tế - xã hội mà không làm tổn hại đến hệ sinh thái thiết yếu ở hạ lưu:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-[11px] pt-1">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-900 block text-xs">1. PDIES (2001)</span>
                      <strong className="text-emerald-800 block text-[11px]">Trao đổi & chia sẻ số liệu</strong>
                      <p className="text-slate-600 leading-normal text-[10px]">
                        Triển khai trao đổi số liệu và thông tin về các chỉ số quan trọng liên quan đến tài nguyên nước giữa 4 quốc gia.
                      </p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-900 block text-xs">2. PWUM (2003)</span>
                      <strong className="text-amber-800 block text-[11px]">Giám sát sử dụng nước</strong>
                      <p className="text-slate-600 leading-normal text-[10px]">
                        Thiết lập hệ thống giám sát hiệu quả việc sử dụng nước sông chính và sông nhánh (sinh hoạt, tưới tiêu, thuỷ điện).
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                      <span className="font-bold text-blue-900 block text-xs">3. PNPCA (2003)</span>
                      <strong className="text-blue-800 block text-[11px]">Thông báo & tham vấn trước</strong>
                      <p className="text-slate-600 leading-normal text-[10px]">
                        Tạo thuận lợi cho hợp tác với bộ quy trình cụ thể cho các dự án cơ sở hạ tầng sử dụng nước được đề xuất.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                      <span className="font-bold text-purple-900 block text-xs">4. PMFM (2006)</span>
                      <strong className="text-purple-800 block text-[11px]">Duy trì dòng chảy dòng chính</strong>
                      <p className="text-slate-600 leading-normal text-[10px]">
                        Đặt tiêu chí đánh giá và quy trình giám sát, duy trì dòng chảy thích hợp trên sông Mê Công và sông Tôn-lê Sáp.
                      </p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200 space-y-1">
                      <span className="font-bold text-cyan-900 block text-xs">5. PWQ (2011)</span>
                      <strong className="text-cyan-800 block text-[11px]">Chất lượng nước</strong>
                      <p className="text-slate-600 leading-normal text-[10px]">
                        Củng cố khung hợp tác giám sát và gìn giữ chất lượng nước sông Mê Công và sông Bát Xắc với các tiêu chí thống nhất.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7 Thành tựu 2016-2020 (Trang 11 SGK) */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    Bảy Thành Tựu Của Uỷ Hội Sông Mê Công Giai Đoạn 2016 - 2020 (Trang 11 SGK):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span>Nâng cao hiểu biết chung và tăng cường việc sử dụng tri thức dựa trên bằng chứng của các nhà hoạch định chính sách và lập kế hoạch dự án.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span>Tối ưu hoá công tác quản lí môi trường và phát triển tài nguyên nước bền vững của các cơ quan quy hoạch ngành cấp quốc gia vì lợi ích toàn lưu vực.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span>Hướng dẫn xây dựng và quản lí các dự án sử dụng nước và dự án liên quan đến nước, chia sẻ và sử dụng tài nguyên ở cấp quốc gia.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                      <span>Các quốc gia thành viên thực hiện có hiệu quả và chặt chẽ các thủ tục của Uỷ hội sông Mê Công.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">5</span>
                      <span>Đối thoại và hợp tác hiệu quả giữa các quốc gia thành viên và kết hợp các đối tác khu vực và các bên liên quan tham gia quản lí nước xuyên biên giới.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">6</span>
                      <span>Tăng cường công tác giám sát, dự báo và đánh giá tác động toàn lưu vực cũng như phổ biến kết quả nghiên cứu trợ giúp quá trình ra quyết định.</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2 sm:col-span-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">7</span>
                      <span>Đổi mới Uỷ hội sông Mê Công quốc tế trở thành một tổ chức hiệu quả hơn, phù hợp với lộ trình phân cấp và các kế hoạch cải cách liên quan.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* b) Dự án xuyên biên giới & c) Sáng kiến hợp tác */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* b) Dự án quản lí tổng hợp xuyên biên giới */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">Mục 3.b</span>
                    <h4 className="font-bold text-slate-900 text-sm">b) Dự Án Quản Lí Tổng Hợp Xuyên Biên Giới</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Bốn quốc gia đã xây dựng <strong>5 dự án song phương</strong> tập trung vào quản lí thuỷ sản, đất ngập nước, châu thổ, hồ và lưu vực sông:
                  </p>
                  <div className="space-y-1.5 text-[11px] text-slate-700">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <strong>(1)</strong> Quản lí thuỷ sản trên dòng chính sông Mê Công và sông Sê Công <em>(giữa Lào và Cam-pu-chia)</em>.
                    </div>
                    <div className="p-2 bg-teal-50/60 rounded-lg border border-teal-200 font-medium text-teal-950">
                      <strong>(2)</strong> Quản lí tổng hợp tài nguyên nước xuyên biên giới <em>Việt Nam - Cam-pu-chia tại Tiểu lưu vực sông Sê San và Srêpôk</em>.
                    </div>
                    <div className="p-2 bg-teal-50/60 rounded-lg border border-teal-200 font-medium text-teal-950">
                      <strong>(3)</strong> Quản lí tổng hợp tài nguyên nước xuyên biên giới <em>Việt Nam - Cam-pu-chia tại đồng bằng sông Mê Công</em>.
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <strong>(4)</strong> Quản lí bãi ngập lũ và đất ngập nước <em>(giữa Lào và Thái Lan)</em>.
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <strong>(5)</strong> Dự án tăng cường hợp tác truyền thông giữa hồ Tôn-lê Sáp - Song-kha <em>(Cam-pu-chia và Thái Lan)</em>.
                    </div>
                  </div>
                </div>

                {/* c) Các sáng kiến & chương trình hợp tác */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">Mục 3.c</span>
                    <h4 className="font-bold text-slate-900 text-sm">c) Sáng Kiến, Chương Trình Hợp Tác & Đối Tác</h4>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-emerald-900 block font-bold">Các sáng kiến hợp tác tiêu biểu:</strong>
                      <div>• <em>CCAI:</em> Sáng kiến thích ứng với biến đổi khí hậu.</div>
                      <div>• <em>ISH:</em> Sáng kiến phát triển thuỷ điện bền vững.</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-blue-900 block font-bold">Các chương trình hợp tác tiêu biểu:</strong>
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        <div>• AIP: Nông nghiệp & thuỷ lợi</div>
                        <div>• DMP: Quản lí hạn hán</div>
                        <div>• EP: Môi trường</div>
                        <div>• FP: Thuỷ sản</div>
                        <div>• NAP: Giao thông thuỷ</div>
                      </div>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-purple-900 block font-bold">Cơ chế hợp tác giữa Uỷ hội và các quốc gia liên quan:</strong>
                      <div className="text-[10px] space-y-0.5 text-slate-600">
                        <div>• <em>Mê Công - Lan Thương (Trung Quốc):</em> Ra đời năm 2016.</div>
                        <div>• <em>Quan hệ đối tác Mê Công - Hoa Kỳ:</em> Ra đời năm 2009.</div>
                        <div>• <em>Hợp tác Mê Công - Nhật Bản:</em> Thực hiện từ năm 2007.</div>
                        <div>• <em>Hợp tác Mê Công - Hàn Quốc:</em> Ra đời từ năm 2011.</div>
                        <div>• <em>Hợp tác Mê Công - sông Hằng (Ấn Độ):</em> Ra đời từ năm 2000.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MỤC 4 SGK: VAI TRÒ CỦA VIỆT NAM TRONG UỶ HỘI SÔNG MÊ CÔNG */}
          {(textbookSection === 'all' || textbookSection === 'section4') && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  4
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    4. Vai Trò Của Việt Nam Trong Uỷ Hội Sông Mê Công (Mục 4 trang 14 - 16 SGK)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bốn vai trò lớn của Việt Nam theo chuẩn từng đề mục chính trong Sách Giáo Khoa Địa lí 11
                  </p>
                </div>
              </div>

              {/* Vị thế tổng quan của Việt Nam theo SGK trang 14-15 */}
              <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1.5 leading-relaxed">
                <span className="font-bold block text-sm text-rose-900">Vị Thế Địa - Kinh Tế Của Việt Nam Trong Lưu Vực (Trang 14 SGK):</span>
                <div>
                  • Khoảng <strong>20% lãnh thổ Việt Nam</strong> nằm trong lưu vực sông Mê Công, trong đó Đồng bằng sông Cửu Long là vùng kinh tế quan trọng của cả nước.
                </div>
                <div>
                  • ĐBSCL là nơi sinh sống của <strong>hơn 17 triệu người</strong>, đóng góp khoảng <strong>12% GDP</strong>, sản xuất <strong>90% lượng gạo</strong> và <strong>53% lượng tôm, cá xuất khẩu</strong> của Việt Nam (năm 2020).
                </div>
                <div>
                  • Việt Nam là quốc gia tích cực trong việc xây dựng chế độ quản lí tài nguyên nước sông Mê Công. Việt Nam đã thành lập <strong>Uỷ ban sông Mê Công Việt Nam vào ngày 18 - 9 - 1978</strong>. Hiện nay, Uỷ ban bao gồm <em>Tiểu ban lưu vực sông Cửu Long</em> và <em>Tiểu ban lưu vực sông Sê San - Srêpôk</em>.
                </div>
              </div>

              {/* Bốn vai trò của Việt Nam (Trang 15 - 16 SGK) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Vai trò 1 */}
                <div className="p-4 bg-slate-50/80 hover:bg-emerald-50/40 transition-colors rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">1</span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Vai Trò Đối Với Việc Quản Lí, Giám Sát Tài Nguyên Xuyên Biên Giới
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Uỷ ban sông Mê Công Việt Nam quản lí hoạt động hợp tác với Uỷ hội sông Mê Công nhằm phát triển, sử dụng, bảo vệ tài nguyên nước và các tài nguyên khác liên quan trên toàn lưu vực sông Mê Công nói chung, vùng Đồng bằng sông Cửu Long và khu vực Tây Nguyên thuộc lưu vực sông Mê Công nói riêng.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-teal-900 font-medium">
                    🎯 <strong>Kết quả tiêu biểu:</strong> Việt Nam cùng với Cam-pu-chia đã hoàn thành <strong>hai trong số năm sáng kiến song phương</strong> quản lí tài nguyên nước: dự án Quản lí tổng hợp tài nguyên nước lưu vực sông Sê San - Srêpôk và dự án Quản lí tổng hợp tài nguyên nước đồng bằng sông Mê Công.
                  </div>
                </div>

                {/* Vai trò 2 */}
                <div className="p-4 bg-slate-50/80 hover:bg-blue-50/40 transition-colors rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">2</span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Vai Trò Đối Với Việc Lồng Ghép Hoạt Động Của Uỷ Hội Và Các Hợp Tác Đa Phương, Song Phương
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Việt Nam tích cực tăng cường và thúc đẩy hợp tác giữa các quốc gia thành viên và giữa Uỷ hội với các đối tác đối thoại, các sáng kiến vùng và các đối tác phát triển, góp phần tăng cường vai trò của Uỷ hội trong việc sử dụng, quản lí, bảo vệ tài nguyên nước và tài nguyên liên quan.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-blue-900 font-medium">
                    🌐 <strong>Mở rộng liên lưu vực:</strong> Hiện nay, Uỷ hội sông Mê Công có <strong>14 đối tác phát triển</strong> và đang tích cực thúc đẩy mở rộng hợp tác liên lưu vực sông (sông Hằng, sông Đa-nuýp, sông Nin, sông A-ma-dôn và sông Mi-xi-xi-pi). Việt Nam tích cực thúc đẩy hợp tác với các đối tác này.
                  </div>
                </div>

                {/* Vai trò 3 */}
                <div className="p-4 bg-slate-50/80 hover:bg-amber-50/40 transition-colors rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">3</span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Vai Trò Trong Việc Xây Dựng Các Chiến Lược Của Uỷ Hội
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Việt Nam đóng vai trò tích cực trong quá trình <strong>tái cấu trúc và nội vùng hoá</strong> nhằm phát triển bền vững sông Mê Công.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-amber-900 font-medium">
                    🧭 <strong>Chiến lược phát triển:</strong> Đóng góp chuyên môn khoa học để xây dựng Chiến lược phát triển lưu vực sông dựa trên Quản lí tổng hợp tài nguyên nước (IWRM) và các quy hoạch phát triển vùng thích ứng dài hạn.
                  </div>
                </div>

                {/* Vai trò 4 */}
                <div className="p-4 bg-slate-50/80 hover:bg-purple-50/40 transition-colors rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">4</span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Vai Trò Trong Đàm Phán, Kí Kết Quy Chế Sử Dụng Nước & Thúc Đẩy Dự Án
                    </h4>
                  </div>
                  <ul className="text-slate-600 space-y-1.5 leading-relaxed text-[11px] list-disc list-inside">
                    <li>
                      Tham gia <strong>Công ước Liên hợp quốc về Luật sử dụng các nguồn nước xuyên biên giới</strong> vì các mục đích phi giao thông, thuỷ điện năm 1997.
                    </li>
                    <li>
                      Ban hành nhiều chủ trương, chính sách để khai thác, sử dụng hiệu quả và bảo vệ tài nguyên nước ĐBSCL. <strong>Nghị quyết số 120/NQ-CP (2017)</strong> là minh chứng đánh dấu bước đột phá lớn trong tư duy chiến lược theo hướng thích ứng, lấy con người làm trung tâm, thuận tự nhiên.
                    </li>
                    <li>
                      Tiếp cận phát triển bền vững theo hướng chuyển đổi sang mô hình kinh tế xanh và kinh tế tuần hoàn thông qua <strong>Luật Bảo vệ Môi trường và Luật Tài nguyên nước (2020)</strong>.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Các sự kiện tiêu biểu tổ chức tại Việt Nam (Hình 8 trang 16 SGK) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-emerald-500/15 border border-amber-300 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Các Sự Kiện Tiêu Biểu Của Uỷ Hội Sông Mê Công Được Tổ Chức Tại Việt Nam (Hình 8 trang 16 SGK):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs">
                    <strong className="text-amber-900 block text-xs mb-1">Năm 2014: Đăng Cai Hội Nghị Cấp Cao Lần Thứ Hai</strong>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Việt Nam đăng cai Hội nghị Cấp cao lần thứ hai của Uỷ hội sông Mê Công tại TP. Hồ Chí Minh với chủ đề: <em>"An ninh nguồn nước, năng lượng, lương thực trong bối cảnh biến đổi khí hậu của lưu vực sông Mê Công"</em>.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs">
                    <strong className="text-amber-900 block text-xs mb-1">Các Năm 2018 và 2022: Đảm Nhiệm Chủ Tịch Hội Đồng</strong>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Việt Nam đảm nhiệm thành công vai trò <strong>Chủ tịch Hội đồng Uỷ hội sông Mê Công</strong>, dẫn dắt các cuộc họp cấp bộ trưởng và điều phối việc thực thi các quy chế quản lí nước lưu vực.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HỘP CÂU HỎI VÀ GỢI Ý ÔN TẬP SGK TRANG 9, 14, 16 */}
          {(textbookSection === 'all' || textbookSection === 'qa') && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-300/80 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Góc Giải Đáp Các Câu Hỏi Trọng Tâm Trong SGK Địa Lí 11:</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-teal-900 block font-semibold">❓ Câu hỏi trang 9: Dựa vào thông tin mục 2, hãy trình bày lí do ra đời, mục tiêu của Uỷ hội sông Mê Công.</strong>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    👉 <strong>Gợi ý trả lời:</strong> Nêu rõ nguy cơ suy giảm nước, đô thị hoá, thuỷ điện dòng chính, biến đổi khí hậu ảnh hưởng hơn 65 triệu dân ➔ Cần giải pháp cân bằng kinh tế và hệ sinh thái bền vững, hài hoà công bằng. Mục tiêu MRC: Thúc đẩy, phối hợp quản lí và phát triển tài nguyên nước và tài nguyên liên quan bền vững vì lợi ích chung và an sinh cộng đồng.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-blue-900 block font-semibold">❓ Câu hỏi trang 14: Dựa vào thông tin mục 3, hãy giới thiệu một số hoạt động của Uỷ hội sông Mê Công.</strong>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    👉 <strong>Gợi ý trả lời:</strong> Trình bày theo 3 nhóm hoạt động: (1) Hoạt động chung: Diễn đàn ngoại giao nước, hỗ trợ kĩ thuật quy hoạch lưu vực, 5 thủ tục quản lí nước (PDIES, PWUM, PNPCA, PMFM, PWQ), 7 thành tựu 2016-2020; (2) Năm dự án quản lí tổng hợp xuyên biên giới song phương; (3) Sáng kiến CCAI, ISH; các chương trình AIP, DMP, EP, FP, NAP và quan hệ đối tác vùng (Lan Thương, Hoa Kỳ, Nhật Bản, Hàn Quốc, sông Hằng).
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-red-900 block font-semibold">❓ Câu hỏi trang 16: Dựa vào thông tin mục 4, hãy nêu vai trò của Việt Nam trong các lĩnh vực khác nhau của Uỷ hội sông Mê Công.</strong>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    👉 <strong>Gợi ý trả lời:</strong> Nêu đủ 4 vai trò lớn: (1) Quản lí, giám sát tài nguyên xuyên biên giới (2 dự án với Cam-pu-chia); (2) Lồng ghép hoạt động Uỷ hội với hợp tác đa phương/song phương (14 đối tác, liên lưu vực sông); (3) Xây dựng chiến lược của Uỷ hội (tái cấu trúc, nội vùng hoá); (4) Đàm phán quy chế sử dụng nước, thúc đẩy dự án (Công ước 1997, Nghị quyết 120/NQ-CP năm 2017 thuận tự nhiên, Luật BVMT & Tài nguyên nước 2020). Dẫn chứng năm 2014 đăng cai Cấp cao 2 và năm 2018, 2022 làm Chủ tịch Hội đồng MRC.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: DANH MỤC 6 CHUYÊN ĐỀ MỞ RỘNG & TRA CỨU SỐ LIỆU (MRC TOPICS)   */}
      {/* ========================================================================= */}
      {viewMode === 'topics' && (
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
      )}
    </div>
  );
};
