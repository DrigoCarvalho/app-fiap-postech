import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="screens/login" options={{ title: "Login" }} />
        <Stack.Screen
          name="screens/DetailPost"
          options={{ title: "Detalhe de post" }}
        />
        <Stack.Screen
          name="screens/ManageUser"
          options={{ title: "Gerenciar usuário" }}
        />
      </Stack>
    </AuthProvider>
  );
}
