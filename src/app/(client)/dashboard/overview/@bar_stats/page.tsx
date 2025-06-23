import { BarGraph } from "../../(components)/bar-graph";

// Simple delay function
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function BarStats() {
  await await delay(1000);
  return <BarGraph />;
}
