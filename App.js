import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import SprintDetailScreen from './src/screens/SprintDetailScreen';
import DayScreen from './src/screens/DayScreen';
import { colors } from './src/theme/theme';

const Stack = createNativeStackNavigator();
const STORAGE_KEY = '@skillsprint_progression';

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_800ExtraBold,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
  });

  const [progression, setProgression] = useState({});

  React.useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setProgression(JSON.parse(data));
    });
  }, []);

  const marquerJourComplete = useCallback((sprintId, jourNumero) => {
    setProgression((prev) => {
      const jourActuel = Math.max(prev[sprintId]?.jourActuel || 0, jourNumero);
      const next = { ...prev, [sprintId]: { jourActuel } };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remettreSprintAZero = useCallback((sprintId) => {
    setProgression((prev) => {
      const next = { ...prev, [sprintId]: { jourActuel: 0 } };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          background: colors.bg,
          card: colors.bg,
          text: colors.ink,
          border: colors.divider,
          primary: colors.accentIndigo,
          notification: colors.accentOrange,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} progression={progression} />}
        </Stack.Screen>
        <Stack.Screen name="SprintDetail">
          {(props) => (
            <SprintDetailScreen
              {...props}
              progression={progression}
              onRefaireSprint={remettreSprintAZero}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Day">
          {(props) => (
            <DayScreen
              {...props}
              onCompleter={({ jour }) => {
                const { sprintId } = props.route.params;
                marquerJourComplete(sprintId, jour);
                props.navigation.navigate('SprintDetail', { sprintId });
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
