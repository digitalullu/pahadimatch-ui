import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '@/api/profile.api';
import { Button } from '@/components/ui/button';
import { Heart, X, MapPin, Briefcase, GraduationCap, Loader2, Star, Check, Crown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProfilesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['profiles', currentPage],
    queryFn: () => getProfiles(currentPage),
  });

  const profiles = data?.data?.profiles || [];
  const currentProfile = profiles[currentIndex];

  const handleLike = () => {
    toast({
      title: 'Interest Sent!',
      description: `You've expressed interest in ${currentProfile?.name}`,
    });
    nextProfile();
  };

  const handleSkip = () => {
    toast({
      description: 'Profile skipped',
    });
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentPage(currentPage + 1);
      setCurrentIndex(0);
    }
  };

  const profileImages = [
    'https://images.unsplash.com/photo-1649433658557-54cf58577c68',
    'https://images.unsplash.com/photo-1581065178047-8ee15951ede6',
    'https://images.pexels.com/photos/14758778/pexels-photo-14758778.jpeg',
    'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg',
  ];

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 style={{ height: '48px', width: '48px', animation: 'spin 1s linear infinite', color: '#dc2626' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
        <p style={{ color: '#4b5563' }}>Failed to load profiles</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  if (!profiles.length) {
    return (
      <div style={{ padding: '32px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', background: 'linear-gradient(to right, #dc2626, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
                खोजें (Discover Matches)
              </h1>
              <p style={{ color: '#4b5563' }}>Find your perfect Pahadi match</p>
            </div>
          </div>

          {/* No Profiles Card */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '400px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '48px',
            textAlign: 'center'
          }}>
            <Heart style={{ height: '64px', width: '64px', color: '#d1d5db', marginBottom: '24px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
              No profiles available at the moment
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Check back soon for new matches
            </p>
            <Button 
              onClick={() => refetch()}
              style={{
                background: 'linear-gradient(to right, #dc2626, #ea580c)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Refresh
            </Button>
          </div>

          {/* Premium Upgrade Card */}
          <div style={{
            marginTop: '32px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <Crown style={{ height: '48px', width: '48px', color: '#f59e0b', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#78350f', marginBottom: '12px' }}>
              Upgrade to Premium
            </h3>
            <p style={{ color: '#92400e', marginBottom: '24px' }}>
              Get unlimited access to all features
            </p>
            <Button 
              style={{
                background: 'linear-gradient(to right, #f59e0b, #d97706)',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', background: 'linear-gradient(to right, #dc2626, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
              खोजें (Discover Matches)
            </h1>
            <p style={{ color: '#4b5563' }}>Find your perfect Pahadi match</p>
          </div>
          <div style={{
            background: 'linear-gradient(to right, #dc2626, #ea580c)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {profiles.length} Profiles
          </div>
        </div>

        {/* Profile Card */}
        {currentProfile && (
          <div style={{
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            background: 'white',
            border: '4px solid rgba(220, 38, 38, 0.2)',
            position: 'relative'
          }}>
            {/* Top decorative bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(to right, #dc2626, #ea580c, #dc2626)',
              zIndex: 10
            }}></div>

            {/* Profile Image */}
            <div style={{
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundImage: 'url(https://images.unsplash.com/photo-1549811253-aed8c89e9f3d?w=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, white, transparent, transparent)'
              }}></div>
              
              {/* Avatar */}
              <div style={{
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                border: '8px solid white',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 10,
                background: '#f3f4f6'
              }}>
                <img 
                  src={`${profileImages[currentIndex % profileImages.length]}?w=400&q=80`}
                  alt={currentProfile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Premium Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'linear-gradient(to right, #dc2626, #ea580c)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 10
              }}>
                <Star style={{ height: '20px', width: '20px', fill: 'white' }} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Premium</span>
              </div>
            </div>

            {/* Profile Info */}
            <div style={{ padding: '32px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
                  {currentProfile.name}
                  {currentProfile.dateOfBirth && (
                    <span style={{ fontSize: '24px', color: '#6b7280' }}>
                      , {new Date().getFullYear() - new Date(currentProfile.dateOfBirth).getFullYear()}
                    </span>
                  )}
                </h2>
                
                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
                  {currentProfile.city && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
                      <MapPin style={{ height: '20px', width: '20px', color: '#dc2626' }} />
                      <span>{currentProfile.city}</span>
                    </div>
                  )}
                  {currentProfile.occupation && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
                      <Briefcase style={{ height: '20px', width: '20px', color: '#dc2626' }} />
                      <span>{currentProfile.occupation}</span>
                    </div>
                  )}
                  {currentProfile.education && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
                      <GraduationCap style={{ height: '20px', width: '20px', color: '#dc2626' }} />
                      <span>{currentProfile.education}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              {currentProfile.bio && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                    About
                  </h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                    {currentProfile.bio}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                <Button
                  onClick={handleSkip}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px',
                    border: '2px solid #fecaca',
                    background: 'white',
                    color: '#dc2626',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <X style={{ height: '24px', width: '24px' }} />
                  Skip
                </Button>
                <Button
                  onClick={handleLike}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px',
                    background: 'linear-gradient(to right, #dc2626, #ea580c)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(220, 38, 38, 0.3)'
                  }}
                >
                  <Heart style={{ height: '24px', width: '24px', fill: 'white' }} />
                  Like
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilesPage;
