import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const productosImagenes = {
  laptop: require('../../assets/laptop.jpg'),
  mouse: require('../../assets/mouse.jpg'),
  telefono: require('../../assets/telefono.jpg'),
  teclado: require('../../assets/teclado.jpg')
};

export default function PaginaDetalle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;

  // Estado del producto
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    preciodecosto: '',
    preciodeventa: '',
    cantidad: '',
    fotografia: 'laptop' 
  });

  useEffect(() => {
    if (params) {
      setProducto({
        id: params.id || '',
        nombre: params.nombre || '',
        descripcion: params.descripcion || '',
        preciodecosto: params.preciodecosto ? params.preciodecosto.toString() : '',
        preciodeventa: params.preciodeventa ? params.preciodeventa.toString() : '',
        cantidad: params.cantidad ? params.cantidad.toString() : '',
        fotografia: params.fotografia || 'laptop'
      });
    }
  }, [params]);

  const handleActualizar = () => {
    // Validación básica
    if (!producto.nombre || !producto.preciodeventa || !producto.cantidad) {
      Alert.alert('Error', 'Complete los campos obligatorios');
      return;
    }

    Alert.alert('Éxito', 'Producto actualizado correctamente');
    navigation.goBack();
  };

  const handleEliminar = () => {
    Alert.alert(
      'Confirmar',
      '¿Está seguro de eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          onPress: () => {
            Alert.alert('Éxito', 'Producto eliminado');
            navigation.navigate('ListarProductos');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagenContainer}>
        <Image
          source={productosImagenes[producto.fotografia]}
          style={styles.imagen}
        />
      </View>

      <Input
        label="Nombre del producto"
        placeholder="Ej: Laptop HP"
        value={producto.nombre}
        onChangeText={(text) => setProducto({...producto, nombre: text})}
        leftIcon={<Icon name="tag" size={24} color="gray" />}
      />

      <Input
        label="Descripción"
        placeholder="Detalles del producto"
        value={producto.descripcion}
        onChangeText={(text) => setProducto({...producto, descripcion: text})}
        multiline
        numberOfLines={3}
        leftIcon={<Icon name="align-left" size={24} color="gray" />}
      />

      <Input
        label="Precio de costo"
        placeholder="0.00"
        value={producto.preciodecosto}
        onChangeText={(text) => setProducto({...producto, preciodecosto: text})}
        keyboardType="numeric"
        leftIcon={<Icon name="dollar" size={24} color="gray" />}
      />

      <Input
        label="Precio de venta"
        placeholder="0.00"
        value={producto.preciodeventa}
        onChangeText={(text) => setProducto({...producto, preciodeventa: text})}
        keyboardType="numeric"
        leftIcon={<Icon name="money" size={24} color="gray" />}
      />

      <Input
        label="Cantidad en stock"
        placeholder="0"
        value={producto.cantidad}
        onChangeText={(text) => setProducto({...producto, cantidad: text})}
        keyboardType="numeric"
        leftIcon={<Icon name="archive" size={24} color="gray" />}
      />

      <View style={styles.selectorImagen}>
        <Text style={styles.selectorLabel}>Imagen del producto:</Text>
        <View style={styles.opcionesImagen}>
          {Object.keys(productosImagenes).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => setProducto({...producto, fotografia: key})}
              style={[
                styles.opcionImagen,
                producto.fotografia === key && styles.opcionSeleccionada
              ]}
            >
              <Image 
                source={productosImagenes[key]} 
                style={styles.miniatura} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.botonesContainer}>
        <Button
          title="Actualizar Producto"
          onPress={handleActualizar}
          buttonStyle={styles.botonActualizar}
          icon={<Icon name="save" size={20} color="white" style={styles.iconoBoton} />}
        />

        <Button
          title="Eliminar Producto"
          onPress={handleEliminar}
          buttonStyle={styles.botonEliminar}
          icon={<Icon name="trash" size={20} color="white" style={styles.iconoBoton} />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  imagenContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  selectorImagen: {
    marginVertical: 15,
  },
  selectorLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  opcionesImagen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  opcionImagen: {
    width: 70,
    height: 70,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  opcionSeleccionada: {
    borderColor: 'red',
    borderWidth: 2,
  },
  miniatura: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  botonesContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  botonActualizar: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  botonEliminar: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
  },
  iconoBoton: {
    marginRight: 10,
  },
});