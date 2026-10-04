import React, { useState } from 'react';
import { StaffUser, StaffRole } from '../../types/restaurant';
import { INITIAL_STAFF_USERS } from '../../data/enterpriseData';
import { ShieldCheck, UserCheck, ChefHat, KeyRound, Mail, Lock, UserPlus, LogIn, X, Check, Sparkles } from 'lucide-react';

interface AuthModalProps {
  currentUser: StaffUser | null;
  onLogin: (user: StaffUser) => void;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onLogin,
  onClose,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<StaffRole>('admin');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('ranvijay@singhrestaurant.in');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupEmpCode, setSignupEmpCode] = useState('');
  const [signupPasscode, setSignupPasscode] = useState('');
  const [signupDesignation, setSignupDesignation] = useState('');

  const handleRoleSelect = (role: StaffRole) => {
    setSelectedRole(role);
    setErrorMsg('');
    // Auto-fill convenience for quick testing
    const sampleUser = INITIAL_STAFF_USERS.find((u) => u.role === role);
    if (sampleUser) {
      setLoginEmail(sampleUser.email);
    }
  };

  const handleQuickDemoLogin = (user: StaffUser) => {
    setSuccessMsg(`Authenticated successfully as ${user.name} (${user.designation})`);
    setTimeout(() => {
      onLogin(user);
    }, 400);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg('Please enter an authorized staff email or employee handle');
      return;
    }

    const matchedUser = INITIAL_STAFF_USERS.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.role === selectedRole
    ) || {
      id: `staff-usr-${Date.now()}`,
      name: loginEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: loginEmail,
      role: selectedRole,
      employeeCode: `EMP-1984-${selectedRole.toUpperCase().slice(0, 3)}`,
      designation:
        selectedRole === 'admin'
          ? 'Proprietor & Managing Director'
          : selectedRole === 'manager'
          ? 'Restaurant Floor General Manager'
          : 'Executive Khansama & Master Chef',
      lastActive: 'Just now',
    };

    setSuccessMsg(`Welcome, ${matchedUser.name}`);
    setTimeout(() => {
      onLogin(matchedUser);
    }, 400);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim()) {
      setErrorMsg('Please complete all required fields');
      return;
    }

    const newUser: StaffUser = {
      id: `staff-new-${Date.now()}`,
      name: signupName.trim(),
      email: signupEmail.trim(),
      role: selectedRole,
      employeeCode: signupEmpCode.trim() || `EMP-1984-${Math.floor(100 + Math.random() * 900)}`,
      designation:
        signupDesignation.trim() ||
        (selectedRole === 'admin'
          ? 'Assistant Managing Director'
          : selectedRole === 'manager'
          ? 'Shift Service Manager'
          : 'Sous Chef / Station Master'),
      lastActive: 'Just now',
    };

    setSuccessMsg(`Account created! Logged in as ${newUser.name}`);
    setTimeout(() => {
      onLogin(newUser);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#120F0D] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#F3EFEA] space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close Authentication Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] text-black shadow-lg shadow-[#D4AF37]/20 mb-1">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-white">
            Singh Restaurant Management Portal
          </h2>
          <p className="text-xs text-[#C5B8A5]">
            Varanasi, Est. 1984 · Authorized Personnel Authentication Gateway
          </p>
        </div>

        {/* 1-Click Fast Switch Demo Cards (Convenient Evaluation) */}
        <div className="bg-[#181412] p-4 rounded-xl border border-[#D4AF37]/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Fast Evaluation Profiles
            </span>
            <span className="text-[10px] text-white/40">Select to instant-login</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {INITIAL_STAFF_USERS.map((user) => {
              const Icon =
                user.role === 'admin'
                  ? ShieldCheck
                  : user.role === 'manager'
                  ? UserCheck
                  : ChefHat;
              const isCurrent = currentUser?.role === user.role;

              return (
                <button
                  key={user.id}
                  onClick={() => handleQuickDemoLogin(user)}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-sm'
                      : 'bg-[#1F1916] border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#251E1A]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                      {user.role === 'admin'
                        ? 'Admin / Owner'
                        : user.role === 'manager'
                        ? 'General Manager'
                        : 'Head Chef'}
                    </span>
                  </div>
                  <div className="text-xs text-[#EAE2D7] font-medium line-clamp-1">{user.name}</div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">{user.employeeCode}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Toggle: Login vs Signup */}
        <div className="flex p-1 rounded-lg bg-[#181412] border border-white/10">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Staff Login</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Staff Registration</span>
          </button>
        </div>

        {/* Role Selector Segment */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
            Target Staff Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'admin', label: 'Admin (Proprietor)', icon: ShieldCheck },
              { id: 'manager', label: 'Floor Manager', icon: UserCheck },
              { id: 'head_chef', label: 'Head Chef', icon: ChefHat },
            ].map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id as StaffRole)}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-[#D4AF37] bg-[#2A221C] text-[#D4AF37] font-semibold shadow'
                      : 'border-white/10 bg-[#161210] text-white/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {authMode === 'login' ? (
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 block">Official Email / ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. ranvijay@singhrestaurant.in"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#181412] border border-white/20 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-white/70">Master Security Passkey</label>
                <span className="text-[11px] text-[#D4AF37]/80 hover:underline cursor-pointer">
                  Default: 1984
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Master passkey"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#181412] border border-white/20 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/60">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/30 text-[#D4AF37] focus:ring-0"
                />
                <span>Remember session for 30 days</span>
              </label>
              <span className="text-[#C5B8A5]">Terminal: POS-01 (VNS)</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all shadow-lg active:scale-[0.99]"
            >
              Authorize & Enter Portal
            </button>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-white/70 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Alok Nath Chaturvedi"
                  className="w-full px-3 py-2 rounded-lg bg-[#181412] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/70 block">Official Email</label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="alok@singhrestaurant.in"
                  className="w-full px-3 py-2 rounded-lg bg-[#181412] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/70 block">Employee Badge Code</label>
                <input
                  type="text"
                  value={signupEmpCode}
                  onChange={(e) => setSignupEmpCode(e.target.value)}
                  placeholder="e.g. EMP-1984-042"
                  className="w-full px-3 py-2 rounded-lg bg-[#181412] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/70 block">Designation Title</label>
                <input
                  type="text"
                  value={signupDesignation}
                  onChange={(e) => setSignupDesignation(e.target.value)}
                  placeholder="e.g. Senior Sous Chef"
                  className="w-full px-3 py-2 rounded-lg bg-[#181412] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/70 block">Create Master Passcode</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={signupPasscode}
                  onChange={(e) => setSignupPasscode(e.target.value)}
                  placeholder="Choose 6+ characters passkey"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#181412] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all shadow-lg active:scale-[0.99]"
            >
              Register & Login Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
