import axios from "axios";

export const scryfallAPI = axios.create({
  baseURL: "https://api.scryfall.com",
});
