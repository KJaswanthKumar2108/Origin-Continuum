export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface SuggestedNextAction {
  action: string;
  reasoning: string;
  confidence?: number;
}

export interface VisualSourceData {
  title: string;
  subtitle: string;
  badge: string;
  points: string[];
  footerNote?: string;
  accentColor?: string;
}

export interface ContinuumMoment {
  id: string;
  title: string;
  timestamp: string;
  createdAt: number;
  sources: {
    type: 'whiteboard' | 'document' | 'screen' | 'voice' | 'camera' | 'text';
    label: string;
  }[];
  actions: TaskItem[];
  deadline?: string;
  contextSummary: string;
  voiceTranscript?: string;
  textNote?: string;
  extractedText?: string;
  entities?: string[];
  decisions?: string[];
  unresolvedQuestions?: string[];
  suggestedNextAction?: SuggestedNextAction;
  scenarioCategory?: 'project' | 'meeting' | 'lecture' | 'client' | 'reminder';
  visualData?: VisualSourceData;
  imageThumbnailUrl?: string;
  isDemo?: boolean;
  isAIGenerated?: boolean;
}

export type OSView =
  | 'home'
  | 'capture'
  | 'voice'
  | 'understanding'
  | 'moment-detail'
  | 'connection'
  | 'office-kit'
  | 'pc-card'
  | 'pc-workspace'
  | 'moments'
  | 'settings'
  | 'privacy'
  | 'why-continuum'
  | 'ecosystem'
  | 'final';

export type NavigationTab = 'continuum' | 'moments' | 'settings';

export type DisplayMode = 'phone' | 'side-by-side' | 'pc';
