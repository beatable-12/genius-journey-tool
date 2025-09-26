import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
  BookOpen,
  BarChart3,
  Users,
  Zap,
  CheckCircle2
} from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

interface LearningStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  streak: number;
  level: string;
  skillAreas: { name: string; progress: number; color: string }[];
}

const LearningDashboard = () => {
  const [currentMode, setCurrentMode] = useState<'student' | 'teacher'>('student');
  
  const studentStats: LearningStats = {
    totalQuestions: 156,
    correctAnswers: 128,
    accuracy: 82,
    streak: 7,
    level: "Intermediate",
    skillAreas: [
      { name: "Listening", progress: 85, color: "success" },
      { name: "Grasping", progress: 78, color: "primary" },
      { name: "Retention", progress: 90, color: "success" },
      { name: "Application", progress: 72, color: "warning" }
    ]
  };

  const recentQuestions = [
    { id: 1, question: "The ratio 5 : 4 expressed as a percent equals:", difficulty: "Very Easy", status: "correct" },
    { id: 2, question: "3.5 can be expressed in terms of percentage as:", difficulty: "Easy", status: "correct" },
    { id: 3, question: "Half of 1 percent written as a decimal is:", difficulty: "Moderate", status: "incorrect" },
    { id: 4, question: "What is 15 percent of Rs. 34?", difficulty: "Easy", status: "correct" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <img 
          src={heroImage} 
          alt="AI Adaptive Learning"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center text-primary-foreground">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              AI Adaptive Learning
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up [animation-delay:0.2s]">
              Personalized assessment and practice tool that adapts to your learning pace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:0.4s]">
              <Button variant="hero" size="xl">
                <Zap className="w-5 h-5" />
                Start Assessment
              </Button>
              <Button variant="learning" size="xl">
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Selector */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-lg p-1 shadow-card">
            <Button
              variant={currentMode === 'student' ? 'default' : 'ghost'}
              onClick={() => setCurrentMode('student')}
              className="rounded-md"
            >
              <BookOpen className="w-4 h-4" />
              Student Dashboard
            </Button>
            <Button
              variant={currentMode === 'teacher' ? 'default' : 'ghost'}
              onClick={() => setCurrentMode('teacher')}
              className="rounded-md"
            >
              <Users className="w-4 h-4" />
              Teacher Dashboard
            </Button>
          </div>
        </div>

        {currentMode === 'student' ? (
          <StudentDashboard stats={studentStats} recentQuestions={recentQuestions} />
        ) : (
          <TeacherDashboard />
        )}
      </section>
    </div>
  );
};

const StudentDashboard = ({ stats, recentQuestions }: { stats: LearningStats, recentQuestions: any[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Overview */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Questions Attempted</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">{stats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{stats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuestions.map((q) => (
                <div key={q.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-1">{q.question}</div>
                    <Badge variant={q.difficulty === 'Very Easy' ? 'secondary' : q.difficulty === 'Easy' ? 'default' : q.difficulty === 'Moderate' ? 'outline' : 'destructive'}>
                      {q.difficulty}
                    </Badge>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    q.status === 'correct' ? 'bg-success text-success-foreground' : 'bg-error text-error-foreground'
                  }`}>
                    {q.status === 'correct' ? '✓' : '✗'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Analysis */}
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Skill Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.skillAreas.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full" size="lg">
              Continue Practice
            </Button>
            <Button variant="learning" className="w-full" size="lg">
              Take New Assessment
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Review Mistakes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TeacherDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Class Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Teacher dashboard features will be available after connecting to Supabase for backend functionality.
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Student Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Detailed analytics and reports will be generated with the full backend integration.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningDashboard;