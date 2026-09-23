import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// System Instruction for "Kiến Sáng"
const KIEN_SANG_SYSTEM_PROMPT = `
Bạn là "Kiến Sáng" (KIẾN SÁNG 🐜✨) - Chú kiến thông thái, tràn đầy năng lượng, siêu dí dỏm và thân thiện, là Linh vật Học tập của Trường TH, THCS & THPT FPT Hậu Giang (tọa lạc tại 61C Ấp 6, xã Vị Thủy, Hậu Giang / Cần Thơ, gắn liền với kênh xáng Xà No và vùng ĐBSCL).

Đặc điểm nhân vật:
- Tên gọi: KIẾN SÁNG (chữ "Kiến" trong Kiến thức và Chú Kiến chăm chỉ; "Sáng" trong Tỏa sáng, Sáng tạo, Trí tuệ).
- Ngoại hình: Chú kiến hoạt hình màu cam - trắng năng động, đeo 2 chóp ăng-ten xanh dương, đeo ba lô học sinh màu xanh lá, ánh mắt luôn nháy tinh nghịch với ngôi sao vàng lấp lánh và tay luôn giơ ngón cái "Like #1" khích lệ bạn học!
- Giọng điệu: Thân thiện, vui vẻ, xưng "Kiến Sáng" hoặc "mình", gọi người dùng là "bạn", "học sinh chăm chỉ" hoặc "bạn thân mến". Thường kèm icon dễ thương (🐜✨, 🌊, 🌾, 🏫, 🎒, 💡).
- Chuyên môn:
  1. Toàn bộ kiến thức về sông Mê Kông dài 4.763 km từ cao nguyên Tây Tạng (Tanggula 5.224m), qua Trung Quốc (Lan Thương Giang), Myanmar, Lào, Thái Lan, Campuchia (Biển Hồ Tonle Sap) và Việt Nam (ĐBSCL & 9 cửa sông Cửu Long).
  2. Kiến thức chuyên đề Địa lí 11 Chương trình GDPT 2018: Hiệp định Hợp tác Mê Kông 1995, Ủy hội sông Mê Công (MRC), Quy trình PNPCA (Thông báo, Tham vấn trước, Thỏa thuận).
  3. Mối quan hệ thủy văn Tonle Sap - ĐBSCL, hiện tượng dòng sông chảy ngược, vai trò của lũ phù sa, an ninh nguồn nước, đập thủy điện thượng nguồn, xâm nhập mặn, hạn hán.
  4. Chiến lược thích ứng "Thuận thiên" theo Nghị quyết 120/NQ-CP của Chính phủ Việt Nam.
  5. Đời sống, văn hóa chợ nổi, đờn ca tài tử Nam Bộ, tuyến kênh xáng Xà No và Trường TH, THCS & THPT FPT Hậu Giang.

Yêu cầu câu trả lời:
- Luôn trả lời bằng tiếng Việt chuẩn mực, giàu cảm hứng học tập, ngắn gọn, súc tích, phân đoạn rõ ràng bằng bullet point để người học nắm bắt nhanh nhất.
- Trả lời thẳng vào trọng tâm câu hỏi, tránh dài dòng rườm rà.
- Ứng dụng hỗ trợ đọc bài (Text-to-Speech) và nói chuyện (Speech-to-Text) bằng giọng nói tiếng Việt trực tiếp cho học sinh: vì vậy văn phong cần lưu loát, tự nhiên, ngắt câu rõ ràng, giàu tính sư phạm để khi đọc thành tiếng học sinh nghe rõ và dễ tiếp thu.
- Điều chỉnh độ sâu kiến thức phù hợp theo cấp học (Tiểu học: sinh động, ngắn gọn; THCS: rõ ràng, trực quan; THPT: chuẩn xác thuật ngữ SGK Địa lí 11, sâu sắc về số liệu và chính sách).
- Nếu người dùng yêu cầu đố vui (quiz), hãy đặt câu hỏi hay kèm 4 đáp án A, B, C, D và gợi ý vui nhộn!
`;

// High-speed in-memory response cache (<2ms response time for recurring queries)
const chatCache = new Map<string, { reply: string; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 60 minutes TTL

function getCacheKey(message: string, level: string, language: string): string {
  const normalizedMsg = message.toLowerCase().trim().replace(/[?!.,;:_]/g, '');
  return `${level || 'default'}:${language || 'vi'}:${normalizedMsg}`;
}

// API route for Chatbot Kiến Sáng with high-speed caching & fast generation
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, level, language } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ' });
    }

    const cacheKey = getCacheKey(message, level, language);
    const cached = chatCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json({
        reply: cached.reply,
        mode: 'gemini_ai_cached',
        fastCached: true
      });
    }

    const client = getGeminiClient();

    if (!client) {
      // Gemini API Key is not set, return guided response indicating fallback mode is ready
      return res.json({
        reply: null,
        mode: 'local_fallback',
        message: 'No GEMINI_API_KEY detected. Use client local knowledge engine.'
      });
    }

    const isEn = language === 'en';

    // Prepare prompt with grade context and language directive
    let gradePromptContext = '';
    if (isEn) {
      gradePromptContext = level === 'primary'
        ? '[IMPORTANT: Respond in English, concise and fast] Target audience is a PRIMARY school student. Use fun, warm, easy-to-understand analogies, short paragraphs, and encouraging emojis.'
        : level === 'secondary'
        ? '[IMPORTANT: Respond in English, concise and fast] Target audience is a SECONDARY school student. Explain clear causes and effects, key geography landmarks, and essential facts clearly.'
        : '[IMPORTANT: Respond in English, concise and fast] Target audience is a GRADE 11 HIGH SCHOOL student. Use accurate geographical terms from the Vietnam Geography Grade 11 curriculum, 1995 Mekong Agreement provisions, MRC 5 water procedures (PNPCA, PWUM...), sediment dynamics, and Government Resolution 120/NQ-CP nature-based development.';
    } else {
      gradePromptContext = level === 'primary'
        ? '[Quan trọng: Trả lời tiếng Việt súc tích, nhanh gọn] Người hỏi là học sinh TIỂU HỌC: Giải thích thật dễ hiểu, sinh động, ngắn gọn.'
        : level === 'secondary'
        ? '[Quan trọng: Trả lời tiếng Việt súc tích, nhanh gọn] Người hỏi là học sinh THCS: Giải thích rõ ràng nguyên nhân - kết quả, các địa danh và số liệu cơ bản.'
        : '[Quan trọng: Trả lời tiếng Việt chuẩn xác, súc tích] Người hỏi là học sinh THPT / Ôn thi Địa lí 11: Trả lời chuẩn xác thuật ngữ khoa học SGK Địa lí 11, các điều khoản Hiệp định Mê Kông 1995, quy trình PNPCA của MRC, số liệu MRC 2022 và Nghị quyết 120/NQ-CP.';
    }

    // Construct contents including conversation turns (limit to last 4 turns for speed)
    const conversationTurns: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.slice(-4).forEach((h: { sender: string; text: string }) => {
        if (h.sender === 'user') {
          conversationTurns.push({ role: 'user', parts: [{ text: h.text }] });
        } else if (h.sender === 'bot') {
          conversationTurns.push({ role: 'model', parts: [{ text: h.text }] });
        }
      });
    }

    conversationTurns.push({
      role: 'user',
      parts: [{ text: `${gradePromptContext}\n\nCâu hỏi: ${message}` }]
    });

    // Execute with a 4.5s fast timeout to guarantee rapid user response
    const generatePromise = client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationTurns,
      config: {
        systemInstruction: KIEN_SANG_SYSTEM_PROMPT,
        temperature: 0.6,
        maxOutputTokens: 600
      }
    });

    const timeoutPromise = new Promise<{ text?: string }>((_, reject) => {
      setTimeout(() => reject(new Error('Fast timeout exceeded')), 4500);
    });

    const response = await Promise.race([generatePromise, timeoutPromise]) as any;
    const replyText = response.text || 'Kiến Sáng đang lắng nghe đây! Bạn có câu hỏi nào khác về sông Mê Kông nữa không? 🐜✨';

    // Store in cache for future instant retrieval
    chatCache.set(cacheKey, { reply: replyText, timestamp: Date.now() });

    return res.json({
      reply: replyText,
      mode: 'gemini_ai'
    });
  } catch (error: any) {
    console.error('Lỗi API /api/chat:', error);
    return res.json({
      reply: null,
      mode: 'fallback_ready',
      error: error.message || 'Lỗi xử lý yêu cầu AI'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    mascot: 'Kiến Sáng 🐜✨'
  });
});

// Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
