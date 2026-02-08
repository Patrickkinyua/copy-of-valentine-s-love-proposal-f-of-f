
export type AppState = 'proposal' | 'official-proposal' | 'dashboard' | 'letter' | 'planner' | 'bouquet' | 'memories';

export interface DatePlan {
  title: string;
  activities: string[];
  vibe: string;
  surpriseTip: string;
}

export interface LoveLetter {
  content: string;
  tone: string;
}
