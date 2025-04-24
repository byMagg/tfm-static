import type { JwtPayload } from "jwt-decode";

export interface Match {
  _id: string;
  tourney_name: string;
  surface: string;
  draw_size: string;
  tourney_level: string;
  tourney_date: number;
  match_num: string;
  winner_id: number;
  winner_seed: string;
  winner_entry: string;
  winner_name: string;
  winner_hand: string;
  winner_ht: number;
  winner_ioc: string;
  winner_age: number;
  loser_id: number;
  loser_seed: string;
  loser_entry: string;
  loser_name: string;
  loser_hand: string;
  loser_ht: string;
  loser_ioc: string;
  loser_age: number;
  score: string;
  best_of: string;
  round: string;
  minutes: string;
  w_ace: string;
  w_df: string;
  w_svpt: string;
  w_1stIn: string;
  w_1stWon: string;
  w_2ndWon: string;
  w_SvGms: string;
  w_bpSaved: string;
  w_bpFaced: string;
  l_ace: string;
  l_df: string;
  l_svpt: string;
  l_1stIn: string;
  l_1stWon: string;
  l_2ndWon: string;
  l_SvGms: string;
  l_bpSaved: string;
  l_bpFaced: string;
}

export interface Player {
  _id: string;
  name_first: string;
  name_last: string;
  hand: string;
  player_id: number;
  dob: number;
  ioc: string;
  height: number;
  wikidata_id: string;
}

export interface Ranking {
  _id: string;
  ranking_date: number;
  rank: number;
  player: number;
  points: number;
}

export interface League {
  _id: string;
  name: string;
  players: Array<string>;
  startedAt: string;
  matches?: Array<LeagueMatch>;
}

export interface LeagueMatch {
  _id: string;
  player1: User;
  player2: User;
  round: Round;
  winner: string;
  score: string;
  date: string;
}

export interface Round {
  _id: string;
  startDate: string;
  endDate: string;
  league_id: string;
  standings: Standing[];
  groups: [{ players: User[] }];
}

export interface Standing {
  player: User;
  round: Round;
  points: number;
}

export enum Country {
  AFG = "af",
  AHO = "an",
  ALB = "al",
  ALG = "dz",
  AND = "ad",
  ANG = "ao",
  ANT = "ag",
  ANZ = "au",
  ARG = "ar",
  ARM = "am",
  ARU = "aw",
  ASA = "as",
  AUS = "au",
  AUT = "at",
  AZE = "az",
  BAH = "bs",
  BAN = "bd",
  BAR = "bb",
  BDI = "bi",
  BEL = "be",
  BEN = "bj",
  BER = "bm",
  BIH = "ba",
  BIR = "by",
  BIZ = "bz",
  BLR = "by",
  BOL = "bo",
  BOT = "bw",
  BRA = "br",
  BRI = "vg",
  BRN = "bn",
  BRU = "bn",
  BUL = "bg",
  BUR = "bf",
  CAF = "cf",
  CAL = "ky",
  CAM = "kh",
  CAN = "ca",
  CAR = "cv",
  CAY = "ky",
  CEY = "lk",
  CGO = "cg",
  CHI = "cl",
  CHL = "cl",
  CHN = "cn",
  CIV = "ci",
  CMR = "cm",
  COD = "cd",
  COK = "ck",
  COL = "co",
  CPV = "cv",
  CRC = "cr",
  CRO = "hr",
  CUB = "cu",
  CUW = "cw",
  CYP = "cy",
  CZE = "cz",
  DEN = "dk",
  DEU = "de",
  DOM = "do",
  ECA = "ec",
  ECU = "ec",
  EGY = "eg",
  ERI = "er",
  ESA = "sv",
  ESP = "es",
  EST = "ee",
  ETH = "et",
  FIJ = "fj",
  FIN = "fi",
  FRA = "fr",
  FRG = "de",
  GAB = "ga",
  GBR = "gb",
  GDR = "de",
  GEO = "ge",
  GER = "de",
  GHA = "gh",
  GLP = "gp",
  GRC = "gr",
  GRE = "gr",
  GRN = "gd",
  GTM = "gt",
  GUA = "gt",
  GUD = "gp",
  GUM = "gu",
  GUY = "gy",
  HAI = "ht",
  HAW = "us",
  HKG = "hk",
  HON = "hn",
  HUN = "hu",
  INA = "id",
  IND = "in",
  IRI = "ir",
  IRL = "ie",
  IRQ = "iq",
  ISL = "is",
  ISR = "il",
  ISV = "vi",
  ITA = "it",
  ITF = "fr",
  JAM = "jm",
  JOR = "jo",
  JPN = "jp",
  KAZ = "kz",
  KEN = "ke",
  KGZ = "kg",
  KOR = "kr",
  KSA = "sa",
  KUW = "kw",
  KWT = "kw",
  LAO = "la",
  LAT = "lv",
  LBA = "ly",
  LBN = "lb",
  LBR = "lr",
  LCA = "lc",
  LEB = "lb",
  LES = "ls",
  LIB = "lr",
  LIE = "li",
  LTU = "lt",
  LUX = "lu",
  MAD = "mg",
  MAR = "ma",
  MAS = "my",
  MCO = "mc",
  MDA = "md",
  MDG = "mg",
  MEX = "mx",
  MGL = "mn",
  MHL = "mh",
  MKD = "mk",
  MLI = "ml",
  MLT = "mt",
  MNE = "me",
  MON = "mc",
  MOZ = "mz",
  MRI = "mu",
  MRT = "mr",
  MTN = "mr",
  MYA = "mm",
  NAM = "na",
  NCA = "ni",
  NED = "nl",
  NEP = "np",
  NGR = "ng",
  NIG = "ne",
  NMI = "mp",
  NOR = "no",
  NPL = "np",
  NZL = "nz",
  OMA = "om",
  PAK = "pk",
  PAN = "pa",
  PAR = "py",
  PER = "pe",
  PHI = "ph",
  PLW = "pw",
  PNG = "pg",
  POC = "mf",
  POL = "pl",
  POR = "pt",
  PRY = "py",
  PUR = "pr",
  QAT = "qa",
  REU = "re",
  RHO = "zw",
  ROU = "ro",
  RSA = "za",
  RUS = "ru",
  RWA = "rw",
  SAM = "ws",
  SCG = "rs",
  SEN = "sn",
  SEY = "sc",
  SGP = "sg",
  SIN = "sg",
  SLE = "sl",
  SLO = "si",
  SMR = "sm",
  SOL = "sb",
  SRB = "rs",
  SRI = "lk",
  SUD = "sd",
  SUI = "ch",
  SUR = "sr",
  SVK = "sk",
  SWE = "se",
  SWZ = "sz",
  SYR = "sy",
  TAN = "tz",
  TCH = "cz",
  TGO = "tg",
  THA = "th",
  TJK = "tj",
  TKM = "tm",
  TKS = "tc",
  TOG = "tg",
  TPE = "tw",
  TRI = "tt",
  TTO = "tt",
  TUN = "tn",
  TUR = "tr",
  TWN = "tw",
  UAE = "ae",
  UGA = "ug",
  UKR = "ua",
  URS = "ru",
  URU = "uy",
  URY = "uy",
  USA = "us",
  UZB = "uz",
  VAN = "vu",
  VEN = "ve",
  VIE = "vn",
  VIN = "vc",
  VIR = "vi",
  VUT = "vu",
  YEM = "ye",
  YUG = "cs",
  ZAM = "zm",
  ZIM = "zw",
}

export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface ChatMessage {
  content: string;
  from: string;
  to: string;
  createdAt?: string;
}

export interface IJwtPayload extends JwtPayload {
  user_id: string;
}
