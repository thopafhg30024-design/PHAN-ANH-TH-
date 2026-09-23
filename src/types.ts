export type Language = 'vi' | 'en';
export type EducationLevel = 'primary' | 'secondary' | 'highschool';

export interface RiverStation {
  id: string;
  name: string;
  vietnameseName: string;
  country: string;
  flag: string;
  regionType: 'upstream' | 'midstream' | 'downstream' | 'delta';
  x: number; // Percentage for interactive map
  y: number;
  lengthFromSourceKm: number;
  highlight: string;
  details: string;
  ecologicalFact: string;
  image?: string;
  waterColor?: string;
  elevation?: string;
  damInfo?: string;
  subObjects?: string[];
  curriculumGradeNote: {
    primary: string;
    secondary: string;
    highschool: string;
  };
}

export interface MRCInfoTopic {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  content: string[];
  keyStats?: { label: string; value: string; unit?: string }[];
  vietnamRelevance: string;
  geography11Takeaway: string;
}

export interface QuizQuestion {
  id: string;
  level: EducationLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  badgeEarned?: string;
  gradeLevelTag: string; // e.g. "Lớp 3-5", "Lớp 7-8", "Địa lí 11"
}

export interface DragMatchItem {
  id: string;
  leftText: string;
  rightMatchId: string;
  rightText: string;
  category: string;
}

export interface SimulationState {
  upstreamDamRelease: number; // 20% to 100% flow
  drySeasonIntensity: 'normal' | 'drought' | 'severe';
  seaLevelRiseCm: number; // 0 to 50 cm
  sluiceGateOperation: 'open' | 'smart_control' | 'closed';
  adaptationModel: 'traditional_rice' | 'rice_shrimp_rotation' | 'fruit_freshwater_reservoir';
}

export interface PromptTemplate {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  fullPromptText: string;
}

export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface TourismSpot {
  id: string;
  title: string;
  province: string;
  riverBranch: string;
  tag: string;
  image: string;
  highlights: string[];
  description: string;
  travelTips: string;
  bestSeason: string;
  culturalNote?: string;
}

export interface RiverEstuary {
  id: string;
  number: number;
  name: string;
  vietnameseFull: string;
  branch: 'Sông Tiền' | 'Sông Hậu';
  subBranch: string;
  province: string;
  svgCoords: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    labelX: number;
    labelY: number;
  };
  status: string;
  description: string;
  isHistoricalSedimented?: boolean;
  isDammed?: boolean;
}

export interface MekongBasinScope {
  geographicalLocation: {
    coordinates: string;
    origin: string;
    mouth: string;
    regionalLocation: string;
    elevationDrop: string;
  };
  basinScope: {
    totalAreaKm2: number;
    rankWorldArea: number;
    totalLengthKm: number;
    rankWorldLength: number;
    rankAsiaLength: number;
    meanAnnualDischargeM3: number;
    rankWorldDischarge: number;
    upperBasin: {
      name: string;
      shareArea: string;
      shareFlow: string;
      shareSediment: string;
      countries: string[];
      terrain: string;
    };
    lowerBasin: {
      name: string;
      shareArea: string;
      shareFlow: string;
      shareSediment: string;
      countries: string[];
      population: string;
      terrain: string;
    };
    waterRegime: {
      floodSeason: string;
      drySeason: string;
      tonleSapRole: string;
    };
  };
}

