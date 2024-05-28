import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ReportDocument from "../../components/dashboard/preinspection-report-document";

const index = () => {
  return (
    <>
      <Seo pageTitle="Report Document" />
      <ReportDocument />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
