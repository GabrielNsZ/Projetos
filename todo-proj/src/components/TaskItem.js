import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TaskItem({ tarefa, onRemove, onToggle }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={onToggle}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: tarefa.completed }}
        accessibilityLabel={tarefa.text}
      >
        <Icon
          name={tarefa.completed ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
          size={24}
          color={tarefa.completed ? '#2e7d32' : '#666'}
        />
        <Text style={[styles.text, tarefa.completed && styles.completedText]}>
          {tarefa.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onRemove}
        accessibilityRole="button"
        accessibilityLabel={`Remover tarefa: ${tarefa.text}`}
      >
        <Icon name="trash-can-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
