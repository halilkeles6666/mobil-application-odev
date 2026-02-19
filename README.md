# 🩸 MiyelomCare

> Multipl Miyelom Hasta Takip ve Destek Uygulaması

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)

---

## 📱 Proje Hakkında

**MiyelomCare**, multipl miyelom (MM) tanısı almış hastaların tedavi süreçlerini takip etmek, onlara eğitim materyali sunmak ve haftalık semptom anketleri aracılığıyla klinisyenlerle iletişimi kolaylaştırmak amacıyla geliştirilmiş bir mobil uygulamadır.

### 🎯 Hedef Kullanıcılar
- Hematoloji klinisyenleri ve hemşireler
- Multipl miyelom hastaları ve yakınları

### 💡 Çözülen Problem
Miyelom hastaları uzun süreli tedavi süreçleri boyunca yoğun takip gerektirir. Bu uygulama; hasta listesi yönetimi, kür takibi, eğitim modülleri ve haftalık semptom anketlerini tek bir platformda birleştirerek sağlık profesyonellerinin iş yükünü azaltmayı hedefler.

---

## 🖼 Ekranlar

| Ekran | Açıklama |
|-------|----------|
| 🏠 Dashboard | Genel istatistikler, yaklaşan randevular, hızlı erişim |
| 👥 Hasta Listesi | Arama + filtreleme (Aktif Tedavi / Takip / Remisyon) |
| 🧑‍⚕️ Hasta Detayı | Kür ilerleme çubuğu, hasta bilgileri, hızlı işlemler |
| 📚 Eğitim Modülleri | İlerleme takipli eğitim içerikleri, modal detay görünümü |
| 📋 Haftalık Anket | Ölçek, evet/hayır ve metin tipi sorular |

---

## 🚀 Kurulum & Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Expo Go uygulaması (iPhone / Android)

### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/myelom-care.git
cd myelom-care

# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npx expo start
```

Terminalde görünen QR kodu **Expo Go** uygulamasıyla tara → uygulama cihazında açılır.

### Android APK Almak İçin

```bash
npx expo build:android
# veya EAS Build ile:
npx eas build -p android --profile preview
```

---

## 🛠 Kullanılan Teknolojiler

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| React Native | 0.74 | Cross-platform mobil framework |
| Expo | ~51 | Geliştirme ortamı & build |
| React Navigation | 6.x | Ekranlar arası navigasyon |
| React Hooks | — | State & side-effect yönetimi |

---

## 📂 Proje Yapısı

```
myelom-care/
├── App.js                    # Giriş noktası
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js   # Stack navigator
│   ├── screens/
│   │   ├── HomeScreen.js     # Dashboard
│   │   ├── PatientListScreen.js
│   │   ├── PatientDetailScreen.js
│   │   ├── EducationScreen.js
│   │   └── SurveyScreen.js
│   └── data/
│       └── mockData.js       # Mock veriler & renk sabitleri
└── package.json
```

---

## 🎨 Tasarım Kararları

Tasarım, Pinterest panosundaki Multipl Miyelom sağlık uygulamasından ilham alınarak oluşturulmuştur:

- **Renk paleti:** Kırmızı (`#C0392B`) ana renk olarak kullanıldı — hematoloji ve aciliyet hissi
- **Rounded card bileşenler:** Her kart `borderRadius: 16` ile yumuşatıldı
- **Kür ilerleme çubukları:** Panodaki tedavi takip ekranlarından ilham alındı
- **Eğitim modülleri:** Pano'daki "Multipl Miyelom Nedir?" ekranından ilham alındı
- **Header gradient:** Kırmızı header + beyaz content alanı geçişi, panodaki tüm ekranlarda tutarlı

---

## 📝 Commit Mesajı Stratejisi

```
feat: add patient list screen with search & filter
feat: add education modules with progress tracking
feat: add weekly survey with validation
fix: empty state handling for patient search
style: improve card shadow and spacing
docs: update README with setup instructions
```

---

## 📌 Notlar

- Tüm veriler şu an `mockData.js` dosyasında tutulmaktadır
- Gerçek bir backend entegrasyonu için `axios` + REST API veya Firebase eklenebilir
- Eğitim tamamlanma durumu `AsyncStorage` ile kalıcı hale getirilebilir

---

*Bu proje bir mobil uygulama geliştirme dersi ödevi kapsamında React Native + Expo kullanılarak geliştirilmiştir.*
