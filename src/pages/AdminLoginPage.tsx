import React, { useState, useEffect } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { checkHasAdmin, verifyIsAdmin } from '../lib/appointments';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigateRegister: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateRegister,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasAdmin, setHasAdmin] = useState<boolean>(true);

  useEffect(() => {
    // Check if initial admin account has been provisioned
    checkHasAdmin().then((exists) => setHasAdmin(exists));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMsg('Invalid email or password. Please verify your salon credentials.');
        setLoading(false);
        return;
      }

      if (!data.user) {
        setErrorMsg('Authentication did not return an active session.');
        setLoading(false);
        return;
      }

      // Verify that this user is registered in admin_profiles
      const isAdmin = await verifyIsAdmin(data.user.id);

      if (!isAdmin) {
        await supabase.auth.signOut();
        setErrorMsg('Access denied: Account is not an authorized salon administrator.');
        setLoading(false);
        return;
      }

      // Authentication and authorization verified
      onLoginSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
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
              <span>Owner Access · Admin Portal</span>
            </div>
          </div>

          {/* Top Tabs: Sign In vs Register New Admin */}
          <div className="flex border-b border-[#24201D]/15 mb-6">
            <button
              type="button"
              className="flex-1 pb-3 text-xs uppercase tracking-wider font-bold text-[#24201D] border-b-2 border-[#24201D] cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={onNavigateRegister}
              className="flex-1 pb-3 text-xs uppercase tracking-wider font-semibold text-[#756B63] hover:text-[#24201D] border-b-2 border-transparent transition-colors cursor-pointer"
            >
              Register New Admin
            </button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-[#8A5243] text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <p className="font-light">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#24201D]">
                  Owner Email Address
                </label>
                <button
                  type="button"
                  onClick={() => setEmail('nzlpatwary901@gmail.com')}
                  className="text-[10px] text-[#B98272] hover:text-[#8A5243] underline cursor-pointer"
                  title="Autofill current salon owner email"
                >
                  Fill Active Owner
                </button>
              </div>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nzlpatwary901@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#24201D]/20 focus:border-[#24201D] focus:bg-white text-xs text-[#24201D] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#24201D] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Registration link is always visible so new owners or clients can register anytime */}
          <div className="mt-8 pt-4 border-t border-[#24201D]/10 text-center">
            <span className="text-[11px] text-[#756B63] block mb-1">
              New client setup or need a new admin account?
            </span>
            <button
              type="button"
              onClick={onNavigateRegister}
              className="text-xs uppercase font-semibold text-[#B98272] hover:text-[#8A5243] tracking-wider underline cursor-pointer"
            >
              Register New Salon Administrator →
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

