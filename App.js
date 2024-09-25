import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import StocksOverview from "./screens/StocksOverview";
import StockDetail from "./screens/StockDetail";
import Icon from "react-native-vector-icons/MaterialIcons";
import MarketTrends from "./screens/MarketTrends";
import RecentNews from "./screens/RecentNews";
import NewRecommendations from "./screens/NewRecommendations";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen"; // Import SignupScreen
import HelpAndSupport from "./screens/HelpAndSupport";
import ProfilePage from "./screens/ProfilePage";
import { firebase } from "@react-native-firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAo8JHgtG9Y_-PSiD0sR-2JNS7OyY_gUs4",
  authDomain: "brose-01.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "brose-01",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "18364655776",
  appId: "1:18364655776:android:8dc2377b1e68019c98c1c5",
  measurementId: "YOUR_MEASUREMENT_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Drawer and Stack navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack navigator for Stocks Overview and StockDetail
const StockStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3b5998",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="StocksOverview"
        component={StocksOverview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StockDetail"
        component={StockDetail}
        options={{
          title: "Stock Details",
        }}
      />
    </Stack.Navigator>
  );
};

// Custom Drawer Content with header and profile
const CustomDrawerContent = (props) => (
  <View style={styles.drawerContainer}>
    {/* Custom Drawer Header with Logo or Profile */}
    <View style={styles.drawerHeader}>
      <Image
        source={require("./assets/logo.png")} // Use your logo image
        style={styles.logo}
      />
      <Text style={styles.username}>B₹OSE</Text>
    </View>

    <DrawerContentScrollView {...props}>
      {/* Drawer Item List */}
      <DrawerItemList {...props} />
      {/* Logout Button */}
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Icon name="exit-to-app" size={size} color={color} />
        )}
        onPress={() => {
          props.setIsLoggedIn(false); // Logout user
        }}
      />
    </DrawerContentScrollView>
  </View>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Drawer Navigator Component
  const DrawerNavigator = () => (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} setIsLoggedIn={setIsLoggedIn} />
      )}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#00796b",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: { fontSize: 15 },
        drawerStyle: {
          backgroundColor: "#2c3e50",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Recommended Stocks"
        component={StockStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="New Recommendations"
        component={NewRecommendations}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="lightbulb" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Market Trends"
        component={MarketTrends}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Recent News"
        component={RecentNews}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="article" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help & Support"
        component={HelpAndSupport}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="help-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  // Stack Navigator for Login and Signup
  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ title: "Create an Account" }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <DrawerNavigator /> // Show DrawerNavigator when logged in
      ) : (
        <AuthStack /> // Show AuthStack for login and signup
      )}
    </NavigationContainer>
  );
}

// Custom Styles for Drawer
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: 0,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "stretch",
  },
  drawerHeader: {
    height: 150,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
});
