<template>
  <div>
      <p>
          获取到的基本参数有
      </p>
    <div v-if="orgId">
      <p>组织id为：{{orgId}}</p>
      <p>户主id为：{{userId}}</p>
    </div>
    <div v-else>暂时没有获取到相关的信息：{{orgId}}...{{userId}}</div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      orgId: "",
      userId: ""
    };
  },
  mounted() {
    this.orgId = this.$route.query.orgId;
    this.userId = this.$route.query.userId;
    console.log("-------orgId--------------");
    console.log(this.orgId);
    console.log("----------userId-----------");
    console.log(this.userId);
  }
};
</script>

<style>
</style>