import React , { PureComponent } from 'react'
import { Upload, Button, Icon, Progress , message } from 'antd'
import { UploadProps } from 'antd/lib/upload/interface'
import uploadURL, { UploadBody, axiosRequest } from './uploadRequest'

const styles = require('./upload.less')

export interface DefineUploadProps {
  uploadProps: UploadProps
  fileViladte: (file: File) => boolean
  onRemove?: any
  onError?: (error: any) => void
  getResult?: (url: string) => void,
  uploadBody: UploadBody,
  uploadJSXRender?: JSX.Element
}

type Props = UploadProps & DefineUploadProps
 interface StateProps {
  status: string,
  percent: number,
  headers: any,
  fileList?: any[]
 }
export default class Uploads extends PureComponent < Props > {

  state: StateProps = {
    status: 'none',
    percent: 0,
    headers: {},
    fileList: []
  }

  get uploadBtn() {
    const { status, percent = 0 } = this.state
    const { uploadJSXRender } = this.props
    if ( status == 'none' ) {
      if ( uploadJSXRender ) {
        return uploadJSXRender
      }
      return(
        <Button className={ styles.uploadBtn }>
          <Icon type='inbox' />
        </Button>
     )
    }else if ( this.isUploading ) {
      return (
        <div className={ styles.percent }>
          <Progress percent={ Math.ceil(percent) } />
        </div>
      )
    }
    return null
  }

  get isUploading () {
    const { status } = this.state
    return status == 'uploading'
  }

  get isUploaded () {
    const { status } = this.state
    return status == 'done'
  }

  private onUploadProgress = (progressEvent: any) => {
    const { loaded , total } = progressEvent
    const percent = loaded / total * 99
    this.setState({ status: 'uploading', percent })
  }

  private httpTOhttps = (url: string): string => {
    const reg = /^https?/
    return url.replace(reg, 'https')
  }

  private canUpload = async (file: File) => {
    const { uploadBody, getResult } = this.props
    const { result } = await uploadURL( file , uploadBody )
    const { endpoint, resourcePath, headers , cloudUrl, method } = result
    const url =  this.httpTOhttps(`${endpoint}/${resourcePath}`)
    axiosRequest(url, method, headers, file, this.onUploadProgress)
    .then(() => {
      console.info('get cloudUrl :', cloudUrl)
      cloudUrl && getResult && getResult(cloudUrl)
      this.setState({ status: 'done', percent: 100 })
    })
    .catch(this.onError)
  }

  private onError = (error: any) => {
    const { onError } = this.props
    onError ? onError(error) : message.error(error || 'network error, try again later...')
    this.remove()
  }

  private beforeVideoUpload = (file: any) => {
    const { fileViladte } = this.props
    const canUpload = fileViladte(file)
    if ( canUpload ) {
      this.setState({ fileList: [file] })
      try {
        this.canUpload(file)
      } catch (error) {
        this.onError(error)
      }
    }
    return false
  }

  private remove = () => {
    const { onRemove } = this.props
    this.setState({ fileList: [], status: 'none', percent: 0 })
    onRemove && onRemove()
  }

  render() {
    const { uploadProps } = this.props
    const { fileList } = this.state
    const props: UploadProps = {
      ...uploadProps,
      name: 'file',
      disabled: this.isUploading ,
      fileList,
      beforeUpload: this.beforeVideoUpload,
      onRemove: this.remove
    }
    return (
      <div className = { styles.uploadContainer }>
        <Upload { ...props } >
          { this.uploadBtn }
        </Upload>
      </div>
    )
  }
}
