import { useRef } from 'react';
import { Dayjs } from 'dayjs';
import { Box, Button, FormControl, Option, Select } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import type { AlertMessage, NachklausurAntrag } from '@/@custom-types/formTypes';
import EmailIcon from '@mui/icons-material/Email';

export default function NachklausurAntrag({
  onApi,
  onAlert
}: {
  onApi: (data: NachklausurAntrag) => Promise<void>;
  onAlert: React.Dispatch<React.SetStateAction<AlertMessage | undefined>>;
}) {
  const { t } = useTranslation();

  const modul = useRef('');
  const prüfungstermin = useRef<Dayjs | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !modul.current ||
      !prüfungstermin.current
    ) {
        onAlert({
          isOn: true,
          variant: 'error',
          message: t('pages.forms.nachklausur.submitError') +
            ' (' +
            t(
              `pages.forms.nachklausur.${(!modul.current && 'modul') || (!prüfungstermin.current && 'prüfungstermin')}Label`
            ) +
            ')'
        });
      return;
    }

    const nachklausurAntrag: NachklausurAntrag = {
      modul: modul.current,
      prüfungstermin: prüfungstermin.current!.format('DD-MM-YYYY'),
    };
    try{
      await onApi(nachklausurAntrag);
      onAlert({
        isOn: true,
        variant: 'success',
        message: t('pages.forms.nachklausur.success'),
      });
    } catch {
      onAlert({
        isOn: true,
        variant: 'error',
        message: t('pages.forms.nachklausur.submitFailed'),
      });
    }
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
      }}
    >
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
        startDecorator={<EmailIcon />}
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
