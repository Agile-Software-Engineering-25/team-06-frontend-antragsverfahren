import { useRef } from 'react';
import { Dayjs } from 'dayjs';
import { Box, Button, FormControl, Input, Option, Select } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import type { BachelorAnmeldung } from '@/@custom-types/formTypes';
import FileUpload from '../../components/FileUpload/FileUpload.tsx';
import EmailIcon from '@mui/icons-material/Email';

const mockedPruefer = [
  'Volk',
  'Daubert',
  'Hutter',
  'Scheidemann',
];

export default function BachelorAnmeldung({
  onApi,
}: {
  onApi: (data: BachelorAnmeldung) => Promise<void>;
}) {
  const { t } = useTranslation();

  const name = useRef('');
  const matrikelnummer = useRef('');
  const studiengang = useRef('');
  const prüfungstermin = useRef<Dayjs | null>(null);
  const thema = useRef('');
  const prüfer = useRef('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !name.current ||
      !matrikelnummer.current ||
      !studiengang.current ||
      !prüfungstermin.current ||
      !thema.current ||
      !prüfer.current
    ) {
      alert(
        t('pages.forms.bachelorAnmeldung.submitError') +
          ' (' +
          t(
            `pages.forms.bachelorAnmeldung.${(!name.current && 'name') || (!matrikelnummer.current && 'matrikelnummer') || (!studiengang.current && 'studiengang') || (!prüfungstermin.current && 'prüfungstermin') || (!thema.current && 'thema') || (!prüfer.current && 'prüfer')}Label`
          ) +
          ')'
      );
      return;
    }

    const bachelorAnmeldung: BachelorAnmeldung = {
      name: name.current,
      matrikelnummer: matrikelnummer.current,
      studiengang: studiengang.current,
      prüfungstermin: prüfungstermin.current!.format('DD-MM-YYYY'),
      thema: thema.current,
      prüfer: prüfer.current,
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
        mx: 'auto',
        my: 2,
        p: 2,
      }}
    >
      <FormControl>
        <Input
          onChange={(e) => (name.current = e.target.value)}
          required
          placeholder={t('pages.forms.bachelorAnmeldung.nameLabel')}
        />
      </FormControl>

      <FormControl>
        <Input
          onChange={(e) => (matrikelnummer.current = e.target.value)}
          required
          placeholder={t('pages.forms.bachelorAnmeldung.matrikelnummerLabel')}
        />
      </FormControl>

      <FormControl>
        <Select
          onChange={(_, newValue: string | null) =>
            (studiengang.current = newValue ?? '')
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
        <Input
          onChange={(e) => (thema.current = e.target.value)}
          required
          placeholder={t('pages.forms.bachelorAnmeldung.themaLabel')}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('pages.forms.bachelorAnmeldung.prüferLabel')}</FormLabel>
        <Input onChange={(e) => (prüfer.current = e.target.value)} required />
        <Select
          onChange={(_, newValue: string | null) =>
            (prüfer.current = newValue ?? '')
          }
          required
          placeholder={t('pages.forms.bachelorAnmeldung.prüferLabel')}
        >
          <>
            {mockedPruefer.map((p) => (
              <Option key={p} value={p}>
                {p}
              </Option>
            ))}
          </>
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
        onFile={console.log('Expose')} //TODO
        sx={{
          width: 'auto',
          alignSelf: 'flex-start',
          px: 3,
        }}
      ></FileUpload>

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
        {t('pages.forms.bachelorAnmeldung.submitButton')}
      </Button>
    </Box>
  );
}
