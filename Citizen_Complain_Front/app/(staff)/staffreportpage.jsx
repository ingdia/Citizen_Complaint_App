import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

const staffreportpage = ({ route }) => {
  // Use real data from navigation params if available
  const complaint = route?.params?.complaint || {
    id: '1',
    title: 'Pothole near school',
    description: 'There is a large pothole that causes traffic issues and is dangerous for pedestrians.',
    status: 'Pending',
    date: '2025-06-23',
    media: 'https://via.placeholder.com/300x200.png?text=Complaint+Image',
    reporter: {
      name: 'John Doe',
      email: 'john.doe@email.com',
    }
  };

  const [status, setStatus] = useState(complaint.status);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    Alert.alert('Status Updated', `Complaint marked as "${newStatus}"`);
    // TODO: Call your backend API here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{complaint.title}</Text>
      <Text style={styles.subText}>Submitted on {complaint.date}</Text>

      <Image source={{ uri: complaint.media }} style={styles.image} />

      <Text style={styles.label}>Description</Text>
      <Text style={styles.description}>{complaint.description}</Text>

      <View style={styles.reporterBox}>
        <Text style={styles.label}>Reporter Info</Text>
        <Text style={styles.info}>👤 {complaint.reporter.name}</Text>
        <Text style={styles.info}>📧 {complaint.reporter.email}</Text>
      </View>

      <Text style={styles.label}>Current Status</Text>
      <Text style={[styles.status, status === 'Resolved' ? styles.resolved : status === 'In Progress' ? styles.progress : styles.pending]}>
        {status}
      </Text>

      <Text style={styles.label}>Update Status</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonBlue} onPress={() => updateStatus('In Progress')}>
          <Text style={styles.buttonText}>Mark In Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonGreen} onPress={() => updateStatus('Resolved')}>
          <Text style={styles.buttonText}>Mark Resolved</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default staffreportpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  reporterBox: {
    backgroundColor: '#F2F3F4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  resolved: {
    color: 'green',
  },
  progress: {
    color: '#3498DB',
  },
  pending: {
    color: 'orange',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonBlue: {
    flex: 1,
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },
  buttonGreen: {
    flex: 1,
    backgroundColor: '#2ECC71',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 
