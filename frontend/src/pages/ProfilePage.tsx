import React from 'react';
import { Edit2, MapPin, Briefcase, GraduationCap, Heart, Crown, Phone, Mail, Calendar, User, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import useAuthStore from '@/store/useAuthStore';

interface ProfileData {
  name: string;
  age: number;
  email: string;
  phone: string;
  location: string;
  profession: string;
  company: string;
  education: string;
  university: string;
  bio: string;
  interests: string[];
  languages: string[];
  height: string;
  religion: string;
  familyType: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  const profileData: ProfileData = {
    name: user?.name || 'User Name',
    age: user?.age || 28,
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+91 98765 43210',
    location: user?.location || 'Uttarakhand, India',
    profession: 'Software Engineer',
    company: 'Tech Corp',
    education: 'B.Tech in Computer Science',
    university: 'IIT Delhi',
    bio: 'From the beautiful hills of Uttarakhand, passionate about technology and travel. Love hiking, reading, and exploring new places. Looking for someone who shares similar interests and values family traditions.',
    interests: ['Travel', 'Reading', 'Hiking', 'Photography', 'Cooking', 'Music'],
    languages: ['Hindi', 'English', 'Kumaoni', 'Garhwali'],
    height: '5\'10"',
    religion: 'Hindu',
    familyType: 'Joint Family',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
          मेरी प्रोफ़ाइल (My Profile)
        </h1>
        <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="p-8 border-2 border-red-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
              <AvatarImage src="https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=200&q=80" />
              <AvatarFallback className="text-4xl">{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition">
              <Camera className="h-4 w-4" />
            </button>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full p-2">
              <Crown className="h-5 w-5" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>{profileData.name}, {profileData.age}</h2>
              <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0">
                Premium Member
              </Badge>
            </div>
            
            <div className="space-y-2 text-gray-600 mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Briefcase className="h-4 w-4 text-red-600" />
                <span>{profileData.profession} at {profileData.company}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <GraduationCap className="h-4 w-4 text-red-600" />
                <span>{profileData.education}, {profileData.university}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-semibold text-red-600">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Complete your profile to get better matches</p>
            </div>
          </div>
        </div>
      </Card>

      {/* About Me */}
      <Card className="p-6 border-2 border-red-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>About Me</h3>
        <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <Card className="p-6 border-2 border-red-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Personal Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Height</p>
                <p className="font-medium text-gray-800">{profileData.height}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium text-gray-800">{profileData.age} years</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Religion</p>
                <p className="font-medium text-gray-800">{profileData.religion}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Family Type</p>
                <p className="font-medium text-gray-800">{profileData.familyType}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Details */}
        <Card className="p-6 border-2 border-red-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Contact Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{profileData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">{profileData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-800">{profileData.location}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Interests & Languages */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-2 border-red-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 text-sm border-red-200 text-red-700">
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-2 border-red-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Languages</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.languages.map((language, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 text-sm border-red-200 text-red-700">
                {language}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
