import { Bell, LogOut, Heart, Compass, MessageCircle, User, Sparkles, Crown, Mountain } from "lucide-react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import "./main-layout.css";
import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "@/api/auth.api";
import { toast } from "@/hooks/use-toast";

const MainLayout = () => {
  const location = useLocation();
  const appTitle = "PahadiMatch";
  const { isAuthenticated, user, logout } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      toast({
        description: "Logged out successfully",
      });
    },
    onError: () => {
      // Even if API fails, logout locally
      logout();
      toast({
        description: "Logged out successfully",
      });
    },
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="app-wrapper">
      {/* Mobile Top Header */}
      <header className="flex items-center justify-between px-4 h-16 animated-gradient text-white shadow-lg md:hidden">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Mountain className="h-5 w-5 absolute -top-1" />
            <Heart className="h-4 w-4 fill-white absolute top-2" />
          </div>
          <span className="text-xl font-bold ml-4">{appTitle}</span>
        </div>
        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="p-2 hover:bg-white/20 rounded-lg transition"
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center px-8 py-4 animated-gradient text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm relative">
            <Mountain className="h-6 w-6 absolute top-1 left-1/2 -translate-x-1/2" />
            <Heart className="h-5 w-5 fill-white absolute bottom-1 left-1/2 -translate-x-1/2" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{appTitle}</h1>
            <p className="text-xs text-white/90">पहाड़ी दिलों का मिलन • Mountain Hearts Unite</p>
          </div>
        </div>

        <nav className="flex gap-8 items-center">
          <Link
            to="/profiles"
            className={`flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${
              isActive("/profiles") ? "nav-active" : "opacity-80 hover:opacity-100"
            }`}
          >
            <Compass size={24} />
            <span className="text-xs font-medium">Discover</span>
          </Link>
          <Link
            to="/chat"
            className={`flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${
              isActive("/chat") ? "nav-active" : "opacity-80 hover:opacity-100"
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-xs font-medium">Messages</span>
          </Link>
          <Link
            to="/notifications"
            className={`relative flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${
              isActive("/notifications") ? "nav-active" : "opacity-80 hover:opacity-100"
            }`}
          >
            <Bell size={24} />
            <span className="text-xs font-medium">Alerts</span>
            <Badge className="absolute -top-1 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-0">3</Badge>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${
              isActive("/profile") ? "nav-active" : "opacity-80 hover:opacity-100"
            }`}
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </nav>

        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition backdrop-blur-sm"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </header>

      {/* Body Layout */}
      <div className="body-container flex-1 overflow-y-auto flex flex-col md:flex-row">
        {/* Left Sidebar - Desktop Only */}
        <aside className="left-sidebar hidden md:block w-80 p-6 space-y-4">
          {/* Profile Card */}
          <Card className="glass-card p-6 space-y-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full p-1.5">
                  <Crown className="h-4 w-4" />
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-800 mt-3">{user?.name || 'User'}</h3>
              <p className="text-sm text-gray-600">{user?.phone}</p>
              {user?.premium && (
                <Badge className="mt-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Premium Member
                </Badge>
              )}
            </div>
            
            {user?.profileComplete && (
              <div className="pt-4 border-t border-rose-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Profile Status</span>
                  <span className="font-semibold text-green-600">Complete</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profile Views</span>
                <span className="font-bold text-rose-600">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Interests Received</span>
                <span className="font-bold text-pink-600">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Interests Sent</span>
                <span className="font-bold text-orange-600">0</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Link to="/profile" className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-rose-50 rounded-lg transition">
                View Profile
              </Link>
              <Link to="/profiles" className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-rose-50 rounded-lg transition">
                Find Matches
              </Link>
              <Link to="/notifications" className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-rose-50 rounded-lg transition">
                View Interests
              </Link>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="main-content flex-1 p-4 md:p-6 mb-16 md:mb-0">
          <Outlet />
        </main>

        {/* Right Sidebar - Desktop Only */}
        <aside className="right-sidebar hidden lg:block w-80 p-6 space-y-4">
          {/* Premium Banner */}
          <Card className="glass-card p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
            <div className="text-center space-y-3">
              <Crown className="h-10 w-10 text-amber-500 mx-auto" />
              <h4 className="font-bold text-gray-800">Upgrade to Premium</h4>
              <p className="text-xs text-gray-600">Get unlimited access to all features</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg font-medium hover:shadow-lg transition">
                Upgrade Now
              </button>
            </div>
          </Card>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 backdrop-blur-md border-t border-rose-100 flex justify-around items-center h-16 shadow-lg z-50">
        <Link
          to="/profiles"
          className={`flex flex-col items-center justify-center transition-all ${
            isActive("/profiles") ? "text-rose-600 scale-110" : "text-gray-600"
          }`}
        >
          <Compass size={24} />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link
          to="/chat"
          className={`flex flex-col items-center justify-center transition-all ${
            isActive("/chat") ? "text-rose-600 scale-110" : "text-gray-600"
          }`}
        >
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link
          to="/notifications"
          className={`relative flex flex-col items-center justify-center transition-all ${
            isActive("/notifications") ? "text-rose-600 scale-110" : "text-gray-600"
          }`}
        >
          <Bell size={24} />
          <span className="text-xs mt-1">Alerts</span>
          <Badge className="absolute top-0 right-2 h-4 w-4 flex items-center justify-center p-0 bg-rose-500 text-white text-[10px] border-0">3</Badge>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center transition-all ${
            isActive("/profile") ? "text-rose-600 scale-110" : "text-gray-600"
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </footer>
    </div>
  );
};

export default MainLayout;
