import axios from "axios";
 async function handler (request,response) {
  try {
    const token = request.headers.authorization;
    const domain = process.env.BACKEND_DOMAIN;
    const leadId = request.query.leadId;
    const userResponse = await axios.get(`${domain}/parts/getVehiclePartsDetails/${leadId}`,
    {
        headers: {
          Authorization:token,
          "Content-Type":"application/json"
        }
      });
    const users = userResponse.data;
    return response.status(200).json({msg:"OK",data : users});
  } catch (err) {
    console.log(err)
    if (err.response) {
      const axiosError = err.response.data;
      const statusCode = err.response.status;
      console.error(statusCode,axiosError.message); 

      return response.status(statusCode).json({ error: axiosError.message });
    } else {
      return response.status(500).json({ error: "Internal Server Error" });
    }

  }
}
 
export default handler;

