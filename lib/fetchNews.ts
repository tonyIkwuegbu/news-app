import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
	category?: Category | string,
	keywords?: string,
	isDynamic?: boolean,
) => {
	// step 1: GraphQL query
	const query = gql`
		query myQuery(
			$access_key: String!
			$categories: String!
			$keywords: String
		) {
			myQuery(
				access_key: $access_key
				categories: $categories
				countries: "us"
				keywords: $keywords
				sort: "published_desc"
			) {
				data {
					author
					category
					country
					description
					image
					language
					published_at
					source
					title
					url
				}
				pagination {
					count
					limit
					offset
					total
				}
			}
		}
	`;
	//step 2: fetch function with Next.js 13 caching
	const res = await fetch(
		" https://accrington.stepzen.net/api/exasperated-iguana/__graphql",
		{
			method: "POST",
			cache: isDynamic ? "no-cache" : "default",
			next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
			headers: {
				"Content-Type": "application/json",
				Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
			},
			body: JSON.stringify({
				query,
				variables: {
					access_key: process.env.MEDIASTACK_API_KEY,
					categories: category,
					keywords: keywords,
				},
			}),
		},
	);
	const newsResponse = await res.json();

	//step 3: sort function by images vs not images present
	const news = sortNewsByImage(newsResponse?.data?.myQuery);
	// return res

	return news;
};

export default fetchNews;
