/**
 * @docs: https://github.com/mzabriskie/axios
 */

import axios from 'axios';
import { Message } from 'iview';

function jumpToSSOLoginPage() {
    location.href = `https://sso.bytedance.com/cas/login?service=${encodeURIComponent(location.href)}`;
}

// 暂无校验逻辑，透传res
function checkLogin(res) {
    return res;
}

function checkStatus(res) {
    if (res.status_code === 0) {
        return res;
    }

    const errorMsg = res.data && res.data.prompts ||
                     res.data && res.data.message ||
                     res.status_msg || res.err_msg || '请求或操作失败，请重试！';
    const error = new Error(errorMsg);
    error.res = res;

    Message.error(errorMsg);
    throw error;
}

function get(url, params = {}) {
    return axios.get(url, { params })
        .then(res => res.data)
        .then(checkLogin)
        .then(checkStatus);
}

function post(url, params = {}, config = {}) {
    return axios.post(url, params, config)
        .then(res => res.data)
        .then(checkLogin)
        .then(checkStatus);
}

export default {
    get,
    post
};