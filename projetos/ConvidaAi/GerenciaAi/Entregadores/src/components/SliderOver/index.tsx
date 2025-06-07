import * as React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Toaster } from "react-hot-toast";

export default function SliderOver({
  title,
  children,
  header,   // 👈 novo!
  footer,   // 👈
  isOpenSliderbar,
  handleClose,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;    // 👈
  footer?: React.ReactNode;
  title: string;
  isOpenSliderbar: boolean;
  handleClose: () => void;
}) {
  return (
    <Transition.Root show={isOpenSliderbar} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden bg-gray-500 bg-opacity-75">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">

                    {/* Header */}
                    {header && (
                      <div className="border-b border-gray-300 dark:border-gray-700">
                        {header}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                      {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                      <div className="border-t border-gray-300 dark:border-gray-700">
                        {footer}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </Dialog>
    </Transition.Root>
  );
}
