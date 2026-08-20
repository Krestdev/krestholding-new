export interface ContactEmail {
  id?: string | null;
  email: string;
}

export interface ContactPhone {
  id?: string | null;
  phone: string;
}

export interface ContactInfo {
  id: number;
  emails?: ContactEmail[] | null;
  phones?: ContactPhone[] | null;
  physicalAddress?: string | null;
  postalBox?: string | null;
  mapIframeUrl?: string | null;

  // Page contact — siège & réseaux
  legalName?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  openingHours?: string | null;
  directionsUrl?: string | null;

  // Page contact — identification légale
  rccmNumber?: string | null;
  taxpayerNumber?: string | null;
  legalNoticeUrl?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
