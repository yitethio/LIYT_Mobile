import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface StatsCardProps {
    title: string;
    value: string;
    icon?: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: Colors.secondary,
        borderRadius: 16,
        padding: 16,
        minHeight: 100,
    },
    title: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    value: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.accent,
    },
    iconContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
});
