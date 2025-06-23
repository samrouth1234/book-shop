import { PieGraph } from "../../(components)/pie-graph";

// Simple delay function
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Stats() {
  await delay(1000);
  return <PieGraph />;
}
