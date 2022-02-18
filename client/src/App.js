import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Dash from './pages/Dash/Dash';
import Content from './pages/Content/Content';
import Video from './pages/Video/Video';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dash />} />
        <Route exact path="/content" element={<Content />} />
        <Route exact path="/play" element={<Video />} />
      </Routes>
    </Router>
  );
}

export default App;
