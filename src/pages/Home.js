import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Home.css';

const Home = () => {
  const [userId, setUserId] = useState(null);
  const [existingId, setExistingId] = useState('');
  const [isStyle4Complete, setIsStyle4Complete] = useState(false);
  const [nextId, setNextId] = useState(null);

  const titleText = '『あんたの好不調がわかるアプリ』';

  useEffect(() => {
    fetchNextId();

    // ここを追加した: スクロール位置の保持
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
      setNextId(String(lastId + 1).padStart(5, '0'));
    }
  };

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
      localStorage.setItem('user_id', newUserId);
    }
  };

  const checkExistingId = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('type')
      .eq('id', existingId);

    if (error) {
      console.error('ID確認エラー:', error.message);
    } else if (data.length > 0) {
      setUserId(existingId);
      setIsStyle4Complete(Boolean(data[0].type));
    } else {
      alert('IDが見つかりませんでした。');
    }
  };

  return (
    <div className="home-container">
      <h1 className="app-title">{titleText}</h1>
      <p className="subtitle">「タイプ診断」＆「バイオリズム診断」へようこそ<br />
        ２つの診断で自身のパフォーマンスを最大限に！</p>

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
            <p className="subtitle">発行済のID番号を下記に入力してください<br />
              ※バイオリズム診断からスタートできます</p>
            <input
              type="text"
              value={existingId}
              onChange={(e) => setExistingId(e.target.value)}
              placeholder="IDを入力"
              className="id-input"
            />
            <button onClick={checkExistingId} className="check-btn">ログイン</button>
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
