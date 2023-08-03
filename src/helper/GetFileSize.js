export function getFileSize(bytes) {
  let finalSize;
  const sizeInKB = bytes / 1024;
  const sizeInMB = sizeInKB / 1024;
  if (sizeInKB < 1024) {
    finalSize = `${sizeInKB.toFixed(2)} KB`;
  } else {
    finalSize = `${sizeInMB.toFixed(2)} MB`;
  }
  return finalSize;
}
