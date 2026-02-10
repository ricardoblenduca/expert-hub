import type { PrecosMatriz } from "@/types";

export const precosMatriz: PrecosMatriz = {
  starter: {
    completo: { entrada: 1500, mensal: 1500 },
    consultoria: { entrada: 0, mensal: 1000 },
    comunidade: { entrada: 0, mensal: 500 },
  },

  professional: {
    completo: { entrada: 3000, mensal: 3000 },
    consultoria: { entrada: 0, mensal: 2000 },
    comunidade: { entrada: 0, mensal: 750 },
  },

  business: {
    completo: { entrada: 4500, mensal: 4500 },
    consultoria: { entrada: 0, mensal: 2500 },
    comunidade: { entrada: 0, mensal: 1000 },
  },

  scale: {
    completo: { entrada: 7500, mensal: 7500 },
    consultoria: { entrada: 0, mensal: 4000 },
    comunidade: { entrada: 0, mensal: 1500 },
  },
};
