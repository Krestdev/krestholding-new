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
  createdAt?: string | null;
  updatedAt?: string | null;
}
