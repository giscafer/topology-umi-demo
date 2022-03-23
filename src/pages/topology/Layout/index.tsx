/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Fragment,
  useRef,
} from 'react';
import { Topology, registerNode } from '@topology/core';
import reactNodes from './Plugin/React-nodes';
import { register as registerChart } from '@topology/chart-diagram';
import {
  activityFinal,
  activityFinalIconRect,
  activityFinalTextRect,
} from '@topology/activity-diagram';
import { Tabs, Button, DatePicker, Table, Input } from 'antd';
import { Tools } from '../config/config';
// import { getNodeById } from '../Service/topologyService';
import Header from '../Header';
import NodeComponent from './component/nodeComponent';
import BackgroundComponent from './component/backgroundComponent';
import LineComponent from './component/lineComponent';
import SystemComponent from './LeftAreaComponent/SystemComponent';
import MyComponent from './LeftAreaComponent/MyComponent';
import LineBoxComponent from './LineBoxComponent';
import example from './test.json';
import './index.less';
import { Point } from '@topology/core';
import { noop } from 'lodash';
(window as any).Point = Point;
// const { confirm } = Modal;
const { TabPane } = Tabs;
export let canvas: Topology;
const Layout = ({ history }: any) => {
  const [selected, setSelected] = useState<any>({});
  const [isLoadCanvas, setIsLoadCanvas] = useState(false);

  const nodeFormRef = useRef<any>(null);
  const dragRef = useRef<any>(null);

  /**
   * 监听画布上元素的事件
   * @params {string} event - 事件名称
   * @params {object} data - 节点数据
   */

  const onMessage = (event: any, data: { locked: any }) => {
    switch (event) {
      case 'node': // 节点
      case 'addNode':
        // 切换node的时候, 清空上一个节点残留的信息
        if (nodeFormRef.current) {
          nodeFormRef.current.resetFields();
        }
        setSelected({
          node: data,
          line: null,
          multi: false,
          nodes: null,
          locked: data.locked,
        });
        break;
      case 'line': // 连线
      case 'addLine':
        setSelected({
          node: null,
          line: data,
          multi: false,
          nodes: null,
          locked: data.locked,
        });
        break;
      case 'space': // 空白处
        setSelected({
          node: null,
          line: null,
          multi: false,
          nodes: null,
          locked: null,
        });
        break;
      default:
        break;
    }
  };

  /**
   * 注册图形库
   */

  const canvasRegister = () => {
    // activity
    registerNode(
      'activityFinal',
      activityFinal,
      noop,
      activityFinalIconRect,
      activityFinalTextRect
    );
    registerChart();
    registerNode('button', reactNodes(Button));
    registerNode('datePicker', reactNodes(DatePicker));
    registerNode('table', reactNodes(Table));
    registerNode('input', reactNodes(Input));
  };

  useEffect(() => {
    const canvasOptions: any = {
      rotateCursor: '/rotate.cur',
      locked: 2,
      grid: true,
      ruleColor: '#2db7f5',
    };

    canvasOptions.on = onMessage;
    canvasRegister();
    canvas = new Topology('topology-canvas', canvasOptions);
    if ((window as any).registerTools) {
      (window as any).registerTools();
      const tools: any[] = (window as any).topologyTools.map((el: any) => {
        return {
          data: el.data,
          name: el.data.name,
          icon: 'rh-icon-anniu',
        };
      });
      const tempArr: any[] = Tools[0].children;
      Tools[0].children = tempArr.concat(tools);
    }
    // async function getNodeData() {
    //   const data = await getNodeById(history.location.state.id);
    //   canvas.open(data.data);
    // }

    // if (history.location.state && history.location.state.from === '/preview') {
    //   confirm({
    //     title: '是否要保存预览前的数据?',
    //     okText: '保存',
    //     cancelText: '取消',
    //     onOk() {
    //       history.location.state.data.locked = 0;
    //       canvas.open(history.location.state.data);
    //     },
    //     onCancel() {
    //       getNodeData();
    //     }
    //   });
    // } else {
    //   if (history.location?.state?.id) {
    //     getNodeData();
    //   }
    // }
    canvas.open(example as any);
    setIsLoadCanvas(true);
  }, [history]);

  const onDrag = (
    event: { dataTransfer: { setData: (arg0: string, arg1: string) => void } },
    node: { data: any }
  ) => {
    console.log('ondrag1', node);
    event.dataTransfer.setData('Topology', JSON.stringify(node.data));
  };
  const allowDrop = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
  };

  /**
   * 当表单数据变化时, 重新渲染canvas
   * @params {object} value - 图形的宽度,高度, x, y等等
   */

  const onHandleFormValueChange = useCallback(
    (value) => {
      if (selected?.node?.name === 'echarts') {
        canvas.updateProps(selected.node);
        return;
      }

      const {
        rotate,
        data,
        lineWidth,
        strokeStyle,
        dash,
        color,
        fontSize,
        fontFamily,
        fontColor,
        text,
        seriesFunction,
        ...other
      } = value;
      const changedValues = {
        node: {
          rect: other,
          fontColor,
          fontSize,
          fontFamily,
          rotate,
          lineWidth,
          strokeStyle,
          dash,
          text,
          data,
        },
      };

      if (changedValues.node) {
        // 遍历查找修改的属性，赋值给原始Node
        for (const key in changedValues.node) {
          if (Array.isArray(changedValues.node[key])) {
          } else if (typeof changedValues.node[key] === 'object') {
            for (const k in changedValues.node[key]) {
              selected.node[key][k] = changedValues.node[key][k];
            }
          } else {
            selected.node[key] = changedValues.node[key];
          }
        }
      }

      canvas.updateProps(selected.node);
    },
    [selected]
  );

  const onEventValueChange = useCallback(
    (value) => {
      selected.node.events = value;
      canvas.updateProps(selected.node);
    },
    [selected]
  );

  const onUpdateComponentProps = useCallback(
    (data) => {
      const { bind, ...value } = data;
      const idx = canvas.data.pens.findIndex(
        (pen) => pen.id === selected.node.id
      );
      canvas.data.pens[idx].data.props = {
        ...canvas.data.pens[idx].data.props,
        ...value,
      };
      canvas.data.pens[idx].data.bind = bind;
      const reader = new FileReader();
      const result = new Blob([JSON.stringify(canvas.data)], {
        type: 'text/plain;charset=utf-8',
      });
      reader.readAsText(result, 'text/plain;charset=utf-8');
      reader.onload = () => {
        canvas.open(JSON.parse(reader.result as string));
      };
    },
    [selected]
  );

  const onUpdateHttpProps = useCallback(
    (data) => {
      const idx = canvas.data.pens.findIndex(
        (pen) => pen.id === selected.node.id
      );
      canvas.data.pens[idx].data.http = {
        api: data.api,
        type: data.type,
        paramsGetStyle: 'subscribe',
        handleResult: data.handleResult,
        paramsArr: data.keys.map((item: any, index: string | number) => ({
          key: data.paramsKey[index],
          value: data.paramsValue[index],
        })),
      };
      const reader = new FileReader();
      const result = new Blob([JSON.stringify(canvas.data)], {
        type: 'text/plain;charset=utf-8',
      });
      reader.readAsText(result, 'text/plain;charset=utf-8');
      reader.onload = () => {
        canvas.open(JSON.parse(reader.result as string));
      };
    },
    [selected]
  );

  /**
   * 当线条表单数据变化时, 重新渲染canvas
   * @params {object} value - 图形的宽度,高度, x, y等等
   */

  const onHandleLineFormValueChange = useCallback(
    (value) => {
      const {
        dash,
        lineWidth,
        strokeStyle,
        name,
        fromArrow,
        toArrow,
        ...other
      } = value;
      const changedValues = {
        line: {
          rect: other,
          lineWidth,
          dash,
          strokeStyle,
          name,
          fromArrow,
          toArrow,
        },
      };
      if (changedValues.line) {
        // 遍历查找修改的属性，赋值给原始line
        for (const key in changedValues.line) {
          if (Array.isArray(changedValues.line[key])) {
          } else if (typeof changedValues.line[key] === 'object') {
            for (const k in changedValues.line[key]) {
              selected.line[key][k] = changedValues.line[key][k];
            }
          } else {
            selected.line[key] = changedValues.line[key];
          }
        }
      }
      canvas.updateProps(selected.line);
    },
    [selected]
  );

  /**
   * 画布右侧配置区域
   */

  const rightAreaConfig = useMemo(() => {
    return {
      node: selected && (
        <NodeComponent
          data={selected}
          onFormValueChange={onHandleFormValueChange}
          onEventValueChange={onEventValueChange}
          onUpdateComponentProps={(value: any) => onUpdateComponentProps(value)}
          onUpdateHttpProps={(value: any) => onUpdateHttpProps(value)}
          ref={nodeFormRef}
        />
      ), // 渲染Node节点类型的组件
      line: selected && (
        <LineComponent
          data={selected}
          onFormValueChange={onHandleLineFormValueChange}
        />
      ), // 渲染线条类型的组件
      default: canvas && <BackgroundComponent data={canvas} />, // 渲染画布背景的组件
    };
  }, [
    selected,
    onHandleFormValueChange,
    onHandleLineFormValueChange,
    onEventValueChange,
    onUpdateComponentProps,
    onUpdateHttpProps,
  ]);

  /**
   * 渲染画布右侧区域操作栏
   */

  const renderRightArea = useMemo(() => {
    let _component = rightAreaConfig.default;
    Object.keys(rightAreaConfig).forEach((item) => {
      if (selected[item]) {
        _component = rightAreaConfig[item];
      }
    });
    return _component;
  }, [selected, rightAreaConfig]);

  const renderHeader = useMemo(() => {
    if (isLoadCanvas) return <Header canvas={canvas} history={history} />;
    return null;
  }, [isLoadCanvas, history]);

  useEffect(() => {
    if (dragRef.current) {
      let disX = 0,
        disY = 0,
        disW = 0,
        disH = 0;
      const oPanel = document.getElementById('topology-canvas')!;
      dragRef.current.onmousedown = (ev: any) => {
        ev = ev || window.event;
        disX = ev.clientX; // 获取鼠标按下时光标x的值
        disY = ev.clientY; // 获取鼠标按下时光标Y的值
        disW = oPanel?.offsetWidth; // 获取拖拽前div的宽
        disH = oPanel?.offsetHeight;
        document.onmousemove = function (ev) {
          //拖拽时为了对宽和高 限制一下范围，定义两个变量
          const W = ev.clientX - disX + disW;
          const H = ev.clientY - disY + disH;
          oPanel.style.width = W + 'px'; // 拖拽后物体的宽
          oPanel.style.height = H + 'px'; // 拖拽后物体的高
          canvas.resize({ width: W, height: H });
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  }, []);

  return (
    <Fragment>
      {renderHeader}
      <div className="topology-page">
        <div className="tool">
          <Tabs defaultActiveKey="1">
            <TabPane tab="系统组件" key="1" style={{ margin: 0 }}>
              <SystemComponent
                onDrag={onDrag}
                allowDrop={allowDrop}
                Tools={Tools}
              />
            </TabPane>
            <TabPane tab="我的图片" key="2" style={{ margin: 0 }}>
              <MyComponent />
            </TabPane>
          </Tabs>
        </div>
        <div className="full">
          <div style={{ minWidth: 2000 }}>
            <LineBoxComponent direction="up" id="calibrationUp" />
            <div
              style={{
                width: 50,
                height: '100%',
                position: 'absolute',
                left: 0,
                top: 50,
              }}
            >
              <LineBoxComponent direction="right" id="calibrationLeft" />
            </div>
            <div
              id="topology-canvas"
              style={{
                width: 1200,
                height: 800,
                boxShadow: '2px 0 10px rgb(0 0 0 / 20%)',
                position: 'relative',
                margin: '50px 50px',
              }}
            >
              <div
                ref={dragRef}
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: 10,
                  height: 10,
                  zIndex: 999,
                  background: 'gray',
                  cursor: 'cell',
                }}
              />
            </div>
          </div>
        </div>
        <div className="props">{renderRightArea}</div>
      </div>
    </Fragment>
  );
};

export default Layout;
