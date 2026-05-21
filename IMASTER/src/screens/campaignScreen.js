import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { generateAIResponse } from '../services/aiService';

export default function CampaignScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'IMASTER iniciado. Mencione "IMASTER" para ativar.' }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMessage },
    ]);

    setInput('');

    if (userMessage.toLowerCase().includes('imaster')) {
      const aiResponse = await generateAIResponse(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `IMASTER: ${aiResponse}`,
        },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0d', padding: 20 }}>
      <Text style={{ color: '#00ffcc', fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        IMASTER
      </Text>

      <ScrollView style={{ flex: 1, marginBottom: 20 }}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={{
              color:
                msg.sender === 'ai'
                  ? '#00ffcc'
                  : msg.sender === 'system'
                  ? '#888'
                  : '#ffffff',
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Digite sua mensagem..."
        placeholderTextColor="#666"
        style={{
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleSend}
        style={{
          backgroundColor: '#00ffcc',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#000', fontWeight: 'bold' }}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}