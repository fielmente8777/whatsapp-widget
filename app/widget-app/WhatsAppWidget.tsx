"use client";
import { generateSessionId, generateVisitorId } from "@/utils/helper";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const BASE_URL = "http://localhost:8000";

interface WhatsAppWidgetProps {
  ndid: string;
  hid: string;
  phoneNumber: string;
  welcomeMessage?: string;
}

export default function WhatsAppWidget({
  ndid,
  hid,
  phoneNumber,
  welcomeMessage = "Hi 👋 How can we help you?",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTrackingPayload = (websiteId: string) => {
    const url = new URL(window.location.href);

    return {
      websiteId,
      visitorId: generateVisitorId(),
      sessionId: generateSessionId(),
      pageUrl: window.location.href,
      pathname: window.location.pathname,
      hostname: window.location.hostname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      utmSource: url.searchParams.get("utm_source"),
      utmMedium: url.searchParams.get("utm_medium"),
      utmCampaign: url.searchParams.get("utm_campaign"),
    };
  };

  const handleStartChat = async () => {
    try {
      console.log("aaya");
      // setLoading(true);

      const response = await fetch(`${BASE_URL}/api/v1/widget/click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ndid: ndid,
          hid: hid,
          pageUrl: window.location.href,
          message: welcomeMessage,
          phoneNumber: phoneNumber,
        }),
      });

      const data = await response.json();
      // const whatsappMessage = `${welcomeMessage} \n #${data?.result?.doc?.clickId}`;

      window.open(data?.result?.doc?.whatsappUrl, "_blank");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.parent.postMessage(
        {
          type: "EAZBOT_RESIZE",
          width: 360,
          height: 250,
        },
        "*",
      );
    } else {
      window.parent.postMessage(
        {
          type: "EAZBOT_RESIZE",
          width: 80,
          height: 80,
        },
        "*",
      );
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg cursor-pointer"
      >
        <FaWhatsapp size={28} />
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed bottom-24 md:right-6 z-50 w-80 rounded-xl border border-gray-300 bg-white p-4 shadow-2xl">
          <div className="mb-4">
            <h3 className="font-semibold">WhatsApp Support</h3>

            <p className="mt-1 text-sm text-gray-500">{welcomeMessage}</p>
          </div>

          <button
            onClick={handleStartChat}
            disabled={loading}
            className="w-full rounded-lg bg-green-500 px-4 py-3 text-white"
          >
            {loading ? "Opening..." : "Start Chat"}
          </button>
        </div>
      )}
    </>
  );
}
