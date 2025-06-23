import { RecentSales } from "../../(components)/recent-sales";

// Simple delay function
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}
