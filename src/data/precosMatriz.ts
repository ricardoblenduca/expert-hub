import type { PrecosMatriz } from "@/types";

export const precosMatriz: PrecosMatriz = {
  starter: {
    expert: { entrada: 1500, mensal: 1500 },
    exper: { entrada: 0, mensal: 1000 },
    xper: { entrada: 0, mensal: 500 },
  },

  professional: {
    expert: { entrada: 3000, mensal: 3000 },
    exper: { entrada: 0, mensal: 2000 },
    xper: { entrada: 0, mensal: 750 },
  },

  business: {
    expert: { entrada: 4500, mensal: 4500 },
    exper: { entrada: 0, mensal: 2500 },
    xper: { entrada: 0, mensal: 1500 },
  },

  scale: {
    expert: { entrada: 7500, mensal: 7500 },
    exper: { entrada: 0, mensal: 5000 },
    xper: { entrada: 0, mensal: 2000 },
  },
};
