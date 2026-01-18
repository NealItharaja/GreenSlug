// /app/success/page.tsx
import dynamic from "next/dynamic";

const SuccessPage = dynamic(() => import("./DashboardClient"), { ssr: false });
export default SuccessPage;
