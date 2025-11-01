import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
}

interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

  const conversations: Conversation[] = [
    { id: 1, name: 'Priya Sharma', lastMessage: 'That sounds great!', time: '2m ago', unread: 2, online: true, avatar: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=100&q=80' },
    { id: 2, name: 'Rahul Verma', lastMessage: 'See you tomorrow!', time: '1h ago', unread: 0, online: false, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80' },
    { id: 3, name: 'Ananya Patel', lastMessage: 'Thank you so much!', time: '3h ago', unread: 1, online: true, avatar: 'https://images.pexels.com/photos/14758778/pexels-photo-14758778.jpeg?w=100&q=80' },
    { id: 4, name: 'Arjun Singh', lastMessage: 'What do you think?', time: '1d ago', unread: 0, online: false, avatar: 'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?w=100&q=80' },
  ];

  const messages: Message[] = [
    { id: 1, sender: 'them', text: 'Hi! I saw your profile and would love to connect.', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hello! Thank you for reaching out. I\'d love to know more about you.', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'Sure! I work as a software engineer and love hiking on weekends.', time: '10:35 AM' },
    { id: 4, sender: 'me', text: 'That\'s amazing! I also enjoy outdoor activities.', time: '10:37 AM' },
    { id: 5, sender: 'them', text: 'We should plan a hike sometime!', time: '10:40 AM' },
    { id: 6, sender: 'me', text: 'That sounds great!', time: '10:42 AM' },
  ];

  const handleSend = (): void => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px' }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #dc2626, #ea580c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px',
        fontFamily: 'Georgia, serif'
      }}>
        संदेश (Messages)
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', height: 'calc(100vh - 250px)' }}>
        {/* Conversations List */}
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '16px',
          border: '2px solid #fecaca',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '12px', height: '20px', width: '20px', color: '#9ca3af' }} />
              <Input placeholder="Search conversations..." style={{ paddingLeft: '40px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedChat === conv.id ? '#fef2f2' : 'transparent',
                  border: selectedChat === conv.id ? '2px solid #fecaca' : '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (selectedChat !== conv.id) {
                    e.currentTarget.style.background = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedChat !== conv.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img src={conv.avatar} alt={conv.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {conv.online && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '12px',
                      height: '12px',
                      background: '#10b981',
                      border: '2px solid white',
                      borderRadius: '50%'
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p style={{ fontWeight: '600', color: '#1f2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.name}</p>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{conv.time}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge style={{ background: '#dc2626', color: 'white', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' }}>{conv.unread}</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '2px solid #fecaca',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Chat Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderBottom: '2px solid #fecaca'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                <img src={selectedConversation?.avatar} alt={selectedConversation?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#1f2937' }}>{selectedConversation?.name}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{selectedConversation?.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button variant="ghost" style={{ padding: '8px' }}>
                <Phone style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              </Button>
              <Button variant="ghost" style={{ padding: '8px' }}>
                <Video style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              </Button>
              <Button variant="ghost" style={{ padding: '8px' }}>
                <MoreVertical style={{ height: '20px', width: '20px', color: '#dc2626' }} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '60%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: msg.sender === 'me' ? 'linear-gradient(to right, #dc2626, #ea580c)' : '#f3f4f6',
                    color: msg.sender === 'me' ? 'white' : '#1f2937'
                  }}
                >
                  <p style={{ fontSize: '14px', marginBottom: '4px' }}>{msg.text}</p>
                  <p style={{
                    fontSize: '12px',
                    color: msg.sender === 'me' ? 'rgba(255, 255, 255, 0.7)' : '#6b7280'
                  }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div style={{
            padding: '16px',
            borderTop: '2px solid #fecaca'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button variant="ghost" style={{ padding: '8px' }}>
                <Smile style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ flex: 1 }}
              />
              <Button
                onClick={handleSend}
                style={{
                  background: 'linear-gradient(to right, #dc2626, #ea580c)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Send style={{ height: '20px', width: '20px' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;