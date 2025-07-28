import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Bonjour! Je suis un assistant spécialiste du Niger. Posez-moi vos questions sur:\n- Les statistiques régionales\n- Les infrastructures\n- Les besoins prioritaires'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        messages: [userMessage]
      }, {
        timeout: 20000 // 20s timeout
      });
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.choices[0].message.content
      }]);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 
                      error.message || 
                      'Erreur inconnue';
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Erreur: ${errorMsg}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            ...styles.message,
            ...(msg.role === 'user' ? styles.userMessage : styles.botMessage),
            ...(msg.content.startsWith('❌') && styles.errorMessage)
          }}>
            <div style={styles.messageContent}>
              {msg.content.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={styles.typingIndicator}>
            <div style={{...styles.dot, animationDelay: '0s'}}></div>
            <div style={{...styles.dot, animationDelay: '0.2s'}}></div>
            <div style={{...styles.dot, animationDelay: '0.4s'}}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
          placeholder="Posez votre question sur le Niger..."
          style={styles.input}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{
            ...styles.button,
            ...(isLoading && styles.buttonLoading)
          }}
        >
          {isLoading ? '...' : '➤'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    width: '400px',
    border: '1px solid #e1e5eb',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    fontFamily: 'system-ui, sans-serif'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    backgroundColor: '#f8fafc',
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#cbd5e1',
      borderRadius: '3px'
    }
  },
  message: {
    marginBottom: '12px',
    maxWidth: '85%',
    lineHeight: '1.5'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '18px 18px 4px 18px'
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    color: '#1e293b',
    borderRadius: '18px 18px 18px 4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c'
  },
  messageContent: {
    padding: '12px 16px',
    whiteSpace: 'pre-wrap'
  },
  typingIndicator: {
    display: 'flex',
    padding: '12px 16px',
    gap: '6px'
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#9ca3af',
    animation: 'bounce 1.5s infinite ease-in-out'
  },
  inputContainer: {
    display: 'flex',
    padding: '12px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    padding: '10px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    marginRight: '8px',
    outline: 'none',
    fontSize: '14px',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
    }
  },
  button: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#2563eb'
    },
    '&:disabled': {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    }
  },
  buttonLoading: {
    backgroundColor: '#93c5fd'
  }
};

// Animation CSS (à ajouter dans votre fichier CSS global)
const globalStyles = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;