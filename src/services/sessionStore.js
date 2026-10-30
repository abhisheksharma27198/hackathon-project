/**
 * Session Store for Nemotron Shield
 * Tracks only user-generated live detections and reports in the current session.
 */

const STORAGE_KEY_DETECTIONS = "nemotron_session_detections";
const STORAGE_KEY_REPORTS = "nemotron_session_reports";

export function getSessionDetections() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_DETECTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addSessionDetection(item) {
  try {
    const current = getSessionDetections();
    const updated = [item, ...current];
    sessionStorage.setItem(STORAGE_KEY_DETECTIONS, JSON.stringify(updated));
    // Dispatch custom event so open views can update synchronously
    window.dispatchEvent(new Event("nemotron_session_updated"));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getSessionReports() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_REPORTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addSessionReport(report) {
  try {
    const current = getSessionReports();
    const updated = [report, ...current];
    sessionStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updated));
    window.dispatchEvent(new Event("nemotron_session_updated"));
    return updated;
  } catch (e) {
    return [];
  }
}

export function clearSessionData() {
  try {
    sessionStorage.removeItem(STORAGE_KEY_DETECTIONS);
    sessionStorage.removeItem(STORAGE_KEY_REPORTS);
    window.dispatchEvent(new Event("nemotron_session_updated"));
  } catch (e) {
    console.error("Failed to clear session data:", e);
  }
}
