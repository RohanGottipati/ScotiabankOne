import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { ACTIVE_MOMENT } from '../data/mockData';

const STEPS = [
  {
    id: 'experience',
    question: 'Have you invested before?',
    options: ['Never invested', 'A little', 'Yes, regularly'],
  },
  {
    id: 'horizon',
    question: 'When might you need this money?',
    options: ['Within 3 years', 'In 3–10 years', '10+ years away'],
  },
  {
    id: 'risk',
    question: 'How do you feel about risk?',
    options: ['Keep it safe', 'Some ups and downs are fine', 'I want maximum growth'],
  },
];

const TOTAL_STEPS = STEPS.length + 1; // +1 for trading account question

export default function OpenTfsaScreen() {
  const navigate = useNavigate();
  const { openTfsa } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [opening, setOpening] = useState(false);
  const [withTrading, setWithTrading] = useState(false);

  const amount = ACTIVE_MOMENT.suggestedAmount;
  const isTradingStep = step === STEPS.length;

  const handleSelect = (value) => {
    if (!isTradingStep) {
      setAnswers({ ...answers, [STEPS[step].id]: value });
    }

    if (step < STEPS.length) {
      setStep(step + 1);
    } else {
      // Trading account step answer
      const wantTrading = value === 'Yes, open one';
      setWithTrading(wantTrading);
      setOpening(true);
      setTimeout(() => {
        openTfsa(wantTrading);
        navigate('/');
      }, 1800);
    }
  };

  const progressPercent = (step / TOTAL_STEPS) * 100;

  if (opening) {
    return (
      <div className="min-h-full bg-white flex flex-col items-center justify-center px-6 gap-5">
        <div className="w-12 h-12 border-4 border-scotia-grey-200 border-t-scotia-red rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-[17px] font-semibold text-scotia-grey-900">Opening your TFSA</p>
          <p className="text-[13px] text-scotia-grey-500 mt-1">
          {withTrading ? 'Setting up your TFSA and Trading account…' : 'Setting up your Scotia Smart Investor TFSA…'}
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-scotia-grey-50 flex flex-col">
      {/* Header */}
      <div className="bg-scotia-red text-white px-5 pt-2 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : navigate('/')}
            className="p-1 -ml-1 bg-transparent border-none cursor-pointer text-white"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="text-[17px] font-semibold">Open a TFSA</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[12px] opacity-70 mt-1.5">Step {step + 1} of {TOTAL_STEPS}</p>
      </div>

      <div className="flex-1 px-4 pt-6 pb-6">
        {/* Amount banner */}
        <div className="bg-white rounded-2xl px-4 py-3 mb-6 shadow-sm flex items-center justify-between">
          <span className="text-[13px] text-scotia-grey-600">Ready to invest</span>
          <span className="text-[17px] font-bold text-scotia-red">${amount}</span>
        </div>

        {isTradingStep ? (
          <>
            <p className="text-[20px] font-bold text-scotia-grey-900 mb-2 leading-snug">
              Would you also like to open a Scotia Smart Trading account?
            </p>
            <p className="text-[13px] text-scotia-grey-500 mb-6 leading-relaxed">
              Trade stocks and ETFs directly. Takes 30 seconds — no extra paperwork needed.
            </p>
            <div className="space-y-3">
              {['Yes, open one', 'Not right now'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left border transition-all rounded-2xl px-4 py-4 cursor-pointer ${
                    opt === 'Yes, open one'
                      ? 'bg-scotia-red border-scotia-red text-white hover:bg-scotia-red-dark'
                      : 'bg-white border-scotia-grey-200 text-scotia-grey-900 hover:border-scotia-grey-400'
                  }`}
                >
                  <span className="text-[15px] font-medium">{opt}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-scotia-grey-400 text-center mt-6 leading-relaxed px-2">
              You can always open a trading account later from Advice+.
            </p>
          </>
        ) : (
          <>
            <p className="text-[20px] font-bold text-scotia-grey-900 mb-5 leading-snug">
              {STEPS[step].question}
            </p>
            <div className="space-y-3">
              {STEPS[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left bg-white border border-scotia-grey-200 hover:border-scotia-red hover:bg-scotia-red-light transition-all rounded-2xl px-4 py-4 cursor-pointer"
                >
                  <span className="text-[15px] font-medium text-scotia-grey-900">{opt}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-scotia-grey-400 text-center mt-6 leading-relaxed px-2">
              Your answers help us set up the right portfolio. You can change this anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
