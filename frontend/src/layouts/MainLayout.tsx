import { Bell, LogOut, Heart, Compass, MessageCircle, User, Mountain } from "lucide-react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
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

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const logoContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const logoBoxStyle: React.CSSProperties = {
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    backdropFilter: 'blur(4px)',
    position: 'relative',
    width: '48px',
    height: '48px',
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  };

  const navLinkStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    color: 'white',
    opacity: active ? 1 : 0.8,
    transition: 'all 0.3s',
    cursor: 'pointer',
  });

  const mainContentStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 80px)',
    background: 'linear-gradient(to bottom right, #fff1f2, #fce7f3, #ffedd5)',
  };

  const mobileNavStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Desktop Header */}
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          <div style={logoBoxStyle}>
            <Mountain style={{ height: '24px', width: '24px', position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)' }} />
            <Heart style={{ height: '20px', width: '20px', fill: 'white', position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.05em', fontFamily: 'Georgia, serif', margin: 0 }}>
              {appTitle}
            </h1>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
              पहाड़ी दिलों का मिलन • Mountain Hearts Unite
            </p>
          </div>
        </div>

        <nav style={navStyle}>
          <Link
            to="/profiles"
            style={navLinkStyle(isActive("/profiles"))}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Compass size={24} />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Discover</span>
          </Link>
          <Link
            to="/chat"
            style={navLinkStyle(isActive("/chat"))}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <MessageCircle size={24} />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Messages</span>
          </Link>
          <Link
            to="/notifications"
            style={navLinkStyle(isActive("/notifications"))}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Bell size={24} />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Alerts</span>
          </Link>
          <Link
            to="/profile"
            style={navLinkStyle(isActive("/profile"))}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <User size={24} />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Profile</span>
          </Link>
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            style={{
              ...navLinkStyle(false),
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'none';
            }}
          >
            <LogOut size={24} />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Logout</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <nav style={{ ...mobileNavStyle, display: window.innerWidth < 768 ? 'flex' : 'none' }}>
        <Link to="/profiles" style={navLinkStyle(isActive("/profiles"))}>
          <Compass size={24} />
        </Link>
        <Link to="/chat" style={navLinkStyle(isActive("/chat"))}>
          <MessageCircle size={24} />
        </Link>
        <Link to="/notifications" style={navLinkStyle(isActive("/notifications"))}>
          <Bell size={24} />
        </Link>
        <Link to="/profile" style={navLinkStyle(isActive("/profile"))}>
          <User size={24} />
        </Link>
        <button
          onClick={() => logoutMutation.mutate()}
          style={{ ...navLinkStyle(false), background: 'none', border: 'none', padding: 0 }}
        >
          <LogOut size={24} />
        </button>
      </nav>
    </div>
  );
};

export default MainLayout;
