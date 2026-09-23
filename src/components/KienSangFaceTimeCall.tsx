import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  Phone, 
  PhoneOff, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  RotateCcw, 
  Camera, 
  CheckCircle2, 
  Radio, 
  HelpCircle, 
  Send, 
  X, 
  ShieldCheck,
  Waves,
  Smile,
  GraduationCap,
  Palette,
  Heart,
  Laugh,
  Flame
} from 'lucide-react';
import { EducationLevel, Language } from '../types';
import { soundFx } from '../utils/audio';
import { 
  normalizeVietnamesePhonetics, 
  getBestVietnameseFemaleVoice, 
  FEMALE_VOICE_CONFIG 
} from '../utils/vietnameseSpeech';
import { LEVEL_KNOWLEDGE_RESPONSES } from '../data/chatbotKnowledgeData';
import { 
  CAMERA_FILTERS, 
  FaceTimeFilterOverlay, 
  FilterCategory, 
  CameraFilter 
} from './FaceTimeFilterOverlay';

import kienSangAvatar from '../assets/images/kien_sang_mascot_1789090892621.jpg';
import kienSangBanner from '../assets/images/kien_sang_banner_1789090943772.jpg';

interface KienSangFaceTimeCallProps {
  selectedLevel: EducationLevel;
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  onSendMessageToChat?: (text: string) => void;
  onScoreReward?: (points: number) => void;
}

type CallStatus = 'ringing' | 'connected' | 'ended';

interface CallTranscriptItem {
  id: string;
  speaker: 'user' | 'kien_sang';
  text: string;
  time: string;
}

const VIRTUAL_BACKGROUNDS = [
  {
    id: 'mekong_river',
    nameVi: 'Sông Mê Kông 4.763 km',
    nameEn: 'Mekong River 4,763 km',
    gradient: 'from-sky-900 via-teal-900 to-emerald-950',
    tag: '🌊 Lưu vực'
  },
  {
    id: 'fpt_school',
    nameVi: 'Trường FPT Hậu Giang',
    nameEn: 'FPT Hau Giang School',
    gradient: 'from-amber-900 via-orange-950 to-slate-950',
    tag: '🏫 Học xá'
  },
  {
    id: 'tonle_sap',
    nameVi: 'Biển Hồ Tonle Sap',
    nameEn: 'Tonle Sap Great Lake',
    gradient: 'from-cyan-950 via-blue-950 to-indigo-950',
    tag: '🐟 Đảo cá'
  },
  {
    id: 'can_tho_bridge',
    nameVi: 'Chợ Nổi & Cầu Cần Thơ',
    nameEn: 'Floating Market & Bridge',
    gradient: 'from-emerald-950 via-slate-900 to-sky-950',
    tag: '🌾 ĐBSCL'
  }
];

export const KienSangFaceTimeCall: React.FC<KienSangFaceTimeCallProps> = ({
  selectedLevel,
  language = 'vi',
  isOpen,
  onClose,
  onSendMessageToChat
}) => {
  const isEn = language === 'en';

  // Call status: ringing -> connected -> ended
  const [callStatus, setCallStatus] = useState<CallStatus>('ringing');
  const [callDuration, setCallDuration] = useState<number>(0);
  
  // Media controls
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);
  const [activeBackground, setActiveBackground] = useState<string>('mekong_river');
  
  // Camera AR & Video Filters (Dễ thương, Hài hước, Màu mè)
  const [activeFilter, setActiveFilter] = useState<string>('none');
  const [showFilterPicker, setShowFilterPicker] = useState<boolean>(false);
  const [filterCategoryTab, setFilterCategoryTab] = useState<FilterCategory>('all');
  const [applyFilterTo, setApplyFilterTo] = useState<'user' | 'kien_sang' | 'both'>('both');
  const [filterReactionNotice, setFilterReactionNotice] = useState<string | null>(null);
  
  // PiP (Picture in Picture) user camera position & size
  const [isPiPExpanded, setIsPiPExpanded] = useState<boolean>(false);
  const [isPiPHidden, setIsPiPHidden] = useState<boolean>(false);
  
  // Captions & in-call chat
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [showInCallChat, setShowInCallChat] = useState<boolean>(false);
  const [transcripts, setTranscripts] = useState<CallTranscriptItem[]>([]);
  const [inCallInputText, setInCallInputText] = useState<string>('');
  
  // AI Mascot Animation States
  const [isKienSangSpeaking, setIsKienSangSpeaking] = useState<boolean>(false);
  const [isKienSangThinking, setIsKienSangThinking] = useState<boolean>(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'explaining' | 'listening' | 'winking'>('happy');
  const [currentSpeechText, setCurrentSpeechText] = useState<string>('');

  // Speech recognition (listening to user)
  const [isUserListening, setIsUserListening] = useState<boolean>(false);
  const [userLiveTranscript, setUserLiveTranscript] = useState<string>('');

  // Stream references
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const callTimerRef = useRef<any>(null);
  const ringtoneIntervalRef = useRef<any>(null);
  const speechQueueRef = useRef<string[]>([]);
  const currentChunkIndexRef = useRef<number>(0);

  // Quick suggestions for one-touch questions during FaceTime
  const quickTopics = [
    {
      vi: 'Tại sao Biển Hồ Tonle Sap lại chảy ngược được?',
      en: 'Why does Tonle Sap Lake flow backwards?'
    },
    {
      vi: 'Kể cho mình nghe về 9 cửa sông Cửu Long',
      en: 'Tell me about the 9 Nine Dragon river mouths'
    },
    {
      vi: '4 vai trò của Ủy hội sông Mê Công (MRC) là gì?',
      en: 'What are the 4 core roles of the MRC?'
    },
    {
      vi: 'Trường FPT Hậu Giang có điểm gì đặc biệt?',
      en: 'What is special about FPT Hau Giang School?'
    }
  ];

  // 1. Camera & Microphone Setup using WebRTC getUserMedia
  const initUserMedia = useCallback(async () => {
    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('mediaDevices API not available in this environment');
        setIsCameraOff(true);
        return;
      }
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: true
        });
      } catch (errCombined) {
        console.warn('Combined getUserMedia failed, trying video only:', errCombined);
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        } catch (errVideo) {
          console.warn('Video only failed, trying audio only:', errVideo);
          try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          } catch (errAudio) {
            console.warn('All getUserMedia attempts failed (permission denied or no device):', errAudio);
          }
        }
      }

      if (stream) {
        localStreamRef.current = stream;
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
        setIsCameraOff(stream.getVideoTracks().length === 0);
      } else {
        setIsCameraOff(true);
      }
    } catch (err) {
      console.warn('Could not access camera/mic for FaceTime:', err);
      setIsCameraOff(true);
    }
  }, []);

  // Ensure webcam stream is attached as soon as video element is mounted in DOM
  useEffect(() => {
    if (callStatus === 'connected' && localStreamRef.current && userVideoRef.current) {
      if (userVideoRef.current.srcObject !== localStreamRef.current) {
        userVideoRef.current.srcObject = localStreamRef.current;
      }
    }
  }, [callStatus, isCameraOff, isPiPHidden]);

  // Stop media tracks
  const stopUserMedia = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }
  }, []);

  // Toggle Camera Mute/Unmute
  const toggleCamera = () => {
    soundFx.playClick();
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isCameraOff;
      }
    }
    setIsCameraOff(!isCameraOff);
  };

  // Toggle Microphone Mute/Unmute
  const toggleMic = () => {
    soundFx.playClick();
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMicMuted;
      }
    }
    setIsMicMuted(!isMicMuted);
    if (!isMicMuted) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  // 2. Text to Speech for Kiến Sáng
  const stopSpeaking = useCallback(() => {
    speechQueueRef.current = [];
    currentChunkIndexRef.current = 0;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsKienSangSpeaking(false);
    setMascotMood('listening');
  }, []);

  const speakKienSangReply = useCallback((rawText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isSpeakerMuted) {
      return;
    }

    stopSpeaking();
    setIsKienSangSpeaking(true);
    setMascotMood('explaining');
    setCurrentSpeechText(rawText);

    // Add to transcript
    setTranscripts(prev => [
      ...prev,
      {
        id: `kien-sang-${Date.now()}`,
        speaker: 'kien_sang',
        text: rawText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    const cleanedText = normalizeVietnamesePhonetics(rawText, isEn);

    // Split into speech chunks to avoid browser timeout
    const sentences = cleanedText
      .split(/(?<=[.!?:\n])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    speechQueueRef.current = sentences.length > 0 ? sentences : [cleanedText];
    currentChunkIndexRef.current = 0;

    const playNext = () => {
      if (currentChunkIndexRef.current >= speechQueueRef.current.length) {
        setIsKienSangSpeaking(false);
        setMascotMood('listening');
        // Restart speech recognition so user can reply naturally
        startSpeechRecognition();
        return;
      }

      const chunk = speechQueueRef.current[currentChunkIndexRef.current];
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = isEn ? 'en-US' : 'vi-VN';
      utterance.rate = 1.0;
      utterance.pitch = FEMALE_VOICE_CONFIG.pitch;

      const allVoices = window.speechSynthesis.getVoices();
      if (!isEn) {
        const femaleVoice = getBestVietnameseFemaleVoice(allVoices);
        if (femaleVoice) utterance.voice = femaleVoice;
      }

      utterance.onend = () => {
        currentChunkIndexRef.current += 1;
        playNext();
      };

      utterance.onerror = () => {
        currentChunkIndexRef.current += 1;
        playNext();
      };

      window.speechSynthesis.speak(utterance);
    };

    playNext();
  }, [isEn, isSpeakerMuted, stopSpeaking]);

  // Handle selecting AR Camera Filter (Cute, Funny, Colorful)
  const handleSelectFilter = useCallback((filterId: string) => {
    setActiveFilter(filterId);
    soundFx.playClick();
    if (filterId === 'none') {
      const resetMsg = isEn ? 'Filter turned off - Natural mode' : 'Đã tắt filter - Trở về chế độ tự nhiên';
      setFilterReactionNotice(resetMsg);
      setTimeout(() => setFilterReactionNotice(null), 2500);
      return;
    }
    const selected = CAMERA_FILTERS.find(f => f.id === filterId);
    if (selected) {
      soundFx.playSuccess();
      const reaction = isEn ? selected.kienSangReactionEn : selected.kienSangReactionVi;
      setFilterReactionNotice(reaction);
      setTimeout(() => setFilterReactionNotice(null), 4500);
      if (!isKienSangSpeaking) {
        speakKienSangReply(reaction);
      }
    }
  }, [isEn, isKienSangSpeaking, speakKienSangReply]);

  // 3. User Speech Recognition (STT) during FaceTime Call
  const startSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined' || isMicMuted) return;
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
      }

      const recognition = new SpeechRecognitionClass();
      recognition.lang = isEn ? 'en-US' : 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsUserListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setUserLiveTranscript(transcript);

        if (event.results[0].isFinal || transcript.trim().length > 20) {
          const finalUserSpeech = transcript.trim();
          if (finalUserSpeech) {
            handleUserSpoke(finalUserSpeech);
          }
        }
      };

      recognition.onerror = () => {
        setIsUserListening(false);
      };

      recognition.onend = () => {
        setIsUserListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsUserListening(false);
    }
  }, [isEn, isMicMuted]);

  const stopSpeechRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
    }
    setIsUserListening(false);
  }, []);

  // 4. Handle User Question during FaceTime (Voice or Tap)
  const handleUserSpoke = useCallback(async (spokenText: string) => {
    if (!spokenText.trim()) return;

    stopSpeechRecognition();
    setUserLiveTranscript('');
    setIsKienSangThinking(true);
    setMascotMood('explaining');

    // Add user question to transcript
    setTranscripts(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        speaker: 'user',
        text: spokenText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    if (onSendMessageToChat) {
      onSendMessageToChat(spokenText);
    }

    // 1. Instant Local Knowledge Check for lightning-fast voice reply (<50ms)
    const lower = spokenText.toLowerCase();
    const localMatch = LEVEL_KNOWLEDGE_RESPONSES.find(item => 
      item.keywords.some(k => lower.includes(k))
    );

    if (localMatch) {
      const langPack = isEn ? localMatch.answer.en : localMatch.answer.vi;
      const immediateReply = langPack[selectedLevel] || langPack.highschool;
      setIsKienSangThinking(false);
      speakKienSangReply(immediateReply);
      return;
    }

    // 2. Otherwise call optimized server API with AbortController
    let botReply: string | null = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: spokenText,
          history: [],
          level: selectedLevel,
          language: isEn ? 'en' : 'vi'
        })
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          botReply = data.reply;
        }
      }
    } catch (e) {
      console.log('FaceTime using fast local fallback:', e);
    }

    // Contextual fallback if timeout/offline
    if (!botReply) {
      botReply = isEn 
        ? `I heard your question: "${spokenText}". The Mekong River is 4,763 km long, nurturing millions of lives! Ask me anything about Tonle Sap or the 9 river mouths!`
        : `Kiến Sáng đang nghe bạn nói đây! Sông Mê Kông dài 4.763 km chảy qua 6 nước, nuôi dưỡng hàng triệu người dân ĐBSCL. Bạn muốn mình giải thích thêm về Biển Hồ Tonle Sap hay 9 Cửa Sông Cửu Long?`;
    }

    setIsKienSangThinking(false);
    speakKienSangReply(botReply);
  }, [isEn, onSendMessageToChat, selectedLevel, speakKienSangReply, stopSpeechRecognition]);

  // 5. LifeCycle & Ringing Simulation
  useEffect(() => {
    if (!isOpen) return;

    setCallStatus('ringing');
    setCallDuration(0);
    soundFx.playFaceTimeRinging();

    // Play ringing chime every 2.4s
    ringtoneIntervalRef.current = setInterval(() => {
      soundFx.playFaceTimeRinging();
    }, 2400);

    // Answer call automatically after 2.5 seconds
    const answerTimer = setTimeout(() => {
      if (ringtoneIntervalRef.current) clearInterval(ringtoneIntervalRef.current);
      soundFx.playFaceTimeConnect();
      setCallStatus('connected');
      initUserMedia();

      // Greeting speech from Kiến Sáng
      const greeting = isEn
        ? `Hello! I'm Kien Sang from FPT Hau Giang School! I'm so excited to talk with you on FaceTime video! Speak to me or pick a topic below!`
        : `Chào bạn! Mình là Kiến Sáng từ Trường FPT Hậu Giang đây! Thật vui khi được gọi FaceTime trực tiếp với bạn. Bạn cứ nói qua Micro hoặc chọn câu hỏi bên dưới nhé!`;

      speakKienSangReply(greeting);
    }, 2600);

    return () => {
      clearTimeout(answerTimer);
      if (ringtoneIntervalRef.current) clearInterval(ringtoneIntervalRef.current);
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      stopSpeaking();
      stopSpeechRecognition();
      stopUserMedia();
    };
  }, [isOpen, initUserMedia, isEn, speakKienSangReply, stopSpeaking, stopSpeechRecognition, stopUserMedia]);

  // 6. Call Timer counter
  useEffect(() => {
    if (callStatus === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }

    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [callStatus]);

  // End Call Handler
  const handleEndCall = () => {
    soundFx.playFaceTimeEnd();
    setCallStatus('ended');
    stopSpeaking();
    stopSpeechRecognition();
    stopUserMedia();
    setTimeout(() => {
      onClose();
    }, 900);
  };

  if (!isOpen) return null;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentBg = VIRTUAL_BACKGROUNDS.find(b => b.id === activeBackground) || VIRTUAL_BACKGROUNDS[0];
  const currentFilterObj = CAMERA_FILTERS.find(f => f.id === activeFilter);

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn select-none">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[720px] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        
        {/* ================= 1. FACETIME TOP STATUS BAR ================= */}
        <div className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto">
          {/* Caller Identity */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 p-0.5 border border-amber-300 shadow-md overflow-hidden">
                <img 
                  src={kienSangAvatar} 
                  alt="Kiến Sáng Mascot" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                  <span>KIẾN SÁNG</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    FPT Hậu Giang
                  </span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono px-1.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>FaceTime HD</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                {callStatus === 'ringing' ? (
                  <span className="text-amber-300 animate-pulse flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-spin" />
                    <span>{isEn ? 'Calling Kien Sang...' : 'Đang đổ chuông gọi Kiến Sáng...'}</span>
                  </span>
                ) : callStatus === 'connected' ? (
                  <span className="flex items-center gap-1.5 font-mono text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{formatTime(callDuration)}</span>
                    <span className="text-slate-400">• {isEn ? '6 Riparian Nations' : 'Chuyên Đề Sông Mê Kông'}</span>
                  </span>
                ) : (
                  <span className="text-rose-400">{isEn ? 'Call Ended' : 'Cuộc gọi kết thúc'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Virtual Background Selector & In-call drawer toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-900/80 backdrop-blur-md rounded-2xl p-1 border border-slate-800 gap-1 text-xs">
              {VIRTUAL_BACKGROUNDS.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => {
                    setActiveBackground(bg.id);
                    soundFx.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    activeBackground === bg.id 
                      ? 'bg-amber-500 text-slate-950 shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={isEn ? bg.nameEn : bg.nameVi}
                >
                  <span>{bg.tag}</span>
                </button>
              ))}
            </div>

            {/* Camera AR Filters Toggle in Header */}
            <button
              onClick={() => {
                setShowFilterPicker(!showFilterPicker);
                soundFx.playClick();
              }}
              className={`px-3 py-2 rounded-2xl backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                showFilterPicker || activeFilter !== 'none'
                  ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white border-pink-400 shadow-md shadow-pink-500/30 ring-2 ring-pink-300/40' 
                  : 'bg-slate-900/80 text-white border-slate-700 hover:bg-slate-800'
              }`}
              title={isEn ? 'Choose Camera Filters (Cute, Funny, Colorful)' : 'Chọn Filter Camera (Dễ thương, Hài hước, Màu mè)'}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span className="hidden sm:inline">
                {activeFilter !== 'none' 
                  ? `${currentFilterObj?.emoji} ${isEn ? currentFilterObj?.nameEn : currentFilterObj?.nameVi}` 
                  : (isEn ? 'Filters' : 'Bộ Lọc')}
              </span>
            </button>

            <button
              onClick={() => setShowInCallChat(!showInCallChat)}
              className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all cursor-pointer ${
                showInCallChat 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' 
                  : 'bg-slate-900/80 text-white border-slate-700 hover:bg-slate-800'
              }`}
              title={isEn ? 'In-call Questions & Notes' : 'Hộp câu hỏi & Tin nhắn cuộc gọi'}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= 2. MAIN STAGE: KIẾN SÁNG LIVE VIDEO ================= */}
        <div className={`relative flex-1 bg-gradient-to-br ${currentBg.gradient} flex items-center justify-center overflow-hidden transition-all duration-700`}>
          
          {/* Animated Background Water Ripple Canvas / Waves */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />
          </div>

          {/* Connected or Ringing Centerpiece */}
          {callStatus === 'ringing' ? (
            <div className="flex flex-col items-center justify-center gap-6 z-20 text-center animate-pulse">
              {/* Radar Rings Around Mascot */}
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-amber-500/15 animate-ping" />
                <div className="absolute -inset-4 rounded-full bg-amber-500/25 animate-pulse" />
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-amber-500 p-1.5 border-4 border-white shadow-2xl overflow-hidden relative z-10">
                  <img 
                    src={kienSangAvatar} 
                    alt="Kiến Sáng Ringing" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">
                  KIẾN SÁNG (AI Tutor)
                </h2>
                <p className="text-sm text-amber-200 mt-1">
                  Trường TH, THCS & THPT FPT Hậu Giang
                </p>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs font-bold text-amber-300">
                  {isEn ? 'Incoming FaceTime Video Call...' : 'Cuộc gọi FaceTime Video đang kết nối...'}
                </div>

                {/* Instant Answer or Decline Buttons during ringing */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <button
                    onClick={() => {
                      if (ringtoneIntervalRef.current) clearInterval(ringtoneIntervalRef.current);
                      soundFx.playFaceTimeConnect();
                      setCallStatus('connected');
                      initUserMedia();
                      const greeting = isEn
                        ? `Hello! I'm Kien Sang from FPT Hau Giang School! I'm so excited to talk with you on FaceTime video! Speak to me or pick a topic below!`
                        : `Chào bạn! Mình là Kiến Sáng từ Trường FPT Hậu Giang đây! Thật vui khi được gọi FaceTime trực tiếp với bạn. Bạn cứ nói qua Micro hoặc chọn câu hỏi bên dưới nhé!`;
                      speakKienSangReply(greeting);
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/40 border border-emerald-400/40 cursor-pointer hover:scale-105 transition-all"
                  >
                    <Phone className="w-4 h-4 animate-bounce" />
                    <span>{isEn ? 'Answer Now' : 'Bắt Máy Ngay'}</span>
                  </button>
                  <button
                    onClick={handleEndCall}
                    className="px-4 py-2.5 rounded-2xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md border border-rose-400/30 cursor-pointer hover:scale-105 transition-all"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>{isEn ? 'Decline' : 'Hủy Gọi'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : callStatus === 'connected' ? (
            <div className="relative z-20 flex flex-col items-center justify-center text-center p-4 max-w-xl">
              
              {/* Animated Interactive Mascot Video Avatar */}
              <div className="relative mb-3">
                {/* Floating Filter Reaction Notice from Kiến Sáng */}
                {filterReactionNotice && (
                  <div className="absolute -top-12 inset-x-0 mx-auto z-40 bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-black text-xs px-3.5 py-1.5 rounded-2xl shadow-2xl border-2 border-white animate-bounce flex items-center justify-center gap-1.5 max-w-sm text-center">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-200 shrink-0 animate-spin" />
                    <span className="leading-tight drop-shadow-xs">{filterReactionNotice}</span>
                  </div>
                )}

                {/* Lip Sync & Audio Halo Effect when speaking */}
                {isKienSangSpeaking && (
                  <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-amber-400/40 via-cyan-400/40 to-emerald-400/40 animate-ping" />
                )}
                {isKienSangThinking && (
                  <div className="absolute -inset-3 rounded-full bg-cyan-400/30 animate-spin" />
                )}

                <div className={`relative w-36 h-36 sm:w-52 sm:h-52 rounded-3xl bg-amber-500 p-1.5 border-4 ${
                  isKienSangSpeaking ? 'border-cyan-400 ring-4 ring-cyan-400/40 shadow-cyan-500/50' : 'border-white'
                } shadow-2xl overflow-hidden transition-all duration-300 transform ${
                  isKienSangSpeaking ? 'scale-105' : 'hover:scale-102'
                }`}>
                  <img 
                    src={kienSangAvatar} 
                    alt="Kiến Sáng Live" 
                    style={{ 
                      filter: (applyFilterTo === 'kien_sang' || applyFilterTo === 'both') 
                        ? currentFilterObj?.videoCssFilter || 'none' 
                        : 'none' 
                    }}
                    className="w-full h-full object-cover transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* AR Filter Overlay on Kiến Sáng */}
                  {(applyFilterTo === 'kien_sang' || applyFilterTo === 'both') && activeFilter !== 'none' && (
                    <FaceTimeFilterOverlay filterId={activeFilter} isMirrored={false} />
                  )}
                </div>

                {/* Mood & Status Floating Badge */}
                <span className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-slate-900 border-2 border-amber-400 text-amber-300 shadow-lg text-xs font-bold flex items-center gap-1">
                  {isKienSangSpeaking ? (
                    <>
                      <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>{isEn ? 'Speaking' : 'Đang nói...'}</span>
                    </>
                  ) : isKienSangThinking ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>{isEn ? 'Thinking' : 'Đang tra cứu...'}</span>
                    </>
                  ) : (
                    <>
                      <Smile className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isEn ? 'Listening' : 'Đang lắng nghe...'}</span>
                    </>
                  )}
                </span>
              </div>

              {/* Real-Time Live Audio Waveform Animation */}
              <div className="flex items-center gap-1 h-8 my-2">
                {[...Array(16)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isKienSangSpeaking 
                        ? 'bg-cyan-400' 
                        : isUserListening 
                        ? 'bg-amber-400' 
                        : 'bg-slate-600'
                    }`}
                    style={{
                      height: isKienSangSpeaking 
                        ? `${Math.max(6, Math.sin(Date.now() / 100 + i) * 24 + 10)}px` 
                        : isUserListening 
                        ? `${Math.max(6, Math.sin(Date.now() / 150 + i) * 18 + 8)}px`
                        : '6px'
                    }}
                  />
                ))}
              </div>

              {/* FaceTime Closed Captions (Phụ đề Trực Tiếp) */}
              {showCaptions && (
                <div className="w-full max-w-lg mt-1 px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-white shadow-xl">
                  <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mb-0.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                      <span>{isKienSangSpeaking ? 'Kiến Sáng (Phụ đề trực tiếp)' : 'Micro bạn (Nhận diện giọng nói)'}</span>
                    </span>
                    <button 
                      onClick={() => setShowCaptions(false)}
                      className="text-slate-400 hover:text-white text-[10px]"
                    >
                      Ẩn phụ đề
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed line-clamp-3 text-slate-100">
                    {isKienSangSpeaking 
                      ? currentSpeechText 
                      : userLiveTranscript 
                      ? userLiveTranscript 
                      : (isEn ? 'Speak now into microphone or tap a topic below...' : 'Hãy nói câu hỏi của bạn qua Micro hoặc bấm gợi ý bên dưới...')}
                  </p>
                </div>
              )}

              {/* Quick Topics Carousel during Call */}
              <div className="w-full max-w-lg mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {quickTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playClick();
                      handleUserSpoke(isEn ? topic.en : topic.vi);
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                  >
                    💬 {isEn ? topic.en : topic.vi}
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center z-20 text-slate-400">
              <PhoneOff className="w-12 h-12 mx-auto mb-3 text-rose-500 animate-bounce" />
              <p className="text-lg font-bold text-white">{isEn ? 'FaceTime Call Ended' : 'Cuộc gọi FaceTime đã kết thúc'}</p>
              <p className="text-xs text-slate-400 mt-1">{isEn ? 'Duration:' : 'Thời lượng cuộc gọi:'} {formatTime(callDuration)}</p>
            </div>
          )}

          {/* ================= 3. PICTURE-IN-PICTURE (PiP) USER WEBCAM ================= */}
          {!isPiPHidden && (
            <div className={`absolute z-30 transition-all duration-300 shadow-2xl ${
              isPiPExpanded 
                ? 'bottom-20 right-4 w-48 sm:w-64 h-36 sm:h-48 rounded-2xl border-2 border-emerald-400'
                : 'bottom-20 right-4 w-28 sm:w-36 h-36 sm:h-48 rounded-2xl border-2 border-white/40'
            } overflow-hidden bg-slate-900 backdrop-blur-md`}>
              
              {/* Webcam Video Stream */}
              <video
                ref={userVideoRef}
                autoPlay
                playsInline
                muted
                style={{ 
                  filter: (applyFilterTo === 'user' || applyFilterTo === 'both') 
                    ? currentFilterObj?.videoCssFilter || 'none' 
                    : 'none' 
                }}
                className={`w-full h-full object-cover scale-x-[-1] transition-all duration-300 ${isCameraOff ? 'hidden' : 'block'}`}
              />

              {/* AR Filter Overlay on User Camera */}
              {(applyFilterTo === 'user' || applyFilterTo === 'both') && !isCameraOff && activeFilter !== 'none' && (
                <FaceTimeFilterOverlay filterId={activeFilter} isMirrored={true} />
              )}

              {/* Fallback if camera is off or denied */}
              {isCameraOff && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-300 p-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-1 text-slate-400">
                    <VideoOff className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white">{isEn ? 'Camera Off' : 'Camera tắt'}</span>
                  <span className="text-[9px] text-slate-400">{isEn ? 'Tap video to turn on' : 'Nhấn nút camera để bật'}</span>
                </div>
              )}

              {/* PiP Overlay Controls */}
              <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between text-white/90 z-20">
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-black/60 font-mono font-bold flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isCameraOff ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'}`} />
                  <span>{isEn ? 'You' : 'Bạn'}</span>
                </span>

                <div className="flex items-center gap-1">
                  {/* Quick toggle filter sheet */}
                  <button
                    onClick={() => {
                      setShowFilterPicker(!showFilterPicker);
                      soundFx.playClick();
                    }}
                    className={`p-1 rounded-md text-white cursor-pointer transition-all ${
                      activeFilter !== 'none' ? 'bg-pink-600 shadow-xs' : 'bg-black/60 hover:bg-black/80'
                    }`}
                    title={isEn ? 'Choose Camera Filter' : 'Chọn Filter Camera'}
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </button>
                  <button
                    onClick={() => setIsPiPExpanded(!isPiPExpanded)}
                    className="p-1 rounded-md bg-black/60 hover:bg-black/80 text-white cursor-pointer"
                    title={isPiPExpanded ? 'Thu nhỏ PiP' : 'Phóng to PiP'}
                  >
                    {isPiPExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => setIsPiPHidden(true)}
                    className="p-1 rounded-md bg-black/60 hover:bg-black/80 text-white cursor-pointer"
                    title="Ẩn khung hình bạn"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* User microphone status indicator & active filter tag */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[9px] z-20 pointer-events-none">
                <div className="px-1.5 py-0.5 rounded-md bg-black/60 text-white flex items-center gap-1">
                  {isMicMuted ? (
                    <MicOff className="w-2.5 h-2.5 text-rose-400" />
                  ) : (
                    <Mic className="w-2.5 h-2.5 text-emerald-400" />
                  )}
                  <span>{isMicMuted ? 'Muted' : 'Live'}</span>
                </div>

                {activeFilter !== 'none' && (
                  <div className="px-1.5 py-0.5 rounded-md bg-pink-900/80 border border-pink-500/50 text-pink-200 font-bold flex items-center gap-0.5">
                    <span>{currentFilterObj?.emoji}</span>
                    <span className="truncate max-w-[60px]">{currentFilterObj?.tag}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* If PiP is hidden, provide restore button */}
          {isPiPHidden && (
            <button
              onClick={() => setIsPiPHidden(false)}
              className="absolute bottom-20 right-4 z-30 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white border border-slate-700 text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hiện Camera Bạn</span>
            </button>
          )}

          {/* ================= 4. IN-CALL CHAT & NOTES DRAWER ================= */}
          {showInCallChat && (
            <div className="absolute inset-y-0 right-0 w-full sm:w-80 bg-slate-950/95 backdrop-blur-2xl z-40 border-l border-slate-800 flex flex-col p-4 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <h4 className="font-extrabold text-white text-sm">
                    {isEn ? 'In-Call Notes & Questions' : 'Hộp Thoại & Nhật Ký'}
                  </h4>
                </div>
                <button
                  onClick={() => setShowInCallChat(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs">
                {transcripts.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>{isEn ? 'No conversation notes yet.' : 'Chưa có nhật ký cuộc gọi.'}</p>
                    <p className="text-[11px] mt-1">{isEn ? 'Ask by voice or type below!' : 'Hãy nói qua mic hoặc gõ bên dưới!'}</p>
                  </div>
                ) : (
                  transcripts.map(t => (
                    <div 
                      key={t.id}
                      className={`p-2.5 rounded-2xl ${
                        t.speaker === 'user' 
                          ? 'bg-amber-500/20 text-amber-100 border border-amber-500/30 ml-4' 
                          : 'bg-slate-900 text-slate-200 border border-slate-800 mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-white">
                          {t.speaker === 'user' ? (isEn ? 'You' : 'Bạn') : 'Kiến Sáng (FPT)'}
                        </span>
                        <span>{t.time}</span>
                      </div>
                      <p className="leading-relaxed">{t.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* In-Call Type Input */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inCallInputText.trim()) {
                    handleUserSpoke(inCallInputText.trim());
                    setInCallInputText('');
                  }
                }}
                className="pt-2 border-t border-slate-800 flex items-center gap-1.5"
              >
                <input
                  type="text"
                  value={inCallInputText}
                  onChange={(e) => setInCallInputText(e.target.value)}
                  placeholder={isEn ? 'Type a question...' : 'Nhập câu hỏi...'}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!inCallInputText.trim()}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-bold cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* ================= 5. BOTTOM FACETIME CALL CONTROLS DOCK ================= */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-3 sm:gap-5 z-30">
          
          {/* Mute/Unmute Mic */}
          <button
            onClick={toggleMic}
            className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
              isMicMuted 
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
            }`}
            title={isMicMuted ? (isEn ? 'Unmute Microphone' : 'Bật Micro') : (isEn ? 'Mute Microphone' : 'Tắt Micro')}
          >
            {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Camera On/Off */}
          <button
            onClick={toggleCamera}
            className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
              isCameraOff 
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
            }`}
            title={isCameraOff ? (isEn ? 'Turn On Camera' : 'Bật Camera') : (isEn ? 'Turn Off Camera' : 'Tắt Camera')}
          >
            {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Speaker Sound Mute/Unmute */}
          <button
            onClick={() => {
              setIsSpeakerMuted(!isSpeakerMuted);
              if (!isSpeakerMuted) stopSpeaking();
              soundFx.playClick();
            }}
            className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
              isSpeakerMuted 
                ? 'bg-slate-800 text-slate-400 border-slate-700' 
                : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
            }`}
            title={isSpeakerMuted ? (isEn ? 'Unmute Speaker' : 'Bật âm thanh') : (isEn ? 'Mute Speaker' : 'Tắt âm thanh')}
          >
            {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
          </button>

          {/* Closed Captions Toggle */}
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`hidden sm:flex p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
              showCaptions 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700' 
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
            }`}
            title={showCaptions ? (isEn ? 'Hide Captions' : 'Tắt phụ đề') : (isEn ? 'Show Captions' : 'Bật phụ đề')}
          >
            <Radio className="w-5 h-5" />
          </button>

          {/* END CALL BUTTON (CÚP MÁY) */}
          <button
            onClick={handleEndCall}
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            title={isEn ? 'End FaceTime Call' : 'Kết thúc cuộc gọi FaceTime'}
          >
            <PhoneOff className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-black">
              {isEn ? 'End Call' : 'Kết Thúc'}
            </span>
          </button>

        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
