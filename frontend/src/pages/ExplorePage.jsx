import React, { useState } from 'react';
import { Heart, X, Star, MapPin, Briefcase, GraduationCap, Check, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const ExplorePage = () => {
  const [profiles] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      age: 26,
      location: 'Delhi',
      profession: 'Software Engineer',
      education: 'B.Tech, IIT Delhi',
      bio: 'Loves hiking, reading, and exploring new places. Looking for someone with similar interests.',
      matchScore: 92,
      verified: true,
      premium: true,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    },
    {
      id: 2,
      name: 'Rahul Verma',
      age: 29,
      location: 'Mumbai',
      profession: 'Business Analyst',
      education: 'MBA, IIM Bangalore',
      bio: 'Passionate about fitness and travel. Looking for a life partner who values family.',
      matchScore: 88,
      verified: true,
      premium: false,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    },
    {
      id: 3,
      name: 'Ananya Patel',
      age: 27,
      location: 'Bangalore',
      profession: 'Product Designer',
      education: 'B.Des, NID',
      bio: 'Creative soul who loves art, music, and good conversations over coffee.',
      matchScore: 85,
      verified: false,
      premium: true,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    toast({
      title: "Interest Sent!",
      description: `You've expressed interest in ${profiles[currentIndex].name}`,
    });
    nextProfile();
  };

  const handleSkip = () => {
    toast({
      description: "Profile skipped",
    });
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      toast({
        title: "That's all for now!",
        description: "Check back later for more matches",
      });
    }
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Explore Matches</h1>
          <p className="text-gray-600 mt-1">Swipe right to connect, left to pass</p>
        </div>
        <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 px-4 py-2">
          {profiles.length} New Matches
        </Badge>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden shadow-2xl">
        <div className="relative">
          {/* Profile Image */}
          <div className="h-96 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
            <Avatar className="h-80 w-80 border-8 border-white shadow-2xl">
              <AvatarImage src={currentProfile.image} />
              <AvatarFallback className="text-6xl">{currentProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Match Score Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Star className="h-5 w-5 fill-white" />
            <span className="font-bold">{currentProfile.matchScore}% Match</span>
          </div>

          {/* Verified Badge */}
          {currentProfile.verified && (
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-lg">
              <Check className="h-4 w-4" />
              Verified
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                {currentProfile.name}, {currentProfile.age}
                {currentProfile.premium && (
                  <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                    Premium
                  </Badge>
                )}
              </h2>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5 text-rose-500" />
              <span>{currentProfile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="h-5 w-5 text-rose-500" />
              <span>{currentProfile.profession}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <GraduationCap className="h-5 w-5 text-rose-500" />
              <span>{currentProfile.education}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
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

      {/* Quick Filters */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Filters:</span>
          <div className="flex gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-rose-50">Age: 25-30</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-rose-50">Location: Delhi</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-rose-50">Verified Only</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExplorePage;