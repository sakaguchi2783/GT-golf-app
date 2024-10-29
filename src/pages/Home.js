import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Home.css';

const Home = () => {
  const [userId, setUserId] = useState(null); // 現在のユーザーID
  const [existingId, setExistingId] = useState(''); // 入力された既存のID
  const [isStyle4Complete, setIsStyle4Complete] = useState(false); // スタイル4診断が済んだかどうか
  const [nextId, setNextId] = useState(null); // 次の5桁のID番号

  // タイトルに表示するテキスト（タイピングエフェクトなし）
  const titleText = '『あんたの好不調がわかるアプリ』';

  // 次のID番号を取得
  const fetchNextId = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      console.error('ID取得エラー:', error.message);
    } else {
      const lastId = data.length > 0 ? data[0].id : 0;
      setNextId(String(lastId + 1).padStart(5, '0')); // 5桁でパディング
    }
  };

  // 初回レンダリング時に次のID番号を取得
  useEffect(() => {
    fetchNextId();
  }, []);

  // Supabaseを使ってユーザーIDを発行
  const generateUserId = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: nextId, type: null }])
      .select('id');

    if (error) {
      console.error('ユーザーIDの発行エラー:', error.message);
    } else {
      const newUserId = data[0].id;
      setUserId(newUserId);
      localStorage.setItem('user_id', newUserId); // ローカルストレージに保存
    }
  };

  // 既存IDの確認
  const checkExistingId = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('type')
      .eq('id', existingId);

    if (error) {
      console.error('ID確認エラー:', error.message);
    } else if (data.length > 0) {
      setUserId(existingId);
      setIsStyle4Complete(Boolean(data[0].type)); // タイプ診断済みかどうかを確認
    } else {
      alert('IDが見つかりませんでした。');
    }
  };

  return (
    <div className="home-container">
      <h1 className="app-title">{titleText}</h1>
      <p className="subtitle">「タイプ診断」＆「バイオリズム診断」へようこそ</p>
      <p className="subtitle">２つの診断で自身のパフォーマンスを最大限に！</p>

      {!userId ? (
        <>
          <div className="id-section id-box">
            <h3>■初めてIDを発行する場合</h3>
            {nextId ? (
              <button onClick={generateUserId} className="generate-btn">IDを発行 (次のID: {nextId})</button>
            ) : (
              <p>IDを生成しています...</p>
            )}
          </div>

          <div className="id-section id-box">
            <h3>■既にIDをお持ちの場合</h3>
            <p>4桁の番号を下記に入力してください</p>
            <p>※バイオリズム診断からスタートできます</p>
            <input
              type="text"
              value={existingId}
              onChange={(e) => setExistingId(e.target.value)}
              placeholder="IDを入力"
              className="id-input"
            />
            <button onClick={checkExistingId} className="check-btn">IDを確認</button>
          </div>
        </>
      ) : (
        <div className="result-section">
          <p>あなたのID: {userId}</p>
          {!isStyle4Complete ? (
            <button className="navigate-btn" onClick={() => window.location.href = '/style4'}>スタイル４診断へ進む</button>
          ) : (
            <button className="navigate-btn" onClick={() => window.location.href = '/biorhythm'}>バイオリズム診断へ進む</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
