import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';

// 可调整列宽的antd-table
// 参考:https://github.com/Jullys/resize-antd-table
class ResizeTable extends React.Component {
  constructor(props) {
    super(props);

    this.currentTarget = null
    this.tableContainer = null;
    this.table = null;
    this.column = null;
    this.tableWidth = 0;
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    this.table = el.getElementsByTagName('table')[0];
    this.tableContainer = this.table.parentElement;

    this.table.setAttribute('data-table-resizable', 'true');
    let id = 'rs_tb';
    this.table.id = id;
    this.resizeable();
    this.clearColumnsWidth();
  }

  resizeable() {
    let header = this.table.rows[0];
    let cells = header.cells;
    let len = cells.length;

    for (let i = 0; i < len; i++) {
      cells[i].addEventListener('mousedown', this.handleMousedown);
      cells[i].addEventListener('mousemove', this.handleMousemove);
    }
    this.table.addEventListener('mouseup', this.handleMouseup);
    this.tableContainer?.addEventListener('mousemove', this.handleMousemove);
  }

  handleMousedown = (event) => {
    let target = event.currentTarget;
    this.currentTarget = event
    this.column = target;
    // console.log(event.offsetX,' - ',target.offsetWidth - 10);
    if (event.offsetX > target.offsetWidth - 10) {
      target.mouseDown = true;
      target.oldX = event.x;
      target.oldWidth = target.offsetWidth;
    }
    this.tableWidth = this.table.rows[0].clientWidth;
  }

  handleMousemove = (event) => {
    let target = event.currentTarget;
    console.log(event);
    console.log(event.offsetX,' - ',target.offsetWidth - 10);
    if (event.offsetX > target.offsetWidth - 10 ) {
      target.style.cursor = 'col-resize';
    } else {
      target.style.cursor = 'default';
    }
    if (!this.column) {
      this.column = target;
    }
    let column = this.column;
    if (column.mouseDown) {
      column.style.cursor = 'default';
      var diff = (event.x - column.oldX);
      if (column.oldWidth + (event.x - column.oldX) > 0) {
        column.width = column.oldWidth + diff;
      }

      column.style.width = column.width;
      this.table.style.width = this.tableWidth + diff + 'px';
      column.style.cursor = 'col-resize';
    }
  }
  handleMousemoveLastColumn = () => {
    let target = this.currentTarget.currentTarget;
    console.log(this.currentTarget);
    console.log(this.currentTarget.offsetX,' - ',target.offsetWidth - 10);
    if (this.currentTarget.offsetX > target.offsetWidth - 10 ) {
      target.style.cursor = 'col-resize';
    } else {
      target.style.cursor = 'default';
    }
    if (!this.column) {
      this.column = target;
    }
    let column = this.column;
    if (column.mouseDown) {
      column.style.cursor = 'default';
      var diff = (this.currentTarget.x - column.oldX);
      if (column.oldWidth + (this.currentTarget.x - column.oldX) > 0) {
        column.width = column.oldWidth + diff;
      }

      column.style.width = column.width;
      this.table.style.width = this.tableWidth + diff + 'px';
      column.style.cursor = 'col-resize';
    }
  }

  handleMouseup = (event) => {
    if (this.column) {
      this.column.mouseDown = false;
      this.column.style.cursor = 'default';
    }
  }


  clearColumnsWidth() {
    let colgroup = null;
    let childNodes = this.table.childNodes;
    childNodes.forEach(node => {
      if (node.tagName === 'COLGROUP') {
        colgroup = node;
      }
    });
    if (colgroup) {
      colgroup.childNodes.forEach(node => {
        node.style.width = 'auto'
      });
    }
  }

  render() {
    return <Table {...this.props} />;
  }
}

export default ResizeTable;