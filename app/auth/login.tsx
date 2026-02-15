import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async () => {
        if (!email || !password) return;

        const resultAction = await dispatch(login({ email, password }));
        if (login.fulfilled.match(resultAction)) {
            // Navigation handled by auth guard in _layout
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Logo Area */}
                <View style={styles.header}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Form Card */}
                <View style={styles.card}>
                    <Text style={styles.title}>Welcome back</Text>
                    <Text style={styles.subtitle}>Sign in to your account to continue</Text>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <IconSymbol name="envelope" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="name@company.com"
                                placeholderTextColor={Colors.textMuted}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (error) dispatch(clearError());
                                }}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <IconSymbol name="lock" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor={Colors.textMuted}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (error) dispatch(clearError());
                                }}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <IconSymbol
                                    name={showPassword ? "eye" : "eye.slash"}
                                    size={20}
                                    color={Colors.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.checkboxContainer}>
                            <View style={styles.checkbox} />
                            <Text style={styles.rememberText}>Remember me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.primary} />
                        ) : (
                            <>
                                <Text style={styles.buttonText}>Sign In</Text>
                                <IconSymbol name="arrow.right" size={20} color={Colors.primary} />
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <IconSymbol name="g.circle.fill" size={24} color={Colors.white} />
                            <Text style={styles.socialText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <IconSymbol name="apple.logo" size={24} color={Colors.white} />
                            <Text style={styles.socialText}>Github</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <Link href="/auth/register" asChild>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Sign up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>

                {/* Bottom Link */}
                <TouchableOpacity style={styles.backHome} onPress={() => router.push('/')}>
                    <Text style={styles.backHomeText}>← Back to home</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary, // Black background
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 40,
        tintColor: Colors.accent, // Make logo yellow/neon
    },
    card: {
        backgroundColor: '#18181B', // Dark card
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#27272A',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 32,
    },
    errorContainer: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#27272A',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14, // Taller inputs
        borderWidth: 1,
        borderColor: '#3F3F46',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: Colors.white,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.textSecondary,
        marginRight: 8,
    },
    rememberText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    forgotText: {
        color: Colors.accent,
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        backgroundColor: Colors.accent,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        marginBottom: 24,
    },
    buttonText: {
        color: Colors.primary, // Black text on neon button
        fontSize: 16,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#3F3F46',
    },
    dividerText: {
        color: Colors.textSecondary,
        paddingHorizontal: 16,
        fontSize: 14,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#27272A',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#3F3F46',
    },
    socialText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    linkText: {
        color: Colors.accent,
        fontSize: 14,
        fontWeight: '700',
    },
    backHome: {
        alignItems: 'center',
        marginTop: 32,
    },
    backHomeText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
});
