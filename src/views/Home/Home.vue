<template>
  <div id="app">
    <p>Home</p>
    <!-- 使用简单数据类型 -->
    <p>{{ project }}</p>
    <router-link to="/one">申明式导航</router-link>
    <p @click="skip">编程式导航</p>
    <!-- 响应式简单类型 -->
    <p>
      <span>ref 简单类型响应式=== {{ ref1 }}</span>
      <button @click="changeEasyFn">修改简单数据类型</button>
    </p>
    <!-- 响应式引用类型 -->
    <p>
      <span>reactive 复杂数据类型响应式=== {{ responseObj }}</span>
      <button @click="changeCiteFn">修改复杂数据类型</button>
    </p>
    <!-- 计算属性 -->
    <p>
      <span>计算属性</span>
      <span>{{ ComputedFn }}</span>
    </p>
    <!-- 侦听 -->
    <p>
      <span>侦听</span>
      <span>{{ obj }}==={{ sum }}</span>
    </p>
  </div>
</template>
<script>
// ref reactive 取代之前的  data 写法
import { ref, reactive, watch, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Home",
  // setup  在 beforeCreate 生命周期之前执行
  setup(props, context) {
    console.log(props, "Home"); // 参数一
    console.log(context, "Home"); // 参数二 包含 attrs emit expose slots 可解构
    const project = "废弃烟草";
    let ref1 = ref(1); // 定义简单数据类型（响应式）
    // 点击增加 事件处理
    const changeEasyFn = () => {
      ref1.value += 1; // 改值需加上 value
    };
    // 定义复杂数据类型 （响应式）
    const responseObj = reactive({
      name: "张三",
      age: 18,
    });
    // 修改引用数据类型
    const changeCiteFn = () => {
      // console.log(responseObj.name);
      responseObj.age += 1;
      responseObj.name = "你变了";
    };
    // watch 侦听 简单数据类型
    watch(
      ref1,
      (newVal) => {
        console.log(newVal, "侦听简单数据类型");
      },
      { immediate: true, deep: true }
    );
    // watch 多个
    const sum = ref(10);
    const obj = reactive({ name: "侦听多个" });
    watch(
      [sum, () => obj],
      (newVal) => {
        console.log(newVal);
      },
      { immediate: true, deep: true }
    );
    // watchEffect 侦听
    // watchEffect()
    // 计算属性
    const Math1 = ref(10);
    const Math2 = ref(20);
    const ComputedFn = computed(() => {
      return Math1.value + Math2.value;
    });
    // 路由
    const router = useRouter();
    const skip = () => {
      router.push({
        name: "Two",
      });
    };
    return {
      project,
      ref1,
      responseObj,
      changeEasyFn,
      changeCiteFn,
      Math1,
      Math2,
      ComputedFn,
      obj,
      sum,
      skip,
    };
  },
};
</script>
<style></style>
