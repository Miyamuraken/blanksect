import { get } from "@vercel/edge-config";

const TOTAL_SLOTS = 50;

// Reads the current confirmed pre-order count from Vercel Edge Config.
// Abhinav updates the "preorderCount" value directly from the Vercel
// dashboard each time he confirms a real paid order — no code edits, no
// redeploy needed. Falls back gracefully to 0 if Edge Config isn't set up
// yet (e.g. local dev without an EDGE_CONFIG connection).
export default async function PreOrderCounter() {
  let count = 0;

  try {
    const value = await get("preorderCount");
    if (typeof value === "number") {
      count = value;
    }
  } catch (e) {
    // No Edge Config connected yet — just show 0 rather than crashing the page.
    count = 0;
  }

  return (
    <span className="preorder-counter">
      {count}/{TOTAL_SLOTS} claimed
    </span>
  );
}
