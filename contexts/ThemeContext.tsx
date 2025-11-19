import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define los colores para cada tema
const lightColors = { background: '#ffffff', text: '#000000' };
const darkColors = { background: '#121212', text: '#ffffff' };

// Crea el contexto
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme; // El tema resuelto ('light' o 'dark')
  storedTheme: Theme; // La preferencia guardada ('light', 'dark' o 'system')
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Crea el Proveedor del Tema
export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceColorScheme = useColorScheme();
  const [storedTheme, setStoredTheme] = useState<Theme>('system');

  // Cargar el tema guardado al iniciar
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
          setStoredTheme(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  // Guardar el tema cada vez que cambie
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('appTheme', storedTheme);
      } catch (error) {
        console.log("Error saving theme:", error);
      }
    };
    saveTheme();
  }, [storedTheme]);

  // *** CAMBIO CLAVE AQUÍ ***
  // Resuelve el tema 'system' al tema real del dispositivo.
  // `theme` será siempre 'light' o 'dark'.
  const theme = storedTheme === 'system' ? (deviceColorScheme ?? 'light') : storedTheme;

  // Determinar los colores a usar usando el tema ya resuelto
  const colors = theme === 'dark' ? darkColors : lightColors;

  // Función para cambiar el tema (cicla: light -> dark -> system)
  const toggleTheme = () => {
    setStoredTheme(currentTheme => {
      if (currentTheme === 'light') return 'dark';
      if (currentTheme === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, storedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};