import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import BillCreation from "../../components/dashboard/spot-bill-creation";

const index = () => {
  return (
    <>
      <Seo pageTitle="Bill Creation" />
      <BillCreation />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
