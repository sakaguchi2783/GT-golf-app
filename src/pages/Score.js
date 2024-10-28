import React, { useState } from 'react';
import './ScoreEntry.css';

const ScoreEntry = () => {
  const [courseName, setCourseName] = useState('');
  const [scores, setScores] = useState(Array(18).fill(''));
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [advice, setAdvice] = useState('');

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const handleQuestionSubmit = () => {
    // プレイヤーの調子と質問に対する回答からアドバイスを生成
    if (questionAnswer === '範囲内スキルOK-まずまず' && '調子◎') {
      setAdvice("新しいスキルに挑戦してみよう！");
    } else if (questionAnswer === '範囲内スキルOK-結果不満' && '調子✕') {
      setAdvice("まず、今自分が「やらないこと」を決めてみよう！");
    }
    // 他のパターンもここで条件分岐を追加してください
  };

  return (
    <div className="score-entry-container">
      <h1>スコア記入</h1>
      
      <div className="form-group">
        <label>ゴルフ場名：</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="ゴルフ場名を入力"
        />
      </div>

      <div className="scores">
        <h3>1番～18番までのスコアを記入してください</h3>
        <div className="score-table">
          {scores.map((score, index) => (
            <div key={index} className="score-input">
              <label>{index + 1}番：</label>
              <input
                type="number"
                value={score}
                onChange={(e) => handleScoreChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="question-section">
        <h3>お疲れ様でした！今日のプレー内容を振り返っていきましょう。</h3>
        <p>Q. 今日のプレーでは、自分が実践できる範囲内のスキルでプレーできましたか？</p>
        <form>
          <label>
            <input
              type="radio"
              value="範囲内スキルOK-まずまず"
              checked={questionAnswer === '範囲内スキルOK-まずまず'}
              onChange={(e) => setQuestionAnswer(e.target.value)}
            />
            自分のできる範囲内のスキルで、ほとんどのプレーをこなし、結果はまずまずだった。
          </label>
          <label>
            <input
              type="radio"
              value="範囲内スキルOK-結果不満"
              checked={questionAnswer === '範囲内スキルOK-結果不満'}
              onChange={(e) => setQuestionAnswer(e.target.value)}
            />
            自分のできる範囲内のスキルで、プレーをこなせたが、望む結果はでなかった。
          </label>
          <label>
            <input
              type="radio"
              value="超スキルOK"
              checked={questionAnswer === '超スキルOK'}
              onChange={(e) => setQuestionAnswer(e.target.value)}
            />
            自分のできるスキルを大幅に超えたプレーを実践し、上手くいった。
          </label>
          <label>
            <input
              type="radio"
              value="超スキル失敗"
              checked={questionAnswer === '超スキル失敗'}
              onChange={(e) => setQuestionAnswer(e.target.value)}
            />
            自分のできるスキルを大幅に超えたプレーを目指しひどい結果になってしまった。
          </label>
        </form>
        <button onClick={handleQuestionSubmit}>結果を表示</button>
      </div>

      {advice && (
        <div className="advice-box">
          <h3>【これから約2週間意識すること】</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default ScoreEntry;
