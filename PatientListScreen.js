import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, TextInput, SafeAreaView, StatusBar,
} from 'react-native';
import { COLORS, patients } from '../data/mockData';

const StatusBadge = ({ status }) => {
  const colors = {
    'Aktif Tedavi': COLORS.primary,
    'Takip': COLORS.warning,
    'Remisyon': COLORS.success,
  };
  return (
    <View style={[styles.badge, { backgroundColor: colors[status] || COLORS.gray400 }]}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
};

const PatientCard = ({ patient, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(patient)}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
    </View>
    <View style={styles.cardInfo}>
      <View style={styles.cardRow}>
        <Text style={styles.patientName}>{patient.name}</Text>
        <StatusBadge status={patient.status} />
      </View>
      <Text style={styles.diagnosis}>{patient.diagnosis}</Text>
      <View style={styles.cardMeta}>
        <Text style={styles.metaText}>📅 Son: {patient.lastVisit}</Text>
        <Text style={styles.metaText}>Yaş: {patient.age}</Text>
      </View>
      {patient.status === 'Aktif Tedavi' && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, {
              width: `${(patient.treatmentCycle / patient.totalCycles) * 100}%`
            }]} />
          </View>
          <Text style={styles.progressText}>
            Kür {patient.treatmentCycle}/{patient.totalCycles}
          </Text>
        </View>
      )}
    </View>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

export default function PatientListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tümü');

  const filters = ['Tümü', 'Aktif Tedavi', 'Takip', 'Remisyon'];

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Tümü' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hasta Listesi</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddUser')}>
          <Text style={styles.addBtn}>＋</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Hasta ara..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={COLORS.gray400}
          />
        </View>

        <View style={styles.filterRow}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyTitle}>Hasta bulunamadı</Text>
            <Text style={styles.emptyText}>Arama kriterlerinizi değiştirmeyi deneyin.</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PatientCard patient={item} onPress={(p) => navigation.navigate('PatientDetail', { patient: p })} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
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
  addBtn: { color: COLORS.white, fontSize: 24, fontWeight: '300' },
  container: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 12, paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2,
  },
  searchIcon: { marginRight: 8, fontSize: 14 },
  searchInput: { flex: 1, height: 44, fontSize: 14, color: COLORS.gray800 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  filterBtn: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200,
  },
  filterBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 12, fontWeight: '600', color: COLORS.gray600 },
  filterTextActive: { color: COLORS.white },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 16, padding: 14,
    marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  avatarText: { color: COLORS.white, fontSize: 20, fontWeight: '700' },
  cardInfo: { flex: 1 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  patientName: { fontSize: 15, fontWeight: '700', color: COLORS.gray800 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
  diagnosis: { fontSize: 12, color: COLORS.gray400, marginBottom: 6 },
  cardMeta: { flexDirection: 'row', gap: 16 },
  metaText: { fontSize: 11, color: COLORS.gray400, fontWeight: '500' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
  progressBg: { flex: 1, height: 5, backgroundColor: COLORS.gray100, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
  progressText: { fontSize: 10, color: COLORS.gray400, fontWeight: '600' },
  arrow: { fontSize: 22, color: COLORS.gray200, marginLeft: 8 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: COLORS.gray800, marginBottom: 6 },
  emptyText: { fontSize: 13, color: COLORS.gray400, textAlign: 'center' },
});
