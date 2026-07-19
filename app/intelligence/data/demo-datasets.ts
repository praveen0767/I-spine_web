// ============================================================
// DEMO DATA — ALL FICTIONAL. FOR DEMONSTRATION PURPOSES ONLY.
// ============================================================

export type GeoLevel =
  | 'country'
  | 'state'
  | 'parliamentary'
  | 'assembly'
  | 'district'
  | 'taluk'
  | 'block'
  | 'ward'
  | 'booth';

export interface DemoStats {
  voters: number;
  turnout: number;       // %
  leadParty: string;
  leadMargin: number;    // %
  sentiment: number;     // 0‑100
  riskScore: number;     // 0‑100
  boothsCovered: number;
  fieldAgents: number;
  issueTop: string;
  issueScore: number;    // 0‑100
}

export interface GeoNode {
  id: string;
  name: string;
  level: GeoLevel;
  lat: number;
  lng: number;
  zoom: number;
  stats: DemoStats;
  children?: string[];  // child IDs
}

export const GEO_NODES: Record<string, GeoNode> = {
  // ── COUNTRY ──────────────────────────────────────────────────
  'india': {
    id: 'india', name: 'India', level: 'country',
    lat: 20.5937, lng: 78.9629, zoom: 4,
    stats: { voters: 970000000, turnout: 67.4, leadParty: 'BJP', leadMargin: 8.2, sentiment: 61, riskScore: 34, boothsCovered: 1042000, fieldAgents: 14700, issueTop: 'Economy', issueScore: 74 },
    children: ['delhi', 'tamilnadu', 'karnataka', 'maharashtra', 'andhra', 'telangana', 'up', 'gujarat'],
  },

  // ── STATES ───────────────────────────────────────────────────
  'delhi': {
    id: 'delhi', name: 'Delhi', level: 'state',
    lat: 28.7041, lng: 77.1025, zoom: 9,
    stats: { voters: 14700000, turnout: 63.1, leadParty: 'AAP', leadMargin: 11.4, sentiment: 58, riskScore: 47, boothsCovered: 13033, fieldAgents: 830, issueTop: 'Pollution', issueScore: 82 },
    children: ['north-west-delhi', 'new-delhi-pc', 'east-delhi', 'chandni-chowk', 'north-east-delhi', 'west-delhi', 'south-delhi'],
  },
  'tamilnadu': {
    id: 'tamilnadu', name: 'Tamil Nadu', level: 'state',
    lat: 11.1271, lng: 78.6569, zoom: 7,
    stats: { voters: 61000000, turnout: 72.3, leadParty: 'DMK', leadMargin: 14.7, sentiment: 67, riskScore: 28, boothsCovered: 68000, fieldAgents: 2100, issueTop: 'Water', issueScore: 78 },
    children: ['chennai-central', 'chennai-south', 'coimbatore', 'madurai', 'trichy'],
  },
  'karnataka': {
    id: 'karnataka', name: 'Karnataka', level: 'state',
    lat: 15.3173, lng: 75.7139, zoom: 7,
    stats: { voters: 53000000, turnout: 70.2, leadParty: 'INC', leadMargin: 5.9, sentiment: 54, riskScore: 51, boothsCovered: 58000, fieldAgents: 1900, issueTop: 'Jobs', issueScore: 71 },
    children: ['bangalore-south', 'bangalore-north', 'mysore', 'hubli'],
  },
  'maharashtra': {
    id: 'maharashtra', name: 'Maharashtra', level: 'state',
    lat: 19.7515, lng: 75.7139, zoom: 7,
    stats: { voters: 91000000, turnout: 61.4, leadParty: 'MVA', leadMargin: 3.1, sentiment: 49, riskScore: 63, boothsCovered: 102000, fieldAgents: 3200, issueTop: 'Farmers', issueScore: 79 },
    children: ['mumbai-north', 'mumbai-south', 'pune', 'nagpur'],
  },
  'andhra': {
    id: 'andhra', name: 'Andhra Pradesh', level: 'state',
    lat: 15.9129, lng: 79.7400, zoom: 7,
    stats: { voters: 39000000, turnout: 79.1, leadParty: 'YSRCP', leadMargin: 18.2, sentiment: 62, riskScore: 39, boothsCovered: 47000, fieldAgents: 1600, issueTop: 'Infrastructure', issueScore: 68 },
    children: ['visakhapatnam', 'tirupati', 'vijayawada', 'araku'],
  },
  'telangana': {
    id: 'telangana', name: 'Telangana', level: 'state',
    lat: 18.1124, lng: 79.0193, zoom: 7,
    stats: { voters: 31000000, turnout: 64.7, leadParty: 'INC', leadMargin: 6.8, sentiment: 57, riskScore: 44, boothsCovered: 36000, fieldAgents: 1200, issueTop: 'Unemployment', issueScore: 73 },
    children: ['hyderabad', 'secunderabad', 'warangal'],
  },
  'up': {
    id: 'up', name: 'Uttar Pradesh', level: 'state',
    lat: 26.8467, lng: 80.9462, zoom: 7,
    stats: { voters: 153000000, turnout: 59.1, leadParty: 'SP', leadMargin: 2.4, sentiment: 44, riskScore: 72, boothsCovered: 177000, fieldAgents: 5100, issueTop: 'Crime', issueScore: 68 },
    children: ['lucknow', 'varanasi', 'agra', 'kanpur'],
  },
  'gujarat': {
    id: 'gujarat', name: 'Gujarat', level: 'state',
    lat: 22.2587, lng: 71.1924, zoom: 7,
    stats: { voters: 47000000, turnout: 68.4, leadParty: 'BJP', leadMargin: 22.1, sentiment: 69, riskScore: 22, boothsCovered: 55000, fieldAgents: 1700, issueTop: 'Industry', issueScore: 66 },
    children: ['ahmedabad-east', 'surat', 'vadodara'],
  },

  // ── PARLIAMENTARY CONSTITUENCIES ──────────────────────────────
  'north-west-delhi': {
    id: 'north-west-delhi', name: 'North West Delhi', level: 'parliamentary',
    lat: 28.7495, lng: 77.0756, zoom: 11,
    stats: { voters: 2487000, turnout: 61.2, leadParty: 'BJP', leadMargin: 9.3, sentiment: 55, riskScore: 49, boothsCovered: 2198, fieldAgents: 142, issueTop: 'Water', issueScore: 77 },
    children: ['rohini-ac', 'shalimar-bagh-ac', 'bawana-ac'],
  },
  'new-delhi-pc': {
    id: 'new-delhi-pc', name: 'New Delhi', level: 'parliamentary',
    lat: 28.6139, lng: 77.2090, zoom: 12,
    stats: { voters: 1640000, turnout: 59.7, leadParty: 'AAP', leadMargin: 13.6, sentiment: 61, riskScore: 42, boothsCovered: 1463, fieldAgents: 95, issueTop: 'Pollution', issueScore: 85 },
    children: ['new-delhi-ac', 'patel-nagar-ac', 'rajinder-nagar-ac'],
  },
  'chennai-central': {
    id: 'chennai-central', name: 'Chennai Central', level: 'parliamentary',
    lat: 13.0827, lng: 80.2707, zoom: 11,
    stats: { voters: 1490000, turnout: 68.4, leadParty: 'DMK', leadMargin: 17.2, sentiment: 64, riskScore: 31, boothsCovered: 1320, fieldAgents: 88, issueTop: 'Healthcare', issueScore: 72 },
    children: ['mylapore-ac', 'velachery-ac', 'harbour-ac'],
  },
  'bangalore-south': {
    id: 'bangalore-south', name: 'Bangalore South', level: 'parliamentary',
    lat: 12.8999, lng: 77.6010, zoom: 11,
    stats: { voters: 1820000, turnout: 64.1, leadParty: 'BJP', leadMargin: 6.7, sentiment: 59, riskScore: 45, boothsCovered: 1620, fieldAgents: 110, issueTop: 'Traffic', issueScore: 88 },
    children: ['jayanagar-ac', 'btm-layout-ac', 'bommanahalli-ac'],
  },
  'mumbai-north': {
    id: 'mumbai-north', name: 'Mumbai North', level: 'parliamentary',
    lat: 19.2183, lng: 72.9781, zoom: 11,
    stats: { voters: 1970000, turnout: 57.8, leadParty: 'ShivSena(UBT)', leadMargin: 4.1, sentiment: 46, riskScore: 61, boothsCovered: 1754, fieldAgents: 120, issueTop: 'Housing', issueScore: 81 },
    children: ['borivali-ac', 'dahisar-ac', 'kandivali-west-ac'],
  },
  'hyderabad': {
    id: 'hyderabad', name: 'Hyderabad', level: 'parliamentary',
    lat: 17.3850, lng: 78.4867, zoom: 11,
    stats: { voters: 1580000, turnout: 52.3, leadParty: 'AIMIM', leadMargin: 28.7, sentiment: 48, riskScore: 55, boothsCovered: 1405, fieldAgents: 96, issueTop: 'Water', issueScore: 74 },
    children: ['charminar-ac', 'chandrayangutta-ac', 'yakutpura-ac'],
  },
  'visakhapatnam': {
    id: 'visakhapatnam', name: 'Visakhapatnam', level: 'parliamentary',
    lat: 17.6868, lng: 83.2185, zoom: 11,
    stats: { voters: 1670000, turnout: 75.4, leadParty: 'YSRCP', leadMargin: 15.3, sentiment: 63, riskScore: 36, boothsCovered: 1488, fieldAgents: 102, issueTop: 'Industry', issueScore: 65 },
    children: ['vizag-north-ac', 'vizag-east-ac'],
  },
  'tirupati': {
    id: 'tirupati', name: 'Tirupati', level: 'parliamentary',
    lat: 13.6288, lng: 79.4192, zoom: 11,
    stats: { voters: 1410000, turnout: 81.2, leadParty: 'YSRCP', leadMargin: 20.1, sentiment: 66, riskScore: 29, boothsCovered: 1253, fieldAgents: 87, issueTop: 'Pilgrimage', issueScore: 60 },
    children: ['tirupati-ac', 'srikalahasti-ac'],
  },

  // ── ASSEMBLY CONSTITUENCIES ──────────────────────────────────
  'rohini-ac': {
    id: 'rohini-ac', name: 'Rohini', level: 'assembly',
    lat: 28.7488, lng: 77.0735, zoom: 13,
    stats: { voters: 187000, turnout: 62.4, leadParty: 'BJP', leadMargin: 11.2, sentiment: 56, riskScore: 46, boothsCovered: 166, fieldAgents: 18, issueTop: 'Water', issueScore: 79 },
    children: ['rohini-dist'],
  },
  'shalimar-bagh-ac': {
    id: 'shalimar-bagh-ac', name: 'Shalimar Bagh', level: 'assembly',
    lat: 28.7143, lng: 77.1685, zoom: 13,
    stats: { voters: 143000, turnout: 60.7, leadParty: 'AAP', leadMargin: 7.9, sentiment: 61, riskScore: 43, boothsCovered: 127, fieldAgents: 14, issueTop: 'Sewage', issueScore: 71 },
    children: ['north-dist'],
  },
  'mylapore-ac': {
    id: 'mylapore-ac', name: 'Mylapore', level: 'assembly',
    lat: 13.0334, lng: 80.2611, zoom: 13,
    stats: { voters: 168000, turnout: 71.2, leadParty: 'ADMK', leadMargin: 4.3, sentiment: 58, riskScore: 52, boothsCovered: 149, fieldAgents: 16, issueTop: 'Roads', issueScore: 68 },
    children: ['chennnai-south-dist'],
  },
  'velachery-ac': {
    id: 'velachery-ac', name: 'Velachery', level: 'assembly',
    lat: 12.9784, lng: 80.2207, zoom: 13,
    stats: { voters: 201000, turnout: 70.8, leadParty: 'DMK', leadMargin: 19.1, sentiment: 67, riskScore: 27, boothsCovered: 178, fieldAgents: 21, issueTop: 'Flooding', issueScore: 84 },
    children: ['velachery-dist'],
  },
  'jayanagar-ac': {
    id: 'jayanagar-ac', name: 'Jayanagar', level: 'assembly',
    lat: 12.9250, lng: 77.5938, zoom: 13,
    stats: { voters: 224000, turnout: 66.3, leadParty: 'BJP', leadMargin: 8.4, sentiment: 62, riskScore: 40, boothsCovered: 199, fieldAgents: 24, issueTop: 'Traffic', issueScore: 87 },
    children: ['south-dist'],
  },
  'araku': {
    id: 'araku', name: 'Araku', level: 'assembly',
    lat: 18.3273, lng: 82.8750, zoom: 13,
    stats: { voters: 134000, turnout: 83.6, leadParty: 'YSRCP', leadMargin: 24.7, sentiment: 71, riskScore: 24, boothsCovered: 119, fieldAgents: 12, issueTop: 'Tribal Rights', issueScore: 76 },
    children: ['vizag-dist'],
  },
};

// ── SEARCH INDEX ─────────────────────────────────────────────
export const SEARCH_INDEX: { id: string; name: string; level: GeoLevel }[] = Object.values(GEO_NODES).map(n => ({
  id: n.id, name: n.name, level: n.level,
}));

// ── SENTIMENT TREND DATA ─────────────────────────────────────
export const SENTIMENT_TREND = [
  { month: 'Feb', pro: 51, anti: 28, neutral: 21 },
  { month: 'Mar', pro: 54, anti: 26, neutral: 20 },
  { month: 'Apr', pro: 58, anti: 24, neutral: 18 },
  { month: 'May', pro: 55, anti: 27, neutral: 18 },
  { month: 'Jun', pro: 61, anti: 22, neutral: 17 },
  { month: 'Jul', pro: 63, anti: 20, neutral: 17 },
];

// ── VOTER DEMOGRAPHICS ───────────────────────────────────────
export const VOTER_DEMOGRAPHICS = [
  { group: '18-25', value: 18 },
  { group: '26-35', value: 24 },
  { group: '36-50', value: 31 },
  { group: '51-65', value: 17 },
  { group: '65+',   value: 10 },
];

// ── PARTY VOTE SHARE ─────────────────────────────────────────
export const PARTY_VOTE_SHARE = [
  { party: 'Party A', share: 38.4 },
  { party: 'Party B', share: 27.1 },
  { party: 'Party C', share: 18.6 },
  { party: 'Others',  share: 15.9 },
];

// ── ISSUE HEATMAP ────────────────────────────────────────────
export const ISSUE_HEATMAP = [
  { issue: 'Economy',       score: 74, trend: '+3' },
  { issue: 'Healthcare',    score: 68, trend: '+1' },
  { issue: 'Pollution',     score: 82, trend: '+6' },
  { issue: 'Jobs',          score: 71, trend: '-2' },
  { issue: 'Corruption',    score: 65, trend: '+4' },
  { issue: 'Infrastructure',score: 59, trend: '+2' },
  { issue: 'Water',         score: 77, trend: '+5' },
  { issue: 'Security',      score: 62, trend: '-1' },
];

// ── LIVE INTEL FEED ──────────────────────────────────────────
export interface FeedEvent {
  id: string;
  time: string;
  type: 'alert' | 'intel' | 'field' | 'analysis';
  location: string;
  message: string;
  priority: 'HIGH' | 'MED' | 'LOW';
}

export const LIVE_FEED: FeedEvent[] = [
  { id: 'f1', time: '09:42', type: 'alert',    location: 'North West Delhi',  message: 'Voter suppression attempt reported in Booth #142. Field team dispatched.', priority: 'HIGH' },
  { id: 'f2', time: '09:38', type: 'intel',    location: 'Chennai Central',   message: 'DMK ground team mobilising 12,000 volunteers for GOTV push.', priority: 'MED' },
  { id: 'f3', time: '09:31', type: 'field',    location: 'Bangalore South',   message: 'Jayanagar booth coverage at 92%. 3 booths below 60% threshold flagged.', priority: 'MED' },
  { id: 'f4', time: '09:24', type: 'analysis', location: 'Hyderabad',         message: 'Sentiment spike (+8 pts) following candidate rally at Nampally.', priority: 'LOW' },
  { id: 'f5', time: '09:17', type: 'alert',    location: 'Mumbai North',      message: 'Opposition leaflet campaign detected in Borivali West — counter-narrative deployed.', priority: 'HIGH' },
  { id: 'f6', time: '09:09', type: 'field',    location: 'Araku',             message: 'Tribal voter outreach: 87% registration confirmed in 34 villages.', priority: 'LOW' },
  { id: 'f7', time: '09:02', type: 'intel',    location: 'Visakhapatnam',     message: 'Social-media narrative analysis shows 64% positive framing for candidate.', priority: 'MED' },
  { id: 'f8', time: '08:55', type: 'analysis', location: 'Delhi',             message: 'Pollution narrative surging — recommendation: increase environment messaging.', priority: 'LOW' },
  { id: 'f9', time: '08:48', type: 'alert',    location: 'Tirupati',          message: 'Booth agents report EVM mismatch in sector 7. Legal team alerted.', priority: 'HIGH' },
  { id: 'f10',time: '08:40', type: 'field',    location: 'Rohini',            message: 'Door-to-door campaign completed: 74% households reached.', priority: 'LOW' },
];

// ── FIELD OPERATIONS KPIs ────────────────────────────────────
export const FIELD_KPIs = [
  { label: 'Booths Covered',    value: '94.2%',  icon: '🗳️',  color: '#00D4FF' },
  { label: 'Field Agents',      value: '14,700', icon: '👥',  color: '#00FF88' },
  { label: 'GOTV Messages Sent',value: '2.4M',   icon: '📱',  color: '#FFD700' },
  { label: 'Sentiment Score',   value: '63/100', icon: '📊',  color: '#A78BFA' },
];

// ── RISK MATRIX ───────────────────────────────────────────────
export const RISK_MATRIX = [
  { zone: 'Critical', count: 12, color: '#FF4444' },
  { zone: 'High',     count: 34, color: '#FF8C00' },
  { zone: 'Medium',   count: 89, color: '#FFD700' },
  { zone: 'Low',      count: 247,color: '#00FF88' },
];

export const TURNOUT_FORECAST = [
  { time: '7AM',  actual: 8,  forecast: 9 },
  { time: '9AM',  actual: 22, forecast: 24 },
  { time: '11AM', actual: 38, forecast: 41 },
  { time: '1PM',  actual: 51, forecast: 55 },
  { time: '3PM',  actual: 63, forecast: 68 },
  { time: '5PM',  actual: 71, forecast: 78 },
  { time: '6PM',  actual: null, forecast: 84 },
];
