import React, { useState, useEffect, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function TutorialGrid() {
  const [rowData, setRowData] = useState([]);
  const [selected, setSelected] = useState('');
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onButtonClick = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData.map((node) => `${node.make} ${node.model}`).join(', ');
    setSelected(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <button type="submit" onClick={onButtonClick}>
        Get selected rows
      </button>
      {selected && <div>{selected}</div>}
      <AgGridReact reactUi ref={gridRef} rowData={rowData} rowSelection="multiple">
        <AgGridColumn field="make" sortable filter checkboxSelection />
        <AgGridColumn field="model" sortable filter />
        <AgGridColumn field="price" sortable filter />
      </AgGridReact>
    </div>
  );
}

export default TutorialGrid;
