import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user: authUser } = useAuth();
  const isProfessor = authUser?.role === "professor";
  const isAdmin = authUser?.role === "admin";
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          href: isAdmin && isProfessor ? "/(tabs)" : null,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ManagePost/index"
        options={{
          title: "Criar Post",
          headerShown: false,
          href: isAdmin && isProfessor ? "/(tabs)/ManagePost" : null,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Admin/index"
        options={{
          title: "Admin",
          headerShown: false,
          href: isAdmin && isProfessor ? "/(tabs)/Admin" : null,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
