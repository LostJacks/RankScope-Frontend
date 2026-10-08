import { useState } from "react";
import "../styles/home.css";


const roleNames = {
  TOP: "Top",
  JUNGLE: "Jungle",
  MIDDLE: "Middle",
  BOTTOM: "Bottom",
  UTILITY: "Support",
};


function Home({ onPredict }) {
  const [formData, setFormData] = useState({
    gameName: "",
    tagLine: "",
    platform: "EUW1",
  });

  const [matches, setMatches] = useState([]);
  const [accountData, setAccountData] = useState(null);

  const [loadingMatches, setLoadingMatches] = useState(false);
  const [analysingMatchId, setAnalysingMatchId] = useState(null);

  const [error, setError] = useState("");


  function updateField(field, value) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }


  async function handleFindMatches(event) {
    event.preventDefault();

    setLoadingMatches(true);
    setError("");
    setMatches([]);
    setAccountData(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/matches/recent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            game_name: formData.gameName.trim(),
            tag_line: formData.tagLine.trim(),
            platform: formData.platform,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Could not find recent matches."
        );
      }

      setMatches(data.matches);

      setAccountData({
        gameName: data.game_name,
        tagLine: data.tag_line,
        platform: data.platform,
      });

    } catch (error) {
      setError(error.message);

    } finally {
      setLoadingMatches(false);
    }
  }


  async function handleAnalyseMatch(matchId) {
    if (!accountData) {
      return;
    }

    setAnalysingMatchId(matchId);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/predictions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            game_name: accountData.gameName,
            tag_line: accountData.tagLine,
            platform: accountData.platform,
            match_id: matchId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Could not analyse this match."
        );
      }

      onPredict(data);

    } catch (error) {
      setError(error.message);

    } finally {
      setAnalysingMatchId(null);
    }
  }


  function formatMatchDate(timestamp) {
    if (!timestamp) {
      return "";
    }

    return new Date(timestamp).toLocaleString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }


  return (
    <main className="home-page">

      {/* HERO */}
      <section className="hero">
        <p className="eyebrow">
          RANKSCOPE
        </p>

        <h1>
          Discover Your Predicted Rank
        </h1>

        <p className="hero-description">
          Enter your Riot ID, choose one of your recent ranked matches
          and discover which rank your performance most closely resembles.
        </p>
      </section>


      {/* RIOT ID FORM */}
      <form
        className="prediction-form"
        onSubmit={handleFindMatches}
      >

        <section className="form-section">

          <div className="section-heading">
            <div>
              <h2>
                Find Your Matches
              </h2>

              <p className="section-hint">
                Enter the Riot ID connected to your League of Legends account.
              </p>
            </div>
          </div>


          <div className="riot-id-grid">

            {/* GAME NAME */}
            <div className="riot-field">
              <label
                className="field-label"
                htmlFor="gameName"
              >
                Game Name
              </label>

              <input
                id="gameName"
                type="text"
                placeholder="SummonerAce"
                value={formData.gameName}
                onChange={(event) =>
                  updateField(
                    "gameName",
                    event.target.value
                  )
                }
                autoComplete="off"
                required
              />
            </div>


            {/* TAG LINE */}
            <div className="riot-field">
              <label
                className="field-label"
                htmlFor="tagLine"
              >
                Tag Line
              </label>

              <input
                id="tagLine"
                type="text"
                placeholder="EUW"
                value={formData.tagLine}
                onChange={(event) =>
                  updateField(
                    "tagLine",
                    event.target.value
                  )
                }
                autoComplete="off"
                required
              />
            </div>

          </div>


          {/* REGION */}
          <div className="riot-field region-field">
            <label
              className="field-label"
              htmlFor="platform"
            >
              Region
            </label>

            <select
              id="platform"
              value={formData.platform}
              onChange={(event) =>
                updateField(
                  "platform",
                  event.target.value
                )
              }
            >
              <option value="EUW1">
                Europe West
              </option>

              <option value="EUN1">
                Europe Nordic & East
              </option>

              <option value="NA1">
                North America
              </option>

              <option value="KR">
                Korea
              </option>

              <option value="JP1">
                Japan
              </option>

              <option value="BR1">
                Brazil
              </option>

              <option value="LA1">
                Latin America North
              </option>

              <option value="LA2">
                Latin America South
              </option>

              <option value="TR1">
                Turkey
              </option>
            </select>
          </div>


          <div className="riot-example">
            <span className="example-label">
              Example:
            </span>

            <span className="example-name">
              SummonerAce
            </span>

            <span className="example-tag">
              #EUW
            </span>
          </div>

        </section>


        {error && (
          <div
            className="prediction-error"
            role="alert"
          >
            {error}
          </div>
        )}


        <button
          className="predict-button"
          type="submit"
          disabled={loadingMatches}
        >
          <span>
            {loadingMatches
              ? "Finding Matches..."
              : "Find Recent Matches"}
          </span>

          {!loadingMatches && (
            <span className="button-arrow">
              →
            </span>
          )}
        </button>

      </form>


      {/* RECENT MATCHES */}
      {matches.length > 0 && (
        <section className="recent-matches">

          <div className="recent-matches-heading">
            <div>
              <p className="eyebrow">
                RECENT MATCHES
              </p>

              <h2>
                Choose a Match to Analyse
              </h2>

              <p>
                Showing recent Ranked Solo matches for{" "}
                <strong>
                  {accountData?.gameName}
                  #{accountData?.tagLine}
                </strong>
              </p>
            </div>
          </div>


          <div className="match-list">

            {matches.map((match) => {

              const isAnalysing =
                analysingMatchId === match.match_id;

              return (
                <article
                  key={match.match_id}
                  className="match-card"
                >

                  <div className="match-result-area">

                    <span
                      className={
                        match.win
                          ? "match-result victory"
                          : "match-result defeat"
                      }
                    >
                      {match.result}
                    </span>

                    <span className="match-date">
                      {formatMatchDate(
                        match.game_start_timestamp
                      )}
                    </span>

                  </div>


                  <div className="match-details">

                    <div className="match-detail">
                      <span>
                        Role
                      </span>

                      <strong>
                        {roleNames[match.role] || match.role}
                      </strong>
                    </div>


                    <div className="match-detail">
                      <span>
                        K / D / A
                      </span>

                      <strong>
                        {match.kills} / {match.deaths} / {match.assists}
                      </strong>
                    </div>


                    <div className="match-detail">
                      <span>
                        Duration
                      </span>

                      <strong>
                        {match.duration_minutes} min
                      </strong>
                    </div>

                  </div>


                  <button
                    type="button"
                    className="analyse-match-button"
                    disabled={analysingMatchId !== null}
                    onClick={() =>
                      handleAnalyseMatch(
                        match.match_id
                      )
                    }
                  >
                    {isAnalysing
                      ? "Analysing..."
                      : "Analyse Match"}
                  </button>

                </article>
              );
            })}

          </div>

        </section>
      )}


      <p className="prediction-disclaimer">
        RankScope analyses one ranked match and estimates
        which rank your performance in that match most closely
        resembles. It does not determine your actual League of
        Legends rank.
      </p>

    </main>
  );
}


export default Home;