import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Snackbar } from "react-native-paper";



const Upload = ({ navigation }) =>{

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const cameraRef = useRef(null);
  const [snackVisible, setSnackVisible] = useState(false);
  

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" style={styles.loginButton}/>
      </View>
    );
  }

  
  const takePicture = async () => {
    if (cameraRef) {
      console.log('in take picture');
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
 
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
  };


    return (

      <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {useCamera ? (
        <View>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.buttonContainer}>
            
            {/* Cancel operation */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setUseCamera(false);
                }}>
                <Text style={styles.text}>CANCEL</Text>
              </TouchableOpacity>

              {/* Flip button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.text}>Flip</Text>
              </TouchableOpacity>

              {/* Taking the picture */}
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in take pic');
                  const r = await takePicture();
                  setUseCamera(false);
                  if (!r.cancelled) {
                    
                    
                    setImage(r.uri);
                    
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.text}>PICTURE</Text>
              </TouchableOpacity>

            </View>
          </Camera>
        </View>
      ) : (
        <>
          <View style={{ width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick photo');
                  const r = await pickImage();
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.text}> CHOOSE PICTURE </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick camera');
                  setUseCamera(true);
                }}>
                <Text style={styles.text}> TAKE PICTURE </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', alignItems: 'center',   marginTop: 20 }}>
              {true && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, backgroundColor: 'skyblue' }}
                />
              )}
            </View>

            {/* // Upload button */}
            <TouchableOpacity
                style={[styles.loginButton]}
                onPress={() => {
                  
                  // Snackbar.show({text: 'Picture uploaded successfully',
                  //   duration: Snackbar.LENGTH_SHORT,});
                  navigation.navigate('Dashboard');}
                  }
                
                >

                <Text style={styles.text}> UPLOAD </Text>
              </TouchableOpacity>

          </View>
        </>
      )}
    </View>
  

    );
}

export default Upload;


const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      flex: 1
    },
  
    // Make space between the image and text inputs
    image :{
      marginBottom: 40
    },
  
    inputView: {
      backgroundColor: "skyblue",
      borderRadius: 10,
      width: "90%",
      height: 50,
      marginBottom: 20,
      alignItems: "center"
    },
  
    textInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
  
    forgotButton: {
      height: 30,
      marginBottom: 30,
    },
  
    loginButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 15,
      elevation: 3,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: 'grey',
    },

    heading: {
      fontSize: 25,
      paddingTop: 10,
      fontWeight: 'bold',
      textAlign: "center"
    },
    subheading: {
      fontSize: 15,
      textAlign: "center",
      marginBottom: 20
    },

    createAccountText: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        textAlign: "center",
        marginTop: 20
        
      },
      buttonContainer: {
        flexDirection: 'row',
        minWidth: '100%',
        flex: 1,
      },
      button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        margin: 8,
        borderRadius: 10,
        backgroundColor: 'grey',
      },
      text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      },

  });
  