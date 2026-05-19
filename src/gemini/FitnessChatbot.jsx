import React, { useState, useEffect, useRef } from 'react';

const FitnessChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Welcome to the powerhouse. I'm your FITPULSE assistant. Ready to level up?" }
  ]);
  
  // Calculator States
  const [calcStep, setCalcStep] = useState(0); // 0: Idle, 1: Awaiting Weight, 2: Awaiting Height
  const [stats, setStats] = useState({ weight: '', height: '' });
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const startCalculator = () => {
    addMessage('user', 'Run Goal Calculator');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('bot', "Let's track those gains. First, what is your weight in KG?");
      setCalcStep(1);
    }, 800);
  };

  const handleCalcInput = (value) => {
    if (calcStep === 1) {
      setStats({ ...stats, weight: value });
      addMessage('user', `${value} kg`);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', "Got it. Now, what is your height in cm?");
        setCalcStep(2);
      }, 800);
    } else if (calcStep === 2) {
      const heightM = value / 100;
      const bmi = (stats.weight / (heightM * heightM)).toFixed(1);
      addMessage('user', `${value} cm`);
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        let advice = bmi < 18.5 ? "Time to bulk! Focus on strength training and surplus." : 
                     bmi < 25 ? "Perfect balance. Focus on maintenance and toning!" : 
                     "Let's burn it off! HIIT and cardio are calling your name.";
        
        addMessage('bot', `Your BMI is ${bmi}. ${advice}`);
        setCalcStep(0); // Reset
      }, 1200);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans text-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 w-16 h-16 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.6)] flex items-center justify-center text-2xl hover:scale-110 transition-all animate-pulse"
      >
        {isOpen ? <span className="text-black font-bold">✕</span> : "🔥"}
      </button>

      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[350px] h-[550px] bg-zinc-950 border border-orange-500/40 rounded-3xl flex flex-col shadow-2xl overflow-hidden ring-1 ring-white/10">
          {/* Header */}
          <div className="bg-orange-500 p-5 shrink-0">
            <h3 className="text-black font-black italic uppercase tracking-tighter leading-none">FitPulse AI</h3>
            <span className="text-[10px] text-black/60 font-bold uppercase">Health Analytics Active</span>
          </div>
          
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${
                  msg.role === 'user' ? 'bg-orange-500 text-black font-bold' : 'bg-zinc-900 border border-zinc-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 p-3 rounded-2xl flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Footer: Actions vs Inputs */}
          <div className="p-4 bg-zinc-900/80 border-t border-zinc-800">
            {calcStep === 0 ? (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={startCalculator}
                  className="w-full py-2.5 bg-orange-500 text-black font-black uppercase text-xs skew-x-[-10deg] hover:bg-white transition-colors"
                >
                  🚀 Start Goal Calculator
                </button>
                
              </div>
            ) : (
              <div className="flex gap-2">
                <input 
                  type="number"
                  placeholder={calcStep === 1 ? "Enter Weight (kg)" : "Enter Height (cm)"}
                  className="flex-1 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      handleCalcInput(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button className="bg-orange-500 text-black px-4 rounded-lg font-bold">↵</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessChatbot;