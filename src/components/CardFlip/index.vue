<template>
	<button class="card" @click="handleClick">
		<img
			v-if="!isFlipped"
			class="card-front bg-red-400"
			:src="frontCard.src"
			:alt="frontCard.name"
			loading="lazy" />
		<img
			:src="backCard.src"
			:alt="backCard.name"
			v-else
			class="card-back bg-slate-400 rotate-y-180"
			loading="lazy" />
	</button>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import type { CardFlipComponent } from '@/components/CardFlip/interfaces'

	export default defineComponent({
		name: 'CardFlip',
	})
</script>

<script setup lang="ts">
	import { toRefs } from 'vue'

	const emit = defineEmits(['click'])

	const props = withDefaults(defineProps<CardFlipComponent.Props>(), {
		backCard: (): CardFlipComponent.Image => ({
			src: 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg',
			name: 'card back',
		}),
		frontCard: (): CardFlipComponent.Image => ({
			src: 'https://opengameart.org/sites/default/files/card%20back%20red.png',
			name: 'card front',
		}),
		flip: false,
	})

	const { flip: isFlipped } = toRefs(props)

	const handleClick = () => {
		emit('click', !isFlipped.value)
	}
</script>

<style src="./_index.scss" scoped />
