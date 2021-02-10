import axios from 'axios'

export const baxios = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
})
