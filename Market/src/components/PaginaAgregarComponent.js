import React, { useState } from 'react';
import { ScrollView, Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const opcionesImagenes = [
  { key: 'laptop', label: 'Laptop' },
  { key: 'mouse', label: 'Mouse' },
  { key: 'teclado', label: 'Teclado' },
  { key: 'telefono', label: 'Teléfono' }
];

export default function PaginaAgregar() {
  const navigation = useNavigation();
  const route = useRoute();
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    preciodecosto: '',
    preciodeventa: '',
    cantidad: '',
    fotografia: 'laptop'
  });

  const handleGuardar = () => {
    // Validación
    if (!producto.nombre || !producto.preciodeventa || !producto.cantidad) {
      Alert.alert('Error', 'Complete los campos obligatorios (*)');
      return;
    }

    // Preparar datos
    const nuevoProducto = {
      ...producto,
      preciodecosto: parseFloat(producto.preciodecosto) || 0,
      preciodeventa: parseFloat(producto.preciodeventa),
      cantidad: parseInt(producto.cantidad)
    };

    // Llamar a la función de agregar
    if (route.params?.onAgregar) {
      route.params.onAgregar(nuevoProducto);
    }

    Alert.alert('Éxito', 'Producto agregado correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.titulo}>Nuevo Producto</Text>

      <Input
        label="Nombre*"
        placeholder="Nombre del producto"
        value={producto.nombre}
        onChangeText={(text) => setProducto({...producto, nombre: text})}
        leftIcon={<Icon name="tag" size={20} color="#FF3B30" />}
        containerStyle={styles.input}
      />

      <Input
        label="Descripción"
        placeholder="Descripción detallada"
        value={producto.descripcion}
        onChangeText={(text) => setProducto({...producto, descripcion: text})}
        multiline
        numberOfLines={3}
        leftIcon={<Icon name="align-left" size={20} color="#FF3B30" />}
        containerStyle={styles.input}
      />

      <View style={styles.fila}>
        <View style={styles.columna}>
          <Input
            label="Precio Costo"
            placeholder="0.00"
            value={producto.preciodecosto}
            onChangeText={(text) => setProducto({...producto, preciodecosto: text})}
            keyboardType="numeric"
            leftIcon={<Icon name="dollar" size={20} color="#FF3B30" />}
            containerStyle={styles.input}
          />
        </View>
        <View style={styles.columna}>
          <Input
            label="Precio Venta*"
            placeholder="0.00"
            value={producto.preciodeventa}
            onChangeText={(text) => setProducto({...producto, preciodeventa: text})}
            keyboardType="numeric"
            leftIcon={<Icon name="money" size={20} color="#FF3B30" />}
            containerStyle={styles.input}
          />
        </View>
      </View>

      <Input
        label="Cantidad*"
        placeholder="0"
        value={producto.cantidad}
        onChangeText={(text) => setProducto({...producto, cantidad: text})}
        keyboardType="numeric"
        leftIcon={<Icon name="archive" size={20} color="#FF3B30" />}
        containerStyle={styles.input}
      />

      <Text style={styles.subtitulo}>Seleccionar Imagen:</Text>
      <View style={styles.contenedorImagenes}>
        {opcionesImagenes.map((opcion) => (
          <TouchableOpacity
            key={opcion.key}
            style={[
              styles.opcionImagen,
              producto.fotografia === opcion.key && styles.opcionSeleccionada
            ]}
            onPress={() => setProducto({...producto, fotografia: opcion.key})}
          >
            <Text style={[
              styles.textoOpcion,
              producto.fotografia === opcion.key && styles.textoOpcionSeleccionada
            ]}>
              {opcion.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="GUARDAR PRODUCTO"
        onPress={handleGuardar}
        buttonStyle={styles.botonGuardar}
        icon={<Icon name="save" size={20} color="white" style={styles.iconoBoton} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columna: {
    width: '48%',
  },
  subtitulo: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 15,
  },
  contenedorImagenes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  opcionImagen: {
    padding: 12,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  opcionSeleccionada: {
    borderColor: '#FF3B30',
    backgroundColor: '#ffeeee',
  },
  textoOpcion: {
    color: '#333',
  },
  textoOpcionSeleccionada: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  botonGuardar: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  iconoBoton: {
    marginRight: 10,
  },
});