import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';

const profilestaf = () => {
  const staff = {
    name: 'Diane Ingabire',
    email: 'diane.staff@email.com',
    role: 'Staff - Sanitation Dept',
    resolved: 15,
    inProgress: 6,
    pending: 3,
    avatar: 'https://via.placeholder.com/100x100.png?text=DI',
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', onPress: () => console.log('Signed out') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>👤 Staff Profile</Text>

        {/* Profile Image & Info */}
        <View style={styles.profileBox}>
          <Image source={{ uri: staff.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{staff.name}</Text>
          <Text style={styles.email}>{staff.email}</Text>
          <Text style={styles.role}>{staff.role}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{staff.resolved}</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: '#3498db' }]}>
              {staff.inProgress}
            </Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: '#e67e22' }]}>
              {staff.pending}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Notifications')}>
            <Text style={styles.itemText}>🔔 Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Help')}>
            <Text style={styles.itemText}>❓ Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.item, styles.signOut]} onPress={handleSignOut}>
            <Text style={[styles.itemText, { color: '#e74c3c' }]}>🚪 Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profilestaf;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  profileBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  email: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  role: {
    fontSize: 14,
    color: '#3498db',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stat: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  itemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  signOut: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
});
