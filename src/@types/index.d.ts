// src/@types/index.d.ts
export interface User {
    id: number;
    username: string; // Adicione esta propriedade se não estiver presente
  }
  
  export interface Imovel {
    id: number;
    titulo: string;
    descricao: string;
    valor: number;
    latitude: number;
    longitude: number;
    imagens: { url: string }[]; 
  }

  
  