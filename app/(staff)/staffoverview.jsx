import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const mockComplaints = [
  {
    id: '1',
    title: 'Pothole near Bus Stop',
    status: 'In Progress',
    date: '2025-06-24',
  },
  {
    id: '2',
    title: 'Overflowing Garbage',
    status: 'Pending',
    date: '2025-06-22',
  },
  {
    id: '3',
    title: 'Broken Drain Cover',
    status: 'Resolved',
    date: '2025-06-20',
  },
];

const staffoverview = () => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = useState(mockComplaints);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved':
        return { color: 'green' };
      case 'Pending':
        return { color: 'orange' };
      case 'In Progress':
        return { color: '#3498db' };
      default:
        return { color: 'gray' };
    }
  };

  const renderComplaint = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ComplaintDetail', { complaint: item })}
    >
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
      </View>
      <Text style={styles.cardDate}>📅 {item.date}</Text>
      <Text style={[styles.cardStatus, getStatusStyle(item.status)]}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>👋 Welcome, Staff Member</Text>
      <Text style={styles.subHeader}>Here's your complaint overview</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Assigned</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#3498db' }]}>
            {stats.inProgress}
          </Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: 'green' }]}>
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
        ListEmptyComponent={<Text style={styles.empty}>No complaints assigned.</Text>}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subHeader: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
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
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  cardDate: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4,
  },
  cardStatus: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#95A5A6',
  },
});

export default staffoverview;
