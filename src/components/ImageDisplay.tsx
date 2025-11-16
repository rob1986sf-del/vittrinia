import React from "react";

export default function ImageDisplay({ image }) {
  if (!image)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Sua imagem aparecerá aqui...
      </p>
    );

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src={image}
        alt="Imagem gerada"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />
    </div>
  );
}

