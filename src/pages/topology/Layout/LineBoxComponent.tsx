import React, { useRef, useEffect, useState } from 'react';

const LineComponent = ({ direction }: any) => {
  const multiple = 1;
  const containerRef = useRef<any>();
  const [calibration, setCalibration] = useState({ width: 0, height: 0 });

  const generateElement = (item?: boolean, num?: number) => {
    if (containerRef.current) {
      const createSpan = document.createElement('div');
      createSpan.className = 'calibrationLine';
      createSpan.style.backgroundColor = '#ccc';
      containerRef.current.style.display = 'flex';
      containerRef.current.style.justifyContent = 'space-between';

      if (direction === 'up') {
        containerRef.current.style.marginLeft = '50px';
        createSpan.style.width = '1px';
        createSpan.style.height = '6px';
        createSpan.style.display = 'inline-block';
      } else {
        containerRef.current.style.flexDirection = 'column';
        createSpan.style.height = '1px';
        createSpan.style.width = '6px';
        createSpan.style.display = 'inline-block';
      }

      if (item) {
        const createSpanContent = document.createElement('span');

        if (direction === 'up') {
          createSpan.style.height = '12px';
          createSpanContent.style.transform = 'translate3d(-4px, 20px, 0px)';
          createSpan.style.transform = 'translateY(0px)';
        } else {
          createSpan.style.width = '12px';
          createSpanContent.style.paddingLeft = '20px';
        }

        createSpanContent.style.display = 'block';
        createSpanContent.className = 'calibrationNumber';
        createSpanContent.innerHTML = (num || 0) * 5 + '';
        createSpan.appendChild(createSpanContent);
      }
      containerRef.current.appendChild(createSpan);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current);
      const calibrat = containerRef.current.getBoundingClientRect();
      setCalibration({ width: calibrat.width, height: calibrat.height });
      const length = direction === 'up' ? calibrat.width : calibrat.height;
      for (let i = 0; i < length / 5; i++) {
        if (i % 10 === 0) {
          generateElement(true, i);
        } else {
          generateElement();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  useEffect(() => {
    if (containerRef.current) {
      const width = calibration.width
        ? calibration.width
        : containerRef.current.getBoundingClientRect().width;
      const height = calibration.height
        ? calibration.height
        : containerRef.current.getBoundingClientRect().height;
      const arr = [
        ...Array.from(
          containerRef.current.querySelectorAll('.calibrationLine')
        ),
      ];
      if (arr.length) {
        if (direction === 'up') {
          containerRef.current.style.width =
            parseFloat(multiple.toFixed(1)) * width + 'px';
          arr.forEach((el: any) => {
            const dom: any = [
              ...Array.from(el.querySelectorAll('.calibrationNumber')),
            ][0];
            if (dom) {
              dom.style.transform = `translate3d(-4px, 16px, 0px) scale(${(
                multiple + 0.1
              ).toFixed(1)})`;
            }
          });
        } else {
          console.log('object');
          containerRef.current.style.height =
            parseFloat(multiple.toFixed(1)) * height + 'px';
          arr.forEach((el: any) => {
            const dom: any = [
              ...Array.from(el.querySelectorAll('.calibrationNumber')),
            ][0];
            if (dom) {
              dom.style.transform = `translate3d(-4px, -8px, 0px) scale(${(
                multiple + 0.1
              ).toFixed(1)})`;
            }
          });
        }
      }
    }
  }, [calibration.height, calibration.width, direction]);

  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        height: '100%',
        fontSize: 12,
        color: '#888',
      }}
      ref={containerRef}
    />
  );
};

export default LineComponent;
