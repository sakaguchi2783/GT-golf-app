import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './MyPage.css';

const MyPage = () => {
  const [userData, setUserData] = useState({
    id: '',
    type: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('id, type')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('ユーザーデータの取得エラー:', error.message);
        } else {
          setUserData({
            id: data.id,
            type: data.type,
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
      </div>
    </div>
  );
};

export default MyPage;
