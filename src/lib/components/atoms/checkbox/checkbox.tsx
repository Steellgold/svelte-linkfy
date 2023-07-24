import { forwardRef } from "react";
import type { CheckboxProps } from "./checkbox.type";
import clsx from "clsx";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ children, ...props }, ref) => {
  return (
    <>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <div className="relative flex cursor-pointer items-center rounded-full">
            <input
              id={props.id}
              type="checkbox"
              className={clsx(
                "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border",
                "border-gray-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block",
                "before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full",
                "before:bg-gray-700 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500",
              )}
              ref={ref}
              style={{ WebkitAppearance: "none" }}
              required={props.required}
              disabled={props.disabled}
              checked={props.checked}
              {...props}
            />
            <div className={clsx(
              "pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0",
              "transition-opacity peer-checked:opacity-100"
            )}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="ml-3 text-sm">
          <label htmlFor={props.id} className="text-gray-300">
            {children} {props.required && <span className="text-red-500">*</span>}
          </label>
        </div>
      </div>

      {props.error && (
        <span className="text-red-500 text-sm mt-1">
          {props.error}
        </span>
      )}
    </>
  );
});

Checkbox.displayName = "Checkbox";