import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import preInspection from "../../components/dashboard/claim-details-2";
import { useRouter } from "next/router";


const Index = () => {
  const router = useRouter();
  const { leadId } = router.query;

  return (
    <>
      <Seo pageTitle="PreInspection Claim Details" />
      <preInspection leadId={leadId} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
