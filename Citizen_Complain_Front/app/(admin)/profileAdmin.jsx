import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';

const ProfileSuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock super admin data
  const adminData = {
    name: 'Deborah Ama',
    email: 'deborah.admin@citizenapp.gov',
    rating: 5.0,
    memberSince: 2021,
    totalUsers: 12,
    complaintsManaged: 56,
    staffAssigned: 8,
  };

  const handleManageUsers = () => {
    Alert.alert('Manage Users', 'Redirecting to user management panel...');
  };

  const handleViewReports = () => {
    Alert.alert('System Reports', 'Opening analytics dashboard...');
  };

  const handleAssignTasks = () => {
    Alert.alert('Assign Complaints', 'Opening complaint assignment panel...');
  };

  const handleSettings = () => {
    Alert.alert('System Settings', 'Opening settings...');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Opening help center...');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Signed out') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Super Admin</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{adminData.name}</Text>
          <Text style={styles.profileEmail}>{adminData.email}</Text>
          <Text style={styles.roleBadge}>System Owner</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{adminData.totalUsers}</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{adminData.staffAssigned}</Text>
            <Text style={styles.statLabel}>Staff Assigned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{adminData.complaintsManaged}</Text>
            <Text style={styles.statLabel}>Complaints</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Actions</Text>

          <TouchableOpacity style={styles.actionItem} onPress={handleManageUsers}>
            <Text style={styles.actionText}>👥 Manage Users</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleAssignTasks}>
            <Text style={styles.actionText}>🛠️ Assign Complaints</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleViewReports}>
            <Text style={styles.actionText}>📊 View Reports</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleSettings}>
            <Text style={styles.actionText}>⚙️ System Settings</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <TouchableOpacity style={styles.actionItem} onPress={handleHelp}>
            <Text style={styles.actionText}>❓ Help & Support</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionItem, { borderTopColor: '#e74c3c' }]} onPress={handleSignOut}>
            <Text style={[styles.actionText, { color: '#e74c3c' }]}>🚪 Sign Out</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSuperAdmin;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  profileEmail: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  roleBadge: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#2980B9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    marginBottom: 10,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    color: '#2C3E50',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  actionText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  chevron: {
    fontSize: 20,
    color: '#BDC3C7',
  },
});
