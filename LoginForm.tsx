'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Copy, Check } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const DEMO_CREDENTIALS = [
  { id: 'cred-alex', role: 'You (Alex)', email: 'alex.rivera@studysync.app', password: 'StudyDuo#2026' },
  { id: 'cred-jordan', role: 'Partner (Jordan)', email: 'jordan.kim@studysync.app', password: 'StudyDuo#2026' },
];

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { rememberMe: false },
  });

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUseCredential = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/login with { email, password }
    await new Promise((r) => setTimeout(r, 1200));

    const validEmails = DEMO_CREDENTIALS.map((c) => c.email);
    if (!validEmails.includes(data.email) || data.password !== 'StudyDuo#2026') {
      setError('root', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back 👋</h2>
        <p className="text-muted-foreground text-sm mt-1">Sign in to continue your study streak</p>
      </div>

      {/* Google Auth */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium text-foreground transition-all duration-150 active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root && (
          <div className="bg-danger-muted border border-danger/20 rounded-xl px-4 py-3 animate-slide-up">
            <p className="text-danger text-sm font-medium">{errors.root.message}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Email address</label>
          <input
            type="email"
            placeholder="you@university.edu"
            className={`input-field ${errors.email ? 'border-danger focus:ring-danger' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <p className="text-danger text-xs mt-1.5 font-medium">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`input-field pr-11 ${errors.password ? 'border-danger focus:ring-danger' : ''}`}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-danger text-xs mt-1.5 font-medium">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded accent-primary" {...register('rememberMe')} />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          <button type="button" className="text-sm text-primary font-semibold hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New here?{' '}
        <button onClick={onSwitchToSignup} className="text-primary font-semibold hover:underline">
          Create your account
        </button>
      </p>

      {/* Demo credentials box */}
      <div className="border border-border rounded-2xl p-4 bg-muted/50 mt-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Demo Accounts</p>
        <div className="space-y-2">
          {DEMO_CREDENTIALS.map((cred) => (
            <div key={cred.id} className="bg-card rounded-xl p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary">{cred.role}</span>
                <button
                  onClick={() => handleUseCredential(cred.email, cred.password)}
                  className="text-2xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  Use this
                </button>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs text-muted-foreground w-14 shrink-0">Email</span>
                  <span className="text-xs text-foreground font-medium truncate flex-1">{cred.email}</span>
                  <button
                    onClick={() => handleCopy(cred.email, `${cred.id}-email`)}
                    className="shrink-0 p-1 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Copy email"
                  >
                    {copiedField === `${cred.id}-email` ? (
                      <Check size={12} className="text-success" />
                    ) : (
                      <Copy size={12} className="text-muted-foreground" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs text-muted-foreground w-14 shrink-0">Password</span>
                  <span className="text-xs text-foreground font-medium flex-1">StudyDuo#2026</span>
                  <button
                    onClick={() => handleCopy(cred.password, `${cred.id}-pass`)}
                    className="shrink-0 p-1 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Copy password"
                  >
                    {copiedField === `${cred.id}-pass` ? (
                      <Check size={12} className="text-success" />
                    ) : (
                      <Copy size={12} className="text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}