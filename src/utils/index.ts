export const shuffleArray = <T>(arr: T[]): T[] => {
	const result: T[] = [...arr]
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[result[i], result[j]] = [result[j], result[i]]
	}

	return result
}
