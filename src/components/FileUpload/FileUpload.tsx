import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import UPLOAD_TRADE from './uploadTradeMutation';

type Trade = {
  userId: string;
  stockSymbol: string;
  tradeType: string;
  quantity: number;
  price: number;
  tradeDate: string;
};

const parseCSV = (text: string) => {
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    return headers.reduce((acc, header, index) => {
      return { ...acc, [header.trim()]: values[index].trim() };
    }, {} as Trade);
  });
};

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadTrade] = useMutation(UPLOAD_TRADE);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;
      const trades = parseCSV(text);
      await Promise.all(trades.map((trade) => uploadTrade({ variables: trade })));
    };
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' accept='.csv' onChange={handleFileChange} />
      <button type='submit'>Upload</button>
    </form>
  );
}

export default FileUpload;
