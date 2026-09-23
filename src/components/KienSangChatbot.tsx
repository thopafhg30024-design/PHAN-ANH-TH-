import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Award, 
  HelpCircle, 
  Bot, 
  User, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap,
  MapPin,
  ChevronRight,
  Flame,
  ThumbsUp,
  Mic,
  MicOff,
  Square,
  Radio,
  AlertCircle,
  Play,
  Headphones,
  Video,
  Phone
} from 'lucide-react';
import { EducationLevel, Language } from '../types';
import { soundFx } from '../utils/audio';
import { KienSangFaceTimeCall } from './KienSangFaceTimeCall';
import { 
  LEVEL_KNOWLEDGE_RESPONSES, 
  LEVEL_QUIZZES, 
  LocalQuizItem 
} from '../data/chatbotKnowledgeData';
import { 
  normalizeVietnamesePhonetics, 
  getBestVietnameseFemaleVoice, 
  FEMALE_VOICE_CONFIG, 
  isVoiceFemale 
} from '../utils/vietnameseSpeech';

// Mascot image assets
import kienSangAvatar from '../assets/images/kien_sang_mascot_1789090892621.jpg';
import kienSangBanner from '../assets/images/kien_sang_banner_1789090943772.jpg';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isQuiz?: boolean;
  quizOptions?: string[];
  quizCorrectIndex?: number;
  quizExplanation?: string;
  isAnswered?: boolean;
  userSelectedOption?: number;
  isFaceTimeTrigger?: boolean;
}

interface KienSangChatbotProps {
  selectedLevel: EducationLevel;
  language?: Language;
  onScoreReward?: (points: number) => void;
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string | null;
}

export const KienSangChatbot: React.FC<KienSangChatbotProps> = ({
  selectedLevel,
  language: rawLanguage = 'vi',
  onScoreReward,
  isOpen,
  onClose,
  initialTopic
}) => {
  const currentLanguage: Language = rawLanguage === 'en' ? 'en' : 'vi';
  const isEn = currentLanguage === 'en';

  const getWelcomeMessage = (level: EducationLevel, lang: Language): string => {
    if (lang === 'en') {
      if (level === 'primary') {
        return `Hello little explorer! I'm **Kien Sang** (KIẾN SÁNG 🐜✨) - your cheerful, friendly tutor mascot from FPT Hau Giang School!\n\nAsk me anything fun about the giant **Mekong River**, the playful **Nine Dragon river mouths**, or the amazing **giant fish**! \n\n📞 **New Feature:** Tap the green **FaceTime** button to video call me with live camera and speech! 🎒🌊`;
      }
      if (level === 'secondary') {
        return `Hello secondary school student! I'm **Kien Sang** (KIẾN SÁNG 🐜✨) - your AI Tutor from FPT Hau Giang School.\n\nI can help you explore the **4,763 km journey of the Mekong**, the **reverse flow of Tonle Sap Lake**, the **MRC Mekong Agreement**, and geographical facts of the Mekong Delta! \n\n📞 **1-on-1 FaceTime Video Call:** Tap **FaceTime** at the top or beside the input box to start a live video call with me! 🧭📘`;
      }
      return `Welcome Grade 11 student! I'm **Kien Sang** (KIẾN SÁNG 🐜✨) - Academic AI Assistant from FPT Primary, Secondary & High School Hau Giang.\n\nI specialize in **Grade 11 Geography Curriculum - Topic 2: Mekong River Basin**: the 4 core MRC roles, 5 water procedures (PNPCA, PMFM...), 6 responsible contributions of Vietnam, and Resolution 120/NQ-CP Nature-based strategy.\n\n📞 **FaceTime HD Video Call:** Tap **FaceTime** in the header or next to the chatbox input to start a 1-on-1 video discussion with live speech recognition! 🏛️📊`;
    }

    if (level === 'primary') {
      return `Chào bạn nhỏ! Mình là chú **Kiến Sáng** (KIẾN SÁNG 🐜✨) - Chú kiến thông thái và vui vẻ đồng hành cùng các bạn học sinh Trường FPT Hậu Giang!\n\nBạn có thể **nói chuyện trực tiếp** với mình qua Micro, bấm **Nghe đọc bài** hoặc bấm **Gọi FaceTime** 📞 màu xanh ở trên để gọi điện thoại video gặp trực tiếp mình nhé! 🎒🌊`;
    }
    if (level === 'secondary') {
      return `Chào bạn học sinh THCS! Mình là **Kiến Sáng** (KIẾN SÁNG 🐜✨) - Trợ lý học tập Địa lí từ Trường TH, THCS & THPT FPT Hậu Giang.\n\nKiến Sáng có thể **trò chuyện bằng giọng nói tiếng Việt**, **đọc to bài học** và **gọi điện video FaceTime 1-1** trực tiếp qua camera! Bấm nút **Gọi FaceTime** 📞 ở góc trên hoặc cạnh thanh nhập để gọi điện cho Kiến Sáng bất cứ lúc nào nhé! 🧭📘`;
    }
    return `Chào bạn học sinh THPT Lớp 11! Mình là **Kiến Sáng** (KIẾN SÁNG 🐜✨) - Trợ lý học tập & nghiên cứu Chuyên đề Địa lí 11 FPT Hậu Giang.\n\nKiến Sáng hỗ trợ bạn **đọc bài giảng bằng tiếng Việt chuẩn**, **trò chuyện đàm thoại 2 chiều** và **gọi điện video FaceTime 1-1** trực tiếp qua camera & nhận diện giọng nói: phân tích **Chuyên đề 2: Một số vấn đề về lưu vực sông Mê Kông** (Chương trình GDPT 2018), 4 vai trò MRC, 5 thủ tục nước (PNPCA, PWUM...), 6 đóng góp của Việt Nam và Nghị quyết 120/NQ-CP!\n\n📞 **Bấm nút Gọi FaceTime** (màu xanh lá ở thanh tiêu đề hoặc cạnh thanh gõ tin nhắn) để bắt đầu cuộc gọi video học tập 1-1 ngay nhé! 🏛️📊`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: getWelcomeMessage(selectedLevel, currentLanguage),
      timestamp: isEn ? 'Just now' : 'Vừa xong'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(true); // Voice mode ON by default for hands-free interactive voice
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  // Advanced Speech Synthesis State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0); // 0.85, 1.0, 1.15
  const [voiceGender, setVoiceGender] = useState<'female' | 'male'>('female'); // Female voice by default
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [totalChunks, setTotalChunks] = useState<number>(0);
  const [showVoiceSettings, setShowVoiceSettings] = useState<boolean>(false);
  const [isFaceTimeOpen, setIsFaceTimeOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechQueueRef = useRef<string[]>([]);
  const currentChunkIndexRef = useRef<number>(0);
  const keepAliveIntervalRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);

  // Load and cache browser voices with priority for high-clarity Vietnamese FEMALE voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (!allVoices || allVoices.length === 0) return;
      setAvailableVoices(allVoices);

      if (!isEn) {
        if (voiceGender === 'female') {
          const bestFemale = getBestVietnameseFemaleVoice(allVoices);
          if (bestFemale) {
            setSelectedVoice(bestFemale);
            return;
          }
        }
        // If male or fallback
        const viVoices = allVoices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
        const fallbackVi = voiceGender === 'male' 
          ? (viVoices.find(v => !isVoiceFemale(v)) || viVoices[0])
          : (viVoices.find(v => isVoiceFemale(v)) || viVoices[0]);
        setSelectedVoice(fallbackVi || null);
      } else {
        const enVoice = allVoices.find(v => v.lang.toLowerCase().startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || isVoiceFemale(v))) || allVoices.find(v => v.lang.toLowerCase().startsWith('en'));
        setSelectedVoice(enVoice || null);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isEn, voiceGender]);

  // Clean markdown, symbols, and expand abbreviations into standard spoken Vietnamese phonetics
  const cleanTextForSpeech = (raw: string): string => {
    return normalizeVietnamesePhonetics(raw, isEn);
  };

  // Split long texts into natural sentence chunks to prevent browser speech timeout (Chromium >15s bug)
  const splitIntoSpeechChunks = (text: string): string[] => {
    // Split by punctuation: period, exclamation, question mark, colon, newline
    const sentences = text
      .split(/(?<=[.!?:\n])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if ((currentChunk + ' ' + sentence).length > 130) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence;
      }
    }
    if (currentChunk) chunks.push(currentChunk.trim());

    return chunks.length > 0 ? chunks : [text];
  };

  // Speak chunks sequentially with browser SpeechSynthesis & keep-alive
  const playNextChunk = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (currentChunkIndexRef.current >= speechQueueRef.current.length) {
      // Completed reading all chunks!
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      setCurrentChunkIndex(0);
      setTotalChunks(0);
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
        keepAliveIntervalRef.current = null;
      }
      return;
    }

    const chunk = speechQueueRef.current[currentChunkIndexRef.current];
    setCurrentChunkIndex(currentChunkIndexRef.current + 1);

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = isEn ? 'en-US' : 'vi-VN';
    utterance.rate = speechSpeed;
    // Sweet, clear and natural female voice pitch
    utterance.pitch = voiceGender === 'female' ? FEMALE_VOICE_CONFIG.pitch : 0.96;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      const allVoices = window.speechSynthesis.getVoices();
      if (!isEn && voiceGender === 'female') {
        const femaleVoice = getBestVietnameseFemaleVoice(allVoices);
        if (femaleVoice) utterance.voice = femaleVoice;
      } else {
        const targetPrefix = isEn ? 'en' : 'vi';
        const fallback = allVoices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(targetPrefix));
        if (fallback) utterance.voice = fallback;
      }
    }

    utterance.onend = () => {
      currentChunkIndexRef.current += 1;
      playNextChunk();
    };

    utterance.onerror = (e) => {
      console.warn('Speech chunk error, advancing to next:', e);
      currentChunkIndexRef.current += 1;
      playNextChunk();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Main function: Speak text out loud in Vietnamese with full sentence chunking
  const speakText = (text: string, messageId?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      if (speakingMessageId === messageId && isSpeaking) {
        stopSpeaking();
        return;
      }

      stopSpeaking();

      const clean = cleanTextForSpeech(text);
      if (!clean) return;

      const chunks = splitIntoSpeechChunks(clean);
      speechQueueRef.current = chunks;
      currentChunkIndexRef.current = 0;
      setTotalChunks(chunks.length);
      setCurrentChunkIndex(1);
      setIsSpeaking(true);
      if (messageId) setSpeakingMessageId(messageId);

      // Start keep-alive timer to prevent Chrome from sleeping on long readings
      if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 9000);

      playNextChunk();
    } catch (e) {
      console.warn('Speech synthesis start error:', e);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  const stopSpeaking = () => {
    speechQueueRef.current = [];
    currentChunkIndexRef.current = 0;
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingMessageId(null);
    setCurrentChunkIndex(0);
    setTotalChunks(0);
  };

  // Web Speech Recognition for voice conversation (Speech-to-Text)
  const startListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setVoiceError(isEn 
        ? 'Your browser does not support Web Speech Recognition. Please use Google Chrome, Edge, or Coc Coc.' 
        : 'Trình duyệt chưa hỗ trợ nhận diện giọng nói Web Speech. Hãy dùng Google Chrome, Edge hoặc Cốc Cốc.');
      return;
    }

    stopSpeaking();
    setVoiceError(null);
    setVoiceTranscript('');

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (err) {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionClass();
      recognition.lang = isEn ? 'en-US' : 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setIsVoiceEnabled(true);
        soundFx.playWaterSplash();
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setVoiceTranscript(transcript);
        setInputText(transcript);

        // Auto-send after 0.9s of silence if user has spoken a meaningful query (instant, responsive voice)
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (transcript.trim().length > 3) {
          silenceTimerRef.current = setTimeout(() => {
            if (transcript.trim()) {
              stopListening();
              handleUserSendMessage(transcript.trim());
            }
          }, 900);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceError(isEn 
            ? 'Microphone permission was blocked. Please click the lock icon in the address bar to allow Microphone.' 
            : 'Microphone bị chặn. Hãy bấm vào biểu tượng ổ khóa cạnh thanh địa chỉ trình duyệt để Cho phép (Allow) Micro.');
        } else if (event.error === 'no-speech') {
          // no speech detected
        } else {
          setVoiceError(isEn ? `Microphone error: ${event.error}` : `Lỗi micro: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e: any) {
      console.warn('Failed to start recognition:', e);
      setIsListening(false);
      setVoiceError(e?.message || (isEn ? 'Cannot access microphone' : 'Không thể kết nối Microphone'));
    }
  };

  const stopListening = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    setIsListening(false);
  };

  // Pre-load synthesis voices and cleanup listeners
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopListening();
    };
  }, []);

  // Update welcome message if level or language changes and only 1 message exists
  useEffect(() => {
    setMessages(prev => {
      if (prev.length <= 1) {
        return [
          {
            id: `welcome-${selectedLevel}-${currentLanguage}`,
            sender: 'bot',
            text: getWelcomeMessage(selectedLevel, currentLanguage),
            timestamp: isEn ? 'Just now' : 'Vừa xong'
          }
        ];
      }
      return prev;
    });
  }, [selectedLevel, currentLanguage, isEn]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Handle initial topic if passed
  useEffect(() => {
    if (initialTopic) {
      const askPrompt = isEn
        ? `Kien Sang, please explain in detail about: ${initialTopic}`
        : `Kiến Sáng ơi, hãy chia sẻ cho mình kiến thức chi tiết về: ${initialTopic}`;
      handleUserSendMessage(askPrompt);
    }
  }, [initialTopic, isEn]);

  const getRandomQuiz = (level: EducationLevel): LocalQuizItem => {
    const levelQuizzes = LEVEL_QUIZZES.filter(q => q.level === level);
    if (levelQuizzes.length > 0) {
      return levelQuizzes[Math.floor(Math.random() * levelQuizzes.length)];
    }
    return LEVEL_QUIZZES[Math.floor(Math.random() * LEVEL_QUIZZES.length)];
  };

  const handleUserSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    soundFx.playClick();
    stopListening();
    stopSpeaking();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setVoiceTranscript('');
    setIsTyping(true);

    // Helper to deliver bot response instantly without artificial delays
    const deliverBotReply = (textToDeliver: string, isQuiz = false, quizData?: any, isFaceTime = false) => {
      const botMsgId = `bot-${Date.now()}`;
      const botMsg: Message = {
        id: botMsgId,
        sender: 'bot',
        text: textToDeliver,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...(isQuiz && quizData ? {
          isQuiz: true,
          quizOptions: quizData.options,
          quizCorrectIndex: quizData.correctIndex,
          quizExplanation: quizData.explanation
        } : {}),
        ...(isFaceTime ? { isFaceTimeTrigger: true } : {})
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      soundFx.playCorrect();

      if (isFaceTime) {
        soundFx.playWaterSplash();
        setTimeout(() => {
          stopSpeaking();
          stopListening();
          setIsFaceTimeOpen(true);
        }, 120);
      }

      if (isVoiceEnabled) {
        speakText(textToDeliver, botMsgId);
      }
    };

    // Check if user is asking to call FaceTime (Instant trigger)
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes('facetime') ||
      lowerText.includes('gọi điện') ||
      lowerText.includes('gọi video') ||
      lowerText.includes('video call') ||
      lowerText.includes('call kien sang') ||
      lowerText.includes('call kiến sáng') ||
      lowerText.includes('gọi kiến sáng') ||
      lowerText.includes('gọi cho kiến sáng') ||
      lowerText.includes('gọi điện thoại') ||
      lowerText.includes('bắt máy') ||
      lowerText.includes('face time') ||
      lowerText.includes('muốn gọi') ||
      lowerText.includes('cho gọi') ||
      lowerText.includes('nói chuyện trực tiếp')
    ) {
      const facetimePrompt = isEn
        ? `📞✨ **Connecting FaceTime Video Call with Kien Sang!**\n\nStarting direct 1-on-1 video call with live voice, webcam, and educational subtitles! If your call window didn't open automatically, tap the button below:`
        : `📞✨ **Đang kết nối cuộc gọi Video FaceTime với Kiến Sáng!**\n\nKiến Sáng đang mở màn hình gọi điện thoại video 1-1 trực tiếp với Camera & Micro cho bạn đây. Nếu chưa thấy màn hình cuộc gọi, bạn hãy bấm nút bên dưới:`;

      setTimeout(() => {
        deliverBotReply(facetimePrompt, false, null, true);
      }, 50);
      return;
    }

    // Check if user is asking for a quiz (Instant challenge generation)
    if (
      lowerText.includes('đố vui') || 
      lowerText.includes('quiz') || 
      lowerText.includes('câu hỏi trắc nghiệm') || 
      lowerText.includes('thử tài') ||
      lowerText.includes('trivia') ||
      lowerText.includes('test me')
    ) {
      const quizItem = getRandomQuiz(selectedLevel);
      const quizPrompt = isEn 
        ? `🐜✨ **Quiz Challenge for ${selectedLevel === 'primary' ? 'Primary' : selectedLevel === 'secondary' ? 'Secondary' : 'High School (Gr.11)'}:**\n\n${quizItem.question.en}`
        : `🐜✨ **Câu đố thử tài cấp ${selectedLevel === 'primary' ? 'Tiểu học' : selectedLevel === 'secondary' ? 'THCS' : 'THPT Lớp 11'}:**\n\n${quizItem.question.vi}`;

      setTimeout(() => {
        deliverBotReply(quizPrompt, true, {
          options: isEn ? quizItem.options.en : quizItem.options.vi,
          correctIndex: quizItem.correctIndex,
          explanation: isEn ? quizItem.explanation.en : quizItem.explanation.vi
        });
      }, 60);
      return;
    }

    // High-speed Instant Matching: Check curated knowledge database first for instantaneous response (<50ms)
    const localMatch = LEVEL_KNOWLEDGE_RESPONSES.find(item => 
      item.keywords.some(k => lowerText.includes(k))
    );

    if (localMatch) {
      const langPack = isEn ? localMatch.answer.en : localMatch.answer.vi;
      const matchedAnswer = langPack[selectedLevel] || langPack.highschool;
      setTimeout(() => {
        deliverBotReply(matchedAnswer);
      }, 50);
      return;
    }

    // For open-ended or unique questions, call optimized server API with AbortController (3.5s timeout)
    let replyText: string | null = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text })),
          level: selectedLevel,
          language: currentLanguage
        })
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          replyText = data.reply;
        }
      }
    } catch (err) {
      console.log('Fast knowledge fallback activated:', err);
    }

    // If API timeout or offline, use smart contextual fallback response instantly
    if (!replyText) {
      if (isEn) {
        if (selectedLevel === 'primary') {
          replyText = `🐜✨ **Kien Sang heard your question:** "${text}"!\n\nThe Mekong River is **4,763 km long**, flowing across 6 countries with playful freshwater dolphins and rich biodiversity!\n\n💡 **Quick questions to ask:**\n- *"Why does Tonle Sap Lake flow backward?"*\n- *"What are the Nine Dragon river mouths?"*\n- *"What is FPT Hau Giang School like?"*\n- *"Take a fun quiz (+30 pts)"*`;
        } else if (selectedLevel === 'secondary') {
          replyText = `🐜✨ **Kien Sang received your question:** "${text}"!\n\nThe Mekong River flows **4,763 km** from the Tibetan Plateau to the East Sea, supplying life to over 65 million people.\n\n💡 **Suggested topics:**\n- *"How does Tonle Sap act as a natural balancing reservoir?"*\n- *"What are the 9 estuaries of the Mekong Delta?"*\n- *"What is the significance of the 1995 Mekong Agreement?"*\n- *"Quiz challenge for secondary students (+30 pts)"*`;
        } else {
          replyText = `🐜✨ **Kien Sang received your academic query:** "${text}"!\n\nIn Grade 11 Geography Curriculum, the Mekong River basin (810,000 km², 4,763 km) exemplifies critical transboundary water governance.\n\n💡 **Core academic topics to explore:**\n- *"Explain the 4 core roles of the MRC and 5 water procedures (PNPCA, PWUM...)"*\n- *"What are Vietnam's 6 responsible contributions to the MRC?"*\n- *"Analyze Government Resolution 120/NQ-CP Nature-based adaptation"*;\n- *"Assess upstream hydropower dam impacts on delta sediment starvation"*\n- *"Take Grade 11 review quiz (+30 pts)"*`;
        }
      } else {
        if (selectedLevel === 'primary') {
          replyText = `🐜✨ **Kiến Sáng đã nghe câu hỏi của bạn nhỏ:** "${text}"!\n\nSông Mê Kông dài tận **4 763 km**, chảy qua 6 nước và có những chú cá heo nước ngọt cực kỳ thông minh!\n\n💡 **Bạn nhỏ có thể hỏi Kiến Sáng thêm về:**\n- *"Tại sao Biển Hồ Tonle Sap lại chảy ngược được?"*\n- *"Chín Cửa Sông Cửu Long gồm những cửa nào?"*\n- *"Trường FPT Hậu Giang ở đâu?"*\n- *"Đố vui nhận điểm thưởng (+30đ)"*`;
        } else if (selectedLevel === 'secondary') {
          replyText = `🐜✨ **Kiến Sáng đã ghi nhận câu hỏi của bạn:** "${text}"!\n\nSông Mê Kông dài **4 763 km**, khởi nguồn từ cao nguyên Tây Tạng và là trục sống của hơn 65 triệu người dân trong lưu vực.\n\n💡 **Gợi ý khám phá phù hợp cấp THCS:**\n- *"Cơ chế dòng chảy ngược của Biển Hồ Tonle Sap"*;\n- *"Hệ thống 9 cửa sông Tiền và sông Hậu"*;\n- *"Ý nghĩa của Hiệp định Mê Kông 1995 đối với 4 nước hạ du"*;\n- *"Đố vui trắc nghiệm Địa lí nhận điểm (+30đ)"*`;
        } else {
          replyText = `🐜✨ **Kiến Sáng đã tiếp nhận câu hỏi học thuật của bạn:** "${text}"!\n\nTheo chuẩn Yêu cầu cần đạt Chuyên đề Địa lí 11, lưu vực sông Mê Kông là bài học điển hình về hợp tác quốc tế và an ninh nguồn nước.\n\n💡 **Gợi ý trọng tâm ôn luyện Chuyên đề 11:**\n- *"Trình bày 4 vai trò cốt lõi của MRC và 5 thủ tục kỹ thuật (PNPCA, PMFM...)"*;\n- *"Phân tích 6 đóng góp tích cực, trách nhiệm của Việt Nam trong MRC"*;\n- *"Làm rõ triết lí Thuận thiên theo Nghị quyết 120/NQ-CP của Chính phủ"*;\n- *"Đánh giá tác động của chuỗi đập thủy điện thượng lưu đối với phù sa và sạt lở ĐBSCL"*;\n- *"Thử tài trắc nghiệm Chuyên đề 11 (+30đ)"*`;
        }
      }
    }

    // Deliver immediately with zero artificial lag
    deliverBotReply(replyText);
  };

  const handleSelectQuizAnswer = (msgId: string, optionIdx: number, correctIdx: number) => {
    soundFx.playClick();
    const isCorrect = optionIdx === correctIdx;

    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        return {
          ...m,
          isAnswered: true,
          userSelectedOption: optionIdx
        };
      }
      return m;
    }));

    if (isCorrect) {
      soundFx.playCorrect();
      if (onScoreReward) {
        onScoreReward(30); // Award points for correct quiz answer
      }
      if (isVoiceEnabled) {
        speakText(isEn ? 'Excellent! That is the correct answer!' : 'Chính xác! Bạn trả lời rất xuất sắc!');
      }
    } else {
      soundFx.playWrong();
      if (isVoiceEnabled) {
        speakText(isEn ? 'Not quite right yet. Try checking the explanation!' : 'Chưa chính xác rồi. Bạn hãy xem phần giải thích bên dưới nhé!');
      }
    }
  };

  if (!isOpen) return null;

  const levelBadgeName = selectedLevel === 'primary'
    ? (isEn ? 'Primary' : 'Tiểu học')
    : selectedLevel === 'secondary'
    ? (isEn ? 'Secondary' : 'THCS')
    : (isEn ? 'High School (Gr.11)' : 'THPT Lớp 11');

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized 
        ? 'bottom-4 right-4 w-72 h-14' 
        : 'bottom-4 right-4 w-[95vw] sm:w-[440px] md:w-[480px] h-[620px] max-h-[85vh]'
    }`}>
      <div className="w-full h-full bg-white backdrop-blur-xl border-2 border-amber-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800">
        
        {/* Header with KIẾN SÁNG Branding & Level Badge */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-3 flex items-center justify-between shadow-sm relative overflow-hidden shrink-0">
          <div className="flex items-center gap-3 relative z-10">
            {/* Mascot Avatar with winking look */}
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-white p-0.5 shadow-md border-2 border-white overflow-hidden shrink-0">
                <img 
                  src={kienSangAvatar} 
                  alt="Kiến Sáng Mascot" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-black text-white text-base tracking-wide drop-shadow-xs flex items-center gap-1">
                  <span>KIẾN SÁNG</span>
                  <span className="text-xs bg-white/25 text-white font-bold px-1.5 py-0.2 rounded-full border border-white/40">
                    AI Tutor
                  </span>
                </h3>
                <span className="text-[10px] bg-amber-900/30 text-amber-100 font-bold px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-xs">
                  {levelBadgeName}
                </span>
                <span className="text-[9px] bg-emerald-700/50 text-emerald-100 font-bold px-1.5 py-0.5 rounded-full border border-emerald-300/40 flex items-center gap-0.5" title={isEn ? 'High-speed processing active' : 'Đang kích hoạt xử lý siêu tốc'}>
                  ⚡ {isEn ? 'Fast' : 'Siêu tốc'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-50 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>
                  {isEn 
                    ? 'Mekong River AI Assistant • FPT Hau Giang' 
                    : 'Trợ lý Địa lí Sông Mê Kông • FPT Hậu Giang'}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 relative z-10 text-white">
            {/* FaceTime Video Call Button */}
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                setIsFaceTimeOpen(true);
                soundFx.playWaterSplash();
              }}
              title={isEn ? 'FaceTime 1-on-1 Video Call with Kien Sang' : 'Gọi Video FaceTime 1-1 trực tiếp với Kiến Sáng'}
              className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black shadow-md ring-2 ring-emerald-200/80 hover:scale-105 active:scale-95 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-100"></span>
              </span>
              <Video className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>{isEn ? 'FaceTime' : 'Gọi FaceTime'}</span>
            </button>

            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              title={isEn ? 'Voice & Speech Settings' : 'Cài đặt giọng đọc & âm thanh tiếng Việt'}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                showVoiceSettings ? 'bg-white text-amber-900 shadow-xs' : 'text-white/85 hover:bg-white/20'
              }`}
            >
              <Headphones className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const next = !isVoiceEnabled;
                setIsVoiceEnabled(next);
                if (!next) {
                  stopSpeaking();
                } else {
                  speakText(isEn ? 'Voice reading enabled' : 'Đã bật chế độ giọng nói tiếng Việt');
                }
              }}
              title={isVoiceEnabled ? (isEn ? 'Voice Mode: ON (Click to mute)' : 'Chế độ giọng nói: ĐANG BẬT (Nhấn để tắt)') : (isEn ? 'Voice Mode: OFF (Click to turn on)' : 'Chế độ giọng nói: ĐANG TẮT (Nhấn để bật)')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                isVoiceEnabled ? 'bg-white/30 text-white shadow-xs ring-1 ring-white/50' : 'text-white/75 hover:bg-white/20'
              }`}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-200" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? (isEn ? 'Maximize' : 'Phóng to cửa sổ') : (isEn ? 'Minimize' : 'Thu nhỏ')}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-all text-white/90 cursor-pointer"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onClose();
              }}
              title={isEn ? 'Close chat window' : 'Đóng cửa sổ chat'}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-all text-white/90 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content area when NOT minimized */}
        {!isMinimized && (
          <>
            {/* Dedicated Voice Settings Bar (Expandable) */}
            {showVoiceSettings && (
              <div className="bg-amber-50/95 border-b border-amber-200 px-3.5 py-2.5 text-xs flex flex-col gap-2.5 shrink-0 animate-fadeIn shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <Headphones className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isEn ? 'Voice & Pronunciation Engine' : 'Cài Đặt Giọng Nữ & Phát Âm Chuẩn Tiếng Việt'}</span>
                  </div>
                  <button 
                    onClick={() => setShowVoiceSettings(false)}
                    className="text-amber-800 hover:text-amber-950 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Voice Gender & Natural Voice Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  {/* Gender Selector */}
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 font-semibold">
                      {isEn ? 'Voice Gender:' : 'Giới tính giọng đọc:'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setVoiceGender('female');
                          const bestFemale = getBestVietnameseFemaleVoice(availableVoices);
                          if (bestFemale) setSelectedVoice(bestFemale);
                          soundFx.playClick();
                        }}
                        className={`flex-1 py-1 px-1.5 rounded-lg border text-center font-bold text-[10px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          voiceGender === 'female'
                            ? 'bg-rose-500 text-white border-rose-600 shadow-2xs'
                            : 'bg-white border-amber-200 text-slate-700 hover:bg-rose-50'
                        }`}
                      >
                        <span>👩</span>
                        <span>{isEn ? 'Female' : 'Nữ (Chuẩn)'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setVoiceGender('male');
                          const viVoices = availableVoices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
                          const maleVoice = viVoices.find(v => !isVoiceFemale(v)) || viVoices[0];
                          if (maleVoice) setSelectedVoice(maleVoice);
                          soundFx.playClick();
                        }}
                        className={`flex-1 py-1 px-1.5 rounded-lg border text-center font-bold text-[10px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          voiceGender === 'male'
                            ? 'bg-sky-600 text-white border-sky-700 shadow-2xs'
                            : 'bg-white border-amber-200 text-slate-700 hover:bg-sky-50'
                        }`}
                      >
                        <span>👨</span>
                        <span>{isEn ? 'Male' : 'Nam'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Voice selector */}
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 font-semibold">
                      {isEn ? 'Selected Voice:' : 'Giọng đọc bài:'}
                    </span>
                    <select
                      value={selectedVoice?.name || ''}
                      onChange={(e) => {
                        const v = availableVoices.find(voice => voice.name === e.target.value);
                        if (v) setSelectedVoice(v);
                      }}
                      className="bg-white border border-amber-300 rounded-lg px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-amber-500 truncate"
                    >
                      {availableVoices
                        .filter(v => isEn ? v.lang.startsWith('en') : v.lang.startsWith('vi'))
                        .map((v, i) => (
                          <option key={i} value={v.name}>
                            {isVoiceFemale(v) ? '👩 ' : '👨 '}{v.name}
                          </option>
                        ))}
                      {availableVoices.filter(v => isEn ? v.lang.startsWith('en') : v.lang.startsWith('vi')).length === 0 && (
                        <option value="">
                          {isEn ? 'Browser Default (en-US)' : '👩 Giọng Nữ Tiếng Việt Chuẩn của Trình duyệt'}
                        </option>
                      )}
                    </select>
                  </div>

                  {/* Reading Speed */}
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 font-semibold">
                      {isEn ? 'Reading Speed:' : 'Tốc độ đọc:'}
                    </span>
                    <div className="flex items-center gap-1">
                      {[
                        { speed: 0.85, label: isEn ? '0.85x Chậm' : '0.85x Chậm' },
                        { speed: 1.0, label: isEn ? '1.0x Chuẩn' : '1.0x Chuẩn' },
                        { speed: 1.15, label: isEn ? '1.15x Nhanh' : '1.15x Nhanh' }
                      ].map((item) => (
                        <button
                          key={item.speed}
                          onClick={() => {
                            setSpeechSpeed(item.speed);
                            soundFx.playClick();
                          }}
                          className={`flex-1 py-1 px-1 rounded-lg border text-center font-bold text-[10px] transition-all cursor-pointer ${
                            speechSpeed === item.speed
                              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                              : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-100/50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-amber-200/60 text-[10px] text-amber-950 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>
                      {isEn 
                        ? 'Accurate pronunciation: Mekong River, MRC, Delta salinity & Geography 11' 
                        : 'Phát âm chuẩn: Sông Mê Kông 4.763 km, MRC, ĐBSCL, MSHS FHG30024, đơn vị & Địa lí 11'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      speakText(
                        isEn 
                          ? 'Hello! Kien Sang is reading aloud with a clear female voice, covering the 4,763 km Mekong River and MRC water security.' 
                          : 'Xin chào bạn học sinh! Em là Kiến Sáng với giọng nữ chuẩn. Em đọc chính xác các thuật ngữ Địa lí mười một, sông Mê Kông bốn nghìn bảy trăm sáu mươi ba ki-lô-mét, Ủy hội M R C và Đồng bằng sông Cửu Long!'
                      );
                    }}
                    className="px-2.5 py-1 rounded-md bg-rose-100 hover:bg-rose-200 border border-rose-300 font-bold cursor-pointer text-rose-900 flex items-center gap-1.5 shadow-2xs"
                  >
                    <Play className="w-3 h-3 fill-current text-rose-600" />
                    <span>{isEn ? 'Test Female Voice' : 'Thử Giọng Nữ Chuẩn'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Speaking Active Indicator Banner */}
            {isSpeaking && (
              <div className="px-3.5 py-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs flex items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="flex gap-0.5 items-end h-3.5 shrink-0">
                    <span className="w-1 h-2.5 bg-white animate-bounce" />
                    <span className="w-1 h-3.5 bg-white animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1 h-2 bg-white animate-bounce [animation-delay:0.3s]" />
                    <span className="w-1 h-3 bg-white animate-bounce [animation-delay:0.45s]" />
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-xs">
                      {isEn ? 'Kien Sang is reading aloud' : 'Kiến Sáng đang đọc bài học'}
                    </span>
                    {totalChunks > 1 && (
                      <span className="text-[10px] opacity-90 ml-1.5 bg-black/20 px-1.5 py-0.2 rounded font-medium">
                        {isEn ? `Part ${currentChunkIndex}/${totalChunks}` : `Đoạn ${currentChunkIndex}/${totalChunks}`}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={stopSpeaking}
                  className="px-2.5 py-1 bg-white/20 hover:bg-white/35 text-white rounded-lg text-[11px] font-black flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>{isEn ? 'Stop' : 'Dừng đọc'}</span>
                </button>
              </div>
            )}
            {/* Quick action chips tailored by grade level and language */}
            <div className="px-3 py-2 bg-amber-50/70 border-b border-amber-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
              <span className="text-amber-800 font-bold flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3 text-amber-600" /> {isEn ? 'Prompts:' : 'Gợi ý:'}
              </span>

              {/* FaceTime Quick Call Action Chip */}
              <button
                onClick={() => {
                  stopSpeaking();
                  stopListening();
                  setIsFaceTimeOpen(true);
                  soundFx.playWaterSplash();
                }}
                className="px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black transition-all whitespace-nowrap cursor-pointer shadow-xs flex items-center gap-1.5 border border-emerald-300 hover:scale-105 shrink-0"
              >
                <Video className="w-3 h-3 text-emerald-100" />
                <span>{isEn ? '📹 Call FaceTime 1-on-1' : '📹 Gọi Điện FaceTime 1-1'}</span>
              </button>

              {selectedLevel === 'primary' ? (
                <>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Tell me about the long Mekong River!' : 'Kể cho mình nghe sông Mê Kông dài như thế nào?')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🌊 {isEn ? '4,763 km River Journey' : 'Dòng sông 4.763 km'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Why does Tonle Sap Lake flow backward?' : 'Biển Hồ chảy ngược như thế nào vậy Kiến Sáng?')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🐟 {isEn ? 'Magical Tonle Sap' : 'Biển Hồ kỳ diệu'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Why is it called Nine Dragons?' : 'Sự tích 9 Cửa Sông Cửu Long')}
                    className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 border border-emerald-300 text-emerald-800 font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🐲 {isEn ? '9 Dragons' : '9 Con Rồng'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Give me a primary school quiz!' : 'Đố vui Tiểu học nhận điểm thưởng!')}
                    className="px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🧩 {isEn ? 'Quiz (+30 pts)' : 'Đố vui (+30đ)'}
                  </button>
                </>
              ) : selectedLevel === 'secondary' ? (
                <>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Geographical facts of the Mekong River' : 'Đặc điểm địa lí và hành trình 4 763 km của sông Mê Kông')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🌊 {isEn ? '4,763 km & 6 Nations' : '4.763 km & 6 Quốc gia'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'How Tonle Sap regulates Mekong floods' : 'Vai trò điều hòa nước của Biển Hồ Tonle Sap')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🐟 {isEn ? 'Tonle Sap Regulation' : 'Điều hòa Biển Hồ'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'MRC roles and Vietnam engagement' : 'Vai trò Ủy hội sông Mê Công & Đóng góp của Việt Nam')}
                    className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 border border-emerald-300 text-emerald-800 font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    ⭐ {isEn ? 'MRC & Vietnam' : 'Vai trò MRC & Việt Nam'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Xa No Canal and FPT Hau Giang School' : 'Kênh xáng Xà No và Trường FPT Hậu Giang')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🏫 {isEn ? 'FPT Hau Giang & Xa No' : 'FPT Hậu Giang & Xà No'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Secondary geography quiz!' : 'Thử tài trắc nghiệm Địa lí THCS!')}
                    className="px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🧩 {isEn ? 'Quiz (+30 pts)' : 'Đố vui (+30đ)'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Analyze issues in water resource exploitation and environmental protection in the Mekong basin' : 'Phân tích một số vấn đề trong khai thác, sử dụng nguồn nước và bảo vệ môi trường nước sông Mê Kông')}
                    className="px-2.5 py-1 rounded-full bg-sky-50 hover:bg-sky-100 hover:border-sky-400 border border-sky-300 text-sky-800 font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    💧 {isEn ? 'Water Exploitation Issues' : 'Khai thác & Vấn đề nguồn nước'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Explain 4 core roles of MRC and Vietnam participation' : 'Nêu 4 vai trò cốt lõi của MRC và 6 đóng góp của Việt Nam')}
                    className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 border border-emerald-300 text-emerald-800 font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    ⭐ {isEn ? '4 MRC Roles & Vietnam' : '4 Vai trò MRC & VN'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? '1995 Mekong Agreement and PNPCA procedure' : 'Hiệp định Mê Kông 1995 và quy trình PNPCA')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    📜 {isEn ? '1995 Agreement & PNPCA' : 'Hiệp định 1995 & PNPCA'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Resolution 120/NQ-CP Nature-based strategy' : 'Nghị quyết 120/NQ-CP và tư duy Thuận thiên')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🌱 {isEn ? 'Resolution 120 "Nature-based"' : 'Nghị quyết 120 Thuận Thiên'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Upstream hydropower dam impacts on sediment and salinity' : 'Tác động của đập thủy điện thượng lưu và xâm nhập mặn')}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-amber-100/70 hover:border-amber-400 border border-amber-200 text-slate-700 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    ⚡ {isEn ? 'Hydropower & Salinity' : 'Thủy điện & Hạn mặn'}
                  </button>
                  <button
                    onClick={() => handleUserSendMessage(isEn ? 'Grade 11 review quiz!' : 'Thử tài trắc nghiệm Chuyên đề 11!')}
                    className="px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    🧩 {isEn ? 'Grade 11 Quiz (+30 pts)' : 'Đố vui Lớp 11 (+30đ)'}
                  </button>
                </>
              )}
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/50">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-sm shrink-0 mt-0.5 overflow-hidden shadow-2xs">
                      <img 
                        src={kienSangAvatar} 
                        alt="Kiến Sáng" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className={`max-w-[88%] rounded-2xl px-3.5 py-3 space-y-2 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-tr-none shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                  }`}>
                    {/* Render message with line breaks */}
                    <div className="whitespace-pre-line text-xs">
                      {msg.text}
                    </div>

                    {/* FaceTime Call Button inside Bot Message */}
                    {msg.isFaceTimeTrigger && (
                      <div className="mt-3 pt-2.5 border-t border-emerald-200/80">
                        <button
                          onClick={() => {
                            stopSpeaking();
                            stopListening();
                            setIsFaceTimeOpen(true);
                            soundFx.playWaterSplash();
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-98 border border-emerald-300"
                        >
                          <Video className="w-4 h-4 text-emerald-100 animate-pulse" />
                          <span>{isEn ? '📞 Open FaceTime Video Call' : '📞 Mở Màn Hình FaceTime Ngay'}</span>
                        </button>
                      </div>
                    )}

                    {/* Interactive Quiz Question if present */}
                    {msg.isQuiz && msg.quizOptions && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                          {isEn ? 'Choose your answer:' : 'Chọn câu trả lời của bạn:'}
                        </span>
                        <div className="space-y-1.5">
                          {msg.quizOptions.map((opt, oIdx) => {
                            const isChosen = msg.userSelectedOption === oIdx;
                            const isCorrectOpt = oIdx === msg.quizCorrectIndex;
                            let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50';

                            if (msg.isAnswered) {
                              if (isCorrectOpt) {
                                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                              } else if (isChosen && !isCorrectOpt) {
                                btnStyle = 'bg-red-50 border-red-300 text-red-700 line-through';
                              } else {
                                btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={msg.isAnswered}
                                onClick={() => handleSelectQuizAnswer(msg.id, oIdx, msg.quizCorrectIndex!)}
                                className={`w-full p-2 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {msg.isAnswered && isCorrectOpt && (
                                  <span className="text-emerald-600 font-bold text-[10px] ml-1">
                                    {isEn ? '✓ Correct (+30 pts)' : '✓ Đúng (+30đ)'}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {msg.isAnswered && msg.quizExplanation && (
                          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 mt-2">
                            💡 {msg.quizExplanation}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bot Voice Reading Control Bar */}
                    <div className={`flex items-center justify-between gap-2 pt-2 border-t text-[10px] ${
                      msg.sender === 'user' ? 'border-white/20 text-amber-100' : 'border-slate-100 text-slate-400'
                    }`}>
                      {msg.sender === 'bot' ? (
                        <div className="flex items-center gap-2">
                          {speakingMessageId === msg.id && isSpeaking ? (
                            <button
                              type="button"
                              onClick={stopSpeaking}
                              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 font-bold text-[11px] transition-all cursor-pointer shadow-xs animate-pulse"
                              title={isEn ? 'Stop reading' : 'Dừng đọc bài'}
                            >
                              <Square className="w-3 h-3 fill-current text-red-600" />
                              <span>
                                {isEn 
                                  ? `Stop reading (${currentChunkIndex}/${totalChunks})` 
                                  : `Dừng đọc (${currentChunkIndex}/${totalChunks})`}
                              </span>
                              <span className="flex gap-0.5 items-end h-2.5 ml-0.5">
                                <span className="w-0.5 h-2 bg-red-500 animate-bounce" />
                                <span className="w-0.5 h-3 bg-red-500 animate-bounce [animation-delay:0.15s]" />
                                <span className="w-0.5 h-1.5 bg-red-500 animate-bounce [animation-delay:0.3s]" />
                              </span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => speakText(msg.text, msg.id)}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px] transition-all cursor-pointer shadow-2xs group"
                              title={isEn ? 'Read this lesson in Vietnamese' : 'Đọc bài học này bằng tiếng Việt'}
                            >
                              <Volume2 className="w-3.5 h-3.5 text-amber-700 group-hover:scale-115 transition-transform" />
                              <span>{isEn ? 'Read aloud 🔊' : 'Đọc bài bằng tiếng Việt 🔊'}</span>
                            </button>
                          )}
                        </div>
                      ) : <span />}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center text-xs text-amber-700">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-sm shrink-0 overflow-hidden shadow-2xs">
                    <img 
                      src={kienSangAvatar} 
                      alt="Kiến Sáng" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-3.5 py-2 flex items-center gap-1.5 shadow-xs">
                    <span>{isEn ? 'Kien Sang is crafting your answer' : 'Kiến Sáng đang soạn câu trả lời'}</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Interactive Vietnamese Voice Conversation Banner */}
            {isListening && (
              <div className="p-3 bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 text-white flex flex-col gap-2 shrink-0 shadow-lg border-t border-white/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                    </span>
                    <span className="font-bold text-xs">
                      {isEn ? 'Listening to voice...' : 'Đang lắng nghe giọng nói tiếng Việt...'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {voiceTranscript && (
                      <button
                        onClick={() => {
                          const text = voiceTranscript.trim();
                          stopListening();
                          if (text) handleUserSendMessage(text);
                        }}
                        className="px-2.5 py-1 bg-white text-orange-950 hover:bg-amber-100 rounded-lg text-xs font-black cursor-pointer shadow-xs transition-all flex items-center gap-1"
                      >
                        <Send className="w-3 h-3 text-orange-600" />
                        <span>{isEn ? 'Send Now' : 'Gửi ngay'}</span>
                      </button>
                    )}
                    <button
                      onClick={stopListening}
                      className="px-2.5 py-1 bg-black/25 hover:bg-black/40 text-white rounded-lg text-xs font-bold cursor-pointer transition-all"
                    >
                      {isEn ? 'Cancel' : 'Hủy'}
                    </button>
                  </div>
                </div>

                <div className="bg-black/20 rounded-xl px-3 py-2 text-xs backdrop-blur-xs flex items-center justify-between gap-2 border border-white/20">
                  <span className="italic truncate text-amber-50">
                    {voiceTranscript 
                      ? `"${voiceTranscript}"` 
                      : (isEn ? 'Speak now into your microphone...' : 'Hãy nói câu hỏi của bạn về sông Mê Kông, Kiến Sáng đang nghe...')}
                  </span>
                  <div className="flex items-end gap-1 h-3 shrink-0">
                    <span className="w-1 h-2 bg-white animate-pulse" />
                    <span className="w-1 h-3.5 bg-white animate-pulse [animation-delay:0.15s]" />
                    <span className="w-1 h-2.5 bg-white animate-pulse [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Voice error notification if mic was blocked or unavailable */}
            {voiceError && (
              <div className="px-3.5 py-2 bg-amber-100 border-t border-amber-200 text-amber-900 text-[11px] flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="truncate">{voiceError}</span>
                </div>
                <button 
                  onClick={() => setVoiceError(null)}
                  className="text-amber-800 hover:text-amber-950 font-bold text-xs shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0 shadow-sm">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUserSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Dedicated FaceTime Video Call Button in input bar */}
                <button
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    stopListening();
                    setIsFaceTimeOpen(true);
                    soundFx.playWaterSplash();
                  }}
                  title={isEn ? 'Start 1-on-1 FaceTime Video Call with Kien Sang' : 'Gọi điện FaceTime Video 1-1 trực tiếp với Kiến Sáng'}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-sm ring-2 ring-emerald-300 hover:scale-105 active:scale-95"
                >
                  <Video className="w-4 h-4 text-white" />
                </button>

                {/* Voice Input Microphone Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isListening) {
                      stopListening();
                    } else {
                      startListening();
                    }
                  }}
                  title={
                    isListening 
                      ? (isEn ? 'Click to stop listening' : 'Nhấn để dừng thu âm') 
                      : (isEn ? 'Speak to Kien Sang (Voice Input)' : 'Nói chuyện tiếng Việt với Kiến Sáng (Micro)')
                  }
                  className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white ring-4 ring-red-200 animate-pulse shadow-md'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 shadow-2xs'
                  }`}
                >
                  {isListening ? (
                    <Radio className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-amber-800" />
                  )}
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    isListening
                      ? (isEn ? 'Listening... Speak now!' : 'Đang lắng nghe... Hãy nói câu hỏi của bạn!')
                      : isEn
                      ? (selectedLevel === 'primary' 
                          ? 'Ask Kien Sang or click mic to speak...' 
                          : selectedLevel === 'secondary'
                          ? 'Ask Mekong geography or click mic...'
                          : 'Ask MRC, PNPCA, Res 120 or speak...')
                      : (selectedLevel === 'primary'
                          ? 'Hỏi Kiến Sáng hoặc bấm mic để nói...'
                          : selectedLevel === 'secondary'
                          ? 'Hỏi địa lí Mê Kông hoặc bấm mic...'
                          : 'Hỏi khai thác nước, MRC, NQ 120 hoặc bấm mic...')
                  }
                  className={`flex-1 bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${
                    isListening ? 'border-red-400 bg-red-50/40' : 'border-slate-200 focus:border-amber-400 focus:bg-white'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 px-1">
                <button
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  className="flex items-center gap-1.5 text-amber-800 hover:text-amber-950 font-semibold cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>
                    {isEn ? 'Voice & Speech: Active' : '🎙️ Đọc bài & Nói chuyện Tiếng Việt'}
                  </span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-300">
                    {speechSpeed}x
                  </span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      stopSpeaking();
                      stopListening();
                      setIsFaceTimeOpen(true);
                      soundFx.playWaterSplash();
                    }}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-extrabold cursor-pointer hover:underline"
                    title={isEn ? 'Start FaceTime Video Call' : 'Gọi điện video FaceTime với Kiến Sáng'}
                  >
                    <Video className="w-3 h-3" />
                    <span>FaceTime HD</span>
                  </button>
                  <span>•</span>
                  <span>
                    {isEn ? 'FPT Hau Giang' : 'Trường FPT Hậu Giang'}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* FaceTime Interactive Video Call Modal */}
      {isFaceTimeOpen && (
        <KienSangFaceTimeCall
          isOpen={isFaceTimeOpen}
          onClose={() => setIsFaceTimeOpen(false)}
          selectedLevel={selectedLevel}
          language={currentLanguage}
          onScoreReward={onScoreReward}
        />
      )}
    </div>
  );
};

