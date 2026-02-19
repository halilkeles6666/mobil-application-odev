import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, StatusBar, ScrollView, Alert,
} from 'react-native';
import { COLORS, surveyQuestions } from '../data/mockData';

const ScaleQuestion = ({ question, value, onChange }) => (
  <View style={styles.questionCard}>
    <Text style={styles.questionText}>{question.text}</Text>
    <View style={styles.scaleRow}>
      {Array.from({ length: question.max - question.min + 1 }, (_, i) => i + question.min).map(n => (
        <TouchableOpacity
          key={n}
          style={[styles.scaleBtn, value === n && styles.scaleBtnActive]}
          onPress={() => onChange(n)}
        >
          <Text style={[styles.scaleBtnText, value === n && styles.scaleBtnTextActive]}>{n}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.scaleLabels}>
      <Text style={styles.scaleLabelText}>{question.min === 0 ? 'Yok' : 'Çok Kötü'}</Text>
      <Text style={styles.scaleLabelText}>{question.min === 0 ? 'Şiddetli' : 'Mükemmel'}</Text>
    </View>
  </View>
);

const YesNoQuestion = ({ question, value, onChange }) => (
  <View style={styles.questionCard}>
    <Text style={styles.questionText}>{question.text}</Text>
    <View style={styles.yesnoRow}>
      {['Evet', 'Hayır'].map(opt => (
        <TouchableOpacity
          key={opt}
          style={[styles.yesnoBtn, value === opt && styles.yesnoBtnActive]}
          onPress={() => onChange(opt)}
        >
          <Text style={[styles.yesnoBtnText, value === opt && styles.yesnoBtnTextActive]}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const TextQuestion = ({ question, value, onChange }) => (
  <View style={styles.questionCard}>
    <Text style={styles.questionText}>{question.text}</Text>
    <TextInput
      style={styles.textInput}
      placeholder="Yanıtınızı buraya yazın..."
      multiline
      numberOfLines={3}
      value={value}
      onChangeText={onChange}
      placeholderTextColor={COLORS.gray400}
    />
  </View>
);

export default function SurveyScreen({ navigation }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));

  const answered = Object.keys(answers).length;
  const total = surveyQuestions.length;
  const progress = answered / total;

  const handleSubmit = () => {
    if (answered < total) {
      Alert.alert('Eksik Cevaplar', 'Lütfen tüm soruları yanıtlayın.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Anket Tamamlandı!</Text>
          <Text style={styles.successText}>
            Yanıtlarınız kaydedildi. Katılımınız için teşekkür ederiz.
          </Text>
          <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.submitBtnText}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Haftalık Anket</Text>
        <Text style={styles.headerCount}>{answered}/{total}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={styles.introText}>
            Bu hafta nasıl hissettinizi birkaç soruyla değerlendirin. Yanıtlarınız doktorunuzla paylaşılacaktır.
          </Text>

          {surveyQuestions.map(q => {
            if (q.type === 'scale') return <ScaleQuestion key={q.id} question={q} value={answers[q.id]} onChange={v => setAnswer(q.id, v)} />;
            if (q.type === 'yesno') return <YesNoQuestion key={q.id} question={q} value={answers[q.id]} onChange={v => setAnswer(q.id, v)} />;
            return <TextQuestion key={q.id} question={q} value={answers[q.id] || ''} onChange={v => setAnswer(q.id, v)} />;
          })}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Anketi Gönder</Text>
          </TouchableOpacity>
        </ScrollView>
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
  headerCount: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
  container: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
  progressBg: { height: 5, backgroundColor: COLORS.gray200, borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
  introText: { fontSize: 13, color: COLORS.gray400, lineHeight: 20, marginBottom: 16 },
  questionCard: {
    backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2,
  },
  questionText: { fontSize: 14, fontWeight: '700', color: COLORS.gray800, marginBottom: 14, lineHeight: 20 },
  scaleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  scaleBtn: {
    width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.gray100, borderWidth: 1, borderColor: COLORS.gray200,
  },
  scaleBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  scaleBtnText: { fontSize: 13, fontWeight: '700', color: COLORS.gray600 },
  scaleBtnTextActive: { color: COLORS.white },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  scaleLabelText: { fontSize: 10, color: COLORS.gray400 },
  yesnoRow: { flexDirection: 'row', gap: 12 },
  yesnoBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 12,
    backgroundColor: COLORS.gray100, alignItems: 'center',
    borderWidth: 1.5, borderColor: COLORS.gray200,
  },
  yesnoBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  yesnoBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.gray600 },
  yesnoBtnTextActive: { color: COLORS.white },
  textInput: {
    backgroundColor: COLORS.gray100, borderRadius: 10, padding: 12,
    fontSize: 13, color: COLORS.gray800, textAlignVertical: 'top', minHeight: 80,
  },
  submitBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 8,
  },
  submitBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  successIcon: { fontSize: 72, marginBottom: 20 },
  successTitle: { fontSize: 22, fontWeight: '800', color: COLORS.gray800, marginBottom: 10 },
  successText: { fontSize: 14, color: COLORS.gray400, textAlign: 'center', lineHeight: 22, marginBottom: 30 },
});
