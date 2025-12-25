
import { GoogleGenAI } from "@google/genai";
import { VideoStyle, VideoDuration } from "../types";

/**
 * Prompt2Film Neural Engine (Gemini Veo 3.1)
 * 
 * VS CODE / LOCAL USAGE:
 * 1. Ensure you have an API key from Google AI Studio (https://aistudio.google.com/).
 * 2. You can select it via the in-app dialog (recommended for this environment).
 * 3. Or set it in your local environment variables as API_KEY.
 * 
 * NOTE: This app uses Gemini Veo 3.1 directly to avoid CORS issues with other providers.
 */

export async function checkApiKey(): Promise<boolean> {
  // @ts-ignore
  if (typeof window.aistudio !== 'undefined' && typeof window.aistudio.hasSelectedApiKey === 'function') {
    return await window.aistudio.hasSelectedApiKey();
  }
  return !!process.env.API_KEY;
}

export async function openKeySelector(): Promise<void> {
  // @ts-ignore
  if (typeof window.aistudio !== 'undefined' && typeof window.aistudio.openSelectKey === 'function') {
    await window.aistudio.openSelectKey();
  }
}

export async function generateAiVideo(
  prompt: string,
  aspectRatio: '16:9' | '9:16' = '16:9',
  resolution: '720p' | '1080p' = '720p',
  style: VideoStyle = 'none',
  duration: VideoDuration = 6,
  onProgress: (message: string) => void
): Promise<string> {
  // Creating a new instance right before the call ensures it picks up the latest key from the dialog
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  onProgress("Initializing Secure Node...");

  const stylePrompt = style !== 'none' ? ` in ${style} style` : '';
  const fullPrompt = `Cinematic ${stylePrompt} video of ${prompt}. Highly detailed, 4k, fluid movement, masterwork.`;

  try {
    onProgress("Transmitting neural weights...");
    
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: fullPrompt,
      config: {
        numberOfVideos: 1,
        resolution: resolution as '720p' | '1080p',
        aspectRatio: aspectRatio
      }
    });

    onProgress("Neural Rendering Active (Est: 2min)...");

    let count = 0;
    while (!operation.done) {
      count++;
      if (count % 3 === 0) onProgress("Stitching temporal vectors...");
      if (count % 7 === 0) onProgress("Applying volumetric lighting...");
      if (count % 11 === 0) onProgress("Finalizing frame buffer...");
      
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      try {
        operation = await ai.operations.getVideosOperation({ operation: operation });
      } catch (pollErr: any) {
        const errorStr = JSON.stringify(pollErr);
        if (errorStr.includes("Requested entity was not found") || pollErr.message?.includes("Requested entity was not found")) {
          await openKeySelector();
          throw new Error("Key session expired or invalid project. Please re-select a paid API key.");
        }
        throw pollErr;
      }
    }

    onProgress("Synthesis Finalized.");

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Synthesis failed to produce data stream.");

    // The download link requires the API key to be appended
    return `${downloadLink}&key=${process.env.API_KEY}`;
  } catch (err: any) {
    console.error("Core Error:", err);
    const errorStr = JSON.stringify(err);
    if (errorStr.includes("Requested entity was not found") || err.message?.includes("Requested entity was not found")) {
      await openKeySelector();
      throw new Error("Requested entity was not found. This usually means a paid API key from a billable GCP project is required for Veo 3.1.");
    }
    throw err;
  }
}
