import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Colors } from '@/constants/theme';
import { mockDriverProfile, mockTransactions } from '@/data/mockData';

export default function MyJobsScreen() {
    const completedJobs = mockTransactions.filter(t => t.type === 'earning');

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                userName={mockDriverProfile.name}
                onNotificationPress={() => console.log('Notifications')}
                onMenuPress={() => console.log('Menu')}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>My Jobs</Text>
                <Text style={styles.subtitle}>
                    {completedJobs.length} completed deliveries
                </Text>

                {/* Job History */}
                <View style={styles.jobsList}>
                    {completedJobs.map((job) => {
                        const date = new Date(job.date);
                        return (
                            <View key={job.id} style={styles.jobCard}>
                                <View style={styles.jobHeader}>
                                    <View>
                                        <Text style={styles.jobDate}>
                                            {date.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </Text>
                                        <Text style={styles.jobDescription}>{job.description}</Text>
                                    </View>
                                    <View style={styles.earningsContainer}>
                                        <Text style={styles.earningsAmount}>
                                            +${job.amount.toFixed(2)}
                                        </Text>
                                        <View style={styles.statusBadge}>
                                            <Text style={styles.statusText}>{job.status}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.white,
        marginTop: 24,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 24,
    },
    jobsList: {
        paddingBottom: 100,
    },
    jobCard: {
        backgroundColor: Colors.secondary,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    jobDate: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    jobDescription: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '500',
    },
    earningsContainer: {
        alignItems: 'flex-end',
    },
    earningsAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.accent,
        marginBottom: 6,
    },
    statusBadge: {
        backgroundColor: Colors.success + '20',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        color: Colors.success,
        fontWeight: '600',
    },
});
