import { createFromIconfontCN } from "@ant-design/icons";
import defaultSettings from "../../../config/defaultSettings";

// !!! 如需要添加图标，请联系 giscafer 邀请加入协助
const IconFont = createFromIconfontCN({
  scriptUrl: [defaultSettings.iconfontUrl as string],
});

export default IconFont;
