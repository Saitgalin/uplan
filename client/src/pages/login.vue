<template>
  <el-form ref='formRef' :model='form' status-icon
           :rules='rules'
           label-width='120px'
           label-position='top'
           class='login-form'
           v-if='isAuth'
  >
    <el-form-item label='Username' prop='username'>
      <el-input v-model='form.username' type='text' autocomplete='off' />
    </el-form-item>
    <el-form-item label='Password' prop='password'>
      <el-input v-model='form.password' type='password' autocomplete='off' />
    </el-form-item>
    <el-form-item>
      <el-button class='el-button el-button--default el-button--medium' @click='submitForm(formRef)'
      >LOGIN
      </el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { computed, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useAuthStore } from '../store';

const authStore = useAuthStore();
const isAuth = computed(() => authStore.token == null)


const formRef = ref<FormInstance>();

const form = reactive({
  username: '',
  password: '',
});

const rules = reactive<FormRules>({
  username: [{ required: true, message: 'Please input the username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input the password', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) {
      return false;
    }

    await authStore.login(form.username, form.password)
  });
};

</script>

<style>
.login-form {
  max-width: 300px;
  margin: 20vh auto 0;
}
</style>