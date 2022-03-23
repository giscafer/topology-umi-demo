import IconFont from '@/components/IconFont';
import React from 'react';

const Layout = ({ Tools, onDrag }: any) => {
  return Tools.map((item: any, index: number) => (
    <div key={item.name}>
      <div className="title">{item.group}</div>
      <div className="button">
        {item.children.map((item2: any, idx: number) => {
          return (
            <a
              key={index + idx}
              title={item2.name}
              draggable
              onDragStart={(ev) => onDrag(ev, item2)}
            >
              {item2.data.name === 'image' ? (
                <img
                  style={{ height: 30, width: 30, margin: '0 1px' }}
                  src={item2.data.image}
                  alt="img"
                />
              ) : (
                <IconFont type={item2.icon} style={{ fontSize: '24px' }} />
                /*  <i
                  className={'iconfont ' + item2.icon}

                /> */
              )}
            </a>
          );
        })}
      </div>
    </div>
  ));
};

export default Layout;
