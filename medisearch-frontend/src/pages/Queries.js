import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
// import { Header } from '../components';
import QueriesHeader from '../components/QueriesHeader';

function Queries() {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  let grid = null;
  const created = () => {
    document.getElementById(`${grid.element.id}_searchbar`).addEventListener('keyup', (e) => {
      grid.search((e.target).value);
    });
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <QueriesHeader category="Page" title="Recent Queries" />
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        ref={(g) => { grid = g; }}
        created={created}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
}

export default Queries;
