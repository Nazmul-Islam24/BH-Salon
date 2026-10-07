import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { registerFirstAdmin } from '../lib/appointments';

interface AdminRegisterPageProps {
  onRegisterSuccess: () => void;
  onNavigateLogin: () => void;
  onNavigateHome: () => void;
}

export const AdminRegisterPage: React.FC<AdminRegisterPageProps> = ({
  onRegisterSuccess,
  onNavigateLogin,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const result = await registerFirstAdmin(email.trim().toLowerCase(), password);

    setLoading(false);

    if (result.success) {
      setSuccessMsg('Salon administrator successfully registered! You can now sign in to your dashboard.');
      setTimeout(() => {
        onRegisterSuccess();
      }, 1500);
    } else {
      setErrorMsg(result.error || 'Failed to register administrator.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#F7F3EE] flex flex-col justify-center items-center px-4 text-[#24201D]">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-[#756B63] hover:text-[#24201D] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to LUMÉ Studio</span>
        </button>

        {/* Card */}
        <div className="bg-white p-8 sm:p-10 border border-[#24201D]/15 shadow-xl relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="font-serif text-3xl tracking-[0.25em] text-[#24201D] block mb-1">
              LUMÉ
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#EDE5DC] text-[#8A5243] text-[10px] uppercase tracking-[0.2em] font-semibold mt-1">
              <Lock className="w-3 h-3 text-[#B98272]" />
              <span>Owner Access · Administrator Setup</span>
            </div>
          </div>

          {/* Top Navigation Tabs: Sign In vs Register */}
          <div className="flex border-b border-[#24201D]/15 mb-6">
            <button
              type="button"
              onClick={onNavigateLogin}
              className="flex-1 pb-3 text-xs uppercase tracking-wider font-semibold text-[#756B63] hover:text-[#24201D] border-b-2 border-transparent transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              className="flex-1 pb-3 text-xs uppercase tracking-wider font-bold text-[#24201D] border-b-2 border-[#24201D] cursor-pointer"
            >
              Register New Admin
            </button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-[#8A5243] text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-rose-900">{errorMsg}</p>
                {errorMsg.toLowerCase().includes('rate limit') && (
                  <p className="text-[11px] text-[#756B63] leading-relaxed">
                    Supabase Free tier limits emails. You can also add users directly via <strong>Supabase Dashboard → Authentication → Users</strong> with "Auto Confirm" enabled.
                  </p>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <p className="font-medium">{successMsg}</p>
            </div>
          )}

          <p className="text-xs text-[#756B63] font-light leading-relaxed mb-6">
            Register a salon owner or concierge manager with full administrative privileges to manage all appointments and client reservations.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#24201D] mb-1.5">
                Owner Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@yourlumesalon.com"
                className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/20 focus:border-[#24201D] focus:bg-white text-xs text-[#24201D] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#24201D] mb-1.5">
                Create Password (Min 8 Characters) *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/20 focus:border-[#24201D] focus:bg-white text-xs text-[#24201D] focus:outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#24201D] mb-1.5">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/20 focus:border-[#24201D] focus:bg-white text-xs text-[#24201D] focus:outline-none transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-[#24201D] hover:bg-[#38322E] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Admin Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Direct link back to Sign In */}
          <div className="mt-8 pt-4 border-t border-[#24201D]/10 text-center">
            <span className="text-[11px] text-[#756B63] block mb-1">
              Already have an administrator account?
            </span>
            <button
              type="button"
              onClick={onNavigateLogin}
              className="text-xs uppercase font-semibold text-[#B98272] hover:text-[#8A5243] tracking-wider underline cursor-pointer"
            >
              Sign In to Dashboard →
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#24201D]/10 flex items-center justify-center gap-1.5 text-[11px] text-[#756B63]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3F6647]" />
            <span>Encrypted Supabase PostgreSQL & Auth Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

