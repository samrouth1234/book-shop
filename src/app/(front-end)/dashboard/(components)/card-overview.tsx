import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  count: number;
  percentage: number;
  backgroundColor?: string;
  textColor?: string;
}

export default function OverviewCard({
  title,
  count,
  backgroundColor,
  textColor,
  percentage,
}: OverviewCardProps) {
  return (
    <Card className="@container/card" style={{ backgroundColor }}>
      <CardHeader>
        <CardDescription>{title ?? "Title Uknow"}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {count ?? "Count Uknow"}
        </CardTitle>
        <CardAction style={{ color: textColor }}>
          +{percentage ?? "Percentage Uknow"}%
        </CardAction>
      </CardHeader>
    </Card>
  );
}
