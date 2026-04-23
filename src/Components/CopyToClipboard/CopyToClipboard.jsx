import { useState, useEffect } from "react";

export default function CopyToClipboard({ hexCode }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hexCode);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  }
  return (
    <button type="button" className="copy-button" onClick={handleCopy}>
      {isCopied ? "SUCCESSFULLY COPIED!" : "COPY"}
    </button>
  );
}
