import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { List, Card } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialIcons";
import stockData from "../stocks.json"; // Import the local JSON data

const screenWidth = Dimensions.get("window").width;

const StocksOverview = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState(stockData); // Set the initial stocks from the local JSON data

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.length >= 2) {
      const filtered = stockData.filter((stock) =>
        stock.stockName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(stockData);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredStocks(stockData);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return <Text>{text}</Text>;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Text key={index} style={styles.highlightedText}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  const handlePress = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stocks..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Icon name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {filteredStocks.map((stock, index) => (
        <List.Accordion
          key={index}
          title={highlightText(stock.stockName, searchQuery)}
          expanded={expanded === index}
          onPress={() => handlePress(index)}
          titleStyle={styles.stockTitle}
          style={styles.accordion}
        >
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <LineChart
                data={{
                  labels: ["Current", "1st Target", "2nd Target", "3rd Target"],
                  datasets: [
                    {
                      data: [
                        stock.currentPrice,
                        stock.firstTargetPrice,
                        stock.secondTargetPrice,
                        stock.thirdTargetPrice,
                      ],
                    },
                  ],
                }}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                  backgroundColor: "#f5f5f5",
                  backgroundGradientFrom: "#6dd5ed",
                  backgroundGradientTo: "#2193b0",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={styles.chart}
              />

              <TouchableOpacity
                style={styles.detailButton}
                onPress={
                  () => navigation.navigate("StockDetail", { stock }) // Pass the stock data directly
                }
              >
                <Text style={styles.detailButtonText}>View Full Details</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </List.Accordion>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 3,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    width: "90%",
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  clearButton: {
    padding: 10,
    marginRight: 10,
  },
  accordion: {
    backgroundColor: "#eee",
    borderRadius: 12,
    marginBottom: 4,
  },
  stockTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    padding: 1,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#eee",
    padding: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  detailButton: {
    backgroundColor: "#00796b",
    padding: 10,
    marginTop: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  highlightedText: {
    backgroundColor: "skyblue",
    fontWeight: "bold",
  },
});

export default StocksOverview;
