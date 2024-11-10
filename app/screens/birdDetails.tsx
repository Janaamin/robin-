import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useGetMoreBirdDetails } from "@/components/hooks";

export default function Page() {
  const route = useRoute();
  const { birdName } = route.params;
  const [loading, shortDescription, appearance, moreDetailsUrl, imageUrls] =
    useGetMoreBirdDetails({ birdName });
  const openLinkInBrowser = () => {
    if (moreDetailsUrl) {
      Linking.openURL(moreDetailsUrl);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: birdName || "Details" }} />
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <View style={styles.imageContainer}>
          {imageUrls.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.image} />
          ))}
        </View>
      )}
      <View style={styles.section}>
        <Ionicons
          name="information-circle-outline"
          size={22}
          color="#4A90E2"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>Description</Text>
      </View>
      <Text style={styles.description}>{shortDescription}</Text>
      <View style={styles.section}>
        <Ionicons
          name="eye-outline"
          size={22}
          color="#4A90E2"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>Appearance</Text>
      </View>
      <Text style={styles.description}>{appearance}</Text>
      <TouchableOpacity
        onPress={openLinkInBrowser}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          For more details, visit the Wikipedia page
        </Text>
        <Ionicons name="open-outline" size={18} color="#4A90E2" />
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  image: {
    width: "48%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  linkText: {
    fontSize: 16,
    color: "#4A90E2",
    marginRight: 5,
  },
});
