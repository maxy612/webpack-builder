<template>
  <div class="searchWrapper">
    search box wrapper \{{ msg }}
    <div class="imgWrapper">
      <img src="../../assets/bg-main.png" class="searchImg" @click="handleClick" />
      <img src="../../assets/tax-all.png" class="searchImg2" />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "hello,world"
    };
  },

  methods: {
    handleClick() {
      console.log(22222);
    }
  }
};
</script>

<style>
body {
  background: #f00;
}
</style>

<style lang="less" scoped>
.searchWrapper {
  width: 100%;
}

.imgWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.searchImg {
  width: 300px;
  margin-right: 30px;
}

.searchImg2 {
  width: 400px;
}
</style>