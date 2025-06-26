import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';

const profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      title: 'Pothole on Main St resolved',
      description: 'Your report was successfully fixed',
      time: '2 hours ago',
      status: 'resolved',
      icon: '✓'
    },
    {
      id: 2,
      title: 'Broken streetlight update',
      description: 'Issue is now in progress',
      time: '1 day ago',
      status: 'progress',
      icon: '⚠'
    },
    {
      id: 3,
      title: 'New report submitted',
      description: 'Garbage collection issue reported',
      time: '3 days ago',
      status: 'submitted',
      icon: '+'
    }
  ];


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
const response = await fetch("http://10.0.2.2:3000/users/me", {
          method: "GET",
          credentials: "include", // to include cookies if any
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleReportNewIssue = () => {
    Alert.alert('Report New Issue', 'Redirecting to report form...');
  };

  const handleMyReports = () => {
    Alert.alert('My Reports', 'Showing all your submitted reports...');
  };

  const handleFavoriteLocations = () => {
    Alert.alert('Favorite Locations', 'Managing your favorite locations...');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Opening notification settings...');
  };

  const handlePrivacySecurity = () => {
    Alert.alert('Privacy & Security', 'Opening privacy settings...');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Opening help center...');
  };

  const handleAbout = () => {
    Alert.alert('About', 'App version 1.0.0');
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

  const renderProfile = () => {
    if (loading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#3498DB" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>{error}</Text>
        </View>
      );
    }

    if (!userData) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>No user data available.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: userData.profileImage || 'https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=User' }}
              style={styles.profileImage}
            />
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.name || userData.email}</Text>
            <Text style={styles.profileEmail}>{userData.email}</Text>
            <View style={styles.profileStats}>
              <View style={styles.ratingContainer}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.rating}>{userData.rating ?? 'N/A'} Rating</Text>
              </View>
              <View style={styles.memberSince}>
                <Text style={styles.calendarIcon}>📅</Text>
                <Text style={styles.memberText}>Since {userData.memberSince ?? 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userData.reportsSubmitted ?? 0}</Text>
            <Text style={styles.statLabel}>Reports{'\n'}Submitted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#27AE60' }]}>{userData.issuesResolved ?? 0}</Text>
            <Text style={styles.statLabel}>Issues{'\n'}Resolved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#E67E22' }]}>{userData.inProgress ?? 0}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionItem} onPress={handleReportNewIssue}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>+</Text>
            </View>
            <Text style={styles.actionText}>Report New Issue</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleMyReports}>
            <View style={[styles.actionIcon, { backgroundColor: '#27AE60' }]}>
              <Text style={styles.actionIconText}>📋</Text>
            </View>
            <Text style={styles.actionText}>My Reports</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleFavoriteLocations}>
            <View style={[styles.actionIcon, { backgroundColor: '#9B59B6' }]}>
              <Text style={styles.actionIconText}>💜</Text>
            </View>
            <Text style={styles.actionText}>Favorite Locations</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[
                styles.activityIcon,
                { backgroundColor: activity.status === 'resolved' ? '#27AE60' : 
                                 activity.status === 'progress' ? '#F39C12' : '#3498DB' }
              ]}>
                <Text style={styles.activityIconText}>{activity.icon}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleNotifications}>
            <View style={styles.settingIcon}>
              <Text style={styles.settingIconText}>🔔</Text>
            </View>
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacySecurity}>
            <View style={styles.settingIcon}>
              <Text style={styles.settingIconText}>🔒</Text>
            </View>
            <Text style={styles.settingText}>Privacy & Security</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleHelpSupport}>
            <View style={styles.settingIcon}>
              <Text style={styles.settingIconText}>❓</Text>
            </View>
            <Text style={styles.settingText}>Help & Support</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
            <View style={styles.settingIcon}>
              <Text style={styles.settingIconText}>ℹ️</Text>
            </View>
            <Text style={styles.settingText}>About</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, styles.signOutItem]} onPress={handleSignOut}>
            <View style={[styles.settingIcon, { backgroundColor: '#E74C3C' }]}>
              <Text style={styles.settingIconText}>🚪</Text>
            </View>
            <Text style={[styles.settingText, { color: '#E74C3C' }]}>Sign Out</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderProfile()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 8,
  },
  iconText: {
    fontSize: 20,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 15,
  },
  profileImageContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3498DB',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  starIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  rating: {
    fontSize: 14,
    color: '#F39C12',
    fontWeight: '600',
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  memberText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#BDC3C7',
  },
  activityItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#95A5A6',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECF0F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingIconText: {
    fontSize: 18,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  signOutItem: {
    borderBottomWidth: 0,
  },
});

export default profile;