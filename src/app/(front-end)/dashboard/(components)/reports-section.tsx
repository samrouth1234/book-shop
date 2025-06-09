"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import CartBar from "./chart-bar";
import ChartLineDosts from "./chart-line-dosts";
import { allChartData } from "./data-all-chart";
import ChartBarStacked from "./chart-bar-stacked";

type YearType =
  | "2020"
  | "2021"
  | "2022"
  | "2023"
  | "2024"
  | "2025"
  | "2026"
  | "2027";

const ReportsSection = () => {
  const [selectedYear, setSelectedYear] = useState<YearType>("2024");

  const currentChartData = allChartData[selectedYear] || {
    lineChart: [],
    barChart: [],
  };

  return (
    <div>
      <section className="flex justify-between">
        {/* Search of year report */}
        <section>
          <Select
            value={selectedYear}
            onValueChange={(year) => setSelectedYear(year as YearType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an year" />
            </SelectTrigger>
            <SelectContent>
              <SelectContent>
                {Object.keys(allChartData).map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectContent>
          </Select>
        </section>
        <section>
          <Tabs defaultValue="average">
            <TabsList>
              <TabsTrigger value="average">Average</TabsTrigger>
              <TabsTrigger value="sum">Sum</TabsTrigger>
            </TabsList>
            <TabsContent value="average"></TabsContent>
            <TabsContent value="sum"></TabsContent>
          </Tabs>
        </section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <section>
          <CartBar chartData={currentChartData.barChart} />
        </section>
        <section>
          <ChartLineDosts chartData={currentChartData.lineChart} />
        </section>
        <section>
          <ChartBarStacked chartData={currentChartData.lineChart} />
        </section>
      </section>
    </div>
  );
};

export default ReportsSection;
