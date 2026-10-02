import json
import os
from dataclasses import dataclass, asdict
import customtkinter as ctk

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

class FootballCardApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Football Card Builder")
        self.geometry("800x600")
        ctk.set_appearance_mode("dark")

        # データロード
        self.player = self.load_player()

        # UI レイアウト設定
        self.grid_columnconfigure((0, 1), weight=1)
        self.grid_rowconfigure(0, weight=1)

        self.setup_form_panel()
        self.setup_preview_panel()
        self.update_preview()

    # --- ストレージ処理 ---
    def load_player(self) -> PlayerData:
        if os.path.exists(STORAGE_FILE):
            try:
                with open(STORAGE_FILE, "r", encoding="utf-8") as f:
                    return PlayerData(**json.load(f))
            except Exception: pass
        return PlayerData()

    def save_player(self):
        with open(STORAGE_FILE, "w", encoding="utf-8") as f:
            json.dump(asdict(self.player), f, indent=2)

    # --- フォーム定義 ---
    def setup_form_panel(self):
        form = ctk.CTkScrollableFrame(self, label_text="Customize Player")
        form.grid(row=0, column=0, padx=20, pady=20, sticky="nsew")

        # Name
        ctk.CTkLabel(form, text="Name").pack(anchor="w", pady=(5, 0))
        self.entry_name = ctk.CTkEntry(form)
        self.entry_name.insert(0, self.player.name)
        self.entry_name.pack(fill="x", pady=2)
        self.entry_name.bind("<KeyRelease>", self.on_input_change)

        # Position & Overall
        pos_frame = ctk.CTkFrame(form, fg_color="transparent")
        pos_frame.pack(fill="x", pady=5)
        
        self.option_pos = ctk.CTkOptionMenu(pos_frame, values=POSITIONS, command=lambda _: self.on_input_change())
        self.option_pos.set(self.player.position)
        self.option_pos.pack(side="left", expand=True, fill="x", padx=(0, 5))

        self.entry_rating = ctk.CTkEntry(pos_frame, placeholder_text="Rating")
        self.entry_rating.insert(0, str(self.player.overall_rating))
        self.entry_rating.pack(side="right", expand=True, fill="x", padx=(5, 0))
        self.entry_rating.bind("<KeyRelease>", self.on_input_change)

        # Club
        ctk.CTkLabel(form, text="Club").pack(anchor="w", pady=(5, 0))
        self.entry_club = ctk.CTkEntry(form)
        self.entry_club.insert(0, self.player.club)
        self.entry_club.pack(fill="x", pady=2)
        self.entry_club.bind("<KeyRelease>", self.on_input_change)

        # Stats
        ctk.CTkLabel(form, text="Stats (PAC / SHO / PAS / DRI / DEF / PHY)", font=("", 12, "bold")).pack(anchor="w", pady=(15, 5))
        self.stat_entries = {}
        for stat in ["pac", "sho", "pas", "dri", "def_", "phy"]:
            row = ctk.CTkFrame(form, fg_color="transparent")
            row.pack(fill="x", pady=2)
            ctk.CTkLabel(row, text=stat.upper().replace("_", ""), width=50).pack(side="left")
            entry = ctk.CTkEntry(row)
            entry.insert(0, str(getattr(self.player, stat)))
            entry.pack(side="right", expand=True, fill="x")
            entry.bind("<KeyRelease>", self.on_input_change)
            self.stat_entries[stat] = entry

    # --- プレビュー定義 ---
    def setup_preview_panel(self):
        self.preview_frame = ctk.CTkFrame(self, corner_radius=15, border_width=4)
        self.preview_frame.grid(row=0, column=1, padx=20, pady=20, sticky="nsew")

        self.lbl_tier = ctk.CTkLabel(self.preview_frame, text="", font=("", 12, "bold"))
        self.lbl_tier.pack(pady=(15, 0))

        self.lbl_rating_pos = ctk.CTkLabel(self.preview_frame, text="", font=("", 24, "bold"))
        self.lbl_rating_pos.pack()

        self.lbl_name = ctk.CTkLabel(self.preview_frame, text="", font=("", 20, "bold"))
        self.lbl_name.pack(pady=10)

        self.lbl_club = ctk.CTkLabel(self.preview_frame, text="", font=("", 14))
        self.lbl_club.pack()

        self.lbl_stats = ctk.CTkLabel(self.preview_frame, text="", font=("Courier", 14), justify="left")
        self.lbl_stats.pack(pady=20)

    # --- 入力ハンドラ (Reactの onChange / setPlayer に相当) ---
    def on_input_change(self, event=None):
        try:
            self.player.name = self.entry_name.get()
            self.player.position = self.option_pos.get()
            self.player.overall_rating = int(self.entry_rating.get() or 0)
            self.player.club = self.entry_club.get()
            
            for stat, entry in self.stat_entries.items():
                setattr(self.player, stat, int(entry.get() or 0))

            self.update_preview()
            self.save_player()  # 自動保存 (useEffect 相当)
        except ValueError:
            pass  # 数値変換エラー時は無視

    def update_preview(self):
        tier = get_player_tier(self.player.overall_rating)
        colors = {"elite": "#ffd700", "gold": "#e6ca65", "silver": "#c0c0c0", "bronze": "#cd7f32"}
        border_color = colors.get(tier, "#ccc")

        self.preview_frame.configure(border_color=border_color)
        self.lbl_tier.configure(text=f"[{tier.upper()}]", text_color=border_color)
        self.lbl_rating_pos.configure(text=f"{self.player.overall_rating}  {self.player.position}")
        self.lbl_name.configure(text=self.player.name)
        self.lbl_club.configure(text=self.player.club)

        stats_text = (
            f"PAC: {self.player.pac:<2}  |  DRI: {self.player.dri:<2}\n"
            f"SHO: {self.player.sho:<2}  |  DEF: {self.player.def_:<2}\n"
            f"PAS: {self.player.pas:<2}  |  PHY: {self.player.phy:<2}"
        )
        self.lbl_stats.configure(text=stats_text)

if __name__ == "__main__":
    app = FootballCardApp()
    app.mainloop()