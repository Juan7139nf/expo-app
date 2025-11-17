import { Image } from "expo-image";
import { Platform, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({ light: '#f8f9fa', dark: '#1a1a1a' });

  const statsData = [
    { id: 1, title: "Usuarios", value: "1,234", change: "+12%", icon: "people-outline", color: "#3B82F6" },
    { id: 2, title: "Ventas", value: "$5,678", change: "+8%", icon: "cart-outline", color: "#10B981" },
    { id: 3, title: "Pedidos", value: "456", change: "-3%", icon: "cube-outline", color: "#F59E0B" },
    { id: 4, title: "Tasa de Conversión", value: "3.2%", change: "+0.5%", icon: "trending-up-outline", color: "#8B5CF6" }
  ];

  const recentActivities = [
    { id: 1, user: "Juan Pérez", action: "realizó una compra", time: "hace 5 minutos", status: "success" },
    { id: 2, user: "María García", action: "se registró", time: "hace 15 minutos", status: "info" },
    { id: 3, user: "Carlos López", action: "canceló su pedido", time: "hace 30 minutos", status: "warning" },
    { id: 4, user: "Ana Martínez", action: "dejó una reseña", time: "hace 1 hora", status: "success" }
  ];

  const quickActions = [
    { id: 1, title: "Nuevo Producto", icon: "add-circle-outline", link: "/products/new" },
    { id: 2, title: "Ver Reportes", icon: "bar-chart-outline", link: "/reports" },
    { id: 3, title: "Gestionar Usuarios", icon: "people-outline", link: "/users" },
    { id: 4, title: "Configuración", icon: "settings-outline", link: "/settings" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "#10B981";
      case "warning": return "#F59E0B";
      case "info": return "#3B82F6";
      default: return "#6B7280";
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
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
        <ThemedView style={styles.header}>
          <ThemedText type="title">Panel Administrativo</ThemedText>
          <ThemedView style={styles.userSection}>
            <Pressable style={({ pressed }) => [
              styles.notificationButton,
              { backgroundColor: pressed ? tintColor + '20' : 'transparent' }
            ]}>
              <Ionicons name="notifications-outline" size={24} color={tintColor} />
              <ThemedView style={styles.notificationBadge}>
                <ThemedText style={styles.badgeText}>3</ThemedText>
              </ThemedView>
            </Pressable>
            <Pressable style={({ pressed }) => [
              styles.userAvatar,
              { backgroundColor: pressed ? tintColor + '20' : tintColor }
            ]}>
              <ThemedText style={styles.avatarText}>JD</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {["overview", "analytics", "users", "products"].map((tab) => (
            <Pressable
              key={tab}
              style={({ pressed }) => [
                styles.tab,
                activeTab === tab ? [styles.activeTab, { borderBottomColor: tintColor }] : null,
                { backgroundColor: pressed ? tintColor + '20' : 'transparent' }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <ThemedText style={[
                styles.tabText,
                activeTab === tab ? { color: tintColor } : { color: textColor }
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        <ThemedView style={styles.statsContainer}>
          {statsData.map((stat) => (
            <Pressable
              key={stat.id}
              style={({ pressed }) => [
                styles.statCard,
                { backgroundColor: pressed ? cardBackground + 'dd' : cardBackground }
              ]}
              onPress={() => Alert.alert(stat.title, `Ver detalles de ${stat.title}`)}
            >
              <ThemedView style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </ThemedView>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
              <ThemedText style={[styles.statChange, { color: stat.change.startsWith('+') ? '#10B981' : '#EF4444' }]}>
                {stat.change}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Actividad Reciente</ThemedText>
          <ThemedView style={styles.activitiesContainer}>
            {recentActivities.map((activity) => (
              <ThemedView key={activity.id} style={styles.activityItem}>
                <ThemedView style={[styles.statusDot, { backgroundColor: getStatusColor(activity.status) }]} />
                <ThemedView style={styles.activityContent}>
                  <ThemedText>
                    <ThemedText type="defaultSemiBold">{activity.user}</ThemedText>{" "}
                    {activity.action}
                  </ThemedText>
                  <ThemedText style={styles.activityTime}>{activity.time}</ThemedText>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Acciones Rápidas</ThemedText>
          <ThemedView style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <Link key={action.id} href={action.link} asChild>
                <Pressable style={({ pressed }) => [
                  styles.quickActionCard,
                  { backgroundColor: pressed ? tintColor + '20' : cardBackground }
                ]}>
                  <Ionicons name={action.icon} size={28} color={tintColor} />
                  <ThemedText style={styles.quickActionText}>{action.title}</ThemedText>
                </Pressable>
              </Link>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.chartContainer}>
          <ThemedText type="subtitle">Resumen de Ventas</ThemedText>
          <ThemedView style={styles.chartPlaceholder}>
            <ThemedText style={styles.chartText}>Gráfico de ventas</ThemedText>
            <ThemedText style={styles.chartSubtext}>Aquí se mostraría un gráfico interactivo</ThemedText>
            <Pressable style={({ pressed }) => [
              styles.viewChartButton,
              { backgroundColor: pressed ? tintColor : tintColor + 'dd' }
            ]}>
              <ThemedText style={styles.viewChartText}>Ver Detalles</ThemedText>
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
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  statChange: {
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  activitiesContainer: {
    marginTop: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  quickActionCard: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    marginTop: 8,
    textAlign: "center",
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  chartText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  chartSubtext: {
    opacity: 0.7,
    marginBottom: 15,
  },
  viewChartButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewChartText: {
    color: "white",
    fontWeight: "bold",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});