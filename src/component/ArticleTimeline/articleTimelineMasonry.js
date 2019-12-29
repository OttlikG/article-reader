let roots

function getOuterHeight(element) {
	const articleWrapper = element.querySelector('.article-wrapper')
	const style = getComputedStyle(articleWrapper)

	return parseInt(style.marginBottom) + articleWrapper.offsetHeight + parseInt(style.marginTop)
}

function onLoad() {
	const rootElements = document.getElementsByClassName('masonry-root')
	roots = Array.prototype.map.call(rootElements, (rootElement) => {
		const cellElements = rootElement.getElementsByClassName('masonry-cell')
		const cells = Array.prototype.map.call(cellElements, (cellElement) => {
			return {
				element: cellElement,
				outerHeight: getOuterHeight(cellElement)
			}
		})

		return {
			element: rootElement,
			noOfColumns: 2,
			cells
		}
	})

	onResize()
}

function onResize() {
	roots.forEach(root => {
		const newNoOfColumns = getComputedStyle(root.cells[0].element).maxWidth === '50%' ? 2 : 1
		root.noOfColumns = newNoOfColumns

		const columns = Array.from(new Array(root.noOfColumns)).map(column => {
			return {
				cells: new Array(),
				outerHeight: 0
			}
		})

		root.cells.forEach(cell => {
			const minOuterHeight = Math.min(...columns.map(column => column.outerHeight))
			const column = columns.find(column => column.outerHeight === minOuterHeight)

			const columnIndex = columns.findIndex(column => column.outerHeight === minOuterHeight)
			if (root.noOfColums === 2) {
				cell.element.classList.add(columnIndex % 2 === 0 ? 'first-column' : 'second-column')
			} else {
				cell.element.classList.remove(...['first-column', 'second-column'])
			}

			column.cells.push(cell)
			column.outerHeight += getOuterHeight(cell.element)
		})

		const masonryHeight = Math.max(...columns.map(column => column.outerHeight))

		let order = 0
		columns.forEach(column => {
			column.cells.forEach(cell => {
				cell.element.style.order = order++
				cell.element.style.flexBasis = 0
			})

			const articleWrapper = column.cells[column.cells.length - 1].element.querySelector('.article-wrapper')
			const flexBasis = articleWrapper.offsetHeight + masonryHeight - column.outerHeight - 1 + 'px'
			column.cells[column.cells.length - 1].element.style.flexBasis = flexBasis
		})

		root.element.style.maxHeight = masonryHeight + 1 + 'px'
	})
}

onLoad()
window.addEventListener('resize', onResize)