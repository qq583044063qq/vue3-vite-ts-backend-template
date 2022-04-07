<script setup lang='ts'>
import { ref, watch, nextTick, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FormInstance, InputInstance } from 'element-plus'
import { key } from '../../store'
import { useStore } from 'vuex'
import { UserLoginInfo } from '../../interface/globelInterface'
import { Lock, User } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
const store = useStore(key)
//先定义登录页面所需页面模型
//定义验证表单方法
const validateUsername = (rule:any, value:any, callback:any) => {
  if(!value.trim()){
    callback(new Error('无效的用户'))
  }
  if(value.indexOf(' ') !== -1)
  {
    callback(new Error('无效的用户'))
  }
  callback()
  
}
const validatePassword = (rule:any, value:any, callback:any) => {
  if (value.length < 6) {
    callback(new Error('密码无效'))
  }
  else {
    callback()
  }
}
// 登录表单模型
let loginForm = reactive<UserLoginInfo>({
  userName: '',
  password: '',
  rememberMe: false
})
// 登录验证模型
let loginRules = reactive({
  userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})
// 页面UI状态模型
let loginPageUIState = ref({
  loading: false,
  passwordType: 'password',
  redirect: undefined
})
//密码输入框界面dom模板引用
const passwordRef = ref<InputInstance>()
const loginFormRef = ref<FormInstance>()
//组件内监听方法
// 侦听路由的改变 可能由其他地方重定向过来的路由参数里面带有redirect参数 将该参数取到页面模型中作为临时数据使用
watch(route,(currentRoute:any, prevRoute)=>{
  loginPageUIState.value.redirect=currentRoute.query&&currentRoute.query.redirect
})
//组件内方法
const showPwd=()=>{
  if(loginPageUIState.value.passwordType==='password'){
    loginPageUIState.value.passwordType=''
  }else{
    loginPageUIState.value.passwordType='password'
  }
  nextTick(()=>{
    passwordRef.value?.focus()
  })
}
const handleLogin= (formEl:FormInstance|undefined) =>{
  if (!formEl) return
  formEl.validate(valid=>{
    if(valid){
      //准备进行登录操作
      loginPageUIState.value.loading =true
      store.dispatch('user/login',loginForm).then(()=>{
        //成功后跳转路由
        router.push({path:loginPageUIState.value.redirect||'/'})
        loginPageUIState.value.loading=false
      }).catch(()=>{
        loginPageUIState.value.loading=false  
      })
    }else{
      console.log('error submit!!')
      return false
    }
  })
}


</script>
<template>
   <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">欢迎使用</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <el-icon><user /></el-icon>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.userName"
          placeholder="Username"
          name="userName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon><lock /></el-icon>
        </span>
        <el-input
          :key="loginPageUIState.passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="loginPageUIState.passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin(loginFormRef)"
        />
        <span class="show-pwd" @click="showPwd">
          <!--由于elementUI 的图标库里没有眼睛图标这里使用font-awesome图标-->
          <i :class="loginPageUIState.passwordType === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'" aria-hidden="true"></i>
          <!-- <svg-icon :icon-class="loginPageUIState.passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
        </span>
      </el-form-item>

      <el-button :loading="loginPageUIState.loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin(loginFormRef)">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">后端需要自己搭建哦</span>
        
      </div>

    </el-form>
  </div>
</template>
<style lang='scss'>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      box-shadow: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item.is-error .el-select-v2__wrapper, .el-form-item.is-error .el-select-v2__wrapper:focus, .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus {
    box-shadow: none;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
// 声明主题颜色变量
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>