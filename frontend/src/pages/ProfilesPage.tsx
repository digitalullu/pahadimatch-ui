import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '@/api/profile.api';
import { Profile } from '@/types/profile';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, X, MapPin, Briefcase, GraduationCap, Loader2, Star, Check } from 'lucide-react';
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
      // Load next page
      setCurrentPage(currentPage + 1);
      setCurrentIndex(0);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-600">Failed to load profiles</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  if (!profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Heart className="h-16 w-16 text-gray-300" />
        <p className="text-gray-600">No profiles available at the moment</p>
        <Button onClick={() => refetch()}>Refresh</Button>
      </div>
    );
  }

  const profileImages = [
    'https://images.unsplash.com/photo-1649433658557-54cf58577c68',
    'https://images.unsplash.com/photo-1581065178047-8ee15951ede6',
    'https://images.pexels.com/photos/14758778/pexels-photo-14758778.jpeg',
    'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
            खोजें (Discover Matches)
          </h1>
          <p className="text-gray-600 mt-1">Find your perfect Pahadi match</p>
        </div>
        <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 px-4 py-2">
          {profiles.length} Profiles
        </Badge>
      </div>

      {/* Profile Card */}
      {currentProfile && (
        <Card className="overflow-hidden shadow-2xl border-4 border-red-600/20 rounded-2xl relative">
          {/* Aipan decorative borders */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 z-10"></div>
          
          <div className="relative">
            {/* Profile Image with Himalayan background */}
            <div 
              className="h-96 flex items-center justify-center relative"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1549811253-aed8c89e9f3d?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <Avatar className="h-80 w-80 border-8 border-white shadow-2xl relative z-10">
                <AvatarImage src={`${profileImages[currentIndex % profileImages.length]}?w=400&q=80`} />
                <AvatarFallback className="text-6xl">
                  {currentProfile.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Verified Badge */}
            {currentProfile.verified && (
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-lg">
                <Check className="h-4 w-4" />
                Verified
              </div>
            )}

            {/* Premium Badge */}
            {currentProfile.premium && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Star className="h-5 w-5 fill-white" />
                Premium
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  {currentProfile.name}
                  {currentProfile.dateOfBirth && (
                    <span className="text-2xl text-gray-600">
                      , {new Date().getFullYear() - new Date(currentProfile.dateOfBirth).getFullYear()}
                    </span>
                  )}
                </h2>
              </div>
            </div>

            <div className="space-y-2">
              {(currentProfile.city || currentProfile.state) && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-rose-500" />
                  <span>
                    {currentProfile.city}
                    {currentProfile.state && `, ${currentProfile.state}`}
                  </span>
                </div>
              )}
              {currentProfile.occupation && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-5 w-5 text-rose-500" />
                  <span>{currentProfile.occupation}</span>
                </div>
              )}
              {currentProfile.education && (
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="h-5 w-5 text-rose-500" />
                  <span>{currentProfile.education}</span>
                </div>
              )}
            </div>

            {currentProfile.bio && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              {currentProfile.religion && (
                <div>
                  <span className="text-sm text-gray-500">Religion</span>
                  <p className="font-medium">{currentProfile.religion}</p>
                </div>
              )}
              {currentProfile.motherTongue && (
                <div>
                  <span className="text-sm text-gray-500">Mother Tongue</span>
                  <p className="font-medium">{currentProfile.motherTongue}</p>
                </div>
              )}
              {currentProfile.height && (
                <div>
                  <span className="text-sm text-gray-500">Height</span>
                  <p className="font-medium">{currentProfile.height}</p>
                </div>
              )}
              {currentProfile.maritalStatus && (
                <div>
                  <span className="text-sm text-gray-500">Marital Status</span>
                  <p className="font-medium capitalize">
                    {currentProfile.maritalStatus.replace('_', ' ')}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-1 h-14 text-lg border-2 border-gray-300 hover:bg-gray-50"
              >
                <X className="h-6 w-6 mr-2" />
                Skip
              </Button>
              <Button
                onClick={handleLike}
                className="flex-1 h-14 text-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
              >
                <Heart className="h-6 w-6 mr-2 fill-white" />
                Send Interest
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Progress Indicator */}
      <div className="text-center text-sm text-gray-500">
        Profile {currentIndex + 1} of {profiles.length}
      </div>
    </div>
  );
};

export default ProfilesPage;
