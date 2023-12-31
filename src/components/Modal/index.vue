<template>
	<div class="container mx-auto">
		<div class="flex justify-center">
			<div
				v-show="isOpen"
				@click.stop="handleClose"
				class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-10">
				<div @click.stop class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
					<div class="flex items-center justify-between">
						<div>
							<slot name="title"></slot>
						</div>
						<button
							:title="t('modal.close')"
							class="cursor-pointer"
							@click="handleClose">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 h-8 text-slate-700 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</button>
					</div>
					<div class="mt-4">
						<slot name="content"></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, toRefs, watch } from 'vue'
	import type { ModalComponent } from './interfaces'
	export default defineComponent({
		name: 'ModalComponent',
	})
</script>
<script setup lang="ts">
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n()
	const emit = defineEmits(['close', 'cancel', 'success'])

	const props = defineProps<ModalComponent.Props>()

	const { isOpen } = toRefs(props)
	const handleClose = () => {
		emit('close', !isOpen.value)
	}

	const handleScroll = (value: boolean) => {
		if (value) {
			document.body.style.overflow = 'hidden'
			window.scrollTo(0, 0)
		} else {
			document.body.style.overflow = 'auto'
		}
	}

	watch(isOpen, handleScroll)
</script>
