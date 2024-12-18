import axios from "axios";

async function handler(request, response) {
  try {
    const token = request.headers.authorization;
    const domain = process.env.BACKEND_DOMAIN;

    // Extract necessary query parameters
    const { CalimStatus, Username } = request.query;

    // Make the request to fetch all claims
    const userResponse = await axios.get(`${domain}/claim/getAllClaims`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      params: {
        CalimStatus,
        Username,
      },
    });

    const users = userResponse.data;

    return response.status(200).json({ msg: "OK", data: users });
  } catch (err) {
    console.error(err);

    if (err.response) {
      // Handle axios request errors (HTTP 4xx or 5xx)
      const axiosError = err.response.data;
      const statusCode = err.response.status;
      console.error(statusCode, axiosError.message); // Log the error for debugging

      return response.status(statusCode).json({ error: axiosError.message });
    } else {
      // Handle other types of errors
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default handler;
