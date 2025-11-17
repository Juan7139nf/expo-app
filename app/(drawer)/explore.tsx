import { Image } from "expo-image";
import { Platform, StyleSheet, Pressable, ScrollView, Dimensions, Alert } from "react-native";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

const { width } = Dimensions.get("window");

export default function TabTwoScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);
  
  const slides = [
    {
      id: 1,
      title: "File-based Routing",
      description: "Organiza tu aplicación con un sistema de routing basado en archivos",
      icon: "folder-outline",
      color: "#8B5CF6"
    },
    {
      id: 2,
      title: "Multiplatform Support",
      description: "Despliega tu aplicación en iOS, Android y Web desde una sola base de código",
      icon: "layers-outline",
      color: "#3B82F6"
    },
    {
      id: 3,
      title: "Dark Mode",
      description: "Interfaz adaptativa con soporte para modo claro y oscuro",
      icon: "moon-outline",
      color: "#10B981"
    },
    {
      id: 4,
      title: "Animations",
      description: "Crea animaciones fluidas y atractivas con react-native-reanimated",
      icon: "flash-outline",
      color: "#F59E0B"
    }
  ];

  const handleSlideChange = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  const scrollToSlide = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * width, animated: true });
      setActiveSlide(index);
    }
  };

  const renderSlide = ({ item }) => (
    <ThemedView style={[styles.slide, { borderLeftColor: item.color }]}>
      <Pressable
        style={({ pressed }) => [
          styles.slideContent,
          { opacity: pressed ? 0.8 : 1 }
        ]}
        onPress={() => Alert.alert(item.title, `Has seleccionado: ${item.description}`)}
      >
        <ThemedView style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Ionicons name={item.icon} size={40} color={item.color} />
        </ThemedView>
        <ThemedText type="subtitle" style={styles.slideTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.slideDescription}>{item.description}</ThemedText>
        <ThemedView style={styles.learnMore}>
          <ThemedText type="link" style={{ color: item.color }}>Aprender más</ThemedText>
          <Ionicons name="arrow-forward" size={16} color={item.color} />
        </ThemedView>
      </Pressable>
    </ThemedView>
  );

  const renderDot = (index) => {
    return (
      <Pressable
        key={index}
        style={[
          styles.dot,
          activeSlide === index ? [styles.activeDot, { backgroundColor: slides[index].color }] : null
        ]}
        onPress={() => scrollToSlide(index)}
      />
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#1a1a1a", dark: "#0a0a0a" }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <IconSymbol
            size={310}
            color="#404040"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        </ThemedView>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
              color: "#ffffff",
            }}
          >
            Explore
          </ThemedText>
          <ThemedView style={styles.underline} />
        </ThemedView>
        
        <ThemedText style={styles.subtitle}>
          Descubre las características principales de esta aplicación
        </ThemedText>

        <ThemedView style={styles.carouselContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleSlideChange}
          >
            {slides.map((item) => (
              <ThemedView key={item.id} style={styles.slideWrapper}>
                {renderSlide({ item })}
              </ThemedView>
            ))}
          </ScrollView>
          
          <ThemedView style={styles.dotsContainer}>
            {slides.map((_, index) => renderDot(index))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.featuresContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Características Detalladas</ThemedText>
          
          <ThemedView style={styles.featureCards}>
            <Pressable
              style={({ pressed }) => [
                styles.featureCard,
                { 
                  backgroundColor: pressed ? "#2a2a2a" : "#1a1a1a",
                  borderColor: pressed ? "#8B5CF6" : "#333333"
                }
              ]}
              onPress={() => Alert.alert("File-based routing", "Más información sobre routing basado en archivos")}
            >
              <Ionicons name="folder-outline" size={24} color="#8B5CF6" />
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>File-based routing</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Esta aplicación tiene dos pantallas:{" "}
                <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
                y{" "}
                <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
              </ThemedText>
              <ThemedText style={styles.featureDescription}>
                El archivo de diseño en{" "}
                <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
                configura el navegador de pestañas.
              </ThemedText>
              <ExternalLink href="https://docs.expo.dev/router/introduction">
                <ThemedText type="link" style={{ color: "#8B5CF6" }}>Learn more</ThemedText>
              </ExternalLink>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.featureCard,
                { 
                  backgroundColor: pressed ? "#2a2a2a" : "#1a1a1a",
                  borderColor: pressed ? "#3B82F6" : "#333333"
                }
              ]}
              onPress={() => Alert.alert("Multiplatform", "Más información sobre soporte multiplataforma")}
            >
              <Ionicons name="layers-outline" size={24} color="#3B82F6" />
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>Android, iOS, and web support</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Puedes abrir este proyecto en Android, iOS y la web. Para abrir la
                versión web, presiona <ThemedText type="defaultSemiBold">w</ThemedText>{" "}
                en la terminal que ejecuta este proyecto.
              </ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.featureCard,
                { 
                  backgroundColor: pressed ? "#2a2a2a" : "#1a1a1a",
                  borderColor: pressed ? "#10B981" : "#333333"
                }
              ]}
              onPress={() => Alert.alert("Images", "Más información sobre imágenes")}
            >
              <Ionicons name="image-outline" size={24} color="#10B981" />
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>Images</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Para imágenes estáticas, puedes usar los sufijos{" "}
                <ThemedText type="defaultSemiBold">@2x</ThemedText> y{" "}
                <ThemedText type="defaultSemiBold">@3x</ThemedText> para
                proporcionar archivos para diferentes densidades de pantalla
              </ThemedText>
              <Image
                source={require("@/assets/images/react-logo.png")}
                style={{ width: 100, height: 100, alignSelf: "center", marginVertical: 10 }}
              />
              <ExternalLink href="https://reactnative.dev/docs/images">
                <ThemedText type="link" style={{ color: "#10B981" }}>Learn more</ThemedText>
              </ExternalLink>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.featureCard,
                { 
                  backgroundColor: pressed ? "#2a2a2a" : "#1a1a1a",
                  borderColor: pressed ? "#F59E0B" : "#333333"
                }
              ]}
              onPress={() => Alert.alert("Dark Mode", "Más información sobre modo oscuro")}
            >
              <Ionicons name="moon-outline" size={24} color="#F59E0B" />
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>Light and dark mode components</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Esta plantilla tiene soporte para modo claro y oscuro. El hook{" "}
                <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> te permite
                inspeccionar cuál es el esquema de color actual del usuario, y así
                puedes ajustar los colores de la interfaz en consecuencia.
              </ThemedText>
              <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
                <ThemedText type="link" style={{ color: "#F59E0B" }}>Learn more</ThemedText>
              </ExternalLink>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.featureCard,
                { 
                  backgroundColor: pressed ? "#2a2a2a" : "#1a1a1a",
                  borderColor: pressed ? "#EF4444" : "#333333"
                }
              ]}
              onPress={() => Alert.alert("Animations", "Más información sobre animaciones")}
            >
              <Ionicons name="flash-outline" size={24} color="#EF4444" />
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>Animations</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Esta plantilla incluye un ejemplo de un componente animado. El componente{" "}
                <ThemedText type="defaultSemiBold">
                  components/HelloWave.tsx
                </ThemedText>{" "}
                utiliza la potente biblioteca{" "}
                <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
                  react-native-reanimated
                </ThemedText>{" "}
                para crear una animación de mano que saluda.
              </ThemedText>
              {Platform.select({
                ios: (
                  <ThemedText style={styles.featureDescription}>
                    El componente{" "}
                    <ThemedText type="defaultSemiBold">
                      components/ParallaxScrollView.tsx
                    </ThemedText>{" "}
                    proporciona un efecto de paralaje para la imagen del encabezado.
                  </ThemedText>
                ),
              })}
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0a0a",
  },
  headerContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    color: "#404040",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  underline: {
    height: 3,
    width: 60,
    backgroundColor: "#8B5CF6",
    borderRadius: 2,
    marginTop: 5,
  },
  subtitle: {
    color: "#a0a0a0",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
  },
  carouselContainer: {
    height: 280,
    marginBottom: 30,
  },
  slideWrapper: {
    width: width - 40,
    paddingHorizontal: 20,
  },
  slide: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    borderLeftWidth: 4,
    marginHorizontal: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  slideContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  slideTitle: {
    color: "#ffffff",
    marginBottom: 10,
  },
  slideDescription: {
    color: "#a0a0a0",
    marginBottom: 15,
    lineHeight: 22,
  },
  learnMore: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333333",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
  },
  featuresContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  featureCards: {
    gap: 15,
  },
  featureCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    color: "#ffffff",
    fontSize: 18,
    marginVertical: 10,
  },
  featureDescription: {
    color: "#a0a0a0",
    lineHeight: 22,
    marginBottom: 10,
  },
});