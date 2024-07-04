import axios from "axios";
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});
const ApiJson = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
//configurations for axios
const config = {
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
    },
};

export const loginApi= (data) => ApiJson.post("/api/user/login", data);
export const registerApi = (data) => ApiJson.post("/api/user/create", data);
// ------------------------------Community API ------------------------------
export const addCommunityApi = (formdata) => Api.post("/api/community/addCommunity", formdata,config);
export const getAllCommunitiesApi = () => Api.get("/api/community/getAllCommunities");
export const deleteCommunityApi = (id) => Api.delete(`/api/community/deleteCommunity/${id}`, config);
export const getCommunityByIdApi = (id) => Api.get(`/api/community/getCommunityByID/${id}`);
export const getHousesByCommunityApi = (id) => Api.get(`/api/houses/getHousesByCommunity/${id}`);

// ------------------------------ House API ------------------------------

export const addHouseApi = (formdata) => Api.post("/api/houses/addHouses", formdata,config);
export const getAllHousesApi = () => Api.get("/api/houses/getAllHouses");
export const deleteHouseApi = (id) => Api.delete(`/api/houses/deleteHouses/${id}`, config);
export const getHouseByIdApi = (id) => Api.get(`/api/houses/getHouses/${id}`);


// ------------------------------ Subscriber API ------------------------------
export const addSubscriberApi = (data) => ApiJson.post("/api/subscription/addSubscriber", data);
export const getAllSubscribersApi = () => Api.get("/api/subscription/getAllSubscribers");


/// ------------------------------ ComtactUS API ------------------------------
export const addContactUsApi = (data) => ApiJson.post("/api/contact/sendMail", data);

/// ------------------------------ ScheduleVisit API ------------------------------
export const addScheduleVisitApi = (data) => ApiJson.post("/api/contact/scheduleVisit", data);


/// ------------------------------ Track VISIT API ------------------------------
export const trackVisitApi = (data) => ApiJson.post("/api/visitors/track", data);
export const getAllVisitorsApi = () => Api.get("/api/visitors/get");

/// ------------------------------ Plot API ------------------------------
export const addPlotApi = (formdata) => ApiJson.post("/api/plot/addPlot", formdata,config);
export const getAllPlotsApi = () => Api.get("/api/plot/getPlots");
