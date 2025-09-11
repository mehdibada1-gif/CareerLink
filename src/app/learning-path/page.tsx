import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { generatePersonalizedLearningPath } from '@/ai/flows/personalized-learning-path';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Lightbulb, Loader2, Milestone, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type LearningPathPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-xl font-semibold">Generating Your Path...</h2>
      <p className="text-muted-foreground">Our AI is crafting a learning plan tailored just for you. This might take a moment.</p>
    </div>
  );
}

async function LearningPlan({ searchParams }: LearningPathPageProps) {
  const { goal, ...skills } = searchParams;

  if (!goal || typeof goal !== 'string' || Object.keys(skills).length === 0) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Missing Information</AlertTitle>
        <AlertDescription>
          We couldn't generate a learning path. Please complete the skill assessment first.
          <Button asChild variant="link" className="p-0 h-auto ml-1">
            <Link href="/assessment">Go to Assessment</Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const skillAssessmentResults = Object.entries(skills)
    .map(([skill, rating]) => `${skill}: ${rating}/10`)
    .join(', ');

  try {
    const { trainingPlan } = await generatePersonalizedLearningPath({
      careerGoals: goal,
      skillAssessmentResults,
    });
    
    // Simple parsing logic, assuming a consistent format from the AI.
    const sections = trainingPlan.split('\n\n').map(section => {
        const [title, ...content] = section.split('\n');
        return { title: title.replace(/###\s*/, ''), content: content.join('\n').replace(/-\s/g, '') };
    });

    return (
        <div className="space-y-4">
            {sections.map((section, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <Milestone className="w-5 h-5"/>
                            </span>
                            <span className="mt-1">{section.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>
                    </CardContent>
                </Card>
            ))}
            <Alert className="bg-accent/10 border-accent/50">
              <Lightbulb className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent">Next Steps</AlertTitle>
              <AlertDescription>
                Explore relevant <Link href="/projects" className="font-semibold underline">projects</Link> to apply these skills or connect with a <Link href="/mentors" className="font-semibold underline">mentor</Link> for guidance.
              </AlertDescription>
            </Alert>
        </div>
    );
  } catch (error) {
    console.error("Error generating learning path:", error);
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Generation Failed</AlertTitle>
        <AlertDescription>
          There was an issue creating your learning path. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
}

export default function LearningPathPage({ searchParams }: LearningPathPageProps) {
  const heroImage = placeholderImages.find(p => p.id === 'learning-path-hero');
  return (
    <div>
      <PageHeader title="Your Learning Path" showBackButton />
      <div className="p-4 space-y-4">
        <div className="relative w-full h-40 rounded-lg overflow-hidden">
            {heroImage && 
                <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description}
                fill
                style={{objectFit: 'cover'}}
                data-ai-hint={heroImage.imageHint}
                />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="text-accent"/>
                    <span>Your Roadmap to Success</span>
                </h2>
            </div>
        </div>
        <Suspense fallback={<LoadingState />}>
          <LearningPlan searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
