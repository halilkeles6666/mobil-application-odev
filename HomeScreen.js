import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, SafeAreaView,
} from 'react-native';
import { COLORS, patients, appointments } from '../data/mockData';

const StatCard = ({ label, value, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color || COLORS.primary }]}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const AppointmentItem = ({ item }) => (
  <View style={styles.appointmentItem}>
    <View style={styles.appointmentDate}>
      <Text style={styles.appointmentDay}>{item.date.split('.')[0]}</Text>
      <Text style={styles.appointmentMonth}>
        {['', 'OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'][parseInt(item.date.split('.')[1])]}
      </Text>
    </View>
    <View style={styles.appointmentInfo}>
      <Text style={styles.appointmentPatient}>{item.patientName}</Text>
      <Text style={styles.appointmentType}>{item.type} • {item.time}</Text>
    </View>
    <View style={[styles.appointmentBadge, { backgroundColor: COLORS.primaryLight }]}>
      <Text style={styles.appointmentBadgeText}>{item.type}</Text>
    </View>
  </View>
);

export default function HomeScreen({ navigation }) {
  const activePatients = patients.filter(p => p.status === 'Aktif Tedavi').length;
  const followupPatients = patients.filter(p => p.status === 'Takip').length;
  const remissionPatients = patients.filter(p => p.status === 'Remisyon').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Hoş geldiniz 👋</Text>
          <Text style={styles.headerTitle}>MiyelomCare</Text>
        </View>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate('AddUser')}
        >
          <Text style={styles.headerIconText}>＋</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <Text style={styles.sectionTitle}>Genel Durum</Text>
        <View style={styles.statsRow}>
          <StatCard label="Toplam Hasta" value={patients.length} color={COLORS.primary} />
          <StatCard label="Aktif Tedavi" value={activePatients} color={COLORS.primaryLight} />
          <StatCard label="Takip" value={followupPatients} color={COLORS.warning} />
          <StatCard label="Remisyon" value={remissionPatients} color={COLORS.success} />
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Yaklaşan Randevular</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Tümü →</Text>
          </TouchableOpacity>
        </View>
        {appointments.map(a => (
          <AppointmentItem key={a.id} item={a} />
        ))}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
        <View style={styles.quickActions}>
          {[
            { icon: '👥', label: 'Hastalar', screen: 'PatientList' },
            { icon: '📚', label: 'Eğitim', screen: 'Education' },
            { icon: '💬', label: 'Görüşler', screen: 'Feedback' },
            { icon: '📋', label: 'Anket', screen: 'Survey' },
          ].map(action => (
            <TouchableOpacity
              key={action.screen}
              style={styles.quickActionBtn}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
  },
  headerGreeting: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '400' },
  headerTitle: { color: COLORS.white, fontSize: 22, fontWeight: '700', marginTop: 2 },
  headerIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerIconText: { color: COLORS.white, fontSize: 24, fontWeight: '300' },
  container: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.gray800, marginHorizontal: 20, marginTop: 20, marginBottom: 12 },
  seeAll: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 12, gap: 8 },
  statCard: {
    flex: 1, backgroundColor: COLORS.white,
    borderRadius: 12, padding: 12,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8,
    elevation: 2,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: COLORS.gray800 },
  statLabel: { fontSize: 11, color: COLORS.gray400, marginTop: 2, fontWeight: '500' },
  appointmentItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 10,
    borderRadius: 14, padding: 14,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2,
  },
  appointmentDate: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  appointmentDay: { color: COLORS.white, fontSize: 16, fontWeight: '800' },
  appointmentMonth: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '600' },
  appointmentInfo: { flex: 1 },
  appointmentPatient: { fontSize: 14, fontWeight: '700', color: COLORS.gray800 },
  appointmentType: { fontSize: 12, color: COLORS.gray400, marginTop: 2 },
  appointmentBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  appointmentBadgeText: { color: COLORS.white, fontSize: 11, fontWeight: '600' },
  quickActions: { flexDirection: 'row', paddingHorizontal: 20, gap: 12 },
  quickActionBtn: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2,
  },
  quickActionIcon: { fontSize: 26, marginBottom: 6 },
  quickActionLabel: { fontSize: 11, fontWeight: '600', color: COLORS.gray600 },
});
