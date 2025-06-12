export interface ISkill {
  name: string;
  weight: number;
}

export interface IExperience {
  skillName: string;
  months: number;
  relevance: number;
}

export interface ISkillMatchEvaluation {
  opportunitySkill: string;
  skillMatchType: string;
  maxProficiency: string;
  maxRelevantProficiency: string;
  implicitMatch: boolean;
  matchingSkills: string[];
}

export interface ICompensation {
  amount: number;
  currency: string;
  minHourlyUSD: number;
  periodicity: string;
  privacy: string;
}

export interface IScorer {
  "@type": string;
  rank: number;
  scorer: string;
  score: number | null;
  min: number | null;
  max: number | null;
  uncertain: boolean;
  missingInformation: boolean;
  input: {
    criteria?: {
      queries?: string[];
      skills?: { name: string }[];
      proficiencies?: Record<string, string>;
      experiences?: Record<string, unknown>;
    } | null;
    person?: {
      value?: string;
      completion?: number;
      weight?: number;
      skills?: string[];
      proficiencies?: Record<string, unknown>;
      experiences?: IExperience[];
    };
  };
  debug: null;
}

export interface IFilter {
  "@type": string;
  pass: boolean;
  potentialMatch: boolean;
  uncertainMatch: boolean;
  or?: {
    "@type": string;
    pass: boolean;
    potentialMatch: boolean;
    uncertainMatch: boolean;
    id: string;
    missingInformation: boolean;
    input: {
      criteria?: {
        skills?: { name: string }[];
        proficiencies?: Record<string, string>;
        experiences?: Record<string, unknown>;
      };
      person?: {
        skills?: string[];
        proficiencies?: Record<string, unknown>;
        experiences?: IExperience[];
      };
    } | null;
    debug: null;
  }[];
}

export interface IRanker {
  "@type": string;
  rank: number;
  score: number;
  min: number;
  max: number;
  uncertain: boolean;
  and?: IScorer[];
  or?: IScorer[];
  filter?: IFilter;
}

export interface IResult {
  context: {
    signaled: null;
  };
  _meta: {
    ranker: IRanker;
    filter?: IFilter;
    boosters?: string[];
  };
  _version: {
    timestamp: string;
  };
  compensations: {
    "flexible-job"?: ICompensation;
    employee?: ICompensation;
  };
  locationName: string;
  name: string;
  openTo: string[];
  picture: string;
  professionalHeadline: string;
  theme: string;
  remoter: boolean;
  skills: ISkill[];
  subjectId: string;
  subscriptions: unknown[];
  username: string;
  verified: boolean;
  weight: number;
  ggId: string;
}

export interface ISearchResponse {
  total: number;
  size: number;
  results: IResult[];
  aggregators: Record<string, unknown>;
  offset: number;
  pagination: {
    previous: string | null;
    next: string | null;
  };
}
