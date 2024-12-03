import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { deleteUserFirebase, getAllUsers } from '../../services/user'
import { getAuth, deleteUser } from "firebase/auth";
import { auth } from '@/firebaseConfig'
import { useAuth } from '../../context/AuthContext'
import User from '../../interfaces/user'

export default function Admin() {
  const testeUser = {
    uid: '',
    providerId: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
    phoneNumber: '',
    isAnonymous: false,
    metadata: { creationTime: '', lastSignInTime: '' },
    providerData: [],
    refreshToken: '',
    tenantId: '',
    delete: async () => {},
    getIdToken: async (forceRefresh?: boolean) => '',
    getIdTokenResult: async (forceRefresh?: boolean) => ({ token: '', expirationTime: '', authTime: '', issuedAtTime: '', signInProvider: '', claims: {}, signInSecondFactor: null }),
    reload: async () => {},
    toJSON: () => ({}),
  }
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const renderUserCard = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.role}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <FontAwesome name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <FontAwesome name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleEdit = (user: User) => {
    router.push({
        pathname: "../screens/ManageUser",
        params: { ...user },
      });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
        'Confirmação de Exclusão',
        'Tem certeza que deseja excluir esse usuário?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              deleteUserAsync(id);
            },
          },
        ],
        { cancelable: false }
      );
  };

  const deleteUserAsync = async (id: string) => {
    
    try {
      setUsers(users.filter((user) => user.id !== id));
      await deleteUserFirebase(id);
    } catch (error: any) {
      Alert.alert("Erro ao excluir post", error.message);
    }
  };

  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchUsers();
    };

  return (
    <View style={styles.container}>
      <Button
        title="Criar Novo Usuário"
        onPress={() => {
          router.push({
            pathname: "../screens/ManageUser",
            params: { id: undefined },
          });
        }}
      />
      <View style={styles.filterContainer}>
        {["professor", "estudante", "admin"].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.filterButton,
              filterRole === role && styles.activeFilterButton,
            ]}
            onPress={() => setFilterRole(role)}
          >
            <Text style={styles.filterButtonText}>{role}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterRole === "" && styles.activeFilterButton,
          ]}
          onPress={() => setFilterRole("")}
        >
          <Text style={styles.filterButtonText}>Todos</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserCard}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  filterButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  activeFilterButton: {
    backgroundColor: "#007bff",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
