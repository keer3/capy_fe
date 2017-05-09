<template>
  <div class="page">
    <el-button>Hello World</el-button>
    <counter></counter>
    <p>
      To get started, edit files in <code>./client</code> and save.
    </p>
  </div>
</template>

<script>
import Counter from 'components/Counter'
import NavMenu from 'components/NavMenu'

export default {
  components: {
    Counter,
    NavMenu
  }
}

</script>
