import React from 'react';

export type FilterCategory = 'all' | 'cute' | 'funny' | 'colorful';

export interface CameraFilter {
  id: string;
  category: 'cute' | 'funny' | 'colorful';
  nameVi: string;
  nameEn: string;
  emoji: string;
  tag: string;
  descriptionVi: string;
  descriptionEn: string;
  videoCssFilter: string;
  kienSangReactionVi: string;
  kienSangReactionEn: string;
}

export const CAMERA_FILTERS: CameraFilter[] = [
  // --- 💖 DỄ THƯƠNG (CUTE) ---
  {
    id: 'cat_ears',
    category: 'cute',
    nameVi: 'Tai Mèo Hồng',
    nameEn: 'Pink Kitty Ears',
    emoji: '🐱',
    tag: 'Dễ thương',
    descriptionVi: 'Tai mèo hồng nhún nhảy, ria mép và má hồng đào',
    descriptionEn: 'Twitching pink cat ears, whiskers & rosy blush',
    videoCssFilter: 'brightness(1.06) contrast(1.04) saturate(1.22)',
    kienSangReactionVi: 'Meo meo! Bạn đeo tai mèo trông cưng xỉu luôn á! Cùng học bài với Kiến Sáng nào!',
    kienSangReactionEn: 'Meow! You look so adorable with those kitty ears! Let\'s study together!'
  },
  {
    id: 'bunny',
    category: 'cute',
    nameVi: 'Thỏ Con Tinh Nghịch',
    nameEn: 'Cute Bunny',
    emoji: '🐰',
    tag: 'Dễ thương',
    descriptionVi: 'Tai thỏ dài đáng yêu, củ cà rốt và má hồng',
    descriptionEn: 'Fluffy bunny ears, cartoon carrot & sparkles',
    videoCssFilter: 'brightness(1.08) contrast(1.02) saturate(1.18)',
    kienSangReactionVi: 'Oa, một chú thỏ con chăm chỉ đến học Địa lí Mê Kông nè! Đáng yêu quá!',
    kienSangReactionEn: 'Wow, such a cute hardworking bunny explorer ready to learn about the Mekong!'
  },
  {
    id: 'sakura_crown',
    category: 'cute',
    nameVi: 'Vương Miện Anh Đào',
    nameEn: 'Sakura Blossom',
    emoji: '🌸',
    tag: 'Dễ thương',
    descriptionVi: 'Vòng hoa anh đào rực rỡ và cánh hoa rơi bay bổng',
    descriptionEn: 'Spring sakura flower crown with falling petals',
    videoCssFilter: 'brightness(1.07) contrast(1.05) saturate(1.25) hue-rotate(-8deg)',
    kienSangReactionVi: 'Vòng hoa anh đào đẹp dịu dàng quá! Trông bạn như bước ra từ vườn hoa mùa xuân vậy!',
    kienSangReactionEn: 'What a graceful flower crown! You bring spring vibes to our video call!'
  },
  {
    id: 'fpt_ant',
    category: 'cute',
    nameVi: 'Kiến Nhí FPT',
    nameEn: 'FPT Mascot Ant',
    emoji: '🐜',
    tag: 'Dễ thương',
    descriptionVi: 'Râu kiến nhí nhảnh FPT phát sáng đồng điệu cùng Kiến Sáng',
    descriptionEn: 'Twin bobbing ant antennae with glowing tips & FPT stars',
    videoCssFilter: 'brightness(1.06) contrast(1.08) saturate(1.3)',
    kienSangReactionVi: 'Haha tuyệt vời! Bạn cũng biến thành chú Kiến FPT thông thái giống mình rồi nè! Chào đồng đội nhé!',
    kienSangReactionEn: 'Awesome! You now have FPT mascot antennae just like me! Welcome to the team!'
  },
  {
    id: 'angel_halo',
    category: 'cute',
    nameVi: 'Thiên Thần Lấp Lánh',
    nameEn: 'Angel Halo',
    emoji: '😇',
    tag: 'Dễ thương',
    descriptionVi: 'Vòng hào quang thiên thần vàng óng và cánh nhỏ',
    descriptionEn: 'Golden halo with sparkles & soft heavenly glow',
    videoCssFilter: 'brightness(1.12) contrast(1.04) drop-shadow(0 0 8px rgba(250,204,21,0.3))',
    kienSangReactionVi: 'Hào quang thiên thần sáng bừng luôn! Bạn học giỏi thế này thì 10 điểm Địa lí trong tay nhé!',
    kienSangReactionEn: 'A glowing angel! With that bright mind, you will master all Mekong topics!'
  },

  // --- 😂 HÀI HƯỚC (FUNNY) ---
  {
    id: 'thug_life',
    category: 'funny',
    nameVi: 'Kính Thug Life Ngầu',
    nameEn: 'Thug Life 8-Bit',
    emoji: '🕶️',
    tag: 'Hài hước',
    descriptionVi: 'Kính râm pixel 8-bit ngầu đét và dây chuyền vàng chất chơi',
    descriptionEn: 'Pixel black shades, gold chain & retro swagger',
    videoCssFilter: 'contrast(1.3) saturate(1.12)',
    kienSangReactionVi: 'Trời ơi ngầu bá cháy bọ chét luôn! Đúng là cao thủ Địa lí miền Tây đây rồi!',
    kienSangReactionEn: 'So cool! You look like the ultimate Mekong river boss!'
  },
  {
    id: 'funny_mustache',
    category: 'funny',
    nameVi: 'Thám Tử Râu Vểnh',
    nameEn: 'Sherlock Mustache',
    emoji: '🥸',
    tag: 'Hài hước',
    descriptionVi: 'Râu kẽm uốn cong hài hước, kính tròn to và nơ cổ',
    descriptionEn: 'Curled handlebar mustache, monocle & bow tie',
    videoCssFilter: 'sepia(0.25) contrast(1.2) saturate(1.1)',
    kienSangReactionVi: 'Chào ngài Thám tử lừng danh! Xin mời ngài cùng Kiến Sáng phá án bí mật Biển Hồ Tonle Sap!',
    kienSangReactionEn: 'Greetings, Detective! Ready to investigate the mysteries of the Mekong basin?'
  },
  {
    id: 'mekong_fish',
    category: 'funny',
    nameVi: 'Cá Tra Khổng Lồ Ngố',
    nameEn: 'Funny Mekong Fish',
    emoji: '🐟',
    tag: 'Hài hước',
    descriptionVi: 'Mũ cá tra khổng lồ há hốc mồm và bong bóng nước',
    descriptionEn: 'Giant Mekong catfish hat with googly eyes & bubbles',
    videoCssFilter: 'hue-rotate(25deg) saturate(1.35) contrast(1.1)',
    kienSangReactionVi: 'Haha con cá tra dầu khổng lồ Mê Kông trên đầu bạn nhìn ngộ nghĩnh quá đi mất!',
    kienSangReactionEn: 'Haha that giant Mekong catfish hat is hilarious! Don\'t let it swallow your ideas!'
  },
  {
    id: 'clown_party',
    category: 'funny',
    nameVi: 'Chú Hề Tiệc Tùng',
    nameEn: 'Party Clown',
    emoji: '🤡',
    tag: 'Hài hước',
    descriptionVi: 'Mũ chóp tiệc tùng, mũi đỏ bóp kêu và pháo hoa giấy',
    descriptionEn: 'Party cone hat, shiny red nose & festive confetti',
    videoCssFilter: 'saturate(1.7) contrast(1.15)',
    kienSangReactionVi: 'Không khí tiệc tùng tưng bừng quá! Vừa học vừa cười vui thế này là nhớ bài siêu lâu luôn!',
    kienSangReactionEn: 'Party time! Studying with fun and laughter makes you remember everything!'
  },
  {
    id: 'alien_green',
    category: 'funny',
    nameVi: 'Người Ngoài Hành Tinh',
    nameEn: 'Green Alien',
    emoji: '👽',
    tag: 'Hài hước',
    descriptionVi: 'Mắt người ngoài hành tinh to tròn và tia quét radar UFO',
    descriptionEn: 'Giant alien eyes, radar scanner & green cosmic glow',
    videoCssFilter: 'hue-rotate(85deg) saturate(1.5) contrast(1.2)',
    kienSangReactionVi: 'Tín hiệu từ Trái Đất xin chào người bạn ngoài vũ trụ! Sông Mê Kông nhìn từ vũ trụ đẹp lắm đó nha!',
    kienSangReactionEn: 'Greetings from Earth! The Mekong River looks breathtaking even from outer space!'
  },

  // --- 🌈 MÀU MÈ / RỰC RỠ (COLORFUL) ---
  {
    id: 'rainbow_neon',
    category: 'colorful',
    nameVi: 'Cầu Vồng 7 Màu',
    nameEn: 'Rainbow Neon',
    emoji: '🌈',
    tag: 'Màu mè',
    descriptionVi: 'Cầu vồng rực rỡ uốn lượn, mây trắng bồng bềnh và viền neon',
    descriptionEn: 'Vibrant glowing rainbow arch with fluffy clouds & neon aura',
    videoCssFilter: 'saturate(1.6) contrast(1.12)',
    kienSangReactionVi: 'Màu mè rực rỡ quá bạn ơi! 7 sắc cầu vồng tỏa sáng lung linh luôn nè!',
    kienSangReactionEn: 'So colorful and vibrant! A full 7-color neon rainbow lighting up your call!'
  },
  {
    id: 'cyberpunk_neon',
    category: 'colorful',
    nameVi: 'Cyberpunk Neon',
    nameEn: 'Cyberpunk HUD',
    emoji: '⚡',
    tag: 'Màu mè',
    descriptionVi: 'Kính hiển thị HUD tương lai, lưới tọa độ và ánh sáng tím cyan',
    descriptionEn: 'Futuristic sci-fi cyber HUD visor, coordinates & neon grid',
    videoCssFilter: 'contrast(1.35) saturate(1.7) hue-rotate(185deg)',
    kienSangReactionVi: 'Giao diện tương lai Cyberpunk xịn sò quá! Hệ thống định vị Mê Kông đã được kích hoạt!',
    kienSangReactionEn: 'High-tech Cyberpunk style! Mekong basin navigation system activated!'
  },
  {
    id: 'disco_glitter',
    category: 'colorful',
    nameVi: 'Vũ Trường Disco',
    nameEn: 'Disco Sparkles',
    emoji: '🪩',
    tag: 'Màu mè',
    descriptionVi: 'Quả cầu disco lấp lánh phản chiếu chùm tia sáng đa sắc',
    descriptionEn: 'Glittering disco ball with dancing colorful light spots',
    videoCssFilter: 'brightness(1.12) saturate(1.5) contrast(1.18)',
    kienSangReactionVi: 'Bật đèn disco lên quẩy nào! Học Địa lí mà sôi động như lễ hội âm nhạc vậy đó!',
    kienSangReactionEn: 'Turn on the disco lights! Geography class turned into a vibrant festival!'
  },
  {
    id: 'underwater',
    category: 'colorful',
    nameVi: 'Thủy Cung Mê Kông',
    nameEn: 'Underwater Aquarium',
    emoji: '🌊',
    tag: 'Màu mè',
    descriptionVi: 'Màu nước xanh ngọc huyền ảo, đàn cá bơi và bong bóng lăn tăn',
    descriptionEn: 'Deep cyan aquarium glow with swimming fish & gentle bubbles',
    videoCssFilter: 'hue-rotate(155deg) saturate(1.45) brightness(0.96) contrast(1.1)',
    kienSangReactionVi: 'Oa, như đang lặn sâu xuống dòng nước Mê Kông ngắm nhìn đàn cá bơi lội vậy! Đẹp mê ly!',
    kienSangReactionEn: 'Like diving deep into the magical Mekong waters with friendly fishes swimming by!'
  },
  {
    id: 'pop_art',
    category: 'colorful',
    nameVi: 'Pop Art Hoạt Hình',
    nameEn: 'Pop Art Comic',
    emoji: '🎨',
    tag: 'Màu mè',
    descriptionVi: 'Phong cách truyện tranh rực rỡ, chấm màu halftone và hiệu ứng WOW',
    descriptionEn: 'Retro vibrant comic book halftone style with WOW action bubble',
    videoCssFilter: 'contrast(1.6) saturate(1.9) brightness(1.05)',
    kienSangReactionVi: 'Trông như bìa truyện tranh thiếu nhi siêu ngộ nghĩnh! Màu sắc bắt mắt tuyệt vời!',
    kienSangReactionEn: 'You look like a superhero in a vibrant vintage comic book! WOW!'
  }
];

interface FaceTimeFilterOverlayProps {
  filterId: string;
  isMirrored?: boolean;
}

export const FaceTimeFilterOverlay: React.FC<FaceTimeFilterOverlayProps> = ({ 
  filterId,
  isMirrored = true 
}) => {
  if (!filterId || filterId === 'none') return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none"
      style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
    >
      {/* 1. CAT EARS (Tai Mèo Hồng Dễ Thương) */}
      {filterId === 'cat_ears' && (
        <>
          {/* Kitty Ears at top */}
          <div className="absolute top-1 left-0 right-0 flex justify-between px-3 sm:px-6">
            {/* Left Ear */}
            <div className="w-9 h-9 sm:w-14 sm:h-14 relative transform -rotate-12 animate-pulse">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <polygon points="10,90 45,10 90,85" fill="#f472b6" stroke="#db2777" strokeWidth="6" strokeLinejoin="round" />
                <polygon points="25,80 48,25 78,75" fill="#fdf2f8" />
                <polygon points="35,75 50,38 70,72" fill="#fbcfe8" />
              </svg>
            </div>
            {/* Right Ear */}
            <div className="w-9 h-9 sm:w-14 sm:h-14 relative transform rotate-12 animate-pulse">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <polygon points="90,90 55,10 10,85" fill="#f472b6" stroke="#db2777" strokeWidth="6" strokeLinejoin="round" />
                <polygon points="75,80 52,25 22,75" fill="#fdf2f8" />
                <polygon points="65,75 50,38 30,72" fill="#fbcfe8" />
              </svg>
            </div>
          </div>

          {/* Rosy Cheeks */}
          <div className="absolute top-[48%] left-2 w-7 h-5 sm:w-10 sm:h-7 rounded-full bg-pink-400/40 blur-xs animate-pulse" />
          <div className="absolute top-[48%] right-2 w-7 h-5 sm:w-10 sm:h-7 rounded-full bg-pink-400/40 blur-xs animate-pulse" />

          {/* Cat Nose & Whiskers Center */}
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {/* Left Whiskers */}
            <div className="flex flex-col gap-1 sm:gap-1.5 -mr-1">
              <div className="w-4 sm:w-7 h-0.5 bg-white/90 transform -rotate-6 rounded-full shadow-xs" />
              <div className="w-5 sm:w-8 h-0.5 bg-white/90 rounded-full shadow-xs" />
              <div className="w-4 sm:w-7 h-0.5 bg-white/90 transform rotate-6 rounded-full shadow-xs" />
            </div>

            {/* Pink Nose Heart */}
            <div className="w-3 h-2.5 sm:w-5 sm:h-4 bg-pink-500 rounded-b-full rounded-t-xs shadow-md mx-0.5" />

            {/* Right Whiskers */}
            <div className="flex flex-col gap-1 sm:gap-1.5 -ml-1">
              <div className="w-4 sm:w-7 h-0.5 bg-white/90 transform rotate-6 rounded-full shadow-xs" />
              <div className="w-5 sm:w-8 h-0.5 bg-white/90 rounded-full shadow-xs" />
              <div className="w-4 sm:w-7 h-0.5 bg-white/90 transform -rotate-6 rounded-full shadow-xs" />
            </div>
          </div>

          {/* Floating tiny pink hearts */}
          <div className="absolute top-6 left-1/4 text-pink-400 text-xs sm:text-base animate-bounce">💖</div>
          <div className="absolute top-8 right-1/4 text-pink-400 text-xs sm:text-base animate-bounce delay-150">✨</div>
        </>
      )}

      {/* 2. BUNNY (Thỏ Con Đáng Yêu) */}
      {filterId === 'bunny' && (
        <>
          {/* Bunny Ears at top */}
          <div className="absolute -top-1 left-0 right-0 flex justify-center gap-4 sm:gap-8">
            <div className="w-6 h-14 sm:w-10 sm:h-22 bg-white rounded-t-full border-2 border-pink-200 shadow-md p-1 transform -rotate-6 animate-bounce">
              <div className="w-full h-full bg-pink-200 rounded-t-full" />
            </div>
            <div className="w-6 h-14 sm:w-10 sm:h-22 bg-white rounded-t-full border-2 border-pink-200 shadow-md p-1 transform rotate-6 animate-bounce delay-100">
              <div className="w-full h-full bg-pink-200 rounded-t-full" />
            </div>
          </div>

          {/* Bunny Nose */}
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-2.5 sm:w-4 sm:h-3.5 bg-pink-400 rounded-full shadow-xs" />
          </div>

          {/* Rosy Cheeks */}
          <div className="absolute top-[50%] left-3 w-6 h-4 sm:w-9 sm:h-6 rounded-full bg-rose-400/40 blur-xs" />
          <div className="absolute top-[50%] right-3 w-6 h-4 sm:w-9 sm:h-6 rounded-full bg-rose-400/40 blur-xs" />

          {/* Floating Carrot */}
          <div className="absolute bottom-6 right-3 text-lg sm:text-2xl transform rotate-12 animate-pulse">
            🥕
          </div>
          <div className="absolute top-12 left-4 text-xs sm:text-sm text-yellow-300 animate-spin">
            ⭐
          </div>
        </>
      )}

      {/* 3. SAKURA CROWN (Vương Miện Anh Đào) */}
      {filterId === 'sakura_crown' && (
        <>
          {/* Floral wreath crown at top */}
          <div className="absolute top-2 inset-x-2 flex items-center justify-center gap-1 sm:gap-2">
            <span className="text-sm sm:text-2xl animate-pulse">🌸</span>
            <span className="text-lg sm:text-3xl animate-bounce delay-75">🌺</span>
            <span className="text-xl sm:text-4xl drop-shadow-md">🌸</span>
            <span className="text-lg sm:text-3xl animate-bounce delay-150">🌺</span>
            <span className="text-sm sm:text-2xl animate-pulse">🌸</span>
          </div>

          {/* Falling Petals */}
          <div className="absolute top-1/4 left-3 text-xs sm:text-base animate-bounce opacity-80">🌸</div>
          <div className="absolute top-1/2 right-4 text-xs sm:text-base animate-pulse opacity-70">🌸</div>
          <div className="absolute bottom-6 left-6 text-xs sm:text-sm opacity-60">🌸</div>
          
          {/* Soft Pastel Vignette */}
          <div className="absolute inset-0 border-4 sm:border-8 border-pink-300/30 rounded-2xl pointer-events-none" />
        </>
      )}

      {/* 4. FPT MASCOT ANT (Kiến Nhí FPT) */}
      {filterId === 'fpt_ant' && (
        <>
          {/* Two Cute Bouncy Ant Antennae */}
          <div className="absolute top-0 inset-x-0 flex justify-center gap-8 sm:gap-16">
            {/* Left Antenna */}
            <div className="flex flex-col items-center transform -rotate-12 animate-bounce">
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-amber-400 border-2 border-white shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse" />
              <div className="w-1 h-8 sm:w-1.5 sm:h-12 bg-amber-600 rounded-full" />
            </div>
            {/* Right Antenna */}
            <div className="flex flex-col items-center transform rotate-12 animate-bounce delay-100">
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-orange-400 border-2 border-white shadow-[0_0_12px_rgba(249,115,22,0.9)] animate-pulse" />
              <div className="w-1 h-8 sm:w-1.5 sm:h-12 bg-orange-600 rounded-full" />
            </div>
          </div>

          {/* FPT School Badge on Corner */}
          <div className="absolute bottom-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
            <span>🐜 FPT Kiến Nhí</span>
          </div>
          <div className="absolute top-10 right-3 text-xs sm:text-sm animate-spin">✨</div>
        </>
      )}

      {/* 5. ANGEL HALO (Thiên Thần Lấp Lánh) */}
      {filterId === 'angel_halo' && (
        <>
          {/* Golden Halo above head */}
          <div className="absolute top-1 inset-x-0 flex justify-center">
            <div className="w-16 h-5 sm:w-28 sm:h-8 rounded-full border-4 border-yellow-300 shadow-[0_0_16px_rgba(253,224,71,0.9)] bg-yellow-100/30 transform -rotate-6 animate-pulse" />
          </div>

          {/* Tiny Angel Wing Hints at corners */}
          <div className="absolute top-6 left-1 text-base sm:text-2xl transform -rotate-45 opacity-80 animate-pulse">🪽</div>
          <div className="absolute top-6 right-1 text-base sm:text-2xl transform rotate-45 opacity-80 animate-pulse">🪽</div>

          {/* Sparkles */}
          <div className="absolute top-12 left-1/4 text-yellow-300 text-xs sm:text-sm animate-ping">✨</div>
          <div className="absolute top-10 right-1/4 text-yellow-200 text-xs sm:text-sm animate-ping delay-200">✨</div>
        </>
      )}

      {/* 6. THUG LIFE (Kính Thug Life 8-Bit) */}
      {filterId === 'thug_life' && (
        <>
          {/* 8-bit Pixel Sunglasses across Eyes */}
          <div className="absolute top-[35%] inset-x-0 flex justify-center">
            <div className="relative flex items-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
              {/* Left Lens */}
              <div className="w-8 h-4 sm:w-14 sm:h-7 bg-black border-t-2 border-l-2 border-white/40 flex items-start p-0.5">
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-white" />
              </div>
              {/* Bridge */}
              <div className="w-2 sm:w-4 h-1.5 sm:h-2.5 bg-black" />
              {/* Right Lens */}
              <div className="w-8 h-4 sm:w-14 sm:h-7 bg-black border-t-2 border-l-2 border-white/40 flex items-start p-0.5">
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-white" />
              </div>
            </div>
          </div>

          {/* Gold Dollar Chain at bottom */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center">
            <div className="flex items-center gap-0.5 sm:gap-1 bg-yellow-500/80 text-yellow-950 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black shadow-md border border-yellow-300 animate-pulse">
              <span>💰</span>
              <span>THUG LIFE</span>
              <span>⚡</span>
            </div>
          </div>
        </>
      )}

      {/* 7. FUNNY MUSTACHE (Thám Tử Râu Vểnh) */}
      {filterId === 'funny_mustache' && (
        <>
          {/* Big Handlebar Mustache */}
          <div className="absolute top-[55%] inset-x-0 flex justify-center">
            <svg viewBox="0 0 200 60" className="w-16 h-6 sm:w-28 sm:h-10 filter drop-shadow-md animate-bounce">
              <path 
                d="M 100,20 C 80,5 50,0 20,25 C 0,40 10,50 30,45 C 60,40 85,25 100,35 C 115,25 140,40 170,45 C 190,50 200,40 180,25 C 150,0 120,5 100,20 Z" 
                fill="#18181b" 
              />
            </svg>
          </div>

          {/* Round Glasses */}
          <div className="absolute top-[32%] inset-x-0 flex justify-center gap-2 sm:gap-4">
            <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-full border-2 sm:border-3 border-amber-800 bg-amber-100/10 shadow-md" />
            <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-full border-2 sm:border-3 border-amber-800 bg-amber-100/10 shadow-md" />
          </div>

          {/* Bow Tie at Bottom */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center">
            <span className="text-base sm:text-xl filter drop-shadow-sm">🎀</span>
          </div>
        </>
      )}

      {/* 8. MEKONG CATFISH HAT (Cá Tra Khổng Lồ Ngố) */}
      {filterId === 'mekong_fish' && (
        <>
          {/* Giant Fish perched on head */}
          <div className="absolute -top-3 inset-x-0 flex justify-center">
            <div className="relative text-2xl sm:text-4xl transform animate-bounce">
              🐟
              {/* Googly eye */}
              <div className="absolute top-1 left-2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white border border-black flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-black animate-ping" />
              </div>
            </div>
          </div>

          {/* Floating Underwater Bubbles */}
          <div className="absolute bottom-8 left-3 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-cyan-300 bg-cyan-200/30 animate-bounce" />
          <div className="absolute bottom-14 right-4 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-cyan-300 bg-cyan-200/30 animate-pulse" />
          <div className="absolute bottom-4 right-8 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-cyan-300 bg-cyan-200/30 animate-bounce delay-150" />
        </>
      )}

      {/* 9. CLOWN PARTY (Chú Hề Tiệc Tùng) */}
      {filterId === 'clown_party' && (
        <>
          {/* Party Hat */}
          <div className="absolute -top-2 inset-x-0 flex justify-center">
            <div className="w-8 h-10 sm:w-12 sm:h-16 relative">
              <svg viewBox="0 0 60 80" className="w-full h-full drop-shadow-lg">
                <polygon points="30,5 5,75 55,75" fill="#ef4444" />
                <polygon points="30,5 20,75 40,75" fill="#eab308" />
                <circle cx="30" cy="5" r="5" fill="#3b82f6" />
              </svg>
            </div>
          </div>

          {/* Red Clown Nose */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 sm:w-7 sm:h-7 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-start justify-end p-0.5">
              <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white" />
            </div>
          </div>

          {/* Confetti */}
          <div className="absolute top-4 left-3 text-xs sm:text-base animate-spin">🎉</div>
          <div className="absolute top-6 right-3 text-xs sm:text-base animate-bounce">🎊</div>
          <div className="absolute bottom-3 left-4 text-xs sm:text-sm animate-pulse">🎈</div>
        </>
      )}

      {/* 10. GREEN ALIEN (Người Ngoài Hành Tinh) */}
      {filterId === 'alien_green' && (
        <>
          {/* Alien Eyes */}
          <div className="absolute top-[35%] inset-x-0 flex justify-center gap-3 sm:gap-6">
            <div className="w-6 h-9 sm:w-10 sm:h-14 bg-black rounded-[60%_40%_50%_50%/70%_70%_30%_30%] transform -rotate-12 border border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] flex items-center justify-center">
              <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white/40 rounded-full" />
            </div>
            <div className="w-6 h-9 sm:w-10 sm:h-14 bg-black rounded-[40%_60%_50%_50%/70%_70%_30%_30%] transform rotate-12 border border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] flex items-center justify-center">
              <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white/40 rounded-full" />
            </div>
          </div>

          {/* Sci-fi scanner bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-[0_0_10px_#10b981]" />

          {/* UFO Beam hint */}
          <div className="absolute bottom-2 right-2 text-xs sm:text-sm font-mono text-emerald-300 font-bold bg-black/60 px-1.5 py-0.5 rounded">
            🛸 UFO // LINK
          </div>
        </>
      )}

      {/* 11. RAINBOW NEON (Cầu Vồng 7 Màu) */}
      {filterId === 'rainbow_neon' && (
        <>
          {/* Glowing Rainbow Arch at Top */}
          <div className="absolute top-0 inset-x-0 flex justify-center">
            <div className="w-24 h-12 sm:w-44 sm:h-20 overflow-hidden relative">
              <div className="w-24 h-24 sm:w-44 sm:h-44 rounded-full border-[5px] sm:border-[8px] border-t-red-500 border-r-amber-400 border-b-emerald-400 border-l-blue-500 shadow-[0_0_16px_rgba(255,255,255,0.7)] animate-pulse" />
            </div>
          </div>

          {/* Rainbow clouds */}
          <div className="absolute top-6 left-2 text-base sm:text-2xl">☁️</div>
          <div className="absolute top-6 right-2 text-base sm:text-2xl">☁️</div>

          {/* Neon Rainbow Border */}
          <div className="absolute inset-0 border-2 sm:border-4 border-dashed border-amber-300/40 rounded-2xl pointer-events-none" />

          {/* Stars */}
          <div className="absolute bottom-4 left-3 text-xs sm:text-base animate-bounce">⭐</div>
          <div className="absolute bottom-4 right-3 text-xs sm:text-base animate-bounce delay-150">🌈</div>
        </>
      )}

      {/* 12. CYBERPUNK HUD (Cyberpunk Neon) */}
      {filterId === 'cyberpunk_neon' && (
        <>
          {/* Sci-fi HUD Visor overlay */}
          <div className="absolute top-[32%] inset-x-2 sm:inset-x-4 border-t border-b border-cyan-400/80 py-1 bg-cyan-950/20 backdrop-blur-2xs flex items-center justify-between px-2">
            <span className="text-[8px] sm:text-[10px] font-mono text-cyan-300 font-bold tracking-widest">
              [TARGET: ACQUIRED]
            </span>
            <div className="w-3 h-3 sm:w-4 sm:h-4 border border-magenta-500 rounded-full animate-ping" />
            <span className="text-[8px] sm:text-[10px] font-mono text-pink-400 font-bold">
              4763 KM // OK
            </span>
          </div>

          {/* Corner Tech Brackets */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-pink-400" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-pink-400" />
        </>
      )}

      {/* 13. DISCO GLITTER (Vũ Trường Disco) */}
      {filterId === 'disco_glitter' && (
        <>
          {/* Disco Ball in top corner */}
          <div className="absolute top-1 right-2 text-xl sm:text-3xl animate-bounce filter drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]">
            🪩
          </div>

          {/* Colorful Light spots dancing */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-pink-500/30 blur-sm animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-full bg-cyan-400/30 blur-sm animate-ping delay-100" />
          <div className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full bg-yellow-400/30 blur-sm animate-ping delay-200" />

          {/* Music Notes */}
          <div className="absolute bottom-3 left-3 text-xs sm:text-base animate-bounce">🎵</div>
          <div className="absolute top-8 left-3 text-xs sm:text-base animate-bounce delay-150">✨</div>
        </>
      )}

      {/* 14. UNDERWATER (Thủy Cung Mê Kông) */}
      {filterId === 'underwater' && (
        <>
          {/* Animated Water Bubbles */}
          <div className="absolute bottom-2 left-2 w-3 h-3 sm:w-5 sm:h-5 rounded-full border border-cyan-200 bg-cyan-300/30 animate-bounce" />
          <div className="absolute bottom-10 left-5 w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-cyan-200 bg-cyan-300/30 animate-pulse" />
          <div className="absolute bottom-6 right-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-cyan-200 bg-cyan-300/30 animate-bounce delay-100" />
          <div className="absolute bottom-16 right-8 w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-cyan-200 bg-cyan-300/30 animate-pulse" />

          {/* Little Swimming Fish */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs sm:text-base animate-pulse">
            <span>🐠</span>
            <span>🫧</span>
            <span>🐟</span>
          </div>

          {/* Blue water ripples border */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 via-transparent to-teal-900/20 pointer-events-none" />
        </>
      )}

      {/* 15. POP ART (Pop Art Hoạt Hình) */}
      {filterId === 'pop_art' && (
        <>
          {/* Comic Action Starburst */}
          <div className="absolute top-2 right-2 bg-yellow-400 text-slate-950 font-black text-[9px] sm:text-xs px-1.5 py-0.5 rounded-sm transform rotate-12 border-2 border-black shadow-[2px_2px_0px_#000]">
            WOW!
          </div>

          {/* Comic Action Bubble */}
          <div className="absolute bottom-2 left-2 bg-pink-500 text-white font-black text-[8px] sm:text-[10px] px-2 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000]">
            VUI QUÁ! 🔥
          </div>

          {/* Halftone Dot Frame */}
          <div className="absolute inset-0 border-2 sm:border-4 border-black pointer-events-none" />
        </>
      )}
    </div>
  );
};
