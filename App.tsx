import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import BenefitsSection from './components/BenefitsSection';
import ModulesSection from './components/ModulesSection';
import ApplicationsSection from './components/ApplicationsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import LevelOneGame from './components/LevelOneGame';
import LevelTwoGame from './components/LevelTwoGame';
import LevelThreeGame from './components/LevelThreeGame';
import LibrarySection from './components/LibrarySection';
import LeaderboardSection from './components/LeaderboardSection';
import { SoundProvider } from './components/SoundContext';

type ViewState = 'home' | 'library' | 'game' | 'applications' | 'leaderboard';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeGameId, setActiveGameId] = useState<number | null>(null);
  const [userScore, setUserScore] = useState<number>(0);

  const handlePlayGame = (id: number) => {
    setActiveGameId(id);
    setCurrentView('game');
  };

  const handleExitGame = () => {
    setActiveGameId(null);
    setCurrentView('home');
  };

  const handleLevelComplete = (scoreToAdd: number) => {
    setUserScore(prev => prev + scoreToAdd);
  };

  const scrollToModules = () => {
    const modulesElement = document.getElementById('modules-section');
    if (modulesElement) {
      modulesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'game':
        if (activeGameId === 1) {
          return (
            <LevelOneGame 
              onExit={handleExitGame} 
              onNextLevel={() => setActiveGameId(2)}
              onComplete={handleLevelComplete}
            />
          );
        }
        if (activeGameId === 2) {
          return (
            <LevelTwoGame 
              onExit={handleExitGame} 
            />
          );
        }
        if (activeGameId === 3) {
            return (
              <LevelThreeGame 
                onExit={handleExitGame} 
              />
            );
          }
        return null;

      case 'library':
        return <LibrarySection onExit={() => setCurrentView('home')} />;

      case 'applications':
        return <ApplicationsSection onExit={() => setCurrentView('home')} />;

      case 'leaderboard':
        return <LeaderboardSection onExit={() => setCurrentView('home')} userScore={userScore} />;

      case 'home':
      default:
        return (
          <>
            <Hero />
            <main className="relative z-10 bg-background-dark">
              <AboutSection 
                onOpenLibrary={() => setCurrentView('library')}
                onOpenApplications={() => setCurrentView('applications')}
                onOpenLeaderboard={() => setCurrentView('leaderboard')}
                onScrollToGames={scrollToModules}
              />
              <BenefitsSection />
              <div id="modules-section" className="py-24 pt-10">
                 <ModulesSection onPlayModule={handlePlayGame} />
              </div>
              <CTASection />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <>
      <Navbar 
        onOpenLibrary={() => setCurrentView('library')} 
        onOpenApplications={() => setCurrentView('applications')}
        onOpenLeaderboard={() => setCurrentView('leaderboard')}
      />
      {renderContent()}
    </>
  );
};

const App: React.FC = () => {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
};

export default App;