import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, ScrollView, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'
import { Animated } from 'react-native'

import Spacer from '../components/Spacer'

const { width, height } = Dimensions.get('window')

const HOME = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="white" />
      
      {/* Animated Background */}
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={['white', 'white', '#c2e8ff']}
          style={styles.backgroundGradient}
        />
        
       
      
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Skip Button */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* App Icon with Glow Effect */}
          <View style={styles.appIconContainer}>
            <View style={styles.iconGlow}>
              <LinearGradient
                colors={['#00d2ff', '#3a7bd5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.appIcon}
              >
                <FontAwesome5 name="flag" size={36} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </View>
          
          <Spacer height={30} />
          
          {/* Title with Enhanced Typography */}
          <View style={styles.titleContainer}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <LinearGradient
              colors={['#00d2ff', '#3a7bd5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleGradient}
            >
              <Text style={styles.mainTitle}>CitizenReport</Text>
            </LinearGradient>
            
            <Spacer height={20} />
            
            <Text style={styles.description}>
              Transform your community with the power of your voice. 
              Report issues, track progress, and make a real difference 
              in your neighborhood.
            </Text>
          </View>
        </Animated.View>

        {/* Statistics Section */}
        <Animated.View 
          style={[
            styles.statsSection,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Reports Filed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Issues Resolved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
          </View>
        </Animated.View>

        {/* Features Section with Enhanced Cards */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose CitizenReport?</Text>
          
          <Spacer height={24} />
          
          <View style={styles.featureItem}>
            <LinearGradient
              colors={['#ff9a9e', '#fecfef']}
              style={styles.featureIconGradient}
            >
              <Ionicons name="camera" size={28} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Photo Evidence</Text>
              <Text style={styles.featureDescription}>
                Capture clear photos to document issues and provide visual proof
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <LinearGradient
              colors={['#a8edea', '#fed6e3']}
              style={styles.featureIconGradient}
            >
              <Ionicons name="location" size={28} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Location</Text>
              <Text style={styles.featureDescription}>
                Automatic GPS tagging ensures precise location identification
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <LinearGradient
              colors={['#ffecd2', '#fcb69f']}
              style={styles.featureIconGradient}
            >
              <MaterialIcons name="update" size={28} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Live Tracking</Text>
              <Text style={styles.featureDescription}>
                Get real-time updates on your report status and resolution progress
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <LinearGradient
              colors={['#a8c8ec', '#7d8dc1']}
              style={styles.featureIconGradient}
            >
              <AntDesign name="team" size={28} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Community Impact</Text>
              <Text style={styles.featureDescription}>
                Join thousands of citizens making their communities better
              </Text>
            </View>
          </View>
        </View>

        {/* Call to Action Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Make a Difference?</Text>
          <Text style={styles.ctaSubtitle}>
            Join the movement of active citizens improving their communities
          </Text>
          
          <Spacer height={32} />
          
          <Link href="/register" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <LinearGradient
                colors={['#00d2ff', '#3a7bd5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.primaryButtonText}>Get Started Free</Text>
                <AntDesign name="arrowright" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </Link>
          
          <Spacer height={16} />
          
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Already have an account?</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
          
          <Spacer height={20} />
          
          <Text style={styles.copyrightText}>
            © 2024 CitizenReport. Making communities better, one report at a time.
          </Text>
        </View>

        <Spacer height={40} />
      </ScrollView>

     
      {__DEV__ && (
        <View style={styles.devPanel}>
          <TouchableOpacity style={styles.devToggle}>
            <Text style={styles.devText}>DEV</Text>
          </TouchableOpacity>
          <View style={styles.devLinks}>
            <Link href="/AdminDashBoard" style={styles.devLink}>
              <Text style={styles.devLinkText}>Admin</Text>
            </Link>
            <Link href="/home" style={styles.devLink}>
              <Text style={styles.devLinkText}>user</Text>
            </Link>
            <Link href="/staff" style={styles.devLink}>
              <Text style={styles.devLinkText}>Staff</Text>
            </Link>
          </View>
        </View>
        
      )}
    </View>
  )
}

export default HOME

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  
  backgroundGradient: {
    flex: 1,
  },
  
 
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: '#00d2ff',
    top: height * 0.05,
    right: -80,
  },
  
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: '#3a7bd5',
    top: height * 0.4,
    left: -60,
  },
  
  circle3: {
    width: 120,
    height: 120,
    backgroundColor: '#ff9a9e',
    bottom: height * 0.2,
    right: width * 0.1,
  },
  
  floatingRect: {
    position: 'absolute',
    borderRadius: 30,
    opacity: 0.08,
  },
  
  rect1: {
    width: 160,
    height: 80,
    backgroundColor: '#fecfef',
    top: height * 0.25,
    right: width * 0.2,
    transform: [{ rotate: '15deg' }],
  },
  
  rect2: {
    width: 140,
    height: 140,
    backgroundColor: '#a8edea',
    bottom: height * 0.35,
    left: width * 0.05,
    transform: [{ rotate: '-20deg' }],
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  
  topBar: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  skipText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
  },
  
  heroSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  
  appIconContainer: {
    alignItems: 'center',
  },
  
  iconGlow: {
    shadowColor: '#00d2ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  titleContainer: {
    alignItems: 'center',
  },
  
  welcomeText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: '400',
    opacity: 0.8,
    marginBottom: 8,
  },
  
  titleGradient: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  
  mainTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  
  description: {
    fontSize: 17,
    color: 'gray',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
    opacity: 0.85,
    paddingHorizontal: 10,
  },
  
  statsSection: {
    marginBottom: 50,
  },
  
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#c2e8ff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backdropFilter: 'blur(10px)',
  },
  
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#00d2ff',
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 14,
    color: 'gray',
    opacity: 0.7,
    textAlign: 'center',
  },
  
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  
  featuresSection: {
    marginBottom: 60,
  },
  
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'gray',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c2e8ff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c2e8ff',
    backdropFilter: 'blur(10px)',
  },
  
  featureIconGradient: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  
  featureContent: {
    flex: 1,
  },
  
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 6,
  },
  
  featureDescription: {
    fontSize: 15,
    color: 'gray',
    opacity: 0.7,
    lineHeight: 22,
  },
  
  ctaSection: {
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  
  ctaTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '',
    textAlign: 'center',
    marginBottom: 12,
  },
  
  ctaSubtitle: {
    fontSize: 16,
    color: 'gray',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  primaryButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00d2ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  
  gradientButton: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
  buttonIcon: {
    marginLeft: 8,
  },
  
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#c2e8ff',
  },
  
  secondaryButtonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  termsText: {
    fontSize: 13,
    color: 'gray',
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  linkText: {
    color: '#00d2ff',
    fontWeight: '500',
  },
  
  copyrightText: {
    fontSize: 12,
    color: 'gray',
    opacity: 0.5,
    textAlign: 'center',
  },
  
  // Development Panel
  devPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  devToggle: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  
  devText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  
  devLinks: {
    flexDirection: 'row',
  },
  
  devLink: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  
  devLinkText: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.7,
  },
})