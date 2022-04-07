import { createApp } from "vue";
import App from "./App.vue";
import Router from './router'
import { store, key } from './store'
//导入图标库
import 'font-awesome/css/font-awesome.min.css'
// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

import './permission' // permission control

const app = createApp(App);
// app.use(ElementPlus);
app.use(store, key)
app.use(Router);
app.mount("#app");
