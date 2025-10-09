export const FilePreview = ({ url, type }: any) => {
  

  if (type === "pdf") {
    return <iframe src={url} className="w-full h-full"></iframe>;
  }
  if (type === "image") {
    return <img src={url} className="max-h-full mx-auto" />;
  }
  if (type === "video") {
    return <video src={url} controls className="w-full h-full object-contain"></video>;
  }
  if (type === "doc") {
    // Google Docs viewer cho Word, Excel, PowerPoint
    return (
      <iframe
        src={url}
        className="w-full h-full"
      ></iframe>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p>Không hỗ trợ xem trước loại file này.</p>
      <a
        href={url}
        download
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tải xuống
      </a>
    </div>
  );
}