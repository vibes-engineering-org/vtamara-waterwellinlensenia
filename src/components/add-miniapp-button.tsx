import { Button } from "~/components/ui/button";
import { CircleCheckBig, Save } from "lucide-react";
import { useMiniAppSdk } from "~/hooks/use-miniapp-sdk";

type AddMiniAppButtonProps = {
  text?: string;
  textDone?: string;
  variant?: "destructive" | "secondary" | "ghost" | "default";
  className?: string;
};

export function AddMiniappButton({
  text = "Add Mini App",
  textDone = "Saved",
  variant = "default",
  className,
}: AddMiniAppButtonProps) {
  const { sdk, isMiniAppSaved } = useMiniAppSdk();

  const onAddMiniApp = () => {
    sdk.actions.addMiniApp();
  };

  return (
    <Button
      variant={variant}
      onClick={(e) => onAddMiniApp()}
      size="default"
      className={`${className || ""}`}
      disabled={isMiniAppSaved}
    >
      {isMiniAppSaved ? (
        <CircleCheckBig className="h-4 w-4 md:h-5 md:w-5" />
      ) : (
        <Save className="h-4 w-4 md:h-5 md:w-5" />
      )}
      {isMiniAppSaved ? textDone : text}
    </Button>
  );
}
