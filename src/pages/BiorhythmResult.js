import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './BiorhythmResult.css';
import biorhythmImage from '../images/biorhythm.jpg';
import loopImage from '../images/loop.jpg'; // loop画像をimagesフォルダからインポート

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

const movieGenres = [
  { category: '戦争・復讐劇 系', genres: 'アクション, ホラー, 戦争ドラマ' },
  { category: '戦後サバイバル系', genres: '世界崩壊後のサバイバル, 冒険ドラマ' },
  { category: '弱者が強者を倒す系', genres: 'ヒーローもの, 逆転劇, ドラマ' },
  { category: '平和な日常系', genres: '恋愛ドラマ, コメディ, ヒューマンドラマ' }
];

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
  const radius = 90; // 円の半径を少し増やして調整
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
          <img src={loopImage} alt="人が繰り返す歴史" className="loop-image" style={{ width: '100%', maxWidth: '230px', margin: '0 auto', display: 'block' }} />
          <p style={{ fontSize: '8px', marginTop: '10px', lineHeight: '1.0' }}>
            この図は、これまで私達人間が繰り返してきた「歴史」を表しています。<br />
            この図をよく見ると、あなたが普段見ている映画やドラマが、<br />
            この４つのジャンルのどれかに属していることに気づくでしょう。
          </p>
          <p style={{ fontSize: '8px', lineHeight: '1.0' }}>
            今あなたが潜在的に見たいと感じているのは『下記の表』ようなジャンルで、<br />
            これを（食事のように）摂取することで次のフェーズに移行します。<br />
            この移行は、約２週間で切り替わると言われています。
          </p>
          
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '16px' }}>おすすめジャンル(映画・アニメ・ドラマ)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {movieGenres.map((genre, index) => (
                  <tr key={index} style={{ borderBottom: '2px solid gray' }}>
                    <td style={{
                      backgroundColor: index === currentIndex ? '#9b0303' : index === nextIndex ? '#6e7171' : 'lightgray', 
                      color: 'white', 
                      padding: '3px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      animation: index === currentIndex || index === nextIndex ? 'flash 1s ease-in-out infinite alternate' : 'none',
                      fontSize: 'clamp(8px, 1.2vw, 10px)'
                    }}>
                      {genre.category}
                    </td>
                    <td style={{ padding: '2px', textAlign: 'left', fontSize: 'clamp(8px, 1.2vw, 10px)' }}>{genre.genres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '8px', lineHeight: '1.0', marginTop: '10px' }}>
            ここまで理解できましたか？本題はここからです。<br />
            この診断結果が『あなたの好不調（状態）を示すカギ』になります。<br />
            「あなたの今の調子がどうなのか？」結果を見てみましょう！
          </p>
          
          <div className="button-container" style={{ marginTop: '1px' }}>
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
