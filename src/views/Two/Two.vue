<template>
  <div id="Two">
    <p>Two组件</p>
    <p>
      {{ obj.age }}
    </p>
    <button @click="changeChildren">修改父组件</button>
    <br />
    <!-- ref -->
    <img
      ref="image"
      src="@/assets/logo.png"
      style="width: 130px; height: 90px; position: absolute; top: 0; left: 0"
    />
    <!--  -->
    <button @click="test">测试按钮</button>
  </div>
</template>

<script>
// onMounted
// getCurrentInstance
import { toRefs, ref, reactive } from "vue";
export default {
  name: "Two",
  props: {
    obj: {
      type: Object,
      // 引用数据类型,需要用函数来表示默认值
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    // 结构 父传子 数据
    const { obj } = toRefs(props);
    console.log(obj.value);
    // 子向父传递事件
    const changeChildren = () => {
      emit("changeChildren", "999");
    };
    // ref 获取页面DOM元素
    const image = ref(null);
    console.log(image);
    const position = reactive({
      x: 0,
      y: 0,
    });
    const XY = toRefs(position);
    // const mouseMovesFn = (el) => {
    //   XY.x.value = el.x;
    //   XY.y.value = el.y;
    //   image.value.style.top = el.y - 45 + "px";
    //   image.value.style.left = el.x - 65 + "px";
    // };
    // onMounted(() => {
    //   window.addEventListener("mousemove", mouseMovesFn);
    // });
    return {
      changeChildren,
      image,
      ...XY,
    };
  },
  created() {},
  methods: {
    test() {
      console.log(this.obj.age);
    },
  },
};
</script>

<style></style>
