import axios from 'axios'


export function request(config){
  const instance = axios.create({
    baseURL:'https://lianghj.top:8888/api/private/v1',
    timeout:3000
  })
  instance.interceptors.request.use(config=>config,err=>{console.log(err);})
  console.log(instance(config));
  return instance(config)
}