import React, { useState, useEffect } from 'react';
import './Style4.css';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { supabase } from '../supabaseClient';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const questionsData = [
  {
    id: 1,
    text: "①買い物をするとき、どのように品物を選びますか？",
    options: [
      { text: "自分の感覚ですぐに決める", type: "エース" },
      { text: "価格や品質を慎重に比較する", type: "バランサー" },
      { text: "まず友人や店員に聞き、あとは自分の感性で選ぶ", type: "パワー" },
      { text: "直感で将来敵に価値が見込めるもの", type: "フレックス" },
    ],
  },
  {
    id: 2,
    text: "②スケジュールを管理するとき、どの方法が一番しっくりきますか？",
    options: [
      { text: "無理なくきちんとした計画を立てる", type: "エース" },
      { text: "その時々によって臨機応変に対応する", type: "バランサー" },
      { text: "細かいことにこだわらず確実にこなせる状態にする", type: "パワー" },
      { text: "周囲と調整しながら進める", type: "フレックス" },
    ],
  },
  {
    id: 3,
    text: "③問題が発生したとき、どのように対処しますか？",
    options: [
      { text: "迅速に行動する", type: "エース" },
      { text: "一旦、落ち着いて考える", type: "バランサー" },
      { text: "まず誰かに相談する", type: "パワー" },
      { text: "自分の直感を信じる", type: "フレックス" },
    ],
  },
  {
    id: 4,
    text: "④重要な決断をする際、どのように考えますか？",
    options: [
      { text: "即断即決", type: "エース" },
      { text: "細部まで検討する", type: "バランサー" },
      { text: "人の意見を参考にする", type: "パワー" },
      { text: "人生はある程度決まっている、だから感覚で決める", type: "フレックス" },
    ],
  },
  {
    id: 5,
    text: "⑤ストレスを感じたとき、どのように対処しますか？",
    options: [
      { text: "体を動かす", type: "エース" },
      { text: "落ち着いて考える", type: "バランサー" },
      { text: "誰かに話す", type: "パワー" },
      { text: "リラックスする方法を見つける", type: "フレックス" },
    ],
  },
  {
    id: 6,
    text: "⑥初対面の人と話すとき、どのように感じますか？",
    options: [
      { text: "すぐに打ち解けるが、その後受け入れるかはまた別", type: "エース" },
      { text: "少し時間がかかるが話せる", type: "バランサー" },
      { text: "相手の出方を見ながら話す", type: "パワー" },
      { text: "自然体に話せる", type: "フレックス" },
    ],
  },
  {
    id: 7,
    text: "⑦新しいことに挑戦するとき、どのように感じますか？",
    options: [
      { text: "ワクワクする", type: "エース" },
      { text: "少し不安だが興味がある", type: "バランサー" },
      { text: "慎重に考える", type: "パワー" },
      { text: "自然に受け入れる", type: "フレックス" },
    ],
  },
  {
    id: 8,
    text: "⑧自分のアイデアを人に説明するとき、どうしますか？",
    options: [
      { text: "すぐに話し始める", type: "エース" },
      { text: "要点だけをまとめて話す", type: "バランサー" },
      { text: "面白さが伝わるように話す", type: "パワー" },
      { text: "直感的に説明する", type: "フレックス" },
    ],
  },
  {
    id: 9,
    text: "⑨ミーティング・会議中、どのように発言しますか？",
    options: [
      { text: "必要ならすぐに自分の意見を言う", type: "エース" },
      { text: "タイミングを見計らって発言する", type: "バランサー" },
      { text: "他の人の意見に同意しながら話す", type: "パワー" },
      { text: "自然に流れに任せて発言する", type: "フレックス" },
    ],
  },
  {
    id: 10,
    text: "⑩自由な時間ができたとき、どう過ごしますか？",
    options: [
      { text: "今やりたいことをすぐに実行", type: "エース" },
      { text: "ゆっくりと考えながら過ごす", type: "バランサー" },
      { text: "やりたかったことややるべきことを実践", type: "パワー" },
      { text: "まず誰と過ごすかを決め計画する", type: "フレックス" },
    ],
  },
  {
    id: 11,
    text: "⑪旅行の計画を立てるとき、どう進めますか？",
    options: [
      { text: "すぐに予定を決めて動き出す", type: "エース" },
      { text: "しっかりとプランを立ててから行動", type: "バランサー" },
      { text: "周囲の人に相談しながら決める", type: "パワー" },
      { text: "その時の状況や気分で決める", type: "フレックス" },
    ],
  },
  {
    id: 12,
    text: "⑫仕事や勉強を始めるとき、どのように取り組みますか？",
    options: [
      { text: "とにかくすぐに始める", type: "エース" },
      { text: "計画を立ててから進める", type: "バランサー" },
      { text: "他の人に相談してから始める", type: "パワー" },
      { text: "その場で決めながら進める", type: "フレックス" },
    ],
  },
  {
    id: 13,
    text: "⑬友人との予定がキャンセルされた場合、どうしますか？",
    options: [
      { text: "すぐに新しい予定を立てる", type: "エース" },
      { text: "時間を有効に使うために考える", type: "バランサー" },
      { text: "他の友人に連絡を取る", type: "パワー" },
      { text: "その瞬間の気分で行動を決める", type: "フレックス" },
    ],
  },
  {
    id: 14,
    text: "⑭新しい趣味を始めるとき、どうしますか？",
    options: [
      { text: "とりあえず、やってみる", type: "エース" },
      { text: "じっくり調べてから始める", type: "バランサー" },
      { text: "先にアドバイスを求めたり、楽しみを見つける", type: "パワー" },
      { text: "その場で感じたことを大切にする", type: "フレックス" },
    ],
  },
  {
    id: 15,
    text: "⑮家事や掃除をするとき、どのように取り組みますか？",
    options: [
      { text: "すぐに手をつける", type: "エース" },
      { text: "計画的に進める", type: "バランサー" },
      { text: "誰かと一緒に取り組む", type: "パワー" },
      { text: "その時の気分で始める", type: "フレックス" },
    ],
  },
  {
    id: 16,
    text: "⑯何か新しい知識を学ぶとき、どうしますか？",
    options: [
      { text: "実際にやってみる", type: "エース" },
      { text: "まずはしっかりと調べてから", type: "バランサー" },
      { text: "他の人に教えてもらう", type: "パワー" },
      { text: "感覚で覚える", type: "フレックス" },
    ],
  },
  {
    id: 17,
    text: "⑰大きなプロジェクトに取り組む際、どう進めますか？",
    options: [
      { text: "すぐに行動に移す", type: "エース" },
      { text: "計画的にステップを踏んで進める", type: "バランサー" },
      { text: "他の人と相談しながら進める", type: "パワー" },
      { text: "その場の状況に合わせて柔軟に進める", type: "フレックス" },
    ],
  },
  {
    id: 18,
    text: "⑱会話中、話題が変わるとき、どう対応しますか？",
    options: [
      { text: "すぐに新しい話題に切り替える", type: "エース" },
      { text: "一度考えてから話す", type: "バランサー" },
      { text: "相手に質問してから話す", type: "パワー" },
      { text: "自然に流れに任せる", type: "フレックス" },
    ],
  },
];

const typeCharacteristics = {
  エース: [
    '決断が早く、即行動に移す',
    '直感的に物事を進めることが得意',
    '周囲の状況に左右されにくい',
    '体を使ったアクティビティが好き',
  ],
  バランサー: [
    '計画を立て、物事を慎重に進める',
    'バランス感覚に優れている',
    '状況に応じて臨機応変に対応できる',
    '他人との調和を重んじる',
  ],
  パワー: [
    '人とのコミュニケーションが得意',
    '困難な状況でも前向きに立ち向かう',
    '問題解決能力が高い',
    '自分の感覚を大切にする',
  ],
  フレックス: [
    '柔軟な思考で物事に対応する',
    '状況に応じて最善策を見つける',
    '感覚を重視して物事を進める',
    '周りに合わせることが得意',
  ],
};

function Style4() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ エース: 0, バランサー: 0, パワー: 0, フレックス: 0 });
  const [result, setResult] = useState(null);

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
  }, []);

  const handleAnswer = (type) => {
    setAnswers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = async () => {
    const maxType = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b);
    setResult(maxType);
    const userId = localStorage.getItem('user_id');
    await supabase
      .from('users')
      .update({ type: `${maxType}タイプ` })
      .eq('id', userId);
  };

  return (
    <div className="container">
      {!result ? (
        <div className="question-container">
          <h1 className="title">スタイル４診断</h1>
          <p className="intro-text">まず最初に、あんたのタイプを診断します。<br />
          下記の質問に順番に答えてみよう！
          </p>
          <div className="question-box">
            <p className="question-text">{questionsData[currentQuestion].text}</p>
            <div className="options-container">
              {questionsData[currentQuestion].options.map((option) => (
                <button key={option.text} onClick={() => handleAnswer(option.type)} className="answer-button">
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Results result={result} answers={answers} />
      )}
    </div>
  );
}

function Results({ result, answers }) {
  const data = {
    labels: ['エース', 'バランサー', 'パワー', 'フレックス'],
    datasets: [
      {
        label: 'Your Stance Type',
        data: [answers.エース, answers.バランサー, answers.パワー, answers.フレックス],
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="results-container">
      <h3 className="result-title">スタイル４診断結果</h3>
      <h3 className="result-type">あなたは {result} タイプです</h3>
      <div className="characteristics-box">
        <p className="result-text">●{result}タイプの特徴●</p>
        {typeCharacteristics[result].map((char, index) => (
          <p key={index}>{char}</p>
        ))}
      </div>
      <div className="chart-container">
        <Radar data={data} />
      </div>
      <button
        className="next-button"
        onClick={() => window.location.href = '/biorhythm'}
      >
        次はバイオリズム診断へ
      </button>
    </div>
  );
}

export default Style4;
