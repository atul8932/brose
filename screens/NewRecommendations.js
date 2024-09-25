import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit"; // Line charts for stock prices
import Icon from "react-native-vector-icons/MaterialIcons";

const screenWidth = Dimensions.get("window").width;

// Sample stock data for New Recommendations
const recommendationsData = [
  {
    stockName: "TechCorp",
    sector: "Technology",
    recommendedPrice: 150.25,
    targetPrice: 180.0,
    chartData: [150, 160, 170, 180],
  },
  {
    stockName: "GreenEnergy",
    sector: "Energy",
    recommendedPrice: 100.5,
    targetPrice: 125.0,
    chartData: [100, 105, 115, 125],
  },
  {
    stockName: "HealthSolutions",
    sector: "Healthcare",
    recommendedPrice: 75.5,
    targetPrice: 95.0,
    chartData: [75, 80, 85, 95],
  },
  {
    stockName: "AutoMakers",
    sector: "Automobile",
    recommendedPrice: 220.75,
    targetPrice: 250.0,
    chartData: [220, 230, 240, 250],
  },
];

// Sample data for different stock categories
const masterSuggestionsData = [
  {
    stockName: "TechPioneers",
    sector: "Technology",
    recommendedPrice: 900.0,
    targetPrice: 1000.0,
  },
  {
    stockName: "EcoInvest",
    sector: "Energy",
    recommendedPrice: 800.0,
    targetPrice: 920.0,
  },
];

const shortTermStocksData = [
  {
    stockName: "QuickGains",
    sector: "Finance",
    recommendedPrice: 120.5,
    targetPrice: 135.0,
  },
  {
    stockName: "AutoFlex",
    sector: "Automobile",
    recommendedPrice: 180.0,
    targetPrice: 200.0,
  },
];

const midTermStocksData = [
  {
    stockName: "HealthWave",
    sector: "Healthcare",
    recommendedPrice: 70.0,
    targetPrice: 85.0,
  },
  {
    stockName: "TechFuture",
    sector: "Technology",
    recommendedPrice: 130.0,
    targetPrice: 150.0,
  },
];

const longTermStocksData = [
  {
    stockName: "GreenPlanet",
    sector: "Energy",
    recommendedPrice: 300.0,
    targetPrice: 450.0,
  },
  {
    stockName: "EduCare",
    sector: "Education",
    recommendedPrice: 210.0,
    targetPrice: 350.0,
  },
  {
    stockName: "FutureAuto",
    sector: "Automobile",
    recommendedPrice: 320.0,
    targetPrice: 420.0,
  },
];

// Top Picks of the Day Data
const topPicksData = [
  {
    stockName: "FinTech Innovations",
    price: "₹250.30",
    volume: "1.2M",
    change: "+3.5%",
  },
  {
    stockName: "TechGiant",
    price: "₹580.75",
    volume: "2.5M",
    change: "+1.2%",
  },
  {
    stockName: "Healthcare Innovations",
    price: "₹320.45",
    volume: "890K",
    change: "+2.1%",
  },
  // Add more top picks...
];

const NewRecommendations = () => {
  // State to manage how many items are shown initially
  const [visibleMasterSuggestions, setVisibleMasterSuggestions] = useState(2);
  const [visibleShortTermStocks, setVisibleShortTermStocks] = useState(2);
  const [visibleMidTermStocks, setVisibleMidTermStocks] = useState(2);
  const [visibleLongTermStocks, setVisibleLongTermStocks] = useState(2);

  // Load more handlers
  const loadMoreMasterSuggestions = () =>
    setVisibleMasterSuggestions(visibleMasterSuggestions + 2);
  const loadMoreShortTermStocks = () =>
    setVisibleShortTermStocks(visibleShortTermStocks + 2);
  const loadMoreMidTermStocks = () =>
    setVisibleMidTermStocks(visibleMidTermStocks + 2);
  const loadMoreLongTermStocks = () =>
    setVisibleLongTermStocks(visibleLongTermStocks + 2);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Page Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>New Recommendations</Text>
        <Text style={styles.headerSubtitle}>
          Discover the latest stock recommendations from various sectors
        </Text>
      </View>

      {/* Highlighted Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Highlighted Recommendations</Text>
        {recommendationsData.slice(0, 2).map((stock, index) => (
          <View key={index} style={styles.highlightedCard}>
            <Text style={styles.highlightedTitle}>{stock.stockName}</Text>
            <LineChart
              data={{
                labels: ["Now", "1 Week", "2 Weeks", "1 Month"],
                datasets: [
                  {
                    data: stock.chartData,
                  },
                ],
              }}
              width={screenWidth - 60}
              height={220}
              chartConfig={{
                backgroundColor: "#1e3d59",
                backgroundGradientFrom: "#3f5efb",
                backgroundGradientTo: "#fc466b",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
            <View style={styles.priceContainer}>
              <Text style={styles.recommendedPrice}>
                Recommended Price: ₹{stock.recommendedPrice}
              </Text>
              <Text style={styles.targetPrice}>
                Target Price: ₹{stock.targetPrice}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Recommendations by Sector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations by Sector</Text>
        <FlatList
          data={recommendationsData}
          renderItem={({ item }) => (
            <View style={styles.sectorCard}>
              <Icon
                name="business"
                size={24}
                color="#2980b9"
                style={styles.sectorIcon}
              />
              <Text style={styles.sectorName}>{item.sector}</Text>
              <Text style={styles.stockName}>{item.stockName}</Text>
              <Text style={styles.recommendedPrice}>
                Recommended Price: ₹{item.recommendedPrice}
              </Text>
              <Text style={styles.targetPrice}>
                Target Price: ₹{item.targetPrice}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sectorList}
        />
      </View>

      {/* New Master Suggestions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Master Suggestions</Text>
        {masterSuggestionsData
          .slice(0, visibleMasterSuggestions)
          .map((stock, index) => (
            <View key={index} style={styles.masterCard}>
              <Icon name="star" size={24} color="#f39c12" />
              <Text style={styles.stockName}>{stock.stockName}</Text>
              <Text style={styles.sectorName}>{stock.sector}</Text>
              <Text style={styles.recommendedPrice}>
                Recommended Price: ₹{stock.recommendedPrice}
              </Text>
              <Text style={styles.targetPrice}>
                Target Price: ₹{stock.targetPrice}
              </Text>
            </View>
          ))}
        {visibleMasterSuggestions < masterSuggestionsData.length && (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={loadMoreMasterSuggestions}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Short Term Stocks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Short Term Stocks</Text>
        {shortTermStocksData
          .slice(0, visibleShortTermStocks)
          .map((stock, index) => (
            <View key={index} style={styles.shortTermCard}>
              <Icon name="trending-up" size={24} color="#27ae60" />
              <Text style={styles.stockName}>{stock.stockName}</Text>
              <Text style={styles.sectorName}>{stock.sector}</Text>
              <Text style={styles.recommendedPrice}>
                Recommended Price: ₹{stock.recommendedPrice}
              </Text>
              <Text style={styles.targetPrice}>
                Target Price: ₹{stock.targetPrice}
              </Text>
            </View>
          ))}
        {visibleShortTermStocks < shortTermStocksData.length && (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={loadMoreShortTermStocks}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mid Term Stocks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mid Term Stocks</Text>
        {midTermStocksData
          .slice(0, visibleMidTermStocks)
          .map((stock, index) => (
            <View key={index} style={styles.midTermCard}>
              <Icon name="timeline" size={24} color="#3498db" />
              <Text style={styles.stockName}>{stock.stockName}</Text>
              <Text style={styles.sectorName}>{stock.sector}</Text>
              <Text style={styles.recommendedPrice}>
                Recommended Price: ₹{stock.recommendedPrice}
              </Text>
              <Text style={styles.targetPrice}>
                Target Price: ₹{stock.targetPrice}
              </Text>
            </View>
          ))}
        {visibleMidTermStocks < midTermStocksData.length && (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={loadMoreMidTermStocks}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Long Term Stocks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Long Term Stocks</Text>
        {longTermStocksData
          .slice(0, visibleLongTermStocks)
          .map((stock, index) => (
            <View key={index} style={styles.longTermCard}>
              <Icon name="show-chart" size={24} color="#8e44ad" />
              <Text style={styles.stockName}>{stock.stockName}</Text>
              <Text style={styles.sectorName}>{stock.sector}</Text>
              <Text style={styles.recommendedPrice}>
                Recommended Price: ₹{stock.recommendedPrice}
              </Text>
              <Text style={styles.targetPrice}>
                Target Price: ₹{stock.targetPrice}
              </Text>
            </View>
          ))}
        {visibleLongTermStocks < longTermStocksData.length && (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={loadMoreLongTermStocks}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Top Picks of the Day */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Picks of the Day</Text>
        <FlatList
          data={topPicksData}
          renderItem={({ item }) => (
            <View key={item.stockName} style={styles.topPickCard}>
              <Text style={styles.stockName}>{item.stockName}</Text>
              <Text style={styles.pickPrice}>Price: {item.price}</Text>
              <Text style={styles.pickVolume}>Volume: {item.volume}</Text>
              <Text style={styles.pickChange}>Change: {item.change}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topPicksList}
        />
      </View>
    </ScrollView>
  );
};

// Styles for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  headerSection: {
    marginBottom: 20,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#1e3d59",
    borderRadius: 15,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#c8d6e5",
    marginTop: 5,
    textAlign: "center",
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
  highlightedCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  highlightedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3f5efb",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  recommendedPrice: {
    fontSize: 16,
    color: "#27ae60",
  },
  targetPrice: {
    fontSize: 16,
    color: "#e74c3c",
  },
  sectorCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectorList: {
    paddingLeft: 5,
  },
  sectorIcon: {
    marginBottom: 5,
  },
  sectorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 5,
  },
  stockName: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 5,
  },
  masterCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  shortTermCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  midTermCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  longTermCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  loadMoreButton: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#2980b9",
    borderRadius: 8,
    alignSelf: "center",
  },
  loadMoreText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  topPickCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topPicksList: {
    paddingLeft: 5,
  },
  pickPrice: {
    fontSize: 16,
    color: "#27ae60",
  },
  pickVolume: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  pickChange: {
    fontSize: 16,
    color: "#e74c3c",
  },
});

export default NewRecommendations;
