import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export default function BookingHistoryPage() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!auth) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/me');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to load bookings', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Booking History</h1>
          <p className="text-xs text-slate-500">DarshanEase Devotee</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-50"
          >
            Back to Dashboard
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

      <main className="mx-auto max-w-4xl px-4 py-6">
        {loading ? (
          <p className="text-sm text-slate-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-sm text-slate-500">No bookings yet.</p>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {new Date(b.slot.date).toLocaleDateString()} ·{' '}
                    {b.slot.startTime} - {b.slot.endTime}
                  </p>
                  <p className="text-xs text-slate-500">
                    Booked on {new Date(b.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    b.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

