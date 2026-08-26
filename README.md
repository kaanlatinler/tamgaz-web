# 🛠️ Tamgaz Mühendislik — Web Platformu & Yönetim Paneli

Tamgaz Mühendislik için geliştirilmiş; kurumsal web sitesi, tam yetkili yönetim paneli (CMS), anlık Telegram & panel içi randevu bildirimi sistemleri ve dinamik SEO altyapısına sahip modern web uygulaması.

---

## 🚀 Öne Çıkan Özellikler

- **Kurumsal Web Arayüzü:** Doğalgaz tesisatı, kombi montajı, proje çizimi ve mühendislik çözümlerini sergileyen responsive (mobil uyumlu) dark-mode tasarım.
- **Ücretsiz Keşif & Randevu Formu:** Müşterilerin anlık keşif talebi oluşturabileceği interaktif form yapısı.
- **Anlık Bildirim Sistemleri:**
  - 📱 **Telegram Botu Entegrasyonu:** Form gönderildiği anda yöneticinin Telegram hesabına/grubuna sesli anlık detay bildirimi düşer.
  - 🔔 **Panel İçi Zil & Toast Uyarısı:** Admin panelde çalışan yöneticilere canlı pop-up ve zil uyarısı.
- **Yönetim Paneli (Admin CMS):**
  - **Keşif & Randevular:** Gelen talepleri listeleme, detay modalı ile müşteri adresi/notunu inceleme, durum güncelleme (Onaylandı/İptal).
  - **Ürün Kataloğu & Hizmet Yönetimi:** Ürün ve hizmetlerin dinamik CRUD (Ekle, Oku, Güncelle, Sil) işlemleri.
  - **Referans Projeler:** Saha fotoğrafları ve konum bilgileriyle proje portföy yönetimi.
  - **Yöneticiler:** Bcrypt şifreleme destekli admin hesap yönetimi.
- **Tam SEO & Google Yapılandırması:**
  - Dinamik `sitemap.xml` ve `robots.txt` oluşturucu.
  - Google Haritalar & İşletme görünürlüğü için **JSON-LD (HVAC Business)** şeması.
  - Sosyal medya paylaşımları için **Open Graph** ve Twitter kartları.

---

## 🛠️ Teknolojik Mimari

- **Framework:** Next.js 14+ (App Router, React 18)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS, Shadcn UI, Lucide Icons
- **Veritabanı & ORM:** PostgreSQL, Prisma ORM
- **Kimlik Doğrulama & Güvenlik:** Bcrypt.js, HTTP-Only Cookies
- **Bildirim & Entegrasyon:** Telegram Bot API, Sonner (Toast)
- **Performans:** NextTopLoader

---

## 🏁 Yerel Kurulum (Getting Started)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayın.

### 1. Depoyu Klonlayın

```bash
git clone [https://github.com/kullanici-adi/tamgaz-web.git](https://github.com/kullanici-adi/tamgaz-web.git)
cd tamgaz-web
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini (.env) Oluşturun

Ana dizinde .env dosyası oluşturun ve aşağıdaki değişkenleri tanımlayın:

# Veritabanı Bağlantısı (PostgreSQL)

DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/tamgaz_db?schema=public"

# Telegram Bot Bildirim Bilgileri

TELEGRAM_BOT_TOKEN="bot_token_buraya"
TELEGRAM_CHAT_ID="chat_id_buraya"

### 4. Veritabanı Şemasını Senkronize Edin

```bash
npx prisma generate
npx prisma db push
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışmaya başlayacaktır.

📁 Proje Klasör Yapısı
Plaintext
src/
├── app/
│ ├── admin/ # Admin paneli sayfaları ve layout
│ ├── api/ # API rotaları (appointments, notifications, auth vb.)
│ ├── loading.tsx # Animasyonlu global yükleme bileşeni
│ ├── robots.ts # Arama motoru tarama kuralları
│ ├── sitemap.ts # Dinamik sitemap oluşturucu
│ └── layout.tsx # Root layout ve global SEO metadata
├── components/ # UI bileşenleri ve JSON-LD şeması
└── lib/ # Prisma ve Telegram yardımcı servisleri
🔒 Lisans & Gizlilik
Bu proje Tamgaz Mühendislik için özel olarak geliştirilmiştir. İzin alınmadan kopyalanamaz, çoğaltılamaz veya üçüncü şahıslarla paylaşılamaz.
