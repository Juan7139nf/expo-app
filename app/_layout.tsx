import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AppThemeProvider, useAppTheme } from "@/contexts/ThemeContext";

export const unstable_settings = {
  anchor: "(drawer)",
};

function AppContent() {
  const { theme } = useAppTheme();

  const navigationTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  const statusBarStyle = theme === "dark" ? "light" : "dark";

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style={statusBarStyle} />
    </NavigationThemeProvider>
  );
}

// 6. El componente principal que envuelve toda la aplicación
export default function RootLayout() {
  return (
    // Envuelve la aplicación con NUESTRO proveedor de tema
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>
  );
}
