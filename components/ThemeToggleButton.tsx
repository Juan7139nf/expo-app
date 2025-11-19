import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAppTheme } from "@/contexts/ThemeContext";

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useAppTheme();

  const getIcon = () => {
    switch (theme) {
      case "light":
        return "☀️ Claro";
      case "dark":
        return "🌙 Oscuro";
      case "system":
        return "🖥️ Sistema";
      default:
        return "🖥️ Sistema";
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Text style={styles.text}>{getIcon()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
