import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

interface DadosFatura {
  nCliente: string;
  mesRef: string;
  energiaEletricaQuantidade: number;
  energiaEletricaValor: number;
  energiaSCEEEQuantidade: number;
  energiaSCEEEValor: number;
  energiaCompensadaQuantidade: number;
  energiaCompensadaValor: number;
  contribIlumPM: number;
  valorTotal: number;
}

const pastaPDFs = 'extractedData/data';
const arquivoProcessados = 'extractedData/dataCheck.json';
const dadosFaturas: DadosFatura[] = [];

function carregarProcessados(): Set<string> {
  if (!fs.existsSync(arquivoProcessados)) {
    fs.writeFileSync(arquivoProcessados, JSON.stringify([]));
  }
  const processados = JSON.parse(fs.readFileSync(arquivoProcessados, 'utf8'));
  return new Set(processados);
}

function salvarProcessados(processados: Set<string>) {
  fs.writeFileSync(arquivoProcessados, JSON.stringify(Array.from(processados)));
}

async function lerPdfEExtrairDados(texto: string): Promise<DadosFatura | null> {
  let nCliente = ''
  let mesRef = ''

  let energiaEletricaValor = 0
  let energiaEletricaQuantidade = 0
  let energiaSCEEEQuantidade = 0
  let energiaSCEEEValor = 0

  let energiaCompensadaQuantidade = 0
  let energiaCompensadaValor = 0

  let contribIlumPM = 0
  let valorTotal = 0

  try {
    const linhas = texto.split('\n');
    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];

      if (linha.includes("Nº DO CLIENTE")) {
        const proximaLinha = linhas[i + 1];

        const partes = proximaLinha.trim().split(/\s+/);
        if (partes.length > 0) {
          nCliente = partes[0];
        }
      } else if (linha.includes("Referente a")) {
        const proximaLinha = linhas[i + 1];

        const partes = proximaLinha.trim().split(/\s+/);
        if (partes.length > 0) {
          mesRef = partes[0];
        }
      } else if (linha.includes("Energia ElétricakWh")) {
        const partes = linha.trim().split(/\s+/);

        if (partes.length > 0) {
          energiaEletricaQuantidade = parseFloat(partes[2]);
          energiaEletricaValor = parseFloat(partes[4].replace(',', '.'))
        }
      }
      else if (linha.includes("Energia SCEE s/ ICMSkWh")) {
        const partes = linha.trim().split(/\s+/);

        if (partes.length > 0) {
          energiaSCEEEQuantidade = parseFloat(partes[4]);
          energiaSCEEEValor = parseFloat(partes[6].replace(',', '.'))
        }
      }
      else if (linha.includes("Energia compensada GD IkWh")) {
        const partes = linha.trim().split(/\s+/);

        if (partes.length > 0) {
          energiaCompensadaQuantidade = parseFloat(partes[4]);
          energiaCompensadaValor = parseFloat(partes[6].replace(',', '.'))
        }

      }
    }

    const contribMatch = texto.match(/Contrib Ilum Publica Municipal\s+([\d,.]+)/);
    if (contribMatch) {
      contribIlumPM = parseFloat(contribMatch[1].replace(',', '.'));
    }

    const totalMatch = texto.match(/TOTAL\s+([\d,.]+)/);
    if (totalMatch) {
      valorTotal = parseFloat(totalMatch[1].replace(',', '.'));
    }

    const dadosFatura: DadosFatura = {
      nCliente,
      mesRef,
      energiaEletricaQuantidade,
      energiaEletricaValor,
      energiaSCEEEQuantidade,
      energiaSCEEEValor,
      energiaCompensadaQuantidade,
      energiaCompensadaValor,
      contribIlumPM,
      valorTotal,
    };

    return dadosFatura

  } catch (error) {
    console.error('Erro ao processar o PDF:', error);
    return null
  }
}

async function processarPDF(pdfPath: string, processados: Set<string>) {
  const nomeArquivo = path.basename(pdfPath);
  if (processados.has(nomeArquivo)) {
    console.log(`PDF já processado: ${nomeArquivo}`);
    return;
  }

  const buffer = fs.readFileSync(pdfPath);
  const dadosPDF = await pdfParse(buffer);

  const dadosFatura = await lerPdfEExtrairDados(dadosPDF.text);
    if (dadosFatura) {
      dadosFaturas.push(dadosFatura);
    }

  processados.add(nomeArquivo);
  salvarProcessados(processados)
}

async function processarTodosPDFs() {
  const processados = carregarProcessados();
  const arquivosPDF = fs.readdirSync(pastaPDFs).filter(arquivo => arquivo.endsWith('.pdf'));

  for (const arquivo of arquivosPDF) {
    const caminhoPDF = path.join(pastaPDFs, arquivo);
    await processarPDF(caminhoPDF, processados);
  }

  fs.writeFileSync('extractedData/data.json', JSON.stringify(dadosFaturas, null, 2), 'utf-8');
}

processarTodosPDFs();