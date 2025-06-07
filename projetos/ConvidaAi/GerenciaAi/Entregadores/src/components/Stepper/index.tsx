import React from "react";

export interface Step {
  name: string;
  href: string;
  status: "complete" | "current" | "upcoming";
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <nav
      aria-label="Progress"
      className="flex items-center justify-center my-4"
    >
      <p className="text-sm font-medium">
        Passo {currentStep} de {steps.length}
      </p>

      <ol role="list" className="ml-8 flex items-center space-x-5">
        {steps.map((step) => (
          <li key={step.name}>
            {step.status === "complete" ? (
              <a
                href={step.href}
                className="block size-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900"
              >
                <span className="sr-only">{step.name}</span>
              </a>
            ) : step.status === "current" ? (
              <a
                href={step.href}
                aria-current="step"
                className="relative flex items-center justify-center"
              >
                <span aria-hidden="true" className="absolute flex size-5 p-px">
                  <span className="size-full rounded-full bg-indigo-200" />
                </span>
                <span
                  aria-hidden="true"
                  className="relative block size-2.5 rounded-full bg-indigo-600"
                />
                <span className="sr-only">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="block size-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
              >
                <span className="sr-only">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
