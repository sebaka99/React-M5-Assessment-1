import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { List } from "react-native-paper";
import { auth } from '../firebase';

//Screens
import SettingsScreen from "./settings";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text style={styles.heading}>Welcome to the Spaceroom</Text>
      <Text style={styles.subheading}>
        One click away from connecting with the world.
      </Text>

      <List.Item
        title="Upload Selfie"
        description="Put a face to the profile"
        left={(props) => <List.Icon {...props} icon="camera" color="blue" />}
        onPress={() => navigation.navigate("Upload")}
      />

      <List.Item
        title="Meet People"
        description="Connect with new people - Feature Coming Soon"
        left={(props) => (
          <List.Icon {...props} icon="account-group" color="blue" />
        )}
        onPress={() => {
          Alert.alert("Feature coming soon");
        }}
      />

      <List.Item
        title="Shopping Buddy"
        description="Get yourself a shopping companion - Feature Coming Soon"
        left={(props) => (
          <List.Icon {...props} icon="shopping-search" color="blue" />
        )}
        onPress={() => {
          Alert.alert("Feature coming soon");
        }}
      />

      <List.Item
        title="Shop Now"
        description="Choose a location to go shopping with your companion - Feature Coming Soon"
        left={(props) => <List.Icon {...props} icon="shopping" color="blue" />}
        onPress={() => {
          Alert.alert("Feature coming soon");
        }}
      />

       <Text style={styles.subheading}
        > Logged in as: {auth.currentUser?.email}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        initialRouteName="Home"
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  // Make space between the image and text inputs
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "skyblue",
    borderRadius: 10,
    width: "90%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "yellow",
  },

  heading: {
    fontSize: 25,
    paddingTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheading: {
    fontSize: 15,
    textAlign: "center",
  },

  createAccountText: {
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
