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
        width: { xs: '100%', sm: '90%', md: '70%' },
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 10 },
        gap: 3,
      }}
    >
      <Card
        title={t('pages.forms.studienbescheinigung.title')}
        titleSX={{
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
        }}
        imageButton={{
          text: (
            <>
              <FileDownloadIcon
                sx={{
                  fontSize: { xs: 16, sm: 20, md: 24 },
                }}
              />
              {t('pages.forms.studienbescheinigung.buttonLabel')}
            </>
          ),
          onClick: onStudienbescheinigung,
          variant: 'solid',
          color: 'primary',
          sx: {
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 1 },
          },
        }}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          p: { xs: 2, sm: 3, md: 4 },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1, sm: 2 },
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
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 1, sm: 2, md: 3 },
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
            transform: { xs: 'none', md: 'translateY(-2px)' },
          },
          '&:before': { display: 'none' },
        }}
        headerSX={{
          fontWeight: 'bold',
          color: '#00122B',
          userSelect: 'none',
          fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
        }}
      />
    </Box>
  );
}
