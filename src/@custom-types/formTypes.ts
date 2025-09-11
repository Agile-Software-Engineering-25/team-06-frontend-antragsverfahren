export interface NachklausurAntrag {
  name: string;
  matrikelnummer: string;
  modul: string;
  prüfungstermin: string;
}

export interface BachelorAnmeldung {
  name: string;
  matrikelnummer: string;
  modul: string;
  thema: string;
  firstExaminer: string;
  secondExaminer: string;
  prüfungstermin: string;
}