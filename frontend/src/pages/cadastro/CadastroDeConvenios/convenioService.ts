import api from "../../../components/axios/axiosInstance";
import { ConvenioGridItem } from "./ConvenioGrid/ConvenioGrid";

export const fetchConvenios = async (filtros?: Record<string, string>) => {
  console.log('Fetching convenios with filtros:', filtros);
  const { data } = await api.get('/convenios', { params: filtros });
  console.log('Fetched convenios:', data);
  return data;
};

export const fetchConvenioById = async (id: string) => {
  console.log(`Fetching convenio by id: ${id}`);
  const { data } = await api.get(`/convenios/${id}`);
  console.log('Fetched convenio:', data);
  return data;
};

export const saveConvenio = async (convenio: Partial<ConvenioGridItem>) => {
  if (convenio.id) {
    console.log(`Updating convenio with id: ${convenio.id}`, convenio);
    const response = await api.put(`/convenios/${convenio.id}`, convenio);
    console.log('Updated convenio response:', response.data);
    return response;
  } else {
    console.log('Creating new convenio:', convenio);
    const response = await api.post('/convenios', convenio);
    console.log('Created convenio response:', response.data);
    return response;
  }
};

export const deleteConvenio = async (id: string) => {
  console.log(`Deleting convenio with id: ${id}`);
  const response = await api.delete(`/convenios/${id}`);
  console.log('Deleted convenio response:', response.data);
  return response;
};
