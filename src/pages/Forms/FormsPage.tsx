import NachklausurAntrag from '../Nachklausur/NachklausurAntrag';
import BachelorAnmeldung from '../BachelorAnmeldung/BachelorAnmeldung';
import { useTranslation } from 'react-i18next';
import useApiForm from '@/hooks/useApiForm';
import { Box } from '@mui/joy';
import { Accordion } from '@agile-software/shared-components';
import StudienbescheinigungCard from '@components/Studienbescheinigung/StudienbescheinigungComponent.tsx';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { AlertMessage } from '@/@custom-types/formTypes';
import { Alert, Snackbar } from '@mui/material';

const fallbackDozNames = [
  'Prof. Fabian Volk',
  'Dr. Johann Daubert',
  'Dr. Dr. Edgar Hutter',
  'Prof. Dek. Viktor Scheidemann',
];


export default function FormsPage() {
  const [dozNames, setDozNames] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<undefined | AlertMessage>(
    undefined
  );

  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const accordionParam = searchParams.get('accordion');

  const { createNachklausurAntrag, createBachelorAnmeldung, getDozentNames } = useApiForm();

  const handleAccordionChange = (id: string, expanded: boolean) => {
    if (expanded) {
      setSearchParams({ accordion: id }); // setzt z. B. ?accordion=nachklausur
    } else {
      setSearchParams({}); // entfernt ?accordion komplett
    }
  };

  const accordionItems = [
    {
      id: 'nachklausur',
      header: t('pages.forms.nachklausur.title'),
      children: (
        <NachklausurAntrag
          onApi={createNachklausurAntrag}
          onAlert={setAlertMessage}
        />
      ),
      expand: accordionParam === 'nachklausur',
      onChange: (expanded: boolean) =>
        handleAccordionChange('nachklausur', expanded),
    },
    {
      id: 'bachelor',
      header: t('pages.forms.bachelorAnmeldung.title'),
      children: (
        <BachelorAnmeldung
          dozNames={dozNames}
          onApi={createBachelorAnmeldung}
          onAlert={setAlertMessage}
        />
      ),
      expand: accordionParam === 'bachelor',
      onChange: (expanded: boolean) =>
        handleAccordionChange('bachelor', expanded),
    },
  ];


  useEffect(() => {
    let isMounted = true;

    const fetchDozNames = async () => {
      try {
        const data = await getDozentNames();
        if (isMounted) setDozNames(Array.isArray(data) ? data : fallbackDozNames);
      } catch {
        if (isMounted) setDozNames(fallbackDozNames);
      }
    };

    if(!dozNames || dozNames.length == 0) fetchDozNames();

    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <Box>
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
        <StudienbescheinigungCard />

        <Accordion
          items={accordionItems}
          multiple={false}
          accordionGroupSX={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            boxShadow: '0',
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

      {alertMessage && (
        <Snackbar
          open={alertMessage.isOn}
          autoHideDuration={2000}
          onClose={() => setAlertMessage(undefined)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert severity={alertMessage.variant as any} variant="filled" sx={{paddingTop: "12px" }}>
            {alertMessage.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
