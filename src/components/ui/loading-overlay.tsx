
type LoadingOverlayProps = {
  show: boolean;
  message?: string;
};

export const LoadingOverlay = ({ show, message = "Processing..." }:LoadingOverlayProps) => {
  if (!show) return null;

  return (
    <div className="
      fixed inset-0 bg-black/40 backdrop-blur-sm z-9999
      flex items-center justify-center
    ">
      <div className="bg-white p-4 rounded-xl shadow-lg text-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 font-medium">{message}</p>
      </div>
    </div>
  );
};
