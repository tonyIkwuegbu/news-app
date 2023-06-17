import fetchNews from "@/lib/fetchNews";
import NewsList from "../../NewsList";
import { categories } from "@/constants";

type Props = {
	params: { category: Category };
};

async function NewsCategoryPage({ params: { category } }: Props) {
	const news: NewsResponse = await fetchNews(category);

	return (
		<div>
			<h1 className="headerTitle pb-4">{category}</h1>
			<NewsList news={news} />
		</div>
	);
}

export default NewsCategoryPage;

export async function generateStaticParams() {
	return categories.map((category) => ({
		category: category,
	}));
}
// ****** prebuild these pages...
