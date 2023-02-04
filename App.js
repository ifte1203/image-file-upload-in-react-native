import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, Image } from 'react-native';
// File Picker
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as DocumentPicker from 'expo-document-picker';
// Image Picker
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);

  const openFile = async () => {
    let res = await DocumentPicker.getDocumentAsync();
    console.log(res);

    FileSystem.getContentUriAsync(res.uri).then(cUri => {
      console.log(cUri);
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: cUri,
        flags: 1,
      });
    });
     
  }

  const openImage = async () => {
    // let res = await DocumentPicker.getDocumentAsync();
    // console.log(res);

    // FileSystem.getContentUriAsync(res.uri).then(cUri => {
    //   console.log(cUri);
    //   IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
    //     data: cUri,
    //     flags: 1,
    //   });
    // });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
     
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Text>Open up App.js to start working on your app!</Text>
        <Button onPress={openFile} title='Open File'/>
        <Button onPress={openImage} title='Open Image'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
