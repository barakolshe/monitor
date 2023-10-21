export interface LocationDistance {
  location: string;
  distances: Array<{
    from: string;
    distance: number;
  }>;
}
