import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import SmartToy from '@mui/icons-material/SmartToy';
import { Box } from '@mui/material';

function PowerGridSupport() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [conversationId] = useState(`conv_${Date.now()}_${Math.floor(Math.random() * 10000)}`);
  const [showActivity, setShowActivity] = useState(false);
  const [activityText, setActivityText] = useState('');
  const [tools, setTools] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const messagesEndRef = useRef(null);
  const shouldScrollRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (shouldScrollRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    connectWebSocket();
    initSpeechRecognition();
    return () => {
      if (ws) ws.close();
      if (recognition) recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

 const HolographicAiScene = () => {
  const keyframes = `
    @keyframes robotFloat {
      0%, 100% { transform: translateY(0px) rotateY(0deg); }
      50% { transform: translateY(-10px) rotateY(15deg); }
    }
    @keyframes eyePulse {
      0%, 100% { background-color: #22d3ee; box-shadow: 0 0 15px 4px #22d3ee; }
      50% { background-color: #a5f3fc; box-shadow: 0 0 25px 8px #22d3ee; }
    }
    @keyframes beamPulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.8; }
    }
    @keyframes particleFloat {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-120px); opacity: 0; }
    }
    @keyframes baseGlow {
      0%, 100% { box-shadow: 0 0 15px #0e7490; }
      50% { box-shadow: 0 0 30px #0e7490, 0 0 10px #67e8f9; }
    }
  `;

  const Particle = ({ delay, left, size }) => (
    <Box sx={{
      position: 'absolute', bottom: '20px', left,
      width: size, height: size,
      background: '#67e8f9', borderRadius: '50%',
      boxShadow: '0 0 5px #67e8f9',
      animation: `particleFloat 5s linear infinite`,
      animationDelay: delay,
    }} />
  );

  return (
    <Box sx={{ position: 'relative', width: 220, height: 220, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
      <style>{keyframes}</style>
      
      {/* 1. Projector Base */}
      <Box sx={{
        width: '120px', height: '20px',
        background: 'linear-gradient(to top, #1e293b, #334155)',
        transform: 'perspective(100px) rotateX(-30deg)',
        borderRadius: '4px',
        position: 'relative',
        boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
        '&::before': {
          content: '""',
          position: 'absolute', top: '-8px', left: 'calc(50% - 20px)',
          width: '40px', height: '15px',
          borderRadius: '50%',
          background: '#67e8f9',
          boxShadow: '0 0 20px #06b6d4, 0 0 30px #06b6d4',
          animation: 'baseGlow 3s ease-in-out infinite',
        }
      }} />

      {/* 2. Light Beam */}
      <Box sx={{
        position: 'absolute', bottom: '20px',
        width: '150px', height: '150px',
        background: 'linear-gradient(to top, rgba(103, 232, 249, 0.4), transparent 70%)',
        clipPath: 'polygon(20% 100%, 80% 100%, 100% 0, 0 0)',
        animation: 'beamPulse 4s ease-in-out infinite',
      }}>
        {/* Floating Particles */}
        <Particle delay="0s" left="40%" size="3px" />
        <Particle delay="1.5s" left="60%" size="2px" />
        <Particle delay="3s" left="30%" size="2px" />
        <Particle delay="4s" left="75%" size="3px" />
      </Box>

      {/* 3. Holographic Robot */}
      <Box sx={{
        position: 'absolute', top: '20px',
        animation: 'robotFloat 8s ease-in-out infinite',
        transformStyle: 'preserve-3d',
        opacity: 0.9,
        filter: 'drop-shadow(0 0 15px rgba(103, 232, 249, 0.8))'
      }}>
        <Box sx={{ position: 'relative', width: 96, height: 96 }}>
          {/* Head */}
          <Box sx={{
            position: 'absolute', width: '60px', height: '50px', top: '15px', left: '18px',
            background: 'linear-gradient(145deg, #374151, #4b5563)', // Darker color for hologram
            borderRadius: '12px 12px 8px 8px', zIndex: 2, border: '1px solid #06b6d4'
          }}>
            <Box sx={{ position: 'absolute', top: '15px', left: '12px', width: '12px', height: '12px', borderRadius: '50%', animation: 'eyePulse 3s ease-in-out infinite' }} />
            <Box sx={{ position: 'absolute', top: '15px', right: '12px', width: '12px', height: '12px', borderRadius: '50%', animation: 'eyePulse 3s ease-in-out infinite', animationDelay: '0.2s' }} />
          </Box>
          {/* Body */}
          <Box sx={{ position: 'absolute', width: '40px', height: '30px', bottom: '10px', left: '28px', background: '#374151', borderRadius: '8px 8px 15px 15px', zIndex: 1, }} />
          {/* Arms */}
          <Box sx={{ position: 'absolute', width: '20px', height: '40px', top: '40px', left: '5px', background: '#4b5563', borderRadius: '10px', transform: 'rotate(-10deg)' }} />
          <Box sx={{ position: 'absolute', width: '20px', height: '40px', top: '40px', right: '5px', background: '#4b5563', borderRadius: '10px', transform: 'rotate(10deg)' }} />
        </Box>
      </Box>
    </Box>
  );
};

  const initSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-IN';

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInputValue(prev => prev + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition) {
      alert('Voice input is not supported in your browser');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  const speakMessage = (text, messageId) => {
    window.speechSynthesis.cancel();

    if (speakingMessageId === messageId) {
      setSpeakingMessageId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const connectWebSocket = () => {
    const wsUrl = `wss://pipalskill-support-ticket-ai-agent.hf.space/ws/${conversationId}`;
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      setConnected(true);
      setWs(websocket);
    };

    websocket.onclose = () => {
      setConnected(false);
      setTimeout(connectWebSocket, 3000);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleServerMessage(data);
    };
  };

  const handleServerMessage = (data) => {
    switch (data.type) {
      case 'status':
        setShowActivity(true);
        setActivityText(data.message);
        setTools([]);
        break;
      case 'tool_use':
        setTools(prev => [...prev, data.tool]);
        break;
      case 'response':
        setShowActivity(false);
        const messageId = messages.length;
        shouldScrollRef.current = true;
        addMessage('assistant', data.content, data);
        
        if (autoSpeak) {
          setTimeout(() => {
            speakMessage(data.content, messageId);
          }, 300);
        }
        break;
      case 'saved':
        console.log('Ticket saved to Firestore:', data.firestore_id);
        break;
      case 'error':
        setShowActivity(false);
        shouldScrollRef.current = true;
        addMessage('error', `Error: ${data.message}`);
        break;
    }
  };

  const addMessage = (role, content, metadata = null) => {
    setMessages(prev => [...prev, { role, content, metadata }]);
  };

  const sendMessage = () => {
    const message = inputValue.trim();
    if (!message) return;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert('Not connected to server. Reconnecting...');
      connectWebSocket();
      return;
    }
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
    shouldScrollRef.current = true;
    addMessage('user', message);
    ws.send(JSON.stringify({ text: message, user_email: email || undefined }));
    setInputValue('');
  };

  const getStatusColor = (status) => {
    const colors = {
      resolved: 'rgba(16, 185, 129, 0.2)',
      escalated: 'rgba(249, 115, 22, 0.2)',
      in_progress: 'rgba(59, 130, 246, 0.2)',
      error: 'rgba(239, 68, 68, 0.2)',
    };
    const textColors = {
      resolved: '#10b981',
      escalated: '#fb923c',
      in_progress: '#60a5fa',
      error: '#f87171',
    };
    const borderColors = {
      resolved: 'rgba(16, 185, 129, 0.3)',
      escalated: 'rgba(249, 115, 22, 0.3)',
      in_progress: 'rgba(59, 130, 246, 0.3)',
      error: 'rgba(239, 68, 68, 0.3)',
    };
    return {
      bg: colors[status] || 'rgba(107, 114, 128, 0.2)',
      color: textColors[status] || '#9ca3af',
      border: borderColors[status] || 'rgba(107, 114, 128, 0.3)'
    };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #16837e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: 'white'
    }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes micPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .message { animation: slideIn 0.3s ease-out; }
        .tool-badge { animation: pulse 0.5s ease-in-out; }
        .status-dot { animation: pulseDot 2s ease-in-out infinite; }
        .spinner { animation: spin 1s linear infinite; }
        .glow-effect { box-shadow: 0 0 20px rgba(5, 232, 156, 0.3); }
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .recording { animation: micPulse 0.8s ease-in-out infinite; }
      `}</style>

      <header style={{
        borderBottom: '1px solid rgba(31, 41, 55, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1536px',
          margin: '0 auto',
          padding: '16px 24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: 40,
                height: 40,
                background: '#10b981',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🤖
              </div>
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, lineHeight: 1 }}>POWERGRID</h1>
                <p style={{ fontSize: '0.75rem', color: 'rgba(156, 163, 175, 1)', margin: 0 }}>AI IT Support</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="status-dot" style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: connected ? '#10b981' : '#ef4444'
                }} />
                <span style={{
                  fontSize: '0.875rem',
                  color: connected ? '#10b981' : '#ef4444'
                }}>
                  {connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <div className="glow-effect grid-pattern" style={{
  
            }}>
            
            </div>
            <HolographicAiScene />
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '12px' }}>
            Unified AI-Powered IT Support
          </h2>
          <p style={{
            color: 'rgba(156, 163, 175, 1)',
            fontSize: '1.125rem',
            maxWidth: '672px',
            margin: '0 auto'
          }}>
            One platform to consolidate all your IT tickets from GLPI, Solman, and email. Get instant resolutions with AI-powered automation and intelligent routing.
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(17, 24, 39, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(31, 41, 55, 1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}>
          <div className="grid-pattern" style={{
            height: 500,
            overflowY: 'auto',
            padding: 24
          }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(107, 114, 128, 1)', paddingTop: 48, paddingBottom: 48 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '2rem'
                }}>
                  💬
                </div>
                <p style={{ fontSize: '1.125rem', fontWeight: 500, color: 'rgba(209, 213, 219, 1)', marginBottom: 8 }}>
                  Welcome to PowerGrid IT Support
                </p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(107, 114, 128, 1)' }}>
                  Describe your IT issue and our AI agent will help you resolve it
                </p>
                <div style={{
                  marginTop: 24,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 16,
                  fontSize: '0.75rem',
                  color: 'rgba(75, 85, 99, 1)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                    Instant responses
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                    24/7 availability
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                    Voice enabled
                  </span>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="message" style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 16
                }}>
                  {msg.role === 'user' ? (
                    <div style={{
                      maxWidth: '70%',
                      background: 'linear-gradient(to bottom right, #10b981, #14b8a6)',
                      color: 'white',
                      borderRadius: 16,
                      padding: '12px 20px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                    </div>
                  ) : msg.role === 'error' ? (
                    <div style={{
                      maxWidth: '70%',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: '#f87171',
                      borderRadius: 16,
                      padding: '12px 20px',
                      border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                    </div>
                  ) : (
                    <div style={{ maxWidth: '70%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{
                          width: 28,
                          height: 28,
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem'
                        }}>🤖</div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(209, 213, 219, 1)' }}>
                          AI Agent
                        </span>
                        {msg.metadata?.status && (
                          <span style={{
                            padding: '4px 10px',
                            fontSize: '0.75rem',
                            borderRadius: 9999,
                            fontWeight: 500,
                            backgroundColor: getStatusColor(msg.metadata.status).bg,
                            color: getStatusColor(msg.metadata.status).color,
                            border: `1px solid ${getStatusColor(msg.metadata.status).border}`
                          }}>
                            {msg.metadata.status}
                          </span>
                        )}
                        <button
                          onClick={() => speakMessage(msg.content, idx)}
                          style={{
                            marginLeft: 'auto',
                            padding: '4px 8px',
                            backgroundColor: speakingMessageId === idx ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                            color: speakingMessageId === idx ? '#ef4444' : '#10b981',
                            border: `1px solid ${speakingMessageId === idx ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                            borderRadius: 6,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: '0.75rem',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            if (speakingMessageId !== idx) {
                              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (speakingMessageId !== idx) {
                              e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                            }
                          }}
                          title={speakingMessageId === idx ? 'Stop speaking' : 'Listen to response'}
                        >
                          {speakingMessageId === idx ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          {speakingMessageId === idx ? 'Stop' : 'Listen'}
                        </button>
                      </div>
                      <div style={{
                        backgroundColor: 'rgba(31, 41, 55, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 16,
                        padding: '16px 20px',
                        color: '#e5e7eb',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                          {msg.content}
                        </p>
                        {msg.metadata?.ticket_info && (
                          <div style={{
                            marginTop: 12,
                            paddingTop: 12,
                            borderTop: '1px solid rgba(75, 85, 99, 1)',
                            fontSize: '0.75rem',
                            color: 'rgba(156, 163, 175, 1)'
                          }}>
                            {msg.metadata.ticket_info.impact && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ color: 'rgba(107, 114, 128, 1)' }}>Impact:</span>
                                <span style={{ color: 'rgba(209, 213, 219, 1)' }}>{msg.metadata.ticket_info.impact}</span>
                              </div>
                            )}
                            {msg.metadata.ticket_info.urgency && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ color: 'rgba(107, 114, 128, 1)' }}>Urgency:</span>
                                <span style={{ color: 'rgba(209, 213, 219, 1)' }}>{msg.metadata.ticket_info.urgency}</span>
                              </div>
                            )}
                            {msg.metadata.ticket_info.department && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ color: 'rgba(107, 114, 128, 1)' }}>Department:</span>
                                <span style={{ color: 'rgba(209, 213, 219, 1)' }}>{msg.metadata.ticket_info.department}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {showActivity && (
            <div style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderTop: '1px solid rgba(31, 41, 55, 1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="spinner" style={{
                  width: 16,
                  height: 16,
                  border: '2px solid #10b981',
                  borderTopColor: 'transparent',
                  borderRadius: '50%'
                }}></div>
                <span style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 500 }}>
                  {activityText}
                </span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {tools.map((tool, idx) => (
                  <span key={idx} className="tool-badge" style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#10b981',
                    borderRadius: 9999,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{
            borderTop: '1px solid rgba(31, 41, 55, 1)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: 24
          }}>
            <div style={{ marginBottom: 12 }}>
              <input
                type="email"
                placeholder="Your email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '96%',
                  padding: '12px 14px',
                  backgroundColor: 'rgb(17, 24, 39)',
                  border: '1px solid rgb(55, 65, 81)',
                  borderRadius: 8,
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 1px #10b981';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgb(55, 65, 81)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <textarea
                placeholder="Describe your IT issue here... (Type or speak)"
                rows="1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  backgroundColor: 'rgb(17, 24, 39)',
                  border: '1px solid rgb(55, 65, 81)',
                  borderRadius: 8,
                  color: 'white',
                  fontSize: '1rem',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  height: '48px',
                  overflowY: 'auto',
                  lineHeight: '1.5'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 1px #10b981';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgb(55, 65, 81)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={toggleVoiceInput}
                className={isRecording ? 'recording' : ''}
                style={{
                  padding: 12,
                  minWidth: '48px',
                  height: '48px',
                  backgroundColor: isRecording ? '#ef4444' : 'rgba(16, 185, 129, 0.2)',
                  color: isRecording ? 'white' : '#10b981',
                  borderRadius: 8,
                  border: `1px solid ${isRecording ? '#ef4444' : 'rgba(16, 185, 129, 0.3)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (!isRecording) {
                    e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isRecording) {
                    e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                  }
                }}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                onClick={sendMessage}
                style={{
                  padding: '12px 32px',
                  height: '48px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  borderRadius: 8,
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#059669';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#10b981';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                Send
              </button>
            </div>
            <div style={{
              marginTop: 12,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'rgba(107, 114, 128, 1)'
            }}>
              <span>
                {isRecording ? (
                  <span style={{ color: '#ef4444', fontWeight: 500 }}>🔴 Recording... Click mic to stop</span>
                ) : (
                  'Press Enter to send, Shift + Enter for new line, or use voice input'
                )}
              </span>
              <span>Conversation ID: <span style={{ fontFamily: 'monospace', color: 'rgba(156, 163, 175, 1)' }}>{conversationId}</span></span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', fontSize: '0.875rem', color: 'rgba(75, 85, 99, 1)' }}>
          <p>TRUSTED BY POWERGRID EMPLOYEES • 2025</p>
        </div>
      </main>
    </div>
  );
}

export default PowerGridSupport;