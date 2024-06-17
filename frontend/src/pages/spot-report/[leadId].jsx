import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Documents from "../../components/dashboard/spot-report";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  // const { leadId } = router.query;
  const url = window.location.href;
  const leadId = url.split("/spot-report/")[1];

  return (
    <>
      <Seo pageTitle="Spot Report" />
      <Documents leadId={leadId} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
