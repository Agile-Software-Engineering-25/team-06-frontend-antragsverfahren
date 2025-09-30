import { useRef } from 'react';
import { Dayjs } from 'dayjs';
import { Box, Button, FormControl, Input, Option, Select } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import type { NachklausurAntrag } from '@/@custom-types/formTypes';
import EmailIcon from '@mui/icons-material/Email';

export default function NachklausurAntrag({
  onApi,
}: {
  onApi: (data: NachklausurAntrag) => Promise<void>;
}) {
  const { t } = useTranslation();

  const name = useRef('');
  const matrikelnummer = useRef('');
  const modul = useRef('');
  const prüfungstermin = useRef<Dayjs | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.current ||
      !matrikelnummer.current ||
      !modul.current ||
      !prüfungstermin.current
    ) {
      alert(
        t('pages.forms.nachklausur.submitError') +
          ' (' +
          t(
            `pages.forms.nachklausur.${(!name.current && 'name') || (!matrikelnummer.current && 'matrikelnummer') || (!modul.current && 'modul') || (!prüfungstermin.current && 'prüfungstermin')}Label`
          ) +
          ')'
      );
      return;
    }

    const nachklausurAntrag: NachklausurAntrag = {
      name: name.current,
      matrikelnummer: matrikelnummer.current,
      modul: modul.current,
      prüfungstermin: prüfungstermin.current!.format('DD-MM-YYYY'),
    };

    await onApi(nachklausurAntrag);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mx: 'auto',
        my: 2,
        p: 2,
      }}
    >
      <FormControl>
        <Input
          onChange={(e) => (name.current = e.target.value)}
          required
          placeholder={t('pages.forms.nachklausur.nameLabel')}
        />
      </FormControl>

      <FormControl>
        <Input
          onChange={(e) => (matrikelnummer.current = e.target.value)}
          required
          placeholder={t('pages.forms.nachklausur.matrikelnummerLabel')}
        />
      </FormControl>

      <FormControl>
        <Select
          onChange={(_, newValue: string | null) =>
            (modul.current = newValue ?? '')
          }
          required
          placeholder={t('pages.forms.nachklausur.modulAuswählen')}
        >
          <Option value="Mathematik">Mathematik</Option>
          <Option value="Informatik">Informatik</Option>
          <Option value="Physik">Physik</Option>
        </Select>
      </FormControl>

      <FormControl>
        <DatePicker
          onChange={(newDate) => (prüfungstermin.current = newDate)}
          label={t('pages.forms.nachklausur.prüfungsterminLabel')}
          slotProps={{
            textField: {
              sx: {
                backgroundColor: '#fff',
                borderRadius: '8px',
              },
            },
          }}
        />
      </FormControl>

      <Button
        type="submit"
        variant="solid"
        color="primary"
        startDecorator=<EmailIcon />
        sx={{
          width: 'auto',
          alignSelf: 'flex-start',
          px: 3,
        }}
      >
        {t('pages.forms.nachklausur.submitButton')}
      </Button>
    </Box>
  );
}
