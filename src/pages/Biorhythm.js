import React, { useState, useEffect } from 'react'; // useEffectを追加
import { useNavigate } from 'react-router-dom';
import './Biorhythm.css';

const questions = [
  '●『今日、感情的にどれくらい安定していると感じますか？』',
  '●『最近、ストレスや不安をどれくらい感じていますか？』',
  '●『人とのコミュニケーションはどうですか？』',
  '●『最近、自己嫌悪や落ち込みを感じる頻度はどれくらいですか？』',
  '●『自分の感情をコントロールできていると感じますか？』',
  '●『最近、気分が変わりやすいと感じることがありましたか？』',
  '●『リラックスやリフレッシュをする時間は確保できていますか？』'
];

const options = [
  [
    { label: 'a) とても安定している', value: 1 },
    { label: 'b) 少し揺れ動いているが、コントロールできる', value: 2 },
    { label: 'c) 感情が不安定である', value: 3 },
    { label: 'd) 非常に不安定で、コントロールが難しい', value: 4 }
  ],
  [
    { label: 'a) ほとんど感じない', value: 1 },
    { label: 'b) 時々感じる', value: 2 },
    { label: 'c) 頻繁に感じる', value: 3 },
    { label: 'd) ほぼ常に感じる', value: 4 }
  ],
  [
    { label: 'a) とても円滑で、スムーズに交流できている', value: 1 },
    { label: 'b) 時々難しいが、全般的に問題ない', value: 2 },
    { label: 'c) しばしば衝突や誤解がある', value: 3 },
    { label: 'd) 現在、他者とのコミュニケーションが難しいと感じる', value: 4 }
  ],
  [
    { label: 'a) まったく感じない', value: 1 },
    { label: 'b) たまに感じる', value: 2 },
    { label: 'c) 頻繁に感じる', value: 3 },
    { label: 'd) ほぼ毎日感じる', value: 4 }
  ],
  [
    { label: 'a) 完全にコントロールできている', value: 1 },
    { label: 'b) 大部分はコントロールできている', value: 2 },
    { label: 'c) 時々コントロールが難しい', value: 3 },
    { label: 'd) ほとんどコントロールできていない', value: 4 }
  ],
  [
    { label: 'a) まったくない', value: 1 },
    { label: 'b) 少しだけある', value: 2 },
    { label: 'c) かなりの頻度である', value: 3 },
    { label: 'd) すぐ気分が変わってしまう自分に嫌気がさす', value: 4 }
  ],
  [
    { label: 'a) 十分に確保できている', value: 1 },
    { label: 'b) 時々確保できている', value: 2 },
    { label: 'c) あまり確保できていない', value: 3 },
    { label: 'd) ほとんど確保できていない', value: 4 }
  ]
];

const Biorhythm = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const navigate = useNavigate();

  // ここを追加した: スクロール位置の保持
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
  }, [step]);

  const handleNextStep = () => setStep(step + 1);

  const handleChange = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const total = answers.reduce((acc, curr) => acc + Number(curr), 0);
    let result = '';

    if (total <= 7) {
      result = '戦争・復讐劇 系';
    } else if (total <= 14) {
      result = '戦後サバイバル系';
    } else if (total <= 21) {
      result = '弱者が強者を倒す系';
    } else {
      result = '平和な日常系';
    }

    navigate(`/biorhythm-result?result=${result}`);
  };

  return (
    <div className="biorhythm-container">
      {step === 1 && (
        <div className="intro-text">
          <h2>バイオリズム診断</h2>
          <h3>「あなたの好不調がわかる！」</h3>
          <p>
            バイオリズム診断へようこそ！<br />
            今から、あなたの感情的なことに触れていきます。<br /><br />
            あなたは普段、“YouTube”や“NETFLIX”などの、<br />
            動画配信サービスから、<br />
            ドラマや映画、ニュースやエンタメを見ていますか？<br /><br />
            絶対、見てますよね？<br /><br />
            今、すでに夢中になっている番組や作品があるかもしれませんが、<br />
            実は誰もが、潜在的に「“今は”こんなジャンルが見たい！」<br />
            という意識を常に持っています。<br /><br />
            その潜在意識を、あなたは明確に把握していますか？<br />
            「今は、甘いものが食べたい…次は、辛いものを食べたい…」という、<br />
            食と同じように、見る映画やドラマのジャンルにも<br />
            潜在的な欲求が誰にもあります。<br /><br />
            本や動画、様々なコンテンツがありますが、<br />
            「あなたが潜在的に欲している物事」<br />
            まず、それを探るために「あなたが見たいであろう…」<br />
            映画やドラマなどのジャンルを探し、<br />
            潜在的欲求を明確にしてみましょう。
          </p>
          <button onClick={handleNextStep}>次へ</button>
        </div>
      )}

      {step === 2 && (
        <div className="question-section">
          <h2>質問に答えてください</h2>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-box">
              <p>{question}</p>
              {options[questionIndex].map((option, optionIndex) => (
                <label key={optionIndex} className="option">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option.value}
                    checked={answers[questionIndex] === option.value}
                    onChange={() => handleChange(questionIndex, option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>診断結果を見る</button>
        </div>
      )}
    </div>
  );
};

export default Biorhythm;
