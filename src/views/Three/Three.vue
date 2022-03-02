<template>
  <div id="Three">
    <p>Three</p>
    <p>
      <span>姓名：{{ userName }}</span>
      <br />
      <span>年龄：{{ age }}</span>
    </p>
    <button @click="ageAdd">+1</button>
    <p>
      <span>计算属性：{{ sum }}</span>
    </p>
    <p>
      <span>计算属性：{{ money }}</span>
    </p>
  </div>
</template>
<script>
import {
  reactive,
  toRefs,
  watch,
  computed,
  onMounted,
  onUnmounted,
  watchEffect,
} from "vue";
export default {
  setup() {
    const data = reactive({
      userName: "张三三",
      age: 18,
      obj: {
        userName: "李四",
        age: 20,
      },
      money: computed(() => {
        return data.age + data.obj.age;
      }),
    });
    const mounted = {
      ageAdd() {
        data.age += 1;
      },
    };
    // 传入形式 用于侦听 ref
    watch(
      data,
      (newVal) => {
        console.log(newVal.age, "普通");
      },
      { immediate: true, deep: true }
    );
    // 函数形式 用于侦听 reactive
    watch(
      () => data.age,
      (newVal) => {
        console.log(newVal, "引用");
      },
      { immediate: true, deep: true }
    );
    const sum = computed(() => {
      return data.age + data.obj.age;
    });
    // 无需传入依赖的 侦听
    watchEffect(() => {
      console.log(data.age);
    });
    // 自调用方法
    onMounted(() => {
      console.log("自调用");
    });
    //页面加载完成
    onMounted(() => {
      console.log("页面加载完成");
    });
    //销毁
    onUnmounted(() => {
      console.log("页面销毁");
    });
    return {
      ...toRefs(data),
      ...mounted,
      sum,
    };
  },
};
``;
</script>
