import baseUrlApi from "@utils/baseUrlApi";
import axios, { AxiosResponse } from "axios";

export const InvoicesService = {
  GetEletricityData: async () => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/api/eletricityData`;
      const httpHeaders = {
        "Content-Type": "application/json",
      };
      const response: AxiosResponse = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao obter dados para o gráfico:", error);
      throw new Error("Não foi possível dados para o gráfico");
    }
  },

  GetInvoceValueData: async () => {
    try {
      const API_URL = `${baseUrlApi.baseUrlApi}/api/invoceValueData`;
      const httpHeaders = {
        "Content-Type": "application/json",
      };
      const response: AxiosResponse = await axios.get(API_URL, {
        headers: httpHeaders,
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao obter dados para o gráfico:", error);
      throw new Error("Não foi possível dados para o gráfico");
    }
  },

}