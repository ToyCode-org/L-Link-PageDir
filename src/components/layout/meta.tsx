import Head from "next/head";
import { getPublicImage } from "@/util/getPubliceImage";

export const Meta = () => {
  return (
    <Head>
      <title>로아링크</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="로스트아크 정보 몰아보기" />
      <meta
        name="keywords"
        content="로아, 로스트아크, 로아컨텐츠, 로아이벤트"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="로아링크" />
      <meta property="og:description" content="로스트아크 정보 몰아보기" />
      <meta property="og:image" content={`${getPublicImage("logo")}`} />
      <meta property="og:url" content="http://www.mysite.com" />
    </Head>
  );
};
