import { Button, Modal, Form, Input, Row, Col } from 'antd';
import React from 'react';
import { useState } from 'react';
import './index.css';
const Layout = () => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState(
    'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957705046,1654500225&fm=26&gp=0.jpg'
  );
  const [list, setList] = useState([]);

  const onHandleAddPic = () => {
    setVisible(true);
  };

  function getBase64(
    url1: string,
    callback: { (data: any): void; (arg0: string): any }
  ) {
    const Img = new Image();
    let dataURL = '';
    Img.src = url1 + '?v=' + Math.random();
    Img.setAttribute('crossOrigin', 'Anonymous');
    Img.onload = function () {
      const canvas = document.createElement('canvas'),
        width = Img.width,
        height = Img.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(Img, 0, 0, width, height);
      dataURL = canvas.toDataURL('image/jpeg');
      return callback ? callback(dataURL) : null;
    };
  }

  const onHandleSubmitForm = () => {
    getBase64(url, (data: any) => {
      const _data: any = [...list];
      _data.push(data);
      setList(_data);
      setVisible(false);
    });
  };

  const onDrag = (event: React.DragEvent<HTMLAnchorElement>, image: never) => {
    event.dataTransfer.setData(
      'Text',
      JSON.stringify({
        name: 'image',
        rect: {
          width: 100,
          height: 100,
        },
        image,
      })
    );
  };

  return (
    <div className="topology-container">
      <Button type="primary" className="topology-btn" onClick={onHandleAddPic}>
        添加在线图片
      </Button>
      <Row>
        {list.map((item, index) => (
          <Col key={index} span={12} className="topology-colStyle">
            <a draggable href="/#" onDragStart={(ev) => onDrag(ev, item)}>
              <img alt="pic" src={item} style={{ width: 100, height: 100 }} />
            </a>
          </Col>
        ))}
      </Row>
      <Modal
        visible={visible}
        title="添加图片URL"
        onOk={() => onHandleSubmitForm()}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Form.Item label="图片URL">
          <Input
            placeholder="请输入图片的地址"
            defaultValue="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957705046,1654500225&fm=26&gp=0.jpg"
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Layout;
