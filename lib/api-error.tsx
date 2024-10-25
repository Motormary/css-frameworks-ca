import { ErrorMessage } from "@/src/actions/auth/types"
import { toast } from "sonner"

export function translateErrors(errors: ErrorMessage[]) {
  const translatedErrors = errors.map(
    (error: ErrorMessage & { code?: string; path?: string[] }) => {
      return {
        code: error?.code ?? undefined, // e.g "invalid type"
        message: error.message, // e.g "required"
        path: error?.path
          ? error?.path.map((path) => path).join(", ")
          : undefined, // Property
      }
    }
  )

  return translatedErrors
}

export function printErrors(error: ErrorMessage, action?: () => void) {
  toast.error(error.message, {
    description: (
      <div>
        {error.code ? (
          <p>
            <span className="font-bold">Code: </span>
            {error.code}
          </p>
        ) : null}
        {error.path ? (
          <p>
            <span className="font-bold">Path: </span>
            {error.path}
          </p>
        ) : null}
      </div>
    ),
    action: {
      label: "Ok",
      onClick: () => action,
    },
  })
}
