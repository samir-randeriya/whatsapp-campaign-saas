export type TemplateStatus = "approved" | "pending" | "rejected";
export type TemplateCategory = "marketing" | "utility" | "authentication";
export type TemplateType = "text" | "image" | "button" | "carousel";

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  type: TemplateType;
  status: TemplateStatus;
  language: string;
  createdDate: string;
  header?: string;
  body: string;
  footer?: string;
  buttons?: string[];
  headerImage?: string;
}

export const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Welcome Message",
    category: "marketing",
    type: "text",
    status: "approved",
    language: "English",
    createdDate: "2026-03-10",
    body: "👋 Welcome to {{brand}}, {{name}}! We're thrilled to have you on board. Explore our latest features and get started today.",
    footer: "Reply STOP to unsubscribe",
  },
  {
    id: "2",
    name: "Order Confirmation",
    category: "utility",
    type: "button",
    status: "approved",
    language: "English",
    createdDate: "2026-03-12",
    header: "Order Confirmed ✅",
    body: "Hi {{name}}, your order #{{order_id}} has been confirmed and is being processed. Expected delivery: {{date}}.",
    footer: "Thank you for shopping with us!",
    buttons: ["Track Order", "Contact Support"],
  },
  {
    id: "3",
    name: "Flash Sale Alert",
    category: "marketing",
    type: "image",
    status: "pending",
    language: "English",
    createdDate: "2026-03-18",
    header: "🔥 Flash Sale — 48 Hours Only!",
    body: "Hey {{name}}! Don't miss out on our biggest sale of the year. Up to 50% off on selected items. Shop now before it's gone!",
    footer: "Offer valid until {{date}}",
    buttons: ["Shop Now"],
  },
  {
    id: "4",
    name: "OTP Verification",
    category: "authentication",
    type: "text",
    status: "approved",
    language: "English",
    createdDate: "2026-03-08",
    body: "Your verification code is {{otp}}. This code expires in 10 minutes. Do not share this code with anyone.",
  },
  {
    id: "5",
    name: "Appointment Reminder",
    category: "utility",
    type: "button",
    status: "approved",
    language: "English",
    createdDate: "2026-03-20",
    header: "Upcoming Appointment 📅",
    body: "Hi {{name}}, this is a reminder for your appointment on {{date}} at {{time}}. Please arrive 10 minutes early.",
    buttons: ["Confirm", "Reschedule"],
  },
  {
    id: "6",
    name: "Feedback Request",
    category: "marketing",
    type: "button",
    status: "rejected",
    language: "English",
    createdDate: "2026-03-14",
    body: "Hi {{name}}, we'd love to hear about your experience! Your feedback helps us serve you better.",
    buttons: ["Leave Review", "Not Now"],
  },
  {
    id: "7",
    name: "Shipping Update",
    category: "utility",
    type: "text",
    status: "pending",
    language: "Spanish",
    createdDate: "2026-03-22",
    body: "Hola {{name}}, tu pedido #{{order_id}} ha sido enviado. Número de seguimiento: {{tracking}}. Entrega estimada: {{date}}.",
    footer: "Gracias por tu compra",
  },
  {
    id: "8",
    name: "Seasonal Promo",
    category: "marketing",
    type: "carousel",
    status: "pending",
    language: "English",
    createdDate: "2026-03-25",
    header: "Spring Collection 🌸",
    body: "Hey {{name}}, our new Spring Collection just dropped! Swipe through to discover fresh styles curated just for you.",
    buttons: ["View Collection", "Shop All"],
  },
];
