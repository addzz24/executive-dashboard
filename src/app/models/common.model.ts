// Top-level stats
export interface StackChartModel {
  label: string;
  data: number[];
  backgroundColor: string;
  stack: string;
  barThickness: number;
}

export interface BubbleData {
  x: number;
  y: number;
  r: number;
}

export interface BubbleDataset {
  label: string;
  data: BubbleData[];
  backgroundColor: string;
}
