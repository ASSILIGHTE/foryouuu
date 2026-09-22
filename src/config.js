/**
 * SKY OF US — CONFIGURATION FILE
 * Semua data nama, tanggal, pesan, foto, dan kenangan dapat disesuaikan di sini.
 */

export const config = {
  // Informasi Pasangan & Pengirim
  partnerName: "Septi",        // Nama pasangan yang berulang tahun
  senderName: "aklis",         // Nama pengirim / panggilan sayang
  birthDate: "23 September 2026", // Tanggal ulang tahun
  targetDate: "2026-09-23T00:00:00", // Target countdown (23 September 2026)

  // Audio / Musik Background
  // Gunakan URL file audio .mp3 jika ada, atau biarkan synth otomatis jika kosong/null
  bgMusicUrl: "/music.mp3",

  // PAGE 1 — "A Little Sky For You"
  hero: {
    badge: "Special Birthday Surprise ☁️",
    title: "Happy Birthday, Septi",
    subtitle: "Semoga hari ini dipenuhi hal-hal sederhana yang membuatmu tersenyum, seperti senyummu yang selalu membuat hariku lebih indah.",
    countdownTitle: "23 September 2026 ⏳",
    ctaButton: "Mulai Perjalanan ☁️",
  },

  // PAGE 2 — "For The Person I Love"
  loveSection: {
    badge: "UNTUK SESEORANG YANG SPESIAL",
    title: "Di Antara Sejuta Awan",
    mainQuote: "Di antara begitu banyak hal indah yang pernah datang dalam hidupku, aku selalu bersyukur salah satunya adalah kamu.",
    polaroidPhoto: "/images/hero.jpeg",
    polaroidCaption: "Senyum favoritku di bawah langit 💙",

    // Cloud Cards (Awan Kenangan Singkat)
    cloudCards: [
      {
        id: "senyum",
        icon: "✨",
        title: "Senyummu",
        shortText: "Penawar Lelah Terbaik",
        fullMessage: "Senyummu selalu punya cara ajaib merapikan hariku yang berantakan. Tidak peduli seberapa berat hari berjalan, melihatmu tersenyum selalu membawa kedamaian.",
        tag: "Favorite Thing"
      },
      {
        id: "cerita",
        icon: "📖",
        title: "Cerita Kita",
        shortText: "Setiap Bab Yang Berharga",
        fullMessage: "Aku suka bagaimana cerita kita tumbuh tanpa paksaan—pelan, tulus, dan makin hari makin hangat. Terima kasih sudah mau berjalan berdampingan.",
        tag: "Our Journey"
      },
      {
        id: "hal-kecil",
        icon: "🌸",
        title: "Hal-hal Kecil Tentang Kamu",
        shortText: "Yang Selalu Membuatku Kagum",
        fullMessage: "Cara kamu perhatian sama hal-hal kecil, tawa khasmu yang renyah, dan kehangatan tatapanmu saat bicara denganku.",
        tag: "Little Details"
      },
      {
        id: "momen",
        icon: "☁️",
        title: "Momen Yang Ingin Aku Ingat",
        shortText: "Abadi Dalam Ingatan",
        fullMessage: "Setiap sore saat kita hanya duduk bersama tanpa perlu banyak bicara, tapi sudah merasa cukup dan bahagia.",
        tag: "Unforgettable"
      }
    ]
  },

  // PAGE 3 — "Our Little Moments"
  momentsSection: {
    badge: "JEJAK PERJALANAN KITA",
    title: "Our Little Moments",
    subtitle: "Setiap langkah kecil dan momen manis yang kita lalui bersama di bawah langit yang sama.",

    // Timeline Momen Berharga
    timeline: [
      {
        id: 1,
        title: "Awal Cerita Indah",
        tagline: "Pertemuan Yang Hangat",
        description: "Hari di mana takdir mempertemukan kita. Siapa yang menyangka senyuman sederhana hari itu menjadi awal dari cerita seindah dan sehangat ini.",
        image: "/images/meet.jpeg",
        icon: "🌱"
      },
      {
        id: 2,
        title: "Kenangan Manis Bersama",
        tagline: "Tawa Dan Kebahagiaan",
        description: "Setiap senyuman dan tawa lepas yang kita bagikan bersama. Semua momen itu selalu tersimpan rapi dan menjadi bagian terindah dalam hariku.",
        image: "/images/first.jpeg",
        icon: "📸"
      },
      {
        id: 3,
        title: "Petualangan Kita",
        tagline: "Di Bawah Langit Yang Sama",
        description: "waktu pertama kali keluar di kota kendal berdua. menikmati kota yang indah, hujan yang rintik, dan obrolan panjang tanpa akhir",
        image: "/images/adventure.jpeg",
        icon: "🌃"
      },
      {
        id: 4,
        title: "Momen Favoritku",
        tagline: "Setiap Hari Bersamamu",
        description: "Bukan hanya tentang tempat yang megah, tapi tentang bagaimana kamu selalu membuat hari-hari biasa terasa seperti momen istimewa yang penuh kehangatan.",
        image: "/images/4.jpeg",
        icon: "💖"
      }
    ]
  },

  // PAGE 4 — "One More Wish" (Sunset Atmosphere)
  sunsetSection: {
    badge: "SATU HARAPAN DI BAWAH SENJA",
    title: "One More Wish",
    subtitle: "Saat senja perlahan meredup dan bintang-bintang mulai menyala...",
    mainPhoto: "/images/adventure.jpeg",
    mainMessage: `Selamat ulang tahun untuk seseorang yang selalu punya cara membuat hariku terasa lebih hangat.
Terima kasih sudah hadir dan melengkapi banyak hal sederhana dalam hidupku.
Semoga di usiamu yang baru ini, kebahagiaan dan hal-hal baik selalu menemukan jalan menuju kamu.`,
    letterButtonText: "Open My Last Message 💙",

    // Pesan Rahasia di Dalam Surat Digital
    secretLetter: {
      title: "Surat Kecil Untukmu ✉️",
      quote: "Di antara banyaknya hal indah di dunia, kamu adalah favoritku.",
      body: `Terima kasih sudah lahir ke dunia ini dan tumbuh menjadi sosok yang begitu luar biasa. Bersamamu, hal-hal biasa selalu terasa jauh lebih berarti. 

Di usiamu yang baru ini, aku berharap kamu senantiasa dikelilingi ketenangan, impian-impianmu perlahan terwujud, dan senyummu tidak pernah pudar. Apapun yang terjadi nanti, aku akan selalu ada untuk mendukungmu dan berjalan di sampingmu.

Selamat merayakan hari spesialmu, sayang. 💖`,
      closing: "With all my love,"
    }
  }
};
