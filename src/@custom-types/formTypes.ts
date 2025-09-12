export interface NachklausurAntrag {
  name: string;
  matrikelnummer: string;
  modul: string;
  prüfungstermin: string;
}

export interface BachelorAnmeldung {
  name: string;
  matrikelnummer: string;
  studiengang: string;
  thema: string;
  prüfer: string;
  prüfungstermin: string;
}