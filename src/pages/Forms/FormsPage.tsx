import * as React from 'react';
// import { Box, Button } from '@mui/joy';
import NachklausurAntrag from '../Nachklausur/NachklausurAntrag';
import BachelorAnmeldung from '../BachelorAnmeldung/BachelorAnmeldung';
import { useTranslation } from 'react-i18next';
import useApiForm from '@/hooks/useApiForm';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FormsPage() {
  const [index, setIndex] = React.useState<number | null>(null);
  const { t } = useTranslation();

const { createNachklausurAntrag, createBachelorAnmeldung, getStudienbescheinigung } = useApiForm();

React.useEffect(() => {
  // Effect logic here
  console.log("FormsPage mounted");
}, []);

  const onStudienbescheinigung = async (): Promise<void> => {
    const data = await getStudienbescheinigung();
    if(data){
      const url = URL.createObjectURL(data);
      window.open(url, '_blank', 'noopener,noreferrer');
    }else{
        alert(t('pages.forms.studienbescheinigung.error'));
    }
  }

  return (
    <Box
      sx={{
        mx: "auto",
        width: "70%",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column", // wichtig, sonst alle nebeneinander
        justifyContent: "center",
        py: 10,
        px: 10,
      }}
    >
      {/* Studienbescheinigung */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t("pages.forms.studienbescheinigung.accordion")}
        </AccordionSummary>
        <AccordionDetails>
          <Button
            sx={{ my: 2, mx: "auto", width: "200px" }}
            variant="contained"
            color="primary"
            onClick={onStudienbescheinigung}
          >
            {t("pages.forms.studienbescheinigung.buttonLabel")}
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Nachklausur */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t("pages.forms.nachklausur.accordion")}
        </AccordionSummary>
        <AccordionDetails>
          <NachklausurAntrag onApi={createNachklausurAntrag} />
        </AccordionDetails>
      </Accordion>

      {/* Bachelor Anmeldung */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t("pages.forms.bachelorAnmeldung.accordion")}
        </AccordionSummary>
        <AccordionDetails>
          <BachelorAnmeldung onApi={createBachelorAnmeldung} />
        </AccordionDetails>
      </Accordion>
    </Box>

  );

}