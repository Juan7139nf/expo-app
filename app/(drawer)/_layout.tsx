import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme.web';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{}}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Inicio',
          drawerLabel: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          title: 'Detalles',
          drawerLabel: 'Detalles',
        }}
      />
      <Drawer.Screen
        name="admin"
        options={{
          title: 'Admin',
          drawerLabel: 'Admin',
        }}
      />
    </Drawer>
  );
}