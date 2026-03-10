export default function HowItWorks() {
  const steps = [
    {
      title: 'Create account',
      description: 'Sign up once with your name and mobile/email.'
    },
    {
      title: 'Select temple & time slot',
      description: 'Choose the most convenient darshan slot for your family.'
    },
    {
      title: 'Visit during your slot',
      description: 'Reach the temple in the chosen time window without rushing.'
    },
    {
      title: 'Enjoy faster darshan',
      description: 'Spend more time in darshan and less time in queues.'
    }
  ];

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            How DarshanEase works
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            A simple four-step journey from planning to peaceful darshan.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-full items-stretch justify-between gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex-1 min-w-[160px]">
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white shadow-md">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-4 hidden h-px w-full max-w-[180px] -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-primary-200 to-amber-200 md:block" />
                  )}
                  <div className="mt-4 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
                    <h3 className="text-xs font-semibold text-slate-900 sm:text-sm">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

