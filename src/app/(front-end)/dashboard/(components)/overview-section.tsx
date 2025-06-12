import OverviewCard from "./card-overview";

const OverviewCardData = [
  {
    title: "Total Book",
    count: 123,
    percentage: 32,
    backgroundColor: "#e0f2f7", // Light blue
    textColor: "#0d47a1", // Dark blue
  },
  {
    title: "Total User",
    count: 23,
    percentage: 12,
    backgroundColor: "#e8f5e9", // Light green
    textColor: "#1b5e20", // Dark green
  },
  {
    title: "Total Teacher",
    count: 143,
    percentage: 62,
    backgroundColor: "#fff3e0", // Light orange
    textColor: "#e65100", // Dark orange
  },
  {
    id: 3,
    title: "Total Student",
    count: 153,
    percentage: 42,
    backgroundColor: "#fbe9e7", // Light red/pink
    textColor: "#b71c1c", // Dark red
  },
];

const OverviewSection = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {OverviewCardData.map((card, index) => (
        <OverviewCard
          key={index}
          title={card.title}
          count={card.count}
          percentage={card.percentage}
          backgroundColor={card.backgroundColor}
          textColor={card.textColor}
        />
      ))}
    </div>
  );
};

export default OverviewSection;
