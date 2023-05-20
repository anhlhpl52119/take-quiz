<template>
  <div>
    <a-modal
      :visible="isVisible"
      width="700px"
      title="ChangePassword"
      :footer="null"
    >
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
      >
        <a-form-item has-feedback label="Password" name="pass">
          <a-input
            v-model:value="formState.pass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="Password" name="pass">
          <a-input
            v-model:value="formState.pass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="Confirm" name="checkPass">
          <a-input
            v-model:value="formState.checkPass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="Age" name="age">
          <a-input-number v-model:value="formState.age" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
          <a-button style="margin-left: 10px" @click="resetForm"
            >Reset</a-button
          >
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
interface FormState {
  pass: string;
  checkPass: string;
  age: number | undefined;
}
/** Store */
//const store = useStore();

/** Props & Emit */
const props = defineProps<{ isVisible: boolean }>();
const { isVisible } = toRefs(props);
const emits = defineEmits(['update:isVisible']);

/** Data */
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  pass: '',
  checkPass: '',
  age: undefined,
});
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const rules: Record<string, Rule[]> = {
  pass: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],
  age: [{ validator: checkAge, trigger: 'change' }],
};

/** Method */
function coloseModal() {
  emits('update:isVisible', false);
}
function resetForm() {
  formRef.value!.resetFields();
}
function handleFinish(values: FormState) {
  coloseModal();
  console.log(values, formState);
}
async function checkAge(_rule: Rule, value: number) {
  if (!value) {
    return Promise.reject('Please input the age');
  }
  if (!Number.isInteger(value)) {
    return Promise.reject('Please input digits');
  } else {
    if (value < 18) {
      return Promise.reject('Age must be greater than 18');
    } else {
      return Promise.resolve();
    }
  }
}
async function validatePass(_rule: Rule, value: string) {
  if (value === '') {
    return Promise.reject('Please input the password');
  } else {
    if (formState.checkPass !== '') {
      formRef.value!.validateFields('checkPass');
    }
    return Promise.resolve();
  }
}
async function validatePass2(_rule: Rule, value: string) {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.pass) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
}
</script>
<style scoped></style>
