import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function PantallaInicio() {
  const [usuario, setUsuario] = useState('admin');
  const [contrasena, setContrasena] = useState('1234'); 
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Botón presionado!"); 
    
    if (usuario === 'admin' && contrasena === '1234') {
      console.log("Credenciales correctas, navegando..."); 
      navigation.navigate('ListarProductos');
    } else {
      console.log("Credenciales incorrectas"); 
      Alert.alert('Error', 'Credenciales incorrectas. Usa admin/1234');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Bienvenidos!</Text>
      
      <Image
        style={styles.logo}
        source={require('../../assets/market.jpg')}
        onError={(e) => console.log('Error imagen:', e.nativeEvent.error)}
      />

      <View style={styles.formContainer}>
        <Input
          placeholder="Usuario"
          leftIcon={<Icon name="user" type="font-awesome" color="#666" />}
          value={usuario}
          onChangeText={setUsuario}
        />
        <Input
          placeholder="Contraseña"
          leftIcon={<Icon name="lock" type="font-awesome" color="#666" />}
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={handleLogin}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBoton}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: 'red',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 10,
  },
  formContainer: {
    marginBottom: 30,
  },
  boton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
