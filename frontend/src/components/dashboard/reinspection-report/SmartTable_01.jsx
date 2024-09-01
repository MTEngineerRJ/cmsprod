import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SVGArrowDown from "./icons/SVGArrowDown";
import SVGArrowUp from "./icons/SVGArrowUp";
import SVGChevronLeft from "./icons/SVGChevronLeft";
import SVGChevronRight from "./icons/SVGChevronRight";

const headCells = [
  {
    id: "sno",
    numeric: false,
    label: "#",
    width: 10,
  },
  {
    id: "dep",
    numeric: false,
    label: "Dep%",
    width: 10,
  },
  {
    id: "item_name",
    numeric: false,
    label: "Item Name",
    width: 150,
  },
  {
    id: "hsh_code",
    numeric: false,
    label: "HSH Code",
    width: 100,
  },
  {
    id: "remark",
    numeric: false,
    label: "Remark",
    width: 100,
  },
  {
    id: "estimate",
    numeric: false,
    label: "Estimate",
    width: 100,
  },
  {
    id: "assessed",
    numeric: false,
    label: "Assessed",
    width: 100,
  },
  {
    id: "qe_qa",
    numeric: false,
    label: "QE-QA",
    width: 100,
  },
  {
    id: "bill_sr",
    numeric: false,
    label: "Bill Sr.",
    width: 100,
  },
  {
    id: "gst",
    numeric: false,
    label: "GST%",
    width: 100,
  },
  {
    id: "total",
    numeric: false,
    label: "Total",
    width: 100,
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
    width: 100,
  },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Request Type",
  //   width: 100,
  // },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 100,
  },
];

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

  console.log(props.data);

  return (
    <div className="col-12 p-2">
      <div className="smartTable-container row">
        <div className="col-12">
          {loading && (
            <div className="smartTable-loaderContainer text-primary">
              <div className="spinner-border" role="status"></div>
            </div>
          )}
          <div className="row">
            <div className="col-lg-12 text-end">
             { !props.hide && props.claim?.claimDetails && <button
                className="btn"
                onClick={() => props.handleAddRow()}
                title="Add Row"
              >
                <span className="flaticon-plus"></span>
              </button>}
              {props.edit  ? (
                   !props.hide && props.claim?.claimDetails && <button className="btn" disabled={props.disable} onClick={() =>{ props.setHide(true); props.updateHandler(props.setEdit)}}>
                    Save
                </button>
              ) : (
                !props.hide && props.claim?.claimDetails && <button
                  className="btn"
                  onClick={() => props.editHandler()}
                  title=""
                >
                  <span className="flaticon-edit"></span>
                </button>
              )}
            </div>
          </div>
          {props.data.length > 0 ? (
            <div className="row">
              <div>
                <div className="smartTable-tableContainer">
                  <table
                    className={"smartTable-table table"}
                    style={{ minWidth: props.tableWidth }}
                  >
                    <thead className="smartTable-thead">
                      <tr>
                        {props.headCells.map((headCell) => (
                          <th
                            id={headCell.id}
                            key={headCell.id}
                            scope="col"
                            style={{
                              width: headCell.width ?? "auto",
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
                            ) : sortDesc[headCell.id] === undefined ? (
                              ""
                            ) : (
                              <SVGArrowUp />
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.map((row, idx) => (
                        <tr key={"tr_" + idx}>
                          {props.headCells.map((headCell, idxx) => (
                            <td key={"td_" + idx + "_" + idxx}>
                              {headCell.render
                                ? headCell.render(row)
                                : row[headCell.id]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <div className="col-lg-12"></div> */}
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
              {/* <div className="col-12 text-end p-3">
                {props.data.length > 0 ? props.data.length : 0} Rows
              </div> */}
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
                      fetchData(buildQueryString(search, page, e.target.value));
                    }}
                  >
                    {rowsPerPageOptions.map((nbr, idx) => {
                      return (
                        <option key={"rowsPerPageOptions_" + idx} value={nbr}>
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
                  className={page === 1 ? "ms-4" : "smartTable-pointer ms-4"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (page === 1) return;
                    setPage(page - 1);
                    fetchData(buildQueryString(search, page - 1, rowsPerPage));
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
                    fetchData(buildQueryString(search, page + 1, rowsPerPage));
                  }}
                >
                  <SVGChevronRight
                    color={
                      page * rowsPerPage >= total ? "lightgray" : undefined
                    }
                  />
                </span>
              </div>
            </div>
          )}
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
