<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>归档</span>
      </div>
      <div v-if="articlesCount!=-1" class="text item">
        <span>文章总计</span>
        <span class="right">
          {{
          articlesCount
          }}
        </span>
      </div>
      <div v-if="categoriesCount!=-1" class="text item">
        <span>分类总计</span>
        <span class="right">
          {{
          categoriesCount
          }}
        </span>
      </div>
      <div v-if="usersCount!=-1" class="text item">
        <span>用户总计</span>
        <span class="right">
          {{
          usersCount
          }}
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Total",
  props: {
    articlesCount: { type: Number, default: -1 },
    categoriesCount: { type: Number, default: -1 },
    usersCount: { type: Number, default: -1 }
  }
};
</script>
<style scoped>
.right {
  float: right;
}
.box-card {
  margin-bottom: 10px;
}
</style>