import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ClaimDetails from "../../components/dashboard/spot-claim-details";

const index = () => {
  return (
    <>
      <Seo pageTitle="Spot Claim Details" />
      <ClaimDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
