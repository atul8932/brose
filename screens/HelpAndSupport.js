import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

// Contact Info
const CONTACT_WHATSAPP = "+91 6207232718"; // Replace with your WhatsApp number
const CONTACT_EMAIL = "atulkumar54123@gmail.com";
const CONTACT_PHONE = "+91 6207232718"; // Replace with your phone number

const HelpAndSupport = () => {
  const [expanded, setExpanded] = useState(null);

  // Handle expanding sections
  const handlePress = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  // Open WhatsApp with a prefilled message
  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${CONTACT_WHATSAPP}&text=Hi, I need assistance!`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "WhatsApp is not installed or there was an error.")
    );
  };

  // Open email client with support email
  const openEmail = () => {
    Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=Help & Support`);
  };

  // Open phone dialer with a prefilled number
  const makeCall = () => {
    Linking.openURL(`tel:${CONTACT_PHONE}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Getting Started Section */}
      <List.Accordion
        title="Getting Started"
        expanded={expanded === "gettingStarted"}
        onPress={() => handlePress("gettingStarted")}
        style={styles.accordion}
        titleStyle={styles.accordionTitle}
        left={(props) => (
          <Icon {...props} name="play-circle-outline" size={24} />
        )}
      >
        <View style={styles.content}>
          <Text style={styles.text}>- Introduction to B₹OSE</Text>
          <Text style={styles.text}>- How to Use the App</Text>
        </View>
      </List.Accordion>

      {/* Features Guide Section */}
      <List.Accordion
        title="Features Guide"
        expanded={expanded === "featuresGuide"}
        onPress={() => handlePress("featuresGuide")}
        style={styles.accordion}
        titleStyle={styles.accordionTitle}
        left={(props) => <Icon {...props} name="info-outline" size={24} />}
      >
        <View style={styles.content}>
          <Text style={styles.text}>- Stocks Overview</Text>
          <Text style={styles.text}>- Market Trends</Text>
          <Text style={styles.text}>- Recent News</Text>
        </View>
      </List.Accordion>

      {/* FAQs Section */}
      <List.Accordion
        title="FAQs"
        expanded={expanded === "faqs"}
        onPress={() => handlePress("faqs")}
        style={styles.accordion}
        titleStyle={styles.accordionTitle}
        left={(props) => <Icon {...props} name="question-answer" size={24} />}
      >
        <View style={styles.content}>
          <Text style={styles.text}>- Account Issues</Text>
          <Text style={styles.text}>- Stock Data Information</Text>
          <Text style={styles.text}>- Technical Support</Text>
        </View>
      </List.Accordion>

      {/* Contact Us Section */}
      <List.Accordion
        title="Contact Us"
        expanded={expanded === "contactUs"}
        onPress={() => handlePress("contactUs")}
        style={styles.accordion}
        titleStyle={styles.accordionTitle}
        left={(props) => <Icon {...props} name="contact-phone" size={24} />}
      >
        <View style={styles.content}>
          <TouchableOpacity style={styles.contactOption} onPress={openWhatsApp}>
            <Icon name="message" size={24} color="#25D366" />
            <Text style={styles.linkText}>Chat with us on WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactOption} onPress={openEmail}>
            <Icon name="email" size={24} color="#00796b" />
            <Text style={styles.linkText}>Email Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactOption} onPress={makeCall}>
            <Icon name="phone" size={24} color="#00796b" />
            <Text style={styles.linkText}>Call Support</Text>
          </TouchableOpacity>
        </View>
      </List.Accordion>

      {/* Glossary Section */}
      <List.Accordion
        title="Glossary"
        expanded={expanded === "glossary"}
        onPress={() => handlePress("glossary")}
        style={styles.accordion}
        titleStyle={styles.accordionTitle}
        left={(props) => <Icon {...props} name="library-books" size={24} />}
      >
        <View style={styles.content}>
          <Text style={styles.text}>- Stock Terms</Text>
        </View>
      </List.Accordion>

      {/* User Feedback Section */}
      <List.Accordion
        title="User Feedback"
        expanded={expanded === "feedback"}
        onPress={() => handlePress("feedback")}
        style={styles.accordion}
        titleStyle={styles.accordionTitle}
        left={(props) => <Icon {...props} name="feedback" size={24} />}
      >
        <View style={styles.content}>
          <Text style={styles.text}>- Submit Feedback</Text>
          <Text style={styles.text}>- Report an Issue</Text>
        </View>
      </List.Accordion>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  accordion: {
    backgroundColor: "#ffffff",
    marginVertical: 5,
    borderRadius: 10,
    elevation: 4,
    overflow: "hidden",
  },
  accordionTitle: {
    fontSize: 20,
    color: "#34495e",
  },
  content: {
    backgroundColor: "#ecf0f1",
    padding: 15,
  },
  text: {
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#00796b",
    marginLeft: 15,
    textDecorationLine: "underline",
  },
  contactOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default HelpAndSupport;
