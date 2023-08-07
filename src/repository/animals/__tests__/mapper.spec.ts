import { describe, it, expect } from 'vitest'
import transformAnimalsData from '@/repository/animals/mapper'
import type { AnimalsGameApi } from '@/repository/animals/interfaces/api'
import animalsResponse from '@/repository/animals/__mocks__/animals-response.json'

describe('transformAnimalsData', () => {
	it('should transform API response data to client data format', () => {
		const mockResponse: AnimalsGameApi.Response = animalsResponse

		const result = transformAnimalsData(mockResponse)

		expect(result).toEqual({
			animals: [
				{
					slug: 'lion',
					image: {
						url: 'lion.jpg',
						alt: 'Lion Image',
						contentType: 'image/jpeg',
					},
					uuid: '1',
					locale: 'en',
				},
				{
					slug: 'tiger',
					image: {
						url: 'tiger.jpg',
						alt: 'Tiger Image',
						contentType: 'image/jpeg',
					},
					uuid: '2',
					locale: 'en',
				},
			],
		})
	})

	it('should return an object with "error" key if there is an error during transformation', () => {
		const mockResponse = {} as AnimalsGameApi.Response

		const result = transformAnimalsData(mockResponse)

		expect(result).toEqual({ error: expect.any(Error) })
	})
})
