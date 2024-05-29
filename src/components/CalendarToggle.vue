<template>
  <div>
    <button type="button" class="w-full flex items-center" @click="active = !active">
      <p class="mr-10">
        {{ title }}
      </p>

      <span v-if="count" class="bg-indigo-500 h-5 w-5 rounded-full text-white text-sm ml-auto flex-none">
        {{ count }}
      </span>

      <ChevronDownIcon class="h-4 transform ml-2" :class="{'rotate-180': active}"/>
      
    </button>
    <div v-if="active" class="border-t mt-2">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: [Number, String],
    default: null,
  },
});

const active = ref(false);
</script>
