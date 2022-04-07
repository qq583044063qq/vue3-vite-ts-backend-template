/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// 使用第三方js库 nprogress
declare module "nprogress" {
  import NSProgress from 'nprogress'
  export default NSProgress
}
