import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Documents from "../../components/dashboard/documents";

const index = () => {
  return (
    <>
      <Seo pageTitle="Documents Upload" />
      <Documents />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
