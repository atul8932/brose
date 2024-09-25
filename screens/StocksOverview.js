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
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

const screenWidth = Dimensions.get("window").width;

const StocksOverview = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://192.168.1.6:5000/api/stocks");
        setStocks(response.data);
        setFilteredStocks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setError("Failed to fetch stocks");
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.length >= 2) {
      const filtered = stocks.filter((stock) =>
        stock.stockName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(stocks);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredStocks(stocks);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading stocks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

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
                        stock.priceRecommended,
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

              {/* Pass the stockId to the StockDetail component */}
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() =>
                  navigation.navigate("StockDetail", { stockId: stock.id })
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default StocksOverview;
