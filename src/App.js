import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './services/GameContext';
import SignInWithGoogle from './components/GoogleSignIn';
import GamePage from './pages/GamePage'; 
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInWithGoogle />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
