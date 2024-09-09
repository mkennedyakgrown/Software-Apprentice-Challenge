import { useEffect, useState } from "react";
import AdCard from "./AdCard";
import SearchBar from "./SearchBar";
import SortMenu from "./SortMenu";

function CardsContainer() {
  const apiUrl = "http://localhost:3000/fakeDataSet";
  const [ads, setAds] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchFor, setSearchFor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the API and clean it and store it in the "ads" state
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const ads = cleanData(data);
        const cleanedAds = removeDuplicates(ads);
        setAds(cleanedAds);
        setIsLoading(false);
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  // Clean the data from the API
  function cleanData(data) {
    // Combine the ad groups from Facebook, Twitter, and Snapchat
    const adGroups = [
      ...data.facebook_ads,
      ...data.twitter_ads,
      ...data.snapchat_ads.map((ad) => {
        let creative = ad.ad_squad_name.slice(0, ad.ad_squad_name.length - 5);
        if (!creative.includes("Ads")) {
          creative = creative.concat("Ads");
        }
        ad.ad_squad_name = creative;
        return ad;
      }),
    ];

    // Store the analytics data in a separate variable
    const analytics = [...data.google_analytics];

    // Create an array of objects, sorting the data using the known keys from different platforms
    const ads = adGroups.map((ad) => {
      const adData = {
        campaign: ad.campaign_name || ad.campaign,
        adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name,
        creative: ad.ad_name || ad.image_name || ad.creative_name,
        spend: ad.spend || ad.cost,
        impressions: ad.impressions,
        clicks: ad.clicks || ad.post_clicks,
      };

      // Filter the analytics data to only include the data that matches the ad data
      const results = analytics.filter(
        (e) =>
          adData.campaign.includes(e.utm_campaign) &&
          adData.adset.includes(e.utm_medium) &&
          adData.creative.includes(e.utm_content)
      );
      // Add the results to the adData object (There may be multiple results for each ad, so store them in an array)
      adData.results = results.map((e) => e.results);
      return adData;
    });
    return ads;
  }

  // Remove duplicate ads from the array (There may be multiple ads with the same data, stored in different platforms' formats)
  function removeDuplicates(ads) {
    const jsonArray = [];

    // Filter the ads array to only include unique ads
    const cleanedAds = ads.filter((ad) => {
      // Check if the ad is already in the jsonArray
      if (jsonArray.includes(JSON.stringify(ad))) {
        return false;
      } else {
        // If it's not in the jsonArray, add it to the jsonArray and return true
        jsonArray.push(JSON.stringify(ad));
        return true;
      }
    });
    return cleanedAds;
  }

  // Filter the ads based on the searchFor state. If ads is null, return null. Otherwise, filter the ads based on the searchFor state.
  const searchAds = ads
    ? ads.filter((ad) =>
        ad.campaign.toLowerCase().includes(searchFor.toLowerCase())
      )
    : null;

  // Sort the ads based on the sortBy state. If searchAds is null, return null. Otherwise, sort the ads based on the sortBy state.
  const sortedAds = searchAds
    ? sortBy == ""
      ? searchAds
      : searchAds.sort((a, b) => {
          if (sortBy === "spend-asc") {
            return a.spend - b.spend;
          } else if (sortBy === "spend-desc") {
            return b.spend - a.spend;
          }
        })
    : null;

  // Render the AdCard components for each ad in the sortedAds array
  const renderAdCards = ads
    ? sortedAds.map((ad) => {
        return (
          <AdCard key={`${ad.campaign}-${ad.adset}-${ad.creative}`} ad={ad} />
        );
      })
    : null;

  // If the isLoading state is true, render the loading screen
  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  // Render the SortMenu, SearchBar, and AdCard components
  return (
    <div className="cards-container">
      <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
      <SearchBar searchFor={searchFor} setSearchFor={setSearchFor} />
      {/* Render the AdCard components for each ad in the sortedAds array */}
      {renderAdCards}
    </div>
  );
}

export default CardsContainer;
