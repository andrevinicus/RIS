import api from "../../../components/axios/axiosInstance";
import { ConvenioGridItem } from "./ConvenioGrid/ConvenioGrid";

export const fetchConvenios = async (filtros?: Record<string, string>) => {
  console.log('[ConvenioService] Fetching convenios with filtros:', filtros);
  try {
    const { data } = await api.get('/convenios', { params: filtros });
    console.log('[ConvenioService] Fetched convenios:', data);
    return data;
  } catch (error) {
    console.error('[ConvenioService] Error fetching convenios:', error);
    throw error;
  }
};

export const fetchConvenioById = async (id: string) => {
  console.log(`[ConvenioService] Fetching convenio by id: ${id}`);
  try {
    const { data } = await api.get(`/convenios/${id}`);
    console.log('[ConvenioService] Fetched convenio:', data);
    return data;
  } catch (error) {
    console.error(`[ConvenioService] Error fetching convenio by id ${id}:`, error);
    throw error;
  }
};

export const saveConvenio = async (convenio: Partial<ConvenioGridItem>) => {
  try {
    if (convenio.id) {
      console.log(`[ConvenioService] Updating convenio with id: ${convenio.id}`, convenio);
      const response = await api.put(`/convenios/${convenio.id}`, convenio);
      console.log('[ConvenioService] Updated convenio response:', response.data);
      return response.data;
    } else {
      console.log('[ConvenioService] Creating new convenio:', convenio);
      const response = await api.post('/convenios', convenio);
      console.log('[ConvenioService] Created convenio response:', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('[ConvenioService] Error saving convenio:', error);
    throw error;
  }
};

export const deleteConvenio = async (id: string) => {
  console.log(`[ConvenioService] Deleting convenio with id: ${id}`);
  try {
    const response = await api.delete(`/convenios/${id}`);
    console.log('[ConvenioService] Deleted convenio response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`[ConvenioService] Error deleting convenio with id ${id}:`, error);
    throw error;
  }
};
