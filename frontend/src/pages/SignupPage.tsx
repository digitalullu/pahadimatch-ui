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
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1696149479584-d2506b811ba2?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Enhanced Himalayan Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-red-900/60 to-orange-900/70 backdrop-blur-sm"></div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/40 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-white/40 rounded-tr-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section with improved spacing */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full shadow-2xl border-4 border-white relative">
            <Mountain className="w-9 h-9 text-white absolute top-1.5" />
            <Heart className="w-7 h-7 text-white fill-white absolute bottom-2.5" />
          </div>
          
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            PahadiMatch
          </h1>
          
          <p className="text-amber-50 text-lg font-medium drop-shadow-lg px-4">
            नया सफर शुरू करें • Begin Your Journey
          </p>
          
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-16 h-0.5 bg-white/60"></div>
            <span className="text-sm text-white/95 font-medium">उत्तराखंड • हिमाचल</span>
            <div className="w-16 h-0.5 bg-white/60"></div>
          </div>
        </div>

        {/* Signup Card with improved structure */}
        <div 
          className="p-8 shadow-2xl rounded-2xl relative overflow-hidden"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            border: '4px solid rgba(220, 38, 38, 0.3)'
          }}
        >
          {/* Decorative borders */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
          
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

          <div className="mt-7 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-4 py-2 ml-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
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