import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Smile } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 1, name: 'Priya Sharma', lastMessage: 'That sounds great!', time: '2m ago', unread: 2, online: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
    { id: 2, name: 'Rahul Verma', lastMessage: 'See you tomorrow!', time: '1h ago', unread: 0, online: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul' },
    { id: 3, name: 'Ananya Patel', lastMessage: 'Thank you so much!', time: '3h ago', unread: 1, online: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya' },
    { id: 4, name: 'Arjun Singh', lastMessage: 'What do you think?', time: '1d ago', unread: 0, online: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun' },
  ];

  const messages = [
    { id: 1, sender: 'them', text: 'Hi! I saw your profile and would love to connect.', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hello! Thank you for reaching out. I\'d love to know more about you.', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'Sure! I work as a software engineer and love hiking on weekends.', time: '10:35 AM' },
    { id: 4, sender: 'me', text: 'That\'s amazing! I also enjoy outdoor activities.', time: '10:37 AM' },
    { id: 5, sender: 'them', text: 'We should plan a hike sometime!', time: '10:40 AM' },
    { id: 6, sender: 'me', text: 'That sounds great!', time: '10:42 AM' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage('');
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)]">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6">Messages</h1>
      
      <div className="grid md:grid-cols-3 gap-4 h-full">
        {/* Conversations List */}
        <Card className="md:col-span-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  selectedChat === conv.id ? 'bg-rose-50 border border-rose-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 truncate">{conv.name}</p>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-rose-500 text-white">{conv.unread}</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation?.avatar} />
                <AvatarFallback>{selectedConversation?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">{selectedConversation?.name}</p>
                <p className="text-xs text-gray-500">{selectedConversation?.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5 text-gray-400" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;