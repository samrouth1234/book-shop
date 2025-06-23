import { AreaGraph } from "../../(components)/area-graph";

// Simple delay function
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function AreaStats() {
  await delay(2000);
  return <AreaGraph />;
}
