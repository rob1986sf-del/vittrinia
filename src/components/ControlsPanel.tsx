import React, { useState } from "react";

interface Props {
  onGenerate: (prompt: string) => void;
}

export default function ControlsPanel({ onGenerate }: Props) {
  const [prompt, setPrompt] = useState("");

  const handleClick = () => {
    if (!prompt.trim()) return;
    onGenerate(prompt);
  };

  return (
    <div style={{
      padding: "20px",
      background: "#1a1a1a",
      color: "#fff",
      borderRadius: "12px",
      marginTop: "20px"
    }}>
      <h2 style={{ marginBottom: "10px" }}>Gerar Imagem</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva a imagem que deseja gerar..."
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #444",
          background: "#000",
          color: "#fff",
          resize: "none"
        }}
      />

      <button
        onClick={handleClick}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "12px",
          background: "#4CAF50",
          color: "#000",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none"
        }}
      >
        Gerar Imagem
      </button>
    </div>
  );
}
