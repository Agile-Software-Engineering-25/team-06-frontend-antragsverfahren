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

export default function BachelorAnmeldung() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [matrikelnummer, setMatrikelnummer] = useState('');
  const [modul, setModul] = useState('');
  const [prüfungstermin, setPrüfungstermin] = useState<Dayjs | null>(null);
  const [thema, setThema] = useState('');
  const [firstExaminer, setFirstExaminer] = useState('');
  const [secondExaminer, setSecondExaminer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !name ||
      !matrikelnummer ||
      !modul ||
      !prüfungstermin ||
      !thema ||
      !firstExaminer
    ) {
      alert(t('pages.bachelorAnmeldung.submitError'));
      return;
    }

    // Submit logic here
    console.log({
      name,
      matrikelnummer,
      modul,
      prüfungstermin: prüfungstermin.format('DD-MM-YYYY'),
      thema,
      firstExaminer,
      secondExaminer,
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

      <Typography level="h4">{t('pages.bachelorAnmeldung.title')}</Typography>
      
      <FormControl>
        <FormLabel>{t('pages.bachelorAnmeldung.nameLabel')}</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('pages.bachelorAnmeldung.matrikelnummerLabel')}
        </FormLabel>
        <Input
          value={matrikelnummer}
          onChange={(e) => setMatrikelnummer(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.bachelorAnmeldung.studiengangLabel')}</FormLabel>
        <Select
          value={modul}
          onChange={(_, newValue) => setModul(newValue ?? '')}
          required
          placeholder={t('pages.bachelorAnmeldung.studiengangAuswählen')}
        >
          <Option value="Angewandte Mathematik (B.Sc.)">
            Angewandte Mathematik (B.Sc.)
          </Option>
          <Option value="Biotechnologie B.Sc.">Biotechnologie B.Sc.</Option>
          <Option value="Biotechnologie M.Sc.">Biotechnologie M.Sc.</Option>
          <Option value="Chemie B.Sc.">Chemie B.Sc.</Option>
          <Option value="Chemie M.Sc.">Chemie M.Sc.</Option>
          <Option value="Informatik B.Sc.">Informatik B.Sc.</Option>
          <Option value="Informatik M.Sc.">Informatik M.Sc.</Option>
          <Option value="Maschinenbau B.Sc.">Maschinenbau B.Sc.</Option>
          <Option value="Maschinenbau M.Sc.">Maschinenbau M.Sc.</Option>
          <Option value="Physik B.Sc.">Physik B.Sc.</Option>
          <Option value="Physik M.Sc.">Physik M.Sc.</Option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.bachelorAnmeldung.themaLabel')}</FormLabel>
        <Input
          value={thema}
          onChange={(e) => setThema(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.bachelorAnmeldung.erstPrüferLabel')}</FormLabel>
        <Input
          value={firstExaminer}
          onChange={(e) => setFirstExaminer(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.bachelorAnmeldung.zweitPrüferLabel')}</FormLabel>
        <Input
          value={secondExaminer}
          onChange={(e) => setSecondExaminer(e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('pages.bachelorAnmeldung.prüfungsterminLabel')}
        </FormLabel>
        <DatePicker
          value={prüfungstermin}
          onChange={(newDate) => setPrüfungstermin(newDate)}
        />
      </FormControl>

      <Button type="submit" variant="solid" color="primary">
        {t('pages.bachelorAnmeldung.submitButton')}
      </Button>
    </Box>
  );
}
