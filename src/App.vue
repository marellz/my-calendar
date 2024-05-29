
<template>
  <header class="py-10 bg-gray-100">
    <div class="container mx-auto">
      <img alt="Vue logo" class="h-12" src="./assets/logo.svg" />
    </div>
  </header>

  <main>
    <div class="bg-gray-100 h-48">
      <div class="container mx-auto pt-86">
        <div class="flex justify-center">
            <CustomCalendar />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import CustomCalendar from '@/components/CustomCalendar.vue'
export default{
  components:{
    CustomCalendar
  }
}
</script>