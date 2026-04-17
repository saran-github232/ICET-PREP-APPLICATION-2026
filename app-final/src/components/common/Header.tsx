import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('icet_user_name') || 'Aspirant';

  const handleLogout = () => {
    localStorage.removeItem('icet_onboarded');
    localStorage.removeItem('icet_user_name');
    navigate('/');
  };

  return (
    <header className="w-full h-16 bg-white border-b border-primary/5 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">I</div>
        <span className="font-display font-bold text-xl tracking-tight text-primary">ICET MOCK</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-background rounded-full border border-primary/5">
          <User className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-text-primary capitalize">{userName}</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="p-2 text-text-secondary hover:text-danger transition-colors group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </header>
  );
};
