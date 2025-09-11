"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Loader2 } from 'lucide-react';

const careerGoals = ["Frontend Developer", "Backend Developer", "Product Manager", "UX Designer", "Data Scientist"];
const skillsByGoal: Record<string, string[]> = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React"],
  "Backend Developer": ["Node.js", "Python", "Databases", "API Design"],
  "Product Manager": ["User Research", "Roadmapping", "Agile", "Communication"],
  "UX Designer": ["Figma", "Prototyping", "User Testing", "Wireframing"],
  "Data Scientist": ["Python", "SQL", "Statistics", "Machine Learning"],
};

export function AssessmentForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [skills, setSkills] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 3;

  const handleGoalChange = (value: string) => {
    setGoal(value);
    const initialSkills = skillsByGoal[value].reduce((acc, skill) => ({ ...acc, [skill]: 5 }), {});
    setSkills(initialSkills);
  };

  const handleSkillChange = (skill: string, value: number[]) => {
    setSkills(prev => ({ ...prev, [skill]: value[0] }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setIsLoading(true);
    const skillParams = new URLSearchParams(Object.entries(skills).map(([key, value]) => [key, String(value)])).toString();
    router.push(`/learning-path?goal=${encodeURIComponent(goal)}&${skillParams}`);
  };

  return (
    <Card>
      <CardHeader>
        <Progress value={(step / totalSteps) * 100} className="h-2 mb-4" />
        <CardTitle>
          {step === 1 && "Step 1: Your Career Goal"}
          {step === 2 && "Step 2: Your Skills"}
          {step === 3 && "Step 3: Review & Submit"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <RadioGroup value={goal} onValueChange={handleGoalChange}>
            <div className="space-y-2">
              {careerGoals.map(g => (
                <Label key={g} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-accent/20 has-[:checked]:border-accent transition-colors">
                  <RadioGroupItem value={g} id={g} />
                  <span>{g}</span>
                </Label>
              ))}
            </div>
          </RadioGroup>
        )}
        {step === 2 && (
          <div className="space-y-6">
            {Object.keys(skills).map(skill => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor={skill}>{skill}</Label>
                  <span className="text-sm text-muted-foreground">{skills[skill]} / 10</span>
                </div>
                <Slider id={skill} value={[skills[skill]]} onValueChange={(v) => handleSkillChange(skill, v)} max={10} step={1} />
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Career Goal</h3>
              <p className="text-muted-foreground">{goal}</p>
            </div>
            <div>
              <h3 className="font-semibold">Skills Assessment</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {Object.entries(skills).map(([skill, rating]) => (
                  <li key={skill}>{skill}: {rating}/10</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && <Button variant="outline" onClick={prevStep}>Back</Button>}
        <div className={step === 1 ? 'w-full' : ''}>
          {step < totalSteps && (
            <Button onClick={nextStep} disabled={step === 1 && !goal} className="w-full">
              Next <ArrowRight className="ml-2" />
            </Button>
          )}
          {step === totalSteps && (
            <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? <Loader2 className="animate-spin" /> : "Generate My Path"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
