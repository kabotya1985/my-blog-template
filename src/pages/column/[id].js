import { useRouter } from "next/router";
import { client } from "libs/client";
// import Image from 'next/image';

const microCMSLoader = ({ src, width, quality }) => {
  return `${src}?auto=format&fit=max&w=${width}`;
};

export default function RecipeId({ article }) {
  return (
    <main className="p-6 font-sans">
      <img className="sm:w-9/12 mx-auto" src={article.eyecatch.url} height={article.eyecatch.height} width={article.eyecatch.width} loader={microCMSLoader} loading="lazy" alt="" layout="fill" objectfit="contain" />
      <article className="mx-auto sm:w-1/2">
        {/* <p className="mt-5 font-bold text-lg">〇〇さんのレシピ</p> */}
        <h1 className="text-2xl mx-auto font-bold">{article.title}</h1>
        {console.log(article)}
        <div>
          <div
            className="p-4"
            dangerouslySetInnerHTML={{
              __html: `${article.content[0].maincontent}`,
            }}
          />
        </div>
      </article>
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/column/${content.id}`);
  return { paths, fallback: "blocking" };
};

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      article: data,
    },
    revalidate: 10,
  };
};
