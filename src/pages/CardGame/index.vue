<template>
	<header class="relative">
		<h1 class="text-3xl text-slate-900 font-medium text-center mb-4">
			{{ t('cardGame.title') }}
		</h1>
		<h2 class="text-2xl text-slate-900 font-medium text-center mb-4">
			{{ t('cardGame.user_welcome', { username: user }) }}
		</h2>
		<button
			@click="handleLogout"
			class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow md:absolute top-0 right-0 md:mt-4 md:mr-4 md:ml-0 my-4 md:w-auto mx-auto md:mx-0 block"
			:title="t('cardGame.exit')"
			type="button">
			{{ t('cardGame.exit') }}
		</button>
	</header>
	<TableCardsFlip></TableCardsFlip>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import { useRouter } from 'vue-router'

	export default defineComponent({
		name: 'CardGamePage',
	})
</script>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n'
	import TableCardsFlip from '@/containers/TableCardsFlip/index.vue'
	import { RoutePath } from '@/router/enum'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'

	const { t } = useI18n()
	const router = useRouter()

	const store = useUserStore()
	const { user } = storeToRefs(store)
	const { clearUser } = store

	const handleLogout = () => {
		clearUser()
		router.push(RoutePath.Home)
	}
</script>
