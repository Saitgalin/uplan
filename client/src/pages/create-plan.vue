<template>
  <el-form ref='formRef' :model='form' status-icon
           :rules='rules'
           label-width='120px'
           label-position='top'
           class='create-plan-form'
  >
    <el-form-item label='Id' prop='id'>
      <el-input v-model='form.id' type='text' autocomplete='off' />
    </el-form-item>
    <el-form-item label='Data' prop='data'>
      <el-input v-model='form.data' type='text' autocomplete='off' />
    </el-form-item>
    <el-form-item>
      <el-button class='el-button el-button--default el-button--medium' @click='submitForm(formRef)'
      >Create plan
      </el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { Request } from '../api/Request';
import { ElMessage } from 'element-plus';

const formRef = ref<FormInstance>();

const form = reactive({
  id: '',
  data: '',
});

const rules = reactive<FormRules>({
  id: [{ required: true, message: 'Please input id', trigger: 'blur' }],
  data: [{ required: true, message: 'Please input data', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) {
      return false;
    }

    await postPlan(form.id, form.data);
    formEl.resetFields();
  });
};

async function postPlan(id: string, data: string) {
  const url = '/plan';
  return await Request.getInstance().post(url, {
    id,
    data,
  }).then(res => {
    if (res != null) {
      ElMessage.success(`Plan ${id} was successfully created`);
    }
  });
}

</script>

<style>
.create-plan-form {
  max-width: 300px;
}
</style>