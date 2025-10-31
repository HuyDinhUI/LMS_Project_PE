import { type EventType } from "@/components/ui/calendar";
import type { ClassCourseType } from "@/types/ClassCourseType";

import API from "@/utils/axios";
import { formatterDataEventCalendar, getName } from "@/utils/formatters";
import {} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { StudentEducation, StudentType } from "@/types/StudentType";
import { Button } from "@/components/ui/button";
import Man from "@/assets/Character_Cat_1.svg";
import type { AssignmentType } from "@/types/AssignmentType";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FilterForm } from "@/components/ui/filter-form";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
);

const StudentDashboard = () => {
  const [dataStudent, setDataStudent] = useState<StudentEducation>();
  const [events, setEvents] = useState<EventType[]>([]);
  const [dueSoon, setDueSoon] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [assignmentScoreData, setAssignmentScoreData] = useState<
    AssignmentType[]
  >([]);
  const [selectedMaLop, setSelectedMaLop] = useState<string>("");
  const [listClass, setListClass] = useState<ClassCourseType[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const MaSV = localStorage.getItem("username");

  const getOneStudent = async () => {
    try {
      const res = await API.get(
        "/student/getOneStudent/" + localStorage.getItem("username")
      );
      console.log(res.data);
      localStorage.setItem("MaNganh", res.data.result.data[0].MaNganh);
      setDataStudent(res.data.result.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.message);
    }
  };

  const getAssignmentScore = async (malop: string) => {
    try {
      const res = await API.get(
        `/assignments/getAssignmentByStudent/${MaSV}/${malop}`
      );
      setAssignmentScoreData(res.data.result.data);
      const data: AssignmentType[] = res.data.result.data;

      const sorted = data.sort(
        (a: any, b: any) =>
          new Date(a.NgayTao).getTime() - new Date(b.NgayTao).getTime()
      );

      const labels = sorted.map((item: any) => item.TieuDe);
      const scores = sorted.map((item: any) => item.DiemSo ?? 0);

      setChartData({
        labels,
        datasets: [
          {
            label: "Điểm bài tập",
            data: scores,
            fill: true,
            borderColor: "black",
            backgroundColor: "rgba(0, 0, 0, 0.071)",
            pointBackgroundColor: "black",
            pointRadius: 6,
            tension: 0.3, // bo cong mượt
          },
        ],
      });
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  const getClassByStudent = async () => {
    try {
      const res = await API.get(`/classCourse/getClassCourseByStudent/${MaSV}`);
      setListClass(res.data.result.data);
      console.log(res.data.result.data[0].MaLop);
      setSelectedMaLop(res.data.result.data[0].MaLop);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getDueSoon = async () => {
    try {
      const res = await API.get("/assignments/getAllDueSoon");
      setDueSoon(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getSchedule = async () => {
    const res = await API.get(
      "/student/getSchedule/" + localStorage.getItem("username")
    );
    console.log(res.data);
    console.log(formatterDataEventCalendar(res.data.result.data));
    setEvents(formatterDataEventCalendar(res.data.result.data));
  };

  const handleFilter = async (key: string) => {
    setSelectedFilter(key);
  };

  const FILTER_LIST = [
    {
      title: "All",
      onclick: () => handleFilter("All"),
    },
    {
      title: "Today",
      onclick: () => handleFilter("Today"),
    },
    {
      title: "Soon",
      onclick: () => handleFilter("Soon"),
    },
    {
      title: "Due",
      onclick: () => handleFilter("Due"),
    },
  ];

  

  useEffect(() => {
    getClassByStudent();
    getOneStudent();
    getSchedule();
    getDueSoon();
  }, []);

  useEffect(() => {
    document.title = dataStudent?.hoten ?? "Dashboard";
  }, [dataStudent]);

  useEffect(() => {
    if (selectedMaLop) {
      getAssignmentScore(selectedMaLop);
    }
  }, [selectedMaLop]);

  return (
    <div className="pt-5 ps-10 pe-5 w-full h-175">
      <div className="flex gap-15 h-full">
        <div className="w-[50%]">
          <div className="p-10 mt-5 bg-black/5 rounded-xl relative h-40">
            <h1 className="font-brand-logo text-5xl">
              Meow! {getName(dataStudent?.hoten ?? "")}
            </h1>
            <p>It's good to see you again.</p>
            <div className="absolute -top-5 right-10">
              <img width={170} src={Man} />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 mt-5">
            {/* filter */}
            <div className="flex gap-2">
              {FILTER_LIST.map((f, i) => (
                <Button
                  key={i}
                  title={f.title}
                  variant={f.title === selectedFilter ? "primary" : "outline"}
                  onClick={f.onclick}
                />
              ))}
            </div>
            {/* List assignment */}
            <div className="h-120 flex flex-col gap-3 overflow-auto">
              {dueSoon.map((d) => (
                <div
                  key={d.MaBaiTap}
                  className={`p-5 rounded-xl flex justify-between items-center bg-black/5`}
                >
                  <div>
                    <h2 className="font-bold">{d.TieuDe}</h2>
                    <p>{d.ten_lop}</p>
                  </div>
                  <Link
                    to={`/classcourse/${d.MaLop}/guidance/${d.MaBaiTap}`}
                    className="bg-black rounded-md text-white py-1 px-2"
                  >
                    <span>View detail</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 overflow-auto">
          <div className="grid grid-cols-2 gap-3 mt-5 h-40">
            <div className="h-full bg-black/5 rounded-xl flex gap-2 justify-center items-center">
              <span className="text-7xl font-bold font-brand-title">11</span>
              <span>
                Unsubmitted <br /> assignments
              </span>
            </div>
            <div className="bg-black/5 rounded-xl flex gap-2 justify-center items-center">
              <span className="text-7xl font-bold font-brand-title">4</span>
              <span>
                Week <br /> schedule
              </span>
            </div>
          </div>
          <div className="bg-black/5 py-3 px-2 rounded-xl">
            <div className="flex justify-end">
              <select className="p-2 outline-none bg-black/10 rounded-md" onChange={(e) => setSelectedMaLop(e.target.value)}>
                {listClass.map((c,i) => (
                  <option key={i} value={c.MaLop}>{c.ten_lop}</option>
                ))}
              </select>
            </div>
            <div className="pt-5">
              {chartData && chartData.labels?.length > 0 ? <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const score = context.raw;
                          const label =
                            context.chart.data.labels?.[context.dataIndex];
                          return `${label}: ${score} điểm`;
                        },
                      },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 10,
              
                    },
                    x: {
              
                    },
                  },
                }}
              />: <p className="text-center text-gray-500">Chưa có dữ liệu điểm</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
