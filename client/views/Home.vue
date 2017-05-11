<template>
  <div class="page">
    <navMenu></navMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import Counter from 'components/Counter'
import NavMenu from 'components/navMenu'

export default {
  components: {
    Counter,
    NavMenu
  }
}

</script>
