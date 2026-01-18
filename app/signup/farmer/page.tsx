// /app/success/page.tsx
import dynamic from "next/dynamic";

const SuccessPage = dynamic(() => import("./FarmerClient"), { ssr: false });
export default SuccessPage;
