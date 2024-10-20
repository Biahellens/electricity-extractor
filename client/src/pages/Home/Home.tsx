import LineChart from "@components/Charts/LineChart";
import {
  Content, Title, ContentCards, Card
} from "./style";
import { InvoicesService } from "@services/InvoicesService";
import { useEffect, useState } from "react";

interface EnergyData {
  energiaCompensadaQuantidade: number;
  energiaEletricaQuantidade: number;
  mesRef: string;
}

interface EnergyChartData {
  labels: string[];
  energiaCompensadaData: number[];
  energiaEletricaData: number[];
}

function Home() {
  // { isMobile } = UseMobile();

  const [chartData, setChartData] = useState<EnergyChartData>({ labels: [], energiaCompensadaData: [], energiaEletricaData: [] });

  const processEletricityChartData = (data: EnergyData[]): EnergyChartData => {
    const groupedData: { [key: string]: { energiaCompensadaQuantidade: number; energiaEletricaQuantidade: number } } = {};

    data.forEach(item => {
        const month = item.mesRef; // Mantemos o formato original "JAN/2024"

        if (!groupedData[month]) {
            groupedData[month] = {
                energiaCompensadaQuantidade: 0,
                energiaEletricaQuantidade: 0,
            };
        }

        // Soma os valores em vez de empurrar para um array
        groupedData[month].energiaCompensadaQuantidade += item.energiaCompensadaQuantidade;
        groupedData[month].energiaEletricaQuantidade += item.energiaEletricaQuantidade;
    });

    const labels: string[] = [];
    const energiaCompensadaData: number[] = [];
    const energiaEletricaData: number[] = [];

    // Para garantir que os meses apareçam na ordem correta, vamos ordenar as chaves
    const sortedMonths = Object.keys(groupedData).sort((a, b) => {
        const [aMonth, aYear] = a.split('/');
        const [bMonth, bYear] = b.split('/');

        const monthOrder = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        return aYear === bYear
            ? monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth)
            : parseInt(aYear) - parseInt(bYear);
    });

    sortedMonths.forEach(month => {
        labels.push(month);
        energiaCompensadaData.push(groupedData[month].energiaCompensadaQuantidade);
        energiaEletricaData.push(groupedData[month].energiaEletricaQuantidade);
    });

    console.log({ labels, energiaCompensadaData, energiaEletricaData })
    return { labels, energiaCompensadaData, energiaEletricaData };
};


  const getEletricityData = async () => {
    try {
      const result = await InvoicesService.GetEletricityData();

      if (result) {
        const processedData = processEletricityChartData(result);
        setChartData(processedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  useEffect(() => {
    getEletricityData()
  }, []);

  return (
    <Content>
      <Title>Home</Title>
      <ContentCards>
        <Card><LineChart
          labels={chartData.labels}
          dataCompensada={chartData.energiaCompensadaData}
          dataEletrica={chartData.energiaEletricaData}
        /></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </ContentCards>
    </Content>
  );
}

export default Home;