import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ClaimDetails from "../../components/dashboard/claim-details";
import { useRouter } from "next/router";


const Index = () => {
  const router = useRouter();
  const { leadId } = router.query;

  return (
    <>
      <Seo pageTitle="Claim Details" />
      <ClaimDetails leadId={leadId} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });