import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockComplaints = [
  {
    id: '1',
    title: 'Pothole near Bus Stop',
    description: 'Large pothole causing traffic issues and potential vehicle damage',
    status: 'In Progress',
    date: '2025-06-24',
    citizenName: 'John Doe',
    citizenPhone: '+250788123456',
    location: {
      latitude: -1.9441,
      longitude: 30.0619,
      address: 'KG 15 Ave, Kigali',
    },
    images: [
      'https://example.com/pothole1.jpg',
      'https://example.com/pothole2.jpg'
    ],
    priority: 'High',
    assignedTo: 'Roads Department',
  },
  {
    id: '2',
    title: 'Overflowing Garbage',
    description: 'Garbage bin overflowing for several days, causing hygiene issues',
    status: 'Pending',
    date: '2025-06-22',
    citizenName: 'Jane Smith',
    citizenPhone: '+250788654321',
    location: {
      latitude: -1.9706,
      longitude: 30.1044,
      address: 'KN 3 Rd, Kigali',
    },
    images: [
      'https://example.com/garbage1.jpg'
    ],
    priority: 'Medium',
    assignedTo: 'Sanitation Department',
  },
  {
    id: '3',
    title: 'Broken Drain Cover',
    description: 'Drain cover is broken and poses safety risk to pedestrians',
    status: 'Resolved',
    date: '2025-06-20',
    citizenName: 'Mike Johnson',
    citizenPhone: '+250788987654',
    location: {
      latitude: -1.9706,
      longitude: 30.1044,
      address: 'KG 9 Ave, Kigali',
    },
    images: [
      'https://example.com/drain1.jpg',
      'https://example.com/drain2.jpg'
    ],
    priority: 'High',
    assignedTo: 'Infrastructure Department',
  },
];

const StaffOverview = () => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  // Load complaints from AsyncStorage
  const loadComplaints = async () => {
    try {
      const savedComplaints = await AsyncStorage.getItem('staffComplaints');
      if (savedComplaints) {
        setComplaints(JSON.parse(savedComplaints));
      } else {
        // If no saved data, use mock data and save it
        setComplaints(mockComplaints);
        await saveComplaints(mockComplaints);
      }
    } catch (error) {
      console.error('Error loading complaints:', error);
      setComplaints(mockComplaints);
    } finally {
      setLoading(false);
    }
  };

  // Save complaints to AsyncStorage
  const saveComplaints = async (complaintsData) => {
    try {
      await AsyncStorage.setItem('staffComplaints', JSON.stringify(complaintsData));
    } catch (error) {
      console.error('Error saving complaints:', error);
    }
  };

  // Update complaint status
  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      const updatedComplaints = complaints.map(complaint =>
        complaint.id === complaintId
          ? { ...complaint, status: newStatus }
          : complaint
      );
      setComplaints(updatedComplaints);
      await saveComplaints(updatedComplaints);
      Alert.alert('Success', 'Complaint status updated successfully');
    } catch (error) {
      console.error('Error updating complaint status:', error);
      Alert.alert('Error', 'Failed to update complaint status');
    }
  };

  // Save location data
  const saveLocationData = async (complaintId, locationData) => {
    try {
      const locationKey = `location_${complaintId}`;
      await AsyncStorage.setItem(locationKey, JSON.stringify(locationData));
    } catch (error) {
      console.error('Error saving location data:', error);
    }
  };

  // Save image data
  const saveImageData = async (complaintId, imageUrls) => {
    try {
      const imageKey = `images_${complaintId}`;
      await AsyncStorage.setItem(imageKey, JSON.stringify(imageUrls));
    } catch (error) {
      console.error('Error saving image data:', error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return { color: '#27AE60', backgroundColor: '#E8F8F5' };
      case 'Pending':
        return { color: '#F39C12', backgroundColor: '#FEF9E7' };
      case 'In Progress':
        return { color: '#3498DB', backgroundColor: '#EBF5FB' };
      default:
        return { color: '#95A5A6', backgroundColor: '#F8F9FA' };
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return { color: '#E74C3C', backgroundColor: '#FADBD8' };
      case 'Medium':
        return { color: '#F39C12', backgroundColor: '#FEF9E7' };
      case 'Low':
        return { color: '#27AE60', backgroundColor: '#E8F8F5' };
      default:
        return { color: '#95A5A6', backgroundColor: '#F8F9FA' };
    }
  };

  const openLocationInMaps = (location) => {
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    // In a real app, you'd use Linking.openURL(url)
    Alert.alert('Location', `Opening: ${location.address}\nLat: ${location.latitude}, Lng: ${location.longitude}`);
  };

  const renderComplaint = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ComplaintDetail', { complaint: item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={[styles.priorityBadge, getPriorityStyle(item.priority)]}>
            <Text style={[styles.priorityText, { color: getPriorityStyle(item.priority).color }]}>
              {item.priority}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
      </View>

      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.cardInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={14} color="#7F8C8D" />
          <Text style={styles.infoText}>{item.citizenName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={14} color="#7F8C8D" />
          <Text style={styles.infoText}>{item.citizenPhone}</Text>
        </View>
        <TouchableOpacity 
          style={styles.infoRow}
          onPress={() => openLocationInMaps(item.location)}
        >
          <Ionicons name="location" size={14} color="#3498DB" />
          <Text style={[styles.infoText, { color: '#3498DB' }]}>
            {item.location.address}
          </Text>
        </TouchableOpacity>
      </View>

      {item.images && item.images.length > 0 && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Images ({item.images.length}):</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.images.map((imageUrl, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.thumbnailImage}
                  onError={() => console.log('Image failed to load:', imageUrl)}
                />
                <View style={styles.imageOverlay}>
                  <Ionicons name="image" size={20} color="#BDC3C7" />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.cardDate}>📅 {item.date}</Text>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={[styles.statusText, { color: getStatusStyle(item.status).color }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#3498DB' }]}
          onPress={() => updateComplaintStatus(item.id, 'In Progress')}
        >
          <Text style={styles.actionButtonText}>Start Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#27AE60' }]}
          onPress={() => updateComplaintStatus(item.id, 'Resolved')}
        >
          <Text style={styles.actionButtonText}>Mark Resolved</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    pending: complaints.filter(c => c.status === 'Pending').length,
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading complaints...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>👋 Welcome, Staff Member</Text>
        <Text style={styles.subHeader}>Here's your complaint overview</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadComplaints}
        >
          <Ionicons name="refresh" size={20} color="#3498DB" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Assigned</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#F39C12' }]}>
            {stats.pending}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#3498DB' }]}>
            {stats.inProgress}
          </Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#27AE60' }]}>
            {stats.resolved}
          </Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Assigned Complaints</Text>
      <FlatList
        data={complaints}
        renderItem={renderComplaint}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No complaints assigned.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFB',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subHeader: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  refreshButton: {
    padding: 8,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#7F8C8D',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 2,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 11,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#5D6D7E',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#7F8C8D',
    marginLeft: 6,
  },
  imageContainer: {
    marginBottom: 12,
  },
  imageLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    borderRadius: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#95A5A6',
    fontSize: 16,
  },
});

export default StaffOverview;