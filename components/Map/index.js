import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};
export default function Map({ Component, pageProps }) {
  const { data, error } = useSWR("https://api.openstreetmap.org", fetcher);

  if (error) return <div>Failed to load Map</div>;
  if (!data) return <div>Loading...</div>;
}
