/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  DepartmentKey, 
  Department, 
  Activity, 
  ClassItem, 
  StudentRegistration, 
  DonationCampaign, 
  DonationRecord, 
  DonationReport, 
  NewsArticle, 
  GalleryItem, 
  PartnershipRequest, 
  ContactMessage 
} from './types';
import { 
  INITIAL_DEPARTMENTS, 
  INITIAL_ACTIVITIES, 
  INITIAL_CLASSES, 
  INITIAL_REGISTRATIONS, 
  INITIAL_DONATION_CAMPAIGNS, 
  INITIAL_DONATION_REPORTS, 
  INITIAL_DONATION_RECORDS, 
  INITIAL_NEWS, 
  INITIAL_GALLERY, 
  INITIAL_PARTNERSHIPS, 
  INITIAL_MESSAGES 
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuickDonateModal } from './components/QuickDonateModal';
import { ActivityRegisterModal } from './components/ActivityRegisterModal';

import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { AgendaSection } from './components/AgendaSection';
import { EducationSection } from './components/EducationSection';
import { DonationSection } from './components/DonationSection';
import { NewsGallerySection } from './components/NewsGallerySection';
import { PartnershipSection } from './components/PartnershipSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [selectedDeptId, setSelectedDeptId] = useState<DepartmentKey>('pendidikan');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [quickDonateOpen, setQuickDonateOpen] = useState(false);
  const [quickDonateCampaignId, setQuickDonateCampaignId] = useState<string | undefined>(undefined);

  // Persistent / Reactive App State
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('ypi_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [classes, setClasses] = useState<ClassItem[]>(() => {
    const saved = localStorage.getItem('ypi_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    const saved = localStorage.getItem('ypi_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(() => {
    const saved = localStorage.getItem('ypi_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_DONATION_CAMPAIGNS;
  });

  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('ypi_donations');
    return saved ? JSON.parse(saved) : INITIAL_DONATION_RECORDS;
  });

  const [reports] = useState<DonationReport[]>(INITIAL_DONATION_REPORTS);

  const [newsList, setNewsList] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('ypi_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [galleryList, setGalleryList] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('ypi_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [partnerships, setPartnerships] = useState<PartnershipRequest[]>(() => {
    const saved = localStorage.getItem('ypi_partnerships');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERSHIPS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('ypi_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('ypi_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('ypi_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('ypi_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('ypi_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('ypi_donations', JSON.stringify(donationRecords));
  }, [donationRecords]);

  useEffect(() => {
    localStorage.setItem('ypi_news', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('ypi_gallery', JSON.stringify(galleryList));
  }, [galleryList]);

  useEffect(() => {
    localStorage.setItem('ypi_partnerships', JSON.stringify(partnerships));
  }, [partnerships]);

  useEffect(() => {
    localStorage.setItem('ypi_messages', JSON.stringify(messages));
  }, [messages]);

  // Handlers
  const handleOpenQuickDonate = (campaignId?: string) => {
    setQuickDonateCampaignId(campaignId);
    setQuickDonateOpen(true);
  };

  const handleDonateSuccess = (newRecord: DonationRecord) => {
    setDonationRecords(prev => [newRecord, ...prev]);
    // update campaign collected amount
    setCampaigns(prev => prev.map(c => {
      if (c.id === newRecord.campaignId) {
        return {
          ...c,
          collectedAmount: c.collectedAmount + newRecord.amount,
          donorsCount: c.donorsCount + 1,
        };
      }
      return c;
    }));
  };

  const handleNewRegistration = (newReg: StudentRegistration) => {
    setRegistrations(prev => [newReg, ...prev]);
    // increment enrolled count in class
    setClasses(prev => prev.map(cls => {
      if (cls.id === newReg.classId) {
        return { ...cls, enrolled: cls.enrolled + 1 };
      }
      return cls;
    }));
  };

  const handleActivityRegisterSuccess = (updatedActivity: Activity) => {
    setActivities(prev => prev.map(a => a.id === updatedActivity.id ? updatedActivity : a));
  };

  const handleNewPartnership = (req: PartnershipRequest) => {
    setPartnerships(prev => [req, ...prev]);
  };

  const handleSendMessage = (msg: ContactMessage) => {
    setMessages(prev => [msg, ...prev]);
  };

  // If activeTab is admin, render the full admin dashboard
  if (activeTab === 'admin') {
    return (
      <AdminDashboard
        onBackToSite={() => setActiveTab('beranda')}
        departments={departments}
        activities={activities}
        setActivities={setActivities}
        classes={classes}
        setClasses={setClasses}
        registrations={registrations}
        setRegistrations={setRegistrations}
        campaigns={campaigns}
        donationRecords={donationRecords}
        setDonationRecords={setDonationRecords}
        newsList={newsList}
        setNewsList={setNewsList}
        galleryList={galleryList}
        setGalleryList={setGalleryList}
        partnerships={partnerships}
        setPartnerships={setPartnerships}
        messages={messages}
        setMessages={setMessages}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-emerald-900 selection:text-amber-200">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickDonate={() => handleOpenQuickDonate()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <HomeSection
            departments={departments}
            activities={activities}
            newsList={newsList}
            galleryList={galleryList}
            campaigns={campaigns}
            setActiveTab={setActiveTab}
            onOpenQuickDonate={() => handleOpenQuickDonate()}
            onSelectDepartment={(id) => {
              setSelectedDeptId(id as DepartmentKey);
              setActiveTab('bidang');
            }}
            onSelectNews={(article) => {
              setSelectedArticle(article);
              setActiveTab('berita');
            }}
            onOpenActivityRegister={(act) => setSelectedActivity(act)}
          />
        )}

        {activeTab === 'tentang' && <AboutSection />}

        {activeTab === 'bidang' && (
          <DepartmentsSection
            departments={departments}
            selectedDeptId={selectedDeptId}
            onSelectDept={setSelectedDeptId}
            setActiveTab={setActiveTab}
            onOpenQuickDonate={() => handleOpenQuickDonate('camp-1')}
          />
        )}

        {activeTab === 'agenda' && (
          <AgendaSection
            activities={activities}
            onRegisterActivity={(act) => setSelectedActivity(act)}
          />
        )}

        {activeTab === 'pendidikan' && (
          <EducationSection
            classes={classes}
            onNewRegistration={handleNewRegistration}
          />
        )}

        {activeTab === 'donasi' && (
          <DonationSection
            campaigns={campaigns}
            reports={reports}
            records={donationRecords}
            onOpenDonateModal={(campId) => handleOpenQuickDonate(campId)}
          />
        )}

        {activeTab === 'berita' && (
          <NewsGallerySection
            newsList={newsList}
            galleryList={galleryList}
            selectedArticle={selectedArticle}
            onSelectArticle={setSelectedArticle}
          />
        )}

        {activeTab === 'kemitraan' && (
          <PartnershipSection onNewPartnership={handleNewPartnership} />
        )}

        {activeTab === 'kontak' && (
          <ContactSection onSendMessage={handleSendMessage} />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenQuickDonate={() => handleOpenQuickDonate()}
      />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

      {/* Quick Donate Modal */}
      <QuickDonateModal
        isOpen={quickDonateOpen}
        onClose={() => setQuickDonateOpen(false)}
        campaigns={campaigns}
        defaultCampaignId={quickDonateCampaignId}
        onDonateSuccess={handleDonateSuccess}
      />

      {/* Event/Activity Register Modal */}
      <ActivityRegisterModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onSuccess={handleActivityRegisterSuccess}
      />

    </div>
  );
}
