// src/layouts/DashboardLayout.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../store/useUIStore';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, LogOut, LayoutDashboard, CreditCard, PieChart, Zap, User } from 'lucide-react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPrivacyMode, togglePrivacy } = useUIStore();
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <CreditCard size={20} />, label: 'Mis Cuentas', path: '/accounts' },
    { icon: <PieChart size={20} />, label: 'Análisis', path: '/analytics' }
  ];

  const dashboardModes = [
    { icon: <LayoutDashboard size={16} />, label: 'Principal', path: '/dashboard', title: 'Vista completa con tabs' },
    { icon: <User size={16} />, label: 'Perfil', path: '/dashboard/profile', title: 'Datos personales' }
  ];

  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 animate-fade-in">
      {/* Sidebar Fijo */}
      <aside className="fixed h-full w-64 border-r border-slate-800 bg-slate-900/50 p-6 hidden lg:flex flex-col overflow-y-auto">
        <div className="mb-10 text-2xl font-black text-white">
          OpenFinance<span className="text-blue-500">.</span>
        </div>
        <nav className="space-y-4 flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>

        {/* Selector de Vistas de Dashboard */}
        {isDashboardPage && (
          <div className="border-t border-slate-800 pt-4 mt-4 animate-fade-in">
            <p className="text-xs font-bold text-slate-400 uppercase mb-3">Vistas del Dashboard</p>
            <div className="space-y-2">
              {dashboardModes.map((mode) => (
                <button
                  key={mode.path}
                  onClick={() => navigate(mode.path)}
                  title={mode.title}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-all ${
                    location.pathname === mode.path
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
                  }`}
                >
                  {mode.icon}
                  <span className="font-medium">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-rose-400 transition-colors mt-6"
        >
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white">Panel Central</h2>
          <button 
            onClick={togglePrivacy}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 transition-all"
          >
            {isPrivacyMode ? <EyeOff size={16} /> : <Eye size={16} />}
            Modo Privacidad
          </button>
        </header>
        <main className="p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all text-left ${
      active
        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
    }`}
  >
    {icon} <span className="font-medium">{label}</span>
  </button>
);

export default DashboardLayout;