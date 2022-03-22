import JSEncrypt from 'jsencrypt';
import dayjs from 'dayjs';
import { urlReg } from './regexp';

export const isUrl = (path: string): boolean => urlReg.test(path);

/**
 * 数组排序
 * @param arr 数组
 * @param targetIndex 需要排序的元素
 * @param replaceIndex 更换排序元素的对应元素位置
 * @returns new arr
 */
export const orderWith = (
  arr: any[] = [],
  targetIndex: number,
  replaceIndex: number
) => {
  const targetItem = arr[targetIndex];
  const replaceItem = arr[replaceIndex];
  const newArr: any[] = [];
  arr.forEach((item, index) => {
    if (index === targetIndex) {
      newArr.push(replaceItem);
    } else if (index === replaceIndex) {
      newArr.push(targetItem);
    } else {
      newArr.push(item);
    }
  });
  return newArr;
};

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

const isNil = (value: any) => [undefined, null, ''].includes(value);

/**
 * 进制转换
 * @param value 十进制值
 * @param system 进制
 * @param options
 * @returns
 */
export const convertNumber = (
  value: number,
  system: 16 | 2 = 16,
  options?: {
    unit?: boolean; // 是否带单位
    array?: boolean; // 是否返回数组
    maxLength?: number; // 最大长度
    fillString?: string; // 填充字符
  }
) => {
  let newValue = '';
  const { unit, array, maxLength, fillString } = options || {};

  if (!isNil(value)) {
    newValue = Number.isNaN(Number(value))
      ? ''
      : Number(value).toString(system);
  }

  if (maxLength) {
    newValue = newValue.padStart(maxLength, fillString);
  }

  if (array) {
    return newValue.split('');
  }

  if (unit && newValue) {
    if (system === 16) {
      return `0x${newValue}`;
    }
    if (system === 2) {
      return `0b${newValue}`;
    }
  }

  return newValue;
};

// 非对称加密-获取公钥设置加密方法
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCW3fQpZiXmj7+OnwtvtxYA353AEqW9LA2TvCqWNNdMRtaEIgbmV6qYQE+Osy/M0J+tdRwazA4DWKt8qPkcKUKPynMiTWIGePMHj8J6DCnqP2zmOo5QRQN2YMVLC0cA2bOiZt84Loc+sYctTZAdWKukf1+SzZe+aYS/Snw73mxA7QIDAQAB';
const encryptObj = new JSEncrypt({});
encryptObj.setPublicKey(publicKey);
export const encrypt = encryptObj;

export const dateFormat = (
  date: Date | string | number | undefined,
  formatter = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!date) {
    return '';
  }
  return dayjs(date).format(formatter);
};
