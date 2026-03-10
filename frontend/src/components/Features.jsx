export default function Features() {
  const features = [
    {
      title: 'Online Slot Booking',
      description:
        'Reserve your darshan time from anywhere using a simple, mobile-friendly interface.',
      iconBg: 'bg-primary-50',
      icon: '📅'
    },
    {
      title: 'Real-time Crowd Updates',
      description:
        'See live crowd levels and plan your visit when the temple is less crowded.',
      iconBg: 'bg-emerald-50',
      icon: '📡'
    },
    {
      title: 'Fast & Organized Entry',
      description:
        'Slot-based entry ensures smooth queues and a calmer darshan experience for everyone.',
      iconBg: 'bg-amber-50',
      icon: '⚡'
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Designed for peaceful darshan
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            DarshanEase brings structure to temple visits so devotees spend more time in
            prayer and less time in queues.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-5 shadow-sm"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.iconBg}`}
              >
                <span className="text-xl">{f.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

