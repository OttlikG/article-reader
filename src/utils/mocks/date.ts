export default function mockedDate(expected: Date) {
	const _Date = Date

	function MockDate(mockOverride?: Date | string) {
		return new _Date(mockOverride || expected)
	}

	MockDate.UTC = _Date.UTC
	MockDate.parse = _Date.parse
	MockDate.now = () => expected.getTime()

	MockDate.prototype = _Date.prototype

	global.Date = MockDate as any

	return () => {
		global.Date = _Date
	}
}