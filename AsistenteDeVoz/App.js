import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Speech from 'expo-speech';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/ask', { question: input });
      const assistantResponse = res.data.response;
      console.log('Respuesta...');
      console.log(assistantResponse);
      setResponse(assistantResponse);
      Speech.speak(assistantResponse); // Respuesta en voz
    } catch (error) {
      console.error(error);
      setResponse('Hubo un error. Intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistente Virtual</Text>
      <TextInput
        style={styles.input}
        placeholder="Haz una pregunta..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Preguntar" onPress={handleAsk} />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  response: { marginTop: 20, fontSize: 18 },
});