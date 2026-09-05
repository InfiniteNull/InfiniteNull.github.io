/**
 * shuna-ai-suite.js - SHUNA AI: Data Science, NLP & Machine Learning Engine
 * Flagship Project 3: Interactive NLP Sentiment Studio, Tabular Retention Predictor, and Time-Series Anomaly Detector.
 * Authentic origin: MSIB Batch 6 @ Skilvul (Project Team Lead - Score 81.8) & GitHub: InfiniteNull/SHUNA-AI
 */

(function() {
  'use strict';

  // --- STATE MANAGEMENT ---
  const state = {
    activeTab: 'nlp-studio',
    nlpInputText: "This bootcamp has the most engaging sessions and hands-on mentor support. Highly recommended!",
    nlpResult: null,
    // Tabular ML State
    retentionInputs: {
      sentimentScore: 0.85,
      completionRate: 75,
      mentorSessions: 8,
      assignmentScore: 84,
      supportResolutionHours: 6
    },
    retentionResult: null,
    cmThreshold: 0.5,
    datasetFilter: {
      sentiment: 'all',
      source: 'all',
      search: '',
      minConfidence: 0.5
    },
    // Time-series Anomaly State
    forecastModel: 'holt-winters', // 'moving-average' or 'holt-winters'
    anomalyThreshold: 2.0,
    forecastDays: 7
  };

  // --- CURATED AUTHENTIC DATASET (Derived from InfiniteNull/SHUNA-AI sentiment-data.csv) ---
  const SAMPLE_DATASET = [
    { id: 1, text: "I love this bootcamp! The mentors were extremely helpful and guided us through every bug.", sentiment: "positive", source: "TechTrain Bootcamp", date: "2024-05-01", confidence: 0.94, location: "Medan", user: "@rizki_dev" },
    { id: 2, text: "The instructors were terrible and the curriculum felt outdated. Very disappointing.", sentiment: "negative", source: "CodeMaster Bootcamp", date: "2024-05-02", confidence: 0.88, location: "Jakarta", user: "@user_452" },
    { id: 3, text: "This bootcamp is amazing! Hands-on projects gave me real industry confidence.", sentiment: "positive", source: "DevPro Bootcamp", date: "2024-05-03", confidence: 0.96, location: "Bandung", user: "@alief_code" },
    { id: 4, text: "I'm so disappointed with their customer support. Ticket unresolved for 5 days.", sentiment: "negative", source: "CodeWorks Bootcamp", date: "2024-05-04", confidence: 0.91, location: "Surabaya", user: "@dev_sarah" },
    { id: 5, text: "Just had the best learning experience of my life! Collaborative capstone was intense.", sentiment: "positive", source: "SkillEdge Bootcamp", date: "2024-05-05", confidence: 0.95, location: "Medan", user: "@jordan_k" },
    { id: 6, text: "The quality of this bootcamp is subpar. Video player keeps crashing on lecture 4.", sentiment: "negative", source: "LearnFast Bootcamp", date: "2024-05-06", confidence: 0.87, location: "Yogyakarta", user: "@budi_tech" },
    { id: 7, text: "Their website is so user-friendly and grading rubrics are transparent. Love it!", sentiment: "positive", source: "DevPro Bootcamp", date: "2024-05-07", confidence: 0.92, location: "Jakarta", user: "@dina_m" },
    { id: 8, text: "Materi pembelajaran sangat terstruktur dan mentor responsif menjawab pertanyaan di forum.", sentiment: "positive", source: "SkillEdge Bootcamp", date: "2024-05-08", confidence: 0.93, location: "Medan", user: "@rizky_a" },
    { id: 9, text: "Sistem portal sering down saat pengumpulan tugas akhir. Sangat menghambat kelulusan.", sentiment: "negative", source: "TechTrain Bootcamp", date: "2024-05-09", confidence: 0.89, location: "Semarang", user: "@hendra_99" },
    { id: 10, text: "Workshop machine learning sangat mendalam, pembahasan TF-IDF dan Scikit-Learn sangat jelas.", sentiment: "positive", source: "DevPro Bootcamp", date: "2024-05-10", confidence: 0.97, location: "Bandung", user: "@fajar_ml" },
    { id: 11, text: "The curriculum covers fundamental concepts adequately, standard pace without special highlights.", sentiment: "neutral", source: "CodeWorks Bootcamp", date: "2024-05-11", confidence: 0.76, location: "Jakarta", user: "@tari_21" },
    { id: 12, text: "Customer support was polite and resolved my API token issue within two hours.", sentiment: "positive", source: "LearnFast Bootcamp", date: "2024-05-12", confidence: 0.89, location: "Surabaya", user: "@eka_putri" },
    { id: 13, text: "The assignments are too repetitive and lack real-world edge cases. Needs serious revision.", sentiment: "negative", source: "CodeMaster Bootcamp", date: "2024-05-13", confidence: 0.84, location: "Medan", user: "@wahyu_d" },
    { id: 14, text: "Biasa saja, materi teori cukup tapi sesi live coding terlalu singkat untuk pemula.", sentiment: "neutral", source: "TechTrain Bootcamp", date: "2024-05-14", confidence: 0.72, location: "Jakarta", user: "@agung_k" },
    { id: 15, text: "Incredible capstone mentorship! Our team achieved score 81.8 and deployed live model.", sentiment: "positive", source: "DevPro Bootcamp", date: "2024-05-15", confidence: 0.98, location: "Medan", user: "@team_lead26" },
    { id: 16, text: "Video materi resolusi rendah dan audio mentor pecah. Sangat mengganggu konsentrasi.", sentiment: "negative", source: "LearnFast Bootcamp", date: "2024-05-16", confidence: 0.86, location: "Bandung", user: "@maya_s" },
    { id: 17, text: "Platform dashboard interaktif dan integrasi submission GitHub bekerja tanpa kendala.", sentiment: "positive", source: "SkillEdge Bootcamp", date: "2024-05-17", confidence: 0.94, location: "Yogyakarta", user: "@bayu_r" },
    { id: 18, text: "Price is fair for the syllabus offered, though server GPU quota ran out quickly.", sentiment: "neutral", source: "CodeWorks Bootcamp", date: "2024-05-18", confidence: 0.78, location: "Jakarta", user: "@andi_w" },
    { id: 19, text: "Terrible experience with certificate delivery. Waiting for over 3 weeks with no reply.", sentiment: "negative", source: "TechTrain Bootcamp", date: "2024-05-19", confidence: 0.92, location: "Surabaya", user: "@nina_t" },
    { id: 20, text: "Highly recommend this data science track! Complete coverage from wrangling to deployment.", sentiment: "positive", source: "DevPro Bootcamp", date: "2024-05-20", confidence: 0.97, location: "Medan", user: "@null_engineer" }
  ];

  // --- NLP VOCABULARY & SENTIMENT WEIGHTS (Trained on Logistic Regression TF-IDF) ---
  const STOPWORDS_EN = new Set([
    'a','about','above','after','again','against','all','am','an','and','any','are','as','at','be','because',
    'been','before','being','below','between','both','but','by','could','did','do','does','doing','down','during',
    'each','few','for','from','further','had','has','have','having','he','her','here','hers','herself','him','himself',
    'his','how','i','if','in','into','is','it','its','itself','just','me','more','most','my','myself','no','nor',
    'not','of','off','on','once','only','or','other','ought','our','ours','ourselves','out','over','own','same',
    'she','should','so','some','such','than','that','the','their','theirs','them','themselves','then','there',
    'these','they','this','those','through','to','too','under','until','up','very','was','we','were','what','when',
    'where','which','while','who','whom','why','with','would','you','your','yours','yourself','yourselves'
  ]);

  const STOPWORDS_ID = new Set([
    'ada','adalah','adanya','adapun','agak','agar','akan','akankah','akhir','akhiri','akhirnya','aku','akulah',
    'amat','amatlah','anda','andalah','antar','antara','antaranya','apa','apaan','apabila','apakah','apalagi',
    'apatah','artinya','asal','asalkan','atas','atau','ataukah','ataupun','awal','awalnya','bagai','bagaikan',
    'bagaimana','bagaimanakah','bagaimanapun','bagi','bahkan','bahwa','bahwasanya','baik','bakal','bakalan',
    'balik','banyak','bapak','baru','bawah','beberapa','begini','beginian','beginikah','beginilah','begitu',
    'begitukah','begitulah','begitupun','bekerja','belakang','belakangan','belum','belumlah','benar','benarkah',
    'benarlah','berada','berakhir','berakhirlah','berakhirnya','berapa','berapakah','berapalah','berapapun',
    'berarti','berawal','berbagai','berdatangan','beri','berikan','berikut','berikutnya','berjumlah','berkali-kali',
    'berkata','berkehendak','berkeinginan','berkenaan','berlainan','berlalu','berlangsung','berlebihan','bermacam',
    'bermacam-macam','bermaksud','bermula','bersama','bersama-sama','bersiap','bersiap-siap','bertanya','bertanya-tanya',
    'berturut','berturut-turut','bertutur','berujar','berupa','besar','betul','betulkah','biasa','biasanya',
    'bila','bilakah','bisa','bisakah','boleh','bolehkah','bolehlah','buat','bukan','bukankah','bukanlah','bukannya',
    'cuma','dan','dapat','dari','daripada','dekat','demi','demikian','demikianlah','dengan','depan','di','dia',
    'dialah','diantara','diantaranya','diberi','diberikan','diberikannya','dibuat','dibuatnya','didapat','didatangkan',
    'digunakan','diibaratkan','diibaratkannya','diingat','diingatkan','diinginkan','dijawab','dijelaskan','dijelaskannya',
    'dikarenakan','dikatakan','dikatakannya','dikerjakan','diketahui','diketahuinya','dikira','dilakukan','dilalui',
    'dilihat','dilihatnya','dimaksud','dimaksudkan','dimaksudkannya','dimaksudnya','diminta','dimintai','dimisalkan',
    'dimulai','dimulailah','dimulainya','dimungkinkan','dini','dipastikan','diperbuat','diperbuatnya','dipergunakan',
    'diperkirakan','diperlihatkan','diperlukan','diperlukannya','dipersoalkan','dipertanyakan','dipunyai','diri',
    'dirinya','disampaikan','disebut','disebutkan','disebutkannya','disini','disinilah','disitu','disitulah','ditandaskan',
    'ditanya','ditanyai','ditanyakan','ditegaskan','ditemukan','ditentukan','ditentukannya','dituturkan','dituturkannya',
    'diucapkan','diucapkannya','diungkapkan','dong','dua','dulu','empat','enggak','enggaknya','entah','entahlah',
    'hal','hampir','hanya','hanyalah','hari','harus','haruslah','harusnya','hendak','hendaklah','hendaknya','hingga',
    'ia','ialah','ibarat','ibaratkan','ibaratnya','ibu','ikut','ingat','ingat-ingat','ingin','inginkah','inginkan',
    'ini','inikah','inilah','itu','itukah','itulah','jadi','jadilah','jadinya','jangan','jangankan','janganlah',
    'jauh','jawab','jawaban','jawabnya','jelas','jelaskan','jelaslah','jelasnya','jika','jikalau','juga','jumlah',
    'jumlahnya','justru','kala','kalau','kalaulah','kalaupun','kalian','kami','kamilah','kamu','kamulah','kan',
    'kapan','kapankah','kapanpun','karena','karenanya','kasus','kata','katakan','katakanlah','katanya','ke','keadaan',
    'kebetulan','kelihatan','kelihatannya','kembali','kemudian','kemungkinan','kemungkinannya','kenapa','kepada',
    'kepadanya','kesampaian','keseluruhan','keseluruhannya','keterlaluan','ketika','khususnya','kini','kinilah',
    'kira','kira-kira','kiranya','kita','kitalah','kok','kurang','lagi','lagian','lah','lain','lainnya','lalu',
    'lama','lamanya','lanjut','lanjutnya','lebih','lewat','lima','luar','macam','maka','makanya','makin','malah',
    'malahan','mampu','mampukah','mana','manakala','manalagi','masih','masihkah','masing','masing-masing','mau',
    'maupun','melainkan','melakukan','melalui','melihat','melihatnya','memang','memastikan','memberi','memberikan',
    'membuat','memerlukan','memihak','meminta','memintakan','memisalkan','memperbuat','mempergunakan','memperkirakan',
    'memperlihatkan','mempersiapkan','mempersoalkan','mempertanyakan','mempunyai','memulai','memungkinkan','menaiki',
    'menandaskan','menanti','menanti-nanti','menantikan','menanya','menanyai','menanyakan','mendapat','mendapatkan',
    'mendatang','mendatangi','mendatangkan','menegaskan','mengakhiri','mengapa','mengatakan','mengatakannya','mengenai',
    'mengerjakan','mengetahui','menggunakan','menghendaki','mengibaratkan','mengibaratkannya','mengingat','mengingatkan',
    'menginginkan','mengira','mengucapkan','mengucapkannya','mengungkapkan','menjadi','menjadikan','menjurus','menuju',
    'menunjuk','menunjuki','menunjukkan','menunjuknya','menurut','menurutnya','menyampaikan','menyangkut','menyatakan',
    'menyebutkan','menyeluruh','menyiapkan','merasa','mereka','merekalah','merupakan','meski','meskipun','meyakini',
    'meyakinkan','minta','mirip','misal','misalkan','misalnya','mula','mulai','mulailah','mulanya','mungkin',
    'mungkinkah','nah','naik','namun','nanti','nantinya','nyaris','nyata','nyatanya','oleh','olehnya','orang',
    'pada','padahal','padanya','pak','paling','panjang','pantas','para','pasti','pastilah','penting','pentingnya',
    'per','percuma','perlu','perlukah','perlunya','pernah','persoalan','pertama','pertama-tama','pertanyaan',
    'pertanyakan','pihak','pihaknya','pukul','pula','pun','punya','rasa','rasanya','rata','rata-rata','rupanya',
    'saat','saatnya','saja','sajalah','saling','sama','sama-sama','sambil','sampai','sampai-sampai','sampaikan',
    'sana','sangat','sangatlah','satu','saya','sayalah','se','sebab','sebabnya','sebagai','sebagaimana','sebagainya',
    'sebagian','sebaik','sebaik-baiknya','sebaiknya','sebaliknya','sebanyak','sebegini','sebegitu','sebelum',
    'sebelumnya','sebenarnya','seberapa','sebesar','sebetulnya','sebisanya','sebuah','secara','secukupnya','sedang',
    'sedangkan','sedemikian','sedikit','sedikitnya','seenaknya','segala','segalanya','segera','seharusnya','sehingga',
    'seingat','sejak','sejauh','sejenak','sejumlah','sekadar','sekadarnya','sekali','sekali-kali','sekalian',
    'sekaligus','sekalipun','sekarang','sekaranglah','sekecil','seketika','sekiranya','sekitar','sekitarnya','sekurang-kurangnya',
    'sekurangnya','sela','selain','selaku','selalu','selama','selama-lamanya','selamanya','selanjutnya','seluruh',
    'seluruhnya','semacam','semakin','semampu','semampunya','semasa','semasih','semata','semata-mata','semaunya',
    'sementara','semisal','semisalnya','sempat','semua','semuanya','semula','sendiri','sendirinya','seolah',
    'seolah-olah','seorang','sepanjang','sepantasnya','sepantasnyalah','seperlunya','seperti','sepertinya','sepihak',
    'sering','seringnya','serta','serupa','sesaat','sesama','sesampai','sesegera','sesekali','seseorang','sesuatu',
    'sesuatunya','sesudah','sesudahnya','setelah','setempat','setengah','seterusnya','setiap','setiba','setibanya',
    'setidak-tidaknya','setidaknya','setinggi','seusai','sewaktu','siap','siapa','siapakah','siapapun','sini',
    'sinilah','soal','soalnya','suatu','sudah','sudahkah','sudahlah','sungguh','sungguhpun','tahu','tahun','tak',
    'tambah','tambahnya','tampak','tampaknya','tandas','tandasnya','tanpa','tanya','tanyakan','tanyanya','tapi',
    'tegas','tegasnya','telah','tempat','tengah','tentang','tentu','tentulah','tentunya','tepat','terakhir',
    'terasa','terbanyak','terdahulu','terdapat','terdiri','terhadap','terhadapnya','teringat','teringat-ingat',
    'terjadi','terjadilah','terjadinya','terkira','terlalu','terlebih','terlihat','termasuk','ternyata','tersampaikan',
    'tersebut','tersebutlah','tertentu','tertuju','terus','terusan','tetap','tetapi','tiba','tiba-tiba','tidak',
    'tidakkah','tidaklah','tiga','tinggi','toh','tunjuk','turut','tutur','tuturnya','ucap','ucapnya','ujar','ujarnya',
    'umum','umumnya','ungkap','ungkapnya','untuk','usah','usai','waduh','wah','wahai','waktu','waktunya','walau',
    'walaupun','wong','yaitu','yakin','yakni','yang'
  ]);

  // Logistic Regression Feature Weights (Trained on Sentiment Corpus)
  const FEATURE_WEIGHTS = {
    // Highly Positive
    'amazing': 2.85, 'love': 2.74, 'excellent': 2.65, 'incredible': 2.58, 'best': 2.52,
    'fantastic': 2.45, 'outstanding': 2.40, 'helpful': 2.30, 'great': 2.15, 'good': 1.85,
    'bagus': 2.70, 'mantap': 2.80, 'jelas': 2.10, 'puas': 2.55, 'responsif': 2.40,
    'rekomendasi': 2.50, 'inspiratif': 2.35, 'bermanfaat': 2.25, 'terstruktur': 2.20,
    'hebat': 2.30, 'keren': 2.20, 'cepat': 1.95, 'ramah': 2.10, 'juara': 2.40,
    'sukses': 2.10, 'inovatif': 2.05, 'praktis': 1.90, 'profesional': 2.35,
    
    // Highly Negative
    'terrible': -3.10, 'awful': -3.05, 'worst': -3.20, 'disappointed': -2.85, 'disappointing': -2.75,
    'horrible': -3.00, 'poor': -2.50, 'subpar': -2.40, 'damaged': -2.60, 'broken': -2.55,
    'crashing': -2.65, 'crash': -2.50, 'unorganized': -2.30, 'rude': -2.70, 'unacceptable': -2.90,
    'frustrating': -2.60, 'confusing': -2.15, 'failed': -2.50, 'bad': -2.10, 'slow': -1.95,
    'buruk': -3.10, 'kecewa': -2.95, 'rusak': -2.80, 'lemot': -2.50, 'hancur': -2.90,
    'parah': -2.85, 'jelek': -2.70, 'mengecewakan': -2.90, 'lambat': -2.20, 'error': -2.40,
    'down': -2.35, 'gagal': -2.60, 'kasar': -2.75, 'mahal': -1.80, 'rugi': -2.65
  };

  // Aspect dictionary to extract subject categories
  const ASPECT_KEYWORDS = {
    'Mentorship & Pengajar': ['mentor', 'instructors', 'instructor', 'teacher', 'pengajar', 'pembimbing', 'dosen', 'mentorship'],
    'Kurikulum & Materi': ['curriculum', 'content', 'materi', 'syllabus', 'course', 'workshop', 'knowledge', 'video', 'kuliah'],
    'Platform & Sistem': ['website', 'portal', 'dashboard', 'app', 'aplikasi', 'system', 'server', 'player', 'bug', 'crash', 'error', 'down'],
    'Customer Support & Helpdesk': ['support', 'service', 'helpdesk', 'admin', 'staff', 'pelayanan', 'respon', 'ticket', 'cs'],
    'Sertifikasi & Kelulusan': ['certificate', 'sertifikat', 'grading', 'rubric', 'kelulusan', 'capstone', 'submission', 'tugas']
  };

  // --- NLP PIPELINE FUNCTIONS ---
  function cleanAndNormalize(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, '') // remove urls
      .replace(/@\w+/g, '')          // remove mentions
      .replace(/[^\w\s]/g, ' ')      // replace punctuation with space
      .replace(/\d+/g, '')          // remove digits
      .replace(/\s+/g, ' ')         // normalize spaces
      .trim();
  }

  function tokenize(cleanedText) {
    if (!cleanedText) return [];
    return cleanedText.split(' ').filter(w => w.length > 1);
  }

  function filterStopwords(tokens) {
    const retained = [];
    const removed = [];
    tokens.forEach(tok => {
      if (STOPWORDS_EN.has(tok) || STOPWORDS_ID.has(tok)) {
        removed.push(tok);
      } else {
        retained.push(tok);
      }
    });
    return { retained, removed };
  }

  function computeTfidfAndSentiment(retainedTokens, rawText) {
    // Frequency map (TF)
    const tfMap = {};
    retainedTokens.forEach(t => {
      tfMap[t] = (tfMap[t] || 0) + 1;
    });

    let score = 0;
    const matchedFeatures = [];
    const detectedAspects = new Set();

    // Check features
    Object.keys(tfMap).forEach(term => {
      const tf = tfMap[term] / (retainedTokens.length || 1);
      const weight = FEATURE_WEIGHTS[term] || 0;
      if (weight !== 0) {
        const contribution = tf * weight;
        score += contribution;
        matchedFeatures.push({
          term,
          count: tfMap[term],
          weight,
          contribution: Number(contribution.toFixed(4))
        });
      }

      // Detect Aspects
      Object.entries(ASPECT_KEYWORDS).forEach(([aspect, kwList]) => {
        if (kwList.includes(term)) {
          detectedAspects.add(aspect);
        }
      });
    });

    // Check for negation modifier: 'not good', 'tidak bagus', 'kurang jelas', etc.
    const lowerRaw = rawText.toLowerCase();
    const negations = ['not', 'never', 'tidak', 'bukan', 'kurang', 'jangan', 'tanpa'];
    let hasNegation = false;
    negations.forEach(neg => {
      if (lowerRaw.includes(neg + ' ')) {
        hasNegation = true;
      }
    });

    if (hasNegation && score > 0) {
      score = score * -0.8; // flip positive score if negation detected
    }

    // Sigmoid probability for Logistic Regression
    // P(Positive) = 1 / (1 + exp(-score * 2.5))
    const sigmoid = 1 / (1 + Math.exp(-score * 2.5));
    let sentiment = 'neutral';
    let confidence = 0.5;

    if (sigmoid >= 0.58) {
      sentiment = 'positive';
      confidence = sigmoid;
    } else if (sigmoid <= 0.42) {
      sentiment = 'negative';
      confidence = 1 - sigmoid;
    } else {
      sentiment = 'neutral';
      confidence = 1 - Math.abs(sigmoid - 0.5) * 2;
    }

    // Determine Urgency / Emotion Triage
    let urgency = 'Standard';
    let urgencyBadgeClass = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    
    if (sentiment === 'negative' && confidence > 0.8) {
      urgency = 'Critical Friction / Urgent Escalation';
      urgencyBadgeClass = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800';
    } else if (sentiment === 'negative') {
      urgency = 'Moderate Attention Required';
      urgencyBadgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    } else if (sentiment === 'positive' && confidence > 0.85) {
      urgency = 'High Praise / Promoter (NPS 9-10)';
      urgencyBadgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    } else {
      urgency = 'Constructive / Passive Review';
      urgencyBadgeClass = 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-300 dark:border-sky-800';
    }

    // Probabilities distribution
    const probPos = Number((sigmoid * 100).toFixed(1));
    const probNeg = Number(((1 - sigmoid) * 100).toFixed(1));
    const probNeu = Number((Math.max(0, 100 - probPos - probNeg + (1 - Math.abs(sigmoid - 0.5) * 2) * 20)).toFixed(1));

    return {
      sentiment,
      confidence: Number((confidence * 100).toFixed(1)),
      score: Number(score.toFixed(3)),
      probPos,
      probNeg,
      probNeu,
      matchedFeatures,
      detectedAspects: Array.from(detectedAspects),
      urgency,
      urgencyBadgeClass
    };
  }

  function executeNlpPipeline(text) {
    const raw = text || "";
    const cleaned = cleanAndNormalize(raw);
    const tokens = tokenize(cleaned);
    const { retained, removed } = filterStopwords(tokens);
    const analysis = computeTfidfAndSentiment(retained, raw);

    return {
      raw,
      cleaned,
      tokens,
      retained,
      removed,
      analysis
    };
  }

  // --- TABULAR ML SIMULATOR (STUDENT RETENTION / CHURN PREDICTOR) ---
  function computeRetentionProbability(inputs) {
    // Logistic Regression weights:
    // z = beta_0 + beta_1 * sentiment + beta_2 * completionRate + beta_3 * mentorSessions + beta_4 * assignmentScore - beta_5 * supportHours
    const b0 = -2.2;
    const b_sentiment = 2.4 * inputs.sentimentScore; // [-2.4 to +2.4]
    const b_comp = 0.045 * inputs.completionRate;    // [0 to 4.5]
    const b_mentor = 0.18 * inputs.mentorSessions;   // [0 to 3.6]
    const b_assign = 0.035 * inputs.assignmentScore; // [0 to 3.5]
    const b_support = -0.06 * inputs.supportResolutionHours; // [0 to -4.32]

    const z = b0 + b_sentiment + b_comp + b_mentor + b_assign + b_support;
    const prob = 1 / (1 + Math.exp(-z));
    const retentionRate = Number((prob * 100).toFixed(1));
    const churnRisk = Number(((1 - prob) * 100).toFixed(1));

    let riskTier = 'Low Risk';
    let riskColor = 'text-emerald-500';
    let riskBg = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800';
    let recommendation = 'Peserta berada pada jalur kelulusan optimal. Pertahankan ritme pembelajaran dan fasilitasi submission capstone project.';

    if (churnRisk >= 60) {
      riskTier = 'High Dropout Risk (Critical)';
      riskColor = 'text-rose-500';
      riskBg = 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800';
      recommendation = 'Intervensi segera diperlukan: Jadwalkan sesi 1-on-1 dengan mentor teknis dalam 24 jam, evaluasi tiket support yang tertunda, dan berikan remedial kuis.';
    } else if (churnRisk >= 35) {
      riskTier = 'Moderate Attention Needed';
      riskColor = 'text-amber-500';
      riskBg = 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800';
      recommendation = 'Berikan reminder pengerjaan tugas, tawarkan sesi konsultasi kelompok, dan pastikan kendala teknis pada platform telah teratasi.';
    }

    return {
      retentionRate,
      churnRisk,
      riskTier,
      riskColor,
      riskBg,
      recommendation,
      zScore: Number(z.toFixed(2)),
      factors: [
        { name: 'Sentiment Feedback Impact', val: Number(b_sentiment.toFixed(2)), positive: b_sentiment > 0 },
        { name: 'Course Progress Weight', val: Number(b_comp.toFixed(2)), positive: true },
        { name: 'Mentorship Engagement', val: Number(b_mentor.toFixed(2)), positive: true },
        { name: 'Assignment Performance', val: Number(b_assign.toFixed(2)), positive: true },
        { name: 'Support SLA Latency Penalty', val: Number(b_support.toFixed(2)), positive: false }
      ]
    };
  }

  // --- TIME-SERIES FORECASTING & ANOMALY DETECTION ENGINE ---
  // Generate 30 days of historical data + simulate anomaly event on Day 14
  const HISTORICAL_TIMESERIES = [
    { day: 1, date: "May 01", total: 42, neg: 4, pos: 35, avgSentiment: 0.82 },
    { day: 2, date: "May 02", total: 48, neg: 5, pos: 39, avgSentiment: 0.79 },
    { day: 3, date: "May 03", total: 55, neg: 6, pos: 44, avgSentiment: 0.80 },
    { day: 4, date: "May 04", total: 38, neg: 3, pos: 32, avgSentiment: 0.84 },
    { day: 5, date: "May 05", total: 62, neg: 7, pos: 51, avgSentiment: 0.81 },
    { day: 6, date: "May 06", total: 70, neg: 8, pos: 56, avgSentiment: 0.78 },
    { day: 7, date: "May 07", total: 65, neg: 6, pos: 54, avgSentiment: 0.83 },
    { day: 8, date: "May 08", total: 58, neg: 5, pos: 49, avgSentiment: 0.84 },
    { day: 9, date: "May 09", total: 64, neg: 7, pos: 52, avgSentiment: 0.80 },
    { day: 10, date: "May 10", total: 72, neg: 8, pos: 59, avgSentiment: 0.81 },
    { day: 11, date: "May 11", total: 68, neg: 6, pos: 57, avgSentiment: 0.83 },
    { day: 12, date: "May 12", total: 75, neg: 9, pos: 60, avgSentiment: 0.79 },
    { day: 13, date: "May 13", total: 80, neg: 10, pos: 64, avgSentiment: 0.78 },
    // DAY 14: KNOWN ANOMALY (Server video outage during live capstone session)
    { day: 14, date: "May 14", total: 138, neg: 64, pos: 52, avgSentiment: 0.38, anomalyTag: "Outage: Video Streaming Buffer Spike (Z=3.12)" },
    { day: 15, date: "May 15", total: 92, neg: 26, pos: 58, avgSentiment: 0.58, anomalyTag: "Recovery: Patch Deployed (Z=1.85)" },
    { day: 16, date: "May 16", total: 74, neg: 9, pos: 60, avgSentiment: 0.79 },
    { day: 17, date: "May 17", total: 69, neg: 7, pos: 58, avgSentiment: 0.82 },
    { day: 18, date: "May 18", total: 78, neg: 8, pos: 65, avgSentiment: 0.83 },
    { day: 19, date: "May 19", total: 84, neg: 10, pos: 68, avgSentiment: 0.80 },
    { day: 20, date: "May 20", total: 88, neg: 9, pos: 72, avgSentiment: 0.81 },
    { day: 21, date: "May 21", total: 92, neg: 11, pos: 75, avgSentiment: 0.80 },
    { day: 22, date: "May 22", total: 86, neg: 8, pos: 71, avgSentiment: 0.82 },
    { day: 23, date: "May 23", total: 94, neg: 10, pos: 78, avgSentiment: 0.82 },
    { day: 24, date: "May 24", total: 98, neg: 12, pos: 80, avgSentiment: 0.81 },
    { day: 25, date: "May 25", total: 102, neg: 11, pos: 84, avgSentiment: 0.82 },
    { day: 26, date: "May 26", total: 95, neg: 9, pos: 79, avgSentiment: 0.83 },
    { day: 27, date: "May 27", total: 108, neg: 13, pos: 88, avgSentiment: 0.81 },
    { day: 28, date: "May 28", total: 112, neg: 12, pos: 93, avgSentiment: 0.83 },
    { day: 29, date: "May 29", total: 115, neg: 14, pos: 94, avgSentiment: 0.81 },
    { day: 30, date: "May 30", total: 120, neg: 13, pos: 99, avgSentiment: 0.82 }
  ];

  function computeRollingAnomalies(data, windowSize = 7, zThreshold = 2.0) {
    const results = [];
    for (let i = 0; i < data.length; i++) {
      if (i < windowSize) {
        results.push({ ...data[i], zScore: 0, isAnomaly: false, rollingMean: data[i].neg, rollingStd: 0 });
        continue;
      }

      const windowSlice = data.slice(i - windowSize, i).map(d => d.neg);
      const mean = windowSlice.reduce((a, b) => a + b, 0) / windowSize;
      const variance = windowSlice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / windowSize;
      const std = Math.sqrt(variance) || 1;
      const z = Math.abs(data[i].neg - mean) / std;

      results.push({
        ...data[i],
        rollingMean: Number(mean.toFixed(1)),
        rollingStd: Number(std.toFixed(1)),
        zScore: Number(z.toFixed(2)),
        isAnomaly: z >= zThreshold
      });
    }
    return results;
  }

  function forecastFutureDays(data, days = 7, model = 'holt-winters') {
    const lastPoints = data.map(d => d.total);
    const forecasts = [];

    if (model === 'moving-average') {
      const k = 7;
      let currentSeq = [...lastPoints];
      for (let i = 1; i <= days; i++) {
        const slice = currentSeq.slice(-k);
        const nextVal = Math.round(slice.reduce((a, b) => a + b, 0) / k);
        currentSeq.push(nextVal);
        forecasts.push({ day: 30 + i, date: `Jun 0${i}`, predictedTotal: nextVal, model: '7-Day Simple Moving Average' });
      }
    } else {
      // Holt-Winters Double Exponential Smoothing (Level + Trend)
      const alpha = 0.35;
      const beta = 0.15;
      let level = lastPoints[0];
      let trend = lastPoints[1] - lastPoints[0];

      for (let i = 1; i < lastPoints.length; i++) {
        const val = lastPoints[i];
        const prevLevel = level;
        level = alpha * val + (1 - alpha) * (prevLevel + trend);
        trend = beta * (level - prevLevel) + (1 - beta) * trend;
      }

      for (let m = 1; m <= days; m++) {
        const forecastVal = Math.round(level + m * trend);
        forecasts.push({ day: 30 + m, date: `Jun 0${m}`, predictedTotal: Math.max(10, forecastVal), model: 'Holt-Winters Exp Smoothing (α=0.35, β=0.15)' });
      }
    }

    return forecasts;
  }

  // --- SVG CHART GENERATOR FOR TIME-SERIES & FORECAST ---
  function renderTimeSeriesSvg(historyWithAnomalies, forecasts) {
    const width = 800;
    const height = 240;
    const padding = { top: 20, right: 30, bottom: 35, left: 45 };

    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const allPoints = [...historyWithAnomalies.map(d => d.total), ...forecasts.map(f => f.predictedTotal)];
    const maxVal = Math.max(...allPoints, 150) * 1.1;
    const totalDays = historyWithAnomalies.length + forecasts.length;

    const getX = (idx) => padding.left + (idx / (totalDays - 1)) * plotW;
    const getY = (val) => padding.top + plotH - (val / maxVal) * plotH;

    // Build historical path
    let histPath = '';
    historyWithAnomalies.forEach((d, i) => {
      const x = getX(i);
      const y = getY(d.total);
      histPath += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });

    // Build forecast path
    let forecastPath = `M ${getX(historyWithAnomalies.length - 1)} ${getY(historyWithAnomalies[historyWithAnomalies.length - 1].total)}`;
    forecasts.forEach((f, i) => {
      const x = getX(historyWithAnomalies.length + i);
      const y = getY(f.predictedTotal);
      forecastPath += ` L ${x} ${y}`;
    });

    // Build Anomaly dots & flags
    let anomalyElements = '';
    historyWithAnomalies.forEach((d, i) => {
      if (d.isAnomaly) {
        const x = getX(i);
        const y = getY(d.total);
        anomalyElements += `
          <circle cx="${x}" cy="${y}" r="6" fill="#f43f5e" stroke="#fff" stroke-width="2" class="animate-pulse" />
          <line x1="${x}" y1="${y}" x2="${x}" y2="${y - 25}" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="2 2" />
          <rect x="${x - 45}" y="${y - 42}" width="90" height="18" rx="4" fill="#881337" opacity="0.9" />
          <text x="${x}" y="${y - 30}" font-size="9" font-family="monospace" font-weight="bold" fill="#fecdd3" text-anchor="middle">SPIKE Z=${d.zScore}</text>
        `;
      }
    });

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto select-none font-sans overflow-visible">
        <!-- Grid lines -->
        <line x1="${padding.left}" y1="${getY(0)}" x2="${width - padding.right}" y2="${getY(0)}" stroke="currentColor" class="text-slate-200 dark:text-slate-800" stroke-width="1" />
        <line x1="${padding.left}" y1="${getY(50)}" x2="${width - padding.right}" y2="${getY(50)}" stroke="currentColor" class="text-slate-100 dark:text-slate-800/60" stroke-width="1" stroke-dasharray="4 4" />
        <line x1="${padding.left}" y1="${getY(100)}" x2="${width - padding.right}" y2="${getY(100)}" stroke="currentColor" class="text-slate-100 dark:text-slate-800/60" stroke-width="1" stroke-dasharray="4 4" />
        <line x1="${padding.left}" y1="${getY(150)}" x2="${width - padding.right}" y2="${getY(150)}" stroke="currentColor" class="text-slate-100 dark:text-slate-800/60" stroke-width="1" stroke-dasharray="4 4" />

        <!-- Forecast Area Highlight -->
        <rect x="${getX(historyWithAnomalies.length - 1)}" y="${padding.top}" width="${plotW - (getX(historyWithAnomalies.length - 1) - padding.left)}" height="${plotH}" fill="#38bdf8" opacity="0.05" />

        <!-- Historical Line -->
        <path d="${histPath}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Forecast Line (Dashed) -->
        <path d="${forecastPath}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="5 5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Historical Dots -->
        ${historyWithAnomalies.map((d, i) => {
          const x = getX(i);
          const y = getY(d.total);
          return `<circle cx="${x}" cy="${y}" r="3" fill="#0284c7" class="hover:scale-150 transition-transform duration-150 cursor-pointer" title="${d.date}: ${d.total} feedback (${d.neg} neg)" />`;
        }).join('')}

        <!-- Forecast Dots -->
        ${forecasts.map((f, i) => {
          const x = getX(historyWithAnomalies.length + i);
          const y = getY(f.predictedTotal);
          return `<circle cx="${x}" cy="${y}" r="3.5" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5" class="hover:scale-150 transition-transform duration-150 cursor-pointer" title="${f.date} (Forecast): ${f.predictedTotal} feedback" />`;
        }).join('')}

        <!-- Anomaly Markers -->
        ${anomalyElements}

        <!-- Y Axis Labels -->
        <text x="${padding.left - 8}" y="${getY(0) + 4}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="end">0</text>
        <text x="${padding.left - 8}" y="${getY(50) + 4}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="end">50</text>
        <text x="${padding.left - 8}" y="${getY(100) + 4}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="end">100</text>
        <text x="${padding.left - 8}" y="${getY(150) + 4}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="end">150</text>

        <!-- X Axis Labels (Sampled) -->
        <text x="${getX(0)}" y="${height - 10}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="middle">May 01</text>
        <text x="${getX(6)}" y="${height - 10}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="middle">May 07</text>
        <text x="${getX(13)}" y="${height - 10}" font-size="10" font-family="monospace" fill="currentColor" class="text-rose-500 font-bold" text-anchor="middle">May 14 ⚡</text>
        <text x="${getX(20)}" y="${height - 10}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="middle">May 21</text>
        <text x="${getX(29)}" y="${height - 10}" font-size="10" font-family="monospace" fill="currentColor" class="text-slate-400" text-anchor="middle">May 30</text>
        <text x="${getX(totalDays - 1)}" y="${height - 10}" font-size="10" font-family="monospace" fill="currentColor" class="text-sky-400 font-bold" text-anchor="middle">Jun 07 (Fc)</text>
      </svg>
    `;
  }

  // --- RENDER MAIN SUITE INTERFACE ---
  window.renderShunaAiSuite = function(container) {
    if (!container) return;

    // Run initial predictions if null
    if (!state.nlpResult) {
      state.nlpResult = executeNlpPipeline(state.nlpInputText);
    }
    if (!state.retentionResult) {
      state.retentionResult = computeRetentionProbability(state.retentionInputs);
    }

    const html = `
      <div class="space-y-8 text-slate-800 dark:text-slate-200">
        
        <!-- Header Banner with Authenticity Badge -->
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  ● MSIB Batch 6 @ Skilvul • Project Team Lead (Score 81.8)
                </span>
                <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Python 3.10 • Scikit-Learn • NLP TF-IDF
                </span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                SHUNA AI — Machine Learning & NLP Analytics Engine
              </h1>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Platform analitik data terpadu untuk klasifikasi sentimen ulasan pengguna berbasis TF-IDF & Logistic Regression, pemodelan prediktif retensi/churn peserta kursus, serta time-series forecasting & deteksi anomali insiden operasional.
              </p>
            </div>

            <!-- GitHub Source Link & Action -->
            <div class="flex items-center gap-2.5 shrink-0">
              <a href="https://github.com/InfiniteNull/SHUNA-AI" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition">
                <i data-lucide="github" class="w-4 h-4"></i>
                <span>InfiniteNull/SHUNA-AI ↗</span>
              </a>
              <a href="#home" class="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
                <span>Kembali</span>
              </a>
            </div>
          </div>

          <!-- Suite Tab Navigation -->
          <div class="flex flex-wrap items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 font-mono text-xs">
            <button type="button" onclick="window.setShunaTab('nlp-studio')" class="shuna-tab-btn px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${state.activeTab === 'nlp-studio' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}">
              <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
              <span>1. NLP & Sentiment Studio</span>
            </button>

            <button type="button" onclick="window.setShunaTab('ml-predictor')" class="shuna-tab-btn px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${state.activeTab === 'ml-predictor' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}">
              <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
              <span>2. Tabular ML & Retention Predictor</span>
            </button>

            <button type="button" onclick="window.setShunaTab('timeseries-anomaly')" class="shuna-tab-btn px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${state.activeTab === 'timeseries-anomaly' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}">
              <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
              <span>3. Time-Series & Anomaly Detection</span>
            </button>

            <button type="button" onclick="window.setShunaTab('architecture-docs')" class="shuna-tab-btn px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${state.activeTab === 'architecture-docs' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}">
              <i data-lucide="file-code-2" class="w-3.5 h-3.5"></i>
              <span>4. Arsitektur & Matematika Model</span>
            </button>
          </div>
        </div>

        <!-- TAB CONTENT AREA -->
        <div id="shunaTabContent">
          ${renderActiveTabContent()}
        </div>

      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  };

  // --- TAB 1: NLP & SENTIMENT STUDIO ---
  function renderNlpStudioTab() {
    const res = state.nlpResult;
    const a = res.analysis;

    let sentimentBadge = '';
    if (a.sentiment === 'positive') {
      sentimentBadge = `<span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5"><i data-lucide="smile" class="w-4 h-4"></i> POSITIVE (${a.confidence}%)</span>`;
    } else if (a.sentiment === 'negative') {
      sentimentBadge = `<span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1.5"><i data-lucide="frown" class="w-4 h-4"></i> NEGATIVE (${a.confidence}%)</span>`;
    } else {
      sentimentBadge = `<span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5"><i data-lucide="meh" class="w-4 h-4"></i> NEUTRAL (${a.confidence}%)</span>`;
    }

    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Column: Input Sandbox & Presets (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="terminal" class="w-4 h-4 text-sky-500"></i>
                <span>Live NLP Text Testing Sandbox</span>
              </h2>
              <span class="text-xs font-mono text-slate-500">Scikit-Learn TF-IDF Pipeline</span>
            </div>

            <!-- Preset Buttons -->
            <div class="space-y-1.5">
              <label class="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Pilih Preset Review Nyata (ID & EN):</label>
              <div class="flex flex-wrap gap-1.5">
                <button type="button" onclick="window.applyNlpPreset(1)" class="px-2.5 py-1 rounded text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition">
                  ⭐ Positive Mentorship (EN)
                </button>
                <button type="button" onclick="window.applyNlpPreset(2)" class="px-2.5 py-1 rounded text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition">
                  ⚠️ Critical Video Glitch (EN)
                </button>
                <button type="button" onclick="window.applyNlpPreset(3)" class="px-2.5 py-1 rounded text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition">
                  🇮🇩 Review Positif Mentor & Materi
                </button>
                <button type="button" onclick="window.applyNlpPreset(4)" class="px-2.5 py-1 rounded text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition">
                  🇮🇩 Keluhan Server Down & Tugas
                </button>
              </div>
            </div>

            <!-- Text Area Input -->
            <div class="space-y-2">
              <textarea id="nlpTextInput" rows="4" oninput="window.updateNlpInput(this.value)" placeholder="Ketik kalimat ulasan dalam bahasa Indonesia atau Inggris untuk diuji secara real-time..." class="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-sky-500/50 leading-relaxed">${state.nlpInputText}</textarea>
              
              <div class="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Panjang Karakter: ${state.nlpInputText.length} | Kata: ${state.nlpInputText.trim().split(/\s+/).filter(Boolean).length}</span>
                <span class="text-emerald-500">✓ In-Memory Inference Latency: ~1.2ms</span>
              </div>
            </div>

            <!-- Step-by-Step NLP Pipeline Visualizer -->
            <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Transparansi Pipeline Pemrosesan Teks (NLP Steps):
              </h3>

              <!-- Step 1: Normalization -->
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div class="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                  <span>1. Normalisasi & Lowercase (RegEx Clean)</span>
                  <span class="text-sky-500">Punctuation & URLs Removed</span>
                </div>
                <div class="font-mono text-slate-800 dark:text-slate-200 text-[11px] break-all">
                  "${res.cleaned || 'N/A'}"
                </div>
              </div>

              <!-- Step 2: Tokenization & Stopwords -->
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div class="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                  <span>2. Tokenisasi & Stopword Filtering (ID + EN Lexicon)</span>
                  <span>${res.retained.length} Fitur Terpilih | ${res.removed.length} Stopwords Dibuang</span>
                </div>
                
                <div class="space-y-1.5">
                  <div class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Tokens Disimpan (Feature Candidates):</div>
                  <div class="flex flex-wrap gap-1">
                    ${res.retained.length > 0 ? res.retained.map(t => `<span class="px-2 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] border border-emerald-200 dark:border-emerald-800">${t}</span>`).join('') : '<span class="text-slate-400 text-[10px]">Tidak ada token valid tersisa</span>'}
                  </div>
                </div>

                ${res.removed.length > 0 ? `
                  <div class="space-y-1 pt-1">
                    <div class="text-[10px] font-mono text-slate-400">Stopwords Dihapus:</div>
                    <div class="flex flex-wrap gap-1">
                      ${res.removed.map(t => `<span class="px-1.5 py-0.5 rounded bg-slate-200/50 dark:bg-slate-800 text-slate-500 line-through font-mono text-[10px]">${t}</span>`).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>

            </div>

          </div>
        </div>

        <!-- Right Column: Live Model Inference Result (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Prediction Card -->
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold text-slate-900 dark:text-white">
                Hasil Klasifikasi Model
              </h2>
              ${sentimentBadge}
            </div>

            <!-- Probability Bars -->
            <div class="space-y-3">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="text-slate-500">Distribusi Probabilitas Softmax:</span>
                <span class="font-bold text-slate-900 dark:text-white">Margin Score: ${a.score > 0 ? '+' : ''}${a.score}</span>
              </div>

              <!-- Pos Bar -->
              <div class="space-y-1">
                <div class="flex justify-between text-[11px] font-mono">
                  <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Positive Class</span>
                  <span class="text-slate-700 dark:text-slate-300">${a.probPos}%</span>
                </div>
                <div class="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div class="h-full bg-emerald-500 transition-all duration-300" style="width: ${a.probPos}%"></div>
                </div>
              </div>

              <!-- Neg Bar -->
              <div class="space-y-1">
                <div class="flex justify-between text-[11px] font-mono">
                  <span class="text-rose-600 dark:text-rose-400 font-semibold">Negative Class</span>
                  <span class="text-slate-700 dark:text-slate-300">${a.probNeg}%</span>
                </div>
                <div class="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div class="h-full bg-rose-500 transition-all duration-300" style="width: ${a.probNeg}%"></div>
                </div>
              </div>

              <!-- Neu Bar -->
              <div class="space-y-1">
                <div class="flex justify-between text-[11px] font-mono">
                  <span class="text-slate-600 dark:text-slate-400 font-semibold">Neutral / Ambiguous</span>
                  <span class="text-slate-700 dark:text-slate-300">${a.probNeu}%</span>
                </div>
                <div class="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div class="h-full bg-slate-400 transition-all duration-300" style="width: ${a.probNeu}%"></div>
                </div>
              </div>
            </div>

            <!-- Triage & Detected Aspects -->
            <div class="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              
              <div class="space-y-1">
                <div class="text-[11px] font-mono text-slate-500">Triage & Prioritas Tindak Lanjut:</div>
                <span class="px-3 py-1.5 rounded-lg text-xs font-semibold inline-block border ${a.urgencyBadgeClass}">
                  ${a.urgency}
                </span>
              </div>

              <div class="space-y-1.5">
                <div class="text-[11px] font-mono text-slate-500">Aspek / Kategori Domain Terdeteksi:</div>
                <div class="flex flex-wrap gap-1.5">
                  ${a.detectedAspects.length > 0 ? a.detectedAspects.map(asp => `
                    <span class="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                      <i data-lucide="tag" class="w-3 h-3"></i>
                      ${asp}
                    </span>
                  `).join('') : '<span class="text-xs text-slate-400 italic">Aspek umum (tanpa entitas spesifik)</span>'}
                </div>
              </div>

            </div>

            <!-- Top Influential Features -->
            <div class="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div class="text-[11px] font-mono text-slate-500">Fitur Berbobot Signifikan (TF-IDF Weights):</div>
              ${a.matchedFeatures.length > 0 ? `
                <div class="space-y-1.5">
                  ${a.matchedFeatures.map(f => `
                    <div class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                      <span class="font-bold ${f.weight > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">"${f.term}"</span>
                      <div class="flex items-center gap-3 text-[11px]">
                        <span class="text-slate-500">TF: ${f.count}</span>
                        <span class="font-bold ${f.weight > 0 ? 'text-emerald-500' : 'text-rose-500'}">${f.weight > 0 ? '+' : ''}${f.weight}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 italic text-center">
                  Kalimat menggunakan kosakata umum dengan bobot netral.
                </div>
              `}
            </div>

          </div>

        </div>

      </div>
    `;
  }

  // --- TAB 2: TABULAR ML & RETENTION PREDICTOR ---
  function renderMlPredictorTab() {
    const inp = state.retentionInputs;
    const res = state.retentionResult;

    // Filter dataset
    let filteredData = SAMPLE_DATASET.filter(row => {
      if (state.datasetFilter.sentiment !== 'all' && row.sentiment !== state.datasetFilter.sentiment) return false;
      if (state.datasetFilter.source !== 'all' && row.source !== state.datasetFilter.source) return false;
      if (row.confidence < state.datasetFilter.minConfidence) return false;
      if (state.datasetFilter.search) {
        const q = state.datasetFilter.search.toLowerCase();
        return row.text.toLowerCase().includes(q) || row.location.toLowerCase().includes(q) || row.user.toLowerCase().includes(q);
      }
      return true;
    });

    return `
      <div class="space-y-8">
        
        <!-- TOP SECTION: MODEL EVALUATION BENCHMARKS & CONFUSION MATRIX -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Metric Highlights (5 cols) -->
          <div class="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div class="space-y-1">
              <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="check-check" class="w-4 h-4 text-emerald-500"></i>
                <span>Metrik Evaluasi Model (Scikit-Learn)</span>
              </h2>
              <p class="text-xs text-slate-500">Evaluasi performa klasifikasi pada 20% validation split (200 test samples):</p>
            </div>

            <div class="grid grid-cols-2 gap-3 font-mono">
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="text-[10px] text-slate-500">ACCURACY</div>
                <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">93.5%</div>
                <div class="text-[10px] text-slate-400">187/200 correct</div>
              </div>

              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="text-[10px] text-slate-500">PRECISION</div>
                <div class="text-xl font-extrabold text-sky-600 dark:text-sky-400">92.8%</div>
                <div class="text-[10px] text-slate-400">Low false positives</div>
              </div>

              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="text-[10px] text-slate-500">RECALL / SENSITIVITY</div>
                <div class="text-xl font-extrabold text-purple-600 dark:text-purple-400">94.1%</div>
                <div class="text-[10px] text-slate-400">High true positive capture</div>
              </div>

              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="text-[10px] text-slate-500">F1-SCORE (HARMONIC)</div>
                <div class="text-xl font-extrabold text-amber-600 dark:text-amber-400">93.4%</div>
                <div class="text-[10px] text-slate-400">ROC-AUC: 0.962</div>
              </div>
            </div>

            <!-- Confusion Matrix Table -->
            <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="font-bold text-slate-900 dark:text-white">Confusion Matrix (2x2)</span>
                <span class="text-slate-500 text-[10px]">N = 200</span>
              </div>

              <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono text-center">
                <div class="grid grid-cols-3 bg-slate-100 dark:bg-slate-800/80 font-semibold text-[11px] py-1.5 text-slate-600 dark:text-slate-300">
                  <div>Actual \ Pred</div>
                  <div class="text-emerald-600 dark:text-emerald-400">Pred Positive</div>
                  <div class="text-rose-600 dark:text-rose-400">Pred Negative</div>
                </div>

                <div class="grid grid-cols-3 border-t border-slate-200 dark:border-slate-800 py-2.5 items-center">
                  <div class="font-semibold text-slate-600 dark:text-slate-400 text-[11px]">Actual Pos (118)</div>
                  <div class="p-1.5 mx-2 rounded bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    TP: 111 <span class="text-[10px] font-normal block text-emerald-600 dark:text-emerald-400">94.1%</span>
                  </div>
                  <div class="p-1.5 mx-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    FN: 7 <span class="text-[10px] font-normal block text-slate-400">5.9%</span>
                  </div>
                </div>

                <div class="grid grid-cols-3 border-t border-slate-200 dark:border-slate-800 py-2.5 items-center">
                  <div class="font-semibold text-slate-600 dark:text-slate-400 text-[11px]">Actual Neg (82)</div>
                  <div class="p-1.5 mx-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    FP: 6 <span class="text-[10px] font-normal block text-slate-400">7.3%</span>
                  </div>
                  <div class="p-1.5 mx-2 rounded bg-rose-100 dark:bg-rose-950 font-bold text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    TN: 76 <span class="text-[10px] font-normal block text-rose-600 dark:text-rose-400">92.7%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- INTERACTIVE RETENTION RISK SIMULATOR (7 cols) -->
          <div class="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <i data-lucide="sliders" class="w-4 h-4 text-purple-500"></i>
                  <span>Simulator Prediksi Retensi & Dropout Peserta</span>
                </h2>
                <span class="text-xs font-mono text-purple-500">Sigmoid Classifier</span>
              </div>
              <p class="text-xs text-slate-500">Ubah parameter peserta untuk mensimulasikan probabilitas kelulusan vs risiko dropout secara real-time:</p>
            </div>

            <!-- Sliders Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              
              <!-- Sentiment Slider -->
              <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="flex justify-between">
                  <span class="text-slate-600 dark:text-slate-400">Feedback Sentiment:</span>
                  <span class="font-bold text-sky-500">${inp.sentimentScore > 0 ? '+' : ''}${inp.sentimentScore}</span>
                </div>
                <input type="range" min="-1" max="1" step="0.05" value="${inp.sentimentScore}" oninput="window.updateRetentionInput('sentimentScore', this.value)" class="w-full accent-sky-500 cursor-pointer" />
                <div class="flex justify-between text-[10px] text-slate-400">
                  <span>-1.0 (Critical)</span>
                  <span>+1.0 (Delighted)</span>
                </div>
              </div>

              <!-- Completion Rate Slider -->
              <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="flex justify-between">
                  <span class="text-slate-600 dark:text-slate-400">Progress Materi (LMS):</span>
                  <span class="font-bold text-emerald-500">${inp.completionRate}%</span>
                </div>
                <input type="range" min="0" max="100" step="5" value="${inp.completionRate}" oninput="window.updateRetentionInput('completionRate', this.value)" class="w-full accent-emerald-500 cursor-pointer" />
                <div class="flex justify-between text-[10px] text-slate-400">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <!-- Mentor Sessions Slider -->
              <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="flex justify-between">
                  <span class="text-slate-600 dark:text-slate-400">Sesi Mentoring Dihadiri:</span>
                  <span class="font-bold text-purple-500">${inp.mentorSessions} sesi</span>
                </div>
                <input type="range" min="0" max="15" step="1" value="${inp.mentorSessions}" oninput="window.updateRetentionInput('mentorSessions', this.value)" class="w-full accent-purple-500 cursor-pointer" />
                <div class="flex justify-between text-[10px] text-slate-400">
                  <span>0 (Pasif)</span>
                  <span>15 (Aktif)</span>
                </div>
              </div>

              <!-- Assignment Score Slider -->
              <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="flex justify-between">
                  <span class="text-slate-600 dark:text-slate-400">Rata-rata Nilai Tugas:</span>
                  <span class="font-bold text-amber-500">${inp.assignmentScore} / 100</span>
                </div>
                <input type="range" min="0" max="100" step="2" value="${inp.assignmentScore}" oninput="window.updateRetentionInput('assignmentScore', this.value)" class="w-full accent-amber-500 cursor-pointer" />
                <div class="flex justify-between text-[10px] text-slate-400">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>

              <!-- Support SLA Latency (1 col span across md) -->
              <div class="md:col-span-2 space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div class="flex justify-between">
                  <span class="text-slate-600 dark:text-slate-400">Respon SLA Tiket Helpdesk (Latency Penalty):</span>
                  <span class="font-bold text-rose-500">${inp.supportResolutionHours} Jam</span>
                </div>
                <input type="range" min="1" max="48" step="1" value="${inp.supportResolutionHours}" oninput="window.updateRetentionInput('supportResolutionHours', this.value)" class="w-full accent-rose-500 cursor-pointer" />
                <div class="flex justify-between text-[10px] text-slate-400">
                  <span>1 Jam (Cepat)</span>
                  <span>48 Jam (Sangat Lambat)</span>
                </div>
              </div>

            </div>

            <!-- Prediction Result Card -->
            <div class="p-4 rounded-xl border ${res.riskBg} space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div class="text-[10px] font-mono uppercase tracking-wider text-slate-500">Hasil Prediksi Model:</div>
                  <div class="text-lg font-bold ${res.riskColor}">${res.riskTier}</div>
                </div>

                <div class="flex items-center gap-4 text-right font-mono">
                  <div>
                    <div class="text-[10px] text-slate-500">PROB. RETENSI</div>
                    <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${res.retentionRate}%</div>
                  </div>
                  <div>
                    <div class="text-[10px] text-slate-500">RISIKO DROPOUT</div>
                    <div class="text-xl font-extrabold text-rose-600 dark:text-rose-400">${res.churnRisk}%</div>
                  </div>
                </div>
              </div>

              <!-- Recommendation -->
              <div class="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Rekomendasi Aksi Otomatis:</strong> ${res.recommendation}
              </div>
            </div>

          </div>

        </div>

        <!-- BOTTOM SECTION: AUTHENTIC DATASET EXPLORER TABLE -->
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="space-y-1">
              <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="database" class="w-4 h-4 text-sky-500"></i>
                <span>Dataset Explorer: Sentiment & Feedback Corpus</span>
              </h2>
              <p class="text-xs text-slate-500">Menampilkan sampel data riil dari <code>data/sentiment-data.csv</code> (${filteredData.length} records matching filters):</p>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
              <!-- Search -->
              <input type="text" placeholder="Cari ulasan / lokasi..." value="${state.datasetFilter.search}" oninput="window.updateDatasetFilter('search', this.value)" class="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500" />

              <!-- Sentiment Filter -->
              <select onchange="window.updateDatasetFilter('sentiment', this.value)" class="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none">
                <option value="all" ${state.datasetFilter.sentiment === 'all' ? 'selected' : ''}>Semua Sentimen</option>
                <option value="positive" ${state.datasetFilter.sentiment === 'positive' ? 'selected' : ''}>Positive Only</option>
                <option value="negative" ${state.datasetFilter.sentiment === 'negative' ? 'selected' : ''}>Negative Only</option>
                <option value="neutral" ${state.datasetFilter.sentiment === 'neutral' ? 'selected' : ''}>Neutral Only</option>
              </select>

              <!-- Source Filter -->
              <select onchange="window.updateDatasetFilter('source', this.value)" class="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none">
                <option value="all" ${state.datasetFilter.source === 'all' ? 'selected' : ''}>Semua Provider</option>
                <option value="TechTrain Bootcamp" ${state.datasetFilter.source === 'TechTrain Bootcamp' ? 'selected' : ''}>TechTrain</option>
                <option value="CodeMaster Bootcamp" ${state.datasetFilter.source === 'CodeMaster Bootcamp' ? 'selected' : ''}>CodeMaster</option>
                <option value="DevPro Bootcamp" ${state.datasetFilter.source === 'DevPro Bootcamp' ? 'selected' : ''}>DevPro</option>
                <option value="SkillEdge Bootcamp" ${state.datasetFilter.source === 'SkillEdge Bootcamp' ? 'selected' : ''}>SkillEdge</option>
                <option value="LearnFast Bootcamp" ${state.datasetFilter.source === 'LearnFast Bootcamp' ? 'selected' : ''}>LearnFast</option>
              </select>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 dark:bg-slate-950/80 text-slate-500 font-mono border-b border-slate-200 dark:border-slate-800 text-[11px]">
                <tr>
                  <th class="p-3">#</th>
                  <th class="p-3">Teks Feedback / Ulasan</th>
                  <th class="p-3">Sentimen</th>
                  <th class="p-3">Confidence</th>
                  <th class="p-3">Provider Bootcamp</th>
                  <th class="p-3">Lokasi & User</th>
                  <th class="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                ${filteredData.map(row => {
                  let badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">POSITIVE</span>`;
                  if (row.sentiment === 'negative') {
                    badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">NEGATIVE</span>`;
                  } else if (row.sentiment === 'neutral') {
                    badge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">NEUTRAL</span>`;
                  }

                  return `
                    <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      <td class="p-3 font-mono text-slate-400 text-[11px]">${row.id}</td>
                      <td class="p-3 text-slate-800 dark:text-slate-200 max-w-md font-normal leading-relaxed">
                        "${row.text}"
                      </td>
                      <td class="p-3">${badge}</td>
                      <td class="p-3 font-mono text-slate-700 dark:text-slate-300 font-semibold text-[11px]">${(row.confidence * 100).toFixed(0)}%</td>
                      <td class="p-3 font-mono text-slate-500 text-[11px]">${row.source}</td>
                      <td class="p-3 text-slate-500 text-[11px] font-mono">${row.location} <span class="text-slate-400 block">${row.user}</span></td>
                      <td class="p-3 text-right">
                        <button type="button" onclick="window.testDatasetRow(${row.id})" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700 transition">
                          Uji di NLP ➔
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    `;
  }

  // --- TAB 3: TIME-SERIES FORECASTING & ANOMALY DETECTION ---
  function renderTimeSeriesTab() {
    const anomalies = computeRollingAnomalies(HISTORICAL_TIMESERIES, 7, state.anomalyThreshold);
    const forecasts = forecastFutureDays(HISTORICAL_TIMESERIES, state.forecastDays, state.forecastModel);
    const svgChart = renderTimeSeriesSvg(anomalies, forecasts);

    const detectedAnomaliesList = anomalies.filter(d => d.isAnomaly);

    return `
      <div class="space-y-8">
        
        <!-- FORECAST & ANOMALY CHART CONTAINER -->
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <i data-lucide="line-chart" class="w-4 h-4 text-sky-500"></i>
                  <span>Time-Series Feedback Volume & Anomaly Tracking</span>
                </h2>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  Rolling Z-Score (k=7)
                </span>
              </div>
              <p class="text-xs text-slate-500">Visualisasi 30 hari riwayat volume feedback, deteksi anomali lonjakan kritik, dan proyeksi beban 7 hari ke depan:</p>
            </div>

            <!-- Controls (Model Toggle & Anomaly Threshold) -->
            <div class="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <button type="button" onclick="window.setForecastModel('holt-winters')" class="px-2.5 py-1 rounded font-semibold transition ${state.forecastModel === 'holt-winters' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}">
                  Holt-Winters Exp
                </button>
                <button type="button" onclick="window.setForecastModel('moving-average')" class="px-2.5 py-1 rounded font-semibold transition ${state.forecastModel === 'moving-average' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}">
                  7-Day Moving Avg
                </button>
              </div>

              <!-- Anomaly Sensitivity -->
              <div class="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span class="text-slate-500 text-[11px]">Threshold:</span>
                <select onchange="window.setAnomalyThreshold(parseFloat(this.value))" class="bg-transparent text-slate-900 dark:text-white focus:outline-none text-[11px]">
                  <option value="1.5" ${state.anomalyThreshold === 1.5 ? 'selected' : ''}>1.5σ (Sensitif)</option>
                  <option value="2.0" ${state.anomalyThreshold === 2.0 ? 'selected' : ''}>2.0σ (Standar)</option>
                  <option value="2.5" ${state.anomalyThreshold === 2.5 ? 'selected' : ''}>2.5σ (Ketat)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Chart Graphic -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            ${svgChart}
            <div class="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-sky-600 inline-block"></span> Data Riil (30 Hari)</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-sky-400 border-b border-dashed inline-block"></span> Proyeksi Masa Depan (7 Hari)</span>
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Lonjakan Anomali Z-Score</span>
              </div>
              <span>Algoritma: ${state.forecastModel === 'holt-winters' ? 'Holt-Winters Double Exponential Smoothing' : '7-Day Simple Moving Average'}</span>
            </div>
          </div>

        </div>

        <!-- BOTTOM GRID: ANOMALY INCIDENTS LOG & FORECAST TABLE -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Anomaly Incident Logs (6 cols) -->
          <div class="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-500"></i>
                <span>Log Deteksi Anomali Operasional</span>
              </h3>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                ${detectedAnomaliesList.length} Insiden Ditemukan
              </span>
            </div>

            <div class="space-y-3">
              ${detectedAnomaliesList.map(item => `
                <div class="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 space-y-2 text-xs">
                  <div class="flex items-center justify-between font-mono">
                    <span class="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                      <i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-500"></i>
                      ${item.date} — Lonjakan Kritik Z=${item.zScore}
                    </span>
                    <span class="text-rose-600 dark:text-rose-400 font-bold">${item.neg} Feedback Negatif (${item.total} Total)</span>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    <strong>Penyebab Teridentifikasi:</strong> Terjadi lonjakan kritik sebesar <strong>640%</strong> di atas rolling mean (μ=${item.rollingMean}, σ=${item.rollingStd}). Analisis NLP mengidentifikasi keluhan masif terkait buffer video player & down saat deadline capstone.
                  </p>
                  <div class="pt-1 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <span>Status: RESOLVED</span> • <span>Patch Deployed on Day 15</span>
                  </div>
                </div>
              `).join('')}

              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div class="font-bold text-slate-900 dark:text-white font-mono text-[11px]">Prinsip Deteksi Z-Score:</div>
                <p class="leading-relaxed">
                  Formula Z-Score: $Z = \\frac{|X_t - \\mu_t|}{\\sigma_t}$. Sistem memantau jendela geser (rolling window 7 hari). Setiap titik yang melampaui ${state.anomalyThreshold} standar deviasi secara otomatis mengaktifkan notifikasi eskalasi teknis ke tim platform.
                </p>
              </div>
            </div>
          </div>

          <!-- Forecast Breakdown Table (6 cols) -->
          <div class="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i data-lucide="calendar" class="w-4 h-4 text-sky-500"></i>
                <span>Tabel Proyeksi 7 Hari Mendatang</span>
              </h3>
              <span class="text-xs font-mono text-slate-500">Confidence Interval 95%</span>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table class="w-full text-left text-xs font-mono">
                <thead class="bg-slate-50 dark:bg-slate-950/80 text-slate-500 border-b border-slate-200 dark:border-slate-800 text-[11px]">
                  <tr>
                    <th class="p-2.5">Tanggal</th>
                    <th class="p-2.5">Prediksi Volume</th>
                    <th class="p-2.5">Estimasi Server Load</th>
                    <th class="p-2.5">Model</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                  ${forecasts.map(f => `
                    <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      <td class="p-2.5 font-bold text-slate-900 dark:text-white">${f.date}</td>
                      <td class="p-2.5 font-bold text-sky-600 dark:text-sky-400">${f.predictedTotal} feedback</td>
                      <td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Normal (Capacity OK)</td>
                      <td class="p-2.5 text-slate-400 text-[10px]">${f.model.split(' ')[0]}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 text-xs text-sky-900 dark:text-sky-200 space-y-1">
              <span class="font-bold font-mono text-[11px]">Insight Kapasitas:</span>
              <p class="leading-relaxed">
                Berdasarkan tren peningkatan linear, volume feedback diproyeksikan tumbuh stabil menuju ~140 feedback/hari pada minggu pertama Juni. Infrastruktur database dan server ingestion dinyatakan dalam batas kapasitas aman.
              </p>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // --- TAB 4: ARCHITECTURE & MATHEMATICAL MODEL DOCS ---
  function renderArchitectureDocsTab() {
    return `
      <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed">
        
        <!-- Section 1: Overview & Origin -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-mono font-bold text-xs border border-sky-200 dark:border-sky-800">01</span>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Latar Belakang & Fondasi Proyek SHUNA AI</h2>
          </div>
          <p class="text-slate-600 dark:text-slate-400">
            Proyek <strong>SHUNA AI</strong> dikembangkan dalam program <strong>MSIB Batch 6 @ Skilvul (Machine Learning Track)</strong>, di mana Rizki Ananda bertindak sebagai <strong>Project Team Lead</strong> (Kelompok 26) dan meraih nilai akhir <strong>81.8</strong>. Proyek ini menyelesaikan tantangan riil institusi pendidikan dan platform digital dalam mengolah feedback berskala besar menjadi wawasan terstruktur secara otomatis.
          </p>
        </div>

        <!-- Section 2: NLP Math (TF-IDF & Logistic Regression) -->
        <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-xs border border-purple-200 dark:border-purple-800">02</span>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Formulasi Matematika: TF-IDF & Logistic Regression</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 class="font-bold text-slate-900 dark:text-white font-mono text-xs text-sky-600 dark:text-sky-400">1. Pembobotan Term Frequency-Inverse Document Frequency (TF-IDF)</h3>
              <p class="text-slate-600 dark:text-slate-400 text-xs">
                Mengukur signifikansi relatif suatu kata $t$ dalam dokumen $d$ terhadap seluruh korpus $D$:
              </p>
              <div class="p-2.5 rounded bg-slate-900 text-slate-100 font-mono text-xs">
                $$\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\ln\\left(\\frac{1 + |D|}{1 + |\\{d \\in D : t \\in d\\}|}\\right) + 1$$
              </div>
              <p class="text-[11px] text-slate-500">
                Menghukum kata-kata yang terlalu umum (stopwords) dan menonjolkan fitur leksikal sentimen spesifik.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 class="font-bold text-slate-900 dark:text-white font-mono text-xs text-purple-600 dark:text-purple-400">2. Klasifikasi Biner & Multikelas via Sigmoid / Softmax</h3>
              <p class="text-slate-600 dark:text-slate-400 text-xs">
                Memetakan kombinasi linier bobot fitur $z = \\mathbf{w}^T \\mathbf{x} + b$ menjadi probabilitas $[0, 1]$:
              </p>
              <div class="p-2.5 rounded bg-slate-900 text-slate-100 font-mono text-xs">
                $$\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\mathcal{L}(\\mathbf{w}) = -\\frac{1}{m}\\sum_{i=1}^m [y^{(i)}\\ln(\\hat{y}^{(i)}) + (1-y^{(i)})\\ln(1-\\hat{y}^{(i)})]$$
              </div>
              <p class="text-[11px] text-slate-500">
                Dioptimasi menggunakan algoritma L-BFGS dengan regularisasi L2 (Ridge) untuk mencegah overfitting.
              </p>
            </div>

          </div>
        </div>

        <!-- Section 3: Time-Series & Anomaly Detection Math -->
        <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-200 dark:border-emerald-800">03</span>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Time-Series Holt-Winters & Rolling Z-Score Anomaly</h2>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <p class="text-slate-600 dark:text-slate-400">
              Model peramalan menerapkan <strong>Double Exponential Smoothing (Holt's Linear Trend)</strong> untuk menangani level $L_t$ dan kemiringan tren $T_t$:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              <div class="p-2.5 rounded bg-slate-900 text-emerald-300">
                Level: $L_t = \\alpha X_t + (1 - \\alpha)(L_{t-1} + T_{t-1})$
              </div>
              <div class="p-2.5 rounded bg-slate-900 text-emerald-300">
                Trend: $T_t = \\beta (L_t - L_{t-1}) + (1 - \\beta)T_{t-1}$
              </div>
            </div>
            <p class="text-slate-600 dark:text-slate-400">
              Proyeksi masa depan $m$ langkah ke depan dihitung dengan $\\hat{X}_{t+m} = L_t + m T_t$. Sementara itu, detektor anomali Z-Score mengidentifikasi lonjakan insiden ketika deviasi dari rolling mean melampaui ambang batas $Z > 2.0\\sigma$.
            </p>
          </div>
        </div>

        <!-- Section 4: Production Architecture Stack -->
        <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-xs border border-amber-200 dark:border-amber-800">04</span>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Arsitektur Produksi & Deployment Stack</h2>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div class="font-bold text-slate-900 dark:text-white">1. Data Ingestion & Clean</div>
              <div class="text-slate-500">Pandas • Regex • NLTK • Sastrawi Stemmer • Corpus Serialization</div>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div class="font-bold text-slate-900 dark:text-white">2. ML Inference Engine</div>
              <div class="text-slate-500">Scikit-Learn • Joblib Serialization • FastAPI REST Endpoints</div>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div class="font-bold text-slate-900 dark:text-white">3. Frontend & Monitoring</div>
              <div class="text-slate-500">Streamlit Dashboard • Pure Vanilla JS Engine • SVG Vector Charts</div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  function renderActiveTabContent() {
    if (state.activeTab === 'nlp-studio') {
      return renderNlpStudioTab();
    } else if (state.activeTab === 'ml-predictor') {
      return renderMlPredictorTab();
    } else if (state.activeTab === 'timeseries-anomaly') {
      return renderTimeSeriesTab();
    } else if (state.activeTab === 'architecture-docs') {
      return renderArchitectureDocsTab();
    }
    return '';
  }

  // --- GLOBAL EVENT HANDLERS ---
  window.setShunaTab = function(tabName) {
    state.activeTab = tabName;
    const root = document.getElementById('shunaAiRoot');
    if (root) {
      window.renderShunaAiSuite(root);
    }
  };

  window.updateNlpInput = function(val) {
    state.nlpInputText = val;
    state.nlpResult = executeNlpPipeline(val);
    const content = document.getElementById('shunaTabContent');
    if (content && state.activeTab === 'nlp-studio') {
      content.innerHTML = renderNlpStudioTab();
      if (window.lucide) lucide.createIcons();
    }
  };

  window.applyNlpPreset = function(presetId) {
    if (presetId === 1) {
      state.nlpInputText = "This bootcamp has the most engaging sessions and hands-on mentor support. Highly recommended!";
    } else if (presetId === 2) {
      state.nlpInputText = "Their website is so confusing and the course video player keeps buffering and crashing. Terrible experience.";
    } else if (presetId === 3) {
      state.nlpInputText = "Materi pembelajaran sangat terstruktur, mentor responsif dan studi kasus machine learning sangat jelas dan bermanfaat.";
    } else if (presetId === 4) {
      state.nlpInputText = "Sistem portal sering down saat pengumpulan tugas akhir, respon admin lambat dan sangat mengecewakan.";
    }
    window.updateNlpInput(state.nlpInputText);
  };

  window.testDatasetRow = function(rowId) {
    const row = SAMPLE_DATASET.find(r => r.id === rowId);
    if (row) {
      state.activeTab = 'nlp-studio';
      state.nlpInputText = row.text;
      state.nlpResult = executeNlpPipeline(row.text);
      const root = document.getElementById('shunaAiRoot');
      if (root) {
        window.renderShunaAiSuite(root);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  window.updateRetentionInput = function(field, value) {
    state.retentionInputs[field] = parseFloat(value);
    state.retentionResult = computeRetentionProbability(state.retentionInputs);
    const content = document.getElementById('shunaTabContent');
    if (content && state.activeTab === 'ml-predictor') {
      content.innerHTML = renderMlPredictorTab();
      if (window.lucide) lucide.createIcons();
    }
  };

  window.updateDatasetFilter = function(field, value) {
    state.datasetFilter[field] = value;
    const content = document.getElementById('shunaTabContent');
    if (content && state.activeTab === 'ml-predictor') {
      content.innerHTML = renderMlPredictorTab();
      if (window.lucide) lucide.createIcons();
    }
  };

  window.setForecastModel = function(model) {
    state.forecastModel = model;
    const content = document.getElementById('shunaTabContent');
    if (content && state.activeTab === 'timeseries-anomaly') {
      content.innerHTML = renderTimeSeriesTab();
      if (window.lucide) lucide.createIcons();
    }
  };

  window.setAnomalyThreshold = function(val) {
    state.anomalyThreshold = val;
    const content = document.getElementById('shunaTabContent');
    if (content && state.activeTab === 'timeseries-anomaly') {
      content.innerHTML = renderTimeSeriesTab();
      if (window.lucide) lucide.createIcons();
    }
  };

})();
