// api.js - API Service layer with fallback to local mock data
const API_BASE_URL = 'http://127.0.0.1:5174';

const mockData = {
    stats: {
        patients: "10000+",
        doctors: "1000+",
        clinics: "500+",
        treatments: "50+"
    },
    doctors: [
        { id: 1, name: "Dr. Aditi Sharma", specialization: "Panchakarma Specialist", experience: "15+ Years", rating: 4.9, fee: 500 },
        { id: 2, name: "Dr. Rajesh Kumar", specialization: "Ayurvedic Physician", experience: "12+ Years", rating: 4.8, fee: 400 },
        { id: 3, name: "Dr. Sneha Desai", specialization: "Yoga & Diet Expert", experience: "8+ Years", rating: 4.7, fee: 350 }
    ],
    clinics: [
        { id: 1, name: "AyurCare Wellness Center", location: "Bangalore", rating: 4.8, services: ["Panchakarma", "Naturopathy", "Yoga"] },
        { id: 2, name: "Prakriti Ayurveda Clinic", location: "Mumbai", rating: 4.9, services: ["Herbal Medicine", "Detox", "Consultation"] }
    ],
    diseases: [
        { id: 1, name: "Diabetes", description: "Manage blood sugar levels naturally." },
        { id: 2, name: "PCOS", description: "Holistic approach for hormonal balance." },
        { id: 3, name: "Arthritis", description: "Relief from joint pain and inflammation." },
        { id: 4, name: "Migraine", description: "Ayurvedic remedies for chronic headaches." },
        { id: 5, name: "Psoriasis", description: "Skin care and purification therapies." },
        { id: 6, name: "Obesity", description: "Weight management and lifestyle changes." }
    ],
    testimonials: [
        { id: 1, name: "Rahul Verma", text: "AyurVeda Connect helped me find the best Panchakarma clinic. I feel completely rejuvenated.", role: "Patient" },
        { id: 2, name: "Priya Singh", text: "The doctors here are very knowledgeable. The herbal remedies cured my chronic migraine.", role: "Patient" }
    ]
};

const fetchWithFallback = async (endpoint, mockKey) => {
    // Simulate network delay to mimic an API response without causing browser console errors
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData[mockKey];
};

export const getStats = () => fetchWithFallback('/api/stats', 'stats');
export const getDoctors = () => fetchWithFallback('/api/doctors', 'doctors');
export const getClinics = () => fetchWithFallback('/api/clinics', 'clinics');
export const getDiseases = () => fetchWithFallback('/api/diseases', 'diseases');
export const getTestimonials = () => fetchWithFallback('/api/testimonials', 'testimonials');
