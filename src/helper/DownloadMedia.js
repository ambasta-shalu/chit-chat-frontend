// Create a download link

export function downloadMedia(blob, data) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = data.CONTENT_NAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
