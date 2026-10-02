export function Card({ name, title, bio }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p className="card-title">{title}</p>
      <p>{bio}</p>
    </div>
  );
}

export function App() {
  const profiles = [
    {
      id: 1,
      name: "Mark",
      title: "Front-End developer",
      bio: "I like to work with different front-end technologies and play video games."
    },
    {
      id: 2,
      name: "Tiffany",
      title: "Engineering manager",
      bio: "I have worked in tech for 15 years and love to help people grow in this industry."
    },
    {
      id: 3,
      name: "Doug",
      title: "Back-End developer",
      bio: "I have been a software developer for over 20 years and I love working with Go and Rust."
    }
  ];
  return (
    <div className="flex-container">
      {profiles.map((profile) => (
        <Card
          key={profile.id}
          name={profile.name}
          title={profile.title}
          bio={profile.bio}
        />
      ))}
    </div>
  );
}

//
/*
const numbres = [1,2,3,4,5];
const doubled = numbres.map((n)=>n*2);
console.log(doubled);
*/
//

const numbres = [1,2,3,4,5];
const evensDoubled = numbres
  .filter((n)=>n%2===0)
  .map((n)=>n*2);
console.log(evensDoubled);