import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import PrintDocument from "../../components/dashboard/print-document";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const { leadId } = router.query;
  return (
    <>
      <Seo pageTitle="Print Document" />
      <PrintDocument leadId={leadId} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
