"use client";

import { useState } from 'react';
import { provideTaskFeedback, type TaskFeedbackOutput } from '@/ai/flows/real-world-task-simulation-feedback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';

type TaskSimulationProps = {
  taskDescription: string;
};

export function TaskSimulation({ taskDescription }: TaskSimulationProps) {
  const [submission, setSubmission] = useState('');
  const [feedback, setFeedback] = useState<TaskFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const result = await provideTaskFeedback({
        taskDescription,
        userSubmission: submission,
      });
      setFeedback(result);
    } catch (err) {
      setError('Failed to get feedback. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot /> Real-World Task Simulation
        </CardTitle>
        <CardDescription>
          Apply your skills by completing the task below. Our AI will provide feedback on your submission.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Task Description</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{taskDescription}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your submission here. This could be code, a written response, or a plan."
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            rows={8}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !submission} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Get Feedback'}
          </Button>
        </form>

        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {feedback && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-center">Feedback Received</h3>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Overall Feedback</AlertTitle>
              <AlertDescription>{feedback.overallFeedback}</AlertDescription>
            </Alert>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Suggestions for Improvement</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap">{feedback.suggestions}</AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
