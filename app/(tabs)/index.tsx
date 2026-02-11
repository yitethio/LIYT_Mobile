import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { StatsCard } from '@/components/StatsCard';
import { JobCard } from '@/components/JobCard';
import { Colors } from '@/constants/theme';
import { mockJobs, mockDriverStats, mockDriverProfile } from '@/data/mockData';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'available' | 'current'>('available');

  const availableJobs = mockJobs.filter(job => job.status === 'available');
  const currentJobs = mockJobs.filter(job => job.status === 'current');

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        userName={mockDriverProfile.name}
        onNotificationPress={() => console.log('Notifications')}
        onMenuPress={() => console.log('Menu')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatsCard
            title="Today's Earnings"
            value={`$${mockDriverStats.todayEarnings.toFixed(2)}`}
          />
          <View style={styles.statsGap} />
          <StatsCard
            title="Online Time"
            value={mockDriverStats.onlineTime}
          />
        </View>

        {/* Available / Current Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'available' && styles.activeTab]}
            onPress={() => setActiveTab('available')}
          >
            <Text style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}>
              Available
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'current' && styles.activeTab]}
            onPress={() => setActiveTab('current')}
          >
            <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
              Current
            </Text>
          </TouchableOpacity>
        </View>

        {/* Jobs List */}
        <View style={styles.jobsSection}>
          <Text style={styles.sectionTitle}>
            Nearby Offers ({activeTab === 'available' ? availableJobs.length : currentJobs.length})
          </Text>

          {activeTab === 'available' && availableJobs.map((job) => (
            <JobCard
              key={job.id}
              jobId={job.id}
              pickupLocation={job.pickupLocation}
              pickupAddress={job.pickupAddress}
              dropoffLocation={job.dropoffLocation}
              dropoffAddress={job.dropoffAddress}
              distance={job.distance}
              estimatedTime={job.estimatedTime}
              price={job.price}
              tags={job.tags}
              onPress={() => console.log('Job pressed:', job.id)}
            />
          ))}

          {activeTab === 'current' && currentJobs.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No current jobs</Text>
              <Text style={styles.emptyStateSubtext}>
                Browse available jobs to get started
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  statsGap: {
    width: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.accent,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.secondary,
  },
  jobsSection: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

