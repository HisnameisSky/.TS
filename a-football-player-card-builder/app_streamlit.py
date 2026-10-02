import json
import os
from dataclasses import dataclass, asdict
import streamlit as st

# ==========================================
# 1. データ構造と定数
# ==========================================
POSITIONS = ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LW", "RW", "ST", "CF"]
STORAGE_FILE = "football_player_card.json"

@dataclass
class PlayerData:
    name: str = "PELE"
    overall_rating: int = 98
    position: str = "ST"
    club: str = "Santos FC"
    image_url: str = "https://cdn.freecodecamp.org/curriculum/typescript/tsx-workshop/pele.jpg"
    pac: int = 97
    sho: int = 98
    pas: int = 83
    dri: int = 99
    def_: int = 41
    phy: int = 75

def get_player_tier(rating: int) -> str:
    if rating >= 92: return "elite"
    if rating >= 85: return "gold"
    if rating >= 75: return "silver"
    return "bronze"

# ==========================================
# 2. ストレージ読み書き (localStorage相当)
# ==========================================
def load_player() -> PlayerData:
    if os.path.exists(STORAGE_FILE):
        try:
            with open(STORAGE_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return PlayerData(**data)
        except Exception:
            pass
    return PlayerData()

def save_player(player: PlayerData) -> None:
    with open(STORAGE_FILE, "w", encoding="utf-8") as f:
        json.dump(asdict(player), f, indent=2)

# ==========================================
# 3. アプリのメイン処理
# ==========================================
st.set_page_config(page_title="Football Card Builder", layout="wide")

# セッション状態の初期化 (Reactの useState/loadPlayer に相当)
if "player" not in st.session_state:
    st.session_state.player = load_player()

player = st.session_state.player

st.title("Football Card Builder")
st.caption("Customize your player card in real-time")

col_form, col_preview = st.columns([1, 1], gap="large")

# --- 左カラム: フォーム入力 ---
with col_form:
    st.subheader("Player Info")
    name = st.text_input("Name", value=player.name)
    
    col_pos, col_rating = st.columns(2)
    with col_pos:
        position = st.selectbox("Position", POSITIONS, index=POSITIONS.index(player.position))
    with col_rating:
        overall_rating = st.number_input("Overall Rating", min_value=1, max_value=99, value=player.overall_rating)
        
    club = st.text_input("Club", value=player.club)
    image_url = st.text_input("Image URL", value=player.image_url)

    st.subheader("Player Stats")
    c1, c2, c3 = st.columns(3)
    with c1:
        pac = st.number_input("PAC", min_value=1, max_value=99, value=player.pac)
        dri = st.number_input("DRI", min_value=1, max_value=99, value=player.dri)
    with c2:
        sho = st.number_input("SHO", min_value=1, max_value=99, value=player.sho)
        def_ = st.number_input("DEF", min_value=1, max_value=99, value=player.def_)
    with c3:
        pas = st.number_input("PAS", min_value=1, max_value=99, value=player.pas)
        phy = st.number_input("PHY", min_value=1, max_value=99, value=player.phy)

    # 入力値を反映して保存 (Reactの setPlayer / useEffect に相当)
    updated_player = PlayerData(
        name=name, overall_rating=overall_rating, position=position,
        club=club, image_url=image_url, pac=pac, sho=sho, pas=pas,
        dri=dri, def_=def_, phy=phy
    )
    if updated_player != st.session_state.player:
        st.session_state.player = updated_player
        save_player(updated_player)
        st.rerun()

# --- 右カラム: リアルタイムプレビュー ---
with col_preview:
    st.subheader("Live Preview")
    tier = get_player_tier(player.overall_rating)
    
    # ティアに応じた枠線カラーの設定
    colors = {"elite": "#ffd700", "gold": "#e6ca65", "silver": "#c0c0c0", "bronze": "#cd7f32"}
    border_color = colors.get(tier, "#ccc")

    # カード描画 (HTML/CSS を埋め込んでスタイル再現)
    card_html = f"""
    <div style="border: 4px solid {border_color}; border-radius: 16px; padding: 20px; background-color: #1a1a1a; color: white; width: 300px; margin: 0 auto; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-size: 36px; font-weight: bold; line-height: 1;">{player.overall_rating}</div>
                <div style="font-size: 18px; color: #aaa;">{player.position}</div>
            </div>
            <div style="text-align: right;">
                <div style="background-color: {border_color}; color: black; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">{tier.upper()}</div>
                <div style="font-size: 14px; margin-top: 4px;">{player.club}</div>
            </div>
        </div>
        <div style="text-align: center; margin: 15px 0;">
            <img src="{player.image_url}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 2px solid {border_color};" default="https://via.placeholder.com/120"/>
        </div>
        <div style="text-align: center; font-size: 22px; font-weight: bold; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 12px;">
            {player.name}
        </div>
        <div style="display: flex; justify-content: space-around; font-size: 14px;">
            <div>
                <div><b>{player.pac}</b> PAC</div>
                <div><b>{player.sho}</b> SHO</div>
                <div><b>{player.pas}</b> PAS</div>
            </div>
            <div style="border-right: 1px solid #444;"></div>
            <div>
                <div><b>{player.dri}</b> DRI</div>
                <div><b>{player.def_}</b> DEF</div>
                <div><b>{player.phy}</b> PHY</div>
            </div>
        </div>
    </div>
    """
    st.markdown(card_html, unsafe_allow_html=True)