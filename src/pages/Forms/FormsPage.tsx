import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Box, Button } from '@mui/joy';
import NachklausurAntrag from '../Nachklausur/NachklausurAntrag';
import BachelorAnmeldung from '../BachelorAnmeldung/BachelorAnmeldung';
import { useTranslation } from 'react-i18next';

export default function FormsPage() {
  const [index, setIndex] = React.useState<number | null>(2);
  const { t } = useTranslation();

  const onStudienbescheinigung = (): undefined => {
    console.log("HOLA")
  }

  return (
    <Box sx={{ mx: 'auto', width: '70%', maxWidth: '1200px', display: 'flex', justifyContent: 'center', py: 10, px: 10 }}>

        <AccordionGroup>

            <Accordion expanded={index === 0} onChange={(_, val) => setIndex(val ? 0 : null)}>
                <AccordionSummary sx={{my: 1, p: 2, fontWeight: "bold"}}>{t('pages.forms.studienbescheinigung.accordion')}</AccordionSummary>
                <AccordionDetails>
                    <Button sx={{my: 2, mx: 'auto', width: '200px'}} variant="solid" color="primary" onClick={onStudienbescheinigung()}>{t('pages.forms.studienbescheinigung.buttonLabel')}</Button>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={index === 1} onChange={(_, val) => setIndex(val ? 1 : null)}>
                <AccordionSummary sx={{my: 1, p: 2, fontWeight: "bold"}}>{t('pages.forms.nachklausur.accordion')}</AccordionSummary>
                <AccordionDetails>
                    <NachklausurAntrag />
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={index === 2} onChange={(_, val) => setIndex(val ? 2 : null)}>
                <AccordionSummary sx={{my: 1, p: 2, fontWeight: "bold"}}>{t('pages.forms.bachelorAnmeldung.accordion')}</AccordionSummary>
                <AccordionDetails>
                    <BachelorAnmeldung />
                </AccordionDetails>
            </Accordion>

        </AccordionGroup>
    </Box>

  );

}