import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

const Home = () => {
  const reportCategories = [
    {
      id: 1,
      title: 'Potholes',
      icon: '🚧',
      color: '#FFE6E6',
      iconColor: '#FF4444',
    },
    {
      id: 2,
      title: 'Garbage',
      icon: '🗑️',
      color: '#E6F7E6',
      iconColor: '#22C55E',
    },
    {
      id: 3,
      title: 'Street Lights',
      icon: '💡',
      color: '#FFF7E6',
      iconColor: '#F59E0B',
    },
    {
      id: 4,
      title: 'Police',
      icon: '🛡️',
      color: '#E6F0FF',
      iconColor: '#3B82F6',
    },
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Large pothole on Main St',
      status: 'In Progress',
      statusColor: '#F59E0B',
      icon: '🚧',
      iconColor: '#FF4444',
    },
    {
      id: 2,
      title: 'Overflowing garbage bin',
      status: 'Resolved',
      statusColor: '#22C55E',
      time: '5 hours ago',
      icon: '🗑️',
      iconColor: '#22C55E',
    },
    {
      id: 3,
      title: 'Broken street light on Oak Ave',
      status: 'Pending',
      statusColor: '#EF4444',
      time: '1 day ago',
      icon: '💡',
      iconColor: '#F59E0B',
    },
  ];

  const communityStats = [
    { label: 'Reports Filed', value: '127', color: '#3B82F6' },
    { label: 'Resolved', value: '94', color: '#22C55E' },
    { label: 'In Progress', value: '33', color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>📋</Text>
            </View>
            <Text style={styles.appName}>CitizenReport</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileInitial}>A</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Report Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report an Issue</Text>
          <View style={styles.categoryGrid}>
            {reportCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: category.color }]}
              >
                <Text style={[styles.categoryIcon, { color: category.iconColor }]}>
                  {category.icon}
                </Text>
                <Text style={[styles.categoryTitle, { color: category.iconColor }]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Reports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reports</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportsContainer}>
            {recentReports.map((report) => (
              <TouchableOpacity key={report.id} style={styles.reportCard}>
                <View style={styles.reportLeft}>
                  <View style={styles.reportIconContainer}>
                    <Text style={[styles.reportIcon, { color: report.iconColor }]}>
                      {report.icon}
                    </Text>
                  </View>
                  <View style={styles.reportContent}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    {report.time && (
                      <Text style={styles.reportTime}>Reported {report.time}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.reportRight}>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: `${report.statusColor}20` },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: report.statusColor }]}>
                      {report.status}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Community Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Impact</Text>
          <View style={styles.statsContainer}>
            {communityStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Report Button */}
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyIcon}>⚠️</Text>
          <Text style={styles.emergencyText}>Report Emergency</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: 16,
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  reportsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportIcon: {
    fontSize: 18,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  reportTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  reportRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;