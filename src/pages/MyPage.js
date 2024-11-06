import React, { useEffect, useState } from 'react'; 
import { supabase } from '../supabaseClient';
import './MyPage.css';

const MyPage = () => {
  const [userData, setUserData] = useState({
    id: '',
    type: '',
    biorhythm: '',
    advice: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('id, type, biorhythm, advice')
          .eq('id', userId)
          .single();
        
        if (error) {
          console.error('ユーザーデータの取得エラー:', error.message);
        } else {
          setUserData({
            id: data.id,
            type: data.type,
            biorhythm: data.biorhythm || '情報がありません',
            advice: data.advice || '情報がありません',
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
        <p><strong>潜在的に見たい物語：</strong>{userData.biorhythm}</p>
        <p><strong>あなたの好不調：</strong>{userData.advice}</p>
      </div>
    </div>
  );
};

export default MyPage;
