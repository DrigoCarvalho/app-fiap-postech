import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user: authUser } = useAuth();
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>FIAP Blog</Text>
      <TouchableOpacity>
        {authUser ? (
          <Link href={"../screens/UserProfile"}>
            <FontAwesome name="user" size={24} color="black" />
          </Link>
        ) : (
          <Link href={"../screens/login"}>
            <FontAwesome name="sign-in" size={24} color="black" />
          </Link>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
