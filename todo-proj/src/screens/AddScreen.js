import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddScreen({ navigation }) {
  const [texto, setTexto] = useState('');

  // Salvando Tarefas (Slide 9)
  const salvarTarefa = async () => {
    if (!texto) return;

    try {
      const jsonValue = await AsyncStorage.getItem('@minhas_tarefas');
      const tarefasAtuais = jsonValue ? JSON.parse(jsonValue) : [];
      
      const novaTarefa = { id: Date.now(), text: texto, completed: false };
      const listaAtualizada = [...tarefasAtuais, novaTarefa];

      await AsyncStorage.setItem('@minhas_tarefas', JSON.stringify(listaAtualizada));
      
      navigation.goBack(); 
    } catch (e) {
      console.error('Erro ao salvar', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="O que precisa ser feito?"
        value={texto}
        onChangeText={setTexto}
        style={styles.input}
      />
      <Button title="Salvar Tarefa" onPress={salvarTarefa} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 18, padding: 10 }
});