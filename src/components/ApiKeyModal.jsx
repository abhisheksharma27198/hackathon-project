import { useState, useEffect } from "react";
import { getApiKey, setApiKey } from "../services/nemotron.js";
import { Key, Check, X, ExternalLink, ShieldCheck } from "lucide-react";

export default function ApiKeyModal({ isOpen, onClose }) {
  const [keyInput, setKeyInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKeyInput(getApiKey());
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(keyInput);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey("");
    setKeyInput("");
    setSaved(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Key size={20} className="text-accent" />
            <h3>Nebius Token Factory API Key</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body">
          <p className="muted font-sm">
            Enter your <strong>Nebius Token Factory API Key</strong> to run live inference against NVIDIA Nemotron models hosted on Nebius GPU clusters.
          </p>

          <div className="form-field">
            <label className="label">API Key (starts with <code>nkey-...</code> or Bearer token)</label>
            <input
              type="password"
              className="input font-mono"
              placeholder="Paste Nebius Token Factory key here..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
          </div>

          <div className="info-box-sm">
            <ShieldCheck size={16} className="text-accent" />
            <span>
              If left blank, Nemotron Shield runs in <strong>High-Fidelity Offline Demonstration Mode</strong> mirroring Nemotron-70B reasoning so anyone can test the app without credentials.
            </span>
          </div>

          <div className="modal-actions">
            {keyInput && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleClear}>
                Clear Key
              </button>
            )}
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm">
              {saved ? (
                <>
                  <Check size={16} /> Saved!
                </>
              ) : (
                "Save Key"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
