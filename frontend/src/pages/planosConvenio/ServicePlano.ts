import api from "../../components/axios/axiosInstance";
import { Plano } from "../../types/planos";

export const fetchPlanos = async (convenioId?: string, filtros?: Record<string, string>) => {
  const params = { ...filtros, convenioId };
  const { data } = await api.get('/planos', { params });

  console.log("Resposta do fetchPlanos:", data);

  // Se a API vier com objeto { data: [...] }, ajusta
  if (Array.isArray(data)) {
    return data as Plano[];
  }
  if (Array.isArray(data?.data)) {
    return data.data as Plano[];
  }
  return []; // fallback seguro
};

export const fetchPlanoById = async (id: string) => {
  console.log("[fetchPlanoById] Buscando plano por ID:", id);
  const { data } = await api.get(`/planos/${id}`);
  console.log("[fetchPlanoById] Dados recebidos:", data);
  return data as Plano;
};

export const savePlano = async (plano: Partial<Plano>) => {
  console.log("[savePlano] Salvando plano:", plano);
  if (plano.id) {
    const { data } = await api.patch(`/planos/${plano.id}`, plano);
    console.log("[savePlano] Plano atualizado com sucesso:", data);
    return data as Plano;
  } else {
    const { data } = await api.post('/planos', plano);
    console.log("[savePlano] Plano criado com sucesso:", data);
    return data as Plano;
  }
};

export const deletePlano = async (id: string) => {
  console.log("[deletePlano] Excluindo plano ID:", id);
  await api.delete(`/planos/${id}`);
  console.log("[deletePlano] Plano excluído com sucesso");
};
