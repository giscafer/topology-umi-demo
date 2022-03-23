import type { FormInstance } from 'antd';
import Icon from '@ant-design/icons';
import { Button, Col, Collapse, Form, Input, Select } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './index.css';
const { TextArea } = Input;
const { Panel } = Collapse;
const Page = ({ onEventValueChange, canvasData }: any) => {
  const formRef = useRef<FormInstance>(null);
  const [eventData, setEventData] = useState(canvasData.node.events);

  useEffect(() => {
    setEventData(canvasData.node.events);
  }, [canvasData]);

  /**
   * 新增事件
   */

  const onHandleAddEventListener = () => {
    const arr = [...eventData];
    arr.push({ type: '0', action: '0' });
    setEventData(arr);
  };

  const onHandleEventTypeChange = (e: any, idx: string | number) => {
    const data = [...eventData];
    data[idx].type = e;
    formRef.current?.resetFields();
    setEventData(data);
  };

  const onHandleSelectEvent = (e: any, idx: string | number) => {
    const data = [...eventData];
    data[idx].action = e;
    formRef.current?.resetFields();
    setEventData(data);
  };

  /**
   * value值的变化, 通知canvas更新画布的数据
   */

  const onHandleCodeChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    idx: string | number
  ) => {
    const value = await formRef.current?.validateFields();
    eventData[idx] = {
      type: null,
      action: null,
      value: null,
    };
    eventData[idx].type = +value[`eventType${idx}`];
    eventData[idx].action = +value[`event${idx}`];
    eventData[idx].value = e.target.value;
    eventData[idx].params = value[`params${idx}`] || '';
    onEventValueChange(eventData);
  };

  /**
   * 根据事件行为生成不同的表单
   */
  const renderFormByEvent = (item: any, idx: any) => {
    switch (item.action) {
      case '0':
        return (
          <>
            <Col span={24}>
              <Form.Item
                name={`code${idx}`}
                initialValue={item.value || void 0}
                label="链接地址"
              >
                <Input
                  placeholder="请输入链接地址"
                  onChange={(e) => onHandleCodeChange(e, idx)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={`params${idx}`}
                initialValue={item.params || '_black'}
                label="参数值"
              >
                <Input placeholder="_black" />
              </Form.Item>
            </Col>
          </>
        );
      case '2':
        return (
          <Col span={24}>
            <Form.Item
              name={`code${idx}`}
              initialValue={item.value || void 0}
              label="自定义代码"
            >
              <TextArea
                placeholder="请输入自定义代码"
                onChange={(e) => onHandleCodeChange(e, idx)}
                rows={10}
              />
            </Form.Item>
          </Col>
        );
      default:
        break;
    }
  };
  /**
   * 根据事件类型渲染事件行为表单
   */
  const renderFormByEventType = (item: any, idx: any) => {
    const renderCommonForm = () => {
      return (
        <>
          <Col span={24}>
            <Form.Item
              name={`event${idx}`}
              initialValue={item.action || void 0}
              label="事件行为"
            >
              <Select
                placeholder="请选择事件行为"
                onSelect={(value: any) => onHandleSelectEvent(value, idx)}
              >
                <Select.Option value="0">跳转链接</Select.Option>
                <Select.Option value="1">执行动画</Select.Option>
                <Select.Option value="2">执行函数</Select.Option>
                <Select.Option value="3">执行window下的全局函数</Select.Option>
                <Select.Option value="4">更新属性数据</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {renderFormByEvent(item, idx)}
        </>
      );
    };

    switch (item.type) {
      case '0':
      case '1':
        return renderCommonForm();
      case '2':
        return (
          <>
            <Col span={24}>
              {
                <Form.Item
                  name={`name${idx}`}
                  initialValue={item.name || void 0}
                  label="消息名"
                >
                  <Input placeholder="请输入自定义消息名" />
                </Form.Item>
              }
            </Col>
            {renderCommonForm()}
          </>
        );
      case '3':
        return (
          <>
            <Form.Item
              name={`name${idx}`}
              initialValue={item.name || void 0}
              label="Topic"
            >
              <Input placeholder="请输入Topic/subtopic" />
            </Form.Item>
            {renderCommonForm()}
          </>
        );
      default:
        break;
    }
  };
  /**
   * 渲染自定义事件表单入口
   */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderFontForm = (item: { type: any }, idx: any) => {
    return (
      <Form layout="vertical" ref={formRef}>
        <Col span={24}>
          <Form.Item
            name={`eventType${idx}`}
            initialValue=" item.type"
            label="事件类型"
          >
            <Select
              placeholder="请选择事件类型"
              onSelect={(value: any) => onHandleEventTypeChange(value, idx)}
            >
              <Select.Option value="0">单击</Select.Option>
              <Select.Option value="1">双击</Select.Option>
              <Select.Option value="2">webSocket事件</Select.Option>
              <Select.Option value="3">MQTT</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        {renderFormByEventType(item, idx)}
      </Form>
    );
  };

  /**
   * 删除自定义事件
   */

  const onHandleDeleteItem = useCallback(
    (idx) => {
      const data = [...eventData];
      delete data[idx];
      formRef.current?.resetFields();
      setEventData(data.filter(Boolean));
    },
    [eventData]
  );

  /**
   * 渲染事件列表
   */

  const renderPanel = useMemo(() => {
    if (eventData.length < 1) return;
    return (
      <Collapse>
        {eventData
          .map((item: { action: any; type: any }) => ({
            ...item,
            action: String(item.action),
            type: String(item.type),
          }))
          .map((item: any, index: number) => (
            <Panel
              header={
                <div>
                  {`自定义事件${index + 1}`}{' '}
                  <Icon
                    onClick={() => onHandleDeleteItem(index)}
                    type="delete"
                  />
                </div>
              }
              key={index}
            >
              {renderFontForm(item, index)}
            </Panel>
          ))}
      </Collapse>
    );
  }, [eventData, renderFontForm, onHandleDeleteItem]);

  return (
    <div>
      <Button
        type="primary"
        className="event-button"
        onClick={onHandleAddEventListener}
      >
        新增事件
      </Button>
      {renderPanel}
    </div>
  );
};

export default Page;
