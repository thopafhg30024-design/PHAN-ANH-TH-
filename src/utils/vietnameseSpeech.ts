// Utility for High-Quality Vietnamese Female Speech Synthesis & Accurate Phonetic Pronunciation
// Specifically tailored for Mekong Geography 11 Curriculum & Student Research Dossier

export interface SpeechVoiceOption {
  voice: SpeechSynthesisVoice;
  isFemale: boolean;
  label: string;
}

/**
 * Accurately normalize text to prevent speech synthesis mispronunciation in Vietnamese.
 * Converts symbols, abbreviations, geographical names, units, and curriculum terms into standard spoken Vietnamese.
 */
export function normalizeVietnamesePhonetics(raw: string, isEn: boolean = false): string {
  if (!raw) return '';

  // 1. Strip Markdown formatting, code blocks, URLs, and icons
  let clean = raw
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/###\s*/g, '')
    .replace(/##\s*/g, '')
    .replace(/#\s*/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[-*•+]/g, ' ')
    .replace(/💡|🐜|✨|🌊|🐟|🐲|🧭|📘|🏛️|📊|🌱|⚡|🧩|🎒|🌾|🏫|🎙️|⭐|✅|❌|🔍|🔔|🚀|📈|🛡️|⚠️|📌|🌍|💧|🎉|👏|❤️|🔥|🏆|🥇|🥈|🥉/g, ' ')
    .replace(/[|—–_]/g, ' ');

  if (isEn) {
    return clean
      .replace(/\bMRC\b/g, 'Mekong River Commission')
      .replace(/\bkm²\b/gi, 'square kilometers')
      .replace(/\bkm³\b/gi, 'cubic kilometers')
      .replace(/\bm³\/s\b/gi, 'cubic meters per second')
      .replace(/\bm³\b/gi, 'cubic meters')
      .replace(/\bkm\b/gi, 'kilometers')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // 2. Specific Key Quantities of Mekong Basin (preventing number segmentation errors)
  clean = clean
    .replace(/4[., ]?763\s*km\b/gi, 'bốn nghìn bảy trăm sáu mươi ba ki-lô-mét')
    .replace(/795[., ]?000\s*(?:km²|km2)\b/gi, 'bảy trăm chín mươi lăm nghìn ki-lô-mét vuông')
    .replace(/475\s*(?:tỉ|tỷ)\s*(?:m³|m3)\b/gi, 'bốn trăm bảy mươi lăm tỉ mét khối')
    .replace(/40[., ]?000\s*(?:km²|km2)\b/gi, 'bốn mươi nghìn ki-lô-mét vuông')
    .replace(/160\s*triệu\s*tấn\b/gi, 'một trăm sáu mươi triệu tấn')
    .replace(/47[., ]?500\s*ha\b/gi, 'bốn mươi bảy nghìn năm trăm héc-ta')
    .replace(/17[.,]2\s*triệu\b/gi, 'mười bảy phẩy hai triệu')
    .replace(/65[., ]?000\s*(?:km²|km2)\b/gi, 'sáu mươi lăm nghìn ki-lô-mét vuông');

  // 3. Normalized Educational & Geographic Acronyms
  clean = clean
    .replace(/\bĐBSCL\b/g, 'Đồng bằng sông Cửu Long')
    .replace(/\bĐB Sông Cửu Long\b/gi, 'Đồng bằng sông Cửu Long')
    .replace(/\bMRC\b/g, 'Ủy hội sông Mê Kông quốc tế')
    .replace(/\bMSHS\b/g, 'Mã số học sinh')
    .replace(/\bFHG30024\b/gi, 'F H G ba không không hai bốn')
    .replace(/\bTH,\s*THCS\s*&\s*THPT\b/gi, 'Tiểu học, Trung học cơ sở và Trung học phổ thông')
    .replace(/\bTH,\s*THCS\s*và\s*THPT\b/gi, 'Tiểu học, Trung học cơ sở và Trung học phổ thông')
    .replace(/\bTHPT\b/g, 'Trung học phổ thông')
    .replace(/\bTHCS\b/g, 'Trung học cơ sở')
    .replace(/\bTH\s+FPT\b/gi, 'Tiểu học F P T')
    .replace(/\bFPT\b/g, 'Ép Pi Ti')
    .replace(/\bGDPT\s*2018\b/gi, 'Giáo dục phổ thông hai nghìn không trăm mười tám')
    .replace(/\bGDPT\b/g, 'Giáo dục phổ thông')
    .replace(/\bBĐKH\b/g, 'Biến đổi khí hậu')
    .replace(/\bUBND\b/g, 'Ủy ban nhân dân')
    .replace(/\b120\/NQ-CP\b|\bNQ\s*120\/NQ-CP\b|\bNghị quyết 120\/NQ-CP\b/gi, 'Nghị quyết một trăm hai mươi của Chính phủ')
    .replace(/\bNQ\s*120\b/gi, 'Nghị quyết một trăm hai mươi')
    .replace(/\b32\/2018\/TT-BGDĐT\b/gi, 'Thông tư ba mươi hai năm hai nghìn không trăm mười tám của Bộ Giáo dục và Đào tạo')
    .replace(/\bTT-BGDĐT\b|\bBGDĐT\b|\bBGD&ĐT\b/gi, 'Bộ Giáo dục và Đào tạo')
    .replace(/\bSGK\b/gi, 'Sách giáo khoa')
    .replace(/\bYCCĐ\b/gi, 'Yêu cầu cần đạt')
    .replace(/\bPNPCA\b/g, 'Quy trình tham vấn trước P N P C A')
    .replace(/\bPWUM\b/g, 'Quy chế giám sát sử dụng nước')
    .replace(/\bPMFM\b/g, 'Quy chế duy trì dòng chảy')
    .replace(/\bPWQ\b/g, 'Quy chế chất lượng nước')
    .replace(/\bGIS\b/g, 'hệ thông tin địa lí G I S')
    .replace(/\bSTEM\b/gi, 'xờ-tem')
    .replace(/\bAI\b/g, 'trí tuệ nhân tạo A I')
    .replace(/\bUNESCO\b/gi, 'U-nét-xcô')
    .replace(/\bFAO\b/g, 'Tổ chức Nông lương F A O')
    .replace(/\bIUCN\b/g, 'Tổ chức Bảo tồn Thiên nhiên Quốc tế')
    .replace(/\bWWF\b/g, 'Tổ chức Quốc tế về Bảo tồn Thiên nhiên W W F');

  // 4. Geographical Proper Names pronunciation tuning
  clean = clean
    .replace(/\bTonle Sap\b|\bTonlé Sap\b/gi, 'Tôn-lê Sáp')
    .replace(/\bLancang\b/gi, 'Lan Thương')
    .replace(/\bKra\b/g, 'Kờ-ra')
    .replace(/\bMekong\b/gi, 'Mê Kông')
    .replace(/\bMê Công\b/gi, 'Mê Kông')
    .replace(/\bHậu Giang\b/g, 'Hậu Giang')
    .replace(/\bTiền Giang\b/g, 'Tiền Giang')
    .replace(/\bCửu Long\b/g, 'Cửu Long');

  // 5. Units of Measurement & Symbols
  clean = clean
    .replace(/(\d+(?:[.,]\d+)?)\s*‰/g, '$1 phần nghìn')
    .replace(/4‰|4 ‰/g, 'bốn phần nghìn')
    .replace(/1‰|1 ‰/g, 'một phần nghìn')
    .replace(/(\d+(?:[.,]\d+)?)\s*%/g, '$1 phần trăm')
    .replace(/(\d+(?:[.,]\d+)?)\s*(?:km²|km2)\b/gi, '$1 ki-lô-mét vuông')
    .replace(/(\d+(?:[.,]\d+)?)\s*(?:km³|km3)\b/gi, '$1 ki-lô-mét khối')
    .replace(/(\d+(?:[.,]\d+)?)\s*(?:m³\/s|m3\/s)\b/gi, '$1 mét khối trên giây')
    .replace(/(\d+(?:[.,]\d+)?)\s*(?:m³|m3)\b/gi, '$1 mét khối')
    .replace(/(\d+(?:[.,]\d+)?)\s*km\/h\b/gi, '$1 ki-lô-mét trên giờ')
    .replace(/(\d+(?:[.,]\d+)?)\s*cm\/năm\b/gi, '$1 xen-ti-mét mỗi năm')
    .replace(/(\d+(?:[.,]\d+)?)\s*mm\/năm\b/gi, '$1 mi-li-mét mỗi năm')
    .replace(/(\d+(?:[.,]\d+)?)\s*km\b/gi, '$1 ki-lô-mét')
    .replace(/(\d+(?:[.,]\d+)?)\s*cm\b/gi, '$1 xen-ti-mét')
    .replace(/(\d+(?:[.,]\d+)?)\s*mm\b/gi, '$1 mi-li-mét')
    .replace(/(\d+(?:[.,]\d+)?)\s*ha\b/gi, '$1 héc-ta')
    .replace(/(\d+(?:[.,]\d+)?)\s*MW\b/gi, '$1 mê-ga-oát')
    .replace(/(\d+(?:[.,]\d+)?)\s*GW\b/gi, '$1 ghi-ga-oát')
    .replace(/(\d+(?:[.,]\d+)?)\s*kWh\b/gi, '$1 ki-lô-oát giờ')
    .replace(/(\d+(?:[.,]\d+)?)\s*tấn\/năm\b/gi, '$1 tấn mỗi năm')
    .replace(/(\d+(?:[.,]\d+)?)\s*(?:tỉ|tỷ)\s*USD\b/gi, '$1 tỉ đô la Mỹ')
    .replace(/(\d+(?:[.,]\d+)?)\s*triệu\s*USD\b/gi, '$1 triệu đô la Mỹ')
    .replace(/(\d+(?:[.,]\d+)?)\s*USD\b/gi, '$1 đô la Mỹ')
    .replace(/(\d+)\s*°C\b/gi, '$1 độ C')
    .replace(/°C\b/gi, 'độ C');

  // 6. Common abbreviations and Roman numerals in Vietnamese texts
  clean = clean
    .replace(/\bv\.v\.\.\.|\bv\.v\.\b/gi, 'vân vân')
    .replace(/\bđ\/c:\s*|\bĐ\/c:\s*/gi, 'địa chỉ: ')
    .replace(/\bđ\/c\b|\bĐ\/c\b/g, 'địa chỉ')
    .replace(/\bTp\.\s*|\bTP\.\s*/g, 'Thành phố ')
    .replace(/\bTx\.\s*|\bTX\.\s*/g, 'Thị xã ')
    .replace(/\bH\.\s*/g, 'Huyện ')
    .replace(/\bX\.\s*/g, 'Xã ')
    .replace(/\bP\.\s*/g, 'Phường ')
    .replace(/\bQ\.\s*/g, 'Quận ')
    .replace(/\bĐịa lí\s+11\b/gi, 'Địa lí mười một')
    .replace(/\bĐịa lí\s+XI\b/gi, 'Địa lí mười một')
    .replace(/\bthế kỉ\s+XXI\b|\bthế kỷ\s+XXI\b/gi, 'thế kỉ hai mươi mốt')
    .replace(/\bthế kỉ\s+XX\b|\bthế kỷ\s+XX\b/gi, 'thế kỉ hai mươi')
    .replace(/\bChuyên đề\s+I\b/gi, 'Chuyên đề một')
    .replace(/\bChuyên đề\s+II\b/gi, 'Chuyên đề hai')
    .replace(/\bChuyên đề\s+III\b/gi, 'Chuyên đề ba')
    .replace(/\bPhần\s+I\b/gi, 'Phần một')
    .replace(/\bPhần\s+II\b/gi, 'Phần hai')
    .replace(/\bPhần\s+III\b/gi, 'Phần ba')
    .replace(/\bCấp độ\s+I\b/gi, 'Cấp độ một')
    .replace(/\bCấp độ\s+II\b/gi, 'Cấp độ hai')
    .replace(/\bCấp độ\s+III\b/gi, 'Cấp độ ba')
    .replace(/\bCấp độ\s+IV\b/gi, 'Cấp độ bốn');

  // 7. Normalize multiple whitespaces and trim
  return clean.replace(/\s+/g, ' ').trim();
}

/**
 * Detect whether a given SpeechSynthesisVoice is female based on name, gender tag, or platform heuristics.
 */
export function isVoiceFemale(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name.toLowerCase();
  
  // Specific known male indicators to strictly reject
  if (name.includes('namminh') || name.includes('male') || name.includes('david') || name.includes('george') || name.includes('nguyen')) {
    return false;
  }

  // Specific known Vietnamese female voices across Edge, Chrome, Apple, Android
  if (
    name.includes('hoaimy') ||   // Microsoft HoaiMy Online (Natural) - Vietnam
    name.includes('linh') ||     // Apple Linh (Vietnam)
    name.includes('mai') ||      // Apple Mai
    name.includes('lan') ||      // Vietnamese female name
    name.includes('nga') ||
    name.includes('huong') ||
    name.includes('female') ||
    name.includes('woman') ||
    name.includes('nữ') ||
    name.includes('nu') ||
    name.includes('google tiếng việt') || // Google's official Vietnamese TTS is a gentle female voice
    name.includes('google vietnamese')
  ) {
    return true;
  }

  // Fallback heuristic: If it doesn't say male, in Chrome "Google tiếng Việt" is female
  return true;
}

/**
 * Finds the highest quality Vietnamese FEMALE voice available in the browser.
 */
export function getBestVietnameseFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // Filter Vietnamese voices
  const viVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
  if (viVoices.length === 0) {
    // If no Vietnamese voice is installed, find natural female voice in any language
    const femaleFallback = voices.find(v => isVoiceFemale(v));
    return femaleFallback || voices[0] || null;
  }

  // Ranked priority for top-quality Vietnamese Female Voices:
  // 1. Microsoft Hoài My Natural (Windows/Edge)
  const hoaiMy = viVoices.find(v => v.name.toLowerCase().includes('hoaimy'));
  if (hoaiMy) return hoaiMy;

  // 2. Apple Linh (macOS / iOS / Safari)
  const appleLinh = viVoices.find(v => v.name.toLowerCase().includes('linh'));
  if (appleLinh) return appleLinh;

  // 3. Apple Mai or other Vietnamese female names
  const appleMai = viVoices.find(v => v.name.toLowerCase().includes('mai') || v.name.toLowerCase().includes('lan'));
  if (appleMai) return appleMai;

  // 4. Google Tiếng Việt (Chrome, Android - standard female narrator)
  const googleVi = viVoices.find(v => v.name.toLowerCase().includes('google'));
  if (googleVi) return googleVi;

  // 5. Any voice containing female keywords
  const femaleKeywordVoice = viVoices.find(v => isVoiceFemale(v));
  if (femaleKeywordVoice) return femaleKeywordVoice;

  // 6. Exclude explicit male voices (NamMinh, etc.) if possible
  const nonMaleVoice = viVoices.find(v => !v.name.toLowerCase().includes('namminh') && !v.name.toLowerCase().includes('male'));
  if (nonMaleVoice) return nonMaleVoice;

  return viVoices[0];
}

/**
 * Optimal Voice Tuning for Female Narrator:
 * Pitch 1.12 - 1.15 gives a clear, gentle, youthful female voice
 * Rate 0.98 gives natural pedagogical pacing
 */
export const FEMALE_VOICE_CONFIG = {
  pitch: 1.12,
  rate: 0.98,
  volume: 1.0,
};
