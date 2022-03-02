<template>
  <div id="One">
    <p>One</p>
    <p>创建深度响应式对象</p>
    <p>名字：{{ obj.name }}</p>
    <p>年龄：{{ obj.age }}</p>
    <p>爱好：{{ obj.hobby }}</p>
    <p>儿子：{{ obj.children }}</p>
    <p>
      <span>toRef === 浅拷贝</span>
      ====
      <span>{{ obj2 }}</span>
      ====
      <button @click="changeNameFn">点击修改</button>
    </p>
    <p>
      <span>toRefs === 深拷贝</span>
      ====
      <span>{{ age }}</span>
      ====
      <button @click="changeAgeFn">点击修改2</button>
    </p>
    <br />
    <!-- 子组件 -->
    <Two :obj="obj" @changeChildren="changeChildrenFn" />
    <!-- 路由跳转 -->
    <button @click="skip">点击跳转到Three</button>
  </div>
</template>

<script>
import { reactive, watch, toRef, toRefs } from "vue";
import { useRouter } from "vue-router";
import Two from "@/views/Two/Two";
export default {
  name: "One",
  components: { Two },
  setup() {
    const obj = reactive({
      name: "深度式响应对象",
      age: 18,
      hobby: ["吃饭", "睡觉", "打豆豆"],
      children: {
        name: "儿孙满堂",
        age: 10,
        hobby: () => {
          console.log("打Switch");
        },
      },
    });
    //  toRef 引用对象属性 两者保持关联
    //  不可解构
    const obj2 = toRef(obj, "name");
    const changeNameFn = () => {
      obj.name = "修改了";
    };
    //  toRefs 深拷贝
    //  可解构
    const obj3 = toRefs(obj);
    const changeAgeFn = () => {
      obj.age += 1;
    };
    // 侦听
    watch(
      obj,
      (newVal) => {
        console.log(newVal.name, "侦听");
      },
      { deep: true, immediate: true }
    );
    // 子传父 事件
    const changeChildrenFn = (children) => {
      obj.age = children;
    };
    const router = useRouter();
    const skip = () => {
      router.push({
        path: "/three",
      });
    };
    return {
      obj,
      obj2,
      changeNameFn,
      ...obj3,
      changeAgeFn,
      changeChildrenFn,
      skip,
    };
  },
};
</script>

<style></style>
