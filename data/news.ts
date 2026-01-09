/**
 * PackNDocs News Data
 * Visa news items with full content
 */

import { NewsItem } from '@/types';

export interface NewsItemFull extends NewsItem {
  content: string;
  contentTr: string;
  source?: string;
  imageUrl?: string;
  category: 'schengen' | 'us' | 'uk' | 'general';
}

export const visaNews: NewsItemFull[] = [
  {
    id: '1',
    title: 'Schengen visa fee increases to 90 EUR',
    titleTr: 'Schengen vize ücreti 90 EUR\'ya yükseldi',
    date: 'Ocak 2026',
    icon: '💶',
    category: 'schengen',
    source: 'Avrupa Komisyonu',
    content: 'The European Commission has announced an increase in Schengen visa fees from 80 EUR to 90 EUR, effective from January 2026.',
    contentTr: 'Avrupa Komisyonu, Schengen vize ücretlerinin Ocak 2026 itibarıyla 80 EUR\'dan 90 EUR\'ya yükseltildiğini duyurdu.\n\nBu artış, vize işleme maliyetlerindeki enflasyon ve artan operasyonel giderleri karşılamak amacıyla yapıldı. Yeni ücretler tüm Schengen ülkeleri için geçerli olacak.\n\n**Yeni Ücretler:**\n- Yetişkin başvuruları: 90 EUR\n- Çocuklar (6-12 yaş): 45 EUR\n- 6 yaş altı: Ücretsiz\n\n**Önemli Notlar:**\n- Mevcut başvurular eski ücretlerle işlenecek\n- Vize reddi durumunda ücret iade edilmez\n- Bazı ülke vatandaşları için indirimli tarifeler geçerli olabilir',
  },
  {
    id: '2',
    title: 'UK Graduate Route visa updates announced',
    titleTr: 'İngiltere Graduate Route vizesinde güncellemeler',
    date: 'Ocak 2026',
    icon: '🎓',
    category: 'uk',
    source: 'UK Home Office',
    content: 'The UK Home Office has announced updates to the Graduate Route visa program.',
    contentTr: 'İngiltere İçişleri Bakanlığı, Graduate Route vize programında önemli güncellemeler duyurdu.\n\nBu değişiklikler, İngiltere\'de eğitim alan uluslararası öğrencilerin mezuniyet sonrası çalışma haklarını etkiliyor.\n\n**Ana Değişiklikler:**\n- Lisans mezunları için 2 yıllık çalışma hakkı devam ediyor\n- Doktora mezunları için süre 3 yıla uzatıldı\n- Başvuru sürecinde ek belgeler istenebilir\n\n**Kimler Başvurabilir:**\n- İngiltere\'de akredite bir kurumdan mezun olanlar\n- Geçerli öğrenci vizesi sahipleri\n- Mezuniyet tarihinden itibaren belirli süre içinde başvuranlar\n\n**Önemli Tarihler:**\n- Yeni kurallar Mart 2026\'dan itibaren geçerli olacak',
  },
  {
    id: '3',
    title: 'US visa appointment slots increasing',
    titleTr: 'ABD vize randevu sayıları artırılıyor',
    date: 'Aralık 2025',
    icon: '📅',
    category: 'us',
    source: 'ABD Büyükelçiliği',
    content: 'The US Embassy has announced an increase in visa appointment availability.',
    contentTr: 'ABD Büyükelçiliği, vize randevu kapasitesini önemli ölçüde artırdığını duyurdu.\n\nPandemi sonrası oluşan randevu birikimini azaltmak amacıyla alınan bu karar, Türk vatandaşları için olumlu bir gelişme.\n\n**Yapılan İyileştirmeler:**\n- Günlük randevu sayısı %40 artırıldı\n- Hafta sonu randevuları eklendi\n- Yeni mülakat odaları hizmete açıldı\n\n**Bekleme Süreleri:**\n- B1/B2 (Turist/İş): 45-60 gün\n- F1 (Öğrenci): 30-45 gün\n- H1B (Çalışma): 60-90 gün\n\n**Randevu İpuçları:**\n- Sabah erken saatlerde randevu kontrolü yapın\n- İptal olan randevuları takip edin\n- Belgelerinizi eksiksiz hazırlayın',
  },
  {
    id: '4',
    title: 'Germany simplifies work visa process',
    titleTr: 'Almanya çalışma vizesi sürecini basitleştirdi',
    date: 'Aralık 2025',
    icon: '🇩🇪',
    category: 'schengen',
    source: 'Alman Dışişleri Bakanlığı',
    content: 'Germany has introduced simplified procedures for work visa applications.',
    contentTr: 'Almanya, nitelikli işgücü çekmek amacıyla çalışma vizesi süreçlerinde önemli kolaylıklar getirdi.\n\nYeni düzenlemeler özellikle IT sektörü ve mühendislik alanlarında çalışmak isteyen profesyonelleri hedefliyor.\n\n**Yeni Kolaylıklar:**\n- Bazı meslekler için diploma denklik şartı kaldırıldı\n- Başvuru değerlendirme süresi 2 haftaya indirildi\n- Online ön başvuru sistemi aktif\n\n**Kimler Yararlanabilir:**\n- IT uzmanları\n- Mühendisler\n- Sağlık profesyonelleri\n- Akademisyenler\n\n**Gerekli Şartlar:**\n- İş teklifi veya sözleşme\n- İlgili alanda deneyim\n- Temel Almanca bilgisi (bazı pozisyonlar için)',
  },
  {
    id: '5',
    title: 'Bulgaria joins Schengen area',
    titleTr: 'Bulgaristan Schengen bölgesine katıldı',
    date: 'Kasım 2025',
    icon: '🇧🇬',
    category: 'schengen',
    source: 'Avrupa Konseyi',
    content: 'Bulgaria has officially joined the Schengen Area.',
    contentTr: 'Bulgaristan, 2025 yılı itibarıyla resmi olarak Schengen bölgesine katıldı.\n\nBu gelişme, Türk vatandaşları için önemli değişiklikler anlamına geliyor.\n\n**Ne Değişti:**\n- Bulgaristan artık Schengen vizesi gerektiriyor\n- Mevcut Schengen vizeleri Bulgaristan\'da geçerli\n- Romanya ile sınır kontrolleri kaldırıldı\n\n**Türk Vatandaşları İçin:**\n- Schengen vizesi ile Bulgaristan\'a giriş yapılabilir\n- Ayrı Bulgaristan vizesine gerek yok\n- Transit geçişler kolaylaştı\n\n**Dikkat Edilmesi Gerekenler:**\n- 90/180 gün kuralı Bulgaristan için de geçerli\n- Çoklu giriş vizesi avantajlı\n- Seyahat sigortası kapsamı Bulgaristan\'ı içermeli',
  },
  {
    id: '6',
    title: 'France extends visa processing times',
    titleTr: 'Fransa vize işlem sürelerini uzattı',
    date: 'Kasım 2025',
    icon: '🇫🇷',
    category: 'schengen',
    source: 'Fransa Konsolosluğu',
    content: 'France has announced extended visa processing times due to high demand.',
    contentTr: 'Fransa Konsolosluğu, yoğun başvuru talebi nedeniyle vize işlem sürelerinin uzadığını duyurdu.\n\n**Güncel İşlem Süreleri:**\n- Turist vizesi: 20-25 iş günü\n- İş vizesi: 15-20 iş günü\n- Aile vizesi: 30-45 iş günü\n\n**Yoğunluk Dönemleri:**\n- Yaz ayları (Haziran-Ağustos)\n- Yılbaşı dönemi\n- Okul tatilleri\n\n**Hızlı İşlem İpuçları:**\n- Seyahat tarihinden en az 6 hafta önce başvurun\n- Tüm belgeleri eksiksiz hazırlayın\n- Premium randevu hizmeti kullanın\n\n**Önemli:**\n- Eksik belgeli başvurular reddedilebilir\n- Randevu alırken alternatif tarihler belirleyin',
  },
  {
    id: '7',
    title: 'New biometric requirements for UK visas',
    titleTr: 'İngiltere vizeleri için yeni biyometrik gereksinimler',
    date: 'Ekim 2025',
    icon: '🔐',
    category: 'uk',
    source: 'UK Visas and Immigration',
    content: 'New biometric enrollment requirements have been introduced for UK visa applications.',
    contentTr: 'İngiltere Vizeler ve Göçmenlik birimi, vize başvuruları için yeni biyometrik kayıt gereksinimleri açıkladı.\n\n**Yeni Gereksinimler:**\n- Gelişmiş parmak izi taraması\n- Yüz tanıma fotoğrafı\n- Dijital imza\n\n**Biyometrik Merkezleri:**\n- İstanbul: VFS Global\n- Ankara: VFS Global\n- İzmir: VFS Global (yeni açıldı)\n\n**Randevu Süreci:**\n1. Online başvuru tamamlayın\n2. Ücret ödemesi yapın\n3. Biyometrik randevu alın\n4. Merkeze gidip kayıt yaptırın\n\n**Dikkat:**\n- Randevuya 15 dakika önce gidin\n- Pasaportunuzu yanınızda bulundurun\n- Randevu onay belgesini getirin',
  },
  {
    id: '8',
    title: 'Spain launches priority visa service',
    titleTr: 'İspanya öncelikli vize hizmeti başlattı',
    date: 'Ekim 2025',
    icon: '🇪🇸',
    category: 'schengen',
    source: 'İspanya Konsolosluğu',
    content: 'Spain has launched a new priority visa processing service.',
    contentTr: 'İspanya Konsolosluğu, acil seyahat planları olanlar için öncelikli vize işlem hizmeti başlattı.\n\n**Öncelikli Hizmet Detayları:**\n- İşlem süresi: 3-5 iş günü\n- Ek ücret: 50 EUR\n- Sınırlı kontenjan\n\n**Kimler Başvurabilir:**\n- Acil iş seyahati olanlar\n- Tıbbi tedavi için seyahat edenler\n- Cenaze/hastalık gibi acil durumlar\n\n**Başvuru Şartları:**\n- Aciliyet belgesi (davet mektubu, tıbbi rapor vb.)\n- Standart vize belgeleri\n- Ek ücret ödemesi\n\n**Önemli Not:**\n- Öncelikli hizmet vize onayını garanti etmez\n- Red durumunda ek ücret iade edilmez',
  },
];

export function getLatestNews(count: number = 3): NewsItemFull[] {
  return visaNews.slice(0, count);
}

export function getNewsById(id: string): NewsItemFull | undefined {
  return visaNews.find((news) => news.id === id);
}

export function getNewsByCategory(category: string): NewsItemFull[] {
  return visaNews.filter((news) => news.category === category);
}

export function getAllNews(): NewsItemFull[] {
  return visaNews;
}
