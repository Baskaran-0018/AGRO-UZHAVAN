/**
 * High-performance client-side image optimizer for agricultural computer vision.
 * Downscales high-resolution camera photos (often 5MB - 15MB) into high-clarity,
 * lightweight payloads (~50KB - 120KB) in milliseconds, drastically speeding up
 * network transfer and AI vision model inference times.
 */
export async function optimizeImageForVision(
  file: File | Blob,
  maxDimension = 900,
  quality = 0.82
): Promise<{ dataUrl: string; mimeType: string; originalSize: number; optimizedSize: number }> {
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image element'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while bounding to max dimension
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) {
          // Fallback to original if canvas fails
          return resolve({
            dataUrl: String(reader.result),
            mimeType: file.type || 'image/jpeg',
            originalSize,
            optimizedSize: originalSize,
          });
        }

        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw and compress to JPEG
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const optimizedSize = Math.round((dataUrl.length * 3) / 4);

        resolve({
          dataUrl,
          mimeType: 'image/jpeg',
          originalSize,
          optimizedSize,
        });
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
