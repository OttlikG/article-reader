import React from 'react'
import { shallow } from 'enzyme'
import act from './act'

describe('act', () => {
	it('should call act actions', async () => {
		const actionsSpy = jest.fn()
		const component = shallow(<div></div>)
		await act(component, actionsSpy)
		
		expect(actionsSpy).toHaveBeenCalled()
	})
})