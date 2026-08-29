import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import SprintDetailScreen from './src/screens/SprintDetailScreen';
import DayScreen from './src/screens/DayScreen';
import ProfilScreen from './src/screens/ProfilScreen';
import { IconAccueil, IconProfil } from './src/components/icons';
import { colors, typography } from './src/theme/theme';

const AccueilStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const STORAGE_KEY = '@skillsprint_progression';
const ONBOARDING_KEY = '@skillsprint_onboarde';

function AccueilStackScreen({ progression, onCompleter, onRefaireSprint, sprintInitial }) {
  return (
    <AccueilStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={sprintInitial ? 'SprintDetail' : 'Home'}
    >
      <AccueilStack.Screen name="Home">
        {(props) => <HomeScreen {...props} progression={progression} />}
      </AccueilStack.Screen>
      <AccueilStack.Screen
        name="SprintDetail"
        initialParams={sprintInitial ? { sprintId: sprintInitial } : undefined}
      >
        {(props) => (
          <SprintDetailScreen {...props} progression={progression} onRefaireSprint={onRefaireSprint} />
        )}
      </AccueilStack.Screen>
      <AccueilStack.Screen name="Day">
        {(props) => (
          <DayScreen
            {...props}
            onCompleter={({ jour }) => {
              const { sprintId } = props.route.params;
              onCompleter(sprintId, jour);
              props.navigation.navigate('SprintDetail', { sprintId });
            }}
          />
        )}
      </AccueilStack.Screen>
    </AccueilStack.Navigator>
  );
}

function MainTabs({ progression, onCompleter, onRefaireSprint, sprintInitial }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accentIndigo,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.ink,
          borderTopWidth: 2,
          height: 64,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: { fontFamily: typography.bodyBold, fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="Accueil"
        options={{ tabBarIcon: ({ color }) => <IconAccueil color={color} /> }}
      >
        {() => (
          <AccueilStackScreen
            progression={progression}
            onCompleter={onCompleter}
            onRefaireSprint={onRefaireSprint}
            sprintInitial={sprintInitial}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profil"
        options={{ tabBarIcon: ({ color }) => <IconProfil color={color} /> }}
      >
        {() => <ProfilScreen progression={progression} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

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
  const [onboarde, setOnboarde] = useState(null); // null = pas encore su
  const [sprintInitial, setSprintInitial] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setProgression(JSON.parse(data));
    });
    AsyncStorage.getItem(ONBOARDING_KEY).then((v) => {
      setOnboarde(v === 'true');
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

  const terminerOnboarding = useCallback((sprintIdChoisi) => {
    AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setSprintInitial(sprintIdChoisi);
    setOnboarde(true);
  }, []);

  if (!fontsLoaded || onboarde === null) return null;

  // L'onboarding n'a pas besoin de navigation propre — un simple écran
  // affiché avant de monter le NavigationContainer.
  if (!onboarde) {
    return (
      <SafeAreaProvider>
        <OnboardingScreen onTerminer={terminerOnboarding} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
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
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Main">
            {() => (
              <MainTabs
                progression={progression}
                onCompleter={marquerJourComplete}
                onRefaireSprint={remettreSprintAZero}
                sprintInitial={sprintInitial}
              />
            )}
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
