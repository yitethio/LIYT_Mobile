import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { mockJobs } from '@/data/mockData';

export default function JobDetailsScreen() {
    const params = useLocalSearchParams();
    const jobId = params.id as string;

    // Find job from mock data
    const job = mockJobs.find(j => j.id === jobId) || mockJobs[0];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Map Container with Overlays */}
                <View style={styles.mapContainer}>
                    {/* Map Placeholder */}
                    <View style={styles.mapPlaceholder}>
                        <IconSymbol name="map.fill" size={60} color={Colors.textMuted} />
                        <Text style={styles.mapPlaceholderText}>Map View</Text>
                        <Text style={styles.mapPlaceholderSubtext}>Route visualization coming soon</Text>
                    </View>

                    {/* Overlay Header - Back, Title, Share */}
                    <View style={styles.overlayHeader}>
                        <TouchableOpacity
                            style={styles.overlayButton}
                            onPress={() => router.back()}
                        >
                            <IconSymbol name="chevron.left" size={24} color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={styles.overlayTitle}>Job Details</Text>
                        <TouchableOpacity style={styles.overlayButton}>
                            <IconSymbol name="square.and.arrow.up" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </View>

                    {/* Stats Cards Floating Over Map */}
                    <View style={styles.floatingStatsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>Payout</Text>
                            <Text style={styles.statValue}>${job.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>Distance</Text>
                            <Text style={styles.statValue}>{job.distance.split(' ')[0]}</Text>
                            <Text style={styles.statUnit}>mi</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>Est. Time</Text>
                            <Text style={styles.statValue}>{job.estimatedTime.replace('~', '').replace(' min', '')}</Text>
                            <Text style={styles.statUnit}>min</Text>
                        </View>
                    </View>
                </View>

                {/* Route Timeline */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Route Timeline</Text>

                    {/* Pickup */}
                    <View style={styles.timelineItem}>
                        <View style={styles.timelineIconContainer}>
                            <View style={styles.pickupIconBg}>
                                <IconSymbol name="shippingbox.fill" size={20} color={Colors.accent} />
                            </View>
                        </View>
                        <View style={styles.timelineContent}>
                            <View style={styles.timelineHeader}>
                                <Text style={styles.timelineTitle}>
                                    Pickup: {job.pickupAddress}
                                </Text>
                                <View style={styles.readyBadge}>
                                    <Text style={styles.readyText}>Ready</Text>
                                </View>
                            </View>
                            <Text style={styles.timelineAddress}>
                                742 Market Street, San Francisco, CA
                            </Text>
                        </View>
                    </View>

                    {/* Timeline Line */}
                    <View style={styles.timelineLine} />

                    {/* Drop-off */}
                    <View style={styles.timelineItem}>
                        <View style={styles.timelineIconContainer}>
                            <View style={styles.dropoffIconBg}>
                                <IconSymbol name="mappin.circle.fill" size={20} color={Colors.white} />
                            </View>
                        </View>
                        <View style={styles.timelineContent}>
                            <View style={styles.timelineHeader}>
                                <Text style={styles.timelineTitle}>
                                    Drop-off: {job.dropoffAddress}
                                </Text>
                                <View style={styles.timeBadge}>
                                    <Text style={styles.timeText}>By 4:30 PM</Text>
                                </View>
                            </View>
                            <Text style={styles.timelineAddress}>
                                1240 12th Avenue, San Francisco, CA
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Package Information */}
                <View style={styles.section}>
                    <View style={styles.packageHeader}>
                        <IconSymbol name="info.circle.fill" size={20} color={Colors.accent} />
                        <Text style={styles.sectionTitle}>Package Information</Text>
                    </View>

                    <View style={styles.packageCard}>
                        <View style={styles.packageRow}>
                            <View style={styles.packageInfo}>
                                <Text style={styles.packageLabel}>Type</Text>
                                <Text style={styles.packageValue}>Electronics (Fragile)</Text>
                            </View>
                            <View style={styles.packageInfo}>
                                <Text style={styles.packageLabel}>Weight</Text>
                                <Text style={styles.packageValue}>4.5 lbs</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.driverNote}>
                            <Text style={styles.driverNoteLabel}>Driver Note</Text>
                            <Text style={styles.driverNoteText}>
                                "Please call upon arrival. Ring bell #302 at the main gate."
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Spacing */}
                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Accept Job Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => {
                        console.log('Job accepted:', jobId);
                        router.back();
                    }}
                >
                    <Text style={styles.acceptButtonText}>Accept Job</Text>
                    <IconSymbol name="arrow.right" size={24} color={Colors.secondary} />
                </TouchableOpacity>
            </View>
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
    mapContainer: {
        position: 'relative',
        height: 350,
    },
    mapPlaceholder: {
        height: 350,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPlaceholderText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginTop: 12,
    },
    mapPlaceholderSubtext: {
        fontSize: 14,
        color: Colors.textMuted,
        marginTop: 4,
    },
    overlayHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
        zIndex: 10,
    },
    overlayButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
    },
    overlayTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.white,
    },
    floatingStatsContainer: {
        position: 'absolute',
        bottom: -40,
        left: 16,
        right: 16,
        flexDirection: 'row',
        gap: 12,
        zIndex: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.secondary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.accent,
    },
    statUnit: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 60,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 16,
    },
    packageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    timelineItem: {
        flexDirection: 'row',
    },
    timelineIconContainer: {
        width: 40,
        alignItems: 'center',
    },
    pickupIconBg: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropoffIconBg: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.cardBg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timelineLine: {
        width: 2,
        height: 30,
        backgroundColor: Colors.border,
        marginLeft: 18,
        marginVertical: 4,
    },
    timelineContent: {
        flex: 1,
        marginLeft: 12,
    },
    timelineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    timelineTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
        flex: 1,
    },
    readyBadge: {
        backgroundColor: Colors.success + '20',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    readyText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.success,
    },
    timeBadge: {
        backgroundColor: Colors.fragile + '20',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.fragile,
    },
    timelineAddress: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 16,
    },
    packageCard: {
        backgroundColor: Colors.secondary,
        borderRadius: 12,
        padding: 16,
    },
    packageRow: {
        flexDirection: 'row',
        gap: 24,
    },
    packageInfo: {
        flex: 1,
    },
    packageLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 6,
    },
    packageValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 16,
    },
    driverNote: {},
    driverNoteLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 8,
    },
    driverNoteText: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
        fontStyle: 'italic',
    },
    footer: {
        padding: 20,
        backgroundColor: Colors.primary,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    acceptButton: {
        backgroundColor: Colors.accent,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 12,
    },
    acceptButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.secondary,
    },
});
