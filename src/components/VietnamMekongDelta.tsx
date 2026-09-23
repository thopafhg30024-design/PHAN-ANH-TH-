import React, { useState } from 'react';
import { RIVER_NINE_ESTUARIES } from '../data/mekongData';
import { soundFx } from '../utils/audio';
import { AlertTriangle, Shield, Sprout, Fish, CloudRain, ArrowUpRight, Check, Droplet, Trees, ShieldCheck, Calendar, Award, CheckCircle2, Compass } from 'lucide-react';

export const VietnamMekongDelta: React.FC = () => {
  const [selectedEcoZone, setSelectedEcoZone] = useState<'fresh' | 'brackish' | 'saline'>('fresh');

  return (
    <div className="space-y-6">
      {/* Hero overview of Mekong Delta */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 rounded-2xl p-5 sm:p-7 text-white border border-emerald-300/30 shadow-lg">
        <div className="max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 uppercase tracking-wider mb-2 inline-block backdrop-blur-sm">
            Địa Lí Việt Nam - Vùng Đồng Bằng Sông Cửu Long
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-xs">
            Mạch Sống Miền Tây Nam Bộ: Cơ Hội & Thách Thức Sống Còn
          </h1>
          <p className="text-emerald-50 text-sm mt-2 leading-relaxed">
            Khoảng 20% lãnh thổ Việt Nam nằm trong lưu vực sông Mê Công. Đồng bằng sông Cửu Long (ĐBSCL) là vùng kinh tế trọng điểm, nơi sinh sống của hơn 17 triệu người dân (năm 2020). Dòng Mê Kông khi vào Việt Nam chia thành sông Tiền và sông Hậu, đổ ra biển qua các cửa sông tạo nên vựa lương thực, thủy sản lớn nhất cả nước.
          </p>
        </div>

        {/* 4 Key Pillars of Mekong Delta Economy - Chuẩn số liệu SGK Địa lí 11 Tr.14 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white">
            <span className="text-[11px] text-emerald-100 block font-medium">Quy mô dân số</span>
            <span className="text-xl font-bold text-white">&gt; 17 triệu</span>
            <span className="text-[10px] text-emerald-100 block">người dân sinh sống (2020)</span>
          </div>
          <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white">
            <span className="text-[11px] text-emerald-100 block font-medium">Đóng góp GDP</span>
            <span className="text-xl font-bold text-white">~ 12%</span>
            <span className="text-[10px] text-emerald-100 block">GDP của cả nước</span>
          </div>
          <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white">
            <span className="text-[11px] text-orange-100 block font-medium">Gạo xuất khẩu</span>
            <span className="text-xl font-bold text-orange-200">90%</span>
            <span className="text-[10px] text-emerald-100 block">lượng gạo xuất khẩu cả nước</span>
          </div>
          <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white">
            <span className="text-[11px] text-emerald-100 block font-medium">Tôm cá xuất khẩu</span>
            <span className="text-xl font-bold text-white">53%</span>
            <span className="text-[10px] text-emerald-100 block">lượng tôm, cá XK của VN</span>
          </div>
        </div>
      </div>

      {/* 3 Critical Challenges (Tam giác thách thức) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Tam Giác Thách Thức Khốc Liệt Đối Với ĐBSCL</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sự cộng hưởng giữa tác động xuyên biên giới của con người và biến đổi khí hậu toàn cầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Challenge 1: Upstream Dams */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-sm mb-3 shadow-xs">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">
              Chuỗi Thủy Điện Thượng Nguồn & Suy Giảm Phù Sa
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Hàng chục đập thủy điện bậc thang giữ lại hơn <strong>60% - 70% lượng phù sa cát sỏi</strong>. Dòng nước "đói bùn" chảy xiết làm gia tăng sạt lở bờ sông, xói lở hàng trăm kilômét bờ biển Tây và biển Đông.
            </p>
            <div className="mt-3 pt-2 border-t border-rose-200 text-[11px] text-rose-800 font-semibold">
              Hậu quả: Đất đai mất dinh dưỡng tự nhiên, sụt lún địa tầng.
            </div>
          </div>

          {/* Challenge 2: Saline Intrusion */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm mb-3 shadow-xs">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">
              Hạn Hán & Xâm Nhập Mặn Sâu Kỷ Lục
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Mùa khô dòng chảy kiệt kết hợp triều cường đẩy ranh mặn <strong>4‰ ăn sâu 60 - 90km</strong> vào các cửa sông Tiền và sông Hậu (Bến Tre, Tiền Giang, Sóc Trăng), làm tê liệt nguồn nước ngọt sinh hoạt và tưới tiêu sầu riêng, lúa gạo.
            </p>
            <div className="mt-3 pt-2 border-t border-amber-200 text-[11px] text-amber-800 font-semibold">
              Hậu quả: Hàng trăm ngàn hộ dân thiếu nước sinh hoạt, thiệt hại hoa màu.
            </div>
          </div>

          {/* Challenge 3: Sea Level Rise */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm mb-3 shadow-xs">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">
              Biến Đổi Khí Hậu & Nước Biển Dâng
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              ĐBSCL là một trong ba đồng bằng châu thổ trên thế giới dễ bị tổn thương nhất trước nước biển dâng. Nếu mực nước biển dâng 100cm, ước tính gần <strong>39% diện tích ĐBSCL</strong> có nguy cơ bị ngập úng ngập triều.
            </p>
            <div className="mt-3 pt-2 border-t border-teal-200 text-[11px] text-teal-800 font-semibold">
              Hậu quả: Thu hẹp diện tích đất canh tác, di dân sinh thái.
            </div>
          </div>
        </div>
      </div>

      {/* Resolution 120: "Thuan Thien" Strategy */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nghị Quyết 120/NQ-CP Của Chính Phủ</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Chiến Lược Thích Ứng "Thuận Thiên" & Phân Vùng Sinh Thái
            </h2>
            <p className="text-xs text-slate-500">
              Chuyển tư duy từ "chống cự thiên nhiên" sang "chủ động thích ứng, coi nước mặn - lợ là tài nguyên"
            </p>
          </div>

          {/* Ecozone interactive switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => {
                setSelectedEcoZone('fresh');
                soundFx.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedEcoZone === 'fresh'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Vùng Ngọt (Thượng châu thổ)
            </button>
            <button
              onClick={() => {
                setSelectedEcoZone('brackish');
                soundFx.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedEcoZone === 'brackish'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Vùng Lợ (Chuyển tiếp)
            </button>
            <button
              onClick={() => {
                setSelectedEcoZone('saline');
                soundFx.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedEcoZone === 'saline'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Vùng Mặn (Ven biển)
            </button>
          </div>
        </div>

        {/* Dynamic Details for the 3 Ecological Zones */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
          {selectedEcoZone === 'fresh' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>1. Vùng Sinh Thái Nước Ngọt Quanh Năm (An Giang, Đồng Tháp, thượng nguồn Tiền Giang, Cần Thơ, Vĩnh Long)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Là trung tâm lúa gạo, cây ăn trái đặc sản và thủy sản nước ngọt (cá tra, basa) của cả nước. Chiến lược: Giữ ổn định diện tích lúa chất lượng cao, đón lũ đẹp bồi bổ phù sa, xả lũ vào đồng ruộng để vệ sinh dịch hại thay vì đắp đê bao khép kín 3 vụ triệt để.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">Sản phẩm chủ lực</span>
                  <span className="text-slate-600">Lúa ST25 chất lượng cao, sầu riêng Cái Mơn, xoài cát Hòa Lộc, cá tra.</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">Giải pháp thủy lợi</span>
                  <span className="text-slate-600">Hệ thống trữ nước Đồng Tháp Mười, Tứ giác Long Xuyên xả lũ tự nhiên.</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">Định hướng 120</span>
                  <span className="text-slate-600">Giảm dần lúa vụ 3 kém hiệu quả, chuyển sang cây ăn trái và thủy sản.</span>
                </div>
              </div>
            </div>
          )}

          {selectedEcoZone === 'brackish' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                <Fish className="w-4 h-4 text-teal-600" />
                <span>2. Vùng Sinh Thái Nước Lợ Chuyển Tiếp (Khu vực trung tâm bán đảo Cà Mau, Bến Tre, Trà Vinh, Sóc Trăng, Bạc Liêu)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Khu vực chịu ảnh hưởng luân phiên: mùa mưa nước ngọt, mùa khô nước lợ và mặn. Mô hình điển hình: Luân canh "1 vụ Tôm - 1 vụ Lúa" sinh thái (mùa mưa trồng lúa chất lượng cao, mùa khô dẫn nước lợ nuôi tôm càng xanh/tôm sú), đem lại lợi nhuận cao gấp 2-3 lần so với độc canh lúa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-teal-800 block mb-0.5">Mô hình biểu tượng</span>
                  <span className="text-slate-600">Tôm - Lúa hữu cơ, tôm - cua nước lợ xuất khẩu sang EU và Mỹ.</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-teal-800 block mb-0.5">Công trình điều tiết</span>
                  <span className="text-slate-600">Siêu cống Cái Lớn - Cái Bé đóng mở linh hoạt kiểm soát mặn ngọt theo nhu cầu.</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-teal-800 block mb-0.5">Lợi ích kinh tế</span>
                  <span className="text-slate-600">Không dùng hóa chất, lúa hấp thu chất thải nuôi tôm, sạch bệnh tự nhiên.</span>
                </div>
              </div>
            </div>
          )}

          {selectedEcoZone === 'saline' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                <Trees className="w-4 h-4 text-sky-600" />
                <span>3. Vùng Sinh Thái Mặn Ven Biển (Dải ven biển Cà Mau, Kiên Giang, Bạc Liêu, Sóc Trăng, Bến Tre)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Vùng tiếp giáp trực tiếp với Biển Đông và Vịnh Thái Lan. Định hướng chiến lược: Phát triển kinh tế biển, nuôi trồng thủy hải sản mặn công nghệ cao, nuôi tôm dưới tán rừng ngập mặn đước - mắm (bảo tồn đa dạng sinh học và phòng hộ chống bão), điện gió ngoài khơi.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-sky-800 block mb-0.5">Mô hình tiêu biểu</span>
                  <span className="text-slate-600">Tôm rừng sinh thái đạt chứng nhận quốc tế Naturland, du lịch sinh thái.</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-sky-800 block mb-0.5">Tường chắn bão lũ</span>
                  <span className="text-slate-600">Bảo vệ vành đai rừng ngập mặn Ramsar Mũi Cà Mau, đê biển kiên cố.</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="font-bold text-sky-800 block mb-0.5">Năng lượng tái tạo</span>
                  <span className="text-slate-600">Các cánh đồng điện gió Bạc Liêu, Sóc Trăng, Trà Vinh hòa lưới quốc gia.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vai Trò Của Việt Nam Trong MRC (Theo Mục 4 SGK Địa lí 11 Tr.14 - 16) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Vai Trò Của Việt Nam Trong Uỷ Hội Sông Mê Công (SGK Tr.14 - 16)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Thành viên sáng lập tích cực, kiên trì thúc đẩy hợp tác đa phương, quản lí nước công bằng và ngoại giao môi trường
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold shrink-0">
            Chuyên đề 11.1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-slate-900 text-sm">Thành lập Uỷ ban sông Mê Công Việt Nam (18 - 9 - 1978)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Thành lập nhằm quản lí tài nguyên nước theo lưu vực sông, đảm bảo hài hòa mối quan hệ thượng - hạ lưu. Hiện nay gồm 2 tiểu ban: <strong>Tiểu ban lưu vực sông Cửu Long</strong> và <strong>Tiểu ban lưu vực sông Sê San - Srêpôk</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Award className="w-4 h-4 text-teal-600" />
              <span className="font-bold text-slate-900 text-sm">Hội Nghị Cấp Cao Lần Thứ Hai (Năm 2014)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Việt Nam đăng cai tổ chức tại TP. Hồ Chí Minh với chủ đề: <em>"An ninh nguồn nước, năng lượng, lương thực trong bối cảnh biến đổi khí hậu của lưu vực sông Mê Công"</em>. Các năm <strong>2018 và 2022</strong>, Việt Nam giữ chức Chủ tịch Hội đồng Uỷ hội.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-900 text-sm">Hoàn thành 2 Dự án Song Phương với Cam-pu-chia</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Việt Nam cùng Cam-pu-chia hoàn thành 2 trong số 5 sáng kiến song phương của MRC: Dự án Quản lí tổng hợp tài nguyên nước lưu vực sông Sê San - Srêpôk và Dự án Quản lí tổng hợp tài nguyên nước Đồng bằng sông Mê Công.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Compass className="w-4 h-4 text-sky-600" />
              <span className="font-bold text-slate-900 text-sm">Khung Pháp Lý: Nghị Quyết 120 & Luật 2020</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Nghị quyết số 120/NQ-CP (2017) định hướng chiến lược "thích ứng, thuận thiên", tôn trọng quy luật tự nhiên. Tiếp cận kinh tế xanh, kinh tế tuần hoàn theo Luật Bảo vệ Môi trường và Luật Tài nguyên nước (2020); phê chuẩn Công ước LHQ về nguồn nước quốc tế 1997.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
