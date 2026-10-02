const { useState, useEffect } = React;

enum Action {
  EAT,
  PLAY,
  SLEEP
}

export enum PetMood {
  HAPPY,
  EXCITED,
  CONTENT,
  SAD,
  TIRED,
  SICK,
  HUNGRY
}

const petMoodImages: Record<PetMood, string> = {
  [PetMood.HAPPY]: "😊",
  [PetMood.EXCITED]: "🤩",
  [PetMood.CONTENT]: "🙂",
  [PetMood.SAD]: "😢",
  [PetMood.TIRED]: "😴",
  [PetMood.SICK]: "🤒",
  [PetMood.HUNGRY]: "🍔"
};

function getPetMood(
  hunger: number,
  happiness: number,
  energy: number
): PetMood {
  if (hunger > 70) {
    return PetMood.HUNGRY;
  }

  if (energy < 30) {
    return PetMood.TIRED;
  }

  if (happiness < 30) {
    return PetMood.SAD;
  }

  if (happiness > 80 && energy > 70) {
    return PetMood.EXCITED;
  }

  if (happiness > 60) {
    return PetMood.HAPPY;
  }

  return PetMood.CONTENT;
}

export function PetGame() {
  const [petName, setPetName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);

  
  useEffect(() => {
    if (!gameStarted) {
      return;
    }

    const timer = setInterval(() => {
      setHunger((current) => Math.min(100, current + 1));

      setEnergy((current) => Math.min(100, current + 1));

      setHappiness((current) => Math.max(0, current - 1));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [gameStarted]);

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = document.getElementById(
      "pet-name"
    ) as HTMLInputElement | null;

    if (!input) {
      return;
    }

    const name = input.value.trim();

    if (!name) {
      return;
    }

    setPetName(name);
    setGameStarted(true);
  };

  const performAction = (action: Action) => {
    switch (action) {
      case Action.EAT:
        
        setHunger((current) =>
          current > 0
            ? Math.max(0, current - 10)
            : current
        );

        setEnergy((current) =>
          current < 100
            ? Math.min(100, current + 10)
            : current
        );

        break;

      case Action.PLAY:
        
        setEnergy((current) =>
          current > 0
            ? Math.max(0, current - 10)
            : current
        );

        setHappiness((current) =>
          current < 100
            ? Math.min(100, current + 10)
            : current
        );

        break;

      case Action.SLEEP:
        
        setHunger((current) =>
          current < 100
            ? Math.min(100, current + 10)
            : current
        );

        setEnergy((current) =>
          current < 100
            ? Math.min(100, current + 10)
            : current
        );

        break;
    }
  };

  const currentMood = getPetMood(
    hunger,
    happiness,
    energy
  );

  
  if (!gameStarted) {
    return (
      <main className="start-view">
        <div className="welcome-card">
          <div className="welcome-emoji">
            🐾
          </div>

          <h1>Digital Pet</h1>

          <p>
            Give your new little friend a name!
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="pet-name">
              Pet name
            </label>

            <input
              id="pet-name"
              type="text"
              placeholder="Enter a name..."
              onChange={(e) =>
                setPetName(e.target.value)
              }
            />

            <button type="submit">
              Start Game
            </button>
          </form>
        </div>
      </main>
    );
  }

  
  return (
    <main className="game-view">
      <div className="game-card">

        <header className="game-header">
          <div>
            <span className="label">
              YOUR PET
            </span>

            <h1 className="pet-name">
              {petName}
            </h1>
          </div>

          <div className="mood">
            <span>
              {petMoodImages[currentMood]}
            </span>
          </div>
        </header>

        <section className="pet-display">
          <div className="pet-image">
            {petMoodImages[currentMood]}
          </div>

          <p className="mood-text">
            {currentMood === PetMood.HAPPY &&
              "Your pet is happy!"}

            {currentMood === PetMood.EXCITED &&
              "Your pet is super excited!"}

            {currentMood === PetMood.CONTENT &&
              "Your pet is feeling content."}

            {currentMood === PetMood.SAD &&
              "Your pet is feeling sad."}

            {currentMood === PetMood.TIRED &&
              "Your pet is tired."}

            {currentMood === PetMood.SICK &&
              "Your pet is feeling sick."}

            {currentMood === PetMood.HUNGRY &&
              "Your pet is hungry!"}
          </p>
        </section>

        <section className="stats">

          <div className="stat">
            <div className="stat-label">
              <span>🍎 Hunger</span>

              <span className="stat-value">
                {hunger}
              </span>
            </div>

            <div className="bar">
              <div
                className="bar-fill hunger"
                style={{
                  width: `${hunger}%`
                }}
              />
            </div>
          </div>

          <div className="stat">
            <div className="stat-label">
              <span>⚡ Energy</span>

              <span className="stat-value">
                {energy}
              </span>
            </div>

            <div className="bar">
              <div
                className="bar-fill energy"
                style={{
                  width: `${energy}%`
                }}
              />
            </div>
          </div>

          <div className="stat">
            <div className="stat-label">
              <span>💖 Happiness</span>

              <span className="stat-value">
                {happiness}
              </span>
            </div>

            <div className="bar">
              <div
                className="bar-fill happiness"
                style={{
                  width: `${happiness}%`
                }}
              />
            </div>
          </div>

        </section>

        <section className="actions">
          <h2>Choose an action</h2>

          <div className="action-buttons">

            <button
              id="eat-action"
              type="button"
              onClick={() =>
                performAction(Action.EAT)
              }
            >
              <span>🍎</span>
              EAT
            </button>

            <button
              id="play-action"
              type="button"
              onClick={() =>
                performAction(Action.PLAY)
              }
            >
              <span>🎾</span>
              PLAY
            </button>

            <button
              id="sleep-action"
              type="button"
              onClick={() =>
                performAction(Action.SLEEP)
              }
            >
              <span>🌙</span>
              SLEEP
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}