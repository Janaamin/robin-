import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Birds",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="twitter" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: "Identify",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
