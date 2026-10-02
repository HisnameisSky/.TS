def card(profile_id, name, title, bio):
    return f"""
    <div class="card" id="{profile_id}">
        <h2>{name}</h2>
        <p class="card-title">{title}</p>
        <p>{bio}</p>
    </div>
    """

def app():
    profiles = [
        {
            "id": 1,
            "name": "Mark",
            "title": "Front-End developer",
            "bio": "I like to work with different front-end technologies and play video games."
        },
        {
            "id": 2,
            "name": "Tiffany",
            "title": "Engineering manager",
            "bio": "I have worked in tech for 15 years and love to help people grow in this industry."
        },
        {
            "id": 3,
            "name": "Doug",
            "title": "Back-End developer",
            "bio": "I have been a software developer for over 20 years and I love working with Go and Rust."
        }
    ]

    # JSの profiles.map() に相当するリスト内包表記
    cards_html = [
        card(
            profile_id=profile["id"],
            name=profile["name"],
            title=profile["title"],
            bio=profile["bio"]
        )
        for profile in profiles
    ]

    # 生成されたHTMLパーツ（リスト）を結合して親のdivで囲む
    cards_joined = "".join(cards_html)
    return f'<div class="flex-container">{cards_joined}</div>'


"""
【元の箱: データの集合体】
  JavaScript: 配列 [ { id: 1, ... }, { id: 2, ... }, { id: 3, ... } ]
  Python    : リスト [ { "id": 1, ... }, { "id": 2, ... }, { "id": 3, ... } ]
                                    │
                                    │ 1要素ずつ取り出す
                                    ▼
【途中の箱: 1人分のデータ (profile)】
  JavaScript: profile.name / profile.title
  Python    : profile["name"] / profile["title"]
                                    │
                                    │ 関数（Card / card）へ渡して変換
                                    ▼
【変換後の箱: HTMLパーツの集合】
  JavaScript: [ <Card />, <Card />, <Card /> ] （React要素の配列）
  Python    : [ "<div>...</div>", "<div>...</div>", ... ] （HTML文字列のリスト）
                                    │
                                    │ 1つの親枠に収める
                                    ▼
【最終成果物】
  <div class="flex-container"> ... 3つのカード ... </div>
"""

#

numbers = [1,2,3,4,5]
doubled = [n*2 for n in numbers]
print(doubled)

#

numbers = [1,2,3,4,5]
evens_doubled = [n*2 for n in numbers if n%2==0]
print(evens_doubled)