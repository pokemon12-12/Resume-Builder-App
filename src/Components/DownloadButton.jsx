import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PDF_MARGIN = 24;

const DownloadButton = ({ previewRef }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    const previewElement = previewRef?.current;

    if (!previewElement) {
      setError("Preview is not ready yet.");
      return;
    }

    try {
      setError("");
      setIsGenerating(true);

      const canvas = await html2canvas(previewElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        onclone: (clonedDocument) => {
          const clonedPreview = clonedDocument.querySelector(".preview-card");

          if (clonedPreview) {
            clonedPreview.classList.add("pdf-export-mode");
            const eyebrow = clonedPreview.querySelector(".eyebrow");

            if (eyebrow) {
              eyebrow.style.display = "none";
            }
          }
        },
      });

      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const printableWidth = pageWidth - PDF_MARGIN * 2;
      const printableHeight = pageHeight - PDF_MARGIN * 2;
      const scaleFactor = Math.min(
        printableWidth / canvas.width,
        printableHeight / canvas.height,
      );
      const imageWidth = canvas.width * scaleFactor;
      const imageHeight = canvas.height * scaleFactor;
      const xOffset = PDF_MARGIN + (printableWidth - imageWidth) / 2;
      const yOffset = PDF_MARGIN + (printableHeight - imageHeight) / 2;
      const previewRect = previewElement.getBoundingClientRect();
      const linkElements = Array.from(
        previewElement.querySelectorAll('a[data-pdf-link]'),
      ).map((linkElement) => {
        const rect = linkElement.getBoundingClientRect();
        const top = rect.top - previewRect.top;
        const left = rect.left - previewRect.left;

        return {
          url: linkElement.href,
          x: (left * canvas.width) / previewRect.width,
          y: (top * canvas.height) / previewRect.height,
          w: (rect.width * canvas.width) / previewRect.width,
          h: (rect.height * canvas.height) / previewRect.height,
        };
      });

      pdf.addImage(
        canvas.toDataURL("image/png", 1),
        "PNG",
        xOffset,
        yOffset,
        imageWidth,
        imageHeight,
      );

      linkElements.forEach((linkItem) => {
        pdf.link(
          xOffset + linkItem.x * scaleFactor,
          yOffset + linkItem.y * scaleFactor,
          linkItem.w * scaleFactor,
          linkItem.h * scaleFactor,
          { url: linkItem.url },
        );
      });

      pdf.save("ResumeForge.pdf");
    } catch {
      setError("Unable to generate the PDF right now. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="d-grid gap-2">
      <button
        type="button"
        className="btn btn-dark btn-lg px-4 shadow-sm"
        onClick={handleDownload}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating PDF..." : "Download Resume"}
      </button>
      {error ? <p className="text-danger small mb-0">{error}</p> : null}
    </div>
  );
};

export default DownloadButton;
