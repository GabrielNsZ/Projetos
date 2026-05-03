import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

export default function HomeScreen({ navigation }) {
  const [tarefas, setTarefas] = useState([]);

  const carregarTarefas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@minhas_tarefas');
      if (jsonValue !== null) {
        setTarefas(JSON.parse(jsonValue)); 
      }
    } catch (e) {
      console.error('Erro ao carregar', e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarTarefas);
    return unsubscribe;
  }, [navigation]);

  const removerTarefa = async (id) => {
    const novasTarefas = tarefas.filter(t => t.id !== id);
    setTarefas(novasTarefas);
    await AsyncStorage.setItem('@minhas_tarefas', JSON.stringify(novasTarefas));
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={tarefas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem tarefa={item} onRemove={() => removerTarefa(item.id)} />
        )}
      />
      <Button 
        title="Adicionar Tarefa" 
        onPress={() => navigation.navigate('Adicionar')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' }
});