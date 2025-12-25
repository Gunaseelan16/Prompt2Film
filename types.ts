
export interface VideoGenerationState {
  isGenerating: boolean;
  progressMessage: string;
  error: string | null;
  videoUrl: string | null;
  needsKey: boolean;
}

export interface FilmProject {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export type VideoStyle = 'none' | 'realistic' | '3d' | 'anime' | 'cyberpunk' | 'cinematic';
export type VideoDuration = 3 | 6 | 10;

export interface GenerationConfig {
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
  style: VideoStyle;
  duration: VideoDuration;
}
