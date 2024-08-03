import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, TextField, Typography } from '@mui/material';
import UPLOAD_TRADE from './uploadTradeMutation';

type Trade = {
  userId: string;
  stockSymbol: string;
  tradeType: string;
  quantity: number;
  price: number;
  tradeDate: string;
};

const parseCSV = (text: string): Trade[] => {
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    return headers.reduce((acc, header, index) => {
      let value: string | number = values[index].trim();
      if (header.trim() === 'quantity' || header.trim() === 'price') {
        value = Number(value);
      }
      return { ...acc, [header.trim()]: value };
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
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant='h6'>Upload CSV file:</Typography>
      <TextField
        variant='outlined'
        type='file'
        inputProps={{ accept: '.csv', 'aria-label': 'upload csv file' }}
        onChange={handleFileChange}
      />
      <Button variant='contained' color='primary' type='submit'>
        Upload
      </Button>
    </Box>
  );
}

export default FileUpload;
