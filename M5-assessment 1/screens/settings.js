import { auth, db } from '../firebase'
import React from "react";
import { List } from "react-native-paper";
import { View, Button, Text, StyleSheet } from "react-native";
import * as firebase from "firebase";

const Settings = ({navigation}) =>{

  const handleSignOut = () => {
    console.log('Logging out');
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  function readData() {
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
  });
  }

  function readUserData() {

    const user = firebase.auth().currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  
  const email = user.email;
  const fullname = user.fullname;

  console.log("The email is " + email);
  console.log("The fullname is " + fullname);

  // The user's ID, unique to the Firebase project. Do NOT use
  
  const uid = user.uid;

  // db.collection('users')
  //   .get()
  //   .then(snapshot => {
  //     snapshot
  //       .docs
  //       .forEach(doc => {
  //         console.log(JSON.parse(doc._document.data.toString()))
  //       });
  //   });
}

// const userDocument = firestore()
//     .collection('Users')
//     .doc('SKwa6d4sogKYzl4UG33s')
//     .then(docSnapshot => {
//         if (docSnapshot.exists) {
//             const userData = docSnapshot.data()
//             console.log(userData)
//         }
//     });
  }

    return (

        <View>
     
        <Text style={styles.heading}>Settings</Text>
         <Text style={styles.subheading}>Customise your world.</Text>

         <List.Item
        title="Meet People"
        description="Connect with new people - Feature Coming Soon"
                onPress={() => {
          Alert.alert("Feature coming soon");
        }}
      />

         <Button style={styles.loginButton} 
          title="Sign Out" 
          onPress={handleSignOut}

          />

{/* <Button style={styles.loginButton} 
          title="Test Me" 
          onPress={readData}

          /> */}
          
        </View>
    );
}

export default Settings;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
      backgroundColor: 'yellow',
      
    },

    heading: {
      fontSize: 25,
      paddingTop: 10,
      fontWeight: 'bold',
      textAlign: "center"
    },
    subheading: {
      fontSize: 15,
      textAlign: "center"
    },

    createAccountText: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        textAlign: "center",
        marginTop: 20
        
      },
  });
  