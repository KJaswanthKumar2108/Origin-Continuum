import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Laptop,
  Columns,
  Sparkles,
  Play,
  RotateCcw,
  ShieldCheck,
  HelpCircle,
  Cpu,
  Layers,
} from 'lucide-react';
import { ContinuumMoment, OSView, NavigationTab, DisplayMode, TaskItem } from './types';
import { INITIAL_MOMENTS, SCENARIO_Q3_PRODUCT_PLAN } from './data/sampleMoments';

import { PhoneFrame } from './components/PhoneFrame';
import { LaptopFrame } from './components/LaptopFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/HomeScreen';
import { CaptureScreen } from './components/CaptureScreen';
import { VoiceContextScreen } from './components/VoiceContextScreen';
import { UnderstandingScreen } from './components/UnderstandingScreen';
import { ContinuumMomentScreen } from './components/ContinuumMomentScreen';
import { ConnectionTransition } from './components/ConnectionTransition';
import { OfficeKitBridge } from './components/OfficeKitBridge';
import { PCWorkspace } from './components/PCWorkspace';
import { MomentsScreen } from './components/MomentsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PrivacyScreen } from './components/PrivacyScreen';
import { WhyContinuumScreen } from './components/WhyContinuumScreen';
import { FinalScreen } from './components/FinalScreen';
import { DemoController, DEMO_STEPS } from './components/DemoController';
import { ScenarioSelector } from './components/ScenarioSelector';

const STORAGE_KEY = 'origin_continuum_moments_v2';

export default function App() {
  // Moments state with LocalStorage persistence (Requirement 5)
  const [moments, setMoments] = useState<ContinuumMoment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return INITIAL_MOMENTS;
  });

  const [selectedMoment, setSelectedMoment] = useState<ContinuumMoment>(() => moments[0] || SCENARIO_Q3_PRODUCT_PLAN);

  // View state
  const [currentView, setCurrentView] = useState<OSView>('home');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('continuum');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('side-by-side');

  // Scenario modal state (Requirement 2)
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);

  // Capture & Voice temporary pipeline payload
  const [capturedPayload, setCapturedPayload] = useState<{ imageBase64?: string; mimeType?: string; textHint?: string } | undefined>(undefined);
  const [voicePayload, setVoicePayload] = useState<string | undefined>(undefined);

  // Demo mode state (60-90s guided tour)
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);
  const demoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Persist moments changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moments));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  }, [moments]);

  // Sync tab navigation
  const handleTabChange = (tab: NavigationTab) => {
    setCurrentTab(tab);
    if (tab === 'continuum') setCurrentView('home');
    if (tab === 'moments') setCurrentView('moments');
    if (tab === 'settings') setCurrentView('settings');
  };

  // Demo runner automation
  useEffect(() => {
    if (!isDemoRunning) {
      if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
      return;
    }

    const step = DEMO_STEPS[demoStepIndex];
    setCurrentView(step.targetView);

    if (step.targetDisplayMode) {
      setDisplayMode(step.targetDisplayMode);
    } else if (step.targetView === 'pc-card' || step.targetView === 'pc-workspace') {
      if (displayMode === 'phone') setDisplayMode('side-by-side');
    } else if (step.targetView === 'home' || step.targetView === 'capture') {
      if (displayMode === 'pc') setDisplayMode('phone');
    }

    demoTimerRef.current = setTimeout(() => {
      if (demoStepIndex < DEMO_STEPS.length - 1) {
        setDemoStepIndex((prev) => prev + 1);
      } else {
        setIsDemoRunning(false);
        setCurrentView('final');
        setDisplayMode('phone');
      }
    }, step.durationMs);

    return () => {
      if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    };
  }, [isDemoRunning, demoStepIndex, displayMode]);

  const startDemo = () => {
    setIsDemoRunning(true);
    setDemoStepIndex(0);
  };

  const stopDemo = () => {
    setIsDemoRunning(false);
    if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
  };

  const nextDemoStep = () => {
    if (demoStepIndex < DEMO_STEPS.length - 1) {
      setDemoStepIndex((prev) => prev + 1);
    } else {
      setIsDemoRunning(false);
      setCurrentView('final');
    }
  };

  // Scenario Selection (Requirement 2)
  const handleSelectScenario = (scenarioMoment: ContinuumMoment) => {
    // Check if exists in moments
    const existing = moments.find((m) => m.id === scenarioMoment.id);
    if (!existing) {
      setMoments([scenarioMoment, ...moments]);
    }
    setSelectedMoment(scenarioMoment);
    setCurrentView('home');
    setCurrentTab('continuum');
  };

  // Moment actions & Synchronization (Requirement 4)
  const handleDeleteMoment = (momentId: string) => {
    const updated = moments.filter((m) => m.id !== momentId);
    setMoments(updated);
    if (selectedMoment.id === momentId && updated.length > 0) {
      setSelectedMoment(updated[0]);
    } else if (updated.length === 0) {
      setSelectedMoment(SCENARIO_Q3_PRODUCT_PLAN);
    }
    setCurrentView('moments');
    setCurrentTab('moments');
  };

  const handleClearAllMoments = () => {
    setMoments([]);
    setSelectedMoment(SCENARIO_Q3_PRODUCT_PLAN);
    setCurrentView('moments');
    setCurrentTab('moments');
  };

  const handleUpdateTasks = (updatedTasks: TaskItem[]) => {
    const updated = moments.map((m) =>
      m.id === selectedMoment.id ? { ...m, actions: updatedTasks } : m
    );
    setMoments(updated);
    setSelectedMoment((prev) => ({ ...prev, actions: updatedTasks }));
  };

  const handleUpdateDeadline = (newDeadline: string) => {
    const updated = moments.map((m) =>
      m.id === selectedMoment.id ? { ...m, deadline: newDeadline } : m
    );
    setMoments(updated);
    setSelectedMoment((prev) => ({ ...prev, deadline: newDeadline }));
  };

  // Newly AI Understood Moment Completion
  const handleUnderstandingComplete = (newMoment?: ContinuumMoment) => {
    if (newMoment) {
      const existingIdx = moments.findIndex((m) => m.id === newMoment.id);
      let updated: ContinuumMoment[];
      if (existingIdx >= 0) {
        updated = moments.map((m, idx) => (idx === existingIdx ? newMoment : m));
      } else {
        updated = [newMoment, ...moments];
      }
      setMoments(updated);
      setSelectedMoment(newMoment);
    }
    setCurrentView('moment-detail');
  };

  // Active moment for display
  const activeMoment = moments.find((m) => m.id === selectedMoment.id) || selectedMoment || moments[0] || SCENARIO_Q3_PRODUCT_PLAN;

  // Render Phone Inner View
  const renderPhoneContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeScreen
            recentMoment={activeMoment}
            onCaptureClick={() => {
              setCapturedPayload(undefined);
              setVoicePayload(undefined);
              setCurrentView('capture');
            }}
            onContinuePC={(m) => {
              setSelectedMoment(m);
              setCurrentView('pc-workspace');
              setDisplayMode('pc');
            }}
            onContinueSideBySide={(m) => {
              setSelectedMoment(m);
              setCurrentView('pc-workspace');
              setDisplayMode('side-by-side');
            }}
            onInspectMoment={(m) => {
              setSelectedMoment(m);
              setCurrentView('moment-detail');
            }}
            onOpenPrivacy={() => setCurrentView('privacy')}
            onOpenWhy={() => setCurrentView('why-continuum')}
            onOpenScenarios={() => setIsScenarioModalOpen(true)}
          />
        );

      case 'capture':
        return (
          <CaptureScreen
            currentMoment={activeMoment}
            onCapture={(payload) => {
              setCapturedPayload(payload);
              setCurrentView('voice');
            }}
            onUseDemo={() => {
              setCapturedPayload({ textHint: activeMoment.extractedText });
              setCurrentView('voice');
            }}
            onCancel={() => setCurrentView('home')}
          />
        );

      case 'voice':
        return (
          <VoiceContextScreen
            currentMoment={activeMoment}
            onUnderstand={(transcript) => {
              setVoicePayload(transcript);
              setCurrentView('understanding');
            }}
            onCancel={() => setCurrentView('capture')}
          />
        );

      case 'understanding':
        return (
          <UnderstandingScreen
            currentMoment={activeMoment}
            voiceTranscript={voicePayload}
            capturedPayload={capturedPayload}
            onComplete={handleUnderstandingComplete}
          />
        );

      case 'moment-detail':
        return (
          <ContinuumMomentScreen
            moment={activeMoment}
            onContinuePC={(m) => {
              setSelectedMoment(m);
              setCurrentView('pc-workspace');
              setDisplayMode('pc');
            }}
            onContinueSideBySide={(m) => {
              setSelectedMoment(m);
              setCurrentView('pc-workspace');
              setDisplayMode('side-by-side');
            }}
            onDelete={handleDeleteMoment}
            onBack={() => setCurrentView('home')}
            onUpdateTasks={handleUpdateTasks}
            onUpdateDeadline={handleUpdateDeadline}
          />
        );

      case 'connection':
        return (
          <ConnectionTransition
            moment={activeMoment}
            onProceedToOfficeKit={() => {
              setCurrentView('pc-workspace');
              setDisplayMode('pc');
            }}
            onSkipDirectlyToPC={() => {
              setCurrentView('pc-workspace');
              setDisplayMode('pc');
            }}
          />
        );

      case 'office-kit':
        return (
          <OfficeKitBridge
            moment={activeMoment}
            onContinueToPC={() => {
              setCurrentView('pc-workspace');
              setDisplayMode('pc');
            }}
            onBack={() => setCurrentView('moment-detail')}
          />
        );

      case 'moments':
        return (
          <MomentsScreen
            moments={moments}
            onSelectMoment={(m) => {
              setSelectedMoment(m);
              setCurrentView('moment-detail');
            }}
            onDeleteMoment={handleDeleteMoment}
            onClearAll={handleClearAllMoments}
            onCaptureNew={() => {
              setCapturedPayload(undefined);
              setVoicePayload(undefined);
              setCurrentView('capture');
            }}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onClearAll={handleClearAllMoments}
            onOpenPrivacy={() => setCurrentView('privacy')}
          />
        );

      case 'privacy':
        return (
          <PrivacyScreen
            onBack={() => setCurrentView('home')}
            onDeleteCurrent={() => handleDeleteMoment(activeMoment.id)}
            onClearAll={handleClearAllMoments}
          />
        );

      case 'why-continuum':
        return <WhyContinuumScreen onBack={() => setCurrentView('home')} />;

      case 'final':
        return (
          <FinalScreen
            onRestartDemo={startDemo}
            onExplorePrototype={() => setCurrentView('home')}
          />
        );

      default:
        return (
          <HomeScreen
            recentMoment={activeMoment}
            onCaptureClick={() => setCurrentView('capture')}
            onContinuePC={(m) => {
              setSelectedMoment(m);
              setCurrentView('pc-workspace');
              setDisplayMode('pc');
            }}
            onContinueSideBySide={(m) => {
              setSelectedMoment(m);
              setCurrentView('pc-workspace');
              setDisplayMode('side-by-side');
            }}
            onInspectMoment={(m) => {
              setSelectedMoment(m);
              setCurrentView('moment-detail');
            }}
            onOpenPrivacy={() => setCurrentView('privacy')}
            onOpenWhy={() => setCurrentView('why-continuum')}
            onOpenScenarios={() => setIsScenarioModalOpen(true)}
          />
        );
    }
  };

  // Bottom navigation visible during standard views
  const isNavVisible = ['home', 'moments', 'settings'].includes(currentView);

  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden bg-[#050608] text-white flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Top Prototype Header & Viewport Switcher */}
      <header className="w-full border-b border-white/10 bg-[#0a0b0e]/95 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2 z-40 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand & Concept Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#2a2c1a] to-[#14161a] border border-[#FFE600]/80 flex items-center justify-center text-[#FFE600] shadow-[0_0_12px_rgba(255,230,0,0.25)] shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white uppercase truncate">
                  ORIGIN CONTINUUM
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 shrink-0">
                  Concept
                </span>
              </div>
              <span className="hidden md:block text-[11px] text-neutral-400 font-medium truncate">
                iQOO 15 × HP 15 Continuum Demo • “Your context follows you.”
              </span>
            </div>
          </div>

          {/* Perspective Viewport Switcher & Demo Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Try Another Moment / Scenarios Button */}
            <button
              onClick={() => setIsScenarioModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-neutral-900 border border-white/15 hover:border-[#FFE600]/60 text-white hover:text-[#FFE600] text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
              title="Try another real-world moment scenario"
            >
              <Layers className="w-3.5 h-3.5 text-[#FFE600]" />
              <span className="hidden sm:inline">Try Another Moment</span>
              <span className="sm:hidden">Scenarios</span>
            </button>

            {/* View Switcher */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-neutral-900/90 border border-white/10 p-0.5 rounded-lg sm:rounded-xl">
              <button
                id="btn-switch-phone"
                onClick={() => setDisplayMode('phone')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  displayMode === 'phone'
                    ? 'bg-[#FFE600] text-black shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Focus on the iQOO 15 phone interface"
              >
                <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Phone</span>
              </button>

              <button
                id="btn-switch-side-by-side"
                onClick={() => setDisplayMode('side-by-side')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  displayMode === 'side-by-side'
                    ? 'bg-[#FFE600] text-black shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Display both iQOO 15 and HP 15 workspaces side by side"
              >
                <Columns className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Side-by-Side</span>
                <span className="sm:hidden">Dual</span>
              </button>

              <button
                id="btn-switch-pc"
                onClick={() => setDisplayMode('pc')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  displayMode === 'pc'
                    ? 'bg-[#FFE600] text-black shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Display the continued HP 15 PC workspace"
              >
                <Laptop className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>PC</span>
              </button>
            </div>

            {/* Quick Demo Trigger Button */}
            {!isDemoRunning && (
              <button
                id="btn-start-demo-global"
                onClick={startDemo}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-full bg-[#FFE600] hover:bg-[#ffe81a] text-black font-extrabold text-[11px] sm:text-xs shadow-md shadow-[#FFE600]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                title="Start 60s Guided Demo Walkthrough"
              >
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black" />
                <span className="hidden sm:inline">Start Demo (60s)</span>
                <span className="sm:hidden">Demo</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Global Guided Demo Mode Bar (Floating when active) */}
      <DemoController
        isRunning={isDemoRunning}
        currentStepIndex={demoStepIndex}
        onStartDemo={startDemo}
        onPauseToggle={() => setIsDemoRunning(!isDemoRunning)}
        onNextStep={nextDemoStep}
        onJumpToStep={(idx) => setDemoStepIndex(idx)}
        onStopDemo={stopDemo}
      />

      {/* Main Responsive Canvas Area - 100% Fit With No Outer Scroll */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        {displayMode === 'phone' && (
          <div className="w-full h-full flex justify-center items-center overflow-hidden animate-fade-in">
            <PhoneFrame
              onHomeClick={() => setCurrentView('home')}
              bottomNav={
                isNavVisible ? (
                  <BottomNavBar
                    currentTab={currentTab}
                    onTabChange={handleTabChange}
                    momentsCount={moments.length}
                  />
                ) : undefined
              }
            >
              {renderPhoneContent()}
            </PhoneFrame>
          </div>
        )}

        {displayMode === 'pc' && (
          <div className="w-full h-full max-w-5xl flex items-center justify-center overflow-hidden animate-fade-in py-1">
            <LaptopFrame>
              <PCWorkspace
                moment={activeMoment}
                initialStage={currentView === 'pc-card' ? 'card' : 'workspace'}
                onReturnToPhone={() => {
                  setDisplayMode('phone');
                  setCurrentView('moment-detail');
                }}
                onToggleSideBySide={() => setDisplayMode('side-by-side')}
                isSideBySide={false}
                onUpdateTasks={handleUpdateTasks}
                onUpdateDeadline={handleUpdateDeadline}
              />
            </LaptopFrame>
          </div>
        )}

        {displayMode === 'side-by-side' && (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-center justify-center overflow-hidden animate-fade-in py-1">
            {/* Left: iQOO 15 Smartphone Interface (5 cols on lg+) */}
            <div className="lg:col-span-5 h-full min-h-0 flex flex-col items-center justify-center overflow-hidden">
              <div className="mb-1 text-center shrink-0">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFE600] font-bold">
                  Device 01: iQOO 15
                </span>
                <p className="text-[10.5px] text-neutral-400">
                  Real-world capture & temporary context creation
                </p>
              </div>

              <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
                <PhoneFrame
                  onHomeClick={() => setCurrentView('home')}
                  bottomNav={
                    isNavVisible ? (
                      <BottomNavBar
                        currentTab={currentTab}
                        onTabChange={handleTabChange}
                        momentsCount={moments.length}
                      />
                    ) : undefined
                  }
                >
                  {renderPhoneContent()}
                </PhoneFrame>
              </div>
            </div>

            {/* Right: HP 15 Laptop Workspace Interface (7 cols on lg+) */}
            <div className="lg:col-span-7 h-full min-h-0 flex flex-col justify-center overflow-hidden">
              <div className="mb-1 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#FFE600] font-bold">
                    Device 02: HP 15 PC Workspace
                  </span>
                  <p className="text-[10.5px] text-neutral-400">
                    Structured context continuation without raw file transfer
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Continuity Bridge Active
                </span>
              </div>

              <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
                <LaptopFrame>
                  <PCWorkspace
                    moment={activeMoment}
                    initialStage={currentView === 'pc-card' ? 'card' : 'workspace'}
                    onReturnToPhone={() => {
                      setDisplayMode('phone');
                      setCurrentView('moment-detail');
                    }}
                    onToggleSideBySide={() => setDisplayMode('pc')}
                    isSideBySide={true}
                    onUpdateTasks={handleUpdateTasks}
                    onUpdateDeadline={handleUpdateDeadline}
                  />
                </LaptopFrame>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Scenario Selector Modal */}
      <ScenarioSelector
        isOpen={isScenarioModalOpen}
        activeMomentId={activeMoment.id}
        onSelectScenario={handleSelectScenario}
        onClose={() => setIsScenarioModalOpen(false)}
      />
    </div>
  );
}
