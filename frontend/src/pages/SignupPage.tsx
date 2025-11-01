import { sendOtp, verifyOtp } from '@/api/auth.api';
import { toast } from '@/hooks/use-toast';
import useAuthStore from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Heart, Phone, Shield, ArrowLeft, Mountain } from 'lucide-react';

const SignupPage = () => {
  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState(1);

  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const sendOtpMutation = useMutation({
    mutationFn: (phone: number) => sendOtp({ phone }),
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'OTP sent successfully to your phone',
      });
      setStep(2);
    },
    onError: (err: any) => {
      let message = 'Something went wrong';

      if (err.code === 'ERR_NETWORK') {
        message = 'Cannot connect to the server. Please check your network.';
      } else if (err.response) {
        message = err.response.data?.message || 'Server error occurred.';
      }

      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: () => verifyOtp({ phone: Number(phone), otp: Number(otp) }),
    onSuccess: (res) => {
      const data = res.data;
      if (data?.token && data?.user) {
        setToken(data.user, data.token);
        toast({
          title: 'Account Created!',
          description: 'Please complete your profile to continue',
        });
        // Always go to profile creation after signup
        navigate('/complete-profile');
      }
    },
    onError: (err: any) => {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Invalid OTP. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast({
        title: 'Invalid Phone',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive',
      });
      return;
    }
    sendOtpMutation.mutate(Number(phone));
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }
    verifyOtpMutation.mutate();
  };

  const handleBack = () => {
    setStep(1);
    setOtp('');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(https://images.unsplash.com/photo-1696149479584-d2506b811ba2?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Enhanced Himalayan Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.7), rgba(127, 29, 29, 0.6), rgba(124, 45, 18, 0.7))',
        backdropFilter: 'blur(4px)'
      }}></div>
      
      {/* Decorative corners */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '128px',
        height: '128px',
        borderTop: '4px solid rgba(255, 255, 255, 0.4)',
        borderLeft: '4px solid rgba(255, 255, 255, 0.4)',
        borderTopLeftRadius: '24px'
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '128px',
        height: '128px',
        borderTop: '4px solid rgba(255, 255, 255, 0.4)',
        borderRight: '4px solid rgba(255, 255, 255, 0.4)',
        borderTopRightRadius: '24px'
      }}></div>
      
      <div style={{
        width: '100%',
        maxWidth: '448px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo Section with improved spacing */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div 
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(to bottom right, #dc2626, #ea580c)',
              border: '4px solid white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              margin: '0 auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <Mountain style={{ width: '36px', height: '36px', color: 'white', position: 'absolute', top: '6px' }} />
            <Heart style={{ width: '28px', height: '28px', color: 'white', fill: 'white', position: 'absolute', bottom: '10px' }} />
          </div>
          
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginTop: '16px',
            marginBottom: '12px',
            fontFamily: 'Georgia, serif',
            textShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}>
            PahadiMatch
          </h1>
          
          <p style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#fef3c7',
            padding: '0 16px',
            marginBottom: '12px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            नया सफर शुरू करें • Begin Your Journey
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', paddingTop: '8px' }}>
            <div style={{ width: '64px', height: '2px', background: 'rgba(255, 255, 255, 0.6)' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.95)' }}>उत्तराखंड • हिमाचल</span>
            <div style={{ width: '64px', height: '2px', background: 'rgba(255, 255, 255, 0.6)' }}></div>
          </div>
        </div>

        {/* Signup Card with improved structure */}
        <div 
          style={{ 
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderRadius: '16px',
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            border: '4px solid rgba(220, 38, 38, 0.3)',
            overflow: 'hidden'
          }}
        >
          {/* Decorative borders */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '8px',
            background: 'linear-gradient(to right, #dc2626, #f97316, #dc2626)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '8px',
            background: 'linear-gradient(to right, #dc2626, #f97316, #dc2626)'
          }}></div>
          
          <div className="mb-7">
            {step === 2 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-4 -ml-2 text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                disabled={verifyOtpMutation.isPending}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <h2 className="text-3xl font-bold text-red-800 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              {step === 1 ? 'नया खाता बनाएं (Create Account)' : 'OTP सत्यापन (Verify)'}
            </h2>
            <p className="text-gray-600 text-base">
              {step === 1
                ? 'Enter your phone number to get started'
                : `Enter the OTP sent to +91 ${phone}`}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="phone" className="text-gray-800 font-semibold text-sm">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-red-600" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    className="pl-11 h-12 border-2 border-red-200 focus:border-red-600 focus:ring-red-600 text-base"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 pt-1">We'll send you an OTP to verify</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-6 text-base shadow-lg transition-all hover:shadow-xl"
                disabled={sendOtpMutation.isPending}
              >
                {sendOtpMutation.isPending ? 'Sending OTP...' : 'भेजें OTP (Send OTP)'}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="otp" className="text-gray-800 font-semibold text-sm">
                  Enter OTP
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3.5 h-5 w-5 text-red-600" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    className="pl-11 h-12 text-center text-2xl tracking-widest border-2 border-red-200 focus:border-red-600 focus:ring-red-600"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-6 text-base shadow-lg transition-all hover:shadow-xl"
                disabled={verifyOtpMutation.isPending}
              >
                {verifyOtpMutation.isPending ? 'Verifying...' : 'सत्यापित करें (Verify & Continue)'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-red-300 text-red-700 hover:bg-red-50 font-medium"
                onClick={() => sendOtpMutation.mutate(Number(phone))}
                disabled={sendOtpMutation.isPending}
              >
                Resend OTP
              </Button>
            </form>
          )}

          <div className="mt-7 pt-6 text-center" style={{ borderTop: '1px solid #e5e7eb' }}>
            <p className="text-sm" style={{ color: '#4b5563' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 16px',
                  marginLeft: '8px',
                  background: 'linear-gradient(to right, #dc2626, #ea580c)',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-white/95 mt-6 drop-shadow-lg px-4 leading-relaxed">
          By signing up, you agree to our <span className="font-semibold">Terms of Service</span> and <span className="font-semibold">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;