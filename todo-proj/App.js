import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={HomeScreen}
          options={{ title: 'Minhas Tarefas' }}
        />
        <Stack.Screen
          name="Adicionar"
          component={AddScreen}
          options={{ title: 'Nova Tarefa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
