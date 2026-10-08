import "../styles/info-pages.css";

function About() {
  return (
    <main className="info-page">

      {/* HERO */}
      <section className="info-hero">
        <p className="eyebrow">
          ABOUT RANKSCOPE
        </p>

        <h1>
          Discover What Rank Your Match Resembles
        </h1>

        <p>
          RankScope is a League of Legends Machine Learning project that
          analyses a single ranked match and predicts which competitive rank
          the player's performance most closely resembles.
        </p>
      </section>


      {/* WHAT IT DOES */}
      <section className="info-card">
        <div className="info-card-header">
          <span className="info-card-number">
            01
          </span>

          <h2>
            What RankScope Does
          </h2>
        </div>

        <p>
          RankScope does not use your current League of Legends rank as the
          prediction result. Instead, it focuses on the performance shown in
          one ranked match.
        </p>

        <p>
          After you enter your Riot ID, RankScope retrieves a recent Ranked
          Solo match through Riot's API and analyses the selected player's
          performance together with information from the rest of the match.
        </p>
      </section>


      {/* MATCH CONTEXT */}
      <section className="info-card">
        <div className="info-card-header">
          <span className="info-card-number">
            02
          </span>

          <h2>
            Built Around Match Context
          </h2>
        </div>

        <p>
          League of Legends roles have different gameplay patterns, so
          RankScope takes the player's role into account during prediction.
        </p>

        <p>
          The model also uses prepared gameplay features and match context,
          including information from the other players in the match, instead
          of relying only on a few raw statistics.
        </p>

        <div className="model-tags">
          <span>Top</span>
          <span>Jungle</span>
          <span>Middle</span>
          <span>Bottom</span>
          <span>Support</span>
        </div>
      </section>


      {/* PREDICTION MEANING */}
      <section className="info-card">
        <div className="info-card-header">
          <span className="info-card-number">
            03
          </span>

          <h2>
            What the Prediction Means
          </h2>
        </div>

        <p>
          The predicted rank represents which rank the player's performance
          in that specific match most closely resembles.
        </p>

        <p>
          It does not mean that the player is actually that rank. A single
          match cannot fully represent a player's consistency, overall skill
          or long-term performance.
        </p>

        <p>
          RankScope should therefore be viewed as a performance comparison
          tool rather than an official League of Legends ranking system.
        </p>
      </section>


      {/* MACHINE LEARNING */}
      <section className="info-card">
        <div className="info-card-header">
          <span className="info-card-number">
            04
          </span>

          <h2>
            Machine Learning Behind RankScope
          </h2>
        </div>

        <p>
          RankScope was developed by training Machine Learning models on
          League of Legends match data containing players from different
          competitive ranks.
        </p>

        <p>
          The project compares gameplay patterns across those ranks and uses
          role-aware models, match context and prepared features to generate
          the final prediction.
        </p>
      </section>


      {/* CURRENT VERSION */}
      <section className="info-card">
        <div className="info-card-header">
          <span className="info-card-number">
            05
          </span>

          <h2>
            Current Version
          </h2>
        </div>

        <p>
          The current version of RankScope is connected to its Machine
          Learning backend and Riot API integration.
        </p>

        <p>
          Users can enter a Riot ID, allow RankScope to retrieve a suitable
          ranked match and receive a prediction based on that match
          automatically.
        </p>
      </section>

    </main>
  );
}

export default About;