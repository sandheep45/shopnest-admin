import { Portal } from "@radix-ui/react-portal"

import Loader from "../common/Loader"

interface LoadingOverlayProps {
  isOpen: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <div
          className="z-50 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 absolute top-0 left-0"
          role="status"
          aria-live="polite"
          aria-describedby="loading-description"
          aria-hidden={!isOpen}
          tabIndex={-1}
        >
          <Loader aria-busy="true" aria-label="Loading content" />
          <p id="loading-description" className="sr-only">
            Loading... Please wait.
          </p>
        </div>
      )}
    </>
  )
}

export default LoadingOverlay
