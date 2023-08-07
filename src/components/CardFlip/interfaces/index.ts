export namespace CardFlipComponent {
	export interface Image {
		name: string
		src: string
	}

	export interface Props {
		backCard: Image
		frontCard?: Image
		flip?: boolean
	}
}
