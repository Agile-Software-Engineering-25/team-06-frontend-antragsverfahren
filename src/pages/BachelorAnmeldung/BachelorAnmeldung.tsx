import { useRef, useState } from 'react';
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
import type { BachelorAnmeldung } from '@/@custom-types/formTypes';

export default function BachelorAnmeldung({ onApi }: { onApi: (data: BachelorAnmeldung) => Promise<void> }) {
  const { t } = useTranslation();

  const name = useRef('');
  const matrikelnummer = useRef('');
  const modul = useRef('');
  const prüfungstermin = useRef<Dayjs | null>(null);
  const thema = useRef('');
  const firstExaminer = useRef('');
  const secondExaminer = useRef('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !name.current ||
      !matrikelnummer.current ||
      !modul.current ||
      !prüfungstermin.current ||
      !thema.current ||
      !firstExaminer.current ||
      !secondExaminer.current
    ) {
      alert(
        t('pages.forms.bachelorAnmeldung.submitError') +
          ' (' +
          t(
            `pages.forms.bachelorAnmeldung.${(!name.current && 'name') || (!matrikelnummer.current && 'matrikelnummer') || (!modul.current && 'studiengang') || (!prüfungstermin.current && 'prüfungstermin') || (!thema.current && 'thema') || (!firstExaminer.current && 'erstPrüfer') || (!secondExaminer.current && 'zweitPrüfer')}Label`
          ) +
          ')'
      );
      return;
    }

    const bachelorAnmeldung: BachelorAnmeldung = {
      name: name.current,
      matrikelnummer: matrikelnummer.current,
      modul: modul.current,
      prüfungstermin: prüfungstermin.current!.format('DD-MM-YYYY'),
      thema: thema.current,
      firstExaminer: firstExaminer.current,
      secondExaminer: secondExaminer.current,
    };

    await onApi(bachelorAnmeldung);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '70%',
        mx: 'auto',
        my: 2,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 'md',
      }}
    >
      <Typography level="h4">
        {t('pages.forms.bachelorAnmeldung.title')}
      </Typography>

      <FormControl>
        <FormLabel>{t('pages.forms.bachelorAnmeldung.nameLabel')}</FormLabel>
        <Input onChange={(e) => (name.current = e.target.value)} required />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('pages.forms.bachelorAnmeldung.matrikelnummerLabel')}
        </FormLabel>
        <Input
          onChange={(e) => (matrikelnummer.current = e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('pages.forms.bachelorAnmeldung.studiengangLabel')}
        </FormLabel>
        <Select
          onChange={(_, newValue: string | null) =>
            (modul.current = newValue ?? '')
          }
          required
          placeholder={t('pages.forms.bachelorAnmeldung.studiengangAuswählen')}
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
        <FormLabel>{t('pages.forms.bachelorAnmeldung.themaLabel')}</FormLabel>
        <Input onChange={(e) => (thema.current = e.target.value)} required />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('pages.forms.bachelorAnmeldung.erstPrüferLabel')}
        </FormLabel>
        <Input
          onChange={(e) => (firstExaminer.current = e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('pages.forms.bachelorAnmeldung.zweitPrüferLabel')}
        </FormLabel>
        <Input
          onChange={(e) => (secondExaminer.current = e.target.value)}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          {t('pages.forms.bachelorAnmeldung.prüfungsterminLabel')}
        </FormLabel>
        <DatePicker
          onChange={(newDate) => (prüfungstermin.current = newDate)}
        />
      </FormControl>

      <Button type="submit" variant="solid" color="primary">
        {t('pages.forms.bachelorAnmeldung.submitButton')}
      </Button>
    </Box>
  );
}
