<template>
  <el-form ref='formRef' :model='form' status-icon
           :rules='rules'
           label-width='120px'
           label-position='top'
           class='plans-form'
  >
    <el-form-item label='Id' prop='id'>
      <el-input v-model='form.id' type='text' autocomplete='off' />
    </el-form-item>
    <el-form-item>
      <el-button class='el-button el-button--default el-button--medium' @click='submitForm(formRef)'
      >Get plan
      </el-button
      >
    </el-form-item>
  </el-form>

  <div>
    Data: {{ data }}
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { Request } from '../api/Request';

const data = ref('');
const formRef = ref<FormInstance>();

const form = reactive({
  id: '',
});


const rules = reactive<FormRules>({
  id: [{ required: true, message: 'Please input id', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) {
      return false;
    }

    const res = await getPlan(form.id);

    data.value = res.data
    formEl.resetFields();
  });
};

async function getPlan(id: string) {
  const url = `/plan/${id}`;
  return await Request.getInstance().get(url, {
    id,
  });
}

</script>

<style>
.login-form {
  max-width: 300px;
}
</style>