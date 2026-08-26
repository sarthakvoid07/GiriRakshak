// dummyReports.js
// Temporary dummy data for fieldReports collection
// Field names match Part 1.4 of the plan exactly — do not rename
// F1, F2, F3: import this until Day 7, then swap to B2's getReports()

const dummyReports = [
  {
    id: "r1",
    reportType: "crack",
    description: "New crack across the hill road, 2 m long",
    photoUrl: "https://placehold.co/600x400?text=crack+1",
    latitude: 25.5788,
    longitude: 91.8933,
    district: "East Khasi Hills",
    severity: "high",
    status: "pending",
    reporterId: "user_demo_01",
    createdAt: "2026-08-19T08:30:00Z"
  },
  {
    id: "r2",
    reportType: "slope-movement",
    description: "Visible soil movement near the roadside embankment",
    photoUrl: "https://placehold.co/600x400?text=slope+2",
    latitude: 23.7271,
    longitude: 92.7176,
    district: "Aizawl",
    severity: "medium",
    status: "verified",
    reporterId: "user_demo_02",
    createdAt: "2026-08-19T09:15:00Z"
  },
  {
    id: "r3",
    reportType: "road-blocked",
    description: "Debris fully blocking the NH road after last night's rain",
    photoUrl: "https://placehold.co/600x400?text=blocked+3",
    latitude: 24.3333,
    longitude: 93.6833,
    district: "Churachandpur",
    severity: "high",
    status: "actioned",
    reporterId: "user_demo_03",
    createdAt: "2026-08-19T10:00:00Z"
  },
  {
    id: "r4",
    reportType: "debris",
    description: "Small rockfall debris scattered near the village entrance",
    photoUrl: "https://placehold.co/600x400?text=debris+4",
    latitude: 27.5859,
    longitude: 91.8594,
    district: "Tawang",
    severity: "medium",
    status: "pending",
    reporterId: "user_demo_04",
    createdAt: "2026-08-19T11:20:00Z"
  },
  {
    id: "r5",
    reportType: "crack",
    description: "Thin surface crack noticed along the retaining wall",
    photoUrl: "https://placehold.co/600x400?text=crack+5",
    latitude: 25.6751,
    longitude: 94.1086,
    district: "Kohima",
    severity: "low",
    status: "closed",
    reporterId: "user_demo_05",
    createdAt: "2026-08-19T12:05:00Z"
  },
  {
    id: "r6",
    reportType: "slope-movement",
    description: "Slight tilting of trees observed on the upper slope",
    photoUrl: "https://placehold.co/600x400?text=slope+6",
    latitude: 27.0844,
    longitude: 93.6053,
    district: "Papum Pare",
    severity: "medium",
    status: "verified",
    reporterId: "user_demo_06",
    createdAt: "2026-08-19T13:40:00Z"
  },
  {
    id: "r7",
    reportType: "road-blocked",
    description: "Landslide debris partially blocking one lane",
    photoUrl: "https://placehold.co/600x400?text=blocked+7",
    latitude: 24.8170,
    longitude: 93.9368,
    district: "Imphal East",
    severity: "high",
    status: "pending",
    reporterId: "user_demo_07",
    createdAt: "2026-08-19T14:10:00Z"
  },
  {
    id: "r8",
    reportType: "other",
    description: "Unusual water seepage spotted on the hillside",
    photoUrl: "https://placehold.co/600x400?text=other+8",
    latitude: 25.8167,
    longitude: 93.4333,
    district: "Karbi Anglong",
    severity: "low",
    status: "pending",
    reporterId: "user_demo_08",
    createdAt: "2026-08-19T15:25:00Z"
  },
  {
    id: "r9",
    reportType: "crack",
    description: "Long crack developing across a village access path",
    photoUrl: "https://placehold.co/600x400?text=crack+9",
    latitude: 27.3389,
    longitude: 88.6065,
    district: "East Sikkim",
    severity: "medium",
    status: "verified",
    reporterId: "user_demo_09",
    createdAt: "2026-08-19T16:00:00Z"
  },
  {
    id: "r10",
    reportType: "debris",
    description: "Debris pile from a minor slope failure near a culvert",
    photoUrl: "https://placehold.co/600x400?text=debris+10",
    latitude: 23.9833,
    longitude: 91.8667,
    district: "Dhalai",
    severity: "low",
    status: "actioned",
    reporterId: "user_demo_10",
    createdAt: "2026-08-19T17:30:00Z"
  }
];

export default dummyReports;