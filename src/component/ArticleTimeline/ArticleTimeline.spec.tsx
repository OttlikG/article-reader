import React from 'react'
import { shallow } from 'enzyme'
import ArticleTimeline from './ArticleTimeline'

describe('ArticleTimeline', () => {
	it('should not throw when there is 0 article', () => {
		const component = shallow(<ArticleTimeline timelineArticles={[]} />)
		expect(() => component).not.toThrow()
	})

	it('should display important timeline article information', () => {
		const article = {
			imgSrc: 'https://placeholder.com',
			updateTime: 10,
			topInformationTag: 'CNN',
			articleHeadline: 'Test article',
			articleBody: 'Lorem ipsum',
		}
		const component = shallow(<ArticleTimeline timelineArticles={[article]} />)
		const timelineArticles = component.find('article')
		const articleComponent = component.find({ 'data-testid': `timeline-article-0` })

		expect(timelineArticles.length).toBe(1)
		expect(articleComponent.find('.update-time').text()).toBe('10')
		expect(articleComponent.find('.timeline-tag-content').text()).toBe('CNN')
		expect(articleComponent.find('.article-headline').text()).toBe('Test article')
		expect(articleComponent.find('.recent-article-body').text()).toBe('Lorem ipsum')
	})
})