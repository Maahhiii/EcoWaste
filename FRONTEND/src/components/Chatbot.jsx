import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your Waste Manager Assistant. How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, { message: userInput });
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
        <div className="w-72 h-96 bg-white shadow-2xl rounded-lg flex flex-col">
          <div className="flex justify-between items-center bg-blue-600 text-white px-3 py-2 rounded-t-lg">
            <span>Waste Manager Assistant</span>
            <button onClick={toggleChat}><X size={20} /></button>
          </div>

          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm max-w-[80%] ${msg.sender === 'bot' ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end'} px-3 py-2 rounded-lg`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="text-sm bg-gray-200 px-3 py-2 rounded-lg self-start inline-block">
                Typing...
              </div>
            )}
          </div>

          <div className="flex p-2 border-t">
            <input
              type="text"
              className="flex-1 border rounded-l px-2 py-1 text-sm"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isTyping}
            />
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-r text-sm"
              onClick={handleSend}
              disabled={isTyping}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button onClick={toggleChat} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
