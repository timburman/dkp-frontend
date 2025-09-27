import { createAppKit } from "@reown/appkit/react";
import { sepolia } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient} from "@tanstack/react-query";

const projectId = "c103ef739c0b7fae864f5c3d70a89e3e";
console.log(projectId);

const wagmiAdapter = new WagmiAdapter({
    networks: [sepolia],
    projectId,
});

createAppKit({
    adapters: [wagmiAdapter],
    networks: [sepolia],
    projectId,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
export const queryClient = new QueryClient();