import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createUser, updateUser } from "../services/user";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function ManageUser() {
  let params = useLocalSearchParams();
  const auth = getAuth();
  const { user: authUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("estudante");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const isEdit = params.id !== undefined;
  const isAdmin = authUser?.role === "admin";

  useEffect(() => {
    if (isEdit) {
      setUserId(params.id as string);
      setName(params.name as string);
      setEmail(params.email as string);
      setRole(params.role as string);
    }
    return () => {
      setName("");
      setEmail("");
      setRole("estudante");
      setPassword("");
      setConfirmPassword("");
    };
  }, [isEdit, params.id]);

  const isFormValid = () => {
    if (!name || !email || !role) return false;
    if (!isEdit && (!password || password !== confirmPassword)) return false;
    return true;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateUser(userId, { name, email, role });
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user?.uid || "";
          await createUser({ id: user, name, email, role });
        } catch (error) {
          throw error;
        }
      }
      Alert.alert(
        "Successo",
        "O usuário foi salvo com sucesso",
        [
          {
            text: "OK",
            onPress: () => router.push({ pathname: "../(tabs)/Admin" }),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error ao salvar user:", error);
      Alert.alert("Error", "Houve um erro ao salvar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Role</Text>
      <Picker
        selectedValue={role}
        style={styles.input}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Professor" value="professor" />
        <Picker.Item label="Estudante" value="estudante" />
        {isAdmin && <Picker.Item label="Admin" value="admin" />}
      </Picker>
      {!isEdit && (
        <>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry
          />
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar Senha"
            secureTextEntry
          />
        </>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title={isEdit ? "editar usuário" : "criar usuário"}
          onPress={handleSave}
          disabled={!isFormValid()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
  },
});
