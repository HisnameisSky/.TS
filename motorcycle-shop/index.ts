// 1. Category 型の定義
type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

// 2. Motorcycle インターフェースの定義
interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
  engine?: string;
}

// 3. fetchMotorcycles 関数の定義
async function fetchMotorcycles(): Promise<Motorcycle[]> {
  const url = 'https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json';
  const response = await fetch(url);
  const data = await response.json();
  
  return data.map((item: any) => ({
    ...item,
    created_at: new Date(item.created_at)
  }));
}

// 4. renderMotorcycleCard 関数の定義
function renderMotorcycleCard(motorcycle: Motorcycle): string {
  const engineText = motorcycle.engine ? motorcycle.engine : `${motorcycle.category} Engine`;

  return `
    <div class="motorcycle-card">
      <div class="motorcycle-card-image-container">
        <img class="motorcycle-card-image motorcycle-card-image-container" src="${motorcycle.image_url}" alt="${motorcycle.name}" />
        <span class="motorcycle-card-year-badge">${motorcycle.year}</span>
      </div>
      <div class="motorcycle-card-content">
        <div class="motorcycle-card-header">
          <div>
            <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
            <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
          </div>
          <span class="motorcycle-card-category">${motorcycle.category}</span>
        </div>
        <p class="motorcycle-card-description">${motorcycle.description}</p>
        <div class="motorcycle-card-footer">
          <div>
            <div class="motorcycle-card-price">${motorcycle.price.toLocaleString()}</div>
            <div class="motorcycle-card-engine">${engineText}</div>
          </div>
          <button class="motorcycle-card-button">View Details</button>
        </div>
      </div>
    </div>
  `;
}

// 5. MotorcycleGalleryApp クラスの定義
class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = [];

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      this.allMotorcycles = await fetchMotorcycles();
      this.renderMotorcycles();
      this.setupFilter();
    } catch (error) {
      console.error('Error fetching motorcycles:', error);
    }
  }

  // テスト側が引数にモックデータを渡して呼ぶ場合と、引数なしで呼ぶ場合の両方に対応
  public renderMotorcycles(motorcycles?: Motorcycle[]): void {
    // 引数があればそれを使い、無ければ this.allMotorcycles を使用する
    const listToRender = motorcycles || this.allMotorcycles;

    const grid = document.getElementById('motorcycle-grid');
    const resultsNumber = document.getElementById('results-number');

    if (resultsNumber) {
      resultsNumber.textContent = listToRender.length.toString();
    }

    if (grid) {
      grid.innerHTML = listToRender
        .map((motorcycle) => renderMotorcycleCard(motorcycle))
        .join('');
    }
  }

  private setupFilter(): void {
    const filterInput = document.getElementById('name-filter-input') as HTMLInputElement;
    if (filterInput) {
      filterInput.addEventListener('input', (e: Event) => {
        const searchTerm = (e.target as HTMLInputElement).value.toLowerCase().trim();
        const filtered = this.allMotorcycles.filter((m) =>
          m.name.toLowerCase().includes(searchTerm) ||
          m.manufacturer.toLowerCase().includes(searchTerm)
        );
        this.renderMotorcycles(filtered);
      });
    }
  }
}

// アプリの初期化
document.addEventListener('DOMContentLoaded', () => {
  new MotorcycleGalleryApp();
});