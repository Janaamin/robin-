import axios from "axios";
import { useEffect, useState } from "react";

export const useGetMoreBirdDetails = ({ birdName }) => {
  const [shortDescription, setShortDescription] = useState("");
  const [appearance, setAppearance] = useState("");
  const [moreDetailsUrl, setMoreDetailsUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBirdDescription = async (birdName) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${birdName}`
      );
      const data = await response.json();
      if (data && data.extract) {
        setShortDescription(data.extract);
        setAppearance(
          `The ${birdName} typically has distinctive features such as its size, color, and notable markings.`
        );
        setMoreDetailsUrl(data.content_urls.desktop.page);
      } else {
        setShortDescription("Description not available");
        setAppearance("Appearance details not available.");
      }
    } catch (error) {
      console.error("Error fetching bird description: ", error);
      setShortDescription("Error fetching description");
      setAppearance("Error fetching appearance details.");
    }
  };
  const getBirdImages = async (birdName) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${birdName}&client_id=i7RoddcRb7XMxsfWJKJfI1SAuu4m7KPgz5Umdd7d3J4&per_page=6`
      );
      const imageUrls = response.data.results.map((img) => img.urls.regular);
      setImageUrls(imageUrls);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images: ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBirdDescription(birdName);
    getBirdImages(birdName);
  }, [birdName]);
  return [
    loading,
    shortDescription,
    appearance,
    moreDetailsUrl,
    imageUrls,
  ] as const;
};
