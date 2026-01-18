// /app/success/page.tsx
import dynamic from "next/dynamic";

const SuccessPage = dynamic(() => import("./ListingsClient"), { ssr: false });
export default SuccessPage;
