import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-xs text-slate-500 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-sm font-semibold text-slate-900">About DarshanEase</p>
          <p>
            DarshanEase is a smart darshan management platform that helps temples
            organize crowd flow while giving devotees a smoother, more peaceful
            darshan experience.
          </p>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="text-sm font-semibold text-slate-900">Quick links</p>
            <div className="mt-2 flex flex-col gap-1">
              <Link to="/" className="hover:text-slate-900">
                Home
              </Link>
              <Link to="/dashboard" className="hover:text-slate-900">
                Book Slot
              </Link>
              <Link to="/login" className="hover:text-slate-900">
                Devotee Login
              </Link>
              <Link to="/admin" className="hover:text-slate-900">
                Admin Panel
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Contact</p>
            <div className="mt-2 flex flex-col gap-1">
              <span>Temple Operations Team</span>
              <span>Email: support@darshanease.com</span>
              <span>Phone: +91-98765-12345</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50 py-3 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} DarshanEase. All rights reserved.
      </div>
    </footer>
  );
}

