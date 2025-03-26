import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      ...decoded,
      yourname: (decoded as any).email
    };
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/', { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Welcome to Video Call</h1>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Login Failed')}
            ux_mode="popup"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;