import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";

export default function UserProfile() {
  const { user: authUser, logout } = useAuth();
  const router = useRouter();

  const handleChangePassword = () => {
    router.push({ pathname: "./ChangePassword" });
  };

  const handleLogout = () => {
    logout();
    router.push({ pathname: "../(tabs)" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{authUser?.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{authUser?.email}</Text>
      <Text style={styles.label}>Role:</Text>
      <Text style={styles.value}>{authUser?.role}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Trocar Senha" onPress={handleChangePassword} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    borderRadius: 8,
  },
});
