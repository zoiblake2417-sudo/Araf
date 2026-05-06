'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Copy, Check, Link2 } from 'lucide-react';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  partnerCode: string;
  agreeTerms: boolean;
}

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCode] = useState('SYNC-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [codeCopied, setCodeCopied] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(inviteCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/signup with { name, email, password, partnerCode }
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Join StudySync Duo 🎓</h2>
        <p className="text-muted-foreground text-sm mt-1">Create your account and invite your partner</p>
      </div>

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
        Sign up with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Full name</label>
          <input
            type="text"
            placeholder="Your name"
            className={`input-field ${errors.name ? 'border-danger focus:ring-danger' : ''}`}
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
          />
          {errors.name && <p className="text-danger text-xs mt-1.5 font-medium">{errors.name.message}</p>}
        </div>

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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 chars"
                className={`input-field pr-10 ${errors.password ? 'border-danger focus:ring-danger' : ''}`}
                {...register('password', { required: 'Required', minLength: { value: 8, message: 'Min. 8 chars' } })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && <p className="text-danger text-xs mt-1.5 font-medium">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Confirm</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat password"
                className={`input-field pr-10 ${errors.confirmPassword ? 'border-danger focus:ring-danger' : ''}`}
                {...register('confirmPassword', {
                  required: 'Required',
                  validate: (v) => v === password || 'Passwords do not match',
                })}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-danger text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Partner invite code */}
        <div className="bg-secondary rounded-2xl p-4 space-y-3 border border-primary/20">
          <div className="flex items-center gap-2">
            <Link2 size={15} className="text-primary" />
            <p className="text-sm font-semibold text-foreground">Connect with your partner</p>
          </div>
          <p className="text-xs text-muted-foreground">Share your invite code OR enter your partner&apos;s code below</p>

          {/* Your code */}
          <div>
            <p className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Your invite code</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-card rounded-xl px-3 py-2 border border-border">
                <span className="text-sm font-bold text-primary tracking-widest">{inviteCode}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="Copy invite code"
              >
                {codeCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Enter partner code */}
          <div>
            <label className="block text-2xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Partner&apos;s code (optional — connect later)
            </label>
            <input
              type="text"
              placeholder="e.g. SYNC-AB12CD"
              className="input-field text-sm font-mono tracking-wider"
              {...register('partnerCode')}
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded accent-primary mt-0.5 shrink-0"
            {...register('agreeTerms', { required: 'You must agree to continue' })}
          />
          <span className="text-sm text-muted-foreground leading-relaxed">
            I agree to the{' '}
            <button type="button" className="text-primary font-semibold hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button type="button" className="text-primary font-semibold hover:underline">Privacy Policy</button>
          </span>
        </label>
        {errors.agreeTerms && <p className="text-danger text-xs font-medium">{errors.agreeTerms.message}</p>}

        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-base">
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
}