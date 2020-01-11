import React from 'react'
import { shallow } from 'enzyme'
import ArticleTimeline, { TimelineArticle, ArticleTimelineProps } from './ArticleTimeline'

describe('ArticleTimeline', () => {
	let props: ArticleTimelineProps
	let article: TimelineArticle

	beforeEach(() => {
		article = {
			imgSrc: 'https://placeholder.com',
			updateTime: '2019 12 29',
			topInformationTag: 'Index',
			articleHeadline: 'Test article',
			articleBody: 'Lorem ipsum'
		}
		props = {
			timelineArticles: [article],
			loadArticlesOnScroll: jest.fn()
		}
	})

	it('should not throw when there is 0 article', () => {
		props.timelineArticles = []
		const component = shallow(<ArticleTimeline {...props} />)
		expect(() => component).not.toThrow()
	})

	it('should display important timeline article information', () => {
		const component = shallow(<ArticleTimeline {...props} />)
		const timelineArticles = component.find('article')
		const articleComponent = component.find({ 'data-testid': `timeline-article-0` })

		expect(timelineArticles.length).toBe(1)
		expect(articleComponent.find('.update-time').text()).toBe('2019 12 29')
		expect(articleComponent.find('.timeline-tag-content').text()).toBe('Index')
		expect(articleComponent.find('.article-headline').text()).toBe('Test article')
		expect(articleComponent.find('.recent-article-body').text()).toBe('Lorem ipsum')
	})

	it('handle error on image load', () => {
		const component = shallow(<ArticleTimeline {...props} />)
		const imgProps = component.find({ 'data-testid': 'timeline-article-0' }).find('.article-heading img').props() as {onError: Function}
		const add = jest.fn()
		const event = {
			currentTarget: {
				style: { display: ''},
				closest: jest.fn(() => ({
					classList: {
						add
					}
				}))
			}
		}

		imgProps.onError(event)

		expect(event.currentTarget.style.display).toBe('none')
		expect(event.currentTarget.closest).toHaveBeenCalled()
		expect(add).toHaveBeenCalledWith('text-article')
	})
})