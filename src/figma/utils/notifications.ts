import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert, Linking } from 'react-native';

// Configure notification behavior for mobile
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Check if exact alarms are allowed on Android 12+
 * Returns true if exact alarms can be scheduled
 */
export async function canScheduleExactAlarms(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  
  try {
    // For Android 12+ (API 31+), check if exact alarm permission is granted
    // Note: expo-notifications doesn't expose this directly, so we assume it's granted
    // In a production app, you'd use a native module or check device settings
    return true;
  } catch (error) {
    console.warn('Failed to check exact alarm permission', error);
    return false;
  }
}

/**
 * Prompt user to enable exact alarms if needed (Android 12+)
 */
export async function promptForExactAlarmPermission(): Promise<void> {
  if (Platform.OS !== 'android') return;
  
  Alert.alert(
    'Exact Alarm Permission',
    'To ensure you receive wake-up notifications at the exact time, please enable "Alarms & reminders" permission in settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => {
          // Open app settings
          Linking.openSettings().catch((error) => {
            console.warn('Failed to open settings', error);
          });
        },
      },
    ]
  );
}

export async function registerForPushNotifications(): Promise<string | undefined> {
  let token: string | undefined;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permission');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    // Create notification channel (redundant if already done in _layout, but safe)
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF6B35',
    });
  }

  return token;
}

export async function scheduleDailyWakeUpNotification(wakeUpTime: string): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const [time, period] = wakeUpTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  let hour = hours;
  if (period === 'PM' && hours !== 12) hour += 12;
  if (period === 'AM' && hours === 12) hour = 0;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "‚?ų Time to wake up!",
      body: 'Good morning! Time to check in and start your day strong.',
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: ({
      hour,
      minute: minutes,
      repeats: true,
    } as unknown) as Notifications.NotificationTriggerInput,
  });

  console.log(`Scheduled daily notification for ${wakeUpTime}`);
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function sendLocalNotification(title: string, body: string): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null,
  });
}

type WakeNotificationType = 'pre-wake' | 'wake-start' | 'miss-reminder';

type WakeNotificationData = {
  wakeFlow: true;
  type: WakeNotificationType;
};

const buildNotificationData = (type: WakeNotificationType): WakeNotificationData => ({
  wakeFlow: true,
  type,
});

const isWakeNotification = (notification: Notifications.NotificationRequest): boolean => {
  const data = notification.content?.data as Partial<WakeNotificationData> | undefined;
  return Boolean(data?.wakeFlow);
};

const isMissReminder = (notification: Notifications.NotificationRequest): boolean => {
  const data = notification.content?.data as Partial<WakeNotificationData> | undefined;
  return data?.wakeFlow === true && data?.type === 'miss-reminder';
};

const scheduleWakeNotification = async (
  date: Date,
  type: WakeNotificationType,
  title: string,
  body: string
): Promise<string> => {
  const trigger: Notifications.DateTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date,
  };

  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      data: buildNotificationData(type),
    },
    trigger,
  });
};

const ensureFutureDate = (date: Date): Date => {
  const now = new Date();
  if (date.getTime() <= now.getTime()) {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next;
  }
  return date;
};

export async function cancelWakeNotifications(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const wakeNotifications = scheduled.filter(isWakeNotification);

  await Promise.all(
    wakeNotifications.map(notification =>
      Notifications.cancelScheduledNotificationAsync(notification.identifier)
    )
  );
}

export async function cancelMissReminderNotification(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const missReminder = scheduled.filter(isMissReminder);

  await Promise.all(
    missReminder.map(notification =>
      Notifications.cancelScheduledNotificationAsync(notification.identifier)
    )
  );
}

export async function scheduleWakeNotificationsForUser(params: {
  wakeStartDate: Date;
  wakeWindowMinutes: number;
}): Promise<void> {
  const { wakeStartDate, wakeWindowMinutes } = params;

  await cancelWakeNotifications();

  const wakeStart = ensureFutureDate(wakeStartDate);
  const preWakeTime = new Date(wakeStart.getTime() - 5 * 60 * 1000);
  const missReminderTime = new Date(wakeStart.getTime() + (wakeWindowMinutes + 60) * 60 * 1000);

  await scheduleWakeNotification(
    preWakeTime,
    'pre-wake',
    'Almost time',
    'Almost time  Your wake-up is coming.'
  );

  await scheduleWakeNotification(
    wakeStart,
    'wake-start',
    "It's time",
    'It\'s your wake window – tap "I\'m awake" to lock in your win'
  );

  await scheduleWakeNotification(
    missReminderTime,
    'miss-reminder',
    'We missed your check-in',
    'We missed your wake-up check-in. Tomorrow is a fresh chance ✨'
  );
}
