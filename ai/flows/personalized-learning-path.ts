'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized training plan recommendations.
 *
 * The flow takes user's skill assessment results and career goals as input and returns a tailored training plan.
 * - generatePersonalizedLearningPath - The function to trigger the flow and generate the learning path.
 * - PersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The output type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  skillAssessmentResults: z
    .string()
    .describe('The results of the skill assessment.'),
  careerGoals: z.string().describe('The career goals of the user.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

const PersonalizedLearningPathOutputSchema = z.object({
  trainingPlan: z.string().describe('The personalized training plan.'),
});
export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
>;

export async function generatePersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an expert career coach. Based on the user's skill assessment results and career goals, generate a personalized training plan.

Skill Assessment Results: {{{skillAssessmentResults}}}
Career Goals: {{{careerGoals}}}

Personalized Training Plan:`,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
