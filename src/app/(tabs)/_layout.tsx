import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user: authUser } = useAuth();
  const ehProfessor = authUser?.role === 'professor';
  const ehAdmin = authUser?.role === 'admin';
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          href: ehAdmin ? "/(tabs)" : null,
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
          href: ehAdmin ? "/(tabs)/ManagePost" : null,
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
          href: ehAdmin ? "/(tabs)/Admin" : null,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
