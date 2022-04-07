export interface UserLoginInfo {
  userName: string,
  password: string,
  rememberMe: boolean
}

//程序配置定义
export interface ApplicationSetting {
  applicationTitle: string, 
  apiBaseUrl: string //后端api Http请求的Url
  signalRUrl: string // 长连接请求的url
  // 程序的版本信息由下列四个值组成: 
  //
  //      主版本  Major
  //      次版本  Minor
  //      生成号  Build
  //      修订号  Revision
  //
  appVersion: string // 程序版本号 例:5.2022.0322.1
  githubUrl: string
}
export interface DateTime {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  dayOfWeek: number
}