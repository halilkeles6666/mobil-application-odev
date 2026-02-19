import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { COLORS } from '../data/mockData';

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function PatientDetailScreen({ route, navigation }) {
  const { patient } = route.params;

  const progress = patient.treatmentCycle / patient.totalCycles;

  const statusColor = {
    'Aktif Tedavi': COLORS.primary,
    'Takip': COLORS.warning,
    'Remisyon': COLORS.success,
  }[patient.status] || COLORS.gray400;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hasta Detayı</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <View style={styles.heroCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
          </View>
          <Text style={styles.patientName}>{patient.name}</Text>
          <Text style={styles.diagnosis}>{patient.diagnosis}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{patient.status}</Text>
          </View>
        </View>

        {/* Treatment Progress */}
        {patient.status === 'Aktif Tedavi' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tedavi İlerlemesi</Text>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>Kür {patient.treatmentCycle} / {patient.totalCycles}</Text>
              <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
        )}

        {/* Patient Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hasta Bilgileri</Text>
          <InfoRow label="Yaş" value={`${patient.age}`} />
          <InfoRow label="Telefon" value={patient.phone} />
          <InfoRow label="Son Ziyaret" value={patient.lastVisit} />
          <InfoRow label="Sonraki Randevu" value={patient.nextVisit} />
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İşlemler</Text>
          <View style={styles.actionsGrid}>
            {[
              { icon: '💬', label: 'Görüşme Ekle', color: COLORS.primary },
              { icon: '📋', label: 'Anket Gönder', color: '#8E44AD' },
              { icon: '📚', label: 'Eğitim Ata', color: '#2980B9' },
              { icon: '📝', label: 'Not Ekle', color: COLORS.warning },
            ].map(action => (
              <TouchableOpacity key={action.label} style={styles.actionBtn}>
                <View style={[styles.actionIconBox, { backgroundColor: action.color + '20' }]}>
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: COLORS.primary,
  },
  backBtn: { color: COLORS.white, fontSize: 24, fontWeight: '300' },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  container: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  heroCard: {
    alignItems: 'center', padding: 28,
    backgroundColor: COLORS.white,
    marginHorizontal: 20, marginTop: 20, borderRadius: 20,
    shadowColor: '#000', shadowOpacity: 0.07, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 4,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { color: COLORS.white, fontSize: 30, fontWeight: '700' },
  patientName: { fontSize: 20, fontWeight: '800', color: COLORS.gray800, marginBottom: 4 },
  diagnosis: { fontSize: 13, color: COLORS.gray400, marginBottom: 12 },
  statusBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  statusText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
  section: {
    backgroundColor: COLORS.white, marginHorizontal: 20, marginTop: 14,
    borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.gray800, marginBottom: 14 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 13, color: COLORS.gray600, fontWeight: '600' },
  progressPercent: { fontSize: 13, color: COLORS.primary, fontWeight: '700' },
  progressBg: { height: 8, backgroundColor: COLORS.gray100, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  infoLabel: { fontSize: 13, color: COLORS.gray400, fontWeight: '500' },
  infoValue: { fontSize: 13, color: COLORS.gray800, fontWeight: '600' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionBtn: { width: '47%', alignItems: 'center', paddingVertical: 12 },
  actionIconBox: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  actionIcon: { fontSize: 24 },
  actionLabel: { fontSize: 12, color: COLORS.gray600, fontWeight: '600', textAlign: 'center' },
});
