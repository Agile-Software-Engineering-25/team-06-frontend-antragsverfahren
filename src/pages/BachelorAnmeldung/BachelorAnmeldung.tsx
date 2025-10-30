// @ts-nocheck
import React, { useRef } from 'react';
import { Dayjs } from 'dayjs';
import { Box, Button, FormControl, Input, Option, Select } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import type {
  AlertMessage,
  BachelorAnmeldung,
} from '@/@custom-types/formTypes';
import FileUpload from '../../components/FileUpload/FileUpload.tsx';
import EmailIcon from '@mui/icons-material/Email';

export default function BachelorAnmeldung({
  dozNames,
  onApi,
  onAlert,
}: {
  dozNames: string[];
  onApi: (data: BachelorAnmeldung) => Promise<void>;
  onAlert: React.Dispatch<React.SetStateAction<AlertMessage | undefined>>;
}) {
  const { t } = useTranslation();

  const prüfungstermin = useRef<Dayjs | null>(null);
  const thema = useRef('');
  const prüfer = useRef('');
  const expose = useRef<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!prüfungstermin.current || !thema.current || !prüfer.current || !expose.current) {
      onAlert({
        isOn: true,
        variant: 'error',
        message:
          t('pages.forms.bachelorAnmeldung.submitError') +
          ' (' +
          t(
            `pages.forms.bachelorAnmeldung.${(!prüfungstermin.current && 'prüfungstermin') || (!thema.current && 'thema') || (!prüfer.current && 'prüfer') || (!expose.current && 'expose')}Label`
          ) +
          ')',
      });

      return;
    }

    const bachelorAnmeldung: BachelorAnmeldung = {
      prüfungstermin: prüfungstermin.current!.format('DD-MM-YYYY'),
      thema: thema.current,
      prüfer: prüfer.current,
      expose: expose.current,
    };

    try {
      await onApi(bachelorAnmeldung);
      onAlert({
        isOn: true,
        variant: 'success',
        message: t('pages.forms.bachelorAnmeldung.success'),
      });
    } catch {
      onAlert({
        isOn: true,
        variant: 'error',
        message: t('pages.forms.bachelorAnmeldung.submitFailed'),
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
        mx: 'auto',
        my: 2,
        p: 2,
      }}
    >
      <FormControl>
        <Input
          onChange={(e) => (thema.current = e.target.value)}
          required
          placeholder={t('pages.forms.bachelorAnmeldung.themaLabel')}
        />
      </FormControl>

      <FormControl>
        <Select
          onChange={(_, newValue: string | null) =>
            (prüfer.current = newValue ?? '')
          }
          required
          placeholder={t('pages.forms.bachelorAnmeldung.prüferLabel')}
        >
          <div>
            {dozNames.map((p) => (
              <Option key={p} value={p}>
                {p}
              </Option>
            ))}
          </div>
        </Select>
      </FormControl>

      <FormControl>
        <DatePicker
          onChange={(newDate) => (prüfungstermin.current = newDate)}
          label={t('pages.forms.bachelorAnmeldung.prüfungsterminLabel')}
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

      <FileUpload
        onFile={(file) => (expose.current = file)}
        sx={{
          width: 'auto',
          alignSelf: 'flex-start',
          px: 3
        }}
      ></FileUpload>

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
        {t('pages.forms.bachelorAnmeldung.submitButton')}
      </Button>
    </Box>
  );
}
