import { useState } from "react";
import { Button } from "@/components/ui/button";
import LearningDashboard from "@/components/LearningDashboard";
import QuestionInterface from "@/components/QuestionInterface";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { BookOpen, BarChart3, Brain } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'assessment' | 'analytics'>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <LearningDashboard />;
      case 'assessment':
        return <QuestionInterface />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <LearningDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">AI Learning Platform</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Dashboard
              </Button>
              <Button
                variant={currentView === 'assessment' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('assessment')}
                className="flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                Assessment
              </Button>
              <Button
                variant={currentView === 'analytics' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('analytics')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {renderCurrentView()}
    </div>
  );
};

export default Index;
