// /app/success/page.tsx
import dynamic from "next/dynamic";

const SuccessPage = dynamic(() => import("./CustomerClient"), { ssr: false });
export default SuccessPage;
