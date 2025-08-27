"use client";

import { useProfile } from "~/hooks/use-profile";
import { UserAvatar } from "~/components/avatar";
import { cn } from "~/lib/utils";

type UserContextProps = {
  showAvatar?: boolean;
  showUsername?: boolean;
  showDisplayName?: boolean;
  showFid?: boolean;
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
  avatarShape?: "circle" | "square" | "rounded";
  layout?: "horizontal" | "vertical";
  className?: string;
  textClassName?: string;
  usernamePrefix?: string;
  fidPrefix?: string;
  onClick?: () => void;
  clickable?: boolean;
  avatarClickable?: boolean;
};

export function UserContext({
  showAvatar = true,
  showUsername = true,
  showDisplayName = true,
  showFid = false,
  avatarSize = "md",
  avatarShape = "circle",
  layout = "horizontal",
  className = "",
  textClassName = "",
  usernamePrefix = "@",
  fidPrefix = "FID:",
  onClick,
  clickable = false,
  avatarClickable = false,
}: UserContextProps) {
  const profile = useProfile();

  const containerClasses = cn(
    "flex items-center gap-2",
    layout === "vertical" ? "flex-col" : "flex-row",
    onClick || (clickable && profile.fid) ? "cursor-pointer" : "",
    className,
  );

  const textContainerClasses = cn(
    "flex",
    layout === "vertical" ? "flex-col items-center" : "flex-col justify-center",
    textClassName,
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (clickable && profile.fid) {
      profile.viewProfile(profile.fid);
    }
  };

  return (
    <div
      className={containerClasses}
      onClick={onClick || clickable ? handleClick : undefined}
    >
      {showAvatar && (
        <UserAvatar
          useProfileData={true}
          size={avatarSize}
          shape={avatarShape}
          clickable={avatarClickable}
          onClickOverride={avatarClickable && onClick ? onClick : undefined}
        />
      )}

      <div className={textContainerClasses}>
        {showDisplayName && profile.displayName && (
          <span className="font-medium text-neutral-950 dark:text-neutral-50">
            {profile.displayName}
          </span>
        )}

        {showUsername && profile.username && (
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {usernamePrefix}
            {profile.username}
          </span>
        )}

        {showFid && profile.fid && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {fidPrefix}
            {profile.fid}
          </span>
        )}

        {!profile.displayName && !profile.username && !profile.fid && (
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            User not connected
          </span>
        )}
      </div>
    </div>
  );
}
