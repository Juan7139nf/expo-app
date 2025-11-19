import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/contexts/ThemeContext';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Ahora `theme` siempre será 'light' o 'dark', nunca 'system'.
  const { theme } = useAppTheme();

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Esta línea ya no fallará porque `Colors[theme]` siempre encontrará un objeto.
    return Colors[theme][colorName];
  }
}