import ResizableAntdTable from './table';
const ResizableTable = ()=>{
    const columns = [
        {
            title: 'a', 
            dataIndex: 'a',
            width: 300,
            sorter:()=>{}
        },
        {
            title: 'b', 
            dataIndex: 'b',
            width: 100,
            sorter:()=>{}
        },
      ];
      
      const data = [
        {a: 1, b: 2},
        {a: 3, b: 4},
      ];
    return <ResizableAntdTable bordered={true} columns={columns} dataSource={data} />
}
export default ResizableTable