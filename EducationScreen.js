import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Modal, ScrollView,
} from 'react-native';
import { COLORS, educationModules } from '../data/mockData';

const ModuleCard = ({ module, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(module)}>
    <View style={[styles.iconBox, { backgroundColor: module.completed ? COLORS.primary + '20' : COLORS.gray100 }]}>
      <Text style={styles.moduleIcon}>{module.icon}</Text>
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.moduleTitle}>{module.title}</Text>
      <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
      <View style={styles.cardMeta}>
        <Text style={styles.duration}>⏱ {module.duration}</Text>
        {module.completed && <Text style={styles.completedBadge}>✓ Tamamlandı</Text>}
      </View>
    </View>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

export default function EducationScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  const completed = educationModules.filter(m => m.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eğitim Modülleri</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.container}>
        {/* Progress Banner */}
        <View style={styles.progressBanner}>
          <View>
            <Text style={styles.bannerTitle}>İlerlemeniz</Text>
            <Text style={styles.bannerSub}>{completed} / {educationModules.length} modül tamamlandı</Text>
          </View>
          <View style={styles.circleProgress}>
            <Text style={styles.circleText}>{Math.round((completed / educationModules.length) * 100)}%</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.overallProgressBg}>
          <View style={[styles.overallProgressFill, { width: `${(completed / educationModules.length) * 100}%` }]} />
        </View>

        <Text style={styles.sectionLabel}>Tüm Modüller</Text>

        <FlatList
          data={educationModules}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ModuleCard module={item} onPress={setSelected} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Module Detail Modal */}
      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet">
        {selected && (
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selected.title}</Text>
              <View style={{ width: 30 }} />
            </View>
            <ScrollView style={{ padding: 20 }}>
              <View style={styles.modalHero}>
                <Text style={{ fontSize: 64 }}>{selected.icon}</Text>
                <Text style={styles.modalDuration}>⏱ {selected.duration}</Text>
              </View>
              <Text style={styles.modalSubtitle}>{selected.subtitle}</Text>
              <Text style={styles.modalContent}>{selected.content}</Text>
              <Text style={styles.modalContent}>
                Multipl miyelom tanısıyla yaşayan hastalar için bu eğitim modülü, hem hastalık süreci hem de günlük yaşam kalitesini artırmaya yönelik pratik bilgiler içermektedir.
              </Text>
              <Text style={styles.modalContent}>
                Doktorunuzla düzenli iletişim halinde olmak, ilaçlarınızı zamanında almak ve yaşam tarzı değişikliklerine uyum sağlamak tedavi başarısını doğrudan etkiler.
              </Text>
              <TouchableOpacity style={styles.completeBtn} onPress={() => setSelected(null)}>
                <Text style={styles.completeBtnText}>
                  {selected.completed ? '✓ Tamamlandı' : 'Tamamla'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
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
  container: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
  progressBanner: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.primary, borderRadius: 16, padding: 16, marginBottom: 10,
  },
  bannerTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  bannerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 },
  circleProgress: {
    width: 54, height: 54, borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  circleText: { color: COLORS.white, fontSize: 16, fontWeight: '800' },
  overallProgressBg: { height: 6, backgroundColor: COLORS.gray200, borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  overallProgressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: COLORS.gray400, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2,
  },
  iconBox: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  moduleIcon: { fontSize: 26 },
  cardInfo: { flex: 1 },
  moduleTitle: { fontSize: 14, fontWeight: '700', color: COLORS.gray800, marginBottom: 2 },
  moduleSubtitle: { fontSize: 12, color: COLORS.gray400, marginBottom: 6 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  duration: { fontSize: 11, color: COLORS.gray400 },
  completedBadge: { fontSize: 11, color: COLORS.success, fontWeight: '700' },
  arrow: { fontSize: 22, color: COLORS.gray200, marginLeft: 8 },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  modalClose: { fontSize: 18, color: COLORS.gray400 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: COLORS.gray800, flex: 1, textAlign: 'center' },
  modalHero: { alignItems: 'center', paddingVertical: 20 },
  modalDuration: { fontSize: 13, color: COLORS.gray400, marginTop: 8 },
  modalSubtitle: { fontSize: 16, fontWeight: '700', color: COLORS.primary, marginBottom: 12 },
  modalContent: { fontSize: 14, color: COLORS.gray600, lineHeight: 22, marginBottom: 14 },
  completeBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 20, marginBottom: 40,
  },
  completeBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
