import React from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col, Table } from 'antd'
import { fetchAll } from '../../models/device'
import { padLeft } from '../../utils/protocol'
import './index.less'

export class Gateway extends React.Component {
  state ={
    activeKey: ""
  };

  componentDidMount () {
    const { fetchAll } = this.props
    fetchAll()
  }

  render () {
    const { devices, nodes } = this.props
    const data = devices.filter(({ type, board }) => {
      return type === '3' || board[0] === '1'
    })

    const nodeList = nodes.map(model => {
      const device = devices.find(dev => dev.deviceId === model.devId)

      return device ? {
        ...device,
        gwId: model.gwId,
        rssi: model.rssi,
        hasBg: model.hasBg,
        realtime: model.data
      } : {
        ...model,
        deviceId: model.devId,
        name: model.devId,
        realtime: model.data
      }
    })

    const expandedRowRender = ({ deviceId }) => {
      const dataSource = nodeList.filter(model => model.gwId === deviceId)
      return (<Table rowKey='deviceId' size='middle' pagination={false}
        dataSource={dataSource} style={{ fontSize: 12 }}>
        <Table.Column title='节点名称' dataIndex='name' key='name' width={200} />
        <Table.Column title='固件版本' dataIndex='swVer' key='swVer' width={100} />
        <Table.Column title='硬件版本' dataIndex='hwVer' key='hwVer' width={100} />
        <Table.Column title='库版本' dataIndex='libVer' key='libVer' width={80} />
        <Table.Column title='信号强度' dataIndex='rssi' key='rssi' width={100} />
        <Table.Column title='激活时间' dataIndex='last_join' key='last_join' width={120}
          render={text => {
            const date = new Date(parseInt(text, 10))
            return `${date.getFullYear()}/${padLeft(date.getMonth() + 1, 2, '0')}/${padLeft(date.getDay(), 2, '0')}`
          }} />
        <Table.Column title='实时数据' dataIndex='realtime' key='realtime' render={(text, record) => {
          return (<span ref='realtime' style={{ color: record.hasBg ? '#00c6ff' : 'rgba(0,0,0, .65)' }}>{text}</span>)
        }} />
      </Table>)
    }

    return (<Layout>
      <Row gutter={36} style={{ padding: '0 18px' }}>
        <Col span={24} >
          <Table dataSource={data} rowKey='deviceId' expandedRowRender={expandedRowRender} pagination={false}
            className='components-table-demo-nested' defaultExpandAllRows={true} size='middle' >
            <Table.Column title='网关名称' dataIndex='name' key='name' />
            <Table.Column title='固件版本' dataIndex='swVer' key='swVer'/>
            <Table.Column title='硬件版本' dataIndex='hwVer' key='hwVer' />
            <Table.Column title='库版本' dataIndex='libVer' key='libVer' />
            <Table.Column title='在线状态' dataIndex='online' key='online' render={online => online ? '在线' : '离线'} />
            <Table.Column title='上线时间' dataIndex='loginAt' key='loginAt' render={text => {
              const date = new Date(parseInt(text, 10) * 1000)
              return `${date.getFullYear()}/${padLeft(date.getMonth() + 1, 2, '0')}/${padLeft(date.getDay(), 2, '0')}`
            }} />
            <Table.Column title='描述信息' dataIndex='description' key='description' />
          </Table>
        </Col>
      </Row>
    </Layout>)
  }
}

const mapDispatchToProps = {
  fetchAll
}

const mapStateToProps = state => ({
  devices: state.device.list,
  nodes: state.websocket.collection
})

export default connect(mapStateToProps, mapDispatchToProps)(Gateway)
