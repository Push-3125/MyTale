'use server';

/**
 * @fileOverview Predicts the best time to turn the page based on reading speed.
 *
 * - predictPageTurn - A function that predicts the page turn time.
 * - PredictPageTurnInput - The input type for the predictPageTurn function.
 * - PredictPageTurnOutput - The return type for the predictPageTurn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPageTurnInputSchema = z.object({
  textOnPage: z
    .string()
    .describe('The text content of the current manga page.'),
  readingSpeedWPM: z
    .number()
    .describe(
      'The user reading speed in words per minute.  A typical value is 200.'
    ),
  wordsPerPage: z
    .number()
    .describe(
      'The approximate number of words on the current page.  A typical value is 150.'
    ),
});
export type PredictPageTurnInput = z.infer<typeof PredictPageTurnInputSchema>;

const PredictPageTurnOutputSchema = z.object({
  secondsToTurn: z
    .number()
    .describe(
      'The predicted number of seconds until the user should turn the page.'
    ),
});
export type PredictPageTurnOutput = z.infer<typeof PredictPageTurnOutputSchema>;

export async function predictPageTurn(
  input: PredictPageTurnInput
): Promise<PredictPageTurnOutput> {
  return predictPageTurnFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictPageTurnPrompt',
  input: {schema: PredictPageTurnInputSchema},
  output: {schema: PredictPageTurnOutputSchema},
  prompt: `You are an AI assistant that predicts when a manga reader should turn the page.

  Based on the user's reading speed ({{{readingSpeedWPM}}} words per minute),
  the number of words on the page ({{{wordsPerPage}}}), 
  and the actual text on the page:
  """{{{textOnPage}}}""",
  predict how many seconds it will take for the user to finish reading the page.

  Return only the number of seconds. Do not include any other text.`,
});

const predictPageTurnFlow = ai.defineFlow(
  {
    name: 'predictPageTurnFlow',
    inputSchema: PredictPageTurnInputSchema,
    outputSchema: PredictPageTurnOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    //The prompt asks the LLM to return only a number.  However, the
    //LLM might return some text before or after the number, so we need
    //to extract the number from the string.
    const secondsToTurn = parseFloat(output!.secondsToTurn.toString());

    return {secondsToTurn};
  }
);
