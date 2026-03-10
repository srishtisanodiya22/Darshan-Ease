import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const linkBase =
    'text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-400 text-white shadow-md">
            <span className="text-lg font-semibold">ॐ</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-slate-900">DarshanEase</span>
            <span className="text-[11px] text-slate-500">
              Smart Temple Darshan Booking
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : ''}`
            }
          >
            Book Slot
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : ''}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : ''}`
            }
          >
            Admin
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {auth ? (
            <>
              <span className="hidden text-xs text-slate-500 sm:inline">
                {auth.user?.name}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-500"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

