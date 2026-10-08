import "../styles/prediction.css";


const roleNames = {
  TOP: "Top",
  JUNGLE: "Jungle",
  MIDDLE: "Middle",
  BOTTOM: "Bottom",
  UTILITY: "Support",
};


// Automatically looks for files such as:
// iron.png, bronze.png, silver.png, gold.png,
// platinum.png, emerald.png, diamond.png, etc.
const rankImages = import.meta.glob(
  "../assets/*.png",
  {
    eager: true,
    import: "default",
  }
);


function Prediction({
  predictionData,
  onPredictAgain,
}) {
  if (!predictionData) {
    return null;
  }


  const {
    predicted_rank,
    role,
    message,
    match_id,
    game_name,
    tag_line,
  } = predictionData;


  const rankName =
    predicted_rank.charAt(0).toUpperCase() +
    predicted_rank.slice(1).toLowerCase();


  const roleName =
    roleNames[role] || role;


  const riotId =
    game_name && tag_line
      ? `${game_name}#${tag_line}`
      : "League Player";


  const rankImage =
    rankImages[
      `../assets/${predicted_rank.toLowerCase()}.png`
    ];


  return (
    <main className="prediction-page">

      {/* RESULT HERO */}
      <section className="result-hero">

        <p className="section-number">
          RANKSCOPE RESULT
        </p>

        <h1>
          Your Predicted Rank
        </h1>

        <p className="result-subtitle">
          Based on your latest ranked match
        </p>


        {rankImage && (
          <div className="rank-emblem-container">
            <div className="emblem-glow" />

            <img
              src={rankImage}
              alt={`${rankName} League of Legends rank emblem`}
              className="rank-emblem"
            />
          </div>
        )}


        <h2 className="rank-name">
          {rankName}
        </h2>


        <p className="prediction-message">
          {message}
        </p>

      </section>


      {/* MATCH SUMMARY */}
      <section className="result-card">

        <div className="result-card-heading">

          <div>
            <p className="section-number">
              MATCH SUMMARY
            </p>

            <h3>
              Analysed Match
            </h3>
          </div>


          <span className="role-pill">
            {roleName}
          </span>

        </div>


        <div className="result-stats">

          <ResultStat
            label="Riot ID"
            value={riotId}
            detail="Analysed player"
          />


          <ResultStat
            label="Role"
            value={roleName}
            detail="Role played in this match"
          />


          <ResultStat
            label="Predicted Rank"
            value={rankName}
            detail="Performance resemblance"
          />


          <ResultStat
            label="Match"
            value={
              match_id
                ? match_id
                : "Latest Ranked Match"
            }
            detail="Ranked Solo match analysed"
          />

        </div>

      </section>


      {/* NOTICE */}
      <section className="prediction-notice">

        <div className="notice-icon">
          i
        </div>

        <p>
          This prediction is based on one match.
          It shows which rank your performance in
          that match most closely resembles and
          does not represent your actual League of
          Legends rank or overall skill.
        </p>

      </section>


      {/* TRY AGAIN */}
      <button
        className="predict-again-button"
        onClick={onPredictAgain}
      >
        Analyse Another Match

        <span>
          ↻
        </span>
      </button>

    </main>
  );
}


function ResultStat({
  label,
  value,
  detail,
}) {
  return (
    <div className="result-stat">

      <p className="result-stat-label">
        {label}
      </p>

      <strong>
        {value}
      </strong>

      <span>
        {detail}
      </span>

    </div>
  );
}


export default Prediction;