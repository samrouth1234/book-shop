import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import clsx from "clsx";
import { TrendingDown, TrendingUp } from "lucide-react";

interface CardRecentProps {
  title: string;
  count: number;
  percentage: number;
  backgroundColor?: string;
  textColor?: string;
}

export default function CardRecent({
  title,
  count,
  backgroundColor,
  textColor,
  percentage,
}: CardRecentProps) {
  return (
    <Card className="@container/card" style={{ backgroundColor }}>
      <CardHeader>
        <CardDescription>{title ?? "Title Uknow"}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          ${count ?? "Count Uknow"}
        </CardTitle>
        <CardAction>
          <Badge
            variant="outline"
            style={{ color: textColor }}
            className={clsx({
              "text-green-500": percentage > 0,
              "text-red-500": percentage < 0,
            })}
          >
            {percentage >= 0 ? <TrendingUp /> : <TrendingDown />}
            {percentage >= 0 ? "+" : ""}
            {percentage ?? "Percentage Unknown"}%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
