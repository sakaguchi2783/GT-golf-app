import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './BiorhythmResult.css';

const BiorhythmResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const result = params.get('result');
  
  const [style4Result, setStyle4Result] = useState(null); // 初期値を null に設定

  useEffect(() => {
    const fetchStyle4Result = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('type')
          .eq('id', userId)
          .single();
        
        if (error) {
          console.error('スタイル4診断結果の取得エラー:', error.message);
        } else {
          setStyle4Result(data?.type || ''); // タイプがない場合は空文字列を設定
        }
      } else {
        console.error('ユーザーIDが見つかりません。IDが不明の場合は再度「ホーム」よりIDを取得し直し、スタイル４タイプ診断からやり直してみましょう。');
      }
    };
    fetchStyle4Result();
  }, []);

  const nextPhase = {
    '目標設定': '実行・試験',
    '実行・試験': '振り返り',
    '振り返り': '改善',
    '改善': '目標設定',
  };

  const phaseAdvice = {
    'フレックスタイプ': ['調子◎ チャレンジの時期', '調子○ 直感を信じて行動', '調子△ できることだけ集中', '調子✕ 休息の時期'],
    'エースタイプ': ['調子✕ 休息の時期', '調子△ できることだけ集中', '調子○ 直感を信じて行動', '調子◎ チャレンジの時期'],
    'パワータイプ': ['調子△ できることだけ集中', '調子✕ 休息の時期', '調子◎ チャレンジの時期', '調子○ 直感を信じて行動'],
    'バランサータイプ': ['調子○ 直感を信じて行動', '調子△ できることだけ集中', '調子✕ 休息の時期', '調子◎ チャレンジの時期'],
  };

  // style4Result や result が取得されるまでローディング状態を表示
  if (!style4Result || !result) {
    return <p>診断結果を読み込んでいます...</p>;
  }

  // phaseAdvice[style4Result]が存在するか、次のフェーズが存在するかを確認
  const phaseAdviceArray = phaseAdvice[style4Result] || [];
  const currentPhaseAdvice = phaseAdviceArray[Object.keys(nextPhase).indexOf(result)] || '情報が不足しています';

  return (
    <div className="biorhythm-result-container">
      <div className="intro-text">
        <h2>【人のバイオリズムループ】</h2>
        <p><strong>人は、目標設定をし→実行に移し→振り返り→改善に向かう…</strong></p>
        <p>この４ループを繰返し生きています。その流れの中で「良い時、悪い時」が存在します。</p>
        <p>同じループを生きていても、自分は悪いけど、あの人は調子良さそう…何てことありますよね？</p>
        <p>実は、この「良い時、悪い時」は、各タイプによって異なるのです。</p>
        <p><strong>この診断アプリを使って、知って欲しいことは、</strong></p>
        <ul>
          <li>下記、４つの項目の「どの位置に自分が位置しているのか？」（今の状態を知る）</li>
          <li>スタイル４の自身のタイプが、今いる状態の中で力を発揮しやすい時期かどうか？（自分の好不調を知る）</li>
        </ul>
        <p>この2点を見極めましょう。※バイオリズムは2週間で→に沿って移行していきます。</p>
      </div>

      <h1>バイオリズム診断結果</h1>
      
      {/* 結果の表示部分を枠で囲む */}
      <div className="result-box">
        <p>あなたのバイオリズムの結果は: <strong className="result-text">{result}</strong></p>
        <p>約2週間後に移行する状態は：<strong className="next-phase-text">{nextPhase[result] || '不明'}</strong></p>
      </div>

      <div className="result-grid">
        <div className={`phase ${result === '目標設定' ? 'blue-phase' : ''}`}>
          <h2>目標設定</h2>
          <p>・目標を立て情報収集<br />動画を見る、人と話す、ギアを調整など</p>
          ・当面のスコアや目標順位などの設定
        </div>

        <div className="arrow">→</div>

        <div className={`phase ${result === '実行・試験' ? 'blue-phase' : ''}`}>
          <h2>実行</h2>
          <p>・練習や<br />ラウンドを重ね分析</p>
          ・試合などの実践的な状況で試行錯誤し工夫
        </div>

        <div className="arrow">→</div>

        <div className={`phase ${result === '振り返り' ? 'blue-phase' : ''}`}>
          <h2>振り返り</h2>
          <p>・ラウンドや試合後の反省や振り返り</p>
          ・今後の課題を探す、決める
        </div>

        <div className="arrow">→</div>

        <div className={`phase ${result === '改善' ? 'blue-phase' : ''}`}>
          <h2>改善</h2>
          <p>・スイングなど技術の改善、最適化</p>
          ・不必要な行動を割り出し改善
        </div>
      </div>

      <div className="type-result">
        <h1>タイプ別の好不調の診断結果</h1>
        <div className="user-type-box">
          <p>あなたのタイプは：<strong>{style4Result}</strong></p>
          <p>{style4Result}のあなたは：<strong>{currentPhaseAdvice}</strong></p>
        </div>

        <div className="state-table">
          {Object.keys(phaseAdvice).map((type) => (
            <div key={type} className={`state-row ${type === style4Result ? 'highlight-type' : ''}`}>
              <div className="type-cell">{type}</div>
              {phaseAdvice[type].map((phase, index) => (
                <div
                  key={index}
                  className={`state-cell ${type === style4Result && phase === currentPhaseAdvice ? 'blue-phase' : ''}`}
                >
                  {phase}
                </div>
              ))}
            </div>
          ))}
          <p>現在のあなたの調子は、◎、〇、△、✕の4段階で表示されます。</p>
          <p>如何でしたか？このように各タイプによって好不調は異なります。</p>
          <p>この診断を参考に「今、何を行うべきか？」続けてスコア記入をしてみましょう。</p>
        </div>
      </div>
    </div>
  );
};

export default BiorhythmResult;
