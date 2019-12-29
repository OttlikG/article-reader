import React from 'react'
import { shallow } from 'enzyme'
import ArticleView from './ArticleView'

describe('ArticleView', () => {
	it('should return with important information from ArticleView', () => {
		const props = {
			imgSrc: 'http://placeholder.com',
			author: {
				imgSrc: 'http://placeholder.com/author',
				name: 'John Doe',
			},
			articleHeading: 'Test article',
			articleTime: '10:30 27th December 2019',
			articleSummary: 'Lorem Ipsum',
			follow: {
				twitter: {
					shareCount: 10
				},
				facebook: {
					shareCount: 7
				}
			}
		}
		const component = shallow(<ArticleView {...props} />)

		expect(component.find('.article-heading img').props().src).toBe('http://placeholder.com')
		expect(component.find('.article-heading').text()).toBe('Test article')
		expect(component.find('.author-profile').props().src).toBe('http://placeholder.com/author')
		expect(component.find('.author-name').text()).toBe('John Doe')
		expect(component.find('.article-time').text()).toBe('10:30 27th December 2019')
		expect(component.find('.article-share .facebook').text()).toBe('7')
		expect(component.find('.article-share .twitter').text()).toBe('10')
		expect(component.find('.article-content').text()).toBe('Lorem Ipsum')
	})
})