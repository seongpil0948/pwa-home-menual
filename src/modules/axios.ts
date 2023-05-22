import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// https://axios-http.com/docs/req_config
export const axiosConfig = {
  //   timeout: 300 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
  headers: {
    // common: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // post: {
    //   "Content-Type": "application/json",
    // },
  },
}

const _axios = axios.create(axiosConfig)

// _axios.interceptors.request.use((config) => {
//   // console.log("Axios Intercept Request Config: ", config, "Store: ", store);
//   const logined = store.getters["auth/logined"];
//   if (logined) {
//     const { access_token, type, refresh_token } = store.state.auth;
//     config.headers.common.Authorization =
//       refresh_token && config.url.includes("refresh-token")
//         ? `${access_token.type} ${refresh_token}`
//         : `${access_token.type} ${access_token.token}`;
//   }
//   return config;
// });
_axios.interceptors.response.use(
  (res) => {
    // if (res.config.method !== "get") {
    //   store.commit("common/showMsg", {
    //     type: "success",
    //     txt: "요청 성공",
    //   });
    // }
    console.log('요청성공 interceptors.response', res)
    return res
  },
  (error) => {
    console.log('ERROR: interceptors.response: ', error.response)
    // const errF = (msg) =>
    //   store.commit("common/showMsg", {
    //     type: "error",
    //     txt: msg,
    //   });
    // if (error.response.status === 500) {
    //   errF(`500 서버에러가 발생 하였습니다. ${error.response.statusText}`);
    // } else if (error.response.data.detail) {
    //   const msg = resDetailToTxt(error.response.data.detail);
    //   errF(msg);
    //   if (msg === "유저의 인증정보가 만료 되었습니다.") {
    //     router.push({ name: "Login", params: {} });
    //   }
    // } else {
    //   errF("알수없는 에러가 발생 하였습니다.");
    // }

    return Promise.reject(error)
    // return _axios.request(config);
  },
)
export default _axios

// function resDetailToTxt(detail) {
//   console.log("Network Error Detail >>>", detail);
//   if (Array.isArray(detail)) return "요청에 실패 하였습니다.";
//   detail = detail.msg ?? detail.trim();

//   if (detail === "Not enough permissions") return "권한이 부족합니다.";
//   else if (detail === "Could not validate credentials")
//     return "유저의 인증정보가 만료 되었습니다.";
//   else if (detail === "Already Exist ID") return "이미 존재하는 ID 입니다.";
//   else if (detail === "Incorrect ID or password")
//     return "존재하지 않거나, 틀린 계정입니다.";
//   else if (detail === "Only one authenticator account left")
//     return "관리자 권한을 가진 계정이 최소 한명은 존재 해야합니다.";
//   else if (
//     detail ===
//     "삭제하려는 관리자 계정수가 존재하는 관리자 계정의 수보다 많습니다."
//   ) {
//     return "관리자 권한을 가진 계정이 최소 한명은 존재 해야합니다.";
//   }
//   return "요청에 실패 하였습니다.";
// }
