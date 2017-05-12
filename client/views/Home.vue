<template>
  <div class="page">
    <navMenu></navMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from 'components/navMenu'

export default {
  components: {
    NavMenu
  }
}

</script>
