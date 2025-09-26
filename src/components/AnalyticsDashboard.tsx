import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target,
  Users,
  Calendar,
  Download,
  Filter
} from "lucide-react";

interface AnalyticsData {
  totalStudents: number;
  totalAssessments: number;
  averageScore: number;
  completionRate: number;
  skillDistribution: {
    listening: { average: number; students: number };
    grasping: { average: number; students: number };
    retention: { average: number; students: number };
    application: { average: number; students: number };
  };
  difficultyBreakdown: {
    veryEasy: { attempted: number; accuracy: number };
    easy: { attempted: number; accuracy: number };
    moderate: { attempted: number; accuracy: number };
    difficult: { attempted: number; accuracy: number };
  };
  recentActivity: Array<{
    studentName: string;
    assessment: string;
    score: number;
    date: string;
    improvement: number;
  }>;
}

const mockAnalyticsData: AnalyticsData = {
  totalStudents: 247,
  totalAssessments: 1856,
  averageScore: 78.5,
  completionRate: 92.3,
  skillDistribution: {
    listening: { average: 82, students: 195 },
    grasping: { average: 76, students: 203 },
    retention: { average: 85, students: 187 },
    application: { average: 71, students: 224 }
  },
  difficultyBreakdown: {
    veryEasy: { attempted: 456, accuracy: 94.2 },
    easy: { attempted: 523, accuracy: 87.1 },
    moderate: { attempted: 398, accuracy: 73.6 },
    difficult: { attempted: 156, accuracy: 58.9 }
  },
  recentActivity: [
    { studentName: "Sarah Chen", assessment: "Percentages Module", score: 95, date: "Today", improvement: 12 },
    { studentName: "Marcus Johnson", assessment: "Ratios & Proportions", score: 82, date: "Yesterday", improvement: 8 },
    { studentName: "Emily Rodriguez", assessment: "Basic Calculations", score: 78, date: "2 days ago", improvement: -3 },
    { studentName: "David Kim", assessment: "Advanced Problems", score: 89, date: "3 days ago", improvement: 15 }
  ]
};

const AnalyticsDashboard = () => {
  const data = mockAnalyticsData;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">AI-powered insights and performance analytics</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="default" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">{data.totalStudents}</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
              <Badge variant="secondary" className="mt-2">+12% this month</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-3xl font-bold">{data.totalAssessments}</div>
              <div className="text-sm text-muted-foreground">Total Assessments</div>
              <Badge variant="default" className="mt-2">+8% this week</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="text-3xl font-bold">{data.averageScore}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
              <Badge variant="outline" className="mt-2">+5.2% improvement</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">{data.completionRate}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
              <Badge variant="success" className="mt-2">Excellent</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Skill Analysis */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Skill Distribution Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(data.skillDistribution).map(([skill, stats]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{skill}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold">{stats.average}%</div>
                      <div className="text-xs text-muted-foreground">{stats.students} students</div>
                    </div>
                  </div>
                  <Progress value={stats.average} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {getSkillInsight(skill, stats.average)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Difficulty Breakdown */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Performance by Difficulty Level
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(data.difficultyBreakdown).map(([level, stats]) => (
                <div key={level} className="p-4 border rounded-lg bg-muted/20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant={getDifficultyBadgeVariant(level)}>
                        {formatDifficultyLabel(level)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {stats.attempted} questions
                      </span>
                    </div>
                    <div className={`text-lg font-bold ${getAccuracyColor(stats.accuracy)}`}>
                      {stats.accuracy}%
                    </div>
                  </div>
                  <Progress value={stats.accuracy} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Student Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {activity.studentName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{activity.studentName}</div>
                      <div className="text-sm text-muted-foreground">{activity.assessment}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{activity.score}%</span>
                      <Badge variant={activity.improvement > 0 ? "success" : activity.improvement < 0 ? "destructive" : "secondary"}>
                        {activity.improvement > 0 ? '+' : ''}{activity.improvement}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Backend Connection Notice */}
        <Card className="mt-8 border-primary/20 bg-gradient-learning">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Enhanced Analytics with Supabase</h3>
            <p className="text-muted-foreground mb-4">
              Connect to Supabase to unlock real-time analytics, detailed student progress tracking, 
              and AI-powered insights with persistent data storage.
            </p>
            <Button variant="hero" size="lg">
              Connect Backend for Full Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper functions
const getSkillInsight = (skill: string, average: number): string => {
  const insights = {
    listening: average > 80 ? "Strong comprehension skills" : average > 70 ? "Good listening abilities" : "Needs focused attention practice",
    grasping: average > 80 ? "Excellent concept understanding" : average > 70 ? "Good grasp of fundamentals" : "Requires concept reinforcement",
    retention: average > 80 ? "Strong memory retention" : average > 70 ? "Good information retention" : "Benefits from repetitive practice",
    application: average > 80 ? "Excellent problem-solving skills" : average > 70 ? "Good practical application" : "Needs more applied practice"
  };
  return insights[skill as keyof typeof insights] || "Performance analysis pending";
};

const getDifficultyBadgeVariant = (level: string) => {
  switch (level) {
    case 'veryEasy': return 'secondary';
    case 'easy': return 'default';
    case 'moderate': return 'outline';
    case 'difficult': return 'destructive';
    default: return 'secondary';
  }
};

const formatDifficultyLabel = (level: string): string => {
  return level.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const getAccuracyColor = (accuracy: number): string => {
  if (accuracy >= 90) return 'text-success';
  if (accuracy >= 75) return 'text-warning';
  return 'text-error';
};

export default AnalyticsDashboard;