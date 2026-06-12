const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow requests from Frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Mock Data Models
const MOCK_STATS = {
  patients: 10450,
  doctors: 1120,
  clinics: 512,
  treatments: 54
};

const MOCK_DISEASE_CATEGORIES = [
  { id: 'cat-1', name: "Digestive Disorders", description: "Imbalances in digestive fire (Agni) leading to toxin (Ama) buildup.", icon: "Activity" },
  { id: 'cat-2', name: "Skin Disorders", description: "Blood impurity and liver channel blockages manifest as external skin issues.", icon: "Info" },
  { id: 'cat-3', name: "Women's Health", description: "Hormonal and reproductive system regulation through tissue nourishment.", icon: "Droplets" },
  { id: 'cat-4', name: "Respiratory Disorders", description: "Breath channel (Prana Vaha Srotas) blockages causing wheezing.", icon: "Wind" },
  { id: 'cat-5', name: "Lifestyle Diseases", description: "Metabolic and cardiovascular issues originating from poor lifestyle habits.", icon: "Heart" },
  { id: 'cat-6', name: "Mental Wellness", description: "Restoring psychological calmness and quality sleep cycles.", icon: "Brain" },
];

const MOCK_DISEASES = [
  {
    id: "dis-1",
    name: "Diabetes",
    slug: "diabetes",
    category: "Lifestyle Diseases",
    shortDescription: "Known as Madhumeha in Ayurveda, managing blood glucose through Kapha and Pitta dosha balancing.",
    severity: "High",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80",
    symptoms: ["Excessive thirst", "Frequent urination", "Fatigue", "Slow healing cuts", "Numbness in hands/feet"],
    causes: ["Kapha imbalance", "Lack of physical activity", "Excessive intake of sweets and heavy foods"],
    ayurvedicPerspective: "Known as Madhumeha, it is a metabolic disorder (Prameha) dominated by Kapha dosha, which affects fat tissues and urine chemistry due to low digestive fire (Agni).",
    treatments: ["Panchakarma (Virechana & Basti)", "Regular intake of herbal decocations"],
    recommendedHerbs: ["Gurmar (Gymnema)", "Nisha-Amalaki (Turmeric & Amla)", "Vijaysar", "Methi (Fenugreek)"],
    dietRecommendations: ["Barley grains", "Bitter gourd juice", "Fenugreek seeds", "Roasted chickpeas"],
    foodsToAvoid: ["Refined sugars", "White rice", "Yoghurt and heavy dairy", "Cold beverages"],
    lifestyleRecommendations: ["Mandukasana (Frog pose) Yoga", "Daily 45-minute brisk morning walks", "Avoiding daytime sleeping"],
    recoveryTimeline: [
      { step: "Dosha Evaluation", description: "Assess metabolic fire (Agni) levels", duration: "1 Week" },
      { step: "Toxin Clearing", description: "Deep cleansing herbs to remove blockages", duration: "3 Weeks" },
      { step: "Glycemic Stabilisation", description: "Herbal supplements and diet charts", duration: "8 Weeks" },
      { step: "Maintenance", description: "Adopting custom lifestyle schedules", duration: "Ongoing" }
    ],
    faq: [
      { question: "Is Ayurvedic treatment safe alongside insulin?", answer: "Yes, Ayurvedic herbs work synergistically and help reduce insulin resistance under professional Vaidya guidance." }
    ]
  },
  {
    id: "dis-2",
    name: "PCOS",
    slug: "pcos",
    category: "Women's Health",
    shortDescription: "Hormonal and reproductive system restoration through ovarian tissue nourishment.",
    severity: "Moderate",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=500&q=80",
    symptoms: ["Irregular cycles", "Hirsutism", "Weight gain", "Cystic acne", "Thinning hair"],
    causes: ["Artava Srotas blockages", "Kapha-Vata imbalances", "Stress and processed food intake"],
    ayurvedicPerspective: "Originates from a Kapha-Vata blockage in the channels regulating the reproductive fluids (Artava Srotas), resulting in cyst accumulation and metabolic stagnation.",
    treatments: ["Uttar Basti", "Virechana detoxification", "Abhyanga body massages"],
    recommendedHerbs: ["Shatavari", "Kanchnar Guggulu", "Ashoka bark", "Aloevera juice"],
    dietRecommendations: ["Warm sesame water", "Fresh papaya", "Sprouted legumes", "Leafy vegetables"],
    foodsToAvoid: ["Cold dairy", "Processed bakery items", "Excessive red meat", "Refined flour"],
    lifestyleRecommendations: ["Butterfly pose & Surya Namaskar", "Stress management", "Early dinner (before 7 PM)"],
    recoveryTimeline: [
      { step: "Srotas Cleansing", description: "Clearing blockages in reproductive paths", duration: "2 Weeks" },
      { step: "Cycle Regulation", description: "Balancing Vata energy flow (Apana Vayu)", duration: "12 Weeks" },
      { step: "Hormonal Harmony", description: "Nourishing ovaries and balancing insulin levels", duration: "24 Weeks" }
    ],
    faq: [
      { question: "Can PCOS be completely cured by Ayurveda?", answer: "Yes, by targeting the root metabolic blockages, normal ovarian function and regular cycles can be restored permanently." }
    ]
  },
  {
    id: "dis-3",
    name: "Arthritis",
    slug: "arthritis",
    category: "Bone & Joints",
    shortDescription: "Addressing joint pain (Amavata or Sandhivata) by removing toxins and lubricating connective tissues.",
    severity: "High",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80",
    symptoms: ["Joint swelling", "Morning stiffness", "Chronic joint pain", "Reduced mobility", "Fatigue"],
    causes: ["Accumulated toxins (Ama)", "Aggravated Vata dosha", "Exposure to cold and damp conditions"],
    ayurvedicPerspective: "Known as Amavata (similar to Rheumatoid Arthritis) or Sandhivata (Osteoarthritis). It involves the accumulation of Ama (undigested toxins) in joint junctions due to impaired Agni.",
    treatments: ["Panchakarma (Virechana & Basti)", "Patra Pinda Sveda (herbal poultice massage)", "Janu Basti"],
    recommendedHerbs: ["Shallaki (Boswellia)", "Guggulu", "Nirgundi", "Ginger (Sunthi)"],
    dietRecommendations: ["Warm soups", "Cooked grains with Ghee", "Garlic and ginger infusions", "Warm water"],
    foodsToAvoid: ["Yoghurt and cheese", "Nightshade vegetables (potatoes, tomatoes)", "Cold salads", "White beans"],
    lifestyleRecommendations: ["Gentle joint rotations (Sukshma Vyayama)", "Daily application of warm sesame oil", "Keeping joints warm"],
    recoveryTimeline: [
      { step: "Ama Digestion", description: "Consuming hot spices to clear raw metabolic toxins", duration: "2 Weeks" },
      { step: "Vata Pacification", description: "Warm oil pooling and herbal lubrication", duration: "6 Weeks" },
      { step: "Tissue Rejuvenation", description: "Strengthening bones and joints (Asthi Dhatu)", duration: "16 Weeks" }
    ],
    faq: [
      { question: "How does Shallaki help with pain?", answer: "Shallaki is a natural anti-inflammatory agent that blocks inflammatory compounds without causing stomach irritation." }
    ]
  },
  {
    id: "dis-4",
    name: "Migraine",
    slug: "migraine",
    category: "Mental Wellness",
    shortDescription: "Alleviating deep vascular headaches by soothing aggravated Pitta-Vata channels near the nervous system.",
    severity: "Moderate",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    symptoms: ["One-sided throbbing pain", "Sensitivity to light & sound", "Nausea or vomiting", "Visual visual aura"],
    causes: ["Pitta-Vata imbalance", "Irregular sleep cycles", "Excessive heat and direct sun exposure"],
    ayurvedicPerspective: "Considered as Ardhavabhedaka, it is primarily a Vata-Pitta disorder aggravated by sluggish digestion (Mandagni), leading to heat blockages in head channels.",
    treatments: ["Nasya therapy (herbal nasal drops)", "Shirodhara (warm oil dripping)", "Foot massage (Pada Abhyanga)"],
    recommendedHerbs: ["Brahmi", "Godanti Bhasma", "Ashwagandha", "Yashtimadhu (Licorice)"],
    dietRecommendations: ["Sweet juicy fruits", "Cow's Ghee", "Coconut water", "Cooling milk with cardamom"],
    foodsToAvoid: ["Fermented foods", "Spicy pickles and chillies", "Caffeine and chocolates", "Stale food"],
    lifestyleRecommendations: ["Pranayama (Anulom Vilom)", "Dark room meditation", "Consistent sleep schedule"],
    recoveryTimeline: [
      { step: "Channel Clearing", description: "Nasal drops (Nasya) to clear sinus and head channels", duration: "2 Weeks" },
      { step: "Nervous Soothing", description: "Shirodhara to relieve stress and lower vascular pressure", duration: "4 Weeks" },
      { step: "Root Prevention", description: "Digestive supplements to prevent toxic gas generation", duration: "12 Weeks" }
    ],
    faq: [
      { question: "Why is Shirodhara recommended for migraines?", answer: "Shirodhara relaxes the central nervous system, reduces adrenaline levels, and dilates cranial vessels, preventing migraine triggers." }
    ]
  },
  {
    id: "dis-5",
    name: "Psoriasis",
    slug: "psoriasis",
    category: "Skin Disorders",
    shortDescription: "Clearing systemic skin scaling and inflammation (Kitibha Kushtha) through blood purification therapies.",
    severity: "High",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80",
    symptoms: ["Silvery scale patches", "Severe skin itching", "Dry cracked skin", "Inflamed reddish patches"],
    causes: ["Vata-Kapha skin imbalance", "Toxic food combinations (Viruddha Ahara)", "Severe mental stress"],
    ayurvedicPerspective: "Referred to as Kitibha Kushtha, it involves the accumulation of toxins in the skin tissues (Tvach), blood (Rakta), and lymphatic fluids (Lasika) due to incompatible food pairings.",
    treatments: ["Vamana (induced vomiting)", "Virechana (purgation)", "Takradhara (buttermilk head drip)"],
    recommendedHerbs: ["Neem", "Manjistha", "Khadir", "Haridra (Turmeric)"],
    dietRecommendations: ["Bitter vegetables", "Mung beans", "Light squash", "Boiled warm water"],
    foodsToAvoid: ["Fish with milk (incompatible)", "Sour citrus fruits", "Salty chips", "Alcohol and fermented items"],
    lifestyleRecommendations: ["Yoga for emotional balancing", "Applying cold-pressed coconut oil mixed with camphor", "Avoiding harsh chemical soaps"],
    recoveryTimeline: [
      { step: "Toxin Purging", description: "Clinical Panchakarma to expel blood impurities", duration: "4 Weeks" },
      { step: "Blood Purifying", description: "Bitter herb regimens to neutralize metabolic acid", duration: "12 Weeks" },
      { step: "Skin Repair", description: "Moisturising pastes and tissue building herbs", duration: "24 Weeks" }
    ],
    faq: [
      { question: "What is Viruddha Ahara?", answer: "It refers to incompatible food combinations, like eating fish and milk together, which Ayurveda warns creates toxic blood reactions." }
    ]
  },
  {
    id: "dis-6",
    name: "Obesity",
    slug: "obesity",
    category: "Lifestyle Diseases",
    shortDescription: "Reversing lipid tissue overgrowth (Sthoulya) by accelerating metabolic fire (Agni) and modifying diet.",
    severity: "Moderate",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80",
    symptoms: ["Shortness of breath on exertion", "Excessive sweating", "Lethargy & low energy", "Constant hunger cravings"],
    causes: ["Kapha dosha imbalance", "Sluggish metabolic fire (Meda Dhatvagni)", "Sedentary lifestyle"],
    ayurvedicPerspective: "Known as Medoroga or Sthoulya. The fat tissue channel (Meda Vaha Srotas) becomes blocked, converting all nutrition into fat instead of building bone or muscle.",
    treatments: ["Udvartana (dry powder body massage)", "Lekhana Basti (scraping enemas)", "Virechana"],
    recommendedHerbs: ["Guggulu", "Triphala", "Vrikshamla (Garcinia)", "Ginger"],
    dietRecommendations: ["Barley and millet", "Warm honey water on empty stomach", "Green leafy salads", "Warm spices"],
    foodsToAvoid: ["Cold water", "Sweets and ice creams", "Deep fried items", "Excessive wheat and rice"],
    lifestyleRecommendations: ["Kapalbhati and Surya Namaskar", "Active physical exercise", "No sleeping in the afternoon"],
    recoveryTimeline: [
      { step: "Channel Opening", description: "Dry powder massages (Udvartana) to break down fat", duration: "3 Weeks" },
      { step: "Metabolism Reset", description: "Herbs to accelerate liver fire (Dhatvagni)", duration: "8 Weeks" },
      { step: "Tissue Balancing", description: "Building muscle tissue while trimming lipids", duration: "16 Weeks" }
    ],
    faq: [
      { question: "Why is cold water restricted in weight management?", answer: "Cold water dampens the digestive fire (Agni), slows down the metabolism, and increases Kapha dosha, which promotes fat storage." }
    ]
  },
  {
    id: "dis-7",
    name: "Asthma",
    slug: "asthma",
    category: "Respiratory Disorders",
    shortDescription: "Relieving breath channel blockages (Prana Vaha Srotas) by clearing chest mucus.",
    severity: "High",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    symptoms: ["Wheezing sound", "Tightness in chest", "Shortness of breath", "Dry cough", "Sleep disruptions"],
    causes: ["Kapha-Vata breath imbalance", "Exposure to cold air and dust", "Eating cold, heavy foods"],
    ayurvedicPerspective: "Called Tamaka Shwasa. It originates in the digestive system, where impaired stomach digestion produces mucus that travels upwards and block breathing paths (Prana Vaha Srotas).",
    treatments: ["Vamana (therapeutic vomiting)", "Mrídu Swedana (light chest warming)", "Nasyam"],
    recommendedHerbs: ["Vasa (Adhatoda)", "Kantakari", "Tulsi", "Trikatu (Ginger, Black pepper, Long pepper)"],
    dietRecommendations: ["Warm soups", "Rice with cumin", "Ginger tea", "Warm water with honey"],
    foodsToAvoid: ["Bananas and curd", "Cold items from refrigerator", "Carbonated drinks", "Heavy deep-fried flours"],
    lifestyleRecommendations: ["Pranayama (Bhastrika)", "Daily chest inhalation of steam with eucalyptus", "Avoiding cold drafty rooms"],
    recoveryTimeline: [
      { step: "Mucus Liquification", description: "Applying salt-oil to chest with local heat", duration: "1 Week" },
      { step: "Congestion Clearing", description: "Expelling deep thoracic toxins via Vamana or herbs", duration: "3 Weeks" },
      { step: "Lung Rejuvenation", description: "Respiratory tonics (Rasayana) to strengthen airways", duration: "12 Weeks" }
    ],
    faq: [
      { question: "Is Asthma treatment linkable to digestion?", answer: "Yes! Ayurveda teaches that weak stomach Agni creates toxic phlegm, which travels and constricts breathing channels." }
    ]
  },
  {
    id: "dis-8",
    name: "Gastritis",
    slug: "gastritis",
    category: "Digestive Disorders",
    shortDescription: "Cooling burning sensations in the stomach (Amlapitta) by regulating digestive acid.",
    severity: "Moderate",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80",
    symptoms: ["Burning chest pain", "Sour belching", "Nausea after eating", "Stomach bloating", "Indigestion"],
    causes: ["Aggravated Pitta dosha", "Spicy, fermented, and sour foods", "Skipping meals and eating late"],
    ayurvedicPerspective: "Referred to as Amlapitta. Aggravated Pitta dosha increases the sourness and acidity of digestive fluids, leading to localized inflammation in stomach linings.",
    treatments: ["Virechana (purgation)", "Avipattikar Churna intake", "Cold milk therapies"],
    recommendedHerbs: ["Amalaki (Amla)", "Yashtimadhu (Licorice)", "Shatavari", "Aloe Vera"],
    dietRecommendations: ["Boiled rice with coconut milk", "Pomegranate juice", "Mung dal soup", "Fennel seed water"],
    foodsToAvoid: ["Vinegar and tomatoes", "Red chillies and garlic", "Fermented batters", "Sour curd"],
    lifestyleRecommendations: ["Cooling Sheetali Pranayama", "Eating meals at fixed timings", "Avoiding sleeping immediately after lunch"],
    recoveryTimeline: [
      { step: "Acid Neutralisation", description: "Cooling sweet herbs to soothe inflamed lining", duration: "1 Week" },
      { step: "Pitta Expulsion", description: "Mild purgation to throw out sour bile from the system", duration: "3 Weeks" },
      { step: "Agni Correction", description: "Restoring balanced digestive fire without generating acid", duration: "8 Weeks" }
    ],
    faq: [
      { question: "How does Licorice help Gastritis?", answer: "Licorice root coats and protects the stomach lining, encouraging healthy mucus secretion to buffer against excess acid." }
    ]
  },
  {
    id: "dis-9",
    name: "Insomnia",
    slug: "insomnia",
    category: "Mental Wellness",
    shortDescription: "Calming hyperactive mind channels (Anidra) using soothing oil massages and mental adaptogens.",
    severity: "Low",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80",
    symptoms: ["Difficulty falling asleep", "Waking up in the middle of night", "Waking up tired", "Daytime irritability"],
    causes: ["Aggravated Vata dosha", "Overactive mind (Tarpaka Kapha dryout)", "Excessive blue-light exposure"],
    ayurvedicPerspective: "Known as Anidra. Caused by Vata-Tarpaka dryness. High Vata energy excites the mind, preventing the heavy, calming Kapha energy required to fall asleep naturally.",
    treatments: ["Shirodhara", "Abhyanga (warm body massage)", "Pada Abhyanga (warm foot rub before bed)"],
    recommendedHerbs: ["Ashwagandha", "Jatamansi", "Brahmi", "Tagar (Valerian)"],
    dietRecommendations: ["Warm buffalo milk with nutmeg", "Oatmeal", "Sweet almonds", "Mashed rice with Ghee"],
    foodsToAvoid: ["Coffee, green tea, carbonated drinks", "Dry crunchy crackers", "Spicy food at dinner"],
    lifestyleRecommendations: ["Gentle meditation before bed", "Massaging soles and temples with warm sesame oil", "No screens 2 hours before bed"],
    recoveryTimeline: [
      { step: "Mind Soothing", description: "Warm head oil drippings (Shirodhara) to quiet thoughts", duration: "1 Week" },
      { step: "Vata Regulation", description: "Calming herbs to balance nervous transmission", duration: "3 Weeks" },
      { step: "Sleep Cycle Restore", description: "Consistency in bedtime routines and nourishing diet", duration: "6 Weeks" }
    ],
    faq: [
      { question: "Why buffalo milk for sleep?", answer: "Ayurveda considers buffalo milk heavier and more calming (inducing natural sleepiness) compared to cow milk." }
    ]
  },
  {
    id: "dis-10",
    name: "Anxiety",
    slug: "anxiety",
    category: "Mental Wellness",
    shortDescription: "Balancing neurological wind (Manovaha Srotas) through stabilizing breathing and brain tonics.",
    severity: "Moderate",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
    symptoms: ["Racing thoughts", "Palpitations", "Nervous tremors", "Restlessness", "Cold hands and feet"],
    causes: ["Hyperactive Prana Vayu", "Weak nervous tissue (Majja Dhatu)", "Irregular eating and sleeping patterns"],
    ayurvedicPerspective: "A Vata disorder affecting the mind channels (Manovaha Srotas). The erratic nature of Vata mimics wind, causing racing thoughts, nervousness, and lack of grounding.",
    treatments: ["Shirodhara", "Abhyanga", "Pranayama (Nadi Shodhana)"],
    recommendedHerbs: ["Ashwagandha", "Brahmi", "Shankhpushpi", "Vacha"],
    dietRecommendations: ["Warm, sweet, and oily foods", "Cooked root vegetables", "Ghee", "Warm soups and stews"],
    foodsToAvoid: ["Raw cold vegetables", "Dry snacks and chips", "Caffeine, energy drinks, and alcohol"],
    lifestyleRecommendations: ["Daily grounding meditation", "Self-massage (Abhyanga) every morning", "Yoga for grounding (Vrikshasana)"],
    recoveryTimeline: [
      { step: "System Grounding", description: "Nourishing oil massage to lower erratic wind energy", duration: "2 Weeks" },
      { step: "Brain Tonics", description: "Nootropic herbs to repair and soothe nervous tissues", duration: "6 Weeks" },
      { step: "Stability Routine", description: "Rigid sleep, eating, and meditation time mappings", duration: "12 Weeks" }
    ],
    faq: [
      { question: "How does Ashwagandha calm anxiety?", answer: "Ashwagandha acts as an adaptogen that lowers cortisol levels, strengthens the nervous system, and calms Vata dosha." }
    ]
  }
];

const MOCK_TREATMENT_CATEGORIES = [
  { id: 'cat-panch', name: "Panchakarma", description: "Classical fivefold detoxification and rejuvenation therapies.", icon: "Activity" },
  { id: 'cat-detox', name: "Detox Therapy", description: "Cleansing body channels of accumulated toxins (Ama).", icon: "Sparkles" },
  { id: 'cat-herb', name: "Herbal Therapy", description: "Botanical formulations custom-tailored for organ system healing.", icon: "Sprout" },
  { id: 'cat-yoga', name: "Yoga Therapy", description: "Pranayama and alignment postures to stabilize nervous energy.", icon: "Compass" },
  { id: 'cat-life', name: "Lifestyle Therapy", description: "Adapting daily schedules (Dinacharya) to match body constitution.", icon: "Clock" },
  { id: 'cat-prog', name: "Wellness Programs", description: "Multidisciplinary health restoration plans for chronic conditions.", icon: "Heart" }
];

const MOCK_TREATMENTS = [
  {
    id: 'trt-1',
    name: 'Panchakarma',
    slug: 'panchakarma',
    category: 'Panchakarma',
    description: 'The ultimate 5-action deep tissue purification and cellular level detoxification regime.',
    overview: 'Panchakarma is the cornerstone of Ayurvedic detoxification. It consists of five major procedures (Vamana, Virechana, Basti, Nasya, and Raktamokshana) designed to deep-cleanse body tissues, release accumulated metabolic waste (Ama), and restore primary dosha harmony.',
    benefits: ['Removes cellular toxins', 'Balances Vata, Pitta, and Kapha', 'Rejuvenates digestive fire (Agni)', 'Strengthens immune system'],
    procedure: 'Panchakarma involves three phases: Poorva Karma (preparatory oiling & sweating), Pradhana Karma (the main cleansing therapies), and Paschat Karma (dietary rehabilitation rules).',
    duration: '7 - 21 Days',
    recoveryTime: '3 - 7 Days',
    costEstimate: 15000,
    suitableFor: ['Chronic Digestive Issues', 'Arthritis', 'Skin Conditions', 'Metabolic Disorders'],
    contraindications: ['Severe exhaustion', 'Pregnancy', 'Acute infectious fevers'],
    precautions: ['Strict diet rules must be followed', 'Avoid direct cold draft winds', 'Refrain from heavy exercise'],
    steps: ['Snehana (Internal & external oiling)', 'Swedana (Herbal steam therapy)', 'Pradhana Karma (Detoxification acts)', 'Samsarjana Krama (Dietary return schedule)'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    rating: 4.9,
    reviewCount: 154,
    faq: [{ question: 'Is Panchakarma painful?', answer: 'No, the therapies consist of oil massages, herbal steams, and gentle elimination procedures designed for soothing detoxification.' }]
  },
  {
    id: 'trt-2',
    name: 'Vamana',
    slug: 'vamana',
    category: 'Panchakarma',
    description: 'Therapeutic emesis for expelling excess Kapha dosha from the upper respiratory and digestive tracts.',
    overview: 'Vamana is one of the five Panchakarma therapies specifically targeted at eliminating aggravated Kapha dosha. By inducing therapeutic vomiting through safe herbal mixtures, it clears respiratory channels, chest congestion, and metabolic sluggishness.',
    benefits: ['Clears respiratory passages', 'Cures chronic asthma and bronchitis', 'Improves digestion', 'Reduces Kapha skin issues like psoriasis'],
    procedure: 'Preparatory oiling (Snehana) is done for days. On the morning of therapy, the patient consumes special milk or licorice decoction, followed by emetic herbs under strict medical supervision.',
    duration: '3 - 5 Days',
    recoveryTime: '2 Days',
    costEstimate: 4500,
    suitableFor: ['Chronic Bronchitis', 'Asthma', 'Psoriasis', 'Hypothyroidism'],
    contraindications: ['Heart diseases', 'Hypertension', 'Children', 'Elderly'],
    precautions: ['Complete rest is required', 'Drink warm liquids only', 'Do not sleep during daytime'],
    steps: ['Internal oil consumption', 'Full-body oil massage', 'Emetic decoction administration', 'Post-purging throat soothing and light diet'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
    rating: 4.8,
    reviewCount: 88,
    faq: [{ question: 'Is Vamana safe?', answer: 'Yes, when done under qualified Vaidya supervision using precise herbal decoctions matching body strength.' }]
  },
  {
    id: 'trt-3',
    name: 'Virechana',
    slug: 'virechana',
    category: 'Panchakarma',
    description: 'Therapeutic purgation to cleanse blood channels and eliminate aggravated Pitta dosha from the liver and gallbladder.',
    overview: 'Virechana is a clinical purification therapy targeting Pitta dosha. It cleanses the liver, gallbladder, and small intestine of metabolic heat toxins, purifying the blood and restoring metabolic balance.',
    benefits: ['Purifies blood and heals skin diseases', 'Cures chronic acidity and gastritis', 'Improves liver function', 'Controls hormonal imbalances'],
    procedure: 'After preparatory oiling, the patient is administered natural purgative powders (like Senna or Trivrit) in the morning to induce safe, controlled bowel cleansing.',
    duration: '5 - 7 Days',
    recoveryTime: '2 Days',
    costEstimate: 5000,
    suitableFor: ['Eczema & Acne', 'PCOS', 'Gastritis & Ulcers', 'Gout'],
    contraindications: ['Diarrhea', 'Dehydration', 'Dysentery'],
    precautions: ['Avoid cold food and water', 'Refrain from physical exertion', 'Take light food post-cleanse'],
    steps: ['Preparatory internal Ghee drinking', 'External massage & steam', 'Purgative administration', 'Monitoring and dietary recovery'],
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
    rating: 4.9,
    reviewCount: 112,
    faq: [{ question: 'How many purgations happen in Virechana?', answer: 'Typically between 10 to 30 controlled bowel movements occur, which clear internal toxic heat from the blood and liver channels.' }]
  },
  {
    id: 'trt-4',
    name: 'Basti',
    slug: 'basti',
    category: 'Panchakarma',
    description: 'Medicated enema therapy to balance Vata dosha in the colon, addressing bone, joint, and nervous system disorders.',
    overview: 'Basti is considered the mother of all Ayurvedic treatments because it directly controls Vata dosha, the primary force behind most chronic illnesses. Through medicated oil and decoction enemas, it lubricates the colon, nourishes bone tissues, and calms the nervous system.',
    benefits: ['Lubricates joints and cures arthritis', 'Eradicates chronic constipation', 'Strengthens nervous system', 'Heals lower back pain and sciatica'],
    procedure: 'Medicated herbal oils or herbal decoctions are introduced via the rectal route using specialized enema bags under clinical conditions.',
    duration: '8 - 30 Days',
    recoveryTime: '3 Days',
    costEstimate: 8000,
    suitableFor: ['Sciatica', 'Osteoarthritis', 'Chronic Constipation', 'Hemiplegia'],
    contraindications: ['Active bleeding from rectum', 'Severe hemorrhoids', 'Indigestion'],
    precautions: ['Keep abdomen warm', 'Avoid heavy physical strain', 'Eat warm food only'],
    steps: ['Medicated oil enema (Anuvasana)', 'Decoction enema (Niruha)', 'Abdominal gentle massage', 'Warm water bathing and light food'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    rating: 4.9,
    reviewCount: 145,
    faq: [{ question: 'Why is Basti rectal?', answer: 'The colon is the primary seat of Vata dosha, and rectal absorption bypassing liver metabolism allows herbs to directly nourish joint and nervous tissues.' }]
  },
  {
    id: 'trt-5',
    name: 'Nasya',
    slug: 'nasya',
    category: 'Panchakarma',
    description: 'Nasal administration of medicated oils to clear sinuses, relieve chronic headaches, and calm mental stress.',
    overview: 'Nasya is the administration of medicated liquids (oils, juices, or powders) through the nasal passages. In Ayurveda, the nose is considered the gateway to the brain, and Nasya clears sinus blocks, alleviates migraines, and sharpens sensory perception.',
    benefits: ['Clears chronic sinus blocks', 'Relieves migraines and tension headaches', 'Prevents hair fall and early greying', 'Improves sleep and mental clarity'],
    procedure: 'The face and neck are massaged and steamed. Medicated oil drops (like Anu Taila) are administered in each nostril, followed by throat gargling and herbal smoke inhalation.',
    duration: '3 - 7 Days',
    recoveryTime: '1 Day',
    costEstimate: 2500,
    suitableFor: ['Migraines', 'Sinusitis', 'Cervical Spondylosis', 'Facial Paralysis'],
    contraindications: ['Immediately after eating', 'Acute cold/flu with fever', 'Under 7 or over 80 years'],
    precautions: ['Do not blow nose immediately', 'Avoid cold drafts', 'Do not wash head for a few hours'],
    steps: ['Facial massage (Mukha Abhyanga)', 'Facial steaming (Nadi Sweda)', 'Nasal oil drops drop-in', 'Gargle and herbal smoke inhalation'],
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
    rating: 4.7,
    reviewCount: 92,
    faq: [{ question: 'Does Nasya burn?', answer: 'Mild nasal tingling is normal and depends on the type of oil used (e.g. Anu Taila). It subsides after gargling with warm water.' }]
  },
  {
    id: 'trt-6',
    name: 'Raktamokshana',
    slug: 'raktamokshana',
    category: 'Panchakarma',
    description: 'Controlled therapeutic bloodletting to treat severe skin diseases, gout, and systemic blood impurity.',
    overview: 'Raktamokshana is the blood purification therapy of Panchakarma, targeted at flushing deep-seated Pitta blood toxins. Using clinical leeches (Jalaukavacharana) or syringe extraction, it purges localized skin inflammation and gout accumulations.',
    benefits: ['Instantly relieves skin inflammation', 'Cures severe chronic eczema and psoriasis', 'Reduces localized gout swelling', 'Purifies vascular channels'],
    procedure: 'Clinical, non-poisonous leeches are placed on the affected skin region to absorb toxic blood, or blood is drawn under sterile conditions.',
    duration: '1 - 3 Days',
    recoveryTime: '3 Days',
    costEstimate: 6000,
    suitableFor: ['Psoriasis patches', 'Chronic Eczema', 'Gouty Arthritis', 'Varicose Ulcers'],
    contraindications: ['Anemia', 'Hemophilia', 'Extreme weakness', 'Pregnancy'],
    precautions: ['Keep the wound dry and clean', 'Apply organic turmeric paste', 'Avoid exposure to direct heat'],
    steps: ['Area sterilization', 'Leech placement and suction monitoring', 'Leech removal with turmeric', 'Aseptic dressing'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
    rating: 4.8,
    reviewCount: 54,
    faq: [{ question: 'Do clinical leeches hurt?', answer: 'No, leech saliva contains natural anesthetic compounds, making the bite feel like a minor mosquito prick.' }]
  },
  {
    id: 'trt-7',
    name: 'Abhyanga',
    slug: 'abhyanga',
    category: 'Detox Therapy',
    description: 'Warm herbal oil body massage to soothe Vata, lubricate tissues, and stimulate circulation.',
    overview: 'Abhyanga is the classical full-body massage using warm medicated oils matched to the patient\'s dosha. It stimulates lymphatic drainage, calms the nervous system, and improves skin texture.',
    benefits: ['Reduces physical fatigue and body ache', 'Moisturizes and tones skin', 'Soothes nervous energy', 'Improves sleep patterns'],
    procedure: 'Rhythmic, synchronized strokes are applied to the entire body using customized warm herbal oils (like Mahanarayan or Dhanwantharam) for 45-60 minutes.',
    duration: '1 Day',
    recoveryTime: '0 Days',
    costEstimate: 2000,
    suitableFor: ['Fatigue', 'Joint Stiffness', 'Stress', 'Dry Skin'],
    contraindications: ['Severe indigestion', 'Fever', 'Acute inflammatory conditions'],
    precautions: ['Take a warm bath after session', 'Avoid eating heavy food immediately', 'Avoid cold drinks'],
    steps: ['Selection of herbal oil', 'Synchronized body massage', 'Rest for oil absorption', 'Warm herbal bath'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    rating: 4.9,
    reviewCount: 188,
    faq: [{ question: 'Can I do Abhyanga daily?', answer: 'Yes! Self-Abhyanga can be practiced daily before bathing to maintain joint lubrication and youthfulness.' }]
  },
  {
    id: 'trt-8',
    name: 'Shirodhara',
    slug: 'shirodhara',
    category: 'Lifestyle Therapy',
    description: 'Continuous pouring of warm medicated liquid on the forehead to calm the nervous system and relieve anxiety.',
    overview: 'Shirodhara is a unique Ayurvedic therapy where warm medicated liquid (oil, milk, or buttermilk) is poured in a continuous stream onto the forehead. It induces deep meditative states, balances brain chemistry, and relieves stress.',
    benefits: ['Alleviates chronic anxiety and stress', 'Cures severe insomnia', 'Relieves migraines and mental fatigue', 'Improves cognitive memory'],
    procedure: 'The patient lies down. A customized clay or metal pot is suspended over the forehead, pouring warm liquid in a rhythmic oscillation for 30-45 minutes.',
    duration: '3 - 7 Days',
    recoveryTime: '0 Days',
    costEstimate: 3500,
    suitableFor: ['Insomnia', 'Anxiety', 'Migraines', 'Mental Exhaustion'],
    contraindications: ['Brain tumors', 'Cuts/wounds on scalp', 'High fever'],
    precautions: ['Keep the head protected from drafts', 'Refrain from active brain tasks post-session', 'Do not sleep late'],
    steps: ['Medicated liquid preparation', 'Forehead stream pouring', 'Gentle scalp massage', 'Hair wash and rest'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    rating: 4.9,
    reviewCount: 204,
    faq: [{ question: 'What liquids are used in Shirodhara?', answer: 'Depending on the dosha: Ksheera (milk) for Pitta heat, Takra (buttermilk) for stress, and Taila (herbal oils) for Vata wind.' }]
  },
  {
    id: 'trt-9',
    name: 'Udvartana',
    slug: 'udvartana',
    category: 'Detox Therapy',
    description: 'Dry powder massage using scraping motions to break down subcutaneous fat and reduce Kapha dosha.',
    overview: 'Udvartana is a lymphatic massage performed using dry herbal powders in a direction opposite to hair growth. It helps break down fat cells, improves skin complexion, and manages obesity.',
    benefits: ['Reduces subcutaneous fat deposits', 'Tones muscles and skin', 'Exfoliates dead skin cells', 'Stimulates lymphatic circulation'],
    procedure: 'Custom dry herbal powders (like Triphala or Kolakulathadi) are rubbed vigorously onto the body in upward strokes for 45 minutes.',
    duration: '7 - 14 Days',
    recoveryTime: '1 Day',
    costEstimate: 2200,
    suitableFor: ['Obesity', 'Cellulite', 'Lethargy', 'Oily Skin'],
    contraindications: ['Dry skin conditions', 'Eczema', 'Wounds'],
    precautions: ['Avoid scraping on cuts', 'Take warm showers', 'Avoid moisturizing immediately'],
    steps: ['Powder warming', 'Vigorous upward scraping massage', 'Sweating chamber (optional)', 'Warm bath'],
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80',
    rating: 4.8,
    reviewCount: 110,
    faq: [{ question: 'Does Udvartana help in weight loss?', answer: 'Yes, it breaks down subcutaneous fat deposits and improves cellular metabolism when paired with dietary discipline.' }]
  },
  {
    id: 'trt-10',
    name: 'Herbal Therapy',
    slug: 'herbal-therapy',
    category: 'Herbal Therapy',
    description: 'Tailored organic botanical formulations to target chronic organ imbalances.',
    overview: 'Ayurvedic Herbal Therapy uses customized formulations (Churnas, Arishtas, and Kashayams) to treat specific system ailments, restoring digestive fire and nourishing bodily tissues (Dhatus).',
    benefits: ['Targeted organ healing', 'No chemical side effects', 'Strengthens digestion', 'Restores metabolic pathways'],
    procedure: 'Consultation with a Vaidya, pulse diagnostics, formulation prescription, and step-by-step intake schedule.',
    duration: '30 - 90 Days',
    recoveryTime: 'Ongoing',
    costEstimate: 1500,
    suitableFor: ['Indigestion', 'Low Immunity', 'Chronic Fatigue', 'Metabolic Imbalances'],
    contraindications: ['Self-medication without consulting a doctor'],
    precautions: ['Observe intake timings strictly', 'Report stomach irritation', 'Drink lukewarm water only'],
    steps: ['Dosha analysis', 'Custom formulation compounding', 'Ingestion schedule', 'Weekly review'],
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
    rating: 4.8,
    reviewCount: 125,
    faq: [{ question: 'Are Ayurvedic herbs safe for kidneys?', answer: 'Yes, when prescribed by verified Vaidyas. Avoid unverified heavy metal formulations sold over-the-counter.' }]
  },
  {
    id: 'trt-11',
    name: 'Detox Therapy',
    slug: 'detox-therapy',
    category: 'Detox Therapy',
    description: 'Systemic cleansing processes to clear body channels of accumulated metabolic toxins (Ama).',
    overview: 'Detox Therapy focuses on mobilizing and eliminating Ama (unprocessed metabolic toxins) using herbal teas, cleansing diets, and light therapeutic purgation.',
    benefits: ['Clears channel blocks', 'Relieves body heaviness', 'Freshens breath and improves skin', 'Restores natural energy levels'],
    procedure: 'A 3-5 day program involving toxin-digesting herbs (Ama Pachana) followed by mild laxatives and organic diet mapping.',
    duration: '3 - 5 Days',
    recoveryTime: '1 Day',
    costEstimate: 3000,
    suitableFor: ['Fatigue', 'Coated Tongue', 'Digestive Sluggishness', 'Bad Breath'],
    contraindications: ['Acute general weakness', 'Extreme emaciation'],
    precautions: ['Stick to warm mung dal soup', 'Do not drink cold water', 'Limit physical exertion'],
    steps: ['Pulse analysis', 'Ama digestion diet', 'Mild laxative administration', 'Rejuvenation diet startup'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
    rating: 4.7,
    reviewCount: 95,
    faq: [{ question: 'What is Ama?', answer: 'Ama is undigested metabolic waste that coats stomach linings and block channels, manifesting as fatigue and sluggishness.' }]
  },
  {
    id: 'trt-12',
    name: 'Yoga Therapy',
    slug: 'yoga-therapy',
    category: 'Yoga Therapy',
    description: 'Asanas and breathing techniques selected to restore physiological balance and lower stress.',
    overview: 'Yoga Therapy uses restorative postures, breathing flows (Pranayama), and meditative visualisations designed to balance nervous energy, lubricate joints, and improve lung capacity.',
    benefits: ['Lowers blood pressure and stress', 'Improves skeletal mobility', 'Enhances lung capacity', 'Stimulates abdominal organs'],
    procedure: 'Custom daily sessions guided by certified yoga experts matching the individual\'s body constitution.',
    duration: '15 - 30 Days',
    recoveryTime: '0 Days',
    costEstimate: 4000,
    suitableFor: ['Chronic Stress', 'Hypertension', 'Back Pain', 'Anxiety'],
    contraindications: ['Recent spinal surgeries', 'Acute disc herniation'],
    precautions: ['Do not force postures', 'Coordinate breath with moves', 'Rest in Shavasana post-practice'],
    steps: ['Body constitution assessment', 'Custom posture selection', 'Pranayama mapping', 'Daily guided practice'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    rating: 4.8,
    reviewCount: 140,
    faq: [{ question: 'Is Yoga Therapy similar to general yoga?', answer: 'No, Yoga Therapy is customized to treat specific medical conditions, adapting postures using props to match physical restrictions.' }]
  },
  {
    id: 'trt-13',
    name: 'Stress Management Program',
    slug: 'stress-management-program',
    category: 'Wellness Programs',
    description: 'Comprehensive wellness program combining Shirodhara, Abhyanga, and mental adaptogens to alleviate anxiety.',
    overview: 'Our Stress Management Program is a multidisciplinary wellness path designed to calm aggravated Vata energy. It integrates Shirodhara oil dripping, full-body massages, adaptogenic herbs, and breathing disciplines to restore mental peace.',
    benefits: ['Lowers cortisol levels', 'Cures insomnia and restores sleep cycles', 'Relieves nervous anxiety', 'Balances blood pressure'],
    procedure: 'Daily sessions of Shirodhara, Abhyanga, and guided relaxation techniques, accompanied by adaptogenic herbal formulations.',
    duration: '7 - 14 Days',
    recoveryTime: '2 Days',
    costEstimate: 12000,
    suitableFor: ['Chronic Stress', 'Anxiety Neurosis', 'Adrenal Fatigue', 'Insomnia'],
    contraindications: ['Acute psychiatric crises'],
    precautions: ['Limit screen time to 1 hour daily', 'Avoid toxic environments', 'Refrain from heavy caffeine intake'],
    steps: ['Initial stress assessment', 'Daily Shirodhara & Abhyanga', 'Nervous tissue nourishing herbs', 'Lifestyle routine integration'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    rating: 4.9,
    reviewCount: 198,
    faq: [{ question: 'How soon can I see results?', answer: 'Most patients experience marked improvements in sleep quality and calm states within the first 3 days of Shirodhara pouring.' }]
  },
  {
    id: 'trt-14',
    name: 'Weight Management Program',
    slug: 'weight-management-program',
    category: 'Wellness Programs',
    description: 'A tailored program featuring dry powder massages (Udvartana) and fat-scraping diets.',
    overview: 'The Weight Management Program focuses on burning deep fat tissues (Meda Dhatu) and clearing metabolic channels using Udvartana massage, thermogenic herbs, and customized low-Kapha nutrition.',
    benefits: ['Accelerates lipid metabolism', 'Trims fat lines and tones skin', 'Stimulates digestive fire (Agni)', 'Maintains healthy energy levels'],
    procedure: 'Dry powder massage cycles, internal detox teas, metabolic accelerating herbs, and a customized diet chart.',
    duration: '14 - 28 Days',
    recoveryTime: '3 Days',
    costEstimate: 14000,
    suitableFor: ['Obesity', 'Slow Metabolism', 'Fatty Liver', 'High Cholesterol'],
    contraindications: ['Pregnancy', 'Severe osteoporosis'],
    precautions: ['Follow diet charts precisely', 'Avoid eating late at night', 'Drink warm water with ginger'],
    steps: ['Body fat mapping', 'Dry herbal scrapings (Udvartana)', 'Liver fire stimulating herbs', 'Daily brisk walking routine'],
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80',
    rating: 4.8,
    reviewCount: 175,
    faq: [{ question: 'Is fasting required?', answer: 'No, Ayurveda discourages starvation. We serve satisfying, light, and digestible foods that stimulate digestion without building fat.' }]
  },
  {
    id: 'trt-15',
    name: 'PCOS Wellness Program',
    slug: 'pcos-wellness-program',
    category: 'Wellness Programs',
    description: 'A specialized hormonal balancing program utilizing channel-cleansing herbs and reproductive tonics.',
    overview: 'Our PCOS Wellness Program targets the root metabolic blockages in the female reproductive channel (Artava Srotas). By combining liver detoxification, hormone-balancing herbs (Shatavari, Ashoka), and customized yogic postures, we restore ovulation cycles and reduce cyst accumulation naturally.',
    benefits: ['Regulates menstrual cycles', 'Reduces cystic acne and facial hair', 'Improves insulin sensitivity', 'Supports natural fertility'],
    procedure: 'Virechana blood cleansing, custom herbal supplements, ovarian tissue nourishment, and hormone-stabilizing yoga.',
    duration: '30 - 90 Days',
    recoveryTime: 'Ongoing',
    costEstimate: 18000,
    suitableFor: ['Irregular Periods', 'Ovarian Cysts', 'Hormonal Acne', 'Insulin Resistance'],
    contraindications: ['None'],
    precautions: ['Requires elimination of processed flours', 'Avoid cold dairy products', 'Maintain early dinner patterns'],
    steps: ['Hormonal profiling', 'Purification therapy (Virechana)', 'Hormonal balancing herbs', 'Surya Namaskar & dietary corrections'],
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&q=80',
    rating: 4.9,
    reviewCount: 220,
    faq: [{ question: 'Can cysts be completely resolved?', answer: 'Yes. By clearing channel blockages (Kapha blocks) and enhancing local blood circulation, cysts are naturally absorbed and normal ovulation resumes.' }]
  }
];

const MOCK_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sharma',
    specialization: 'General Ayurveda & Panchakarma',
    qualification: 'BAMS, MD (Ayurveda) - Panchakarma Specialist',
    experience: 12,
    rating: 4.8,
    reviewCount: 124,
    fee: 500,
    consultationFee: 500,
    languages: ['Hindi', 'English', 'Sanskrit'],
    clinicName: 'Panchakarma Healing Sanctuary',
    city: 'Kochi',
    state: 'Kerala',
    about: 'Dr. Ananya Sharma is a renowned Ayurvedic physician specializing in Panchakarma therapies and detox wellness. With over 12 years of experience, she focuses on diagnosing root causes of disorders using ancient Nadi Pariksha and restoring system balance through customized detoxification regimens.',
    education: [
      'BAMS - Government Ayurveda College, Trivandrum',
      'MD in Panchakarma - IPGT & RA, Jamnagar',
      'Certificate Course in Yoga & Meditation - Kerala University'
    ],
    awards: [
      'AyurVaidya Excellence Award 2024',
      'Best Panchakarma Specialist of Kerala (2022)',
      'Member of National Ayurvedic Medical Association'
    ],
    specialExpertise: ['Panchakarma Detox', 'Stress Relief', 'Chronic Insomnia Therapy', 'Digestive Rejuvenation'],
    availability: 'Mon-Sat, 9:00 AM - 5:00 PM',
    onlineConsultation: true,
    offlineConsultation: true,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80'
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Iyer',
    specialization: 'Joint Care & Orthopedic Ayurveda',
    qualification: 'BAMS, MS (Ayurveda Shalya Tantra) - Marma Expert',
    experience: 15,
    rating: 4.9,
    reviewCount: 210,
    fee: 800,
    consultationFee: 800,
    languages: ['Tamil', 'English', 'Hindi', 'Malayalam'],
    clinicName: 'Marma Joint & Spine Healing Center',
    city: 'Chennai',
    state: 'Tamil Nadu',
    about: 'Dr. Rajesh Iyer is a seasoned Ayurveda surgeon and Marma specialist, focused on joint health, chronic spine disorders, and skeletal alignments. He combines traditional herbal oils with ancient Marma pressure techniques to treat back, knee, and neck conditions without surgical interventions.',
    education: [
      'BAMS - Madras Ayurveda College, Chennai',
      'MS in Shalya Tantra - SDM College of Ayurveda, Udupi',
      'Fellowship in Pain Management - Medvarsity'
    ],
    awards: [
      'Sushruta Rashtriya Award 2023',
      'Marma Chikitsa Samrat Title (2021)',
      'Executive Committee Member of Association of Ayurvedic Surgeons'
    ],
    specialExpertise: ['Marma Joint Therapy', 'Janu Basti', 'Sciatica Management', 'Rheumatoid Arthritis Care'],
    availability: 'Mon-Fri, 10:00 AM - 6:00 PM',
    onlineConsultation: false,
    offlineConsultation: true,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Gupta',
    specialization: 'Ayurvedic Dermatology & Skin Care',
    qualification: 'BAMS, Diploma in Ayurvedic Cosmetology',
    experience: 8,
    rating: 4.7,
    reviewCount: 96,
    fee: 600,
    consultationFee: 600,
    languages: ['Hindi', 'English', 'Punjabi'],
    clinicName: 'Siddha Skin & Hair Clinic',
    city: 'New Delhi',
    state: 'Delhi',
    about: 'Dr. Priya Gupta is a highly dedicated physician expert in treating deep skin disorders (Kushtha) and hair concerns through blood purification, herbal pastes, and metabolic path corrections. She focuses on using nature\'s bounty to restore external radiance and eliminate deep internal cellular impurities.',
    education: [
      'BAMS - Ayurvedic & Unani Tibbia College, New Delhi',
      'Diploma in Ayurvedic Cosmetology - NIA, Jaipur',
      'Advanced Skin Therapy Training - Bangalore'
    ],
    awards: [
      'Young Achiever in Ayurvedic Dermatology 2022',
      'Dermatology Panelist at World Ayurveda Congress',
      'Member of Ayurvedic Cosmetology Council'
    ],
    specialExpertise: ['Psoriasis Treatment', 'Cystic Acne Healing', 'Eczema Management', 'Hair Fall Therapy'],
    availability: 'Mon-Sat, 11:00 AM - 7:00 PM',
    onlineConsultation: true,
    offlineConsultation: true,
    photo: 'https://images.unsplash.com/photo-1594824436998-058a2312422b?w=400&q=80'
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikram Singh',
    specialization: 'Metabolic & Diabetes Management',
    qualification: 'BAMS, MD (Kaya Chikitsa) - Internal Medicine Expert',
    experience: 20,
    rating: 4.9,
    reviewCount: 342,
    fee: 1000,
    consultationFee: 1000,
    languages: ['Hindi', 'English', 'Gujarati'],
    clinicName: 'Madhu-Meha Reversal Clinic',
    city: 'Mumbai',
    state: 'Maharashtra',
    about: 'Dr. Vikram Singh has over 20 years of expertise in internal Ayurvedic medicine (Kaya Chikitsa), specialized in managing metabolic imbalances, particularly Type 2 Diabetes (Madhumeha) and thyroid concerns. He has successfully helped hundreds of patients reduce drug dependencies through personalized dietary correction and pancreatic support herbs.',
    education: [
      'BAMS - Banaras Hindu University (BHU), Varanasi',
      'MD in Kaya Chikitsa - National Institute of Ayurveda (NIA), Jaipur',
      'PhD in Diabetes Management in Ayurveda - BHU'
    ],
    awards: [
      'Dhanwantari National Award 2025',
      'Pioneer of Diabetes Reversal in Ayurveda (2020)',
      'Advisor to AYUSH Ministry on Metabolic Disorders'
    ],
    specialExpertise: ['Diabetes Management', 'Thyroid Rejuvenation', 'Metabolic Correction', 'Weight Control'],
    availability: 'Mon-Fri, 9:00 AM - 4:00 PM',
    onlineConsultation: true,
    offlineConsultation: false,
    photo: 'https://images.unsplash.com/photo-1537368910025-7028500a263c?w=400&q=80'
  }
];

const MOCK_CLINICS = [
  {
    id: 'cl-1',
    name: 'Kerala Ayurveda Zen Sanctuary',
    logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    type: 'Panchakarma Center',
    description: 'A luxurious five-star Ayurveda resort and detoxification sanctuary overlooking the tranquil backwaters of Kochi. Specializing in traditional Shodhana therapies and customized Panchakarma protocols under strict MD Vaidya supervision.',
    address: '12 Backwater Retreat, Fort Kochi',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    phone: '+91 484 2748390',
    email: 'contact@keralazen.com',
    website: 'https://www.keralazen.com',
    rating: 4.9,
    reviewCount: 284,
    yearsEstablished: 18,
    doctorsCount: 8,
    services: ['Panchakarma', 'Detox Therapy', 'Abhyanga', 'Shirodhara', 'Nasya', 'Virechana', 'Basti', 'Stress Management'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Accommodation', 'Diagnostic Support', 'Cafeteria', 'Wellness Programs'],
    openingHours: 'Mon-Sun: 07:00 AM - 08:00 PM',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
    ],
    latitude: 9.9312,
    longitude: 76.2673,
    mission: 'To guide individuals towards holistic rejuvenation using customized, traditional Panchakarma purges and healing backwater therapies.',
    history: 'Founded in 2008 in Fort Kochi, our sanctuary quickly gained international acclaim for preserving clinical Shodhana protocols and organic herbal oils compounding in Kerala.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', caption: 'Luxury Therapy Suite' },
      { id: 'gal-2', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80', caption: 'Tranquil Backwater Courtyard' },
      { id: 'gal-3', url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80', caption: 'Organic Compound Lab' },
      { id: 'gal-4', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', caption: 'Yoga Pavilion' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Royal Panchakarma Detoxification',
        description: 'Complete fivefold cleansing (Shodhana) with customized daily massages, steam chambers, and doshic meals.',
        duration: '7 Days',
        price: 25000,
        benefits: ['Complete cellular detox', 'Restores metabolic fire (Agni)', 'Soothes nervous system'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
      },
      {
        id: 'pkg-2',
        name: 'Stress & Insomnia Reversal',
        description: 'Combining continuous warm Shirodhara drips with grounding Vata-soothing body strokes.',
        duration: '5 Days',
        price: 18000,
        benefits: ['Lowers cortisol levels', 'Deep, restorative sleep', 'Relieves mental fatigue'],
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '07:00 AM - 08:00 PM', closed: false },
      { day: 'Tuesday', hours: '07:00 AM - 08:00 PM', closed: false },
      { day: 'Wednesday', hours: '07:00 AM - 08:00 PM', closed: false },
      { day: 'Thursday', hours: '07:00 AM - 08:00 PM', closed: false },
      { day: 'Friday', hours: '07:00 AM - 08:00 PM', closed: false },
      { day: 'Saturday', hours: '07:00 AM - 08:00 PM', closed: false },
      { day: 'Sunday', hours: '08:00 AM - 04:00 PM', closed: false }
    ]
  },
  {
    id: 'cl-2',
    name: 'AyurCare Wellness Hub',
    logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    type: 'Wellness Center',
    description: 'A premium, modern holistic health hub in the heart of Mumbai. We provide corporate stress relief programs, dietary doshic coaching, and traditional therapies customized for active urban lifestyles.',
    address: '45 Juhu Tara Road, Juhu',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    phone: '+91 22 26154800',
    email: 'info@ayurcaremumbai.com',
    website: 'https://www.ayurcaremumbai.com',
    rating: 4.8,
    reviewCount: 198,
    yearsEstablished: 10,
    doctorsCount: 5,
    services: ['Shirodhara', 'Abhyanga', 'PCOS Treatment', 'Weight Management', 'Stress Management', 'Skin Care'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Accommodation', 'Wellness Programs'],
    openingHours: 'Mon-Sat: 08:00 AM - 07:00 PM',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80'
    ],
    latitude: 19.1026,
    longitude: 72.8242,
    mission: 'To bridge traditional Vedic diagnostic science with fast-paced urban lifestyles, creating accessible paths to wellness.',
    history: 'Formed in 2016, AyurCare pioneered corporate wellness and preventive consultation in Mumbai, catering to hundreds of corporate leaders.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', caption: 'Lobby & Waiting Lounge' },
      { id: 'gal-2', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80', caption: 'Consultation Room' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Urban Metabolic Reset',
        description: 'Targeted at restoring weight balance and resetting digestion through oil massages and organic diet plan coaching.',
        duration: '5 Days',
        price: 12500,
        benefits: ['Boosts sluggish metabolism', 'Toxin scraping (Lekhana)', 'Dietary plan maps'],
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '08:00 AM - 07:00 PM', closed: false },
      { day: 'Tuesday', hours: '08:00 AM - 07:00 PM', closed: false },
      { day: 'Wednesday', hours: '08:00 AM - 07:00 PM', closed: false },
      { day: 'Thursday', hours: '08:00 AM - 07:00 PM', closed: false },
      { day: 'Friday', hours: '08:00 AM - 07:00 PM', closed: false },
      { day: 'Saturday', hours: '08:00 AM - 07:00 PM', closed: false },
      { day: 'Sunday', hours: 'Closed', closed: true }
    ]
  },
  {
    id: 'cl-3',
    name: 'Shuddhi Ayurveda Clinic',
    logo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    type: 'Ayurveda Clinic',
    description: 'Dedicated to cleansing your mind and body. Located in New Delhi, Shuddhi Clinic is a leading name in pulse diagnostics (Nadi Pariksha) and customized herbal medicines for metabolic diseases.',
    address: 'B-12 Greater Kailash I',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    phone: '+91 11 41635890',
    email: 'delhi@shuddhiayurveda.com',
    website: 'https://www.shuddhiayurveda.com',
    rating: 4.7,
    reviewCount: 154,
    yearsEstablished: 8,
    doctorsCount: 4,
    services: ['Panchakarma', 'Detox Therapy', 'Diabetes Care', 'Weight Management', 'Skin Care'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Diagnostic Support', 'Wellness Programs'],
    openingHours: 'Mon-Sat: 09:00 AM - 06:00 PM',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80'
    ],
    latitude: 28.5482,
    longitude: 77.2348,
    mission: 'To deliver precise root-cause analysis through Nadi Pariksha and restore vitality with organic Ayurvedic extracts.',
    history: 'Formed in 2018 in GK-1, Shuddhi has established standard protocols for metabolic disorders reversal.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80', caption: 'Clinical Examination Room' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Nadi Rejuvenation Program',
        description: 'Includes precise pulse tracking, 3 personalized therapies, and 30 days of customized herbal extracts.',
        duration: '3 Days',
        price: 8500,
        benefits: ['Nervous channel alignment', 'Systemic detoxification', 'Stress relief'],
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '09:00 AM - 06:00 PM', closed: false },
      { day: 'Tuesday', hours: '09:00 AM - 06:00 PM', closed: false },
      { day: 'Wednesday', hours: '09:00 AM - 06:00 PM', closed: false },
      { day: 'Thursday', hours: '09:00 AM - 06:00 PM', closed: false },
      { day: 'Friday', hours: '09:00 AM - 06:00 PM', closed: false },
      { day: 'Saturday', hours: '09:00 AM - 06:00 PM', closed: false },
      { day: 'Sunday', hours: 'Closed', closed: true }
    ]
  },
  {
    id: 'cl-4',
    name: 'Himalayan Holistic Rejuvenation Hospital',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    type: 'Ayurveda Hospital',
    description: 'An expansive inpatient Ayurvedic hospital nestled in the serene foothills of Rishikesh. Combining ancient scriptural therapies with clinical diagnostic standards. Famous for metabolic restoration programs.',
    address: 'Tapovan Hills, Badrinath Road',
    city: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    phone: '+91 135 2439800',
    email: 'heal@himalayanhospital.com',
    website: 'https://www.himalayanhospital.com',
    rating: 4.9,
    reviewCount: 312,
    yearsEstablished: 25,
    doctorsCount: 12,
    services: ['Panchakarma', 'Detox Therapy', 'Abhyanga', 'Shirodhara', 'Nasya', 'Virechana', 'Basti', 'Diabetes Care', 'Weight Management'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Accommodation', 'Diagnostic Support', 'Cafeteria', 'Wellness Programs'],
    openingHours: 'Mon-Sun: 24 Hours Open (Emergency available)',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80'
    ],
    latitude: 30.1314,
    longitude: 78.3150,
    mission: 'To offer complete therapeutic inpatient immersion merging ancient wisdom with modern diagnostic standards.',
    history: 'Celebrating 25 years in Tapovan, we have hosted patients from over 60 countries for chronic joint and metabolic rehabilitation.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80', caption: 'Inpatient Deluxe Suite' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Himalayan Ayurvedic Immersion',
        description: 'Complete luxury clinical inpatient stay with 2 therapy sessions daily, custom yoga classes, and organic doshic diet plans.',
        duration: '14 Days',
        price: 48000,
        benefits: ['Deep joint lubrication (Janu Basti)', 'Complete digestive tract reset', 'Hormonal alignment'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '24 Hours Open', closed: false },
      { day: 'Tuesday', hours: '24 Hours Open', closed: false },
      { day: 'Wednesday', hours: '24 Hours Open', closed: false },
      { day: 'Thursday', hours: '24 Hours Open', closed: false },
      { day: 'Friday', hours: '24 Hours Open', closed: false },
      { day: 'Saturday', hours: '24 Hours Open', closed: false },
      { day: 'Sunday', hours: '24 Hours Open', closed: false }
    ]
  },
  {
    id: 'cl-5',
    name: 'Jiva Ayurveda Clinic & Rejuvenation Center',
    logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80',
    type: 'Ayurveda Clinic',
    description: 'Jiva provides authentic consultations and natural remedies for chronic conditions. Our team of doctors assesses your Prakriti to resolve illnesses from their root causes.',
    address: 'Sector 21C, Landmark Road',
    city: 'Faridabad',
    state: 'Haryana',
    country: 'India',
    phone: '+91 129 4040404',
    email: 'info@jiva.com',
    website: 'https://www.jiva.com',
    rating: 4.6,
    reviewCount: 420,
    yearsEstablished: 15,
    doctorsCount: 6,
    services: ['Detox Therapy', 'Abhyanga', 'PCOS Treatment', 'Diabetes Care', 'Stress Management'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Wellness Programs'],
    openingHours: 'Mon-Sat: 09:00 AM - 07:00 PM',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80'
    ],
    latitude: 28.4116,
    longitude: 77.3155,
    mission: 'To digitize and standardize Ayurvedic consultations to ensure root cause healing reaches every household.',
    history: 'Jiva is one of the largest clinic networks in Northern India, serving chronic patients since 2011.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80', caption: 'Consultation & Pulse Center' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Prakriti Balance Package',
        description: 'Personalized constitution analysis, diet guidance, and 30-day supply of organic herbal formulas.',
        duration: '1 Day',
        price: 2500,
        benefits: ['Prakriti and Dosha analysis', 'Metabolic blueprint guidelines', 'Diet tracking schedules'],
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '09:00 AM - 07:00 PM', closed: false },
      { day: 'Tuesday', hours: '09:00 AM - 07:00 PM', closed: false },
      { day: 'Wednesday', hours: '09:00 AM - 07:00 PM', closed: false },
      { day: 'Thursday', hours: '09:00 AM - 07:00 PM', closed: false },
      { day: 'Friday', hours: '09:00 AM - 07:00 PM', closed: false },
      { day: 'Saturday', hours: '09:00 AM - 07:00 PM', closed: false },
      { day: 'Sunday', hours: 'Closed', closed: true }
    ]
  },
  {
    id: 'cl-6',
    name: 'Somatheeram Ayurveda Village',
    logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    type: 'Panchakarma Center',
    description: 'Somatheeram is the world’s first Ayurvedic resort, offering beautiful seaside cottages, yoga lessons, and complete Panchakarma programs in a pristine tropical landscape.',
    address: 'Chowara, Kovalam',
    city: 'Trivandrum',
    state: 'Kerala',
    country: 'India',
    phone: '+91 471 2266111',
    email: 'mail@somatheeram.in',
    website: 'https://www.somatheeram.in',
    rating: 4.9,
    reviewCount: 512,
    yearsEstablished: 30,
    doctorsCount: 15,
    services: ['Panchakarma', 'Detox Therapy', 'Abhyanga', 'Shirodhara', 'Nasya', 'Virechana', 'Basti', 'Skin Care'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Accommodation', 'Diagnostic Support', 'Cafeteria', 'Wellness Programs'],
    openingHours: 'Mon-Sun: 07:00 AM - 09:00 PM',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
    ],
    latitude: 8.3846,
    longitude: 76.9740,
    mission: 'To heal the world through seaside luxury wellness retreats and authentic classical Panchakarma routines.',
    history: 'Established in 1990, Somatheeram is the world’s first Ayurvedic village, recognized repeatedly by governments and ministries for exports excellence.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', caption: 'Seaside Therapy Room' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Seaside Purification program',
        description: '7 days of custom therapy, seaside cottage stay, dynamic yoga lessons, and custom organic meals.',
        duration: '7 Days',
        price: 35000,
        benefits: ['Complete bodily purification', 'Stress relief & grounding', 'Cardiovascular stamina'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '07:00 AM - 09:00 PM', closed: false },
      { day: 'Tuesday', hours: '07:00 AM - 09:00 PM', closed: false },
      { day: 'Wednesday', hours: '07:00 AM - 09:00 PM', closed: false },
      { day: 'Thursday', hours: '07:00 AM - 09:00 PM', closed: false },
      { day: 'Friday', hours: '07:00 AM - 09:00 PM', closed: false },
      { day: 'Saturday', hours: '07:00 AM - 09:00 PM', closed: false },
      { day: 'Sunday', hours: '07:00 AM - 09:00 PM', closed: false }
    ]
  },
  {
    id: 'cl-7',
    name: 'Ayurmana Spine & Joint Wellness Center',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    type: 'Holistic Healing Center',
    description: 'Ayurmana is specialized in treating chronic spine stiffness, sciatica, arthritis, and orthopedic ailments using traditional herbal paste poultices and targeted local enemas (Basti).',
    address: 'Kalyan Nagar, Outer Ring Road',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    phone: '+91 80 25493800',
    email: 'info@ayurmanabroad.com',
    website: 'https://www.ayurmanaspine.com',
    rating: 4.8,
    reviewCount: 167,
    yearsEstablished: 12,
    doctorsCount: 5,
    services: ['Abhyanga', 'Basti', 'Shirodhara', 'Stress Management'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Diagnostic Support', 'Wellness Programs'],
    openingHours: 'Mon-Sat: 08:30 AM - 06:30 PM',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80'
    ],
    latitude: 13.0232,
    longitude: 77.6418,
    mission: 'To deliver non-invasive orthotic joint care and muscular relief utilizing specialized classical local oil treatments.',
    history: 'Founded in Bangalore in 2014, Ayurmana is a premier center for spine alignments and skeletal joint disorders.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', caption: 'Spine & Joint Treatment Hall' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Spine & Sciatica Rejuvenation',
        description: 'Targeted Janu Basti, local oil pooling, herbal poultice massage (Patra Pinda Sveda), and custom lumbar stretches.',
        duration: '5 Days',
        price: 15500,
        benefits: ['Numbness reversal', 'Spine flexibility restoration', 'Joint pain management'],
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '08:30 AM - 06:30 PM', closed: false },
      { day: 'Tuesday', hours: '08:30 AM - 06:30 PM', closed: false },
      { day: 'Wednesday', hours: '08:30 AM - 06:30 PM', closed: false },
      { day: 'Thursday', hours: '08:30 AM - 06:30 PM', closed: false },
      { day: 'Friday', hours: '08:30 AM - 06:30 PM', closed: false },
      { day: 'Saturday', hours: '08:30 AM - 06:30 PM', closed: false },
      { day: 'Sunday', hours: 'Closed', closed: true }
    ]
  },
  {
    id: 'cl-8',
    name: 'Atreya Ayurvedic Hospital',
    logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    type: 'Ayurveda Hospital',
    description: 'Atreya offers state-of-the-art clinical inpatient facilities. Specialized in metabolic syndrome care, skin disorders, and complete Panchakarma detox cycles managed by award-winning Vaidyas.',
    address: 'Kothrud, Landmark Circle',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    phone: '+91 20 25438900',
    email: 'pune@atreya.com',
    website: 'https://www.atreyaayurveda.com',
    rating: 4.7,
    reviewCount: 142,
    yearsEstablished: 14,
    doctorsCount: 7,
    services: ['Panchakarma', 'Detox Therapy', 'Virechana', 'Basti', 'Diabetes Care', 'Skin Care'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Accommodation', 'Diagnostic Support', 'Wellness Programs'],
    openingHours: 'Mon-Sun: 24 Hours Open',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80'
    ],
    latitude: 18.5074,
    longitude: 73.8077,
    mission: 'To heal chronic ailments through medical board certifications and strict hospital diagnostics coupled with traditional Shodhana.',
    history: 'A state-of-the-art medical Ayurvedic institution established in 2012 in Pune, offering 24/7 medical supervision.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80', caption: 'Clinical Ward & Therapy Block' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Clinical Skin Purification',
        description: 'For chronic psoriasis, eczema, and rashes. Incorporates custom Virechana purgation, organic blood purifiers, and cooling wraps.',
        duration: '10 Days',
        price: 22000,
        benefits: ['Pitta heat evacuation', 'Blood purification (Manjistha)', 'Silvery scale reduction'],
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '24 Hours Open', closed: false },
      { day: 'Tuesday', hours: '24 Hours Open', closed: false },
      { day: 'Wednesday', hours: '24 Hours Open', closed: false },
      { day: 'Thursday', hours: '24 Hours Open', closed: false },
      { day: 'Friday', hours: '24 Hours Open', closed: false },
      { day: 'Saturday', hours: '24 Hours Open', closed: false },
      { day: 'Sunday', hours: '24 Hours Open', closed: false }
    ]
  },
  {
    id: 'cl-9',
    name: 'Sanjeevani Wellness Center & Yoga Ashram',
    logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80',
    type: 'Wellness Center',
    description: 'Sanjeevani focuses on mental health restoration and yoga therapy. Combining daily pranayama, herbal oil drips, and constitutional diet plans to soothen adrenal exhaustion.',
    address: 'Kanakapura Road, Valley View',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    phone: '+91 80 28439900',
    email: 'ashram@sanjeevani.org',
    website: 'https://www.sanjeevaniayuryoga.org',
    rating: 4.8,
    reviewCount: 130,
    yearsEstablished: 16,
    doctorsCount: 4,
    services: ['Shirodhara', 'Abhyanga', 'Stress Management', 'Yoga Therapy'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Parking', 'Accommodation', 'Wellness Programs'],
    openingHours: 'Mon-Sun: 06:00 AM - 08:00 PM',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80'
    ],
    latitude: 12.8943,
    longitude: 77.5458,
    mission: 'To promote mental tranquility and autonomic balance through yoga, meditation, and sensory calming routines.',
    history: 'Set up in 2010 on a peaceful campus on Kanakapura road, Sanjeevani provides stress management for urban professionals.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80', caption: 'Ashram Meditation Hall' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Vedic Mental Rejuvenation',
        description: 'Designed to relieve stress, combat burnout, and cure insomnia. Shirodhara drips, foot Abhyanga, and custom pranayama.',
        duration: '5 Days',
        price: 14000,
        benefits: ['Calms hyperactive Vata dosha', 'Enhances deep memory levels', 'Deep autonomic nervous reset'],
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '06:00 AM - 08:00 PM', closed: false },
      { day: 'Tuesday', hours: '06:00 AM - 08:00 PM', closed: false },
      { day: 'Wednesday', hours: '06:00 AM - 08:00 PM', closed: false },
      { day: 'Thursday', hours: '06:00 AM - 08:00 PM', closed: false },
      { day: 'Friday', hours: '06:00 AM - 08:00 PM', closed: false },
      { day: 'Saturday', hours: '06:00 AM - 08:00 PM', closed: false },
      { day: 'Sunday', hours: '06:00 AM - 08:00 PM', closed: false }
    ]
  },
  {
    id: 'cl-10',
    name: 'Madhavbaug Cardiac Care Clinic',
    logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=150&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    type: 'Holistic Healing Center',
    description: 'Madhavbaug is a certified leader in non-invasive cardiac care. Combining Panchakarma, diet regulation, and stress management, we help reverse heart diseases and type-2 diabetes naturally.',
    address: 'Thane West, Gokhale Road',
    city: 'Thane',
    state: 'Maharashtra',
    country: 'India',
    phone: '+91 22 25438800',
    email: 'care@madhavbaug.org',
    website: 'https://www.madhavbaug.org',
    rating: 4.7,
    reviewCount: 384,
    yearsEstablished: 20,
    doctorsCount: 8,
    services: ['Panchakarma', 'Diabetes Care', 'Weight Management', 'Stress Management'],
    facilities: ['Private Therapy Rooms', 'Online Consultation', 'Pharmacy', 'Parking', 'Diagnostic Support'],
    openingHours: 'Mon-Sat: 09:30 AM - 06:30 PM',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80'
    ],
    latitude: 19.2183,
    longitude: 72.9781,
    mission: 'To reduce dependencies on cardiovascular drugs through non-invasive therapies, herbal extracts, and clinical diet corrections.',
    history: 'A pioneer clinic established in 2006, Madhavbaug has treated over a lakh cardiac patients throughout Maharashtra.',
    gallery: [
      { id: 'gal-1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', caption: 'Cardiac Diagnostics Area' }
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Heart Health & Reversal program',
        description: 'Specialized clinic checks, arterial stress evaluations, custom low-sodium meals, and fat-cleansing enemas.',
        duration: '7 Days',
        price: 19000,
        benefits: ['Cardiovascular stamina increase', 'Cleanses arterial walls (Ama removal)', 'Normalizes arterial pressure'],
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80'
      }
    ],
    openingHoursList: [
      { day: 'Monday', hours: '09:30 AM - 06:30 PM', closed: false },
      { day: 'Tuesday', hours: '09:30 AM - 06:30 PM', closed: false },
      { day: 'Wednesday', hours: '09:30 AM - 06:30 PM', closed: false },
      { day: 'Thursday', hours: '09:30 AM - 06:30 PM', closed: false },
      { day: 'Friday', hours: '09:30 AM - 06:30 PM', closed: false },
      { day: 'Saturday', hours: '09:30 AM - 06:30 PM', closed: false },
      { day: 'Sunday', hours: 'Closed', closed: true }
    ]
  }
];

const MOCK_TESTIMONIALS = [
  { id: 't-1', patientName: 'Rohit Malhotra', disease: 'Type 2 Diabetes', treatment: 'Panchakarma & Diet shifts', recoveryTime: '3 Months', text: 'Dr. Vikram Singh\'s guidelines completely regulated my HbA1c levels. The customized diet coupled with metabolic herbs restored my stamina!', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' },
  { id: 't-2', patientName: 'Priya Varghese', disease: 'Sciatic Spine Pain', treatment: 'Kativasti & Herbal Oils', recoveryTime: '4 Weeks', text: 'Authentic warm oil pooling therapies at the Kerala Zen center relieved my intense back and leg stiffness. I am pain-free and walking comfortably.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80' },
  { id: 't-3', patientName: 'Smriti Mishra', disease: 'Severe PCOS & Bloating', treatment: 'Hormonal Herbal Teas', recoveryTime: '6 Months', text: 'I struggled with cystic acne and irregular periods. Rejuvenation herbs normalized my cycle naturally and cleared my skin thoroughly.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' }
];

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API Routes
app.get("/api/stats", (req, res) => {
  res.json(MOCK_STATS);
});

app.get("/api/disease-categories", (req, res) => {
  res.json(MOCK_DISEASE_CATEGORIES);
});

app.get("/api/diseases", (req, res) => {
  res.json(MOCK_DISEASES);
});

app.get("/api/diseases/:id", (req, res) => {
  const disease = MOCK_DISEASES.find(d => d.id === req.params.id || d.slug === req.params.id);
  if (disease) {
    res.json(disease);
  } else {
    res.status(404).json({ error: "Disease condition not found" });
  }
});

app.get("/api/popular-diseases", (req, res) => {
  // Return a subset of diseases as popular
  const popular = MOCK_DISEASES.filter(d => 
    ["diabetes", "pcos", "arthritis", "migraine", "psoriasis"].includes(d.slug)
  );
  res.json(popular);
});

app.get("/api/treatments", (req, res) => {
  res.json(MOCK_TREATMENTS);
});

app.get("/api/treatments/:id", (req, res) => {
  const trt = MOCK_TREATMENTS.find(t => t.id === req.params.id || t.slug === req.params.id);
  if (trt) {
    res.json(trt);
  } else {
    res.status(404).json({ error: "Treatment not found" });
  }
});

app.get("/api/treatments/:id/doctors", (req, res) => {
  const trt = MOCK_TREATMENTS.find(t => t.id === req.params.id || t.slug === req.params.id);
  if (!trt) {
    return res.status(404).json({ error: "Treatment not found" });
  }
  // Recommended doctors matching this treatment
  // Filter MOCK_DOCTORS by matching specialization keywords or expertise
  const matched = MOCK_DOCTORS.filter(doc => {
    const spec = doc.specialization.toLowerCase();
    const exp = doc.specialExpertise.map(e => e.toLowerCase());
    const cat = trt.category.toLowerCase();
    return spec.includes(cat) || 
           spec.includes("general") || 
           spec.includes("kayachikitsa") || 
           exp.some(e => e.includes(trt.name.toLowerCase()) || e.includes(cat));
  });
  // Fallback if no matching doctors, return first 6 featured doctors
  const results = matched.length > 0 ? matched.slice(0, 6) : MOCK_DOCTORS.slice(0, 6);
  res.json(results);
});

app.get("/api/treatments/:id/faqs", (req, res) => {
  const trt = MOCK_TREATMENTS.find(t => t.id === req.params.id || t.slug === req.params.id);
  if (trt) {
    res.json(trt.faq || []);
  } else {
    res.status(404).json({ error: "Treatment not found" });
  }
});

app.get("/api/treatments/:id/recovery-timeline", (req, res) => {
  const trt = MOCK_TREATMENTS.find(t => t.id === req.params.id || t.slug === req.params.id);
  if (!trt) {
    return res.status(404).json({ error: "Treatment not found" });
  }
  // Mock recovery timeline milestones customized slightly by treatment name
  const timeline = [
    { step: "Week 1", description: `Primary response initiation. Digestive adjustments and body adapting to the therapeutic inputs of ${trt.name}.` },
    { step: "Week 2", description: `Active channel purification. Cleansing of toxins (Ama) starts, which might cause mild healing fatigue.` },
    { step: "Week 4", description: `Dosha stabilization and system rebalancing. Notable improvement in digestive fire (Agni) and general energy.` },
    { step: "Month 2", description: `Deep tissue (Dhatu) rejuvenation and cell repair. Targeted chronic symptoms begin to fade.` },
    { step: "Month 3", description: "Establishment of dynamic health balance, complete vitality, and ongoing maintenance through seasonal diet guidelines." }
  ];
  res.json(timeline);
});

app.get("/api/treatments/:id/personalized-plan", (req, res) => {
  const trt = MOCK_TREATMENTS.find(t => t.id === req.params.id || t.slug === req.params.id);
  if (!trt) {
    return res.status(404).json({ error: "Treatment not found" });
  }
  const age = parseInt(req.query.age) || 30;
  const goal = req.query.goal || "Restore systemic energy balance";
  const dosha = (req.query.dosha || "Vata").toLowerCase();

  let diet = [];
  let lifestyle = [];
  let timeline = "";

  if (dosha === "vata") {
    diet = [
      "Warm, freshly cooked grounding foods (basmati rice, warm soups, oats).",
      "Incorporate healthy fats like raw Ghee, sesame oil, and almond oil.",
      "Sweet, sour, and salty tastes; avoid dry, cold, or carbonated items."
    ];
    lifestyle = [
      "Perform a 10-minute self-Abhyanga massage with warm sesame oil before bathing.",
      "Practice 15 minutes of calming Nadi Shodhana (breath balancing) pranayama.",
      "Strict sleep hygiene: retire by 10:00 PM and protect your joints from cold drafts."
    ];
    timeline = "6 Weeks. Focus is on nourishing bodily tissues and grounding nervous energy.";
  } else if (dosha === "pitta") {
    diet = [
      "Cooling, soothing, and moderately heavy foods (sweet fruits, leafy greens, coconut).",
      "Favor sweet, bitter, and astringent tastes; strictly avoid spicy, fried, or fermented foods.",
      "Drink refreshing herbal teas like peppermint, coriander seeds, or rose infusions."
    ];
    lifestyle = [
      "Massage the soles of your feet and scalp with organic coconut oil before bed.",
      "Practice sheetali (cooling breath) pranayama and light, non-competitive yoga.",
      "Avoid direct mid-day sun exposure and balance intense work cycles with leisure."
    ];
    timeline = "8 Weeks. Focus is on cooling metabolic fire, purifying the blood, and soothing skin/liver channels.";
  } else { // kapha
    diet = [
      "Warm, dry, light, and spicy foods (barley, quinoa, steamed vegetables).",
      "Favor spicy, bitter, and astringent tastes; restrict heavy dairy, sugars, and salt.",
      "Sip warm ginger-cinnamon tea throughout the day to boost sluggish metabolism."
    ];
    lifestyle = [
      "Perform dry skin brushing (Garshana) each morning to stimulate lymphatic circulation.",
      "Engage in 30-45 minutes of active, vigorous physical yoga or brisk walking.",
      "Avoid daytime sleeping, keep warm, and maintain a highly active daily routine."
    ];
    timeline = "12 Weeks. Focus is on reducing tissue congestion, eliminating excess phlegm/fat, and accelerating internal heat.";
  }

  const plan = {
    patientAge: age,
    healthGoal: goal,
    doshaType: dosha.charAt(0).toUpperCase() + dosha.slice(1),
    suggestedTherapy: `${trt.name} specialized protocol`,
    suggestedDiet: diet,
    suggestedLifestyle: lifestyle,
    expectedTimeline: timeline
  };

  res.json(plan);
});

app.get("/api/treatment-categories", (req, res) => {
  res.json(MOCK_TREATMENT_CATEGORIES);
});

app.get("/api/popular-treatments", (req, res) => {
  const popular = MOCK_TREATMENTS.filter(t => t.rating >= 4.9);
  res.json(popular);
});

app.get("/api/recommended-treatments", (req, res) => {
  // Return a slice of treatments as recommendations
  res.json(MOCK_TREATMENTS.slice(4, 9));
});

app.get("/api/doctors", (req, res) => {
  res.json(MOCK_DOCTORS);
});

app.get("/api/doctors/:id", (req, res) => {
  const doctor = MOCK_DOCTORS.find(d => d.id === req.params.id);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: "Doctor not found" });
  }
});

app.get("/api/specializations", (req, res) => {
  const specializations = Array.from(new Set(MOCK_DOCTORS.map(d => d.specialization)));
  res.json(specializations);
});

app.get("/api/featured-doctors", (req, res) => {
  const featured = MOCK_DOCTORS.slice(0, 6);
  res.json(featured);
});

app.get("/api/top-rated-doctors", (req, res) => {
  const topRated = [...MOCK_DOCTORS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  res.json(topRated);
});

app.get("/api/clinics", (req, res) => {
  const { name, city, service } = req.query;
  let results = [...MOCK_CLINICS];

  if (name) {
    results = results.filter(c => c.name.toLowerCase().includes(name.toString().toLowerCase()));
  }
  if (city) {
    results = results.filter(c => c.city.toLowerCase() === city.toString().toLowerCase());
  }
  if (service) {
    results = results.filter(c => c.services.some(s => s.toLowerCase() === service.toString().toLowerCase()));
  }

  res.json(results);
});

app.get("/api/panchakarma-centers", (req, res) => {
  const centers = MOCK_CLINICS.filter(c => c.type === "Panchakarma Center");
  res.json(centers);
});

app.get("/api/featured-clinics", (req, res) => {
  const featured = MOCK_CLINICS.filter(c => c.rating >= 4.8);
  res.json(featured);
});

app.get("/api/cities", (req, res) => {
  const cities = Array.from(new Set(MOCK_CLINICS.map(c => c.city)));
  res.json(cities);
});

app.get("/api/services", (req, res) => {
  const servicesSet = new Set();
  MOCK_CLINICS.forEach(c => c.services.forEach(s => servicesSet.add(s)));
  res.json(Array.from(servicesSet));
});

app.get("/api/clinics/:id", (req, res) => {
  const clinic = MOCK_CLINICS.find(c => c.id === req.params.id);
  if (clinic) {
    res.json(clinic);
  } else {
    res.status(404).json({ error: "Clinic not found" });
  }
});

app.get("/api/clinics/:id/doctors", (req, res) => {
  const clinic = MOCK_CLINICS.find(c => c.id === req.params.id);
  if (!clinic) {
    return res.status(404).json({ error: "Clinic not found" });
  }
  const doctors = MOCK_DOCTORS.filter(d => 
    d.clinicName.toLowerCase().includes(clinic.name.toLowerCase().split(' ')[0]) ||
    d.city.toLowerCase() === clinic.city.toLowerCase()
  );
  res.json(doctors.length > 0 ? doctors : MOCK_DOCTORS.slice(0, 3));
});

app.get("/api/clinics/:id/services", (req, res) => {
  const clinic = MOCK_CLINICS.find(c => c.id === req.params.id);
  if (!clinic) {
    return res.status(404).json({ error: "Clinic not found" });
  }
  const allServicesDetails = [
    { id: 's-panch', name: 'Panchakarma', description: 'Classical fivefold detoxification and rejuvenation therapies.', icon: 'Activity' },
    { id: 's-abhy', name: 'Abhyanga', description: 'Warm herbal oil body massage to soothe Vata and lubricate tissues.', icon: 'Sparkles' },
    { id: 's-shir', name: 'Shirodhara', description: 'Pouring warm medicated liquid on the forehead to calm nervous pathways.', icon: 'Compass' },
    { id: 's-nasya', name: 'Nasya', description: 'Nasal drops of herbal oils to clear sinuses and tension headaches.', icon: 'Wind' },
    { id: 's-vaman', name: 'Vamana', description: 'Therapeutic vomiting targeting aggravated Kapha lung congestion.', icon: 'ShieldAlert' },
    { id: 's-virec', name: 'Virechana', description: 'Medicated purgation flushing metabolic heat from liver and blood.', icon: 'Droplets' },
    { id: 's-basti', name: 'Basti', description: 'Medicated enema balancing Vata in joints, bones, and colon.', icon: 'Home' },
    { id: 's-weight', name: 'Weight Management', description: 'Powder massages and custom nutrition resetting fat metabolism.', icon: 'Scale' },
    { id: 's-pcos', name: 'PCOS Care', description: 'Hormonal and reproductive systems stabilization with organic herbs.', icon: 'Heart' },
    { id: 's-diab', name: 'Diabetes Care', description: 'Pancreatic support herbs and doshic diets managing blood sugar.', icon: 'Activity' },
    { id: 's-stress', name: 'Stress Management', description: 'Autonomic nervous resets combining massages and adaptogens.', icon: 'Brain' }
  ];
  const services = allServicesDetails.filter(s => 
    clinic.services.some(cs => cs.toLowerCase() === s.name.toLowerCase())
  );
  res.json(services);
});

app.get("/api/clinics/:id/reviews", (req, res) => {
  const clinic = MOCK_CLINICS.find(c => c.id === req.params.id);
  if (!clinic) {
    return res.status(404).json({ error: "Clinic not found" });
  }
  const reviews = [
    {
      id: `rev-${clinic.id}-1`,
      clinicId: clinic.id,
      patientName: "Amit Verma",
      rating: 5,
      comment: `Excellent experience! The therapists at ${clinic.name} are highly skilled. I underwent a Panchakarma cycle and feel entirely revitalized.`,
      date: "2026-06-01",
      recoveryResult: "Underwent 7-day Panchakarma; resolved chronic bloating and low back stiffness."
    },
    {
      id: `rev-${clinic.id}-2`,
      clinicId: clinic.id,
      patientName: "Sunita Deshmukh",
      rating: 4,
      comment: `Very clean and hygienic rooms. The doctor spent 30 minutes reading my pulse and analyzing my dosha. The custom oils are very therapeutic.`,
      date: "2026-05-24",
      recoveryResult: "Completed Shirodhara therapy; migraine frequency reduced from twice weekly to zero."
    }
  ];
  res.json(reviews);
});

app.get("/api/clinics/:id/gallery", (req, res) => {
  const clinic = MOCK_CLINICS.find(c => c.id === req.params.id);
  if (clinic) {
    res.json(clinic.gallery || []);
  } else {
    res.status(404).json({ error: "Clinic not found" });
  }
});

app.get("/api/clinics/:id/packages", (req, res) => {
  const clinic = MOCK_CLINICS.find(c => c.id === req.params.id);
  if (clinic) {
    res.json(clinic.packages || []);
  } else {
    res.status(404).json({ error: "Clinic not found" });
  }
});

app.get("/api/testimonials", (req, res) => {
  res.json(MOCK_TESTIMONIALS);
});

app.get("/api/doctors/:id/reviews", (req, res) => {
  const doctorId = req.params.id;
  const reviews = [
    {
      id: `rev-${doctorId}-1`,
      doctorId,
      patientName: "Sanjay Dixit",
      rating: 5,
      comment: "Excellent doctor! The Ayurvedic treatment plan was very detailed and holistic.",
      date: "2026-06-05"
    },
    {
      id: `rev-${doctorId}-2`,
      doctorId,
      patientName: "Meenakshi K.",
      rating: 4,
      comment: "Very patient listener. Explained the dosha imbalance perfectly.",
      date: "2026-06-02"
    }
  ];
  res.json(reviews);
});

app.get("/api/doctors/:id/availability", (req, res) => {
  const doctor = MOCK_DOCTORS.find(d => d.id === req.params.id);
  res.json({
    availability: doctor ? doctor.availability : "Mon-Sat, 9AM - 5PM",
    slots: [
      "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ]
  });
});

app.get("/api/appointment-slots", (req, res) => {
  res.json([
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]);
});

app.post("/api/appointments", (req, res) => {
  const { doctorId, patientName, email, phone, appointmentDate, appointmentTime, consultationType, notes } = req.body;
  if (!patientName || !email || !phone || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ error: "Required fields are missing." });
  }
  const newAppointment = {
    id: `APT-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
    doctorId,
    patientName,
    email,
    phone,
    appointmentDate,
    appointmentTime,
    consultationType,
    notes,
    status: 'Confirmed'
  };
  res.status(201).json({ success: true, data: newAppointment });
});

// Patient Portal Mock Data
const MOCK_PATIENT_PROFILE = {
  id: "pat-123",
  name: "Priyanshi Sharma",
  email: "priyanshi@ayurvedaconnect.com",
  phone: "+91 98765 43210",
  age: 28,
  gender: "Female",
  profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  city: "New Delhi",
  doshaType: "Pitta-Kapha",
  healthGoals: ["PCOS Management", "Stress Reduction", "Improved Digestion"],
  joinedDate: "2026-01-15"
};

const MOCK_PATIENT_APPOINTMENTS = [
  {
    id: "APT-78901",
    doctorName: "Dr. Vikram Chauhan",
    specialization: "Kayachikitsa (Internal Medicine)",
    clinic: "AyuCare SuperSpecialty Clinic, New Delhi",
    date: "2026-06-15",
    time: "10:30 AM",
    status: "Confirmed"
  },
  {
    id: "APT-45612",
    doctorName: "Dr. Smita Naram",
    specialization: "Panchakarma Specialist",
    clinic: "Ayushya Ayurvedic Wellness Center, Mumbai",
    date: "2026-07-02",
    time: "02:00 PM",
    status: "Pending"
  },
  {
    id: "APT-11223",
    doctorName: "Dr. Vikram Chauhan",
    specialization: "Kayachikitsa (Internal Medicine)",
    clinic: "AyuCare SuperSpecialty Clinic, New Delhi",
    date: "2026-05-15",
    time: "11:00 AM",
    status: "Completed"
  }
];

const MOCK_PATIENT_RECOVERY = {
  id: "rec-1",
  condition: "PCOS & Metabolic Imbalance",
  progress: 72,
  startDate: "2026-04-10",
  expectedCompletion: "2026-08-10",
  weeklyMetrics: [
    { name: "Wk 1", progress: 10, target: 15 },
    { name: "Wk 2", progress: 25, target: 30 },
    { name: "Wk 3", progress: 42, target: 45 },
    { name: "Wk 4", progress: 55, target: 60 },
    { name: "Wk 5", progress: 62, target: 70 },
    { name: "Wk 6", progress: 72, target: 80 }
  ],
  monthlyMetrics: [
    { name: "Apr", progress: 30, target: 40 },
    { name: "May", progress: 60, target: 70 },
    { name: "Jun", progress: 72, target: 80 }
  ]
};

const MOCK_PATIENT_RECORDS = [
  {
    id: "rec-doc-1",
    title: "Thyroid & Doshic Profile Blood Test",
    type: "Report",
    date: "2026-05-18",
    doctorName: "Dr. Vikram Chauhan",
    fileSize: "2.4 MB",
    fileUrl: "#"
  },
  {
    id: "rec-doc-2",
    title: "PCOS Hormone Analysis Summary",
    type: "Report",
    date: "2026-04-12",
    doctorName: "Dr. Smita Naram",
    fileSize: "1.8 MB",
    fileUrl: "#"
  },
  {
    id: "rec-doc-3",
    title: "Vata-Reducing Herbal Decoction Guide",
    type: "Prescription",
    date: "2026-05-15",
    doctorName: "Dr. Vikram Chauhan",
    fileSize: "840 KB",
    fileUrl: "#"
  }
];

const MOCK_PATIENT_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Upcoming Consultation Alert",
    message: "Your appointment with Dr. Vikram Chauhan is in 3 days. Prepare your updated diet logs.",
    date: "2026-06-12",
    type: "Appointment"
  },
  {
    id: "notif-2",
    title: "Morning Kashayam Reminder",
    message: "Time to consume your Dashamula decoction (empty stomach) for optimal metabolic fire.",
    date: "2026-06-12",
    type: "Reminder"
  },
  {
    id: "notif-3",
    title: "Daily Health Tip",
    message: "Avoid drinking ice-cold water during or immediately after meals as it dampens Agni (digestive fire).",
    date: "2026-06-11",
    type: "Tip"
  }
];

const MOCK_PATIENT_WELLNESS = {
  dietAdherence: 85,
  exerciseProgress: 90,
  sleepQuality: 80,
  waterIntake: 75
};

const MOCK_AI_RECOMMENDATIONS = {
  suggestedDiet: [
    "Warm cooked grains (Quinoa, Barley, Brown Rice).",
    "Favor bitter, pungent, and astringent tastes to pacify Kapha.",
    "Avoid raw salads and heavy cold dairy after sunset."
  ],
  recommendedTreatment: "Shirodhara (3 sessions) for stress reduction and hormonal alignment.",
  lifestyleTips: [
    "Practice cooling breath Sheetali pranayama for 10 minutes daily.",
    "Retire to bed by 10:30 PM to optimize Pitta liver detox cycles.",
    "Daily gentle self-Abhyanga foot massage with organic coconut oil."
  ],
  doctorFollowUpReminder: "Schedule standard diagnostic checkup with Dr. Vikram Chauhan in 3 weeks."
};

const MOCK_HEALTH_GOALS = [
  { id: "goal-1", title: "Weight Management", progress: 68, target: "Reduce Kapha weight by 5kg" },
  { id: "goal-2", title: "PCOS Management", progress: 75, target: "Cycle regularity & hormonal balance" },
  { id: "goal-3", title: "Stress Reduction", progress: 80, target: "Increase mindfulness and sleep hours" }
];

// Patient Portal Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/patient/profile", (req, res) => {
  res.json(MOCK_PATIENT_PROFILE);
});

app.get("/api/patient/dashboard", (req, res) => {
  res.json({
    profile: MOCK_PATIENT_PROFILE,
    appointments: MOCK_PATIENT_APPOINTMENTS,
    recovery: MOCK_PATIENT_RECOVERY,
    records: MOCK_PATIENT_RECORDS,
    notifications: MOCK_PATIENT_NOTIFICATIONS,
    wellness: MOCK_PATIENT_WELLNESS,
    aiRecommendations: MOCK_AI_RECOMMENDATIONS,
    healthGoals: MOCK_HEALTH_GOALS
  });
});

app.get("/api/patient/appointments", (req, res) => {
  res.json(MOCK_PATIENT_APPOINTMENTS);
});

app.get("/api/patient/recovery", (req, res) => {
  res.json(MOCK_PATIENT_RECOVERY);
});

app.get("/api/patient/records", (req, res) => {
  res.json(MOCK_PATIENT_RECORDS);
});

app.get("/api/patient/notifications", (req, res) => {
  res.json(MOCK_PATIENT_NOTIFICATIONS);
});

app.get("/api/patient/wellness", (req, res) => {
  res.json(MOCK_PATIENT_WELLNESS);
});

app.post("/api/patient/appointments/:id/cancel", (req, res) => {
  const { id } = req.params;
  const apt = MOCK_PATIENT_APPOINTMENTS.find(a => a.id === id);
  if (apt) {
    apt.status = "Cancelled";
    res.json({ success: true, data: apt });
  } else {
    res.status(404).json({ error: "Appointment not found" });
  }
});

app.post("/api/patient/appointments/:id/reschedule", (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  const apt = MOCK_PATIENT_APPOINTMENTS.find(a => a.id === id);
  if (apt) {
    apt.date = date;
    apt.time = time;
    apt.status = "Confirmed";
    res.json({ success: true, data: apt });
  } else {
    res.status(404).json({ error: "Appointment not found" });
  }
});

app.post("/api/patient/records/upload", (req, res) => {
  const { title, type, doctorName } = req.body;
  const newRecord = {
    id: `rec-doc-${Date.now()}`,
    title: title || "Uploaded Medical File",
    type: type || "Document",
    date: new Date().toISOString().split('T')[0],
    doctorName: doctorName || "Self Uploaded",
    fileSize: "1.2 MB",
    fileUrl: "#"
  };
  MOCK_PATIENT_RECORDS.unshift(newRecord);
  res.status(201).json({ success: true, data: newRecord });
});

// Advanced Recovery Tracker Mock Data
const MOCK_RECOVERY_PROFILE = {
  id: "rec-101",
  patientName: "Priyanshi Sharma",
  condition: "Chronic Joint Inflammation (Sandhivata)",
  doctorName: "Dr. Vikram Chauhan",
  treatmentPlan: "30-Day Janu Basti & Vata Pacifying Regimen",
  startDate: "2026-05-15",
  expectedRecoveryDate: "2026-06-15",
  currentStage: "Active Detoxification",
  completionPercentage: 75
};

const MOCK_RECOVERY_PROGRESS_POINTS = [
  { id: "1", week: "Wk 1", progressPercentage: 20, healthScore: 55, energyLevel: 40, sleepQuality: 50, stressLevel: 80 },
  { id: "2", week: "Wk 2", progressPercentage: 45, healthScore: 68, energyLevel: 60, sleepQuality: 65, stressLevel: 60 },
  { id: "3", week: "Wk 3", progressPercentage: 62, healthScore: 75, energyLevel: 75, sleepQuality: 75, stressLevel: 45 },
  { id: "4", week: "Wk 4", progressPercentage: 75, healthScore: 84, energyLevel: 85, sleepQuality: 80, stressLevel: 30 }
];

const MOCK_RECOVERY_SYMPTOMS = [
  { id: "sym-1", symptom: "Knee Joint Stiffness", severity: "Moderate", status: "Improving", recordedDate: "2026-05-15", improvementPercentage: 65 },
  { id: "sym-2", symptom: "Localized Swelling", severity: "Mild", status: "Improving", recordedDate: "2026-05-18", improvementPercentage: 80 },
  { id: "sym-3", symptom: "Radiating Muscle Ache", severity: "Mild", status: "Stable", recordedDate: "2026-05-20", improvementPercentage: 40 }
];

const MOCK_RECOVERY_MILESTONES = [
  { id: "ms-1", title: "Initial Diagnosis", description: "Pulse-diagnosis read as Vata accumulation in joint junctions.", date: "2026-05-15", status: "Completed" },
  { id: "ms-2", title: "Janu Basti Initiation", description: "Starting localized warm oil retaining therapy on knee joints.", date: "2026-05-20", status: "Completed" },
  { id: "ms-3", title: "Agni (Digestive Fire) Rebalance", description: "Achieved stable morning appetite and zero toxin buildup.", date: "2026-06-01", status: "Completed" },
  { id: "ms-4", title: "Mobility Evaluation Check", description: "Re-evaluating knee flexion degrees and pain indices.", date: "2026-06-12", status: "Pending" },
  { id: "ms-5", title: "Rejuvenation (Rasayana) Stage", description: "Starting post-detox cellular nourishing tonics.", date: "2026-06-15", status: "Upcoming" }
];

const MOCK_RECOVERY_MEDICATIONS = [
  { id: "med-1", name: "Rasnasaptak Kwath (Decoction)", dosage: "30 ml", frequency: "Twice daily (before meals)", completed: true, reminderActive: true },
  { id: "med-2", name: "Yogaraj Guggulu tablets", dosage: "2 tablets", frequency: "Twice daily (after meals)", completed: false, reminderActive: true },
  { id: "med-3", name: "Ksheerabala Taila drops", dosage: "2 drops", frequency: "Each nostril (Pratimarsha Nasya)", completed: true, reminderActive: false }
];

const MOCK_RECOVERY_LIFESTYLE = [
  { id: "l-1", name: "Diet Compliance", target: 100, current: 85, unit: "%", compliancePercentage: 85 },
  { id: "l-2", name: "Yoga (Gentle Stretches)", target: 30, current: 25, unit: "mins", compliancePercentage: 83 },
  { id: "l-3", name: "Meditation Session", target: 20, current: 20, unit: "mins", compliancePercentage: 100 },
  { id: "l-4", name: "Water Hydration", target: 2.5, current: 2.0, unit: "L", compliancePercentage: 80 },
  { id: "l-5", name: "Sleep Hours", target: 8, current: 7.5, unit: "hrs", compliancePercentage: 93 }
];

const MOCK_RECOVERY_WELLNESS_SCORE = {
  overall: 78,
  physical: 74,
  mental: 82,
  lifestyle: 80
};

const MOCK_RECOVERY_ACHIEVEMENTS = [
  { id: "ach-1", title: "7 Days Consistency", description: "Completed all organic herb schedules for 7 consecutive days.", icon: "Flame", unlockedDate: "2026-05-22" },
  { id: "ach-2", title: "Treatment Milestone", description: "Completed the active Janu Basti oil retaining phase.", icon: "Shield", unlockedDate: "2026-05-30" },
  { id: "ach-3", title: "30 Days Healing Journey", description: "Completed a full month of conscious dosha balancing.", icon: "Award" },
  { id: "ach-4", title: "Agni Purified", description: "Achieved optimal digestive fire consistency index.", icon: "Sparkles" }
];

const MOCK_RECOVERY_JOURNAL = [
  { id: "j-1", date: "2026-06-11", notes: "Knee stiffness was barely noticeable this morning. Appetite is strong. Felt calm after evening pranayama.", mood: "Great", healthFeedback: "Significant ease in joint mobility" },
  { id: "j-2", date: "2026-06-10", notes: "Slight gas after dinner, but sleep was deep and undisturbed. Did gentle joint rotations.", mood: "Good", healthFeedback: "Stable progression" }
];

// Advanced Recovery Routes
app.get("/api/recovery/profile", (req, res) => {
  res.json(MOCK_RECOVERY_PROFILE);
});

app.get("/api/recovery/progress", (req, res) => {
  res.json({
    profile: MOCK_RECOVERY_PROFILE,
    progressPoints: MOCK_RECOVERY_PROGRESS_POINTS,
    symptoms: MOCK_RECOVERY_SYMPTOMS,
    milestones: MOCK_RECOVERY_MILESTONES,
    medications: MOCK_RECOVERY_MEDICATIONS,
    lifestyle: MOCK_RECOVERY_LIFESTYLE,
    wellnessScore: MOCK_RECOVERY_WELLNESS_SCORE,
    achievements: MOCK_RECOVERY_ACHIEVEMENTS,
    journal: MOCK_RECOVERY_JOURNAL
  });
});

app.get("/api/recovery/symptoms", (req, res) => {
  res.json(MOCK_RECOVERY_SYMPTOMS);
});

app.get("/api/recovery/milestones", (req, res) => {
  res.json(MOCK_RECOVERY_MILESTONES);
});

app.get("/api/recovery/medications", (req, res) => {
  res.json(MOCK_RECOVERY_MEDICATIONS);
});

app.get("/api/recovery/lifestyle", (req, res) => {
  res.json(MOCK_RECOVERY_LIFESTYLE);
});

app.get("/api/recovery/charts", (req, res) => {
  res.json(MOCK_RECOVERY_PROGRESS_POINTS);
});

app.get("/api/recovery/history", (req, res) => {
  res.json(MOCK_RECOVERY_JOURNAL);
});

app.post("/api/recovery/medications/:id/toggle", (req, res) => {
  const { id } = req.params;
  const med = MOCK_RECOVERY_MEDICATIONS.find(m => m.id === id);
  if (med) {
    med.completed = !med.completed;
    res.json({ success: true, data: med });
  } else {
    res.status(404).json({ error: "Medication not found" });
  }
});

app.post("/api/recovery/journal/add", (req, res) => {
  const { notes, mood, healthFeedback } = req.body;
  const newEntry = {
    id: `j-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    notes: notes || "",
    mood: mood || "Good",
    healthFeedback: healthFeedback || "Self-logged feedback"
  };
  MOCK_RECOVERY_JOURNAL.unshift(newEntry);
  res.status(201).json({ success: true, data: newEntry });
});

// =========================================================================
// PAGE 11: MEDICAL RECORDS & HEALTH DOCUMENT MANAGEMENT SYSTEM MOCK SERVICES
// =========================================================================

const MOCK_DOCUMENTS = [
  {
    id: "rec-1",
    title: "Thyroid Profile Blood Test",
    category: "Lab Test",
    type: "Report",
    date: "2026-05-18",
    doctorName: "Dr. Vikram Chauhan",
    clinicName: "AyuCare Clinic, New Delhi",
    fileType: "PDF",
    fileSize: "2.4 MB",
    description: "T3, T4, and TSH levels measured to evaluate thyroid metabolic balance.",
    status: "Completed",
    fileUrl: "#"
  },
  {
    id: "rec-2",
    title: "Vata-Reducing Herbal Decoction Guide",
    category: "Prescription",
    type: "Prescription",
    date: "2026-05-15",
    doctorName: "Dr. Vikram Chauhan",
    clinicName: "AyuCare Clinic, New Delhi",
    fileType: "PDF",
    fileSize: "840 KB",
    description: "Complete prescription sheet mapping Rasnasaptak Kwath and Yogaraj Guggulu dosage timings.",
    status: "Completed",
    fileUrl: "#"
  },
  {
    id: "rec-3",
    title: "PCOS Hormone Analysis Summary",
    category: "Report",
    type: "Report",
    date: "2026-04-12",
    doctorName: "Dr. Smita Naram",
    clinicName: "Ayushya Panchakarma Center",
    fileType: "PDF",
    fileSize: "1.8 MB",
    description: "Detailed estrogen, progesterone, and LH/FSH ratios analysis.",
    status: "Completed",
    fileUrl: "#"
  },
  {
    id: "rec-4",
    title: "Knee Joint Flexion X-Ray",
    category: "Report",
    type: "Document",
    date: "2026-05-10",
    doctorName: "Dr. Anjali Mehta",
    clinicName: "Vedic Ortho Wellness",
    fileType: "Image",
    fileSize: "4.2 MB",
    description: "Radiograph of bilateral knee joint gaps to measure cartilage erosion.",
    status: "Completed",
    fileUrl: "#"
  },
  {
    id: "rec-5",
    title: "Panchakarma Treatment Invoice",
    category: "Invoice",
    type: "Document",
    date: "2026-05-30",
    doctorName: "Dr. Smita Naram",
    clinicName: "Ayushya Panchakarma Center",
    fileType: "PDF",
    fileSize: "512 KB",
    description: "Bill invoice for 7-day Abhyanga and Virechana treatment packages.",
    status: "Completed",
    fileUrl: "#"
  }
];

const MOCK_PRESCRIPTIONS = [
  {
    id: "pr-1",
    doctorName: "Dr. Vikram Chauhan",
    date: "2026-05-15",
    medicines: [
      { name: "Rasnasaptak Kwath (Decoction)", dosage: "30 ml", frequency: "Twice daily (before meals)" },
      { name: "Yogaraj Guggulu tablets", dosage: "2 tablets", frequency: "Twice daily (after meals)" },
      { name: "Ksheerabala Taila drops", dosage: "2 drops", frequency: "Each nostril (Pratimarsha Nasya)" }
    ],
    duration: "30 Days",
    notes: "Consume herbs with warm water only. Avoid wheat, refined sugar, and cold items."
  },
  {
    id: "pr-2",
    doctorName: "Dr. Smita Naram",
    date: "2026-04-12",
    medicines: [
      { name: "Kanchnar Guggulu tablets", dosage: "2 tablets", frequency: "Twice daily (after meals)" },
      { name: "Shatavari Powder", dosage: "3g", frequency: "Once daily (at bedtime with warm milk)" }
    ],
    duration: "60 Days",
    notes: "Focus on cooling pranayama and maintain early sleep schedules (before 10:30 PM)."
  }
];

const MOCK_LAB_REPORTS = [
  {
    id: "lr-1",
    testName: "Thyroid Profile Blood Test",
    date: "2026-05-18",
    result: "TSH: 2.8 uIU/mL (Normal), T3: 1.2 ng/mL, T4: 8.5 ug/dL",
    status: "Normal",
    doctorName: "Dr. Vikram Chauhan"
  },
  {
    id: "lr-2",
    testName: "Hormone Level LHS/FSH Ratio",
    date: "2026-04-12",
    result: "LH: 12.4 mIU/mL, FSH: 4.8 mIU/mL (Ratio 2.6:1 - Elevated)",
    status: "Abnormal",
    doctorName: "Dr. Smita Naram"
  },
  {
    id: "lr-3",
    testName: "Serum Uric Acid levels",
    date: "2026-05-14",
    result: "Uric Acid: 8.2 mg/dL (High)",
    status: "Critical",
    doctorName: "Dr. Anjali Mehta"
  }
];

const MOCK_TREATMENT_HISTORY = [
  {
    id: "th-1",
    treatmentName: "Janu Basti (Knee Oil Therapy)",
    doctorName: "Dr. Vikram Chauhan",
    clinicName: "AyuCare Clinic, New Delhi",
    startDate: "2026-05-20",
    endDate: "2026-05-27",
    status: "Completed"
  },
  {
    id: "th-2",
    treatmentName: "Virechana (Therapeutic Purgation)",
    doctorName: "Dr. Smita Naram",
    clinicName: "Ayushya Panchakarma Center",
    startDate: "2026-04-15",
    endDate: "2026-04-20",
    status: "Completed"
  },
  {
    id: "th-3",
    treatmentName: "Pratimarsha Nasya (Nasal Therapy)",
    doctorName: "Dr. Vikram Chauhan",
    clinicName: "AyuCare Clinic, New Delhi",
    startDate: "2026-05-15",
    endDate: "2026-06-15",
    status: "Ongoing"
  }
];

const MOCK_ACTIVITIES = [
  { id: "act-1", title: "Document Uploaded", type: "Upload", timestamp: "Today, 10:30 AM", details: "Uploaded Thyroid Profile Blood Test PDF." },
  { id: "act-2", title: "Prescription Downloaded", type: "Download", timestamp: "Yesterday, 04:15 PM", details: "Downloaded Vata-Reducing Herbal Decoction Guide." },
  { id: "act-3", title: "Clinic Consultation Visit", type: "Visit", timestamp: "2026-05-20", details: "Consultation with Dr. Vikram Chauhan for Knee pain evaluation." },
  { id: "act-4", title: "Lab Report Added", type: "New Report", timestamp: "2026-05-18", details: "New Thyroid profile laboratory values synced." }
];

const MOCK_INSIGHTS = [
  { id: "in-1", title: "Joint Mobility Progress", description: "Joint range has increased from 90° to 135° after completing Janu Basti series.", category: "Progress" },
  { id: "in-2", title: "Hormonal Balance Trend", description: "LH/FSH ratio is stabilizing towards a 1.5:1 ratio post Virechana.", category: "Trend" },
  { id: "in-3", title: "Vaidya Diet Recommendation", description: "Strictly avoid yogurt, sour buttermilk, and overnight-soaked legumes.", category: "Recommendation" },
  { id: "in-4", title: "Follow-up Suggestion", description: "Schedule a pulse-diagnostic review with Dr. Vikram Chauhan around June 15.", category: "Suggestion" }
];

// Routes for Page 11
app.get("/api/records", (req, res) => {
  res.json(MOCK_DOCUMENTS);
});

app.get("/api/records/:id", (req, res) => {
  const doc = MOCK_DOCUMENTS.find(d => d.id === req.params.id);
  if (doc) {
    res.json(doc);
  } else {
    res.status(404).json({ error: "Record not found" });
  }
});

app.get("/api/prescriptions", (req, res) => {
  res.json(MOCK_PRESCRIPTIONS);
});

app.get("/api/reports", (req, res) => {
  res.json(MOCK_LAB_REPORTS);
});

app.get("/api/lab-tests", (req, res) => {
  res.json(MOCK_LAB_REPORTS);
});

app.get("/api/treatment-history", (req, res) => {
  res.json(MOCK_TREATMENT_HISTORY);
});

app.get("/api/activities", (req, res) => {
  res.json(MOCK_ACTIVITIES);
});

app.get("/api/insights", (req, res) => {
  res.json(MOCK_INSIGHTS);
});

app.post("/api/records/upload", (req, res) => {
  const { title, category, doctorName, clinicName, date, description, fileType, fileSize } = req.body;
  const newRecord = {
    id: `rec-${Date.now()}`,
    title: title || "New Ayurvedic Document",
    category: category || "Report",
    type: category === "Prescription" ? "Prescription" : category === "Report" ? "Report" : "Document",
    date: date || new Date().toISOString().split('T')[0],
    doctorName: doctorName || "Consulting Vaidya",
    clinicName: clinicName || "AyurVeda Clinic Center",
    fileType: fileType || "PDF",
    fileSize: fileSize || "1.5 MB",
    description: description || "No description provided.",
    status: "Completed",
    fileUrl: "#"
  };
  MOCK_DOCUMENTS.unshift(newRecord);
  
  // Log activity
  const newActivity = {
    id: `act-${Date.now()}`,
    title: "Document Uploaded",
    type: "Upload",
    timestamp: "Just Now",
    details: `Uploaded ${newRecord.title} (${newRecord.fileType}).`
  };
  MOCK_ACTIVITIES.unshift(newActivity);

  res.status(201).json({ success: true, data: newRecord });
});

app.delete("/api/records/:id", (req, res) => {
  const { id } = req.params;
  const idx = MOCK_DOCUMENTS.findIndex(d => d.id === id);
  if (idx !== -1) {
    const deleted = MOCK_DOCUMENTS.splice(idx, 1)[0];
    
    // Log activity
    const newActivity = {
      id: `act-${Date.now()}`,
      title: "Document Deleted",
      type: "Download",
      timestamp: "Just Now",
      details: `Deleted document: ${deleted.title}.`
    };
    MOCK_ACTIVITIES.unshift(newActivity);

    res.json({ success: true, data: deleted });
  } else {
    res.status(404).json({ error: "Record not found" });
  }
});

// =========================================================================
// PAGE 12: AI DOSHA ANALYSIS & BODY ASSESSMENT MOCK SERVICES
// =========================================================================

const MOCK_DOSHA_QUESTIONS = [
  {
    id: "q-1",
    question: "How would you describe your physical body frame?",
    category: "Body Structure",
    options: [
      "Thin, lean, bony, or slightly asymmetrical",
      "Medium, athletic, well-proportioned, moderate build",
      "Broad, large-framed, heavy, or sturdy build"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-2",
    question: "What is your tendency regarding body weight?",
    category: "Physical Traits",
    options: [
      "Difficulty gaining weight; thin or underweight",
      "Gain or lose weight easily; athletic weight maintenance",
      "Gain weight easily; difficulty losing weight; stout"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-3",
    question: "What are the characteristics of your skin?",
    category: "Physical Traits",
    options: [
      "Dry, rough, cool, thin, prone to cracking or coldness",
      "Warm, reddish, soft, sensitive, prone to acne or freckles",
      "Thick, smooth, cool, soft, oily, pale, or radiant"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-4",
    question: "How would you describe your hair texture and quality?",
    category: "Physical Traits",
    options: [
      "Dry, thin, curly, frizzy, brittle, or dark",
      "Fine, soft, warm, straight, reddish/blonde, early greying",
      "Thick, oily, strong, wavy, dense, dark, or lustrous"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-5",
    question: "How is your digestion and metabolic fire (Agni)?",
    category: "Digestion",
    options: [
      "Irregular, unpredictable, prone to gas, bloating, or constipation",
      "Strong, fast, intense, prone to acidity, heartburn, or loose stools",
      "Slow, sluggish, heavy, digest food slowly but steady"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-6",
    question: "What is your typical appetite pattern?",
    category: "Eating Habits",
    options: [
      "Variable, inconsistent; sometimes hungry, sometimes not",
      "Sharp, intense; cannot skip meals without feeling irritable",
      "Moderate, steady; can easily skip meals or fast"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-7",
    question: "How are your typical bowel movements?",
    category: "Digestion",
    options: [
      "Dry, hard, difficult, or irregular; prone to constipation",
      "Frequent, soft, loose, or warm; multiple times daily",
      "Heavy, thick, slow, regular, and well-formed"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-8",
    question: "What is the nature of your sleep?",
    category: "Sleep",
    options: [
      "Light, easily disturbed, light sleeper; prone to waking up",
      "Moderate, sound; wake up warm; moderate duration (6-7 hrs)",
      "Deep, heavy, long sleeper; difficult to wake up (8+ hrs)"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-9",
    question: "How many hours of sleep do you prefer/need?",
    category: "Sleep",
    options: [
      "Variable, 5-6 hours is often enough, but leaves me tired",
      "Consistent 7-8 hours; feel refreshed and sharp",
      "Prefer 8-10 hours; feel sluggish if sleeping less"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-10",
    question: "How would you describe your speed of speech?",
    category: "Lifestyle",
    options: [
      "Fast, talkative, quick, sometimes skipping words or ideas",
      "Sharp, concise, logical, argumentative, or persuasive",
      "Slow, measured, calm, sweet, or soft-spoken"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-11",
    question: "What is your general walking and activity pace?",
    category: "Lifestyle",
    options: [
      "Fast, hurried, variable, restless walker",
      "Purposeful, medium, determined, active walker",
      "Slow, steady, relaxed, graceful, or unhurried walker"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-12",
    question: "How does your memory and learning process work?",
    category: "Emotions",
    options: [
      "Learn quickly, but forget quickly; short-term focus",
      "Learn moderately, remember clearly; long-term focus",
      "Learn slowly, but never forget; deep retention"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-13",
    question: "What is your typical mood stability pattern?",
    category: "Emotions",
    options: [
      "Unpredictable, highly variable, quick mood shifts",
      "Intense, focused, competitive, easily irritated",
      "Stable, patient, calm, forgiving, slow to anger"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-14",
    question: "How do you respond under high stress?",
    category: "Stress Response",
    options: [
      "Anxious, fearful, worried, restless, or nervous",
      "Angry, irritable, impatient, competitive, or critical",
      "Calm, withdrawn, defensive, stubborn, or quiet"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-15",
    question: "How consistent are your physical energy levels?",
    category: "Energy Levels",
    options: [
      "Variable, quick bursts followed by exhaustion; low stamina",
      "Moderate, steady, competitive stamina; heat exhaustion",
      "High, consistent, robust stamina; slow to start"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-16",
    question: "Which weather climate do you dislike the most?",
    category: "Weather Preference",
    options: [
      "Cold, dry, windy, or autumn climates",
      "Hot, humid, sunny, or summer climates",
      "Cold, damp, rainy, or early spring climates"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-17",
    question: "What are your perspiration patterns?",
    category: "Physical Traits",
    options: [
      "Scant, dry, rarely sweat, little or no odor",
      "Profuse, hot, sweat easily, strong or sour odor",
      "Moderate, steady, sweat slowly, sweet or mild odor"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-18",
    question: "What characteristics define your eyes?",
    category: "Physical Traits",
    options: [
      "Small, dry, blinking, thin eyelashes, active gaze",
      "Medium, sharp, reddish, warm gaze, sensitive to light",
      "Large, wide, thick eyelashes, calm, sweet, or sleepy gaze"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-19",
    question: "What is the typical theme/nature of your dreams?",
    category: "Sleep",
    options: [
      "Active, running, flying, falling, anxious, or fearful",
      "Intense, colorful, fighting, planning, competitive, or fiery",
      "Pleasant, slow, romantic, swimming, water, or cloud-like"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-20",
    question: "If you feel your wrist pulse, how does it feel?",
    category: "Physical Traits",
    options: [
      "Thin, fast, slithering like a snake (Vata pulse)",
      "Moderate, bounding, jumping like a frog (Pitta pulse)",
      "Broad, slow, gliding like a swan (Kapha pulse)"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-21",
    question: "How do you typically execute your tasks?",
    category: "Lifestyle",
    options: [
      "Start quickly, change plans often, leave tasks unfinished",
      "Plan meticulously, work intensely, finish tasks perfectly",
      "Start slowly, work steadily, finish tasks consistently"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-22",
    question: "What are your money spending habits?",
    category: "Lifestyle",
    options: [
      "Spend impulsively, buy variable things; low savings",
      "Spend planned, buy luxury or quality things; moderate savings",
      "Accumulate money, save easily, dislike spending; high savings"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-23",
    question: "How does your tongue look in the morning?",
    category: "Physical Traits",
    options: [
      "Dry, thin, cracked, slight thin greyish coating",
      "Red, warm, sensitive, thin yellow-red coating",
      "Moist, thick, pale, thick white coating (Ama)"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-24",
    question: "What drives your physical activity choices?",
    category: "Energy Levels",
    options: [
      "Restless energy; like walking, dancing, moving; quickly tired",
      "Goal-oriented; like active sports, gym, running; competitive",
      "Dislike excessive movement; prefer walking, resting, or nesting"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  },
  {
    id: "q-25",
    question: "What usually triggers emotional reactions?",
    category: "Emotions",
    options: [
      "Uncertainty, surprise, change of plans (worries/anxiety)",
      "Incompetence, delay, heat, criticism (anger/irritation)",
      "Lack of respect, too much movement (sluggishness/possessive)"
    ],
    scoreMapping: [{ vata: 2, pitta: 0, kapha: 0 }, { vata: 0, pitta: 2, kapha: 0 }, { vata: 0, pitta: 0, kapha: 2 }]
  }
];

let MOCK_DOSHA_RESULTS = [
  {
    id: "res-1",
    patientName: "Priyanshi Sharma",
    assessmentDate: "2026-04-10",
    vataPercentage: 25,
    pittaPercentage: 55,
    kaphaPercentage: 20,
    dominantDosha: "Pitta",
    secondaryDosha: "Vata"
  },
  {
    id: "res-2",
    patientName: "Priyanshi Sharma",
    assessmentDate: "2026-06-12",
    vataPercentage: 35,
    pittaPercentage: 45,
    kaphaPercentage: 20,
    dominantDosha: "Pitta-Vata",
    secondaryDosha: "Kapha"
  }
];

const MOCK_DOSHA_RECOMMENDATIONS = {
  "Vata": {
    diet: [
      "Favor warm, moist, heavy, cooked foods with healthy oils/ghee.",
      "Incorporate sweet, sour, and salty tastes.",
      "Avoid raw, cold, dry, light, and bitter/astringent foods."
    ],
    eat: ["Cooked oats/rice", "Sweet sweet potatoes", "Ghee & organic oils", "Ripe avocados", "Almonds"],
    avoid: ["Raw salads", "Dry crackers", "Cold drinks", "Cabbage/broccoli", "Ice cream"],
    lifestyle: [
      "Maintain regular sleeping, eating, and waking cycles.",
      "Keep body warm and protected from dry, windy weather.",
      "Engage in self-massage (Abhyanga) using warm sesame oil daily."
    ],
    yoga: ["Gentle slow Hatha", "Warrior pose (Virabhadrasana)", "Tree pose (Vrksasana)", "Child's pose (Balasana)"],
    meditation: ["Grounding breath awareness", "Deep body-scan yoga nidra"],
    sleep: ["Sleep before 10:00 PM; aim for 8 hours of warm, uninterrupted rest."],
    wakeUp: "06:00 AM", morningMeal: "08:00 AM", midday: "12:30 PM", eveningMeal: "06:30 PM", sleepTime: "10:00 PM",
    therapies: ["Abhyanga (Warm oil body massage)", "Shirodhara (Warm forehead oil drip)", "Basti (Enema therapy)"],
    panchakarma: ["Snehan (Oleation)", "Svedana (Sweating)"],
    herbalSupport: ["Ashwagandha", "Shatavari", "Dashamula", "Ginger"],
    imbalances: ["Anxiety, insomnia, joint pain, dry skin, gas, and digestive irregularities."],
    preventive: ["Regular warm routines, oiled skin brushing, and avoiding dry raw eating."]
  },
  "Pitta": {
    diet: [
      "Favor cooling, sweet, bitter, and astringent foods.",
      "Incorporate coconut oil, ghee, sweet melons, and leafy green vegetables.",
      "Avoid spicy, sour, salty, hot, and fried foods."
    ],
    eat: ["Sweet apples/pears", "Leafy green greens", "Coconut water", "Basmati rice", "Melons"],
    avoid: ["Chili peppers", "Sour tomatoes", "Yogurt/buttermilk", "Garlic/onions", "Vinegar"],
    lifestyle: [
      "Avoid excessive solar exposure or hot environments.",
      "Keep a moderate, non-competitive activity pace.",
      "Practice compassion, patience, and cool water swimming."
    ],
    yoga: ["Cooling restorative yoga", "Moon salutations (Chandra Namaskar)", "Bridge pose", "Fish pose"],
    meditation: ["Loving-kindness (Metta) meditation", "Cooling Sheetali pranayama"],
    sleep: ["Retire to bed by 10:30 PM to optimize Pitta liver detox cycles; 7-8 hours."],
    wakeUp: "05:30 AM", morningMeal: "07:30 AM", midday: "12:00 PM", eveningMeal: "07:00 PM", sleepTime: "10:30 PM",
    therapies: ["Takradhara (Cooling buttermilk drip)", "Abhyanga with Coconut oil", "Shitala Udvartana"],
    panchakarma: ["Virechana (Therapeutic purgation)", "Raktamokshana (Bloodletting)"],
    herbalSupport: ["Amalaki (Amla)", "Brahmi", "Guduchi", "Shatavari"],
    imbalances: ["Acid reflux, skin rashes, cystic acne, excessive anger, heat intolerance, and inflammation."],
    preventive: ["Cooling diet, Sheetali breath, avoiding hot midday sun, and staying hydrated."]
  },
  "Kapha": {
    diet: [
      "Favor warm, light, dry, pungent, bitter, and astringent foods.",
      "Incorporate warming spices like black pepper, ginger, and garlic.",
      "Avoid heavy, cold, sweet, oily, salty, and dairy-heavy foods."
    ],
    eat: ["Spicy ginger teas", "Light barley/millet", "Bitter greens", "Apples & berries", "Warm clear soups"],
    avoid: ["Wheat & refined pasta", "Cold heavy cheese", "Sweets & cakes", "Ice cold water", "Bananas"],
    lifestyle: [
      "Incorporate active, stimulating physical exercise daily.",
      "Avoid daytime sleeping or heavy sedentary patterns.",
      "Seek new experiences, challenges, and warm, dry environments."
    ],
    yoga: ["Dynamic Vinyasa flow", "Sun salutations (Surya Namaskar)", "Bow pose (Dhanurasana)", "Camel pose (Ustrasana)"],
    meditation: ["Active walking meditation", "Bellows breath (Bhastrika)"],
    sleep: ["Wake up early (before 6 AM); avoid sleeping more than 6-7 hours."],
    wakeUp: "05:00 AM", morningMeal: "07:00 AM", midday: "01:00 PM", eveningMeal: "06:00 PM", sleepTime: "10:00 PM",
    therapies: ["Udvartana (Dry herbal scrub)", "Swedana (Steam sauna)", "Nasya (Nasal cleansing)"],
    panchakarma: ["Vamana (Emesis therapy)", "Nasya (Nasal drops)"],
    herbalSupport: ["Triphala", "Trikatu", "Guggulu", "Tulsi"],
    imbalances: ["Lethargy, weight gain, congestion, fluid retention, depression, and sluggish digestion."],
    preventive: ["Daily vigorous yoga/cardio, avoiding sweet dairy, and dry body brushing."]
  }
};

// Expose endpoints for Page 12
app.get("/api/dosha/questions", (req, res) => {
  res.json(MOCK_DOSHA_QUESTIONS);
});

app.post("/api/dosha/analyze", (req, res) => {
  const { answers, patientName } = req.body;
  if (!answers) {
    return res.status(400).json({ error: "Answers dataset is required" });
  }

  let vataScore = 0;
  let pittaScore = 0;
  let kaphaScore = 0;

  // scoring logic
  // handles both array format and dictionary format
  if (Array.isArray(answers)) {
    answers.forEach(ans => {
      const q = MOCK_DOSHA_QUESTIONS.find(item => item.id === ans.questionId);
      if (q && q.scoreMapping[ans.selectedOptionIndex]) {
        const scores = q.scoreMapping[ans.selectedOptionIndex];
        vataScore += (scores.vata || 0);
        pittaScore += (scores.pitta || 0);
        kaphaScore += (scores.kapha || 0);
      }
    });
  } else {
    // object format: { "q-1": 1, "q-2": 0 }
    Object.keys(answers).forEach(qId => {
      const selectedIdx = answers[qId];
      const q = MOCK_DOSHA_QUESTIONS.find(item => item.id === qId);
      if (q && q.scoreMapping[selectedIdx]) {
        const scores = q.scoreMapping[selectedIdx];
        vataScore += (scores.vata || 0);
        pittaScore += (scores.pitta || 0);
        kaphaScore += (scores.kapha || 0);
      }
    });
  }

  const totalScore = vataScore + pittaScore + kaphaScore;
  let vataPercentage = 33;
  let pittaPercentage = 33;
  let kaphaPercentage = 34;

  if (totalScore > 0) {
    vataPercentage = Math.round((vataScore / totalScore) * 100);
    pittaPercentage = Math.round((pittaScore / totalScore) * 100);
    kaphaPercentage = 100 - vataPercentage - pittaPercentage;
  }

  // Calculate dominant constitution
  const scoresArray = [
    { name: "Vata", value: vataPercentage },
    { name: "Pitta", value: pittaPercentage },
    { name: "Kapha", value: kaphaPercentage }
  ].sort((a, b) => b.value - a.value);

  let dominantDosha = scoresArray[0].name;
  let secondaryDosha = scoresArray[1].name;

  // If top two are within 12% of each other, it's a dual dosha
  if (scoresArray[0].value - scoresArray[1].value <= 12) {
    dominantDosha = `${scoresArray[0].name}-${scoresArray[1].name}`;
    secondaryDosha = scoresArray[2].name;
  }

  const newResult = {
    id: `res-${Date.now()}`,
    patientName: patientName || "Priyanshi Sharma",
    assessmentDate: new Date().toISOString().split('T')[0],
    vataPercentage,
    pittaPercentage,
    kaphaPercentage,
    dominantDosha,
    secondaryDosha
  };

  MOCK_DOSHA_RESULTS.unshift(newResult);

  // Add historical record to history list for frontend tracking
  const newHist = {
    id: newResult.id,
    date: newResult.assessmentDate,
    vata: newResult.vataPercentage,
    pitta: newResult.pittaPercentage,
    kapha: newResult.kaphaPercentage,
    dominantDosha: newResult.dominantDosha
  };

  res.status(201).json({ success: true, data: newResult });
});

app.get("/api/dosha/results/:id", (req, res) => {
  const result = MOCK_DOSHA_RESULTS.find(r => r.id === req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Result not found" });
  }
});

app.get("/api/dosha/recommendations", (req, res) => {
  const { dosha } = req.query;
  // If dual, default to first dominant
  let selectedDosha = dosha || "Pitta";
  if (selectedDosha.includes("-")) {
    selectedDosha = selectedDosha.split("-")[0];
  }
  const recom = MOCK_DOSHA_RECOMMENDATIONS[selectedDosha] || MOCK_DOSHA_RECOMMENDATIONS["Pitta"];
  res.json({ dosha: selectedDosha, ...recom });
});

// =========================================================================
// PAGE 13: PERSONALIZED AYURVEDA DIET PLANNER & NUTRITION MOCK SERVICES
// =========================================================================

let MOCK_DIET_USER_PROFILE = {
  id: "profile-1",
  name: "Priyanshi Sharma",
  age: 24,
  gender: "Female",
  weight: 62,
  height: 165,
  activityLevel: "Moderate",
  doshaType: "Pitta-Vata",
  healthGoals: ["Hormonal Balance", "Metabolic Reset"],
  medicalConditions: ["PCOS"],
  dietPreference: "Vegetarian"
};

const FOODS_TO_EAT_AVOID = {
  "Vata": {
    eat: ["Cooked oatmeal & rice", "Warm vegetable soups", "Ghee & olive oil", "Sweet potatoes", "Almonds & walnuts", "Fresh sweet grapes & mangoes"],
    avoid: ["Raw salads & dry crackers", "Cold carbonated beverages", "Cabbage, cauliflower & raw broccoli", "Excessive dry beans", "White potatoes"]
  },
  "Pitta": {
    eat: ["Sweet juicy apples & pears", "Asparagus & leafy greens", "Fresh coconut water", "Basmati rice", "Organic Ghee", "Mung dal stews"],
    avoid: ["Hot chili peppers & cayenne", "Sour tomatoes & vinegar", "Pickles & fermented foods", "Salty chips", "Yogurt after sunset", "Garlic & raw onions"]
  },
  "Kapha": {
    eat: ["Spiced warm ginger tea", "Light barley, oats & millet", "Bitter leafy greens & squash", "Pungent spices (black pepper, turmeric)", "Roasted chickpeas", "Honey (in moderation)"],
    avoid: ["Refined wheat & pasta", "Cold heavy cheese & curd", "Fried sweet foods & ice cream", "Iced beverages", "Very sweet ripe bananas", "Salted butter"]
  }
};

const MEALS_DATABASE = {
  "Vata": {
    Breakfast: { mealName: "Warming Almond & Spice Oatmeal", calories: 350, ingredients: ["Organic rolled oats", "Almond milk", "Slivered almonds", "Cinnamon & cardamom", "Ghee"], benefits: ["Calms erratic Vata winds", "Nourishes nervous tissues", "Provides sustained warm energy"] },
    "Mid-Morning Snack": { mealName: "Stewed Sweet Apples", calories: 150, ingredients: ["Fresh sweet apples", "Cloves", "Cardamom", "Warm water"], benefits: ["Stirs light digestive Agni", "Easy to assimilate", "Soothes colon channels"] },
    Lunch: { mealName: "Nourishing Mung Dal & Rice Kitchari", calories: 480, ingredients: ["Split yellow mung beans", "Basmati rice", "Carrots", "Zucchini", "Ghee & cumin spice blend"], benefits: ["Highly digestible", "Removes toxic Ama buildup", "Grounds full body channels"] },
    "Evening Snack": { mealName: "Warm Spiced Sesame Drink", calories: 180, ingredients: ["Sesame seed powder", "Warm milk", "Maple syrup", "Ginger powder"], benefits: ["Lubricates joint spaces", "Nourishes bone tissue (Asthi Dhatu)"] },
    Dinner: { mealName: "Baked Sweet Potato & Asparagus Stew", calories: 380, ingredients: ["Sweet potato", "Asparagus", "Olive oil", "Ginger", "Himalayan rock salt"], benefits: ["Heavy grounding properties", "Calms mind channels before sleep"] },
    "Bedtime Drink": { mealName: "Nutmeg Cardamom Milk", calories: 120, ingredients: ["Cow milk or Almond milk", "Nutmeg powder", "Cardamom powder"], benefits: ["Promotes natural deep sleep (Anidra relief)", "Soothes Vata dryness"] }
  },
  "Pitta": {
    Breakfast: { mealName: "Cooling Barley Flakes & Cardamom Porridge", calories: 320, ingredients: ["Barley flakes", "Whole milk", "Coconut sugar", "Cardamom", "Raisins"], benefits: ["Cools stomach heat (Amlapitta)", "Restores liver channels"] },
    "Mid-Morning Snack": { mealName: "Fresh Cucumber & Mint Juice", calories: 90, ingredients: ["Cucumber", "Fresh mint leaves", "Lime juice", "Water"], benefits: ["Highly hydrating", "Neutralizes excess bile acids"] },
    Lunch: { mealName: "Bitter Greens & Steamed Quinoa bowl", calories: 450, ingredients: ["Quinoa", "Kale", "Asparagus", "Zucchini", "Coconut oil", "Fennel seeds"], benefits: ["Cooling and alkalizing", "Supports hormone balancing"] },
    "Evening Snack": { mealName: "Sweet Watermelon Skewers", calories: 120, ingredients: ["Fresh sweet watermelon", "Mint garnish"], benefits: ["Reduces vascular pressure", "Flushes kidney tract channels"] },
    Dinner: { mealName: "Yellow Lentil soup & Basmati Rice", calories: 400, ingredients: ["Yellow split lentils", "Basmati rice", "Coriander", "Fennel powder", "Ghee"], benefits: ["Soothing digestive loading", "Nourishes cells without heating"] },
    "Bedtime Drink": { mealName: "Cooling Cardamom Fennel Milk", calories: 110, ingredients: ["Cardamom powder", "Fennel seed powder", "Warm milk"], benefits: ["Pacifies Pitta fire in stomach channels", "Encourages quiet rest"] }
  },
  "Kapha": {
    Breakfast: { mealName: "Warm Buckwheat & Cranberry Porridge", calories: 280, ingredients: ["Buckwheat flour", "Water", "Dried cranberries", "Ginger & cloves"], benefits: ["Light and drying to clear mucus", "Stimulates slow morning Agni"] },
    "Mid-Morning Snack": { mealName: "Warm Ginger & Basil Decoction", calories: 40, ingredients: ["Ginger root slice", "Tulsi basil leaves", "Hot water", "Raw honey"], benefits: ["Liquifies respiratory congestion", "Boosts metabolic activity"] },
    Lunch: { mealName: "Spiced Roasted Chickpeas & Steamed Broccoli", calories: 420, ingredients: ["Chickpeas", "Broccoli", "Mustard seeds", "Turmeric", "Black pepper", "Lemon juice"], benefits: ["Scrapes lymphatic tissue deposits", "High fiber clears bowel channels"] },
    "Evening Snack": { mealName: "Spiced Pumpkin Seed Mix", calories: 140, ingredients: ["Pumpkin seeds", "Sunflower seeds", "Black pepper", "Cayenne pinch"], benefits: ["Warm and drying properties", "Low fat snack alternatives"] },
    Dinner: { mealName: "Light Red Lentil & Squash Soup", calories: 350, ingredients: ["Red lentils", "Butternut squash", "Ginger", "Cumin", "Garlic"], benefits: ["Clears metabolic blocks (Srotas)", "Prevents night fat deposition"] },
    "Bedtime Drink": { mealName: "Golden Turmeric Cardamom Water", calories: 30, ingredients: ["Turmeric powder", "Cardamom powder", "Hot water"], benefits: ["Strong anti-inflammatory", "Boosts natural immunity"] }
  }
};

let MOCK_DIET_PLAN = {
  id: "plan-active-1",
  planName: "Active Pitta-Pacifying Meal Schedule",
  doshaType: "Pitta",
  goal: "Hormonal Balance",
  dailyCalories: 1690,
  duration: "30 Days",
  meals: [
    { id: "m-1", mealType: "Breakfast", mealName: "Cooling Barley Flakes & Cardamom Porridge", time: "08:00 AM", calories: 320, ingredients: ["Barley flakes", "Whole milk", "Cardamom", "Raisins"], benefits: ["Cools stomach heat", "Restores metabolic balance"] },
    { id: "m-2", mealType: "Mid-Morning Snack", mealName: "Fresh Cucumber & Mint Juice", time: "11:00 AM", calories: 90, ingredients: ["Cucumber", "Fresh mint", "Lime juice"], benefits: ["Highly hydrating", "Neutralizes excess bile acids"] },
    { id: "m-3", mealType: "Lunch", mealName: "Bitter Greens & Steamed Quinoa Bowl", time: "01:00 PM", calories: 450, ingredients: ["Quinoa", "Kale", "Asparagus", "Fennel seeds"], benefits: ["Cooling and alkalizing", "Supports reproductive health"] },
    { id: "m-4", mealType: "Evening Snack", mealName: "Sweet Watermelon Skewers", time: "04:30 PM", calories: 120, ingredients: ["Fresh sweet watermelon", "Mint"], benefits: ["Reduces heat pressure", "Flushes metabolic tracts"] },
    { id: "m-5", mealType: "Dinner", mealName: "Yellow Lentil Soup & Basmati Rice", time: "07:30 PM", calories: 400, ingredients: ["Yellow split lentils", "Basmati rice", "Coriander", "Ghee"], benefits: ["Light digestive load", "Nourishes tissues without heating"] },
    { id: "m-6", mealType: "Bedtime Drink", mealName: "Cooling Cardamom Fennel Milk", time: "09:45 PM", calories: 110, ingredients: ["Cardamom", "Fennel seed", "Warm milk"], benefits: ["Pacifies Pitta fire", "Soothes central nervous system"] }
  ],
  nutritionSummary: {
    calories: 1690,
    protein: 65,
    carbs: 230,
    fats: 45,
    waterTarget: 2500
  }
};

let MOCK_DIET_HISTORY = [
  {
    id: "plan-hist-1",
    planName: "Metabolic Fire Reset (Vata)",
    dateGenerated: "2026-05-12",
    goal: "Metabolic Reset",
    calories: 1850,
    duration: "14 Days"
  },
  {
    id: "plan-hist-2",
    planName: "Pitta Balance Plan",
    dateGenerated: "2026-05-26",
    goal: "Hormonal Balance",
    calories: 1690,
    duration: "30 Days"
  }
];

let MOCK_DIET_PROGRESS = [
  { date: "2026-05-12", weight: 64.0, bmi: 23.5, adherenceRate: 75 },
  { date: "2026-05-26", weight: 63.2, bmi: 23.2, adherenceRate: 85 },
  { date: "2026-06-12", weight: 62.0, bmi: 22.8, adherenceRate: 92 }
];

// REGISTER DIET ENDPOINTS

app.get("/api/diet/profile", (req, res) => {
  res.json(MOCK_DIET_USER_PROFILE);
});

app.get("/api/diet/plans", (req, res) => {
  res.json([MOCK_DIET_PLAN]);
});

app.get("/api/diet/recommendations", (req, res) => {
  const dosha = req.query.dosha || "Pitta";
  let targetDosha = dosha.includes("-") ? dosha.split("-")[0] : dosha;
  if (!FOODS_TO_EAT_AVOID[targetDosha]) {
    targetDosha = "Pitta";
  }
  res.json({
    dosha: targetDosha,
    ...FOODS_TO_EAT_AVOID[targetDosha]
  });
});

app.get("/api/diet/meals", (req, res) => {
  const dosha = req.query.dosha || "Pitta";
  let targetDosha = dosha.includes("-") ? dosha.split("-")[0] : dosha;
  if (!MEALS_DATABASE[targetDosha]) {
    targetDosha = "Pitta";
  }
  res.json(MEALS_DATABASE[targetDosha]);
});

app.get("/api/diet/nutrition", (req, res) => {
  res.json({
    summary: MOCK_DIET_PLAN.nutritionSummary,
    progress: MOCK_DIET_PROGRESS
  });
});

app.get("/api/diet/history", (req, res) => {
  res.json(MOCK_DIET_HISTORY);
});

app.post("/api/diet/generate-plan", (req, res) => {
  const { name, age, gender, weight, height, activityLevel, doshaType, healthGoal, dietPreference, medicalConditions } = req.body;
  
  MOCK_DIET_USER_PROFILE = {
    id: `profile-${Date.now()}`,
    name: name || MOCK_DIET_USER_PROFILE.name,
    age: Number(age) || MOCK_DIET_USER_PROFILE.age,
    gender: gender || MOCK_DIET_USER_PROFILE.gender,
    weight: Number(weight) || MOCK_DIET_USER_PROFILE.weight,
    height: Number(height) || MOCK_DIET_USER_PROFILE.height,
    activityLevel: activityLevel || MOCK_DIET_USER_PROFILE.activityLevel,
    doshaType: doshaType || MOCK_DIET_USER_PROFILE.doshaType,
    healthGoals: healthGoal ? [healthGoal] : MOCK_DIET_USER_PROFILE.healthGoals,
    medicalConditions: medicalConditions ? [medicalConditions] : MOCK_DIET_USER_PROFILE.medicalConditions,
    dietPreference: dietPreference || MOCK_DIET_USER_PROFILE.dietPreference
  };

  let lookupDosha = MOCK_DIET_USER_PROFILE.doshaType;
  if (lookupDosha.includes("-")) {
    lookupDosha = lookupDosha.split("-")[0];
  }
  if (!MEALS_DATABASE[lookupDosha]) {
    lookupDosha = "Pitta";
  }

  const baseMeals = MEALS_DATABASE[lookupDosha];
  
  let calTarget = 1800;
  if (healthGoal === "Weight Loss" || healthGoal === "Weight Management") {
    calTarget = 1500;
  } else if (healthGoal === "Muscle Gain") {
    calTarget = 2200;
  }

  let p = 60, c = 210, f = 40;
  if (lookupDosha === "Pitta") {
    p = 65; c = 230; f = 45;
  } else if (lookupDosha === "Kapha") {
    p = 75; c = 180; f = 35;
  } else {
    p = 55; c = 240; f = 50;
  }

  const generatedMeals = [
    { id: `gm-1`, mealType: "Breakfast", mealName: baseMeals.Breakfast.mealName, time: "08:00 AM", calories: baseMeals.Breakfast.calories, ingredients: baseMeals.Breakfast.ingredients, benefits: baseMeals.Breakfast.benefits },
    { id: `gm-2`, mealType: "Mid-Morning Snack", mealName: baseMeals["Mid-Morning Snack"].mealName, time: "11:00 AM", calories: baseMeals["Mid-Morning Snack"].calories, ingredients: baseMeals["Mid-Morning Snack"].ingredients, benefits: baseMeals["Mid-Morning Snack"].benefits },
    { id: `gm-3`, mealType: "Lunch", mealName: baseMeals.Lunch.mealName, time: "01:00 PM", calories: baseMeals.Lunch.calories, ingredients: baseMeals.Lunch.ingredients, benefits: baseMeals.Lunch.benefits },
    { id: `gm-4`, mealType: "Evening Snack", mealName: baseMeals["Evening Snack"].mealName, time: "04:30 PM", calories: baseMeals["Evening Snack"].calories, ingredients: baseMeals["Evening Snack"].ingredients, benefits: baseMeals["Evening Snack"].benefits },
    { id: `gm-5`, mealType: "Dinner", mealName: baseMeals.Dinner.mealName, time: "07:30 PM", calories: baseMeals.Dinner.calories, ingredients: baseMeals.Dinner.ingredients, benefits: baseMeals.Dinner.benefits },
    { id: `gm-6`, mealType: "Bedtime Drink", mealName: baseMeals["Bedtime Drink"].mealName, time: "09:45 PM", calories: baseMeals["Bedtime Drink"].calories, ingredients: baseMeals["Bedtime Drink"].ingredients, benefits: baseMeals["Bedtime Drink"].benefits }
  ];

  MOCK_DIET_PLAN = {
    id: `plan-active-${Date.now()}`,
    planName: `Customized ${lookupDosha}-Pacifying Nutrition Plan`,
    doshaType: MOCK_DIET_USER_PROFILE.doshaType,
    goal: healthGoal || "General Well-being",
    dailyCalories: calTarget,
    duration: "30 Days",
    meals: generatedMeals,
    nutritionSummary: {
      calories: calTarget,
      protein: p,
      carbs: c,
      fats: f,
      waterTarget: 2500
    }
  };

  MOCK_DIET_HISTORY.unshift({
    id: MOCK_DIET_PLAN.id,
    planName: MOCK_DIET_PLAN.planName,
    dateGenerated: new Date().toISOString().split('T')[0],
    goal: MOCK_DIET_PLAN.goal,
    calories: MOCK_DIET_PLAN.dailyCalories,
    duration: MOCK_DIET_PLAN.duration
  });

  res.status(201).json({ success: true, data: MOCK_DIET_PLAN });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the backend server!" });
});

const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
  console.log(`AyurVeda Connect Express server listening on port ${PORT}`);
});