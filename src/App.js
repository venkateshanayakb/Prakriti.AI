import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, PieChart, Pie } from 'recharts';

// Question database with dosha weights
const QUESTIONS = [
  {
    id: 1,
    category: "Physical Characteristics",
    question: "What is your body frame?",
    options: [
      { text: "Thin, light, difficulty gaining weight", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Medium build, moderate weight", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Large, heavy, gains weight easily", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 2,
    category: "Physical Characteristics",
    question: "How would you describe your skin?",
    options: [
      { text: "Dry, rough, cool, thin", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Warm, oily, prone to rashes or acne", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Thick, moist, smooth, cool", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 3,
    category: "Physical Characteristics",
    question: "What is your hair like?",
    options: [
      { text: "Dry, brittle, thin", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Fine, oily, early graying or thinning", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Thick, lustrous, strong, oily", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 4,
    category: "Physical Characteristics",
    question: "How are your joints?",
    options: [
      { text: "Thin, prominent, crack easily", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Moderate, flexible", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Large, well-formed, strong", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 5,
    category: "Digestion & Appetite",
    question: "How is your appetite?",
    options: [
      { text: "Irregular, variable, sometimes forget to eat", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Strong, sharp, get irritable when hungry", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Steady, can skip meals without discomfort", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 6,
    category: "Digestion & Appetite",
    question: "What is your digestion like?",
    options: [
      { text: "Irregular, prone to gas and bloating", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Quick, strong, sometimes burning sensation", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Slow, steady, heavy feeling after meals", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 7,
    category: "Digestion & Appetite",
    question: "What is your bowel movement pattern?",
    options: [
      { text: "Irregular, tends toward constipation, hard stools", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Regular, 2-3 times daily, soft", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Regular, heavy, can be sluggish", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 8,
    category: "Thermal Tolerance",
    question: "How do you respond to cold weather?",
    options: [
      { text: "Dislike cold, hands and feet get cold easily", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Tolerate cold well, prefer cooler temperatures", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Tolerate cold moderately, can adapt", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 9,
    category: "Thermal Tolerance",
    question: "How do you respond to heat?",
    options: [
      { text: "Tolerate heat well, enjoy warmth", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Dislike heat, get irritable, sweat easily", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Tolerate heat moderately, slow to warm up", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 10,
    category: "Sleep Patterns",
    question: "How is your sleep?",
    options: [
      { text: "Light, interrupted, difficulty falling asleep", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Moderate, sound, wake up refreshed", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Deep, heavy, long, hard to wake up", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 11,
    category: "Sleep Patterns",
    question: "How many hours of sleep do you need?",
    options: [
      { text: "Variable, 5-7 hours, often restless", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Moderate, 6-8 hours", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Long, 8-10 hours, love sleeping", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 12,
    category: "Mental & Emotional",
    question: "How is your mental activity?",
    options: [
      { text: "Quick, active, restless mind", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Sharp, penetrating, focused", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Calm, steady, slow to process", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 13,
    category: "Mental & Emotional",
    question: "How do you handle stress?",
    options: [
      { text: "Get anxious, worried, nervous", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Get irritable, angry, frustrated", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Remain calm, withdrawn, sometimes depressed", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 14,
    category: "Mental & Emotional",
    question: "How is your memory?",
    options: [
      { text: "Quick to learn, quick to forget", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Sharp memory, good recall", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Slow to learn, but excellent long-term retention", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 15,
    category: "Mental & Emotional",
    question: "What is your emotional nature?",
    options: [
      { text: "Enthusiastic, changeable, moody", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Intense, passionate, determined", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Calm, content, affectionate", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 16,
    category: "Behavioral Traits",
    question: "How do you spend money?",
    options: [
      { text: "Impulsively, on varied things", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Purposefully, on quality items", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Carefully, save money well", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 17,
    category: "Behavioral Traits",
    question: "What is your activity level?",
    options: [
      { text: "Always moving, restless energy", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Moderate, goal-oriented activity", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Slow, steady, prefer sedentary activities", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 18,
    category: "Behavioral Traits",
    question: "How do you make decisions?",
    options: [
      { text: "Quickly, but often change mind", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Decisively, stick to decisions", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Slowly, after much deliberation", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 19,
    category: "Behavioral Traits",
    question: "How do you speak?",
    options: [
      { text: "Fast, talkative, sometimes scattered", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Clear, articulate, convincing", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Slow, measured, melodious", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  },
  {
    id: 20,
    category: "Physical Characteristics",
    question: "How do you walk?",
    options: [
      { text: "Fast, light steps, irregular pace", weights: { vata: 3, pitta: 0, kapha: 0 } },
      { text: "Moderate pace, purposeful", weights: { vata: 0, pitta: 3, kapha: 0 } },
      { text: "Slow, steady, graceful", weights: { vata: 0, pitta: 0, kapha: 3 } }
    ]
  }
];

// Prakriti descriptions for all dosha pairs
const PRAKRITI_DESCRIPTIONS = {
  "Vata-Pitta": "A combination of movement and transformation. You possess both creative energy and focused intensity. Balance your quick mind with cooling practices and maintain regular routines.",
  "Vata-Kapha": "A combination of movement and stability. You blend changeability with groundedness. Focus on warmth, stimulation, and avoiding excess heaviness or stagnation.",
  "Pitta-Vata": "Led by transformation with creative energy. You have sharp intellect combined with adaptability. Balance your intensity with calming practices and stable routines.",
  "Pitta-Kapha": "A combination of transformation and stability. You possess both drive and endurance. Balance your intensity with cooling, calming practices while maintaining activity.",
  "Kapha-Vata": "Led by stability with creative elements. You have groundedness with bursts of energy. Focus on regular activity and warmth to balance these qualities.",
  "Kapha-Pitta": "Led by stability with transformative power. You combine endurance with purposeful action. Maintain activity levels and incorporate stimulating practices."
};

const PrakritiDashboard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Calculate percentages
  const totalScore = scores.vata + scores.pitta + scores.kapha;
  const percentages = {
    vata: totalScore > 0 ? (scores.vata / totalScore) * 100 : 0,
    pitta: totalScore > 0 ? (scores.pitta / totalScore) * 100 : 0,
    kapha: totalScore > 0 ? (scores.kapha / totalScore) * 100 : 0
  };

  // Get top 2 doshas with their colors (no blending)
  const getTopTwoDoshas = () => {
    const doshaArray = [
      { name: 'vata', percentage: percentages.vata, color: 'rgb(200, 190, 210)' }, // Light grey/violet
      { name: 'pitta', percentage: percentages.pitta, color: 'rgb(255, 140, 80)' }, // Warm orange/red
      { name: 'kapha', percentage: percentages.kapha, color: 'rgb(80, 150, 180)' }  // Cool blue/teal
    ];
    
    // Sort by percentage descending
    doshaArray.sort((a, b) => b.percentage - a.percentage);
    
    return {
      primary: doshaArray[0],
      secondary: doshaArray[1]
    };
  };

  // Get human colors - separate, no blending
  const getHumanColors = () => {
    if (totalScore === 0) {
      return {
        upper: 'rgb(180, 180, 180)',
        lower: 'rgb(180, 180, 180)'
      };
    }
    
    const top2 = getTopTwoDoshas();
    return {
      upper: top2.primary.color,
      lower: top2.secondary.color
    };
  };

  // Get top two doshas as a pair (always returns pair format)
  const getTopDoshasPair = () => {
    const sorted = Object.entries(percentages)
      .sort((a, b) => b[1] - a[1]);
    
    const primary = sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1);
    const secondary = sorted[1][0].charAt(0).toUpperCase() + sorted[1][0].slice(1);
    
    return `${primary}-${secondary}`;
  };

  const handleAnswer = (optionIndex) => {
    const question = QUESTIONS[currentQuestion];
    const option = question.options[optionIndex];
    
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      // Update scores
      setScores(prev => ({
        vata: prev.vata + option.weights.vata,
        pitta: prev.pitta + option.weights.pitta,
        kapha: prev.kapha + option.weights.kapha
      }));
      
      // Save answer
      setAnswers(prev => ({
        ...prev,
        [question.id]: optionIndex
      }));
      
      // Move to next question or complete
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setIsComplete(true);
      }
    }, 300);
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setScores({ vata: 0, pitta: 0, kapha: 0 });
    setAnswers({});
    setIsComplete(false);
    setSelectedOption(null);
  };

  if (isComplete) {
    const prakritiType = getTopDoshasPair();
    const chartData = [
      { name: 'Vata', value: percentages.vata, color: '#C8BED4' },
      { name: 'Pitta', value: percentages.pitta, color: '#FF8C50' },
      { name: 'Kapha', value: percentages.kapha, color: '#5096B4' }
    ];
    const colors = getHumanColors();

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e4df 100%)',
        fontFamily: '"Crimson Pro", "Spectral", Georgia, serif',
        padding: '2rem'
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700&family=Karla:wght@300;400;600&display=swap');
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          .stagger-1 { animation-delay: 0.1s; opacity: 0; }
          .stagger-2 { animation-delay: 0.2s; opacity: 0; }
          .stagger-3 { animation-delay: 0.3s; opacity: 0; }
          .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        `}</style>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }} className="fade-in">
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '300',
              color: '#2c1810',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>Your Prakriti Profile</h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b5d52',
              fontFamily: '"Karla", sans-serif',
              fontWeight: '300'
            }}>Assessment Complete</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Human Figure Visualization */}
            <div className="fade-in stagger-1" style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '2rem',
                color: '#2c1810',
                fontWeight: '400'
              }}>Dosha Visualization</h3>
              <svg width="200" height="400" viewBox="0 0 200 400" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}>
                <defs>
                  <linearGradient id="upperBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: colors.upper, stopOpacity: 0.95 }} />
                    <stop offset="100%" style={{ stopColor: colors.upper, stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="lowerBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: colors.lower, stopOpacity: 0.95 }} />
                    <stop offset="100%" style={{ stopColor: colors.lower, stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* Head - Upper body color */}
                <ellipse cx="100" cy="50" rx="22" ry="28" fill="url(#upperBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
                
                {/* Neck - Upper body color */}
                <path d="M90,75 L90,95 L110,95 L110,75" fill="url(#upperBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
                
                {/* Torso - Upper body color */}
                <ellipse cx="100" cy="145" rx="35" ry="55" fill="url(#upperBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
                
                {/* Left Arm - Upper body color */}
                <path d="M70,110 Q60,130 55,155 Q52,175 58,195" 
                  fill="none" stroke="url(#upperBodyGradient)" strokeWidth="16" strokeLinecap="round" />
                <path d="M70,110 Q60,130 55,155 Q52,175 58,195" 
                  fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Right Arm - Upper body color */}
                <path d="M130,110 Q140,130 145,155 Q148,175 142,195" 
                  fill="none" stroke="url(#upperBodyGradient)" strokeWidth="16" strokeLinecap="round" />
                <path d="M130,110 Q140,130 145,155 Q148,175 142,195" 
                  fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Left Hand - Upper body color */}
                <ellipse cx="58" cy="200" rx="8" ry="10" fill="url(#upperBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
                
                {/* Right Hand - Upper body color */}
                <ellipse cx="142" cy="200" rx="8" ry="10" fill="url(#upperBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
                
                {/* Hips - Lower body color */}
                <ellipse cx="100" cy="210" rx="32" ry="20" fill="url(#lowerBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
                
                {/* Left Leg - Lower body color */}
                <path d="M80,220 Q75,270 77,320 L77,370" 
                  fill="none" stroke="url(#lowerBodyGradient)" strokeWidth="20" strokeLinecap="round" />
                <path d="M80,220 Q75,270 77,320 L77,370" 
                  fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Right Leg - Lower body color */}
                <path d="M120,220 Q125,270 123,320 L123,370" 
                  fill="none" stroke="url(#lowerBodyGradient)" strokeWidth="20" strokeLinecap="round" />
                <path d="M120,220 Q125,270 123,320 L123,370" 
                  fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Left Foot - Lower body color */}
                <ellipse cx="77" cy="380" rx="12" ry="8" fill="url(#lowerBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
                
                {/* Right Foot - Lower body color */}
                <ellipse cx="123" cy="380" rx="12" ry="8" fill="url(#lowerBodyGradient)" stroke="#2c1810" strokeWidth="2.5" />
              </svg>
              <div style={{
                marginTop: '2rem',
                textAlign: 'center',
                fontFamily: '"Karla", sans-serif'
              }}>
                <div style={{ color: '#6b5d52', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  Current Top 2 Doshas
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {(() => {
                    const doshaArray = [
                      { name: 'Vata', percentage: percentages.vata, color: '#C8BED4' },
                      { name: 'Pitta', percentage: percentages.pitta, color: '#FF8C50' },
                      { name: 'Kapha', percentage: percentages.kapha, color: '#5096B4' }
                    ];
                    doshaArray.sort((a, b) => b.percentage - a.percentage);
                    
                    return doshaArray.slice(0, 2).map((dosha, idx) => (
                      <div key={dosha.name} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <div style={{
                          width: idx === 0 ? '50px' : '40px',
                          height: idx === 0 ? '50px' : '40px',
                          background: dosha.color,
                          borderRadius: '50%',
                          border: '3px solid #2c1810',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          transition: 'all 0.5s ease'
                        }} />
                        <div style={{
                          fontSize: idx === 0 ? '0.95rem' : '0.85rem',
                          fontWeight: idx === 0 ? '600' : '500',
                          color: '#2c1810'
                        }}>
                          {dosha.name}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b5d52'
                        }}>
                          {dosha.percentage.toFixed(0)}%
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* Prakriti Type Card */}
            <div className="fade-in stagger-2" style={{
              background: 'linear-gradient(135deg, #2c1810 0%, #4a3428 100%)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              color: 'white'
            }}>
              <div style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '1rem',
                opacity: 0.8,
                fontFamily: '"Karla", sans-serif'
              }}>Your Constitution</div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '600',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>{prakritiType}</h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                opacity: 0.95,
                fontFamily: '"Karla", sans-serif',
                fontWeight: '300'
              }}>
                {PRAKRITI_DESCRIPTIONS[prakritiType] || PRAKRITI_DESCRIPTIONS["Vata-Pitta"]}
              </p>
            </div>
          </div>

          {/* Dosha Breakdown */}
          <div className="fade-in stagger-3" style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              marginBottom: '2rem',
              color: '#2c1810',
              fontWeight: '400'
            }}>Dosha Distribution</h3>
            
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {chartData.map((dosha, idx) => (
                <div key={dosha.name}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontFamily: '"Karla", sans-serif'
                  }}>
                    <span style={{ fontWeight: '600', color: '#2c1810' }}>{dosha.name}</span>
                    <span style={{ color: '#6b5d52' }}>{dosha.value.toFixed(1)}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '40px',
                    background: '#f0ebe6',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${dosha.value}%`,
                      height: '100%',
                      background: dosha.color,
                      borderRadius: '10px',
                      transition: 'width 1s ease-out',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Note */}
          <div className="fade-in stagger-4" style={{
            background: '#fff9f0',
            border: '2px solid #e8d5b7',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            fontFamily: '"Karla", sans-serif'
          }}>
            <div style={{
              fontSize: '0.85rem',
              color: '#8b7355',
              lineHeight: '1.6'
            }}>
              <strong style={{ color: '#2c1810' }}>Important Note:</strong> This assessment is for educational and self-awareness purposes only. It does not constitute medical advice, diagnosis, or treatment. For personalized health guidance, please consult a qualified Ayurvedic practitioner or healthcare professional.
            </div>
          </div>

          {/* Action Button */}
          <div style={{ textAlign: 'center' }} className="fade-in stagger-4">
            <button
              onClick={restartAssessment}
              style={{
                background: '#2c1810',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                fontSize: '1.1rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: '"Karla", sans-serif',
                fontWeight: '600',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(44, 24, 16, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(44, 24, 16, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(44, 24, 16, 0.3)';
              }}
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion) / QUESTIONS.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e4df 100%)',
      fontFamily: '"Crimson Pro", "Spectral", Georgia, serif',
      padding: '2rem'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700&family=Karla:wght@300;400;600&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
        
        .option-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .option-button:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }
        
        .option-button.selected {
          animation: pulse 0.3s ease-out;
        }
      `}</style>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '3rem',
        alignItems: 'start'
      }}>
        {/* Main Question Area */}
        <div>
          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '300',
              color: '#2c1810',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>Prakriti Analysis</h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b5d52',
              fontFamily: '"Karla", sans-serif',
              fontWeight: '300'
            }}>Discover your Ayurvedic constitution</p>
          </div>

          {/* Progress Bar */}
          <div style={{
            marginBottom: '2rem',
            background: 'white',
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              fontFamily: '"Karla", sans-serif',
              fontSize: '0.95rem'
            }}>
              <span style={{ color: '#6b5d52' }}>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
              <span style={{ color: '#2c1810', fontWeight: '600' }}>{Math.round(progress)}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#f0ebe6',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #C8BED4 0%, #FF8C50 50%, #5096B4 100%)',
                transition: 'width 0.5s ease',
                borderRadius: '10px'
              }} />
            </div>
          </div>

          {/* Question Card */}
          <div className="slide-in" style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#FF8C50',
              marginBottom: '1rem',
              fontFamily: '"Karla", sans-serif',
              fontWeight: '600'
            }}>{question.category}</div>
            
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#2c1810',
              marginBottom: '2rem',
              fontWeight: '400',
              lineHeight: '1.4'
            }}>{question.question}</h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                  className={`option-button ${selectedOption === index ? 'selected' : ''}`}
                  style={{
                    background: selectedOption === index ? '#2c1810' : 'white',
                    color: selectedOption === index ? 'white' : '#2c1810',
                    border: `2px solid ${selectedOption === index ? '#2c1810' : '#e8e4df'}`,
                    padding: '1.25rem 1.5rem',
                    borderRadius: '15px',
                    cursor: selectedOption === null ? 'pointer' : 'default',
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontFamily: '"Karla", sans-serif',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    opacity: selectedOption !== null && selectedOption !== index ? 0.4 : 1
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `2px solid ${selectedOption === index ? 'white' : '#c8bfd4'}`,
                      background: selectedOption === index ? 'white' : 'transparent',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {selectedOption === index && (
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: '#2c1810'
                        }} />
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Human Figure & Current Scores */}
        <div style={{
          position: 'sticky',
          top: '2rem'
        }}>
          {/* Human Figure Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
              color: '#2c1810',
              fontWeight: '400',
              textAlign: 'center'
            }}>Live Constitution</h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              {(() => {
                const colors = getHumanColors();
                return (
                  <svg width="160" height="320" viewBox="0 0 200 400" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}>
                    <defs>
                      <linearGradient id="upperBodyGradientLive" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: colors.upper, stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: colors.upper, stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="lowerBodyGradientLive" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: colors.lower, stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: colors.lower, stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Head - Upper body color */}
                    <ellipse cx="100" cy="50" rx="22" ry="28" fill="url(#upperBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    {/* Neck - Upper body color */}
                    <path d="M90,75 L90,95 L110,95 L110,75" fill="url(#upperBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    {/* Torso - Upper body color */}
                    <ellipse cx="100" cy="145" rx="35" ry="55" fill="url(#upperBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    {/* Left Arm - Upper body color */}
                    <path d="M70,110 Q60,130 55,155 Q52,175 58,195" 
                      fill="none" stroke="url(#upperBodyGradientLive)" strokeWidth="16" strokeLinecap="round" />
                    <path d="M70,110 Q60,130 55,155 Q52,175 58,195" 
                      fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Right Arm - Upper body color */}
                    <path d="M130,110 Q140,130 145,155 Q148,175 142,195" 
                      fill="none" stroke="url(#upperBodyGradientLive)" strokeWidth="16" strokeLinecap="round" />
                    <path d="M130,110 Q140,130 145,155 Q148,175 142,195" 
                      fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Left Hand - Upper body color */}
                    <ellipse cx="58" cy="200" rx="8" ry="10" fill="url(#upperBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    {/* Right Hand - Upper body color */}
                    <ellipse cx="142" cy="200" rx="8" ry="10" fill="url(#upperBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    {/* Hips - Lower body color */}
                    <ellipse cx="100" cy="210" rx="32" ry="20" fill="url(#lowerBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    {/* Left Leg - Lower body color */}
                    <path d="M80,220 Q75,270 77,320 L77,370" 
                      fill="none" stroke="url(#lowerBodyGradientLive)" strokeWidth="20" strokeLinecap="round" />
                    <path d="M80,220 Q75,270 77,320 L77,370" 
                      fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Right Leg - Lower body color */}
                    <path d="M120,220 Q125,270 123,320 L123,370" 
                      fill="none" stroke="url(#lowerBodyGradientLive)" strokeWidth="20" strokeLinecap="round" />
                    <path d="M120,220 Q125,270 123,320 L123,370" 
                      fill="none" stroke="#2c1810" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Left Foot - Lower body color */}
                    <ellipse cx="77" cy="380" rx="12" ry="8" fill="url(#lowerBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    {/* Right Foot - Lower body color */}
                    <ellipse cx="123" cy="380" rx="12" ry="8" fill="url(#lowerBodyGradientLive)" stroke="#2c1810" strokeWidth="2.5" />
                    
                    <style>{`
                      #upperBodyGradientLive stop,
                      #lowerBodyGradientLive stop {
                        transition: stop-color 0.8s ease;
                      }
                    `}</style>
                  </svg>
                );
              })()}
            </div>

            <div style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              color: '#6b5d52',
              fontFamily: '"Karla", sans-serif',
              marginBottom: '1rem'
            }}>
              Color blends dynamically as you answer
            </div>
          </div>

          {/* Current Scores Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
              color: '#2c1810',
              fontWeight: '400'
            }}>Current Balance</h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              {[
                { name: 'Vata', value: percentages.vata, color: '#C8BED4' },
                { name: 'Pitta', value: percentages.pitta, color: '#FF8C50' },
                { name: 'Kapha', value: percentages.kapha, color: '#5096B4' }
              ].map(dosha => (
                <div key={dosha.name}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontFamily: '"Karla", sans-serif',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{ fontWeight: '600', color: '#2c1810' }}>{dosha.name}</span>
                    <span style={{ color: '#6b5d52' }}>{dosha.value.toFixed(0)}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#f0ebe6',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${dosha.value}%`,
                      height: '100%',
                      background: dosha.color,
                      transition: 'width 0.6s ease',
                      borderRadius: '10px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrakritiDashboard;