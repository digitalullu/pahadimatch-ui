import { sendOtp, verifyOtp } from '@/api/auth.api';
import { toast } from '@/hooks/use-toast';
import useAuthStore from '@/store/useAuthStore';
import { PhoneRequest } from '@/types/login';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Heart, Phone, Shield, ArrowLeft, Mountain } from 'lucide-react';

const LoginPage = () => {
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
          title: 'Welcome back!',
          description: 'You have successfully logged in',
        });
        // Check if profile is complete
        if (data.user.profileComplete) {
          navigate('/profiles');
        } else {
          navigate('/complete-profile');
        }
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
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1533113247493-619830c2e969?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Himalayan Overlay with Aipan pattern effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 via-red-900/40 to-blue-900/50 backdrop-blur-[2px]"></div>
      
      {/* Decorative Aipan corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/30 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-white/30 rounded-tr-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section - Aipan Inspired */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-orange-600 rounded-full mb-4 shadow-2xl border-4 border-white relative">
            <Mountain className="w-10 h-10 text-white absolute top-2" />
            <Heart className="w-8 h-8 text-white fill-white absolute bottom-3" />
          </div>
          <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            PahadiMatch
          </h1>
          <p className="text-amber-100 text-xl drop-shadow-lg">
            पहाड़ी दिलों का मिलन • Where Mountain Hearts Unite
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-white/90">
            <div className="w-12 h-0.5 bg-white/50"></div>
            <span className="text-sm">उत्तराखंड • हिमाचल</span>
            <div className="w-12 h-0.5 bg-white/50"></div>
          </div>
        </div>

        {/* Login Card - Aipan Style */}
        <Card className="p-8 shadow-2xl backdrop-blur-md bg-white/98 border-4 border-red-600/30 rounded-2xl relative overflow-hidden">
          {/* Aipan decorative pattern */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
          <div className="mb-6">
            {step === 2 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-4 -ml-2 text-amber-700 hover:text-amber-900"
                disabled={verifyOtpMutation.isPending}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <h2 className="text-3xl font-bold text-red-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              {step === 1 ? 'स्वागत है (Welcome Back)' : 'OTP सत्यापन (Verify)'}
            </h2>
            <p className="text-gray-600">
              {step === 1
                ? 'Enter your phone number to continue'
                : `Enter the OTP sent to ${phone}`}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-semibold">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-red-600" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    className="pl-10 border-2 border-red-200 focus:border-red-600 focus:ring-red-600"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">We'll send you an OTP to verify</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-6 text-lg shadow-lg"
                disabled={sendOtpMutation.isPending}
              >
                {sendOtpMutation.isPending ? 'Sending OTP...' : 'भेजें OTP (Send OTP)'}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700 font-semibold">
                  Enter OTP
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-5 w-5 text-amber-600" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    className="pl-10 text-center text-2xl tracking-widest border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-6 text-lg shadow-lg"
                disabled={verifyOtpMutation.isPending}
              >
                {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify & Login'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() => sendOtpMutation.mutate(Number(phone))}
                disabled={sendOtpMutation.isPending}
              >
                Resend OTP
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-700 hover:text-amber-900 font-semibold">
              Sign Up
            </Link>
          </div>
        </Card>

        <p className="text-center text-xs text-amber-100 mt-6 drop-shadow">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;