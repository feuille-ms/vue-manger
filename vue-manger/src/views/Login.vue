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
          <el-input v-model="loginForm.password" style="width: 390px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="loginForm.code" style="width: 260px;float: left"></el-input>
          <el-image :src="codeImg" class="codeImg"></el-image>
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
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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