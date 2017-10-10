import axios from 'axios'
export async function axiosRequest (
  url: string ,
  method?: string,
  headers?: any,
  body?: any,
  onUploadProgress?: (progressEvent: any) => void
) {
  const config = {
    url,
    data: body,
    method,
    headers,
    onUploadProgress
  }
  return await axios.request({ ...config })
}
