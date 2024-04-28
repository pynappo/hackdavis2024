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
    <div
      className="ag-theme-quartz"
      style={{
        height: 2000,
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        singleClickEdit={true}
        onGridReady={onGridReady}
      />
    </div>
  );
}
