/**
 * 错误码
 */
// 请求参数错误
const REQUEST_PARAMS_ERROR_CODE = 40000;

// 无权限访问
const NO_AUTH_ERROR_CODE = 40100;

// 访问被禁止
const FORBIDDEN_ERROR_CODE = 40300;
// 系统错误
const SYSTEM_ERROR_CODE = 50000;

// 找不到数据
const NOT_FOUND_ERROR_CODE = 40400;

// 第三方服务错误
const THIRD_PART_SERVICE_ERROR_CODE = 50010;

module.exports = {
  REQUEST_PARAMS_ERROR_CODE,
  NO_AUTH_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  SYSTEM_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  THIRD_PART_SERVICE_ERROR_CODE
};
