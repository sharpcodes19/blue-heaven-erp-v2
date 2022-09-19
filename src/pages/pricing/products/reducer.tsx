import AnchorBoltProduct from './anchor-bolt/AnchorBoltProduct'
import DynaBoltProduct from './dyna-bolt/DynaBoltProduct'
import HangerProduct from './hanger/HangerProduct'
import HexBoltProduct from './hex-bolt/HexBoltProduct'
import JBoltProduct from './j-bolt/JBoltProduct'
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
		case 'j-bolt':
			return <JBoltProduct />
		case 'dyna-bolt':
			return <DynaBoltProduct />
		case 'hanger':
			return <HangerProduct />
	}
}

export default pageComponentReducer
