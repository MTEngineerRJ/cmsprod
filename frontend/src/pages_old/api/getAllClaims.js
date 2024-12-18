import axios from "axios";

async function handler(request, response) {
  try {
    const token = request.headers.authorization;
    const domain = process.env.BACKEND_DOMAIN;

    const { CalimStatus, Username } = request.query;

    // Fetch all claims without region filters
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
    console.log(err);
    if (err.response) {
      // Handle errors from axios requests
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
