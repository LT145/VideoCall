import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import VideoCall from './VideoCall';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, []);

  if (!user) return null;
  return children;
};

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="432620503717-8lc20jr78rs040hcqnu84niavfr1uino.apps.googleusercontent.com">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <VideoCall />
              </ProtectedRoute>
            }
          />
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;