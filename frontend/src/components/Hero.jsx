import { useNavigate } from 'react-router-dom';
import CrowdStatusIndicator from './CrowdStatusIndicator';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-slate-50 to-amber-50">
      <div className="pointer-events-none absolute inset-x-0 top-[-6rem] -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-1/2 aspect-[1108/632] w-[72rem] -translate-x-1/2 bg-[radial-gradient(circle_at_top,_#4f46e5_0,_rgba(79,70,229,0)_60%),radial-gradient(circle_at_bottom,_#f97316_0,_rgba(249,115,22,0)_55%)] opacity-60" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 pb-16 pt-20 md:flex-row md:items-start md:pb-24 md:pt-24">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Trusted slot-based darshan experience
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            DarshanEase – Smart Temple Darshan Booking
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Book your temple darshan slots online, get live crowd status, and avoid
            long queues. DarshanEase helps devotees experience peaceful darshan while
            temples manage crowd flow with ease.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-primary-500/30 hover:bg-primary-500"
            >
              Book Darshan
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Admin Login
            </button>
          </div>
          <div className="pt-2">
            <CrowdStatusIndicator />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative mx-auto max-w-md rounded-3xl border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur">
            <div className="absolute -left-6 -top-6 h-16 w-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-300 opacity-80 blur-md" />
            <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary-500 to-indigo-400 opacity-80 blur-md" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                    Upcoming Darshan
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    Sri Venkateswara Temple
                  </p>
                </div>
                <div className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700">
                  Queue time ~30 mins
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">Today</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {new Date().toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">Next Slot</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">08:30 AM</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">Booked</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">120 / 150</p>
                </div>
              </div>
              <div className="space-y-2 rounded-2xl bg-slate-900 p-4 text-xs text-slate-50">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                  Devotee spotlight
                </p>
                <p className="leading-relaxed text-slate-100">
                  “With DarshanEase we reached just in time for our slot and finished
                  darshan peacefully without standing for hours in the queue.”
                </p>
                <p className="text-[11px] text-slate-400">– A devotee from Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

