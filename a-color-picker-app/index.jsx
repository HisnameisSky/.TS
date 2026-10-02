const { useState } = React;

export const ColorPicker = () => {
  // 1. 初期値 '#ffffff' で State を作成（分割代入）
  const [color, setColor] = useState('#ffffff');

  // 2. input の変更イベントで State を更新する関数
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    // 3. 背景色を State の値に設定した container 要素
    <div
      id="color-picker-container"
      style={{ backgroundColor: color }}
    >
      {/* 4. type="color", id, value, onChange を持った input 要素 */}
      <input
        type="color"
        id="color-input"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};