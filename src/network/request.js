import axios from 'axios'


export function request(config){
  
  const instance = axios.create({
    baseURL:'https://lianghj.top:8888/api/private/v1',
    timeout:3000
  })
  instance.interceptors.request.use(config=>{                   
    config.headers.Authorization = window.sessionStorage.getItem('token')          //将浏览器保存的token传给请求头
    
    
    return config;
  },err=>{console.log(err);})

  return instance
  
}





