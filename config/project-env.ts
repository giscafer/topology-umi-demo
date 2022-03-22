/**
 * 公司发布系统流程受限，不能用前端构建.env的方式，所以用以下配置解决
 */

const hostname = location.hostname;
// const protocol = location.protocol;
// const pathname = location.pathname;

//  公司的（只能内网）
const leekhubTokenUrl = `/api/base/resource/file/token/get`;
const leekhubUploadUrl = `/base/base-file-mgt/api/upload-file`;
// 自己搞的公网存储
const rhUploadTokenUrl = "/tx-cloud-server/api/cos/get";
const rhUploadUrl = "/tx-cloud-server/api/cos/fileUpload";

export const PROJECT_ENV = (function () {
  if (hostname === "localhost") {
    return {
      env: "dev",
      baseUrl: "//test.nc-qa.leekhubapp.com/test",
      // baseUrl: 'http://81.70.116.84/test',
      uploadTokenUrl: rhUploadTokenUrl,
      uploadUrl: rhUploadUrl,
    };
  }
  if (/(-dev)+?/.test(hostname)) {
    return {
      env: "dev",
      baseUrl: "http://81.70.116.84/test",
      uploadTokenUrl: leekhubTokenUrl,
      uploadUrl: leekhubUploadUrl,
    };
  }
  if (/(-qa)+?/.test(hostname)) {
    return {
      env: "test",
      baseUrl: "//test.nc-qa.leekhubapp.com/test",
      uploadTokenUrl: leekhubTokenUrl,
      uploadUrl: leekhubUploadUrl,
    };
  }
  if (/(-pre)+?/.test(hostname)) {
    return {
      env: "pre",
      baseUrl: "//test.nc-pre.leekhubapp.com/test",
      uploadTokenUrl: leekhubTokenUrl,
      uploadUrl: leekhubUploadUrl,
    };
  }

  return {
    env: "prod",
    baseUrl: "https://nc.leekhub.com/test",
    uploadTokenUrl: leekhubTokenUrl,
    uploadUrl: leekhubUploadUrl,
  };
})();

export const __PROJECT_ENV__ = PROJECT_ENV["env"];
console.log(`__PROJECT_ENV__=${__PROJECT_ENV__}`, PROJECT_ENV);

export const BASE_URL = `${PROJECT_ENV["baseUrl"]}`;
