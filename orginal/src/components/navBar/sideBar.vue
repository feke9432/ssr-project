<template>
  <ul class="sideBar">
    <li 
      v-for="(item,index) in sideBar" 
      :key="index"
      :class="{'active':$route.params.title === item.title}" 
    >
      <router-link :to="{name:'home',params:{title:item.title}}" replace>
        <div>
          {{ item.Name }}
        </div>
      </router-link>
    </li>        
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SideBar',
  computed: {
    ...mapState('sideBar', {
      sideBar: 'sideBar'
    })
  }
}
</script>

<style lang="scss" scoped>
.sideBar {
  position: fixed;
  top: 90px;
  width: 110px;
  text-align: center;
  padding: 0 5px;
  background: #fff;
  font-size: $font-size-normal;
  li {
    line-height: 40px;
    border-bottom: 2px solid $border-color;
  }
}
.active {
  border-color: $red !important;
  & div {
    color: $red !important;
  }
}
</style>

