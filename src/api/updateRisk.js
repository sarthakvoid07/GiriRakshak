import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getZones } from "../firebase/reads";
import { getRainfall } from "./weather";

function calculateRisk(riskScore, rain3day) {
  const combined = riskScore * (rain3day / 100);
  if (combined >= 0.5) return "severe";
  if (combined >= 0.3) return "high";
  if (combined >= 0.15) return "moderate";
  return "low";
}

export async function refreshAllZones() {
  const zones = await getZones();

  for (const zone of zones) {
    const weather = await getRainfall(zone.latitude, zone.longitude);
    const rain3day = weather.rainLastHour * 24 * 3;   // placeholder estimate
    const riskLevel = calculateRisk(zone.riskScore, rain3day);

    await updateDoc(doc(db, "riskZones", zone.id), {
      rainfall3day: Math.round(rain3day * 10) / 10,
      riskLevel: riskLevel,
      updatedAt: new Date().toISOString(),
    });

    console.log(`${zone.district}: ${rain3day.toFixed(1)}mm → ${riskLevel}`);
  }

  return zones.length;
}