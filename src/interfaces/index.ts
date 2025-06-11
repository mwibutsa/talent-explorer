export interface IPerson {
  name: string;
  username?: string;
  picture?: string;
  professionalHeadline?: string;
  location?: {
    name: string;
    shortName?: string;
    country?: string;
    countryCode?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
  verified?: boolean;
  publicId: string;
  completion?: number;
  showPhone?: boolean;
  created?: string;
  flags?: {
    accessCohort?: boolean;
    benefits?: boolean;
    canary?: boolean;
    enlauSource?: boolean;
    fake?: boolean;
    featureDiscovery?: boolean;
    firstSignalSent?: boolean;
    signalsOnboardingCompleted?: boolean;
    importingLinkedin?: boolean;
    onBoarded?: boolean;
    remoter?: boolean;
    signalsFeatureDiscovery?: boolean;
    importingLinkedinRecommendations?: boolean;
    contactsImported?: boolean;
    appContactsImported?: boolean;
    genomeCompletionAcknowledged?: boolean;
    cvImported?: boolean;
    communityCreatedPrivate?: boolean;
    communityCreatedClaimed?: boolean;
    connectBenefitsViewed?: boolean;
    recommendationLeadEmailSent?: boolean;
    recommendationsAskedGenomeCompletion?: boolean;
    behavioralTraitsAcknowledged?: boolean;
    testTaken?: boolean;
    previewFeatureDiscovery?: boolean;
    boosted?: boolean;
    addedFromTeamGenomeOrJobPost?: boolean;
    reorderedExperiences?: boolean;
    invited?: boolean;
    invitationRequested?: boolean;
    genomeIndexed?: boolean;
  };
  weight?: number;
  ggId?: string;
  completionStage?: {
    stage: number;
    progress: number;
  };
  locale?: string;
  subjectId?: number;
  hasEmail?: boolean;
  isTest?: boolean;
  links?: Array<{
    id: string;
    name: string;
    address: string;
  }>;
  theme?: string;
  id?: string;
  pictureThumbnail?: string;
  claimant?: boolean;
  summaryOfBio?: string;
  weightGraph?: string;
}

export interface IOrganization {
  id?: number;
  name: string;
  publicId?: string;
  picture?: string;
  websiteUrl?: string;
  about?: string;
  perks?: string;
  theme?: string;
  serviceType?: string;
}

export interface IStrength {
  id: string;
  code?: number;
  name: string;
  proficiency?: string;
  implicitProficiency?: boolean;
  weight?: number;
  recommendations?: number;
  media?: string[];
  supra?: boolean;
  created?: string;
  hits?: number;
  relatedExperiences?: string[];
  pin?: boolean;
}

export interface IExperience {
  id: string;
  category: string;
  name: string;
  organizations?: IOrganization[];
  responsibilities?: string[];
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  remote?: boolean;
  additionalInfo?: string;
  highlighted?: boolean;
  weight?: number;
  verifications?: number;
  recommendations?: number;
  media?: string[];
  rank?: number;
  strengths?: string[];
}

export interface IJobPreference {
  active: boolean;
  private: boolean;
  notifications?: string;
  desirableCompensation?: {
    amount: number;
    currency: string;
    onlyDisclosed: boolean;
    periodicity: string; // 'monthly' | 'hourly' | 'yearly'
    publiclyVisible: boolean;
    implicit: boolean;
  };
}

export interface IPreferences {
  jobsFullTime?: IJobPreference;
  flexibleJobs?: IJobPreference;
  internships?: IJobPreference;
}

export interface ILanguage {
  code: string;
  language: string;
  fluency: string; // 'fully-fluent' | 'fluent' | 'intermediate' | 'basic'
}

export interface IUserGenome {
  person: IPerson;
  stats?: {
    jobs?: number;
    education?: number;
    strengths?: number;
    // Legacy structure for backward compatibility
    strengthsArray?: Array<{
      id: string;
      name: string;
      weight: number;
    }>;
    interests?: Array<{
      id: string;
      name: string;
      weight: number;
    }>;
    experiences?: Array<{
      id: string;
      category: string;
      name: string;
      organizations?: Array<{
        name: string;
        picture?: string;
      }>;
    }>;
  };
  strengths?: IStrength[];
  interests?: IStrength[]; // Interests use same structure as strengths
  experiences?: IExperience[];
  awards?: IExperience[];
  jobs?: IExperience[];
  projects?: IExperience[];
  publications?: IExperience[];
  education?: IExperience[];
  opportunities?: IExperience[];
  preferences?: IPreferences;
  languages?: ILanguage[];
}

export interface IUser {
  ardaId: number;
  ggId: string;
  name: string;
  comparableName: string;
  username: string;
  professionalHeadline: string;
  imageUrl: string;
  completion: number;
  grammar: number;
  weight: number;
  verified: boolean;
  connections: unknown[];
  totalStrength: number;
  pageRank: number;
  organizationId: string | null;
  organizationNumericId: string | null;
  publicId: string | null;
  status: string | null;
  creators: unknown[];
  relationDegree: number;
  isSearchable: boolean;
  contact: boolean;
}
