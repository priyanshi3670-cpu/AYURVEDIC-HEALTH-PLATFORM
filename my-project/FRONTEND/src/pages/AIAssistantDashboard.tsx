import React, { useState, useEffect, useRef } from 'react';
import {
  ChatMessage,
  AIDoshaInsight,
  AIHealthTip,
  AIConversationRecord,
  AIBookmark,
  AITreatmentRec,
  AIRecommendationCard as RecCardType,
  AINotificationItem,
  AIWellnessTask,
  Patient,
  Notification
} from '../types';
import { aiApi } from '../services/aiApi';
import { recommendationApi } from '../services/recommendationApi';
import patientApi from '../services/patientApi';
import patientNotificationApi from '../services/patientNotificationApi';

// Layout
import DashboardLayout from '../components/dashboard/DashboardLayout';

// Components
import AIAssistantHero from '../components/aiAssistant/AIAssistantHero';
import ChatInterface from '../components/aiAssistant/ChatInterface';
import QuickQuestionCard from '../components/aiAssistant/QuickQuestionCard';
import HealthInsightCard from '../components/aiAssistant/HealthInsightCard';
import RecommendationCard from '../components/aiAssistant/RecommendationCard';
import SymptomGuidanceForm from '../components/aiAssistant/SymptomGuidanceForm';
import DoshaDashboard from '../components/aiAssistant/DoshaDashboard';
import WellnessCoach from '../components/aiAssistant/WellnessCoach';
import HealthTipCard from '../components/aiAssistant/HealthTipCard';
import TreatmentRecommendation from '../components/aiAssistant/TreatmentRecommendation';
import ConversationHistory from '../components/aiAssistant/ConversationHistory';
import BookmarkPanel from '../components/aiAssistant/BookmarkPanel';
import NotificationCenter from '../components/aiAssistant/NotificationCenter';
import FAQSection from '../components/aiAssistant/FAQSection';
import CTABanner from '../components/aiAssistant/CTABanner';
import LoadingSkeleton from '../components/aiAssistant/LoadingSkeleton';
import ErrorFallback from '../components/aiAssistant/ErrorFallback';

const AIAssistantDashboard: React.FC = () => {
  // Portal layout states
  const [patient, setPatient] = useState<Patient | null>(null);
  const [portalNotifications, setPortalNotifications] = useState<Notification[]>([]);

  // AI-specific states
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [doshaInsights, setDoshaInsights] = useState<AIDoshaInsight[]>([]);
  const [healthTips, setHealthTips] = useState<AIHealthTip[]>([]);
  const [conversations, setConversations] = useState<AIConversationRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<AIBookmark[]>([]);
  const [treatmentRecs, setTreatmentRecs] = useState<AITreatmentRec[]>([]);
  const [recommendationCards, setRecommendationCards] = useState<RecCardType[]>([]);
  const [aiNotifications, setAiNotifications] = useState<AINotificationItem[]>([]);
  const [wellnessTasks, setWellnessTasks] = useState<AIWellnessTask[]>([]);

  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  // Refs
  const chatRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);

  // ─── Data Fetch ───
  const fetchData = async () => {
    setIsLoading(true);
    let fallback = false;

    try {
      // Portal data
      const patientRes = await patientApi.getPatientProfile();
      setPatient(patientRes.data);
      if (patientRes.isFallback) fallback = true;

      const notifRes = await patientNotificationApi.getNotifications();
      setPortalNotifications(notifRes.data);
      if (notifRes.isFallback) fallback = true;

      // AI data
      const historyRes = await aiApi.getHistory();
      setMessages(historyRes.data);
      if (historyRes.isFallback) fallback = true;

      const suggestionsRes = await aiApi.getSuggestions();
      setSuggestions(suggestionsRes.data);
      if (suggestionsRes.isFallback) fallback = true;

      const doshaRes = await aiApi.getDoshaInsights();
      setDoshaInsights(doshaRes.data);
      if (doshaRes.isFallback) fallback = true;

      const tipsRes = await aiApi.getHealthTips();
      setHealthTips(tipsRes.data);
      if (tipsRes.isFallback) fallback = true;

      const convRes = await aiApi.getConversations();
      setConversations(convRes.data);
      if (convRes.isFallback) fallback = true;

      const bmRes = await aiApi.getBookmarks();
      setBookmarks(bmRes.data);
      if (bmRes.isFallback) fallback = true;

      // Recommendation data
      const treatRes = await recommendationApi.getTreatmentRecs();
      setTreatmentRecs(treatRes.data);
      if (treatRes.isFallback) fallback = true;

      const recRes = await recommendationApi.getRecommendationCards();
      setRecommendationCards(recRes.data);
      if (recRes.isFallback) fallback = true;

      const aiNotifRes = await recommendationApi.getNotifications();
      setAiNotifications(aiNotifRes.data);
      if (aiNotifRes.isFallback) fallback = true;

      const wellnessRes = await recommendationApi.getWellnessTasks();
      setWellnessTasks(wellnessRes.data);
      if (wellnessRes.isFallback) fallback = true;

      setIsFallback(fallback);
    } catch (err: any) {
      console.error('AI Dashboard fetch error:', err.message);
      setIsFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ─── Chat Handlers ───
  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      message: text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate delay for realism
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

    const res = await aiApi.sendMessage(text);
    setMessages(prev => [...prev, res.data]);
    setIsTyping(false);
    if (res.isFallback) setIsFallback(true);
  };

  const handleBookmark = (msg: ChatMessage) => {
    const newBookmark: AIBookmark = {
      id: `bk-${Date.now()}`,
      title: msg.message.substring(0, 50) + (msg.message.length > 50 ? '...' : ''),
      content: msg.message.substring(0, 200),
      type: 'Advice',
      savedDate: new Date().toISOString().split('T')[0],
    };
    setBookmarks(prev => [newBookmark, ...prev]);
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const handleClearChat = () => {
    setMessages([{
      id: `msg-welcome-${Date.now()}`,
      role: 'assistant',
      message: '🙏 Namaste! I am your AI Ayurveda Health Advisor. How can I help you today? Ask me about Dosha analysis, diet recommendations, treatment suggestions, or general wellness guidance.',
      timestamp: new Date().toISOString(),
    }]);
  };

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInsights = () => {
    insightsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── Loading State ───
  if (isLoading && !patient) {
    return (
      <div className="flex bg-[#F8FFF8] min-h-screen font-sans">
        <div className="flex-grow p-6 md:p-8">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FFF8]">
      {isFallback && <ErrorFallback onRetry={fetchData} />}

      {patient && (
        <DashboardLayout
          patient={patient}
          isFallback={isFallback}
          notifications={portalNotifications}
          activeTab="ai-assistant"
          setActiveTab={() => {}}
        >
          <div className="space-y-8">

            {/* Page Title */}
            <div className="border-b border-emerald-50 pb-5">
              <h1 className="font-serif text-2xl md:text-3xl font-black text-gray-800">
                AI Ayurveda Assistant
              </h1>
              <p className="text-xs text-gray-400 font-bold mt-1">
                Smart Health Advisor powered by ancient Ayurvedic wisdom
              </p>
            </div>

            {/* Hero */}
            <AIAssistantHero onStartChat={scrollToChat} onViewInsights={scrollToInsights} />

            {/* Main Grid: Chat + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" ref={chatRef}>
              {/* Chat Interface (Span 7) */}
              <div className="lg:col-span-7">
                <ChatInterface
                  messages={messages}
                  suggestions={suggestions}
                  isTyping={isTyping}
                  onSendMessage={handleSendMessage}
                  onBookmark={handleBookmark}
                  onClearChat={handleClearChat}
                />
              </div>

              {/* Sidebar Cards (Span 5) */}
              <div className="lg:col-span-5 space-y-6">
                <QuickQuestionCard questions={suggestions} onAsk={handleSendMessage} />
                <WellnessCoach tasks={wellnessTasks} />
              </div>
            </div>

            {/* Dosha Intelligence Dashboard */}
            <div ref={insightsRef}>
              <DoshaDashboard
                insights={doshaInsights}
                dominantDosha={patient.doshaType}
              />
            </div>

            {/* Personalized Recommendations */}
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-800 mb-1">Personalized Recommendations</h2>
              <p className="text-xs text-gray-400 mb-5">AI-curated wellness guidance tailored to your Dosha</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {recommendationCards.map((rec, i) => (
                  <RecommendationCard key={rec.id} recommendation={rec} index={i} />
                ))}
              </div>
            </div>

            {/* Health Insights - Dosha Cards */}
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-800 mb-1">AI Health Insights</h2>
              <p className="text-xs text-gray-400 mb-5">Deep Dosha analysis and wellness recommendations</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {doshaInsights.map((insight, i) => (
                  <HealthInsightCard key={insight.id} insight={insight} index={i} />
                ))}
              </div>
            </div>

            {/* Symptom Guidance + Treatment Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SymptomGuidanceForm />
              <TreatmentRecommendation treatments={treatmentRecs} />
            </div>

            {/* Health Tips Feed */}
            <HealthTipCard tips={healthTips} />

            {/* Conversation History + Bookmarks + Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ConversationHistory conversations={conversations} />
              <BookmarkPanel bookmarks={bookmarks} onRemove={handleRemoveBookmark} />
              <NotificationCenter notifications={aiNotifications} />
            </div>

            {/* FAQ */}
            <FAQSection />

            {/* CTA Banner */}
            <CTABanner onStartChat={scrollToChat} />

            {/* Medical Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-700 font-medium">
                ⚠️ This AI assistant provides educational wellness information and is not a substitute for professional medical advice, diagnosis or treatment.
              </p>
            </div>

          </div>
        </DashboardLayout>
      )}
    </div>
  );
};

export default AIAssistantDashboard;
