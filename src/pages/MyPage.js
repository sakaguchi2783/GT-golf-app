import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './MyPage.css';

const MyPage = () => {
  const [userData, setUserData] = useState({
    id: '',
    type: '',
    biorhythm: '',
    recentScore: '',
    advice: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('id, type, recent_score, biorhythm, advice')
          .eq('id', userId)
          .single();
        
        if (error) {
          console.error('ユーザーデータの取得エラー:', error.message);
        } else {
          setUserData({
            id: data.id,
            type: data.type,
            biorhythm: data.biorhythm,
            recentScore: data.recent_score || '',
            advice: data.advice || ''
          });
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="my-page-container">
      <h1>マイページ</h1>
      <div className="user-info">
        <p><strong>ID：</strong>{userData.id}</p>
        <p><strong>あなたのタイプ：</strong>{userData.type}</p>
        <p><strong>あなたの状態：</strong>{userData.biorhythm}</p>
        <p><strong>直近のスコア：</strong>{userData.recentScore}</p>
        <p><strong>これから約2週間意識すること：</strong>{userData.advice}</p>
      </div>
    </div>
  );
};

export default MyPage;
