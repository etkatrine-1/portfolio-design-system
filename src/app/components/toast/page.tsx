"use client";

import { useState } from "react";
import { Toast } from "@/components/Toast";
import { Button } from "@/components/Button";
import { ComponentPreview } from "@/components/ComponentPreview";
import { CodeBlock } from "@/components/CodeBlock";

export default function ToastPage() {
  const [activeToast, setActiveToast] = useState<string | null>(null);

  return (
    <>
      <div className="mb-12">
        <p className="text-xs font-body font-medium tracking-widest uppercase text-acid mb-3">
          STATUS
        </p>
        <h1 className="font-display font-bold text-4xl tracking-tight text-ink-primary mb-4">
          Toast
        </h1>
        <p className="text-ink-secondary max-w-content leading-relaxed">
          Ephemeral notification messages anchored to the bottom-right. GSAP
          slide-in animation with auto-dismiss. Four status variants matching
          Alert.
        </p>
      </div>

      <ComponentPreview label="Info (default)">
        <Button
          variant="ghost"
          onClick={() => setActiveToast("info")}
        >
          Show info toast
        </Button>
      </ComponentPreview>

      {activeToast === "info" && (
        <Toast onDismiss={() => setActiveToast(null)}>
          Your review has been saved as a draft.
        </Toast>
      )}

      <CodeBlock
        code={`<Toast onDismiss={() => setVisible(false)}>
  Your review has been saved as a draft.
</Toast>`}
      />

      <ComponentPreview label="Success">
        <Button
          variant="ghost"
          onClick={() => setActiveToast("success")}
        >
          Show success toast
        </Button>
      </ComponentPreview>

      {activeToast === "success" && (
        <Toast
          status="success"
          onDismiss={() => setActiveToast(null)}
        >
          Review submitted successfully!
        </Toast>
      )}

      <CodeBlock
        code={`<Toast status="success" onDismiss={() => setVisible(false)}>
  Review submitted successfully!
</Toast>`}
      />

      <ComponentPreview label="Warning">
        <Button
          variant="ghost"
          onClick={() => setActiveToast("warning")}
        >
          Show warning toast
        </Button>
      </ComponentPreview>

      {activeToast === "warning" && (
        <Toast
          status="warning"
          onDismiss={() => setActiveToast(null)}
        >
          Image quality is low — this may affect the review accuracy.
        </Toast>
      )}

      <CodeBlock code={`<Toast status="warning">...</Toast>`} />

      <ComponentPreview label="Error">
        <Button
          variant="ghost"
          onClick={() => setActiveToast("error")}
        >
          Show error toast
        </Button>
      </ComponentPreview>

      {activeToast === "error" && (
        <Toast
          status="error"
          onDismiss={() => setActiveToast(null)}
        >
          Upload failed. Please check your file and try again.
        </Toast>
      )}

      <CodeBlock code={`<Toast status="error">...</Toast>`} />

      <ComponentPreview label="Custom auto-dismiss (10s)">
        <Button
          variant="ghost"
          onClick={() => setActiveToast("custom")}
        >
          Show long-lived toast
        </Button>
      </ComponentPreview>

      {activeToast === "custom" && (
        <Toast
          status="info"
          autoDismiss={10000}
          onDismiss={() => setActiveToast(null)}
        >
          This toast will stay for 10 seconds.
        </Toast>
      )}

      <CodeBlock
        code={`<Toast autoDismiss={10000} onDismiss={() => setVisible(false)}>
  This toast will stay for 10 seconds.
</Toast>`}
      />
    </>
  );
}
