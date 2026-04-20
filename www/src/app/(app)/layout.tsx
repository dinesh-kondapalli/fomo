import type { ReactNode } from "react";

import { MobileShell } from "@/components/app-shell";
import { TabShell } from "@/components/tab-shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <MobileShell withFrame>
      <TabShell>{children}</TabShell>
    </MobileShell>
  );
}
