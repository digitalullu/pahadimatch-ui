import React, { useState } from 'react';
import { Heart, MessageCircle, Eye, UserPlus, Star, X, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'interest', name: 'Priya Sharma', message: 'sent you an interest', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100&q=80', unread: true },
    { id: 2, type: 'view', name: 'Rahul Verma', message: 'viewed your profile', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', unread: true },
    { id: 3, type: 'message', name: 'Ananya Patel', message: 'sent you a message', time: '1 day ago', avatar: 'https://images.pexels.com/photos/14758778/pexels-photo-14758778.jpeg?w=100&q=80', unread: false },
    { id: 4, type: 'match', name: 'Arjun Singh', message: 'matched with you', time: '2 days ago', avatar: 'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?w=100&q=80', unread: false },
  ]);

  const [interests, setInterests] = useState<Interest[]>([
    { id: 1, name: 'Priya Sharma', age: 26, location: 'Delhi', message: 'Would love to connect!', avatar: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100&q=80', matchScore: 92 },
    { id: 2, name: 'Sneha Reddy', age: 25, location: 'Hyderabad', message: 'Hi! Your profile looks interesting.', avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=100&q=80', matchScore: 88 },
  ]);

  const getIcon = (type: NotificationType): JSX.Element => {
    switch (type) {
      case 'interest': return <Heart className="h-5 w-5 text-red-600" />;
      case 'view': return <Eye className="h-5 w-5 text-blue-500" />;
      case 'message': return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'match': return <Star className="h-5 w-5 text-amber-500" />;
      default: return <UserPlus className="h-5 w-5 text-gray-500" />;
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
          सूचनाएं (Notifications)
        </h1>
        <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 px-4 py-2">
          {notifications.filter(n => n.unread).length} New
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="interests">Interests Received</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-6">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-4 transition hover:shadow-md border-2 ${notification.unread ? 'bg-red-50 border-red-200' : 'border-gray-200'}`}>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-white shadow">
                  <AvatarImage src={notification.avatar} />
                  <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getIcon(notification.type)}
                    <p className="font-semibold text-gray-800">{notification.name}</p>
                    <span className="text-gray-600">{notification.message}</span>
                  </div>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
                {notification.unread && (
                  <div className="h-2 w-2 bg-red-500 rounded-full" />
                )}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="interests" className="space-y-4 mt-6">
          {interests.map((interest) => (
            <Card key={interest.id} className="p-6 border-2 border-red-100">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src={interest.avatar} />
                  <AvatarFallback>{interest.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-800">{interest.name}, {interest.age}</h3>
                    <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      {interest.matchScore}%
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{interest.location}</p>
                  <p className="text-sm text-gray-700 italic">"{interest.message}"</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    onClick={() => handleDeclineInterest(interest.id)}
                    variant="outline"
                    className="flex-1 md:flex-none border-2 border-gray-300"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleAcceptInterest(interest.id)}
                    className="flex-1 md:flex-none bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {interests.length === 0 && (
            <Card className="p-12 text-center">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No new interests at the moment</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-3 mt-6">
          {notifications.filter(n => n.type === 'view' || n.type === 'match').map((notification) => (
            <Card key={notification.id} className="p-4 transition hover:shadow-md border-2 border-gray-200">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-white shadow">
                  <AvatarImage src={notification.avatar} />
                  <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getIcon(notification.type)}
                    <p className="font-semibold text-gray-800">{notification.name}</p>
                    <span className="text-gray-600">{notification.message}</span>
                  </div>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
