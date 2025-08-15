import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Typography,
} from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';



export default function NachklausurAntrag() {
  const [name, setName] = useState('');
  const [matrikelnummer, setMatrikelnummer] = useState('');
  const [modul, setModul] = useState('');
  const [prüfungstermin, setPrüfungstermin] = useState<Dayjs | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!name || !matrikelnummer || !modul || !prüfungstermin || !file) {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }

    // Submit logic here
    console.log({
      name,
      matrikelnummer,
      modul,
      prüfungstermin: prüfungstermin.format('YYYY-MM-DD'),
      file,
    });
  };
  console.log(t("lng"));

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 'md',
      }}
    >


      <Typography level="h4">Nachklausur Antrag</Typography>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>Matrikelnummer</FormLabel>
        <Input
          value={matrikelnummer}
          onChange={(e) => setMatrikelnummer(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>Modul</FormLabel>
        <Select
          value={modul}
          onChange={(_, newValue) => setModul(newValue ?? '')}
          required
          placeholder="Modul auswählen"
        >
          <Option value="Mathematik">Mathematik</Option>
          <Option value="Informatik">Informatik</Option>
          <Option value="Physik">Physik</Option>
          {/* Add more modules as needed */}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Prüfungstermin</FormLabel>
        <DatePicker
          value={prüfungstermin}
          onChange={(newDate) => setPrüfungstermin(newDate)}
        />
      </FormControl>

        <FormControl>
        <FormLabel>Datei Upload</FormLabel>
        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </FormControl>

      <Button type="submit" variant="solid" color="primary">
        Antrag einreichen
      </Button>
    </Box>
  );
}
