import React, { useState } from 'react';
import { MEKONG_TOURISM_SPOTS, TOURISM_PROVINCES } from '../data/tourismData';
import { TourismSpot } from '../types';
import { soundFx } from '../utils/audio';
import { Camera, MapPin, Calendar, Sparkles, Navigation, Heart, Info, Compass, Waves, CheckCircle2, ChevronRight, X } from 'lucide-react';

export const MekongTourismGallery: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Tất cả');
  const [activeSpot, setActiveSpot] = useState<TourismSpot>(MEKONG_TOURISM_SPOTS[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [likedSpots, setLikedSpots] = useState<string[]>([]);

  const filteredSpots = selectedProvince === 'Tất cả'
    ? MEKONG_TOURISM_SPOTS
    : MEKONG_TOURISM_SPOTS.filter(s => s.province === selectedProvince);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSuccess();
    setLikedSpots(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectSpot = (spot: TourismSpot) => {
    setActiveSpot(spot);
    soundFx.playClick();
  };

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-orange-500 border border-emerald-300/30 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5 text-orange-200" />
            <span>Kỳ Quan Sông Nước & Văn Hóa Bản Địa</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xs">
            Hình Ảnh Đẹp & Thắng Cảnh Du Lịch Sông Mê Công
          </h1>
          <p className="text-xs sm:text-base text-emerald-50 leading-relaxed">
            Khám phá vẻ đẹp diệu kỳ của hạ lưu sông Mê Công tại Đồng bằng sông Cửu Long – từ chợ nổi Cái Răng nhộn nhịp, rừng tràm Trà Sư xanh ngút ngàn, đến những cánh đồng sen Tháp Mười thơm ngát và lá phổi xanh Lung Ngọc Hoàng (Hậu Giang – Cần Thơ).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white">
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 font-medium">
              <MapPin className="w-3.5 h-3.5 text-orange-200" />
              Điểm đến: Cần Thơ • Hậu Giang • An Giang • Đồng Tháp
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 font-medium">
              <Waves className="w-3.5 h-3.5 text-emerald-100" />
              Lưu vực Sông Tiền & Sông Hậu
            </span>
          </div>
        </div>

        {/* Decorative water ripple background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/15 to-transparent pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border border-orange-100/80 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-semibold text-slate-500 px-2 hidden sm:inline">Khu vực:</span>
          {TOURISM_PROVINCES.map(prov => (
            <button
              key={prov}
              id={`filter-prov-${prov}`}
              onClick={() => {
                setSelectedProvince(prov);
                soundFx.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedProvince === prov
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-orange-700 hover:bg-orange-50/60'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500">
          Hiển thị <strong className="text-emerald-700 font-bold">{filteredSpots.length}</strong> thắng cảnh tiêu biểu
        </span>
      </div>

      {/* Featured Spotlight Card */}
      {activeSpot && (
        <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image side (7 cols) */}
          <div className="lg:col-span-7 relative group overflow-hidden bg-slate-100 min-h-[300px] sm:min-h-[400px]">
            <img
              src={activeSpot.image}
              alt={activeSpot.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/10" />

            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-4 left-4 sm:left-6 px-3 py-1.5 bg-slate-900/80 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Xem Ảnh Toàn Cảnh HD</span>
            </button>

            <button
              onClick={(e) => toggleLike(activeSpot.id, e)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-xs ${
                likedSpots.includes(activeSpot.id)
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-white/80 text-slate-600 hover:text-rose-500 border-white/50'
              }`}
              title="Yêu thích thắng cảnh này"
            >
              <Heart className={`w-4 h-4 ${likedSpots.includes(activeSpot.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Info side (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-4 text-slate-800">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {activeSpot.province}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  {activeSpot.tag}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {activeSpot.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeSpot.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Điểm nhấn du lịch trải nghiệm:
                </span>
                <ul className="space-y-1">
                  {activeSpot.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural note */}
              {activeSpot.culturalNote && (
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 italic">
                  💡 {activeSpot.culturalNote}
                </div>
              )}
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Mùa đẹp nhất:
                </span>
                <p className="font-semibold text-slate-900">{activeSpot.bestSeason}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-500 flex items-center gap-1">
                  <Waves className="w-3.5 h-3.5 text-teal-600" />
                  Hệ thống sông:
                </span>
                <p className="font-semibold text-slate-900">{activeSpot.riverBranch}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All Spots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpots.map(spot => {
          const isSelected = activeSpot?.id === spot.id;
          const isLiked = likedSpots.includes(spot.id);

          return (
            <div
              key={spot.id}
              id={`spot-card-${spot.id}`}
              onClick={() => handleSelectSpot(spot)}
              className={`group rounded-2xl border bg-white overflow-hidden transition-all duration-300 cursor-pointer flex flex-col ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 hover:border-emerald-300 hover:shadow-sm'
              }`}
            >
              {/* Card Image */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={spot.image}
                  alt={spot.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-md text-emerald-800 border border-white/40 shadow-xs">
                  {spot.province}
                </span>

                <button
                  onClick={(e) => toggleLike(spot.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-xs ${
                    isLiked
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/80 text-slate-600 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute bottom-2 left-3 right-3 text-xs text-white font-medium truncate drop-shadow-xs">
                  {spot.riverBranch}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {spot.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {spot.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" />
                    Khám phá chi tiết
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cultural & Travel Guide Section */}
      <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6 sm:p-7 text-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
          <Info className="w-4 h-4" />
          <span>CẨM NANG DU LỊCH SÔNG MÊ CÔNG & ĐỒNG BẰNG SÔNG CỬU LONG</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-2">
            <h4 className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span>🌾 1. Mùa Nước Nổi (Tháng 9 - 11)</span>
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Thời điểm Mê Công mang theo lượng phù sa khổng lồ và nguồn tôm cá dồi dào. Khắp miền Tây bừng sáng sức sống với hoa điên điển vàng rực, cá linh non béo ngọt, chèo xuồng ngắm rừng tràm và đồng sen.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-2">
            <h4 className="font-bold text-teal-800 flex items-center gap-1.5">
              <span>🍉 2. Mùa Trái Cây Miệt Vườn (Tháng 5 - 8)</span>
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Các cù lao và cồn bãi ven sông Tiền, sông Hậu chín rộ sầu riêng, chôm chôm, măng cụt, dâu Hạ Châu (đặc sản Phong Điền, Cần Thơ). Du khách được tự tay hái và thưởng thức quả ngọt ngay tại vườn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-2xs space-y-2">
            <h4 className="font-bold text-cyan-800 flex items-center gap-1.5">
              <span>🛶 3. Văn Hóa Ứng Xử "Thuận Thiên"</span>
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Cư dân châu thổ sông Cửu Long bao đời xem con nước lũ là "mùa lũ đẹp", không đắp đê ngăn lũ triệt để mà nương theo con nước để mưu sinh, phát triển mô hình lúa - tôm, lúa - cá và du lịch sinh thái bền vững.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      {isModalOpen && activeSpot && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-2xl border border-emerald-300 overflow-hidden shadow-2xl space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video max-h-[70vh] bg-slate-950">
              <img
                src={activeSpot.image}
                alt={activeSpot.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-2 text-slate-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {activeSpot.title}
                </h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {activeSpot.province}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeSpot.description}
              </p>
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200">
                <strong>Mẹo du lịch trải nghiệm:</strong> {activeSpot.travelTips}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
