import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Documents from "../../components/dashboard/inspection-report";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  // const { leadId } = router.query;
  const url = window.location.href;
  const leadId = url.split("/final-report/")[1];

  return (
    <>
      <Seo pageTitle="Final Report" />
      <Documents leadId={leadId} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
