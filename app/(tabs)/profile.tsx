import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { mockDriverProfile } from '@/data/mockData';

export default function ProfileScreen() {
    const { name, email, phone, rating, totalTrips, vehicleInfo } = mockDriverProfile;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.ratingContainer}>
                        <IconSymbol name="star.fill" size={20} color={Colors.accent} />
                        <Text style={styles.rating}>{rating}</Text>
                        <Text style={styles.tripsText}>• {totalTrips} trips</Text>
                    </View>
                </View>

                {/* Contact Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <IconSymbol name="envelope.fill" size={20} color={Colors.textSecondary} />
                            <Text style={styles.infoText}>{email}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <IconSymbol name="phone.fill" size={20} color={Colors.textSecondary} />
                            <Text style={styles.infoText}>{phone}</Text>
                        </View>
                    </View>
                </View>

                {/* Vehicle Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vehicle Information</Text>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <IconSymbol name="car.fill" size={20} color={Colors.textSecondary} />
                            <Text style={styles.infoText}>
                                {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <IconSymbol name="number" size={20} color={Colors.textSecondary} />
                            <Text style={styles.infoText}>{vehicleInfo.licensePlate}</Text>
                        </View>
                    </View>
                </View>

                {/* Settings Options */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <IconSymbol name="person.fill" size={20} color={Colors.white} />
                            <Text style={styles.menuItemText}>Account Settings</Text>
                        </View>
                        <IconSymbol name="chevron.right" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <IconSymbol name="bell.fill" size={20} color={Colors.white} />
                            <Text style={styles.menuItemText}>Notifications</Text>
                        </View>
                        <IconSymbol name="chevron.right" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <IconSymbol name="questionmark.circle.fill" size={20} color={Colors.white} />
                            <Text style={styles.menuItemText}>Help & Support</Text>
                        </View>
                        <IconSymbol name="chevron.right" size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
                        <View style={styles.menuItemLeft}>
                            <IconSymbol name="arrow.right.square.fill" size={20} color={Colors.urgent} />
                            <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
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
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    avatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.cardBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: '600',
        color: Colors.white,
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    rating: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.white,
    },
    tripsText: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 12,
    },
    infoCard: {
        backgroundColor: Colors.secondary,
        borderRadius: 16,
        padding: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 8,
    },
    infoText: {
        fontSize: 16,
        color: Colors.white,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 8,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuItemText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '500',
    },
    logoutItem: {
        marginTop: 16,
    },
    logoutText: {
        color: Colors.urgent,
    },
});
