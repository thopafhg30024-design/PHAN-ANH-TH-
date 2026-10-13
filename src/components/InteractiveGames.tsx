import React, { useState, useEffect } from 'react';
import { PRIMARY_QUIZ, SECONDARY_QUIZ, HIGHSCHOOL_QUIZ, DRAG_MATCH_ITEMS } from '../data/gamesData';
import { QuizQuestion, EducationLevel, GameDifficulty } from '../types';
import { soundFx } from '../utils/audio';
import { Gamepad2, Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, Trophy, Sparkles, ChevronRight, Zap, Clock, Flame, ShieldAlert, Compass, Star } from 'lucide-react';

interface InteractiveGamesProps {
  selectedLevel: EducationLevel;
  onScoreUpdate: (points: number) => void;
  userScore: number;
}

export const InteractiveGames: React.FC<InteractiveGamesProps> = ({
  selectedLevel: initialLevel,
  onScoreUpdate,
  userScore
}) => {
  const [activeGameLevel, setActiveGameLevel] = useState<EducationLevel>(initialLevel);
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty>('medium');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  // Game slide mode: when true, picking an option immediately submits and reveals right/wrong
  const [autoSubmitOnClick, setAutoSubmitOnClick] = useState<boolean>(true);
  const [answersHistory, setAnswersHistory] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  
  // Timer & Streak system
  const [timerEnabled, setTimerEnabled] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  const [levelScores, setLevelScores] = useState<Record<EducationLevel, number>>({
    primary: 0,
    secondary: 0,
    highschool: 0
  });
  const [completedLevels, setCompletedLevels] = useState<Record<EducationLevel, boolean>>({
    primary: false,
    secondary: false,
    highschool: false
  });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  // Matching game state
  const [selectedMatchLeft, setSelectedMatchLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Get difficulty parameters
  const getDifficultySettings = (diff: GameDifficulty) => {
    switch (diff) {
      case 'easy':
        return {
          timeLimit: 60,
          multiplier: 1.0,
          label: 'Dễ (Khám phá cơ bản)',
          color: 'emerald',
          badge: '🟢 Cấp độ Dễ'
        };
      case 'medium':
        return {
          timeLimit: 45,
          multiplier: 1.5,
          label: 'Trung bình (Thông hiểu)',
          color: 'amber',
          badge: '🟡 Cấp độ Trung bình'
        };
      case 'hard':
        return {
          timeLimit: 30,
          multiplier: 2.0,
          label: 'Khó (Thách thức chuyên gia)',
          color: 'rose',
          badge: '🔴 Cấp độ Khó'
        };
    }
  };

  const currentDiffSettings = getDifficultySettings(selectedDifficulty);

  // Sync quiz pool with active level
  const getQuizPool = (): QuizQuestion[] => {
    switch (activeGameLevel) {
      case 'primary': return PRIMARY_QUIZ;
      case 'secondary': return SECONDARY_QUIZ;
      case 'highschool': return HIGHSCHOOL_QUIZ;
    }
  };

  const currentPool = getQuizPool();
  const currentQ = currentPool[currentQuestionIdx];

  // Reset timer on new question
  useEffect(() => {
    if (!isAnswerSubmitted && !completedLevels[activeGameLevel] && timerEnabled) {
      setTimeLeft(currentDiffSettings.timeLimit);
    }
  }, [currentQuestionIdx, activeGameLevel, selectedDifficulty, isAnswerSubmitted, timerEnabled]);

  // Countdown effect
  useEffect(() => {
    if (!timerEnabled || isAnswerSubmitted || completedLevels[activeGameLevel]) return;

    if (timeLeft <= 0) {
      // Auto submit with no answer (timeout)
      handleSubmitAnswer(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerEnabled, isAnswerSubmitted, completedLevels, activeGameLevel]);

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;

    if (autoSubmitOnClick) {
      // Immediate reveal mode: clicking an answer directly locks it in and reveals right or wrong!
      setSelectedOption(idx);
      handleSubmitAnswer(false, idx);
    } else {
      // 2-step mode: neutral highlight, user clicks "Kiểm Tra" to know right/wrong
      setSelectedOption(idx);
      soundFx.playClick();
    }
  };

  const handleSubmitAnswer = (isTimeout: boolean = false, chosenIdx?: number) => {
    if (isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const targetOption = chosenIdx !== undefined ? chosenIdx : selectedOption;
    const isCorrect = !isTimeout && targetOption === currentQ.correctIndex;
    
    setAnswersHistory(prev => ({
      ...prev,
      [currentQuestionIdx]: {
        selected: targetOption !== null && targetOption !== undefined ? targetOption : -1,
        isCorrect
      }
    }));

    if (isCorrect) {
      soundFx.playSuccess();
      const basePoints = activeGameLevel === 'primary' ? 20 : activeGameLevel === 'secondary' ? 30 : 40;
      const streakBonus = streakCount >= 3 ? 1.5 : streakCount >= 1 ? 1.2 : 1.0;
      const finalPoints = Math.round(basePoints * currentDiffSettings.multiplier * streakBonus);

      onScoreUpdate(finalPoints);
      setLevelScores(prev => ({ ...prev, [activeGameLevel]: prev[activeGameLevel] + finalPoints }));
      
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (currentQ.badgeEarned && !earnedBadges.includes(currentQ.badgeEarned)) {
        setEarnedBadges(prev => [...prev, currentQ.badgeEarned!]);
      }
    } else {
      soundFx.playWrong();
      setStreakCount(0); // Reset streak
    }
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    if (currentQuestionIdx < currentPool.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setCompletedLevels(prev => ({ ...prev, [activeGameLevel]: true }));
      soundFx.playSuccess();
    }
  };

  const handleRestartQuiz = () => {
    soundFx.playClick();
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setAnswersHistory({});
    setCompletedLevels(prev => ({ ...prev, [activeGameLevel]: false }));
    setTimeLeft(currentDiffSettings.timeLimit);
    setStreakCount(0);
  };

  const handleMatchClickLeft = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setSelectedMatchLeft(id);
    soundFx.playClick();
  };

  const handleMatchClickRight = (matchId: string) => {
    if (!selectedMatchLeft) return;
    if (selectedMatchLeft === matchId) {
      soundFx.playSuccess();
      setMatchedPairs(prev => [...prev, matchId]);
      onScoreUpdate(Math.round(30 * currentDiffSettings.multiplier));
      setSelectedMatchLeft(null);
    } else {
      soundFx.playClick();
      setSelectedMatchLeft(null);
    }
  };

  const isCurrentLevelFinished = completedLevels[activeGameLevel];

  return (
    <div className="space-y-6">
      {/* Title & Level & Difficulty Configuration Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 rounded-2xl p-5 sm:p-7 text-white border border-emerald-300/30 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 mb-2 backdrop-blur-sm">
              <Gamepad2 className="w-4 h-4 text-orange-200" />
              <span>Đấu Trường Trí Tuệ & Khám Phá Địa Lí 11</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-xs">
              Game Khám Phá Sông Mê Công
            </h1>
            <p className="text-emerald-50 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Thử thách kiến thức về dòng sông Mẹ Mê Công, Ủy hội MRC, tài nguyên Đồng bằng sông Cửu Long và chiến lược Thuận thiên theo các cấp độ khó tùy chọn!
            </p>
          </div>

          {/* User Stats Card */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-white/30 shadow-sm">
            <div className="px-3 py-1.5 rounded-xl bg-orange-400 text-slate-900 text-xs font-black flex items-center gap-1.5 shadow-sm">
              <Award className="w-4 h-4 text-orange-950" />
              <span>{userScore} Điểm</span>
            </div>

            {streakCount > 1 && (
              <div className="px-3 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold flex items-center gap-1 animate-pulse shadow-sm">
                <Flame className="w-4 h-4 text-orange-200" />
                <span>Combo x{streakCount}!</span>
              </div>
            )}
          </div>
        </div>

        {/* CẤP ĐỘ KHÓ CỦA GAME (Difficulty Selector Bar) */}
        <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-orange-200" />
              Cấp độ khó của game:
            </span>
            <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-xl shadow-xs border border-white/60">
              <button
                id="diff-btn-easy"
                onClick={() => {
                  setSelectedDifficulty('easy');
                  soundFx.playClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDifficulty === 'easy'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
                }`}
              >
                🟢 Dễ (x1.0)
              </button>
              <button
                id="diff-btn-medium"
                onClick={() => {
                  setSelectedDifficulty('medium');
                  soundFx.playClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDifficulty === 'medium'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-orange-700 hover:bg-slate-100'
                }`}
              >
                🟠 Trung Bình (x1.5)
              </button>
              <button
                id="diff-btn-hard"
                onClick={() => {
                  setSelectedDifficulty('hard');
                  soundFx.playClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDifficulty === 'hard'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                🔴 Khó - Chuyên Gia (x2.0)
              </button>
            </div>
          </div>

          {/* Education Level Switcher */}
          <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-xl shadow-xs border border-white/60">
            <span className="text-xs text-slate-600 px-1 hidden md:inline font-medium">Khối lớp:</span>
            <button
              id="game-tab-primary"
              onClick={() => {
                setActiveGameLevel('primary');
                handleRestartQuiz();
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeGameLevel === 'primary'
                  ? 'bg-orange-500 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-orange-700 hover:bg-slate-100'
              }`}
            >
              Tiểu học
            </button>
            <button
              id="game-tab-secondary"
              onClick={() => {
                setActiveGameLevel('secondary');
                handleRestartQuiz();
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeGameLevel === 'secondary'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              THCS
            </button>
            <button
              id="game-tab-highschool"
              onClick={() => {
                setActiveGameLevel('highschool');
                handleRestartQuiz();
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeGameLevel === 'highschool'
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
              }`}
            >
              THPT Lớp 11
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Active Question */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm text-slate-800">
          {!isCurrentLevelFinished && currentQ ? (
            <div>
              {/* Slide progress, timer, mode controls and grade badge */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {currentQ.gradeLevelTag}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {currentDiffSettings.badge}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Slide {currentQuestionIdx + 1} / {currentPool.length}
                  </span>
                </div>

                {/* Timer, Mode toggle & Hint Controls */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Answer mode switch */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[11px]">
                    <button
                      onClick={() => {
                        setAutoSubmitOnClick(true);
                        soundFx.playClick();
                      }}
                      className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        autoSubmitOnClick
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Bấm chọn đáp án là biết ngay Đúng hay Sai"
                    >
                      ⚡ Chấm ngay
                    </button>
                    <button
                      onClick={() => {
                        setAutoSubmitOnClick(false);
                        soundFx.playClick();
                      }}
                      className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        !autoSubmitOnClick
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Chọn đáp án rồi mới bấm nút Kiểm tra để biết đúng hay sai"
                    >
                      🎯 Bấm nút kiểm tra
                    </button>
                  </div>

                  {/* Countdown Timer */}
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    timeLeft <= 10 && !isAnswerSubmitted
                      ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{timerEnabled ? `${timeLeft}s` : 'Vô hạn'}</span>
                    <button
                      onClick={() => setTimerEnabled(!timerEnabled)}
                      className="text-[10px] text-slate-500 hover:text-slate-800 underline ml-1 cursor-pointer"
                    >
                      {timerEnabled ? 'Tắt' : 'Bật'}
                    </button>
                  </div>

                  {currentQ.hint && (
                    <button
                      onClick={() => {
                        setShowHint(!showHint);
                        soundFx.playClick();
                      }}
                      className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1 font-bold cursor-pointer bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Slide Navigation Dots / Quick Jump */}
              <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                  Slide câu:
                </span>
                {currentPool.map((_, sIdx) => {
                  const history = answersHistory[sIdx];
                  const isCurrent = sIdx === currentQuestionIdx;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => {
                        if (isAnswerSubmitted || history || sIdx <= currentQuestionIdx) {
                          setCurrentQuestionIdx(sIdx);
                          setSelectedOption(history ? history.selected : null);
                          setIsAnswerSubmitted(!!history);
                          setShowHint(false);
                          soundFx.playClick();
                        }
                      }}
                      disabled={!history && sIdx > currentQuestionIdx}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'bg-teal-600 text-white ring-2 ring-teal-400/60 shadow-xs scale-105'
                          : history?.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : history && !history.isCorrect
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60'
                      }`}
                      title={`Slide ${sIdx + 1}`}
                    >
                      {sIdx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIdx + 1) / currentPool.length) * 100}%` }}
                />
              </div>

              {/* Hint Callout if opened */}
              {showHint && currentQ.hint && (
                <div className="p-3.5 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Gợi ý sư phạm:</strong> {currentQ.hint}</span>
                </div>
              )}

              {/* Question Text */}
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optStyle = 'bg-slate-50/90 border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 text-slate-800';
                  let badgeLabel = null;

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/50 shadow-xs';
                      badgeLabel = (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Đáp án đúng</span>
                        </span>
                      );
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-400/40 shadow-xs';
                      badgeLabel = (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[11px] flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Bạn chọn (Chưa đúng)</span>
                        </span>
                      );
                    } else {
                      optStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    // Selected state before evaluating: clean neutral Sky Blue (never green or red!)
                    optStyle = 'bg-sky-50/90 border-sky-500 text-sky-950 font-bold ring-2 ring-sky-400/40 shadow-xs';
                    badgeLabel = (
                      <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 font-bold text-[11px] flex items-center gap-1">
                        <span>Đã chọn</span>
                      </span>
                    );
                  }

                  return (
                    <button
                      key={idx}
                      id={`option-btn-${idx}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 shadow-xs transition-colors ${
                          isAnswerSubmitted && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isAnswerSubmitted && isSelected && !isCorrect
                            ? 'bg-rose-600 text-white'
                            : isSelected
                            ? 'bg-sky-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {badgeLabel}
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pedagogical Explanation Box after submit */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-xl border mb-6 text-xs sm:text-sm leading-relaxed ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}>
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {selectedOption === currentQ.correctIndex ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-extrabold">
                        <CheckCircle2 className="w-4 h-4" /> Chính xác! (+{Math.round((activeGameLevel === 'primary' ? 20 : activeGameLevel === 'secondary' ? 30 : 40) * currentDiffSettings.multiplier)} điểm)
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1 font-extrabold">
                        <XCircle className="w-4 h-4 text-rose-600" /> Chưa chính xác! Giải thích kiến thức chuẩn SGK:
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 font-medium">{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
                <div className="text-xs text-slate-500 font-medium">
                  {!isAnswerSubmitted ? (
                    autoSubmitOnClick ? (
                      <span className="text-teal-700 font-semibold flex items-center gap-1">
                        💡 Bấm chọn 1 đáp án bất kì để biết ngay Đúng hay Sai!
                      </span>
                    ) : (
                      <span className="text-slate-600">
                        {selectedOption === null 
                          ? 'Hãy chọn 1 đáp án rồi bấm "Kiểm Tra Đáp Án"' 
                          : 'Đã chọn đáp án. Bấm "Kiểm Tra Đáp Án" để xem kết quả!'}
                      </span>
                    )
                  ) : (
                    <span className="font-semibold text-slate-700">
                      {selectedOption === currentQ.correctIndex ? '🎉 Chúc mừng bạn đã trả lời đúng!' : '💡 Đọc kĩ phần giải thích để nhớ bài nhé!'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!isAnswerSubmitted ? (
                    !autoSubmitOnClick && (
                      <button
                        id="submit-answer-btn"
                        onClick={() => handleSubmitAnswer(false)}
                        disabled={selectedOption === null}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                          selectedOption !== null
                            ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500 shadow-md animate-pulse'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Kiểm Tra Đáp Án</span>
                      </button>
                    )
                  ) : (
                    <button
                      id="next-question-btn"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-md flex items-center gap-1.5 cursor-pointer transition-all transform hover:scale-105"
                    >
                      <span>{currentQuestionIdx < currentPool.length - 1 ? 'Câu Tiếp Theo' : 'Xem Bảng Kết Quả'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Completion Screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Xuất Sắc! Bạn Đã Chinh Phục Cấp Độ Này!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Bạn đã hoàn thành thử thách với cấp độ khó{' '}
                <span className="text-teal-700 font-bold">{currentDiffSettings.label}</span>.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 inline-block text-left min-w-[280px] space-y-1.5">
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-500">Điểm vòng này:</span>
                  <span className="font-bold text-teal-700">+{levelScores[activeGameLevel]} Điểm</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-500">Chuỗi combo dài nhất:</span>
                  <span className="font-bold text-rose-600">{bestStreak} câu liên tiếp 🔥</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-500">Tổng điểm tích lũy:</span>
                  <span className="font-bold text-amber-600">{userScore} Điểm</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  id="restart-quiz-btn"
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all cursor-pointer border border-slate-300"
                >
                  <RotateCcw className="w-4 h-4 text-teal-600" />
                  <span>Chơi Lại Vòng Này</span>
                </button>
                <button
                  onClick={() => {
                    const nextDiff: GameDifficulty = selectedDifficulty === 'easy' ? 'medium' : 'hard';
                    setSelectedDifficulty(nextDiff);
                    handleRestartQuiz();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Nâng Cấp Độ Khó</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Mini Game Ghép Nối & Danh Hiệu */}
        <div className="lg:col-span-4 space-y-5">
          {/* Matching Mini-Game */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 text-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Mini-Game: Ghép Cặp Khái Niệm</span>
              </div>
              <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {matchedPairs.length}/{DRAG_MATCH_ITEMS.length} Cặp
              </span>
            </div>

            <p className="text-[11px] text-slate-600">
              Nhấp chọn 1 ô bên trái rồi nhấp ô đối ứng bên phải để ghép cặp kiến thức chính xác:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Left column */}
              <div className="space-y-2">
                {DRAG_MATCH_ITEMS.map(item => {
                  const isMatched = matchedPairs.includes(item.id);
                  const isSelected = selectedMatchLeft === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMatchClickLeft(item.id)}
                      disabled={isMatched}
                      className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all text-xs cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60 line-through'
                          : isSelected
                          ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm font-bold'
                          : 'bg-slate-50 border-slate-200 hover:border-teal-400 text-slate-700'
                      }`}
                    >
                      {item.leftText}
                    </button>
                  );
                })}
              </div>

              {/* Right column */}
              <div className="space-y-2">
                {DRAG_MATCH_ITEMS.map(item => {
                  const isMatched = matchedPairs.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMatchClickRight(item.id)}
                      disabled={isMatched}
                      className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all text-xs cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60'
                          : selectedMatchLeft
                          ? 'bg-amber-50 border-amber-400 hover:bg-amber-100 text-amber-900 font-semibold animate-pulse'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {item.rightText}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Badges Cabinet */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 text-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Huy Hiệu Đã Đạt Được ({earnedBadges.length})</span>
            </div>

            {earnedBadges.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                Trả lời đúng các câu hỏi ở các cấp độ khó để mở khóa bộ huy hiệu danh giá!
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {earnedBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* FPT School Badge Info */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-emerald-50 border border-amber-200 text-xs text-slate-700 space-y-1.5 shadow-sm">
            <span className="font-bold text-amber-800 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Trường TH, THCS & THPT FPT Hậu Giang</span>
            </span>
            <p className="text-[11px] text-slate-600">
              61C Ấp 6, xã Vị Thủy, Thành phố Cần Thơ.
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Ứng dụng học tập số hóa chuyên sâu về sông Mê Công & Đồng bằng sông Cửu Long.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
