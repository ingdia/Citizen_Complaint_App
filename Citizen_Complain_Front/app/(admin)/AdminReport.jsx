import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const AdminReport = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [activeDepartment, setActiveDepartment] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const reports = [
    {
      id: 'CR-2024-001',
      title: 'Large pothole blocking traffic',
      description: 'Main Street intersection causing major delays during rush hour. Multiple vehicles damaged.',
      priority: 'High Priority',
      department: 'Roads',
      status: 'New',
      reporter: 'Sarah Johnson',
      timeAgo: '15 min ago',
      location: 'Main St & 5th Ave',
      photos: 3,
      assignedTo: null,
    },
    {
      id: 'CR-2024-002',
      title: 'Streetlight not working',
      description: 'Oak Avenue near the park entrance has been dark for 3 days. Safety concern for pedestrians.',
      priority: 'Medium',
      department: 'Utilities',
      status: 'Assigned',
      reporter: 'Mike Chen',
      timeAgo: '2 hours ago',
      location: 'Oak Ave & Park Dr',
      photos: 1,
      assignedTo: 'John Smith',
    },
    {
      id: 'CR-2024-003',
      title: 'Missed garbage collection',
      description: 'Elm Street residents reported missed pickup on Tuesday. Rescheduled for Friday.',
      priority: 'Low',
      department: 'Sanitation',
      status: 'Resolved',
      reporter: 'David Wilson',
      timeAgo: '1 day ago',
      location: 'Elm Street',
      photos: 0,
      assignedTo: 'Maria Garcia',
      completedBy: 'Maria Garcia',
    },
    {
      id: 'CR-2024-004',
      title: 'Broken playground equipment',
      description: 'Swing set chain broken at Central Park. Child safety hazard needs immediate attention.',
      priority: 'High Priority',
      department: 'Parks',
      status: 'New',
      reporter: 'Lisa Rodriguez',
      timeAgo: '3 hours ago',
      location: 'Central Park',
      photos: 2,
      assignedTo: null,
    },
    {
      id: 'CR-2024-005',
      title: 'Water leak on Pine Street',
      description: 'Small water leak near fire hydrant causing water waste and potential ice formation.',
      priority: 'Medium',
      department: 'Water',
      status: 'In Progress',
      reporter: 'Robert Kim',
      timeAgo: '5 hours ago',
      location: 'Pine St & 3rd Ave',
      photos: 0,
      video: 1,
      assignedTo: 'Team B',
    },
  ];

  const tabs = [
    { name: 'All', count: 228 },
    { name: 'New', count: 47 },
    { name: 'Assigned', count: 23 },
    { name: 'In Progress', count: 15 },
  ];

  const departments = [
    'All Departments',
    'Roads',
    'Utilities',
    'Sanitation',
    'Parks',
    'Water',
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High Priority':
        return '#FF4444';
      case 'Medium':
        return '#FFA500';
      case 'Low':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return '#2196F3';
      case 'Assigned':
        return '#FF9800';
      case 'In Progress':
        return '#9C27B0';
      case 'Resolved':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  // Enhanced filtering logic
  const filteredReports = reports.filter(report => {
    const matchesTab = activeTab === 'All' || report.status === activeTab;
    const matchesDepartment = activeDepartment === 'All Departments' || report.department === activeDepartment;
    const matchesSearch = searchQuery === '' || 
                         report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesDepartment && matchesSearch;
  });

  // Button handlers
  const handleBackPress = () => {
    Alert.alert('Back', 'Going back to previous screen');
  };

  const handleFilterPress = () => {
    Alert.alert('Filter', 'Advanced filter options');
  };

  const handleSearchPress = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  const handleAssignPress = (reportId, currentAssignee) => {
    const action = currentAssignee ? 'Reassign' : 'Assign';
    Alert.alert(
      `${action} Report`,
      `${action} report ${reportId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action, onPress: () => console.log(`${action} ${reportId}`) }
      ]
    );
  };

  const handleViewDetails = (reportId) => {
    Alert.alert('View Details', `Opening details for ${reportId}`);
  };

  const handleMorePress = (reportId) => {
    Alert.alert(
      'Report Actions',
      `Actions for ${reportId}`,
      [
        { text: 'Edit', onPress: () => console.log('Edit', reportId) },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete', reportId) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleLoadMore = () => {
    Alert.alert('Load More', 'Loading more reports...');
  };

  const ReportCard = ({ report }) => (
    <View style={[styles.reportCard, { borderLeftColor: getPriorityColor(report.priority) }]}>
      <View style={styles.reportHeader}>
        <View style={styles.priorityBadge}>
          <Text style={[styles.priorityText, { color: getPriorityColor(report.priority) }]}>
            {report.priority}
          </Text>
        </View>
        <Text style={styles.departmentText}>{report.department}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
          <Text style={styles.statusText}>{report.status}</Text>
        </View>
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => handleMorePress(report.id)}
          activeOpacity={0.7}
        >
          <Icon name="more-vert" size={20} color="#757575" />
        </TouchableOpacity>
      </View>

      <Text style={styles.reportId}>{report.id}: {report.title}</Text>
      <Text style={styles.reportDescription}>{report.description}</Text>

      <View style={styles.reportFooter}>
        <View style={styles.reporterInfo}>
          <Icon name="person" size={16} color="#757575" />
          <Text style={styles.reporterText}>{report.reporter}</Text>
        </View>
        <View style={styles.timeInfo}>
          <Icon name="access-time" size={16} color="#757575" />
          <Text style={styles.timeText}>{report.timeAgo}</Text>
        </View>
        <View style={styles.locationInfo}>
          <Icon name="location-on" size={16} color="#757575" />
          <Text style={styles.locationText}>{report.location}</Text>
        </View>
      </View>

      {report.assignedTo && (
        <View style={styles.assignedInfo}>
          <Text style={styles.assignedText}>
            {report.status === 'Resolved' ? 'Completed by' : 'Assigned to'} {report.assignedTo}
          </Text>
        </View>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={styles.assignButton}
          onPress={() => handleAssignPress(report.id, report.assignedTo)}
          activeOpacity={0.8}
        >
          <Text style={styles.assignButtonText}>
            {report.assignedTo ? 'Reassign' : 'Assign'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => handleViewDetails(report.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
        <View style={styles.mediaInfo}>
          {report.photos > 0 && (
            <View style={styles.mediaItem}>
              <Icon name="photo" size={16} color="#757575" />
              <Text style={styles.mediaText}>{report.photos} photo{report.photos > 1 ? 's' : ''}</Text>
            </View>
          )}
          {report.video > 0 && (
            <View style={styles.mediaItem}>
              <Icon name="videocam" size={16} color="#757575" />
              <Text style={styles.mediaText}>{report.video} video</Text>
            </View>
          )}
          {report.status === 'Resolved' && (
            <View style={styles.resolvedIcon}>
              <Icon name="check-circle" size={16} color="#4CAF50" />
              <Text style={[styles.mediaText, { color: '#4CAF50' }]}>Resolved</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Reports</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={handleFilterPress}
            activeOpacity={0.7}
          >
            <Feather name="filter" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearchPress}
            activeOpacity={0.7}
          >
            <Icon name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conditional Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reports..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Icon name="clear" size={20} color="#757575" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Compact Status Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.tabContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tab,
                activeTab === tab.name && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.name)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.name && styles.activeTabText
              ]}>
                {tab.name} ({tab.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Department Filter */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterContent}
        >
          {departments.map((dept, index) => (
            <TouchableOpacity
              key={dept}
              style={[
                styles.filterChip,
                activeDepartment === dept && styles.activeFilterChip,
                index === 0 && styles.firstFilterChip
              ]}
              onPress={() => setActiveDepartment(dept)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.filterChipText,
                activeDepartment === dept && styles.activeFilterChipText
              ]}>
                {dept}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} found
        </Text>
      </View>

      {/* Reports List */}
      <ScrollView style={styles.reportsList} showsVerticalScrollIndicator={false}>
        {filteredReports.length > 0 ? (
          <>
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
            
            <TouchableOpacity 
              style={styles.loadMoreButton}
              onPress={handleLoadMore}
              activeOpacity={0.8}
            >
              <Text style={styles.loadMoreText}>Load More Reports</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Icon name="search-off" size={48} color="#ccc" />
            <Text style={styles.noResultsText}>No reports found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginLeft: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
  },
  // Improved Tab Styles - More Compact
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  // Filter Styles
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstFilterChip: {
    marginLeft: 0,
  },
  activeFilterChip: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  filterChipText: {
    fontSize: 12,
    color: '#495057',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeFilterChipText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
  },
  resultsCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  reportsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 6,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    marginRight: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  departmentText: {
    fontSize: 11,
    color: '#666',
    marginRight: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  moreButton: {
    marginLeft: 'auto',
    padding: 4,
  },
  reportId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  reporterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  reporterText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  assignedInfo: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  assignedText: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  assignButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  assignButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailsButtonText: {
    color: '#666',
    fontSize: 12,
  },
  mediaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  mediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  mediaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  resolvedIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  loadMoreButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadMoreText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});

export default AdminReport;