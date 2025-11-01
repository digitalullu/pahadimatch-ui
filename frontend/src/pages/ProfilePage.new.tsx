import React from 'react';
import { Edit2, MapPin, Briefcase, GraduationCap, Heart, Crown, Phone, Mail, Calendar, User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  const profileCompletion = 85;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #dc2626, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Georgia, serif'
        }}>
          मेरी प्रोफ़ाइल (My Profile)
        </h1>
        <Button style={{
          background: 'linear-gradient(to right, #dc2626, #ea580c)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          <Edit2 style={{ height: '16px', width: '16px' }} />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header Card */}
      <div style={{
        padding: '32px',
        background: 'white',
        border: '2px solid #fecaca',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid white',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
              background: '#f3f4f6'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=200&q=80" 
                alt={profileData.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <button style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: '8px',
              background: 'linear-gradient(to right, #dc2626, #ea580c)',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}>
              <Camera style={{ height: '16px', width: '16px' }} />
            </button>
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'linear-gradient(to right, #dc2626, #ea580c)',
              color: 'white',
              borderRadius: '50%',
              padding: '8px'
            }}>
              <Crown style={{ height: '20px', width: '20px' }} />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', fontFamily: 'Georgia, serif', margin: 0 }}>
                {profileData.name}, {profileData.age}
              </h2>
              <Badge style={{
                background: 'linear-gradient(to right, #dc2626, #ea580c)',
                color: 'white',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Premium Member
              </Badge>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#6b7280', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin style={{ height: '16px', width: '16px', color: '#dc2626' }} />
                <span>{profileData.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase style={{ height: '16px', width: '16px', color: '#dc2626' }} />
                <span>{profileData.profession} at {profileData.company}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap style={{ height: '16px', width: '16px', color: '#dc2626' }} />
                <span>{profileData.education}, {profileData.university}</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Profile Completion</span>
                <span style={{ fontWeight: '600', color: '#dc2626' }}>{profileCompletion}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${profileCompletion}%`,
                  background: 'linear-gradient(to right, #dc2626, #ea580c)',
                  transition: 'width 0.3s'
                }} />
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Complete your profile to get better matches</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div style={{
        padding: '24px',
        background: 'white',
        border: '2px solid #fecaca',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>About Me</h3>
        <p style={{ color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{profileData.bio}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Personal Details */}
        <div style={{
          padding: '24px',
          background: 'white',
          border: '2px solid #fecaca',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Personal Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Height</p>
                <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{profileData.height}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Age</p>
                <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{profileData.age} years</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Heart style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Religion</p>
                <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{profileData.religion}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Family Type</p>
                <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{profileData.familyType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div style={{
          padding: '24px',
          background: 'white',
          border: '2px solid #fecaca',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Contact Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Email</p>
                <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{profileData.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Phone</p>
                <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{profileData.phone}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Location</p>
                <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{profileData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interests & Languages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{
          padding: '24px',
          background: 'white',
          border: '2px solid #fecaca',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Interests</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profileData.interests.map((interest, index) => (
              <Badge key={index} style={{
                padding: '8px 16px',
                fontSize: '14px',
                border: '2px solid #fecaca',
                color: '#b91c1c',
                background: 'white',
                borderRadius: '20px'
              }}>
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div style={{
          padding: '24px',
          background: 'white',
          border: '2px solid #fecaca',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Languages</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profileData.languages.map((language, index) => (
              <Badge key={index} style={{
                padding: '8px 16px',
                fontSize: '14px',
                border: '2px solid #fecaca',
                color: '#b91c1c',
                background: 'white',
                borderRadius: '20px'
              }}>
                {language}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;