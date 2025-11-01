import React, { useState } from 'react';
import { Heart, MessageCircle, Eye, UserPlus, Star, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

type NotificationType = 'interest' | 'view' | 'message' | 'match';

interface Notification {
  id: number;
  type: NotificationType;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread: boolean;
}

interface Interest {
  id: number;
  name: string;
  age: number;
  location: string;
  message: string;
  avatar: string;
  matchScore: number;
}

const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [notifications] = useState<Notification[]>([
    { id: 1, type: 'interest', name: 'Priya Sharma', message: 'sent you an interest', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100&q=80', unread: true },
    { id: 2, type: 'view', name: 'Rahul Verma', message: 'viewed your profile', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', unread: true },
    { id: 3, type: 'message', name: 'Ananya Patel', message: 'sent you a message', time: '1 day ago', avatar: 'https://images.pexels.com/photos/14758778/pexels-photo-14758778.jpeg?w=100&q=80', unread: false },
    { id: 4, type: 'match', name: 'Arjun Singh', message: 'matched with you', time: '2 days ago', avatar: 'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?w=100&q=80', unread: false },
  ]);

  const [interests, setInterests] = useState<Interest[]>([
    { id: 1, name: 'Priya Sharma', age: 26, location: 'Delhi', message: 'Would love to connect!', avatar: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100&q=80', matchScore: 92 },
    { id: 2, name: 'Sneha Reddy', age: 25, location: 'Hyderabad', message: 'Hi! Your profile looks interesting.', avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100&q=80', matchScore: 88 },
  ]);

  const getIcon = (type: NotificationType): React.ReactElement => {
    switch (type) {
      case 'interest': return <Heart style={{ height: '20px', width: '20px', color: '#dc2626' }} />;
      case 'view': return <Eye style={{ height: '20px', width: '20px', color: '#3b82f6' }} />;
      case 'message': return <MessageCircle style={{ height: '20px', width: '20px', color: '#10b981' }} />;
      case 'match': return <Star style={{ height: '20px', width: '20px', color: '#f59e0b' }} />;
      default: return <UserPlus style={{ height: '20px', width: '20px', color: '#6b7280' }} />;
    }
  };

  const handleAcceptInterest = (id: number): void => {
    setInterests(interests.filter(i => i.id !== id));
    toast({
      title: 'रुचि स्वीकार! (Interest Accepted!)',
      description: 'You can now start chatting',
    });
  };

  const handleDeclineInterest = (id: number): void => {
    setInterests(interests.filter(i => i.id !== id));
    toast({
      description: 'Interest declined',
    });
  };

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #dc2626, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Georgia, serif'
        }}>
          सूचनाएं (Notifications)
        </h1>
        <Badge style={{
          background: 'linear-gradient(to right, #dc2626, #ea580c)',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px'
        }}>
          {notifications.filter(n => n.unread).length} New
        </Badge>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px',
          background: '#f3f4f6',
          padding: '4px',
          borderRadius: '12px'
        }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'all' ? 'white' : 'transparent',
              color: activeTab === 'all' ? '#1f2937' : '#6b7280',
              fontWeight: activeTab === 'all' ? '600' : '500',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: activeTab === 'all' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab('interests')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'interests' ? 'white' : 'transparent',
              color: activeTab === 'interests' ? '#1f2937' : '#6b7280',
              fontWeight: activeTab === 'interests' ? '600' : '500',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: activeTab === 'interests' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Interests Received
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'activity' ? 'white' : 'transparent',
              color: activeTab === 'activity' ? '#1f2937' : '#6b7280',
              fontWeight: activeTab === 'activity' ? '600' : '500',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: activeTab === 'activity' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Activity
          </button>
        </div>
      </div>

      {/* All Notifications Tab */}
      {activeTab === 'all' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                padding: '16px',
                background: notification.unread ? '#fef2f2' : 'white',
                border: notification.unread ? '2px solid #fecaca' : '2px solid #e5e7eb',
                borderRadius: '12px',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <img src={notification.avatar} alt={notification.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {getIcon(notification.type)}
                    <p style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{notification.name}</p>
                    <span style={{ color: '#6b7280' }}>{notification.message}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{notification.time}</p>
                </div>
                {notification.unread && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#dc2626',
                    borderRadius: '50%'
                  }} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interests Tab */}
      {activeTab === 'interests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {interests.map((interest) => (
            <div
              key={interest.id}
              style={{
                padding: '24px',
                background: 'white',
                border: '2px solid #fecaca',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <img src={interest.avatar} alt={interest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                      {interest.name}, {interest.age}
                    </h3>
                    <Badge style={{
                      background: 'linear-gradient(to right, #dc2626, #ea580c)',
                      color: 'white',
                      border: 'none',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Star style={{ height: '12px', width: '12px', fill: 'white' }} />
                      {interest.matchScore}%
                    </Badge>
                  </div>
                  <p style={{ color: '#6b7280', marginBottom: '8px' }}>{interest.location}</p>
                  <p style={{ fontSize: '14px', color: '#4b5563', fontStyle: 'italic', margin: 0 }}>"{interest.message}"</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '300px' }}>
                  <Button
                    onClick={() => handleDeclineInterest(interest.id)}
                    variant="outline"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      background: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <X style={{ height: '16px', width: '16px' }} />
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleAcceptInterest(interest.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      background: 'linear-gradient(to right, #dc2626, #ea580c)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Check style={{ height: '16px', width: '16px' }} />
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {interests.length === 0 && (
            <div style={{
              padding: '48px',
              background: 'white',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <Heart style={{ height: '64px', width: '64px', color: '#d1d5db', margin: '0 auto 16px' }} />
              <p style={{ color: '#6b7280', margin: 0 }}>No new interests at the moment</p>
            </div>
          )}
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.filter(n => n.type === 'view' || n.type === 'match').map((notification) => (
            <div
              key={notification.id}
              style={{
                padding: '16px',
                background: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <img src={notification.avatar} alt={notification.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {getIcon(notification.type)}
                    <p style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>{notification.name}</p>
                    <span style={{ color: '#6b7280' }}>{notification.message}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;