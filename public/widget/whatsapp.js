(function () {
  const config = window.eazbotConfig || {};

  const {
    ndid,
    hid,
    phoneNumber,
    message,
    position = "right",
    bottom = 20,
    top = null,
  } = config;

  if (!ndid || !hid) {
    console.error("Eazbot: ndid and hid are required");
    return;
  }

  const iframe = document.createElement("iframe");

  const params = new URLSearchParams({
    ndid,
    hid,
    phoneNumber,
    message,
    pageUrl: window.location.href,
    hostname: window.location.hostname,
    pathname: window.location.pathname,
  });

  iframe.src = `https://whatsapp-widget-tau.vercel.app?${params.toString()}`;

  // iframe.src = `http://localhost:3001?${params.toString()}`;

  iframe.style.position = "fixed";

  // Position
  if (position === "left") {
    iframe.style.left = "20px";
  } else {
    iframe.style.right = "20px";
  }

  // Top / Bottom
  if (top !== null && top !== undefined) {
    iframe.style.top = `${top}px`;
  } else {
    iframe.style.bottom = `${bottom}px`;
  }

  iframe.style.width = "80px";
  iframe.style.height = "80px";
  iframe.style.border = "none";
  iframe.style.background = "transparent";
  iframe.style.zIndex = "999999";

  window.addEventListener("message", (event) => {
    if (event.data?.type === "EAZBOT_RESIZE") {
      iframe.style.width = `${event.data.width}px`;
      iframe.style.height = `${event.data.height}px`;
    }
  });

  document.body.appendChild(iframe);
})();

// (function () {
//   const config = window.eazbotConfig || {};

//   const { ndid, hid, phoneNumber, message } = config;

//   if (!ndid || !hid) {
//     console.error("Eazbot: ndid and hid are required");
//     return;
//   }

//   const iframe = document.createElement("iframe");

//   const params = new URLSearchParams({
//     ndid,
//     hid,
//     phoneNumber,
//     message,
//     pageUrl: window.location.href,
//     hostname: window.location.hostname,
//     pathname: window.location.pathname,
//   });

//   // iframe.src = `https://whatsapp-widget-tau.vercel.app?${params.toString()}`;
//   iframe.src = `http://localhost:3001?${params.toString()}`;

//   iframe.style.position = "fixed";
//   iframe.style.bottom = "20px";
//   iframe.style.right = "20px";
//   iframe.style.width = "80px";
//   iframe.style.height = "80px";
//   iframe.style.border = "none";
//   iframe.style.background = "transparent";
//   iframe.style.zIndex = "999999";

//   window.addEventListener("message", (event) => {
//     if (event.data?.type === "EAZBOT_RESIZE") {
//       iframe.style.width = `${event.data.width}px`;
//       iframe.style.height = `${event.data.height}px`;
//     }
//   });

//   document.body.appendChild(iframe);
// })();
