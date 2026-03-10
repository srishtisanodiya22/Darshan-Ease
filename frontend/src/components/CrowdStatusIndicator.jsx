import { useEffect, useState } from 'react';
import api from '../services/api';
import { getSocket } from '../services/socket';

const levelColors = {
  Low: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Medium: 'bg-amber-100 text-amber-800 border-amber-300',
  High: 'bg-rose-100 text-rose-800 border-rose-300'
};

export default function CrowdStatusIndicator() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let socket;

    const fetchInitial = async () => {
      try {
        const res = await api.get('/crowd');
        setStatus(res.data);
      } catch (err) {
        console.error('Failed to load crowd status', err);
      }
    };

    fetchInitial();

    try {
      socket = getSocket();
      socket.on('crowdStatusUpdated', (data) => {
        setStatus(data);
      });
    } catch (e) {
      console.error('Socket error', e);
    }

    return () => {
      if (socket) {
        socket.off('crowdStatusUpdated');
      }
    };
  }, []);

  if (!status) {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
        <span className="h-2 w-2 rounded-full bg-slate-400 animate-pulse" />
        Loading crowd status...
      </div>
    );
  }

  const color = levelColors[status.level] || levelColors.Low;

  return (
    <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-sm ${color}`}>
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          status.level === 'Low'
            ? 'bg-emerald-500'
            : status.level === 'Medium'
            ? 'bg-amber-500'
            : 'bg-rose-500'
        }`}
      />
      <span className="font-semibold">Current Crowd: {status.level}</span>
      {status.message && <span className="text-xs opacity-80">· {status.message}</span>}
    </div>
  );
}

