"use client";

import { useSearchParams } from "next/navigation";
import WhatsAppWidget from "./WhatsAppWidget";

export default function WhatsAppWidgetPage() {
  const searchParams = useSearchParams();

  return (
    <WhatsAppWidget
      ndid={searchParams.get("ndid") || ""}
      hid={searchParams.get("hid") || ""}
      phoneNumber={searchParams.get("phoneNumber") || ""}
      welcomeMessage={searchParams.get("message") || ""}
    />
  );
}
