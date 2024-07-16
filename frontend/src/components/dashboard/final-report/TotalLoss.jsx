import React, { useEffect, useState } from "react";
import ReactEditor from "../../common/TextEditor";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FaRedo } from "react-icons/fa";
import Image from "next/image";
import { getTotalLoss } from "./getEditorContent/totalLoss";
import { replaceFunction } from "./AllCustomFunctions/totalLossFunctions";

const TotalLoss_01 = ({
  CommTaxRatePct,
  setCommTaxRatePct,
  CashLoss,
  allLabour,
  claim,
  allNewParts,
  setCashLoss,
  SuspectedParts,
  setSuspectedParts,
  WreckValueWith,
  setWreckValueWith,
  WreckValueWithout,
  setWreckValueWithout,
  MissingItem,
  TotalLossEditor,
  setTotalLossEditor,
  setMissingItem,
  RtiAmount,
  saveHandler,
  currentGst,
  setRtiAmount,
  allDepreciations,
}) => {
  // const Editor = SomeComponent.Editor;
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // if(TotalLossEditor === "No,As Stated by Insured."){
    console.log("allNewParts",allNewParts);
    console.log("allLabour",allLabour);
    console.log("currentGst",currentGst);
    console.log("claim",claim);
    console.log("allDepreciations",allDepreciations);
    setTotalLossEditor(
      replaceFunction(
        "",
        allLabour,
        allNewParts,
        currentGst,
        claim,
        allDepreciations
      )
    );
    // }
  }, [allLabour, allNewParts, currentGst, claim, allDepreciations]);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="text-end">
            <button
              onClick={() => saveHandler(setIsEdit)}
              className="btn btn-color m-1"
              title="Update Values"
            >Update
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <div className="row mt-1 mb-1">
            <div className="col-lg-12 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Comm. Tax Rate % :
              </label>
            </div>
            <div className="col-lg-12">
              <input
                type="number"
                className="form-control"
                id="propertyTitle"
                value={CommTaxRatePct}
                onChange={(e) => setCommTaxRatePct(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="row mt-1 mb-1">
            <div className="col-lg-12 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Cash Loss IND Rate :
              </label>
            </div>
            <div className="col-lg-12">
              <input
                type="number"
                className="form-control"
                id="propertyTitle"
                value={CashLoss}
                onChange={(e) => setCashLoss(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="row mt-1 mb-1">
            <div className="col-lg-12 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Suspected Parts Rs. :
              </label>
            </div>
            <div className="col-lg-12">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={SuspectedParts}
                onChange={(e) => setSuspectedParts(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="row mt-1 mb-1">
            <div className="col-lg-12 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Wreck Value with RC Rs. :
              </label>
            </div>
            <div className="col-lg-12">
              <input
                type="number"
                className="form-control"
                id="propertyTitle"
                value={WreckValueWith}
                onChange={(e) => setWreckValueWith(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="row mt-1 mb-1">
            <div className="col-lg-12 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Wreck Value w/o RC Rs. :
              </label>
            </div>
            <div className="col-lg-12">
              <input
                type="number"
                className="form-control"
                id="propertyTitle"
                value={WreckValueWithout}
                onChange={(e) => setWreckValueWithout(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-1">
          <div className="row mt-1 mb-1">
            <div className="col-lg-12 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Missing Item(s) :
              </label>
            </div>
            <div className="col-lg-12">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={MissingItem}
                onChange={(e) => setMissingItem(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-1">
          <div className="row mt-1 mb-1">
            <div className="col-lg-12 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                RTI Amount :
              </label>
            </div>
            <div className="col-lg-12">
              <input
                type="number"
                className="form-control"
                id="propertyTitle"
                value={RtiAmount}
                onChange={(e) => setRtiAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-12 mt-4">
          <ReactEditor
            editorContent={replaceFunction(
              "",
              allLabour,
              allNewParts,
              currentGst,
              claim,
              allDepreciations
            )}
            setEditorContent={setTotalLossEditor}
            index={3}
          />
        </div>
      </div>
    </>
  );
};

export default TotalLoss_01;
