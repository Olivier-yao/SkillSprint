import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Rappel quotidien — une notification locale répétée à une heure fixe,
// pour se souvenir de faire sa mission du jour. Pas de push, pas de
// serveur : tout est planifié sur l'appareil.

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const IDENTIFIANT_RAPPEL = 'skillsprint-rappel-quotidien';

export async function demanderPermissionNotifications() {
  const { status: statutActuel } = await Notifications.getPermissionsAsync();
  if (statutActuel === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function planifierRappelQuotidien(heure) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('rappels', {
      name: 'Rappels quotidiens',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  await Notifications.cancelScheduledNotificationAsync(IDENTIFIANT_RAPPEL).catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: IDENTIFIANT_RAPPEL,
    content: {
      title: 'SkillSprint',
      body: "Ta mission du jour t'attend. 5 minutes suffisent.",
    },
    trigger: { hour: heure, minute: 0, repeats: true },
  });
}

export async function annulerRappelQuotidien() {
  await Notifications.cancelScheduledNotificationAsync(IDENTIFIANT_RAPPEL).catch(() => {});
}
