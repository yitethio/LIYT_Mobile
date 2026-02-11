import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { mockJobs } from '@/data/mockData';

export default function JobDetailsScreen() {
    const params = useLocalSearchParams();
    const jobId = params.id as string;

    // Find job from mock data
    const job = mockJobs.find(j => j.id === jobId) || mockJobs[0];

    // Mock coordinates for demo (San Francisco area)
    const driverLocation = { latitude: 37.7749, longitude: -122.4194 };
    const pickupLocation = { latitude: 37.7858, longitude: -122.4065 }; // ~Market St
    const dropoffLocation = { latitude: 37.7648, longitude: -122.4630 }; // ~Sunset

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Map Container with Overlays */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.7750,
                            longitude: -122.4400,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        provider={undefined} // Uses Apple Maps on iOS, Google Maps on Android
                    >
                        <Polyline
                            coordinates={[driverLocation, pickupLocation, dropoffLocation]}
                            strokeColor={Colors.accent}
                            strokeWidth={4}
                        />

                        <Marker coordinate={driverLocation} title="You">
                            <View style={styles.markerDriver}>
                                <IconSymbol name="car.fill" size={16} color={Colors.secondary} />
                            </View>
                        </Marker>

                        <Marker coordinate={pickupLocation} title="Pickup">
                            <View style={styles.markerPickup}>
                                <IconSymbol name="shippingbox.fill" size={16} color={Colors.secondary} />
                            </View>
                        </Marker>

                        <Marker coordinate={dropoffLocation} title="Drop-off">
                            <View style={styles.markerDropoff}>
                                <IconSymbol name="mappin.circle.fill" size={16} color={Colors.white} />
                            </View>
                        </Marker>
                    </MapView>

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
        </View>
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerDriver: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    markerPickup: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.secondary,
    },
    markerDropoff: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    overlayHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 40, // Absolute minimum
        paddingBottom: 8,
        zIndex: 10,
        backgroundColor: 'rgba(24, 24, 27, 0.85)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
    },
    overlayButton: {
        width: 36, // Smaller buttons
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 18,
    },
    overlayTitle: {
        fontSize: 18, // Slightly smaller text
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
        zIndex: 100,
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
