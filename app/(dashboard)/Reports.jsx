import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 13;

  const statsData = [
    { number: '23', label: 'Total', color: '#007AFF' },
    { number: '5', label: 'Pending', color: '#FF3B30' },
    { number: '7', label: 'Progress', color: '#FF9500' },
    { number: '11', label: 'Resolved', color: '#34C759' },
  ];

  const reportsData = [
    {
      id: 'RP2024001',
      title: 'Large pothole on Main Street',
      date: 'Jan 15, 2024 at 2:30 PM',
      status: 'In Progress',
      views: 12,
      icon: '🕳️',
      statusColor: '#FF9500',
    },
    {
      id: 'RP2024002',
      title: 'Overflowing garbage bin',
      date: 'Jan 14, 2024 at 9:15 AM',
      status: 'Resolved',
      views: 8,
      icon: '🗑️',
      statusColor: '#34C759',
    },
    {
      id: 'RP2024003',
      title: 'Broken street light on Oak Avenue',
      date: 'Jan 13, 2024 at 7:45 PM',
      status: 'Pending',
      views: 5,
      icon: '💡',
      statusColor: '#FF3B30',
    },
    {
      id: 'RP2024004',
      title: 'Noise complaint - Construction',
      date: 'Jan 12, 2024 at 11:20 AM',
      status: 'Resolved',
      views: 15,
      icon: '🔊',
      statusColor: '#34C759',
    },
    {
      id: 'RP2024005',
      title: 'Fallen tree blocking sidewalk',
      date: 'Jan 11, 2024 at 4:10 PM',
      status: 'In Progress',
      views: 22,
      icon: '🌳',
      statusColor: '#FF9500',
    },
    {
      id: 'RP2024006',
      title: 'Illegal parking on corner',
      date: 'Jan 10, 2024 at 8:30 PM',
      status: 'Pending',
      views: 9,
      icon: '🚗',
      statusColor: '#FF3B30',
    },
  ];

  const tabs = ['All', 'Pending', 'In Progress', 'Resolved'];

  const filteredReports = activeTab === 'All' 
    ? reportsData 
    : reportsData.filter(report => report.status === activeTab);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>My Reports</Text>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabButton,
            activeTab === tab && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStatsCards = () => (
    <View style={styles.statsContainer}>
      {statsData.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <Text style={[styles.statNumber, { color: stat.color }]}>
            {stat.number}
          </Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderReportItem = (report) => (
    <View key={report.id} style={styles.reportItem}>
      <View style={styles.reportIcon}>
        <Text style={styles.iconText}>{report.icon}</Text>
      </View>
      <View style={styles.reportContent}>
        <Text style={styles.reportTitle}>{report.title}</Text>
        <Text style={styles.reportId}>ID: #{report.id}</Text>
        <Text style={styles.reportDate}>Submitted: {report.date}</Text>
        <View style={styles.reportFooter}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: report.statusColor },
            ]}
          >
            <Text style={styles.statusText}>{report.status}</Text>
          </View>
          <View style={styles.viewsContainer}>
            <Text style={styles.viewsIcon}>👁️</Text>
            <Text style={styles.viewsText}>{report.views} views</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreIcon}>⋯</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
        onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationArrow}>‹</Text>
      </TouchableOpacity>
      
      <Text style={styles.paginationText}>
        {currentPage} / {totalPages}
      </Text>
      
      <TouchableOpacity
        style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
        onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.paginationArrow}>›</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderHeader()}
      {renderTabs()}
      {renderStatsCards()}
      
      <ScrollView style={styles.reportsContainer} showsVerticalScrollIndicator={false}>
        {filteredReports.map(renderReportItem)}
        {renderPagination()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    padding: 8,
    marginRight: 8,
  },
  searchIcon: {
    fontSize: 16,
    color: '#666',
  },
  filterButton: {
    padding: 8,
  },
  filterIcon: {
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  reportsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  reportItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reportId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  reportDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  viewsText: {
    fontSize: 12,
    color: '#666',
  },
  moreButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    fontSize: 16,
    color: '#666',
    transform: [{ rotate: '90deg' }],
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  paginationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
  },
  paginationArrow: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  paginationText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 16,
    fontWeight: '500',
  },
});

export default Reports;