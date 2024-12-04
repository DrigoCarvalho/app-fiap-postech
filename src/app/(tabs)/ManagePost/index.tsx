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
import { useLocalSearchParams, useRouter } from "expo-router";
import { createPost, updatePost } from "../../services/post";
import { useAuth } from "../../context/AuthContext";

export default function ManagePost() {
  const { user: authUser } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");
  const [loading, setLoading] = useState(false);
  const isEdit = params.id !== undefined;

  useEffect(() => {
    if (isEdit) {
      setPostId(params.id as string);
      setTitle(params.title as string);
      setContent(params.description as string);
    }
    return () => {
      setTitle("");
      setContent("");
    };
  }, [isEdit, params.id]);

  const handleSubmit = async () => {
    setLoading(true);
    const author = authUser?.name || "Anonymous";
    try {
      if (isEdit) {
        await updatePost(postId, { title, author, description: content });
      } else {
        await createPost({ title, author, description: content });
      }
      Alert.alert(
        "Successo",
        "O post foi salvo com sucesso",
        [
          {
            text: "OK",
            onPress: () => router.push({ pathname: "../(tabs)" }),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error saving post:", error);
      Alert.alert("Erro", "Houve um erro ao salvar o post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titulo</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
      />
      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={styles.textArea}
        value={content}
        onChangeText={setContent}
        placeholder="Enter post content"
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title={isEdit ? "Editar Post" : "Criar Post"}
          onPress={handleSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  textArea: {
    height: 400,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlignVertical: "top",
    borderRadius: 10,
  },
});
