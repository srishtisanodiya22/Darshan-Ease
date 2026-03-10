import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import CrowdStatusIndicator from '../components/CrowdStatusIndicator';

export default function AdminDashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [slotForm, setSlotForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    maxDevotees: 50
  });
  const [crowdForm, setCrowdForm] = useState({ level: 'Low', message: '' });
  const [message, setMessage] = useState('');

  if (!auth || auth.user?.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const loadData = async () => {
    try {
      const [slotsRes, bookingsRes] = await Promise.all([
        api.get('/slots'),
        api.get('/bookings')
      ]);
      setSlots(slotsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/slots', slotForm);
      setMessage('Slot created successfully');
      setSlotForm({ date: '', startTime: '', endTime: '', maxDevotees: 50 });
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create slot');
    }
  };

  const handleUpdateCrowd = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/crowd', crowdForm);
      setMessage('Crowd status updated & broadcasted');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update crowd status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">DarshanEase Admin Dashboard</h1>
          <p className="text-xs text-slate-500">Welcome, {auth.user?.name}</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <CrowdStatusIndicator />
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

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {message && <p className="text-sm text-primary-600">{message}</p>}

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Create Darshan Slot</h2>
            <form className="space-y-3" onSubmit={handleCreateSlot}>
              <div>
                <label className="block text-xs font-medium text-slate-700">Date</label>
                <input
                  type="date"
                  value={slotForm.date}
                  onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700">Start Time</label>
                  <input
                    type="time"
                    value={slotForm.startTime}
                    onChange={(e) =>
                      setSlotForm({ ...slotForm, startTime: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">End Time</label>
                  <input
                    type="time"
                    value={slotForm.endTime}
                    onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700">Max Devotees</label>
                <input
                  type="number"
                  min={1}
                  value={slotForm.maxDevotees}
                  onChange={(e) =>
                    setSlotForm({ ...slotForm, maxDevotees: Number(e.target.value) })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary-600 py-1.5 text-xs font-semibold text-white hover:bg-primary-500"
              >
                Create Slot
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Update Crowd Status</h2>
            <form className="space-y-3" onSubmit={handleUpdateCrowd}>
              <div>
                <label className="block text-xs font-medium text-slate-700">Level</label>
                <select
                  value={crowdForm.level}
                  onChange={(e) => setCrowdForm({ ...crowdForm, level: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700">Message</label>
                <input
                  type="text"
                  value={crowdForm.message}
                  onChange={(e) => setCrowdForm({ ...crowdForm, message: e.target.value })}
                  placeholder="e.g., Queue time ~30 mins"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Broadcast Status
              </button>
            </form>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">All Slots</h2>
            <div className="space-y-2 text-xs">
              {slots.map((s) => (
                <div
                  key={s._id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {new Date(s.date).toLocaleDateString()} · {s.startTime} - {s.endTime}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {s.bookedCount}/{s.maxDevotees} booked
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      s.isActive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {s.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
              {!slots.length && (
                <p className="text-xs text-slate-500">No slots created yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Recent Bookings</h2>
            <div className="space-y-2 text-xs max-h-72 overflow-y-auto">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {b.user?.name} ·{' '}
                      {new Date(b.slot.date).toLocaleDateString()} · {b.slot.startTime}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(b.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      b.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
              {!bookings.length && (
                <p className="text-xs text-slate-500">No bookings yet.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

