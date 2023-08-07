import {
	vi,
	type Mock,
	describe,
	it,
	beforeEach,
	expect,
	afterEach,
} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAnimalGameStore } from '@/stores/animalsGame'
import { PROMISE_STATE } from '@/utils/enums'
import { getAnimals } from '@/repository/animals'

vi.mock('@/repository/animals')

describe('useAnimalGameStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	it('should have the correct initial state', () => {
		const store = useAnimalGameStore()

		expect(store.animalsState).toBeNull()
		expect(store.promiseState).toBe(PROMISE_STATE.IDLE)
		expect(store.errorState).toBeNull()
		expect(store.successPoints).toBe(0)
		expect(store.errorPoints).toBe(0)
		expect(store.maxAnimals).toBe(4)
	})

	describe('obtainAnimals', () => {
		it('should obtain animals', async () => {
			const mockResponse = {
				animals: [
					{ uuid: '1', slug: 'Lion' },
					{ uuid: '2', slug: 'Tiger' },
					{ uuid: '3', slug: 'Elephant' },
				],
			}

			;(getAnimals as Mock).mockResolvedValue(mockResponse)

			const store = useAnimalGameStore()
			await store.obtainAnimals()
			expect(getAnimals).toHaveBeenCalled()
			expect(store.animalsState).not.toBeNull()
			expect(store.promiseState).toBe(PROMISE_STATE.RESOLVED)
		})

		it('should obtain empty animals', async () => {
			const mockResponse = null

			;(getAnimals as Mock).mockResolvedValue(mockResponse)

			const store = useAnimalGameStore()
			await store.obtainAnimals()
			expect(getAnimals).toHaveBeenCalled()
			expect(store.animalsState).toBeNull()
			expect(store.promiseState).toBe(PROMISE_STATE.REJECTED)
		})

		it('should not obtain animals', async () => {
			;(getAnimals as Mock).mockRejectedValue('Error')
			const store = useAnimalGameStore()
			await store.obtainAnimals()
			expect(getAnimals).toHaveBeenCalled()
		})
	})

	describe('flipAnimalCard', () => {
		it('should flip animal card', () => {
			const store = useAnimalGameStore()
			store.animalsState = [
				{
					uuid: '1',
					slug: 'Lion',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
				{
					uuid: '2',
					slug: 'Tiger',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
				{
					uuid: '3',
					slug: 'Elephant',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
			]
			store.flipAnimalCard(true, '1')
			expect(store.animalsState).toEqual([
				{
					uuid: '1',
					slug: 'Lion',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: true,
					completed: false,
				},
				{
					uuid: '2',
					slug: 'Tiger',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
				{
					uuid: '3',
					slug: 'Elephant',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
			])
		})

		it('should flip animal card and complete', () => {
			const store = useAnimalGameStore()
			store.animalsState = [
				{
					uuid: '1',
					slug: 'Lion',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: true,
				},
				{
					uuid: '2',
					slug: 'Tiger',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: true,
				},
				{
					uuid: '3',
					slug: 'Elephant',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: true,
				},
			]
			store.flipAnimalCard(true, '1')
			store.flipAnimalCard(true, '2')
			store.flipAnimalCard(true, '3')
			expect(store.animalsState).toEqual([
				{
					uuid: '1',
					slug: 'Lion',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: true,
					completed: true,
				},
				{
					uuid: '2',
					slug: 'Tiger',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: true,
					completed: true,
				},
				{
					uuid: '3',
					slug: 'Elephant',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: true,
					completed: true,
				},
			])
		})
	})

	describe('resetGame', () => {
		it('should reset game', () => {
			const store = useAnimalGameStore()
			store.animalsState = [
				{
					uuid: '1',
					slug: 'Lion',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: true,
				},
				{
					uuid: '2',
					slug: 'Tiger',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: true,
				},
				{
					uuid: '3',
					slug: 'Elephant',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: true,
				},
			]
			store.resetGame()
			expect(store.animalsState).toEqual(null)
		})
	})

	describe('addSuccessPoint', () => {
		it('should add success point', () => {
			const store = useAnimalGameStore()
			store.addSuccessPoint()
			expect(store.successPoints).toBe(1)
		})
	})

	describe('addErrorPoint', () => {
		it('should add error point', () => {
			const store = useAnimalGameStore()
			store.addErrorPoint()
			expect(store.errorPoints).toBe(1)
		})
	})

	describe('setMaxAnimals', () => {
		it('should set max animals', () => {
			const store = useAnimalGameStore()
			store.setMaxAnimals(8)
			expect(store.maxAnimals).toBe(8)
		})
	})

	describe('completedAnimal', () => {
		it('should set completed animal', () => {
			const store = useAnimalGameStore()
			store.animalsState = [
				{
					uuid: '1',
					slug: 'Lion',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
				{
					uuid: '2',
					slug: 'Tiger',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
				{
					uuid: '3',
					slug: 'Elephant',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
			]
			store.completedAnimal('1')
			expect(store.animalsState).toEqual([
				{
					uuid: '1',
					slug: 'Lion',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: true,
				},
				{
					uuid: '2',
					slug: 'Tiger',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
				{
					uuid: '3',
					slug: 'Elephant',
					image: { url: '', alt: '', contentType: '' },
					locale: '',
					flip: false,
					completed: false,
				},
			])
		})
	})
})
