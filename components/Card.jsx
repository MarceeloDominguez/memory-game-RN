import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Card({ card, isTurnedOver, onPress, fail }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={fail === 5}
      style={
        isTurnedOver
          ? [styles.cardUp, { opacity: fail === 5 ? 0.7 : 1 }]
          : [styles.cardDown, { opacity: fail === 5 ? 0.7 : 1 }]
      }
    >
      {isTurnedOver ? (
        <Text style={styles.text}>{card}</Text>
      ) : (
        <Text style={styles.text}>?</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    width: 85,
    height: 85,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    elevation: 5,
  },
  cardDown: {
    width: 85,
    height: 85,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    elevation: 5,
  },
  text: {
    color: "#EDE4E0",
    fontSize: 32,
    fontWeight: "bold",
    opacity: 0.7,
  },
});
