import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ExpenseSummary from "@/components/ExpenseSummary";
import { BarChart } from "react-native-gifted-charts";
import CustomTabsChart from "@/components/CustonTabsChart";
import SegmentedControl from "@react-native-segmented-control/segmented-control"
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

  const barData = [
    {
      value: 2500,
      frontColor: "#006DFF",
      spacing: 6,
      label: "Seg",
    },
    { value: 2400, frontColor: "#3BE9DE",  },

    {
      value: 3500,
      frontColor: "#006DFF",
      spacing: 6,
      label: "Ter",
    },
    { value: 3000, frontColor: "#3BE9DE",  },

    {
      value: 4500,
      frontColor: "#006DFF",
      spacing: 6,
      label: "Qua",
    },
    { value: 4000, frontColor: "#3BE9DE",  },

    {
      value: 5200,
      frontColor: "#006DFF",
      spacing: 6,
      label: "Qui",
    },
    { value: 4900, frontColor: "#3BE9DE",  },

    {
      value: 3000,
      frontColor: "#006DFF",
      spacing: 6,
      label: "Sex",
    },
    { value: 2800, frontColor: "#3BE9DE",  },
    {
      value: 1800,
      frontColor: "#006DFF",
      spacing: 6,
      label: "Sab",
    },
    { value: 4800, frontColor: "#3BE9DE",  },
    {
      value: 1000,
      frontColor: "#006DFF",
      spacing: 6.1,
      label: "Dom",
    },
    { value: 3800, frontColor: "#3BE9DE",  },
  ];

export default function Analytics() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState(barData);
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ExpenseSummary balance={7783} expense={-1187.4} totalBudget={20000} />
      </View>

      <View style={styles.whiteBox}>
        {/* ÍCONES TOPO DIREITO */}
        <View style={styles.topIcons}>
          <FontAwesome
            name="search"
            size={20}
            color="#00b894"
            style={styles.iconButton}
          />
          <FontAwesome
            name="calendar"
            size={20}
            color="#00b894"
            style={styles.iconButton}
          />
        </View>


        <Text style={styles.sectionTitle}>Income & Expenses</Text>

        <SegmentedControl
          values={["Diário","Semanal", "Mensal", "Anual"]}
          selectedIndex={activeIndex}
          onChange={(event) => {
            setActiveIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          appearance="light"

          // style={{ backgroundColor:"red"}}
        />
        <SafeAreaView style={{marginLeft: "5%", alignItems: "center" }}>
          {chartData.length > 0 ? (
            
            <BarChart
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            stepValue={1000}
            maxValue={6000}
            barWidth={12}
            noOfSections={7}
            yAxisLabelTexts={["0", "1k", "2k", "3k", "4k", "5k", "6k"]}
            labelWidth={40}
            yAxisLabelWidth={22}
            xAxisLabelTextStyle={{ color: "black", textAlign: "center", marginRight:12 }}
            spacing={14}
            barBorderRadius={10}
            hideRules
            />
          )
          :(
            <View/>
          )
          }
        </SafeAreaView>

        <View style={styles.summaryBottom}>
          <View style={styles.summaryBox}>
            <FontAwesome name="arrow-up" size={20} color="#00b894" />
            <Text style={styles.incomeLabel}>Income</Text>
            <Text style={styles.incomeValue}>$4,120.00</Text>
          </View>

          <View style={styles.summaryBox}>
            <FontAwesome name="arrow-down" size={20} color="#0066ff" />
            <Text style={styles.expenseLabel}>Expense</Text>
            <Text style={styles.expenseValue}>$1,187.40</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00D09E",
  },
  header: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  whiteBox: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#e6fff3",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    marginBottom: 8,
  },
  iconButton: {
    backgroundColor: "#ccf5e7",
    padding: 8,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 6,
    color: "#333",
    textAlign: "center",
  },
  chart: {
    marginVertical: 1,
    borderRadius: 16,
    alignSelf: "center",
  },
  dateLabel: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
  },
  summaryBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  summaryBox: {
    alignItems: "center",
  },
  incomeLabel: {
    marginTop: 4,
    color: "#00b894",
  },
  expenseLabel: {
    marginTop: 4,
    color: "#0066ff",
  },
  incomeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00b894",
  },
  expenseValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066ff",
  },
});
