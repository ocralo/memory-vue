import { describe, it, expect } from 'vitest'
import { duplicateAnimals } from '@/stores/utils'

describe('duplicateAnimals', () => {
	it('should duplicate animals', () => {
		const mockResponse = [
			{
				uuid: '1',
				slug: 'Lion',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
			{
				uuid: '2',
				slug: 'Tiger',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
			{
				uuid: '3',
				slug: 'Elephant',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
		]

		const result = duplicateAnimals(mockResponse)
		expect(result).toEqual([
			{
				uuid: '1',
				slug: 'Lion',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
			{
				uuid: '2',
				slug: 'Tiger',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
			{
				uuid: '3',
				slug: 'Elephant',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
			{
				uuid: '1-2',
				slug: 'Lion',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
			{
				uuid: '2-2',
				slug: 'Tiger',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
			{
				uuid: '3-2',
				slug: 'Elephant',
				image: { url: '', alt: '', contentType: '' },
				locale: '',
			},
		])
	})
})
