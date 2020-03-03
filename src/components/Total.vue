<template>
  <div>
    <p>归档</p>
    <ul class="list-group">
      <li
        v-if="articlesCount!=-1"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>文章总计</span>
        <span class="badge badge-pill badge-info">
          {{
          articlesCount
          }}
        </span>
      </li>
      <li
        v-if="categoriesCount!=-1"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>分类总计</span>
        <span class="badge badge-pill badge-info">
          {{
          categoriesCount
          }}
        </span>
      </li>
      <li
        v-if="usersCount!=-1"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>用户总计</span>
        <span class="badge badge-pill badge-info">
          {{
          usersCount
          }}
        </span>
      </li>
    </ul>
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