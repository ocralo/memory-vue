import { vi, describe, it, expect, type Mock } from 'vitest'
import requestBase from '@/repository'
import { getAnimals } from '@/repository/animals'

vi.mock('@/repository')

describe('getAnimals', () => {
	it('should return animals', async () => {
		;(requestBase.get as Mock).mockResolvedValue({ data: 'data' })
		await getAnimals({ perPage: 10 })
		expect(requestBase.get).toHaveBeenCalled()
	})
})
