こんにちは、戸田です。
今回は React Router v6.4 以降を使用する際にどのルーティング方法を使えばいいのか自分の言葉でブログにまとめました。
基本的には[公式ドキュメント](https://reactrouter.com/en/main)の Picking a Router というページに書いてあることですので参考にしてください。
https://reactrouter.com/en/main/routers/picking-a-router

## まず結論

シンプルなルーティングの`BrowserRouter`か`createBrowserRouter`で迷ったら**createBrowserRouter**を使いましょう！
以下がサンプルコードです。

```jsx:App.js
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

const Parent = () => {
  return (
    <div>
      <h1>Parent</h1>
      <Outlet />
    </div>
  )
}

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>Home</h1>,
    }, {
      path: "/path1",
      element: <h1>Path1</h1>,
    }, {
      path: "/parent",
      element: <Parent />,
      children: [
        {
          path: "child",
          element: <h2>Child</h2>
        }
      ]
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
};

export default App;
```

ですが、これだと JSX 記法ではないし直感的ではありません。
そんな方には**createRoutesFromElements**を使うことをオススメします！createRoutesFromElements を使うと BrowserRouter と同じように Route コンポーネントの JSX 記法で記述することができます。個人差はあるかと思いますが、僕はこちらの方が好きです。

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/path1" element={<h1>Path1</h1>} />
      <Route path="/parent" element={<Parent />}>
        <Route path="child" element={<h2>Child</h2>} />
      </Route>
    </Route>
  )
);
```

## createBrowserRouter を使う理由

`createBrowserRouter`を使う理由は[**Data APIs**](https://reactrouter.com/en/main/routers/picking-a-router#data-apis)が使えるからです。要するに Data APIs がどんなものかを理解すれば`BrowserRouter`と`createBrowserRouter`の違いは理解できます。

### 簡単に Data APIs を理解する

ざっくり言えば、Data APIs を使うとルーティング前の処理、フォームの処理などができます。

```jsx
<Route
  path="/"
  element={<h1>Home</h1>}
  loader={async () => {
    // ルーティング時の処理
  }}
  action={async () => {
    // フォーム送信の際の処理
  }}
/>
```

Data APIs を使わない時のコードでは useEffect 内でのローディングや onSubmit からのイベントハンドリングで処理など、自分で記述するコードを書く必要があります。そこをルーティング時の処理として React Router がまとめてくれると非常に楽です。

:::datails Data APIs を使わない際の処理の例

```jsx:Test.jsx
const Test = () => {
  useEffect(() => {
    // ローティング時の処理
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // フォーム送信の際の処理
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit">submit</button>
    </form>
  );
};
```

:::

### loader の使い方

最もベーシックな認証チェックを行う loader の例は以下の通りです。
この例では Home コンポーネントを読み出す前に homeLoader で認証情報を確認し、認証されていない場合はログイン画面にリダイレクトしています。

```jsx
<Route path="/" element={<Home />} loader={homeLoader} />
```

```jsx::Home.jsx
import React from 'react'
import { redirect, useLoaderData } from 'react-router';

export const homeLoader = async () => {
  const user = await checkAuthStatus(); //認証情報を取得
  if (!user) return redirect("/login") //認証されていなかったらリダイレクト
  return { user }
}
export const Home = () => {
  const { user } = useLoaderData() //userを取得する
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  )
}

```

### action の使い方

form を使用する際に action はとても便利です。action を使用した form の実装例は以下の通りです。
この例はログインフォームの認証を action で実装しています。

```jsx:App.jsx
<Route path="/login" element={<Login />} action={loginAction} />
```

```jsx:Login.jsx
import { Form, redirect, useActionData } from 'react-router-dom'


export const loginAction = async ({ request }) => {
  // フォームデータを取得
  const formData = await request.formData();
  const email = formData.get("email")
  const password = formData.get("password")
  try {
    //認証の処理 (email, password) => boolean
    const isAuth = await isCheckLogin(email, password);
    //認証成功時: ルートにリダイレクト
    if (isAuth) return redirect("/")
    return { error: "Invalid credentials" };
  } catch (error) {
    return { error: "Login failed. Please try again." };
  }
}
export const Login = () => {
  // アクションからのデータ（エラーメッセージなど）を取得
  const actionData = useActionData();
  return (
    <div>
      <h1>Login</h1>
      {/* Formコンポーネントを使用する */}
      <Form method='post'>
        <div>
          <input type="email" name='email' />
        </div>
        <div>
          <input type="password" name='password' />
        </div>
        {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}


```

## 知っておく方がいいもの

### パスパラメーターの取得方法

記事の ID ごとに URL を分けて管理したい場合のコードは以下です。
Route の path に":articleId"とすることで loader や action の引数の params で取得することができます。
このコードでは loader で params を受け取って記事 ID から記事を取得しています。
さらに Suspense を使用してコメントをローディングしている際には Loading を表示するようにしています。

```jsx
<Route path="/articles">
  <Route path=":articleId" element={<Article />} loader={articleLoader} />
</Route>
```

```jsx
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router";

const fetchArticle = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "article1" });
    }, 1000);
  });
};
const fetchComment = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: "test comment" });
    }, 3000);
  });
};

export const articleLoader = async ({ params }) => {
  return defer({
    commentPromise: fetchComment(params.articleId),
    article: await fetchArticle(params.articleId),
  });
};

export const Article = () => {
  const { article } = useLoaderData();
  return (
    <div>
      <h1>{article.name}</h1>
      <Comment />
    </div>
  );
};

const Comment = () => {
  const { commentPromise } = useLoaderData();
  return (
    <Suspense fallback={<p>Loading comment...</p>}>
      <Await resolve={commentPromise}>{(comment) => <h1>{comment.title}</h1>}</Await>
    </Suspense>
  );
};
```

子コンポーネントの Comment でも useLoaderData()で commentPromise を取得できます。このおかげで props のバケツリレーが必要ないのですごく楽！

defer 関数については以下の記事が読みやすく、参考になりました。
https://zenn.dev/azukiazusa/articles/react-router-delay-loader

データ取得に関係する部分は以下の公式ドキュメントを参考にするといいと思いました。
https://reactrouter.com/en/main/guides/deferred#why-not-defer-everything-by-default

###　クエリパラメータの取り扱い

クエリパラメータを使用して、記事の言語と文字サイズの指定をしたコードが以下です。
lang は loader の中で記事データ取得の際、fs は Article コンポーネント内で文字サイズの指定の際に使用しています。loader の中では hooks が使えないので url からの取得です。逆に Article コンポーネントの中では useSearchParams という hooks を使用して簡単に取得できます。

```jsx
export const articleLoader = async ({ params, request }) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  return defer({
    commentPromise: fetchComment(params.articleId, lang),
    article: await fetchArticle(params.articleId, lang), //langにenが入っていたら英語の記事を取得
  });
};

export const Article = () => {
  const { article } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const fontSize = searchParams.get("fontsize") ?? 1;
  return (
    <div style={{ fontSize: Number(fontSize) + "rem" }}>
      <h1>{article.name}</h1>
      <Comment />
    </div>
  );
};

const Comment = () => {
  const { commentPromise } = useLoaderData();
  return (
    <Suspense fallback={<p>Loading comment...</p>}>
      <Await resolve={commentPromise}>{(comment) => <h1>{comment.title}</h1>}</Await>
    </Suspense>
  );
};
```

## まとめ

今回は React Router で
