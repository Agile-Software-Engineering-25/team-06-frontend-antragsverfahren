export interface NachklausurAntrag {
  modul: string;
  prüfungstermin: string;
}

export interface BachelorAnmeldung {
  studiengang: string;
  thema: string;
  prüfer: string;
  prüfungstermin: string;
}


export interface AlertMessage{
  isOn: boolean;
  variant: "success" | "info" | "warning" | "error";
  message: string;
}