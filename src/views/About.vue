<template>
  <div>
    <h1>Przychody</h1>
    <DataTable></DataTable>
  </div>
</template>
<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'about',
  components: {
    DataTable
  }
}
</script>
