import { useEffect, useState } from 'react';
import api from '../services/api';

export default function SlotList({ onBook }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await api.get('/slots/available');
        setSlots(res.data);
      } catch (err) {
        console.error('Failed to load slots', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading available slots...</p>;
  }

  if (!slots.length) {
    return <p className="text-sm text-slate-500">No slots available currently.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {slots.map((slot) => {
        const remaining = slot.maxDevotees - slot.bookedCount;
        const isFull = remaining <= 0;
        return (
          <div
            key={slot._id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {new Date(slot.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-slate-500">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                Capacity: {slot.bookedCount}/{slot.maxDevotees}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-slate-500">
                {isFull ? 'Slot full' : `${remaining} spots left`}
              </p>
              <button
                disabled={isFull}
                onClick={() => onBook(slot)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                  isFull
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-500'
                }`}
              >
                {isFull ? 'Full' : 'Book Slot'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

