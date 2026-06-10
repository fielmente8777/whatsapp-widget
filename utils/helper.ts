export const generateVisitorId = () => {
  let id = localStorage.getItem("wa_visitor_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("wa_visitor_id", id);
  }

  return id;
};

export const generateSessionId = () => {
  let id = sessionStorage.getItem("wa_session_id");

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("wa_session_id", id);
  }

  return id;
};
