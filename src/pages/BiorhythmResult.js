import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './BiorhythmResult.css';
import biorhythmImage from '../images/biorhythm.jpg';

const categories = [
  '戦争・復讐劇の物語',
  '戦後サバイバル系の物語',
  '弱者が強者を倒す物語',
  '平和な日常の物語'
];

const phaseAdvice = {
  'フレックスタイプ': ['調子◎ チャレンジの時期', '調子○ 直感を信じて行動', '調子△ できることだけ集中', '調子✕ 休息の時期'],
  'エースタイプ': ['調子✕ 休息の時期', '調子△ できることだけ集中', '調子○ 直感を信じて行動', '調子◎ チャレンジの時期'],
  'パワータイプ': ['調子△ できることだけ集中', '調子✕ 休息の時期', '調子◎ チャレンジの時期', '調子○ 直感を信じて行動'],
  'バランサータイプ': ['調子○ 直感を信じて行動', '調子△ できることだけ集中', '調子✕ 休息の時期', '調子◎ チャレンジの時期'],
};

const BiorhythmResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const result = params.get('result');

  const [style4Result, setStyle4Result] = useState(null);
  const [step, setStep] = useState(0);

  const currentIndex = categories.indexOf(result);
  const nextIndex = (currentIndex + 1) % categories.length;

  useEffect(() => {
    const fetchStyle4Result = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('type')
          .eq('id', userId)
          .single();

        if (!error && data) {
          setStyle4Result(data.type || '');
        }
      }
    };
    fetchStyle4Result();
  }, []);

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const currentPhaseAdvice = style4Result ? phaseAdvice[style4Result][step] : '情報が不足しています';

  return (
    <div className="biorhythm-result-container">
      <h4>バイオリズム診断結果</h4>
  
      {step === 0 && (
        <div className="result-section">
          <div className="circular-graph">
            <div className="graph-container">
            {categories.map((category, index) => {
  const isCurrent = index === currentIndex;
  const isNext = index === nextIndex;
  const angle = (index / categories.length) * 360;
  const radius = 130; // 円の半径を少し増やして調整
  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);
  return (
    <div
      key={index}
      className={`category-item ${isCurrent ? 'red' : isNext ? 'blue' : 'gray'}`}
      style={{
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
      }}
    >
      {category}
    </div>
  );
})}

              <img src={biorhythmImage} alt="Biorhythm Cycle" className="center-image" />
            </div>
          </div>
          
          {/* 作品ジャンルの枠付き表示 */}
          <div className="genre-container">
            <p className="current-genre-label">▼今のあなたが潜在的に見たいと感じている作品ジャンルは▼</p>
            <p className="current-genre">{result}</p>
            
            <p className="next-genre-label">▼約2週間後に見たくなる作品ジャンルは▼</p>
            <p className="next-genre">{categories[nextIndex]}</p>
          </div>
  
          <div className="button-container">
            {step > 0 && <button onClick={handlePreviousStep}>前へ</button>}
            <button onClick={handleNextStep}>次へ</button>
          </div>
        </div>
      )}  
  
      {step === 1 && (
        <div className="result-section">
          <h2>補足説明</h2>
          <p>この図は、私たち人間が繰り返してきた歴史を表しています...</p>
          <div className="button-container">
            <button onClick={handlePreviousStep}>前へ</button>
            <button onClick={handleNextStep}>次へ</button>
          </div>
        </div>
      )}
  
      {step === 2 && (
        <div className="result-section">
          <h2>タイプ別の好不調の診断結果</h2>
          <p>あなたのタイプは：{style4Result}</p>
          <p>{currentPhaseAdvice}</p>
          <div className="button-container">
            <button onClick={handlePreviousStep}>前へ</button>
            <button onClick={handleNextStep}>次へ</button>
          </div>
        </div>
      )}
  
      {step === 3 && (
        <div className="result-section">
          <h2>タイプ別の補足</h2>
          <p>さらに詳しい情報やアドバイスがここに表示されます。</p>
          <div className="button-container">
            <button onClick={handlePreviousStep}>前へ</button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default BiorhythmResult;
