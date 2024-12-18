import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import PrintDocument from "../../components/dashboard/print-document";

const index = () => {
  return (
    <>
      <Seo pageTitle="Print Document" />
      <PrintDocument />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
