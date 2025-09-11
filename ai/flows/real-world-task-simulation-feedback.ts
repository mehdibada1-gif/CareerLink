'use server';
/**
 * @fileOverview An AI agent that provides feedback on user submissions for simulated real-world tasks.
 *
 * - provideTaskFeedback - A function that handles the task feedback process.
 * - TaskFeedbackInput - The input type for the provideTaskFeedback function.
 * - TaskFeedbackOutput - The return type for the provideTaskFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskFeedbackInputSchema = z.object({
  taskDescription: z.string().describe('The description of the real-world task.'),
  userSubmission: z.string().describe('The user submission for the task.'),
  feedbackRequest: z.string().optional().describe('Optional: Specific areas the user wants feedback on.'),
});
export type TaskFeedbackInput = z.infer<typeof TaskFeedbackInputSchema>;

const TaskFeedbackOutputSchema = z.object({
  overallFeedback: z.string().describe('Overall feedback on the user submission.'),
  suggestions: z.string().describe('Specific suggestions for improvement.'),
});
export type TaskFeedbackOutput = z.infer<typeof TaskFeedbackOutputSchema>;

export async function provideTaskFeedback(input: TaskFeedbackInput): Promise<TaskFeedbackOutput> {
  return provideTaskFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taskFeedbackPrompt',
  input: {schema: TaskFeedbackInputSchema},
  output: {schema: TaskFeedbackOutputSchema},
  prompt: `You are an AI assistant providing feedback on user submissions for real-world task simulations.

  Task Description: {{{taskDescription}}}
  User Submission: {{{userSubmission}}}

  {{#if feedbackRequest}}
  The user has requested specific feedback on the following areas: {{{feedbackRequest}}}
  {{/if}}

  Provide overall feedback and specific suggestions for improvement.
  Format the output as follows:

  Overall Feedback: [Overall feedback on the user submission]
  Suggestions: [Specific suggestions for improvement]`,
});

const provideTaskFeedbackFlow = ai.defineFlow(
  {
    name: 'provideTaskFeedbackFlow',
    inputSchema: TaskFeedbackInputSchema,
    outputSchema: TaskFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
