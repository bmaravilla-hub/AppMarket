import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './src/components/InicioComponent';
import ListarProductos from './src/components/ListarProductosComponent';
import PaginaAgregar from './src/components/PaginaAgregarComponent';
import PaginaDetalle from './src/components/PaginaDetalleComponent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ListarProductos" 
          component={ListarProductos}
          options={{ 
            title: 'Productos',
            headerStyle: { backgroundColor: 'red' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen 
          name="Agregar" 
          component={PaginaAgregar}
          options={{ 
            title: 'Agregar Producto',
            headerStyle: { backgroundColor: 'red' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen 
          name="Detalles" 
          component={PaginaDetalle}
          options={{ 
            title: 'Editar Producto',
            headerStyle: { backgroundColor: 'red' },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}