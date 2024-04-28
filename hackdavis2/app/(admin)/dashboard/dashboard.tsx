"use client";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import useSWR from "swr";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useCallback, useMemo, useState } from "react";
export default function Dashboard() {
  const [rowData, setRowData] = useState();

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "quantity" },
  ]);
  function cellRenderer(props) {
    const handleClick = () => {
      props.api.startEditingCell({
        rowIndex: props.node.rowIndex,
        colKey: props.column.getId(),
      });
    };
    return (
      <span>
        <button style={{ height: "30px" }} onClick={handleClick}>
          ✎
        </button>
        <span style={{ paddingLeft: "4px" }}>{props.value}</span>
      </span>
    );
  }

  const getRowId = useCallback((params) => params.data.id, []);

  const onCellEditRequest = useCallback((event) => {
    const oldData = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    const newData = { ...oldData };
    newData[field] = event.newValue;
    console.log("onCellEditRequest, updating " + field + " to " + newValue);
    const tx = {
      update: [newData],
    };
    console.log(newData);
    fetch("/api/data", {
      method: "PUT",
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        event.api.applyTransaction(tx);
      });
  }, []);

  const onGridReady = useCallback(() => {
    fetch("/api/data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setRowData(json);
      });
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      // we use a cell renderer to include a button, so when the button
      // gets clicked, the editing starts.
      cellRenderer: cellRenderer,
    };
  }, []);

  return (
    <div className="flex justify-between">
      <div
        className="ag-theme-quartz h-[100%] flex-1 p-2 m-5"
        style={{ height: 700 }}
      >
        <AgGridReact
          rowData={rowData}
          getRowId={getRowId}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          singleClickEdit={true}
          readOnlyEdit={true}
          onGridReady={onGridReady}
          onCellEditRequest={onCellEditRequest}
        />
      </div>
      <div className="w-[50%] align-top p-2 m-5">
        <h3 className="text-lg font-bold">Add Items:</h3>
      </div>
    </div>
  );
}
