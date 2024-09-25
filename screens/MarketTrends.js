import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const screenWidth = Dimensions.get("window").width;

// Sample data for Market Trends
const marketIndexes = [
  { name: "S&P 500", value: "4,513.50", change: "+0.35%", color: "#2ecc71" },
  { name: "NASDAQ", value: "15,103.50", change: "-0.20%", color: "#e74c3c" },
  { name: "DOW JONES", value: "35,281.50", change: "+0.58%", color: "#2ecc71" },
];

const topGainers = [
  { name: "TechCorp", change: "+8.5%", color: "#2ecc71" },
  { name: "GreenEnergy", change: "+6.3%", color: "#2ecc71" },
  { name: "HealthSolutions", change: "+5.1%", color: "#2ecc71" },
];

const topLosers = [
  { name: "AutoMakers", change: "-4.8%", color: "#e74c3c" },
  { name: "RetailStars", change: "-3.9%", color: "#e74c3c" },
  { name: "EnergyPlus", change: "-3.5%", color: "#e74c3c" },
];

const trendingStocks = [
  { name: "FinTech", volume: "1.2M", price: "₹250.30" },
  { name: "TechGiant", volume: "2.5M", price: "₹580.75" },
  { name: "HealthInnovations", volume: "890K", price: "₹320.45" },
];

const stockSectors = [
  { name: "Technology", trend: "+2.5%", color: "#1abc9c" },
  { name: "Healthcare", trend: "+1.7%", color: "#3498db" },
  { name: "Energy", trend: "-1.2%", color: "#e74c3c" },
  { name: "Automobile", trend: "-0.8%", color: "#e67e22" },
];

const mostActiveStocks = [
  { name: "RetailStars", volume: "3.2M", price: "₹100.45" },
  { name: "EcoCorp", volume: "2.8M", price: "₹85.20" },
  { name: "AutoMakers", volume: "2.5M", price: "₹195.75" },
];

const stockNews = [
  {
    title: "TechCorp launches new AI chip",
    date: "Sep 22, 2024",
    source: "Tech News",
  },
  {
    title: "HealthSolutions vaccine gets approval",
    date: "Sep 21, 2024",
    source: "Health Today",
  },
  {
    title: "AutoMakers unveils new electric vehicle",
    date: "Sep 20, 2024",
    source: "Auto World",
  },
];

// Reusable component for rendering list items
const ListItem = ({
  name,
  value,
  change,
  volume,
  price,
  color,
  title,
  date,
  source,
}) => (
  <View style={[styles.listItem, { borderLeftColor: color }]}>
    <Text style={styles.listItemText}>{name || title}</Text>
    {value && <Text style={styles.listItemText}>{value}</Text>}
    {change && <Text style={[styles.listItemChange, { color }]}>{change}</Text>}
    {volume && (
      <Text style={styles.listItemText}>
        Volume: {volume} | Price: {price}
      </Text>
    )}
    {date && source && (
      <Text style={styles.newsSource}>
        {date} | {source}
      </Text>
    )}
  </View>
);

const MarketTrends = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Page Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Market Trends</Text>
        <Text style={styles.headerSubtitle}>
          Get the latest insights and updates on the market performance and
          trending stocks.
        </Text>
      </View>

      {/* Market Indexes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Market Indexes</Text>
        {marketIndexes.map((index, idx) => (
          <ListItem
            key={idx}
            name={index.name}
            value={index.value}
            change={index.change}
            color={index.color}
          />
        ))}
      </View>

      {/* Top Gainers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Gainers</Text>
        {topGainers.map((gainer, idx) => (
          <ListItem
            key={idx}
            name={gainer.name}
            change={gainer.change}
            color={gainer.color}
          />
        ))}
      </View>

      {/* Top Losers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Losers</Text>
        {topLosers.map((loser, idx) => (
          <ListItem
            key={idx}
            name={loser.name}
            change={loser.change}
            color={loser.color}
          />
        ))}
      </View>

      {/* Most Active Stocks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Active Stocks</Text>
        {mostActiveStocks.map((stock, idx) => (
          <ListItem
            key={idx}
            name={stock.name}
            volume={stock.volume}
            price={stock.price}
          />
        ))}
      </View>

      {/* Stock Sectors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stock Sectors</Text>
        <FlatList
          data={stockSectors}
          renderItem={({ item }) => (
            <ListItem
              key={item.name}
              name={item.name}
              change={item.trend}
              color={item.color}
            />
          )}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sectorList}
        />
      </View>

      {/* Stock News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stock News</Text>
        {stockNews.map((news, idx) => (
          <ListItem
            key={idx}
            title={news.title}
            date={news.date}
            source={news.source}
          />
        ))}
      </View>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Market Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            Today, the market showed a mixed performance with the S&P 500 and
            Dow Jones closing in the green, while NASDAQ faced a slight dip due
            to tech sector weaknesses. Overall, the market remains optimistic
            with strong buying in the healthcare and energy sectors.
          </Text>
        </View>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Detailed Report</Text>
        </TouchableOpacity>
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
  listItem: {
    flexDirection: "column",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    borderLeftWidth: 5,
    borderLeftColor: "#3498db",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  listItemText: {
    fontSize: 18,
    color: "#2c3e50",
  },
  listItemChange: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectorList: {
    paddingLeft: 5,
  },
  summaryCard: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  summaryText: {
    fontSize: 16,
    color: "#34495e",
    lineHeight: 22,
  },
  viewDetailsButton: {
    backgroundColor: "#2980b9",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  viewDetailsText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  newsSource: {
    fontSize: 14,
    color: "#95a5a6",
    marginTop: 5,
  },
});

export default MarketTrends;
