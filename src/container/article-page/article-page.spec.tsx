import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import fetchMock from 'fetch-mock'
import { ArticleFromResponse } from '../article-page/selector'
import ArticlePage from './article-page'

const actions = async (component, _actions: Function, done: Function) => {
	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0))
		component.update()
		_actions()
		if (done) done()
	})
}

describe('ArticlePage', () => {
	let sampleArticle: ArticleFromResponse

	beforeEach(() => {
		sampleArticle = {
			source: {
				id: 'cnn',
				name: 'CNN'
			},
			author: 'John Doe',
			title: 'Article title',
			description: 'Article description',
			url: 'http://article.com',
			urlToImage: 'http://placeholder.com',
			publishedAt: 'Sun Dec 29 2019 10:12:05 GMT+0100',
			content: 'This is a content'
		}
	})

	it('fetch articles', async (done) => {
		fetchMock.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=123', {
			articles: [
				sampleArticle,
				{
					...sampleArticle,
					title: 'First headline article'
				}
			]
		})
		
		const component = mount(<ArticlePage />)
		actions(component, () => {
			const authorName = component.find({ 'data-testid': 'article-view' }).find('.author-name').text()
			const timelineArticle = component.find('.article-headline').at(1).text()

			expect(authorName).toBe('John Doe')
			expect(timelineArticle).toBe('First headline article')
		}, done)
	})
})