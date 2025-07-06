import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import './ChatBot.css';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { user } = useUser();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3000/chat', {//3000
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          email:user?.primaryEmailAddress?.emailAddress //"john@example.com"
        })
      });

      const data = await response.json();
      const botMessage = { type: 'bot', content: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;