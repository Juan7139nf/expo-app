import { Image } from "expo-image";
import { Platform, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabTwoScreen() {
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({ light: '#f8f9fa', dark: '#1a1a1a' });

  const teamMembers = [
    { id: 1, name: "Juan Pérez", role: "Desarrollador Principal", avatar: "JP" },
    { id: 2, name: "María García", role: "Diseñadora UX/UI", avatar: "MG" },
    { id: 3, name: "Carlos López", role: "Ingeniero Backend", avatar: "CL" },
    { id: 4, name: "Ana Martínez", role: "Gerente de Producto", avatar: "AM" }
  ];

  const handleContactTeam = (member) => {
    Alert.alert(`Contactar a ${member.name}`, `¿Deseas enviar un mensaje a ${member.role}?`);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
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
            }}
          >
            Acerca de AdminPanel
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.versionContainer}>
          <ThemedView style={[styles.versionCard, { backgroundColor: cardBackground }]}>
            <ThemedText type="subtitle">Versión 2.1.0</ThemedText>
            <ThemedText style={styles.releaseDate}>Lanzado: 15 de mayo de 2023</ThemedText>
            <Pressable
              style={({ pressed }) => [
                styles.checkUpdateButton,
                { backgroundColor: pressed ? tintColor + 'dd' : tintColor }
              ]}
              onPress={() => Alert.alert("Buscar actualizaciones", "Ya tienes la versión más reciente")}
            >
              <ThemedText style={styles.checkUpdateText}>Buscar actualizaciones</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>

        <Collapsible title="Características del Sistema">
          <ThemedText>
            Este panel de administración incluye herramientas avanzadas para gestionar tu negocio:
          </ThemedText>
          <ThemedView style={styles.featuresList}>
            <ThemedView style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <ThemedText>Gestión de usuarios y permisos</ThemedText>
            </ThemedView>
            <ThemedView style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <ThemedText>Análisis de datos en tiempo real</ThemedText>
            </ThemedView>
            <ThemedView style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <ThemedText>Reportes personalizables</ThemedText>
            </ThemedView>
            <ThemedView style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <ThemedText>Integración con múltiples plataformas</ThemedText>
            </ThemedView>
          </ThemedView>
          <ExternalLink href="https://docs.adminpanel.com/features">
            <ThemedText type="link">Ver todas las características</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Tecnologías Utilizadas">
          <ThemedText>
            Este panel está construido con las siguientes tecnologías:
          </ThemedText>
          <ThemedView style={styles.techList}>
            <ThemedView style={[styles.techItem, { backgroundColor: cardBackground }]}>
              <ThemedText type="defaultSemiBold">Frontend</ThemedText>
              <ThemedText>React Native, Expo, TypeScript</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.techItem, { backgroundColor: cardBackground }]}>
              <ThemedText type="defaultSemiBold">Backend</ThemedText>
              <ThemedText>Node.js, Express, MongoDB</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.techItem, { backgroundColor: cardBackground }]}>
              <ThemedText type="defaultSemiBold">Infraestructura</ThemedText>
              <ThemedText>AWS, Docker, Kubernetes</ThemedText>
            </ThemedView>
          </ThemedView>
          <ExternalLink href="https://docs.adminpanel.com/tech-stack">
            <ThemedText type="link">Documentación técnica</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Nuestro Equipo">
          <ThemedText>
            Conoce al equipo detrás de este proyecto:
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teamContainer}>
            {teamMembers.map((member) => (
              <Pressable
                key={member.id}
                style={({ pressed }) => [
                  styles.teamCard,
                  { 
                    backgroundColor: pressed ? cardBackground + 'dd' : cardBackground,
                    borderColor: pressed ? tintColor : 'transparent'
                  }
                ]}
                onPress={() => handleContactTeam(member)}
              >
                <ThemedView style={[styles.avatar, { backgroundColor: tintColor }]}>
                  <ThemedText style={styles.avatarText}>{member.avatar}</ThemedText>
                </ThemedView>
                <ThemedText type="defaultSemiBold">{member.name}</ThemedText>
                <ThemedText style={styles.role}>{member.role}</ThemedText>
                <ThemedView style={styles.contactInfo}>
                  <Ionicons name="mail-outline" size={14} color={tintColor} />
                  <ThemedText style={styles.contactText}>Contactar</ThemedText>
                </ThemedView>
              </Pressable>
            ))}
          </ScrollView>
        </Collapsible>

        <Collapsible title="Licencia y Términos">
          <ThemedText>
            Este software se distribuye bajo la licencia MIT.
          </ThemedText>
          <ThemedText style={styles.licenseText}>
            Al utilizar este panel, aceptas nuestros términos de servicio y política de privacidad.
          </ThemedText>
          <ExternalLink href="https://adminpanel.com/terms">
            <ThemedText type="link">Términos de servicio</ThemedText>
          </ExternalLink>
          <ExternalLink href="https://adminpanel.com/privacy">
            <ThemedText type="link">Política de privacidad</ThemedText>
          </ExternalLink>
          <ExternalLink href="https://adminpanel.com/license">
            <ThemedText type="link">Detalles de la licencia</ThemedText>
          </ExternalLink>
        </Collapsible>

        <ThemedView style={styles.supportContainer}>
          <ThemedText type="subtitle">¿Necesitas ayuda?</ThemedText>
          <ThemedText style={styles.supportText}>
            Nuestro equipo de soporte está disponible 24/7 para ayudarte.
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.supportButton,
              { backgroundColor: pressed ? tintColor + 'dd' : tintColor }
            ]}
            onPress={() => Alert.alert("Soporte", "Serás redirigido al centro de ayuda")}
          >
            <Ionicons name="headset-outline" size={20} color="white" />
            <ThemedText style={styles.supportButtonText}>Contactar Soporte</ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            © 2023 AdminPanel. Todos los derechos reservados.
          </ThemedText>
          <ThemedText style={styles.footerText}>
            Hecho con ❤️ por el equipo de AdminPanel
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  versionContainer: {
    marginBottom: 20,
  },
  versionCard: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  releaseDate: {
    fontSize: 14,
    opacity: 0.7,
    marginVertical: 5,
  },
  checkUpdateButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  checkUpdateText: {
    color: "white",
    fontWeight: "500",
  },
  featuresList: {
    marginVertical: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  techList: {
    marginVertical: 10,
    gap: 10,
  },
  techItem: {
    padding: 10,
    borderRadius: 8,
  },
  teamContainer: {
    marginVertical: 10,
  },
  teamCard: {
    width: 140,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 15,
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  role: {
    fontSize: 12,
    opacity: 0.7,
    marginVertical: 5,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  contactText: {
    fontSize: 12,
  },
  licenseText: {
    marginVertical: 10,
  },
  supportContainer: {
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  supportText: {
    textAlign: "center",
    marginVertical: 10,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  supportButtonText: {
    color: "white",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 5,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});