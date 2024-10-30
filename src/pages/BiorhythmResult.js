import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './BiorhythmResult.css';

const BiorhythmResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const result = params.get('result');

  const [style4Result, setStyle4Result] = useState(null);

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

  const phaseAdvice = {
    'フレックスタイプ': ['調子◎ チャレンジの時期', '調子○ 直感を信じて行動', '調子△ できることだけ集中', '調子✕ 休息の時期'],
    'エースタイプ': ['調子✕ 休息の時期', '調子△ できることだけ集中', '調子○ 直感を信じて行動', '調子◎ チャレンジの時期'],
    'パワータイプ': ['調子△ できることだけ集中', '調子✕ 休息の時期', '調子◎ チャレンジの時期', '調子○ 直感を信じて行動'],
    'バランサータイプ': ['調子○ 直感を信じて行動', '調子△ できることだけ集中', '調子✕ 休息の時期', '調子◎ チャレンジの時期'],
  };

  const currentPhaseAdvice = style4Result ? phaseAdvice[style4Result][0] : '情報が不足しています';

  return (
    <div className="biorhythm-result-container">
      <h1>診断結果</h1>
      <p>今のあなたが潜在的に見たいと感じている作品は「{result}」です。</p>

      <div className="explanation">
        <h2>補足説明</h2>
        <p>この図は、私たち人間が繰り返してきた歴史を表しています...</p>
      </div>

      <h2>タイプ別の好不調の診断結果</h2>
      <div className="type-result">
        <p>あなたのタイプは：{style4Result}</p>
        <p>{currentPhaseAdvice}</p>
      </div>
    </div>
  );
};

export default BiorhythmResult;
