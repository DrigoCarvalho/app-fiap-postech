import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { createPost, updatePost } from '../../services/post'
import { useAuth } from '../../context/AuthContext'

export default function ManagePost() {
  const { user: authUser } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState('');
  const [loading, setLoading] = useState(false);
  const isEdit = params.id !== undefined;
  const navigation = useNavigation();

  useEffect(() => {
    if (isEdit) {
      // colocar tudo isso como as string
      setPostId(Array.isArray(params.id) ? params.id[0] : params.id || '');
      setTitle(Array.isArray(params.title) ? params.title[0] : params.title || '');
      setContent(Array.isArray(params.description) ? params.description[0] : params.description || '');
    }
    return () => {
      setTitle('');
      setContent('');
    };
  }, [isEdit, params.id]);

  const handleSubmit = async () => {
    setLoading(true);
    const author = authUser?.name || 'Anonymous';
    try {
      if (isEdit) {
        await updatePost(postId, { title, author, description: content });
      } else {
        await createPost({ title, author, description: content });
      }
      Alert.alert(
        'Success',
        'The post has been successfully saved.',
        [
          {
            text: 'OK',
            onPress: () => router.push({ pathname: '../(tabs)' }),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Error', 'There was an error saving the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
      />
      <Text style={styles.label}>Content</Text>
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
        <Button title={isEdit ? "Edit Post" : "Create Post"} onPress={handleSubmit} />
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
});