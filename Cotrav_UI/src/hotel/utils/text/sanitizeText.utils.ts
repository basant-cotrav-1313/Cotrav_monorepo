export const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

export const stripHtmlTags = (html: string): string => {
  const decodedHtml = decodeHtmlEntities(html);
  return decodedHtml.replace(/<\/?[^>]+(>|$)/g, '');
};

export const cleanTextArray = (items: string[]): string[] => {
  return items.map(stripHtmlTags);
};

