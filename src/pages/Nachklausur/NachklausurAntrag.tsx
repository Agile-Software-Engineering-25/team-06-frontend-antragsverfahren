import { useState } from 'react';
import { Dayjs } from 'dayjs';
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
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [matrikelnummer, setMatrikelnummer] = useState('');
  const [modul, setModul] = useState('');
  const [prüfungstermin, setPrüfungstermin] = useState<Dayjs | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!name || !matrikelnummer || !modul || !prüfungstermin || !file) {
      alert(t('pages.nachklausur.submitError'));
      return;
    }

    // Submit logic here
    console.log({
      name,
      matrikelnummer,
      modul,
      prüfungstermin: prüfungstermin.format('DD-MM-YYYY'),
      file,
    });
  };

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
      <Typography level="h4">{t('pages.nachklausur.title')}</Typography>

      <FormControl>
        <FormLabel>{t('pages.nachklausur.nameLabel')}</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.nachklausur.matrikelnummerLabel')}</FormLabel>
        <Input
          value={matrikelnummer}
          onChange={(e) => setMatrikelnummer(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.nachklausur.modulLabel')}</FormLabel>
        <Select
          value={modul}
          onChange={(_, newValue) => setModul(newValue ?? '')}
          required
          placeholder={t('pages.nachklausur.modulAuswählen')}
        >
          <Option value="Mathematik">Mathematik</Option>
          <Option value="Informatik">Informatik</Option>
          <Option value="Physik">Physik</Option>
          {/* Add more modules as needed */}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.nachklausur.prüfungsterminLabel')}</FormLabel>
        <DatePicker
          value={prüfungstermin}
          onChange={(newDate) => setPrüfungstermin(newDate)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.nachklausur.dateiHochladenLabel')}</FormLabel>
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
        {t('pages.nachklausur.submitButton')}
      </Button>
    </Box>
  );
}
