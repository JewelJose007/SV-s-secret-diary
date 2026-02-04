
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isGoogleBlocked, setIsGoogleBlocked] = useState(false);

  useEffect(() => {
    /* global google */
    const initGoogle = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: "753820251147-mock.apps.googleusercontent.com", // This remains a placeholder
            callback: (response: any) => {
              const decoded: any = jwtDecode(response.credential);
              onLogin({
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture
              });
            }
          });
          (window as any).google.accounts.id.renderButton(
            document.getElementById("googleBtn"),
            { theme: "outline", size: "large", shape: "pill", width: 280 }
          );
        } catch (e) {
          console.warn("Google Identity initialization failed. Showing fallback.");
          setIsGoogleBlocked(true);
        }
      } else {
        setTimeout(initGoogle, 1000);
      }
    };
    initGoogle();
  }, [onLogin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white relative overflow-hidden">
      {/* Visual background layers */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-stone-100 rounded-full blur-3xl breathing-circle" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gray-50 rounded-full blur-3xl breathing-circle" style={{ animationDelay: '3s' }} />
      
      <div className="z-10 text-center mb-12 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="font-serif text-5xl font-light italic text-stone-800 mb-6">Steady Heart</h1>
        <p className="text-stone-400 text-sm leading-relaxed mb-16">
          A minimalist diary designed for grounding. Your data stays on your device.
        </p>
        
        <div className="space-y-6 flex flex-col items-center">
          <div id="googleBtn" className="flex justify-center min-h-[44px]"></div>
          
          <div className="flex items-center gap-4 w-full px-8">
            <div className="h-[1px] bg-stone-100 flex-1"></div>
            <span className="text-[10px] text-stone-300 uppercase tracking-widest">or</span>
            <div className="h-[1px] bg-stone-100 flex-1"></div>
          </div>

          <button 
            onClick={() => onLogin({ id: 'local-user', name: 'Sanctuary Guest', email: 'offline@steadyheart.app', picture: '' })}
            className="w-full max-w-[280px] bg-stone-800 text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-stone-900 transition-all shadow-sm active:scale-95"
          >
            Enter Sanctuary
          </button>
        </div>
      </div>
      
      <div className="z-10 mt-8 max-w-xs text-center">
        {isGoogleBlocked && (
          <p className="text-stone-400 text-[10px] italic mb-4">
            "Google Access" is restricted in this environment. Please use the button above to continue privately.
          </p>
        )}
      </div>

      <footer className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-stone-300">
        Safe • Private • Minimal
      </footer>
    </div>
  );
};

export default Login;
