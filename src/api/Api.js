// import React from "react";
import axios from "axios";
const baseUrl = "http://65.2.166.0";
const token = sessionStorage.getItem("token");
export const RegisterUser = (params, type) => {
  axios
    .post(`${baseUrl}/${type}/register`, params)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

export const getAllStudent =  () => {
  return  axios
    .get(`${baseUrl}/student/getstudent`, {
      headers: { Authorization: `${token}` },
    })
};

export const LoginUser = (data, type) => {
  return axios
    .post(`${baseUrl}/${type}/login`, data);
};


export const QuestionUpload = (params) => {
  return axios
    .post(`${baseUrl}/uploadQuestion`, params);
};

export const getStudentByBatch = (params) => {
  return axios
    .post(`${baseUrl}/getAllBatchStudent`, params);
};

export const getAllBatch = () => {
   return axios
    .get(`${baseUrl}/getAllBatch`);
};

export const createNewBatch = (params) => {
  return axios
    .post(`${baseUrl}/batch/register`, params);
};


