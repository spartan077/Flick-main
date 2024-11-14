'use client';

import * as React from 'react';
import {
  Line as RechartsLine,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from 'recharts';

import { cn } from '@/lib/utils';

const Chart = ResponsiveContainer;

// Line Chart Components
const LineChart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsLineChart> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <RechartsLineChart className={cn("", className)} {...props}>
    {children}
  </RechartsLineChart>
));
LineChart.displayName = "LineChart";

// Bar Chart Components
const BarChart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsBarChart> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <RechartsBarChart className={cn("", className)} {...props}>
    {children}
  </RechartsBarChart>
));
BarChart.displayName = "BarChart";

// Line Component
const Line = ({
  className,
  ...props
}: Omit<React.ComponentProps<typeof RechartsLine>, 'ref'>) => (
  <RechartsLine className={cn("", className)} {...props} />
);
Line.displayName = "Line";

// Bar Component
const Bar = ({
  className,
  ...props
}: Omit<React.ComponentProps<typeof RechartsBar>, 'ref'>) => (
  <RechartsBar className={cn("", className)} {...props} />
);
Bar.displayName = "Bar";

// XAxis Component
const XAxis = ({
  ...props
}: Omit<React.ComponentProps<typeof RechartsXAxis>, 'ref'>) => (
  <RechartsXAxis {...props} />
);
XAxis.displayName = "XAxis";

// YAxis Component
const YAxis = ({
  ...props
}: Omit<React.ComponentProps<typeof RechartsYAxis>, 'ref'>) => (
  <RechartsYAxis {...props} />
);
YAxis.displayName = "YAxis";

// CartesianGrid Component
const CartesianGrid = ({
  ...props
}: Omit<React.ComponentProps<typeof RechartsCartesianGrid>, 'ref'>) => (
  <RechartsCartesianGrid {...props} />
);
CartesianGrid.displayName = "CartesianGrid";

// Tooltip Component
const Tooltip = ({
  ...props
}: Omit<React.ComponentProps<typeof RechartsTooltip>, 'ref'>) => (
  <RechartsTooltip {...props} />
);
Tooltip.displayName = "Tooltip";

// Legend Component
const Legend = ({
  ...props
}: Omit<React.ComponentProps<typeof RechartsLegend>, 'ref'>) => (
  <RechartsLegend {...props} />
);
Legend.displayName = "Legend";

export {
  Chart,
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
};
