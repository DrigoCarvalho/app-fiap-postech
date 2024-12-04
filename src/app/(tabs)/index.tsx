import { StyleSheet, View } from "react-native";
import Header from "../components/header";
import PostList from "../components/post-list";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <PostList />
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
    margin: 10,
  },
  item: { marginVertical: 10, fontSize: 16, margin: 10 },
});
