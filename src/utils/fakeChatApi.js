
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export async function sendMessageToBot(userText) {
  await sleep(600);
  const text = userText.trim().toLowerCase();

  if (!text) return "I didn’t catch that. Could you rephrase?";
  if (text.includes("hello") || text.includes("hi"))
    return "Hi there! 👋 I can help with product info, availability, and recommendations.";
  if (text.includes("recommend") || text.includes("suggest"))
    return "Based on popular picks, customers love our Wireless Headphones and Smart Watch. Would you like me to compare them?";
  if (text.includes("headphones"))
    return "Our Wireless Headphones feature 30h battery, noise cancellation, and a comfortable fit.";
  if (text.includes("watch"))
    return "The Smart Watch tracks heart rate, sleep, and has GPS with ~5 days battery.";
  if (text.includes("price") || text.includes("cost"))
    return "Prices are shown on each product card. Add items to your cart to see totals.";
  if (text.includes("cart"))
    return "Add products from Home. In Cart you can update quantity, remove items, or checkout.";

  return `Thanks for asking about “${userText}”. I’ll soon fetch richer answers from the knowledge base.`;
}
