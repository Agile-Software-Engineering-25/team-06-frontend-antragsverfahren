import * as React from 'react';
import { Box, Button } from '@mui/joy';
import { Card } from '@agile-software/shared-components';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTranslation } from 'react-i18next';
import useApiForm from '@/hooks/useApiForm';
import { useMediaQuery } from '@mui/material';

export default function StudienbescheinigungCard() {
  const { t } = useTranslation();
  const { getStudienbescheinigung } = useApiForm();
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // xs breakpoint

  const onDownload = async (): Promise<void> => {
    const data = await getStudienbescheinigung();
    if (data) {
      const url = URL.createObjectURL(data);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert(t('pages.forms.studienbescheinigung.error'));
    }
  };

  const downloadButton = (
    <>
      <FileDownloadIcon
        sx={{
          mr: { xs: 0.5, sm: 1 },
          fontSize: { xs: 16, sm: 20, md: 24 },
        }}
      />
      {t('pages.forms.studienbescheinigung.buttonLabel')}
    </>
  );

  // ---------- MOBILE CARD ----------
  if (isSmallScreen) {
    return (
      <Card
        title={t('pages.forms.studienbescheinigung.title')}
        subtitle={
          <Box
            sx={{
              mt: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              startDecorator={<FileDownloadIcon />}
              onClick={onDownload}
              variant="solid"
              color="primary"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                width: '50%',
                justifyContent: 'center',
              }}
            >
              {t('pages.forms.studienbescheinigung.buttonLabel')}
            </Button>
          </Box>
        }
        titleSX={{
          fontSize: '1rem',
          fontWeight: 600,
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          p: 2,
          gap: 1,
          alignItems: 'flex-start',
        }}
      />
    );
  }

  // ---------- DESKTOP/TABLET CARD ----------
  return (
    <Card
      title={t('pages.forms.studienbescheinigung.title')}
      titleSX={{
        fontSize: { sm: '1.2rem', md: '1.5rem' },
        fontWeight: 600,
      }}
      imageButton={{
        text: downloadButton,
        onClick: onDownload,
        variant: 'solid',
        color: 'primary',
        sx: {
          fontSize: { sm: '0.875rem', md: '1rem' },
          px: { sm: 2, md: 3 },
          py: { sm: 1, md: 1.2 },
        },
      }}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        p: { sm: 3, md: 4 },
        gap: 2,
      }}
    />
  );
}
