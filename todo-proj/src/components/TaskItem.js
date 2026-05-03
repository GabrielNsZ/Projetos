import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

export default function TaskItem({ tarefa, onRemove }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{tarefa.text}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Icon name="trash-can-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    backgroundColor: '#fff', 
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2
  },
  text: { fontSize: 16 }
});