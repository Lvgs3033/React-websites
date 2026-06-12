
import { ArrowUpRightIcon } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-display">
      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-stock-purple text-white">
        <ArrowUpRightIcon className="w-5 h-5" />
      </div>
      <span className="text-xl font-semibold bg-gradient-to-br from-stock-purple to-primary bg-clip-text text-transparent">
        StockTracker
      </span>
    </div>
  );
}
