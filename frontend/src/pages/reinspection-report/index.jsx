import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import FinalReport from "../../components/dashboard/final-report";

const SomeComponent = dynamic(() => import('react-draft-wysiwyg'), { ssr: false });

const index = () => {
  return (
    <>
      <Seo pageTitle="Final Report" />
      <FinalReport SomeComponent={SomeComponent} />
    </>
  );
};


export default dynamic(() => Promise.resolve(index), { ssr: false });
