// Create a card component for each ad in the ads array

import "./AdCard.css";

function AdCard({ ad }) {
  // If the ad has results, join them into a string and display them. Otherwise, display "No Results Data"
  const results =
    ad.results.length > 0 ? ad.results.join(", ") : "No Results Data";

  // Render the AdCard component, including the Campaign, Adset, Creative, Spend, Impressions, Clicks, and Results
  return (
    <div className="ad-card">
      <div className="ad-card-header">
        <h2>Campaign: {ad.campaign}</h2>
        <h2>Adset: {ad.adset}</h2>
        <h2>Creative: {ad.creative}</h2>
      </div>
      <div className="ad-card-body">
        <div className="ad-card-spend">
          <h3>Spend - ${ad.spend}</h3>
        </div>
        <div className="ad-card-impressions">
          <h3>Impressions - {ad.impressions}</h3>
        </div>
        <div className="ad-card-clicks">
          <h3>Clicks - {ad.clicks}</h3>
        </div>
        <div className="ad-card-results">
          <h3>Results - {results}</h3>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
