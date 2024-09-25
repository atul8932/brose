import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated, // Import Animated from React Native
} from "react-native";
import { Card } from "react-native-paper";
import * as Progress from "react-native-progress"; // For circular progress
import axios from "axios";
import { Easing } from "react-native";

// Reusable Circular Progress Component with animation
const TargetProgress = ({ label, percentage }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: percentage / 100,
      duration: 1500, // Longer duration for smoother animation
      easing: Easing.elastic(5), // Easing function for smoothness
      useNativeDriver: false, // Don't use native driver for non-layout animations
    }).start();
  }, [percentage]);

  return (
    <View style={styles.progressItem}>
      <Text style={styles.progressLabel}>{label}</Text>
      <View style={styles.circleWrapper}>
        {/* Outer circle */}
        <View style={styles.outerCircle}>
          {/* Animated Progress Circle */}
          <AnimatedProgressCircle
            animatedValue={animatedProgress}
            percentage={percentage}
          />
        </View>
      </View>
    </View>
  );
};

// Helper component to animate the Progress Circle
const AnimatedProgressCircle = ({ animatedValue, percentage }) => {
  const progressValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const AnimatedProgress = Animated.createAnimatedComponent(Progress.Circle);

  return (
    <View style={styles.progressCircleContainer}>
      <AnimatedProgress
        size={94} // Slightly smaller to fit between the two circles
        progress={progressValue}
        thickness={12} // Adjust the thickness to fit between the circles
        borderWidth={0}
        color={"blue"} // Progress color
        showsText={false}
        strokeCap="round" // Rounded progress bar ends
        style={styles.roundedProgress}
      />
      <View style={styles.innerCircle}>
        <Text style={styles.innerCircleText}>{percentage.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

const StockDetail = ({ route }) => {
  const { stockId } = route.params; // Check the route params for stockId
  const [stock, setStock] = useState(null); // State to hold stock data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch stock data from the API
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.6:5000/api/stocks/${stockId}` // Corrected endpoint
        );
        setStock(response.data); // Set the stock data
        setLoading(false); // Stop loading
      } catch (error) {
        setLoading(false); // Stop loading on error
      }
    };

    fetchStockData();
  }, [stockId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text>Loading</Text>
      </View>
    );
  }

  if (!stock) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Stock data not available.</Text>
      </View>
    );
  }

  const initialPrice = stock.priceRecommended;
  const firstTargetPercentage =
    ((stock.firstTargetPrice - initialPrice) / initialPrice) * 100;
  const secondTargetPercentage =
    ((stock.secondTargetPrice - initialPrice) / initialPrice) * 100;
  const thirdTargetPercentage =
    ((stock.thirdTargetPrice - initialPrice) / initialPrice) * 100;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.stockTitle}>{stock.stockName} Details</Text>

          {/* Progress circles */}
          <View style={styles.progressContainer}>
            <TargetProgress
              label="1st Target"
              percentage={firstTargetPercentage}
            />
            <TargetProgress
              label="2nd Target"
              percentage={secondTargetPercentage}
            />
            <TargetProgress
              label="3rd Target"
              percentage={thirdTargetPercentage}
            />
          </View>

          {/* Stock details in two-column layout */}
          <View style={styles.tableContainer}>
            {/* First row */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Recommended Price</Text>
                <Text style={styles.cellValue}>₹{stock.priceRecommended}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Target Meet Date</Text>
                <Text style={styles.cellValue}>{stock.targetMeetAt}</Text>
              </View>
            </View>

            {/* Second row */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Stock Sector</Text>
                <Text style={styles.cellValue}>{stock.stockSector}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Stock Type</Text>
                <Text style={styles.cellValue}>{stock.stockType}</Text>
              </View>
            </View>

            {/* Third row */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Volume</Text>
                <Text style={styles.cellValue}>
                  {stock.volume.toLocaleString()}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Market Cap</Text>
                <Text style={styles.cellValue}>{stock.marketCap}</Text>
              </View>
            </View>

            {/* Fourth row */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>P/E Ratio</Text>
                <Text style={styles.cellValue}>{stock.peRatio}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Dividend Yield</Text>
                <Text style={styles.cellValue}>{stock.dividendYield}</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#eee",
  },
  stockTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center", // Center the title text
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    elevation: 8,
    backgroundColor: "#3b5998",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Reduced shadow opacity
    shadowRadius: 8, // Reduced shadow radius
  },
  cardContent: {
    padding: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  progressItem: {
    alignItems: "center",
  },
  progressLabel: {
    marginBottom: 10,
    fontWeight: "400",
    color: "#fff",
  },
  circleWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    position: "relative",
    width: 98,
    height: 98,
    borderRadius: 110,
    borderWidth: 16,
    borderColor: "#9bc7a7",
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    position: "absolute",
    top: 25,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  roundedProgress: {
    borderRadius: 50,
  },
  tableContainer: {
    marginTop: 20, // Add margin to separate from progress circles
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#3b5998",
    borderRadius: 6,
    marginHorizontal: 4, // Add space between cells
    borderWidth: 1, // Reduced border width for a cleaner look
    borderColor: "#9bc7a7", // Set the border color (you can customize this color)
    padding: 8, // Added padding for better cell content layout
  },
  cellTitle: {
    color: "#fff",
    fontSize: 12,
  },
  cellValue: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StockDetail;
