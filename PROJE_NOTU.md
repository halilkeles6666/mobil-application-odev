# 📝 Proje Notu — MiyelomCare

## 🎯 Hedef Kullanıcı Kitlesi

**Birincil:** Hematoloji kliniklerinde görev yapan klinisyenler ve hemşireler. Günlük iş yükleri arasında çok sayıda hastanın tedavi sürecini takip etmek, eğitim materyali sunmak ve semptom değerlendirmesi yapmak zorunda olan profesyoneller.

**İkincil:** Multipl miyelom tanısıyla yaşayan hastalar ve yakınları. Tedavi sürecini anlamak, günlük belirtilerini raporlamak ve hastalıklarıyla ilgili güvenilir bilgiye erişmek isteyen bireyler.

---

## 💡 Çözülen Problem

Multipl miyelom, uzun ve yoğun tedavi gerektiren, remisyon-relaps döngüsüyle seyreden bir kan kanseridir. Hastaların takibi çok boyutludur:

- Hangi kürde oldukları, yan etkileri, randevu geçmişleri
- Hastalık hakkında yeterli bilgiye sahip olup olmadıkları
- Haftalık yaşam kalitesi değişimleri

Bu bilgiler çoğunlukla farklı sistemlerde dağınık halde tutulur ya da kağıt formlarla toplanır. **MiyelomCare** bu parçaları tek bir kullanıcı dostu mobil uygulamada birleştirir.

---

## 🖼 Panodan Alınan İlham

Pinterest panosunu incelediğimde şu kararları aldım:

### 1. Renk Sistemi
Panodaki tüm mockup'larda **kırmızı-beyaz** ana renk şeması kullanılmıştı. Bu bilinçli bir seçimdi: kırmızı hem hematolojiyle (kan hastalıkları) ilişkilendirilen bir renk, hem de dikkat ve aciliyet hissi uyandırıyor. Uygulamada `#C0392B` ana kırmızı olarak kullanıldı.

### 2. Card-Based Layout
Panodaki ekranlar liste halindeki hasta ve randevu kartlarından oluşuyordu. Her kart bağımsız bir bilgi birimi olarak tasarlanmıştı. Bu yapıyı aldım ve her karta `shadow + borderRadius` ekleyerek modern bir his kattım.

### 3. Tedavi Kürü İzleme
Panodan çıkan en özgün fikir: Her hastanın kaçıncı kürde olduğunu **ilerleme çubuğuyla** göstermek. Klinisyen bakışta anlıyor: "HASTA1, 6'nın 3'üncü küründe."

### 4. Eğitim Modülü Yapısı
"Multipl Miyelom Nedir?" başlıklı bir ekran panodan doğrudan ilham kaynağı oldu. Bu yapıyı genişleterek icon + süre + tamamlanma durumu olan bir modül sistemi kurdum.

### 5. Haftalık Anket Ekranı
Panoda görüşme/değerlendirme ekranları vardı. Bu fikri haftalık semptom anketine dönüştürdüm: ağrı ölçeği (0-10), uyku kalitesi, yorgunluk gibi klinik açıdan anlamlı sorular.

---

## 🧩 Yaratıcılık Katkısı

Panodan bir adım ileri giderek:
- Dashboard ekranına **istatistik kartları** (toplam hasta / aktif tedavi / takip / remisyon) eklendi
- **Empty state** ve **loading** yönetimi eklendi (arama sonucu bulunamazsa anlamlı görsel)
- Anketin sonunda **başarı ekranı** gösterildi

---

*Hazırlayan: [Adınız]*  
*Tarih: Nisan 2024*
