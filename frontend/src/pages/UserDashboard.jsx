import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import SlotList from '../components/SlotList';
import CrowdStatusIndicator from '../components/CrowdStatusIndicator';
import api from '../services/api';

export default function UserDashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!auth) {
    navigate('/login');
    return null;
  }

  const handleBook = async (slot) => {
    setMessage('');
    setError('');
    try {
      await api.post('/bookings', { slotId: slot._id });
      setMessage('Slot booked successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">DarshanEase Devotee Dashboard</h1>
          <p className="text-xs text-slate-500">Welcome, {auth.user?.name}</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => navigate('/bookings')}
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-50"
          >
            Booking History
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="rounded-full bg-slate-900 px-3 py-1 text-white"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Available Darshan Slots
          </h2>
          <CrowdStatusIndicator />
        </div>

        {message && <p className="text-sm text-emerald-600">{message}</p>}
        {error && <p className="text-sm text-rose-600">{error}</p>}

        <SlotList onBook={handleBook} />
      </main>
    </div>
  );
}

