export const mockContacts = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    online: true,
    lastMessage: 'Hey, how are you doing?',
    lastMessageTime: '10:30 AM'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    online: false,
    lastMessage: 'Can we meet tomorrow?',
    lastMessageTime: 'Yesterday'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    online: true,
    lastMessage: 'I sent you the files',
    lastMessageTime: '2:15 PM'
  },
  {
    id: '4',
    name: 'James Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    online: true,
    lastMessage: 'Thanks for your help!',
    lastMessageTime: '3:40 PM'
  },
  {
    id: '5',
    name: 'Olivia Taylor',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    online: false,
    lastMessage: 'Let me know when you re free',
    lastMessageTime: 'Monday'
  },
  {
    id: '6',
    name: 'Daniel Brown',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    online: false,
    lastMessage: 'The meeting is scheduled for Friday',
    lastMessageTime: 'Tuesday'
  },
  {
    id: '7',
    name: 'Sophia Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    online: true,
    lastMessage: 'Did you see my message?',
    lastMessageTime: '5:00 PM'
  }
];

export const mockMessages = [
  {
    id: 1,
    text: 'Hey there! How are you doing?',
    sender: '1',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2))
  },
  {
    id: 2,
    text: 'I\'m good, thanks for asking! How about you?',
    sender: 'me',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 55))
  },
  {
    id: 3,
    text: 'I\'m doing well! Just working on some projects.',
    sender: '1',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 50))
  },
  {
    id: 4,
    text: 'That sounds interesting. What kind of projects?',
    sender: 'me',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 45))
  },
  {
    id: 5,
    text: 'Mostly web development stuff. I\'m learning React and building some cool applications.',
    sender: '1',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 40))
  },
  {
    id: 6,
    text: 'That\'s awesome! I\'ve been working with React too. Maybe we can collaborate sometime.',
    sender: 'me',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 35))
  },
  {
    id: 7,
    text: 'Definitely! I\'d love to collaborate. What kind of project do you have in mind?',
    sender: '1',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 30))
  },
  {
    id: 8,
    text: 'I was thinking about building a chat application, actually. Something like this!',
    sender: 'me',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 25))
  },
  {
    id: 9,
    text: 'That would be fun! I have some experience with WebSockets which could be useful for real-time messaging.',
    sender: '1',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 20))
  },
  {
    id: 10,
    text: 'Perfect! Let\'s plan to discuss more details soon.',
    sender: 'me',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2, new Date().getMinutes() - 15))
  }
];