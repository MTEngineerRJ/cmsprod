import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SVGArrowDown from "./icons/SVGArrowDown";
import SVGArrowUp from "./icons/SVGArrowUp";
import SVGChevronLeft from "./icons/SVGChevronLeft";
import SVGChevronRight from "./icons/SVGChevronRight";
import Modal from "react-modal";

function SmartTable(props) {
  const [loading, setLoading] = useState(false);
  const [sortDesc, setSortDesc] = useState({});
  const [tableWidth, setTableWidth] = useState(1000);
  const [data, setData] = useState(props.data);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage ?? 10);
  const [rowsPerPageOptions] = useState(
    props.rowsPerPageOptions ?? [5, 10, 25, 50]
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(props.total ?? 0);

  const fetchData = useCallback(
    async (queryString) => {
      setLoading(true);
      try {
        const response = await fetch(
          props.url + (queryString ? queryString : ""),
          {
            method: "get",
          }
        );
        const data = await response.json();
        if (data && data.data) {
          setData(data.data.result ?? []);
          setTotal(data.data.total, 0);
        }
      } catch (e) {
        console.log("Fetch error", e.message);
      }
      setLoading(false);
    },
    [props.url]
  );

  


  const tableWidthFunc = useCallback(() => {
    let tempTableWidth = 0;
    props.headCells.map((cell) => (tempTableWidth += cell.width));

    if (tempTableWidth) setTableWidth(tempTableWidth);
  }, [props.headCells]);

  useEffect(() => {
    tableWidthFunc();
    if (props.url && !props.data)
      fetchData(`?limit=${props.rowsPerPage ?? 10}`);
  }, [
    props.url,
    props.data,
    props.rowsPerPage,
    props.headCells,
    tableWidthFunc,
    fetchData,
  ]);

  const buildQueryString = (search, page, rowsPerPage) => {
    const queries = [];

    if (page) queries.push(`page=${page}`);
    if (rowsPerPage) queries.push(`limit=${rowsPerPage}`);
    if (search) queries.push(`search=${search.toLowerCase()}`);

    const queryString = queries.join("&");

    return queryString ? `?${queryString}` : "";
  };

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleSearch = debounce((event) => {
    const { value } = event.target;
    setSearch(value);
    if (props.url) {
      fetchData(buildQueryString(value, page, rowsPerPage));
    } else {
      let bool = false;
      let tempData = props.data.filter((row) => {
        bool = false;
        Object.keys(row).forEach((key) => {
          if (row[key].toLowerCase().includes(value.toLowerCase())) bool = true;
        });
        return bool;
      });
      setData(tempData);
    }
  }, props.searchDebounceTime ?? 800);

  const sortData = (cell) => {
    let tempData = [...data];

    tempData.sort((a, b) => {
      if (sortDesc[cell]) {
        return a[cell].toLowerCase() < b[cell].toLowerCase() ? 1 : -1;
      } else {
        return a[cell].toLowerCase() > b[cell].toLowerCase() ? 1 : -1;
      }
    });
    setSortDesc({ [cell]: !sortDesc[cell] });
    setData(tempData);
  };

  return (
    <div className=" faq_according row mt-2">
      {/* <h4 className="mb-3">Vehicle Details</h4> */}
      <div class="accordion" id="accordiTwoxample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="btn accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={{ padding: "5px 10px 0 20px" }}
            >
              {/* <h4 className="">Vehicle Details</h4> */}
              <div className="row">
                <div
                  className="col-12 h4 text-start mt-2"
                  // style={{ marginLeft: "20px" }}
                >
                  {props.title}
                </div>
                <div className="col-lg-3">
                  {/* <div
                    className="btn btn-log btn-thm flaticon-pdf"
                    title="pdf zip download"
                    style={{ marginLeft: "450px" }}
                  ></div> */}
                </div>
              </div>
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordiTwoxample"
          >
            <div class="accordion-body bgc-f6">
              <div className="row"></div>
              <div className="col-12">
                <div className="smartTable-container row">
                  <div className="col-12">
                    {loading && (
                      <div className="smartTable-loaderContainer text-primary">
                        <div className="spinner-border" role="status"></div>
                      </div>
                    )}
                    <div className="row">
                      <div
                        className="col-10 h4 text-start mt-2"
                        style={{ marginLeft: "20px" }}
                      >
                        {/* {props.title} */}
                      </div>
                      {!props.disable && (
                        <div className="row">
                          <div className="col-lg-10"></div>
                          <div
                            className="col-lg-1 btn-thm flaticon-plus"
                            title="Add Document"
                            style={{ marginLeft: "" }}
                            // onClick={props.downloadAllFiles}
                            onClick={props.openModal}
                          ></div>
                          <div
                            className="col-lg-1 btn-thm w-10 flaticon-pdf"
                            title="pdf zip download"
                            // style={{ marginLeft: "50px" }}
                            onClick={props.downloadAllFiles}
                          ></div>
                        </div>
                      )}
                    </div>
                    {props.data.length > 0 ? (
                      <div className="row" style={{ marginTop: "5px" }}>
                        <div className="smartTable-tableContainer">
                          <table
                            className={
                              "smartTable-table table table-striped border text-start"
                            }
                            style={{ minWidth: tableWidth }}
                          >
                            <thead className="smartTable-thead">
                              <tr>
                                {props.headCells.map((headCell) => {
                                  return (
                                    <th
                                      id={headCell.id}
                                      key={headCell.id}
                                      scope="col"
                                      style={{
                                        width: headCell.width,
                                        backgroundColor: "#2e008b",
                                        color: "white" ?? "auto",
                                      }}
                                      className={
                                        headCell.sortable !== false
                                          ? "smartTable-pointer"
                                          : ""
                                      }
                                      onClick={() =>
                                        headCell.sortable !== false
                                          ? sortData(headCell.id)
                                          : {}
                                      }
                                    >
                                      {headCell.label}
                                      {sortDesc[headCell.id] ? (
                                        <SVGArrowDown />
                                      ) : sortDesc[headCell.id] ===
                                        undefined ? (
                                        ""
                                      ) : (
                                        <SVGArrowUp />
                                      )}
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {props.data.map((row, idx) => {
                                return (
                                  <tr key={"tr_" + idx}>
                                    {props.headCells.map((headCell, idxx) => {
                                      return (
                                        <td key={"td_" + idx + "_" + idxx}>
                                          {headCell.render
                                            ? headCell.render(row)
                                            : row[headCell.id]}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="row p-4">
                        <div className="smartTable-noDataFound col-12">
                          <h4>NO DATA FOUND</h4>
                        </div>
                      </div>
                    )}
                    {props.noPagination || data.length === 0 || !props.url ? (
                      <div className="row">
                        <div className="col-12 text-end p-3">
                          {props.data.length > 0 ? props.data.length : 0} Rows
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col-12 text-end p-3">
                          <span>
                            Rows per page:{" "}
                            <select
                              name="rowsPerPage"
                              value={rowsPerPage}
                              onChange={(e) => {
                                setRowsPerPage(e.target.value);
                                fetchData(
                                  buildQueryString(search, page, e.target.value)
                                );
                              }}
                            >
                              {rowsPerPageOptions.map((nbr, idx) => {
                                return (
                                  <option
                                    key={"rowsPerPageOptions_" + idx}
                                    value={nbr}
                                  >
                                    {nbr}
                                  </option>
                                );
                              })}
                            </select>
                          </span>
                          <span className="ms-4">
                            {(page - 1) * rowsPerPage + 1}-
                            {(page - 1) * rowsPerPage + data.length} of {total}
                          </span>
                          <span
                            className={
                              page === 1 ? "ms-4" : "smartTable-pointer ms-4"
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              if (page === 1) return;
                              setPage(page - 1);
                              fetchData(
                                buildQueryString(search, page - 1, rowsPerPage)
                              );
                            }}
                          >
                            <SVGChevronLeft
                              color={page === 1 ? "lightgray" : undefined}
                            />
                          </span>
                          <span
                            className={
                              page * rowsPerPage >= total
                                ? "ms-4"
                                : "smartTable-pointer ms-4"
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              if ((page - 1) * rowsPerPage > total) return;
                              setPage(page + 1);
                              fetchData(
                                buildQueryString(search, page + 1, rowsPerPage)
                              );
                            }}
                          >
                            <SVGChevronRight
                              color={
                                page * rowsPerPage >= total
                                  ? "lightgray"
                                  : undefined
                              }
                            />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Modal */}
                <Modal
                  className=" text-center mt-5 "
                  // style={{ marginTop: "150px" }}
                  isOpen={props.isModalOpen}
                  onRequestClose={props.closeModal}
                  contentLabel=""
                >
                  <div className="col-lg-12" style={{ marginTop: "150px" }}>
                    <div className="row">
                      <div className="col-lg-4"></div>
                      <div
                        className="col-lg-4 p-5"
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        <div className="col-lg-12"></div>
                        <h3 style={{ color: "#2e008b" }}>Add Document</h3>
                        <hr />
                        <div className="row mt-1 mb-1">
                          <div className="col-lg-5 my_profile_setting_input form-group">
                            <label
                              htmlFor=""
                              className="text-color"
                              style={{
                                color: "#2e008b",
                                fontWeight: "",
                              }}
                            >
                              Document Name
                            </label>
                          </div>
                          <div className="col-lg-7">
                            <input
                              type="text"
                              className="form-control"
                              id="propertyTitle"
                              onChange={(e)=>props.setNewLabel(e.target.value)}
                              // placeholder="Enter Registration No."
                            />
                          </div>
                        </div>
                        <hr />
                        <button
                          onClick={props.closeModal}
                          className="btn btn-color m-1"
                        >
                          Cancel
                        </button>
                        <button className="btn btn-color m-1" onClick={props.addNewLabel}>Submit</button>
                      </div>
                      <div className="col-lg-4"></div>
                    </div>
                  </div>
                </Modal>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SmartTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.Object),
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  total: PropTypes.number,
  url: PropTypes.string,
  headCells: PropTypes.arrayOf(
    //means Object
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number, //px
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ),
};

export default SmartTable;
