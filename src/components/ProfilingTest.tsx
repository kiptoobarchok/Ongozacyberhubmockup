import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Brain, 
  CheckCircle2, 
  Circle, 
  Target,
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

export function ProfilingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'How comfortable are you with Linux command-line operations?',
      options: ['Not familiar', 'Basic commands', 'Intermediate', 'Advanced'],
      category: 'Technical Skills',
    },
    {
      id: 2,
      question: 'Have you worked with networking concepts (TCP/IP, DNS, etc.)?',
      options: ['No experience', 'Basic understanding', 'Moderate experience', 'Extensive experience'],
      category: 'Networking',
    },
    {
      id: 3,
      question: 'Rate your programming/scripting knowledge',
      options: ['None', 'Basic (Python/Bash)', 'Multiple languages', 'Expert level'],
      category: 'Programming',
    },
    {
      id: 4,
      question: 'Do you have experience with security tools (Wireshark, Nmap, etc.)?',
      options: ['Never used', 'Heard of them', 'Used a few', 'Regular user'],
      category: 'Security Tools',
    },
    {
      id: 5,
      question: 'How would you rate your problem-solving ability?',
      options: ['Developing', 'Good', 'Very good', 'Excellent'],
      category: 'Soft Skills',
    },
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setIsComplete(true), 300);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const skillGapData = [
    { skill: 'Linux/CLI', current: 65, required: 80 },
    { skill: 'Networking', current: 70, required: 85 },
    { skill: 'Programming', current: 55, required: 75 },
    { skill: 'Security Tools', current: 50, required: 80 },
    { skill: 'Problem Solving', current: 75, required: 85 },
  ];

  const radarData = [
    { subject: 'Technical', A: 75, B: 90, fullMark: 100 },
    { subject: 'Networking', A: 68, B: 85, fullMark: 100 },
    { subject: 'Programming', A: 60, B: 80, fullMark: 100 },
    { subject: 'Security', A: 55, B: 85, fullMark: 100 },
    { subject: 'Soft Skills', A: 80, B: 85, fullMark: 100 },
  ];

  const recommendedTracks = [
    {
      title: 'SOC Analyst Track',
      match: 85,
      description: 'Best fit based on your networking and problem-solving skills',
      strengths: ['Strong analytical thinking', 'Good networking foundation'],
      gaps: ['Security tools exposure', 'SIEM platforms'],
    },
    {
      title: 'Network Security',
      match: 72,
      description: 'Good match for your networking background',
      strengths: ['Networking knowledge', 'Technical aptitude'],
      gaps: ['Advanced firewall config', 'VPN technologies'],
    },
    {
      title: 'Penetration Testing',
      match: 58,
      description: 'Requires additional programming skills',
      strengths: ['Problem-solving ability'],
      gaps: ['Programming proficiency', 'Security tool expertise'],
    },
  ];

  if (isComplete) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Profiling Results</h1>
          <p className="text-slate-400">Your skill assessment and recommended learning path</p>
        </div>

        {/* Overall Score */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl text-white mb-2">Overall Readiness Score</h3>
                <p className="text-slate-400">Based on your responses</p>
              </div>
              <div className="text-center">
                <div className="text-5xl text-cyan-400 mb-2">72%</div>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500">Good Foundation</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Skill Profile</CardTitle>
              <CardDescription className="text-slate-400">Current vs Required levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#94a3b8" />
                  <Radar name="Your Level" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  <Radar name="Required" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Skill Gap Analysis</CardTitle>
              <CardDescription className="text-slate-400">Areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillGapData.map((skill) => {
                  const gap = skill.required - skill.current;
                  return (
                    <div key={skill.skill}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300">{skill.skill}</span>
                        <span className="text-xs text-slate-400">
                          Gap: {gap}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 h-full bg-cyan-500"
                          style={{ width: `${skill.current}%` }}
                        />
                        <div
                          className="absolute left-0 h-full border-2 border-purple-500 border-dashed"
                          style={{ width: `${skill.required}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Tracks */}
        <div className="mb-8">
          <h2 className="text-2xl text-white mb-4">Recommended Tracks</h2>
          <div className="space-y-4">
            {recommendedTracks.map((track, index) => (
              <Card
                key={track.title}
                className={`border-2 transition-all ${
                  index === 0
                    ? 'bg-cyan-500/10 border-cyan-500'
                    : 'bg-slate-800/30 border-slate-700'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{track.title}</h3>
                        {index === 0 && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500">
                            Best Match
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{track.description}</p>
                    </div>
                    <div className="text-center ml-4">
                      <div className="text-3xl text-cyan-400 mb-1">{track.match}%</div>
                      <span className="text-xs text-slate-500">Match</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Your Strengths
                      </h4>
                      <ul className="space-y-1">
                        {track.strengths.map((strength) => (
                          <li key={strength} className="text-sm text-slate-300 pl-4">
                            • {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-orange-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Areas to Develop
                      </h4>
                      <ul className="space-y-1">
                        {track.gaps.map((gap) => (
                          <li key={gap} className="text-sm text-slate-300 pl-4">
                            • {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {index === 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                        Start SOC Analyst Track
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Skills Profiling Assessment</h1>
        <p className="text-slate-400">Help us understand your background to recommend the best track</p>
      </div>

      {/* Progress */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-cyan-500/10">
              <Brain className="w-6 h-6 text-cyan-400" />
            </div>
            <Badge variant="outline" className="border-slate-600 text-slate-400">
              {questions[currentQuestion].category}
            </Badge>
          </div>
          <CardTitle className="text-xl text-white">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 rounded-lg border-2 border-slate-700 bg-slate-800/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-cyan-500 flex items-center justify-center">
                    {answers[currentQuestion] === option ? (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Circle className="w-3 h-3 text-slate-600 group-hover:text-cyan-500" />
                    )}
                  </div>
                  <span className="text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          Previous
        </Button>
        <div className="flex gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentQuestion
                  ? 'bg-cyan-400 w-6'
                  : index < currentQuestion
                  ? 'bg-green-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
        <Button
          onClick={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
          disabled={!answers[currentQuestion]}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        >
          {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
