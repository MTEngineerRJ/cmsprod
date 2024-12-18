import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import InspectionReport from "../../components/dashboard/inspection-report";

const SomeComponent = dynamic(() => import("react-draft-wysiwyg"), {
  ssr: false,
});

const index = () => {
  return (
    <>
      <Seo pageTitle="Re-Inspection Report" />
      <InspectionReport SomeComponent={SomeComponent} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
