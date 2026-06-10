"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WhatsAppWidget from "./WhatsAppWidget";

function WidgetContent() {
  const searchParams = useSearchParams();

  return (
    <WhatsAppWidget
      ndid={searchParams.get("ndid") || ""}
      hid={searchParams.get("hid") || ""}
      phoneNumber={searchParams.get("phoneNumber") || ""}
      welcomeMessage={searchParams.get("message") || ""}
      pageUrl={searchParams.get("pageUrl") || ""}
      pathName={searchParams.get("pathName") || ""}
    />
  );
}

export default function WhatsAppWidgetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WidgetContent />
    </Suspense>
  );
}
