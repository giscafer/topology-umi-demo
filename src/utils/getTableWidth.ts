/*
 * @Author: mingxing.zhong
 * @Date: 2021-08-25 14:24:18
 * @Description: 获取表格宽度
 */

import type { ProColumns } from "@ant-design/pro-table";
import { isNumber } from "lodash";

const getTableWidth = (columns: ProColumns<any>[]) => {
  let total = 0;

  columns.forEach((col) => {
    if (!col.hideInTable) {
      total += !col.hideInTable && isNumber(col.width) ? col.width : 160;
    }
  });

  return total;
};

export default getTableWidth;
