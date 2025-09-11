import * as React from 'react';
import NachklausurAntrag from '../Nachklausur/NachklausurAntrag';
import BachelorAnmeldung from '../BachelorAnmeldung/BachelorAnmeldung';
import { useTranslation } from 'react-i18next';
import useApiForm from '@/hooks/useApiForm';
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Box, Button } from '@mui/joy';
import { useSearchParams } from 'react-router';

export default function FormsPage() {
  const [params, setParams] = useSearchParams();
  const nachklausurRef = React.useRef<HTMLDivElement | null>(null);
  const bachelorRef = React.useRef<HTMLDivElement | null>(null);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const { t } = useTranslation();

  const { createNachklausurAntrag, createBachelorAnmeldung, getStudienbescheinigung } = useApiForm();

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onStudienbescheinigung = async (): Promise<void> => {
    const data = await getStudienbescheinigung();
    if(data){
      const url = URL.createObjectURL(data);
      window.open(url, '_blank', 'noopener,noreferrer');
    }else{
        alert(t('pages.forms.studienbescheinigung.error'));
    }
  }

  React.useEffect(() => {
    const tab = params.get("tab");
    if (tab === "1") {
      setExpanded("Nachklausur");
      nachklausurRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (tab === "2") {
      setExpanded("Bachelor");
      bachelorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setExpanded(false);
      setParams({});
    }
  }, [params]);

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
      <Accordion expanded>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "95%", p: 2}}>
          <Typography level="title-sm">{t("pages.forms.studienbescheinigung.accordion")}</Typography>
          <Button sx={{  px: 3 }} variant="solid" color="primary" onClick={onStudienbescheinigung}>{t("pages.forms.studienbescheinigung.buttonLabel")}</Button>
        </Box>
      </Accordion>

      {/* Nachklausur */}
      <Accordion ref={nachklausurRef} expanded={expanded === 'Nachklausur'} onChange={handleChange('Nachklausur')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t("pages.forms.nachklausur.accordion")}
        </AccordionSummary>
        <AccordionDetails>
          <NachklausurAntrag onApi={createNachklausurAntrag}/>
        </AccordionDetails>
      </Accordion>

      {/* Bachelor Anmeldung */}
      <Accordion ref={bachelorRef} expanded={expanded === 'Bachelor'} onChange={handleChange('Bachelor')}>
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