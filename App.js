import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChooseImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('file', {
      uri: image,
      name: 'file',
      type: 'image/jpeg'
    });
    try {
      const response = await axios.post('http://192.168.1.19/MyAPI/setProfile.php', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.previewImage} />
      ) : (
        <Text style={styles.promptText}>No Image Selected</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>{loading ? 'Uploading...' : 'Upload'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10
  },
  promptText: {
    fontSize: 20,
    marginBottom: 10
  },
  button: {
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: '#FFF'
  }
});

export default App;