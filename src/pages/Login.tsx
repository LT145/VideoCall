import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Facebook SDK script if not using react-facebook-login
    const loadFacebookSDK = () => {
      const script = document.createElement('script');
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        (window as any).FB.init({
          appId: '995034005929343',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };
    };

    loadFacebookSDK();
  }, []);

  const handleFacebookLogin = (response: any) => {
    if (response.accessToken) {
      fetch(`https://graph.facebook.com/me?fields=name&access_token=${response.accessToken}`)
        .then(res => res.json())
        .then(userData => {
          const fbUserData = {
            ...userData,
            yourname: userData.name
          };
          localStorage.setItem('user', JSON.stringify(fbUserData));
          navigate('/', { replace: true });
        });
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      ...decoded,
      yourname: (decoded as any).email
    };
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/', { replace: true });
  };

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(243 244 246)'
    }}>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Welcome to Video Call</h1>
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <div className="w-full ">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log('Login Failed')}
              ux_mode="popup"
              width={240}
            />
          </div>

          <div className="flex justify-center w-full max-w-[240px]">
            <FacebookLogin
              appId="995034005929343"
              onSuccess={handleFacebookLogin}
              style={{
                backgroundColor: '#1877F2',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #1464cf',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                width: '240px',
                margin: '20px 0px 0px 0px'
              }}
            >
              <FontAwesomeIcon icon={faFacebookF} style={{ marginRight: '30px' }} className="w-8 h-8" />
              <span className="font-semibold">Continue with Facebook</span>
            </FacebookLogin>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
