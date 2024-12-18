import axios from "axios";

export default async function handler(req, res) {
  const { query } = req; // Pass query parameters from the request
  const targetUrl = "https://vapio.in/api.php";

  try {
    const response = await axios.get(targetUrl, { params: query });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
