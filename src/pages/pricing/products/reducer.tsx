import SagRodProduct from './sag-rod/SagRodProduct'

type Action = string

type State = JSX.Element

const pageComponentReducer = (state: State, action: Action): State => {
	switch (action) {
		default:
			return state

		case 'sag-rod':
			return <SagRodProduct />
	}
}

export default pageComponentReducer
