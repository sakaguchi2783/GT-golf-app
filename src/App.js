import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import BiorhythmResult from './pages/BiorhythmResult'; // バイオリズム結果画面のインポート

import Home from './pages/Home';
import Style4 from './pages/Style4';
// BiorhythmをBiorhythmResultに統一します
// import Biorhythm from './pages/Biorhythm'; 
import Score from './pages/Score';
import Practice from './pages/Practice';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/style4" element={<Style4 />} />
          {/* BiorhythmをBiorhythmResultに置き換え、ルートも統一します */}
          <Route path="/biorhythm" element={<BiorhythmResult />} /> 
          <Route path="/score" element={<Score />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
        <NavigationBar />
      </div>
    </Router>
  );
}

export default App;
