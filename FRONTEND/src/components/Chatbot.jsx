import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your Waste Manager Assistant. How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        message: userInput
      });

      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I couldn't respond right now." }]);
    } finally {
      setIsTyping(false);
      setUserInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 max-w-[90vw] h-96 bg-white shadow-xl rounded-xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center bg-green-600 text-white px-4 py-3 rounded-t-xl">
            <span className="font-semibold">Waste Manager Assistant</span>
            <button onClick={toggleChat} className="hover:text-gray-300">
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 px-3 py-2 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 text-sm rounded-lg max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 text-sm bg-gray-200 rounded-lg">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="flex items-center border-t p-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 text-sm"
              disabled={isTyping}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
