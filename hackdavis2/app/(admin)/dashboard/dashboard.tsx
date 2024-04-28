"use client";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import { createItems } from "./actions"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { revalidatePath } from "next/cache";
let counter = 0;

export default function Dashboard() {
  const gridRef = useRef<AgGridReact>(null);
  const createItemsWithCounter = createItems.bind(null, counter);
  const [rowData, setRowData] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const res = fetch("/api/data/categories", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setColDefs([
          {
            field: "name",
            flex: 3,
          },
          {
            field: "quantity",
            flex: 1,
          },
          {
            headerName: "Image URL",
            field: "imageSrc",
            flex: 1,
          },
          {
            headerName: "Category",
            field: "category.name",
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
              values: data.map((c) => c.name),
            },
            flex: 2,
          },
        ]);
      });
  }, []);
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    {
      field: "name",
      flex: 3,
    },
    {
      field: "quantity",
      flex: 1,
    },
    {
      headerName: "Image URL",
      field: "imageSrc",
      flex: 1,
    },
    {
      headerName: "Category",
      field: "category.name",
      flex: 2,
    },
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
        <span className="px-2">{props.value}</span>
      </span>
    );
  }

  const getRowId = useCallback((params) => params.data.id, []);

  const onCellEditRequest = useCallback((event) => {
    const oldData = event.data;
    const field = event.colDef.field;
    const newData = { ...oldData };
    if (field === "category.name") {
      newData.category.name = event.newValue;
    } else {
      newData[field] = event.newValue;
    }
    const tx = {
      update: [newData],
    };
    fetch("/api/data/items", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((data) => {
      event.api.applyTransaction(tx);
      revalidatePath("/api/data/items/");
    });
  }, []);

  const onGridReady = useCallback(async () => {
    let items = [];
    await fetch("/api/data/items", {
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
  const onRemoveSelected = useCallback(async () => {
    const selectedData = gridRef.current!.api.getSelectedRows();
    await fetch("/api/data/items", {
      method: "DELETE",
      body: JSON.stringify(selectedData),
    });
    const res = gridRef.current!.api.applyTransaction({
      remove: selectedData,
    })!;
  }, []);

  return (
    <div className="flex justify-between">
      <div
        className="ag-theme-quartz h-[100%] flex-1 p-2 my-5 mx-2 flex-col flex gap-2"
        style={{ height: 700 }}
      >
        <button
          onClick={onRemoveSelected}
          className="bg-red-200 p-2 rounded-full"
        >
          Remove Selected
        </button>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          getRowId={getRowId}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          readOnlyEdit={true}
          onGridReady={onGridReady}
          onCellEditRequest={onCellEditRequest}
          rowSelection="multiple"
        />
      </div>
      <div className="w-[50%] align-top p-2 my-5 mx-2">
        <form
          action={createItemsWithCounter}
          className="flex flex-col items-center"
        >
          <button
            type="button"
            className="flex items-center gap-3 justify-center w-full bg-gray-300 rounded-full p-1"
            onClick={handleAddRow}
          >
            <h3 className="text-lg font-bold align-center">Add Items: +</h3>
          </button>
          <div className="border-2 border-solid border-black rounded-xl overflow-hidden">
            {pendingItems.map((id) => {
              return (
                <div
                  className="flex flex-row justify-between flex-wrap border-dotted border-b-2 border-black"
                  key={id}
                >
                  <input
                    className="border-solid border-black border-2 m-1 p-1 rounded-md max-w-sm"
                    key={`item ${id}`}
                    name={`item${id}`}
                    placeholder="Item Name"
                  ></input>
                  <input
                    className="border-solid border-black border-2 m-1 p-1 rounded-md max-w-sm"
                    key={`quant ${id}`}
                    name={`quantity${id}`}
                    placeholder="Quantity"
                  ></input>
                  <select
                    key={`category${id}`}
                    name={`category${id}`}
                    className="rounded-md m-1"
                  >
                    {categories?.map((c) => {
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
          </div>
          <button className="border-solid border-2 border-black px-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
