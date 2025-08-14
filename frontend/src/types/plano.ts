export interface Plano {
  id: string;
  codigo: string;
  nome: string;
  convenioId: string;
  convenioNome: string;
  valor: number;
  status: 'ativo' | 'inativo';
  createdAt: Date;
}
