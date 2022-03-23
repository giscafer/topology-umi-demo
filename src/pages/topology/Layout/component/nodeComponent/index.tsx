import {
  Col,
  Collapse,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tabs,
  Tag,
} from 'antd';
import { noop } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import AnimateComponent from './AnimateComponent';
import EventComponent from './EventComponent';
import './index.less';

const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const CanvasProps = ({
  data = {} as any,
  onEventValueChange = noop,
  // onUpdateComponentProps = noop,
  // onUpdateHttpProps = noop,
  onFormValueChange = noop,
}) => {
  const { x, y, width, height } = data?.node?.rect || {};
  const {
    rotate,
    lineWidth,
    strokeStyle,
    dash,
    text,
    id,
    fontColor,
    fontSize = 12,
    fontFamily,
  } = data?.node || {};
  const extraFields = data.node.data; // 用户自定义数据片段

  const onValuesChange = useCallback(
    (changedValues, allValues) => {
      if (data.node.name === 'echarts') {
        data.node.data.echarts.option.seriesFunction = changedValues.data;
        onFormValueChange(data.node);
        return;
      }
      onFormValueChange(allValues);
    },
    [data.node, onFormValueChange]
  );

  /**
   * 渲染位置和大小的表单
   */
  const renderForm = useMemo(() => {
    return (
      <Form layout="vertical" onValuesChange={onValuesChange}>
        <Row>
          <Col span={12}>
            <Form.Item label="X(px)" name="x" initialValue={x}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Y(px)" name="y" initialValue={y}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="宽(px)" name="width" initialValue={width}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="高(px)" name="height" initialValue={height}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="rotate" initialValue={rotate} label="角度(deg)">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }, [onValuesChange, x, y, width, height, rotate]);

  /**
   * 渲染样式的表单
   */

  const renderStyleForm = useMemo(() => {
    return (
      <Form layout="vertical" onValuesChange={onValuesChange}>
        <Row>
          <Col span={24}>
            <Form.Item
              name="strokeStyle"
              initialValue={strokeStyle}
              label="线条颜色"
            >
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dash" initialValue={dash} label="线条样式">
              <Select style={{ width: '95%' }}>
                <Option value={0}>_________</Option>
                <Option value={1}>---------</Option>
                <Option value={2}>_ _ _ _ _</Option>
                <Option value={3}>- . - . - .</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lineWidth"
              initialValue={lineWidth}
              label="线条宽度"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }, [onValuesChange, strokeStyle, dash, lineWidth]);

  /**
   * 渲染字体的表单
   */

  const renderFontForm = useMemo(() => {
    return (
      <Form layout="vertical" onValuesChange={onValuesChange}>
        <Col span={24}>
          <Form.Item label="字体颜色" name="fontColor" initialValue={fontColor}>
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fontFamily"
            initialValue={fontFamily}
            label="字体类型"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={1}>
          <Form.Item name="fontSize" initialValue={fontSize} label="字体大小">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="text" initialValue={text} label="内容">
            <TextArea />
          </Form.Item>
        </Col>
      </Form>
    );
  }, [fontColor, fontFamily, fontSize, onValuesChange, text]);

  /**
   * 渲染元素本身数据
   */

  const renderDataForm = useMemo(() => {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Form layout="vertical" {...formItemLayout}>
        <Col>
          <Form.Item label="ID">
            <span className="ant-form-text">
              <Tag color="#f50">{id}</Tag>
            </span>
          </Form.Item>
        </Col>
      </Form>
    );
  }, [id]);

  /**
   * 渲染元素额外数据
   */

  const renderExtraDataForm = () => {
    let value = extraFields;
    if (data.node.data && data.node.data.echarts) {
      value = data.node.data.echarts.option.seriesFunction;
    }

    return (
      <Form layout="vertical" onValuesChange={onValuesChange}>
        <Col>
          <Form.Item name="data" initialValue={value} label="自定义数据字段">
            <TextArea
              rows={30}
              disabled={!(data.node.data && data.node.data.echarts)}
            />
          </Form.Item>
        </Col>
      </Form>
    );
  };

  /*   const renderReactComponent = useMemo(() => {
    return (
      <ReactComponent
        onUpdateComponentProps={(value: any) => onUpdateComponentProps(value)}
        data={data}
      />
    );
  }, [onUpdateComponentProps, data]);

  const renderHttpComponent = useMemo(() => {
    return (
      <HttpComponent
        onUpdateHttpProps={(value: any) => onUpdateHttpProps(value)}
        data={data.node?.data?.http || {}}
      />
    );
  }, [onUpdateHttpProps, data]); */

  return (
    <div className="topology-rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="外观" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="位置和大小" key="1">
              {renderForm}
            </Panel>
            <Panel header="样式" key="2">
              {renderStyleForm}
            </Panel>
            <Panel header="文字" key="3">
              {renderFontForm}
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="数据" key="2" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="本身数据" key="1">
              {renderDataForm}
            </Panel>
            <Panel header="自定义数据" key="2">
              {renderExtraDataForm()}
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="事件" key="3" style={{ margin: 0 }}>
          <EventComponent
            canvasData={data}
            onEventValueChange={onEventValueChange}
          />
        </TabPane>
        <TabPane tab="动效" key="4" style={{ margin: 0 }}>
          <AnimateComponent canvasData={data} />
        </TabPane>
        {/*  <TabPane tab="组件" key="5" style={{ margin: 0 }}>
          {renderReactComponent}
        </TabPane>
         <TabPane tab="http" key="6" style={{ margin: 0 }}>
          {renderHttpComponent}
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default CanvasProps;
