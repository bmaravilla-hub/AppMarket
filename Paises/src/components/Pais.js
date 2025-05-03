import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const Pais = ({ resultado }) => {
  const [datosPais, setDatosPais] = useState({
    nombre: "",
    capital: "",
    region: "",
    superficie: "",
    lenguas: [],
    bandera: ""
  });

  useEffect(() => {
    if (resultado && Object.keys(resultado).length > 0) {
      // Extraer el primer país del resultado (la API devuelve un objeto)
      const paisData = Object.values(resultado)[0];
      
      // Extraer las lenguas
      const lenguas = paisData.linguas ? 
        Object.values(paisData.linguas).map(l => l.nome) : 
        ["No disponible"];

      setDatosPais({
        nombre: paisData.nome.abreviado || "No disponible",
        capital: paisData.governo.capital.nome || "No disponible",
        region: paisData.localizacao.regiao.nome || "No disponible",
        superficie: paisData.area?.total ? `${paisData.area.total} m²` : "No disponible",
        lenguas: lenguas,
        bandera: paisData.governo?.bandeira || null
      });
    }
  }, [resultado]);

  if (!resultado || Object.keys(resultado).length === 0) {
    return null;
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{datosPais.nombre}</Title>
        {datosPais.bandera && (
          <Image
            source={{ uri: datosPais.bandera }}
            style={styles.flag}
            resizeMode="contain"
          />
        )}
        <Paragraph>Capital: {datosPais.capital}</Paragraph>
        <Paragraph>Región: {datosPais.region}</Paragraph>
        <Paragraph>Superficie: {datosPais.superficie}</Paragraph>
        <Paragraph>Lenguas: {datosPais.lenguas.join(", ")}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: '#2c3e50',
  },
  flag: {
    width: "100%",
    height: 180,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default Pais;