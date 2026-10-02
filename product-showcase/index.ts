// 1. Item インターフェースの定義
interface Item {
  type: "book" | "electronics" | "clothing";
  id: string;
  price: number;
}

// 2. 各商品のインターフェース定義 (Item を拡張)
interface Book extends Item {
  type: "book";
  title: string;
  author: string;
}

interface Electronics extends Item {
  type: "electronics";
  item: string;
  model: string;
  warranty?: number;
}

interface Clothing extends Item {
  type: "clothing";
  item: string;
  brand: string;
  size?: "S" | "M" | "L";
}

// 3. Product ユニオン型の定義
type Product = Book | Electronics | Clothing;

// 4. ジェネリッククラス Collection の定義
class Collection<T> {
  items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  getAll(): T[] {
    return this.items;
  }

  filter(callback: (item: T) => boolean): T[] {
    return this.items.filter(callback);
  }
}

// 5. renderProduct 関数の定義 (型絞り込み)
function renderProduct(product: Product): string {
  let details = "";

  if (product.type === "book") {
    details = `Book: ${product.title} by ${product.author}`;
  } else if (product.type === "electronics") {
    details = `Electronics: ${product.item} - ${product.model}`;
    if (product.warranty !== undefined) {
      details += ` - Warranty: ${product.warranty} year(s)`;
    }
  } else if (product.type === "clothing") {
    details = `Clothing: ${product.item} by ${product.brand}`;
    if (product.size !== undefined) {
      details += ` - Size ${product.size}`;
    }
  } else {
    throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
  }

  return `
    <div class="item" id="${product.id}">
      <div>${details}</div>
      <div class="price">${product.price}</div>
    </div>
  `;
}

// 6. 各商品タイプのアイテムを含む Collection インスタンスの作成
const products = new Collection<Product>([
  {
    type: "book",
    id: "b1",
    price: 15,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    type: "electronics",
    id: "e1",
    price: 999,
    item: "Laptop",
    model: "Pro X",
    warranty: 2,
  },
  {
    type: "clothing",
    id: "c1",
    price: 29,
    item: "T-Shirt",
    brand: "Nike",
    size: "M",
  },
]);

// 7. showProducts 関数の定義
function showProducts(type?: "book" | "electronics" | "clothing"): void {
  const outputElement = document.getElementById("output");
  if (!outputElement) return;

  let filteredItems: Product[];

  if (type) {
    filteredItems = products.filter((item) => item.type === type);
  } else {
    filteredItems = products.getAll();
  }

  const htmlString = filteredItems
    .map((product) => renderProduct(product))
    .join("");

  outputElement.innerHTML = htmlString;
}

// 8. イベントリスナーの設定
document.addEventListener("DOMContentLoaded", () => {
  // 初期表示 (全商品)
  showProducts();

  // 各ボタンのクリックイベント設定
  const allBtn = document.getElementById("all");
  const booksBtn = document.getElementById("books");
  const electronicsBtn = document.getElementById("electronics");
  const clothingBtn = document.getElementById("clothing");

  if (allBtn) {
    allBtn.addEventListener("click", () => showProducts());
  }

  if (booksBtn) {
    booksBtn.addEventListener("click", () => showProducts("book"));
  }

  if (electronicsBtn) {
    electronicsBtn.addEventListener("click", () => showProducts("electronics"));
  }

  if (clothingBtn) {
    clothingBtn.addEventListener("click", () => showProducts("clothing"));
  }
});