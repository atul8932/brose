import React from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import { Card } from "react-native-paper";
import * as Progress from "react-native-progress"; // For circular progress
import { Easing } from "react-native";

// Reusable Circular Progress Component with animation
const TargetProgress = ({ label, percentage }) => {
  const animatedProgress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: percentage / 100,
      duration: 1500,
      easing: Easing.elastic(5), // Easing function for smoothness
      useNativeDriver: false,
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
        size={94}
        progress={progressValue}
        thickness={12}
        borderWidth={0}
        color={"blue"}
        showsText={false}
        strokeCap="round"
        style={styles.roundedProgress}
      />
      <View style={styles.innerCircle}>
        <Text style={styles.innerCircleText}>{percentage.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

const StockDetail = ({ route }) => {
  const { stock } = route.params; // Use the stock data passed from navigation

  const initialPrice = stock.currentPrice;
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
                <Text style={styles.cellValue}>₹{stock.currentPrice}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Target Meet Date</Text>
                <Text style={styles.cellValue}>{stock.expectedTargetDate}</Text>
              </View>
            </View>

            {/* Second row */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Stock Sector</Text>
                <Text style={styles.cellValue}>{stock.sector}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Company Size</Text>
                <Text style={styles.cellValue}>{stock.companySize}</Text>
              </View>
            </View>

            {/* Third row */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTitle}>Volume</Text>
                <Text style={styles.cellValue}>
                  {stock.sharesOutstanding.toLocaleString()}
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
                <Text style={styles.cellValue}>{stock.PEratio}</Text>
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
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    elevation: 8,
    backgroundColor: "#3b5998",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
    marginTop: 20,
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
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#9bc7a7",
    padding: 8,
  },
  cellTitle: {
    color: "#fff",
    fontSize: 12,
  },
  cellValue: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StockDetail;
