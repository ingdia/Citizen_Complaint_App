import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const AdminDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const departmentStats = [
    {
      id: 1,
      title: 'Road Maintenance',
      icon: '🚧',
      total: 45,
      pending: 12,
      inProgress: 18,
      resolved: 15,
      color: '#F97316',
      backgroundColor: '#FFF7ED',
      lightColor: '#FDBA74'
    },
    {
      id: 2,
      title: 'Sanitation',
      icon: '🗑️',
      total: 38,
      pending: 8,
      inProgress: 14,
      resolved: 16,
      color: '#16A34A',
      backgroundColor: '#F0FDF4',
      lightColor: '#4ADE80'
    },
    {
      id: 3,
      title: 'Utilities',
      icon: '💡',
      total: 23,
      pending: 5,
      inProgress: 9,
      resolved: 9,
      color: '#EAB308',
      backgroundColor: '#FEFCE8',
      lightColor: '#FACC15'
    },
    {
      id: 4,
      title: 'Public Safety',
      icon: '🛡️',
      total: 19,
      pending: 3,
      inProgress: 7,
      resolved: 9,
      color: '#3B82F6',
      backgroundColor: '#EFF6FF',
      lightColor: '#60A5FA'
    }
  ];

  const recentComplaints = [
    {
      id: 1,
      title: 'Severe pothole causing vehicle damage',
      location: 'Main Street & 5th Avenue',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Road Team A',
      reportedTime: '2 hours ago',
      department: 'Road Maintenance',
      icon: '🚧',
      priorityColor: '#DC2626',
      priorityBg: '#FEE2E2',
      statusColor: '#2563EB',
      statusBg: '#DBEAFE'
    },
    {
      id: 2,
      title: 'Overflowing dumpster attracting pests',
      location: 'Park Avenue Residential',
      priority: 'Medium',
      status: 'Pending',
      assignedTo: 'Sanitation Unit 3',
      reportedTime: '4 hours ago',
      department: 'Sanitation',
      icon: '🗑️',
      priorityColor: '#D97706',
      priorityBg: '#FEF3C7',
      statusColor: '#F97316',
      statusBg: '#FED7AA'
    },
    {
      id: 3,
      title: 'Street lights out for 3 days',
      location: 'Oak Street Commercial District',
      priority: 'High',
      status: 'Assigned',
      assignedTo: 'Electrical Team B',
      reportedTime: '6 hours ago',
      department: 'Utilities',
      icon: '💡',
      priorityColor: '#DC2626',
      priorityBg: '#FEE2E2',
      statusColor: '#7C3AED',
      statusBg: '#EDE9FE'
    }
  ];

  const performanceMetrics = [
    { 
      label: 'Total Complaints', 
      value: '125', 
      change: '+12%',
      changeType: 'increase',
      icon: '📊',
      color: '#3B82F6'
    },
    { 
      label: 'Resolved Today', 
      value: '18', 
      change: '+25%',
      changeType: 'increase',
      icon: '✅',
      color: '#16A34A'
    },
    { 
      label: 'Avg Response Time', 
      value: '2.4h', 
      change: '-15%',
      changeType: 'decrease',
      icon: '⏱️',
      color: '#7C3AED'
    },
    { 
      label: 'Citizen Satisfaction', 
      value: '94%', 
      change: '+3%',
      changeType: 'increase',
      icon: '📈',
      color: '#059669'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>📊</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.appName}>Admin Dashboard</Text>
              <Text style={styles.appSubtitle}>CitizenReport Management</Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            
            <View style={styles.profileContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileInitial}>SJ</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.metricsGrid}>
            {performanceMetrics.map((metric, index) => (
              <View key={index} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricIcon}>{metric.icon}</Text>
                  <View style={[styles.changeIndicator, {
                    backgroundColor: metric.changeType === 'increase' ? '#DCFCE7' : '#DBEAFE'
                  }]}>
                    <Text style={[styles.changeText, {
                      color: metric.changeType === 'increase' ? '#16A34A' : '#3B82F6'
                    }]}>
                      {metric.change}
                    </Text>
                  </View>
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Department Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Department Overview</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>🔍</Text>
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.departmentGrid}>
            {departmentStats.map((dept) => (
              <TouchableOpacity key={dept.id} style={[styles.departmentCard, {
                backgroundColor: dept.backgroundColor
              }]}>
                <View style={styles.departmentHeader}>
                  <View style={[styles.departmentIconContainer, {
                    backgroundColor: dept.color
                  }]}>
                    <Text style={styles.departmentIcon}>{dept.icon}</Text>
                  </View>
                  <Text style={styles.departmentTotal}>{dept.total}</Text>
                </View>
                
                <Text style={styles.departmentTitle}>{dept.title}</Text>
                
                <View style={styles.departmentStats}>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Pending</Text>
                    <Text style={[styles.statValue, { color: '#F97316' }]}>{dept.pending}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>In Progress</Text>
                    <Text style={[styles.statValue, { color: '#3B82F6' }]}>{dept.inProgress}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Resolved</Text>
                    <Text style={[styles.statValue, { color: '#16A34A' }]}>{dept.resolved}</Text>
                  </View>
                </View>
                
                <View style={styles.departmentFooter}>
                  <Text style={styles.resolutionLabel}>Resolution Rate</Text>
                  <Text style={[styles.resolutionRate, { color: dept.color }]}>
                    {Math.round((dept.resolved / dept.total) * 100)}%
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Complaints */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Complaints</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.complaintsContainer}>
            {recentComplaints.map((complaint) => (
              <TouchableOpacity key={complaint.id} style={styles.complaintCard}>
                <View style={styles.complaintHeader}>
                  <View style={styles.complaintIconContainer}>
                    <Text style={styles.complaintIcon}>{complaint.icon}</Text>
                  </View>
                  <View style={styles.complaintBadges}>
                    <View style={[styles.priorityBadge, {
                      backgroundColor: complaint.priorityBg
                    }]}>
                      <Text style={[styles.priorityText, {
                        color: complaint.priorityColor
                      }]}>
                        {complaint.priority}
                      </Text>
                    </View>
                    <View style={[styles.statusBadge, {
                      backgroundColor: complaint.statusBg
                    }]}>
                      <Text style={[styles.statusText, {
                        color: complaint.statusColor
                      }]}>
                        {complaint.status}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <Text style={styles.complaintTitle}>{complaint.title}</Text>
                
                <View style={styles.complaintDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>📍</Text>
                    <Text style={styles.detailText}>{complaint.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>📅</Text>
                    <Text style={styles.detailText}>{complaint.reportedTime}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>👥</Text>
                    <Text style={styles.detailText}>Assigned to: {complaint.assignedTo}</Text>
                  </View>
                </View>
                
                <View style={styles.complaintFooter}>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}>
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionTitle}>Assign New</Text>
              <Text style={styles.actionSubtitle}>Distribute reports to teams</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#16A34A' }]}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>Generate Report</Text>
              <Text style={styles.actionSubtitle}>Create performance analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F97316' }]}>
              <Text style={styles.actionIcon}>⚠️</Text>
              <Text style={styles.actionTitle}>Emergency Alerts</Text>
              <Text style={styles.actionSubtitle}>Handle priority issues</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerText: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    marginRight: 16,
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  filterIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  viewAllButton: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 20,
  },
  changeIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  departmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  departmentCard: {
    width: (width - 60) / 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  departmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  departmentIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  departmentTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  departmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  departmentStats: {
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  departmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resolutionLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  resolutionRate: {
    fontSize: 12,
    fontWeight: '600',
  },
  complaintsContainer: {
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
  complaintCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  complaintIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  complaintIcon: {
    fontSize: 16,
  },
  complaintBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  complaintTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  complaintDetails: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    fontSize: 12,
    marginRight: 8,
    width: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  complaintFooter: {
    alignItems: 'flex-end',
  },
  chevron: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  actionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
});

export default AdminDashboard;