import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

export async function getZones() {
  const snapshot = await getDocs(collection(db, "riskZones"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getReports() {
  const snapshot = await getDocs(collection(db, "fieldReports"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getZonesByRisk(level) {
  const q = query(collection(db, "riskZones"), where("riskLevel", "==", level));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}