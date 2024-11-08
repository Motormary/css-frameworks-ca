"use server"
export default async function checkImageUrl(url: string) {
    if (!url) return false
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && response.headers.get('Content-Type')?.startsWith('image/');
    } catch (error) {
      console.error("Error checking image URL:", error);
      return false;
    }
  }