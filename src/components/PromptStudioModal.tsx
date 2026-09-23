import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/gamesData';
import { PromptTemplate } from '../types';
import { soundFx } from '../utils/audio';
import { Sparkles, Copy, Check, X, FileCode, Terminal, BookOpen, UserCheck } from 'lucide-react';

interface PromptStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptStudioModal: React.FC<PromptStudioModalProps> = ({ isOpen, onClose }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate>(PROMPT_TEMPLATES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedPrompt.fullPromptText);
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-emerald-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-800">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-100 flex items-center justify-between bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Bộ Prompt Chuẩn Cho Google AI Studio
              </h2>
              <p className="text-xs text-emerald-100">
                Thiết kế prompt tối ưu hóa cao cho chuyên đề Ủy hội sông Mê Công & Địa lí 11
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              soundFx.playClick();
            }}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/50">
          {/* Prompt template selector tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PROMPT_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedPrompt.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedPrompt(tmpl);
                    soundFx.playClick();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                    {tmpl.targetAudience}
                  </div>
                  <div className="text-xs font-bold mt-1 line-clamp-1">
                    {tmpl.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Description & Target Info */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Terminal className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">{selectedPrompt.title}</span>
              <p className="text-slate-600 mt-0.5">{selectedPrompt.description}</p>
            </div>
          </div>

          {/* Full Prompt Content Box */}
          <div className="relative shadow-xs rounded-xl overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs text-slate-600 font-mono">
              <span>PROMPT_SPECIFICATION.md</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all text-xs cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
              </button>
            </div>
            <pre className="bg-white p-4 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
              {selectedPrompt.fullPromptText}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>💡 Bạn có thể dán prompt này vào Google AI Studio hoặc Gemini bất cứ lúc nào!</span>
          <button
            onClick={() => {
              onClose();
              soundFx.playClick();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors cursor-pointer border border-slate-300"
          >
            Đóng Hộp Thoại
          </button>
        </div>
      </div>
    </div>
  );
};
