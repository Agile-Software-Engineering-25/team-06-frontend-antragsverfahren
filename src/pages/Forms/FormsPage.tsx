import * as React from 'react';
import NachklausurAntrag from '../Nachklausur/NachklausurAntrag';
import BachelorAnmeldung from '../BachelorAnmeldung/BachelorAnmeldung';
import { useTranslation } from 'react-i18next';
import useApiForm from '@/hooks/useApiForm';
import { Box } from '@mui/joy';
import { Accordion, Card } from '@agile-software/shared-components';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function FormsPage() {
  const { t } = useTranslation();

  const {
    createNachklausurAntrag,
    createBachelorAnmeldung,
    getStudienbescheinigung,
  } = useApiForm();

  const onStudienbescheinigung = async (): Promise<void> => {
    const data = await getStudienbescheinigung();
    if (data) {
      const url = URL.createObjectURL(data);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert(t('pages.forms.studienbescheinigung.error'));
    }
  };

  const accordionItems = [
    {
      id: 'nachklausur',
      header: t('pages.forms.nachklausur.title'),
      children: <NachklausurAntrag onApi={createNachklausurAntrag} />,
    },
    {
      id: 'bachelor',
      header: t('pages.forms.bachelorAnmeldung.title'),
      children: <BachelorAnmeldung onApi={createBachelorAnmeldung} />,
    },
  ];

  return (
    <Box
      sx={{
        mx: 'auto',
        width: '70%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 10,
        px: 10,
        gap: 3,
      }}
    >
      <Card
        title={t('pages.forms.studienbescheinigung.title')}
        imageButton={{
          text: (
            <>
              <FileDownloadIcon sx={{ mr: 1 }} />
              {t('pages.forms.studienbescheinigung.buttonLabel')}
            </>
          ),
          onClick: onStudienbescheinigung,
          variant: 'solid',
          color: 'primary',
        }}
      />

      <Accordion
        items={accordionItems}
        multiple={false}
        accordionGroupSX={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
        accordionSX={{
          borderRadius: '10px',
          backgroundColor: '#f3f8ff',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
          '&:before': { display: 'none' },
        }}
        headerSX={{
          fontWeight: 'bold',
          color: '#00122B',
          userSelect: 'none',
          fontSize: '1.5rem',
        }}
      />
    </Box>
  );
}
