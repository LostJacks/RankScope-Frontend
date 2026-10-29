
import { useState } from "react";
import "../styles/home.css";

const API_URL = "http://127.0.0.1:8000";

function Home({ onPredict }) {
  const [formData, setFormData] = useState({
    gameName: "",
    tagLine: "",
    platform: "EUW1",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handlePredict(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/predictions/overall`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            game_name: formData.gameName.trim(),
            tag_line: formData.tagLine.trim().replace(/^#/, ""),
            platform: formData.platform,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : "Could not analyse this player.";

        throw new Error(message);
      }

      if (!data.overall_prediction || !Array.isArray(data.matches)) {
        throw new Error("Unexpected response from the backend.");
      }

      // Pass the entire response to the results page.
      onPredict(data);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home-page">
      {/* HERO */}
      <section className="hero">
        <p className="eyebrow">RANKSCOPE</p>

        <h1>Discover Your Predicted Rank</h1>

        <p className="hero-description">
          Enter your Riot ID and let RankScope analyse up to
          20 recent Ranked Solo/Duo matches to estimate
          which rank your overall performance most closely
          resembles.
        </p>
      </section>

      {/* RIOT ID FORM */}
      <form
        className="prediction-form"
        onSubmit={handlePredict}
      >
        <section className="form-section">
          <div className="section-heading">
            <div>
              <h2>Find Your Account</h2>

              <p className="section-hint">
                Enter the Riot ID connected to your
                League of Legends account.
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
                  updateField("gameName", event.target.value)
                }
                autoComplete="off"
                disabled={loading}
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
                  updateField("tagLine", event.target.value)
                }
                autoComplete="off"
                disabled={loading}
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
                updateField("platform", event.target.value)
              }
              disabled={loading}
            >
              <option value="EUW1">Europe West</option>
              <option value="EUN1">
                Europe Nordic & East
              </option>
              <option value="NA1">North America</option>
              <option value="KR">Korea</option>
              <option value="JP1">Japan</option>
              <option value="BR1">Brazil</option>
              <option value="LA1">
                Latin America North
              </option>
              <option value="LA2">
                Latin America South
              </option>
              <option value="TR1">Turkey</option>
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

        {/* ERROR */}
        {error && (
          <div
            className="prediction-error"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* PREDICT BUTTON */}
        <button
          className="predict-button"
          type="submit"
          disabled={loading}
        >
          <span>
            {loading
              ? "Analysing Recent Matches..."
              : "Predict My Rank"}
          </span>

          {!loading && (
            <span className="button-arrow">
              →
            </span>
          )}
        </button>

        {loading && (
          <p
            className="section-hint"
            role="status"
            style={{
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Retrieving ranked matches and calculating
            your overall prediction. This may take
            a little while.
          </p>
        )}
      </form>

      {/* DISCLAIMER */}
      <p className="prediction-disclaimer">
        RankScope estimates a performance-based rank
        using up to 20 recent Ranked Solo/Duo matches.
        Results may vary depending on the number of
        matches available and do not determine your
        official League of Legends rank.
      </p>
    </main>
  );
}

export default Home;
