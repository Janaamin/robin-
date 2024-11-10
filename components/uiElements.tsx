import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
export function Button({
  title,
  onPress,
  iconName,
}: {
  title: string;
  onPress: () => void;
  iconName: string;
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Ionicons name={iconName} size={18} color="#fff" />
    </TouchableOpacity>
  );
}
export const BirdCard = ({
  date,
  time,
  birdName,
  latitude,
  longitude,
  onDetailsPress,
}) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Ionicons name="newspaper-outline" size={24} color="#4A90E2" />
      <Text style={styles.birdName}>{birdName}</Text>
    </View>

    <View style={styles.infoRow}>
      <MaterialIcons name="date-range" size={20} color="#777" />
      <Text style={styles.infoText}>Date: {date}</Text>
    </View>

    <View style={styles.infoRow}>
      <Ionicons name="time-outline" size={20} color="#777" />
      <Text style={styles.infoText}>Time: {time}</Text>
    </View>

    <View style={styles.infoRow}>
      <Ionicons name="location-outline" size={20} color="#777" />
      <Text style={styles.infoText}>
        Location: {latitude}, {longitude}
      </Text>
    </View>
    <Button
      title="View Details"
      onPress={onDetailsPress}
      iconName="arrow-forward-outline"
    />
  </View>
);

export const BeepingCircle = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Scale up slightly
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Return to original scale
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    // Cleanup animation on unmount
    return () => pulseAnimation.stop();
  }, [scaleAnim]);

  return (
    <Animated.View
      style={[styles.circle, { transform: [{ scale: scaleAnim }] ,alignSelf:'center'}]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 25,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  birdName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
});
