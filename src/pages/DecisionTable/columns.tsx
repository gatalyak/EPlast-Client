const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Назва',
    dataIndex: 'name',
  },
  {
    title: 'Керівний орган',
    dataIndex: 'address',
  },
  {
    title: 'Статус',
    dataIndex: 'completed',
  },
  {
    title: 'Рішення для',
    dataIndex: 'userId',
  },
  {
    title: 'Рішення',
    dataIndex: 'title',
    render: (text: string) => text,
  },
  {
    title: 'Дата',
    dataIndex: 'address',
  },
  {
    title: 'Додатки',
    dataIndex: 'address',
  },
];

export default columns;
