import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import SpotClaimDetails from "../../components/dashboard/spot-claim-details";
import { useRouter } from "next/router";


const Index = () => {
  const router = useRouter();
  const { leadId } = router.query;

  return (
    <>
      <Seo pageTitle="Spot Claim Details" />
      <SpotClaimDetails leadId={leadId} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });