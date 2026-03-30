export type MessageDirection = "inbound" | "outbound";

export type MessageStatus = "delivered" | "read" | "sent" | "failed";

export interface MessageLog {
  id: string;
  contact: string;
  phone: string;
  direction: MessageDirection;
  preview: string;
  status: MessageStatus;
  time: string;
}

export const mockMessages: MessageLog[] = [
  {
    id: "1",
    contact: "Alex Rivera",
    phone: "+1 555-0142",
    direction: "inbound",
    preview: "Hi, is the spring sale still running this weekend?",
    status: "read",
    time: "2026-03-28T09:12:00",
  },
  {
    id: "2",
    contact: "Jordan Lee",
    phone: "+1 555-0198",
    direction: "outbound",
    preview: "Your order #4821 has shipped. Track it here: …",
    status: "delivered",
    time: "2026-03-28T08:45:00",
  },
  {
    id: "3",
    contact: "Sam Patel",
    phone: "+1 555-0167",
    direction: "inbound",
    preview: "STOP",
    status: "read",
    time: "2026-03-27T18:22:00",
  },
  {
    id: "4",
    contact: "Taylor Morgan",
    phone: "+1 555-0133",
    direction: "outbound",
    preview: "Reminder: your appointment is tomorrow at 2 PM.",
    status: "sent",
    time: "2026-03-27T14:05:00",
  },
  {
    id: "5",
    contact: "Casey Nguyen",
    phone: "+1 555-0109",
    direction: "outbound",
    preview: "Flash sale ends tonight — 20% off with code SAVE20",
    status: "failed",
    time: "2026-03-27T11:30:00",
  },
  {
    id: "6",
    contact: "Riley Chen",
    phone: "+1 555-0188",
    direction: "inbound",
    preview: "Thanks, received the confirmation!",
    status: "read",
    time: "2026-03-26T16:40:00",
  },
];
