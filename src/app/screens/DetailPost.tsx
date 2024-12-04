import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { deletePost } from "../services/post";

export default function DetailPost() {
  const { user: authUser } = useAuth();
  const params = useLocalSearchParams();
  const router = useRouter();
  const postId = params.id as string;

  const handleEdit = () => {
    router.push({ pathname: "../(tabs)/ManagePost", params: params });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmação de Exclusão",
      "Tem certeza que deseja excluir esse post?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await deletePost(postId);
            router.push({ pathname: "../(tabs)" });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {authUser?.role === "admin" && (
        <View style={styles.iconContainer}>
          <FontAwesome
            name="pencil"
            size={24}
            color="black"
            onPress={handleEdit}
          />
          <FontAwesome
            name="trash"
            size={24}
            color="black"
            onPress={handleDelete}
          />
        </View>
      )}

      <Text style={styles.title}>{params.title}</Text>
      <Text style={styles.author}>By {params.author}</Text>
      <Text style={styles.description}>{params.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: "gray",
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
  },
});
