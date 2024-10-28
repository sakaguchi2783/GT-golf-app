import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Biorhythm.css';

// 質問データ
const questionsData = [
  '●『今日、感情的にどれくらい安定していると感じますか？』',
  '●『最近、ストレスや不安をどれくらい感じていますか？』',
  '●『人とのコミュニケーションはどうですか？』',
  '●『最近、自己嫌悪や落ち込みを感じる頻度はどれくらいですか？』',
  '●『自分の感情をコントロールできていると感じますか？』',
  '●『最近、気分が変わりやすいと感じることがありましたか？』',
  '●『リラックスやリフレッシュをする時間は確保できていますか？』'
];

// 各質問に対する選択肢データ
const options = [
  [ // 質問1
    { label: 'a) とても安定している', value: 1 },
    { label: 'b) 少し揺れ動いているが、コントロールできる', value: 2 },
    { label: 'c) 感情が不安定である', value: 3 },
    { label: 'd) 非常に不安定で、コントロールが難しい', value: 4 }
  ],
  [ // 質問2
    { label: 'a) ほとんど感じない', value: 1 },
    { label: 'b) 時々感じる', value: 2 },
    { label: 'c) 頻繁に感じる', value: 3 },
    { label: 'd) ほぼ常に感じる', value: 4 }
  ],
  [ // 質問3
    { label: 'a) とても円滑で、スムーズに交流できている', value: 1 },
    { label: 'b) 時々難しいが、全般的に問題ない', value: 2 },
    { label: 'c) しばしば衝突や誤解がある', value: 3 },
    { label: 'd) 現在、他者とのコミュニケーションが難しいと感じる', value: 4 }
  ],
  [ // 質問4
    { label: 'a) まったく感じない', value: 1 },
    { label: 'b) たまに感じる', value: 2 },
    { label: 'c) 頻繁に感じる', value: 3 },
    { label: 'd) ほぼ毎日感じる', value: 4 }
  ],
  [ // 質問5
    { label: 'a) 完全にコントロールできている', value: 1 },
    { label: 'b) 大部分はコントロールできている', value: 2 },
    { label: 'c) 時々コントロールが難しい', value: 3 },
    { label: 'd) ほとんどコントロールできていない', value: 4 }
  ],
  [ // 質問6
    { label: 'a) まったくない', value: 1 },
    { label: 'b) 少しだけある', value: 2 },
    { label: 'c) かなりの頻度である', value: 3 },
    { label: 'd) すぐ気分が変わってしまう自分に嫌気がさす', value: 4 }
  ],
  [ // 質問7
    { label: 'a) 十分に確保できている', value: 1 },
    { label: 'b) 時々確保できている', value: 2 },
    { label: 'c) あまり確保できていない', value: 3 },
    { label: 'd) ほとんど確保できていない', value: 4 }
  ]
];

const Biorhythm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (value) => {
    setAnswers([...answers, value]);
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const totalScore = answers.reduce((acc, val) => acc + val, 0);
    let result;
    if (totalScore <= 10) {
      result = '目標設定';
    } else if (totalScore <= 14) {
      result = '実行・試験';
    } else if (totalScore <= 18) {
      result = '振り返り';
    } else {
      result = '改善';
    }
    navigate(`/biorhythm-result?result=${result}`);
  };

  return (
    <div className="biorhythm-container">
      <h1>バイオリズム診断</h1>
      <p>{questionsData[currentQuestion]}</p>
      <div className="answer-options">
        {options[currentQuestion].map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option.value)}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Biorhythm;
