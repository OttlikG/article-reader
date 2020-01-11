import React from "react";
import { mount } from "enzyme";
import { subDays } from "date-fns";
import mockDate from "../../utils/mocks/date";
import act from '../../utils/test/act'
import fetchMock from "fetch-mock";
import { ArticleFromResponse } from "../article-page/selector";
import ArticlePage from "./article-page";

describe("ArticlePage", () => {
	let sampleArticle: ArticleFromResponse;
	let date: any;

	beforeEach(() => {
		sampleArticle = {
			source: {
				id: "cnn",
				name: "CNN"
			},
			author: "John Doe",
			title: "Article title",
			description: "Article description",
			url: "http://article.com",
			urlToImage: "http://placeholder.com",
			publishedAt: "Sun Dec 29 2019 10:12:05 GMT+0100",
			content: "This is a content"
		};

		date = mockDate(new Date("2020"));
	});

	afterEach(() => {
		date();
	});

	it("fetch articles", async done => {
		const from = subDays(date, 1).toISOString()
		fetchMock.get(
			`https://newsapi.org/v2/everything?from=${from}&sources=cnn&page=1`,
			{
				articles: [
					sampleArticle,
					{
						...sampleArticle,
						title: "First headline article"
					}
				]
			}, {
				headers: {
					Authorization: 'Bearer 123'
				}
			}
		);

		const component = mount(<ArticlePage />);

		act(
			component,
			() => {
				const authorName = component
					.find({ "data-testid": "article-view" })
					.find(".author-name")
					.text();
				const timelineArticle = component
					.find(".article-headline")
					.at(1)
					.text();

				expect(authorName).toBe("John Doe");
				expect(timelineArticle).toBe("First headline article");
			},
			done
		);
	});

	it.only("should retrieve main article", () => {
		const from = subDays(new Date(), 1).toISOString();
		const url = `https://newsapi.org/v2/everything?from=${from}&sources=cnn&page=1`;

		fetchMock.get(
			url,
			{
				articles: [
					sampleArticle,
					{
						...sampleArticle,
						title: "First heading article"
					}
				]
			},
			{
				headers: {
					Authorization: 'Bearer 123'
				}
			}
		);

		const component = mount(<ArticlePage />);
		act(component, () => {
			const ArticleView = component.find('ArticleView')

			expect(ArticleView.props().title).toBe('Article title')
		})
	});
});
