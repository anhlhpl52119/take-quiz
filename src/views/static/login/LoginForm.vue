<template>
  <div>
    <form
      class="form-box"
      :class="{ shake: classState.formShake }"
      @submit.prevent="handleSubmit"
      novalidate
    >
      <img src="@/assets/logo_ngang.svg" />
      <h2>Sign in</h2>
      <div class="inputBox">
        <input v-model="stateRct.login" type="text" required />
        <span>User name</span>
      </div>
      <div class="inputBox">
        <input v-model="stateRct.password" type="password" required />
        <span>Password</span>
      </div>
      <div class="link">
        <a href="#">Forgot Password</a>
      </div>
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        :loading="loadingState.loginButton"
        block
        >Login</a-button
      >
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { message } from 'ant-design-vue';
import { RouteName } from '@/enums/routesEnum';
import { useUserAuth } from '@/stores/userAuthen';
const stateRct = reactive<API.LoginParams>({
  login: '',
  password: '',
});
const { loginReturnToken } = useUserAuth();
const msgKeys = readonly({ login: 'login-message' });
const router = useRouter();
const loadingState = reactive({
  loginButton: false,
});
const classState = reactive({
  formShake: false,
});

const handleSubmit = async () => {
  if (stateRct.login.trim() == '' || stateRct.password.trim() == '') {
    return message.warning({
      content: () => 'Tên đăng nhập và mật khẩu không được để trống',
      key: msgKeys.login,
    });
  }
  try {
    loadingState.loginButton = true;
    message.loading({ content: () => 'Đang đăng nhập', duration: 0, key: msgKeys.login });
    await loginReturnToken(stateRct);
    setTimeout(() => {
      router.push({ name: RouteName.AboutPage });
    });
  } catch (error) {
    classState.formShake = true;
    return Promise.reject(error);
  } finally {
    loadingState.loginButton = false;
    message.destroy(msgKeys.login);
    setTimeout(() => {
      classState.formShake = false;
    }, 820);
  }
};
</script>
<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
.form-box {
  position: absolute;
  border-radius: 10px;
  z-index: 2;
  width: 60%;
  display: flex;
  flex-direction: column;
  font-family: 'poppins' sans-serif;
  margin: 10px 0;
}
.form-box h2 {
  color: #3a6f43;
  font-weight: 500;
  text-align: center;
  margin: 0;
}
.form-box img {
  align-self: center;
  width: 350px;
}
.form-box .inputBox {
  position: relative;
  width: 100%;
  margin-top: 20px;
}
.form-box .inputBox input {
  position: relative;
  width: 100%;
  padding: 15px 24px;
  border-radius: 10px;
  font-size: 1.2em;
  border: solid 1px;
  transition: 0.3s;
}
.form-box .inputBox span {
  position: absolute;
  left: 20px;
  top: 15px;
  padding: 0 5px;
  pointer-events: none;
  color: #7a7a7a;
  font-size: 1.2em;
  transition: 0.3s;
  font-weight: bold;
}
.form-box .inputBox input:valid ~ span,
.form-box .inputBox input:-webkit-autofill ~ span,
.form-box .inputBox input:focus ~ span {
  color: black;
  font-size: 1.2em;
  transform: translateY(-35px);
  z-index: 50;
  background-color: white;
}
.submit-btn {
  border-radius: 10px;
  height: 40px;
  background-color: green;
}
@media only screen and (max-width: 800px) {
  .form-box {
    width: 90%;
  }
}
</style>
