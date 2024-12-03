import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import User from "../interfaces/user";
import Header from "../components/header";
import PostList from '../components/post-list'

export default function Home() {

  const { user: authUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);

  return (
    <View style={styles.container}>
      <Header />
      <PostList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  search: { 
    borderColor: "#ccc", 
    borderWidth: 1, 
    marginBottom: 10, 
    padding: 8, 
    margin: 10
},
  item: { marginVertical: 10, fontSize: 16, margin: 10 },
});
