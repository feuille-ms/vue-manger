<script setup>

</script>

<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="{ span: 10, offset: 1 }" :lg="{ span: 10, offset: 1 }" style="float:left;position: relative;left:10%">
      <h2>欢迎使用VueManger管理系统</h2>
      <el-image :src="require('@/assets/logo.png')" style="width: 480px;height:350px;"></el-image>
      <h3>管理至简，运维无忧</h3>

    </el-col>
    <el-col :xl="{ span:1,offset:1}":lg="{ span: 1, offset: 1}">
      <el-divider direction="vertical"></el-divider>

    </el-col>
    <el-col :xl="{ span:10, offset:1}" :lg="{ span:10, offset:1 }" style="float:right;position:relative;right:5%">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" style="width: 390px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" style="width: 390px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="loginForm.code" style="width: 260px;float: left"></el-input>
          <el-image :src="codeImg" class="codeImg" @click="getCaptcha()"></el-image>
        </el-form-item>
        <el-form-item style="float:left;position:relative;left:10%;margin-top:30px;">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>
<script>
import qs from 'qs'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请选择密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写验证码', trigger: 'blur' },
          { min:5,  max:5, message: "长度为5个字符", trigger: 'blur' }
        ]
      },
      codeImg: ''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 拼接 URL 查询参数的方式
          const params = new URLSearchParams();
          params.append('username', this.loginForm.username);
          params.append('password', this.loginForm.password);
          params.append('code', this.loginForm.code);
          params.append('token', this.loginForm.token);

          this.$axios.post('/login?' + params.toString())
              .then(res => {
                const jwt = res.headers['authorization'] || res.headers['Authorization'];
                this.$store.commit('SET_TOKEN', jwt);
                this.$router.push("/index");
              })
              .catch(error => {
                console.error('登录失败:', error);
                this.getCaptcha()
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha(){
      this.$axios.get('/captcha').then(res => {
        if(res.data && res.data.data){
          this.loginForm.token = res.data.data.token || ''
          console.log("mock(模拟服务器生成的随机码:)", this.loginForm.token)
          this.codeImg = res.data.data.captchaImg || ''
          this.loginForm.code = ''
        }
      })
      .catch(error => {
        console.log("获取验证码失败：", error)
      })
    }
  },
  created() {
    this.getCaptcha();
  }
}
</script>
<style scoped>
.el-row{
  align-items: center;
  min-height: 100vh;
  height: 100%;
  display: flex;
  text-align: center;
}
.el-divider{
  height:450px;
}

.codeImg{
  float: left;
  margin-left: 10px;
  border-radius: 5px;
}
</style>