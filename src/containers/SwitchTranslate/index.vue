<template>
	<label class="relative inline-flex items-center cursor-pointer">
		<input type="checkbox" v-model="isEnglish" class="sr-only peer" checked />
		<div
			class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
		<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
			t('switchTranslate.english')
		}}</span>
	</label>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'SwitchTranslateContainer',
	})
</script>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n'
	import { ref, watch } from 'vue'

	const { locale, t } = useI18n()
	const isEnglish = ref(false)

	const handleChangeLocale = (value: boolean) => {
		if (value) {
			locale.value = 'us'
		} else {
			locale.value = 'co'
		}
	}

	watch(isEnglish, handleChangeLocale)
</script>
