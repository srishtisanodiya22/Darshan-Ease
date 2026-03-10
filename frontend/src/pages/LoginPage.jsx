import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import CrowdStatusIndicator from '../components/CrowdStatusIndicator';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isAdmin ? '/auth/admin/login' : '/auth/login';
      const res = await api.post(endpoint, { email, password });
      const data = isAdmin
        ? { token: res.data.token, user: res.data.admin }
        : { token: res.data.token, user: res.data.user };
      login(data);
      navigate(isAdmin ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">DarshanEase</h1>
          <p className="text-sm text-slate-500">
            Seamless temple darshan slot booking and real-time crowd updates.
          </p>
          <div className="mt-4">
            <CrowdStatusIndicator />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <button
                type="button"
                onClick={() => setIsAdmin(false)}
                className={`flex-1 rounded-full py-1 mr-1 ${
                  !isAdmin ? 'bg-primary-600 text-white' : 'bg-slate-100'
                }`}
              >
                Devotee
              </button>
              <button
                type="button"
                onClick={() => setIsAdmin(true)}
                className={`flex-1 rounded-full py-1 ml-1 ${
                  isAdmin ? 'bg-primary-600 text-white' : 'bg-slate-100'
                }`}
              >
                Admin
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
            {error && <p className="text-xs text-rose-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-500">
            New devotee?{' '}
            <button
              className="text-primary-600 hover:underline"
              onClick={() => navigate('/register')}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

