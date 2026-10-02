import React from 'react';

export const MoodBoardItem = ({ color, image, description }) => {
  return (
    <div className="mood-board-item" style={{ backgroundColor: color }}>
      <img className="mood-board-image" src={image} alt={description} />
      <h3 className="mood-board-text">{description}</h3>
    </div>
  );
};

export const MoodBoard = () => {
  return (
    <div>
      <h1 className="mood-board-heading">Destination Mood Board</h1>
      <div className="mood-board">
        <MoodBoardItem
          color="#1e90ff"
          image="https://cdn.freecodecamp.org/curriculum/labs/shore.jpg"
          description="Ocean Shore"
        />
        <MoodBoardItem
          color="#2ed573"
          image="https://cdn.freecodecamp.org/curriculum/labs/grass.jpg"
          description="Green Grass"
        />
        <MoodBoardItem
          color="#ff4757"
          image="https://cdn.freecodecamp.org/curriculum/labs/santorini.jpg"
          description="Santorini"
        />
      </div>
    </div>
  );
};

//

// JavaScript: オブジェクト
const user = {
  name: "たろう", // キー（name）のクォートは省略可能
  age: 25,
  "user-id": 101, // ハイフンなど特殊記号を含む場合のみクォート必須
};

console.log(user.nmae);
console.log(use["age"]);
console.log(user.address)

//
// JavaScript: JSON.parse()
const jsonString = '{"name": "たろう", "age": 25, "isStudent": false}';

// JSON文字列をJSオブジェクトに変換
const user = JSON.parse(jsonString);

console.log(user.name); // "たろう"

//

// JavaScript: JSON.stringify()
const user = {
  name: "たろう",
  age: 25,
  isStudent: false
};

// JSオブジェクトをJSON文字列に変換
const jsonString = JSON.stringify(user);

console.log(jsonString); 
// '{"name":"たろう","age":25,"isStudent":false}'