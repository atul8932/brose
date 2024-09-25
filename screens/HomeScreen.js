import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialIcons";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>Welcome to B₹OSE</Text>
        <Text style={styles.headerSubText}>
          Your Trusted Stock Analysis Platform
        </Text>
      </View>

      {/* About the Company Section */}
      <View style={styles.card}>
        <Text style={styles.aboutTitle}>About the Company</Text>
        <Text style={styles.aboutText}>
          Welcome to B₹OSE, the leading stock analysis platform that provides
          insights into top-performing stocks across various sectors. We offer
          real-time data, market trends, and expert recommendations to help you
          make the best financial decisions.
        </Text>
      </View>

      {/* Top Gainers Section */}
      <View style={[styles.card, styles.highlightCard]}>
        <Text style={styles.sectionTitle}>Top Gainers</Text>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>TechGiant (TG) - +5.2%</Text>
          <Icon name="trending-up" size={24} color="#2ecc71" />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>AutoMakers (AM) - +3.8%</Text>
          <Icon name="trending-up" size={24} color="#2ecc71" />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>HealthSolutions (HS) - +2.5%</Text>
          <Icon name="trending-up" size={24} color="#2ecc71" />
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>View More</Text>
        </TouchableOpacity>
      </View>

      {/* Top Losers Section */}
      <View style={[styles.card, styles.dangerCard]}>
        <Text style={styles.sectionTitle}>Top Losers</Text>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>EnergyPlus (EP) - -4.7%</Text>
          <Icon name="trending-down" size={24} color="#e74c3c" />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>GreenEnergy (GE) - -3.1%</Text>
          <Icon name="trending-down" size={24} color="#e74c3c" />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>RetailStars (RS) - -2.9%</Text>
          <Icon name="trending-down" size={24} color="#e74c3c" />
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>View More</Text>
        </TouchableOpacity>
      </View>

      {/* Stock Performance Chart */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Stock Performance</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [
              {
                data: [150, 155, 140, 160, 170],
                strokeWidth: 2, // Changed stroke width
              },
            ],
          }}
          width={screenWidth - 40} // Full width of the screen minus padding
          height={260}
          yAxisLabel="₹"
          chartConfig={{
            backgroundGradientFrom: "#1e3c72",
            backgroundGradientTo: "#2a5298",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Market Overview Section */}
      <View style={[styles.card, styles.gradientCard]}>
        <Text style={styles.sectionTitle}>Market Overview</Text>
        <Text style={styles.cardText}>
          Today's market highlights show an overall upward trend with
          significant gains in the technology and automobile sectors. Investors
          are optimistic about the upcoming earnings season.
        </Text>
      </View>

      {/* Latest News Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <View style={styles.newsItem}>
          <Icon
            name="article"
            size={20}
            color="#34495e"
            style={styles.newsIcon}
          />
          <Text style={styles.newsText}>
            TechGiant announces new AI chip, stock surges by 5%
          </Text>
        </View>
        <View style={styles.newsItem}>
          <Icon
            name="article"
            size={20}
            color="#34495e"
            style={styles.newsIcon}
          />
          <Text style={styles.newsText}>
            AutoMakers launches new electric car line-up
          </Text>
        </View>
        <View style={styles.newsItem}>
          <Icon
            name="article"
            size={20}
            color="#34495e"
            style={styles.newsIcon}
          />
          <Text style={styles.newsText}>
            HealthSolutions vaccine passes final trials
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>Read More News</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7", // Light background for the screen
    padding: 15,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#2c3e50", // New darker header background
    borderRadius: 15,
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ecf0f1", // Light color text
    marginBottom: 5,
  },
  headerSubText: {
    fontSize: 16,
    color: "#bdc3c7", // Softer light text
  },
  card: {
    padding: 20,
    backgroundColor: "#ffffff", // White background for the card
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  highlightCard: {
    borderLeftWidth: 4,
    borderColor: "#2ecc71", // Green accent for Top Gainers
  },
  dangerCard: {
    borderLeftWidth: 4,
    borderColor: "#e74c3c", // Red accent for Top Losers
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  moreButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2c3e50",
    borderRadius: 20,
  },
  moreButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2c3e50",
  },
  newsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  newsIcon: {
    marginRight: 10,
  },
  newsText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  gradientCard: {
    backgroundColor: "linear-gradient(to right, #6a11cb, #2575fc)", // Gradient card for Market Overview
    borderLeftWidth: 4,
    borderColor: "#6a11cb",
    color: "#fff",
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#7f8c8d",
  },
});

export default HomeScreen;
