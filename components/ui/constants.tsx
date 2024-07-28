import { CircleCheck, CircleIcon, CircleX, Check, X } from "lucide-react";

export const statuses = [
  {
    value: "unPublic",
    label: "Nie publiczny",
    icon: CircleIcon,
  },
  {
    value: "public",
    label: "Publiczny",
    icon: CircleCheck,
  },
  {
    value: "canceled",
    label: "Wycofany",
    icon: CircleX,
  },
];

export const booleans = [
  {
    value: "true",
    label: "Tak",
    icon: Check,
  },
  {
    value: "false",
    label: "Nie",
    icon: X,
  },
];
