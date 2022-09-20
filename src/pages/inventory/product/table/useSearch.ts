import _ from 'lodash'
import React from 'react'
// import { useDebounce } from 'use-debounce'

type Props = {
	result: Array<FinishedProductProps>
}

const useSearch = (initialData: Array<FinishedProductProps>, value: string): Props => {
	// const [text, setText] = React.useState<string>('')
	// const [value] = useDebounce(text, 1000)

	const [result, setResult] = React.useState<Array<FinishedProductProps>>(initialData)

	React.useEffect(() => {
		if (value.length) {
			setResult(initialData.filter((a) => _.has(a, value)))
		}

		return () => {
			setResult([])
		}
	}, [value, initialData])

	return { result }
}

export default useSearch
