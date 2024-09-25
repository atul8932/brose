import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Animated } from "react-native"; // For animations
import Icon from "react-native-vector-icons/MaterialIcons";

// Sample data for Recent News
const newsData = [
  {
    title: "TechCorp Reaches New Heights with AI Innovation",
    summary: "TechCorp's new AI product is disrupting the tech world...",
    date: "2024-09-17",
    imageUrl: "https://via.placeholder.com/150",
    category: "Technology",
  },
  {
    title: "EnergyPlus Sees Record Growth Amid Green Energy Shift",
    summary: "The global energy transition is driving EnergyPlus stock...",
    date: "2024-09-16",
    imageUrl: "https://via.placeholder.com/150",
    category: "Energy",
  },
  {
    title: "HealthSolutions Achieves Major Milestone in Healthcare",
    summary:
      "HealthSolutions has reached a breakthrough in its latest research...",
    date: "2024-09-15",
    imageUrl: "https://via.placeholder.com/150",
    category: "Healthcare",
  },
  {
    title: "AutoMakers Unveil New Electric Car Lineup",
    summary:
      "AutoMakers' latest models promise a future of sustainable driving...",
    date: "2024-09-14",
    imageUrl: "https://via.placeholder.com/150",
    category: "Automobile",
  },
  {
    title: "FinTech Innovations Transform Financial Landscape",
    summary:
      "FinTech companies are revolutionizing the way we handle finances...",
    date: "2024-09-13",
    imageUrl: "https://via.placeholder.com/150",
    category: "Finance",
  },
  {
    title: "RetailStars Expand with New Stores Across the Nation",
    summary: "RetailStars is rapidly expanding with new locations...",
    date: "2024-09-12",
    imageUrl: "https://via.placeholder.com/150",
    category: "Retail",
  },
];

// Editor's Pick
const editorsPick = {
  title: "TechGiant Sets the Stage for Future Technology",
  summary:
    "TechGiant's new product launch is set to change the way we interact with technology...",
  date: "2024-09-10",
  imageUrl: "https://via.placeholder.com/150",
};

// Most Read Articles
const mostReadArticles = [
  {
    title: "GreenEnergy Leads the Way in Renewable Energy",
    date: "2024-09-11",
  },
  {
    title: "Healthcare Industry Sees Rapid Growth in Telemedicine",
    date: "2024-09-09",
  },
  {
    title: "Automobile Industry Adapts to Changing Consumer Preferences",
    date: "2024-09-08",
  },
  {
    title: "RetailStars Offers New Discounts Amidst Economic Downturn",
    date: "2024-09-07",
  },
  {
    title: "TechCorp Acquires AI Startup to Boost Innovation",
    date: "2024-09-06",
  },
];

// Function for rendering animated news cards
const AnimatedNewsCard = ({ item }) => {
  const animation = new Animated.Value(0); // Initial value

  // Fade-in animation
  Animated.timing(animation, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={[styles.newsCard, { opacity: animation }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSummary}>{item.summary}</Text>
        <Text style={styles.newsDate}>{item.date}</Text>
      </View>
    </Animated.View>
  );
};

const RecentNews = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.pageTitle}>Recent News</Text>

      {/* Editor's Pick Section */}
      <View style={styles.editorsPickSection}>
        <Text style={styles.sectionTitle}>Editor's Pick</Text>
        <TouchableOpacity style={styles.editorsPickCard}>
          <Image
            source={{ uri: editorsPick.imageUrl }}
            style={styles.editorsPickImage}
          />
          <View style={styles.editorsPickContent}>
            <Text style={styles.editorsPickTitle}>{editorsPick.title}</Text>
            <Text style={styles.editorsPickSummary}>{editorsPick.summary}</Text>
            <Text style={styles.editorsPickDate}>{editorsPick.date}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Trending News Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending News</Text>
        {newsData.slice(0, 3).map((news, index) => (
          <View key={index} style={styles.trendingNewsCard}>
            <Image
              source={{ uri: news.imageUrl }}
              style={styles.trendingNewsImage}
            />
            <View style={styles.trendingNewsContent}>
              <Text style={styles.trendingNewsTitle}>{news.title}</Text>
              <Text style={styles.trendingNewsSummary}>{news.summary}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Latest Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        {newsData.map((item, index) => (
          <AnimatedNewsCard key={index} item={item} />
        ))}
      </View>

      {/* News by Category */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News by Category</Text>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <Icon name="category" size={24} color="#00796b" />
              <Text style={styles.categoryTitle}>{item.category}</Text>
              <Text style={styles.newsSummary}>{item.summary}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Most Read Articles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Read Articles</Text>
        {mostReadArticles.map((article, index) => (
          <View key={index} style={styles.mostReadCard}>
            <Icon name="trending-up" size={24} color="#2c3e50" />
            <View style={styles.mostReadContent}>
              <Text style={styles.mostReadTitle}>{article.title}</Text>
              <Text style={styles.mostReadDate}>{article.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f5",
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34495e",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  newsContent: {
    marginLeft: 15,
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
  },
  newsSummary: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 5,
  },
  newsDate: {
    fontSize: 12,
    color: "#95a5a6",
    marginTop: 5,
  },
  trendingNewsCard: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  trendingNewsImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  trendingNewsContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  trendingNewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2980b9",
  },
  trendingNewsSummary: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 5,
  },
  editorsPickSection: {
    marginBottom: 30,
  },
  editorsPickCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 4,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  editorsPickImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  editorsPickContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  editorsPickTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d35400",
  },
  editorsPickSummary: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 5,
  },
  editorsPickDate: {
    fontSize: 12,
    color: "#95a5a6",
    marginTop: 5,
  },
  categoryCard: {
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#00796b",
  },
  mostReadCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  mostReadContent: {
    marginLeft: 10,
    flex: 1,
  },
  mostReadTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  mostReadDate: {
    fontSize: 12,
    color: "#95a5a6",
    marginTop: 5,
  },
});

export default RecentNews;
