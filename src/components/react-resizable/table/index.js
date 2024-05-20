import React, { useState } from 'react';
import { Space, Table } from 'antd'; // Assuming you're using Ant Design Table
import ResizableTitle from '../resizable-title'; // Import your ResizableTitle component
import './index.css'
const ResizableTable = (props) => {
  const [columns, setColumns] = useState([
    {
      title: "Date",
      dataIndex: "date",
        width: 200
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: 200,
    //   sorter: (a, b) => a.amount - b.amount
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 300,
    //   sorter: (a, b) => {}
    },
    {
      title: "Note",
      dataIndex: "note",
      width: 300
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: () => <a>Delete</a>
    }
  ]);

  const data = [
    {
      key: 0,
      date: "2018-02-11",
      amount: 120,
      type: "income",
      note: "transfer"
    },
    {
      key: 1,
      date: "2018-03-11",
      amount: 243,
      type: "income",
      note: "transfer"
    },
    {
      key: 2,
      date: "2018-04-11",
      amount: 98,
      type: "income",
      note: "transfer"
    }
  ];

  const components = {
    header: {
      cell: ResizableTitle
    }
  };

  const handleResize = (index) => (e, { size }) => {
    setColumns((prevColumns) => {
      const nextColumns = [...prevColumns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return nextColumns;
    });
  };

  const resizedColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index)
    })
  }));

  return (
    <Table
    //   {...props}
      bordered
      components={components}
      columns={resizedColumns}
      dataSource={data}
      tableLayout='fixed'
      scroll={{
        x:'100%'
      }}
    />
  );
};

export default ResizableTable;