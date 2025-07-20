import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Expense() {
  const [date, setDate] = useState(new Date("2024-04-30"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("$26,00");
  const [title, setTitle] = useState("Dinner");
  const [message, setMessage] = useState("");

  const formatDate = (dateObj: Date) => {
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  return (
    <ScrollView
      style={styles.container}
      // contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.form}>
        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          onPress={() => setDatePickerVisibility(true)}
          style={styles.inputWithIcon}
        >
          <Text style={styles.inputText}>{formatDate(date)}</Text>
          <FontAwesome name="calendar" size={20} color="green" />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select the category" value="" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Transport" value="transport" />
            <Picker.Item label="Health" value="health" />
          </Picker>
        </View>

        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Expense Title */}
        <Text style={styles.label}>Expense Title</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} />

        {/* Message */}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Enter Message"
          placeholderTextColor="#00C896"
          style={styles.textArea}
          multiline
          numberOfLines={4}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00C896",
  },

  form: {
    marginTop: "30%",
    backgroundColor: "#ECFFF4",
    borderRadius: 30,
    padding: "10%",
    paddingTop: "20%",
    gap: 12,
    width: "100%",
    height: "110%",
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },
  inputWithIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#CFFFE6",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
  },
  inputText: {
    color: "#000",
    fontSize: 14,
  },
  pickerContainer: {
    backgroundColor: "#CFFFE6",
    borderRadius: 15,
  },
  picker: {
    height: 50,
    color: "#000",
    paddingLeft: 10,
  },
  input: {
    backgroundColor: "#CFFFE6",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#000",
  },
  textArea: {
    backgroundColor: "#CFFFE6",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    minHeight: 100,
    textAlignVertical: "top",
    color: "#00C896",
  },
  button: {
    backgroundColor: "#00C896",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
