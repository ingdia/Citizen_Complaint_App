import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView
} from 'react-native';

// Vector Icons (you'll need to install react-native-vector-icons)
const Icon = ({ name, size = 24, color = '#000', style }) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <Text style={{ fontSize: size * 0.7, color }}>{getIconSymbol(name)}</Text>
  </View>
);

const getIconSymbol = (name) => {
  const icons = {
    'arrow-left': '←',
    'plus': '+',
    'search': '🔍',
    'more-vertical': '⋮',
    'users': '👥',
    'file-text': '📄',
    'trending-up': '📈',
    'edit': '✏️',
    'trash': '🗑️',
    'power': '⚡',
    'power-off': '⏻',
    'road': '🛣️',
    'trash-can': '🗑️',
    'utilities': '⚡',
    'shield': '🛡️'
  };
  return icons[name] || '•';
};

const DepartmentDashboard = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Roads & Infrastructure',
      description: 'Municipal roads, bridges, traffic',
      icon: '🛣️',
      status: 'Active',
      activeReports: 47,
      staffMembers: 12,
      resolutionRate: 89,
      manager: 'John Smith',
      lastUpdated: '2 hours ago',
      load: 'Normal'
    },
    {
      id: 2,
      name: 'Sanitation',
      description: 'Waste collection, recycling',
      icon: '🗑️',
      status: 'Active',
      activeReports: 31,
      staffMembers: 15,
      resolutionRate: 92,
      manager: 'Maria Garcia',
      lastUpdated: '5 min ago',
      load: 'Normal'
    },
    {
      id: 3,
      name: 'Utilities',
      description: 'Water, electricity, gas',
      icon: '⚡',
      status: 'Active',
      activeReports: 18,
      staffMembers: 10,
      resolutionRate: 96,
      manager: 'Mike Chen',
      lastUpdated: '30 min ago',
      load: 'Normal'
    },
    {
      id: 4,
      name: 'Public Safety',
      description: 'Emergency services, security',
      icon: '🛡️',
      status: 'Inactive',
      activeReports: 0,
      staffMembers: 0,
      resolutionRate: 0,
      manager: null,
      lastUpdated: '1 week ago',
      load: 'Inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    manager: ''
  });

  const activeDepts = departments.filter(d => d.status === 'Active').length;
  const inactiveDepts = departments.filter(d => d.status === 'Inactive').length;

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Active') return matchesSearch && dept.status === 'Active';
    if (activeTab === 'Inactive') return matchesSearch && dept.status === 'Inactive';
    return matchesSearch;
  });

  const openModal = (type, department = null) => {
    setModalType(type);
    setSelectedDepartment(department);
    setShowDropdown(null);
    
    if (type === 'edit' && department) {
      setFormData({
        name: department.name,
        description: department.description,
        icon: department.icon,
        manager: department.manager || ''
      });
    } else if (type === 'create') {
      setFormData({
        name: '',
        description: '',
        icon: '',
        manager: ''
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDepartment(null);
    setFormData({ name: '', description: '', icon: '', manager: '' });
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (modalType === 'create') {
      const newDept = {
        id: Date.now(),
        ...formData,
        status: 'Active',
        activeReports: 0,
        staffMembers: 0,
        resolutionRate: 0,
        lastUpdated: 'Just now',
        load: 'Normal'
      };
      setDepartments([...departments, newDept]);
    } else if (modalType === 'edit') {
      setDepartments(departments.map(dept => 
        dept.id === selectedDepartment.id 
          ? { ...dept, ...formData, lastUpdated: 'Just now' }
          : dept
      ));
    }
    
    closeModal();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Department',
      `Are you sure you want to delete "${selectedDepartment?.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDepartments(departments.filter(dept => dept.id !== selectedDepartment.id));
            closeModal();
          }
        }
      ]
    );
  };

  const toggleDepartmentStatus = (deptId) => {
    setDepartments(departments.map(dept => 
      dept.id === deptId 
        ? { 
            ...dept, 
            status: dept.status === 'Active' ? 'Inactive' : 'Active',
            lastUpdated: 'Just now',
            ...(dept.status === 'Active' ? { activeReports: 0, staffMembers: 0, resolutionRate: 0, load: 'Inactive' } : {})
          }
        : dept
    ));
    setShowDropdown(null);
  };

  const getLoadStyle = (load) => {
    switch (load) {
      case 'High': return { backgroundColor: '#FEF2F2', color: '#DC2626' };
      case 'Medium': return { backgroundColor: '#FFFBEB', color: '#D97706' };
      case 'Normal': return { backgroundColor: '#F0FDF4', color: '#16A34A' };
      default: return { backgroundColor: '#F9FAFB', color: '#6B7280' };
    }
  };

  const StatCard = ({ title, value, color = '#1F2937' }) => (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{title}</Text>
    </View>
  );

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
  );

  const DepartmentCard = ({ dept }) => (
    <View style={styles.departmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View style={styles.iconContainer}>
            <Text style={styles.departmentIcon}>{dept.icon}</Text>
          </View>
          <View style={styles.departmentInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <View style={[styles.statusBadge, 
                dept.status === 'Active' ? styles.activeBadge : styles.inactiveBadge]}>
                <Text style={[styles.statusText, 
                  dept.status === 'Active' ? styles.activeStatusText : styles.inactiveStatusText]}>
                  {dept.status}
                </Text>
              </View>
            </View>
            <Text style={styles.departmentDescription}>{dept.description}</Text>
          </View>
        </View>
        
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setShowDropdown(showDropdown === dept.id ? null : dept.id)}
          >
            <Icon name="more-vertical" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          {showDropdown === dept.id && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => openModal('edit', dept)}
              >
                <Icon name="edit" size={16} color="#374151" />
                <Text style={styles.dropdownText}>Edit Department</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => toggleDepartmentStatus(dept.id)}
              >
                <Icon name={dept.status === 'Active' ? 'power-off' : 'power'} size={16} color="#374151" />
                <Text style={styles.dropdownText}>
                  {dept.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setShowDropdown(null);
                  setTimeout(() => handleDelete(), 100);
                }}
              >
                <Icon name="trash" size={16} color="#DC2626" />
                <Text style={[styles.dropdownText, { color: '#DC2626' }]}>Delete Department</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{dept.activeReports}</Text>
          <Text style={styles.statLabel}>Active Reports</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#2563EB' }]}>{dept.staffMembers}</Text>
          <Text style={styles.statLabel}>Staff Members</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#16A34A' }]}>{dept.resolutionRate}%</Text>
          <Text style={styles.statLabel}>Resolution Rate</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.managerInfo}>
          <View style={styles.managerAvatar}>
            <Icon name="users" size={16} color="#6B7280" />
          </View>
          <View>
            <Text style={styles.managerName}>{dept.manager || 'No manager assigned'}</Text>
            <Text style={styles.lastUpdated}>Updated {dept.lastUpdated}</Text>
          </View>
        </View>
        
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Manage Staff</Text>
          </TouchableOpacity>
          <View style={[styles.loadIndicator, getLoadStyle(dept.load)]}>
            <View style={[styles.loadDot, { backgroundColor: getLoadStyle(dept.load).color }]} />
            <Text style={[styles.loadText, { color: getLoadStyle(dept.load).color }]}>
              {dept.load} Load
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Departments</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => openModal('create')}
          >
            <Icon name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <StatCard title="Total Departments" value={departments.length} />
          <StatCard title="Active" value={activeDepts} color="#16A34A" />
          <StatCard title="Inactive" value={inactiveDepts} color="#DC2626" />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search departments..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TabButton
            title={`All (${departments.length})`}
            isActive={activeTab === 'All'}
            onPress={() => setActiveTab('All')}
          />
          <TabButton
            title={`Active (${activeDepts})`}
            isActive={activeTab === 'Active'}
            onPress={() => setActiveTab('Active')}
          />
          <TabButton
            title={`Inactive (${inactiveDepts})`}
            isActive={activeTab === 'Inactive'}
            onPress={() => setActiveTab('Inactive')}
          />
        </View>

        {/* Department Cards */}
        <View style={styles.departmentsList}>
          {filteredDepartments.map(dept => (
            <DepartmentCard key={dept.id} dept={dept} />
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === 'create' && 'Add New Department'}
              {modalType === 'edit' && 'Edit Department'}
            </Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Department Name *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  placeholder="Enter department name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description *</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={formData.description}
                  onChangeText={(text) => setFormData({...formData, description: text})}
                  placeholder="Enter description"
                  placeholderTextColor="#9CA3AF"
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Icon (Emoji)</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.icon}
                  onChangeText={(text) => setFormData({...formData, icon: text})}
                  placeholder="🏛️"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Manager</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.manager}
                  onChangeText={(text) => setFormData({...formData, manager: text})}
                  placeholder="Enter manager name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>
                  {modalType === 'create' ? 'Create Department' : 'Save Changes'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  searchButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  departmentsList: {
    gap: 16,
    paddingBottom: 20,
  },
  departmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentIcon: {
    fontSize: 24,
  },
  departmentInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  departmentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#D1FAE5',
  },
  inactiveBadge: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeStatusText: {
    color: '#065F46',
  },
  inactiveStatusText: {
    color: '#6B7280',
  },
  departmentDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  dropdownContainer: {
    position: 'relative',
  },
  moreButton: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  managerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  managerAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  managerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '500',
  },
  loadIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  loadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  loadText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default DepartmentDashboard;