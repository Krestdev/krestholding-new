import api from "@/providers/axios";
import { DossierDocument } from "./type";

class DossierDocumentsQuery {
  upload = async (file: File, onProgress?: (percent: number) => void): Promise<DossierDocument> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/dossier-documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      },
    });

    return response.data.doc as DossierDocument;
  };

  delete = async (id: number): Promise<void> => {
    await api.delete(`/dossier-documents/${id}`);
  };
}

export const dossierDocumentsQuery = new DossierDocumentsQuery();
