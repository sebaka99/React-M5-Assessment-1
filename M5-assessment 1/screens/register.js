import React, { useEffect, useState } from 'react'
import { StyleSheet,Text, TextInput, View, Image, TouchableOpacity, Button, StatusBar,  Dimensions, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, db } from '../firebase';




const Register = ( { navigation }) =>{

    // Initial state of email and password will be empty
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [fullname, setFullname] = useState('');
 const [userID, setUserID] = useState('');
  
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email.toLowerCase().trim(), password.trim())
      .then(userCredentials => {
        const user = userCredentials.user;
        createUser;
        console.log('Registered with:', user.email);
        navigation.replace("Dashboard")
      })
      .catch(error => alert(error.message))
  }


   function createUser() {

      db.collection("users").set({
        fullname: fullname,
        email: email,
       // userID: uid,
        
    })
    .then((docRef) => {
     //await firestore().collection('users').doc(uid).set(user);
      console.log("Document written with ID: ", docRef.id);
            
    })
    .catch((error) => {
      Alert.alert(error.message);
        console.error("Error adding document: ", error);
    });
        

    console.log("Exiting newUser()");
  
    }

    


    return (
        
      <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
         height: Dimensions.get("window").height,
          width: '100%'
           }}
      >
      <View style={styles.container}>
      
      <Image style={styles.image} source = {require("../assets/proj.png")}/>
      <StatusBar style="auto" />
  
      <View style={styles.inputView}>
      
      <TextInput style={styles.textInput}
      placeholder='Full Name'
      placeholderTextColor="003f5c"
      value={fullname}
      onChangeText={text => setFullname(text)}
      //onChangeText={(email) => setEmail(email)}
  
      />
      </View>
  
      <View style={styles.inputView}>
      
      <TextInput style={styles.textInput}
      placeholder='Email'
      value={email}
      onChangeText={text => setEmail(text)}
      placeholderTextColor="003f5c"
      
  
      />
      </View>
  
      <View style={styles.inputView}>
        
      <TextInput style={styles.textInput}
      placeholder='Password'
      value={password}
      onChangeText={text => setPassword(text)}
      placeholderTextColor="003f5c"
      secureTextEntry={true}
 
  
      />
  
      </View> 
  
      <View style={styles.inputView}>
        
      <TextInput style={styles.textInput}
      placeholder='Confirm Password'
      placeholderTextColor="003f5c"
      secureTextEntry={true}
      
  
      />
  
      </View> 
  
      
  
      <View >
    
  
        <Button style={styles.loginButton} 
        title="Register" 
  
        // onPress={() => navigation.navigate('Dashboard')}
        onPress={handleSignUp}


        /> 
               
        
  
        <TouchableOpacity>
          <Text style={styles.createAccountText} onPress={() => navigation.navigate('Login')}>Aready a user? Login to you account.</Text>
        </TouchableOpacity>
     
      </View>  
    </View>
      </KeyboardAwareScrollView>
    
    );
    
}

export default Register;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    // Create space between the image and text inputs
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
      alignContent: "center",
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
  
  
    loginButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 50,
      elevation: 3,
      overflow: 'hidden',
      backgroundColor: 'yellow',
    },

    createAccountText: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      textAlign: "center",
      marginTop: 20
      
    },
  });
  