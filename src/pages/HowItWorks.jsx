import "../styles/info-pages.css";

function HowItWorks() {
  return (
    <main className="info-page">
      <section className="info-hero">
        <p className="eyebrow">HOW IT WORKS</p>

        <h1>One Match. One Prediction.</h1>

        <p>
          Enter your Riot ID and RankScope automatically finds your latest
          ranked match, analyses your performance and predicts which rank that
          performance most closely resembles.
        </p>
      </section>

      <section className="steps-container">

        {/* STEP 1 */}
        <div className="step-card">
          <div className="step-number">01</div>

          <div>
            <h2>Enter Your Riot ID</h2>

            <p>
              Enter your League of Legends game name, tag line and region.
              RankScope uses this information to find your account through
              Riot's API.
            </p>
          </div>
        </div>

        <div className="step-line" />


        {/* STEP 2 */}
        <div className="step-card">
          <div className="step-number">02</div>

          <div>
            <h2>RankScope Finds Your Match</h2>

            <p>
              RankScope retrieves a recent Ranked Solo match for the selected
              account and identifies the player you entered.
            </p>

            <p>
              The match includes information for all ten players, which gives
              the prediction model additional context about the match.
            </p>
          </div>
        </div>

        <div className="step-line" />


        {/* STEP 3 */}
        <div className="step-card">
          <div className="step-number">03</div>

          <div>
            <h2>Your Match Data Is Prepared</h2>

            <p>
              The match statistics are converted into the same format used
              when training the RankScope models.
            </p>

            <p>
              RankScope prepares gameplay features such as performance rates,
              team comparisons, role information and match context before
              making a prediction.
            </p>
          </div>
        </div>

        <div className="step-line" />


        {/* STEP 4 */}
        <div className="step-card">
          <div className="step-number">04</div>

          <div>
            <h2>The Model Analyses Your Performance</h2>

            <p>
              RankScope uses trained Machine Learning models to compare the
              player's performance with patterns found across different
              League of Legends ranks.
            </p>

            <p>
              The player's role and the overall match context are also used
              during the prediction process.
            </p>
          </div>
        </div>

        <div className="step-line" />


        {/* STEP 5 */}
        <div className="step-card">
          <div className="step-number">05</div>

          <div>
            <h2>View Your Predicted Rank</h2>

            <p>
              RankScope displays the rank that your performance in that match
              most closely resembles, together with information about the
              analysed player, role and match.
            </p>

            <p>
              The result is based on one match and does not represent your
              actual League of Legends rank or overall skill level.
            </p>
          </div>
        </div>

      </section>


      {/* FLOW */}
      <section className="flow-card">
        <h2>How Your Match Moves Through RankScope</h2>

        <div className="flow-row">
          <div className="flow-item">
            Riot ID
          </div>

          <span>→</span>

          <div className="flow-item">
            Riot API
          </div>

          <span>→</span>

          <div className="flow-item">
            Match Data
          </div>

          <span>→</span>

          <div className="flow-item">
            RankScope Model
          </div>

          <span>→</span>

          <div className="flow-item">
            Predicted Rank
          </div>
        </div>
      </section>
    </main>
  );
}

export default HowItWorks;