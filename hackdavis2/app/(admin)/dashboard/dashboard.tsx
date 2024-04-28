"use client";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import { createItems } from "./actions"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useCallback, useMemo, useState, useEffect } from "react";
let counter = 0;

export default function Dashboard() {
  const createItemsWithCounter = createItems.bind(null, counter);
  const [rowData, setRowData] = useState();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/data/categories", {
        method: "GET",
      });
      await res.json().then((data) => {
        setCategories(data);
      });
    };
    getCategories();
  }, []);
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
    const newData = { ...oldData };
    newData[field] = event.newValue;
    const tx = {
      update: [newData],
    };
    fetch("/api/data/items", {
      method: "PUT",
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        event.api.applyTransaction(tx);
      });
  }, []);

  const onGridReady = useCallback(() => {
    fetch("/api/data/items", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
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
  const [pendingItems, setPendingItems] = useState([counter]);
  const handleAddRow = () => {
    counter += 1;
    setPendingItems([...pendingItems, counter]);
  };

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
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold align-center">Add Items:</h3>
          <button
            className="px-2 align-middle border-2 border-solid border-black"
            onClick={handleAddRow}
          >
            +
          </button>
        </div>
        <form action={createItemsWithCounter}>
          {pendingItems.map((id) => {
            return (
              <div className="flex" key={id}>
                <input
                  className="border-solid border-black border-2 m-1"
                  key={`item ${id}`}
                  name={`item${id}`}
                ></input>
                <input
                  className="border-solid border-black border-2 m-1"
                  key={`quant ${id}`}
                  name={`quantity${id}`}
                ></input>
                <select key={`category${id}`} name={`category${id}`}>
                  {categories.map((c) => {
                    return (
                      <option key={`${id}category${c.id}`} value={c.id}>
                        {c.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}
          <button className="border-solid border-2 border-black px-2">
            INPUT
          </button>
        </form>
      </div>
    </div>
  );
}
