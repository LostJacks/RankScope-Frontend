
import { useState } from "react";
import "../styles/prediction.css";

const roleNames = {
  TOP: "Top",
  JUNGLE: "Jungle",
  MIDDLE: "Middle",
  BOTTOM: "Bottom",
  UTILITY: "Support",
};

// Load your existing League of Legends rank emblems.
const rankImages = import.meta.glob("../assets/*.png", {
  eager: true,
  import: "default",
});

function formatRank(rank) {
  if (!rank) return "Unknown";

  return (
    rank.charAt(0).toUpperCase() +
    rank.slice(1).toLowerCase()
  );
}

function formatNumber(number) {
  return Number(number ?? 0).toLocaleString();
}

function formatDate(timestamp) {
  if (!timestamp) return "Unknown date";

  return new Date(timestamp).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function getRankImage(rank) {
  if (!rank) return null;

  return rankImages[
    `../assets/${rank.toLowerCase()}.png`
  ];
}

function Prediction({
  predictionData,
  onPredictAgain,
}) {
  const [expandedMatch, setExpandedMatch] = useState(null);

  if (!predictionData) {
    return null;
  }

  // New overall prediction response.
  const {
    player = {},
    overall_prediction = {},
    matches = [],
    failed_matches = [],
  } = predictionData;

  const predictedRank =
    overall_prediction.predicted_rank;

  const rankName = formatRank(predictedRank);
  const rankImage = getRankImage(predictedRank);

  const riotId =
    player.game_name && player.tag_line
      ? `${player.game_name}#${player.tag_line}`
      : "League Player";

  const matchCount =
    overall_prediction.matches_analyzed ??
    matches.length;

  function toggleMatch(matchId) {
    setExpandedMatch((previous) =>
      previous === matchId ? null : matchId
    );
  }

  return (
    <main className="prediction-page">

      {/* OVERALL RESULT */}
      <section className="result-hero">
        <p className="section-number">
          RANKSCOPE RESULT
        </p>

        <h1>Your Predicted Rank</h1>

        <p className="result-subtitle">
          Based on {matchCount} recent ranked{" "}
          {matchCount === 1 ? "match" : "matches"}
        </p>

        {rankImage && (
          <div className="rank-emblem-container">
            <div className="emblem-glow" />

            <img
              src={rankImage}
              alt={`${rankName} rank emblem`}
              className="rank-emblem"
            />
          </div>
        )}

        <h2 className="rank-name">
          {rankName}
        </h2>

        <p className="prediction-message">
          Your recent match performances most closely
          resemble {rankName}.
        </p>
      </section>

      {/* PLAYER SUMMARY */}
      <section className="result-card">
        <div className="result-card-heading">
          <div>
            <p className="section-number">
              PLAYER SUMMARY
            </p>

            <h3>Overall Analysis</h3>
          </div>

          <span className="role-pill">
            {player.platform || "Ranked Solo"}
          </span>
        </div>

        <div className="result-stats">
          <ResultStat
            label="Riot ID"
            value={riotId}
            detail="Analysed player"
          />

          <ResultStat
            label="Matches"
            value={matchCount}
            detail="Ranked matches analysed"
          />

          <ResultStat
            label="Overall Rank"
            value={rankName}
            detail="Median prediction"
          />

          <ResultStat
            label="Method"
            value="Median Voting"
            detail="Combines match predictions"
          />
        </div>
      </section>

      {/* RECENT MATCH HISTORY */}
      <section className="result-card">
        <div className="result-card-heading">
          <div>
            <p className="section-number">
              MATCH HISTORY
            </p>

            <h3>Recent Ranked Matches</h3>

            <p className="result-subtitle">
              Click a match to view its detailed statistics.
            </p>
          </div>
        </div>

        <div className="prediction-match-list">
          {matches.map((match, index) => {
            const isExpanded =
              expandedMatch === match.match_id;

            const matchRank = formatRank(
              match.predicted_rank
            );

            return (
              <article
                key={match.match_id || index}
                className={`prediction-match-card ${
                  match.win ? "is-victory" : "is-defeat"
                }`}
              >
                <button
                  type="button"
                  className="prediction-match-toggle"
                  onClick={() =>
                    toggleMatch(match.match_id)
                  }
                  aria-expanded={isExpanded}
                >
                  <div className="prediction-match-primary">
                    <span
                      className={
                        match.win
                          ? "match-result victory"
                          : "match-result defeat"
                      }
                    >
                      {match.win ? "Victory" : "Defeat"}
                    </span>

                    <span className="prediction-match-date">
                      {formatDate(
                        match.game_start_timestamp
                      )}
                    </span>
                  </div>

                  <div className="prediction-match-middle">
                    <strong>
                      {roleNames[match.role] ||
                        match.role ||
                        "Unknown Role"}
                    </strong>

                    <span>
                      {match.kills} / {match.deaths} /{" "}
                      {match.assists}
                    </span>
                  </div>

                  <div className="prediction-match-end">
                    <span className="prediction-match-rank">
                      {matchRank}
                    </span>

                    <span className="prediction-match-expand">
                      {isExpanded
                        ? "Hide Stats ↑"
                        : "View Stats ↓"}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="prediction-match-expanded">
                    <div className="prediction-detail-grid">
                      <MatchDetail
                        label="Kills"
                        value={match.kills}
                      />

                      <MatchDetail
                        label="Deaths"
                        value={match.deaths}
                      />

                      <MatchDetail
                        label="Assists"
                        value={match.assists}
                      />

                      <MatchDetail
                        label="CS"
                        value={match.cs}
                      />

                      <MatchDetail
                        label="Gold Earned"
                        value={formatNumber(match.gold)}
                      />

                      <MatchDetail
                        label="Damage Dealt"
                        value={formatNumber(match.damage)}
                      />

                      <MatchDetail
                        label="Vision Score"
                        value={match.vision_score}
                      />

                      <MatchDetail
                        label="Duration"
                        value={`${match.duration_minutes} min`}
                      />
                    </div>

                    <p className="prediction-match-note">
                      Individual match prediction:{" "}
                      <strong>{matchRank}</strong>
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* NOTICE */}
      <section className="prediction-notice">
        <div className="notice-icon">i</div>

        <p>
          This estimate combines predictions from{" "}
          {matchCount} recent ranked{" "}
          {matchCount === 1 ? "match" : "matches"}.
          It reflects patterns in match performance
          and does not determine your official
          League of Legends rank.
        </p>
      </section>

      {failed_matches.length > 0 && (
        <p className="prediction-match-note">
          {failed_matches.length} additional{" "}
          {failed_matches.length === 1
            ? "match could"
            : "matches could"}{" "}
          not be analysed.
        </p>
      )}

      {/* TRY AGAIN */}
      <button
        className="predict-again-button"
        onClick={onPredictAgain}
      >
        Search Another Player
        <span>↻</span>
      </button>
    </main>
  );
}

function ResultStat({ label, value, detail }) {
  return (
    <div className="result-stat">
      <p className="result-stat-label">
        {label}
      </p>

      <strong>{value}</strong>

      <span>{detail}</span>
    </div>
  );
}

function MatchDetail({ label, value }) {
  return (
    <div className="prediction-match-detail">
      <span>{label}</span>
      <strong>{value ?? "—"}</strong>
    </div>
  );
}

export default Prediction;
