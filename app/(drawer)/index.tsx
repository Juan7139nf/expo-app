import { Image } from "expo-image";
import { StyleSheet, Pressable, ScrollView, Dimensions, View } from "react-native"; // Importa View y StyleSheet
import { Ionicons } from "@expo/vector-icons";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  // 1. Obtén todos los colores que necesitas del tema
  const tint = useThemeColor({}, "tint");
  const text = useThemeColor({}, "text");
  const background = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "background"); // Asumo que tienes un color 'card' en tu tema

  // 2. Crea el objeto de estilos DENTRO del componente para que sea dinámico
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 20,
    },
    descriptionContainer: {
      marginBottom: 30,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: "center",
    },
    authContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    loginButton: {
      width: "80%",
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 15,
      backgroundColor: tint, // Color dinámico
      shadowColor: "#000", // La sombra no suele cambiar, pero podrías hacerla dinámica si quisieras
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    loginButtonText: {
      color: "#FFFFFF", // El texto del botón siempre es blanco para contraste
      fontSize: 16,
      fontWeight: "bold",
    },
    sectionTitle: {
      marginBottom: 20,
      alignItems: "center",
    },
    underline: {
      height: 3,
      width: 60,
      marginTop: 8,
      borderRadius: 2,
    },
    featuresScroll: {
      paddingRight: 20,
    },
    featureCard: {
      width: width * 0.75,
      marginRight: 15,
      padding: 20,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },
    featureTitle: {
      fontSize: 18,
      marginBottom: 8,
    },
    featureDescription: {
      fontSize: 14,
      lineHeight: 20,
    },
    testimonialContainer: {
      marginVertical: 30,
    },
    testimonialTitle: {
      textAlign: "center",
      marginBottom: 15,
    },
    testimonialCard: {
      padding: 20,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    testimonialText: {
      fontStyle: "italic",
      marginBottom: 10,
    },
    testimonialAuthor: {
      textAlign: "right",
    },
    footerContainer: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 40,
    },
    footerText: {
      fontSize: 14,
      marginBottom: 20,
    },
    socialContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 15,
    },
    socialButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: "absolute",
    },
  });

  return (
    <ParallaxScrollView
      // 3. Haz que el color del encabezado también sea dinámico
      headerBackgroundColor={{
        light: tint + "20", // Una versión más clara del color principal
        dark: tint + "30", // Una versión más oscura para el modo dark
      }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">¡Bienvenido!</ThemedText>
          <HelloWave />
          {/* El botón ya está tematizado internamente */}
          <ThemeToggleButton />
        </ThemedView>

        <ThemedView style={styles.descriptionContainer}>
          <ThemedText style={styles.description}>
            Descubre una experiencia única con nuestra aplicación. Conecta,
            explora y comparte con una comunidad vibrante.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.authContainer}>
          <Link href="/modal" asChild>
            {/* 4. Usa un Pressable para que se vea y se sienta como un botón */}
            <Pressable style={styles.loginButton}>
              <ThemedText style={styles.loginButtonText}>
                Iniciar Sesión
              </ThemedText>
            </Pressable>
          </Link>
        </ThemedView>

        <ThemedView style={styles.sectionTitle}>
          <ThemedText type="subtitle">Características Principales</ThemedText>
          <View style={[styles.underline, { backgroundColor: tint }]} />
        </ThemedView>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuresScroll}
        >
          <ThemedView
            style={[styles.featureCard, { backgroundColor: cardBackground }]}
          >
            <ThemedView
              style={[styles.iconContainer, { backgroundColor: tint + "20" }]}
            >
              <Ionicons name="flash-outline" size={28} color={tint} />
            </ThemedView>
            <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
              Rápido y Eficiente
            </ThemedText>
            <ThemedText style={styles.featureDescription}>
              Experimenta una navegación fluida y tiempos de carga optimizados.
            </ThemedText>
          </ThemedView>

          <ThemedView
            style={[styles.featureCard, { backgroundColor: cardBackground }]}
          >
            <ThemedView
              style={[styles.iconContainer, { backgroundColor: tint + "20" }]}
            >
              <Ionicons name="color-palette-outline" size={28} color={tint} />
            </ThemedView>
            <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
              Diseño Intuitivo
            </ThemedText>
            <ThemedText style={styles.featureDescription}>
              Interfaz moderna y fácil de usar que se adapta a tus necesidades.
            </ThemedText>
          </ThemedView>

          <ThemedView
            style={[styles.featureCard, { backgroundColor: cardBackground }]}
          >
            <ThemedView
              style={[styles.iconContainer, { backgroundColor: tint + "20" }]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={28}
                color={tint}
              />
            </ThemedView>
            <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
              Seguro y Confiable
            </ThemedText>
            <ThemedText style={styles.featureDescription}>
              Tus datos están protegidos con las más avanzadas medidas de
              seguridad.
            </ThemedText>
          </ThemedView>
        </ScrollView>

        <ThemedView style={styles.testimonialContainer}>
          <ThemedText type="subtitle" style={styles.testimonialTitle}>
            ¿Qué dicen nuestros usuarios?
          </ThemedText>
          <ThemedView
            style={[styles.testimonialCard, { backgroundColor: cardBackground }]}
          >
            <ThemedText style={styles.testimonialText}>
              "Esta aplicación ha transformado completamente mi experiencia. ¡Es
              increíble!"
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.testimonialAuthor}>
              - Juan Flores.
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.footerContainer}>
          <ThemedText style={styles.footerText}>¿Necesitas ayuda?</ThemedText>
          <ThemedView style={styles.socialContainer}>
            <Pressable
              style={[styles.socialButton, { borderColor: tint }]}
            >
              <Ionicons name="logo-facebook" size={24} color={tint} />
            </Pressable>
            <Pressable
              style={[styles.socialButton, { borderColor: tint }]}
            >
              <Ionicons name="logo-twitter" size={24} color={tint} />
            </Pressable>
            <Pressable
              style={[styles.socialButton, { borderColor: tint }]}
            >
              <Ionicons name="logo-instagram" size={24} color={tint} />
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}