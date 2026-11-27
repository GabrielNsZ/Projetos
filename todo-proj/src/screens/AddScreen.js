import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@minhas_tarefas';

export default function AddScreen({ navigation }) {
  const [texto, setTexto] = useState('');

  const salvarTarefa = async () => {
    const descricao = texto.trim();
    if (!descricao) return;

    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const tarefasAtuais = jsonValue ? JSON.parse(jsonValue) : [];
      const novaTarefa = {
        id: Date.now(),
        text: descricao,
        completed: false,
      };

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...tarefasAtuais, novaTarefa])
      );
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="O que precisa ser feito?"
        value={texto}
        onChangeText={setTexto}
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={salvarTarefa}
      />
      <Button title="Salvar Tarefa" onPress={salvarTarefa} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
  },
});
