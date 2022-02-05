import React, { useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { createRowData, getGlobalRowData, getDataSubscription } from './HighFrequencyGridData';

function numberCellFormatter(params) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function GridExample() {
  let gridApi = null;

  useEffect(() => {
    createRowData();

    function onUpdate(newItem) {
      if (gridApi) {
        gridApi.applyTransactionAsync({ update: [newItem] });
      }
    }

    const observable = getDataSubscription();
    const subscription = observable.subscribe(onUpdate);
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  const onGridReady = (params) => {
    gridApi = params.api;
    params.api.setRowData(getGlobalRowData());
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="example-wrapper">
        <div id="myGrid" style={{ height: 400, width: 600 }} className="ag-theme-alpine">
          <AgGridReact
            reactUi
            animateRows
            getRowNodeId={(data) => {
              return data.trade;
            }}
            defaultColDef={{
              width: 120,
              sortable: true,
              resizable: true,
            }}
            onGridReady={onGridReady}
          >
            <AgGridColumn headerName="Product" field="product" hide />
            <AgGridColumn headerName="Portfolio" field="portfolio" hide />
            <AgGridColumn headerName="Book" field="book" hide />
            <AgGridColumn headerName="Trade" field="trade" width={100} />
            <AgGridColumn
              headerName="Current"
              field="current"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn
              headerName="Previous"
              field="previous"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn headerName="Deal Type" field="dealType" />
            <AgGridColumn headerName="Bid" field="bidFlag" width={100} />
            <AgGridColumn
              headerName="PL 1"
              field="pl1"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn
              headerName="PL 2"
              field="pl2"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn
              headerName="Gain-DX"
              field="gainDx"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn
              headerName="SX / PX"
              field="sxPx"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn
              headerName="99 Out"
              field="_99Out"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn
              headerName="Submitter ID"
              field="submitterID"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
            <AgGridColumn
              headerName="Submitted Deal ID"
              field="submitterDealID"
              width={200}
              cellClass="number"
              valueFormatter={numberCellFormatter}
              cellRenderer="agAnimateShowChangeCellRenderer"
            />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default GridExample;
