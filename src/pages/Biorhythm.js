import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Biorhythm.css';
import prologueImage from '../images/prologue.jpg'; // Adjust the path as needed

const questions = [
  '1⃣『今日、感情的にどれくらい安定していると感じますか？』',
  '2⃣『最近、ストレスや不安をどれくらい感じていますか？』',
  '3⃣『人とのコミュニケーションはどうですか？』',
  '4⃣『最近、自己嫌悪や落ち込みを感じる頻度はどれくらいですか？』',
  '5⃣『自分の感情をコントロールできていると感じますか？』',
  '6⃣『最近、気分が変わりやすいと感じることがありましたか？』',
  '7⃣『リラックスやリフレッシュをする時間は確保できていますか？』',
  '7⃣『リラックスやリフレッシュをする時間は確保できていますか？』',
];

const options = [
  [
    { label: 'とても安定している', value: 1 },
    { label: '少し揺れ動いているが、コントロールできる', value: 2 },
    { label: '感情が不安定である', value: 3 },
    { label: '非常に不安定で、コントロールが難しい', value: 4 }
  ],
  [
    { label: 'ほとんど感じない', value: 1 },
    { label: '時々感じる', value: 2 },
    { label: '頻繁に感じる', value: 3 },
    { label: 'ほぼ常に感じる', value: 4 }
  ],
  [
    { label: 'とても円滑で、スムーズに交流できている', value: 1 },
    { label: '時々難しいが、全般的に問題ない', value: 2 },
    { label: 'しばしば衝突や誤解がある', value: 3 },
    { label: '他者とのコミュニケーションが難しいと感じる', value: 4 }
  ],
  [
    { label: 'まったく感じない', value: 1 },
    { label: 'たまに感じる', value: 2 },
    { label: '頻繁に感じる', value: 3 },
    { label: 'ほぼ毎日感じる', value: 4 }
  ],
  [
    { label: '完全にコントロールできている', value: 1 },
    { label: '大部分はコントロールできている', value: 2 },
    { label: '時々コントロールが難しい', value: 3 },
    { label: 'ほとんどコントロールできていない', value: 4 }
  ],
  [
    { label: 'まったくない', value: 1 },
    { label: '少しだけある', value: 2 },
    { label: 'かなりの頻度である', value: 3 },
    { label: 'すぐ気分が変わってしまう自分に嫌気がさす', value: 4 }
  ],
  [
    { label: '十分に確保できている', value: 1 },
    { label: '時々確保できている', value: 2 },
    { label: 'あまり確保できていない', value: 3 },
    { label: 'ほとんど確保できていない', value: 4 }
  ],
  [
    { label: '十分に確保できている', value: 1 },
    { label: '時々確保できている', value: 2 },
    { label: 'あまり確保できていない', value: 3 },
    { label: 'ほとんど確保できていない', value: 4 }
  ],
];

const Biorhythm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const navigate = useNavigate();

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }

    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentQuestionIndex]);

  const handleAnswerChange = (event) => {
    const value = event.target.value;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = Number(value);
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) { // 修正箇所
      setCurrentQuestionIndex(currentQuestionIndex + 1); // 次の質問へ
    } else {
      handleSubmit(); // 最後の質問が回答されたら診断結果へ
    }
  };

  const handleSubmit = () => {
    const total = answers.reduce((acc, curr) => acc + Number(curr), 0);
    let result = '';

    if (total <= 7) {
      result = '戦争・復讐劇の物語';
    } else if (total <= 14) {
      result = '戦後サバイバル系の物語';
    } else if (total <= 21) {
      result = '弱者が強者を倒す物語';
    } else {
      result = '平和な日常の物語';
    }

    navigate(`/biorhythm-result?result=${result}`);
  };


  return (
    <div className="biorhythm-container">
      {currentQuestionIndex === 0 && (
        <div className="intro-text">
          <h2>バイオリズム診断</h2>
          <h3>「あなたの好不調がわかる！」</h3>
          <div className="image-container">
      <img src={prologueImage} alt="Prologue" className="prologue-image" />
    </div>
          <button onClick={() => setCurrentQuestionIndex(1)}>次へ</button>
        </div>
      )}

      {currentQuestionIndex > 0 && currentQuestionIndex <= questions.length && (
        <div className="question-section">
          <h2>７つの質問に答えてください</h2>
          <div className="question-box">
            <p>{questions[currentQuestionIndex - 1]}</p>
            {options[currentQuestionIndex - 1].map((option, optionIndex) => (
              <label key={optionIndex} className="option">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option.value}
                  checked={answers[currentQuestionIndex] === option.value}
                  onChange={handleAnswerChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Biorhythm;
