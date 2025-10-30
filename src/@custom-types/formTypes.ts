export interface NachklausurAntrag {
  modul: string;
  prüfungstermin: string;
}

export interface BachelorAnmeldung {
  thema: string;
  prüfer: string;
  prüfungstermin: string;
  expose: File;
}


export interface AlertMessage{
  isOn: boolean;
  variant: "success" | "info" | "warning" | "error";
  message: string;
}