import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

const LoginScreen = ({ setIsLoggedIn, navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const fixedIdentifier = "test";
    const fixedPassword = "PASSWORD";

    if (identifier === fixedIdentifier && password === fixedPassword) {
      setIsLoggedIn(true);
      Alert.alert("Login Successful");
    } else {
      Alert.alert("Invalid login credentials. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.brandName}>B₹OSE</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("SignupScreen")}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Display Login Details */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Use the following credentials to log in:
        </Text>
        <Text style={styles.credentialsText}>ID: test</Text>
        <Text style={styles.credentialsText}>Password: PASSWORD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  brandName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3b5998",
    marginBottom: 30,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#3b5998",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#3b5998",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  signupButtonText: {
    color: "#3b5998",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    width: "90%",
    alignItems: "center",
  },
  infoText: {
    color: "#333",
    fontSize: 16,
    marginBottom: 5,
  },
  credentialsText: {
    color: "#3b5998",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
