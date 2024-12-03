import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Post from "../interfaces/post";
import { deletePost, getAllPosts } from "../services/post";
import { useAuth } from "../context/AuthContext";

const PostList = () => {
  const router = useRouter();
  const { user: authUser } = useAuth();
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmação de Exclusão",
      "Tem certeza que deseja excluir esse post? Será excluído em segundo plano",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            deletePostAsync(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deletePostAsync = async (id: string) => {
    try {
      setPosts(posts.filter((post) => post.id !== id));
      await deletePost(id);
    } catch (error: any) {
      Alert.alert("Erro ao excluir post", error.message);
    }
  };

  const handleEdit = (post: Post) => {
    router.push({ pathname: "../(tabs)/ManagePost", params: { ...post } });
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsData = await getAllPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id || item.title}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.description}>
                {item.description.length > 100
                  ? item.description.substring(0, 100) + "..."
                  : item.description}
              </Text>
              <View style={styles.actions}>
                <Link
                  style={styles.readMore}
                  href={{
                    pathname: "../screens/DetailPost",
                    params: { ...item },
                  }}
                >
                  Ler mais
                </Link>
                {authUser?.role === "admin" && (
                  <>
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <FontAwesome name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => item.id && handleDelete(item.id)}
                    >
                      <FontAwesome name="trash" size={24} color="black" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readMore: {
    color: "#1e90ff",
  },
});

export default PostList;
