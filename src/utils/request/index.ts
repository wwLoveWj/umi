import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  // AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { message as Message } from "antd";

/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}
const instance: AxiosInstance = axios.create({
  baseURL: "/",
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 60000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
  headers: { "X-Custom-Header": "foobar" },
});

/* 请求拦截器 */
// 主要在这里处理请求发送前的一些工作，比如给 HTTP Header 添加 token ，开启 Loading 效果，设置取消请求等。
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //  伪代码
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // 如果还需要在请求头内添加其他内容可以自己添加 "[]" 内为自定义的字段名 "=" 后的内容为字段名对应的内容
    // config.headers['自定义键'] = '自定义内容'
    // 如果此时觉得某些参数不合理，你可以删除它，删除后将不会发送给服务器
    // delete config.data.userName
    // userName是你传递的参数名，或许你可以试着在控制台输出config看看它包含了什么

    // 对应可以删除也可以在此添加一些参数
    // config.data.userName = '天道酬勤'
    return config;
  },
  (error: AxiosError) => {
    Message.error(error.message);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器:
 * 根据自定义错误码判断请求是否成功，然后只将组件会用到的数据，也就是上面的 Result 中的 data 返回
 * 如果错误码判断请求失败，此时为业务错误，比如用户名不存在等，在这里进行提示
 * 如果网络错误，则进入第二个回调函数中，根据不同的状态码设置不同的提示消息进行提示
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data;
    // 根据自定义错误码判断请求是否成功
    debugger;
    if (code === 0) {
      // 将组件用的数据返回
      return data;
    } else {
      // 处理业务错误。
      Message.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    debugger;
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
    }

    Message.error(message);
    return Promise.reject(error);
  }
);

export default instance;