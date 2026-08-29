import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Fraunces_600SemiBold, Fraunces_500Medium_Italic } from '@expo-google-fonts/fraunces';
import { WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold } from '@expo-google-fonts/work-sans';
import { Literata_400Regular, Literata_500Medium } from '@expo-google-fonts/literata';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import SprintDetailScreen from './src/screens/SprintDetailScreen';
import DayScreen from './src/screens/DayScreen';
import { colors } from './src/theme/theme';

const Stack = createNativeStackNavigator();
const STORAGE_KEY = '@skillsprint_progression';

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_500Medium_Italic,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    Literata_400Regular,
    Literata_500Medium,
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
        dark: true,
        colors: {
          background: colors.bgDeep,
          card: colors.bgDeep,
          text: colors.textPrimary,
          border: colors.divider,
          primary: colors.accentAmber,
          notification: colors.accentCoral,
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
