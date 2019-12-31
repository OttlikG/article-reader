
export default () => {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector
			|| Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s: string) {
			var el = this as HTMLElement

			do {
				if (el.matches(s)) return el
				el = (el.parentElement as HTMLElement) || el.parentNode
			} while (el !== null || (el as HTMLElement).nodeType === 1)

			return null
		}
	}
}