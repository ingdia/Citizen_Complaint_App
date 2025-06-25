import { Client, Account, Avatars } from 'react-native-appwrite';

// Initialize the Appwrite client
export const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // ✅ Add your Appwrite endpoint here
  .setProject('68441c51003e61825d36')          // ✅ Replace with your actual project ID
  .setPlatform('dev.ingabire.reactNativestudy'); // ✅ Replace with your bundle ID or app identifier

// Export Appwrite services
export const account = new Account(client);
export const avatars = new Avatars(client);
