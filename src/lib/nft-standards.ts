import { parseAbi, type Address } from "viem";

/**
 * Common NFT contract ABIs and standards
 */

// Standard ERC721 functions
export const ERC721_ABI = {
  full: parseAbi([
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function balanceOf(address owner) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function baseURI() view returns (string)",
    "function contractURI() view returns (string)",
  ]),
  
  // Individual functions for specific use cases
  tokenURI: parseAbi(["function tokenURI(uint256 tokenId) view returns (string)"]),
  name: parseAbi(["function name() view returns (string)"]),
  symbol: parseAbi(["function symbol() view returns (string)"]),
  ownerOf: parseAbi(["function ownerOf(uint256 tokenId) view returns (address)"]),
  baseURI: parseAbi(["function baseURI() view returns (string)"]),
  contractURI: parseAbi(["function contractURI() view returns (string)"]),
};

// Common price discovery functions across NFT contracts
export const PRICE_DISCOVERY_ABI = parseAbi([
  "function mintPrice() view returns (uint256)",
  "function price() view returns (uint256)",
  "function MINT_PRICE() view returns (uint256)",
  "function getMintPrice() view returns (uint256)",
  "function publicMintPrice() view returns (uint256)",
]);

// Common mint functions
export const MINT_ABI = parseAbi([
  "function mint(uint256 amount) payable",
  "function mint(address to, uint256 amount) payable",
  "function publicMint(uint256 amount) payable",
  "function mintTo(address to, uint256 amount) payable",
]);

// ERC1155 metadata function
export const ERC1155_ABI = {
  uri: parseAbi(["function uri(uint256 tokenId) view returns (string)"]),
};

// ERC20 ABI for token interactions
export const ERC20_ABI = parseAbi([
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",
]);

// Manifold contract detection ABI (kept separate as it's used on the main contract)
export const MANIFOLD_DETECTION_ABI = parseAbi([
  "function getExtensions() view returns (address[])",
]);

// Manifold ERC721 extension contract ABI (includes contractVersion and identical fields)
export const MANIFOLD_ERC721_EXTENSION_ABI = [
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    name: "tokenURI",
    outputs: [{ name: "uri", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "instanceId", type: "uint256" }
    ],
    name: "getClaim",
    outputs: [
      {
        components: [
          { name: "total", type: "uint32" },
          { name: "totalMax", type: "uint32" },
          { name: "walletMax", type: "uint32" },
          { name: "startDate", type: "uint48" },
          { name: "endDate", type: "uint48" },
          { name: "storageProtocol", type: "uint8" },
          { name: "identical", type: "uint8" },
          { name: "merkleRootEmpty", type: "bool" },
          { name: "merkleRoot", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "cost", type: "uint256" },
          { name: "paymentReceiver", type: "address" },
          { name: "erc20", type: "address" },
          { name: "signingAddress", type: "address" }
        ],
        name: "claim",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    name: "getClaimForToken",
    outputs: [
      { name: "instanceId", type: "uint256" },
      {
        components: [
          { name: "total", type: "uint32" },
          { name: "totalMax", type: "uint32" },
          { name: "walletMax", type: "uint32" },
          { name: "startDate", type: "uint48" },
          { name: "endDate", type: "uint48" },
          { name: "storageProtocol", type: "uint8" },
          { name: "identical", type: "uint8" },
          { name: "merkleRootEmpty", type: "bool" },
          { name: "merkleRoot", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "cost", type: "uint256" },
          { name: "paymentReceiver", type: "address" },
          { name: "erc20", type: "address" },
          { name: "signingAddress", type: "address" }
        ],
        name: "claim",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "instanceId", type: "uint256" },
      { name: "mintIndex", type: "uint32" },
      { name: "merkleProof", type: "bytes32[]" },
      { name: "mintFor", type: "address" }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "MINT_FEE",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MINT_FEE_MERKLE",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

// Manifold ERC1155 extension contract ABI (13 fields - no contractVersion or identical)
export const MANIFOLD_ERC1155_EXTENSION_ABI = [
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    name: "tokenURI",
    outputs: [{ name: "uri", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "instanceId", type: "uint256" }
    ],
    name: "getClaim",
    outputs: [
      {
        components: [
          { name: "total", type: "uint32" },
          { name: "totalMax", type: "uint32" },
          { name: "walletMax", type: "uint32" },
          { name: "startDate", type: "uint48" },
          { name: "endDate", type: "uint48" },
          { name: "storageProtocol", type: "uint8" },
          { name: "merkleRoot", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "tokenId", type: "uint256" },
          { name: "cost", type: "uint256" },
          { name: "paymentReceiver", type: "address" },
          { name: "erc20", type: "address" },
          { name: "signingAddress", type: "address" }
        ],
        name: "claim",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    name: "getClaimForToken",
    outputs: [
      { name: "instanceId", type: "uint256" },
      {
        components: [
          { name: "total", type: "uint32" },
          { name: "totalMax", type: "uint32" },
          { name: "walletMax", type: "uint32" },
          { name: "startDate", type: "uint48" },
          { name: "endDate", type: "uint48" },
          { name: "storageProtocol", type: "uint8" },
          { name: "merkleRoot", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "tokenId", type: "uint256" },
          { name: "cost", type: "uint256" },
          { name: "paymentReceiver", type: "address" },
          { name: "erc20", type: "address" },
          { name: "signingAddress", type: "address" }
        ],
        name: "claim",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "creatorContractAddress", type: "address" },
      { name: "instanceId", type: "uint256" },
      { name: "mintIndex", type: "uint32" },
      { name: "merkleProof", type: "bytes32[]" },
      { name: "mintFor", type: "address" }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "MINT_FEE",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MINT_FEE_MERKLE",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

// Backward compatibility - defaults to ERC721 version
export const MANIFOLD_EXTENSION_ABI = MANIFOLD_ERC721_EXTENSION_ABI;

// ERC165 interface detection
export const ERC165_ABI = parseAbi([
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
]);

// Known contract addresses
export const KNOWN_CONTRACTS = {
  // Manifold extension contracts
  manifoldExtension: "0x26BBEA7803DcAc346D5F5f135b57Cf2c752A02bE" as Address,
  
  // Add other known contracts here as needed
} as const;

// thirdweb OpenEditionERC721 ABI
export const THIRDWEB_OPENEDITONERC721_ABI = [
  {
    inputs: [
      { name: "_receiver", type: "address" },
      { name: "_quantity", type: "uint256" },
      { name: "_currency", type: "address" },
      { name: "_pricePerToken", type: "uint256" },
      {
        components: [
          { name: "proof", type: "bytes32[]" },
          { name: "quantityLimitPerWallet", type: "uint256" },
          { name: "pricePerToken", type: "uint256" },
          { name: "currency", type: "address" }
        ],
        name: "_allowlistProof",
        type: "tuple"
      },
      { name: "_data", type: "bytes" }
    ],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "claimCondition",
    outputs: [
      { name: "currentStartId", type: "uint256" },
      { name: "count", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_conditionId", type: "uint256" }],
    name: "getClaimConditionById",
    outputs: [
      {
        components: [
          { name: "startTimestamp", type: "uint256" },
          { name: "maxClaimableSupply", type: "uint256" },
          { name: "supplyClaimed", type: "uint256" },
          { name: "quantityLimitPerWallet", type: "uint256" },
          { name: "merkleRoot", type: "bytes32" },
          { name: "pricePerToken", type: "uint256" },
          { name: "currency", type: "address" },
          { name: "metadata", type: "string" }
        ],
        name: "condition",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "sharedMetadata",
    outputs: [
      { name: "name", type: "string" },
      { name: "description", type: "string" },
      { name: "image", type: "string" },
      { name: "animationUrl", type: "string" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;

// Native ETH address for thirdweb contracts
export const THIRDWEB_NATIVE_TOKEN = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Address;

// Interface IDs for contract detection
export const INTERFACE_IDS = {
  ERC165: "0x01ffc9a7",
  ERC721: "0x80ac58cd",
  ERC1155: "0xd9b67a26",
  ERC721Metadata: "0x5b5e139f",
} as const;

// IPFS Gateway configuration
export const IPFS_GATEWAYS = {
  default: "https://ipfs.io/ipfs/",
  cloudflare: "https://cloudflare-ipfs.com/ipfs/",
  pinata: "https://gateway.pinata.cloud/ipfs/",
} as const;

/**
 * Convert IPFS URL to HTTP gateway URL
 */
export function ipfsToHttp(url: string, gateway?: keyof typeof IPFS_GATEWAYS): string {
  const selectedGateway = gateway || "default";
  if (!url || !url.startsWith("ipfs://")) {
    return url;
  }
  
  return url.replace("ipfs://", IPFS_GATEWAYS[selectedGateway]);
}

/**
 * Check if a contract is likely an NFT contract by checking interface support
 */
export async function isNFTContract(
  client: any,
  contractAddress: Address
): Promise<{ isNFT: boolean; type?: "'ERC721'" | "'ERC1155'" }> {
  try {
    // Try ERC165 supportsInterface
    const [supportsERC721, supportsERC1155] = await Promise.all([
      client.readContract({
        address: contractAddress,
        abi: ERC165_ABI,
        functionName: "'supportsInterface'",
        args: [INTERFACE_IDS.ERC721],
      }).catch(() => false),
      client.readContract({
        address: contractAddress,
        abi: ERC165_ABI,
        functionName: "'supportsInterface'",
        args: [INTERFACE_IDS.ERC1155],
      }).catch(() => false),
    ]);
    
    if (supportsERC721) return { isNFT: true, type: "'ERC721'" };
    if (supportsERC1155) return { isNFT: true, type: "'ERC1155'" };
    
    // Fallback: try to call name() function
    const name = await client.readContract({
      address: contractAddress,
      abi: ERC721_ABI.name,
      functionName: "'name'",
    }).catch(() => null);
    
    return { isNFT: !!name };
  } catch {
    return { isNFT: false };
  }
}