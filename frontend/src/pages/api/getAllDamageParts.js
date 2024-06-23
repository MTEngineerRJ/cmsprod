import axios from "axios";

async function handler(request, response) {
  try {
    const token = request.headers.authorization;
    const domain = process.env.BACKEND_DOMAIN;
    const leadId = request.query.LeadId;
    const userResponse = await axios.get(`${domain}/spot/getDamageParts/${leadId}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      }
    });
    const user = userResponse.data;

    if (!user) {
      return response.status(404).json({ error: "User Not Found" });
    }
    return response.status(200).json({ msg: "OK", userData: user });
  } catch (err) {
    if (err.response) {
      
      // If the error is from an axios request (e.g., HTTP 4xx or 5xx error)
      const axiosError = err.response.data;
      const statusCode = err.response.status;
      console.log(axiosError);
      console.error(statusCode, axiosError.message); // Log the error for debugging

      return response.status(statusCode).json({ error: axiosError.message });
    } else {
      // Handle other types of errors
      return response.status(500).json({ error:err});
    }
  }
}

export default handler;
