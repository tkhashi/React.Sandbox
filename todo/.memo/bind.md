# Function.prototype.bind(...arg)
関数内の`this`を第一引数に更新して関数オブジェクトを生成して返す（関数は実行されない）。

第二引数以降はレシーバのFunctionの引数として渡される。
レシーバに関数がない場合は無視される。

### 使いどころ
#### thisを指定
Functionの中で`this`を扱っている場合、`this`は呼び出し元に依存する。

```js
// 変数内で関数を宣言している場合
const module = {
  x: 42,
  y: 31,
  getX: function () {
    return this.x;
  },
};
const module2 = {
  x: 111,
  y: 222,
}

// thisは呼び出し元
console.log(module.getX()) // output: 42 呼び出し元がmoduleなのでthisはmoduleとなる。
const getXFunc = module.getX.bind(module, null) // 第二引数は無視される
console.log(getXFunc()) // output: 42
// 呼び出し元に関わらずthisを変更
const getXFunc2 = module.getX.bind(module2) // 呼び出し元はmoduleだが、module2を指定 
console.log(getXFunc2()) // output: 111 // thisはmodule2になる


// グローバルに関数を宣言している場合
function getY(){
  return this.y
}

console.log(getY()) // output: undefined thisが指定されていないので`undefinde`

const getYFunc = getY.bind(module)
console.log(getYFunc) // output: function () { [native code] }
console.log(getYFunc()) // output: 31  関数なので()で実行
console.log(getY.bind(module)()) // output: 31 直接呼び出す場合も同様
```

#### 引数を指定した関数オブジェクト
引数を指定した関数オブジェクトとして使う場合は、`bind()`で引数を拘束した関数オブジェクトとして扱う。

```js
function getSomething(any){
  return any;
}
const something = getSomething.bind(null,'SOMETHING'); // 引数を拘束
console.log(something()) // output: 'SOMETHING' // 引数はbind()で拘束されているため新たな引数は不要
```

#### イベントハンドラとして扱う
`bind()`の返り値は関数オブジェクトなのでイベントハンドラとして扱える。

```jsx
const handleClick = (key) => {
  console.log(key)
}
return (
  <div>
    // thisをnull, handleClick()の第一位引数を'hoge'として指定
    <a onClick={handleClick.bind(null, 'hoge')}> // 関数内でthisが扱われない場合はnull
      Clickable
    </a>
    <a onClick={handleClick.bind(null, 'fuga')}> 
      Clickable2
    </a>
  </div>
)
```
`onClick={handleClick('hoge')}`とすると`handleClick`は`undefined`を返すため、`onClick`に登録するイベントハンドラとして正しくない。
`bind()`は返り値が関数オブジェクトであるためイベントハンドラとして正しい。

参考: [Function.prototype.bind() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)  

## this
thisの既定値はグローバルオブジェクトとなり、実行環境により変わる。
- ブラウザ
  - window
- Node.js 
  - global

※strictモード(`use strict`)ではデフォルトは`undefined`となる。

### 変数内
this === {変数} // true

### 関数内
呼び出し方法による
```js
var obj = { 
  a: "Custom" 
};
var a = "Global";

function whatsThis() {
  return this.a; 
}

whatsThis(); // 'Global' が関数内の this として obj に設定されています
whatsThis.bind(obj)(); // 'Custom' が関数内の this として obj に設定されています
whatsThis.call(obj); // 'Custom' が関数内の this として obj に設定されています
whatsThis.apply(obj); // 'Custom' が関数内の this として obj に設定されています
```

この時、`const`, `let`で宣言すると、グローバルコンテキストであってもブロックスコープの変数として扱われ、windowオブジェクト（またはグローバルオブジェクト）にプロパティとして追加されない。

