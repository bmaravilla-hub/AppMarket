import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Mapeo de imágenes locales
const imagenes = {
  laptop: require('../../assets/laptop.jpg'),
  mouse: require('../../assets/mouse.jpg'),
  teclado: require('../../assets/teclado.jpg'),
  telefono: require('../../assets/telefono.jpg')
};

export default function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Cargar productos (simulando API)
  const cargarProductos = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Datos mock que coinciden con tu db.json
      const datosMock = [
        {
          id: 1,
          nombre: "Laptop HP EliteBook",
          descripcion: "Core i7 16GB RAM 512GB SSD",
          preciodecosto: 900,
          preciodeventa: 1200,
          cantidad: 8,
          fotografia: "laptop"
        },
        {
          id: 2,
          nombre: "Mouse Logitech MX",
          descripcion: "Inalámbrico ergonómico",
          preciodecosto: 30,
          preciodeventa: 60,
          cantidad: 15,
          fotografia: "mouse"
        },
        {
          id: 3,
          nombre: "Teclado Mecánico RGB",
          descripcion: "Switches azules retroiluminado",
          preciodecosto: 40,
          preciodeventa: 80,
          cantidad: 12,
          fotografia: "teclado"
        },
        {
          id: 4,
          nombre: "iPhone 13 Pro",
          descripcion: "128GB Plata",
          preciodecosto: 800,
          preciodeventa: 1100,
          cantidad: 5,
          fotografia: "telefono"
        }
      ];
      setProductos(datosMock);
      setRefreshing(false);
    }, 500);
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    Alert.alert(
      "Confirmar",
      "¿Eliminar este producto permanentemente?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => {
            setProductos(productos.filter(item => item.id !== id));
            Alert.alert("Éxito", "Producto eliminado");
          }
        }
      ]
    );
  };

  // Actualizar lista al enfocar
  useEffect(() => {
    if (isFocused) cargarProductos();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detalles', { 
        producto: item,
        onGuardar: (productoActualizado) => {
          setProductos(productos.map(p => 
            p.id === productoActualizado.id ? productoActualizado : p
          ));
        },
        onEliminar: eliminarProducto
      })}
    >
      <Image
        source={imagenes[item.fotografia]}
        style={styles.imagen}
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.preciodeventa.toFixed(2)}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.existencia}>Stock: {item.cantidad} | Costo: ${item.preciodecosto}</Text>
      </View>
      <TouchableOpacity
        style={styles.botonEliminar}
        onPress={(e) => {
          e.stopPropagation();
          eliminarProducto(item.id);
        }}
      >
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={cargarProductos}
            colors={['red']}
          />
        }
        ListEmptyComponent={
          <Text style={styles.listaVacia}>No hay productos registrados</Text>
        }
      />
      
      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('Agregar', {
          onAgregar: (nuevoProducto) => {
            setProductos([...productos, {
              ...nuevoProducto,
              id: Math.max(...productos.map(p => p.id), 0) + 1
            }]);
          }
        })}
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  lista: {
    padding: 15,
  },
  listaVacia: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  precio: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  existencia: {
    fontSize: 12,
    color: '#888',
  },
  botonEliminar: {
    padding: 10,
    alignSelf: 'center',
  },
  botonAgregar: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});