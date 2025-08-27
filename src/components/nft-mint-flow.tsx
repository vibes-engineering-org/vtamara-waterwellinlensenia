"use client";

/**
 * @shadcn-registry
 * 
 * IMPORTANT: This file is part of the shadcn registry.
 * Always use double quotes (") instead of single quotes (') to prevent
 * transformation issues during component installation.
 * 
 * See: /CLAUDE.md#shadcn-cli-transformation-issues
 */

import * as React from "react";
import { NFTCard } from "~/components/nft-card";
import { NFTMintButton } from "~/components/nft-mint-button";

interface NFTMintPageProps {
  /**
   * The NFT contract address to mint from
   * @example "0x32dd0a7190b5bba94549a0d04659a9258f5b1387"
   */
  contractAddress: `0x${string}`;
  
  /**
   * The token ID to display in the NFTCard preview
   * @example "1" or "42"
   */
  tokenId: string;
  
  /**
   * Network name (e.g., "base", "ethereum", "arbitrum")
   * Used for both NFTCard display and NFTMintButton chain resolution
   * @default "ethereum"
   */
  network?: string;
  
  /**
   * Parameters specific to Manifold NFTs
   * Required when minting Manifold contracts (auto-detected)
   * 
   * @example { instanceId: "4293509360" } for claim-based mints
   * @example { tokenId: "2" } for specific edition mints
   */
  manifoldParams?: {
    /** Manifold claim instance ID (found in claim page URL) */
    instanceId?: string;
    /** Specific token ID for Manifold editions */
    tokenId?: string;
  };
  
  /**
   * Custom text for the mint button
   * @default "Mint NFT"
   */
  buttonText?: string;
}

/**
 * NFT Mint Page - Complete NFT display and minting experience
 * 
 * This component combines NFTCard for preview and NFTMintButton for minting
 * in a properly aligned vertical layout. The minting provider (Manifold, OpenSea, etc.)
 * is automatically detected from the contract.
 * 
 * @example
 * ```tsx
 * // Basic usage - auto-detects provider
 * <NFTMintFlow
 *   contractAddress="0x5b97886E4e1fC0F7d19146DEC03C917994b3c3a4"
 *   tokenId="1"
 *   network="ethereum"
 * />
 * 
 * // Manifold NFT - just provide the required params
 * <NFTMintFlow
 *   contractAddress="0x32dd0a7190b5bba94549a0d04659a9258f5b1387"
 *   tokenId="2"
 *   network="base"
 *   manifoldParams={{
 *     instanceId: "4293509360"
 *   }}
 * />
 * ```
 */
export function NFTMintFlow({
  contractAddress,
  tokenId,
  network = "ethereum",
  manifoldParams,
  buttonText = "Mint NFT",
}: NFTMintPageProps) {
  const [containerWidth, setContainerWidth] = React.useState(350);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(Math.min(width, 350));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div ref={containerRef} className="space-y-4 w-full max-w-[350px]">
      <NFTCard 
        contractAddress={contractAddress}
        tokenId={tokenId}
        network={network}
        size={containerWidth}
        displayOptions={{
          showTitle: true,
          showNetwork: true,
          rounded: "xl",
          shadow: true,
        }}
      />
      
      <NFTMintButton
        contractAddress={contractAddress}
        network={network}
        manifoldParams={manifoldParams}
        buttonText={buttonText}
        variant="default"
        size="lg"
        className="w-full"
      />
    </div>
  );
}