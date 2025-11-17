import { Link } from "expo-router";
import { StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

export default function ModalScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Obtener colores del tema actual
  const inputBgColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    // Simular proceso de login
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Éxito", "Has iniciado sesión correctamente");
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Iniciar Sesión</ThemedText>

      <ThemedView style={styles.form}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: inputBgColor, borderColor, color: textColor },
          ]}
          placeholder="tu@email.com"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Contraseña</ThemedText>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: inputBgColor, borderColor, color: textColor },
          ]}
          placeholder="Tu contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.loginButton, { backgroundColor: tintColor }]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText
            style={{
              ...styles.loginButtonText,
              color: colorScheme === "dark" ? "#010101" : "#dddddd",
            }}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.footer}>
        <Link href="/" dismissTo style={styles.link}>
          <ThemedText type="link">Cancelar</ThemedText>
        </Link>

        <Link href="/register" style={styles.link}>
          <ThemedText type="link">¿No tienes cuenta? Regístrate</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    marginTop: 30,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 400,
    marginTop: 30,
  },
  link: {
    paddingVertical: 15,
  },
});
