import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

const STORAGE_KEY = '@minhas_tarefas';

export default function HomeScreen({ navigation }) {
  const [tarefas, setTarefas] = useState([]);

  const carregarTarefas = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      setTarefas(jsonValue ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarTarefas);
    return unsubscribe;
  }, [navigation, carregarTarefas]);

  const salvarTarefas = async (novasTarefas) => {
    setTarefas(novasTarefas);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasTarefas));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  const removerTarefa = (id) => {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    salvarTarefas(novasTarefas);
  };

  const alternarConclusao = (id) => {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, completed: !tarefa.completed }
        : tarefa
    );
    salvarTarefas(novasTarefas);
  };

  return (
    <View style={styles.container}>
      {tarefas.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhuma tarefa cadastrada.</Text>
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              tarefa={item}
              onRemove={() => removerTarefa(item.id)}
              onToggle={() => alternarConclusao(item.id)}
            />
          )}
        />
      )}
      <Button
        title="Adicionar Tarefa"
        onPress={() => navigation.navigate('Adicionar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  emptyMessage: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#666',
    fontSize: 16,
  },
});
