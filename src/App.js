import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import BiorhythmResult from './pages/BiorhythmResult'; // バイオリズム結果画面のインポート

import Home from './pages/Home';
import Style4 from './pages/Style4';
import Biorhythm from './pages/Biorhythm';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/style4" element={<Style4 />} />
          <Route path="/biorhythm" element={<Biorhythm />} />
          <Route path="/biorhythm-result" element={<BiorhythmResult />} /> {/* 結果ページのルートを追加 */}
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
        <NavigationBar />
      </div>
    </Router>
  );
}

export default App;
