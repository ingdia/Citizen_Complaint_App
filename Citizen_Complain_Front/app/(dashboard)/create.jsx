import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const create = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [photos, setPhotos] = useState([]);

  const categories = [
    { id: 'road', name: 'Road Issues', icon: '🚧', color: '#FF4444' },
    { id: 'waste', name: 'Waste', icon: '🗑️', color: '#00C851' },
    { id: 'lighting', name: 'Lighting', icon: '💡', color: '#FFB300' },
    { id: 'safety', name: 'Safety', icon: '🛡️', color: '#2196F3' },
    { id: 'environment', name: 'Environment', icon: '🌿', color: '#9C27B0' },
    { id: 'parking', name: 'Parking', icon: '🚗', color: '#FF9800' },
  ];

  const priorityLevels = [
    { id: 'Low', label: 'Low - Not urgent', color: '#4CAF50' },
    { id: 'Medium', label: 'Medium - Needs attention', color: '#FF9800' },
    { id: 'High', label: 'High - Safety concern', color: '#F44336' },
  ];

  // Camera and Gallery Permissions
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera permission to take photos for issue reporting.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'This app needs gallery permission to select photos for issue reporting.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Image Picker Options
  const imagePickerOptions = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8,
  };

  // Show Action Sheet for Photo Selection
  const showImagePicker = () => {
    if (photos.length >= 5) {
      Alert.alert('Limit Reached', 'You can upload maximum 5 photos');
      return;
    }

    Alert.alert(
      'Select Photo',
      'Choose an option to add photo evidence',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // Open Camera
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos');
      return;
    }

    launchCamera(imagePickerOptions, (response) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const newPhoto = {
          id: Date.now().toString(),
          uri: response.assets[0].uri,
          fileName: response.assets[0].fileName || `photo_${Date.now()}.jpg`,
          fileSize: response.assets[0].fileSize,
          type: response.assets[0].type,
        };
        setPhotos([...photos, newPhoto]);
      }
    });
  };

  // Open Gallery
  const openGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Gallery permission is required to select photos');
      return;
    }

    launchImageLibrary(imagePickerOptions, (response) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const newPhoto = {
          id: Date.now().toString(),
          uri: response.assets[0].uri,
          fileName: response.assets[0].fileName || `photo_${Date.now()}.jpg`,
          fileSize: response.assets[0].fileSize,
          type: response.assets[0].type,
        };
        setPhotos([...photos, newPhoto]);
      }
    });
  };

  // Remove Photo
  const removePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  // Form Validation
  const validateForm = () => {
    if (!selectedCategory) {
      Alert.alert('Validation Error', 'Please select an issue category');
      return false;
    }
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title for the issue');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please provide a detailed description');
      return false;
    }
    if (!isAnonymous) {
      if (!contactInfo.name.trim()) {
        Alert.alert('Validation Error', 'Please enter your name');
        return false;
      }
      if (!contactInfo.email.trim()) {
        Alert.alert('Validation Error', 'Please enter your email address');
        return false;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactInfo.email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address');
        return false;
      }
    }
    return true;
  };

  // Submit Report
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Prepare report data
    const reportData = {
      category: selectedCategory,
      title: title.trim(),
      description: description.trim(),
      priority,
      isAnonymous,
      contactInfo: isAnonymous ? null : contactInfo,
      photos: photos.map(photo => ({
        uri: photo.uri,
        fileName: photo.fileName,
        type: photo.type,
      })),
      timestamp: new Date().toISOString(),
      location: {
        address: '123 Main Street, Downtown',
        coordinates: null, // You can add GPS coordinates here
      },
    };

    try {
      // Here you would typically send the data to your backend API
      console.log('Report Data:', reportData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Your report has been submitted successfully! You will receive updates on the progress.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              resetForm();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again.');
      console.error('Submit error:', error);
    }
  };

  // Reset Form
  const resetForm = () => {
    setSelectedCategory('');
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setIsAnonymous(true);
    setContactInfo({ name: '', email: '', phone: '' });
    setPhotos([]);
  };

  // Save Draft
  const saveDraft = () => {
    const draftData = {
      selectedCategory,
      title,
      description,
      priority,
      isAnonymous,
      contactInfo,
      photos,
      savedAt: new Date().toISOString(),
    };
    
    // Here you would save to local storage or send to backend
    console.log('Draft saved:', draftData);
    Alert.alert('Draft Saved', 'Your report has been saved as draft');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveDraft}>
          <Text style={styles.saveText}>Save Draft</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Issue Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Category *</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Issue Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Brief description of the issue"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
              maxLength={100}
            />
            <Text style={styles.charCount}>{title.length}/100</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Provide detailed information about the issue..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
              maxLength={500}
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          <View style={styles.locationCard}>
            <View style={styles.locationInfo}>
              <Text style={styles.locationIcon}>📍</Text>
              <View>
                <Text style={styles.locationTitle}>Current Location</Text>
                <Text style={styles.locationAddress}>123 Main Street, Downtown</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapButtonText}>Select on Map</Text>
          </TouchableOpacity>
        </View>

        {/* Photo Evidence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo Evidence ({photos.length}/5)</Text>
          
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.addPhotoButton} onPress={showImagePicker}>
              <Text style={styles.addPhotoIcon}>📷</Text>
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            
            {photos.map((photo) => (
              <View key={photo.id} style={styles.photoItem}>
                <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                <TouchableOpacity
                  style={styles.removePhoto}
                  onPress={() => removePhoto(photo.id)}
                >
                  <Text style={styles.removePhotoText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={styles.photoHint}>
            📸 Tip: Clear photos help us understand and resolve issues faster
          </Text>
        </View>

        {/* Priority Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Level</Text>
          
          {priorityLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={styles.priorityOption}
              onPress={() => setPriority(level.id)}
            >
              <View style={styles.radioButton}>
                <View style={[
                  styles.radioInner,
                  priority === level.id && { backgroundColor: level.color }
                ]} />
              </View>
              <View style={[styles.priorityDot, { backgroundColor: level.color }]} />
              <Text style={styles.priorityText}>{level.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <View style={styles.contactHeader}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TouchableOpacity
              style={styles.anonymousToggle}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <View style={[styles.checkbox, isAnonymous && styles.checkedBox]}>
                {isAnonymous && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.anonymousText}>Anonymous</Text>
            </TouchableOpacity>
          </View>

          {!isAnonymous && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Your Name *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  value={contactInfo.name}
                  onChangeText={(text) => setContactInfo({...contactInfo, name: text})}
                  placeholderTextColor="#999"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email address"
                  value={contactInfo.email}
                  onChangeText={(text) => setContactInfo({...contactInfo, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number (Optional)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your phone number"
                  value={contactInfo.phone}
                  onChangeText={(text) => setContactInfo({...contactInfo, phone: text})}
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
              </View>
            </>
          )}

          {isAnonymous && (
            <View style={styles.anonymousNote}>
              <Text style={styles.anonymousNoteText}>
                📝 Your report will be submitted anonymously. You won't receive direct updates, 
                but you can check the status using the report ID that will be provided.
              </Text>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your report will be reviewed and assigned to the appropriate department. 
          You will receive a confirmation with a tracking ID.
        </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    padding: 5,
  },
  saveText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategory: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  textArea: {
    height: 100,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  locationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  locationAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  changeButton: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  mapIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  mapButtonText: {
    fontSize: 14,
    color: '#666',
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 10,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#666',
  },
  photoItem: {
    position: 'relative',
  },
  photoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  removePhoto: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photoHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 14,
    color: '#333',
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  anonymousText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  anonymousNote: {
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  anonymousNoteText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 15,
    lineHeight: 18,
  },
});

export default create;