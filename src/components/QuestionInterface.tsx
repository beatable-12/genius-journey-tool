import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Timer, 
  Brain, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  RotateCcw,
  Lightbulb
} from "lucide-react";

interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  difficulty: string;
  tags: string;
}

// Sample questions from the dataset
const sampleQuestions: Question[] = [
  {
    id: 1,
    question_text: "The ratio 5 : 4 expressed as a percent equals:",
    option_a: "12.5%",
    option_b: "40%",
    option_c: "80%",
    option_d: "125%",
    answer: "d",
    difficulty: "Very easy",
    tags: "Percentages"
  },
  {
    id: 2,
    question_text: "3.5 can be expressed in terms of percentage as:",
    option_a: "0.35%",
    option_b: "3.5%",
    option_c: "35%",
    option_d: "350%",
    answer: "d",
    difficulty: "Very easy",
    tags: "Percentages"
  },
  {
    id: 3,
    question_text: "Half of 1 percent written as a decimal is:",
    option_a: "0.005",
    option_b: "0.05",
    option_c: "0.02",
    option_d: "0.2",
    answer: "a",
    difficulty: "Very easy",
    tags: "Percentages"
  }
];

const QuestionInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [questionsAttempted, setQuestionsAttempted] = useState(0);

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (option: string) => {
    if (!showResult) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer || timeLeft === 0) {
      setShowResult(true);
      setQuestionsAttempted(prev => prev + 1);
      if (selectedAnswer === currentQuestion.answer) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowResult(false);
      setTimeLeft(60);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowResult(false);
    setTimeLeft(60);
    setScore(0);
    setQuestionsAttempted(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'very easy': return 'secondary';
      case 'easy': return 'default';
      case 'moderate': return 'outline';
      case 'difficult': return 'destructive';
      default: return 'secondary';
    }
  };

  const getOptionStyles = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option 
        ? "border-primary bg-primary/5 shadow-glow" 
        : "border-border hover:border-primary/50 hover:bg-muted/50";
    }
    
    if (option === currentQuestion.answer) {
      return "border-success bg-success-light text-success-foreground";
    }
    
    if (selectedAnswer === option && option !== currentQuestion.answer) {
      return "border-error bg-error-light text-error-foreground";
    }
    
    return "border-border bg-muted/30";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Adaptive Assessment</h1>
                <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {sampleQuestions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-card">
                <Timer className="w-4 h-4 text-warning" />
                <span className={`font-mono ${timeLeft <= 10 ? 'text-error animate-pulse' : 'text-foreground'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Score</div>
                <div className="font-bold text-lg">{score}/{questionsAttempted}</div>
              </div>
            </div>
          </div>
          
          <Progress value={(currentQuestionIndex + 1) / sampleQuestions.length * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-elevated animate-slide-up">
          <CardHeader className="bg-gradient-card">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {currentQuestion.question_text}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant={getDifficultyColor(currentQuestion.difficulty)}>
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="outline">
                  {currentQuestion.tags}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { option: 'a', text: currentQuestion.option_a },
                { option: 'b', text: currentQuestion.option_b },
                { option: 'c', text: currentQuestion.option_c },
                { option: 'd', text: currentQuestion.option_d }
              ].map(({ option, text }) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`p-4 text-left border-2 rounded-lg transition-all duration-200 ${getOptionStyles(option)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      getOptionStyles(option).includes('success') ? 'bg-success text-success-foreground border-success' :
                      getOptionStyles(option).includes('error') ? 'bg-error text-error-foreground border-error' :
                      selectedAnswer === option ? 'bg-primary text-primary-foreground border-primary' :
                      'border-muted-foreground/30'
                    }`}>
                      {option.toUpperCase()}
                    </div>
                    <span className="flex-1">{text}</span>
                    {showResult && option === currentQuestion.answer && (
                      <CheckCircle2 className="w-5 h-5 text-success animate-bounce-in" />
                    )}
                    {showResult && selectedAnswer === option && option !== currentQuestion.answer && (
                      <XCircle className="w-5 h-5 text-error animate-bounce-in" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg animate-slide-up ${
                isCorrect ? 'bg-success-light border border-success/20' : 'bg-error-light border border-error/20'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-error" />
                  )}
                  <span className={`font-semibold ${isCorrect ? 'text-success' : 'text-error'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    The correct answer is <strong>{currentQuestion.answer.toUpperCase()}</strong>: {
                      currentQuestion[`option_${currentQuestion.answer}` as keyof Question] as string
                    }
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </Button>

              <div className="flex gap-3">
                {!showResult ? (
                  <Button
                    variant={selectedAnswer ? "success" : "outline"}
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Answer
                  </Button>
                ) : (
                  currentQuestionIndex < sampleQuestions.length - 1 ? (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      className="flex items-center gap-2"
                    >
                      Next Question
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      onClick={handleRestart}
                      className="flex items-center gap-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Complete Assessment
                    </Button>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="mt-6 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-sm mb-1">AI Learning Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Based on your performance, the system is analyzing your understanding of percentage calculations. 
                  {showResult && isCorrect && " Great job! Your grasp of basic percentage concepts is strong."}
                  {showResult && !isCorrect && " Consider reviewing the relationship between ratios and percentages."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionInterface;