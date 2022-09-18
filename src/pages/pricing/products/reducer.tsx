import AnchorBoltProduct from './anchor-bolt/AnchorBoltProduct'
import HexBoltProduct from './hex-bolt/HexBoltProduct'
import SagRodProduct from './sag-rod/SagRodProduct'
import UBoltProduct from './u-bolt/UBoltProduct'

type Action = string

type State = JSX.Element | null

const pageComponentReducer = (state: State, action: Action): State => {
	switch (action) {
		default:
			return null

		case 'sag-rod':
			return <SagRodProduct />
		case 'anchor-bolt':
			return <AnchorBoltProduct />
		case 'hex-bolt':
			return <HexBoltProduct />
		case 'u-bolt':
			return <UBoltProduct />
	}
}

export default pageComponentReducer
