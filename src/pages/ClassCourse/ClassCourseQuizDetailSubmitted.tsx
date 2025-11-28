import CheckboxDemo from "@/components/ui/checkbox";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailSubmitted = () => {
  const { matn, mabailam } = useParams();
  const [dataDetailSubmitted, setDataDetailSubmitted] = useState<any>([]);

  const getDetailSubmitted = async () => {
    try {
      const res = await API.get(`quiz/detailSubmitted/${matn}/${mabailam}`);
      console.log(res.data.result.data);
      setDataDetailSubmitted(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getDetailSubmitted();
  }, []);
  return (
    <div className="flex-1 overflow-auto max-h-170">
      <div className="flex flex-col justify-center px-20 relative">
        <div className="flex gap-20 justify-center items-center bg-green-brand text-white py-5 rounded-xl">
          <div>
            <h1 className="text-xl font-bold">{dataDetailSubmitted?.TieuDe}</h1>
            <p>{dataDetailSubmitted?.MoTa}</p>
            <p>{dataDetailSubmitted?.ThoiGianLam} minute</p>
            <p>
              {dataDetailSubmitted?.hoten} - {dataDetailSubmitted?.MaSV}
            </p>
          </div>
          <div className="p-7 bg-white rounded-xl text-black">
            <span className="font-bold">
              {parseFloat(dataDetailSubmitted?.TongDiem)}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {dataDetailSubmitted?.CauHoi?.map((item: any, idx: number) => (
            <div
              key={item.MaCauHoi}
              className="min-h-50 bg-black/3 p-5 rounded-xl shadow-sm"
            >
              <h2 className="py-2 font-bold">
                Question {idx + 1}: {item.NoiDung}
              </h2>
              <div className="flex flex-col gap-2">
                {item.DapAn?.map((item: any) => (
                  <div
                    key={item.MaDapAn}
                    className={`flex items-center gap-2 p-2 rounded-md ${
                      item.DaChon && item.LaDapAnDung && "bg-green-brand/50"
                    } ${item.DaChon && !item.LaDapAnDung && "bg-rose-400/50"}`}
                  >
                    <CheckboxDemo
                      checked={item.DaChon || item.LaDapAnDung}
                      onCheckedChange={() => {}}
                    />
                    <span>{item.NoiDung}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSubmitted;
