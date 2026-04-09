export type SummaryTile = {
  title: string;
  value: string;
  tone?: "default" | "success";
};

export type EscalationTile = {
  title: string;
  count: string;
  note: string;
  cardClass: string;
  titleClass: string;
  countClass: string;
  noteClass: string;
};

export type QuickAction = {
  label: string;
  href: string;
  className: string;
};

export type QueueCard = {
  title: string;
  subtitle: string;
  tag: string;
  count: string;
  amount: string;
  description: string;
  href: string;
  borderClass: string;
  tagClass: string;
  subtitleClass: string;
};