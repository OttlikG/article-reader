export default (data: {
	[index: string]: string
	from: string,
	sources: string,
	page: string
}) => {
	const queryString = new URLSearchParams()
	Object.keys(data).forEach(key => {
		queryString.set(key, data[key] as string)
	})

	return decodeURIComponent(queryString.toString())
}
