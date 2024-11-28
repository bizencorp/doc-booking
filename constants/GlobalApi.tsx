import axios from "axios";

const BASE_URL = "http://192.168.1.104:1337/api";

const API_KEY =
  "06b234181c98ead3d385beee89347cfa544e928d3c168cc6ac75ee8b99a13dd6a4fbf95f689669fb52156f5f58010c98651bdfe46d55712b07bcd9e4516d93ff06563befd3be7fc10d61100270b344bdf41eded01439254a4de74c38ef410c63b674ada7860e13d2d97cf22e0d80193d0cc1884bc50bf84603a9cba85663b693";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const getSlider = () => AxiosInstance.get("/sliders?populate=*");

const getCategory = () => AxiosInstance.get("/categories?populate=*");

const getHospital = () => AxiosInstance.get("/hospitals?populate=*");

const getHospitalByCategories = (category: any) =>
  AxiosInstance.get(
    "/hospitals?filters[categories][Name][$in]=" + category + "&populate=*"
  );

const getDoctorByCategories = (category: any) =>
  AxiosInstance.get(
    "/doctors?filters[categories][Name][$eq]=" + category + "&populate=*"
  );
const getDoctorByHospital = (hospital: any) =>
  AxiosInstance.get(
    "/doctors?filters[hospital][Name][$in]=" + hospital + "&populate=*"
  );

const getHospitalList = () => AxiosInstance.get("/hospitals?populate=*");

const getDoctorList = () => AxiosInstance.get("/doctors?populate=*");

const makeAppointment = (data: any) =>
  AxiosInstance.post("/appointments", data);

const updateAppointment = ({data,id}: any) =>
  AxiosInstance.put("/appointments/"+ id, data);

const Appointments = (email: any) =>
  AxiosInstance.get(
    "/appointments?filters[Email][$eq]=" + email + "&populate=*"
  );

const makeUser = (data: any) =>
  AxiosInstance.post("/app-users", data);

const UserInfo = (email: any) =>
  AxiosInstance.get(
    "/app-users?filters[email][$eq]=" + email + "&populate=*"
  );

export default {
  getSlider,
  getCategory,
  getHospital,
  getHospitalByCategories,
  getDoctorByCategories,
  getDoctorByHospital,
  makeAppointment,
  getDoctorList,
  getHospitalList,
  Appointments,
  makeUser,
  UserInfo,
  updateAppointment
};
