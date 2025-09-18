import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { walletConnect ,injected } from "wagmi/connectors";


const projectId = "c103ef739c0b7fae864f5c3d70a89e3e";

export const config = createConfig({
    chains: [sepolia],

    connectors: [
        injected(),
        walletConnect({projectId}),
    ],

    transports: {
        [sepolia.id]: http(),
    },
});