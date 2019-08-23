import {Badge, Table} from 'antd'
import React, {PureComponent} from 'react'

const columns = [
  {title: '精品课名称', dataIndex: 'name', key: 'name'},
  {title: '版本', dataIndex: 'version', key: 'version'},
  {title: '升级次数', dataIndex: 'upgradeNum', key: 'upgradeNum'},
  {title: '作者', dataIndex: 'creator', key: 'creator'},
  {title: '日期', dataIndex: 'createdAt', key: 'createdAt'},
  {
    title: '操作',
    key: 'operation',
    render: () => (
      <>
        <a>编辑当前版本</a> | <a>发布新版</a>
      </>
    ),
  },
]

const data = [
  {
    name: 'Python 基础',
    version: '1.1',
    createdAt: '2014-12-25 23:12:00',
    upgradeNum: '56',
    creator: 'Jeff Tian',
  },
]

const chapterRenderer = () => {
  const chapterColumns = [
    {title: '章节名称', dataIndex: 'name', key: 'name'},
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      render: () => (
        <span className="table-operation">
          <a>编辑章节</a>
          <span> | </span>
          <a>在前面插入章节</a>
          <span> | </span>
          <a>在后面插入章节</a>
        </span>
      ),
    },
  ]

  const chapterData = new Array<any>()

  for (let i = 0; i < 2; i++) {
    chapterData.push({
      key: i,
      name: '第 ' + (i + 1) + ' 章节',
    })
  }

  return (
    <Table
      columns={chapterColumns}
      dataSource={chapterData}
      pagination={false}
    />
  )
}

const courseRenderer = () => {
  const courseColumns = [
    {title: '课程名称', dataIndex: 'name', key: 'name'},
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      render: () => (
        <span className="table-operation">
          <a>编辑课程</a>
          <span> | </span>
          <a>在前面插入课程</a>
          <span> | </span>
          <a>在后面插入课程</a>
        </span>
      ),
    },
  ]

  const courseData = new Array<any>()
  for (let i = 0; i < 4; i++) {
    courseData.push({
      key: i,
      name: '第 ' + (i + 1) + ' 课',
    })
  }

  return (
    <Table
      columns={courseColumns}
      dataSource={courseData}
      pagination={false}
      expandedRowRender={chapterRenderer}
    />
  )
}

const blockRenderer = () => {
  const blockColumns = [
    {title: '板块名称', dataIndex: 'name', key: 'name'},
    {title: '起始日期', dataIndex: 'startDate', key: 'startDate'},
    {title: '结束日期', dataIndex: 'endDate', key: 'endDate'},
    {
      title: '状态',
      key: 'state',
      render: () => (
        <span>
          <Badge status="success" />
          已结束
        </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <a>编辑</a>
          <span> | </span>
          <a>在前面插入板块</a>
          <span> | </span>
          <a>在后面插入板块</a>
        </span>
      ),
    },
  ]

  const blockData = new Array<any>()
  for (let i = 0; i < 3; ++i) {
    blockData.push({
      key: i,
      startDate: '2014-12-24 23:12:00',
      endDate: '2014-12-24 23:12:00',
      name: '板块 ' + (i + 1),
      state: '',
    })
  }
  return (
    <Table
      columns={blockColumns}
      dataSource={blockData}
      pagination={false}
      expandedRowRender={courseRenderer}
    />
  )
}

export default class NestedTable extends PureComponent {
  render() {
    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={blockRenderer}
        dataSource={data}
      />
    )
  }
}
