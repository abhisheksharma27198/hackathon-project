import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Shield, Key, Fingerprint } from "lucide-react";
import ApiKeyModal from "./ApiKeyModal.jsx";
import { getApiKey } from "../services/nemotron.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/sockpuppet-hunter", label: "Troll Hunter", isNew: true },
  { to: "/analyze", label: "Analyze" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/reports", label: "Reports" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const hasKey = Boolean(getApiKey());

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark">
              <Shield size={18} />
            </span>
            <div className="brand-title-wrap">
              <span className="brand-title">Nemotron Shield</span>
              <span className="brand-subtitle">AI Forensics on Nebius</span>
            </div>
          </NavLink>

          <nav className="nav-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
                {link.isNew && <span className="nav-pill-new">NEW</span>}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className={`btn-api-key ${hasKey ? "connected" : ""}`}
              onClick={() => setModalOpen(true)}
              title="Configure Nebius Token Factory API Key"
            >
              <Key size={14} />
              <span>{hasKey ? "Nebius Key: Connected" : "Nebius Key"}</span>
            </button>
          </div>
        </div>
      </header>

      <ApiKeyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
